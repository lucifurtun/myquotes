import React from 'react'
import { connect } from 'react-redux'
import { orderBy, toArray } from 'lodash'
import Quote from './Quote'
import { getQuotes } from '../redux/quotes'
import { withRouter } from 'react-router-dom'

class QuotesList extends React.Component {
    loadData() {
        const {dispatch, filters, page, hasMore} = this.props

        if (hasMore) {
            this.setState({isLoading: true})
            const params = {
                author: toArray(filters.authors),
                category: toArray(filters.categories),
                tags: toArray(filters.tags),
                page: page ? page + 1 : page
            }

            dispatch(getQuotes(params))
        }
    }

    componentDidMount() {
        this.props.dispatch(getQuotes())
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.props.quotes.map((item => (
                            <Quote quote={item} key={item.id}/>
                        )))
                    }

                    {
                        this.props.quotes.length === 0 && <span>There are no quotes!</span>
                    }

                </div>
                <div className="pagination-wrapper" style={{textAlign: 'center', marginBottom: '30px', float: 'none'}}>
                    {
                        this.props.hasMore &&
                        <button
                            style={{minWidth: '150px', maxWidth: '200px'}}
                            className="btn btn-primary"
                            onClick={(event) => this.loadData()}
                        >
                            Load More
                        </button>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const quotes = orderBy(state.quotes.data, 'id', 'desc')
    const filters = state.filters

    const page = state.quotes.page
    const hasMore = state.quotes.hasMore

    return {
        quotes,
        filters,
        page,
        hasMore
    }
}

export default withRouter(connect(mapStateToProps)(QuotesList))
