import React from 'react';
import './Dashboard.css';
import Calendar from '../dashboard/calendar/Calendar';

function DashboardPage(){
    return(
    <div className="dashboardContainer flex justify-end">
        <div className="">
            <Calendar />
        </div>
        <div className="">
            
        </div>
        <div className="">
        </div>
        <div className="">
         <div>
         </div>
        </div>
    </div>
    )
}

export default DashboardPage;
