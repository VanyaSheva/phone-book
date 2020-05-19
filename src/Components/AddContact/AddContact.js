import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./AddContact.module.css";
export default class App extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onFormSubmit({ ...this.state });

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          ></input>
        </label>
        <label className={styles.formLabel}>
          Number
          <input
            className={styles.input}
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          ></input>
        </label>
        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
