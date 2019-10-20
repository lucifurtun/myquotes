import TopBar from '../components/TopBar'
import QuotesSidebar from '../components/QuotesSidebar'
import QuotesList from '../components/QuotesList'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { RoutingParamsContext } from "../redux/routing"
import NewQuoteButton from "../components/NewQuoteButton";



const Quotes = ({match}) => (
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
                <RoutingParamsContext.Provider value={match}>
                    <div id="quotes-list" className="row">
                        <NewQuoteButton/>
                        <div id="filters" className="col-xs-12 col-md-3">
                            <QuotesSidebar/>
                        </div>

                        <div id="filtered-content" className="col-xs-12 col-sm-12 col-md-8">
                            <QuotesList/>
                        </div>
                    </div>
                </RoutingParamsContext.Provider>
            </div>
        </div>
    </div>
)

export default withRouter(Quotes)
