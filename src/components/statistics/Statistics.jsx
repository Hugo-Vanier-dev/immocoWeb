
import React from 'react';
import './Statistics.css';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['Janvier', 'Février', 'Mars',
           'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre',
             'Novembre', 'Décembre'],
  datasets: [
    {
      label: 'Ventes',
      backgroundColor:'lightGreen',
      borderColor: 'red',
      borderWidth: 1,
      data: [10, 30, 40, 30, 30, 50, 70, 80, 60, 30, 20, 20]
    }
  ]
}

export default function EmployeeStatsPage() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Ventes annuelles',
              fontSize:20
            },
            legend:{
              display:true,
              onClick:true,
              backgroundColor:'#B97795',
              position:'left'
            }
          }}
        />
      </div>
    );
};