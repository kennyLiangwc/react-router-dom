import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends Component {
	render() {
		const { firstLink, first, second } = this.props;
		let firstBread,secondBread;
		if(firstLink) firstBread = <Breadcrumb.Item><Link to={firstLink}>{this.props.first}</Link></Breadcrumb.Item>
		else firstBread = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || ""
		secondBread = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || "";
		return(
			<span>
				<Breadcrumb style={{margin: "12px 8px"}}>
					{firstBread}
					{secondBread}
				</Breadcrumb>
			</span>
		)
	}
}

export default BreadcrumbCustom