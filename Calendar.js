import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import './Calendar.css';
import CreateBooking from '../../pages/booking/components/CreateBooking';
import api from "../../api/api.js";
import apiUtil from "../../api/apiUtil.js";
import getToken from '../../pages/getToken.js';
import { useParams } from 'react-router-dom';

const CalendarSchedule = () => {
  const [isCreateBookingVisible, setCreateBookingVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [availabilityData, setAvailabilityData] = useState({
    data: [],
    isLoading: true,
  });

  const { id } = useParams();

  useEffect(() => {
    fetchAvailabilityDataById();
  }, []); 

  // Assume you have a function to fetch the API data, e.g., fetchAvailabilityData
  const fetchAvailabilityDataById = async () => {
    // Fetch data from the API
    // Update the state with the fetched availability data
    // Example:
    // const response = await fetch('your_api_endpoint');
    // const data = await response.json();
    // setAvailabilityData(data.data.hospitalInfo.availability);

    console.log(id);
    api.get(`Doctor/GetDocDetail/${id}`, getToken()).then((result) => {
      apiUtil.parseResult(
        result,
        (response) => {
          if (response.data.code === 401) {
            alert(response.data.message);
            //localStorage.removeItem("doctors");
            //window.location.href = "/login";
          } else if (response.data.code === 200) {
            console.log(response.data.code);

            console.log(response.data.data);

            setAvailabilityData({
              isLoading: false,
              limit: response.data.data.rowLimit,
              data:
                response.data.data.data && response.data.data.data.length > 0
                  ? response.data.data.data
                  : [],
              total: response.data.data.totalRecords,
              page: response.data.data.paging,
            });
          } else {
            alert(response.data.message);
          }
        },

        (error, type) => {
          setAvailabilityData({
            isLoading: true,
            data: [],
            total: 0,
            page: 0,
            limit: 0,
          });
        }
      );
    });
  };

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleButtonClick = () => {
    setCreateBookingVisible(true);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const startDay = startOfMonth(currentMonth);
  
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={'empty-${i}'} className="empty-day" />);
    }
  
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateFormatted = currentDate.toISOString().split('T')[0];
  
      const hasAvailability = availabilityData.data.some((data) => {
        const availabilityDate = new Date(data.day);
        return (
          availabilityDate.getDate() === day &&
          availabilityDate.getMonth() === currentMonth.getMonth() &&
          availabilityDate.getFullYear() === currentMonth.getFullYear()
        );
      });
  
      if (hasAvailability) {
        days.push(
          <div key={dateFormatted} className="link-day">
            <span className="date">{day}</span>
            <button onClick={() => handleButtonClick(dateFormatted)} className="availability-button">
              {availabilityData.data
                .filter((data) => {
                  const availabilityDate = new Date(data.day);
                  return (
                    availabilityDate.getDate() === day &&
                    availabilityDate.getMonth() === currentMonth.getMonth() &&
                    availabilityDate.getFullYear() === currentMonth.getFullYear()
                  );
                })
                .map((filteredData) =>
                  filteredData.time.map((slot, index) => <div key={index}>{slot}</div>)
                )}
            </button>
          </div>
        );
      } else {
        days.push(
          <div key={dateFormatted} className="non-link-day">
            <span className="date">{day}</span>
          </div>
        );
      }
    }
  
    return days;
  };

  return (
    <div className="available-schedule">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h3>
          {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
        </h3>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="day">Sun</div>
        <div className="day">Mon</div>
        <div className="day">Tue</div>
        <div className="day">Wed</div>
        <div className="day">Thu</div>
        <div className="day">Fri</div>
        <div className="day">Sat</div>
        {renderCalendarDays()}
      </div>
      {isCreateBookingVisible && <CreateBooking />}
    </div>
  );
};

export default CalendarSchedule;