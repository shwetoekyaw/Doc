import React, { useEffect, useState } from 'react';
import './CreateBooking.css';
import doctorImage from '../../../assets/images/DP.png'
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const Popup = ({ onClose }) => (
  <div className="popup">
    <p>Your appointment is completed!</p>
    <button onClick={onClose}>Close</button>
  </div>
);

const CreateBooking = (data) => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    medicalHistory: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("user");
    
    if (isUserLoggedIn) {
      navigate("/Booking");
    }
  }, [navigate]);

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="booking-form">
        <div className="booking-page">
            <h2>GET AN APPOINTMENT</h2>
            <h3>Fill your Information.</h3>
            <form onSubmit={handleBookingSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Patient Full Name"
                    value={patientInfo.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={patientInfo.email}
                    onChange={handleInputChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={patientInfo.phone}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="age"
                    placeholder="Age Year (eg. 25)"
                    value={patientInfo.age}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={patientInfo.address}
                    onChange={handleInputChange}
                />
                <textarea
                    name="medicalHistory"
                    placeholder="Remark (eg. Medical History)"
                    value={patientInfo.medicalHistory}
                    onChange={handleInputChange}
                />
                <button type="submit">Confirm Appointment</button>
            </form>
            {showPopup && <Popup onClose={closePopup} />}
        </div>
        <div className="appointment-preview">
            <h2>Appointment Preview</h2>
            {data && (
          <>
            <img src={doctorImage} alt="Doctor pp" />
            <p>Hospital Name: {data.hospitalName}</p>
            <p>Doctor Name: {data.doctorName}</p>
            <p>Patient Name: {data.patientName}</p>
            <p>Speciality: {data.doctorServiceName}</p>
            <p>Payment Method: {data.paymentName}</p>
            <p>Booking Date: {data.bookingDate}</p>
            <p>Booking Time: {data.bookingTime}</p>
            <p>Ticket Number: {data.ticketNumber}</p>
          </>
          )}
        </div>
    </div>
  );
};

export default CreateBooking;