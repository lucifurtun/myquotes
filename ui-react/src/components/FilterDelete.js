import React from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { hideModal } from '../redux/ui'
import { connect } from 'react-redux'
import { removeFilter } from "../redux/filters";

const FilterDelete = ({type, filter, dispatch}) => {
    return (
        <React.Fragment>
            <BootstrapModal.Body>
                "<b>{filter.name}</b>" will be deleted.
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button bsStyle="danger" onClick={() => dispatch(removeFilter(type, filter))}>
                    Delete
                </Button>
                <Button onClick={() => dispatch(hideModal())}>Close</Button>
            </BootstrapModal.Footer>
        </React.Fragment>
    )
}

export default connect()(FilterDelete)
