import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return(
        <div className={styles.footer}>
            All the data is fetched from these APIs: 
            <a href="https://api.covid19api.com/" className={styles.api} target="new">https://api.covid19api.com/</a>
            <a href="https://covid19.mathdro.id/api/" className={styles.api} target="new">https://covid19.mathdro.id/api/</a>
            <br/>
            Source Code: <a href="https://www.github.com/vpmanwani/covid-case-tracker" target="new" className={styles.icon}><i className="fa fa-github-square"></i></a>
            Developer: &nbsp;<a href="https://www.linkedin.com/in/vishal-manwani-62a05665" target="new" className={styles.icon}><i className="fa fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/vpmanwani" target="new" className={styles.icon}><i className="fa fa-facebook-square"></i></a>
        </div>
    );
};

export default Footer;