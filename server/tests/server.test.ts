import app from '../src/server';
import * as importData from "../src/dataImporter";
import * as fs from "fs";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import spies from "chai-spies";
chai.use(spies);
chai.use(chaiHttp);

describe('Server', () => {

    afterEach(() => {
        chai.spy.restore();
    });

    describe('GET /', () => {
        it('should handle GET', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.eq('Running!');
                    done();
                });
        });
    });
    describe('POST /upload', () => {
        it('should display 400 when no file provided', (done) => {
            chai.request(app)
                .post('/upload')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should start data import when file attached', (done) => {
            chai.spy.on(importData, 'default', () => Promise.resolve());

            chai.request(app)
                .post('/upload')
                .attach('file', fs.readFileSync(__dirname + '/data/sample_data_test.xlsx'))
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should rethrow error when error during import', (done) => {
            chai.spy.on(importData, 'default', () => Promise.reject(new Error('Upsi!')));

            chai.request(app)
                .post('/upload')
                .attach('file', fs.readFileSync(__dirname + '/data/sample_data_test.xlsx'))
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });
});