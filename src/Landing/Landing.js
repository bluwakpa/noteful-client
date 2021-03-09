import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './Landing.css'

export default function Landing(props) {
    return (
        <section className='Landing'>
        <body>
    <nav role="navigation">
        <a href="#back">Back</a>
		<a href="#index">Present</a>
		<a href="#attendance">Home</a>
    </nav>

    <main role="main">
        <header role="banner">

            <h2>About</h2>
        </header>

        <section>
            <p>Take attendance of your classroom by creating student profiles for each class period.</p>
        </section>

        <section class="button-section">

            <a href="#attendance"><button>Start</button></a>
        </section>

    </main>
    <footer role="content-info">Copyright 2021</footer>
</body>
        </section>
    )
}