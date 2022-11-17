import React from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions"

export class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        apiError: undefined,
        pendingApiCall: false
    }

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({
            username: value,
            apiError: undefined
        });
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({
            password: value,
            apiError: undefined
        });
    }

    onClickLogin = () => {
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({ pendingApiCall: true })
        this.props.actions.postLogin(body)
            .then((response) => {
                this.setState({ pendingApiCall: false }, () => {
                    if (response.data.role === "MANAGER") {
                        this.props.history.push('/manager/dashboard')
                    } else {
                        this.props.history.push('/dashboard')
                    }
                })
            })
            .catch(error => {
                if (error.response) {
                    this.setState({ pendingApiCall: false, apiError: error.response.data.message })
                }
            });
    }

    render() {
        let disableSubmit = false;
        if (this.state.username === '') {
            disableSubmit = true;
        }

        return (
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="bg-login-color py-5 px-7 text-gray-2">
                    <div className="w-35 poppins-bold">Email</div>
                    <div className="mb-4">
                        <Input placeholder="Jouw email"
                            classes="form-control login-input poppins-normal"
                            value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="poppins-bold">Wachtwoord</div>
                    <div className="mb-4">
                        <Input placeholder="Jouw wachtwoord" type="password"
                            classes="form-control login-input poppins-normal"
                            value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div>{this.state.apiError && (
                        <div className="col-12 mb-3">
                            <div className="alert alert-danger" role="alert">Deze gegevens kloppen niet</div>
                        </div>
                    )}</div>
                    <div className='text-end'>
                        <ButtonWithProgress onClick={this.onClickLogin}
                            disabled={disableSubmit}
                            pendingApiCall={this.state.pendingApiCall}
                            text="Login"
                            classes="btn btn-primary text-white poppins-bold py-3 px-6 mt-4" />
                    </div>
                </div>
            </div >
        );
    }
}

LoginPage.defaultProps = {
    actions: {
        postLogin: () => new Promise((resolve, reject) => resolve({}))
    },
    dispatch: () => { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postLogin: (body) => dispatch(authActions.loginHandler(body))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);