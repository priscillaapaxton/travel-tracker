import DestinationsClass from "./destinations-class"

class NewTripClass {
  constructor(tripsData, destinationsData) {
    this.tri = tripsData
    this.des = new DestinationsClass(destinationsData) 
  }
  getUserPastTrips = (userID) => {
    return this.tri.trips.filter((trip) => {
      return trip.userID === userID && trip.status === 'approved'
    })
  }
  getUserPastDestinations = (userID) => {
    return this.getUserPastTrips(userID).map((trip) => {
      return this.des.des.destinations.find((destination) => {
        return destination.id === trip.destinationID
      })
    })
  }
  getUserUpcomingTrips = (userID) => {
    return this.tri.trips.filter((trip) => {
      return trip.userID === userID && trip.status === 'pending'
    })
  }
  getUserUpcomingDestinations = (userID) => {
    return this.getUserUpcomingTrips(userID).map((trip) => {
      return this.des.des.destinations.find((destination) => {
        return destination.id === trip.destinationID
      })
    })
  }
  getUserSpent = (userID) => {
    const userTrips = this.getUserPastTrips(userID).map((trip) => {
      return this.des.getTripPricePerDay(trip.destinationID, trip.travelers, trip.duration)
    })
    return userTrips.reduce((acc, currentTrip) => {
      acc += currentTrip
      return acc
    }, 0)
  }
  makeNewTripObject = (userID, destinationID, travelers, date, duration) => {
    return {
      id: this.tri.trips.length + 1,
      userID: userID,
      destinationID: destinationID,
      travelers: travelers,
      date: date, 
      duration: duration,
      status: 'pending',
      suggestedActivities: []
    }
  } 
}

export default NewTripClass;