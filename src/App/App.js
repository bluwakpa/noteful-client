import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'

function App () {
  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])

  //replaces component did mount
  useEffect(()=> {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        setNotes(notes)
        setFolders(folders)
      })
      .catch(error => {
        console.error({ error })
      })
  },[])

  const handleAddFolder = folder => {
    setFolders([
        ...folders,
        folder
      ]
    )
  }

  const handleAddNote = note => {
    setNotes([
        ...notes,
        note
      ]
    )
  }

  const handleDeleteNote = noteId => {
    setNotes(notes.filter(note => note.id !== noteId))
  }

  function renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  function renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

    const value = {
      notes: notes,
      folders: folders,
      addFolder: handleAddFolder,
      addNote: handleAddNote,
      deleteNote: handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
}

export default App