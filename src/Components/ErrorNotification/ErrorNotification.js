import React from "react";
import styles from "./ErrorNotification.module.css";

const ErrorNotification = () => (
  <div className={styles.errorBox}>
    <p>This contact is already exist</p>
  </div>
);

export default ErrorNotification;
