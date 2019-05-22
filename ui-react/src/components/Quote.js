import React from 'react'

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
const html = (text) => ({ __html: text })


const Quote = ({quote}) => (
    <div className="list-group">
        <div className="list-group-item">
        <span className="quote-actions" ng-if="!readOnly">
            <a href="" id="edit-button" className="visible-on-hover" ng-click="setEditItem(quote.id)">
                <FaPencilAlt/>
            </a>
            <a href="" id="delete-button" className="visible-on-hover"
               ng-click="setDeleteItem(quote.id, quote.title)">
                <FaTrashAlt/>
            </a>
        </span>
            <h4 className="list-group-item-heading">{quote.title}</h4>
            <p className="list-group-item-text" dangerouslySetInnerHTML={html(quote.text)}></p>
            <div className="author label label-danger">{quote.author_name}</div>
        </div>
    </div>
)

export default Quote