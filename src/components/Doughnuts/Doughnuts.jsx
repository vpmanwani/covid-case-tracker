import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import colors from './colors'

const Doughnuts = (props) => {
    // console.log(props);
    let Countries= [];
    try{
        Countries = props.data;
    }catch(error){}

    // slice top countries for each doughnut from the available
    let topCountriesConfirmed = [];
    let topCountriesDeaths = [];
    let topCountriesRecovered = [];
    let showLegendBoolean = window.innerWidth < 400 ? false : true;
    // let topCountriesActive = [];

    //logic for slicing
    try{
        topCountriesConfirmed = Countries.sort((a,b) => b.TotalConfirmed - a.TotalConfirmed).slice(0,10);
        topCountriesRecovered = Countries.sort((a,b) => b.TotalRecovered - a.TotalRecovered).slice(0,10);
        topCountriesDeaths = Countries.sort((a,b) => b.TotalDeaths - a.TotalDeaths).slice(0,10);
        //topCountriesActive = Countries.sort((a,b) => b.TotalActive - a.TotalActive).slice(0,10);
    } catch(error){}

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
                            backgroundColor: colors.slice(0,10),
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