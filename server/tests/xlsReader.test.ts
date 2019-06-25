import readXlsData from '../src/xlsReader';
import { expect } from 'chai';

describe('XLSX Reader', () => {
    it('should convert data from xlsx to array of antenas', () => {
        const btsData = readXlsData(__dirname + '/data/sample_data_test.xlsx');

        expect(btsData).to.have.lengthOf(14);

        expect(btsData[0][2]).to.be.eq("49N51'38.0''");
        expect(btsData[0][1]).to.be.eq("19E02'19.0''");
        expect(btsData[0][6]).to.be.eq('ul. Chochołowska 28');

        expect(btsData[13][2]).to.be.eq("54N15'34.7''");
        expect(btsData[13][1]).to.be.eq("18E36'21.6''");
        expect(btsData[13][6]).to.be.eq('ul. Różana 3');
    });

    it('should throw error when not existing file provided', () => {
        const notExistingPath = __dirname + '/data/not-existing.xlsx';
        expect(() => readXlsData(notExistingPath)).to.throw('Error during reading XLSX data');
    });
});