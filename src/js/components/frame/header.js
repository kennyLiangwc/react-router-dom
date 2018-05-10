import React, { Component } from "react";
import http from "../../../utils/http.js"
import { Col } from "antd"
import { connect } from "react-redux"
import { addUserInfo, getRoleList, setAuth } from "../../actions/index"

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
            this.setState({
                nickname: data.getMyUserData.userInfo.nickname,
                nickImg: data.getMyUserData.userInfo.portrait
            });
            this.props.dispatch(addUserInfo(data.getMyUserData.userInfo))
        });
        this.props.dispatch(getRoleList());
    }
    componentWillMount() {
        this.props.dispatch(addUserInfo({
            id: 2,
            name: "name"
        }));
        let menuList = [
            {
                path: "/app/role/userList1",
                name: "查询用户列表",
                permissionName: "queryUserList1"
            },
            {
                path: "/app/role/userList2",
                name: "查询用户列表",
                permissionName: "queryUserList2"
            },
            {
                path: "/app/role/userList4",
                name: "查询用户列表",
                permissionName: "queryUserList4"
            }
        ];
        let roleList = ["/app/role/userList1","/app/role/userList2","/app/role/userList3"]
        this.props.dispatch(setAuth(menuList,roleList))
        this.queryUserInfo();
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

export default connect()(Header)