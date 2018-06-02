import React, { Component } from 'react';
import './App.css';
import {Button} from 'antd';
import { Menu} from 'antd';
import {Router,Route,Link} from 'react-router';
import CMenu from './components/menu/index';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
  constructor() {
    super();
  } 
  render() {
    return (
      <div className="App">
        <CMenu></CMenu>
      </div> 
    );
  }
}

export default App;
