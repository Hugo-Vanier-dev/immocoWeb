import React from 'react';

function Day({ day, onClick }){
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  return (
    <div onClick={onClick} className={className} className="shadow-md py-3 font-extrabold text-blue-400 hover:bg-green-300 hover:text-gray-50">
      {day.value === 'padding' ? '' : day.value}

      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  );
};

export default Day;