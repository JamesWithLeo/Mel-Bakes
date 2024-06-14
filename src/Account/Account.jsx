import React, { Component } from "react";



export default class Account extends Component {
  constructor(){
    super();
    this.state = {
      Username: "",
      Gmail: '',
      Password: '',
    };
    function setGmail(val) {
      this.setState({Gmail: val})
    }
    function setPassword(pass) {
      this.setState({Password: pass})
    }
  }


  render() {
    return (null  )
  }

}