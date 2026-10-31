var galleryModal = document.getElementById('gallery-modal');
var galleryLink = document.getElementById('gallery-button');
var resumeModal = document.getElementById('resume-modal');
var resumeLink = document.getElementById('resume-button');
var carouselItems = document.querySelectorAll('#resume-modal .carousel-item');
var currentItem = 0;

// Gallery modal
galleryLink.onclick = function(event) {
    event.preventDefault();
    galleryModal.style.display = "block";
}

// Resume modal
resumeLink.onclick = function(event) {
    event.preventDefault();
    resumeModal.style.display = "block";
    carouselItems[currentItem].classList.add('active');
}

// Close modals
var span = document.getElementsByClassName("close");
for (var i = 0; i < span.length; i++) {
    span[i].onclick = function() {
        galleryModal.style.display = "none";
        resumeModal.style.display = "none";
        carouselItems[currentItem].classList.remove('active');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == galleryModal) {
        galleryModal.style.display = "none";
    }
    if (event.target == resumeModal) {
        resumeModal.style.display = "none";
        carouselItems[currentItem].classList.remove('active');
    }
}

// Carousel for the resume modal
var nextButton = document.querySelector('#resume-modal .carousel-button-next');
var prevButton = document.querySelector('#resume-modal .carousel-button-previous');

nextButton.addEventListener('click', function() {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].classList.add('active');
});

prevButton.addEventListener('click', function() {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentItem].classList.add('active');
});

// Image gallery
var images = ['media/images/11.png',
'media/images/20220824_051249.jpg',
'media/images/20220911_141645.jpg',
'media/images/20220911_152431.jpg',
'media/images/IMG_20211212_085005_336.jpg',
'media/images/IMG_20211212_085005_352.jpg',
'media/images/IMG_20220319_094934_952.jpg',
'media/images/IMG_20220416_202753_163.jpg',
'media/images/IMG_20220501_093444_258.jpg',
'media/images/IMG_20220825_154646_386.jpg',
'media/images/IMG_20220913_143039_561.jpg',
'media/images/IMG_20230105_180223_804.jpg',
'media/images/IMG_20230107_165905_249.jpg',
'media/images/IMG_20230604_095215_094.jpg',
'media/images/IMG_20230702_184742.jpg',
'media/images/IMG_20230729_103021756~3.jpg',
'media/images/IMG_2486.jpg',
'media/images/IMG_2588.jpg',
'media/images/IMG_3192.JPEG',
'media/images/PXL_20221218_160945726.jpg',
'media/images/PXL_20230206_150514299.jpg',
'media/images/PXL_20230325_200736036.jpg',
'media/images/PXL_20230330_015319549.jpg',
'media/images/PXL_20230402_162137691.jpg',
'media/images/PXL_20230518_142802053.jpg',
'media/images/PXL_20230617_192206494.jpg',
'media/images/PXL_20230714_191923187.jpg',
'media/images/PXL_20230718_170541088.jpg',
'media/images/PXL_20230731_184028736.jpg',
'media/images/Screenshot_20220624-233708_Bumble.jpg',
'media/images/Screenshot_20220624-233727_Bumble.jpg',
'media/images/Screenshot_20230319-110128.png',
'media/images/stevejoshuatree.jpg', 
'media/images/IMG_20210517_163033_616.jpg',
'media/images/IMG_20210518_155342_559.jpg',
'media/images/IMG_20210809_080655_707.webp', 
'media/images/steve_roux.jpg', 
'media/images/IMG_5042.jpg',
'media/images/IMG_20231015_161857_961.jpg',
'media/images/IMG_20231015_161859_539.jpg',
'media/images/IMG_20231019_084344_012.jpg',
'media/images/PXL_20231007_051519945.jpg']

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

images = shuffle(images);

var currentIndex = 0;
var carouselImage = document.querySelector('.carousel-image');
carouselImage.src = images[currentIndex];

document.querySelector('.carousel-button-previous').addEventListener('click', function() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  carouselImage.src = images[currentIndex];
});

document.querySelector('.carousel-button-next').addEventListener('click', function() {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;    
  carouselImage.src = images[currentIndex];
});

var resizeVideo = function() {
    var video = document.querySelector('#video-section iframe');
    var videoContainer = document.querySelector('.video-container');
    var width = videoContainer.offsetWidth;
    var height = width * (315/560);
    video.style.width = width + 'px';
    video.style.height = height + 'px';
}

window.addEventListener('resize', resizeVideo);
document.addEventListener('DOMContentLoaded', resizeVideo);


// Add new modal for the interview images
var interviewModal = document.getElementById('interview-modal');
var interviewModalImage = document.getElementById('interview-modal-image');

// Add event listeners for each image
var interviewImages = document.querySelectorAll('.interview-image-wrapper img');
interviewImages.forEach(function(img) {
    img.onclick = function(event) {
        event.preventDefault();
        interviewModal.style.display = "block";
        interviewModalImage.src = img.src;
    }
});

// Add event listener for closing the modal
var interviewSpan = document.getElementById("interview-close");
interviewSpan.onclick = function() {
    interviewModal.style.display = "none";
    interviewModalImage.src = "";
}

// Add event listener for clicking outside the modal
window.onclick = function(event) {
    if (event.target == interviewModal) {
        interviewModal.style.display = "none";
        interviewModalImage.src = "";
    }
}
