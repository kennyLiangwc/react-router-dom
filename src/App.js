import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { Layout } from 'antd';



// import Sider from "./components/common/sider"
import SiderCustom from "./components/SiderCustom"
import Routes from "./route"

const { Header, Footer, Sider, Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    console.log("this",this)
    this.state= {
      pathname: this.props.loacation
    }
  }
  componentDidMount() {
    this.setState({
      a: 6,
      pathname: "aaaaa"
    });
    // console.log(this.setState)
  }
  render() {
    return (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>
              <SiderCustom />
            </Sider>
            <Content>
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
