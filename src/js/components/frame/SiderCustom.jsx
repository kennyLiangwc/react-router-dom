import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from '../../common/menu';
import SiderMenu from './SiderMenu';
import http from "../../../utils/http"

class SiderCustom extends Component {
	state = {
        openKey: '',
        selectedKey: '',
        rightList: []
    };
    queryMyMenus() {
        const query = `
            query queryMyMenus{
                queryMyMenus
            }
        `;
        http.post(query,{},false).then(data => {
            this.setState({
                rightList: data.queryMyMenus
            })
        })
    }
	componentDidMount() {
        this.setMenuOpen(this.props);
        this.queryMyMenus()
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
        const { rightList } = this.state;
		return (
			<SiderMenu
				menus={menu.getMenuByRightList("role",this.state.rightList)}
				theme="dark"
				mode="inline"
				onClick={this.handleClick.bind(this)}
				selectedKeys={[this.state.selectedKey]}
				openKeys={this.state.firstHide ? null : [this.state.openKey]}
                onOpenChange={this.openMenu}
                style={{minHeight: "820px"}}
			/>

		)
	}
}
export default withRouter(SiderCustom)