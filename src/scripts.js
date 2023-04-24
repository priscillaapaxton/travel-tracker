// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// Fetch Requests
import { getData } from './apiCalls';
import { postData } from './apiCalls';

// Local Data
// import TripsClass from './trips-class';
import NewTripClass from './new-trip-class';
import DestinationsClass from './destinations-class';

//functions
function getRandomInt() {
  return Math.floor(Math.random() * 49 + 1);
};

//Query Selectors & variables
const welcomeUser = document.querySelector('.user-welcome')
const randomNum = getRandomInt();
const totalSpent = document.querySelector('.user-history')
const pastTrips = document.querySelector('.past-trips-display')
const upcomingTrips = document.querySelector('.upcoming-trips-display')
const newTripPreview = document.querySelector('.new-trip-preview')
const destinationOpions = document.querySelector('#destination')
const startDateInput = document.querySelector('.start-date-input')
const durationInput = document.querySelector('.duration-input')
const travelersInput = document.querySelector('.travelers-input')
const destinationInput = document.querySelector('.destination-input')
const addDataButton = document.querySelector('.add-data-button')



const getDataForPage = () => {
  getData('trips').then((tripsData) => {
    getData('destinations').then((destinationsData) => {
      const tripsClass = new NewTripClass(tripsData, destinationsData)
      const destinationsClass = new DestinationsClass(destinationsData)
      displayPage(tripsClass,destinationsClass)
      // upcomingTrips.innerHTML = ''
      startDateInput.value = ''
      durationInput.value = ''
      travelersInput.value = ''
      // destinationInput.innerHTML = ''
    })
  })
}

const displayPage = (tripsClass, destinationsClass) => {
  //display total spent

  totalSpent.innerText = `You've spent $${tripsClass.getUserSpent(randomNum)} on trips this year. You sure love to travel!`

  //display past trips
  tripsClass.getUserPastDestinations(randomNum).forEach((trip) => {
    pastTrips.innerHTML +=
      `
    <div class="past-destination-container">
    <img class="past-destination" src="${trip.image}">
    ${trip.destination}
    </div>
    `
  //display trip options
  tripsClass.des.des.destinations.forEach((destination) => {
    destinationOpions.innerHTML += `<option value="${destination.id}">${destination.destination}, $${destination.estimatedLodgingCostPerDay}</option>`
  })

  //display trip calculation
  
  const displayCalculation = (event) => {
    if(startDateInput.value && durationInput.value && travelersInput.value && destinationInput.value) {
      newTripPreview.innerHTML = `
      <h1 class="user-trip-price">Estimated Trip Cost</h1>
      <p>${durationInput.value} days in ${destinationInput.value} with ${travelersInput.value} people will cost ${destinationsClass.getTripPricePerDay(parseInt(destinationInput.value), parseInt(travelersInput.value), parseInt(durationInput.value))}</p>
      `
    }
  }
  startDateInput.addEventListener('input', displayCalculation)
  durationInput.addEventListener('input', displayCalculation)
  travelersInput.addEventListener('input', displayCalculation)
  destinationInput.addEventListener('input', displayCalculation)
})
  //display upcoming trips
  tripsClass.getUserUpcomingDestinations(randomNum).forEach((trip) => {

    upcomingTrips.innerHTML +=
      `
    <div class="past-destination-container">
    <img class="past-destination" src="${trip.image}">
    ${trip.destination}
    </div>
    `
  })
  //add new trips
  addDataButton.addEventListener('click', (event) => {
    event.preventDefault()
    if(startDateInput.value && durationInput.value && travelersInput.value && destinationInput.value) {
      const dataToSend = tripsClass.makeNewTripObject(randomNum, parseInt(destinationInput.value), parseInt(travelersInput.value), startDateInput.value.replace(/-/g, '/'), parseInt(durationInput.value))
      
      postData('trips', dataToSend).then((updatedTripsData) => {
        console.log('line103', updatedTripsData)
        upcomingTrips.innerHTML = ''
        pastTrips.innerHTML = ''
        getDataForPage()
    })
    }
  })
}

window.addEventListener('load', () => {
  //welcome user//
  getData(`travelers/${randomNum}`)
    .then((data) => {
      welcomeUser.innerText = `Welcome ${data.name}!`
    })
    .catch((error) => {
      console.log('user data error', error)
    })
    getDataForPage()
  })



