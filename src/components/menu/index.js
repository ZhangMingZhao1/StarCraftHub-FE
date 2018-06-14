import React, { Component } from 'react';
import { Menu } from 'antd';
import Login from '../../routes/login'
import Sign from '../../routes/sign';
import Stepinto from '../../routes/stepinto'
import Video from '../../routes/video';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MMenu extends Component {
  constructor(props){
    super(props);
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
  };
  render() {
    return (
      <Router>
      <div>
        <Menu
        // theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="introduce">
          {/* <Icon type="mail" />Navigation One */}
          <Link to="/stepinto">走进星际</Link>
        </Menu.Item>
        <Menu.Item key="video">
        <Link to="/video">视频</Link>
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

      <Route path="/stepinto" component={Stepinto} />
      <Route path="/video" component={Video} />
     </div>
     </Router>
    );
  }
}

export default MMenu;