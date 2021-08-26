
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
      pointStyle: 'square',
      backgroundColor:'rgba(255,40,40,0.5)',
      borderColor: 'rgba(255,127,127,0.5)',
      borderWidth: 1,
      data: [70, 73, 75, 78, 80, 82, 84, 85, 86, 85, 83, 80]
    }
  ]
}

const config = {
  responsive: true,
  scales: {
    x: 12,
    y: 100,
  },
  showLines:{
    fontColor: '#665493'

  },  
  title:{
    display:true,
    text:'Objectif de vente',
    position:'top',
    fontColor:'rgba(40,40,40,1)',
    fontSize:16
  },
  legend:{
    display: 0
  }
}

export default function SalesObjectivesPage() {
    return (
      <div className="bg-gray-200">
        <Line
          data={state}
          options={config}
        />
      </div>
    );
};