import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//Page
import Notfound404 from "./components/page/Notfound404";
import Login from './components/page/auth/Login';
import Register from "./components/page/auth/Register";
import Feed from './components/page/feed/Feed';
import NewFeed from "./components/page/feed/NewFeed";
import UserManage from "./components/page/user/UserManage";

//Protect Route
import { CheckAuth } from './router/CheckAuth';

//Layouts
import UpdateFeed from "./components/page/feed/EditFeed";
import MainLayout from "./layouts/MainLayout";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'light'
    },
  });

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
            <Route path="/feed/new" element={<NewFeed />} />
            <Route path="/feed/edit/:id" element={<UpdateFeed />} />
          </Route>

        //ของจารสามิตร์
          {/* <Route element={<ProtectedRoute><BackendLayout /></ProtectedRoute>}>
          <Route path={DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={PRODUCT_PATH} element={<Product />} />
        </Route> */}

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
