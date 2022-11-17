import React from 'react';
import { Link } from 'react-router-dom';

const TeacherListItem = (props) => {
    return (
        <tr>
            <td className='ps-2 py-3'>{props.index}</td>
            <td>{props.user.displayName}</td>
            <td>{props.user.group}</td>
            <td>{props.user.username}</td>
            <td className='text-end pe-2'><Link className='orange-link-see' to={`/manager/teachers/${props.user.username}`}>Inzien</Link></td>
        </tr>
    );
};

export default TeacherListItem;