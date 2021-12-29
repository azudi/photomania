import React, { Component } from 'react';
import ChefMaster from "./chefMaster";
import Headdown from './headdown';

class Body extends React.Component {
    render() { 
        return <div>
            <ChefMaster></ChefMaster>
            <Headdown></Headdown>
        </div>;
    }
}
 
export default Body;