import xlsx from 'node-xlsx';

const firstSheet = 0;

const getSheetData = (fileName: string): string[][] => {
    return xlsx.parse(fileName)[firstSheet].data;
};

const removeHeader = (data: string[][]): string[][] => {
    return data.slice(1);
};

const readXlsData = (filePath: string): string[][] => {
    try {
        const sheet = getSheetData(filePath);
        const rawData = removeHeader(sheet);
        return rawData;
    } catch (e) {
        throw new Error(`Error during reading XLSX file ${filePath}: ${e}`);
    }
};

export default readXlsData;