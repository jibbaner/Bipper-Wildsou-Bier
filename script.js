const beers = [
    {
        name: "DÜRRMÜHLI",
        tag: "Bio-Lagerbier",
        h1: "DÜRRMÜHLI <span>BIO-LAGER.</span>",
        desc: "Gemacht für heisse Tage, ist Dürrmühli ein süffiges und erfrischendes Bier.",
        origin: "Am Dorfbach errichtete man eine vom Wasser des Laufes getriebene Mühle. Doch litt deren Leistung bei Trockenheit oft unter mangelnder Wasserführung des Baches, so dass im Laufe der Zeit die ganze Ortschaft am Bergfuss den Namen Dürrmühle erhielt.",
        img: "assets/images/Dürrmühli 1.png",
        stats: {
            gravity: "1.048 OG",
            ibu: "18 IBU",
            label: "Bio Knospe",
            filtration: "Trüb (Natural)"
        },
        colors: {
            primary: "#ffef00",
            glow: "rgba(255, 239, 0, 0.15)"
        }
    },
    {
        name: "IISCHLEGLI",
        tag: "Bio-Lagerbier",
        h1: "IISCHLEGLI <span>STARK & KALT.</span>",
        desc: "Das helle und leicht herbe Rezept. Dieses Bier muss man einfach mögen! Passt perfekt zu viel Sonnenschein und Party-Stimmung.",
        origin: "Bezeichnete das heutige Gebiet zwischen Hintergasse, Fuchs- und Rehweg. In diesem Gebiet wurden die ersten Biere unserer Brauerei gebraut.",
        img: "assets/images/Iischlegli 1.png",
        stats: {
            gravity: "1.054 OG",
            ibu: "24 IBU",
            label: "Bio Knospe",
            filtration: "Kaltgehopft"
        },
        colors: {
            primary: "#b0d182",
            glow: "rgba(176, 209, 130, 0.15)"
        }
    },
    {
        name: "ABILON",
        tag: "Bio-Amberbier",
        h1: "ABILON <span>BIO-AMBER.</span>",
        desc: "Schön in der Farbe und voll im Geschmack. Abilon ist ein Bier, das allen schmeckt.",
        origin: "Abilon weist auf einen Besitzer namens Abo hin. Der zweite Teil der Bezeichnung -lo, erinnert an Gebüsch oder Gehölz. Das dortige Wäldchen ist heute ein Feld namens «Oberfeld».",
        img: "assets/images/Abilon 1.png",
        stats: {
            gravity: "1.052 OG",
            ibu: "20 IBU",
            label: "Bio Knospe",
            filtration: "Bernsteinfarben"
        },
        colors: {
            primary: "#d87a27",
            glow: "rgba(216, 122, 39, 0.15)"
        }
    },
    {
        name: "SCHARNAGLE",
        tag: "Dunkles Bio-Lagerbier",
        h1: "SCHARNAGLE <span>DUNKLE SOU.</span>",
        desc: "Die dunkle Überraschung! Ein Bier so schwarz wie die Nacht, mit einem wahnsinnigen Aroma.",
        origin: "Benannt nach dem ehemaligen Waldgebiet Scharnaglen. Ein kräftiges Bier, das die Geschichte der Region in jedem Schluck trägt.",
        img: "assets/images/Scharnagle 1.png",
        stats: {
            gravity: "1.056 OG",
            ibu: "22 IBU",
            label: "Bio Knospe",
            filtration: "Dunkel & Malzig"
        },
        colors: {
            primary: "#888888",
            glow: "rgba(136, 136, 136, 0.15)"
        }
    }
];

let currentIndex = 0;

// DOM Elements
const beerTypeTag = document.getElementById('beer-type-tag');
const beerName = document.getElementById('beer-name');
const beerDesc = document.getElementById('beer-description');
const beerOrigin = document.getElementById('beer-origin');
const productImg = document.getElementById('product-img');
const thumbnailNav = document.getElementById('thumbnail-nav');
const statGravity = document.getElementById('stat-gravity');
const statIbu = document.getElementById('stat-ibu');
const statLabel = document.getElementById('stat-label');
const statFiltration = document.getElementById('stat-filtration');

function generateThumbnails() {
    beers.forEach((beer, index) => {
        const thumbContainer = document.createElement('div');
        thumbContainer.classList.add('nav-thumb');
        if (index === 0) thumbContainer.classList.add('active');

        // Set individual color variables for hover effects
        thumbContainer.style.setProperty('--item-color', beer.colors.primary);
        thumbContainer.style.setProperty('--item-glow', beer.colors.glow);

        const thumbImg = document.createElement('img');
        thumbImg.src = beer.img;
        thumbImg.alt = beer.name;

        thumbContainer.appendChild(thumbImg);
        thumbContainer.addEventListener('click', () => {
            currentIndex = index;
            updateBeerContent(index);
        });

        thumbnailNav.appendChild(thumbContainer);
    });
}

function updateBeerContent(index) {
    const beer = beers[index];

    // Update CSS Variables for dynamic branding
    document.documentElement.style.setProperty('--accent-primary', beer.colors.primary);
    document.documentElement.style.setProperty('--accent-glow', beer.colors.glow);

    // Reset and trigger animations for hero text
    const animElements = document.querySelectorAll('.hero-content .tag, .hero-content h1, .hero-content .hero-description, .hero-content .origin-story, .hero-content .left-controls-container');

    animElements.forEach(el => {
        el.classList.remove('animate-left');
        void el.offsetWidth; // Trigger reflow to restart animation
        el.classList.add('animate-left');
    });

    // Handle Bottle Transition
    if (productImg) {
        productImg.classList.remove('bottle-enter');
        productImg.classList.add('bottle-exit');

        setTimeout(() => {
            productImg.src = beer.img;
            productImg.alt = beer.name;
            productImg.classList.remove('bottle-exit');
            void productImg.offsetWidth; // Force Reflow
            productImg.classList.add('bottle-enter');
        }, 400); // Wait for exit animation to almost finish
    }

    beerTypeTag.textContent = beer.tag;
    beerName.innerHTML = beer.h1;
    beerDesc.textContent = beer.desc;
    beerOrigin.textContent = beer.origin;

    // Update Stats
    statGravity.textContent = beer.stats.gravity;
    statIbu.textContent = beer.stats.ibu;
    statLabel.textContent = beer.stats.label;
    statFiltration.textContent = beer.stats.filtration;

    // Handle active thumbnail
    const thumbs = document.querySelectorAll('.nav-thumb');
    thumbs.forEach((thumb, i) => {
        if (i === index) thumb.classList.add('active');
        else thumb.classList.remove('active');
    });

    // Reset and trigger animations for sidebar items
    const sidebarItems = document.querySelectorAll('.data-item');
    sidebarItems.forEach(item => {
        item.classList.remove('animate-right');
        void item.offsetWidth; // Force Reflow
        item.classList.add('animate-right');
    });
}

// Initialize Thumbnails
generateThumbnails();

// Cursor Glow Follower
const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Bubble Generation
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 4 + 2 + 'px';
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.top = '100%';
    bubble.style.animationDuration = Math.random() * 4 + 2 + 's';
    bubble.style.opacity = Math.random() * 0.2;

    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 6000);
}

setInterval(createBubble, 300);

// Mouse Tilt Interaction for Bottle
const bottleContainer = document.querySelector('.bottle-preview-container');
const bottleImg = document.getElementById('product-img');

if (bottleContainer && bottleImg) {
    bottleContainer.addEventListener('mousemove', (e) => {
        const rect = bottleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Perspective Tilt calculation
        const tiltX = (y - centerY) / 20; // Up/down tilt
        const tiltY = (centerX - x) / 20; // Left/right tilt

        bottleImg.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        bottleImg.style.filter = `drop-shadow(${tiltY * -1}px ${tiltX * -1}px 80px rgba(0,0,0,0.6))`;
    });

    bottleContainer.addEventListener('mouseleave', () => {
        bottleImg.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        bottleImg.style.filter = `drop-shadow(0 20px 80px rgba(0,0,0,0.6))`;
    });
}

// Initialize first beer content on load
updateBeerContent(currentIndex);
