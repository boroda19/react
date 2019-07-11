import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';


@withProfile
export default class Profile extends Component {
    render() {
        const { currentUserFirstname, currentUserLastname, avatar } = this.props;

        return (
            <section className = { Styles.profile }>
                <h1>
                    Welcome, { currentUserFirstname } { currentUserLastname }
                </h1>
                <img src = { avatar } />
            </section>
        );
    }
}
