import React, { useEffect, useState } from 'react';
import { authFetch } from "./Auth";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from './Auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ColoredAvatar from './Util/ColoredAvatar';

const drawerWidth = 240;

const menu = [
  {
    path: 'Home',
    label: 'Home',
    icon: <HomeOutlinedIcon />,
    subMenu: []
  },
  {
    path: 'Research',
    label: 'Research',
    icon: <AssignmentOutlinedIcon />,
    subMenu: [
      {
        path: '',
        label: 'Latest Notes'
      },
      { path: 'AssetClass', label: 'By Asset Class' }
    ]
  },
  {
    path: 'Risk',
    label: 'Risk',
    icon: <TrendingUpOutlinedIcon />,
    subMenu: [
      { path: '', label: 'Performance' },
      { path: 'Data', label: 'Data' },
    ]
  },
  {
    path: 'Client',
    label: 'Client',
    icon: <PeopleOutlinedIcon />,
    subMenu: []
  },
  {
    path: 'Market',
    label: 'Market',
    icon: <InsertChartOutlinedSharpIcon />,
    subMenu: [
      { path: 'Equity', label: 'Equity' },
      { path: 'Currency', label: 'Currency' },
      { path: 'Cryptocurrency', label: 'Cryptocurrency' },
    ]
  },
  {
    path: 'Admin',
    label: 'Admin',
    icon: <SettingsOutlinedIcon />,
    subMenu: []
  }    
];

function Layout(props) {
  const { window } = props;

  const allClosed = new Array(menu.length).fill(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpened, setMenuOpened] = useState(allClosed);
  const [user, setUser] = useState();

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/user/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleMenu = (index) => {
    if (menuOpened[index]) {
      menuOpened[index] = false;
      setMenuOpened([...menuOpened]);
    }
    else {
      const status = [...allClosed];
      status[index] = true;
      setMenuOpened(status);
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menu.map((item, index) => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to={item.label} onClick={() => handleMenu(index)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.subMenu.length > 0 && (menuOpened[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            <Collapse in={menuOpened[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subMenu.map(subItem => (
                  <ListItemButton key={subItem.label} sx={{ pl: 4 }} component={NavLink} to={`${item.label}/${subItem.path}`}>
                    <ListItemIcon>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
        <Box display='flex' sx={{ flexGrow: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          </Box>          
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <ColoredAvatar name={user ? user.firstName + " " + user.lastName : "?"} />
            </IconButton>            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem component={NavLink} to="Profile">
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />                
              </MenuItem>
              <MenuItem onClick={() => logout()}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;