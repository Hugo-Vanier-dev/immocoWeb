import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Scheduler.css';

function Scheduler(){
    return(
    <div className="schedulerContainer">
        
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
            { title: 'Ajout du Calendar', date: '2021-04-01' },
            { title: 'event 2', date: '2021-04-02' }
        ]}
      />

    </div>
    )
}

export default Scheduler;