import React from 'react';
import './Dashboard.css';
import Calendar from '../dashboard/calendar/Calendar';
import EmployeeStatsPage from '../statistics/Statistics';
import SalesObjectivesPage from '../objectives/Objectives';

function DashboardPage(){
    return(
    <div className="dashboardContainer grid gap-2 grid-rows-4 grid-cols-3">
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
