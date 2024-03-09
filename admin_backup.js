import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/getAdmin')
      .then(res => {
        if (res.data.Status === "Success") {
          setAdmins(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/deleteAdmin/${id}`);
          setAdmins(prev => prev.filter(admin => admin.id !== id));
          Swal.fire(
            'Deleted!',
            'Admin has been deleted.',
            'success'
          );
        } catch (err) {
          console.log(err);
          Swal.fire(
            'Error!',
            'Failed to delete admin.',
            'error'
          );
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='px-5 py-3'>
      <h3 className='text-center mb-3'>Admin List</h3>
        <div className='d-flex justify-content-between mb-3'>
          <div><Link to="/addAdmin" className='btn btn-success'>Add admin</Link></div>
          <div><input
              type='text'
              className='form-control'
              placeholder='Search..'
              value={searchTerm}
              onChange={handleSearch}
            /></div>
        </div>
      <div className='table-responsive'>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.username}</td>
                <td>
                  <Link to={`/editadmin/${admin.id}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={() => handleDelete(admin.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
