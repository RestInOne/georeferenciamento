import * as S from './styled'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Icon, Style } from 'ol/style';
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { clientGeolocation } from '../../state/clients'

const MapTest = () => {

    const geolocations = useRecoilValue(clientGeolocation)
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
          const iconStyle = new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            }),
          });
      
          const pointFeatures : Feature<Point>[] = []

          for (let i = 0; i < geolocations.length; i++){
            pointFeatures.push(new Feature({
                geometry: new Point(fromLonLat([geolocations[i].lon, geolocations[i].lat])),
              }))
            }
      
          const vectorSource = new VectorSource({
            features: [...pointFeatures],
          });
      
          const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: iconStyle,
          });
      
          const map = new Map({
            target: mapRef.current!,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              vectorLayer,
            ],
            view: new View({
              center: fromLonLat([0, 0]),
              zoom: 4,
            }),
          });
      
          return () => map.dispose();
        }, geolocations);

    return <S.MapContainer ref={mapRef}/>
}

export default MapTest