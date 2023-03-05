import { Coordinate } from "openlayers";
import { atom, selector } from "recoil";

export const coordinate = atom<Coordinate>({
    key: 'coordinate',
    default: [0, 0]
})