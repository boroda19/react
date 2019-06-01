import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        const {
            currentUserFirstname,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea
                        placeholder = { `What's on your mind, ${currentUserFirstname}?` }
                    />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
