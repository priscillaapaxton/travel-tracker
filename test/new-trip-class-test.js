import chai from 'chai';
const assert = chai.assert;
import NewTripClass from '../src/new-trip-class';
import allTrips from '../src/trips-mock-data';
import allDestinations from '../src/destinations-mock-data';
describe('new trip class', () => {

  let newTripClass

  beforeEach(() => {

    newTripClass = new NewTripClass(allTrips, allDestinations)

  })
  it('should return the past trips of a given user', () => {
    assert.deepEqual(newTripClass.getUserPastTrips(1), [allTrips.trips[0], allTrips.trips[3]])
    assert.deepEqual(newTripClass.getUserPastTrips(420), [])
  })
  it('should return the past destinations of a given user', () => {
    assert.deepEqual(newTripClass.getUserPastDestinations(1), [allDestinations.destinations[3], allDestinations.destinations[13]])
  })
  it('should return the upcoming trips of a given user', () => {
    assert.deepEqual(newTripClass.getUserUpcomingTrips(1), [allTrips.trips[20]])
    assert.deepEqual(newTripClass.getUserUpcomingTrips(420), [])
  })
  it('should return how much a given user has spent on past trips', () => {
    assert.equal(newTripClass.getUserSpent(1), 3553)
    assert.equal(newTripClass.getUserSpent(420), 0)
  })
  it('should return a new trip object', () => {
    assert.deepEqual(newTripClass.makeNewTripObject(1, 14, 5, '2023/07/16', 12), 
    {
      id: allTrips.trips.length + 1,
      userID: 1,
      destinationID: 14,
      travelers: 5,
      date: '2023/07/16', 
      duration: 12,
      status: 'pending',
      suggestedActivies: []
    })
  })
})