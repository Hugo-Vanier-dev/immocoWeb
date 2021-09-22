import React, { useState, useEffect } from 'react';
import CalendarHeader from '../calendar/calendarHeader/CalendarHearder';
import Day from '../calendar/day/Day';
import NewEventModal from '../calendar/newEventModal/NewEventModal';
import DeleteEventModal from '../calendar/deleteEventModal/DeleteEventModal';
import { UseDate } from '../calendar/hook/UseDate';
import './Calendar.css';

function Calendar(){
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? 
      JSON.parse(localStorage.getItem('events')) : 
      []
  );

  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = UseDate(events, nav);

  return(
    <>
      <div id="container" className="shadow m-3 p-2 rounded-md">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays" className="grid grid-cols-7 gap-2 text-blue-400 font-bold text-xs pb-2 pt-4">
          <div>Dimanche</div>
          <div>Lundi</div>
          <div>Mardi</div>
          <div>Mercredi</div>
          <div>Jeudi</div>
          <div>Vendredi</div>
          <div>Samedi</div>
        </div>

        <div id="calendar" className="grid grid-cols-7 gap-2 py-2">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
  );
};

export default Calendar;