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
  
    // Create the first mirrored image (right, down)
function generateFirstMirroredImage() {
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');

    // Create the first mirrored image (right)
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

        // Create the second mirrored image (down)
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
}

// Create the second mirrored image (left, down)
function generateSecondMirroredImage() {
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');

    // Create the first mirrored image (left)
    canvas1.width = uploadedImage.width * 2;
    canvas1.height = uploadedImage.height;

    ctx1.scale(-1, 1);
    ctx1.drawImage(uploadedImage, -uploadedImage.width, 0, uploadedImage.width, uploadedImage.height);
    ctx1.scale(-1, 1);
    ctx1.drawImage(uploadedImage, uploadedImage.width, 0, uploadedImage.width, uploadedImage.height);

    const mirroredImage1 = new Image();
    mirroredImage1.src = canvas1.toDataURL();

    mirroredImage1.onload = () => {
        const canvas2 = document.createElement('canvas');
        const ctx2 = canvas2.getContext('2d');

        // Create the second mirrored image (down)
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
}

// Create the third mirrored image (up, left)
function generateThirdMirroredImage() {
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
  
    // Create the first mirrored image (up)
    canvas1.width = uploadedImage.width;
    canvas1.height = uploadedImage.height * 2;
  
    ctx1.drawImage(
      uploadedImage,
      0,
      uploadedImage.height,
      uploadedImage.width,
      uploadedImage.height
    );
    ctx1.scale(1, -1);
    ctx1.drawImage(
      uploadedImage,
      0,
      -uploadedImage.height,
      uploadedImage.width,
      uploadedImage.height
    );
  
    // Reset the context's scale
    ctx1.setTransform(1, 0, 0, 1, 0, 0);
  
    const mirroredImage1 = new Image();
    mirroredImage1.src = canvas1.toDataURL();
  
    mirroredImage1.onload = () => {
      const canvas2 = document.createElement('canvas');
      const ctx2 = canvas2.getContext('2d');
  
      // Create the second mirrored image (left)
      canvas2.width = mirroredImage1.width * 2;
      canvas2.height = mirroredImage1.height;
  
      ctx2.drawImage(
        mirroredImage1,
        mirroredImage1.width,
        0,
        mirroredImage1.width,
        mirroredImage1.height
      );
      ctx2.scale(-1, 1);
      ctx2.drawImage(
        mirroredImage1,
        -mirroredImage1.width,
        0,
        mirroredImage1.width,
        mirroredImage1.height
      );
  
      const finalImage = new Image();
      finalImage.src = canvas2.toDataURL();
      finalImage.className = 'thumbnail';
      finalImage.style.marginTop = '20px'; // Adjust the margin as needed
      outputImages.appendChild(finalImage);
      
      // Adjust the positioning of the fourth image
      const fourthImage = outputImages.querySelector('.thumbnail:nth-child(4)');
      fourthImage.style.marginTop = '20px'; // Adjust the margin as needed
    };
  }
  
  // Create the fourth mirrored image (Up, Left)
  function generateFourthMirroredImage() {
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
  
    // Create the first mirrored image (up)
    canvas1.width = uploadedImage.width;
    canvas1.height = uploadedImage.height * 2;
  
    ctx1.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);
    ctx1.scale(1, -1);
    ctx1.drawImage(
      uploadedImage,
      0,
      -uploadedImage.height * 2,
      uploadedImage.width,
      uploadedImage.height
    );
  
    // Reset the context's scale
    ctx1.setTransform(1, 0, 0, 1, 0, 0);
  
    const mirroredImage1 = new Image();
    mirroredImage1.src = canvas1.toDataURL();
  
    mirroredImage1.onload = () => {
      const canvas2 = document.createElement('canvas');
      const ctx2 = canvas2.getContext('2d');
  
      // Create the second mirrored image (left)
      canvas2.width = mirroredImage1.width * 2;
      canvas2.height = mirroredImage1.height;
  
      ctx2.drawImage(
        mirroredImage1,
        mirroredImage1.width,
        0,
        mirroredImage1.width,
        mirroredImage1.height
      );
      ctx2.scale(-1, 1);
      ctx2.drawImage(
        mirroredImage1,
        -mirroredImage1.width * 2,
        0,
        mirroredImage1.width,
        mirroredImage1.height
      );
  
      const finalImage = new Image();
      finalImage.src = canvas2.toDataURL();
      finalImage.className = 'thumbnail';
      finalImage.style.marginTop = '20px'; // Adjust the margin as needed
      outputImages.appendChild(finalImage);
      
      // Adjust the positioning of the third image
      const thirdImage = outputImages.querySelector('.thumbnail:nth-child(3)');
      thirdImage.style.marginTop = '20px'; // Adjust the margin as needed
    };
  }

generateBtn.addEventListener("click", () => {
  if (!uploadedImage) {
    alert("Please upload an image first");
    return;
  }

  outputImages.innerHTML = "";

  generateFirstMirroredImage();
  generateSecondMirroredImage();
  generateThirdMirroredImage();
  generateFourthMirroredImage();

});