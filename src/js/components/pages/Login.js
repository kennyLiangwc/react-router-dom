import React,{ Component } from "react";
import ui from "../../../utils/ui"
export default class Login extends Component {
	constructor(props) {
		super(props);
		console.log("this",this)
		if(this.props.match.path == "/login") {
			ui.showWxLogin()
		}
	}
	render() {
		return <div>Login</div>
	}
}