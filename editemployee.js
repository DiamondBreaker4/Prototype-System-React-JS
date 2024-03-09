import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        username: '',
        password: '',
    });

    const location = useLocation();
    const navigate = useNavigate();
    const employeeId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/get/${id}`)
            .then((res) => {
                console.log(res.data.Result[0]);
                setEmployee(res.data.Result[0]);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!employee.name || !employee.username) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields.',
            });
            return;
        }

        try {
            await axios.put(`http://localhost:3001/updateEmployee/${employeeId}`, employee);
            navigate('/employee');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit Employee</h2>
            <form className='row g-3 w-50'>
                <div className='col-12'>
                    <input type='text' className='form-control' id='id' name='id' value={id} disabled />
                    <label className='form-label'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='name'
                        value={employee.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-12'>
                    <label className='form-label'>Username</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Username'
                        autoComplete='off'
                        name='username'
                        value={employee.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-12 d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success me-2' onClick={handleUpdate}>
                        Update
                    </button>
                    <Link to='/employee' className='btn btn-danger'>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditEmployee;