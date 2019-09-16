import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { Collapse } from 'react-bootstrap'
import { values } from 'lodash'
import { getAuthors } from '../redux/authors'
import { getCategories } from '../redux/categories'
import { getTags } from '../redux/tags'
import { connect } from 'react-redux'
import { changeFilter } from '../redux/filters'


class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            value: props.item.name,
            checked: false
        }
    }

    render() {
        return (
            <span className="list-group-item">
                <span className="text" onDoubleClick={() => this.setState({ editMode: true })}>
                    {!this.state.editMode && <span>{this.state.value}</span>}
                </span>
                {
                    this.state.editMode &&
                    <input
                        className="form-control sm-form-control"
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })}
                        ref={input => input && input.focus()}
                        onBlur={(event) => this.setState({ editMode: false })}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({ editMode: false })
                            }
                        }}
                    />
                }
                <span
                    className='remove-filter-button visible-on-hover'
                    onClick={(event) => console.log('Clicked')}
                    style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                >
                    <FaTimes color='red'/>
                </span>
                <div className="material-switch pull-right">
                    <input
                        id={`filter-switch-${this.props.type}-${this.props.item.id}`}
                        type="checkbox"
                        value={this.state.checked}
                        onClick={(event) => {
                            const nextValue = !this.state.checked
                            this.setState({ checked: nextValue })
                            this.props.onChange(nextValue)
                        }}
                    />

                    <label
                        htmlFor={`filter-switch-${this.props.type}-${this.props.item.id}`}
                        className="label-success switch-label"
                    >
                    </label>
                </div>
            </span>
        )
    }
}


const reducersMapping = {
    authors: getAuthors(),
    categories: getCategories(),
    tags: getTags()
}

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    componentDidMount() {
        this.props.dispatch(reducersMapping[this.props.type])
    }

    render() {
        return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title"
                        onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
                        {this.props.type}
                    </h3>
                    <a className='pull-right' href="">
                        <FaPlus/>
                    </a>
                </div>
                <Collapse
                    in={this.state.collapsed}
                    className="body-wrapper collapse"
                    id="categories-filter-body"
                >
                    <div className="panel-body">
                        {
                            this.props[this.props.type].map((item) => (
                                    <Item
                                        key={item.id} item={item}
                                        type={this.props.type}
                                        onChange={(checked) => {
                                            this.props.dispatch(changeFilter(this.props.type, item.id, checked))
                                        }}
                                    />
                                )
                            )
                        }
                        {
                            !this.props[this.props.type].length &&
                            <span>There are no {this.props.type}...</span>
                        }
                    </div>
                </Collapse>
            </div>
        )
    }
}

Filter.defaultProps = {
    authors: [],
    categories: [],
    tags: []
}

function mapStateToProps(state) {
    return {
        authors: values(state.authors.data),
        categories: values(state.categories.data),
        tags: values(state.tags.data)
    }
}


export default connect(mapStateToProps)(Filter)
