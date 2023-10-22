const article = document.querySelector("#article");
const card = document.querySelector("#card");
const card2 = document.querySelector("#card2");
const footer = document.querySelector("footer");
const nav = document.querySelector("#nav");
const banner = document.querySelector("#banner");
const navMonth = document.querySelector("#navMonth");

async function getResponse() {
  let response = await fetch("https://jsonplaceholder.org/posts");
  let content = await response.json();
  //=====================================
  let key;
  for (key in content) {
    //--------article----------
    if (key < content.length - 50) {
      article.innerHTML += `
     <h3 class="blog-post-title">${content[key].title}</h3>
     <p class="blog-post-meta">
       ${content[key].publishedAt}
       <a href="#">${content[key].slug}</a>
      </p>
      <p>${content[key].content}</p>
      `;
    }
    //---------cards----------
    else if (key == content.length - 2 || key == content.length - 1) {
      card.innerHTML += `<div class="card col-md-6 myCards">
    <div
    class="row g-0 rounded flex-md-row mb-4 card-body">
    <div class="col-8 p-4 d-flex flex-column position-static">
       <h4 card-title class="mb-2 titleCard">${content[key].title}</h4>
      <p class="card-text" x="50%" y="50%">${content[key].content}</p>
      <a href="#" class="stretched-link">"${content[key].url}"</a>
      </div>
        <div class="col-4 d-none d-lg-block">
       <img class="imageCard" width="200" height="250" src="${content[key].image}">
    </div>
   </div>
   </div>
   `;
    }
  }
  const thirdWithLast = content.length - 3;
  banner.innerHTML += `
  <div style="background-image:url(${content[thirdWithLast].image}); background-repeat:no-repeat; background-size:100%" class="p-4 mb-2">
  <div class="col-md-12 px-0">
  <p class="lead mb-0">${content[thirdWithLast].content}</p>
 </div></div>
  `;
  //===========================================================
  const unique = [...new Set(content.map((item) => item.category))];

  let item;
  for (item in unique) {
    if (item < unique.length) {
      nav.innerHTML += ` <a class="links-nav p-2 link-secondary" href="#">${unique[item]}</a>`;
    }
  }

  const dates = getDatesOfPosts(content);
  const sortedDates = sortDates(dates);
  const monthYears = getMonthAndYearOfDates(sortedDates);
  const uniqueMonthYears = getArrayUniqueValues(monthYears);
  console.log(uniqueMonthYears);
  let i;
  for (i in uniqueMonthYears) {
    if (i < uniqueMonthYears.length) {
      navMonth.innerHTML += `
    <li class="list-unstyled p-2 text-center"><a href="${content[key].url}">${uniqueMonthYears[i]}</a></li>
    `;
    }
  }

  function getDatesOfPosts(content) {
    return content
      .map((item) => item.publishedAt)
      .map((publishedAt) => new Date(convertDateFormat(publishedAt)));
  }

  // чтобы не было Invalid Date
  function convertDateFormat(inputDate) {
    const parts = inputDate.split(" ");

    const [day, month, year] = parts[0].split("/");
    const time = parts[1];
    return `${year}/${month}/${day} ${time}`;
  }

  function sortDates(dates) {
    return dates.sort((a, b) => a - b);
  }
function getMonthAndYearOfDates(dates) {
    return dates.map((date) => getMonthAndYearOfDate(date));
  }
function getMonthAndYearOfDate(date) {
    const monthsInWords = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthsInWords[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  }

  function getArrayUniqueValues(arr) {
    return (uniqArr = Array.from(new Set(arr)));
  }
}
getResponse();
