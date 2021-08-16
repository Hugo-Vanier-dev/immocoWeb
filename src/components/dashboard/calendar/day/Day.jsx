import React from 'react';

function Day({ day, onClick }){
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''} shadow-sm rounded-md py-2 font-bold border-2 border-blue-300 text-blue-400 hover:bg-green-300 hover:text-gray-50`;
  return (
    <div onClick={onClick} className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  );
};

export default Day;