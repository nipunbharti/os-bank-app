import React, { Component } from 'react';
import { Modal, Input } from 'antd';

export default class CreditModal extends Component {

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

    render() {
        return (
            <div>
                <Modal
                    title="Credit money"
                    visible={this.props.visible}
                    onOk={() => this.props.handleOk(this.state.amount)}
                    onCancel={this.props.handleCancel}
                >
                    <Input placeholder="Enter the amount you want to credit" onChange={this.handleChange} />   
                </Modal>
            </div>
        )
    }
}