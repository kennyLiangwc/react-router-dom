import React, { Component } from "react";
import { Alert, Form , Input, Button, Table, Card, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import permission from "../../../utils/permission"
import util from "../../../utils/util"
import http from "../../../utils/http"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx"

const FormItem = Form.Item;

class RoleList extends Component {
    state = {
        list: []
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.query()
    }
    query(pageNumber = 1,pageSize = 10) {
        const query = `
            query QueryRoleList($input:RoleInput){
                queryRoleList(input:$input){
                    name
                    id
                    description
                    createAt
                    updateAt
                }
            }
        `;
        const input = {};
        http.post(query,{
            input: input
        }).then(data => {
            this.setState({
                list: data.queryRoleList
            })
        })
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 10
    }
    delRole(id) {
        const query = `mutation DelRole($id:ID!){
            delRole(id:$id){
                ret
            }
        }`;
        http.post(query,{
            id: id
        }).then(() => {
            message.success("删除成功");
            this.query()
        })
    }
    toEditRole(item) {
        util.data("editRole",item);
        this.props.history.push(`/app/role/editRole/${item.id}`)
    }
    render() {
        const columns = [
            {
                title: "角色名称",
                dataIndex: "name"
            },
            {
                title: "描述",
                dataIndex: "description"
            },
            {
                title: "创建时间",
                dataIndex: "createAt",
                render: (text,record) => (
                    util.getDataFromTime(record.createAt)
                )
            },
            {
                title: "修改时间",
                dataIndex: "updateAt",
                render: (text,record) => (
                    util.getDataFromTime(record.updateAt)
                )
            },
            {
                title: "操作",
                dataIndex: "id",
                render: (text,record) =>(
                    <div>
                        <Button onClick={() => this.delRole(record.id)} type="danger" style={{marginRight: "8px"}}>删除</Button>
                        <Button type="primary" onClick={() => this.toEditRole(record)}>修改</Button>
                    </div>
                )
            }
        ];
        const pagination = {
            current: this.page.pageNumber,
            pageSize: this.pageSize,
            total: this.page.total,
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
        return (
            <div>
                <BreadcrumbCustom first={"角色列表"}/>
                <Card>
                    <Table columns={columns} dataSource={this.state.list}></Table>
                </Card>
            </div>
        )
    }
}
export default withRouter(RoleList)