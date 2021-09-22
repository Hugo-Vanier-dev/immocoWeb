import React from 'react';

function CalendarHeader({ onNext, onBack, dateDisplay }){
  return(
    <div id="header" className="text-left flex justify-between">
      <div id="monthDisplay" className="text-2xl font-bold text-blue-400 uppercase mx-3">{dateDisplay}</div>
      <div className="flex h-1/2">
        <button onClick={onBack} id="backButton" className="text-blue-400 hover:bg-blue-300 hover:text-gray-50 shadow mx-2 py-1 rounded-xl border-2 border-blue-300">Préc.</button>
        <button onClick={onNext} id="nextButton" className="text-blue-400 hover:bg-blue-300 hover:text-gray-50 shadow mx-2 py-1 rounded-xl border-2 border-blue-300">Suiv.</button>
      </div>
    </div>
  );
};

export default CalendarHeader;