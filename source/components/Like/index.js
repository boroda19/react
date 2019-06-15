import React, { Component } from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    }

    _likePost = () => {
        const { _likePost, id } = this.props;

        _likePost(id);
    }

    _getLikeByMy = () => {
        const { currentUserFirstname, currentUserLastname, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` === `${currentUserFirstname} ${currentUserLastname}`
            );
        });
    }

    _getLikeStyles = () => {
        const likeByMy = this._getLikeByMy();

        return cx(Styles.icon, {
            [ Styles.liked ]: likeByMy,
        });
    }

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>{`${firstName} ${lastName}`}</li>
        ));

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstname, currentUserLastname } = this.props;
        const likeByMy = this._getLikeByMy();

        if (likes.length === 1 && likeByMy) {
            return `${currentUserFirstname} ${currentUserLastname}`;
        } else if (likes.length === 2 && likeByMy) {
            return `You and ${likes.length - 1} other`;
        } else if (likeByMy) {
            return `You and ${likes.length - 1} other`;
        }

        return likes.length;
    }

    render () {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likersDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>Like
                </span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likersDescription}
                    </span>
                </div>
            </section>
        );
    }
}
