import React, { Component } from 'react';
import InfoCards from '../InfoCards/InfoCards';
import WithdrawlModal from './WithdrawlModal';
import CreditModal from './CreditModal';
import TableModal from './TableModal';
import { Divider, Button, Icon } from 'antd';
import './BankHome.css';

const columns = [{
    title: 'Time',
    dataIndex: 'timestamp',
    key: 'timestamp'
}, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
}, {
    title: 'Amount',
    dataIndex: 'value',
    key: 'value',
}];

export default class BankHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalWithdraw: false,
            showModalCredit: false,
            showModalTable: false,
            currentAmount: null,
            dataSource: []
        };

        this.handleOkWithdraw = this.handleOkWithdraw.bind(this);
        this.handleOkCredit = this.handleOkCredit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.modalWithdraw = this.modalWithdraw.bind(this);
        this.modalCredit = this.modalCredit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.unlockDb = this.unlockDb.bind(this);
        this.modalTable = this.modalTable.bind(this);
        this.handleOkTable = this.handleOkTable.bind(this);
    }

    componentDidMount() {
        fetch('/api/getdetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson.balance[0].balance);
            this.setState({
                currentAmount: resJson.balance[0].balance
            })
        })

        setTimeout(() => {
            localStorage.setItem('sessionToken', null);
            this.props.history.push('/');
            this.unlockDb();
            alert('Session timed out');
        }, 1000*60*10)
    }

    handleOkTable() {
        this.setState({
            showModalTable: false
        })
    }

    handleOkWithdraw(amount) {
        fetch('/api/withdrawl', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: parseInt(amount),
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if(resJson.success) {
                this.unlockDb();
                this.setState({
                    currentAmount: resJson.balance,
                    showModalWithdraw: false
                });
            }
            else {
                alert(resJson.message);
            }
        })
        .catch(err => alert(err));
    }

    handleOkCredit(amount) {
        fetch('/api/credit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: parseInt(amount),
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if(resJson.success) {
                this.unlockDb();
                this.setState({
                    currentAmount: resJson.balance,
                    showModalCredit: false
                });
            }
            else {
                alert(resJson.message);
            }
        })
        .catch(err => alert(err));
    }

    handleCancel() {
        this.unlockDb();
        this.setState({
            showModalWithdraw: false,
            showModalCredit: false
        });
    }

    unlockDb() {
        fetch('/api/unlockdb', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => console.log(resJson))
    }

    modalTable() {
        fetch('/api/passbook', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            this.setState({
                dataSource: resJson,
                showModalTable: true
            })
        });
    }

    modalWithdraw() {
        fetch('api/getdetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson.balance[0].mutex);
            if(!resJson.balance[0].mutex) {
                fetch('/api/lockdb', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountNo: this.props.location.state.json.accountNo
                    }),
                })
                .then(res => res.json())
                .then(resJson => {
                    this.setState({
                        showModalWithdraw: true
                    });
                    console.log(resJson);
                })
            }
            else {
                alert('Account is being transacted by somebody else');
            }
        })
    }

    modalCredit() {
        fetch('api/getdetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNo: this.props.location.state.json.accountNo
            }),
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson.balance[0].mutex);
            if(!resJson.balance[0].mutex) {
                fetch('/api/lockdb', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountNo: this.props.location.state.json.accountNo
                    }),
                })
                .then(res => res.json())
                .then(resJson => {
                    this.setState({
                        showModalCredit: true
                    });
                    console.log(resJson);
                })
            }
            else {
                alert('Account is being transacted by somebody else');
            }
        })
    }

    handleLogout() {
        localStorage.setItem('sessionToken', null);
        this.props.history.push('/');
    }

    render() {
        let jsonData = this.props.location.state.json;
        return (
            <div className='mainContainerBank'>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '25px'}}>
                    <Button type="primary" size="large">{this.props.location.state.userName}</Button>
                    <Button type="primary" size="large" onClick={this.handleLogout}>Logout</Button>
                </div>
                <InfoCards totalAmount={this.state.currentAmount} accountNumber={jsonData.accountNo} />
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
                        <Button type="primary" size="large" onClick={this.modalTable}>Statement</Button>
                    </div>
                </div>
                <WithdrawlModal visible={this.state.showModalWithdraw} handleOk={this.handleOkWithdraw} handleCancel={this.handleCancel} />
                <CreditModal visible={this.state.showModalCredit} handleOk={this.handleOkCredit} handleCancel={this.handleCancel} />
                <TableModal visible={this.state.showModalTable} handleOk={this.handleOkTable} dataSource={this.state.dataSource} columns={columns} />
            </div>
        )
    }
}