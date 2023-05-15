import React, {useState} from 'react';
import classNames from "classnames";
import styles from './Links.module.css';
import useFetch from '../../hooks/useFetch';
import {serverUrl} from "../../constants";
import axios from "axios";


function Links() {
  const [url, setUrl] = useState('')
  const {data,loading, handleSetData} = useFetch(`${serverUrl}/allLinks`)

  const handleChangeUrl = (e: {target: { value: string }}) => {
    setUrl(e.target.value)
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/delete/${id}`)
      await handleSetData();
      setUrl('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/links`, {
        url,
      })
      await handleSetData();
      setUrl('')
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form_content} action="/">
        <input onChange={handleChangeUrl} className={styles.form_input} value={url} type="text"/>
        <input className={classNames(styles.button, styles.form_button)} type="submit" />
      </form>
      <div className={styles.links_content}>
        {loading && <div>Loading...</div>}
        {data && data.map(item => {
          return (
            <div key={item.id} className={styles.link_item}>
              <a href={`${serverUrl}/link/${item.id}`} target="_blank" rel="noreferrer">{item.id}</a>
              <div className={styles.buttons_content}>
                <button className={classNames(styles.button, styles.download_button)}>Download</button>
                <button onClick={() => handleDelete(item.id)} className={classNames(styles.button, styles.delete_button)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Links;
