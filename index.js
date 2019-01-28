document.addEventListener("DOMContentLoaded", () => {
	 console.log("Hey")
 }
)

let scrollImg = document.getElementsByClassName("scroll-image")

for (let i = 0; i < scrollImg.length; i++) {
  scrollImg[i].addEventListener('click', (elementId) => {
    let element = document.getElementById(elementId.currentTarget.dataset.id)
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  })
}

(() => {
  const form = document.querySelector('form');
  const formResponse = document.querySelector('#js-form-response');

  form.onsubmit = e => {
    e.preventDefault();

    const data = {};
    const formElements = Array.from(form);
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
			formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly!'
			e.target.reset()
			history.pushState("id", "johrten", 'https://www.johrten.com/')
			// window.location.href = "http://localhost:8080"
		} else {
			formResponse.innerHTML = 'Something went wrong';
        console.error(r.statusText)
		}
	})
  };
})()
