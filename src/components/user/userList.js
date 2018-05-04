import React, { Component } from "react"
import client from "../../utils/client"
import { Table } from "antd"
export default class UserList extends Component {
    state = {
        list: []
    }
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "头像",
                dataIndex: "portrait",
                render: (text,record) => (
                    <img src={record.portrait} style={{width: "50px"}}/>
                )
            },
            {
                title: "uid",
                dataIndex: "uid"
            },{
                title: "昵称",
                dataIndex: "nickname"
            },{
                title: "unionId",
                dataIndex: "unionId"
            }
        ]
    }
    componentWillMount() {
        this.query()
    }
    query() {
        const query = `{
            queryUserList(input: {nickname: "",  unionId: ""}, page: {pageSize: 10, pageNumber: 1}) {
              count
              list {
                uid
                unionId
                nickname
                portrait
              }
            }
          }`;
        client.post(query).then(data => {
            this.setState({
                list: data.queryUserList.list
            })
        })
    }
    render() {
        return(
            <div>
                <Table dataSource={this.state.list} columns={this.columns}></Table>
            </div>
        )
    }
}