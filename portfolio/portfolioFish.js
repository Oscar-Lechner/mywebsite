function createFish() {
    const aquarium = document.getElementById('aquarium');
    const fish = document.createElement('img');
    fish.src = '../img/sharknewflipped.png'; // Path to your fish image
    fish.classList.add('fish');
    fish.style.left = Math.random() * (window.innerWidth - 100) + 'px'; // Random horizontal position
    fish.style.top = Math.random() * (window.innerHeight - 100) + 'px'; // Random vertical position
    aquarium.appendChild(fish);

    const speed = Math.random() * 2 + 1; // Random speed
    const direction = Math.random() * 360; // Random direction (in degrees)
    const swimInterval = setInterval(() => {
        const x = parseInt(fish.style.left) + speed * Math.cos(direction * Math.PI / 180);
        const y = parseInt(fish.style.top) + speed * Math.sin(direction * Math.PI / 180);

        fish.style.left = x + 'px';
        fish.style.top = y + 'px';

        // Check if fish is off-screen and remove it
        if (x < -100 || x > window.innerWidth || y < -100 || y > window.innerHeight) {
            clearInterval(swimInterval);
            aquarium.removeChild(fish);
        }
    }, 20);
}

// Generate a new fish every few seconds
setInterval(createFish, 3000);