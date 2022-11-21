import React from 'react';

const TeacherInputItem = (props) => {


    return (
        <div className='ms-2 me-4'>
            <input type="checkbox" value={props.teacher.id} onChange={props.handleCheck}></input>
            <span className='ms-2'>{props.teacher.displayName}</span>
        </div>
    );
};

export default TeacherInputItem;