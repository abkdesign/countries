import React from 'react';

class Country extends React.Component{
    render(){
        return(
            <li className="myUL">
                <div className="content">
                    <img className="flag" src={this.props.flag} alt="flag"/>
                    <span className="title"><h3>{this.props.country}</h3></span>
                    <span className="span"><b>Population:</b> {this.props.population}</span>
                    <span className="span"><b>Region:</b> {this.props.region}</span>
                </div>
            </li>
        );
    }
}
export default Country;