import { AuthError } from "@supabase/supabase-js";
import { createClient } from "./client";

export const signOut = async (): Promise<{
  error: AuthError | null;
}> => {
  const supabase = createClient();

  return supabase.auth.signOut();
};
