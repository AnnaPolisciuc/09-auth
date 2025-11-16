// lib/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { checkSession, logout as apiLogout } from "../api/clientApi";
import type { User } from "../../types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const data = await checkSession();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return { user, setUser, loading, refreshUser, logout };
}
