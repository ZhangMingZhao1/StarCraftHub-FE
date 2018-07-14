import React, { Component } from 'react';
import {Tabs} from 'antd';
import './index.less';
import axios from 'axios';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Standing extends Component {
  constructor() {
    super();
    this.state = {
      kRanklist : [],
  }
};
  componentWillMount() {
      axios('http://localhost:3002/getranklist')
        .then(res=> {
          this.setState({kRanklist:res.data.rankedPlayers});
          console.log(res);
          // this.setState({kRanklist:res.data.rankedPlayers});
        }).catch((e)=> {
          console.log('failed', e);
        })
  }

  render() {
    let piece = 100/10400;
    return (
      <div className="standingRoot">
        <div className="standingContainer">
          <Tabs defaultActiveKey="1" type="card" onChange={callback}>
            <TabPane tab="韩国" key="1">
              {this.state.kRanklist.map( (v,k)=> {
                let points = v.points;
                return <div className="row" key={k}>
                    <span className="name">{v.name}</span>
                    <div className="barBox">
                      <div className="bar" style={{width: piece*points + '%'}}></div>
                      <div className="point"><span>{points}</span></div>
                    </div>
                    
                  </div> 
              } )}
            </TabPane>
            <TabPane tab="欧美" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="中国" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div> 
      </div>
    );
  }
}

export default Standing;


