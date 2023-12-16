import React, { useEffect, useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState("");
  const fetchNotes = async () => {
    const responce = await axios.get("http://localhost:8080/notes");
    setNotes(responce.data);
  };
  const download = (file) => {
    axios
      .get(`http://localhost:8080/notes/${file}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res, 'download');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:8080/notes", formData);
      console.log(res);
      fetchNotes();
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <input
        type="file"
        value={file?.filename}
        onChange={(e) => setFile(e.currentTarget.files[0])}
      />
      <button onClick={() => upload()}>upload</button>
      {notes.map((n) => (
        <div key={n.filename} onClick={() => download(n.filename)}>
          {n.filename}
        </div>
      ))}
    </>
  );
};
export default Notes;
