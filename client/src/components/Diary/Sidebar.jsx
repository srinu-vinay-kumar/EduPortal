import React from "react";
import bin from './bin.png'; 
import styles from "./styles.module.css";
import add from "./more.png"
import "./styles.module.css"


export default function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className={styles.appSidebar} >
      <div className={styles.appSidebarHeader}>
        <h1>Diary</h1>
        <img src=""></img>
        <button onClick={onAddNote}><img  className={styles.add}src={add} alt="add" ></img></button>

      </div>

      <div className={styles.appSidebarNotes}>
        {sortedNotes.map((note) => (
          <div
            className={`appSidebarNote ${note.id === activeNote && "active"}`} 
            onClick={() => setActiveNote(note.id)}
          >
            <div className={styles.activeBox}>
            <div className={styles.sidebarNoteTitle}>
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}><img  className={styles.del}src={bin} alt="bin"></img></button>
              
            </div>
            <small className={styles.noteMeta}>
              Last modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
