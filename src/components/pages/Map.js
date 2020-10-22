import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


export default function Map() {

    const [center, setCenter] = useState({ lng: 51.414121, lat: 35.7080112 })
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibWdrIiwiYSI6ImNrZnhsb3RoZTAxcXgyc203Nno2d2NudmIifQ.cHT4jtDE1aWN9S0RGyB1rg";
        if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
            mapboxgl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                true // Lazy load the plugin
            )
        }

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center.lng, center.lat],
            zoom: zoom
        })

        map.on('move', () => {
            setCenter({ lng: map.getCenter().lng.toFixed(6), lat: map.getCenter().lat.toFixed(6) })
            setZoom(map.getZoom().toFixed(2))
            console.log("lat", map.getCenter().lat.toFixed())
            console.log("lng", map.getCenter().lng.toFixed())
        })
        map.on('dblclick', () => {
            alert(map.getCenter().lng.toFixed(6))
        })
        const marker = new mapboxgl.Marker().setLngLat([51.414121, 35.7080112]).addTo(map);

        map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }));

    }, [])


    return (
        <>
            <p>lat:{center.lat}  |  lng:{center.lng} | zoom:{zoom}</p>
            <div id="map">
            </div>
        </>
    )
}
