import { useState } from 'react';
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

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  
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
        {path: 'Research',
        label: 'Latest Notes'},
        {path: 'Research',label: 'By Asset Class'}
      ]
    },
    {
      path: 'Performance',
      label: 'Performance',
      icon: <TrendingUpOutlinedIcon />,
      subMenu: [{path: 'Performance', label: 'Testing'}]
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
        {path: 'Market', label: 'Public Equity'},
        {path: 'Market', label: 'Currency'},
        {path: 'Market', label: 'Cryptocurrency'},
      ]
    }
  ];

  const allClosed = new Array(menu.length).fill(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpened, setMenuOpened] = useState(allClosed);

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
          <>
            <ListItem key={item.label} disablePadding>
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
                  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={item.path}>
                    <ListItemIcon>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Divider />
      <List>
      <ListItem key='Admin' disablePadding>
          <ListItemButton component={NavLink} to="Admin">
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Admin' />
          </ListItemButton>
        </ListItem>
        <ListItem key='Profile' disablePadding>
          <ListItemButton component={NavLink} to="Profile">
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItemButton>
        </ListItem>
        <ListItem key='Logout' disablePadding>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
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