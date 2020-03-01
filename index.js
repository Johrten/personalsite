document.addEventListener("DOMContentLoaded", () => {
	 console.log("Hey")
 }
)

const home = document.querySelector("[data-id='home']")
const projects = document.querySelector("[data-id='projects']")
const skills = document.querySelector("[data-id='skills']")
const contact = document.querySelector("[data-id='contact']")

const contactForm = document.querySelector(".form")
const formResponse = document.querySelector('.js-form-response')
const modal = document.getElementById('myModal')
const widthMatch = window.matchMedia("(min-width: 1024px)")

let scrollImg = document.getElementsByClassName("scroll-image")
let section = document.getElementsByClassName("section-title")

const handleScroll = () => {
	let scrollRatio = document.documentElement.scrollTop / document.body.scrollHeight
	handleLargeMenu(scrollRatio)
}

if (widthMatch.matches) {
 document.querySelector("[data-id='home']").classList.add("red-brown")

 document.addEventListener("scroll", handleScroll)
}

widthMatch.addEventListener('change', mm => {
	document.querySelector("header").classList.remove("animated", "fadeIn")
	document.querySelector(".topics-home").classList.remove("animated", "delay-1s", "fadeIn")
	console.log("Change")
	if (mm.matches) {
		console.log("Match")
		document.querySelector("[data-id='home']").classList.add("red-brown")
	  document.addEventListener("scroll", handleScroll)
	} else {
		console.log("No match")
		document.removeEventListener("scroll", handleScroll)
		home.classList.remove("red-brown")
		projects.classList.remove("purple")
		skills.classList.remove("red-brown")
		contact.classList.remove("purple")
	}
})

const handleLargeMenu = ratio =>{
	if (ratio < .25) {
		home.classList.add("red-brown")
		projects.classList.remove("purple")
		skills.classList.remove("red-brown")
		contact.classList.remove("purple")
	} else if (ratio >= .25 && ratio <.5) {
		projects.classList.add("purple")
		home.classList.remove("red-brown")
		skills.classList.remove("red-brown")
		contact.classList.remove("purple")
	} else if (ratio >= .5 && ratio <.75) {
		skills.classList.add("red-brown")
		home.classList.remove("red-brown")
		projects.classList.remove("purple")
		contact.classList.remove("purple")
	} else if (ratio >= .75) {
		contact.classList.add("purple")
		home.classList.remove("red-brown")
		projects.classList.remove("purple")
		skills.classList.remove("red-brown")
	}
}

for (let i = 0; i < section.length; i++) {
  section[i].addEventListener('click', (elementId) => {
    let element = document.getElementById(elementId.currentTarget.dataset.id)
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  })
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = {};
  const formElements = Array.from(e.target);
  formElements.map(input => (data[input.name] = input.value));
	console.log(data)
	console.log(JSON.stringify(data));

	fetch(`https://8s1iqsio6k.execute-api.us-east-1.amazonaws.com/dev/contact-johrten`,{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(data)
	}).then(r => {
		if (r.status===200) {
			formResponse.style.display = 'block'
			e.target.reset()
			history.pushState("id", "johrten", 'https://www.johrten.com/')
			// window.location.href = "http://localhost:8080"
		} else {
			formResponse.innerHTML = 'Something went wrong';
	      console.error(r.statusText)
		}
	})
})
