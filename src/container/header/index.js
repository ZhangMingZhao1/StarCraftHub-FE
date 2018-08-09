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
			autoCompleteResult: [],
			confirmDirty: false,
      modalVisible: false,
			action: 'login',
			hasLogined: false,
			username: '',
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
	handleSubmit = (e) =>
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		let formData = this.props.form.getFieldsValue();
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
			},
			credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
      body: JSON.stringify({
				username:formData.r_userName,
				password:formData.r_password
      })
    }

		fetch("http://localhost:3002/" + this.state.action, options)
		.then(response => response.json())
		.then(json => {
			// this.setState({userNickName: json.NickUserName, userid: json.UserId});
			// localStorage.userid= json.UserId;
			// localStorage.userNickName = json.NickUserName;
			console.log(json);
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	handleSignIn = (e) => {
		//页面开始向 API 进行提交数据
		e.preventDefault();
		let formData = this.props.form.getFieldsValue();
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
			},
			credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
      body: JSON.stringify({
				username:formData.userName,
				password:formData.password
      })
		};
		
			fetch("http://localhost:3002/" + this.state.action, options)
			.then(response => response.json())
			.then(data => {
				// this.setState({userNickName: json.NickUserName, userid: json.UserId});
				// localStorage.userid= json.UserId;
				// localStorage.userNickName = json.NickUserName;
				console.log(data);
				if(data=="1") {
					message.success("请求成功！");
					this.setState({username:formData.userName})
					localStorage.userName = formData.userName;
					this.setState({hasLogined:true});
					console.log(this.state.hasLogined,formData.userName,localStorage.userName);
				}else {
					message.error("请求失败！");
				}
			});

			
			this.setModalVisible(false);
	}

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
  };

	logout() {
		// localStorage.userid = '';
		localStorage.username = '';
		this.setState({hasLogined:false});
	}

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	validateUserName = (rule, value, callback) => {
		console.log(value.length);
		if(value.length<2 || value.length>10) {
			callback("Please enter 2-10 characters")
		}else {
			callback();
		}
	}

	compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('r_password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
	}

	validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['r_confirmPassword'], { force: true });
    }
    callback();
  }
	

  render() {
		let {getFieldProps} = this.props.form;
		const { getFieldDecorator } = this.props.form;

    const userShow = this.state.hasLogined
      ? <div>
        <Button type="primary" htmlType="button">{this.state.username}</Button>
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
									<Form horizontal="true" onSubmit={this.handleSignIn}>
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
									<Form horizontal="true" onSubmit={this.handleSubmit}>

										<FormItem label="账户">
										{getFieldDecorator('r_userName', {
            rules: [{
              required: true, message: 'Please input your username!',
            }, {
              validator: this.validateUserName,
            }],
          })(
            <Input placeholder="请输入您的账号"/>
          )}
											
										</FormItem>

										<FormItem label="密码">
										{getFieldDecorator('r_password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}	
					</FormItem>
					<FormItem label="确认密码">
						{getFieldDecorator('r_confirmPassword', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur}  placeholder="请再次输入您的密码" />
          )}
											
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
