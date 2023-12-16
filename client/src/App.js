import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ResourceLink from "./components/Resource-Link/ResourceLink";
import Notes from "./components/Notes/Notes";
import Diary from "./components/Diary/Diary";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && (
        <Route path="/" element={<Main />}>
          <Route path="notes" element={<Notes />} />
          <Route path="resource-link" element={<ResourceLink />} />
          <Route path="diary" element={<Diary />} />
        </Route>
      )}
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
