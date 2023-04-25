import './css/styles.css';

// Fetch Requests
import { getData } from './apiCalls';
import { postData } from './apiCalls';

// Local Data
import NewTripClass from './new-trip-class';
import DestinationsClass from './destinations-class';


//Query Selectors & variables
const welcomeUser = document.querySelector('.user-welcome')
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
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const loginButton = document.querySelector('.login-button')
const incorrectLogin = document.querySelector('.incorrect-login')
const loginHide = document.getElementById('beforeLogin')
const navHidden = document.querySelector('.logout')
const leftContainterHidden = document.querySelector('.left-container')
const rightContainerHidden = document.querySelector('.right-container')
let userLoginID
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const getDataForPage = () => {
  getData('trips').then((tripsData) => {
    getData('destinations').then((destinationsData) => {
      const tripsClass = new NewTripClass(tripsData, destinationsData)
      const destinationsClass = new DestinationsClass(destinationsData)

      displayPage(tripsClass,destinationsClass)
      startDateInput.value = ''
      durationInput.value = ''
      travelersInput.value = ''
      newTripPreview.innerHTML = ''
    })
    .catch((error) => {
      totalSpent.innerHTML = `
      Network unavailable. Sorry!
      `
      pastTrips.innerHTML = `
      Network unavailable. Sorry!
      `
    })
  .catch((error) => {
    totalSpent.innerHTML = `
    Network unavailable. Sorry!
    `
    pastTrips.innerHTML = `
    Network unavailable. Sorry!
    `
  })
  })
}

const displayPage = (tripsClass, destinationsClass) => {

  totalSpent.innerText = `You've spent ${USDollar.format(tripsClass.getUserSpent(userLoginID)).slice(0, -3)} on trips this year. You sure love to travel!`

  tripsClass.getUserPastDestinations(userLoginID).forEach((trip) => {
    pastTrips.innerHTML +=
      `
    <div class="past-destination-container">
    <img class="past-destination" src="${trip.image}" alt="${trip.alt}">
    ${trip.destination}
    </div>
    `

  tripsClass.des.des.destinations.forEach((destination) => {
    destinationOpions.innerHTML += `<option value="${destination.id}">${destination.destination}, $${destination.estimatedLodgingCostPerDay}</option>`
  })

  const displayCalculation = (event) => {
    if(startDateInput.value && durationInput.value && travelersInput.value && destinationInput.value) {
      const location = destinationsClass.des.destinations[destinationInput.value - 1].destination
      newTripPreview.innerHTML = `
      <h1 class="user-trip-price">Estimated Trip Cost</h1>
      <p>${durationInput.value} days in ${location} with ${travelersInput.value} people will cost ${destinationsClass.getTripPricePerDay(parseInt(destinationInput.value), parseInt(travelersInput.value), parseInt(durationInput.value))}</p>
      `
    }
  }
  startDateInput.addEventListener('input', displayCalculation)
  durationInput.addEventListener('input', displayCalculation)
  travelersInput.addEventListener('input', displayCalculation)
  destinationInput.addEventListener('input', displayCalculation)
})

tripsClass.getUserUpcomingDestinations(userLoginID).forEach((trip) => {
  upcomingTrips.innerHTML +=
    `
  <div class="upcoming-destination-container">  
  <img class="upcoming-destination" src="${trip.image}" alt="${trip.alt}">
  ${trip.destination}
  </div>
  `
  })

addDataButton.addEventListener('click', (event) => {
  event.preventDefault()
  if(startDateInput.value && durationInput.value && travelersInput.value && destinationInput.value) {
    const dataToSend = tripsClass.makeNewTripObject(userLoginID, parseInt(destinationInput.value), parseInt(travelersInput.value), startDateInput.value.replace(/-/g, '/'), parseInt(durationInput.value))
    
    postData('trips', dataToSend).then((updatedTripsData) => {
      upcomingTrips.innerHTML = ''
      pastTrips.innerHTML = ''
      getDataForPage()
    })
    } else {
      newTripPreview.innerHTML = `
      <h1 class="user-input-error">All Fields Required!</h1>
      <p>please fill out all input fields</p>
      `
    }
})
}

window.addEventListener('load', () => {
  loginButton.addEventListener('click', (event) => {
    event.preventDefault()
    if(usernameInput.value.slice(6) >= 1 && usernameInput.value.slice(6) <= 50 && usernameInput.value.slice(0, 6) === 'travel' && passwordInput.value >= 1 && passwordInput.value <= 50 && usernameInput.value.slice(6) === passwordInput.value) {
      userLoginID = parseInt(usernameInput.value.slice(6))
      loginHide.classList.add('hidden')
      navHidden.classList.remove('hidden')
      leftContainterHidden.classList.remove('hidden')
      rightContainerHidden.classList.remove('hidden')
     
      getData(`travelers/${userLoginID}`)
      .then((data) => {
        welcomeUser.innerText = `Welcome ${data.name}!`
      })
      .catch((error) => {
        totalSpent.innerHTML = `
        Network unavailable. Sorry!
        `
        pastTrips.innerHTML = `
        Network unavailable. Sorry!
        `
      })
      getDataForPage()
    } else {
      incorrectLogin.innerHTML = `
      username and/or password do not match. please try again.
      `
      usernameInput.value = ''
      passwordInput.value = ''
    }
  })
})




