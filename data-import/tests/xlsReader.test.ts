import { readAntenasData } from '../xlsReader';

describe('XLSX Reader', () => {
    it('should convert data from xlsx to array of antenas', () => {
        const antenas = readAntenasData(__dirname + '/data/sample_data_test.xlsx');
        console.log(antenas)
    });
})