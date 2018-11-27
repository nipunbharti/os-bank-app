import React, { Component } from 'react';
import { Modal, Table } from 'antd';

export default class TableModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: null
        };
    }

    render() {
        return (
            <div>
                <Modal
                    title="Withdraw money"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleOk}
                >
                    <Table dataSource={this.props.dataSource} columns={this.props.columns} />   
                </Modal>
            </div>
        )
    }
}