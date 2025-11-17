// ===== MENU MOBILE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER FIXO COM SCROLL =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// ===== ANIMAÇÃO DE SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.vehicle-card, .feature-card, .testimonial-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForms = document.querySelectorAll('.contact-form');

contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aqui você pode adicionar a lógica de envio do formulário
        // Por exemplo, enviar para um backend ou serviço de email

        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
    });
});

// ===== FILTROS DE ESTOQUE =====
const filterButton = document.querySelector('.filters-wrapper .btn-primary');

if (filterButton) {
    filterButton.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica de filtragem
        // Por exemplo, fazer uma requisição AJAX para buscar veículos filtrados

        console.log('Filtros aplicados');

        // Scroll suave para os resultados
        const inventorySection = document.querySelector('.inventory-section');
        if (inventorySection) {
            inventorySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===== GALERIA DE IMAGENS (Página de Detalhes) =====
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image img');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Remove active de todas as thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));

        // Adiciona active na thumbnail clicada
        thumbnail.classList.add('active');

        // Troca a imagem principal
        const newImageSrc = thumbnail.querySelector('img').src;
        if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';
            }, 300);
        }
    });
});

// Define a primeira thumbnail como ativa
if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
}

// ===== CONTADOR DE VISUALIZAÇÕES =====
function updateViewCount() {
    const viewCountElement = document.querySelector('.view-count');
    if (viewCountElement) {
        let count = parseInt(localStorage.getItem('viewCount') || '0');
        count++;
        localStorage.setItem('viewCount', count.toString());
        viewCountElement.textContent = count;
    }
}

// ===== BOTÃO VOLTAR AO TOPO =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
    font-size: 20px;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LOADING LAZY PARA IMAGENS =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';

            setTimeout(() => {
                input.style.borderColor = '';
            }, 3000);
        }
    });

    return isValid;
}

// ===== FORMATAÇÃO DE TELEFONE =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }

        e.target.value = value;
    });
});

// ===== COMPARTILHAR VEÍCULO =====
function shareVehicle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback: copiar link
        navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
    }
}

// ===== FAVORITAR VEÍCULO =====
function toggleFavorite(vehicleId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(vehicleId)) {
        favorites = favorites.filter(id => id !== vehicleId);
        console.log('Removido dos favoritos');
    } else {
        favorites.push(vehicleId);
        console.log('Adicionado aos favoritos');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===== CALCULADORA DE FINANCIAMENTO =====
function calculateFinancing(price, downPayment, months, interestRate) {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                    (Math.pow(1 + monthlyRate, months) - 1);

    return {
        monthlyPayment: payment.toFixed(2),
        totalAmount: (payment * months).toFixed(2),
        totalInterest: ((payment * months) - principal).toFixed(2)
    };
}

// ===== COMPARAR VEÍCULOS =====
let compareList = [];

function addToCompare(vehicleId) {
    if (compareList.length < 3 && !compareList.includes(vehicleId)) {
        compareList.push(vehicleId);
        updateCompareButton();
    } else if (compareList.includes(vehicleId)) {
        compareList = compareList.filter(id => id !== vehicleId);
        updateCompareButton();
    } else {
        alert('Você pode comparar no máximo 3 veículos');
    }
}

function updateCompareButton() {
    const compareBtn = document.querySelector('.compare-btn');
    if (compareBtn) {
        compareBtn.textContent = `Comparar (${compareList.length})`;
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Premium Motors - Site carregado com sucesso!');
    updateViewCount();
});

// ===== PREVENÇÃO DE SPAM NO WHATSAPP =====
const whatsappButtons = document.querySelectorAll('[href^="https://wa.me"]');
let lastClickTime = 0;

whatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastClickTime < 3000) {
            e.preventDefault();
            alert('Aguarde alguns segundos antes de enviar outra mensagem');
            return false;
        }
        lastClickTime = now;
    });
});

// ===== DARK MODE (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Carregar preferência de dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== ANALYTICS (Exemplo) =====
function trackEvent(category, action, label) {
    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', { category, action, label });
}

// Rastrear cliques em veículos
document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('click', () => {
        trackEvent('Vehicle', 'Click', card.querySelector('h3').textContent);
    });
});
