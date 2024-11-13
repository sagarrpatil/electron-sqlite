import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, CssBaseline, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InquiryIcon from '@mui/icons-material/ContactMail';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Person3Icon from '@mui/icons-material/Person3';
import SmsIcon from '@mui/icons-material/Sms';

const drawerWidth = 200;
const menuItems = [
  { to: "/dashboard", icon: <DashboardIcon sx={{color: "black"}} />, text: "Dashboard" },
  { to: "/enquiry", icon: <InquiryIcon sx={{color: "black"}} />, text: "Enquiry" },
  { to: "/trial", icon: <AirlineSeatReclineNormalIcon sx={{color: "black"}} />, text: "Trial" },
  { to: "/AddMember", icon: <PersonAddAlt1Icon sx={{color: "black"}} />, text: "Add Member" },
  { to: "/Renew", icon: <CloudSyncIcon sx={{color: "black"}} />, text: "Renew" },
  { to: "/PersonalTrainner", icon: <FollowTheSignsIcon sx={{color: "black"}} />, text: "Personal Trainer" },
  { to: "/OldReceipt", icon: <ReceiptIcon sx={{color: "black"}} />, text: "Old Receipt" },
  { to: "/Balance", icon: <AccountBalanceWalletIcon sx={{color: "black"}} />, text: "Balance" },
  { to: "/ActiveDeactive", icon: <CompareArrowsIcon sx={{color: "black"}} />, text: "Active/Deactive" },
  { to: "/MemberInformation", icon: <Person3Icon sx={{color: "black"}} />, text: "Member Information" },
  { to: "/AutoSms", icon: <SmsIcon sx={{color: "black"}} />, text: "Auto Sms" }
];
const Header = (WrappedComponent) => {
  return function Layout(props) {
    const [leftOpen, setLeftOpen] = React.useState(true);
    const [rightOpen, setRightOpen] = React.useState(false);
    const navigate = useNavigate();
    const toggleLeftDrawer = () => setLeftOpen(!leftOpen);
    const toggleRightDrawer = () => setRightOpen(!rightOpen);

    useEffect(() => {
      if(!localStorage.getItem("loggedinUser")){
        navigate("/")
      }
    }, [])

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Header */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height:54, background:"#ab4400" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleLeftDrawer} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <h4 style={{padding:0}}>Dashboard</h4>
          </Toolbar>
        </AppBar>

        {/* Left Sidebar */}
        <Drawer  variant="persistent" open={leftOpen}  sx={{
            width: leftOpen ? drawerWidth : 0,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              transition: 'width 0.3s',
              boxSizing: 'border-box',
            },
          }}>
          <Toolbar />
          <List>
            {menuItems.map((item, index) => (
              <ListItem button component={Link} to={item.to} key={index}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{color: "black"}} primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            mt: 2,
            pt:4,
            transition: 'margin 0.3s',
            // marginLeft: leftOpen ? `${drawerWidth}px` : '0px',
            marginRight: rightOpen ? `${drawerWidth}px` : '0px',
          }}
        >
          <WrappedComponent {...props} />
        </Box>

        {/* Right Sidebar in close mode */}
        <Drawer variant="permanent" anchor="right" open={rightOpen} sx={{
          width: rightOpen ? drawerWidth : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: rightOpen ? drawerWidth : 0, transition: 'width 0.3s' },
        }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={toggleRightDrawer}>
              {rightOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
          {rightOpen && <div>Right Sidebar Content</div>}
        </Drawer>
      </Box>
    );
  };
};

export default Header;



