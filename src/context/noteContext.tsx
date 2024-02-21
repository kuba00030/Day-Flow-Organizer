import { createContext, useContext, useEffect, useState } from "react";
import { ContextProviderProps, useAuthContext } from "./authContext";
import getNotesDB from "../utils/api/get-data/getNotesDB";

export type Note = {
  id: number;
  title: string;
  description: string;
  noteColor: string;
};

type NotesContext = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export const NotesContext = createContext<NotesContext | null>(null);

export default function NotesContextProvider({
  children,
}: ContextProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const { authContext } = useAuthContext();

  useEffect(() => {
    if (authContext.userID) {
      getNotesDB(authContext.userID).then((fetchedNotesDB) => {
        const fetchedNotes: Note[] = [];
        if (
          fetchedNotesDB.exists() &&
          fetchedNotesDB.data().notesDB !== undefined
        ) {
          fetchedNotesDB.data().notesDB.forEach((note) => {
            fetchedNotes.push(note);
          });
        }
        setNotes([...fetchedNotes]);
      });
    }
  }, [authContext]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error(
      "useNotesContext should be used within a NotesContextProvider"
    );
  }
  return context;
}
