class TripsClass {
  constructor(tripsData, destinationsData) {
    this.tri = tripsData
    this.des = destinationsData
  }

  getUserTrips = (userID) => {
    return this.tri.trips.filter((trip) => {
      return trip.userID === userID
    })
  }
  getUserSpent = (userID) => {
    const userAmountSpent = this.getUserTrips(userID).map((trip) => {
      const specificDestination = this.des.destinations.find((destination) => {
        return destination.id === trip.destinationID
       })
      return specificDestination.estimatedLodgingCostPerDay * trip.duration + specificDestination.estimatedFlightCostPerPerson * trip.travelers
 
    })
    if(userAmountSpent.length > 0){
      let beforeTax = userAmountSpent.reduce((acc, amount) => acc += amount)
      return beforeTax + beforeTax * .1
    } else {
      return userAmountSpent
    }
   }
}

export default TripsClass;