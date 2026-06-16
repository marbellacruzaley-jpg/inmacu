'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = () => {
  const { token, usuario, isAuthenticated, login, logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
});

      if (!response.ok) {
        throw new Error('Credenciales invalidas');
}

      const data = await response.json();
      login(data.token, { username: data.username });
      router.push('/admin');
} catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesion');
} finally {
      setLoading(false);
}
};

  const logoutUser = () => {
    logout();
    router.push('/');
};

  return {
    token,
    usuario,
    isAuthenticated,
    loading,
    error,
    loginUser,
    logoutUser,
};
};
