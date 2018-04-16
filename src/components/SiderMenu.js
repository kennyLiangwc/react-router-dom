import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem =  (
	({id,text,path,contain,...props}) => 
		<Menu.Item
			key={id || text}
			{...props}

		>
			<Link to={path}>{text}</Link>
		</Menu.Item>
)

const renderSubMenu = (
	({text,icon,children,...props}) => 
		<Menu.SubMenu 
			key={text}
			{...props}
			title={text}
		>
		{ children.map(item => renderMenuItem(item)) }
		</Menu.SubMenu>
)

export default ({menus,...props}) => <Menu {...props}>
	{
		menus.map(item => renderSubMenu(item))
	}
</Menu>