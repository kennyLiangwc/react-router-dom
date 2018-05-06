import React, { Component } from "react"
import http from "../../../utils/http"
import { Table, Row, Col, Card } from "antd";
import { connect } from "react-redux"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx"

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
        this.pageQuery()
    }
    pageQuery() {
        const { pageNumber, pageSize } = this.page;
        const query = `{
            queryUserList(input: {nickname: "",  unionId: ""}, page: {pageSize: ${pageSize}, pageNumber: ${pageNumber}}) {
              count
              list {
                uid
                unionId
                nickname
                portrait
              }
            }
          }`;
        http.post(query).then(data => {
            this.page.total = data.queryUserList.total;
            this.setState({
                list: data.queryUserList.list
            })
        })
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
        return(
            <div className="gutter-example">
                <Row gutter={16}>
                     <BreadcrumbCustom />
                     <Card bordered={false}>
                        <Table dataSource={this.state.list} columns={columns} pagination={pagination}></Table>
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