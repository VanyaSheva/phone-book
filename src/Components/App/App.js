import React, { Component } from "react";
import ContactsList from "../ContactsList/ContactsList";
import AddContact from "../AddContact/AddContact";
import { v4 as uuidv4 } from "uuid";
import Filter from "../CotactsFilter/Filter";
import { CSSTransition } from "react-transition-group";
import slideTransition from "../transitions/slide.module.css";
import backSlideTransition from "../transitions/backslide.module.css";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import styles from "./App.module.css";

const onFilterChange = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    showTitle: false,
    showError: false,
  };

  onAddContact = (addingContact) => {
    const { name } = addingContact;
    if (this.state.contacts.find((contact) => contact.name === name)) {
      this.setState({ showError: true });
      setTimeout(() => {
        this.setState({ showError: false });
      }, 2000);
      return;
    }
    const contactToAdd = {
      ...addingContact,
      id: uuidv4(),
    };
    this.setState((state) => ({
      contacts: [...state.contacts, contactToAdd],
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  onDeleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    this.setState({ showTitle: true });
    if (localStorage.getItem("contacts")) {
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    }
  }

  render() {
    const { contacts, filter, showTitle, showError } = this.state;
    const filteredContacts = onFilterChange(contacts, filter);
    return (
      <div className={styles.wrapper}>
        <CSSTransition
          in={showTitle}
          timeout={500}
          classNames={slideTransition}
          unmountOnExit
        >
          <h1>Phonebook</h1>
        </CSSTransition>

        <AddContact onFormSubmit={this.onAddContact} />
        <h2>Contacts</h2>
        <CSSTransition
          in={contacts.length >= 2}
          timeout={500}
          classNames={slideTransition}
          unmountOnExit
        >
          <Filter
            value={this.state.filter}
            onFilter={this.changeFilter}
            contacts={contacts}
          />
        </CSSTransition>

        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />

        <CSSTransition
          in={showError}
          timeout={500}
          classNames={backSlideTransition}
          unmountOnExit
        >
          <ErrorNotification />
        </CSSTransition>
      </div>
    );
  }
}
