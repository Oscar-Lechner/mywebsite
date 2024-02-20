function createFish() {
    const aquarium = document.getElementById('aquarium');
    const fish = document.createElement('img');
    fish.src = '../img/fishnew.png'; // Path to your fish image
    fish.classList.add('fish');
    fish.style.left = '-100px'; // Start off-screen
    fish.style.top = Math.random() * (aquarium.offsetHeight - 100) + 'px'; // Random vertical position

    aquarium.appendChild(fish);

    const speed = Math.random() * 2 + 1; // Random speed
    const swimInterval = setInterval(() => {
        fish.style.left = parseInt(fish.style.left) + speed + 'px';
        if (parseInt(fish.style.left) > aquarium.offsetWidth) {
            clearInterval(swimInterval); // Stop the interval when the fish swims off-screen
            aquarium.removeChild(fish); // Remove the fish from the DOM
        }
    }, 20);
}

// Generate a new fish every few seconds
setInterval(createFish, 3000);
