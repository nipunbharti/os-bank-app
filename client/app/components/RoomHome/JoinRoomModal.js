import React, { Component } from "react";
import { Button, Modal, Input, Icon } from "antd";

class JoinRoomModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      roomName: ""
    };

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk(e) {
    if(this.props.type != "join"){
        fetch("/api/createRoom", {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomName: this.state.roomName,
                email: localStorage.getItem('sessionMail')
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }
    else{
        fetch("/api/joinRoom", {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomName: this.state.roomName,
                email: localStorage.getItem('sessionMail')
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }
    this.setState({
      visible: false
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  onChangeInput(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  render() {
      console.log(localStorage.getItem('sessionMail'));
    var inputText;
    this.props.type == "join"
      ? (inputText = "Enter the room name to join")
      : (inputText = "Enter room name");
    return (
      <div>
        <Button type="primary" onClick={this.showModal} size="large">
          {this.props.buttonText}
        </Button>
        <Modal
          title={this.props.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder={inputText}
            prefix={<Icon type="home" theme="outlined" />}
            value={this.state.roomName}
            onChange={this.onChangeInput}
            ref={node => (this.userNameInput = node)}
            style={{ padding: "6px" }}
          />
        </Modal>
      </div>
    );
  }
}

export default JoinRoomModal;
