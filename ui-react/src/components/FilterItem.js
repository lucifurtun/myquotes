import React from "react";
import { connect } from "react-redux";
import FilterDelete from "./FilterDelete";
import { showModal } from "../redux/ui";
import { FaTrashAlt } from "react-icons/fa";


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

    render() {
        const {type, item} = this.props

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
                        onBlur={(event) => this.setState({editMode: false})}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({editMode: false})
                            }
                        }}
                    />
                }
                <span
                    className='remove-filter-button visible-on-hover'
                    onClick={(event) => this.props.dispatch(showModal(getDeleteFilterModal(type, item)))}
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
