import React, { Component } from "react";
import client from "../../utils/client"
import { Table } from "antd"
const { Column } = Table;


export default class CodeList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "邀请码",
                dataIndex: "token",
                key: "token"
            },{
                title: "状态",
                dataIndex: "state",
                key: "state"
            },{
                title: "创建时间",
                dataIndex: "createAt"
            },{
                title: "操作",
                dataIndex: "action",
                key: "action",
                render: (text,record,index) => (
                    <a onClick={() => this.del(text,record,index)}>删除</a>
                )
            }
        ]
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        this.query()
    }
    onChange() {
        console.log("onChange")
    }
    query() {
        const query = `{
            queryInviteTokenList(roleId: null, page: {pageSize: 10, pageNumber: 1}) {
              token
              roleId
              roleName
              uid
              state
              createAt
              updateAt
              createUid
              updateUid
            }
          }`;
        client.post(query).then(data => {
            this.setState({
                list: data.queryInviteTokenList
            })
        })
    }
    del(text,record,index) {
        const { token } = record;
        const query = `mutation {
            delInviteToken(token: "${token}") {
              ret
            }
          }`;
        client.post(query).then(data => {
            this.query();
        })
    }
    render() {
        return(
            <div>
                <Table dataSource={this.state.list} columns={this.columns}>
                    
                </Table>
            </div>
        )
    }
}