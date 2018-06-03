import React, { Component } from 'react';
import './App.css';
import {Button} from 'antd';
import { Menu} from 'antd';
import {Router,Route,Link} from 'react-router';
import MMenu from './components/menu/index';
import MHeader from './components/header/index';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
  constructor() {
    super();
  } 
  render() {
    return (
      <div className="App">
        <MHeader></MHeader>   
        <MMenu></MMenu>
      </div> 
    );
  }
}

export default App;
