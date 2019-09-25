import TopBar from '../components/TopBar'
import { FaPlus } from 'react-icons/fa'
import QuotesSidebar from '../components/QuotesSidebar'
import QuotesList from '../components/QuotesList'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { showModal } from '../redux/ui'
import QuoteForm from '../components/QuoteForm'
import { store } from '..'

const getNewQuoteModal = (quote) => {
    return {
        title: 'New Quote',
        content: <QuoteForm/>
    }
}

const Quotes = () => (
    <div className="App">
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
            <TopBar/>
        </nav>

        <div id="page-wrapper">
            <div className="row page-header-row">
                <div className="col-lg-12">
                    <h3 className="page-header">My Quotes</h3>
                </div>
            </div>

            <div className="row">
                <div id="quotes-list" className="row">
                    <span className="add-quote-icon" onClick={(event) => store.dispatch(showModal(getNewQuoteModal()))}>
                        <FaPlus color='#337ab7' size='2em'/>
                    </span>
                    <div id="filters" className="col-xs-12 col-md-3">
                        <QuotesSidebar/>
                    </div>

                    <div id="filtered-content" className="col-xs-12 col-sm-12 col-md-8">
                        <QuotesList/>
                    </div>
                </div>


            </div>
        </div>
    </div>
)

export default withRouter(Quotes)
