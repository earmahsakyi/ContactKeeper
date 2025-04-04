import React, { useContext, useRef, useEffect } from 'react'
import contactContext from '../../context/contact/contactContext'


const ContactFilter = () => {
    const ContactContext = useContext(contactContext);
    const text = useRef('');
    const { filterContacts, clearFilter, filtered} = ContactContext;

    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    },[filtered])
    

    const onChange = (e) =>{
        if(text.current.value !== '') {
            filterContacts(e.target.value)
        }
        else{
            clearFilter();
        }
    }

  return (
    <form>
      <input ref={text} type='text' placeholder='Filter Contact...' onChange={onChange} />
    </form>
  )
}

export default ContactFilter
