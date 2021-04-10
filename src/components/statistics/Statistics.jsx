
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Jan', 'Fév', 'Mar',
           'Avr', 'Mai', 'Juin', 'Juil',
            'Août', 'Sept', 'Oct',
             'Nov', 'Déc'],
  datasets: [
    {
      label: 'Ventes',
      fill: true,
      lineTension: 0,
      backgroundColor:['rgba(0,80,230,0.5)',
                      'rgba(0,120,230,0.5)',
                      'rgba(0,160,230,0.5)',
                      'rgba(0,200,230,0.5)',
                      'rgba(0,240,230,0.5)',
                      'rgba(0,250,220,0.5)',
                      'rgba(0,255,170,0.5)',
                      'rgba(50,255,130,0.5)',
                      'rgba(80,255,80,0.5)',
                      'rgba(150,230,180,0.5)',
                      'rgba(120,150,180,0.5)',
                      'rgba(220,150,180,0.5)'],
      borderColor: 'rgba(150,150,150,0.1)',
      borderWidth: 2,
      data: [10, 30, 40, 30, 30, 50, 70, 80, 60, 30, 20, 20]
    }
  ]
}

export default function EmployeeStatsPage() {
    return (
      <div>
        <Doughnut
          data={state}
          options={{  
            showLines: false,
            layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            title:{
              display:true,
              text:'Ventes annuelles',
              position:'right',
              fontColor:'#000',
              fontSize:16
            },
            legend:{
              display:1,
              align:'start',
              position:'bottom'
            }
          }}
        />
      </div>
    );
};