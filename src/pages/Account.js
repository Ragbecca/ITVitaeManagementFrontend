import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import InputDisabled from "../components/InputDisabled";
import InputPassword from "../components/InputPassword";
import * as apiCalls from "../api/apiCalls";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Account extends React.Component {

    state = {
        displayName: JSON.parse(localStorage.getItem('itvitae-management-auth')).displayName,
        password: JSON.parse(localStorage.getItem('itvitae-management-auth')).password,
        passwordRepeat: JSON.parse(localStorage.getItem('itvitae-management-auth')).password,
        username: JSON.parse(localStorage.getItem('itvitae-management-auth')).username,
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true,
        redirect: false,
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.displayName;
        this.setState({ displayName: value, errors });
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
        const userId = JSON.parse(localStorage.getItem('itvitae-management-auth')).id
        const user = {
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({ pendingApiCall: true })
        apiCalls.updateUser(userId, user).then((response) => {
            this.setState({ pendingApiCall: false }, () => {
                const action = {
                    type: 'logout-success'
                };
                this.setState({ redirect: true })
                this.props.dispatch(action);
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

    onShowPassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            this.setState({ redirect: false })
            return <Redirect push to='/' />;
        }
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="w-70">
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h3>{this.state.displayName} - Account Aanpassen</h3>
                        </div>
                        <div className='text-center mt-1'>
                            <ButtonWithProgress onClick={this.onClickSignup}
                                disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                                pendingApiCall={this.state.pendingApiCall}
                                text="Opslaan"
                                classes="btn orange-button" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <table className="w-100 line-color">
                            <tr className="line-height-table">
                                <td className="w-25 poppins-bold ps-4">Naam</td>
                                <td>
                                    <Input
                                        placeholder='Naam'
                                        value={this.state.displayName}
                                        onChange={this.onChangeDisplayName}
                                        hasError={this.state.errors.displayName && true}
                                        error={this.state.errors.displayName}
                                        classes='w-90 h-100 py-2 ps-2 poppins-normal'>
                                    </Input>
                                </td>
                                <td className="w-20"></td>
                            </tr>
                            <tr className="line-height-table">
                                <td className="poppins-bold ps-4">Email</td>
                                <td>
                                    <InputDisabled
                                        placeholder='Email'
                                        type='email'
                                        value={this.state.username}
                                        classes='w-90 h-100 py-2 ps-2 poppins-normal'>
                                    </InputDisabled>
                                </td>
                            </tr>
                            <tr className="line-height-table">
                                <td className="poppins-bold ps-4">Wachtwoord</td>
                                <td>
                                    <InputPassword
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        hasError={this.state.errors.password && true}
                                        error={this.state.errors.password}
                                        classes='w-90 h-100 py-2 ps-2 poppins-normal'>
                                    </InputPassword>
                                </td>
                                <td>
                                    <label className="poppins-normal pe-2">Zie Wachtwoord</label>
                                    <input type="checkbox" onClick={this.onShowPassword} id="password-shower" />
                                </td>
                            </tr>
                            <tr className="line-height-table">
                                <td className="poppins-bold ps-4">Herhaal je wachtwoord</td>
                                <Input
                                    name="passwordRepeat"
                                    placeholder="Herhaal je wachtwoord"
                                    type="password"
                                    value={this.state.passwordRepeat}
                                    onChange={this.onChangePasswordRepeat}
                                    hasError={this.state.errors.passwordRepeat && true}
                                    error={this.state.errors.passwordRepeat}
                                    classes='w-90 h-100 py-2 ps-2 poppins-normal'>
                                </Input>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

Account.defaultProps = {
    history: {
        push: () => { }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state
    }
}


export default connect(mapStateToProps)(Account);