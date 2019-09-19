import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Collapse } from 'react-bootstrap'
import { upperFirst, values } from 'lodash'
import { getAuthors } from '../redux/authors'
import { getCategories } from '../redux/categories'
import { getTags } from '../redux/tags'
import { connect } from 'react-redux'
import { changeFilter } from '../redux/filters'
import FilterItem from "./FilterItem";
import { showModal } from "../redux/ui";
import FilterForm from "./FilterForm";


const getAddFilterModal = (type) => {
    return {
        title: upperFirst(type),
        content: <FilterForm type={type}/>
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
                        onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                        {upperFirst(this.props.type)}
                    </h3>
                    <span
                        style={{cursor: 'pointer'}}
                        className='pull-right'
                        onClick={(event) => this.props.dispatch(showModal(getAddFilterModal(this.props.type)))}
                    >
                        <FaPlus/>
                    </span>
                </div>
                <Collapse
                    in={this.state.collapsed}
                    className="body-wrapper collapse"
                    id="categories-filter-body"
                >
                    <div className="panel-body">
                        {
                            this.props[this.props.type].map((item) => (
                                    <FilterItem
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
