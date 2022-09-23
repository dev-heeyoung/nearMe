import React, { useState, useEffect } from 'react';
// import openlayers API
import 'ol/ol.css'; 
import { Map as OlMap, View, interaction } from 'ol';
import { transform, fromLonLat, get as getProjection } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source'; 
import { Draw } from 'ol/interaction';
import Feature from 'ol/Feature';
import { MultiPoint, Point} from 'ol/geom';
import { Icon} from 'ol/style';

// import Event objects
import Event from './Event'


function Map( props ){


  const [mapObject, setMapObject] = useState({})
   useEffect(() => {
        /* 
        
        // old code
        //const eventFeatures = [];
        const eventsCoord = [];
        props.events.map((event)=>{ 
            const eventFeature =  new Feature({
                geometry : new Point(transform([event.longitude, event.latitude], 'EPSG:4326' ,'EPSG:3857')),
                name : event.id
            }); 
            eventFeatures.push(eventFeature.getGeometry());
            //console.log(eventFeature.getGeometry().getCoordinates());
        });
        console.log(eventFeatures);
        //feature
        const eventsFeatures = new Feature({
            geometry : new MultiPoint(eventsCoord)
        });
        */
      
    //vector source for events
        const eventSource = new VectorSource({});

        props.events?.map((event) =>{
            const eventFeature =  new Feature({
                geometry : new Point(transform([event.longitude, event.latitude], 'EPSG:4326' ,'EPSG:3857')),
            }); 
            eventFeature.setProperties({'eventId' : event.id})
            eventSource.addFeature(eventFeature);
            
           console.log("event id" +  eventFeature.getProperties() + "      event coodinate   " + transform([event.longitude, event.latitude], 'EPSG:4326' ,'EPSG:3857'));
        })
              

    //vector layer for events
        const eventLayer = new VectorLayer({
            source: eventSource,
            style: {
                'circle-radius': 9,
                'circle-fill-color': 'red'
                },
                zindex: 10
            });


        const map = new OlMap({
            layers: [
                new TileLayer({source: new OSM()}), 
                new VectorLayer({source: new VectorSource()})
            ],
            target: "map", 
            view: new View({
                center:transform([-79.34851251318761, 43.796259859304776],'EPSG:4326' ,'EPSG:3857'),
                zoom: 15,
            })
        })

        // click -> get lan.lon
        /*
        const draw = new Draw({
            source: new VectorSource({wrapX: false}),
            type: 'Point',
          });
        map.addInteraction(draw);
        */
        map.addLayer(eventLayer);
    
        map.on('click', function(evt){
           map.forEachFeatureAtPixel(evt.pixel, function(feature){
                   //console.log(feature.getGeometry().getFlatCoordinates());
                   //console.log(feature.getProperties().eventId)
                   console.log(props.events.find(event => event.id == feature.getProperties().eventId));
                })
            //console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
        })
        //

        // display point
        setMapObject({ map })
        return ()=> null
    }, [])

    return (<div className='border w-1/2' id="map"></div>)
  }

export default Map