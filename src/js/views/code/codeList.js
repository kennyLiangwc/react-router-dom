import React, { Component } from "react";
import http from "../../../utils/http"
import { Table, Button, message, Input, Card, Popconfirm, Form, Select } from "antd"
import util from "../../../utils/util"
import InviteState from "../../common/enums/InviteState.js"
import { addTodo } from "../../actions";
import { connect } from "react-redux"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import role from "../../common/role/role"

const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

const CodeForm = Form.create()(class SearchCodeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList: []
        }
        role.getRoleList().then(data => {
            this.setState({
                roleList: data
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err) {
                console.log("value",values.role)
                this.props.query(values.role)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form
            layout="inline" 
            onSubmit={this.handleSubmit}
            >
                <FormItem
                    label="角色名称"
                >
                    {getFieldDecorator('role')(
                        <Select
                        style={{ width: 200 }}
                        placeholder="请选择一个角色"
                        >
                            {
                                this.state.roleList.map((v,index) => (
                                    <Option key={index} value={v.id}>{v.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" >搜索</Button>
                </FormItem>  
            </Form>
        )
    }
})
class CodeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            roleId: null
        }
    }
    componentWillMount() {
        this.pageQuery();
        this.props.dispatch(addTodo("1111111"))
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
    }
    pageQuery() {
        const { pageNumber, pageSize } = this.page;
        const query = `
            query QueryInviteTokenList($roleId:Int,$page:PageInput){
                queryInviteTokenList(roleId:$roleId,page:$page){
                    count
                    list{
                        token
                        roleName
                        state
                        createAt
                    }
                }
            }
        `;
        http.post(query,{
            roleId: this.params,
            page: {
                pageSize: pageSize,
                pageNumber: pageNumber
            }
        }).then(data => {
            this.page.total = data.queryInviteTokenList.count
            this.setState({
                list: data.queryInviteTokenList.list
            })
        })
    }
    del(record) {
        const query = `mutation {
            delInviteToken(token: "${record.token}") {
                ret
            }
        }`;
        http.post(query).then(data => {
            message.success("删除成功");
            this.pageQuery();
        })
    }
    params = null;
    query = (params) => {
        this.params = params == "" ? null : params;
        this.pageQuery()
    }
    render() {
        const columns = [
            {
                title: "邀请码",
                dataIndex: "token",
                key: "token",
            },{
                title: "绑定角色",
                dataIndex: "roleName"
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
                        <Popconfirm title="确定要删除吗?" onConfirm={() => this.del(record)}>
                                <a className="red">删除</a>
                        </Popconfirm>
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
                this.pageQuery()
            },
            onChange: (current) => {
                this.page.pageNumber = current;
                this.pageQuery(current)
            }
        }
        return(
            <div>
                <BreadcrumbCustom first={"邀请码列表"}/>
                <Card>
                    <CodeForm query={this.query.bind(this)}/>
                    <Table rowKey="id" dataSource={this.state.list} columns={columns} pagination={pagination}>
                    
                    </Table>
                </Card>
                
            </div>
        )
    }
}
export default connect()(CodeList)