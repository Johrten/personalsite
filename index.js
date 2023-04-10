const contactForm = document.querySelector("form");
const submit = document.getElementsByClassName("submit-btn")[0];

var grecaptcha;
contactForm.addEventListener("click", function () {
    var recaptchaPlaceholder = document.getElementById("recaptcha-placeholder");
    recaptchaPlaceholder.style.display = "none";
    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    document.getElementsByTagName("head")[0].appendChild(script);
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formResponse = document.querySelector('.js-form-response');
    console.log(e.target);
    if (grecaptcha && grecaptcha.getResponse() != "") {
        var target_1 = e.target;
        var data_1 = {};
        var formElements = Array(target_1);
        formElements.map(function (input) { return (data_1[input.name] = input.value); });
        fetch("https://xjnx46gjd9.execute-api.us-east-1.amazonaws.com/prod/contact-johrten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data_1)
        }).then(function (r) {
            if (!r.ok) {
                throw Error(r.statusText);
            }
            formResponse.style.display = 'block';
            formResponse.innerText = "Thanks for the message. I\u2019ll be in touch shortly!";
            target_1.reset();
            history.pushState("id", "johrten", 'https://www.johrten.com/');
        })["catch"](function (error) {
            formResponse.style.display = 'block';
            formResponse.innerText = 'Something went wrong';
        });
    }
    else {
        formResponse.style.display = 'block';
        formResponse.style.color = 'red';
        formResponse.innerText = "Please check \"I'm not a robot\" before submitting";
    }
});

document.addEventListener('click', function (e) {
    const target = e.target;
    const navbar = document.getElementsByClassName("navbar")[0];
    if (contactForm === target || contactForm.contains(target) || navbar === target || navbar.contains(target))
        return;
    const dotArea = document.getElementsByClassName("dot-wrapper")[0];
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (e.pageX) + "px";
    dot.style.top = (e.pageY) + "px";
    dot.style.position = 'absolute';
    dotArea.appendChild(dot);
    setTimeout(function () {
        dot.classList.add('pretty');
    }, 25);
    setTimeout(function () {
        dot.classList.add('pretty-fade');
    }, 750);
});

document.getElementsByClassName("hamburger")[0].addEventListener('click', e => {
  document.getElementsByClassName("hamburger")[0].classList.toggle('hamburger-active');
  document.getElementsByClassName("mobile-menu-popup")[0].classList.toggle('mobile-menu-popup-active');
});

submit.addEventListener('mouseover', e => {
  // submit.classList.add('ripple');
  // dot.style.left = (e.pageX) + "px";
  // dot.style.top = (e.pageY) + "px";
});

document.addEventListener("DOMContentLoaded", () => {
  const jobTitles = document.querySelectorAll(".job-title");

  jobTitles.forEach((jobTitle) => {
    jobTitle.addEventListener("click", (event) => {
      const jobDetails = event.target.nextElementSibling;
      jobDetails.style.display = jobDetails.style.display === "block" ? "none" : "block";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    category.addEventListener("click", (event) => {
      const categoryID = event.currentTarget.dataset.category;
      const skillList = document.querySelector(`#${categoryID}`);

      skillCategories.forEach((cat) => {
        if (cat !== event.currentTarget) {
          const otherCategoryID = cat.dataset.category;
          const otherSkillList = document.querySelector(`#${otherCategoryID}`);
          otherSkillList.classList.add("hidden");
        }
      });

      skillList.classList.toggle("hidden");
    });
  });
});