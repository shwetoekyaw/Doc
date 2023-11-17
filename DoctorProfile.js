import React from 'react';
import './DoctorProfile.css';
import CalendarSchedule from '../../../components/calendar/Calendar';
import doctorImage from '../../../assets/images/DP.png'
//import HospitalInfo from '../../hospitals/components/HospitalInfo/HospitalInfo';

function DoctorProfile({data}) {
    return (
    <>
        <div className="doctor-info-box">
            <div className="doctor-info-container">
                <div className="doctor-image">
                    <img src={doctorImage} alt="Doctor Pic" />
                </div>
              
                <div className="doctor-basic-info">
                    <h2>{data.name}</h2>
                    <p>{data.qualification}</p>
                    <p><b>{data.serviceName}</b></p>
                </div>
            </div>
        </div>

        <div className="hospital-title">
            <div className="title-content">
                <h2>Sitting hospitals: </h2>
            </div>           
        </div>

        <div className="hospital-info-container">
        {data.hospitalInfo && data.hospitalInfo.availability && data.hospitalInfo.availability.length > 0 ? (
        data.hospitalInfo.availability.map((availability, index) => (
            <div key={index} className="hospital-info">
                <div className="hospital-logo">
                    <img className="Logos" width={100} height={100} src={doctorImage} alt="Hospital Logo" />
                </div>
                <div className="hospital-details">
                    <h2>{data.hospitalInfo.hospitalName}</h2>
                    <p><b>Phone:</b> {data.hospitalInfo.phone}</p>
                    <p><b>Address:</b> {data.hospitalInfo.address}</p>
                    <p><b>Email:</b> {data.hospitalInfo.email}</p>
                    <p><b>Availability:</b> {availability.day} - {availability.time}</p>
                </div>
            </div>
            ))
            ) : ( <p>No hospital information available</p> )
        }
        </div>
      

        <h2 className='calendar-title'>Available Booking Schedule:</h2>
        <div className="calendar-view">
            <CalendarSchedule />
        </div>
    </>
  );
}

export default DoctorProfile;