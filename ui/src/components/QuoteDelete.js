import React from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { hideModal } from '../redux/ui'
import { removeQuote } from '../redux/quotes'
import { connect } from 'react-redux'

const QuoteDelete = ({quote, dispatch}) => {
    return (
        <>
            <BootstrapModal.Body>
                The quote "<b>{quote.title}</b>" will be deleted.
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button
                    bsStyle="danger"
                    onClick={() => dispatch(removeQuote(quote))}
                >
                    Delete
                </Button>
                <Button onClick={() => dispatch(hideModal())}>Close</Button>
            </BootstrapModal.Footer>
        </>
    )
}

export default connect()(QuoteDelete)
