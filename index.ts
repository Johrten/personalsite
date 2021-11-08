const contactForm = document.querySelector("form");
let grecaptcha: any;

contactForm.addEventListener("click", () => {
  const recaptchaPlaceholder = document.getElementsByTagName("img")[0];
  recaptchaPlaceholder.style.display="none";
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://www.google.com/recaptcha/api.js";
  document.getElementsByTagName("head")[0].appendChild(script);
})

contactForm.addEventListener("submit", (e: Event) => {
  alert('hi')
  e.preventDefault();
  const formResponse: HTMLElement = document.querySelector('.js-form-response');
  console.log(e.target)
	if (grecaptcha && grecaptcha.getResponse() != "") {
    const target = <HTMLFormElement> e.target;
		const data = {};
	  const formElements = Array(target);
	  formElements.map((input) => (data[input.name] = input.value));

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
				target.reset();
				history.pushState("id", "johrten", 'https://www.johrten.com/')
			} else {
				formResponse.style.display = 'block'
				formResponse.innerText = 'Something went wrong'
			}
		})
	} else {
    formResponse.style.display = 'block'
    formResponse.style.color = 'red'
		formResponse.innerText = `Please check "I'm not a robot" before submitting`
	}
})

document.addEventListener('click', (e: MouseEvent) => {
  const target = <HTMLFormElement> e.target;
  if (contactForm === target || contactForm.contains(target)) return;
  const dotArea = document.getElementsByClassName("dot-wrapper")[0];
  let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (e.pageX) + "px";
    dot.style.top = (e.pageY) + "px";
    dot.style.position = 'absolute';
    dotArea.appendChild(dot);
    setTimeout(()=>{
      dot.classList.add('pretty');
    }, 25);
    setTimeout(()=>{
      dot.classList.add('pretty-fade');
    }, 750);
})

