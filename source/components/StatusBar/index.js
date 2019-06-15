import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    render() {
        const { avatar, currentUserFirstname, currentUserLastname } = this.props;

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
