import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddAdmin() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        // Check if any of the fields are empty
        if (!name || !username || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
            return;
        }
        axios.post("http://localhost:3001/addAdmin", {
            name: name,
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.Status === "Success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Admin added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/admin');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message || 'Error adding admin',
                });
            }
        }).catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error adding admin',
            });
        });
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Admin</h2>
            <form className="row g-3 w-50">
                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
                        value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder='Enter Username' autoComplete='off'
                        value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" placeholder="Enter Password" autoComplete='off'
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2" onClick={create}>Create</button>
                    <Link to='/admin' className='btn btn-danger'>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default AddAdmin;
