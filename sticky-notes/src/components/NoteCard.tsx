import { useState } from "react";
import type { Note } from "../App";

type Props = {
  note: Note;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

/**
 * Muestra una nota individual.  
 * Al hacer click, abre un modal para editar el contenido.
 */
export default function NoteCard({ note, onChange, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Vista previa de la nota */}
      <div
        onClick={() => setIsOpen(true)}
        style={{
          background: "#b5ffa6ff",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          minHeight: "120px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {note.text || "Nota vacía..."}

        {/* Botón eliminar */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita abrir el modal al borrar
            onDelete(note.id);
          }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            border: "none",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          🗑️
        </button>
      </div>

      {/* Modal de edición */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Editar Nota</h2>

            <textarea
              value={note.text}
              onChange={(e) => onChange(note.id, e.target.value)}
              style={{
                width: "100%",
                minHeight: "180px",
                fontSize: "1rem",
                padding: "10px",
              }}
            />

            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: "16px",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                background: "#e0e0e0",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
