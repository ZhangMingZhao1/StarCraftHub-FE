import React, { Component } from 'react';
import WrapPost from '../../component/post'
import Postlist from '../../container/postlist'

class Discuss extends Component {
  render() {
    return (
      <div>
        <Postlist/>
        <WrapPost/>
      </div>
    );
  }
}

export default Discuss;