import React from 'react'
import { stores } from '../redux'
import { connect } from 'react-redux'

const html = (text) => ({ __html: text })

const handleOnClick = (event, item, dispatch) => {
    const payload = {
        x: event.pageX,
        y: event.pageY,
        verse: item
    }

    stores.root.dispatch({ type: 'SHOW_VERSE_OPTIONS', payload: payload })
    dispatch({ type: 'SET_SELECTED_VERSE', payload: item.identifier })

}

const handleOnBlur = (event, item, dispatch) => {
    // FIXME: Hackish workaround for verse options.
    const verseOptions = document.getElementById('verse-options')

    if (verseOptions === null || !verseOptions.contains(event.relatedTarget)) {
        stores.root.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
        dispatch({ type: 'SET_SELECTED_VERSE', payload: null })
    }
}

const Verse = ({ item, isSelected, dispatch }) => {
    const text = item.text_highlight ? item.text_highlight : item.text

    return (
        <div
            onClick={(event) => handleOnClick(event, item, dispatch)}
            onBlur={(event) => handleOnBlur(event, item, dispatch)}
            tabIndex={0}
            className={'verse' + (isSelected ? ' selected' : '')}
        >
            <span className="verse-number" style={{ marginRight: '2px' }}>{item.number}.</span>
            <span className="verse-text" dangerouslySetInnerHTML={html(text)}/>
        </div>
    )
}

export default connect()(Verse)
