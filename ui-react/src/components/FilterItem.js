import React from "react";
import { connect } from "react-redux";
import FilterDelete from "./FilterDelete";
import { showModal } from "../redux/ui";
import { FaTrashAlt } from "react-icons/fa";
import { updateFilter } from "../redux/filters";


const getDeleteFilterModal = (type, filter) => {
    return {
        title: 'Are you sure?',
        content: <FilterDelete type={type} filter={filter}/>
    }
}

export class FilterItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            value: props.item.name,
            checked: false
        }
    }

    onEditFinished = () => {
        this.props.dispatch(updateFilter(this.props.type, {...this.props.item, name: this.state.value}))
        this.setState({editMode: false})
    }

    render() {
        const {type, item, dispatch} = this.props

        return (
            <span className="list-group-item">
                <span className="text" onDoubleClick={() => this.setState({editMode: true})}>
                    {!this.state.editMode && <span>{this.state.value}</span>}
                </span>
                {
                    this.state.editMode &&
                    <input
                        className="form-control sm-form-control"
                        value={this.state.value}
                        onChange={(event) => this.setState({value: event.target.value})}
                        ref={input => input && input.focus()}
                        onBlur={this.onEditFinished}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.onEditFinished()
                            }
                        }}
                    />
                }
                <span
                    className='remove-filter-button visible-on-hover'
                    onClick={(event) => dispatch(showModal(getDeleteFilterModal(type, item)))}
                    style={{verticalAlign: 'middle', marginLeft: '5px'}}
                >
                    <FaTrashAlt color='red'/>
                </span>
                <div className="material-switch pull-right">
                    <input
                        id={`filter-switch-${this.props.type}-${this.props.item.id}`}
                        type="checkbox"
                        value={this.state.checked}
                        onClick={(event) => {
                            const nextValue = !this.state.checked
                            this.setState({checked: nextValue})
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

export default connect()(FilterItem)
