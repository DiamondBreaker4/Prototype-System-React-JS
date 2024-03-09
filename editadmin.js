import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditAdmin() {
    const { id } = useParams();
    const [admin, setAdmin] = useState({
        name: '',
        username: ''
    });
    const navigate = useNavigate();
    const adminId = id;

    const handleChange = (e) => {
        setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/getAdmin/${id}`)
            .then((res) => {
                console.log('Response from backend:', res.data);
                setAdmin(res.data.currentAdminData || { name: '', username: '' });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!admin.name || !admin.username) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Name and username cannot be empty',
            });
            return;
        }

        try {
            await axios.put(`http://localhost:3001/updateAdmin/${adminId}`, admin);
            navigate('/admin');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit Admin</h2>
            <form className='row g-3 w-50' onSubmit={handleUpdate}>
                <div className='col-12'>
                    <input type='text' className='form-control' id='id' name='id' value={id} disabled />
                    <label className='form-label'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='name'
                        value={admin.name}
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
                        value={admin.username}
                        onChange={handleChange}
                    />
                </div>

                <div className='col-12 d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success me-2'>
                        Update
                    </button>
                    <Link to='/admin' className='btn btn-danger'>
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditAdmin;
