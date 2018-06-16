import React, { Component } from 'react';
import { Layout,message, Button, Menu, Icon, Input, Tabs, Form, Modal} from 'antd';
import {
	Link
  } from 'react-router-dom';
import './index.less';
import logo from '../../assets/logo.png';

  const FormItem = Form.Item;
  const SubMenu = Menu.SubMenu;
  const TabPane = Tabs.TabPane;
  const MenuItemGroup = Menu.ItemGroup;


// import MenuItem from 'antd/lib/menu/MenuItem';
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
    console.log(formData);
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
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
      ? <div>
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        <Button type="dashed" htmlType="button">个人中心</Button>
        <Button type="ghost" htmlType="button">退出</Button>
      </div>
    : <div><Button type="primary" 
        onClick={this.handleOnClick} 
        htmlType="button">登录/注册</Button></div>

    return (
        <Header>
          <div className="headerbox">
             <div className="Weblogo"><img src={logo} /></div>
              {userShow}
          </div>
		  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
							<Tabs type="card">
								<TabPane tab="注册" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label="确认密码">
											<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit" >注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
       </Header>
    );
  }
}
export default MHeader = Form.create({})(MHeader);
