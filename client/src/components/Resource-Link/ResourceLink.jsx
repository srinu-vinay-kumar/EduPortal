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
    console.log(data);
  };
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div>
      <input
        type="url"
        value={newLink.url}
        onChange={(e) => setNewLink(e.currentTarget.value)}
      ></input>
      <button onClick={() => upload()}>upload</button>
      {rsLinks.map((link) => (
        <div key={link.url}>
          <div>link.name</div>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.url}
          </a>
        </div>
      ))}
    </div>
  );
}
