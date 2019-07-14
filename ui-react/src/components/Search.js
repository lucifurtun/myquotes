import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => (
    <div className="sidebar-search" ng-controller="search">
        <div className="input-group custom-search-form">
            <input type="text" className="form-control" placeholder="Search..." ng-model="search"/>
            <span className="input-group-btn">
            <button className="btn btn-default">
               <FaSearch width="13" height="50"/>
            </button>
        </span>
        </div>
    </div>
)


export default Search
