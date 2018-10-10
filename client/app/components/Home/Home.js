import React from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import SideBar from '../SideBar/SideBar';
import './Home.css';

const Home = () => (
        <div className="home">
            <div>
                <SideBar/>
            </div>
            <div className="credentials">
                <SignUp/><br />
                <Login/>
            </div>
        </div>
);

export default Home;