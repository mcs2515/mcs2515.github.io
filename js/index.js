(function () {
  "use strict";

  var projects;

  //reads in the project json
  function readProjectJSON() {
    let requestURL = "projects.json";

    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      projects = request.response;
      init();
    };
  }

  function init() {
    checkWidth();
    populateProjDiv();

    $(".aboutme").flip({
      trigger: "hover",
      reverse: true,
    });

    $("a[href='#projectSection']").click(function () {
      $("html, body").animate({ scrollTop: 950 }, 1000);
      return false;
    });

    $("a[href='#copyright']").click(function () {
      $("html, body").animate({ scrollTop: $(document).height() }, 2000);
      return false;
    });

    $(".about, [data-paroller-factor]").paroller({
      factor: 0.2,
      type: "foreground",
    });

    $(".js-tilt").tilt({
      perspective: 1500,
    });

    $(".slick").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
    });
  }

  function checkWidth() {
    let w = $(window).innerWidth();

    if (w < 960) {
      $(".imageThumb, [data-paroller-factor]").paroller({
        factor: 0.05,
        type: "foreground",
      });
    } else {
      $(".imageThumb, [data-paroller-factor]").paroller({
        factor: 0.1,
        type: "foreground",
      });
    }
  }

  function populateProjDiv() {
    for (var i = 0; i < projects.length; i++) {
      let idName = projects[i].name.replace(/ /g, "-");
      let projectDiv = document.querySelector("#" + idName);

      if (projectDiv != null) {
        let img = createProjImg(projects[i]);
        let link = createProjLink(projects[i]);
        let locationAndDate = createLocationAndDate(projects[i]);
        let tagsAndGit = createProjTagsandGitLink(projects[i]);

        let detailsDiv = document.createElement("div");
        detailsDiv.className = "proj-details capitalize";

        let hr = document.createElement("hr");

        detailsDiv.appendChild(link);
        detailsDiv.appendChild(locationAndDate);

        projectDiv.appendChild(img);
        projectDiv.appendChild(detailsDiv);
        projectDiv.appendChild(hr);
        projectDiv.appendChild(tagsAndGit);
      }
    }
  }

  //Create image link to project
  function createProjImg(project) {
    let imgDiv = document.createElement("div");
    imgDiv.className = "image-link-div";

    let linkTag = document.createElement("a");
    linkTag.href = project.link;
    linkTag.target = "_blank";

    let imgTag = document.createElement("img");
    imgTag.src = project.img;

    linkTag.appendChild(imgTag);
    imgDiv.appendChild(linkTag);

    return imgDiv;
  }

  //create text link to project
  function createProjLink(project) {
    let linkTag = document.createElement("a");
    linkTag.href = project.link;
    linkTag.target = "_blank";
    linkTag.className = "proj-title";
    linkTag.innerHTML = project.name;

    return linkTag;
  }

  function createLocationAndDate(project) {
    let locationDateDiv = document.createElement("div");
    locationDateDiv.className = "proj-location-and-date";

    let dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.innerHTML = project.date;

    let locationDiv = document.createElement("div");
    locationDiv.className = "location";
    locationDiv.innerHTML = project.location;

    locationDateDiv.appendChild(locationDiv);
    locationDateDiv.appendChild(dateDiv);

    return locationDateDiv;
  }

  function createGitLink(project) {
    if (project.gitLink == undefined) return;

    let gitDiv = document.createElement("div");
    gitDiv.className = "proj-git-div";

    let gitLink = document.createElement("a");
    gitLink.className = "proj-git-link";
    gitLink.href = project.gitLink;
    gitLink.target = "_blank";

    if (project.gitLink == "#") {
      gitDiv.className = "proj-git-div-hide";
    }

    //use fontawesome's git icon
    let iElement = document.createElement("i");
    iElement.className = "fab fa-github fa-2x";

    gitLink.appendChild(iElement);
    gitDiv.appendChild(gitLink);

    return gitDiv;
  }

  //create a div to populate with span elements
  function createProjTagsandGitLink(project) {
    let footerDiv = document.createElement("div");
    footerDiv.className = "proj-footer";

    let gitLink = createGitLink(project);
    if (gitLink != undefined) {
      footerDiv.appendChild(gitLink);
    }

    let tags = project.tags.split(" ");
    let tagDiv = document.createElement("div");
    tagDiv.className = "proj-tags";

    tags.forEach((item) => {
      let span = document.createElement("span");
      span.className = "proj-tag";
      span.innerHTML = item;

      tagDiv.appendChild(span);
    });

    footerDiv.appendChild(tagDiv);

    return footerDiv;
  }

  window.onload = readProjectJSON;
})();
