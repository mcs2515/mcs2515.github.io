const response = await fetch('projects.json');
const projectData = await response.json();

function createProjects() {
    projectData.forEach((project) => {
        const idName = project.name.replace(/ /g, '-');
        const projectDiv = document.querySelector('#' + idName);

        if (projectDiv != null) {
            const img = createImageContainer(project);
            const title = createTitleLink(project);
            const locationAndDate = createLocationAndDate(project);
            const summary = createSummary(project);
            const footer = createFooterContainer(project);

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'proj-details';

            const hr = document.createElement('hr');

            detailsDiv.appendChild(title);
            detailsDiv.appendChild(locationAndDate);
            detailsDiv.appendChild(summary);

            projectDiv.appendChild(img);
            projectDiv.appendChild(detailsDiv);
            projectDiv.appendChild(hr);
            projectDiv.appendChild(footer);
        }
    });
}

function createImageContainer(project) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'image-link-div';

    const imgTag = document.createElement('img');
    imgTag.src = project.img;

    // create an image link if link is provided else create a normal image
    if (project.link) {
        const linkTag = document.createElement('a');
        linkTag.href = project.link;
        linkTag.target = '_blank';

        linkTag.appendChild(imgTag);
        imgDiv.appendChild(linkTag);
    } else {
        imgDiv.appendChild(imgTag);
    }

    return imgDiv;
}

function createTitleLink(project) {
    let linkTag;

    if (project.link) {
        linkTag = document.createElement('a');
        linkTag.href = project.link;
        linkTag.target = '_blank';
    } else {
        linkTag = document.createElement('p');
    }

    linkTag.className = 'proj-title capitalize';
    linkTag.innerHTML = project.name;

    return linkTag;
}

function createLocationAndDate(project) {
    const locationDateDiv = document.createElement('div');
    locationDateDiv.className = 'proj-location-and-date';

    if (project.date) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.innerHTML = project.date;
        locationDateDiv.appendChild(dateDiv);
    }

    if (project.location) {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location';
        locationDiv.innerHTML = project.location;
        locationDateDiv.appendChild(locationDiv);
    }

    return locationDateDiv;
}

function createSummary(project) {
    if (project.summary == undefined) return;

    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'proj-summary-div';

    const summaryPara = document.createElement('p');
    summaryPara.innerHTML = project.summary;

    summaryDiv.appendChild(summaryPara);

    return summaryDiv;
}

// create git icon and project tags
function createFooterContainer(project) {
    const footerDiv = document.createElement('div');
    footerDiv.className = 'proj-footer';

    const gitLink = createGitLink(project);
    if (gitLink != undefined) {
        footerDiv.appendChild(gitLink);
    }

    const tags = project.tags.split(' ');
    const tagDiv = document.createElement('div');
    tagDiv.className = 'proj-tags';

    tags.forEach((item) => {
        const span = document.createElement('span');
        span.className = 'proj-tag';
        span.innerHTML = item;

        tagDiv.appendChild(span);
    });

    footerDiv.appendChild(tagDiv);

    return footerDiv;
}

function createGitLink(project) {
    if (project.gitLink == undefined) return;

    const gitDiv = document.createElement('div');
    gitDiv.className = 'proj-git-div';

    const gitLink = document.createElement('a');
    gitLink.className = 'proj-git-link';
    gitLink.href = project.gitLink;
    gitLink.target = '_blank';

    if (project.gitLink == '#') {
        gitDiv.className = 'proj-git-div-hide';
    }

    // use fontawesome's git icon
    const iElement = document.createElement('i');
    iElement.className = 'fab fa-github fa-2x';

    gitLink.appendChild(iElement);
    gitDiv.appendChild(gitLink);

    return gitDiv;
}

window.onload = createProjects();
