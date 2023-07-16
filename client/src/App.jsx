import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

// Components
import HeaderBar from "./components/HeaderBar";

//Page
import Notfound404 from "./components/page/Notfound404";
import Login from './components/page/auth/Login';
import Register from "./components/page/auth/Register";
import UserManage from "./components/page/user/UserManage";
import Feed from './components/page/feed/Feed';

//Layouts
import MainLayout from "./layouts/MainLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound404 text="Page Not Found" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/user-manage" element={<UserManage />} />
        </Route>

        //ของจารสามิตร์
        {/* <Route element={<ProtectedRoute><BackendLayout /></ProtectedRoute>}>
          <Route path={DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={PRODUCT_PATH} element={<Product />} />
        </Route> */}

      </Routes>

    </BrowserRouter>
  )
}

export default App
