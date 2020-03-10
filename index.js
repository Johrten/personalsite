document.addEventListener("DOMContentLoaded", () => {
	 console.log("Hey, funny seeing you here.")
 }
)

const contact = document.querySelector("[data-id='contact']")
const contactForm = document.querySelector(".form")
const formResponse = document.querySelector('.js-form-response')

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = {};
  const formElements = Array.from(e.target);
  formElements.map(input => (data[input.name] = input.value));

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
