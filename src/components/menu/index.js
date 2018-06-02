import React, { Component } from 'react';
import { Menu} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CMenu extends Component {
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
     
    );
  }
}

export default CMenu;