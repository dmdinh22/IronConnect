import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    options
}) => {
    // map through options that are passed into component
    const selectOptions = options.map(option => (
        // markup that gets rendered for each option from options array
        // key is the identifier of the list item
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div className="form-group">
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectListGroup;
