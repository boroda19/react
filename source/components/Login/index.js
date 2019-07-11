import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';


@withProfile
export default class Login extends Component {

    render() {
        return (
            <section className = { Styles.login }>
                <Link
                    to = '/profile'
                    onClick = { this.props._setLoginStatus }>
                    <span>Login</span>
                </Link>
            </section>
        );
    }
}
