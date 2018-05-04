import React, { Component } from "react";
import client from "../../utils/client"
import { Table, Button, Modal, message, Input } from "antd"
import util from "../../utils/util"
import InviteState from "../../common/InviteState"
const { Column } = Table;
const confirm = Modal.confirm;


export default class CodeList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "邀请码",
                dataIndex: "token",
                key: "token",
                // render: (text,record) => (
                //     <Input value={record.token} style={{borderWidth: 0}} />
                // )
            },{
                title: "状态",
                dataIndex: "state",
                key: "state",
                render: (text,record) => (
                    InviteState.getLabel(record.state)
                )
            },{
                title: "创建时间",
                dataIndex: "createAt",
                render: (text,record,index) => (
                    util.getDataFromTime(record.createAt)
                )
            },{
                title: "操作",
                dataIndex: "action",
                key: "action",
                render: (text,record,index) => (
                    <div>
                        <Button type="danger" onClick={() => this.del(text,record,index)} style={{marginRight: "4px"}}>删除</Button>
                        <Button type="primary">复制</Button>
                    </div>
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
              count
              list {
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
            }
          }`;
        client.post(query).then(data => {
            this.setState({
                list: data.queryInviteTokenList.list
            })
        })
    }
    del(text,record,index) {
        const self = this;
        confirm({
            title: '你确定要删除该邀请码吗?',
            onOk() {
                const { token } = record;
                const query = `mutation {
                    delInviteToken(token: "${token}") {
                        ret
                    }
                }`;
                // const query = `mutation {
                //     delInviteToken($token: token!) {
                //         delInviteToken(token: $token)
                //     }
                // }`;
                client.post(query).then(data => {
                    message.success("删除成功");
                    self.query();
                })
            }
        });
    }
    render() {
        return(
            <div>
                <div style={{margin: "12px 0",borderBottom: "1px solid #1890ff",width: "100px"}}>邀请码列表</div>
                <Table dataSource={this.state.list} columns={this.columns} style={{width: "90%", marginLeft: "2%"}}>
                    
                </Table>
            </div>
        )
    }
}