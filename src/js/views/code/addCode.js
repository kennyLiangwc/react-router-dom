import React, { Component } from "react";
import { Form, Input, Button, message, Modal, Select, Card } from "antd"
import http from "../../../utils/http"
import { withRouter } from "react-router-dom"
import role from "../../common/role/role"
// import createHashHistory from 'history/createBrowserHistory'
// const history = createHashHistory()
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class AddCode extends Component {
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const self = this;
                confirm({
                    title: '你确定要创建邀请码吗?',
                    onOk() {
                            const query = `
                                query createInviteTokens($input:CreateInviteInput){
                                    createInviteTokens(input:$input)
                                }
                            `;
                            http.post(query,{
                                input: {
                                    num: values.num,
                                    roleId: values.role
                                }
                            }).then(() => {
                            message.success("创建成功");
                            self.props.history.push("/app/code/codeList")
                        })
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        return(
            <div>
                <BreadcrumbCustom first="新增邀请码"/>
                <Card>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem
                            label="邀请码个数"
                        >
                            {getFieldDecorator('num', {
                                rules: [{ required: true, message: '请输入正确的数字'}],
                            })(
                                <Input  placeholder="请输入邀请码个数" type="number"/>
                            )}
                        </FormItem>
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
                            <Button type="primary" htmlType="submit" >创建</Button>
                        </FormItem>    
                    </Form>
                </Card>
            </div>
        )
    }
}
const AddCodeForm = Form.create()(AddCode);
export default withRouter(AddCodeForm)