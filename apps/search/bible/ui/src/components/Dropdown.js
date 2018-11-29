import React from 'react'

import Select from 'react-select'

const DropDown = ({ options, value, placeholder, input }) => {
    const { onChange } = input

    return (
        <Select
            isClearable
            options={options}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event ? event.value : null)}
        />
    )
}

export default DropDown
