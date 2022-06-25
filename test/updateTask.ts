import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, after } from 'mocha';

import { Task } from '../models';

chai.use(chaiHttp);

const url = 'http://localhost:8080';

let idMongoTask = '';

describe('Actualizando una tarea especifica: PUT /api/task/:id', () => {

    before( ( done ) => {

        const taskToBeUpdated = new Task({
            "descripcion": "Test Description PUT /api/task/:id",
            "fechaCreacion": "2022-06-25 13:45",
            "vigente": true
        });
        taskToBeUpdated.save((err, task) => {
            if (err) console.log(err);
            idMongoTask = task._id.toString();
            // console.log(task);
            done();
        });
    });

    after( (done) => {

        Task.deleteMany({}, (err) => {
            if (err) console.log(err);
            done();
        });
    });

    it('Debe retornar un codigo de estado 200, y retornar la tarea actualizada.', ( done ) => {
        
        chai.request( url )
            .put( `/api/task/${idMongoTask}` )
            .send({
                "descripcion": "Test Description PUT /api/task/:id -- Updated",
                "fechaCreacion": "2022-06-25 16:00",
                "vigente": false
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('ok').to.be.eql(true);
                expect(res.body).to.have.property('task').to.be.a('object');
                expect(res.body.task).to.have.property('descripcion').to.be.eql('Test Description PUT /api/task/:id -- Updated');
                expect(res.body.task).to.have.property('fechaCreacion').to.be.eql('2022-06-25T20:00:00.000Z');
                expect(res.body.task).to.have.property('vigente').to.be.eql(false);
                expect(res.body.task).to.have.property('objectId').to.be.eql(idMongoTask);
                done();
            });
    });

    it('Debe retornar un codigo de estado 400, indicando el error', ( done ) => {
        
        chai.request( url )
            .put( `/api/task/${idMongoTask+'1'}` )
            .send({
                "descripcion": "Test Description PUT /api/task/:id -- Updated",
                "fechaCreacion": "2022-06-25 16:00"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('ok').to.be.eql(false);
                expect(res.body).to.have.property('message').to.be.a('string');
                done();
            });
    });

});