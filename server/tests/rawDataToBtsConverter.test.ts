import createBtsData from '../src/rawDataToBtsConverter';
import { expect } from 'chai';
import sinon from 'sinon';
import * as latlongConverter from "../src/dmsToLatLngConverter";
import { Coordinates } from '../src/domain';

describe('Raw Data To BTS Converter', () => {
    it('should convert data into BTS array', () => {
        const data: string[][] = [
            ["", "19E02'19.0''", "49N51'38.0''", "", "", "", "street1"],
            ["", "18E45'14.6''", "54N13'55.3''", "", "", "", "street2"]
        ];

        sinon.stub(latlongConverter, 'default').returns(new Coordinates(1,2))

        const btsArray = createBtsData(data);

        expect(btsArray).to.have.lengthOf(2);
        const [bts1, bts2] = btsArray;

        expect(bts1.lat).to.eq(1);
        expect(bts1.lng).to.eq(2);
        expect(bts1.name).to.eq('street1');

        expect(bts2.lat).to.eq(1);
        expect(bts2.lng).to.eq(2);
        expect(bts2.name).to.eq('street2');
    });
});