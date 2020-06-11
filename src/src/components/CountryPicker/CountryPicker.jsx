import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchCountryList = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchCountryList();
    }, []);

    let countryList = [];
    let l = fetchedCountries.length;
    for(var i=0; i<l; i++){
        countryList[i] = {Slug: fetchedCountries[i].Slug ,Country: fetchedCountries[i].Country};
    }
    countryList.sort(function(a, b) {
        var nameA = a.Country.toUpperCase(); // ignore upper and lowercase
        var nameB = b.Country.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
        return -1;
        }
        if (nameA > nameB) {
        return 1;
        }
    
        // names must be equal
        return 0;
    });

    return (
        <div className="container-fluid">
            <div className="col-sm-12 mt-4">
                <FormControl className={styles.formControl}>
                    <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                        <option value="">Global</option>
                        {countryList.map((country, i) => <option key={i} value={country.Slug}>{country.Country}</option>)}
                    </NativeSelect>
                </FormControl>
            </div>
        </div>
    );
}

export default CountryPicker;