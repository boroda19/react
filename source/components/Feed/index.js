import React, { Component } from 'react';
import moment from 'moment';

import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hello', created: 1526991776849, likes: [], firstName: 'Lisa', lastName: 'Simpson'},
            { id: '333', comment: 'Hi, people', created: 1526991777000, likes: [], firstName: 'Mr.', lastName: 'Smith'},
        ],
        isSpinning: false,
    };

    _setPostFetchingState(state) {
        this.setState({
            isSpinning: state,
        });
    }

    async _createPost(comment) {
        const { currentUserFirstname, currentUserLastname } = this.props;
        this._setPostFetchingState(true);
        const post = {
            id:        getUniqueID(),
            created:   moment.utc().unix(),
            comment,
            likes:     [],
            firstName: currentUserFirstname,
            lastName:  currentUserLastname,
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts:      [ post, ...posts ],
            isSpinning: false,
        }));
    }

    async _likePost(id) {
        const { currentUserFirstname, currentUserLastname } = this.props;

        this._setPostFetchingState(true);
        await delay(1200);

        const newPost = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstname,
                            lastName:  currentUserLastname,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:      newPost,
            isSpinning: false,
        });
    }

    async _deletePost(id) {
        this._setPostFetchingState(true);
        await delay(800);

        const newPost = [];
        this.state.posts.forEach((post) => {
            if (post.id !== id) {
                newPost.push(post);
            }
        });

        this.setState({
            posts:      newPost,
            isSpinning: false,
        });
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _deletePost = { this._deletePost }
                    _likePost = { this._likePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
