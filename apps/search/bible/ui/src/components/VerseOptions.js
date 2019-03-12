import React from 'react'
import { connect } from 'react-redux'
import { orderBy, values } from 'lodash'
import { stores } from '../redux'
import onClickOutside from 'react-onclickoutside'


class VerseOptions extends React.Component {
    constructor(props) {
        super(props)

        this.element = React.createRef()
        this.height = null
    }

    handleClickOutside() {
        this.props.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
    }

    componentDidMount() {
        this.height = this.element.current.clientHeight
    }

    componentDidUpdate() {
        this.height = this.element.current.clientHeight
    }

    render() {
        const verse = this.props.options.verse

        return (
            <ul ref={this.element} id="verse-options" className="dropdown-menu" style={{
                left: `${this.props.options.x}px`,
                top: `${this.props.options.y - this.height}px`,
                visibility: this.props.options.display ? 'initial' : 'hidden'
            }}
            >
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
                                store.dispatch({ type: 'SET_HIGHLIGHTED_ELEMENT', payload: verse })
                            }}
                        >
                            <a href="#">Open in {version.labelShort} [{version.smartIndex}]</a>
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
        versions: orderBy(values(state.versions), ['ordering', 'asc'])
    }
}

export default connect(mapStateToProps)(onClickOutside(VerseOptions))
