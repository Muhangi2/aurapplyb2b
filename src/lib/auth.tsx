import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type UserType = "candidate" | "recruiter" | null;

interface AuthCtx {
  user: User | null;
  session: Session | null;
  userType: UserType;
  loading: boolean;
  refreshUserType: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  userType: null,
  loading: true,
  refreshUserType: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserType(uid: string | undefined) {
    if (!uid) {
      setUserType(null);
      return;
    }
    const { data } = await supabase.from("profiles").select("user_type").eq("id", uid).maybeSingle();
    setUserType((data?.user_type as UserType) ?? "candidate");
  }

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
      // Defer profile read to avoid recursion warnings
      setTimeout(() => loadUserType(s?.user?.id), 0);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      loadUserType(data.session?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider
      value={{
        session,
        user: session?.user ?? null,
        userType,
        loading,
        refreshUserType: () => loadUserType(session?.user?.id),
        signOut: async () => {
          await supabase.auth.signOut();
          setUserType(null);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
