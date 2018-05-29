import React, { Component } from 'react';
import './App.css';
import {Button} from 'antd';
import { Menu} from 'antd';
import {Router,Route,Link} from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    current: 'video'
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="App">
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="introduce">
          {/* <Icon type="mail" />Navigation One */}
          走进星际
        </Menu.Item>
        <Menu.Item key="video">
          视频
        </Menu.Item>
        <Menu.Item key="picture">
          图片
        </Menu.Item>
        <Menu.Item key="news">
          新闻
        </Menu.Item>
        <Menu.Item key="discuss">
          论坛
        </Menu.Item>
        <Menu.Item key="data">
          一周热数据
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default App;
