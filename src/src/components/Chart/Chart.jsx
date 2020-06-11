import React from 'react';
//import { fetchDailyGlobalData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

const Chart = ({ data, dateWiseData ,country }) => {
    const barChart = (
        data.confirmed ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Active', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [data.confirmed, data.confirmed - data.recovered - data.deaths, data.recovered, data.deaths, ],
                        }],
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `${country.toUpperCase()}` }
                    }}
                />
            ) : null
    );

    let showLegendBoolean = window.innerWidth < 400 ? false : true;

    const lineChart = (
        dateWiseData.length? (<Line data={{
            labels: dateWiseData.map(({ Date }) => Date.slice(0,10)),
            datasets: [{
                data: dateWiseData.map(({ Confirmed }) => Confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true
            }, {
                data: dateWiseData.map(({ Recovered }) => Recovered),
                label: 'Recovered',
                borderColor: 'green',
                fill: true
            }, {
                data: dateWiseData.map(({ Deaths }) => Deaths),
                label: 'Deaths',
                borderColor: 'red',
                fill: true
            }, 
            ],
        }} 
        options={{
            legend: { display: showLegendBoolean },
            title: { display: true, text: `Daily Cases` }
        }}
        />) : null
    );

        return (
            <div className="bg-transparent clo-sm-12">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 bg-light col-md-6 border-all mt-2 mb-2 shadow-lg vertical-line">
                            {barChart}
                        </div>
                        <div className="col-sm-12 bg-light col-md-6 border-all mt-2 mb-2 shadow-lg vertical-line">
                            {lineChart}
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Chart;