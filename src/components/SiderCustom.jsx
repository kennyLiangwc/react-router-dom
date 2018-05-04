import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from './common/menu';
import SiderMenu from './SiderMenu';

class SiderCustom extends Component {
	// constructor(props) {
	// 	super(props);
		
	// }
	state = {
		selectedKey: "",
		openKey: ""
	}
	componentDidMount() {
		this.setMenuOpen()
	}
	handleClick(e) {
		// console.log('ee',e);
		this.setState({
			selectedKey: e.key,
			openKey: e.keyPath[1]
		})
	};
	setMenuOpen = props => {
		// console.log(this.state,this.props);
		const { pathname } = this.props.location;
        this.setState({
            openKey: pathname.split("/")[2],
            selectedKey: pathname
        });
	};
	changeMenu = e => {
		console.log("e",e)
	}
	render() {
		return (
			<SiderMenu
				menus={menu.getMenuByRightList("role")}
				theme="light"
				mode="inline"
				onClick={this.handleClick.bind(this)}
				selectedKeys={[this.state.selectedKey]}
				openKeys={["role","code","user"]}
				onOpenChange={this.changeMenu}
				
			/>

		)
	}
}
export default withRouter(SiderCustom)