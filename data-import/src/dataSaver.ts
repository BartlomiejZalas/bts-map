import { Bts } from "./domain";
import { insertBtses } from "./mongoDao";


const saveData = async (bts: Bts[]): Promise<void> => {
    await insertBtses(bts);
};

export default saveData;