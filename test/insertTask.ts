import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, after } from 'mocha';

import { Task } from '../models';

chai.use(chaiHttp);

const url = 'http://localhost:8080';

describe('Insertando una tarea: POST /api/task', () => {

    after( (done) => {
        Task.deleteMany({}, (err) => {
            if (err) console.log(err);
            done();
        });
    });

    it('Debe retornar un codigo de estado 201, y retornar el registro creado.', ( done ) => {

        chai.request( url )
            .post( '/api/task' )
            .send({
                "descripcion": "Test Description",
                "fechaCreacion": "2022-06-24 13:45",
                "vigente": true
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('ok').to.be.eql(true);
                expect(res.body).to.have.property('task').to.be.a('object');
                expect(res.body.task).to.have.property('objectId').to.be.a('string');
                expect(res.body.task).to.have.property('descripcion').to.be.eql('Test Description');
                done();
            });
    });

    it('Debe retornar una response con codigo de estado 400 , indicando el error.', ( done ) => {

        chai.request( url )
            .post( '/api/task' )
            .send({
                "descripcion": "Test Description",
                "fechaCreacion": "2022-06-24 13:45"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('ok').to.be.eql(false);
                expect(res.body).to.have.property('message').to.be.a('string');
                done();
            });
    });

});