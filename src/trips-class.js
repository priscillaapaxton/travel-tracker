class TripsClass {
  constructor(tripsData, destinationsData) {
    this.tri = tripsData
    this.des = destinationsData
  }

  buildNewTrip = (userID, destinationID, travelers, date, duration) => {
    return {
      id: this.tri.trips.length += 1, 
      userID: userID,
      destinationID: destinationID,
      travelers: travelers,
      date: date, 
      duration: dur,
      status: 'pending',
      suggestedActivities: [],
    }
  }

  getUserTrips = (userID) => {
    return this.tri.trips
      .filter((trip) => {
      return trip.userID === userID && trip.status === 'approved'
    })
  }
  getUserFutureTrips = (userID) => {
    return this.tri.trips
      .filter((trip) => {
      return trip.userID === userID && trip.status === 'pending'
    })
  }
  getUserDestinations = (userID) => {
    return this.getUserTrips(userID).map((trip) => {
      return this.des.destinations.find((destination) => {
        return destination.id === trip.destinationID
      })
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