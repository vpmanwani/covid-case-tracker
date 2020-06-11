import axios from 'axios';

// fetch global total data
// fetch global daily data
// fetch country list
// handle country change
// now the value of each country is slug and value displayed is country name
// fetch that country's total data from 'url/total/country/:country path

const url = 'https://api.covid19api.com';

// fetch specific country data if country exists
// else fetch global data
export const fetchCountryData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/total/country/${country}`

        try {
            const { data } = await axios.get(changeableUrl);
            // console.log(data);
            return data;
        } catch (error) {
            return error;
        }
    }
}

// fetch today's global data
export const fetchTodayGlobalData = async () => {
    try {
        const {data} = await axios.get(`${url}/summary`);
        // return data;
        // console.log(data);
        return { confirmed: data.Global.TotalConfirmed, deaths: data.Global.TotalDeaths, recovered:data.Global.TotalRecovered, date: data.Date, data: data };
    } catch (error) {
        return error;
    }
}

//fetch global daily data
export const fetchDailyGlobalData = async () => {
    try {
        const data = await axios.get(`https://covid19.mathdro.id/api/daily`);

        return data;
    } catch (error) {
        return error;
    }
};

// fetch list of all countries
export const fetchCountries = async () => {
    try {
        const data = await axios.get(`${url}/countries`);
        //console.log(data);
        return (data.data.map((a={},i) => data.data[i]))
    } catch (error) {
        return error;
    }
}