import React, { Component } from 'react';
import { Modal, Input } from 'antd';

export default class WithdrawlModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            amount: e.target.value
        });
    }

    componentWillUnmount() {
        this.setState({
            amount: null
        })
    }

    render() {
        return (
            <div>
                <Modal
                    title="Withdraw money"
                    visible={this.props.visible}
                    onOk={() => this.props.handleOk(this.state.amount)}
                    onCancel={this.props.handleCancel}
                >
                    <Input placeholder="Enter the amount you want to withdraw" onChange={this.handleChange} />   
                </Modal>
            </div>
        )
    }
}