import React, { Component } from "react";
import { Form, Input, Button, message, Modal, Select } from "antd"
import http from "../../../utils/http"
import { withRouter } from "react-router-dom"
import role from "../../common/role/role"
// import createHashHistory from 'history/createBrowserHistory'
// const history = createHashHistory()

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class AddCode extends Component {
    // roleList = [];
    constructor(props,context) {
        super(props,context);
        this.state = {
            roleList: []
        }
        role.getRoleList().then(data => {
            this.setState({
                roleList: data
            })
        })
        console.log("state",this.state)
    }
    componentDidMount() {
        console.log("props",this)
        // this.props.form.validateFields();
    }
    toView() {
        // this.props.history.push("/app/code/codeList")
        window.location.href="/#/app/code/codeList"
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
                            const query = `{
                                createInviteTokens(input: {num: ${values.num},roleId:2})
                            }`;
                            http.post(query).then(() => {
                            message.success("创建成功");
                            window.location.href="/#/app/code/codeList"
                        })
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        console.log("render",this.state)
        return(
            <div>
                <div style={{margin: "8px 0",borderBottom: "1px solid #1890ff",width: "100px"}}>新增邀请码</div>
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
                    <FormItem>
                        {getFieldDecorator('role')(
                            <Select
                            style={{ width: 200 }}
                            placeholder="请选择一个角色"
                            >
                                {/* {
                                    this.state.roleList.map(v => (
                                        <div>
                                            <Option>1</Option>
                                            <Option>1</Option>
                                            <Option>1</Option>
                                        </div>
                                    ))
                                } */}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" >创建</Button>
                        {/* <Button onClick={this.toView.bind(this)}></Button> */}
                    </FormItem>    
                </Form>
            </div>
        )
    }
}
const AddCodeForm = Form.create()(AddCode);
export default withRouter(AddCodeForm)