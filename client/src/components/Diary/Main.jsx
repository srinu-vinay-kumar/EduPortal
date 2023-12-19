import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

export default function Main({ activeNote, onUpdateNote }) {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return <div className={styles.noActiveNote}>No note selected</div>;

  return (
    <div className={styles.appMain} style={{width:'50%'}}>
      <div className={styles.appMainNoteEdit}>
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className={styles.appMainNotePreview}>
        <h1 className={styles.previewTitle}>{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}
