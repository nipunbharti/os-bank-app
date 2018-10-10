import React, {Component} from 'react';
import {Input, Icon, Button} from 'antd';
import './SideBar.css';


 class SideBar extends Component{
     render(){
         return(
             <div className="sideBar">
                <div className="content">
                    <p className="contentText">CHAT-ROOM</p>
                </div>
             </div>
         )
     }
 }

 export default SideBar;