import React, { useEffect, useState } from "react";
import "./styles.module.css";
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
    <div>
    <input type="text" value={newLink.name} onChange={(e) => setNewLink({...newLink, name: e.currentTarget.value})}/><br></br>
      <input
        type="url"
        value={newLink.url}
        onChange={(e) => setNewLink({ ...newLink, url: e.currentTarget.value})}
      ></input>
      <br/>
      <button onClick={() => upload()}>upload</button>
      {rsLinks.map((link) => (
        <div key={link.url}>
          <div>{link.name}</div>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.url}
          </a>
        </div>
      ))}
    </div>
  );
}
