import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Backend from "../layout/Backend";
import Profile from "../Profile";
import Settings from "../Settings";
import Posts from "../Posts";
import Pages from "../Pages";
import Subscribers from "../Subscribers";
import CreatePost from "../CreatePost";
import Media from "../Media";

function Account() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    !user ? getUser() : null;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='dashboard' replace />} />
      <Route
        path='dashboard'
        element={
          <Backend>
            <Dashboard user={user} />
          </Backend>
        }></Route>
      <Route
        path='profile'
        element={
          <Backend>
            <Profile user={user} />
          </Backend>
        }></Route>
      <Route
        path='settings'
        element={
          <Backend>
            <Settings user={user} />
          </Backend>
        }></Route>
      <Route
        path='posts'
        element={
          <Backend>
            <Posts user={user} />
          </Backend>
        }></Route>
      <Route
        path='create-post'
        element={
          <Backend>
            <CreatePost user={user} />
          </Backend>
        }></Route>
      <Route
        path='pages'
        element={
          <Backend>
            <Pages user={user} />
          </Backend>
        }></Route>
      <Route
        path='subscribers'
        element={
          <Backend>
            <Subscribers user={user} />
          </Backend>
        }></Route>
      <Route
        path='media'
        element={
          <Backend>
            <Media user={user} />
          </Backend>
        }></Route>
    </Routes>
  );
}

export default Account;
