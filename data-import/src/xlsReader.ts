import xlsx from 'node-xlsx';
import convertToLatLng from './dmsToLatLngConverter';
import { Bts } from "./domain";

const getSheetData = (fileName: string): string[][] => {
    return xlsx.parse(fileName)[0].data;
};

const createBtsData = (sheet: string[][]): Bts[] => {
    return sheet
        .slice(1)
        .map(row => {
            const coordinates = convertToLatLng(row[2], row[1]);
            return new Bts(coordinates.lat, coordinates.lng, row[6]);
        });
};

const readBtsData = (filePath: string): Bts[] => {
    try {
        const sheet = getSheetData(filePath);
        return createBtsData(sheet);
    } catch (e) {
        throw new Error(`Error during reading XLSX file ${filePath}: ${e}`);
    }
};

export { readBtsData };