import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slice/userSlice";
import { useEffect } from "react";
import OtherProfile from "./pages/OtherProfile";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing"
import axios from "axios";
import { baseUrl } from "./utils/config";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const keepLogin =async () => {
    const token = localStorage.getItem("saucemed_app");
    const user = JSON.parse(token);
    const {data} = await axios.get(baseUrl + "/users/keeplogin",{
      headers:{
        "Authorization": 'Bearer ' + user.token
      }
    })
    console.log(data.data);
    if (data) {
      dispatch(loginAction(data.data));
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        
       {user.id ? <Route element={<Profile />} path="/profile" /> : null}
        
        <Route element={<Landing />} path="/" />
        <Route element={<NotFound />} path="*" />
        <Route element={<OtherProfile />} path="/profile/:id" />
      </Routes>
    </>
  );
}

export default App;
