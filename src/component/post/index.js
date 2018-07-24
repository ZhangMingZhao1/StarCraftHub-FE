import {Form,Input,Button} from 'antd';
import React,{Component} from 'react'
import './index.less';

const FormItem = Form.Item;
const {TextArea} = Input;

class Post extends Component {
  state = {
    // loading: false,
    // iconLoading: false,
    content:''
  }

  // enterLoading = () => {
  //   this.setState({ loading: true });
  // }

  // enterIconLoading = () => {
  //   this.setState({ iconLoading: true });
  // }
 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content:this.state.content
      })
    }
    
    
    fetch("localhost:3002/post",options)
      .then( (res)=>res.json()  );
  }

  hangeleOnChange(e) {
    let content = e.target.value;
    this.setState({content:content});
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const contentError = isFieldTouched('content') && getFieldError('content');

    return (
      <Form onSubmit={this.handleSubmit}>
      <FormItem
        validateStatus={contentError ? 'error' : ''}
        help={contentError || ''}
      >
        {getFieldDecorator('content', {
          rules: [{ required: true, message: 'Please input your content!' }],
        })(
          <TextArea onChange={this.hangeleOnChange.bind(this)} rows={4}/>
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={this.hasErrors(getFieldsError())}
        >
          发表
        </Button>
      </FormItem>
    </Form>


        // <div>
        //   <TextArea onchange={this.hangeleOnChange.bind(this)} rows={4}/>
        //   <div className="post">
        //     <Button type="primary" loading={this.state.loading} onClick={this.hangleOnClick.bind(this)}>
        //       发布
        //     </Button>
        //   </div>  
   
        // </div>
    )
  }
}

const WrapPost = Form.create()(Post);
export default WrapPost;

