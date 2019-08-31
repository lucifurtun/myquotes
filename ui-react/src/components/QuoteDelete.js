import React from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { hideModal } from '../redux/ui'
import { removeQuote } from '../redux/quotes'
import { connect } from 'react-redux'

const QuoteDelete = ({quote, dispatch}) => {
    return (
        <React.Fragment>
            <BootstrapModal.Body>
                The quote "<b>{quote.title}</b>" will be deleted.
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button
                    bsStyle="success"
                    onClick={() => dispatch(removeQuote(quote))}
                >
                    Save
                </Button>
                <Button onClick={() => dispatch(hideModal())}>Close</Button>
            </BootstrapModal.Footer>
        </React.Fragment>
    )
}

export default connect()(QuoteDelete)
