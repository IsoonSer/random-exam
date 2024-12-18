import React, { useState } from 'react';

interface DropdownProps {
    options: string[],
    handler: any,
    selected: string
}

const Dropdown = ({options, handler, selected}: DropdownProps) => {

    

    return (
        <select id="dropdown" value={selected} onChange={handler} className='text-center p-3 '>
            {/* <option value="">--Select--</option> */}
            {/* Dynamically create option elements */}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Dropdown