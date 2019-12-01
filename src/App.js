import React, { Component, Fragment, useState, useEffect } from "react";
import ContextDrawer from './ContextDrawer/ContextDrawer'
import "./App.css";

class App extends Component {
  render() {
    return (
      <ContextDrawer />
    );
  }
}

const Layout = props => (
  <Fragment>
    <div className="Header">
      <h1>Playground</h1>
    </div>
    {props.children}
  </Fragment>
);

const MainContent = props => (
  <div>
    <ControlledFormDemo />
  </div>
);

class ControlledFormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: "",
      items: []
    };
  }

  handleChange = e => {
    this.setState({ formValue: e.target.value });
  };

  handleSubmit = e => {
    const { formValue } = this.state;
    this.setState({ formValue: "" });
    this.addItem(formValue);
    e.preventDefault();
  };

  addItem = item => {
    const {items} = this.state;
    this.setState({items: items.concat(item)})
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Enter Instructions: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.formValue}
          />
        </form>
        <div className="formItems">
          {this.state.items.map((item, index) => (<div key={index}>{item}</div>))}
        </div>
      </Fragment>
    );
  }
}

export default App;
