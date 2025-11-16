import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DraftNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (draft: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) =>
        set((state) => ({ draft: { ...state.draft, ...draft } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft" }
  )
);
// import { create } from 'zustand';
// import type { User } from '@/types/user';

// //===========================================================================

// type AuthStore = {
//   isAuthenticated: boolean;
//   user: User | null;
//   setUser: (user: User) => void;
//   clearIsAuthenticated: () => void;
// };

// //===========================================================================

// export const useAuthStore = create<AuthStore>()(set => ({
//   isAuthenticated: false,
//   user: null,
//   setUser: (user: User) => {
//     set(() => ({ user, isAuthenticated: true }));
//   },
//   clearIsAuthenticated: () => {
//     set(() => ({ user: null, isAuthenticated: false }));
//   },
// }));