import React from 'react'
import { connect } from 'react-redux'
import { values } from 'lodash'
import { stores } from '../redux'

const VerseOptions = ({ options, versions }) => {
    if (!options.display) {
        return null
    }

    const verse = options.verse

    return (
        <ul className="dropdown-menu" style={{ left: `${options.x}px`, top: `${options.y}px` }} id="verse-options">
            <li onClick={(event) => {
                event.preventDefault()
                const content = `[${verse.book_title} ${verse.chapter_number}:${verse.number}] ${verse.text}`

                navigator.clipboard.writeText(content)
                stores.root.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
            }}
            >
                <a href="#">Copy</a>
            </li>
            <li role="separator" className="divider"/>
            {
                versions.map((version, i) => (
                    <li key={i}
                        onClick={(event) => {
                            event.preventDefault()
                            const store = stores[version.id]
                            const payload = { book: verse.book_title, chapter: verse.chapter_number }
                            store.dispatch({ type: 'SET_FILTERS', payload })
                            store.dispatch({ type: 'SET_SELECTED_VERSE', payload: verse.identifier })
                        }}
                    >
                        <a href="#">Open in {version.label_short}</a>
                    </li>
                ))
            }
        </ul>
    )
}

function mapStateToProps(state) {
    return {
        options: state.ui.verseOptions,
        versions: values(state.versions)
    }
}

export default connect(mapStateToProps)(VerseOptions)
