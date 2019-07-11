import React, { Component } from 'react';

import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import StatusBar from 'components/StatusBar';
import { Provider } from 'components/HOC/withProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

import avatar from 'theme/assets/lisa';

let options = {
    avatar,
    currentUserFirstname: 'Андрей',
    currentUserLastname:  'Прокопенко',
    logged:               localStorage.getItem('logged') === '1',
};

export default class App extends Component {
    _setLoginStatus = () => {
        localStorage.setItem('logged', '1');
        options.logged = true;
    }

    _setLogoutStatus = () => {
        localStorage.setItem('logged', '0');
        options.logged = false;
    }

    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar
                        _setLoginStatus = { this._setLoginStatus }
                        _setLogoutStatus = { this._setLogoutStatus }
                    />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            path = '/profile'
                            render = {
                                () => options.logged
                                    ? <Profile /> : 
                                    <Login
                                        _setLoginStatus = { this._setLoginStatus }
                                    />
                            }
                        />
                        <Route
                            path = '/login'
                            render = { () => <Login _setLoginStatus = { this._setLoginStatus } /> }
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
