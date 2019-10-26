import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { connect } from 'react-redux'
import { getQuotes } from '../redux/quotes'
import { changeSearch } from '../redux/filters'

const Search = ({dispatch}) => {
    const [searchText, setSearchTest] = useState('')

    return (
        <div className="sidebar-search">
            <div className="input-group custom-search-form">
                <input
                    className="form-control"
                    placeholder="Search..."
                    onChange={(event) => setSearchTest(event.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            dispatch(changeSearch(searchText))
                        }
                    }}
                    value={searchText}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        onClick={() => {
                            dispatch(getQuotes({search: searchText}))
                        }}
                    >
                        <FaSearch width="13" height="50"/>
                    </button>
                </span>
            </div>
        </div>
    )
}


export default connect()(Search)
