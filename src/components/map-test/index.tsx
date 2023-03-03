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
import { IGeolocation } from '../../interfaces/geolocation'

interface IMapWithPins {
  geolocations: IGeolocation[]
} 

const MapTest = (props: IMapWithPins) => {

  
  const mapRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/assets/pointerPastelBlue.svg',
      }),
    });

    const pointFeatures: Feature<Point>[] = []

    for (let i = 0; i < props.geolocations.length; i++) {
      pointFeatures.push(new Feature({
        geometry: new Point(fromLonLat([props.geolocations[i].lon, props.geolocations[i].lat])),
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
  }, props.geolocations);

  return <S.MapContainer ref={mapRef} />
}

export default MapTest