import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, after } from 'mocha';

import { Task } from '../models';

chai.use(chaiHttp);

const url = 'http://localhost:8080';

describe('Obteniendo una lista de tareas: GET /api/task', () => {

    before( ( done ) => {
        Task.insertMany([
                {
                    "descripcion": "Test Description",
                    "fechaCreacion": "2022-06-25 13:45",
                    "vigente": true
                },
                {
                    "descripcion": "Test Description 2",
                    "fechaCreacion": "2022-06-25 13:45",
                    "vigente": true
                }
            ], (err, docs) => {
                if (err) console.log(err);
                done();
            });
    });

    after( (done) => {

        Task.deleteMany({}, (err) => {
            if (err) console.log(err);
            done();
        });
    });

    it('Debe retornar un codigo de estado 200, y retornar una lista de tareas.', ( done ) => {

        chai.request( url )
            .get( '/api/task' )
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('ok').to.be.eql(true);
                expect(res.body).to.have.property('tasks').to.be.a('array');
                expect(res.body.tasks[0]).to.have.property('objectId').to.be.a('string');
                expect(res.body.tasks[0]).to.have.property('descripcion').to.be.eql('Test Description');
                expect(res.body.tasks[1]).to.have.property('objectId').to.be.a('string');
                expect(res.body.tasks[1]).to.have.property('descripcion').to.be.eql('Test Description 2');
                done();
            });
    });
});