import saveData from "../src/dataSaver";
import { Bts } from "../src/domain";
import * as mongoDao from '../src/mongoDao';
import { insertBtses } from '../src/mongoDao';
import chai, { expect } from "chai";
import spies from 'chai-spies';
import promises from 'chai-as-promised';

chai.use(spies);
chai.use(promises);

describe('Data Saver', () => {

    const bts = [new Bts(1, 2, 'bts')];

    afterEach(() => {
        chai.spy.restore();
    });

    it('should delegate to DAO', async () => {
        chai.spy.on(mongoDao, 'insertBtses', () => Promise.resolve());

        await saveData(bts);

        expect(mongoDao.insertBtses).to.have.been.called.with(bts);
    });

    it('should rethrow error', () => {
        chai.spy.on(mongoDao, 'insertBtses', () => Promise.reject(new Error('Upsi kaksi!')));
        return expect(insertBtses(bts)).to.rejectedWith('Upsi kaksi!')
    })
});
