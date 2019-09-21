import React, { useState } from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { has, join } from 'lodash'
import { hideModal } from '../redux/ui'
import { connect } from 'react-redux'
import { createFilter } from "../redux/filters";


const FilterForm = ({dispatch, errors, type}) => {
    const [value, setValue] = useState('')

    return (
        <>
            <BootstrapModal.Body>
                <form onSubmit={(event => {
                    event.preventDefault()
                })}>
                    <div>
                        <div id="source" className="form-group"
                             style={{display: 'inline-block', width: '100%', paddingRight: '10px'}}
                        >
                            <div className="form-inline">
                                <label htmlFor="id_source">Title</label>
                                <input
                                    style={{width: '80%'}}
                                    name="name"
                                    className="form-control"
                                    id="id_name"
                                    defaultValue={value}
                                    onChange={event => setValue(event.target.value)}
                                />

                            </div>
                            {
                                has(errors, 'source') &&
                                <div id="errors" className="text-danger small">
                                    {join(errors.source, ' ')}
                                </div>
                            }
                        </div>

                    </div>
                </form>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button
                    bsStyle="success"
                    onClick={() => dispatch(createFilter(type, {name: value}))}
                >
                    Save
                </Button>
                <Button onClick={() => dispatch(hideModal())}>Close</Button>
            </BootstrapModal.Footer>

        </>
    )
}

function mapStateToProps(state) {
    return {
        errors: state.quotes.errors
    }
}

export default connect(mapStateToProps)(FilterForm)
