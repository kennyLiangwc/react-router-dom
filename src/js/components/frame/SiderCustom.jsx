import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from '../../common/menu';
import SiderMenu from './SiderMenu';

class SiderCustom extends Component {
	state = {
        openKey: '',
        selectedKey: ''
    };
	componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setMenuOpen(nextProps)
    }
 	setMenuOpen = props => {
        let { pathname } = props.location;
        let openKey = pathname.split("/")[2];
        this.setState({
            openKey: openKey,
            selectedKey: pathname
        });
    };
	handleClick(e) {
		this.setState({
			selectedKey: e.key,
			openKey: e.keyPath[1]
		})
	};
	menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
	render() {
		return (
			<SiderMenu
				menus={menu.getMenuByRightList("role")}
				theme="dark"
				mode="inline"
				onClick={this.handleClick.bind(this)}
				selectedKeys={[this.state.selectedKey]}
				openKeys={this.state.firstHide ? null : [this.state.openKey]}
				onOpenChange={this.openMenu}
			/>

		)
	}
}
export default withRouter(SiderCustom)