import React, {Component} from 'react';
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";

import logo from './logo.svg';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Welcome to React'
  },
  content1: {
    id: 'app.content1',
    defaultMessage: 'To get started, edit'
  },
  content2: {
    id: 'app.content2',
    defaultMessage: 'and save to reload.'
  },
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Eric',
            unreadCount: 1000,
        };
    }

    render() {
        const {name, unreadCount} = this.state;
        const {intl:{formatMessage}} = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="languages">
                        <a href="/?locale=cn">العربية</a>
                        <a href="/?locale=en">English</a>
                        <a href="/?locale=cn">Español</a>
                    </div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{formatMessage(messages.title)}</h1>
                </header>
                <p className="App-intro">
                    {formatMessage(messages.content1)} <code>src/App.js</code> {formatMessage(messages.content2)}
                </p>
                <FormattedMessage
                    id="welcome"
                    defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`}
                    values={{name: <b>{name}</b>, unreadCount}}
                />
            </div>
        );
    }
}

export default injectIntl(App);