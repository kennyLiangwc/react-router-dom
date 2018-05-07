import React, { Component } from "react";
import http from "../../../utils/http"
import { Table, Button, Modal, message, Input, Card, Popconfirm } from "antd"
import util from "../../../utils/util"
import InviteState from "../../common/enums/InviteState.js"
import { addTodo } from "../../actions";
import { connect } from "react-redux"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"

const { Column } = Table;
const confirm = Modal.confirm;
class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        this.query();
        this.props.dispatch(addTodo("1111111"))
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
    query(pageNumber = 1,pageSize = 10) {
        const query = `{
            queryInviteTokenList(roleId: null, page: {pageSize: ${pageSize}, pageNumber: ${pageNumber}}) {
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
        http.post(query).then(data => {
            this.page.total = data.queryInviteTokenList.count
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
                http.post(query).then(data => {
                    message.success("删除成功");
                    self.query();
                })
            }
        });
    }
    render() {
        const columns = [
            {
                title: "邀请码",
                dataIndex: "token",
                key: "token",
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.del(record, index)}>
                                <a>Delete</a>
                        </Popconfirm>
                        // <Button type="danger" onClick={() => this.del(text,record,index)} style={{marginRight: "4px"}}>删除</Button>
                        // <Button type="primary">复制</Button>
                    </div>
                )
            }
        ];
        const pagination = {
            total: this.page.total,
            current: this.page.pageNumber,
            pageSize: this.page.pageSize,
            showSizechanger: true,
            onShowSizeChange: (pageNumber,pageSize) => {
                this.page.pageNumber = pageNumber;
                this.page.pageSize = pageSize;
                this.query(pageNumber,pageSize)
            },
            onChange: (current) => {
                this.page.pageNumber = current;
                this.query(current)
            }
        }
        return(
            <div>
                <BreadcrumbCustom first={"邀请码列表"}/>
                <Card>
                    <Table dataSource={this.state.list} columns={columns} style={{width: "90%", marginLeft: "2%"}} pagination={pagination}>
                    
                    </Table>
                </Card>
                
            </div>
        )
    }
}
export default connect()(CodeList)