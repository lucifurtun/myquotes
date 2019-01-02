import React from 'react'

import Select from 'react-select'
import { connect } from 'react-redux'
import { formChange } from '../redux/filters'

const DropDown = ({ name, options, placeholder, value, dispatch }) => {
    const preparedValue = value ? { value: value, label: value } : null

    return (
        <Select
            isClearable
            options={options}
            value={preparedValue}
            placeholder={placeholder}
            onChange={(event) => dispatch(formChange(name, event ? event.value : null))}
        />
    )
}

export default connect()(DropDown)
