import React from 'react'
import { connect } from 'react-redux'
import { has, orderBy, toArray } from 'lodash'
import Quote from './Quote'
import { getQuotes } from '../redux/quotes'
import { withRouter } from 'react-router-dom'
import QuotesOverlay from "./QuotesOverlay";
import { RoutingParamsContext } from "../redux/routing";
import Offline from "./Offline";

class QuotesList extends React.Component {
    static contextType = RoutingParamsContext;

    constructor(props, context) {
        super(props)

        this.state = {
            username: has(context.params, 'username') ? context.params.username : null
        }
    }

    loadData() {
        const {dispatch, filters, page, hasMore} = this.props

        if (hasMore) {
            this.setState({isLoading: true})
            const params = {
                user__username: this.state.username,
                author: toArray(filters.authors),
                category: toArray(filters.categories),
                tags: toArray(filters.tags),
                page: page ? page + 1 : page
            }

            dispatch(getQuotes(params))
        }
    }

    componentDidMount() {
        this.props.dispatch(getQuotes({user__username: this.state.username}))
    }

    render() {
        return (
            <div id="quotes-wrapper">
                <QuotesOverlay isLoading={this.props.isLoading}/>
                <div>
                    {
                        this.props.quotes.map((item => (
                            <Quote quote={item} key={item.id}/>
                        )))
                    }
                    {
                        this.props.quotes.length === 0 && this.props.isOnline && <span>There are no quotes!</span>
                    }
                    {
                        !this.props.isOnline && <Offline/>
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

    const isLoading = state.api.isLoading
    const isOnline = state.api.isOnline

    return {
        isLoading,
        isOnline,
        quotes,
        filters,
        page,
        hasMore
    }
}

export default withRouter(connect(mapStateToProps)(QuotesList))
