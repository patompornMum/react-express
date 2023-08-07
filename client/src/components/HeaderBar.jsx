import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from '@mui/material';
import { Menu, Mail, MoveToInbox, Feed, People, Logout } from '@mui/icons-material';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';

const pages = [
  {
    title: "Feed",
    icon: <Feed />,
    to: "/feed",
  },
  {
    title: "User Manage",
    icon: <People />,
    to: "/user-manage",
    role: "admin"
  },
  {
    title: 'Logout',
    icon: <Logout />,
    to: '#'
  },
  // {
  //   title: "Mail 1",
  //   icon: <Mail />,
  //   to: '#',
  //   activeTo:"/feed"
  // },
  // {
  //   title: "Mail 2",
  //   icon: <MoveToInbox />,
  //   to: '#',
  //   activeTo:"/user-manage"
  // }
];

const HeaderBar = () => {

  const location = useLocation();
  useEffect(() => {
    let pathName = location.pathname;
    if(pathName.startsWith('/feed')){
      pathName = '/feed'
    }
    setActiveItem(pathName)
  }, [location]);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));
  const roleUser = user.info.role ?? null;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleItemClick = (linkName) => {
    setActiveItem(linkName);
    console.log(linkName)
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {pages.map((page, index) => (
              <ListItem
                key={index}
                disablePadding
                component={Link}
                to={page.to}
                sx={{
                  color: 'black',
                  display: (page.role && roleUser != page.role) ? 'none' : ''
                }}
                // onClick={() => handleItemClick(page.activeTo??page.to)}
                onClick={() => {
                  page.title == 'Logout'
                    ? handleLogoutClick()
                    : handleItemClick(page.to)
                }}
              >
                <ListItemButton selected={activeItem === page.to}>
                  <ListItemIcon>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* ข้อมูลเพิ่มเติมให้ใส่ที่นี่ */}
    </>
  );
};

export default HeaderBar;
