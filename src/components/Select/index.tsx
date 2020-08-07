import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label?: string;
    }>;
    unSelectedValue?: any;
}

const Select: React.FC<SelectProps> = ({name, label, options, unSelectedValue="", ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...rest}>
                <option value={unSelectedValue} disabled hidden>Selecione</option>

                {options.map(option => {
                    const label = option.label ? option.label : option.value;
                    return <option key={option.value} value={option.value}>{label}</option>
                })}
            </select>
        </div>
    )
}

export default Select