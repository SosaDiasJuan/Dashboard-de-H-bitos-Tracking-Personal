import { useState } from "react";
import type { Note } from "../App";

type Props = {
  note: Note;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
};

/**
 * Muestra una nota individual.  
 * Al hacer click, abre un modal para editar el contenido.
 */
export default function NoteCard({ note, onChange, onDelete, onPin }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Vista previa de la nota */}
      <div
        onClick={() => setIsOpen(true)}
        style={{
          background: note.pinned ? "#ffd966" : "#ddda1dff",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          minHeight: "120px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Texto de la nota */}
        <div style={{ flex: 1, overflow: "hidden", whiteSpace: "pre-wrap" }}>
          {note.text || "Nota vacía..."}
        </div>

        {/* Barra de botones abajo */}
        <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
          {/* Botón de pin */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(note.id);
            }}
            style={{
              border: "none",
              cursor: "pointer",
              background: "transparent",
              fontSize: "1.2rem",
            }}
          >
            {note.pinned ? "📌" : "📍"}
          </button>

          {/* Botón eliminar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            style={{
              border: "none",
              cursor: "pointer",
              background: "transparent",
              fontSize: "1.2rem",
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(235, 188, 33, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
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
              zIndex: 9999,
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
                padding: "8px",
                boxSizing: "border-box",
                resize: "vertical",
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
