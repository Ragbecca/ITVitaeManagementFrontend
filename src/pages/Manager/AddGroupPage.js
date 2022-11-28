import React from 'react';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import Input from '../../components/Input';
import TeacherInputList from '../../components/TeacherInputList';

export class AddGroupPage extends React.Component {
    refChild = React.createRef()
    state = {
        name: '',
        teachers: [],
        days: [],
        errors: {},
        data: [],
        nameFilledIn: false,

    };

    onChangeName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.name;
        if (event.target.value !== null || event.target.value.length > 0) {
            console.log(event.target.value.length)
            this.setState({ nameFilledIn: true });
        } else {
            this.setState({ nameFilledIn: false });
        }
        this.setState({ name: value, errors });
    };

    handleCheck = (event) => {
        var updatedList = [this.state.days];
        if (event.target.checked) {
            updatedList = this.state.days;
            updatedList.push(event.target.value);
        } else {
            updatedList.splice(this.state.days.indexOf(event.target.value), 1);
        }
        this.setState({ days: updatedList });
    };

    onClickCreate = (event) => {
        const teacher = {
            name: this.state.name,
            teachers: this.state.teachers,
            days: this.state.days
        }
        console.log(teacher);
        this.setState({ pendingApiCall: true })
        this.props.actions.postGroup(teacher).then((response) => {
            this.setState({ pendingApiCall: false }, () => {
                this.props.history.push('/manager/groups')
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

    onChangeValueHandler = (val) => {
        this.setState({ teachers: val })
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Maak een groep aan</h1>
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
                    <TeacherInputList onChangeValue={this.onChangeValueHandler} />
                </div>
                <div>
                    <input type="checkbox" value="1" onChange={this.handleCheck}></input><span>Maandag</span>
                </div>
                <div>
                    <input type="checkbox" value="2" onChange={this.handleCheck}></input><span>Dinsdag</span>
                </div>
                <div>
                    <input type="checkbox" value="3" onChange={this.handleCheck}></input><span>Woensdag</span>
                </div>
                <div>
                    <input type="checkbox" value="4" onChange={this.handleCheck}></input><span>Donderdag</span>
                </div>
                <div>
                    <input type="checkbox" value="5" onChange={this.handleCheck}></input><span>Vrijdag</span>
                </div>
                <div className='text-center mt-1'>
                    <ButtonWithProgress onClick={this.onClickCreate}
                        disabled={this.state.pendingApiCall || !this.state.nameFilledIn}
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