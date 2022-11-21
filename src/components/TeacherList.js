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
    const [isIndexAddNeeded, setIndexAddNeeded] = useState(false);
    const [isSearchChanged, setSearchChanged] = useState(false);
    const [search, setSearch] = useState('');
    let count = 0;


    const handleSearch = (event) => {
        setSearch(event.target.value);
        setSearchChanged(true);
    };

    useEffect(() => {
        async function initialUpdate() {
            await apiCalls.listTeachers().then(res => setInitialData(res.data),
                setData(initialData),
                setLoading(false));
            setInitialCallDone(true);
            setSortNameUpdate(true);
        }
        async function addIndexes() {
            setIndexAddNeeded(false);
            let newData = [];
            data.forEach(element => {
                count += 1;
                element = { ...element, index: count };
                newData.push(element);
            });
            setData(newData);
            await refreshRecords();
        }
        async function searchFunc() {
            if (search.length < 2) {
                setData(initialData);
                setIndexAddNeeded(true);
            } else {
                const dataSearch = initialData.filter((value) => value.displayName.toLowerCase().includes(search.toLowerCase()));
                setData(dataSearch);
                console.log(data);
                setIndexAddNeeded(true);
            }
            setSearchChanged(false);
        }
        async function refreshRecords() {
            setCurrentRecords(await data.slice(indexOfFirstRecord, indexOfLastRecord));
        }
        if (!isInitialCallDone) {
            initialUpdate();
        }
        if (isIndexAddNeeded) {
            addIndexes();
        }
        if (isSearchChanged) {
            searchFunc();
        }
        if (isSortNameUpdate) {
            sorter();
        }
        async function sorter() {
            setSortNameUpdate(false);
            switch (sortName) {
                case "atoz":
                    await sortAToZDN();
                    break;
                case "ztoa":
                    await sortZToADN();
                    break;
                default:
                    await resetSortDN();
                    break;
            }
        }

        async function changePage() {
            await funcIndexOfLastRecord();
            await funcIndexOfFirstRecord();
            setPageChanged(false);
            addIndexes();
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
    });

    async function sortAToZDN() {
        const newData = data.sort((a, b) => a.displayName.localeCompare(b.displayName))
        setData(newData);
        setIndexAddNeeded(true);
    }

    async function resetSortDN() {
        setData(initialData);
        setIndexAddNeeded(true);
    }

    async function sortZToADN() {
        const newData = data.sort((a, b) => b.displayName.localeCompare(a.displayName))
        setData(newData);
        setIndexAddNeeded(true);
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
                        Zoeken op naam:
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
                                if (user.index === undefined) {
                                    indexCount += 1;
                                    index = indexCount;
                                } else {
                                    index = user.index;
                                }
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