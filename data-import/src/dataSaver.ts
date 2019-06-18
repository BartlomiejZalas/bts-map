import { Bts } from "./domain";
import { insertBtses } from "./mongoDao";


const saveData = (bts: Bts[]): void => {
    insertBtses(bts);
};

export default saveData;