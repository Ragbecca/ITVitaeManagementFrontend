import React, { useEffect, useState } from 'react';
import TeacherInputItem from './TeacherInputItem';
import * as apiCalls from "../api/apiCalls"

const TeacherInputList = (props) => {

    const [teacherList, setTeacherList] = useState([]);
    const [initialCall, setInitialCall] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [checked, setChecked] = useState([]);
    const { onChangeValue } = props;


    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        onChangeValue(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    useEffect(() => {
        async function getData() {
            setInitialCall(false);
            await apiCalls.listTeachers().then(res => setTeacherList(res.data), setLoading(false))
        }
        if (initialCall) {
            getData();
        }
    })

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="w-70">
                    <div className="list-group list-group-flush" data-testid="usergroup">
                        Loading
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className='checklist-scroller'>
                {
                    teacherList.map((teacher) => {
                        return <TeacherInputItem key={teacher.id} teacher={teacher} handleCheck={handleCheck} />;
                    })
                }
            </div>
        </div>
    )
};

export default TeacherInputList;