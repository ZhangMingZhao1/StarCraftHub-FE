import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';  
import { Layout } from 'antd';
import { Button} from 'antd';
import './index.less';
import logo from '../../assets/logo.png';
const {Header} = Layout;

class MHeader extends Component {
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  state = {
    current: 'video'
  }
  handleOnClick() {
    console.log("111");
    return <Redirect push to="/sign" />
  }
  render() {
    return (
        <Header>
          <div className="headerbox">
            <div className="Weblogo"><img src={logo} /></div>
            <div className="search"></div>
            <div className="loginin">
              <Button
                type="primary"
                onClick={this.handleOnClick}
                >登陆</Button></div>
             <div className="signin">
              <Button
                type="primary"
                >注册</Button></div>
          </div>
       </Header>
    );
  }
}

export default MHeader;