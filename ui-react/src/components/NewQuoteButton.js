import React from 'react'
import { showModal } from "../redux/ui";
import { FaPlus } from "react-icons/fa";
import QuoteForm from "./QuoteForm";
import { connect } from "react-redux";

const getNewQuoteModal = (quote) => {
    return {
        title: 'New Quote',
        content: <QuoteForm/>
    }
}

const NewQuoteButton = ({dispatch, isAuthenticated}) => {
    if (!isAuthenticated) {
        return null
    }

    return (
        <span className="add-quote-icon" onClick={(event) => dispatch(showModal(getNewQuoteModal()))}>
            <FaPlus color='#337ab7' size='2em'/>
        </span>
    )
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapStateToProps)(NewQuoteButton)
