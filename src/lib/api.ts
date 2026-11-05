import { getToken } from '@/lib/token-storage';

const TIMEOUT_MS = 15_000;

export class ApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/** Didaftarkan AuthProvider agar sesi yang tidak valid langsung mengeluarkan pengguna. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
};

function baseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (!url) {
    throw new ApiError(
      'Alamat server belum diatur. Isi EXPO_PUBLIC_API_URL di file .env lalu build ulang aplikasi.',
    );
  }
  return url.replace(/\/+$/, '');
}

function failureMessage(status: number, auth: boolean): string {
  if (status === 401) {
    return auth ? 'Sesi kamu telah berakhir. Silakan masuk kembali.' : 'Email atau kata sandi salah.';
  }
  if (status === 403) {
    return auth ? 'Sesi kamu telah berakhir. Silakan masuk kembali.' : 'Kamu tidak memiliki akses ke fitur ini.';
  }
  if (status === 400) return 'Data yang dimasukkan tidak valid.';
  if (status >= 500) return 'Terjadi kesalahan pada server. Coba lagi nanti.';
  return 'Permintaan gagal. Coba lagi.';
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, auth = false }: RequestOptions = {},
): Promise<T> {
  const url = `${baseUrl()}${path}`;
  const headers: Record<string, string> = { Accept: 'application/json' };

  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (auth) {
    let token: string | null;
    try {
      token = await getToken();
    } catch {
      throw new ApiError('Sesi tersimpan tidak dapat dibaca. Silakan masuk kembali.', null);
    }
    if (!token) {
      unauthorizedHandler?.();
      throw new ApiError('Sesi kamu telah berakhir. Silakan masuk kembali.', 401);
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  let text: string;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    text = await response.text();
  } catch {
    throw new ApiError(
      controller.signal.aborted
        ? 'Permintaan ke server melebihi batas waktu. Periksa koneksi lalu coba lagi.'
        : 'Tidak dapat terhubung ke server. Periksa koneksi internetmu.',
      null,
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    if (auth && (response.status === 401 || response.status === 403)) {
      unauthorizedHandler?.();
    }
    throw new ApiError(failureMessage(response.status, auth), response.status);
  }

  if (!text) return undefined as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError('Respons server tidak dapat dibaca. Coba lagi nanti.', response.status);
  }
}
