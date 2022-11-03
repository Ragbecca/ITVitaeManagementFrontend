import React from 'react';

export class AddUserPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {}
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    };

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    };

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    }

    onClickSignup = (event) => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({ pendingApiCall: true })
        this.props.actions.postSignup(user).then((response) => {
            this.setState({ pendingApiCall: false });
        })
            .catch((apiError) => {
                console.log(apiError)
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
                    <label>Naam</label>
                    <input className='form-control'
                        placeholder='Naam'
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}>
                    </input>
                    {this.state.errors.displayName && <div className="alert alert-danger mt-2" role="alert"> {this.state.errors.displayName} </div>}
                </div>
                <div>
                    <label>Email</label>
                    <input className='form-control' placeholder='Email' type="email" value={this.state.username} onChange={this.onChangeUsername}></input>
                    {this.state.errors.username && <div className="alert alert-danger mt-2" role="alert"> {this.state.errors.username} </div>}
                </div>
                <div>
                    <label>Wachtwoord</label>
                    <input className='form-control' placeholder='Wachtwoord' type="password" value={this.state.password} onChange={this.onChangePassword}></input>
                    {this.state.errors.password && <div className="alert alert-danger mt-2" role="alert"> {this.state.errors.password} </div>}
                </div>
                <div>
                    <label>Herhaling van Wachtwoord</label>
                    <input className='form-control' placeholder='Herhaling van Wachtwoord' type="password" value={this.state.passwordRepeat} onChange={this.onChangePasswordRepeat}></input>
                </div>
                <div className='text-center mt-1'>
                    <button className='btn btn-primary' onClick={this.onClickSignup}
                        disabled={this.state.pendingApiCall}>
                        {this.state.pendingApiCall && (<div className='spinner-border text-light spinner-border-sm me-sm-1'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>)}
                        Maak account aan
                    </button>
                </div>
            </div >
        )
    }

}

AddUserPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({});
        })
    }
}

export default AddUserPage;