import React, { Component } from 'react';

import { Consumer } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.statusBar }>
                        <button>
                            <img src = { context.avatar } />
                            <span>{ context.currentUserFirstname }</span>
                            &nbsp;
                            <span>{ context.currentUserLastname }</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}
