export interface Note {
    id: string;
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
    createdAt: string;
    updatedAt: string;
}


export interface NoteCreate {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }

  export interface NoteResponse {
    notes: Note[];
    totalPages: number;
  }
  
  export type NoteTag =
  | 'Work'
  | 'Personal'
  | 'Meeting'
  | 'Shopping'
  | 'Ideas'
  | 'Travel'
  | 'Finance'
  | 'Health'
  | 'Important'
  | 'Todo';