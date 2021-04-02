
import React from 'react';
import {Line} from 'react-chartjs-2';

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
      backgroundColor:'rgba(0,120,230,0.5)',
      borderColor: 'black',
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
            showLines: false,
            layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 40
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
              display:0,
              align:'start',
              position:'left'
            }
          }}
        />
      </div>
    );
};