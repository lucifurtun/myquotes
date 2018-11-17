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
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.loadData()
            }
        }
    }

    loadData() {
        const { dispatch, filters, page } = this.props
        dispatch(getVerses(filters.book, filters.chapter, filters.search, page ? page + 1 : page))
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
            </div>
        )
    }
}


function mapStateToProps(state) {
    const verses = state.verses.data
    const page = state.verses.page
    const filters = state.filters
    const chapters = groupBy(verses, (item) => item.chapter_number)

    return {
        verses: verses,
        chapters: chapters,
        page: page,
        filters: filters
    }
}

export default connect(mapStateToProps)(InfiniteList)
