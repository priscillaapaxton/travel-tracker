import chai from 'chai';
const assert = chai.assert;
import DestinationsClass from '../src/destinations-class';
import destinations from '../src/destinations-mock-data';

describe('destinations class', () => {

  let destinationsClass

  beforeEach(() => {
    destinationsClass = new DestinationsClass(destinations)
  })
  it('should return the price of a trip per day', () => {
    assert.equal(destinationsClass.getTripPricePerDay(30, 1, 8), 1936)
  })
})