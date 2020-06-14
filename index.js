document.addEventListener("DOMContentLoaded", () => {
	 console.log("Hey, funny seeing you here.");
 }
)

const contact = document.querySelector("[data-id='contact']");
const contactForm = document.querySelector(".form");
const formResponse = document.querySelector('.js-form-response');

contactForm.addEventListener("submit", e => {
  e.preventDefault();
	if (grecaptcha.getResponse() != "") {
		const data = {};
	  const formElements = Array.from(e.target);
	  formElements.map(input => (data[input.name] = input.value));

		fetch(`https://xjnx46gjd9.execute-api.us-east-1.amazonaws.com/prod/contact-johrten`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(data)
		}).then(r => {
			if (!r.ok) {
				throw Error(r.statusText)
			}
			return r;
		}).then(r => {
			if (r.status===200) {
				formResponse.style.display = 'block'
				formResponse.innerText = `Thanks for the message. I’ll be in touch shortly!`
				e.target.reset()
				history.pushState("id", "johrten", 'https://www.johrten.com/')
			} else {
				formResponse.style.display = 'block'
				formResponse.innerText = 'Something went wrong'
			}
		})
	} else {
		formResponse.style.display = 'block'
		formResponse.innerText = `Please check "I'm not a robot before submitting"`
	}
})
