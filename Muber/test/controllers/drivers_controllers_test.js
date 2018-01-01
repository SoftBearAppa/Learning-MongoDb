const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {

  it('Post to /api/driver creates a new driver', (done) => {
    Driver.count().then((count) => {
      request(app)
        .post('/api/driver')
        .send({ email: 'test@test.com'})
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers/id edits an existing driver', (done) => {
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save()
      .then(() => {
        request(app)
          .put(`/api/driver/${driver._id}`)
          .send({driving: true })
          .end(() => {
            Driver.findOne({ email: 't@t.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
          });
      });
  });

  it('DELETES to /api/driver/id can delete a driver', (done) => {
    const driver = new Driver({ email: 't@t.com' })

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/driver/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 't@t.com' })
              .then((driver) => {
                assert(driver === null)
                done();
              });
          });
      });
  });

  it('GET to /api/drivers finds drivers in location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628 ]}
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [ -80.2534507, 25.7915581 ]}
    });

    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'miami@test.com')
            done();
          });
      })
  });
});