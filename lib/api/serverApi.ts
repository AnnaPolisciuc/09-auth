import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export type NotesQuery = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
};

const cookieHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const checkSession = async () => {
  const headers = await cookieHeaders();
  const res = await nextServer.get('/auth/session', { headers });
  return res;
};

export const getMe = async (): Promise<User> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};


export const fetchNotes = async (params: NotesQuery = {}): Promise<Note[]> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<Note[]>('/notes', { headers, params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await cookieHeaders();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, { headers });
  return data;
};