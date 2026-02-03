// Global elements
const title = document.getElementById('title');
const photo = document.getElementById('photo');
const music = document.getElementById('bg-music');
let musicPlaying = false;

// Fireworks Canvas Setup
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create twinkling stars (100 for density)
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        starsContainer.appendChild(star);
    }
}

// Enhanced balloons with more variety
function createBalloons() {
    const balloonsContainer = document.getElementById('balloons');
    const emojis = ['🎈', '🎉', '🎂', '🎁', '🎊', '🎇', '💖', '🌈'];
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 8 + 's';
        balloon.style.animationDuration = (Math.random() * 4 + 5) + 's';
        balloonsContainer.appendChild(balloon);
    }
}

// Countdown Timer (to 1 hour from now - customize target time)
function startCountdown() {
    const targetTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour demo
    function updateTimer() {
        const now = new Date();
        const diff = targetTime - now;
        if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('timer').textContent = 
                `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            document.getElementById('timer').textContent = '🎉 TIME TO PARTY! 🎉';
        }
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Epic Fireworks Effect
let fireworks = [];
function createFirework(x, y) {
    const firework = {
        x, y,
        particles: [],
        exploded: false,
        hue: Math.random() * 360
    };
    for (let i = 0; i < 50; i++) {
        firework.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 100,
            decay: 2,
            hue: firework.hue
        });
    }
    fireworks.push(firework);
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((fw, index) => {
        if (!fw.exploded) {
            ctx.fillStyle = `hsl(${fw.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
            ctx.fill();
            fw.exploded = true;
        } else {
            fw.particles.forEach((p, pIndex) => {
                ctx.save();
                ctx.globalAlpha = p.life / 100;
                ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02; // gravity
                p.life -= p.decay;
            });
            fw.particles = fw.particles.filter(p => p.life > 0);
        }
        if (fw.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

// Shake Effect on Click
function shakeElement(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'shake 0.5s';
    }, 10);
}

document.addEventListener('click', (e) => {
    shakeElement(title);
    createFirework(e.clientX, e.clientY);
});

// Ultimate Surprise Launcher
function launchEpicSurprise() {
    // Confetti mega burst
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.5 },
                colors: ['#ff6b6b', '#ffd93d', '#4ecdc4', '#23a6d5']
            });
        }, i * 300);
    }
    
    // Fireworks barrage
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.3);
        }, i * 200);
    }
    
    // Shake everything
    shakeElement(title);
    shakeElement(photo.parentElement);
    
    // Photo spin
    photo.style.animation = 'spin 2s infinite linear';
    setTimeout(() => photo.style.animation = '', 3000);
}

// Music Toggle
function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        document.getElementById('music-toggle').textContent = '🔊 Play Music';
        musicPlaying = false;
    } else {
        music.play().catch(e => console.log('Audio play failed'));
        document.getElementById('music-toggle').textContent = '🔇 Stop Music';
        musicPlaying = true;
    }
}

// Share Function
function shareSurprise() {
    if (navigator.share) {
        navigator.share({
            title: 'Epic Birthday Surprise!',
            text: 'Check out this amazing birthday surprise!',
            url: window.location.href
        });
    } else {
        alert('Copy this link to share: ' + window.location.href);
    }
}

// Initialize Everything
window.addEventListener('load', () => {
    createStars();
    createBalloons();
    startCountdown();
    animateFireworks();
    
    // Auto mini-surprise every 10s
    setInterval(() => {
        if (Math.random() > 0.7) {
            confetti({ particleCount: 30, spread: 40 });
            createFirework(Math.random() * canvas.width, canvas.height * 0.2);
        }
    }, 10000);
});

// Add shake keyframes dynamically (needed for JS trigger)
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}`;

const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);
