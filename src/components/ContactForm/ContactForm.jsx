import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  InputContainer,
  Input,
  LabelText,
  Button,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  handelChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.props.onSubmitData(this.state);
    this.props.onSubmitData({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <InputContainer>
            <label>
              <LabelText>Name</LabelText>

              <Input
                value={name}
                onChange={this.handelChange}
                placeholder="Chris Pratt"
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </label>
            <label>
              <LabelText>Number</LabelText>

              <Input
                value={number}
                onChange={this.handelChange}
                placeholder="055-066-77-88"
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </label>
          </InputContainer>
          <Button type="submit">Add contact</Button>
        </form>
      </Container>
    );
  }
}

ContactForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};
