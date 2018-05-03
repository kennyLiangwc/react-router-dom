import React, { Component } from "react";
import client from "../utils/client"
import { Row, Col } from "antd"


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            nickImg: ""
        }
    }
    componentWillMount() {
        const query = `{
            getMyUserData {
              userInfo{
                uid
                unionId
                portrait
                nickname
              }
              isBindInviteToken
              menus
            }
          }`;
        client.post(query).then(data => {
            this.setState({
                nickname: data.getMyUserData.userInfo.nickname,
                nickImg: data.getMyUserData.userInfo.portrait
            })
        })
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
                    <span><img src={this.state.nickImg} style={{width: "50px", borderRadius: "50px", marginLeft: "6px"}}/></span>
                </Col>
            </div>
        )
    }
} 