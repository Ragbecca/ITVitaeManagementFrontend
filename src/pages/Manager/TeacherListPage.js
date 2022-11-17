import React from 'react';
import TeacherList from '../../components/TeacherList';
import { connect } from 'react-redux';

class TeacherListPage extends React.Component {
    render() {

        return (
            <TeacherList />
        );
    }
}

export default connect(null)(TeacherListPage);