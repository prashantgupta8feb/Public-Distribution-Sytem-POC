import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApproveApplication.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApproveApplication = () => {
  const [approveData, setApproveData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44386/api/register');
      setApproveData(response.data);      
      setError(null);
    } catch (error) {
      setApproveData([]);
      if (error.response && error.response.status === 404) {
        setError('No new open applications found.');
      } else {
        setError(error.response ? error.response.data : 'An error occurred');
      }
    }
  };

  const handleApprove = async (index, id) => {
    try {
      await axios.delete(`https://localhost:44386/api/register/${id}`);
      const updatedData = [...approveData];
      updatedData.splice(index, 1);
      setApproveData(updatedData);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleReject = async (index, id) => {
    try {
      await axios.delete(`https://localhost:44386/api/register/${id}`);
      const updatedData = [...approveData];
      updatedData.splice(index, 1);
      setApproveData(updatedData);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="apcontainer">
      <h2>Applications to be Approved or Rejected</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {approveData.map((data, index) => (
          <div className="col-sm-6 col-md-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{data.fullName}</h5>
                <p className="card-text"><strong>Email:</strong> {data.email}</p>
                <p className="card-text"><strong>Phone Number:</strong> {data.phoneNumber}</p>
                <p className="card-text"><strong>Birth Date:</strong> {data.birthDate}</p>
                <p className="card-text"><strong>Gender:</strong> {data.gender}</p>
                <p className="card-text"><strong>Address:</strong> {data.streetAddress1}, {data.streetAddress2}, {data.region}, {data.State}, {data.postalCode}</p>
                              
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={() => handleApprove(index, data.id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleReject(index, data.id)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveApplication;
