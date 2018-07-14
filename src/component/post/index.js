import {Input,Button} from 'antd';
import React,{Component} from 'react'
import './index.less';

const {TextArea} = Input;

class Post extends Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
        <div>
          <TextArea rows={4}/>
          <div className="post">
            <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
              发布
            </Button>
          </div>  
   
        </div>
    )
  }
}

export default Post;

