import { Coordinates } from "./domain";
// const parseDMS = require('parse-dms');
import parseDMS from 'parse-dms';

const normalizeDms = (dmsLike: string): string => {
    const regex = new RegExp('[NSWE]');
    const matchResult = dmsLike.match(regex);
    if (matchResult === null) {
        throw new Error("Expected coordinates to contains letters: " + regex);
    }
    const directionLetter = matchResult[0];
    return dmsLike.replace(directionLetter, "°") + directionLetter;
}

const convertToLatLng = (dmsLat: string, dmsLng: string): Coordinates => {
    const coordinatesInConvertableFormat = normalizeDms(dmsLat) + ' ' + normalizeDms(dmsLng);
    const latLng = parseDMS(coordinatesInConvertableFormat);
    return new Coordinates(latLng.lat, latLng.lon);
}

export default convertToLatLng;