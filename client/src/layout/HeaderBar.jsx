import React, { useState } from 'react';
import { Link } from 'react-router-dom'
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
import { Menu, Mail, MoveToInbox, Feed, People } from '@mui/icons-material';

const pages = [
  {
    title: "Feed",
    icon: <Feed />,
    to: "/feed"
  },
  {
    title: "User Manage",
    icon: <People />,
    to: "/user-manage"
  },
  {
    title: "Mail 1",
    icon: <Mail />,
    to: '#',
    activeTo:"/feed"
  },
  {
    title: "Mail 2",
    icon: <MoveToInbox />,
    to: '#',
    activeTo:"/user-manage"
  }
];

const HeaderBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleItemClick = (linkName) => {
    setActiveItem(linkName);
    console.log(linkName)
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
                sx={{color:'black'}}
                onClick={() => handleItemClick(page.activeTo??page.to)}
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
