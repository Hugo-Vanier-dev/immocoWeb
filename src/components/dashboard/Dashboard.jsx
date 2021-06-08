import React from 'react';
import './Dashboard.css';
import EmployeeStatsPage from '../statistics/Statistics';
import SalesObjectivesPage from '../objectives/Objectives';

function DashboardPage(){
    return(
    <div className="dashboardContainer grid gap-2 grid-rows-4 grid-cols-3">
        <div className="SchedulerDetails grid col-span-2 row-span-3 m-1 p-1">
            <EmployeeStatsPage />
        </div>
        <div className=" grid row-start-1 row-span-2 col-start-3 m-1 p-1">
            <SalesObjectivesPage />
        </div>
        <div className="grid grid-cols-1 grid-rows-2 row-start-3 row-span-2 col-start-3 m-1 p-1">
        </div>
        <div className="SchedulerAppointmentForm grid col-span-2 row-span-1">
         <div>
         </div>
        </div>
    </div>
    )
}

export default DashboardPage;
