const response = await fetch('projects.json');
const projectData = await response.json();

function populateProjDiv() {
    projectData.forEach((project) => {
        const idName = project.name.replace(/ /g, '-');
        const projectDiv = document.querySelector('#' + idName);

        if (projectDiv != null) {
            const img = createProjImg(project);
            const link = createProjLink(project);
            const locationAndDate = createLocationAndDate(project);
            const summary = createSummary(project);
            const tagsAndGit = createProjTagsandGitLink(project);

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'proj-details';

            const hr = document.createElement('hr');

            detailsDiv.appendChild(link);
            detailsDiv.appendChild(locationAndDate);
            detailsDiv.appendChild(summary);

            projectDiv.appendChild(img);
            projectDiv.appendChild(detailsDiv);
            projectDiv.appendChild(hr);
            projectDiv.appendChild(tagsAndGit);
        }
    });
}

// Create image link to project
function createProjImg(project) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'image-link-div';

    const imgTag = document.createElement('img');
    imgTag.src = project.img;

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

// create text link to project
function createProjLink(project) {
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

    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.innerHTML = project.date;

    const locationDiv = document.createElement('div');
    locationDiv.className = 'location';
    locationDiv.innerHTML = project.location;

    locationDateDiv.appendChild(locationDiv);
    locationDateDiv.appendChild(dateDiv);

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

// create a div to populate with span elements
function createProjTagsandGitLink(project) {
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

window.onload = populateProjDiv();
