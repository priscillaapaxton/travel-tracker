// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// Fetch Requests

// Local Data
import TripsClass from './trips-class';
import { getData } from './apiCalls';
import { postData } from './apiCalls';


function getRandomInt() {
  return Math.floor(Math.random() * 49 + 1);
};
const randomNum = getRandomInt();

window.addEventListener('load', () => {
  getData('travelers').then((data) => {
    const welcomeUser = document.querySelector('.user-welcome')
    welcomeUser.innerText = `Welcome ${data.travelers[randomNum].name}!`
  })
  .catch((error) => {
    console.log('user data error', error)
  })

  getData('trips').then((tripsData) => {
    getData('destinations').then((destinationsData) => {
      const currentTrips = new TripsClass(tripsData, destinationsData)
      const totalSpent = document.querySelector('.user-history')
      const pastTrips = document.querySelector('.past-trips-display')
      totalSpent.innerText = `You've spent $${currentTrips.getUserSpent(randomNum)} on trips this year. You sure love to travel!`
      currentTrips.getUserDestinations(randomNum).forEach((trip) => {
        pastTrips.innerHTML += `
        <div class="past-destination-container">
        <img class="past-destination" src="${trip.image}">
        ${trip.destination}
        </div>
        `
    })
  })
})
})

// console.log('This is the JavaScript entry file - your code begins here.');
