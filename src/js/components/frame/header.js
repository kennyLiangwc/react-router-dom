import React, { Component } from "react";
import http from "../../../utils/http.js"
import { Col, message, Icon, Layout } from "antd"
import { connect } from "react-redux"
import { addUserInfo, getRoleList, setAuth, myMenus } from "../../actions/index"
import { withRouter } from "react-router-dom"
import menu from "../../common/menu"
const { Header } = Layout;
class Header1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            nickImg: ""
        }
    }
    queryUserInfo() {
        const query = `
            query getMyUserData{
                getMyUserData{
                    userInfo{
                        uid
                        unionId
                        nickname
                        portrait
                    }
                    menus
                    isBindInviteToken
                }
            }
        `;
        http.post(query,{},false).then(data => {
            let isBind = data.getMyUserData.isBindInviteToken;
            if(!isBind) {
                message.info("请绑定邀请码");
                this.props.history.push("/bindInvite");
                return <div/>
            }
            this.setState({
                nickname: data.getMyUserData.userInfo.nickname,
                nickImg: data.getMyUserData.userInfo.portrait
            });
            let myMenusList = data.getMyUserData.menus;
            this.props.dispatch(addUserInfo(data.getMyUserData.userInfo));  //存储个人信息
            this.props.dispatch(myMenus(myMenusList));        //存储菜单
            this.props.dispatch(setAuth(menu.containList,myMenusList))    //设置权限
        });
    }
    componentWillMount() {
        this.queryUserInfo();
        this.props.dispatch(getRoleList());     //拉取角色列表
    }
    render() {
        return(
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <Col span={1}>
                    <Icon
                        className="trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                </Col>
                
                <Col span={4}>
                    <span style={{fontSize: "20px"}}>管理平台</span>
                </Col>
                <Col span={4} offset={14}>
                    <span>欢迎回来：</span>
                    <span>{this.state.nickname}</span>
                    <span><img alt="" src={this.state.nickImg} style={{width: "40px", borderRadius: "40px", marginLeft: "6px"}}/></span>
                </Col>
            </Header>
        )
    }
};

export default connect()(withRouter(Header1))