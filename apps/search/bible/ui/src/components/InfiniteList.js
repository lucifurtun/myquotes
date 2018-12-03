import React, { Component } from 'react'
import Verse from './Verse'
import { connect } from 'react-redux'
import { getVerses } from '../redux/verse'
import { isUndefined } from 'lodash'
import { formValueSelector } from 'redux-form'

function isFirstChapterOccurrence(item, index, array) {
    const previousItem = array[index - 1]
    if (isUndefined(previousItem)) {
        return true
    }

    return previousItem.chapter_number !== item.chapter_number
}

function isFirstBookOccurrence(item, index, array) {
    const previousItem = array[index - 1]
    if (isUndefined(previousItem)) {
        return true
    }

    return previousItem.book_title !== item.book_title
}

class InfiniteList extends Component {
    constructor(props) {
        super(props)

        this.verseWrapper = React.createRef()

    }

    handleScroll = (event) => {
        let element = this.verseWrapper.current

        let scrollHeight = element.scrollTop
        let scroll = element.offsetHeight + scrollHeight
        let offset = element.scrollHeight

        if (scroll === offset) {
            this.loadData()
        }
    }

    loadData() {
        const { dispatch, filters, page, hasMore } = this.props

        if (hasMore) {
            dispatch(getVerses(filters.book, filters.chapter, filters.search, page ? page + 1 : page))
        }
    }

    render() {
        return (
            <div ref={this.verseWrapper} className="verses-wrapper" onScroll={this.handleScroll}>
                {this.props.verses.map(
                    (item, i, array) => (
                        <div key={i}>
                            {isFirstBookOccurrence(item, i, array) && <h2>{item.book_title}</h2>}
                            {isFirstChapterOccurrence(item, i, array) && <h3>{item.chapter_number}</h3>}
                            <Verse
                                key={i}
                                number={item.number}
                                text={item.text_highlight ? item.text_highlight : item.text}
                            />
                        </div>
                    )
                )}

                {!this.props.verses.length && <h4 className="no-results">No results...</h4>}

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    const selector = formValueSelector('filters')

    const verses = state.verses.data
    const page = state.verses.page
    const hasMore = state.verses.hasMore
    const filters = selector(state, 'book', 'chapter', 'search')

    return {
        verses,
        page,
        hasMore,
        filters
    }
}

export default connect(mapStateToProps)(InfiniteList)
