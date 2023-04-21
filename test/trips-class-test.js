import chai from 'chai';
const assert = chai.assert;
import TripsClass from '../src/trips-class';
import trips from '../src/trips-mock-data';
import destinations from '../src/destinations-mock-data';

describe('trips class', () => {
  
  let tripsClass 

  beforeEach(() => {

    tripsClass = new TripsClass(trips, destinations)

  })
  it('should return only the trips of a given user', () => {
    assert.deepEqual(tripsClass.getUserTrips(19), [trips.trips[13], trips.trips[15]])
    assert.deepEqual(tripsClass.getUserTrips(100), [])
  })

  it('should return a travelers amount spent plus 10% agent fee', () => {
    assert.equal(tripsClass.getUserSpent(19), 4262.5)
    assert.deepEqual(tripsClass.getUserSpent(100), [])
  })
})