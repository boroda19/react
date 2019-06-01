import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        const {
            currentUserFirstname,
            currentUserLastname,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>{ currentUserFirstname }</span>
                    &nbsp;
                    <span>{ currentUserLastname }</span>
                </button>
            </section>
        );
    }
}
