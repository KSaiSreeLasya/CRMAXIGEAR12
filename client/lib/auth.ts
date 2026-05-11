import { supabase } from "./supabase";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  return !!token;
};

/** Copy Supabase session access token into auth_token so ProtectedRoute stays in sync. */
export async function hydrateAuthTokenFromSupabase(): Promise<void> {
  if (!supabase) return;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.access_token) {
    localStorage.setItem("auth_token", session.access_token);
  }
}

export const logout = (): void => {
  localStorage.removeItem("auth_token");
  if (supabase) {
    supabase.auth.signOut();
  }
};

export const getCurrentUser = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
};
