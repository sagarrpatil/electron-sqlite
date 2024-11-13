import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer, CssBaseline, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
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

const Header = (WrappedComponent) => {
  return function Layout(props) {
    const [leftOpen, setLeftOpen] = React.useState(true);
    const [rightOpen, setRightOpen] = React.useState(false);

    const toggleLeftDrawer = () => setLeftOpen(!leftOpen);
    const toggleRightDrawer = () => setRightOpen(!rightOpen);

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
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText sx={{color: "black"}} primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/enquiry">
              <ListItemIcon>
                <InquiryIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText sx={{color: "black"}}  primary="Enquiry" />
            </ListItem>
            <ListItem button component={Link} to="/trial">
              <ListItemIcon>
                <AirlineSeatReclineNormalIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Trial" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/AddMember">
              <ListItemIcon>
                <PersonAddAlt1Icon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Add Member" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/Renew">
              <ListItemIcon>
                <CloudSyncIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Renew" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/PersonalTrainner">
              <ListItemIcon>
                <FollowTheSignsIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Personal Trainner" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/OldReceipt">
              <ListItemIcon>
                <ReceiptIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Old Receipt" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/Balance">
              <ListItemIcon>
                <AccountBalanceWalletIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Balance" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/ActiveDeactive">
              <ListItemIcon>
                <CompareArrowsIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Active/Deactive" sx={{color: "black"}} />
            </ListItem>
            <ListItem button component={Link} to="/MemberInformation" sx={{color: "black"}} >
              <ListItemIcon>
                <Person3Icon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Member Information" />
            </ListItem>
            <ListItem button component={Link} to="/AutoSms" sx={{color: "black"}} >
              <ListItemIcon>
                <SmsIcon sx={{color: "black"}} />
              </ListItemIcon>
              <ListItemText primary="Auto Sms" />
            </ListItem>


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
