import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from './common/menu';
import SiderMenu from './SiderMenu';

class SiderCustom extends Component {
	construtor(props) {
		//super(props);
		this.state = {
			selectedKey: "",
			openKey: ""
		}
	}
	componentDidMount() {

	}
	handleClick(e) {
		console.log('ee',e);
		//let m = require("bundle-loader!./common/menu");
		//console.log('mmmmm',m)
		this.setState({
			selectedKey: e.key
		})
	};
	setMenuOpen = props => {
        const { pathname } = props.location;
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        });
    };
	render() {
		return (
			<SiderMenu
				menus={menu}
				theme="dark"
				mode="inline"
				onClick={this.handleClick}
				selectedKeys={[this.state.selectedKey]}
			/>

		)
	}
}
export default SiderCustom