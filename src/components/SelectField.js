import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

class SelectField extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
  };
  static defaultProps = {
    placeholder: '',
  };
  render() {
    const { placeholder, value, label, data, onSelect, ...props } = this.props;
    return (
      <FormControl fullWidth margin="dense">
        <InputLabel shrink htmlFor={label}>
          {label}
        </InputLabel>
        <NativeSelect
          {...props}
          value={value}
          onChange={e => onSelect(e.target.value)}
          input={<Input name={label} id={label} />}
        >
          <option value="" disabled={!!placeholder}>
            {placeholder}
          </option>
          {data.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }
}

export default SelectField;
