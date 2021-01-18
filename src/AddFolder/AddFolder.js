import React, { useContext } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default function AddFolder(props) {
  AddFolder.defaultProps = {
    history: {
      push: () => { }
    },
  }
 const context = useContext(ApiContext)

  const handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        context.addFolder(folder)
        props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input required type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
}
