import React from 'react';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import Input from '../../components/Input';

export class AddUserPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.displayName;
        this.setState({ displayName: value, errors });
    };

    onChangeUsername = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.username;
        this.setState({ username: value, errors });
    };

    onChangePassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.passwordRepeat === value;
        const errors = { ...this.state.errors };
        delete errors.password;
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Je wachtwoorden matchen niet.';
        this.setState({ password: value, passwordRepeatConfirmed, errors });
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = { ...this.state.errors }
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Je wachtwoorden matchen niet.'
        this.setState({ passwordRepeat: value, passwordRepeatConfirmed, errors });
    }

    onClickSignup = (event) => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({ pendingApiCall: true })
        this.props.actions.postSignupTeacher(user).then((response) => {
            this.setState({ pendingApiCall: false }, () => {
                this.props.history.push('/manager/teachers')
            });
        })
            .catch((apiError) => {
                let errors = { ...this.state.errors }
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    errors = { ...apiError.response.data.validationErrors }
                }
                this.setState({ pendingApiCall: false, errors });
            });
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Maak een account aan</h1>
                <div className='col-12 mb-3'>
                    <Input
                        label="Naam"
                        placeholder='Naam'
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}>
                    </Input>
                </div>
                <div>
                    <Input
                        label="Email"
                        placeholder='Email'
                        type='email'
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        hasError={this.state.errors.username && true}
                        error={this.state.errors.username}>
                    </Input>
                </div>
                <div>
                    <Input
                        label="Wachtwoord"
                        placeholder='Wachtwoord'
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}>
                    </Input>
                </div>
                <div>
                    <Input
                        name="passwordRepeat"
                        label="Herhaling van wachtwoord"
                        placeholder="Herhaal je wachtwoord"
                        type="password"
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat}
                        hasError={this.state.errors.passwordRepeat && true}
                        error={this.state.errors.passwordRepeat}>
                    </Input>
                </div>
                <div className='text-center mt-1'>
                    <ButtonWithProgress onClick={this.onClickSignup}
                        disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                        pendingApiCall={this.state.pendingApiCall}
                        text="Maak Account" />
                </div>
            </div >
        )
    }

}

AddUserPage.defaultProps = {
    actions: {
        postSignupTeacher: () => new Promise((resolve, reject) => {
            resolve({});
        })
    },
    history: {
        push: () => { }
    }
}

export default AddUserPage;