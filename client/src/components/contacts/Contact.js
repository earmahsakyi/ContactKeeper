import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import contactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';

const Contact = () => {
  const ContactContext = useContext(contactContext);
  const { contacts, filtered, getContact, loading } = ContactContext;

  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);

  if (loading || contacts === null) {
    return <Spinner />;
  }

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  // Use filtered if available, otherwise use contacts
  const contactsToDisplay = filtered && filtered.length > 0 ? filtered : contacts;



  return (

    <TransitionGroup>
      {contactsToDisplay.map(contact => {
        // Create a ref for each contact
        const nodeRef = React.createRef();

        return (
          <CSSTransition
            key={contact._id}
            timeout={500}
            classNames='item'
            nodeRef={nodeRef} // Pass the ref to nodeRef
          >
            <div ref={nodeRef}> {/* Apply ref to the container element */}
              <ContactItem contact={contact} />
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default Contact;

