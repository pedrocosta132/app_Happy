import React, { useEffect, useState } from "react";
import {  } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../assets/styles/pages/orphanage.css';


interface Orphanage {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekend: boolean,
  images: Array<{
    id: number,
    url: string
  }>,
}
interface OrphanageParams{
  id: string;
}

export default function Orphanage() {

  const params = useParams<OrphanageParams>();
  const [orphanage,setOrphanage] = useState<Orphanage>();
  const [currentImageIndex,setCurrentImageIndex] = useState(0);
    
  useEffect(() => {
      api.get(`orphanage/${params.id}`).then(res => {
          if(res.status === 200)
              setOrphanage(res.data);
          else
              console.log('Error loading data.');
          console.log(res.data);
      });
  }, [params.id]);

  //later change to shimmer effect or spinner
  if(!orphanage){
    return <p>Loading...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[currentImageIndex].url} alt="Lar das meninas" />

          <div className="images">
            {orphanage.images.map((image,index) => {
              return (
                <button 
                  key={image.id} 
                  className={currentImageIndex === index ? 'active' : ''}
                  type="button" 
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                >
                  <img src={image.url} alt=""/>
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>See route on Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instructions to follow</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekend ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Open <br />
                  on weekends
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Closed <br />
                  on weekends
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}