const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

// ─── Auth ───────────────────────────────────────────────────

export const api = {
  auth: {
    getProfile: (token: string) =>
      apiFetch<{ profile: any }>('/api/auth/profile', { token }),
    updateProfile: (token: string, data: any) =>
      apiFetch<{ profile: any }>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
    updateLocation: (token: string, lat: number, lng: number) =>
      apiFetch('/api/auth/location', {
        method: 'POST',
        body: JSON.stringify({ lat, lng }),
        token,
      }),
  },

  // ─── Chat ───────────────────────────────────────────────────

  chat: {
    startSession: (token: string, language: 'en' | 'tl' = 'tl') =>
      apiFetch<{ session: any; response: any }>('/api/chat/sessions', {
        method: 'POST',
        body: JSON.stringify({ language }),
        token,
      }),
    sendMessage: (token: string, sessionId: string, message: string) =>
      apiFetch<{ response: any; session: any }>('/api/chat/messages', {
        method: 'POST',
        body: JSON.stringify({ session_id: sessionId, message }),
        token,
      }),
    getMessages: (token: string, sessionId: string) =>
      apiFetch<{ messages: any[] }>(`/api/chat/sessions/${sessionId}/messages`, { token }),
    getActiveSession: (token: string) =>
      apiFetch<{ session: any }>('/api/chat/sessions/active', { token }),
  },

  // ─── Assessment ─────────────────────────────────────────────

  assessment: {
    claimCode: (token: string, code: string) =>
      apiFetch('/api/assessment/claim-code', {
        method: 'POST',
        body: JSON.stringify({ code }),
        token,
      }),
    submit: (token: string, data: any) =>
      apiFetch('/api/assessment/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    addCompanion: (token: string, data: any) =>
      apiFetch('/api/assessment/companion', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    getMy: (token: string) =>
      apiFetch<{ assessments: any[] }>('/api/assessment/my', { token }),
  },

  // ─── Thought Diary ──────────────────────────────────────────

  thoughtDiary: {
    create: (token: string, data: any) =>
      apiFetch('/api/thought-diary', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    getMy: (token: string) =>
      apiFetch<{ thought_diaries: any[] }>('/api/thought-diary/my', { token }),
    getOne: (token: string, id: string) =>
      apiFetch<{ thought_diary: any }>(`/api/thought-diary/${id}`, { token }),
    update: (token: string, id: string, data: any) =>
      apiFetch(`/api/thought-diary/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
  },

  // ─── Admin ──────────────────────────────────────────────────

  admin: {
    getUsers: (token: string) =>
      apiFetch<{ users: any[]; total: number }>('/api/admin/users', { token }),
    getUser: (token: string, userId: string) =>
      apiFetch('/api/admin/users/' + userId, { token }),
    getUserChat: (token: string, userId: string) =>
      apiFetch<{ messages: any[] }>(`/api/admin/users/${userId}/chat`, { token }),
    createCode: (token: string, userEmail: string) =>
      apiFetch('/api/admin/codes', {
        method: 'POST',
        body: JSON.stringify({ user_email: userEmail }),
        token,
      }),
    handover: (token: string, data: any) =>
      apiFetch('/api/admin/handover', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    generateCodes: (token: string, count: number) =>
      apiFetch<{ codes: string[] }>('/api/admin/codes/batch', {
        method: 'POST',
        body: JSON.stringify({ count }),
        token,
      }),
    getUserThoughtDiary: (token: string, userId: string) =>
      apiFetch<{ thought_diaries: any[] }>(`/api/admin/users/${userId}/thought-diary`, { token }),
  },

  // ─── Translation ────────────────────────────────────────────

  translate: {
    translate: (text: string, from: string, to: string) =>
      apiFetch<{ translated: string }>('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text, from, to }),
      }),
    understand: (message: string, emotion: string, context?: string) =>
      apiFetch('/api/translate/understand', {
        method: 'POST',
        body: JSON.stringify({ message, emotion, context }),
      }),
  },
};
