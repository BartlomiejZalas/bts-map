import importData from '../src/dataImporter';
import * as getData from '../src/xlsReader';
import * as getBtsData from '../src/rawDataToBtsConverter';
import * as saveData from '../src/dataSaver';
import chai, { expect } from 'chai';
import { Bts } from '../src/domain';
import spies from 'chai-spies';
import promises from 'chai-as-promised';

chai.use(spies);
chai.use(promises);

describe('Data importer', () => {
    const rawData = [['string1', 'string2']];
    const bts = [new Bts(1, 2, 'bts1'), new Bts(1, 2, 'bts2')];
    const dummyBuffer = {} as ArrayBuffer;

    beforeEach(() => {
        chai.spy.on(getData, 'default', () => rawData);
        chai.spy.on(getBtsData, 'default', () => bts);
    });

    afterEach(() => {
        chai.spy.restore();
    });

    it('should convert dms-like string to lat,lng', async () => {
        chai.spy.on(saveData, 'default', () => Promise.resolve());

        await importData(dummyBuffer);

        expect(getBtsData.default).to.have.been.called.with(rawData);
        expect(saveData.default).to.have.been.called.with(bts);
    });

    it('should rethrow error from dataSaver', () => {
        chai.spy.on(saveData, 'default', () => Promise.reject(new Error('Upsi kaksi!')));
        return expect(importData(dummyBuffer)).to.rejectedWith('Upsi kaksi!')
    });
});