import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

// Layout
import HeaderBar from "./layout/HeaderBar";

//Page
import Notfound404 from "./components/page/Notfound404";
import Login from './components/page/auth/Login';
import UserManage from "./components/page/user/UserManage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound404 text="Page Not Found" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-manage" element={<UserManage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
