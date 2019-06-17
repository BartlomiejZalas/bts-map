import xlsx from 'node-xlsx';
import { Antena } from './antena';
import { Coordinates } from './coordinates';
const parseDMS = require('parse-dms');

const getSheetData = (fileName: string): string[][] => {
    return xlsx.parse(fileName)[0].data;
}

const convertToLatLng = (dmsLat: string, dmsLng: string): Coordinates => {
    const parseToProperFormat = (dmsLike: string): string => {
        const regex = new RegExp("N|S|W|E");
        const matchResult = dmsLike.match(regex);
        if (matchResult === null) {
            throw new Error("Expected coordinates to contains letters: " + regex);
        }
        const directionLetter = matchResult[0];
        const dms = dmsLike.replace(directionLetter, "°") + directionLetter;
        return dms;
    }
    const coordinatesInConvertableFormat = parseToProperFormat(dmsLat) + ' ' + parseToProperFormat(dmsLng);
    const latLng = parseDMS(coordinatesInConvertableFormat)
    return { lat: latLng.lat, lng: latLng.lon };
}

const createAntenasData = (sheet: string[][]): Antena[] => {

    return sheet
        .slice(1)
        .map(row => {
            const coordinates = convertToLatLng(row[2], row[1]);
            return { lat: coordinates.lat, lng: coordinates.lng, name: row[6] }
        });
}

const readBtsData = (filePath: string): Antena[] => {
    try {
        const sheet = getSheetData(filePath);
        const antenaData = createAntenasData(sheet);
        return antenaData;
    } catch (e) {
        throw new Error("Error during reading XLSX file '" + filePath + "': " + e);
    }
}

export { readBtsData };