import React from "react";
import { Link } from "react-router-dom";

class DashboardManager extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                    <div className="my-4 text-center">
                        <Link to="/manager/agenda" className="text-center py-2 px-4 orange-link-dashboard">Agenda</Link>
                    </div>
                    <div className="my-4 text-center">
                        <Link to="/manager/studenten" className="text-center my-1 py-2 px-4 orange-link-dashboard">Studenten</Link>
                    </div>
                    <div className="my-4 text-center">
                        <Link to="/manager/groepen" className="text-center my-1 py-2 px-4 orange-link-dashboard">Groepen</Link>
                    </div>
                    <div className="my-4 text-center">
                        <Link to="/manager/teachers" className="text-center my-1 py-2 px-4 orange-link-dashboard">Leraren</Link>
                    </div>
                    <div className="my-4 text-center">
                        <Link to="/manager/managers" className="text-center my-1 py-2 px-4 orange-link-dashboard">Managers</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardManager;