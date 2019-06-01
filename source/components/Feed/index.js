import React, { Component } from 'react';

import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        const {
            currentUserFirstname,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar { ...this.props } />
                <Composer
                    avatar = { avatar }
                    currentUserFirstname = { currentUserFirstname }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}
