
let currentImages = [];
let currentIndex = 0;

function generateImages(path, prefix, total) {
    const items = [];

    for (let i = 1; i <= total; i++) {
        const number = String(i).padStart(2, '');
        items.push({
            img: `${path}/${prefix}(${number}).jpg`
        });
    }

    return items;
}

const certifications = {
    ai: {
        title: "AI Certifications",
        items: generateImages('./assets/Diplomas/ai', 'ai', 5)
    },
    english: {
        title: "English Certifications",    
        items: generateImages('./assets/Diplomas/english', 'english', 17)
    },
    frontend: {
        title: "Frontend Certifications",
        items: generateImages('./assets/Diplomas/frontend', 'frontend', 6)
    },
    javascript: {
        title: "JavaScript Certifications",
        items: generateImages('./assets/Diplomas/javascript', 'javascript', 9)
    },
    backend: {
        title: "Backend Certifications",
        items: generateImages('./assets/Diplomas/backend', 'backend', 2)
    },
    tools: {
        title: "Tools Certifications",
        items: generateImages('./assets/Diplomas/tools', 'tools', 3)
    },
    systems: {
        title: "Systems Certifications",
        items: generateImages('./assets/Diplomas/systems', 'systems', 6)
    },
    networks: {
        title: "Networks Certifications",
        items: generateImages('./assets/Diplomas/networks', 'networks', 2)
    },
    logic: {
        title: "Logic Certifications",
        items: generateImages('./assets/Diplomas/logic', 'logic', 8)
    }
};


function createCertificationSection(sectionId, sectionData) {
    const section = document.getElementById(sectionId);

    const title = document.createElement('h2');
    title.classList.add('section-title');
    title.textContent = sectionData.title;

    const grid = document.createElement('div');
    grid.classList.add('certifications-grid');

    sectionData.items.forEach((cert, index) => {
    const certification = document.createElement('div');
    certification.classList.add('certification');

    const img = document.createElement('img');
    img.src = cert.img;
    img.loading = 'lazy';
    img.alt = 'Certification Image';

    img.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');

        currentImages = sectionData.items.map(item => item.img);
        currentIndex = index;

        modal.style.display = "block";
        modalImg.src = currentImages[currentIndex];
    });

    certification.appendChild(img);
    grid.appendChild(certification);
});

    section.appendChild(title);
    section.appendChild(grid);

    document.getElementById('close').onclick = () => {
    document.getElementById('modal').style.display = "none";
};


    window.onclick = (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };
}

function showImage(index) {
    const modalImg = document.getElementById('modal-img');
    modalImg.src = currentImages[index];
}

document.getElementById('prev').onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
};

document.getElementById('next').onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
};

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');

    if (modal.style.display === "block") {
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        }

        if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        }

        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    }
});

let startX = 0;

document.getElementById('modal').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

document.getElementById('modal').addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    }

    if (endX - startX > 50) {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    }
});

createCertificationSection('ai-certifications', certifications.ai);
createCertificationSection('english-certifications', certifications.english);
createCertificationSection('frontend-certifications', certifications.frontend);
createCertificationSection('javascript-certifications', certifications.javascript);
createCertificationSection('backend-certifications', certifications.backend);
createCertificationSection('tools-certifications', certifications.tools);
createCertificationSection('systems-certifications', certifications.systems);
createCertificationSection('networks-certifications', certifications.networks);
createCertificationSection('logic-certifications', certifications.logic);