import xlsx from 'node-xlsx';
import { Antena } from './antena';
import convertToLatLng from './dmsToLatLngConverter';

const getSheetData = (fileName: string): string[][] => {
    return xlsx.parse(fileName)[0].data;
}

const createBtsData = (sheet: string[][]): Antena[] => {
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
        return createBtsData(sheet);
    } catch (e) {
        throw new Error("Error during reading XLSX file '" + filePath + "': " + e);
    }
}

export { readBtsData };