import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const { updata, setUPdata } = useContext(updatedata)

    const history = useNavigate("");

    const [inpval, setINP] = useState({
        firstname: "",
        lastname: "",
        email: "",
        hiredate: "",
        jobposition: "",
        salary: ""
    })
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        hiredate: "",
        jobposition: "",
        salary: ""
    })
    const geterror = () => {
        if (inpval.firstname.length === 0) {
            setError((prevErrors) => ({
                ...prevErrors,
                firstname: "First name cannot be empty",
            }));
        } else {
            setError((prevErrors) => ({
                ...prevErrors,
                firstname: "",
            }));
        }

        if (inpval.lastname.length === 0) {
            setError((prevErrors) => ({
                ...prevErrors,
                lastname: "Last name cannot be empty",
            }));
        } else {
            setError((prevErrors) => ({
                ...prevErrors,
                lastname: "",
            }));
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inpval.email)) {
            setError((prevErrors) => ({
                ...prevErrors,
                email: "",
            }));
        } else {
            setError((prevErrors) => ({
                ...prevErrors,
                email: "Email is not valid",
            }));
        }
        if (inpval.jobposition.length === 0) {
            setError((prevErrors) => ({
                ...prevErrors,
                jobposition: "job position cannot be empty",
            }));
        } else {
            setError((prevErrors) => ({
                ...prevErrors,
                jobposition: "",
            }));
        }
        if (inpval.salary < 1000) {
            setError((prevErrors) => ({
                ...prevErrors,
                salary: " salary not valid",
            }));
        } else {
            setError((prevErrors) => ({
                ...prevErrors,
                salary: "",
            }));
        }

    }
    useEffect(() => {

        geterror();

    }, [inpval])
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
        console.log("input value", inpval)
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:3000/getemployees/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 500 || !data) {
            console.log("error ");
            alert(" please enter properly");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email, hiredate, jobposition, salary } = inpval;

        const res2 = await fetch(`http://localhost:3000/employees/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname, lastname, email, hiredate, jobposition, salary
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            history("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            <NavLink to="/">home2</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">FirstName</label>
                        <input type="text" value={inpval.firstname} onChange={setdata} name="firstname" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <span style={{ color: "red" }}>{error.firstname}</span>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">LastName</label>
                        <input type="text" value={inpval.lastname} onChange={setdata} name="lastname" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <span style={{ color: "red" }}>{error.lastname}</span>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                        <span style={{ color: "red" }}>{error.email}</span>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">HireDate</label>
                        <input type="date" value={inpval.hiredate} onChange={setdata} name="hiredate" class="form-control" id="exampleInputPassword1" />
                        <span style={{ color: "red" }}>{error.hiredate}</span>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Position</label>
                        <input type="text" value={inpval.jobposition} onChange={setdata} name="jobposition" class="form-control" id="exampleInputPassword1" />
                        <span style={{ color: "red" }}>{error.jobposition}</span>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Salary</label>
                        <input type="number" value={inpval.salary} onChange={setdata} name="salary" class="form-control" id="exampleInputPassword1" />
                        <span style={{ color: "red" }}>{error.salary}</span>
                    </div>


                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;





