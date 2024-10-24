import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server.js'; // Se till att den här vägen fortfarande stämmer beroende på var din serverfil ligger

chai.use(chaiHttp);
const should = chai.should();

describe('GET /', () => {
    it('ska hämta startsidan', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('Hello World!');
                done();
            });
    });
});
