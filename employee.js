import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Employee() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch employee data from the backend when the component mounts
    axios.get('http://localhost:3001/getEmployee')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          // Handle error if data retrieval fails
          alert("Error fetching employee data");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to recover this employee",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with delete action
        axios.delete('http://localhost:3001/delete/' + id)
          .then(res => {
            if (res.data.Status === "Success") {
              // Reload the page or update the UI accordingly
              window.location.reload(true);
            } else {
              // Handle error if delete action fails
              alert("Error deleting employee");
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = data.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='px-5 py-3'>
      <h3 className='text-center mb-3'>Employee List</h3>
        <div className='d-flex justify-content-between mb-3'>
          <div><Link to="/addEmployee" className='btn btn-success'>Add Employee</Link></div>
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
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.username}</td>
                  <td>
                    <Link to={`/employeeedit/${employee.id}`} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default Employee;
