import React, {Component} from 'react';
import {Input, Icon, Button} from 'antd';
import './SignUp.css';

class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          email: '',
          password: '',
        };


        this.emitEmpty = this.emitEmpty.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.signUpDetails = this.signUpDetails.bind(this);
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

            case "email":
                this.setState({ email: e.target.value });
                break;

            case "password":
                this.setState({ password: e.target.value });
                break;
        }
    }

    signUpDetails(){
        fetch('/api/signUp',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }),
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    render(){
        return(
            <div className="inputBoxContainer">
                <div className="inputBoxFlex">
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.userName}
                        onChange={(e) => this.onChangeInput(e, "username")}
                        ref={node => this.userNameInput = node}
                        style={{padding:'6px'}}
                    />
                    <Input
                        placeholder="Enter your Email"
                        prefix={<Icon type="mail" theme="outlined" />}
                        value={this.state.email}
                        onChange={(e) => this.onChangeInput(e, "email")}
                        ref={node => this.userNameInput = node}
                        style={{padding:'6px'}}
                    />
                    <Input
                        placeholder="Enter your password"
                        prefix={<Icon type="key" theme="outlined" />}
                        value={this.state.password}
                        onChange={(e) => this.onChangeInput(e, "password")}
                        ref={node => this.userNameInput = node}
                        type="password"
                        style={{padding:'6px'}}
                    />
                </div>
                <Button type="primary" style={{padding:'6px'}} onClick={this.signUpDetails}>Sign Up</Button>
            </div>
        );
    }
}

export default SignUp;