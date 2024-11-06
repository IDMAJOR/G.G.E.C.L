"use strict";

// add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// navbar functionality

const [navbar, navToggler, navbarLinks] = [
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
];

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
  document.body.classList.toggle("active");
};

navToggler.addEventListener("click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navbarLinks, "click", closeNavbar);

// header active

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY >= 20) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElemOnScroll);

// scroll reveal effect

const revealElements = document.querySelectorAll("[data-reveal]");

const revealOnScroll = function () {
  for (let i = 0; i < revealElements.length; i++) {
    // add revealed class on element, when visible in window
    if (
      revealElements[i].getBoundingClientRect().top <
      window.innerHeight / 1.1
    ) {
      revealElements[i].classList.add("revealed");

      // remove long transition from button, after 1 second
      if (revealElements[i].classList.contains("btn")) {
        setTimeout(function () {
          revealElements[i].style.transition = "0.25s ease";
        }, 1000);
      }
    }
  }
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Initialize all slides to invisible except the first one
slides.forEach((slide, index) => {
  slide.style.opacity = index === 0 ? 1 : 0;
  slide.style.position = "absolute";
  slide.style.transition = "opacity 1s ease";
});

function showNextSlide() {
  const currentSlide = slides[currentIndex];
  currentIndex = (currentIndex + 1) % totalSlides;
  const nextSlide = slides[currentIndex];

  // Show next slide immediately as the current slide fades out
  nextSlide.style.opacity = 1; // Fade in next slide
  currentSlide.style.opacity = 0; // Fade out current slide
}

// Show the first slide
// if (slides) {
//   slides[currentIndex].style.opacity = 1;
// }

// Change slides every 5 seconds
// setInterval(showNextSlide, 5000);

// Open overlay
document.getElementById("searchTogg").addEventListener("click", () => {
  var ven = document.getElementById("ven");
  ven.classList.add("active");
  document.body.classList.add("no-scroll");
});

// Close overlay
let ven = document.getElementById("closeBtn");
if (ven) {
  ven.addEventListener("click", () => {
    var ven = document.getElementById("ven");
    ven.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
}

const video = document.getElementById("aboutVideo");
const playPauseIcon = document.getElementById("playPauseIcon");
const playIcon = "play-circle-outline";
const pauseIcon = "pause-circle-outline";

// Toggle play/pause on click
if (playPauseIcon) {
  playPauseIcon.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseIcon.innerHTML = `<ion-icon name="${pauseIcon}"></ion-icon>`;
    } else {
      video.pause();
      playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
    }
  });
}

// Update icon when video ends
if (video) {
  video.addEventListener("ended", () => {
    playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
  });
}

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

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

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

let admin = false;

// Contact form

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
          "https://ggecl.onrender.com/api/mail/contact-us",
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
          "https://ggecl.onrender.com/api/mail/send-email",
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
      "https://ggecl.onrender.com/api/blog/get-posts"
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
      console.log(datas);
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

// Comments section

async function fetchFeedback() {
  try {
    console.log("Loading...");
    const response = await axios.get(
      "https://ggecl.onrender.com/api/mail/get-email"
    );
    console.log(response);
    console.log("Done");

    let tbody = document.querySelector("tbody");

    if (tbody) {
      tbody.innerHTML = "";
    }

    const sortedData = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sortedData.forEach((datas) => {
      let row = document.createElement("tr");

      let userNameCell = document.createElement("td");
      userNameCell.className = "userName";
      userNameCell.id = "username";
      userNameCell.textContent = datas.name;

      let feedbackCell = document.createElement("td");
      feedbackCell.className = "Email";
      feedbackCell.id = "Email";
      feedbackCell.textContent = datas.email;

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

      let deleteCell = document.createElement("td");
      deleteCell.className = "Date";
      deleteCell.id = "Date";
      deleteCell.textContent = "delete";
      deleteCell.style.color = "red";
      deleteCell.style.cursor = "pointer";
      deleteCell.onclick = () => deleteFeedback(datas._id);

      row.appendChild(userNameCell);
      row.appendChild(feedbackCell);
      row.appendChild(subjectCell);
      row.appendChild(dateCell);
      row.appendChild(deleteCell);

      if (tbody) {
        tbody.appendChild(row);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

let inputDiv = document.getElementById("admin-token-div");

async function checkAdmin() {
  if (!inputDiv) return;
  inputDiv.style.display = "none";
  try {
    console.log("Loading...");

    const response = await axios.get(
      "https://ggecl.onrender.com/api/blog/check-admin"
    );
    if (response.status === 200 && response.data.isAdmin) {
      console.log(response.data);
      admin = true;
      console.log("Admin verified");
    } else {
      alert("Please verify you are an admin");
      signAdmin();
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      alert("Please verify you are an admin");
      signAdmin();
    }
  }
}

checkAdmin();

// Token button

function signAdmin() {
  inputDiv.style.display = "block";
  let input = document.getElementById("admin-token");

  document.getElementById("token-btn").addEventListener("click", async () => {
    console.log(input.value);
    try {
      const signInAdmin = await fetch(
        "https://ggecl.onrender.com/api/blog/sign-admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminAuthId: input.value }),
        }
      );

      if (signInAdmin.ok) {
        alert("Thanks for verifying");
        inputDiv.style.display = "none";
        admin = true;
        console.log(admin);

        fetchFeedback();
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

if (formPut) {
  formPut.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!admin) {
      return alert("Verify you are an admin");
    }

    const formData = {};

    const fileReadPromises = [];

    formPut.querySelectorAll("input, select, textarea").forEach((element) => {
      const name = element.name;
      const value = element.value;

      if (name) {
        if (element.type === "file" && element.files.length > 0) {
          const file = element.files[0];
          const fileReadPromise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
              formData[name] = event.target.result;
              resolve();
            };
            reader.onerror = function () {
              reject("Error reading file");
            };
            reader.readAsDataURL(file);
          });
          fileReadPromises.push(fileReadPromise);
        } else {
          formData[name] = value;
        }
      }
    });

    try {
      await Promise.all(fileReadPromises);

      const response = await axios.post(
        "https://ggecl.onrender.com/api/blog/create-posts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Blog has been posted");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Something went wrong, try again");
    }
  });
}

const searchInput = document.getElementById("ven-search");
const searchOut = document.getElementById("show-search");
const schBtn = document.getElementById("sch");

// Function to display search results
function displayResults(posts) {
  searchOut.innerHTML = ""; // Clear previous results
  if (posts.length === 0) {
    searchOut.innerHTML = "<p>No results found</p>";
    return;
  }

  // Create and append result elements
  posts.forEach((post) => {
    const resultItem = document.createElement("div");
    resultItem.innerHTML = `
      <div class="search-results">
        <h3>${post.title}</h3>
        <p>${post.excerpt || post.content.slice(0, 100) + "..."}</p>
        <p>Author: ${post.author}</p>
      </div>
    `;
    searchOut.appendChild(resultItem);
  });
}

// Function to handle search
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    searchOut.innerHTML = ""; // Clear results if query is empty
    return;
  }

  try {
    // Send POST request to backend
    const response = await axios.post(
      "https://ggecl.onrender.com/api/blog/search",
      {
        query,
      }
    );

    // Display results
    displayResults(response.data.posts);
    console.log(response.data);
  } catch (error) {
    console.error("Error searching:", error);
    searchOut.innerHTML = `<p>${error.response.data.message}</p>`;
  }
}

// Attach event listeners
if (searchInput) {
  searchInput.addEventListener("input", handleSearch);
}
if (schBtn) {
  schBtn.addEventListener("click", handleSearch); // Optional for button click
}

async function deleteFeedback(emailId) {
  try {
    const response = await axios.get(
      `https://ggecl.onrender.com/api/mail/delete/${emailId}`
    );
    alert("Message has been deleted");
    fetchFeedback();
  } catch (error) {
    console.log(error);
  }
}
