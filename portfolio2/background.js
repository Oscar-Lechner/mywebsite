let squareSize = 30; // Size of each smaller square
let triangleData = []; // Array to store data for each triangle
let transitionSpeed = 0.09; // Speed of color transitions
let extendedStayMultiplier = 6; // Multiplier for how much longer a clicked triangle stays green

// Colors
let color1 = [50, 50, 50]; // Fixed dark color
let color2; // Random color
let hoverColor; // Complimentary hover color

function setup() {
  createCanvas(windowWidth, document.body.scrollHeight); // Full page canvas
  noStroke();

  // Generate a random color for color2
  color2 = [
    random(75, 150), // Red
    random(75, 150), // Green
    random(75, 190), // Blue
  ];

  // Calculate the hover color as a complimentary average of color1 and color2
  hoverColor = [
    (color1[0] + color2[0]) / -0.75,
    (color1[1] + color2[1]) / 0.75,
    (color1[2] + color2[2]) / 0.75,
  ];

  initializeTriangles(); // Initialize triangle data
}

function draw() {
  background(0); // Black background

  let time = frameCount * 0.02; // Controls the ripple effect speed

  // Translate the canvas based on scroll position
  push();
  translate(0, -window.scrollY);

  // Draw each triangle
  for (let t of triangleData) {
    // Check if the cursor is inside the triangle
    let isHovered = pointInTriangle(mouseX, mouseY + window.scrollY, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3);


    if (isHovered) {
      if (mouseIsPressed) {
        // If clicked, set a longer stay timer and immediately phase to hover color
        t.stayTimer = 30 * extendedStayMultiplier; // Stay longer
        t.hoverProgress = 1;
      } else {
        // Gradually phase towards the hover color
        t.hoverProgress = min(1, t.hoverProgress + transitionSpeed);
        t.stayTimer = 30; // Normal hover timer
      }
    } else if (t.stayTimer > 0) {
      // Stay in the hover color if the timer is still active
      t.stayTimer--;
    } else {
      // Gradually phase back to normal oscillation
      t.hoverProgress = max(0, t.hoverProgress - transitionSpeed);
    }

    // Calculate the ripple effect color
    let factor = (sin(time + t.phaseOffset) + 1) / 2; // Normalized ripple factor
    let baseColor = [
      lerp(color1[0], color2[0], factor),
      lerp(color1[1], color2[1], factor),
      lerp(color1[2], color2[2], factor),
    ];

    // Blend the base color with the hover color based on hover progress
    let r = lerp(baseColor[0], hoverColor[0], t.hoverProgress);
    let g = lerp(baseColor[1], hoverColor[1], t.hoverProgress);
    let b = lerp(baseColor[2], hoverColor[2], t.hoverProgress);

    fill(r, g, b);
    triangle(t.x1, t.y1, t.x2, t.y2, t.x3, t.y3);
  }

  pop(); // Reset canvas transformation
}

function initializeTriangles() {
  triangleData = []; // Reset triangle data
  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      // Add data for the top-left to bottom-right triangle
      triangleData.push({
        x1: x,
        y1: y,
        x2: x + squareSize,
        y2: y,
        x3: x,
        y3: y + squareSize,
        phaseOffset: random(TWO_PI), // Random offset for ripple effect
        hoverProgress: 0, // Tracks how close the color is to the hover color (0 to 1)
        stayTimer: 0, // Timer to keep the triangle in the hover color for a short period
      });

      // Add data for the bottom-left to top-right triangle
      triangleData.push({
        x1: x + squareSize,
        y1: y,
        x2: x + squareSize,
        y2: y + squareSize,
        x3: x,
        y3: y + squareSize,
        phaseOffset: random(TWO_PI), // Random offset for ripple effect
        hoverProgress: 0, // Tracks how close the color is to the hover color (0 to 1)
        stayTimer: 0, // Timer to keep the triangle in the hover color for a short period
      });
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, document.body.scrollHeight); // Resize the canvas to match the document height
  initializeTriangles(); // Reinitialize triangles for the new canvas size
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  let d1 = sign(px, py, x1, y1, x2, y2);
  let d2 = sign(px, py, x2, y2, x3, y3);
  let d3 = sign(px, py, x3, y3, x1, y1);

  let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(hasNeg && hasPos);
}

function sign(px, py, x1, y1, x2, y2) {
  return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
}
