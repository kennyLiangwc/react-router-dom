import React, { Component } from "react";

export default class EditRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        }
    }
    componentWillMount() {
        let id = this.props.computedMatch.params.id;
        this.setState({
            id: id
        })
    }
    render() {
        return(
            <div>This is EdirRole, id is {this.state.id}</div>
        )
    }
}