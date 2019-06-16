import xlsx from 'node-xlsx';
import { Antena } from './Antena';
import { Coordinates } from './Coordinates';
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

const readAntenasData = (filePath: string): Antena[] => {
    const fileName: string = 'C:\\Users\\Baza\\Downloads\\linie_radiowe_stan_na_2019-05-27_test.xlsx';
    try {
        const sheet = getSheetData(fileName);
        const antenaData = createAntenasData(sheet);
        return antenaData;
    } catch (e) {
        throw new Error("Error during reading XLSX file '" + fileName + "': " + e);
    }
}

export { readAntenasData };