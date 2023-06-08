window.addEventListener("load", function () {
  // Load the original image
  var originalImage = new Image();
  originalImage.src = "panda500.png";

  // Define the grid size
  var gridSize = { rows: 10, columns: 10 };

  // Wait for the image to load
  originalImage.addEventListener("load", function () {
    // Create the animation
    var animation = spinAnimation(originalImage, gridSize);

    // Get the container element
    var container = document.querySelector(".container");

    // Add the animation frames to the container
    for (var row = 0; row < gridSize.rows; row++) {
      for (var col = 0; col < gridSize.columns; col++) {
        // Create a square element
        var square = document.createElement("div");
        square.className = "square";

        // Create an image element for each square
        var image = document.createElement("img");

        // Set the image source to the corresponding section of the animation
        image.src = animation[row][col].src;

        // Append the image to the square
        square.appendChild(image);

        // Append the square to the container
        container.appendChild(square);
      }
    }
  });
});

function spinAnimation(image, gridSize) {
  // Create a canvas element
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  // Get the 2D rendering context
  var context = canvas.getContext("2d");

  // Split the image into grid squares and spin each square
  var squareSize = Math.floor(image.width / gridSize.columns);
  var animation = [];

  for (var row = 0; row < gridSize.rows; row++) {
    animation[row] = [];

    for (var col = 0; col < gridSize.columns; col++) {
      // Create a temporary canvas for each square
      var tempCanvas = document.createElement("canvas");
      tempCanvas.width = squareSize;
      tempCanvas.height = squareSize;
      var tempContext = tempCanvas.getContext("2d");

      // Draw the corresponding section of the original image onto the temporary canvas
      tempContext.drawImage(
        image,
        col * squareSize,
        row * squareSize,
        squareSize,
        squareSize,
        0,
        0,
        squareSize,
        squareSize
      );

      // Create a new image element from the temporary canvas
      var squareImage = new Image();
      squareImage.src = tempCanvas.toDataURL();

      // Push the square image to the animation array
      animation[row].push(squareImage);
    }
  }

  return animation;
}
