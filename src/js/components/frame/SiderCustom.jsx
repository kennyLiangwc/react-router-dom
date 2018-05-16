import React, { Component } from 'react';
import { Layout, Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from '../../common/menu';
import SiderMenu from './SiderMenu';
import http from "../../../utils/http"
import { setAuth } from "../../actions"
import { connect } from "react-redux"

class SiderCustom extends Component {
	state = {
        collapsed: false,
        openKey: '',
        selectedKey: ''
    }
	componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.toggleCollapsed(nextProps.collapsed);
        this.setMenuOpen(nextProps);
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
    toggleCollapsed = e => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
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
    getRightList() {

    }
	render() {
        const rightList = this.props.rightList;
		return (
            <div>
                <SiderMenu
                    menus={menu.getMenuByRightList("role",rightList)}
                    theme="light"
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                    style={{minHeight: "820px"}}
                />
            
            </div>
		)
	}
}


const mapStateToProps = state => {
    return {
        rightList: state.GetMyMenus
    }
}
export default connect(mapStateToProps)(withRouter(SiderCustom))