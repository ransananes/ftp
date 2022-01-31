import React from 'react'
import logo from './assets/logo.png'
import './Homepage.css'
import LocalFileBrowser from './components/LocalFileBrowser';

function Homepage() {

    return (
        <div className="__pcs_cs">
            <img src={logo} alt="RadarCloudStorage"/>
            <div className="__pcs_cs_search_engine">
                <div className="__pcs_cs_search_results"> 
                <LocalFileBrowser />
                </div>
            </div>
            <span> version: prototype</span>
        </div>
    )
}

export default Homepage
