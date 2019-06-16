import { readAntenasData } from '../xlsReader';

describe('XLSX Reader', () => {
    it('should convert data from xlsx to array of antenas', () => {
        const antenas = readAntenasData('C:\\Users\\Baza\\Downloads\\linie_radiowe_stan_na_2019-05-27_test.xlsx');
        console.log(antenas)
    });
})