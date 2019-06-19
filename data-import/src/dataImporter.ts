import getData from './xlsReader';
import getBtsData from './rawDataToBtsConverter';
import saveData from './dataSaver';

const importData = async (xlsPath: string | ArrayBuffer): Promise<void> => {
    const rawData = getData(xlsPath);
    const btsData = getBtsData(rawData);

    await saveData(btsData);
};

export default importData;
