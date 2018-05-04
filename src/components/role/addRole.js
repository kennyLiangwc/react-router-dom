import React, { Component } from "react";
import client from "../../utils/client"



export default class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: ""
        }
    }
    componentWillMount() {
        
        // client.request(query).then(function (data) {
        //     console.log('gql result ', data);
        // }).catch(function (err) {
        //     console.log('cat err', err)
        // })
    }
    handleClick() {
        let num = ++this.state.num;
        this.setState({
            num: num
        })
    }
    render() {
        return (
            <div>
                <span>addRole</span>
                <span>num: {this.state.num}</span>
                <button onClick={this.handleClick.bind(this)}>按钮</button>
            </div>
        )
    }
}