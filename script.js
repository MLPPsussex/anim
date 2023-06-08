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
        image.src = animation.src;

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
  for (var row = 0; row < gridSize.rows; row++) {
    for (var col = 0; col < gridSize.columns; col++) {
      // Calculate the position and angle for each square
      var x = col * squareSize;
      var y = row * squareSize;
      var angle = 360 * (col + row) / (gridSize.columns + gridSize.rows);

      // Draw the rotated square on the canvas
      context.save();
      context.translate(x + squareSize / 2, y + squareSize / 2);
      context.rotate((Math.PI / 180) * angle);
      context.drawImage(
        image,
        -squareSize / 2,
        -squareSize / 2,
        squareSize,
        squareSize,
      );
      context.restore();
    }
  }

  // Create a new image element from the canvas
  var animation = new Image();
  animation.src = canvas.toDataURL();

  return animation;
}
