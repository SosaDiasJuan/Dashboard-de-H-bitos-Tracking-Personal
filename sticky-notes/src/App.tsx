import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import "./App.css";

// Tipo que representa una nota del sistema.
// Lo definimos como type porque describe *forma*, no comportamiento.
export type Note = {
  id: string;
  text: string;
};

/**
 * Componente principal de la aplicación.
 * Se encarga de manejar el estado global de notas,
 * su persistencia y el renderizado de la grilla.
 */
function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Cargar notas desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Guardar notas cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Agregar una nueva nota vacía
  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: "",
    };
    setNotes((prev) => [...prev, newNote]);
  };

  // Actualizar contenido de una nota
  const updateNote = (id: string, text: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  };

  // Eliminar nota por id
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fondo" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "30px", color: "white", justifyContent: "center", display: "flex" }}>Sticky Notes</h1>

      <button
        onClick={addNote}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          justifyContent: "center",          
          display: "flex", 
        }}
      >
        ➕ Agregar Nota
      </button>

      {/* Grilla de notas */}
      <div
        style={{
          display: "grid",
          gap: "15px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {notes.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            onChange={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
