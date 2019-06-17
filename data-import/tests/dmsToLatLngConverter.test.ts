import convertToLatLng from '../src/dmsToLatLngConverter';
import { expect } from 'chai';

describe('DMS to Lat Lng Converter', () => {
    it('should convert dms-like string to lat,lng', () => {
        const coordinates = convertToLatLng("19E02'19.0''", "49N51'38.0''");

        expect(coordinates.lat).to.eq(49.86055555555556);
        expect(coordinates.lng).to.eq(19.038611111111113);
    });

    it('should throw error when there is no direction letter', () => {
        const coordinatesFn = () => convertToLatLng("1902'19.0''", "4951'38.0''");

        expect(coordinatesFn).to.throw('Expected coordinates to contain letters: /[NSWE]/');
    });

    it('should throw error when input is not parsable', () => {
        const coordinatesFn = () => convertToLatLng("19N02'19.0\"", "49S51'38.0''");

        expect(coordinatesFn).to.throw("Cannot parse '19°02'19.0\"N 49°51'38.0''S' string into lat,lng");
    });
});