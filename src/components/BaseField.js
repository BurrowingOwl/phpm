import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Field = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;
const Label = styled.div`
  flex: 1;
  span {
    font-weight: 600;
  }
`;
const Item = styled.div`
  flex: 1;
`;

const BaseField = ({ label, text, ...props }) => (
  <Field {...props}>
    <Label>
      <span>{label}</span>
    </Label>
    <Item>
      <span>{text}</span>
    </Item>
  </Field>
);

BaseField.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default BaseField;
