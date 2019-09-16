import React, { Fragment, useState } from 'react'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { map, values, omit, has, join } from 'lodash'
import { createQuote, updateQuote } from '../redux/quotes'
import { hideModal } from '../redux/ui'
import { connect } from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import AsyncCreatableSelect from 'react-select/async-creatable'
import CKEditor from 'ckeditor4-react'
import { client } from '../redux/api'


export let QuoteForm = ({ dispatch, quote, authors, categories, tags, errors }) => {
    let defaultValues = {}
    console.log(errors)
    if (quote) {
        defaultValues = omit(quote, ['author', 'category', 'tags', 'created', 'id', 'modified', 'user_id'])
    }

    const [inputs, setInputs] = useState(defaultValues)

    const action = quote ? updateQuote({ id: quote.id, ...inputs }) : createQuote(inputs)

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            client.get('/authors/', { params: { name: inputValue } }).then(
                (result) => resolve(map(result.data, (item) => ({ value: item.name, label: item.name })))
            )
        })

    return (
        <Fragment>
            <BootstrapModal.Body>
                <form onSubmit={ (event => {
                    event.preventDefault()

                }) }>
                    <div id="title" className="form-group">
                        <div className="form-inline">
                            <label htmlFor="id_title">Title</label>
                            <input name="title"
                                   style={ { width: '50%' } }
                                   maxLength="400"
                                   className="form-control"
                                   id="id_title"
                                   defaultValue={ inputs.title }
                                   onChange={ event => setInputs({
                                       ...inputs,
                                       [event.target.name]: event.target.value
                                   }) }
                            />
                            <div className="material-switch pull-right">
                                <input
                                    id="id_private"
                                    type="checkbox"
                                    checked={ inputs.private }
                                    onChange={ (event) => setInputs({
                                        ...inputs,
                                        private: event.target.checked
                                    }) }
                                />
                                <label htmlFor="id_private" className="label-success switch-label"></label>
                                <label htmlFor="id_private" style={ { marginLeft: '5px' } }>Private</label>
                            </div>

                        </div>
                        {
                            has(errors, 'title') &&
                            <div id="errors" className="text-danger small">
                                {join(errors.title, ' ')}
                            </div>
                        }
                    </div>

                    <div>
                        <div id="author" className="form-group"
                             style={ { display: 'inline-block', width: '50%', paddingRight: '10px' } }
                        >
                            <div className="form-inline">
                                <label htmlFor="id_author">Author</label>
                                <AsyncCreatableSelect
                                    cacheOptions
                                    isClearable
                                    className={ 'author-select' }
                                    value={ { value: inputs.author_name, label: inputs.author_name } }
                                    defaultOptions={ authors.map((item) => ({ value: item.name, label: item.name })) }
                                    loadOptions={ promiseOptions }
                                    onChange={ event => setInputs({
                                        ...inputs,
                                        author_name: event ? event.value : null
                                    }) }
                                />

                            </div>
                            {
                                has(errors, 'author') &&
                                <div id="errors" className="text-danger small">
                                    { join(errors.author, ' ') }
                                </div>
                            }
                        </div>
                        <div id="category" className="form-group"
                             style={ { display: 'inline-block', width: '50%', paddingLeft: '10px' } }
                        >
                            <div className="form-inline">
                                <label htmlFor="id_category">Category</label>
                                <CreatableSelect
                                    isClearable
                                    className={ 'category-select' }
                                    value={ { value: inputs.category_name, label: inputs.category_name } }
                                    options={ categories.map((item) => ({ value: item.name, label: item.name })) }
                                    onChange={ event => setInputs({
                                        ...inputs,
                                        category_name: event ? event.value : null
                                    }) }
                                />

                            </div>
                            {
                                has(errors, 'category') &&
                                <div id="errors" className="text-danger small">
                                    { join(errors.category, ' ') }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div id="source" className="form-group"
                             style={ { display: 'inline-block', width: '50%', paddingRight: '10px' } }
                        >
                            <div className="form-inline">
                                <label htmlFor="id_source">Source</label>
                                <input name="source"
                                       maxLength="400"
                                       className="form-control"
                                       id="id_source"
                                       defaultValue={ inputs.source }
                                       onChange={ event => setInputs({
                                           ...inputs,
                                           [event.target.name]: event.target.value
                                       }) }
                                />

                            </div>
                            {
                                has(errors, 'source') &&
                                <div id="errors" className="text-danger small">
                                    { join(errors.source, ' ') }
                                </div>
                            }
                        </div>
                        <div id="reference" className="form-group"
                             style={ { display: 'inline-block', width: '50%', paddingLeft: '10px' } }
                        >
                            <div className="form-inline">
                                <label htmlFor="id_reference">Reference</label>
                                <input name="reference"
                                       maxLength="400"
                                       className="form-control"
                                       id="id_reference"
                                       defaultValue={ inputs.reference }
                                       onChange={ event => setInputs({
                                           ...inputs,
                                           [event.target.name]: event.target.value
                                       }) }
                                />

                            </div>
                            {
                                has(errors, 'reference') &&
                                <div id="errors" className="text-danger small">
                                    { join(errors.reference, ' ') }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div id="tags" className="form-group"
                             style={ { display: 'inline-block', width: '100%' } }
                        >
                            <div className="form-inline">
                                <label htmlFor="id_tags">Tags</label>
                                <CreatableSelect
                                    isMulti
                                    value={ map(inputs.tags_name, (item) => ({ value: item, label: item })) }
                                    options={ tags.map((item) => ({ value: item.name, label: item.name })) }
                                    className={ 'tags-select' }
                                    onChange={ event => setInputs({
                                        ...inputs,
                                        tags_name: map(event, (item) => item.value)
                                    }) }
                                />

                            </div>
                            {
                                has(errors, 'tags') &&
                                <div id="errors" className="text-danger small">
                                    { join(errors.tags, ' ') }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <CKEditor
                            data={ inputs.text }
                            config={ {
                                toolbar: [['Bold', 'Italic', 'Link', 'Strike', '-', 'NumberedList', 'BulletedList']],
                                height : 100
                            } }
                            onChange={ event => setInputs({
                                ...inputs,
                                text: event.editor.getData()
                            }) }
                        />
                        {
                            has(errors, 'text') &&
                            <div id="errors" className="text-danger small">
                                {join(errors.text, ' ')}
                            </div>
                        }
                    </div>
                </form>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button
                    bsStyle="success"
                    onClick={ () => dispatch(action) }
                >
                    Save
                </Button>
                <Button onClick={ () => dispatch(hideModal()) }>Close</Button>
            </BootstrapModal.Footer>

        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        authors   : values(state.authors.data),
        categories: values(state.categories.data),
        tags      : values(state.tags.data),
        errors    : state.quotes.errors
    }
}

export default connect(mapStateToProps)(QuoteForm)