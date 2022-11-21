import React from 'react';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import Input from '../../components/Input';
import TeacherInputList from '../../components/TeacherInputList';

export class AddGroupPage extends React.Component {
    state = {
        name: '',
        teachers: [],
        days: [],
        errors: {},
        data: []
    };


    onChangeName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.name;
        this.setState({ name: value, errors });
    };

    onChangeTeachers = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.teachers;
        this.setState({ teachers: value, errors });
    };

    onChangeDays = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.days;
        this.setState({ days: value, errors });
    };

    onClickCreate = (event) => {
        console.log(this.state.data);
        const teacher = {
            name: this.state.name,
            teachers: this.state.teachers,
            days: this.state.days
        }
        this.setState({ pendingApiCall: true })
        this.props.actions.createGroup(teacher).then((response) => {
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
                <h1 className='text-center'>Maak een leraren-account aan</h1>
                <div className='col-12 mb-3'>
                    <Input
                        label="Naam"
                        placeholder='Naam'
                        value={this.state.name}
                        onChange={this.onChangeName}
                        hasError={this.state.errors.name && true}
                        error={this.state.errors.name}>
                    </Input>
                </div>
                <div>

                </div>
                <div>
                    {/* <Input
                        label="Leraren"
                        placeholder='Leraren'
                        type='email'
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        hasError={this.state.errors.username && true}
                        error={this.state.errors.username}>
                    </Input> */}
                </div>
                <div>
                    <TeacherInputList />
                </div>
                <div className='text-center mt-1'>
                    <ButtonWithProgress onClick={this.onClickSignup}
                        disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                        pendingApiCall={this.state.pendingApiCall}
                        text="Maak Groep Aan" />
                </div>
            </div >
        )
    }

}

AddGroupPage.defaultProps = {
    actions: {
        post: () => new Promise((resolve, reject) => {
            resolve({});
        })
    },
    history: {
        push: () => { }
    }
}

export default AddGroupPage;