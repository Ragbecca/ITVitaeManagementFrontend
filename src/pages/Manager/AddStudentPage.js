import React from 'react';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import Input from '../../components/Input';

export class AddStutendPage extends React.Component {
    state = {
        displayName: '',
        email: '',
        inClass: '',
        pendingApiCall: false,
        errors: {},
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


    onClickSignup = (event) => {
        const student = {
            username: this.state.username,
            displayName: this.state.displayName,
            inClass: this.state.inClass
        }
        this.setState({ pendingApiCall: true })
        this.props.actions.postStudent(student).then((response) => {
            this.setState({ pendingApiCall: false }, () => {
                this.props.history.push('/manager/students')
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
                </div>
                <div>
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

AddStutendPage.defaultProps = {
    actions: {
        postStudent: () => new Promise((resolve, reject) => {
            resolve({});
        })
    },
    history: {
        push: () => { }
    }
}

export default AddStutendPage;