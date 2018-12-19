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

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));


    // Log what our lambda function will receive
		console.log(data)
		console.log(JSON.stringify(data));
		// debugger

	fetch("{AWS CODE HERE}",{
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
			history.pushState(id, johrten, 'http://localhost:8080/')
			// window.location.href = "http://localhost:8080"
		} else {
			formResponse.innerHTML = 'Something went wrong';
        console.error(JSON.parse(r.response).message)
		}
	})
  };
})()
