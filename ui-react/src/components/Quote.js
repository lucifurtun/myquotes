import React from 'react'

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { connect } from 'react-redux'
import { showModal } from '../redux/ui'
import QuoteForm from './QuoteForm'

const html = (text) => ({ __html: text })



const getQuoteModal = (quote) => {
    return {
        title  : 'Edit Quote',
        content: <QuoteForm quote={quote}/>
    }
}

const Quote = ({ quote, user, dispatch }) => (
    <div className="list-group">
        <div className="list-group-item">
            { (quote.user_id === user.id) &&
            <span className="quote-actions">
                <a
                    href=""
                    id="edit-button"
                    className="visible-on-hover"
                    onClick={ (event) => {
                        event.preventDefault()
                        dispatch(showModal(getQuoteModal(quote)))
                    } }

                >
                    <FaPencilAlt/>
                </a>
                <a href="" id="delete-button" className="visible-on-hover"
                   onClick={ (event) => {
                       event.preventDefault()
                       dispatch(showModal({ title: 'Are you sure?', content: 'The quote will be deleted' }))
                   } }
                   ng-click="setDeleteItem(quote.id, quote.title)">
                    <FaTrashAlt/>
                </a>
            </span>
            }
            <h4 className="list-group-item-heading">{ quote.title }</h4>
            <p className="list-group-item-text" dangerouslySetInnerHTML={ html(quote.text) }></p>
            <div className="author label label-danger">{ quote.author_name }</div>
        </div>
    </div>
)


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Quote)
