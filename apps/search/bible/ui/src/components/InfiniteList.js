import React, { Component } from 'react'
import Verse from './Verse'
import { connect } from 'react-redux'
import { getVerses } from '../redux/verse'
import { groupBy, isUndefined } from 'lodash'

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

        window.onscroll = () => {
            let scroll = window.innerHeight + document.documentElement.scrollTop
            let offset = document.documentElement.offsetHeight

            console.log(scroll, offset)

            if (scroll === offset) {
                this.loadData()
            }
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
            <div>
                {this.props.verses.map(
                    (item, i, array) => (
                        <div key={i}>
                            {isFirstBookOccurrence(item, i, array) && <h2>{item.book_title}</h2>}
                            {isFirstChapterOccurrence(item, i, array) && <h3>{item.chapter_number}</h3>}
                            <Verse key={i} number={item.number} text={item.text}/>
                        </div>
                    )
                )}
                {!this.props.verses.length &&
                <div style={{ marginTop: '10px' }}>No results...</div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    const verses = state.verses.data
    const page = state.verses.page
    const hasMore = state.verses.hasMore
    const filters = state.filters
    const chapters = groupBy(verses, (item) => item.chapter_number)

    return {
        verses,
        chapters,
        page,
        hasMore,
        filters
    }
}

export default connect(mapStateToProps)(InfiniteList)
