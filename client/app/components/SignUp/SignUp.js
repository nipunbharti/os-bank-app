import React, {Component} from 'react';
import {Input, Icon, Button} from 'antd';
import './SignUp.css';

class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
          userName1: '',
          email1: '',
          password1: '',
          userName2: '',
          email2: '',
          password2: '',
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
            case "username1":
                this.setState({ userName1: e.target.value });
                break;

            case "email1":
                this.setState({ email1: e.target.value });
                break;

            case "password1":
                this.setState({ password1: e.target.value });
                break;

            case "username2":
                this.setState({ userName2: e.target.value });
                break;

            case "email2":
                this.setState({ email2: e.target.value });
                break;

            case "password2":
                this.setState({ password2: e.target.value });
                break;
        }
    }

    signUpDetails(){
        if(this.props.typeOfAccount == 'single') {
            console.log('In');
            console.log(this.state.userName1, this.state.email1, this.state.password1);
            fetch('/api/signUpSingle',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: this.state.userName1,
                    email: this.state.email1,
                    password: this.state.password1
                }),
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                alert('You have signed up and your account number is: '.concat(json.accountNo));
            })
            .catch(err => console.log(err))
        }
        else {
            fetch('/api/signUpJoint',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName1: this.state.userName1,
                    email1: this.state.email1,
                    password1: this.state.password1,
                    userName2: this.state.userName2,
                    email2: this.state.email2,
                    password2: this.state.password2
                }),
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                alert('You have signed up and your account number is: '.concat(json.accountNo));
            })
        }
    }

    render(){
        let printSignUp = null;
        (this.props.typeOfAccount == 'single') ? printSignUp = (
            <div className="inputBoxContainer">
                <div className="inputBoxFlex">
                    <p className="inputBoxText">SignUp</p>
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.userName1}
                        onChange={(e) => this.onChangeInput(e, "username1")}
                        ref={node => this.userNameInput = node}
                        style={{padding:'6px',width:'200pt',height:'40pt'}}
                    />
                    <Input
                        placeholder="Enter your Email"
                        prefix={<Icon type="mail" theme="outlined" />}
                        value={this.state.email1}
                        onChange={(e) => this.onChangeInput(e, "email1")}
                        ref={node => this.userNameInput = node}
                        style={{padding:'6px',width:'200pt',height:'40pt'}}
                    />
                    <Input
                        placeholder="Enter your password"
                        prefix={<Icon type="key" theme="outlined" />}
                        value={this.state.password1}
                        onChange={(e) => this.onChangeInput(e, "password1")}
                        ref={node => this.userNameInput = node}
                        type="password"
                        style={{padding:'6px',width:'200pt',height:'40pt'}}
                    />
                    <Button type="primary" style={{marginTop:'10pt',padding:'6px',width:'200pt',height:'30pt'}} onClick={this.signUpDetails}>Sign Up</Button>
                </div>
            </div>
        ) : printSignUp = (
                <div className="inputBoxContainer">
                    <div className="inputBoxFlex">
                        <p className="inputBoxText">SignUp for 1st</p>
                        <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.userName1}
                            onChange={(e) => this.onChangeInput(e, "username1")}
                            ref={node => this.userNameInput = node}
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                        <Input
                            placeholder="Enter your Email"
                            prefix={<Icon type="mail" theme="outlined" />}
                            value={this.state.email1}
                            onChange={(e) => this.onChangeInput(e, "email1")}
                            ref={node => this.userNameInput = node}
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                        <Input
                            placeholder="Enter your password"
                            prefix={<Icon type="key" theme="outlined" />}
                            value={this.state.password1}
                            onChange={(e) => this.onChangeInput(e, "password1")}
                            ref={node => this.userNameInput = node}
                            type="password"
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                    </div>
                    <br />
                    <div className="inputBoxFlex">
                        <p className="inputBoxText">SignUp for 2nd</p>
                        <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.userName2}
                            onChange={(e) => this.onChangeInput(e, "username2")}
                            ref={node => this.userNameInput = node}
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                        <Input
                            placeholder="Enter your Email"
                            prefix={<Icon type="mail" theme="outlined" />}
                            value={this.state.email2}
                            onChange={(e) => this.onChangeInput(e, "email2")}
                            ref={node => this.userNameInput = node}
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                        <Input
                            placeholder="Enter your password"
                            prefix={<Icon type="key" theme="outlined" />}
                            value={this.state.password2}
                            onChange={(e) => this.onChangeInput(e, "password2")}
                            ref={node => this.userNameInput = node}
                            type="password"
                            style={{padding:'6px',width:'200pt',height:'40pt'}}
                        />
                        <Button type="primary" style={{marginTop:'10pt',padding:'6px',width:'200pt',height:'30pt'}} onClick={this.signUpDetails}>Sign Up</Button>
                    </div>
                </div>   
        )
        return printSignUp;
    }
}

export default SignUp;