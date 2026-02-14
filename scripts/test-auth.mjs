
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env.local');
let envConfig = {};

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            envConfig[key] = value;
        }
    });
} catch (err) {
    console.error("Could not read .env.local", err);
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase Credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    console.log("🚀 Starting Auth Test...");
    console.log(`Target: ${supabaseUrl}`);

    const email = `test.script.user.${Date.now()}@gmail.com`;
    const password = 'password123';
    const name = 'Test User';

    // 1. Test Registration
    console.log(`\n1. Attempting Registration for ${email}...`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (signUpError) {
        console.error(`❌ Registration Failed: ${signUpError.message}`);
        return;
    }

    console.log("✅ Registration API Success");
    console.log("User ID:", signUpData.user?.id);
    console.log("Session Created?", !!signUpData.session);

    if (!signUpData.session) {
        console.warn("⚠️  NO SESSION CREATED. Setup likely requires Email Confirmation.");
    }

    // 2. Test Login
    console.log(`\n2. Attempting Login...`);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        console.error(`❌ Login Failed: ${signInError.message}`);
    } else {
        console.log("✅ Login Success!");
        console.log("Session Access Token:", signInData.session?.access_token?.substring(0, 20) + "...");
    }

    // 3. Test Profile Creation (Trigger Check)
    if (signUpData.user) {
        console.log(`\n3. Checking Profile Creation (Trigger)...`);
        // Give trigger a moment
        await new Promise(r => setTimeout(r, 2000));

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', signUpData.user.id)
            .single();

        if (profileError) {
            console.error(`❌ Fetch Profile Failed: ${profileError.message}`);
            console.error("   (Did you run supabase_setup.sql?)");
        } else {
            console.log("✅ Profile Found:", profile);
        }
    }
}

testAuth();
