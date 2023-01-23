import React, { Component } from 'react';
import { Container, TitleH1, TitleH2 } from './App.styled';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = stateOfContactForm => {
    const { contacts } = this.state;
    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase() === stateOfContactForm.name.toLowerCase()
    );
    if (dublicate)
      return alert(`${stateOfContactForm.name} is already in contacts`);

    stateOfContactForm.id = nanoid();
    this.setState(prevState => ({
      contacts: [stateOfContactForm, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  makeListOfContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <Container>
        <TitleH1>Phonebook</TitleH1>
        <ContactForm onSubmitData={this.handleSubmit} />

        <TitleH2>Contacts</TitleH2>
        <Filter value={filter} changeFilter={this.changeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={this.makeListOfContacts()}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p>
            Oh, dear, you have no friends:( Get out of your chair and do
            something with your life ;)
          </p>
        )}
      </Container>
    );
  }
}
