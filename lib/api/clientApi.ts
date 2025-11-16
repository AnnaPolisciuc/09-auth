
import type { User } from "../../types/user";
import type { Note, NoteCreate } from "../../types/note";
// import { api } from "@/app/api/api";
import { nextServer } from "./api";


export type CreateNoteInput = Pick<Note, 'title' | 'content' | 'tag'>;

export async function register(email: string, password: string): Promise<User> {
  const { data } = await nextServer.post("/auth/register", { email, password });
  return data;
} 

export const login = async (email: string, password: string) => {
  const { data } = await nextServer.post("/auth/login", { email, password });
  return data;
};


export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await nextServer.get("/auth/session");
  return data || null;
}

export async function fetchNotes(page = 1, perPage = 12, search = "", tag?: string) {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();
  if (tag) params.tag = tag;
  const { data } = await nextServer.get("/notes", { params });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await nextServer.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: NoteCreate) {
  const { data } = await nextServer.post("/notes", note);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await nextServer.delete(`/notes/${id}`);
  return data;
}

export async function getMe() {
  const { data } = await nextServer.get("/users/me");
  return data;
}

export async function updateMe(payload: Partial<User>) {
  const { data } = await nextServer.patch("/users/me", payload);
  return data;
}
