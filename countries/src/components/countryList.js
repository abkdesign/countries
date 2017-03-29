import React from 'react';
import Country from './country';
import _ from 'lodash';
class CountryList extends React.Component{

    render(){
        let searchCountries = _.filter(this.props.countries, (el) =>{
            let queryStr = el.name.toLowerCase().includes(this.props.query.toLowerCase());
            if(this.props.query === ''){
                return el;
            }else{
                return queryStr;
            }
        });
        let filteredCountries = _.filter(searchCountries, (el) =>{

            if(el.population > this.props.population && this.props.region.includes("All")){
                return el.population > this.props.population;
            }
            else{
                return el.region === this.props.region
                && el.population > this.props.population
               ;
            }
        });
        let countries = _.map(filteredCountries,(country)=>{
            return <Country
                key={_.uniqueId()}
                country={country.name}
                population={country.population}
                flag={country.flag}
                region={country.region}
            />
        });
        return(
            <ul>
                {countries}
            </ul>
        );
    }
}
export default CountryList;