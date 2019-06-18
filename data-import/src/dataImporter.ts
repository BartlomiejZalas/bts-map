import getData from './xlsReader';
import getBtsData from './rawDataToBtsConverter';
import saveData from './dataSaver';

const importData = (xlsPath: string) : void => {
    const rawData = getData(xlsPath);
    const btsData = getBtsData(rawData);

    console.log(btsData);
    saveData(btsData);
};

importData(__dirname + '/../../tests/data/sample_data_test.xlsx');
