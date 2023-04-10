// Hello ES6

// Differences between var and let

// var gets hoisted: moved to the top but only declared, not assigned
console.log(num)
var num = 23

// let is not hoisted
// console.log(str) // => Reference Error
let str = "23"

// var can be redeclared, let cannot be redeclared
var user = "marco"
var user = "matias"


// Scoping of var and let

// var is function scoped
function run() {
	var output = "42"
}
// console.log(output) //  => Reference Error

if (true) {
	// var is not scoped to this block
	var output = "42"
}
console.log(output)

// let is block scoped
function run2() {
	let output2 = "42"
}
// console.log(output2) //  => Reference Error

if (true) {
	let output2 = "42"
}
// console.log(output2) // => Reference Error


// Ternary operator
// Shorthand for if else statement
// <condition> ? <if true> : <if false>

const password = "123"

// let user
// if (password === "123") {
// 	user = "authenticated"
// } else {
// 	user = "unauthenticated"
// }

const access = password === "123" ? "authenticated" : "unauthenticated"

// You can also chain the ternary operator
const role = "customer"

const message = role === "admin" ? "logged in as admin" 
: role === "customer" ? "logged in as customer" 
: "logged in as guest"


// Object shorthand

const username = "Ben"
// const obj = { username: username }
// Shorter:
const obj = { username }
// You can also use that to log key and value together:
console.log({ username })


// Optional chaining

const animals = {
	dog: {
	  name: "Rufus"
	},
	cat: {
		name: "Elvis"
	}
}
// We only access the key if it exists
console.log(animals.dog?.name)
console.log(animals.bird?.name)


// --------------------------------------------------------

// Promises

// Callback functions
// A callback function is a function that is passed as an argument to another function and then invoked later

function func1(callback) {
	console.log("Hello")

	callback()
}

function func2() {
	console.log("Bye")
}

func1(func2)


// Problem: Too many callbacks => callback hell

const directions = [
  "Starting point: Ironhack Paris",
  "← Head northwest on Bd Voltaire toward Rue Léon Frot",
  "← Turn left onto Rue Chanzy",
  "* Café Titon, 34 Rue Titon, 75011 Paris, France"
];

// If we get the directions without using a callback, they will be printed in a random order
function getDirectionsWithoutCallback(step) {
  const randomTimeout = Math.floor(Math.random() * 3000 + 1000)

  setTimeout(() => {
    console.log(directions[step])
  }, randomTimeout)
}

getDirectionsWithoutCallback(0)
getDirectionsWithoutCallback(1)
getDirectionsWithoutCallback(2)
getDirectionsWithoutCallback(3)

 
function getDirections(step, callback, errorCallback) {
  setTimeout(() => {
    console.log( directions[step] )
    
    if (!directions[step]) errorCallback("Instructions not found.")
    else callback()
  }, 2000)
}
 
getDirections(0, () => {
  getDirections(1, () => {
    getDirections(2, () => {
      getDirections(3, () => {
        
        console.log("You arrived at the café!")
        // getDirections(4, () => {}, (err) => console.log(err) ) ;
      }, (err) => console.log(err))
    }, (err) => console.log(err))
  }, (err) => console.log(err))
}, (err) => console.log(err))


// To avoid callback hell, we can use Promises
// Promise: A JavaScript object that represents the eventual completion or failure of an asynchronous operation

function obtainDirections(step) {
  return new Promise (function (resolve, reject) {
    setTimeout(() => {
      console.log( directions[step] )
 
      if (!directions[step]) reject("Instructions not found.")
      else resolve()
    }, 2000)
  })
}

obtainDirections(0)
	.then(() => obtainDirections(1) )
	.then(() => obtainDirections(2) )
	.then(() => obtainDirections(3) )
	.then(() => console.log("You arrived at the café!") )
	.catch((err) => console.log(err))
	.finally(() => console.log("Final log") )


// If we want to call multiple async functions and wait until all of them are resolved we can use Promise.all()
// The result will be an array with the resolved values from all async function calls

Promise.all([
	obtainDirections(0),
	obtainDirections(1),
	obtainDirections(2),
	obtainDirections(3)
])
	.then(values => console.log("values: ", values))


// Async / await
// Async / await allows you to write asynchronous code as if it was synchronous

async function getCoffee() {
  await obtainDirections(0)
  await obtainDirections(1)
  await obtainDirections(2)
  await obtainDirections(3)
  console.log("You arrived at the café!")
}

getCoffee()


// Rejected Promises and Errors are handled by the try ... catch block

async function getCoffee() {
  try {
    await obtainDirections(0)
    await obtainDirections(1)
    await obtainDirections(2)
    await obtainDirections(3)
		// await obtainDirections(4) // This will result in a rejected Promise
    
    console.log("You arrived at the café!")
  } catch(err) {
    console.log(err)
  } 
}
 
getCoffee()

// -------------------------------------------------

// Fetch API

// Using Promises

fetch("https://api.spacexdata.com/v4/launches")
  .then((response) => response.json())
  .then((data) => {
 
  data.forEach((launchObj) => {
    const patchImage = launchObj.links.patch.small
    const imgElement = document.createElement("img")
 
    imgElement.setAttribute("src", patchImage)
    imgElement.setAttribute("width", 200)
    document.body.appendChild(imgElement)
  })
 
}).catch((err) => console.log(err))


// Using async / await

async function displayMissionPatches(limit = 0) {
 
  try {
    const response = await fetch("https://api.spacexdata.com/v4/launches")
    const jsonResponse = await response.json()
 
    console.log(jsonResponse)
    const launchesToDisplay = jsonResponse.slice(0, limit)
    
    launchesToDisplay.forEach((launchObj) => {
      const patchImage = launchObj.links.patch.small
      const imgElement = document.createElement("img")
 
      imgElement.setAttribute("src", patchImage)
      imgElement.setAttribute("width", 200)
      document.body.appendChild(imgElement)
    })
    
  } catch (error) {
    // Handle error or a rejected Promise
    console.log("Something went wrong!", error)
  }
}
 
displayMissionPatches(10)
