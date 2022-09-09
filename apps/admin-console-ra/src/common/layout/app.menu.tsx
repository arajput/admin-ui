import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LabelIcon from '@mui/icons-material/Label';

export const AppMenu = (props:any) => (
    <Menu {...props}>
        <DashboardMenuItem />
        <MenuItemLink to="/posts" primaryText="Posts" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />}/>
        <MenuItemLink to="/config/attendance" primaryText="Config - Attendance" leftIcon={<LabelIcon />}/>
        <MenuItemLink to="/config/worksheet" primaryText="Config - Worksheet" leftIcon={<LabelIcon />}/>

    </Menu>
);