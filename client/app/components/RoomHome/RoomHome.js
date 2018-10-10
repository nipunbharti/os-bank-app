import React, {Component} from 'react';
import { Alert, Button } from 'antd';
import './RoomHome.css';

class RoomHome extends Component{

    constructor(){
        super();
        this.state = {
            visible: true
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.setState({
            visible: false
        });
        this.props.history.push("/");
    }

    render(){
        return(
            <div>
                {(localStorage.getItem('sessionToken') == null)  ? 
                <div className="roomHomeContainer">
                    <div>Hello</div>
                </div>
                :
                <div className="notLoggedIn">
                    <div className="inputBoxFlex">
                        {this.state.visible ? <Alert message="You need to login first" type="error" closable afterClose={this.handleClose} /> : {} }
                    </div>  
                </div>}
            </div>
        );
    }
}

export default RoomHome;