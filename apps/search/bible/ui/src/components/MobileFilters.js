import React, { Component } from 'react'
import FiltersForm from './FiltersForm'
import { Modal } from 'react-bootstrap'


class MobileFilters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ showModal: true })}>Show Filters</button>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filters</Modal.Title>
                    </Modal.Header>
                    <FiltersForm/>
                </Modal>
            </div>
        )
    }
}

export default MobileFilters
