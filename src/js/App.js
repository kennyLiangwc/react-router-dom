import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout } from 'antd';

import SiderCustom from "./components/frame/SiderCustom"
import Head from "./components/frame/header"
import Routes from "./route"
import css from "../css/App.css"

const { Header, Footer, Sider, Content } = Layout;


class App extends Component {
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
          <Content style={{margin: "12px"}}>
            {/* 动态替换conten里的内容 */}
            <Routes />
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
            互联网+影视管理平台 ©2018 Created by 腾讯影业
        </Footer>
      </Layout>
    );
  }
}

export default App;
