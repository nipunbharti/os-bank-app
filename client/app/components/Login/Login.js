import React, {Component} from 'react';
import {Input, Icon, Button, Alert} from 'antd';
import {withRouter} from 'react-router-dom';
import './Login.css';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          password: '',
          visible: false
        };

        this.emitEmpty = this.emitEmpty.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.loginDetails = this.loginDetails.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
      }
    
    emitEmpty() {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }

    onChangeInput(e, type){
        switch(type){
            case "username":
                this.setState({ userName: e.target.value });
                break;

            case "password":
                this.setState({ password: e.target.value });
                break;
        }
    }

    loginDetails(){
        fetch('/api/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            }),
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == false){
                this.setState({
                    visible: true
                })
            }
            else{
                localStorage.setItem('sessionToken', json.token);
                localStorage.setItem('sessionMail', json.email);
            }
            console.log(json);
        })
    }

    handleAlertClose(){
        this.setState({
            visible: false
        })
    }

    render(){
        console.log(localStorage.getItem('sessionToken'));
        return(
            <div className="LoginInputBoxContainer">
                <div className="inputBoxFlex">
                    <p className="inputBoxText">Log In</p>
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="mail" theme="outlined" />}
                        value={this.state.userName}
                        onChange={(e) => this.onChangeInput(e, "username")}
                        ref={node => this.userNameInput = node}
                        style={{padding:'6px',width:'200pt',height:'40pt'}}
                    />
                    <Input
                        placeholder="Enter your password"
                        prefix={<Icon type="key" theme="outlined" />}
                        value={this.state.password}
                        onChange={(e) => this.onChangeInput(e, "password")}
                        ref={node => this.userNameInput = node}
                        type="password"
                        style={{padding:'6px',width:'200pt',height:'40pt'}}
                    />
                    {this.state.visible ? <Alert message="Wrong password/username" type="error" closable afterClose={this.handleAlertClose} className="alertWrong" /> : <></>}
                    <Button type="primary" style={{marginTop:'10pt',padding:'6px',width:'200pt',height:'30pt'}} onClick={this.loginDetails}>Login</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);