import React from 'react'
import { connect } from 'react-redux'
import { orderBy } from 'lodash'
import Quote from './Quote'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { getQuotes } from '../redux/quotes'
import { withRouter } from '../redux/routing'

class QuotesList extends React.Component {
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
                <div className="pagination-wrapper">
                    <ul className="pagination">
                        <li ng-if="pages.previous">
                            <a href="" ng-click="updatePage('previous')">
                                <FaArrowLeft/>
                            </a>
                        </li>
                        <li ng-if="pages.next">
                            <a href="" ng-click="updatePage('next')">
                                <FaArrowRight/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const quotes = orderBy(state.quotes.data, 'id', 'desc')
    return {quotes}
}

export default withRouter(connect(mapStateToProps)(QuotesList))
