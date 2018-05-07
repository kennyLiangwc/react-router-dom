import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends Component {
	render() {
		const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || "";
		const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || "";
		return(
			<span>
				<Breadcrumb style={{margin: "12px"}}>
					{first}
					{second}
				</Breadcrumb>
			</span>
		)
	}
}

export default BreadcrumbCustom