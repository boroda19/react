import React, { Component } from 'react';
import  { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';
import cx from 'classnames';

import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
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

    _animateStatusBarEnter = (composer) => {
        fromTo(
            composer,
            1,
            { opacity: 0 },
            { opacity: 1 },
        );
    }

    render() {
        const { avatar, currentUserFirstname, logged } = this.props;
        const { online } = this.state;

        console.log('statusbar', logged);

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,

        });

        const statusMessage = online ? 'Online' : 'Offline';
        const loginLink =  logged                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            ? (
                <Link
                    to = '/feed'
                    onClick = { this.props._setLogoutStatus }>
                    <span>Logout</span>
                </Link>
            )
            : (
                <Link to = '/login'>
                    <span>Login</span>
                </Link>
            );

        const profileLink =  logged
            ? (
                <Link to = '/profile'>
                    <img src = { avatar } />
                    <span>{ currentUserFirstname }</span>
                </Link>
            )
            : null;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{ statusMessage }</div>
                        <span />
                    </div>
                    { profileLink }
                    <Link to = '/feed'>
                        <span>Feed</span>
                    </Link>
                    { loginLink }
                </section>
            </Transition>
        );
    }
}
