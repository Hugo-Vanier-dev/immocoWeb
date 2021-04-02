
import React from 'react';
import './Statistics.css';
import {Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Janvier', 'Février', 'Mars',
           'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre',
             'Novembre', 'Décembre'],
  datasets: [
    {
      label: 'Ventes',
      backgroundColor: [
        '#76d0ef',
        '#2e86bb',
        '#77736c',
        '#bbb6df',
        '#b08ea2',
        '#B97795',
        '#2e90aa',
        '#00736c',
        '#80c8bf',
        '#50d8bf',
        '#85f2bf',
        '#FAD787'
    ],
      borderColor: 'transparent',
      borderWidth: 0,
      data: [10, 30, 80, 20, 60, 50, 80, 80, 60, 30, 20, 20]
    }
  ]
}

export default function EmployeeStatsPage() {
    return (
      <div>
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Ventes annuelles',
              fontSize:20
            },
            legend:{
              display:true,
              backgroundColor: [
                '#76d0ef',
                '#2e86bb',
                '#77736c',
                '#bbb6df',
                '#b08ea2',
                '#B97795',
                '#2e90aa',
                '#00736c',
                '#80c8bf',
                '#50d8bf',
                '#85f2bf',
                '#FAD787'
            ],
              position:'left'
            }
          }}
        />
      </div>
    );
};