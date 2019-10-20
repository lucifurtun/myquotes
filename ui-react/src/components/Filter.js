import React from 'react'
import { Collapse } from 'react-bootstrap'
import { has, upperFirst, values } from 'lodash'
import { getAuthors } from '../redux/authors'
import { getCategories } from '../redux/categories'
import { getTags } from '../redux/tags'
import { connect } from 'react-redux'
import { changeFilter } from '../redux/filters'
import FilterItem from "./FilterItem";
import { RoutingParamsContext } from "../redux/routing";
import NewFilterButton from "./NewFilterButton";


const reducersMapping = {
    authors: getAuthors,
    categories: getCategories,
    tags: getTags
}


class Filter extends React.Component {
    static contextType = RoutingParamsContext;

    constructor(props, context) {
        super(props)
        this.state = {
            collapsed: false,
            username: has(context.params, 'username') ? context.params.username : null
        }
        this.panelBodyMaxHeight = (window.innerHeight / 3) - (25 * 3)
    }

    componentDidMount() {
        let action = reducersMapping[this.props.type];
        this.props.dispatch(action({user__username: this.state.username}))
    }

    render() {
        return (
            <div className={'panel ' + this.props.panelClass}>
                <div className="panel-heading">
                    <h3 className="panel-title"
                        onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                        {upperFirst(this.props.type)}
                    </h3>
                    <NewFilterButton type={this.props.type} />
                </div>
                <Collapse
                    in={this.state.collapsed}
                    timeout={0}
                    className="body-wrapper collapse"
                    id="categories-filter-body"
                >
                    <div className="panel-body" style={{maxHeight: this.panelBodyMaxHeight}}>
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
    tags: [],

    panelClass: 'panel-info'
}

function mapStateToProps(state) {
    return {
        authors: values(state.authors.data),
        categories: values(state.categories.data),
        tags: values(state.tags.data)
    }
}


export default connect(mapStateToProps)(Filter)
