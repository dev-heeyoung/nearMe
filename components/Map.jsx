import React, { useState, useEffect } from 'react';
// import openlayers API
import 'ol/ol.css'; 
import { Map as OlMap, View, interaction } from 'ol';
import { transform, fromLonLat, get as getProjection } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source'; 
import { Draw } from 'ol/interaction';
import Feature from 'ol/Feature';
import { Point} from 'ol/geom';

function Map(props){
    
    console.log(props.lon, props.lan);

   const [mapObject, setMapObject] = useState({});
  
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
        const coords = [[-79.62106, 43.636265], [-79.623439, 43.636055], [-79.626636, 43.570452], [-79.553568, 43.67061], [-79.608228, 43.641731]];
        coords.map((event) =>{
            const eventFeature =  new Feature({
                geometry : new Point(transform(event, 'EPSG:4326' ,'EPSG:3857')),
            }); 
           // eventFeature.setProperties({'eventId' : event.id})
            eventSource.addFeature(eventFeature);
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

        const curSource = new VectorSource({});
        const curFeature = new Feature({
            geometry : new Point(transform([-79.6137353, 43.6456027], 'EPSG:4326' ,'EPSG:3857')),
        }); 
        curSource.addFeature(curFeature);
        const curLayer = new VectorLayer({
            source: curSource,
            style: {
                'circle-radius': 9,
                'circle-fill-color': 'blue'
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
                center:transform([-79.6137353, 43.6456027],'EPSG:4326' ,'EPSG:3857'),
                zoom: 15,
            })
        })
        map.addLayer(eventLayer);
        map.addLayer(curLayer);

        setMapObject({ map })
        return ()=> null
    }, [])
    console.log('map component')
    return (<div id="map"></div>);
  }

  export default Map;