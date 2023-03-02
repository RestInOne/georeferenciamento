import React, {useState, useRef, useEffect} from "react";
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Geometry } from "ol/geom";
import * as S from './styled'
import { transform } from "ol/proj";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { coordinate } from "../../state/map";

export default function MapWrapper(props: any){


    const [ map, setMap ] = useState<Map>()
    const [ featuresLayer, setFeaturesLayer ] = useState<VectorLayer<VectorSource<Geometry>>>()
    const coordinates = useRecoilValue(coordinate)
    const setCoordinates = useSetRecoilState(coordinate)
    const mapElement = useRef()
    const mapRef = useRef<Map>()
    mapRef.current = map

    const handleMapClick = (event) => {
    
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    
        const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    
        setCoordinates([transormedCoord[0], transormedCoord[1]])
        
      }

    useEffect( () => {

        const initalFeaturesLayer = new VectorLayer({
          source: new VectorSource()
        })
    
        const initialMap = new Map({
          target: mapElement.current,
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
              })
            }),
    
            initalFeaturesLayer
            
          ],
          view: new View({
            projection: 'EPSG:3857',
            center: [0, 0],
            zoom: 2
          }),
          controls: []
        })
    
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)

        initialMap.on('click', handleMapClick)

        return () => initialMap.setTarget(null)
    
      },[])
  
    

    return (
        <S.MapContainer ref={mapElement}></S.MapContainer>
    )
}