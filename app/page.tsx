'use client';

import React, { useState, useCallback } from 'react';
import { Upload, Globe2, AlertCircle, FileText, ImageIcon, User, Activity, Brain, Stethoscope, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ConfidenceBar } from '@/components/confidence-bar';
import { AIAnalyzer } from '@/lib/ai-analyzer';
import { GeminiService } from '@/lib/llm-service';
import { ClientModel } from '@/lib/client-model';
import { API } from '@/lib/api';
import { LanguageCode, LANGUAGES, ALIAS_MAPPING, EXPLANATIONS, FRACTURE_LABELS } from '@/lib/i18n';
import { getFractureLabel } from '@/lib/fracture-data';
import { BONE_FRACTURE_INFO, SYSTEM_INFO } from '@/lib/education-data';
import { AnalysisResult, PatientInfo, LLMInsights, FractureType } from '@/types';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function BackendStatusIndicator() {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [provider, setProvider] = useState<string>('Local Backend');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:8000';
    const isHf = apiUrl.includes('hf.space');
    setProvider(isHf ? 'Hugging Face' : 'Local Backend');

    const checkStatus = async () => {
      try {
        // For HF, we check /health or root
        const res = await fetch(`${apiUrl}/health`, { method: 'GET' });
        setStatus(res.ok ? 'online' : 'offline');
      } catch (e) {
        // Fallback check for root if /health fails (for older backend versions)
        try {
          const resRoot = await fetch(apiUrl, { method: 'GET' });
          setStatus(resRoot.ok ? 'online' : 'offline');
        } catch (e2) {
          setStatus('offline');
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-400 animate-pulse' : status === 'offline' ? 'bg-red-400' : 'bg-slate-500 animate-pulse'}`}></div>
      <span className="text-slate-300">
        {provider}: {status === 'online' ? <span className="text-emerald-400">Online</span> : status === 'offline' ? <span className="text-red-400">Offline</span> : 'Checking...'}
      </span>
    </div>
  );
}

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [language, setLanguage] = useState<LanguageCode>('th');
  const [fileType, setFileType] = useState<'image' | 'dicom'>('image');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [llmInsights, setLlmInsights] = useState<LLMInsights | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Patient Info State
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    age: undefined,
    gender: 'male',
    height: undefined,
    weight: undefined,
    medicalHistory: '',
    mechanismOfInjury: '',
    painLevel: 5
  });

  const t = LANGUAGES[language];

  // Language options
  const languages = [
    { code: 'th', flag: '🇹🇭', name: 'ไทย' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [fileType, patientInfo, language]); // Added language dependency

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Basic validation based on mode
    if (fileType === 'image' && !file.type.startsWith('image/')) {
      alert("Please upload a valid image file");
      return;
    }

    setCurrentFile(file);
    setSaved(false);
    setResult(null);
    setLlmInsights(null);

    // Preview image
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    // Auto-analysis REMOVED. Waiting for user to click "Start Analysis"
  };

  const startAnalysis = async () => {
    if (!currentFile) return;

    setAnalyzing(true);
    setResult(null);
    setLlmInsights(null);

    try {
      // Step 1: AI Analysis (Python backend → Client-side TF.js → Simulation)
      console.log('🤖 Starting AI analysis...');
      const analysisResult = await AIAnalyzer.analyzeImage(currentFile, language as any);
      setResult(analysisResult);

      // Step 2: Enhanced LLM Analysis
      console.log('🧠 Enhancing with Gemini LLM...');

      const insights = await GeminiService.generateInsights(
        analysisResult.fractureType,
        analysisResult.confidence,
        patientInfo,
        language
      );

      setLlmInsights(insights);

      // Step 3: Auto-save for logged-in users
      if (isAuthenticated && user && fileType === 'image') {
        const savedCase = await API.createCase({
          file: currentFile,
          fractureType: analysisResult.fractureType,
          confidence: analysisResult.confidence,
          status: 'pending_review',
          aiDiagnosis: analysisResult.fractureType,
          language: language as any,
          metadata: {
            ...analysisResult.metadata,
            patientInfo: patientInfo,
            llmInsights: insights
          }
        });

        if (savedCase) {
          setSaved(true);
        }
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      alert(`${t.process_error}\nDetails: ${error.message || error}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveManually = async () => {
    if (!currentFile || !result || !user) return;
    if (fileType !== 'image') return;

    const savedCase = await API.createCase({
      file: currentFile,
      fractureType: result.fractureType,
      confidence: result.confidence,
      status: 'pending_review',
      aiDiagnosis: result.fractureType,
      language: language as any,
      metadata: {
        ...result.metadata,
        patientInfo: patientInfo,
        llmInsights: llmInsights
      }
    });

    if (savedCase) {
      setSaved(true);
      alert(t.save_success);
    } else {
      alert(t.save_error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 p-4">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
          {t.subtitle} <span className="text-cyan-400">+ Context-Aware LLM</span>
        </p>

        {/* System Status */}
        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm font-bold">
          <BackendStatusIndicator />
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300">Vision AI Ready</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-slate-300">Clinical LLM Ready</span>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700 inline-flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as LanguageCode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${language === lang.code
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <span>{lang.flag}</span>
              <span className="hidden md:inline">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN: Input Section */}
        <div className="space-y-6">

          {/* 1. Patient Context Form */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
                <User size={24} />
                {t.patient_context}
              </h2>
              <p className="text-slate-400 text-xs">{t.patient_desc}</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{t.age}</label>
                  <input
                    type="number"
                    value={patientInfo.age || ''}
                    onChange={e => setPatientInfo({ ...patientInfo, age: parseInt(e.target.value) || undefined })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-purple-500 outline-none"
                    placeholder={language === 'th' ? "เช่น 45" : "e.g. 45"}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{t.gender}</label>
                  <select
                    value={patientInfo.gender}
                    onChange={e => setPatientInfo({ ...patientInfo, gender: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-purple-500 outline-none"
                  >
                    <option value="male">{t.gender_male}</option>
                    <option value="female">{t.gender_female}</option>
                    <option value="other">{t.gender_other}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{t.moi}</label>
                  <input
                    type="text"
                    value={patientInfo.mechanismOfInjury || ''}
                    onChange={e => setPatientInfo({ ...patientInfo, mechanismOfInjury: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-purple-500 outline-none"
                    placeholder={t.moi_placeholder}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{t.pain_level}</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1" max="10"
                      value={patientInfo.painLevel}
                      onChange={e => setPatientInfo({ ...patientInfo, painLevel: parseInt(e.target.value) })}
                      className="w-full accent-purple-500"
                    />
                    <span className="text-purple-400 font-bold w-6">{patientInfo.painLevel}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">{t.medical_history}</label>
                <textarea
                  value={patientInfo.medicalHistory || ''}
                  onChange={e => setPatientInfo({ ...patientInfo, medicalHistory: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-purple-500 outline-none text-sm"
                  rows={2}
                  placeholder={t.medical_history_placeholder}
                />
              </div>
            </CardBody>
          </Card>

          {/* 2. Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer h-[320px] flex flex-col items-center justify-center relative overflow-hidden group ${dragActive
              ? 'drag-active border-cyan-500 bg-cyan-500/10'
              : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/50'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => {
              if (!imagePreview) {
                document.getElementById('file-upload')?.click();
              } else {
                setIsLightboxOpen(true);
              }
            }}
          >
            {!imagePreview ? (
              <div className="relative z-10">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="text-cyan-400" size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {t.upload_section}
                </h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">{t.waiting_upload}</p>
                <Button variant="secondary" size="lg" className="pointer-events-auto">
                  {t.upload_image}
                </Button>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full flex items-center justify-center group/img">
                <img src={imagePreview} alt="Preview" className="max-h-[250px] w-auto rounded-lg shadow-xl transition-transform group-hover/img:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                  คลิกเพื่อขยายดูรูปใหญ่
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); setCurrentFile(null); setImagePreview(null); setResult(null); }}>
                    {language === 'th' ? 'เปลี่ยนรูปภาพ' :
                      language === 'zh' ? '更换图片' :
                        language === 'ja' ? '画像を変更' : 'Change Image'}
                  </Button>
                </div>
              </div>
            )}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
          </div>

          {/* Lightbox Modal */}
          {isLightboxOpen && imagePreview && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-[110]"
                onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
              >
                <X size={32} />
              </button>
              <img
                src={imagePreview}
                alt="Enlarged"
                className="max-w-full max-h-full object-contain shadow-2xl animate-scale-up"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white/70 text-sm backdrop-blur-md">
                {result ? getFractureLabel(result.fractureType, language) : 'ภาพระบุตำแหน่งกระดูก'}
              </div>
            </div>
          )}

          {/* 3. NEW ACTION BUTTON */}
          <Button
            variant="primary"
            size="lg"
            className={`w-full h-16 text-xl font-bold shadow-xl shadow-cyan-900/20 transition-all ${currentFile ? 'animate-pulse-slow' : 'opacity-50 grayscale'
              }`}
            onClick={startAnalysis}
            disabled={!currentFile || analyzing}
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                {t.processing_ai}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Brain size={24} />
                {t.start_analysis}
              </span>
            )}
          </Button>
        </div>

        {/* RIGHT COLUMN: Results Section */}
        <div className="space-y-6">
          {/* Loading State or Instruction (Empty State) */}
          {!result && !analyzing ? (
            <div className="h-full min-h-[500px] border border-slate-800 rounded-xl bg-slate-900/30 flex flex-col items-center justify-center text-slate-600 p-8 text-center border-dashed">
              <Brain size={64} className="mb-4 opacity-20" />
              <h3 className="text-xl font-bold opacity-50 mb-2">AI Diagnostic Center</h3>
              <p className="opacity-40 max-w-xs">{t.waiting_description}</p>

              {currentFile && (
                <div className="mt-8 animate-fade-in">
                  <p className="text-cyan-400 mb-2 font-bold animate-bounce">Ready to Analyze!</p>
                  <p className="text-xs text-slate-500">Click the button on the left to start</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Processing State */}
              {analyzing && (
                <div className="h-[500px] bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center border border-slate-700 rounded-xl">
                  <div className="space-y-6 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-4 border-4 border-purple-500 border-b-transparent rounded-full animate-spin-reverse opacity-70"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {t.processing_ai}
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm animate-pulse">{t.processing_vision}</p>
                      <p className="text-purple-400 mt-1 text-sm animate-pulse delay-75">{t.processing_llm}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS DISPLAY */}
              {result && llmInsights && !analyzing && (
                <div className="space-y-4 animate-slide-up">
                  {/* 1. Vision Result Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-cyan-500/30 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-cyan-400 uppercase font-bold tracking-wider mb-1">
                        {t.analysis_result}
                        {result.metadata?.provider && (
                          <span className="ml-2 text-[10px] text-slate-500 font-normal">
                            via {result.metadata.provider}
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">
                        {getFractureLabel(result.fractureType, language)}
                      </h2>
                      {result.metadata?.top3 && (
                        <div className="text-[10px] text-slate-500 mt-1">
                          Other possibilities: {result.metadata.top3}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-cyan-400">{(result.confidence * 100).toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">{t.confidence}</div>
                    </div>
                  </div>

                  {/* 2. LLM Insights Panel */}
                  <Card className="border-t-4 border-t-purple-500 bg-slate-900/80">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-purple-400 mb-1">
                        <Brain size={20} />
                        <span className="font-bold uppercase text-xs tracking-wider">{t.clinical_reasoning}</span>
                      </div>
                      <p className="text-slate-300 italic text-sm border-l-2 border-purple-500/30 pl-3">
                        "{llmInsights.contextualSummary}"
                      </p>
                    </CardHeader>
                    <CardBody className="space-y-5 pt-2">
                      {/* Differential Diagnosis */}
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-white mb-2">
                          <Activity size={16} className="text-amber-400" />
                          {t.diff_dx}
                        </h4>
                        <ul className="list-disc pl-8 space-y-1 text-slate-300 text-sm">
                          {llmInsights.differentialDiagnosis.map((dx, i) => (
                            <li key={i}>{dx}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Next Steps */}
                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                          <h4 className="flex items-center gap-2 font-semibold text-blue-300 mb-2">
                            <Stethoscope size={16} />
                            {t.rec_steps}
                          </h4>
                          <ul className="text-sm text-blue-100/80 space-y-1 list-disc pl-4">
                            {llmInsights.recommendedNextSteps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Risks */}
                        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                          <h4 className="flex items-center gap-2 font-semibold text-red-300 mb-2">
                            <AlertTriangle size={16} />
                            {t.clinical_risks}
                          </h4>
                          <ul className="text-sm text-red-100/80 space-y-1 list-disc pl-4">
                            {llmInsights.clinicalRisks.map((risk, i) => (
                              <li key={i}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Disclaimer */}
                  <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3 text-xs text-slate-400">
                    <AlertCircle className="text-slate-500 flex-shrink-0" size={16} />
                    <p><strong>{t.warning}</strong> {t.llm_disclaimer}</p>
                  </div>

                  {/* Save Button */}
                  {isAuthenticated && (
                    <Button
                      variant="success"
                      className="w-full h-12 text-lg shadow-lg shadow-emerald-900/20"
                      onClick={handleSaveManually}
                      disabled={saved || fileType !== 'image'}
                    >
                      {saved ? t.save_success : t.save_record}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="max-w-7xl mx-auto mt-16 space-y-12 pb-12">
        {/* Fracture Types Information */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              {language === 'th' ? 'ประเภทการหักของกระดูกที่ระบบสามารถวิเคราะห์ได้' :
                language === 'zh' ? '系统可分析的骨折类型' :
                  language === 'ja' ? 'システムが分析可能な骨折タイプ' :
                    'Bone Fracture Types'}
            </h2>
            <p className="text-slate-400">
              {language === 'th' ? '12 รูปแบบการหักของกระดูกที่ AI สามารถตรวจจับและวิเคราะห์ได้' :
                language === 'zh' ? 'AI可检测和分析的12种骨折模式' :
                  language === 'ja' ? 'AIが検出・分析できる12種類の骨折パターン' :
                    '12 fracture patterns AI can detect and analyze'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BONE_FRACTURE_INFO[language].map(([title, description], index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Information */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
              {language === 'th' ? 'ข้อมูลระบบ' :
                language === 'zh' ? '系统信息' :
                  language === 'ja' ? 'システム情報' :
                    'System Information'}
            </h2>
            <p className="text-slate-400">
              {language === 'th' ? 'เทคโนโลยีและความสามารถของระบบวิเคราะห์กระดูกหัก' :
                language === 'zh' ? '骨折分析系统的技术和能力' :
                  language === 'ja' ? '骨折分析システムの技術と機能' :
                    'Technology and capabilities of fracture analysis system'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SYSTEM_INFO[language].map(([title, description], index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      {index === 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1a7 7 0 0 1-7 7v-1.73c.6-.34 1-.99 1-1.73a2 2 0 0 0-4 0c0 .74.4 1.39 1 1.73V22a7 7 0 0 1-7-7H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2Z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
