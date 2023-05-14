import React from 'react';
import classNames from "classnames";
import styles from './Links.module.css';


function Links() {
  return (
    <div className={styles.container}>
      <form className={styles.form_content} action="/">
        <input className={styles.form_input} type="text"/>
        <input className={classNames(styles.button, styles.form_button)} type="submit" />
      </form>
      <div className={styles.links_content}>
        <div className={styles.link_item}>
          <a href="#">link 1</a>
          <div className={styles.buttons_content}>
            <button className={classNames(styles.button, styles.download_button)}>Download</button>
            <button className={classNames(styles.button, styles.delete_button)}>Delete</button>
          </div>
        </div>
        <div className={styles.link_item}>
          <a href="#">link 2</a>
          <div className={styles.buttons_content}>
            <button className={classNames(styles.button, styles.download_button)}>Download</button>
            <button className={classNames(styles.button, styles.delete_button)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
