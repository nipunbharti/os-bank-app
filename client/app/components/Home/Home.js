import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import SideBar from '../SideBar/SideBar';
import { Menu, Dropdown, Icon } from 'antd';
import './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			typeOfAccount: 'single'
		};

		this.changeAccount = this.changeAccount.bind(this);
	}


	changeAccount(e, type) {
		this.setState({
			typeOfAccount: type
		});
	}


	render() {

		const menuOptions = (
			<Menu>
				<Menu.Item key="0">
					<div onClick={(e) => this.changeAccount(e, 'single')}>Single account</div>
				</Menu.Item>
				<Menu.Item key="1">
					<div onClick={(e) => this.changeAccount(e, 'joint')}>Joint account</div>
				</Menu.Item>
			</Menu>
		);

		return (
	        <div className="home">
	            <div>
	                <SideBar/>
	            </div>
	            <div className="credentials">
	            	<div className="accountTypeDiv">
		            	<Dropdown overlay={menuOptions} trigger={['click']}>
		            		<a className="ant-dropdown-link accountType" href="#">
						      Type of account <Icon type="down" />
						    </a>
		            	</Dropdown>
	            	</div>
	            	<div className="signUpLoginDiv">
		                <SignUp typeOfAccount={this.state.typeOfAccount} />
		                <Login typeOfAccount={this.state.typeOfAccount} />
	                </div>
	            </div>
	        </div>
		);
	}
}

export default Home;