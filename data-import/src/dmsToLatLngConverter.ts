import { Coordinates } from "./domain";
// const parseDMS = require('parse-dms');
import parseDMS from 'parse-dms';

const directionRegex = new RegExp('[NSWE]');

const validateMatching = (result: RegExpMatchArray | null): RegExpMatchArray => {
    if (result === null) {
        throw new Error("Expected coordinates to contain letters: " + directionRegex);
    }
    return result;
};

const validateDmsParsing = (latLng: { lat: number, lon: number }, dmsString: string): void => {
    if (!latLng.lat || !latLng.lon) {
        throw new Error(`Cannot parse '${dmsString}' string into lat,lng`)
    }
};

const normalizeDms = (dmsLike: string): string => {
    const matchResultOrNull = dmsLike.match(directionRegex);
    const matchResult = validateMatching(matchResultOrNull);
    const directionLetter = matchResult[0];
    return dmsLike.replace(directionLetter, "°") + directionLetter;
};

const convertToLatLng = (dmsLat: string, dmsLng: string): Coordinates => {
    const formatterDmsString = normalizeDms(dmsLat) + ' ' + normalizeDms(dmsLng);
    const latLng = parseDMS(formatterDmsString);
    validateDmsParsing(latLng, formatterDmsString);
    return new Coordinates(latLng.lat, latLng.lon);
};

export default convertToLatLng;