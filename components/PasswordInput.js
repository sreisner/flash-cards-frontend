import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

const PasswordInput = ({ label, ...props }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          type={isShown ? 'text' : 'password'}
          aria-describedby="inputGroupAppend"
          {...props}
        />
        <InputGroup.Append
          onClick={() => setIsShown(isShown => !isShown)}
          style={{ cursor: 'pointer' }}
        >
          <InputGroup.Text id="inputGroupAppend">
            <FontAwesomeIcon icon={['fad', 'eye']} />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
};

export default PasswordInput;
