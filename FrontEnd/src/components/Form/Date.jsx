import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimeComponent = ({timestamp,setTimestamp}) => {
  
  const currentDateTime = new Date();
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
    const timestamp = dateTime.toISOString();
    setTimestamp(timestamp);
  };
  
  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <div className="combined-datetime">
            <DatePicker
              className="border-2 w-96 border-gray-500 rounded-xl py-2 px-4"
              selected={selectedDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              minDate={currentDateTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeComponent;
