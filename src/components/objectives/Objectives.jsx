
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
      lineTension: 1,
      pointStyle: 'circle',
      backgroundColor:'rgba(250,250,250,0.75)',
      borderColor: 'black',
      borderWidth: 1,
      data: [70, 73, 75, 78, 80, 82, 84, 85, 86, 85, 83, 80]
    }
  ]
}

export default function SalesObjectivesPage() {
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
              text:'Objectif de vente',
              position:'top',
              fontColor:'rgba(250,250,250,1)',
              fontSize:16
            },
            legend:{
              display:0,
              align:'start',
              position:'top'
            }
          }}
        />
      </div>
    );
};