'use strict';



//var allProducts = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

// function Product(filename){
//   this.filename = 'images/' + filename;
//   this.name = '';
//   this.shown = 0;
//   this.clicks = 0;

var randomProducts = [];
var counter = 0;
var oldProductIndexes = [];
var images = document.getElementsByClassName('products');


var productArray = [
  new Product('bag', 'images/bag.jpg'),
  new Product('banana', 'images/banana.jpg'),
  new Product('bathroom', 'images/bathroom.jpg'),
  new Product('boots', 'images/boots.jpg'),
  new Product('breakfast', 'images/breakfast.jpg'),
  new Product('bubblegum', 'images/bubblegum.jpg'),
  new Product('chair', 'images/chair.jpg'),
  new Product('cthulhu', 'images/cthulhu.jpg'),
  new Product('dog-duck', 'images/dog-duck.jpg'),
  new Product('dragon', 'images/dragon.jpg'),
  new Product('pen', 'images/pen.jpg'),
  new Product('pet-sweep', 'images/pet-sweep.jpg'),
  new Product('scissors', 'images/scissors.jpg'),
  new Product('shark', 'images/shark.jpg'),
  new Product('sweep', 'images/sweep.png'),
  new Product('tauntaun', 'images/tauntaun.jpg'),
  new Product('unicorn', 'images/unicorn.jpg'),
  new Product('usb', 'images/usb.gif'),
  new Product('water-can', 'images/water-can.jpg'),
  new Product('wine-glass', 'images/wine-glass.jpg')
];

function Product(productName, filepath) {
  this.productName = productName;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

//img.addEventListener('click', pickProduct);


// function generateImageSet() {
//   var img = document.getElementsByClassName('Products');
//   img.innerHTML = '';
//   var fieldset = document.getElementsByTagName('fieldset');
//   setImageAttributes();
  //randomImages();
  // var imageOne = document.getElementsByClassName('products')[0]; // make 46-49 a function
  // imageOne.setAttribute('id', randomProducts[0].productName);
  // imageOne.setAttribute('alt', randomProducts[1].productName);
  // imageOne.setAttribute('src', randomProducts[2].filepath);
//  var imageTwo = document.getElementsByTagName('img')[1];
//}

function randomImages(event) {
  if (counter < 25) {
    var productIndexes = [];
    clickImage(event);
    console.log(event.target);
    for (var i = 0; i < images.length; i++) {
      images.innerHTML = '';
      randomProducts[i] = productArray[Math.floor(Math.random() * productArray.length)];
      var currentProduct = randomProducts[i];
      while (productIndexes.includes(currentProduct) || oldProductIndexes.includes(currentProduct)) {
        currentProduct = productArray[Math.floor(Math.random() * productArray.length)];
      }
      productIndexes[i] = currentProduct;
      images[i].setAttribute('alt', currentProduct.productName);
      images[i].setAttribute('src', currentProduct.filepath);
      images[i].setAttribute('class', 'products');
      currentProduct.timesShown++;
    }
  // console.log(productIndexes.map(function(el){return el.productName;}));
    oldProductIndexes = productIndexes;
    counter++;
    console.log(counter);
  }
}

for (var i = 0; i < images.length; i++){
  images[i].addEventListener('click', randomImages);
};

function clickImage(event) {
  for (var i = 0; i < productArray.length; i++) {
    if (event.target.alt === productArray[i].productName) {
      productArray[i].timesClicked++;
    }
  }
}

// function setImageAttributes() {
//   for (var i = 0; i < document.getElementsByClassName('products').length; i++) {
//     var image = document.getElementsByClassName('products')[i];
//     image.setAttribute('id', randomProduct.productName);
//     image.setAttribute('alt', randomProduct.productName);
//     image.setAttribute('src', randomProduct.filepath);
//     image.setAttribute('class', 'products');
//     randomProduct.timesShown += 1;
//     randomProduct.counter += 1;
//
