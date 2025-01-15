document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparkles = [];
    const colors = ['#d4af37', '#ffd700', '#ffecb3']; // Gold and related tones

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Generate a sparkle
    class Sparkle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 2; // Random size
            this.opacity = 1;
            this.speedX = Math.random() * 2 - 1; // Horizontal movement
            this.speedY = Math.random() * 2 - 1; // Vertical movement
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.sides = Math.floor(Math.random() * 5 + 3); // Random number of sides (3 to 7)
            this.rotation = Math.random() * Math.PI * 2; // Random initial rotation
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02; // Fade out
            this.rotation += 0.1; // Slight rotation effect
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();

            const angleStep = (Math.PI * 2) / this.sides;

            for (let i = 0; i < this.sides; i++) {
                const angle = angleStep * i + this.rotation;
                const x = this.x + Math.cos(angle) * this.size;
                const y = this.y + Math.sin(angle) * this.size;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.closePath();
            ctx.fill();
        }
    }

    // Animate the sparkles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = sparkles.length - 1; i >= 0; i--) {
            sparkles[i].update();
            sparkles[i].draw();
            if (sparkles[i].opacity <= 0) {
                sparkles.splice(i, 1); // Remove faded sparkles
            }
        }
        requestAnimationFrame(animate);
    }

    // Add sparkles on hover
    function addSparkles(e) {
        for (let i = 0; i < 15; i++) {
            sparkles.push(new Sparkle(e.clientX, e.clientY));
        }
    }

    // Attach event listeners to cards
    document.querySelectorAll('.about-person, .service-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => addSparkles(e));
    });

    animate();
});
