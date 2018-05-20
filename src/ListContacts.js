import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = query => {
        this.setState({query: query.trim()});
    }

    clearQuery = () => {
        this.setState({query: ''});
    }

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;


        let shownContacts;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            shownContacts = contacts.filter(con => match.test(con.name));
        } else {
            shownContacts = contacts;
        }
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={e => this.updateQuery(e.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'
                        >Add Contact</Link>
                    
                </div>


                {shownContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now Showing {shownContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {shownContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
            
        )
    }
}


export default ListContacts;