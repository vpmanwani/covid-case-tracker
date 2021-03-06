import React from 'react';
import { fetchTodayGlobalData } from './api';
import{ fetchCountryData } from './api';
import{ fetchDailyGlobalData} from './api';
import Cards from './components/Cards/Cards.jsx';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart';
import Doughnuts from './components/Doughnuts/Doughnuts';
import Image from './images/image.png';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';

class App extends React.Component {
    state = {
        data: {},
        dateWiseData: [],
        country: '',
        globalDailyData: [],
        globalTotalData: {},
        CountryWiseData: []
    }

    async componentDidMount () {
        try{
            const data = await fetchTodayGlobalData();
            this.setState({ data });

            const dailyGlobalData = await fetchDailyGlobalData();

            dailyGlobalData.data.map((data,i) => this.setState(() => {this.state.globalDailyData[i]=  { Confirmed: data.totalConfirmed, Deaths: data.deaths.total, Recovered: 0, Date: data.reportDate } }));
            this.setState({
                ...this.state,
                dateWiseData: this.state.globalDailyData,
                CountryWiseData: this.state.data.data.Countries,
                globalTotalData: {
                    confirmed: this.state.data.confirmed,
                    recovered: this.state.data.recovered,
                    deaths: this.state.data.deaths,
                }
            });
        }catch{}
    }

    handleCountryChange = async (country) => {
        // console.log(country);
        if(country.length){
            const data = await fetchCountryData(country);
            // console.log(data);
            if(data.length){
                let CountryTotalData = data[data.length-1];
                this.setState({ data: {confirmed: CountryTotalData.Confirmed, recovered: CountryTotalData.Recovered, deaths: CountryTotalData.Deaths}, dateWiseData: data, country:country });
                // console.log(this.state);
            }
        } else {
            const data = await fetchTodayGlobalData();
            // console.log(this.state);
            this.setState({
                ...this.state,
                data: data,
                country: ""
            });
            this.setState({
                ...this.state,
                dateWiseData: this.state.globalDailyData
            })
        }
    }

    render() {
        const { data, dateWiseData, country, CountryWiseData, globalTotalData } = this.state;
        return (
            <div className="justify-content-center text-center align-content-center align-items-center">
                <div className="justify-content-center align-items-center align-content-center text-center">
                    <div className="container-fluid justify-content-center">
                        <img src={Image} className={styles.image} alt="COVID-19" />
                        <h6 className={styles.message}>
                        Coronavirus disease 2019 (COVID-19) is an infectious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2).<br/>
                        More than <b>{data.confirmed}</b> people are affected by this global pandemic across <b>{this.state.country.length? `${this.state.country.toUpperCase()}`: `the Globe`}</b>.
                        </h6>
                        <CountryPicker handleCountryChange={this.handleCountryChange} />
                        <h6 className={styles.message}>
                        </h6>
                        <Cards data = {data} />
                        <Chart data={data} country={country} dateWiseData={dateWiseData} />
                        <Doughnuts data={CountryWiseData} globalTotalData={globalTotalData} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

export default App;