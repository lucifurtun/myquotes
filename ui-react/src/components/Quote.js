import React from 'react'

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { connect } from 'react-redux'
import { showModal } from '../redux/ui'
import QuoteForm from './QuoteForm'
import QuoteDelete from './QuoteDelete'

const html = (text) => ({__html: text})


const getEditQuoteModal = (quote) => {
    return {
        title: 'Edit Quote',
        content: <QuoteForm quote={quote}/>
    }
}

const getDeleteQuiteModal = (quote) => {
    return {
        title: 'Are you sure?',
        content: <QuoteDelete quote={quote}/>
    }
}

const Quote = ({quote, user, dispatch}) => (
    <div className="list-group">
        <div className="list-group-item">
            {(quote.user_id === user.id) &&
            <span className="quote-actions">
                <a
                    href=""
                    id="edit-button"
                    className="visible-on-hover"
                    onClick={(event) => {
                        event.preventDefault()
                        dispatch(showModal(getEditQuoteModal(quote)))
                    }}

                >
                    <FaPencilAlt/>
                </a>
                <a href="" id="delete-button" className="visible-on-hover"
                   onClick={(event) => {
                       event.preventDefault()
                       dispatch(showModal(getDeleteQuiteModal(quote)))
                   }}
                >
                    <FaTrashAlt/>
                </a>
            </span>
            }
            <h4 className="list-group-item-heading">{quote.title}</h4>
            <p className="list-group-item-text" dangerouslySetInnerHTML={html(quote.text)}></p>
            <div className="author label label-danger">{quote.author_name}</div>
        </div>
    </div>
)


function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Quote)
