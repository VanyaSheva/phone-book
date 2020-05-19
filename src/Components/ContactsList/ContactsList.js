import React from "react";
import Contact from "../Contact/Contact";
import styles from "./ContactsList.module.css";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import popTransition from "../transitions/pop.module.css";

const ContactsList = ({ contacts, onDeleteContact }) => (
  <TransitionGroup component="ul" className={styles.list}>
    {contacts.map((contact) => (
      <CSSTransition key={contact.id} timeout={200} classNames={popTransition}>
        <li key={contact.id} className={styles.listItem}>
          <Contact {...contact} onDelete={() => onDeleteContact(contact.id)} />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
