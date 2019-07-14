import React from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { hideModal } from '../redux/ui'


const Modal = ({ title, content, dispatch }) => {
    return (
        <BootstrapModal show={ true } onHide={ () => dispatch(hideModal()) }>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{ title }</BootstrapModal.Title>
            </BootstrapModal.Header>
            { content }
        </BootstrapModal>
    )
}

export default connect()(Modal)
