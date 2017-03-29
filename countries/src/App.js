import React,{Component} from 'react';
import logo from './logoworld.png';
import './App.css';
import Request from 'superagent';
import CountryList from './components/countryList';
import _ from 'lodash';

class App extends Component {
  constructor(){
    super();
    this.state={
        filterType:"all",
        search:"",
        region: 'All',
        population: 1000


    };
    this.updateSearch = this.updateSearch.bind(this);
    this.data = this.data.bind(this);
    this.updatePop = this.updatePop.bind(this);
    this.updateRegion = this.updateRegion.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }
  componentWillMount(){
      this.data(this.state.search);
      let {countries, population,region} = this.state;
      this.filterItems(countries, population, region);
  }

  updateSearch(event){
      this.setState({
          search: event.target.value
      });
      this.data(this.state.search);
  }
   filterItems(countries,pop,region){
       let filter = _.filter(countries, function(el){
           return el
       });
       console.log(filter);
      this.setState({
          selectedCountries: filter
      });
   }
   updateRegion(event){
       this.setState({
           region: event.target.value
       });
   }
  updatePop(event){
      this.setState({
          population: event.target.value
      });
  }
  data(){
      let url;

       url = `https://restcountries.eu/rest/v2/all`;

      Request.get(url).then((response)=>{
          this.setState({
              countries: response.body
          });
      }).catch((error) => {
          console.log('we have error', error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <div className="container">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Countries of the world</h2>
                <input  onChange={this.updateSearch} type="text" placeholder="Country name"/>
                <input defaultValue={10000} onChange={this.updatePop} type="number" min="10000" max="100000000000" step="1000" placeholder="Population"/>
                <select  defaultValue={'All'} onChange={this.updateRegion}>
                    <option  value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </div>

          <CountryList
              countries={this.state.countries}
              population={this.state.population}
              region={this.state.region}
              query={this.state.search}
          />
      </div>
    );
  }
}

export default App;
