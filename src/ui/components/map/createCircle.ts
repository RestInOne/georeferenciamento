import { Fill, Icon, Image, Stroke, Style} from 'ol/style.js';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { IClient } from '../../../domain/entities/client';
import { fromLonLat } from 'ol/proj';
import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

export const createPointWithColor = (center : [number, number], radius: number, color: string, client: IClient, map: Map) => {
    const point = new Feature({
      geometry: new Point(fromLonLat(center))
    });  

    const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: `/assets/${color}.svg`,
        }),
        zIndex: Infinity
      });


    point.setStyle(iconStyle);

    point.set('client', client)

    point.dispose()

    const vectorSource = new VectorSource({
      features: [point],
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,   
    });

    map.addLayer(vectorLayer)
  }