document.addEventListener('DOMContentLoaded', () => {
    // Adiciona efeito de confete quando a página carrega
    createConfetti();

    // Adiciona efeito de clique nos corações
    const hearts = document.querySelectorAll('.hearts span');
    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heart.style.transform = 'scale(1.5)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 200);
        });
    });

    const catContainer = document.getElementById('cat-container');
    const backgroundMusic = document.getElementById('background-music');
    
    // Função para mostrar o gato
    window.showCat = () => {
        catContainer.classList.remove('hidden');
        createConfetti();
        
        // Tenta tocar a música
        try {
            backgroundMusic.play().catch(error => {
                console.log('Reprodução automática bloqueada:', error);
            });
        } catch (error) {
            console.log('Erro ao tocar música:', error);
        }
    };

    // Fecha o container quando clicar fora
    catContainer.addEventListener('click', (e) => {
        if (e.target === catContainer) {
            catContainer.classList.add('hidden');
        }
    });

    // Função otimizada para criar confete
    function createConfetti() {
        const colors = ['#9b4dca', '#6a1b9a', '#ffd700'];
        const confettiCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Posição inicial aleatória
            const startX = Math.random() * window.innerWidth;
            const startY = -20;
            
            // Estilo do confete
            confetti.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                transform: translateZ(0);
            `;
            
            // Adiciona ao DOM
            document.body.appendChild(confetti);
            
            // Anima o confete
            const duration = 3000 + Math.random() * 2000;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = window.innerHeight + 20;
            
            confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => {
                confetti.remove();
            };
        }
    }
});

// Adiciona estilos CSS dinâmicos para o confete e animações
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        opacity: 0.7;
        animation: fall linear forwards;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 