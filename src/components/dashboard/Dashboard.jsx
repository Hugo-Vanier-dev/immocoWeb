
import React from 'react';
import './Dashboard.css';
import SchedulerPage from './scheduler/Scheduler';
import DayListPage from './scheduler/dayList/DayList';
import EmployeeStatsPage from '../statistics/Statistics';
import SalesObjectivesPage from '../objectives/Objectives';

function DashboardPage(){
    return(
    <div className="dashboardContainer grid gap-2 grid-rows-4 grid-cols-3">
        <div className="SchedulerDetails grid col-span-2 row-span-3 shadow-md bg-opacity-50 bg-white border-solid border-white border-4 rounded-xl ml-0 mt-2 mb-2 p-2">
            <DayListPage />
        </div>
        <div className=" grid row-start-1 row-span-2 col-start-3 m-2 mb-1 p-2 bg-opacity-50 border-solid border-white border-4 bg-white rounded-xl shadow-md">
            <SchedulerPage />
        </div>
        <div className="grid grid-cols-1 grid-rows-2 row-start-3 row-span-2 col-start-3 m-2 mt-1 p-2 bg-opacity-50 border-solid border-white border-4 bg-white rounded-xl shadow-md">
            <EmployeeStatsPage />
        </div>
        <div className="SchedulerAppointmentForm grid col-span-2 row-span-1 shadow-md bg-opacity-50 bg-white border-solid border-white border-4 rounded-xl m-0 mb-2 p-2">
         <SalesObjectivesPage />
        </div>
    </div>
    )
}

export default DashboardPage;
