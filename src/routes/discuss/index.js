import React, { Component } from 'react';
import Post from '../../container/post'
import Postlist from '../../container/postlist'
// import MEditor from '../../component/editor';


class Discuss extends Component {
  render() {
    return (
      <div>
        <Postlist/>
        <Post />

      </div>
    );
  }
}

export default Discuss;