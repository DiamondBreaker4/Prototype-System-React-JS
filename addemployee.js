import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddEmployee() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/addEmployee", {
            name: name,
            username: username,
            password: password,
        })
        .then((response) => {
            console.log(response);
            setRegisterStatus(response.data.message);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Employee added successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/employee');
                });
            }
        })
        .catch(err => {
            console.error('Error adding employee:', err);
            setRegisterStatus("Failed to add employee");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add employee',
            });
        });
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Employee</h2>
            <form className="row g-3 w-50">
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-12">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder='Enter Username' autoComplete='off'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" placeholder="Enter Password" autoComplete='off'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2" onClick={create}>Create</button>
                    <Link to='/employee' className='btn btn-danger'>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee;
