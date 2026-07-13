import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/* Returns null when env vars are missing so the contact form can degrade gracefully */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  lang: string;
}

export async function submitContactMessage(msg: ContactMessage): Promise<{ ok: boolean; offline: boolean }> {
  const sb = getSupabase();
  if (!sb) return { ok: true, offline: true };
  const { error } = await sb.from("contact_messages").insert(msg);
  if (error) {
    console.error("[contact] supabase insert failed:", error.message);
    return { ok: false, offline: false };
  }
  return { ok: true, offline: false };
}
