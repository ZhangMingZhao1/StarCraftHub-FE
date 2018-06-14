import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';  
import { Layout,message, Button} from 'antd';
import './index.less';
import logo from '../../assets/logo.png';
const {Header} = Layout;

class MHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
    }
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  setModalVisible(value)
	{
		this.setState({modalVisible: value});
  };

  handleOnClick() {
      this.setModalVisible(true);
  }
  handleSubmit(e) {
    e.preventDefault();
    let myFetchOptions = {
      method: 'GET'
    };
    let formData = this.props.form.getFieldValue();
    console.loh(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
      .then(res => res.json()).then(json=>{
        this.setState({
          userNickName:json.NickUserName,
          userid:json.UserId
        });
      });
      message.success("请求成功!");
      this.setModalVisible(false);
  };
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