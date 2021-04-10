import React from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'


function DayList(){
    return(
    <div className="DayListContainer">
      <FullCalendar
        plugins={[ listPlugin, interactionPlugin ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="listWeek"
        eventClick={function(info) {
            alert(info.event.title);
          }}
        events={[
          { title: 'fullcalendar test', date: '2021-04-01 08:00:00', color: 'red'},
          { title: 'Lunch', date: '2021-04-01 12:00:00', color: 'violet'},
          { title: 'Poo Party', date: '2021-04-01 13:30:00', color: 'green'},
          { title: 'Diner', date: '2021-04-01 19:45:00', color: 'yellow'},
          { title: 'Redruming Time', date: '2021-04-01 21:00:00', color: 'pink'},
          { title: 'Sleepy Time', date: '2021-04-01 23:45:00', color: 'white'}
        ]}
      />
    </div>
    )
}


export default DayList;