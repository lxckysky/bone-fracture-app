'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Sun, Contrast, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface ImageViewerProps {
    imageUrl: string;
    alt?: string;
}

export function ImageViewer({ imageUrl, alt = 'X-ray image' }: ImageViewerProps) {
    const [zoom, setZoom] = useState(100);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 300));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
    const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
    const handleReset = () => {
        setZoom(100);
        setBrightness(100);
        setContrast(100);
        setRotation(0);
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="bg-slate-900/50 p-4 rounded-lg space-y-4">
                {/* Zoom & Rotate Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Button size="sm" variant="ghost" onClick={handleZoomOut}>
                        <ZoomOut size={18} className="mr-1" /> Zoom Out
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleZoomIn}>
                        <ZoomIn size={18} className="mr-1" /> Zoom In
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleRotate}>
                        <RotateCw size={18} className="mr-1" /> Rotate
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <span className="text-slate-400 text-sm ml-auto">Zoom: {zoom}%</span>
                </div>

                {/* Brightness Control */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Sun size={18} className="text-slate-400" />
                        <label className="text-sm text-slate-300 w-24">Brightness</label>
                        <input
                            type="range"
                            min="50"
                            max="150"
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-slate-400 text-sm w-12 text-right">{brightness}%</span>
                    </div>
                </div>

                {/* Contrast Control */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Contrast size={18} className="text-slate-400" />
                        <label className="text-sm text-slate-300 w-24">Contrast</label>
                        <input
                            type="range"
                            min="50"
                            max="150"
                            value={contrast}
                            onChange={(e) => setContrast(Number(e.target.value))}
                            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-slate-400 text-sm w-12 text-right">{contrast}%</span>
                    </div>
                </div>
            </div>

            {/* Image Display */}
            <div className="bg-black rounded-lg overflow-hidden border border-slate-700 min-h-[400px] flex items-center justify-center">
                <div className="overflow-auto max-h-[600px] w-full flex items-center justify-center p-4">
                    <img
                        src={imageUrl}
                        alt={alt}
                        className="transition-all duration-300"
                        style={{
                            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
