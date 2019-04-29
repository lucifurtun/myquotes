import React, { Component } from 'react'
import Verse from './Verse'
import { connect } from 'react-redux'
import { getVerses } from '../redux/verse'
import { isUndefined, values } from 'lodash'
import { stores } from '../redux'

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

    return previousItem.book_number !== item.book_number
}

class InfiniteList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }

        this.verseWrapper = React.createRef()
        this.verseElements = {}
    }

    componentDidMount() {
        window.onscroll = () => {
            this.handleScroll()
        }
    }

    handleScroll = (event) => {
        let offset, scroll

        if (this.props.verseOptionsDisplayed) {
            stores.root.dispatch({ type: 'HIDE_VERSE_OPTIONS' })
        }

        if (this.props.isMobile === true) {
            let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop
            scroll = window.innerHeight + scrollHeight
            offset = document.documentElement.offsetHeight
        } else {
            let element = this.verseWrapper.current
            let scrollHeight = element.scrollTop
            scroll = element.offsetHeight + scrollHeight
            offset = element.scrollHeight
        }

        if (scroll >= offset - 550) {
            if (!this.state.isLoading) {
                this.loadData()
            }
        }
    }

    loadData() {
        const { dispatch, filters, page, hasMore } = this.props

        if (hasMore) {
            this.setState({ isLoading: true })
            dispatch(getVerses(filters.book, filters.chapter, filters.search, page ? page + 1 : page))
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isLoading !== prevState.isLoading) {
            if (nextProps.isLoading === false) {
                return { isLoading: false }
            }
        }

        return null
    }

    componentDidUpdate(prevProps) {
        if (this.props.scrolledTo && (this.props.scrolledTo !== prevProps.scrolledTo)) {
            this.verseWrapper.current.scrollTo(0, this.verseElements[this.props.scrolledTo].offsetTop)
        }
    }

    render() {
        const { filtersSnapshot, books } = this.props

        const noResultsBookText = filtersSnapshot.book ? <span> in <i>{books[filtersSnapshot.book].title}</i></span> : ''
        const noResultsChapterText = filtersSnapshot.chapter ? <i> {filtersSnapshot.chapter}</i> : ''
        const noResultsSearchText = filtersSnapshot.search ? <span>for "${filtersSnapshot.search}"</span> : ''
        const noResultsFiltersText = <span>{noResultsSearchText}{noResultsBookText}{noResultsChapterText}</span>

        return (
            <div ref={this.verseWrapper} className="verses-wrapper" onScroll={this.handleScroll}>
                {this.props.verses.map(
                    (item, i, array) => {
                        const isSelected = item.identifier === this.props.selected
                        return (
                            <div ref={(element) => this.verseElements[item.identifier] = element} key={i}>
                                {
                                    isFirstBookOccurrence(item, i, array) &&
                                    <h2 className="verse-book">{item.book_title}</h2>
                                }
                                {
                                    isFirstChapterOccurrence(item, i, array) &&
                                    <h3 className="verse-chapter">{item.chapter_number}</h3>
                                }
                                <Verse item={item} isSelected={isSelected}/>
                            </div>
                        )
                    }
                )}

                {!this.props.verses.length && <h4 className="no-results">No results {noResultsFiltersText}.</h4>}
            </div>
        )
    }
}


function mapStateToProps(state) {
    const verses = values(state.verses.data)
    const books = state.books.data
    const page = state.verses.page
    const hasMore = state.verses.hasMore
    const selected = state.verses.selected
    const scrolledTo = state.verses.scrolledTo
    const isLoading = state.api.isLoading
    const filters = state.filters
    const filtersSnapshot = state.filters.snapshot

    return {
        verses,
        books,
        page,
        hasMore,
        selected,
        scrolledTo,
        isLoading,
        filters,
        filtersSnapshot
    }
}

export default connect(mapStateToProps)(InfiniteList)
