import React, { useState } from 'react';

function PermitForm() {
    const [controlNumber, setControlNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState('');
    const [requestDocument, setRequestDocument] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="permit-form px-5 py-3">
            <h3 className='text-center mb-3'>Permit Application Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 py-4">
                    <div className="col">
                        <label htmlFor="controlNumber" className="form-label">Control Number</label>
                        <input type="text" className="form-control" id="controlNumber" value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="gender" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="sex" className="form-label">Sex</label>
                        <select className="form-select" id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="">Select Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="birthday" className="form-label">Birthday</label>
                        <input type="date" className="form-control" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className="col">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    <div className="col">
                        <label htmlFor="requestDocument" className="form-label">Request Document Upload</label>
                        <input type="file" className="form-control" id="requestDocument" onChange={(e) => setRequestDocument(e.target.files[0])} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success float-end">Submit</button>
            </form>
        </div>
    );
}

export default PermitForm;
