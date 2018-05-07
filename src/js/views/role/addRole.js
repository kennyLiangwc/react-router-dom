import React, { Component } from "react";
import http from "../../../utils/http"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card, Form, Input, Button, message } from "antd"
import { withRouter } from "react-router-dom"
const FormItem = Form.Item;

const AddRoleForm = Form.create()(class addForm extends Component {
    constructor(props) {
        super(props)
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if(!err) {
                const query = `
                    mutation AddRole($input:RoleInput){
                        addRole(input:$input){
                            ret
                            msg
                        }
                    }
                `;
                http.post(query,{
                    input: {
                        name: value.name || "",
                        description: value.description || ""
                    }
                }).then(() => {
                    message.success("添加成功");
                    this.props.history.push("/app/role/roleList")
                })
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;
        return <div>
            <BreadcrumbCustom first={"新增角色"}/>
                <Card>
                    <Form
                        layout="inline"
                        onSubmit={this.handleSearch.bind(this)}
                    >
                        <FormItem
                            label="角色名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator("name")(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="描述"
                            {...formItemLayout}
                        >
                            {getFieldDecorator("description")(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                        >
                            <Button type="primary" htmlType="submit">新增</Button>
                        </FormItem>
                    </Form>
                </Card>
        </div> 
            
    }
})


export default withRouter(AddRoleForm)