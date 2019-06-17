import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';
import cx from 'classnames';

import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    state = {
        online: false,
    }

    componentDidMount() {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const { avatar, currentUserFirstname, currentUserLastname } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,

        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                    <span />
                </div>
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
