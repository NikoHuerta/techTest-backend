import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, after } from 'mocha';

import { Task } from '../models';

chai.use(chaiHttp);

const url = 'http://localhost:8080';

let idMongoTask = '';

describe('Borrando una tarea especifica: DELETE /api/task/:id', () => {

    before( ( done ) => {

        const taskToBeDeleted = new Task({
            "descripcion": "Test Description DELETE /api/task/:id",
            "fechaCreacion": "2022-06-25 13:45",
            "vigente": true
        });
        taskToBeDeleted.save((err, task) => {
            if (err) console.log(err);
            idMongoTask = task._id.toString();
            done();
        });
    });

    after( (done) => {

        Task.deleteMany({}, (err) => {
            if (err) console.log(err);
            done();
        });
    });

    it('Debe retornar un codigo de estado 200, y retornar la tarea borrada.', ( done ) => {
        
        chai.request( url )
            .delete( `/api/task/${idMongoTask}` )
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('ok').to.be.eql(true);
                expect(res.body).to.have.property('message').to.be.eql('Task eliminada');
                expect(res.body).to.have.property('task').to.be.a('object');
                expect(res.body.task).to.have.property('descripcion').to.be.eql('Test Description DELETE /api/task/:id');
                expect(res.body.task).to.have.property('objectId').to.be.eql(idMongoTask);
                done();
            });
    });

    it('Debe retornar un codigo de estado 400, indicando el error', ( done ) => {
        
        chai.request( url )
            .get( `/api/task/${idMongoTask+'1'}` )
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('ok').to.be.eql(false);
                expect(res.body).to.have.property('message').to.be.a('string');
                done();
            });
    });
});