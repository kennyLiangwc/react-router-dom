import React, { Component } from "react";
import http from "../../../utils/http.js"
import { Col, message } from "antd"
import { connect } from "react-redux"
import { addUserInfo, getRoleList, setAuth, myMenus } from "../../actions/index"
import { withRouter } from "react-router-dom"
import menu from "../../common/menu"

class Header extends Component {
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
            <div>
                <Col span={4}>
                    <span style={{fontSize: "20px"}}>管理平台</span>
                </Col>
                <Col span={4} offset={16}>
                    <span>欢迎回来：</span>
                    <span>{this.state.nickname}</span>
                    <span><img alt="" src={this.state.nickImg} style={{width: "40px", borderRadius: "40px", marginLeft: "6px"}}/></span>
                </Col>
            </div>
        )
    }
};

export default connect()(withRouter(Header))