import React from 'react'

import Select from 'react-select'

const DropDown = ({ options, placeholder, input }) => {
    const { onChange, value } = input
    const preparedValue = value ? { value: value, label: value } : null

    return (
        <Select
            isClearable
            options={options}
            value={preparedValue}
            placeholder={placeholder}
            onChange={(event) => onChange(event ? event.value : null)}
        />
    )
}

export default DropDown
