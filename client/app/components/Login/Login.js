import React, {Component} from 'react';
import {Input, Icon, Button} from 'antd';
import './Login.css';

class Login extends Component{

    componentWillMount(){
        localStorage.setItem('sessionToken', null);
      }

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };

        this.emitEmpty = this.emitEmpty.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.loginDetails = this.loginDetails.bind(this);
      }
    
    emitEmpty() {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }

    onChangeInput(e, type){
        switch(type){
            case "email":
                this.setState({ email: e.target.value });
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
                email: this.state.email,
                password: this.state.password
            }),
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('sessionToken', json.token);
            console.log(json)
        })
    }

    render(){
        console.log(localStorage.getItem('sessionToken'));
        return(
            <div className="LoginInputBoxContainer">
                <div className="inputBoxFlex">
                    <p className="inputBoxText">Log In</p>
                    <Input
                        placeholder="Enter your Email"
                        prefix={<Icon type="mail" theme="outlined" />}
                        value={this.state.email}
                        onChange={(e) => this.onChangeInput(e, "email")}
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
                    <Button type="primary" style={{marginTop:'10pt',padding:'6px',width:'200pt',height:'30pt'}} onClick={this.loginDetails}>Login</Button>
           
                </div>
                 </div>
        );
    }
}

export default Login;