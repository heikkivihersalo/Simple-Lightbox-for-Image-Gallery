/**
 * Init lightbox elements
 */
const LIGHTBOX_BACKDROP = document.createElement('div');
const LIGHTBOX_CONTAINER = document.createElement('div');
const LIGHTBOX_BUTTON_LEFT = document.createElement('button');
const LIGHTBOX_BUTTON_RIGHT = document.createElement('button');
const LIGHTBOX_BUTTON_CLOSE = document.createElement('button');

/**
 * Add image to lightbox from DOM node
 * @param {node} image 
 */
const addImageToLightbox = (image) => {
    let lightboxImage = document.createElement('img');

    /* Set element attributes */
    lightboxImage.src = image.src;
    lightboxImage.id = 'image-gallery-item--active';
    lightboxImage.setAttribute('data-id', image.getAttribute('data-id'));

    /* Make sure images are deleted from DOM before adding new ones */
    while (LIGHTBOX_CONTAINER.firstChild) {
        LIGHTBOX_CONTAINER.removeChild(LIGHTBOX_CONTAINER.firstChild);
    }

    /* Show lightbox image */
    LIGHTBOX_CONTAINER.appendChild(lightboxImage);
}

/**
 * Add next image to lightbox
 * @param {string} btn 
 */
const showNextImage = (btn) => {
    let images = document.querySelectorAll('.image-gallery-item');
    let currentImage = document.getElementById('image-gallery-item--active');

    /* Filter next image from image array */
    let newImage = Array.from(images)
        .filter(function (image) {
            /* Get image ID's*/
            let imageId = parseInt(image.getAttribute('data-id'));
            let currentId = parseInt(currentImage.getAttribute('data-id'));

            /* Get next image ID*/
            let nextId = btn == 'right' ? currentId + 1 : currentId - 1;

            /* Guard clauses */
            if (btn == 'left' && currentId === 0) return; // Index 0 and user pressed button left
            if (btn == 'right' && currentId === Array.from(images).length) return; // At the last index and user pressed right button

            /* Return desired element */
            if (imageId == nextId) {
                return image
            }
        });

    /* Add next image to DOM */
    if (Array.isArray(newImage) && newImage.length) {
        addImageToLightbox(newImage[0]);
    }
}


/**
 * Set lightbox element attributes and append to body
 * @param {*} 
 */
const setLightboxAttributes = () => {
    /* Set lightbox element attributes */
    LIGHTBOX_BACKDROP.id = 'lightbox';
    LIGHTBOX_BUTTON_LEFT.id = 'lightbox-btn--left';
    LIGHTBOX_BUTTON_RIGHT.id = 'lightbox-btn--right';
    LIGHTBOX_BUTTON_CLOSE.id = 'lightbox-btn--close';

    /* Append elements */
    document.body.appendChild(LIGHTBOX_BACKDROP);
    LIGHTBOX_BACKDROP.appendChild(LIGHTBOX_CONTAINER);
    LIGHTBOX_BACKDROP.appendChild(LIGHTBOX_BUTTON_CLOSE);
    LIGHTBOX_BACKDROP.appendChild(LIGHTBOX_BUTTON_LEFT);
    LIGHTBOX_BACKDROP.appendChild(LIGHTBOX_BUTTON_RIGHT);
}

/**
 * Load lightbox images when clicked
 * @param {*} 
 */
const loadLightboxImages = () => {
    let images = document.querySelectorAll('.image-gallery-item');
    images.forEach((image, index) => {
        image.setAttribute('data-id', index);
        image.addEventListener('click', e => {
            LIGHTBOX_BACKDROP.classList.add('active');
            addImageToLightbox(image);
        });
    });
}

/** 
 * Load lightbox
 */
(async () => {
    try {
        /**
         * Set lightbox image attributes
         */
        setLightboxAttributes();

        /**
         * Load lightbox images to full screen when user clicks on it
         */
        loadLightboxImages();

        /** 
         * Add event listeners for buttons
         */
        LIGHTBOX_BUTTON_CLOSE.addEventListener('click', e => {
            LIGHTBOX_BACKDROP.classList.remove('active');
        });

        LIGHTBOX_BUTTON_LEFT.addEventListener('click', e => {
            showNextImage('left');
        });

        LIGHTBOX_BUTTON_RIGHT.addEventListener('click', e => {
            showNextImage('right');
        });

    } catch (err) {
        console.error(err);
    }
})();
