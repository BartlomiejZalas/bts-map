import { Bts } from "./domain";
import convertToLatLng from "./dmsToLatLngConverter";

const dmsLatColumn = 2;
const dmsLngColumn = 1;
const nameColumn = 6;

const createBtsData = (data: string[][]): Bts[] => {
    return data
        .map(row => {
            const coordinates = convertToLatLng(row[dmsLatColumn], row[dmsLngColumn]);
            return new Bts(coordinates.lat, coordinates.lng, row[nameColumn]);
        });
};

export default createBtsData;