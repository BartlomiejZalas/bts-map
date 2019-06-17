import { readBtsData } from '../src/xlsReader';
import { expect } from 'chai';

describe('XLSX Reader', () => {
    it('should convert data from xlsx to array of antenas', () => {
        const btsData = readBtsData(__dirname + '/data/sample_data_test.xlsx');

        expect(btsData).to.have.lengthOf(14);

        expect(btsData[0].lat).to.be.eq(49.86055555555556);
        expect(btsData[0].lng).to.be.eq(19.038611111111113);
        expect(btsData[0].name).to.be.eq('ul. Chochołowska 28');

        expect(btsData[13].lat).to.be.eq(54.25963888888889);
        expect(btsData[13].lng).to.be.eq(18.606);
        expect(btsData[13].name).to.be.eq('ul. Różana 3');
    });
});