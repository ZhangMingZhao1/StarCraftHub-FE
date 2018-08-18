// import {Form,Input,Button,message, Divider} from 'antd';
import {Button,message} from 'antd';
import React,{Component} from 'react'
import './index.less';
import MEditor from '../../component/editor';
import { EditorState } from 'draft-js';
// const FormItem = Form.Item;
// const {TextArea} = Input;

class Post extends Component {
  constructor (props) {
	super(props)
	this.state = {
	    editorState: EditorState.createEmpty(),
    	content:'',
	}
}
  handleSubmit = (e) => {
    e.preventDefault();
	let options = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json'
		},
		credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
		body: JSON.stringify({
		content:this.state.content
		})
	}
        
	fetch("http://localhost:3002/post",options)
		.then( (res)=>res.json()  ).then( (data)=>{
			if(data===1) {
				message.success('发表成功');
				content: ''
				}
			else if(data===-3){
				message.error('您还没有登陆，请登陆')
			}else {
				message.error("服务器错误");
			}
		})
	}
	

  hangeleOnChange(e) {
    let content = e.target.value;
    console.log(content);
    // this.setState({content:content});
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


  onSubmitFa= (data)=>{
	console.log(data);
	this.setState({content:data});
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
		  <MEditor 
		  ddd="1" 
		  onSubmitCh={this.onSubmitFa} />
		<Button
			className="editor-button"
			type="primary"
			htmlType="submit"
			onClick={this.handleSubmit}
		>发表</Button>
      </div>)
  }
}
  


// const WrapPost = Form.create()(Post);
export default Post;

