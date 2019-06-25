import { insertBtses } from "../src/mongoDao";
import { Bts } from "../src/domain";
import { MongoClient } from 'mongodb';
import chai, { expect } from 'chai';

describe('Mongo DAO', () => {

    const bts = [new Bts(1, 2, 'bts1')];
    const fn = () => {
    };
    const dbMock = {'collection': () => btsCollectionMock};
    const btsCollectionMock = {'insertMany': fn};
    const clientMock = {'close': fn};

    it('should insert data to Mongo', async () => {
        chai.spy.on(MongoClient, 'connect', () => clientMock);
        chai.spy.on(clientMock, 'db', () => dbMock);
        chai.spy.on(clientMock, 'close');
        chai.spy.on(btsCollectionMock, 'insertMany');

        await insertBtses(bts);

        expect(btsCollectionMock.insertMany).to.have.been.called;
        expect(clientMock.close).to.have.been.called;
    });
});
