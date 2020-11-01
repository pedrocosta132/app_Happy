import React, { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

import MarkerIcon from '../assets/images/marker.svg';

import '../assets/styles/pages/orphanagemapsearch.css';

const mapIcon = Leaflet.icon({
    iconUrl: MarkerIcon,
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanageMapSearch(){

    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanage').then(res => {
            if(res.status === 200)
                setOrphanages(res.data);
            else
                console.log('Error loading list.');
        });
    }, []);

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
            
                {orphanages.map(orphanage => {
                    return (
                        <Marker key={orphanage.id} position={[orphanage.latitude,orphanage.longitude]} icon={mapIcon}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240}className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={32} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}

            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanageMapSearch;