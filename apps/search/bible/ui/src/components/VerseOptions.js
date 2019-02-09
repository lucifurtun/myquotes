import React from 'react'
import { connect } from 'react-redux'
import { values } from 'lodash'
import { stores } from '../redux'


class VerseOptions extends React.Component {
    constructor(props) {
        super(props)

        this.element = React.createRef()
    }

    render() {
        if (!this.props.options.display) {
            return null
        }

        const verse = this.props.options.verse

        return (
            <ul ref={this.element} id="verse-options"> className="dropdown-menu" style={{
                left: `${this.props.options.x}px`,
                top: `${this.props.options.y - 110}px`
            }}
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
                    this.props.versions.map((version, i) => (
                        <li key={i}
                            onClick={(event) => {
                                event.preventDefault()
                                const store = stores[version.id]
                                const payload = {
                                    book: verse.book_number,
                                    chapter: verse.chapter_number,
                                    verse: verse.identifier
                                }

                                store.dispatch({ type: 'SET_HIGHLIGHTED_ELEMENT', payload })
                            }}
                        >
                            <a href="#">Open in {version.label_short}</a>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        options: state.ui.verseOptions,
        versions: values(state.versions)
    }
}

export default connect(mapStateToProps)(VerseOptions)
