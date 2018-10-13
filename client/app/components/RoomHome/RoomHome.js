import React, {Component} from 'react';
import { Alert, Button } from 'antd';
import JoinRoomModal from './JoinRoomModal';
import io from "socket.io-client";
import './RoomHome.css';

class RoomHome extends Component{

    constructor(){
        super();
        this.state = {
            visible: true,
            socket: null
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        this.initSocket();
    }

    initSocket(){
        const socket = io('http://localhost:8080');
        socket.on('connect', function(){
            console.log("Socket Connected");
        });

        this.setState({socket});
    }

    handleClose(){
        this.setState({
            visible: false
        });
        this.props.history.push("/");
    }

    handleLogout(){
        localStorage.setItem('sessionToken', null);
        localStorage.setItem('sessionMail', null);
        this.props.history.push("/");
    }

    render(){
        console.log(localStorage.getItem('sessionToken'));
        return(
            <div>
                {(localStorage.getItem('sessionToken') != null) ? 
                <div className="roomHomeContainer">
                    <div className="logoutButton">
                        <Button type="primary" onClick={this.handleLogout}>Logout</Button>
                    </div>
                    <div className="homeModals">
                        <div className="createModal">
                            <JoinRoomModal buttonText="Create Room" type="create" modalTitle="Create room" socket={this.state.socket} />
                        </div>
                        <div className="createModal">
                            <JoinRoomModal buttonText="Join Room" type="join" modalTitle="Join room" socket={this.state.socket} />
                        </div>
                    </div>
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