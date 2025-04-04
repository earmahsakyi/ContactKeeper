import React, { useContext } from 'react';
import contactContext from '../../context/contact/contactContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const ContactContext = useContext(contactContext);
  const { deleteContact, setCurrent, current, clearCurrent } = ContactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  }
  const handleSelect = (contact) => {
    if (contact._id !== current?._id) {
      setCurrent(contact);
    }

  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '} <span
          style={{ float: 'right' }}
          className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase() + type.slice(1)}

        </span>
      </h3>
      <ul className='list'>
        {email && (<li>
          <FontAwesomeIcon icon={faEnvelope} /> {email}
        </li>)}
        {phone && (<li>
          <FontAwesomeIcon icon={faPhone} /> {phone}
        </li>)}

      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => handleSelect(contact)} >Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>

      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
