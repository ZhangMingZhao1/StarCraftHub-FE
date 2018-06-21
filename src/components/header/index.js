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
    this.callback = this.callback.bind(this);
	}
	componentWillMount() {
		if(localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	};
	

  setModalVisible(value)
	{
		this.setState({modalVisible: value});
  };

  handleOnClick() {
      this.setModalVisible(true);
  }
	handleSubmit(e)
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
  };

	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}
  
  render() {
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
      ? <div>
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        <Button type="dashed" htmlType="button">个人中心</Button>
        <Button type="danger" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
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
          <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
							<Tabs type="card" onChange={this.callback}>
								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
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
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
       </Header>
    );
  }
}
export default MHeader = Form.create({})(MHeader);
