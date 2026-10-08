import { createClient } from '@supabase/supabase-js';

// Read environment variables (supporting both VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_ANON_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bdgjsjnuiulbylprzqxz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Gn_7qAQv7oEtDWtvXY9QOg_puCVypnq';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const BUCKET_NAME = import.meta.env.VITE_STORAGE_BUCKET || 'appLitStudyliteratureandlanguageteaching';

/**
 * Utility function to get private signed URL or public URL for uploaded PDF
 */
export async function getPdfStorageUrl(filePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600); // 1 hour signed URL for private bucket

    if (error) {
      console.warn('Could not generate signed URL from private bucket:', error.message);
      return null;
    }
    return data.signedUrl;
  } catch (err) {
    console.error('Supabase storage error:', err);
    return null;
  }
}
