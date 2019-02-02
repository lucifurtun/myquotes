import React from 'react'
import { connect } from 'react-redux'
import { stores } from '../redux'

const VerseOptions = ({ options }) => {
    if (!options.display) {
        return null
    }

    return (
        <ul className="dropdown-menu" style={{ left: `${options.x}px`, top: `${options.y}px` }} id="verse-options">
            <li onClick={(event) => {
                event.preventDefault()

                const v = options.verse
                const content = `[${v.book_title} ${v.chapter_number}:${v.number}] ${v.text}`

                navigator.clipboard.writeText(content)
                stores.root.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
            }}
            >
                <a href="#">Copy</a>
            </li>
        </ul>
    )
}

function mapStateToProps(state) {
    return {
        options: state.ui.verseOptions
    }
}

export default connect(mapStateToProps)(VerseOptions)
