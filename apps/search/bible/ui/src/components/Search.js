import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formChange } from '../redux/filters'


class Search extends Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.search()
        }
    }

    search = () => {
        const { onSearch } = this.props
        let searchValue = this.textInput.current.value
        onSearch(searchValue)
    }

    render() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    onKeyPress={this.handleKeyPress}
                    className="form-control"
                    placeholder="Search..."
                    style={{ height: '38px' }}
                    ref={this.textInput}
                    onChange={() => this.props.dispatch(formChange('search', this.textInput.current.value || null))}
                />
                <span className="input-group-btn">
                <button
                    onClick={this.search}
                    className="btn btn-default"
                    style={{ height: '38px' }}
                    type="button">Go!
                </button>
                </span>
            </div>
        )
    }
}

export default connect()(Search)
