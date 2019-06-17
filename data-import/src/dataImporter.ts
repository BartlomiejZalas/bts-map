import getData from './xlsReader';
import getBtsData from './xlsToBtsConverter';

const importData = (xlsPath: string) : void => {
    const rawData = getData(xlsPath);
    const btsData = getBtsData(rawData);

    console.log(btsData)
    // import to DB
};

importData(__dirname + '/../../tests/data/sample_data_test.xlsx');
