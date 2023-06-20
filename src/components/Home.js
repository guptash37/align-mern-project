import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'
import axios from 'axios';



const Home = ({ search }) => {


    const [getuserdata, setUserdata] = useState([]);
    const [getuserdatacopy, setUserdatacopy] = useState([])
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);

    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getdata();
    }, [currentPage])

    const getdata = async () => {

        const res = await fetch(`http://localhost:3000/page/?page=${currentPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data = await res.json();

        console.log("page", data);

        const res2 = await fetch(`http://localhost:3000/getemployees`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data2 = await res2.json();

        console.log("all data", data2);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUsers(data);
            const tpage = (data2.length) / 5
            console.log(tpage)
            setTotalPages(Math.ceil(tpage));

            setUserdata(data.users)
            setUserdatacopy(data.users)

            console.log("get data");

        }

    }


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    useEffect(() => {
        getdata();
    }, [])
    useEffect(() => {
        const filterdata = getuserdatacopy.filter(
            (item) =>
             item.firstname.toLowerCase().includes(search.toLowerCase())||
             item.lastname.toLowerCase().includes(search.toLowerCase())||
             item.email.toLowerCase().includes(search.toLowerCase())
            )
        console.log(filterdata);
        setUserdata(filterdata);
    }, [search])

    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:3000/employees/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">email</th>
                                <th scope="col">HireDate</th>
                                <th scope="col">JobPosition</th>
                                <th scope="col">Salary</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                Array.from(getuserdata).map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.firstname}</td>
                                                <td>{element.lastname}</td>
                                                <td>{element.email}</td>
                                                <td>{element.hiredate}</td>
                                                <td>{element.jobposition}</td>
                                                <td>{element.salary}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div>

                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous Page
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

















