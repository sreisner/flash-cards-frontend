import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.black};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: ${props => props.theme.black};
    color: white;
    border: 0;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default Form;
