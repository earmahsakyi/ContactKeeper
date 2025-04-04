import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


const ContactForm = () => {
    const ContactContext = useContext(contactContext);

    const { addContact, current, clearCurrent, updateContact} =  ContactContext;
     
    useEffect(()=> {
        if(current !== null){
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [ContactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });
    const { name, email, phone, type}  = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});
    
    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else {
      updateContact(contact);
    }
    clearAll();
    }
    const clearAll = () =>{
        clearCurrent();
    }
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChange}/>
      <FontAwesomeIcon icon={faEnvelope}/>
      <input type='text' placeholder='Email' name='email' value={email} onChange={onChange}/>
     <FontAwesomeIcon icon={faPhone}/> <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
      <h5>Contact Type</h5>
      <input type='radio'  name='type' value='personal' onChange={onChange}checked={type === 'personal'}/> Personal{' '}
      <input type='radio'  name='type' value='professional' onChange={onChange} checked={type === 'professional'}/> Professional
      <div>
        <input type='submit' value={current ? 'Update Contact': 'Add Contact'} className='btn btn-primary btn-block' />
      </div>
      {current && <div>
        <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
        </div>}



    </form>
  )
}

export default ContactForm
