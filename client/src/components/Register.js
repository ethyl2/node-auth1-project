import React, { useState } from 'react';

const Register = props => {
    const [userInput, setUserInput] = useState({username: '', password: ''});

    const handleChange = e => {
        setUserInput({[e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.registerUser(userInput);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <legend>Sign Up to Become a Forest Friend</legend>

                <label htmlFor='username'>Username:</label>
                <input type='text'
                    placeholder='username'
                    name='username'
                    id='username'
                    value={userInput.username}
                    onChange={handleChange}
                />
                
                <label htmlFor='password'>Password:</label>
                <input type='password'
                    name='password'
                    id='password'
                    placeholder='********'
                    value={userInput.password}
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>


            </form>
        </div>
    )
}

export default Register;