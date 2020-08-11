const {server, app} = require('../../server');
const request = require('supertest');
const {ROUTES} = require('../../src/constants.js');

describe("APIs", ()=>{
    test("App is online" ,async()=>{
        await request(app)
            .get(ROUTES.HEALTH)
            
            .expect(200);

    })
    afterAll(()=>{
        server.close();
    })
})