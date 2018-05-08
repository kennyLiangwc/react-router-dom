import React, { Component } from "react";
import { Link } from "react-router-dom"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card, Form, Input, Button, message, Popconfirm, Checkbox } from "antd"
import http from "../../../utils/http"
import util from "../../../utils/util"
import menu from "../../common/menu"
// import { withRouter } from "react-router-dom"

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const editRole = util.data("editRole");

console.log("getRoleCheckList",menu.getRoleCheckList())
const EditRoleForm = Form.create()(class RoleForm extends Component {
    handleUpdate = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err) {
                this.props.updateRole(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { description, name } = editRole;
        return(
            <Form
            layout="inline"
            >
                <FormItem
                label="角色名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '角色名不能为空'}],
                    initialValue: name})(
                        <Input />  
                    )}
                </FormItem>
                <FormItem
                label="描述"
                >
                    {getFieldDecorator('description', {initialValue: description})(
                        <Input />  
                    )}
                </FormItem>
                <FormItem>
                    <Popconfirm title="确定要删除吗?" onConfirm={this.handleUpdate} okText="确定" cancelText="取消">
                        <a className="blue">修改</a>
                    </Popconfirm>
                </FormItem>
            </Form>
        )
    }
})

export default class EditRole extends Component {
    constructor(props) {
        super(props);
        let id = this.props.computedMatch.params.id;
        if(!id) {
            message.error("参数错误");
            window.history.back();
            return <div />
        }
        this.state = {
            id: id,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        }
    }
    componentWillMount() {
        this.queryRoleMenus()
    }
    updateRole(values) {
        console.log("values",values)
        const query = `
            mutation UpdateRole($id:ID!,$input:RoleInput){
                updateRole(id:$id,input:$input){
                    ret
                    msg
                }
            }
        `;
        http.post(query,{
            id: this.state.id,
            input: {
                name: values.name,
                description: values.description
            }
        }).then(() => {
            message.success("修改成功");
            Object.assign(editRole,{
                name: values.name,
                description: values.description
            })
            util.data("editRole",editRole)
        })
    }
    queryRoleMenus() {
        const query = `
            query queryRoleMenus($id:ID!) {
                queryRoleMenus(id:$id)
            }
        `;
        http.post(query,{
            id: this.state.id
        }).then(data => {
            console.log(data)
        })
    }
    onCheckAllChange = (e) => {
        console.log(e.target.checked)
        this.setState({
            checkAll: e.target.checked
        })
    }
    selectedMap = {}
    isSelected (path) {
        return !!this.selectedMap[path]
    }
    select (path) {
        this.selectedMap[path] = !this.selectedMap[path];
    }
    render() {
        const tempList = [
            {value: 1,label: 1},
            {value: 2,label: 2},
            {value: 3,label: 3},
            {value: 4,label: 4}
        ]
        return(
            <div>
                <BreadcrumbCustom first={"角色列表"} second="修改角色" firstLink="/app/role/roleList"/>
                <Card>
                    <EditRoleForm updateRole={this.updateRole.bind(this)}/>
                    {/* This is EdirRole, id is <span className="animated fadeInRight">11111111</span>  {this.state.id} */}
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            Check all
                        </Checkbox>
                    </div>
                    {/* <span className="ant-checkbox"><input type="checkbox" class="ant-checkbox-inner"/></span> */}
                    {/* <CheckboxGroup options={tempList} value={tempList.value}></CheckboxGroup> */}
                    {/* <Checkbox checked={}></Checkbox>     */}
                    {
                        tempList.map((v,index) => (
                            <Checkbox value={v.value} key={index}>{v.label}</Checkbox>
                        ))
                    }
                </Card>
                
            </div>
        )
    }
}
