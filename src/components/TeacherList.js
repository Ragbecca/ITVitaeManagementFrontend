import TeacherListItem from "./TeacherListItem";
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import * as apiCalls from "../api/apiCalls"
import { Link } from "react-router-dom";

const TeacherList = () => {

    const [recordsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [initialData, setInitialData] = useState([]);
    const [data, setData] = useState([]);
    const [isInitialCallDone, setInitialCallDone] = useState(false);
    const [isSortNameUpdate, setSortNameUpdate] = useState(false);
    const [isSortNameToggled, setSortNameToggled] = useState(false);
    const [sortName, setSortName] = useState("none");
    const [isLoading, setLoading] = useState(true);
    const [isPageChanged, setPageChanged] = useState(false);
    const [isRefreshRecordsNeeded, setRefreshRecordsNeeded] = useState(false);
    const [isSearchChanged, setSearchChanged] = useState(false);
    const [search, setSearch] = useState('');


    const handleSearch = (event) => {
        setSearch(event.target.value);
        setSearchChanged(true);
        console.log("1" + isSearchChanged);
    };

    useEffect(() => {
        async function initialUpdate() {
            await apiCalls.listTeachers().then(res => setInitialData(res.data),
                setData(initialData),
                setLoading(false));
            setInitialCallDone(true);
            setSortNameUpdate(true);
        }
        if (isSearchChanged) {
            searchFunc();
        }
        async function refreshRecords() {
            setCurrentRecords(await data.slice(indexOfFirstRecord, indexOfLastRecord));
        }
        if (!isInitialCallDone) {
            initialUpdate();
        }
        if (isRefreshRecordsNeeded) {
            refreshRecords();
        }
        if (isSortNameUpdate) {
            sorter();
        }
        async function sorter() {
            setSortNameUpdate(false);
            switch (sortName) {
                case "atoz":
                    await sortAToZDName();
                    break;
                case "ztoa":
                    await sortZToADName();
                    break;
                default:
                    await resetSort();
                    break;
            }
        }
        async function changePage() {
            await funcIndexOfLastRecord();
            await funcIndexOfFirstRecord();
            setPageChanged(false);
            await refreshRecords();
        }
        async function funcIndexOfLastRecord() {
            setIndexOfLastRecord(await currentPage * recordsPerPage);
        }
        async function funcIndexOfFirstRecord() {
            setIndexOfFirstRecord((currentPage * recordsPerPage) - recordsPerPage);
        }
        if (isPageChanged) {
            changePage();
        }
        async function searchFunc() {
            setSearchChanged(false);
            if (search.length < 2) {
                setData(initialData);
            } else {
                let dataSearch = initialData.filter((value) => value.displayName.toLowerCase().includes(search.toLowerCase()));
                const dataSearchEmail = initialData.filter((value) => value.username.toLowerCase().includes(search.toLowerCase()));
                dataSearchEmail.forEach(element => {
                    if (!dataSearch.includes(element)) {
                        dataSearch.push(element);
                    }
                });
                setData(dataSearch);
            }
            console.log("2" + isSearchChanged);
        }
    });

    async function sortAToZDName() {
        const newData = data.sort((a, b) => b.displayName.localeCompare(a.displayName))
        setData(newData);
        await setRefreshRecordsNeeded(true);
    }

    async function resetSort() {
        setData(initialData);
        setSearchChanged(true);
        await setRefreshRecordsNeeded(true);
    }

    async function sortZToADName() {
        const newData = data.sort((a, b) => a.displayName.localeCompare(b.displayName))
        setData(newData);
        await setRefreshRecordsNeeded(true);
    }

    function toggleSortName() {
        if (sortName.match("none")) {
            setSortName("atoz");
            setSortNameToggled(true);
            setSortNameUpdate(true);
        } else if (sortName.match("atoz")) {
            setSortName("ztoa")
            setSortNameToggled(true);
            setSortNameUpdate(true);
        } else if (sortName.match("ztoa")) {
            setSortName("none");
            setSortNameToggled(false);
            setSortNameUpdate(true);
        }
    }

    const [indexOfLastRecord, setIndexOfLastRecord] = useState(currentPage * recordsPerPage);
    const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(indexOfLastRecord - recordsPerPage);
    const [currentRecords, setCurrentRecords] = useState([]);
    const nPages = Math.ceil(data.length / recordsPerPage);
    let indexCount = 0;

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="w-70">
                    <h3 className="card-title m-auto" onClick={toggleSortName}>Users</h3>
                    <div className="list-group list-group-flush" data-testid="usergroup">
                        Loading
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="w-70">
                <div className="d-flex flex-row justify-content-between w-100">
                    <h3 className="poppins-bold text-primary" onClick={toggleSortName}>Alle Leraren</h3>
                    <label htmlFor="search" className="poppins-bold text-primary">
                        Zoeken:
                        <input className="poppins-normal text-primary ms-2" id="search" type="text" onChange={handleSearch} />
                    </label>
                </div>
                <table className="w-100 rounded-corners mb-2">
                    <thead className="">
                        <tr className="poppins-bold bg-primary text-white">
                            <td className="py-3 ps-2 pe-3">No</td>
                            <td>Naam</td>
                            <td>Groep</td>
                            <td>Email</td>
                            <td className='text-end pe-3'>Profiel bekijken</td>
                        </tr>
                    </thead>
                    <tbody className="line-color-reverse poppins-normal">
                        {
                            currentRecords.map((user) => {
                                let index = 0;
                                indexCount += 1;
                                index = indexCount * currentPage;
                                return <TeacherListItem key={user.username} user={user} index={index} />;
                            })
                        }
                    </tbody>
                </table>
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPageChanged={setPageChanged}
                />
                <div className="d-flex justify-content-center">
                    <div><Link to='/manager/teachers/create' className="orange-link-see">Nieuwe Leraar</Link></div>
                </div>
            </div>
        </div>
    );
};

export default TeacherList;