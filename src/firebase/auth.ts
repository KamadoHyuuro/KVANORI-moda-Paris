import { signOut } from 'firebase/auth';
import { auth } from './config';
import { UserProfile } from '../types';

// -------------------------------------------------------------
// CLIENT & ADMIN AUTHENTICATION API
// All authorization and verification is authoritative on the server.
// Passwords and administrative privileges are NEVER stored or decided on the client.
// -------------------------------------------------------------

export async function loginWithEmail(email: string, password: string): Promise<UserProfile> {
  const normalizedEmail = email.trim().toLowerCase();

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: normalizedEmail,
      password
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'E-mail ou senha incorretos.');
  }

  return data.user as UserProfile;
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<UserProfile> {
  const normalizedEmail = email.trim().toLowerCase();

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.trim(),
      email: normalizedEmail,
      password
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Falha ao criar conta. Verifique os dados informados.');
  }

  return data.user as UserProfile;
}

export async function getCurrentSession(): Promise<UserProfile | null> {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export async function resetPassword(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();

  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: normalizedEmail })
  });

  const data = await response.json().catch(() => ({}));

  return data.message || 'Se o e-mail estiver cadastrado em nosso sistema, as instruções para redefinição foram enviadas.';
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.warn('Erro ao chamar logout no servidor:', err);
  }

  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (err) {
    console.warn('Erro ao deslogar Firebase:', err);
  }
}
