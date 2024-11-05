// "use strict";

// // add event on multiple elements

// const addEventOnElements = function (elements, eventType, callback) {
//   for (let i = 0; i < elements.length; i++) {
//     elements[i].addEventListener(eventType, callback);
//   }
// };

// // navbar functionality

// const [navbar, navToggler, navbarLinks] = [
//   document.querySelector("[data-navbar]"),
//   document.querySelector("[data-nav-toggler]"),
//   document.querySelectorAll("[data-nav-link]"),
// ];

// const toggleNavbar = function () {
//   navbar.classList.toggle("active");
//   this.classList.toggle("active");
//   document.body.classList.toggle("active");
// };

// navToggler.addEventListener("click", toggleNavbar);

// const closeNavbar = function () {
//   navbar.classList.remove("active");
//   navToggler.classList.remove("active");
//   document.body.classList.remove("active");
// };

// addEventOnElements(navbarLinks, "click", closeNavbar);

// // header active

// const header = document.querySelector("[data-header]");

// const activeElemOnScroll = function () {
//   if (window.scrollY >= 20) {
//     header.classList.add("active");
//   } else {
//     header.classList.remove("active");
//   }
// };

// window.addEventListener("scroll", activeElemOnScroll);

// // scroll reveal effect

// const revealElements = document.querySelectorAll("[data-reveal]");

// const revealOnScroll = function () {
//   for (let i = 0; i < revealElements.length; i++) {
//     // add revealed class on element, when visible in window
//     if (
//       revealElements[i].getBoundingClientRect().top <
//       window.innerHeight / 1.1
//     ) {
//       revealElements[i].classList.add("revealed");

//       // remove long transition from button, after 1 second
//       if (revealElements[i].classList.contains("btn")) {
//         setTimeout(function () {
//           revealElements[i].style.transition = "0.25s ease";
//         }, 1000);
//       }
//     }
//   }
// };

// window.addEventListener("scroll", revealOnScroll);

// revealOnScroll();

// let currentIndex = 0;
// const slides = document.querySelectorAll(".slide");
// const totalSlides = slides.length;

// // Initialize all slides to invisible except the first one
// slides.forEach((slide, index) => {
//   slide.style.opacity = index === 0 ? 1 : 0;
//   slide.style.position = "absolute";
//   slide.style.transition = "opacity 1s ease";
// });

// function showNextSlide() {
//   const currentSlide = slides[currentIndex];
//   currentIndex = (currentIndex + 1) % totalSlides;
//   const nextSlide = slides[currentIndex];

//   // Show next slide immediately as the current slide fades out
//   nextSlide.style.opacity = 1; // Fade in next slide
//   currentSlide.style.opacity = 0; // Fade out current slide
// }

// // Show the first slide
// slides[currentIndex].style.opacity = 1;

// // Change slides every 5 seconds
// setInterval(showNextSlide, 5000);

// // Open overlay
// document.getElementById("searchTogg").addEventListener("click", () => {
//   var ven = document.getElementById("ven");
//   ven.classList.add("active");
//   document.body.classList.add("no-scroll");
// });

// // Close overlay
// document.getElementById("closeBtn").addEventListener("click", () => {
//   var ven = document.getElementById("ven");
//   ven.classList.remove("active");
//   document.body.classList.remove("no-scroll");
// });

// const video = document.getElementById("aboutVideo");
// const playPauseIcon = document.getElementById("playPauseIcon");
// const playIcon = "play-circle-outline";
// const pauseIcon = "pause-circle-outline";

// // Toggle play/pause on click
// playPauseIcon.addEventListener("click", () => {
//   if (video.paused) {
//     video.play();
//     playPauseIcon.innerHTML = `<ion-icon name="${pauseIcon}"></ion-icon>`;
//   } else {
//     video.pause();
//     playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
//   }
// });

// // Update icon when video ends
// video.addEventListener("ended", () => {
//   playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
// });

// document.getElementById("onlineTab").addEventListener("click", function () {
//   document.getElementById("onlineCourses").style.display = "flex";
//   document.getElementById("inPersonCourses").style.display = "none";
//   this.classList.add("active");
//   document.getElementById("inPersonTab").classList.remove("active");
// });

// document.getElementById("inPersonTab").addEventListener("click", function () {
//   document.getElementById("inPersonCourses").style.display = "flex";
//   document.getElementById("onlineCourses").style.display = "none";
//   this.classList.add("active");
//   document.getElementById("onlineTab").classList.remove("active");
// });

// function openModal(modalId) {
//   document.getElementById(modalId).style.display = "block";
// }

// function closeModal(modalId) {
//   document.getElementById(modalId).style.display = "none";
// }

// // Close modal when clicking outside
// window.onclick = function (event) {
//   if (event.target.classList.contains("modal")) {
//     event.target.style.display = "none";
//   }
// };

// IDMAJOR starts Here

/*
------------------ /api/blog
------------------ /api/mail

/get-posts
/get-single-post/:contentId
/create-posts
/update
/delete/:contentId
/send-email
/get-email



title
excerpt
content
image
category
author
reading-time
views
comments
----------------------------/
*/

// Blog

let formPut = document.getElementById("blog-post-form");

let formData = {};

if (formPut) {
  formPut.addEventListener("submit", async (e) => {
    e.preventDefault();

    await Promise.all(
      Array.from(formPut.querySelectorAll("input, select, textarea")).map(
        (element) => {
          let name = element.name;
          let value = element.value;

          if (name && element.type !== "file") {
            formData[name] = value;
          } else if (
            name &&
            element.type === "file" &&
            element.files.length > 0
          ) {
            let file = element.files[0];
            return new Promise((resolve) => {
              let reader = new FileReader();
              reader.onload = function (e) {
                formData[name] = e.target.result;
                resolve();
              };
              reader.readAsDataURL(file);
            });
          }
        }
      )
    );

    console.log("Form data ready to send:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blog/create-posts",
        formData
      );

      if (response.status !== 200 && response.status !== 201) {
        console.log("Response received:", response.data.message);
        alert(response.data.message);
      } else {
        console.log("Response received:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Something went wrong, try again");
      if (error.status == 401) {
        alert("Please verify your an admin");
      }
    }
  });
}

// Contect form

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  let contactFormData = {};

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      contactForm
        .querySelectorAll("input, select, textarea")
        .forEach((element) => {
          const name = element.name;
          const value = element.value;

          if (name) {
            contactFormData[name] = value;
          }
        });

      console.log(contactFormData);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/mail/contact-us",
          {
            name: contactFormData.name,
            email: contactFormData.email,
            message: contactFormData.message,
          }
        );

        alert(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form-live");

  let contactFormData = {};

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      contactForm
        .querySelectorAll("input, select, textarea")
        .forEach((element) => {
          const name = element.name;
          const value = element.value;

          if (name) {
            contactFormData[name] = value;
          }
        });

      console.log(contactFormData);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/mail/send-email",
          {
            name: contactFormData.name,
            email: contactFormData.email,
            subject: contactFormData.subject,
            message: contactFormData.message,
          }
        );

        alert("Message sent");
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again");
      }
    });
  }
});

async function fetchBlog() {
  try {
    console.log("Loading...");
    const response = await axios.get(
      "http://localhost:5000/api/blog/get-posts"
    );
    console.log(response);
    console.log("Done");

    response.data.forEach((datas) => {
      console.log(datas._id);

      let parent = document.querySelector(".blog-card-parent");

      let blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      let blogCardImage = document.createElement("div");
      blogCardImage.className = "blog-card-image";
      let img = document.createElement("img");
      img.src = `${datas.image}`;
      img.alt = "Blog Thumbnail";
      blogCardImage.appendChild(img);
      blogCard.appendChild(blogCardImage);

      let blogCardContent = document.createElement("div");
      blogCardContent.className = "blog-card-content";

      let title = document.createElement("h2");
      title.className = "blog-title";
      title.textContent = `${datas.title}`;
      blogCardContent.appendChild(title);

      let excerpt = document.createElement("p");
      excerpt.className = "blog-excerpt";
      excerpt.textContent = `${datas.excerpt}`;
      blogCardContent.appendChild(excerpt);

      let blogMeta = document.createElement("div");
      blogMeta.className = "blog-meta";

      let author = document.createElement("span");
      author.className = "author";
      author.innerHTML = `<i class="icon-user"></i> ${datas.author}`;
      blogMeta.appendChild(author);

      let date = document.createElement("span");
      date.className = "date";
      date.innerHTML = `<i class="icon-calendar"></i> ${new Date().toLocaleDateString()}`;
      blogMeta.appendChild(date);

      blogCardContent.appendChild(blogMeta);

      let blogEngagement = document.createElement("div");
      blogEngagement.className = "blog-engagement";

      let readingTime = document.createElement("span");
      readingTime.className = "reading-time";
      readingTime.innerHTML = `<i class="icon-clock"></i> ${datas.readingTime} mins read`;
      blogEngagement.appendChild(readingTime);

      let commentsCount = document.createElement("span");
      commentsCount.className = "comments-count";
      commentsCount.innerHTML = `<i class="icon-comment"></i> ${datas.comments} comments`;
      blogEngagement.appendChild(commentsCount);

      let viewsCount = document.createElement("span");
      viewsCount.className = "views-count";
      viewsCount.innerHTML = `<i class="icon-eye"></i> ${datas.views}k views`;
      blogEngagement.appendChild(viewsCount);

      blogCardContent.appendChild(blogEngagement);

      let readMoreBtn = document.createElement("a");
      readMoreBtn.className = "read-more-btn";
      readMoreBtn.onclick = () => openModal(datas._id);
      readMoreBtn.innerHTML = `Read More <i class="icon-arrow-right"></i>`;
      blogCardContent.appendChild(readMoreBtn);

      blogCard.appendChild(blogCardContent);

      let categories = document.createElement("div");
      categories.className = "categories";

      let categoryList = ["lifestyle", "School", "Health"];
      categoryList.forEach((category) => {
        let cat = document.createElement("div");
        cat.className = "cat";
        cat.textContent = category;
        categories.appendChild(cat);
      });

      blogCard.appendChild(categories);

      if (parent) {
        parent.appendChild(blogCard);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

fetchBlog();

// Comments sec

async function fetchFeedback() {
  try {
    console.log("Loading...");
    const response = await axios.get(
      "http://localhost:5000/api/mail/get-email"
    );
    console.log(response);
    console.log("Done");

    let tbody = document.querySelector("tbody");

    if (tbody) {
      tbody.innerHTML = "";
    }

    response.data.forEach((datas) => {
      let row = document.createElement("tr");

      let userNameCell = document.createElement("td");
      userNameCell.className = "userName";
      userNameCell.id = "username";
      userNameCell.textContent = datas.name;

      let feedbackCell = document.createElement("td");
      feedbackCell.className = "Email";
      feedbackCell.id = "Email";
      feedbackCell.textContent = datas.message;

      let subjectCell = document.createElement("td");
      subjectCell.className = "Subject";
      subjectCell.id = "Subject";
      subjectCell.textContent = datas.subject;

      let dateCell = document.createElement("td");
      dateCell.className = "Date";
      dateCell.id = "Date";
      dateCell.textContent = new Date(datas.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      row.appendChild(userNameCell);
      row.appendChild(feedbackCell);
      row.appendChild(subjectCell);
      row.appendChild(dateCell);

      if (tbody) {
        tbody.appendChild(row);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

fetchFeedback();

let inputDiv = document.getElementById("admin-token-div");
let admin = false;

async function checkAdmin() {
  inputDiv.style.display = "none";
  try {
    console.log("Loading...");

    const isAdmin = await axios.get(
      "http://localhost:5000/api/blog/check-admin"
    );

    if (isAdmin) {
      console.log(isAdmin);
      console.log("Done");
    } else {
      alert("Please verify your an admin");
      console.log("Done");
      signAdmin();
    }
  } catch (error) {
    console.log(error);
    if (error.status === 401) {
      alert("Please verify your an admin");
      signAdmin();
      console.log("Done");
    }
  }
}

checkAdmin();

// token-btn

function signAdmin() {
  inputDiv.style.display = "block";
  let input = document.getElementById("admin-token");

  document.getElementById("token-btn").addEventListener("click", async () => {
    console.log(input.value);
    try {
      const signInAdmin = await fetch(
        "http://localhost:5000/api/blog/sign-admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminAuthId: input.value }),
        }
      );

      if (signInAdmin.ok) {
        alert("Thanks for verifying");
        inputDiv.style.display = "none";
      } else {
        alert("Wrong admin token");
        inputDiv.style.display = "block";
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again");
    }
  });
}
