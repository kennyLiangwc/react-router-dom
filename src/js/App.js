import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout } from 'antd';

import SiderCustom from "./components/frame/SiderCustom"
import Head from "./components/frame/header"
import Routes from "./route"
import css from "../css/App.css"

const { Header, Footer, Sider, Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
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
