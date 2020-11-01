import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { LeafletMouseEvent } from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../assets/styles/pages/create-orphanage.css';

import api from "../services/api";


export default function CreateOrphanage() {

  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const history = useHistory();

  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [instructions,setInstructions] = useState('');
  const [openingHours,setOpeningHours] = useState('');
  const [openOnWeekend,setOpenOnWeekend] = useState(false);
  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);


  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;

    setPosition({
      longitude: lng,
      latitude: lat
    });
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    const selectedImages = Array.from(e.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault();

    const { latitude , longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekend', String(openOnWeekend));
    images.forEach(image => {
      data.append('images',image);
    });

    await api.post('orphanage', data);

    alert('Welcome <3');

    history.push('/search');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Data</legend>

            <Map 
              center={[41.1593158,-8.6404762]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              { position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude,position.longitude]} 
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input id="name" onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">About <span>Max. 300 characters</span></label>
              <textarea id="name" maxLength={300} onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Photos</label>

              <div className="images-container">

                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt=""/>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple type="file" id="image[]" onChange={handleSelectImages}/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitation</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions" onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Schedule</label>
              <input id="opening_hours" onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on weekends</label>

              <div className="button-select">
                <button type="button" className={openOnWeekend ? 'active' : ' '} onClick={() => setOpenOnWeekend(true)}>Yes</button>
                <button type="button" className={!openOnWeekend ? 'active' : ' '} onClick={() => setOpenOnWeekend(false)}>No</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
