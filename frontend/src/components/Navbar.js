import clsx from 'clsx';
import React, { useMemo, forwardRef, useState } from 'react';
import { makeStyles, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Menu, IconButton, Divider, Badge, Drawer, List, MenuItem } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link as RouterLink } from 'react-router-dom';
import { ROOT, SCHEDULE } from './../navigation/CONSTANTS';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function ListItemLink (props) {
    const { icon, primary, to } = props;
    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    )

    return (
        <li>
            <ListItem button component={renderLink}>
                { icon ? <ListItemIcon>{ icon }</ListItemIcon> : null }
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    )
}

const mainList = [
    {
        icon: <DashboardIcon />,
        primary: 'DASHBOARD',
        to: ROOT
    },
    {
        icon: <ScheduleIcon />,
        primary: 'Schedule',
        to: SCHEDULE
    }
];

const secondaryList = [
    {
        
        icon: <ExitToAppIcon />,
        primary: 'Logout',
        to: ROOT
    }

]

export default function Navbar (props) {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const menuId = 'primary-account-menu';
    const renderMenu = <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        {/* TODO */}
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>;

return <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} >
            <Toolbar className={classes.toolbar}>
                <IconButton edge='start' color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)} >
                    <MenuIcon />
                </IconButton>
                <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title} >
                    Dashboard
                </Typography>
                <IconButton color='inherit'>
                    <Badge badgeContent={4} color='secondary'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color='inherit' edge='end' aria-label='account of current user' aria-haspopup={true} onClick={handleProfileMenuOpen} >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer variant='permanent' classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }} open={open} >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    mainList.map(item => <ListItemLink key={item.primary} to={item.to} icon={item.icon} primary={item.primary} />)
                }
            </List>
            <Divider />
            <List>
                {
                    secondaryList.map(item => <ListItemLink key={item.primary} to={item.to} icon={item.icon} primary={item.primary} />)
                }
            </List>
        </Drawer>
        { renderMenu }
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {props.children}
        </main>
    </div>
}