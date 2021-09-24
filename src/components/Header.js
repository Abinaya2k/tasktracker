import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router'

const Header = (props) => {
    const location=useLocation()
  
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {location.pathname==='/' &&  <Button color={!props.showAdd?'green':'red'} 
            text={!props.showAdd?'Add':'Close'} onClick={props.onAdd} />}
            
        </header>
    )
}

export default Header
