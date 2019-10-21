import React from 'react'
import { showModal } from "../redux/ui";
import { connect } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import FilterDelete from "./FilterDelete";

const getDeleteFilterModal = (type, filter) => {
    return {
        title: 'Are you sure?',
        content: <FilterDelete type={type} filter={filter}/>
    }
}

const RemoveFilterButton = ({dispatch, type, item, isAuthenticated}) => {
    if (!isAuthenticated) {
        return null
    }

    return (
        <span
            className='remove-filter-button visible-on-hover'
            onClick={(event) => dispatch(showModal(getDeleteFilterModal(type, item)))}
            style={{verticalAlign: 'middle', marginLeft: '5px'}}
        >
            <FaTrashAlt color='red'/>
        </span>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(RemoveFilterButton)
