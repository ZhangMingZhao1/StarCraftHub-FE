import {Input,Button} from 'antd';
import React,{Component} from 'react'
import './index.less';

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
  hangleOnClick(e) {
   
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

  render() {
    return (
        <div>
          <TextArea onchange={this.hangeleOnChange.bind(this)} rows={4}/>
          <div className="post">
            <Button type="primary" loading={this.state.loading} onClick={this.hangleOnClick.bind(this)}>
              发布
            </Button>
          </div>  
   
        </div>
    )
  }
}

export default Post;

