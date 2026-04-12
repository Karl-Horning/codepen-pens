const btn = document.querySelector("button");
let ctx;

html2canvas(btn).then((canvas) => {
    ctx = canvas.getContext("2d");
    createParticleCanvas();

    const reductionFactor = 17;

    btn.addEventListener("click", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const width = btn.offsetWidth;
        const height = btn.offsetHeight;
        const colorData = ctx.getImageData(0, 0, width, height).data;
        const bcr = btn.getBoundingClientRect();

        let count = 0;

        for (let localX = 0; localX < width; localX++) {
            for (let localY = 0; localY < height; localY++) {
                if (count % reductionFactor === 0) {
                    const index = (localY * width + localX) * 4;
                    createParticleAtPoint(
                        bcr.left + localX,
                        bcr.top + localY,
                        colorData.slice(index, index + 4)
                    );
                }
                count++;
            }
        }
    });
});

class ExplodingParticle {
    constructor() {
        this.animationDuration = 1000;
        this.speed = {
            x: -5 + Math.random() * 10,
            y: -5 + Math.random() * 10,
        };
        this.radius = 5 + Math.random() * 5;
        this.life = 30 + Math.random() * 10;
        this.remainingLife = this.life;
    }

    draw(ctx) {
        if (this.remainingLife > 0 && this.radius > 0) {
            ctx.beginPath();
            ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.rgbArray[0]}, ${this.rgbArray[1]}, ${this.rgbArray[2]}, 1)`;
            ctx.fill();

            this.remainingLife--;
            this.radius -= 0.25;
            this.startX += this.speed.x;
            this.startY += this.speed.y;
        }
    }
}

let particles = [];

function createParticleAtPoint(x, y, colorData) {
    const particle = new ExplodingParticle();
    particle.rgbArray = colorData;
    particle.startX = x;
    particle.startY = y;
    particle.startTime = Date.now();
    particles.push(particle);
}

let particleCanvas, particleCtx;

function createParticleCanvas() {
    particleCanvas = document.createElement("canvas");
    particleCtx = particleCanvas.getContext("2d");

    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    particleCanvas.style.position = "absolute";
    particleCanvas.style.top = "0";
    particleCanvas.style.left = "0";
    particleCanvas.style.zIndex = "1001";
    particleCanvas.style.pointerEvents = "none";

    document.body.appendChild(particleCanvas);
}

function update() {
    if (particles.length > 0) {
        particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < particles.length; i++) {
            particles[i].draw(particleCtx);
        }

        // Clear the array once the last particle's animation has expired
        const last = particles[particles.length - 1];
        if ((Date.now() - last.startTime) / last.animationDuration > 1) {
            particles = [];
        }
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
