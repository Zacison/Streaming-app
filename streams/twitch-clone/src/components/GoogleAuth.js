import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../redux/actions/index';

class GoogleAuth extends React.Component {
    //only called once
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '1039753909825-q4kq8cc2u1jkpn2iegc91dns5rgfarmq.apps.googleusercontent.com',
                    scope: 'email',
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignOutClick}>
                    <i className="google icon" /> Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className="ui red google button"
                    onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
        signOut: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
