import CreateBooking from "./components/CreateBooking";
import React, { useState, useEffect } from 'react';
import api from "../../api/api.js";
import apiUtil from "../../api/apiUtil.js";
import getToken from '../getToken.js';
import { useParams } from 'react-router-dom';

const Booking = () => {

    const [booking, setBooking] = useState({
      data: [],
      isLoading: true,
    });
  
    const { id } = useParams();
  
    useEffect(() => {
      getBookingById();
    }, []);
    
    const getBookingById = () => {
     console.log(id);
      api.get(`Booking/get-booking/${id}`, getToken()).then((result) => {
      
        apiUtil.parseResult(
          result,
          (response) => { 
            if (response.data.code === 401) {
              alert(response.data.message);
              localStorage.removeItem("bookings");
            //  window.location.href = "/login";
            } else if (response.data.code === 200) {
              console.log(response.data.code);
              console.log(response.data.data);
              
              setBooking({
                isLoading: true,
                data: response.data.data,
              });
            } else {
              alert(response.data.message);
            }
          },
          (error, type) => {
            setBooking({
              data: [],
              isLoading: false,
            });
          }
        );
      });
    };
  
    return(
        <>
            <div className="container pt-5">
                <div className="row py-5">
                    
                </div>
                <div className="row">
                    <CreateBooking appointmentData={booking.data} />
                </div>
            </div>
        </>
    )
}
export default Booking;