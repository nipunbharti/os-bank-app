import React, { Component } from 'react';
import InfoCards from '../InfoCards/InfoCards';
import WithdrawlModal from './WithdrawlModal';
import CreditModal from './CreditModal';
import { Divider, Button, Icon } from 'antd';
import './BankHome.css';

export default class BankHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalWithdraw: false,
            showModalCredit: false,
            currentAmount: null,
        };

        this.handleOkWithdraw = this.handleOkWithdraw.bind(this);
        this.handleOkCredit = this.handleOkCredit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.modalWithdraw = this.modalWithdraw.bind(this);
        this.modalCredit = this.modalCredit.bind(this);
    }

    handleOkWithdraw(amount) {
        console.log(amount);
        this.setState({
            showModalWithdraw: false
        });
    }

    handleOkCredit(amount) {
        console.log(amount);
        this.setState({
            showModalCredit: false
        });
    }

    handleCancel() {
        this.setState({
            showModalWithdraw: false,
            showModalCredit: false
        });
    }

    modalWithdraw() {
        this.setState({
            showModalWithdraw: true
        });
    }

    modalCredit() {
        this.setState({
            showModalCredit: true
        });
    }

    render() {
        return (
            <div className='mainContainerBank'>
                <InfoCards />
                <div className="optionsGrid">
                    <div className="equalDiv">
                        <Icon type="shopping-cart" className="icons" />
                        <Button type="primary" size="large" onClick={this.modalWithdraw}>Withdrawl</Button>
                    </div>
                    <Divider type="vertical" className="divider" />
                    <div className="equalDiv">
                        <Icon type="wallet" className="icons" />
                        <Button type="primary" size="large" onClick={this.modalCredit}>Credit</Button>
                    </div>
                    <Divider type="vertical" className="divider" />
                    <div className="equalDiv">
                        <Icon type="bank" className="icons" />
                        <Button type="primary" size="large">Statement</Button>
                    </div>
                </div>
                <WithdrawlModal visible={this.state.showModalWithdraw} handleOk={this.handleOkWithdraw} handleCancel={this.handleCancel} />
                <CreditModal visible={this.state.showModalCredit} handleOk={this.handleOkCredit} handleCancel={this.handleCancel} />
            </div>
        )
    }
}