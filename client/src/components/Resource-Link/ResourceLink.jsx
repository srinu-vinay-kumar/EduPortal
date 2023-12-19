import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

export default function ResourceLink() {
  const [rsLinks, setRsLinks] = useState([]);
  const [newLink, setNewLink] = useState({
    name: "",
    url: "",
  });
  const fetchLinks = async () => {
    const { data } = await axios.get("http://localhost:8080/resource-link");
    setRsLinks(data);
  };
  const upload = async () => {
    const { data } = await axios.post("http://localhost:8080/resource-link", {
      name: newLink.name,
      url: newLink.url,
    });
    fetchLinks();
  };
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className={styles.bgimg}>
      <div className={styles.Lmain}>
        <input
          className={styles.inputRL}
          placeholder="Enter Title"
          type="text"
          value={newLink.name}
          onChange={(e) =>
            setNewLink({ ...newLink, name: e.currentTarget.value })
          }
        />
        <br></br>
        <input
          className={styles.inputRL}
          placeholder="Paste url here"
          type="url"
          value={newLink.url}
          onChange={(e) =>
            setNewLink({ ...newLink, url: e.currentTarget.value })
          }
        ></input>
        <br />
        <button className={styles.Uploadbtn} onClick={() => upload()}>
          Submit
        </button>
        {rsLinks.map((link) => (
          <div key={link.url}>
            <div>{link.name}</div>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
