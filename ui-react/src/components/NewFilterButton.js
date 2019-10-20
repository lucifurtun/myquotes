import React from 'react'
import { connect } from "react-redux";
import { showModal } from "../redux/ui";
import { FaPlus } from "react-icons/fa";
import { upperFirst } from "lodash";
import FilterForm from "./FilterForm";

const getAddFilterModal = (type) => {
    return {
        title: upperFirst(type),
        content: <FilterForm type={type}/>
    }
}

const NewFilterButton = ({type, isAuthenticated, dispatch}) => {
    if (!isAuthenticated) {
        return null
    }

    return (
        <span
            style={{cursor: 'pointer'}}
            className='pull-right'
            onClick={(event) => dispatch(showModal(getAddFilterModal(type)))}
        >
            <FaPlus/>
        </span>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(NewFilterButton)
