import React from 'react'
import PropTypes from 'prop-types';

const Button = props => {
    return (
        <div>
            <button className='btn' style={{backgroundColor:props.color}} onClick={props.onClick}>{props.text}</button>
            
        </div>
    )
}

Button.defaultProps={
    color:'black',

}
Button.propTypes={
    test:PropTypes.string,
    color:PropTypes.string,
    onClick:PropTypes.func
}

export default Button
