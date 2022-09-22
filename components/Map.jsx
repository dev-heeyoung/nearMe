import React, { useState, useEffect } from 'react';
// import openlayers API
import 'ol/ol.css'; 
import { Map as OlMap, View, interaction } from 'ol';
import { transform, fromLonLat, get as getProjection } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source'; 
import { Draw } from 'ol/interaction';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';

// import Event objects
import Event from './Event'

function Map(props){

  const [mapObject, setMapObject] = useState({})  
   useEffect(() => {

        const rasterLayer =  new TileLayer({
            source: new OSM()
        })
        const view = new View({
            center:transform([-79.34851251318761, 43.796259859304776],'EPSG:4326' ,'EPSG:3857'),
            zoom: 15
        })

        const pointFeature = new Feature({
            geometry : new Point(transform([-79.34851251318761, 43.796259859304776],'EPSG:4326' ,'EPSG:3857'))
        });
        
        
        const vectoerSource = new VectorSource({
            features : [pointFeature]
        });
        const vectorLayer = new VectorLayer({
            source: vectoerSource,
            style: {
                'fill-color': 'rgba(255, 255, 255, 0.2)',
                'stroke-color': '#ffcc33',
                'stroke-width': 2,
                'circle-radius': 7,
                'circle-fill-color': '#ffcc33',
            },
        });

        const map = new OlMap({
            layers: [rasterLayer, vectorLayer],
            target: "map", 
            view: view,
          
        })
        // click -> get lan.lon
        const draw = new Draw({
            //source: vectoerSource,
            type: 'Point',
          });

        map.addInteraction(draw);
        map.addLayer(markerLayer);
        map.on('click', function(evt){
            console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
        })
        //

        // display point 
        console.log(props.events);
        setMapObject({ map })
        return ()=> null
    }, [])

    return (<div className='border w-1/2' id="map"></div>);
  }

export default Map

