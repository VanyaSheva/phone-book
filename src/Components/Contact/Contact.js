import React, { Fragment } from "react";
import styles from "./Contact.module.css";
import PropTypes from "prop-types";

const Contact = ({ name, number, onDelete }) => (
  <Fragment>
    <p className={styles.name}>{name}</p>
    <p className={styles.phone}>{number}</p>
    <button type="button" onClick={onDelete} className={styles.button}>
      Delete
    </button>
  </Fragment>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
