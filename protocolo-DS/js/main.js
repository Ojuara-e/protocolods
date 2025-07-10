// Funcionalidades interativas aprimoradas - Protocolo de Domínio Social

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-mobile');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Tabs para as fases - versão melhorada
    const faseTabs = document.querySelectorAll('.fase-tab');
    const faseContents = document.querySelectorAll('.fase-content');
    
    if (faseTabs.length && faseContents.length) {
        faseTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const faseNum = tab.getAttribute('data-fase');
                
                // Remove active class from all tabs and contents
                faseTabs.forEach(t => t.classList.remove('active'));
                faseContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab and content
                tab.classList.add('active');
                document.getElementById('fase-' + faseNum).classList.add('active');
                
                // Scroll suavemente para o conteúdo da fase em mobile
                if (window.innerWidth <= 768) {
                    const yOffset = -80; // Ajuste para o header fixo
                    const faseContent = document.getElementById('fase-' + faseNum);
                    const y = faseContent.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Contador regressivo
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 3); // 3 dias a partir de hoje
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("dias").innerHTML = days;
        document.getElementById("horas").innerHTML = hours;
        document.getElementById("minutos").innerHTML = minutes;
        document.getElementById("segundos").innerHTML = seconds;
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("contador").innerHTML = "OFERTA ENCERRADA";
        }
    }
    
    if (document.getElementById("contador")) {
        updateCountdown();
        const x = setInterval(updateCountdown, 1000);
    }
    
    // Animação de elementos ao scroll - otimizada para mobile
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = window.innerWidth <= 768 ? 100 : 150; // Menor threshold para mobile
        
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Verificar elementos visíveis no carregamento inicial
    
    // Animação dos números nas métricas
    const metricaNumeros = document.querySelectorAll('.metrica-numero');
    
    function animateNumbers() {
        metricaNumeros.forEach(numero => {
            const target = parseInt(numero.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const startTime = Date.now();
            const startValue = 0;
            
            function updateNumber() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                
                if (elapsed < duration) {
                    const value = Math.floor(easeOutQuad(elapsed, startValue, target, duration));
                    numero.textContent = value + '%';
                    requestAnimationFrame(updateNumber);
                } else {
                    numero.textContent = target + '%';
                }
            }
            
            function easeOutQuad(t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(numero);
        });
    }
    
    if (metricaNumeros.length) {
        animateNumbers();
    }
    
    // Melhorias para experiência mobile
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const yOffset = -70; // Ajuste para o header fixo
            const element = document.querySelector(this.getAttribute('href'));
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        });
    });
    
    // Detecção de toque para melhorar interatividade em mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Aumentar área de clique para elementos interativos em mobile
        const clickableElements = document.querySelectorAll('.btn, .fase-tab, .footer-links a');
        clickableElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            el.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Otimização de carregamento de imagens para mobile
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
