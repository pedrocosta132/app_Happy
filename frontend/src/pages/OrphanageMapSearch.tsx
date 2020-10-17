import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import MarkerIcon from '../assets/images/marker.svg';

import '../assets/styles/pages/orphanagemapsearch.css';
import 'leaflet/dist/leaflet.css';

function OrphanageMapSearch(){
    return(
        <div id="page-search">
            <aside>
                <header>
                    <img src={MarkerIcon} alt="map marker"/>

                    <h2>Choose an orphanage</h2>
                    <p>They are waiting for your visit :)</p>
                </header>

                <footer>
                    <strong>Porto</strong>
                    <span>Portugal</span>
                </footer>
            </aside>

            <Map 
                center={[41.1593158,-8.6404762]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </Map>

            <Link to="/" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanageMapSearch;