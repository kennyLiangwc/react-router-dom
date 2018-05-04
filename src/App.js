import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { Layout } from 'antd';

import SiderCustom from "./components/SiderCustom"
import Head from "./components/header"
import Routes from "./route"

const { Header, Footer, Sider, Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: this.props.loacation
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <Layout >
        <Header style={{ color: "white" }} >
          <Head />
        </Header>
        <Layout>
          <Sider>
            <SiderCustom />
          </Sider>
          <Content style={{margin: "10px"}}>
            {/* 动态替换conten里的内容 */}
            <Routes />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;
