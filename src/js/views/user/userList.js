import React, { Component } from "react"
import http from "../../../utils/http"
import { Table, Row, Col, Card, Form, Input, Button } from "antd";
import { connect } from "react-redux"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx";
import ClickShowImg from "../../components/clickShowImg/clickShowImg"

const FormItem = Form.Item;

const UserForm = Form.create()(class SearchForm extends Component {
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if(!err) {
                this.props.query(value)
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;
        return <Form
                layout="inline"
                onSubmit={this.handleSearch.bind(this)}
                >
                <FormItem
                    {...formItemLayout}
                    label =  "昵称"
                >
                    {getFieldDecorator("name")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label =  "unionId"
                >
                    {getFieldDecorator("unionId")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label =  "uid"
                >
                    {getFieldDecorator("uid")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
        </Form>
    }
})


class UserList extends Component {
    state = {
        list: []
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        count: 0
    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.pageQuery();
        console.log("props",this.props)
    }
    pageQuery() {
        const { pageNumber, pageSize } = this.page;
        const input = {};
        const { name, unionId, uid } = this.params;
        if( name ) input.nickname = name.trim();
        if( unionId ) input.unionId = unionId.trim();
        if( uid ) input.uid = Number(uid);
        const query = `
            query QueryUserList($input:QueryUserInput,$page:PageInput){
                queryUserList(input:$input,page:$page){
                    count
                    list{
                        uid
                        unionId
                        nickname
                        portrait
                    }
                }
            }
        `;
        http.post(query,{
            input: input,
            page: {
                pageSize: pageSize,
                pageNumber: pageNumber
            }
        }).then(data => {
            this.page.total = data.queryUserList.total;
            this.setState({
                list: data.queryUserList.list
            })
        })
    }
    params = {}
    query(params) {
        this.params = params;
        this.pageQuery()
    }
    render() {
        const pagination = {
            total: this.page.total,
            current: this.page.pageNumber,
            pageSize: this.page.pageSize,
            showSizeChanger: true,
            onShowSizeChange: (pageNumber, pageSize) => {
                this.page.pageSize = pageSize;
                this.page.pageNumber = pageNumber;
                this.pageQuery()
            },
            onChange: (pageNumber) => {
                this.page.pageNumber = pageNumber;
                this.pageQuery()
            }
        }
        const columns = [
            {
                title: "头像",
                dataIndex: "portrait",
                render: (text,record) => (
                    <img src={record.portrait} style={{width: "30px"}}/>
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
        return(
            <div className="gutter-example">
                <Row gutter={16}>
                     <BreadcrumbCustom first={"用户列表"}/>
                     <UserForm query={this.query.bind(this)}/>
                     <Card bordered={false}>
                        <Table dataSource={this.state.list} columns={columns} pagination={pagination} rowKey="userTable"></Table>
                     </Card>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("state",state)
    return {

    }
}
export default connect(mapStateToProps)(UserList)