const response = await fetch('projects.json');
const projectData = await response.json();
let previousScrollY = 0;

const init = () => {
    //initialize paroller.js
    $('[data-paroller-factor]').paroller();

    addEventListeners();
    createProjects();
};

const addEventListeners = () => {
    const projectsBtn = document.querySelector('#projects');
    projectsBtn?.addEventListener('click', () => {
        const section = document.querySelector('#projects-wrap');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const aboutMe = document.querySelector('#about-me');
    aboutMe?.addEventListener('click', () => {
        const section = document.querySelector('#about-me-wrap');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const nav = document.querySelector('header');
    document.addEventListener('scroll', () => {
        adjustNav(nav);
    });

    // show nav bar when focus is set to any of the items
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach((item) => {
        item.children[0].addEventListener('focus', () => {
            nav.classList.remove('hide');
        });
    });
};

const adjustNav = (nav) => {
    if (window.scrollY > previousScrollY) {
        //scrolling down
        nav.classList.add('hide');
    } else if (window.scrollY < previousScrollY) {
        //scrolling up
        nav.classList.remove('hide');
    }

    previousScrollY = window.scrollY;
};

const createProjects = () => {
    const projectsGrid = document.querySelector('#projects-grid');

    projectData.forEach((_project) => {
        const project = document.createElement('div');
        project.className = 'project hvr-float';

        const img = createImageContainer(_project);
        const title = createTitleLink(_project);
        const description = createDescription(_project);
        const footer = createFooterContainer(_project);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'project__details';

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(description);
        project.appendChild(img);
        project.appendChild(detailsDiv);

        const hr = document.createElement('hr');
        project.appendChild(hr);

        project.appendChild(footer);
        projectsGrid.appendChild(project);
    });
};

const createImageContainer = (project) => {
    const image = document.createElement('img');
    image.src = project.img;
    image.alt = project.name
        ? `image of ${project.name} project`
        : 'image of project';

    // create an image link if link is provided else create a normal image
    if (project.link || project.gitLink) {
        const link = document.createElement('a');
        link.href = project.link || project.gitLink;
        link.target = '_blank';

        link.appendChild(image);
        return link;
    }

    return image;
};

const createTitleLink = (project) => {
    let title;

    if (project.link || project.gitLink) {
        title = document.createElement('a');
        title.href = project.link || project.gitLink;
        title.target = '_blank';
    } else {
        title = document.createElement('p');
    }

    title.className = 'project__title';
    title.innerText = project.name;

    return title;
};

const createDescription = (project) => {
    if (project.description == undefined) {
        return;
    }

    const description = document.createElement('p');
    description.className = 'project__description';
    description.innerText = project.description;

    return description;
};

// create git icon and project tags
const createFooterContainer = (project) => {
    const container = document.createElement('div');
    container.className = 'project__footer';

    project.tags.forEach((tag) => {
        const text = document.createElement('p');
        text.className = 'project__tag';
        text.innerText = tag;
        container.appendChild(text);
    });

    return container;
};

window.onload = init();
