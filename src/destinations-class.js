class DestinationsClass {
  constructor(destinationsData) {
    this.des = destinationsData
  }
  getTripPricePerDay(destinationID, travelers, duration) {
    let tripBeforeTax = this.des.destinations.find((destination) => {
      return destination.id === destinationID
    })
    tripBeforeTax = tripBeforeTax.estimatedFlightCostPerPerson * travelers + tripBeforeTax.estimatedLodgingCostPerDay * duration 
    return Math.round(tripBeforeTax + tripBeforeTax * .10)
  }
}

export default DestinationsClass;