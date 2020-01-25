import React, { useState, useEffect } from 'react';
import axios from 'axios';
import beaver from '../images/animals/beaver.svg';
import bear from '../images/animals/brown-bear.svg';
import fox from '../images/animals/fox.svg';
import frog from '../images/animals/frog.svg';
import hedgehog from '../images/animals/hedgehog.svg';
import mouse from '../images/animals/mouse.svg';
import owl from '../images/animals/owl.svg';
import rabbit from '../images/animals/rabbit.svg';
import racoon from '../images/animals/racoon.svg';
import snake from '../images/animals/snake.svg';
import moose from '../images/animals/moose.svg';

const animals = [beaver, bear, fox, frog, hedgehog, mouse, owl, rabbit, racoon, snake, moose];

const Users = props => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9000/api/users', {
            headers: {
                username: props.user.username,
                password: props.user.password
            }
        })
        .then(response => {
            console.log(response);
            setUsers(response.data)
        })
        .catch(err => {
            console.log(err);
        });
    }, [props.user.password, props.user.username]);

    return (
        <div>
            {!props.isLoggedIn && <h2 className='welcome'>Log in to See Friends</h2>}
            
            {props.isLoggedIn && users &&
            <div className='users-box'>{users.map((user, index) => {
                return (
                    <div key={user.id} className='user-box'>
                        <h2>{user.username}</h2>
                        <div className='img-container'>
                            <img src={animals[index%animals.length]} alt='animal' />
                        </div>
                    </div>
                )
            })}
                </div>
            }
        </div>
    )
}

export default Users;