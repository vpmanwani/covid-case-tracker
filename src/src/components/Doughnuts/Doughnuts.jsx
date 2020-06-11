import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import colors from './colors'

const Doughnuts = (props) => {
    // slice top countries for each doughnut from the available
    let Countries, topCountriesConfirmed, topCountriesDeaths, topCountriesRecovered = [];
    try{
        Countries = props.data;
        topCountriesConfirmed = Countries.sort((a,b) => b.TotalConfirmed - a.TotalConfirmed).slice(0,10);
        topCountriesRecovered = Countries.sort((a,b) => b.TotalRecovered - a.TotalRecovered).slice(0,10);
        topCountriesDeaths = Countries.sort((a,b) => b.TotalDeaths - a.TotalDeaths).slice(0,10);

        let topSum = [];
        topSum['confirmed'] = 0;
        topSum['recovered'] = 0;
        topSum['deaths'] = 0;
        topSum['active'] = 0;
        for (var i=0; i<10; i++){
            topSum['confirmed'] += topCountriesConfirmed[i].TotalConfirmed;
            topSum['recovered'] += topCountriesRecovered[i].TotalRecovered;
            topSum['deaths'] += topCountriesDeaths[i].TotalDeaths;
        }

        topCountriesConfirmed.push({
            Country: 'Others',
            TotalConfirmed: props.globalTotalData.confirmed - topSum['confirmed'],
        });
        topCountriesRecovered.push({
            Country: 'Others',
            TotalRecovered: props.globalTotalData.recovered - topSum['recovered'],
        });
        topCountriesDeaths.push({
            Country: 'Others',
            TotalDeaths: props.globalTotalData.deaths - topSum['deaths'],
        });
        
    }catch(error){}

    let showLegendBoolean = window.innerWidth < 400 ? false : true;

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 vertical-line text-light">
                    <Doughnut 
                    data = {{
                        labels: topCountriesConfirmed.map(({ Country }) => Country),
                        datasets: [{
                            label: "Confirmed Covid-19 Cases in World",
                            data: topCountriesConfirmed.map(({ TotalConfirmed }) => TotalConfirmed),
                            backgroundColor: colors.slice(0,10),
                            fill: true,
                        }],
                    }}
                    options = {{
                        maintainAspectRatio: true,
                        responsive: true,
                        legend: {display: showLegendBoolean, position: "bottom"},
                        title: { display: true, text: "Top 10 countries with most CONFIRMED cases" },
                    }}
                    />
                </div>
                <div className="col-sm-12 col-md-6 vertical-line text-light">
                    <Doughnut 
                    data = {{
                        labels: topCountriesRecovered.map(({ Country }) => Country),
                        datasets: [{
                            label: "Recovered Covid-19 Cases in World",
                            data: topCountriesRecovered.map(({ TotalRecovered }) => TotalRecovered),
                            backgroundColor: colors.slice(10,20),
                            fill: true,
                        }],
                    }}
                    options = {{
                        maintainAspectRatio: true,
                        responsive: true,
                        legend: {display: showLegendBoolean, position: "bottom"},
                        title: { display: true, text: "Top 10 countries with most RECOVERED cases" }
                    }}
                    />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 vertical-line text-light">
                    <Doughnut 
                    data = {{
                        labels: topCountriesDeaths.map(({ Country }) => Country),
                        datasets: [{
                            label: "Death Covid-19 Cases in World",
                            data: topCountriesDeaths.map(({ TotalDeaths }) => TotalDeaths),
                            backgroundColor: colors.slice(20,30),
                            fill: true,
                        }],
                    }}
                    options = {{
                        maintainAspectRatio: true,
                        responsive: true,
                        legend: {display: showLegendBoolean, position: "bottom"},
                        title: { display: true, text: "Top 10 countries with most DEATH cases" }
                    }}
                    />
                </div>
            </div>
        </>
    );
}

export default Doughnuts;