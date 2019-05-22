import TopBar from '../components/TopBar'
import { FaPlus } from 'react-icons/fa'
import QuotesSidebar from '../components/QuotesSidebar'
import QuotesList from '../components/QuotesList'
import React from 'react'

export const Quotes = () => (
    <div className="App">
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={ { marginBottom: 0 } }>
            <TopBar/>
        </nav>

        <div id="page-wrapper">
            <div className="row page-header-row">
                <div className="col-lg-12">
                    <h3 className="page-header">My Quotes</h3>
                </div>
            </div>

            <div className="row">
                <div id="quotes-list" className="row" ng-controller="filterController"
                     ng-init="init({{ object.id }}, {{ request.user.id }})">
                    <a href="" className="add-quote-icon" ng-click="setEditItem()">
                        <FaPlus size='2em'/>
                    </a>
                    <div id="filters" className="col-xs-12 col-md-3">
                        <QuotesSidebar/>
                    </div>

                    <div id="filtered-content" className="col-xs-12 col-sm-12 col-md-8">
                        <QuotesList quotes={ [{}] }/>
                    </div>
                </div>


            </div>
        </div>
    </div>
)

export default Quotes