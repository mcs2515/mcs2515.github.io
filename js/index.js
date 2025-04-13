const response = await fetch('projects.json');
const projectData = await response.json();

const iconResponse = await fetch('media/github.svg');
const githubIcon = await iconResponse.text();

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

            detailsDiv.appendChild(title);
            detailsDiv.appendChild(locationAndDate);
            detailsDiv.appendChild(summary);
            projectDiv.appendChild(img);
            projectDiv.appendChild(detailsDiv);

            const hr = document.createElement('hr');
            projectDiv.appendChild(hr);

            projectDiv.appendChild(footer);
        }
    });
}

function createImageContainer(project) {
    const image = document.createElement('img');
    image.src = project.img;

    // create an image link if link is provided else create a normal image
    if (project.link) {
        const link = document.createElement('a');
        link.href = project.link;
        link.target = '_blank';

        link.appendChild(image);
        return link;
    }

    return image;
}

function createTitleLink(project) {
    let title;

    if (project.link) {
        title = document.createElement('a');
        title.href = project.link;
        title.target = '_blank';
    } else {
        title = document.createElement('p');
    }

    title.className = 'proj-title capitalize';
    title.innerText = project.name;

    return title;
}

function createLocationAndDate(project) {
    const container = document.createElement('div');
    container.className = 'proj-location-and-date';

    if (project.location) {
        const location = document.createElement('p');
        location.className = 'location';
        location.innerText = project.location;
        container.appendChild(location);
    }

    if (project.date) {
        const date = document.createElement('p');
        date.className = 'date';
        date.innerText = project.date;
        container.appendChild(date);
    }

    return container;
}

function createSummary(project) {
    if (project.summary == undefined) {
        return;
    }

    const summary = document.createElement('p');
    summary.className = 'proj-summary';
    summary.innerText = project.summary;

    return summary;
}

// create git icon and project tags
function createFooterContainer(project) {
    const container = document.createElement('div');
    container.className = 'proj-footer';

    const gitLink = createGitLink(project);
    if (gitLink != undefined) {
        container.appendChild(gitLink);
    }

    const tagDiv = document.createElement('div');
    tagDiv.className = 'proj-tags-div';

    project.tags.forEach((tag) => {
        const text = document.createElement('p');
        text.className = 'proj-tag';
        text.innerText = tag;

        tagDiv.appendChild(text);
    });

    container.appendChild(tagDiv);

    return container;
}

function createGitLink(project) {
    if (project.gitLink == undefined) {
        return;
    }

    const gitLink = document.createElement('a');
    gitLink.href = project.gitLink;
    gitLink.target = '_blank';

    gitLink.innerHTML = githubIcon;
    gitLink.className = 'project-github-icon';

    return gitLink;
}

window.onload = createProjects();
