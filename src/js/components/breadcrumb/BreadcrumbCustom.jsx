import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends Component {
	render() {
		return(
			<span>
				<Breadcrumb style={{margin: "12px 0"}}>
					<Breadcrumb.Item>11111</Breadcrumb.Item>
					<Breadcrumb.Item>2222</Breadcrumb.Item>
				</Breadcrumb>
			</span>
		)
	}
}

export default BreadcrumbCustom