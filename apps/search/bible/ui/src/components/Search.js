import React, { Component } from 'react'
import { values } from 'lodash'


class Search extends Component {
    handleKeyPress = (e) => {
        const { onSearch } = this.props

        if (e.key === 'Enter') {
            onSearch(e)
        }
    }

    render() {
        return (
            <input
                onKeyPress={this.handleKeyPress}
                className='form-control'
                type='text'
                placeholder='Search...'
                style={{ height: '38px' }}
            />
        )
    }
}

export default Search
