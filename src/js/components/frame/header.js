import React, { Component } from "react";
import http from "../../../utils/http.js"
import { Row, Col } from "antd"
import { connect } from "react-redux"
import { addUserInfo } from "../../actions/index"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            nickImg: ""
        }
    }
    componentWillMount() {
        this.props.dispatch(addUserInfo({
            id: 2,
            name: "name"
        }))
        const query = `
            {
                getMyUserData{
                    userInfo{
                        uid
                        unionId
                        nickname
                        portrait
                    }
                }
            }
        `;
        // const query = `
        //     query getMyUserData{
        //             userInfo{
        //                 uid
        //                 unionId
        //                 nickname
        //                 portrait
        //             }
        //         }
        // `;
        http.post(query).then(data => {
            this.setState({
                nickname: data.getMyUserData.userInfo.nickname,
                nickImg: data.getMyUserData.userInfo.portrait
            });
            this.props.dispatch(addUserInfo(data.getMyUserData.userInfo))
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
};

export default connect()(Header)