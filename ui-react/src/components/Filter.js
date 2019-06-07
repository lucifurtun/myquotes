import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { Collapse } from 'react-bootstrap'
import { getAuthors } from '../redux/authors'
import { getCategories } from '../redux/categories'
import { getTags } from '../redux/tags'
import { connect } from 'react-redux'


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
        <span className="text" onDoubleClick={ () => this.setState({editMode: true}) }>
            { !this.state.editMode && <span>{ this.state.value }</span> }
                </span>
                {
                    this.state.editMode && <input className="form-control sm-form-control"
                                       value={ this.state.value }
                                       onChange={(event) => this.setState({value: event.target.value})}
                                       ref={ input => input && input.focus() }
                                       onBlur={ (event) => this.setState({editMode: false}) }
                                       onKeyPress={ (event) => {
                                           if (event.key === 'Enter') {
                                               this.setState({editMode: false})
                                           }
                                       } }/>
                }
                <FaTimes color='red'/>
        <div className="material-switch pull-right">
            <input
                id={`filter-switch-${ this.props.type }-${ this.props.item.id }`}
                type="checkbox"
                onClick={(event) => this.setState({checked: !this.state.checked})}
                value={this.state.checked}
            />

            <label htmlFor={`filter-switch-${ this.props.type }-${ this.props.item.id }`}
                   className="label-success switch-label"></label>
        </div>
     </span>
        )
    }
}


const reducersMapping = {
    authors   : getAuthors(),
    categories: getCategories(),
    tags      : getTags()
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
                        onClick={ () => this.setState({ collapsed: !this.state.collapsed }) }>
                        { this.props.type }
                    </h3>
                    <a className='pull-right' href="" ng-click="setFilterType('categories')" ng-if="!readOnly">
                        <FaPlus/>
                    </a>
                </div>
                <Collapse in={ this.state.collapsed } className="body-wrapper collapse" ng-class="{in: desktopView}"
                          id="categories-filter-body">
                    <div className="panel-body">
                        { this.props[this.props.type].map(
                            (item) => (<Item key={ item.id } item={ item } type={ this.props.type }/>))
                        }
                        { !this.props[this.props.type].length && <span>There are no { this.props.type }...</span> }
                    </div>
                </Collapse>
            </div>
        )
    }
}

Filter.defaultProps = {
    authors   : [],
    categories: [],
    tags      : []
}

function mapStateToProps(state) {
    return {
        authors   : state.authors.data,
        categories: state.categories.data,
        tags      : state.tags.data
    }
}


export default connect(mapStateToProps)(Filter)
