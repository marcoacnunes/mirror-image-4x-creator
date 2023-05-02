const inputImage = document.getElementById('inputImage');
const generateBtn = document.getElementById('generateBtn');
const outputImages = document.getElementById('outputImages');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedImage = null;

const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

const modalImg = document.createElement('img');
modal.appendChild(modalImg);

const modalClose = document.createElement('span');
modalClose.className = 'modal-close';
modalClose.innerHTML = '&times;';
modal.appendChild(modalClose);

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Add this event listener at the end of the script.js file
outputImages.addEventListener('click', (e) => {
    if (e.target.className === 'thumbnail') {
        modalImg.src = e.target.src;
        modal.style.display = 'flex';
    }
});

modal.addEventListener('click', (e) => {
    if (e.target !== modalImg && e.target !== modalClose) {
        modal.style.display = 'none';
    }
});

inputImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            uploadedImage = img;
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

generateBtn.addEventListener('click', () => {
    if (!uploadedImage) {
        alert('Please upload an image first');
        return;
    }

    outputImages.innerHTML = '';

    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');

    // Create the first mirrored image
    canvas1.width = uploadedImage.width * 2;
    canvas1.height = uploadedImage.height;

    ctx1.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);
    ctx1.scale(-1, 1);
    ctx1.drawImage(uploadedImage, -uploadedImage.width * 2, 0, uploadedImage.width, uploadedImage.height);

    const mirroredImage1 = new Image();
    mirroredImage1.src = canvas1.toDataURL();

    mirroredImage1.onload = () => {
        const canvas2 = document.createElement('canvas');
        const ctx2 = canvas2.getContext('2d');

        // Create the second mirrored image
        canvas2.width = canvas1.width;
        canvas2.height = canvas1.height * 2;

        ctx2.drawImage(mirroredImage1, 0, 0, canvas1.width, canvas1.height);
        ctx2.scale(1, -1);
        ctx2.drawImage(mirroredImage1, 0, -canvas1.height * 2, canvas1.width, canvas1.height);

        const finalImage = new Image();
        finalImage.src = canvas2.toDataURL();
        finalImage.className = 'thumbnail';
        outputImages.appendChild(finalImage);
    };
});




downloadBtn.addEventListener('click', () => {
    if (!uploadedImage) {
        alert('Please upload an image first');
        return;
    }

    const zip = new JSZip();
    const folder = zip.folder('mirrored_images');

    const images = outputImages.querySelectorAll('img');
    let count = 0;

    images.forEach((img, index) => {
        fetch(img.src)
            .then(response => response.blob())
            .then(blob => {
                folder.file(`image_${index + 1}.png`, blob);
                count++;

                if (count === images.length) {
                    zip.generateAsync({ type: 'blob' })
                        .then(blob => {
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = 'mirrored_images.zip';
                            link.click();
                        });
                }
            });
    });
});
