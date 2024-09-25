import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./Pages/Auth/";
import Dashboard from "./Pages/adminPanel/Dashboard"
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "./store/authSlice";
import { useEffect } from "react";
import Friends from "./Pages/friends/Friends";
import Notifications from "./Pages/notifications/Notifications";
import Profile from "./Pages/profile/Profile";



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);


  return (
    <div className="flex flex-col overflow-hidden bg-white justify-center  items-center ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
};

export default App;
