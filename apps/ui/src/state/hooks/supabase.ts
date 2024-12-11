"use client";

import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [data, setData] = useState<Session | null>(null);

  useEffect(() => {
    const client = createClient();

    client.auth.onAuthStateChange((_event, session) => {
      setData(session);
    });
  }, []);

  return data;
};
