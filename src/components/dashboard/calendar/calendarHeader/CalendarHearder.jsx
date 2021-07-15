import React from 'react';

function CalendarHeader({ onNext, onBack, dateDisplay }){
  return(
    <div id="header" className="text-left flex justify-between">
      <div id="monthDisplay" className="text-2xl font-black text-green-400 my-2 mx-3">{dateDisplay}</div>
      <div>
        <button onClick={onBack} id="backButton" className="bg-gray-100 font-semibold text-blue-300 hover:bg-green-300 hover:text-gray-50 shadow-md mx-1 my-2">Back</button>
        <button onClick={onNext} id="nextButton" className="bg-gray-100 font-semibold text-blue-300 hover:bg-green-300 hover:text-gray-50 shadow-md mx-1 my-2">Next</button>
      </div>
    </div>
  );
};

export default CalendarHeader;