
import React from 'react';
import './Dashboard.css';
import SchedulerPage from './scheduler/Scheduler';

function DashboardPage(){
    return(
    <div className="dashboardContainer grid grid-rows-2 grid-cols-3">
        <div className="grid rows-start-1 col-span-1 cols-end-3">
            <SchedulerPage  />
        </div>
    </div>
    )
}

export default DashboardPage;
