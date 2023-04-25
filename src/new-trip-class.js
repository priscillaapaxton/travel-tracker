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
  getUserUpcomingDestinations = (userID) => {
    return this.tri.trips
    .filter((trip) => {
      return trip.userID === userID && trip.status === 'pending'
    })
    .map((trip) => {
      return this.des.des.destinations.find((destination) => {
        return destination.id === trip.destinationID
      })
    })
  }
  getUserSpent = (userID) => {
    return this.getUserPastTrips(userID)
    .map((trip) => {
      return this.des.getTripPricePerDay(trip.destinationID, trip.travelers, trip.duration)
    })
    .reduce((acc, currentTrip) => {
      acc += currentTrip
      return Math.round(acc)
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


