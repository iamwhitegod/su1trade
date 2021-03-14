const canvas = document.getElementById("canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  let particleArray;

  //create constuctor function
  function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // get mouse position
  let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80),
  };

  window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  // add draw method to particle prototype
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#d99913";
    ctx.fill();
  };

  // Check particle position, check mouse position, move the
  // particle, draw the particle

  Particle.prototype.update = function () {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // check collision detection - mouse position / particle position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }

      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }

      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    // move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // draw particle
    this.draw();
  };

  // check if particle are close enough to draw line bewteen them
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
      for (let b = a; b < particleArray.length; b++) {
        let distance =
          (particleArray[a].x - particleArray[b].x) *
            (particleArray[a].x - particleArray[b].x) +
          (particleArray[a].y - particleArray[b].y) *
            (particleArray[a].y - particleArray[b].y);

        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000;
          ctx.strokeStyle = `rgba(140, 85, 31, ${opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[b].x, particleArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // create particle array
  function init() {
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 4;
      let x = Math.random() * (innerWidth - size * 2);
      let y = Math.random() * (innerHeight - size * 2);
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let color = "#d99913";

      particleArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
  }

  // animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }

    connect();
  }

  init();
  animate();

  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });
}

// export { init, animate };
