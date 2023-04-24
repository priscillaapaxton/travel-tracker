export function getData(destination) {
  return fetch(`http://localhost:3001/api/v1/${destination}`)
  .then((response) => {
    if(!response.ok) {
    throw new Error(`${response.status}`)
    } else {
    return response.json()
    }
  })
};

export function postData(destination, dataToSend) {
  return fetch(`http://localhost:3001/api/v1/${destination}`, {
    method: 'POST', 
    body: JSON.stringify(dataToSend),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(response)
    if(!response.ok) {
    throw new Error(`${response.status}`)
    } else {
    return response.json()
    }
  })
}