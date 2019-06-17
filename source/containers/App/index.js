import React, { Component } from 'react';

import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstname: 'Андрей',
    currentUserLastname:  'Прокопенко',
};

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
