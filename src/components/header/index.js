import React, { Component } from 'react';
import { Layout } from 'antd';
import { Button} from 'antd';
import './index.less';
import logo from '../../assets/logo.png';
const {Header} = Layout;

class MHeader extends Component {
  constructor(props){
    super(props);
    
  }
  state = {
    current: 'video'
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