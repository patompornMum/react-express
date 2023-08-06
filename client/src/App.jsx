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

//Protect Route
import { CheckAuth } from './router/CheckAuth';

//Layouts
import MainLayout from "./layouts/MainLayout";
import NewFeed from "./components/page/feed/NewFeed";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound404 text="Page Not Found" />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        //Route Admin
        <Route
          element={<CheckAuth redirectPath='/login' role='admin'><MainLayout /></CheckAuth>}
        >
          <Route path="/user-manage" element={<UserManage />} />
        </Route>


        //Route User
        <Route
          element={<CheckAuth redirectPath='/login' role='user'><MainLayout /></CheckAuth>}
        >
          <Route path="/feed" element={<Feed />} />
          <Route path="/new-feed" element={<NewFeed/>}/>
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
