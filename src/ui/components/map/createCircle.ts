import { Fill, Icon, Image, Stroke, Style} from 'ol/style.js';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { IClient } from '../../../domain/entities/client';
import { fromLonLat } from 'ol/proj';

export const createPointWithColor = (center : [number, number], radius: number, color: string, client: IClient) => {
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
    
    return point
  }