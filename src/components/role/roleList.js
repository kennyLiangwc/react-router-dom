import React, { Component } from "react";
import { Alert, Form , Input, Button, Table } from "antd";
import { Link } from "react-router-dom";
import permission from "../../utils/permission"
import util from "../../utils/util"
const FormItem = Form.Item;


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
          {/* { permission.editRole ? <Link to={`/app/role/editRole/${record.key}`}>edit</Link> : "" } | */}
            <Link to={`/app/role/editRole/${record.key}`}>edit</Link> |
          { permission.addRole ? <Link to={`/app/chat`}>add</Link> : "" } |
          <Link to={`/app/role/delRole`}>Del</Link>
          <Link to={`/app/role/testRole`}>Test</Link>
      </span>
    ),
}];
  
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

export default class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
                
        }
    }
    render() {
    	// console.log(111)
        return (
            <div>
                <Alert message={"角色列表"} style={{margin: "12px 0"}}/>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}