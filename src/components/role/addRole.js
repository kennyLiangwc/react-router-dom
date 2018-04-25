import React, { Component } from "react";

export default class RoleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: ""
        }
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