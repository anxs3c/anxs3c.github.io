const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const words = ['Jr Red Team Operator', 'Jr Penetration Tester', 'Active Directory Security'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typed-text');

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 3000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 400);
        return;
    }
    setTimeout(typeEffect, isDeleting ? 40 : 70);
}
typeEffect();

const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const counters = document.querySelectorAll('.stat-number[data-count]');
const statsSection = document.querySelector('.stats-bar');

let animated = false;
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = performance.now();
                const update = (time) => {
                    const progress = Math.min(1, (time - start) / duration);
                    const current = Math.floor(progress * target);
                    counter.textContent = current;
                    if (progress < 1) requestAnimationFrame(update);
                    else counter.textContent = target;
                };
                requestAnimationFrame(update);
            });
        }
    });
}, { threshold: 0.3 });

if (statsSection) observer.observe(statsSection);

document.addEventListener('DOMContentLoaded', function() {
    const allSections = document.querySelectorAll('.projects-section');
    
    allSections.forEach((section, index) => {
        const content = section.querySelector('.collapsible-content');
        const trigger = section.querySelector('.collapsible-trigger');
        
        if (!content || !trigger) return;
        
        const icon = trigger.querySelector('.collapse-icon i');
        
        if (index < 3) {
            content.classList.add('closed');
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
            
            if (icon) {
                icon.className = 'fas fa-chevron-right';
                icon.style.transition = 'transform 0.4s ease';
            }
            trigger.classList.remove('open');
        } else {
            content.classList.remove('closed');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.overflow = 'hidden';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            
            if (icon) {
                icon.className = 'fas fa-chevron-down';
                icon.style.transition = 'transform 0.4s ease';
            }
            trigger.classList.add('open');
        }
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = this.classList.contains('open');
            const targetContent = this.nextElementSibling;
            const targetIcon = this.querySelector('.collapse-icon i');
            
            if (isOpen) {
                this.classList.remove('open');
                
                targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    targetContent.style.maxHeight = '0';
                    targetContent.style.opacity = '0';
                    targetContent.style.transform = 'translateY(-10px)';
                });
                
                if (targetIcon) {
                    targetIcon.style.transform = 'rotate(-90deg)';
                    setTimeout(() => {
                        targetIcon.className = 'fas fa-chevron-right';
                        targetIcon.style.transform = 'rotate(0deg)';
                    }, 300);
                }
                
                setTimeout(() => {
                    targetContent.classList.add('closed');
                    targetContent.style.display = 'none';
                }, 400);
                
            } else {
                this.classList.add('open');
                
                targetContent.classList.remove('closed');
                targetContent.style.display = 'block';
                targetContent.style.maxHeight = '0';
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(-10px)';
                
                if (targetIcon) {
                    targetIcon.className = 'fas fa-chevron-down';
                    targetIcon.style.transform = 'rotate(0deg)';
                }
                
                requestAnimationFrame(() => {
                    const height = targetContent.scrollHeight;
                    targetContent.style.maxHeight = height + 'px';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                });
                
                setTimeout(() => {
                    targetContent.style.maxHeight = 'none';
                    targetContent.style.overflow = 'visible';
                }, 400);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const machineCards = document.querySelectorAll('.machine-card');
    const searchInput = document.getElementById('machineSearch');
    const noResults = document.getElementById('noResults');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const startCount = document.getElementById('startCount');
    const endCount = document.getElementById('endCount');
    const totalCount = document.getElementById('totalCount');
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentFilter = 'all';
    let searchTerm = '';

    function getVisibleCards() {
        let visible = [];
        machineCards.forEach(card => {
            const os = card.dataset.os;
            const status = card.dataset.status;
            const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const techniques = card.querySelector('.machine-techniques')?.textContent.toLowerCase() || '';
            const focus = card.querySelector('.machine-focus')?.textContent.toLowerCase() || '';

            let matchesFilter = currentFilter === 'all';
            if (!matchesFilter) {
                if (currentFilter === 'rooted') matchesFilter = status === 'rooted';
                else if (currentFilter === 'reconstructed') matchesFilter = status === 'reconstructed';
                else if (currentFilter === 'inprogress') matchesFilter = status === 'inprogress';
                else matchesFilter = os === currentFilter;
            }

            const matchesSearch = !searchTerm || 
                name.includes(searchTerm) || 
                techniques.includes(searchTerm) || 
                focus.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                visible.push(card);
            }
        });
        return visible;
    }

    function updateDisplay() {
        const visibleCards = getVisibleCards();
        const totalItems = visibleCards.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = 1;

        machineCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
        });

        setTimeout(() => {
            machineCards.forEach(card => {
                card.style.display = 'none';
            });

            const start = (currentPage - 1) * itemsPerPage;
            const end = Math.min(start + itemsPerPage, totalItems);
            const pageItems = visibleCards.slice(start, end);

            pageItems.forEach((card, index) => {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50 + (index * 80));
            });

            if (totalCount) totalCount.textContent = totalItems;
            if (startCount) startCount.textContent = totalItems > 0 ? start + 1 : 0;
            if (endCount) endCount.textContent = end;

            const totalPagesDisplay = Math.ceil(totalItems / itemsPerPage) || 1;
            const pageNumbersContainer = document.querySelector('.page-numbers');
            if (pageNumbersContainer) {
                pageNumbersContainer.innerHTML = '';
                for (let i = 1; i <= totalPagesDisplay; i++) {
                    const btn = document.createElement('button');
                    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
                    btn.dataset.page = i;
                    btn.textContent = i;
                    btn.addEventListener('click', function() {
                        currentPage = parseInt(this.dataset.page);
                        updateDisplay();
                    });
                    pageNumbersContainer.appendChild(btn);
                }
            }

            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPagesDisplay;

            if (noResults) {
                noResults.style.display = totalItems === 0 ? 'block' : 'none';
            }
        }, 300);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            currentFilter = this.dataset.filter;
            currentPage = 1;
            updateDisplay();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase().trim();
            currentPage = 1;
            updateDisplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updateDisplay();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(getVisibleCards().length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplay();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentPage > 1) {
                currentPage--;
                updateDisplay();
            }
        } else if (e.key === 'ArrowRight') {
            const totalPages = Math.ceil(getVisibleCards().length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplay();
            }
        }
    });

    updateDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const writeupFilters = document.querySelectorAll('.writeup-filter');
    const writeupCards = document.querySelectorAll('.writeup-card');

    function filterWriteups(filterValue) {
        writeupCards.forEach(function(card) {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }

    writeupFilters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            writeupFilters.forEach(function(f) { f.classList.remove('active'); });
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterWriteups(filterValue);
        });
    });
});

const archiveFilters = document.querySelectorAll('.archive-filter');
const archiveItems = document.querySelectorAll('.archive-item');

if (archiveFilters.length) {
    archiveFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            archiveFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            const filterType = this.dataset.filter;
            
            archiveItems.forEach((item, index) => {
                if (filterType === 'all' || item.dataset.year === filterType || item.dataset.type === filterType) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50 + (index * 60));
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const charCount = document.getElementById('charCount');
  const messageField = document.getElementById('contactMessage');

  if (messageField && charCount) {
    messageField.addEventListener('input', function() {
      const len = this.value.length;
      charCount.textContent = len;
      charCount.style.color = len > 1800 ? '#ef4444' : len > 1500 ? '#f59e0b' : '';
    });
  }

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    const existingError = group.querySelector('.field-error');
    if (existingError) existingError.remove();
    group.classList.remove('error', 'success');

    if (field.hasAttribute('required') && !field.value.trim()) {
      group.classList.add('error');
      const error = document.createElement('div');
      error.className = 'field-error';
      error.textContent = 'This field is required.';
      group.appendChild(error);
      return false;
    }

    if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        group.classList.add('error');
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = 'Please enter a valid email address.';
        group.appendChild(error);
        return false;
      }
    }

    if (field.id === 'contactMessage') {
      const len = field.value.trim().length;
      if (len > 0 && len < 10) {
        group.classList.add('error');
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = 'Message must be at least 10 characters.';
        group.appendChild(error);
        return false;
      }
      if (len > 2000) {
        group.classList.add('error');
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = 'Message cannot exceed 2000 characters.';
        group.appendChild(error);
        return false;
      }
    }

    if (field.value.trim()) {
      group.classList.add('success');
    }
    return true;
  }

  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() { validateField(this); });
    input.addEventListener('input', function() {
      if (this.closest('.form-group')?.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      setStatus('Please fix the errors above.', 'error');
      return;
    }

    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setStatus('Sending your message...', 'loading');

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mpqgrapa', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        if (charCount) charCount.textContent = '0';
        form.querySelectorAll('.form-group.success').forEach(el => {
          el.classList.remove('success');
        });
        setTimeout(() => {
          submitBtn.classList.remove('btn-loading');
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }, 3000);
      } else {
        const data = await response.json();
        setStatus(data.error || 'Something went wrong. Please try again.', 'error');
        submitBtn.classList.remove('btn-loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }
    } catch (error) {
      setStatus('Network error. Please check your connection and try again.', 'error');
      submitBtn.classList.remove('btn-loading');
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      console.error('Form submission error:', error);
    }
  });

  function setStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    if (type === 'success') {
      setTimeout(() => {
        if (formStatus.textContent === message) {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }
      }, 5000);
    }
  }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.getElementById('cvButton');
    const cvModal = document.getElementById('cvModal');
    const cvModalClose = document.getElementById('cvModalClose');
    const cvModalBtn = document.getElementById('cvModalBtn');
    
    if (cvButton && cvModal) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        function closeModal() {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        cvModalClose.addEventListener('click', closeModal);
        cvModalBtn.addEventListener('click', closeModal);
        
        cvModal.addEventListener('click', function(e) {
            if (e.target === cvModal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cvModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
    });
    
    if ('ontouchstart' in window) {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.getElementById('cvButton');
    const cvModal = document.getElementById('cvModal');
    const cvModalClose = document.getElementById('cvModalClose');
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    const cvContactBtn = document.querySelector('.cv-contact-btn');
    
    if (cvButton && cvModal) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        function closeModal() {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (cvModalClose) {
            cvModalClose.addEventListener('click', closeModal);
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cvModal.classList.contains('active')) {
                closeModal();
            }
        });
        
        cvModal.addEventListener('click', function(e) {
            if (e.target === cvModal) {
                closeModal();
            }
        });
        
        if (cvDownloadBtn) {
            cvDownloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Coming Soon!';
                    this.style.background = '#00ff88';
                    this.style.color = '#000';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                        this.style.background = '';
                        this.style.color = '';
                    }, 2000);
                }, 1500);
            });
        }
        
        if (cvContactBtn) {
            cvContactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
                setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 300);
            });
        }
    }
});

(function() {
    if (window.location.pathname.endsWith('.html')) {
        var cleanUrl = window.location.pathname.replace(/\.html$/, '');
        var newUrl = window.location.origin + cleanUrl + window.location.search + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }

    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (!link) return;
        
        var href = link.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('mailto')) {
            e.preventDefault();
            var cleanHref = href.replace(/\.html$/, '');
            window.location.href = cleanHref;
        }
    });
})();
class ViewCounter {
  constructor() {
    this.apiBase = 'https://api.hits.sh';
    this.cacheKey = 'anxs3c-counter-data';
    this.cacheDuration = 300000;
    this.slugs = {
      total: 'anxs3c-portfolio',
      writeups: 'anxs3c-writeups',
      today: 'anxs3c-today'
    };
    this.apiAvailable = true;
  }

  getCached(slug) {
    try {
      const data = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
      if (data[slug] && (Date.now() - data[slug].timestamp < this.cacheDuration)) {
        return data[slug].value;
      }
      return null;
    } catch {
      return null;
    }
  }

  setCached(slug, value) {
    try {
      const data = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
      data[slug] = {
        value: value,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch {
    }
  }

  getLocalFallback(slug) {
    try {
      const data = JSON.parse(localStorage.getItem('anxs3c-local-counts') || '{}');
      if (!data[slug]) {
        data[slug] = parseInt(localStorage.getItem(`${slug}-count`) || 0) + 1;
        localStorage.setItem(`${slug}-count`, data[slug]);
        localStorage.setItem('anxs3c-local-counts', JSON.stringify(data));
      }
      return data[slug] || 1;
    } catch {
      return 1;
    }
  }

  incrementLocal(slug) {
    try {
      const data = JSON.parse(localStorage.getItem('anxs3c-local-counts') || '{}');
      data[slug] = (data[slug] || 0) + 1;
      localStorage.setItem('anxs3c-local-counts', JSON.stringify(data));
      localStorage.setItem(`${slug}-count`, data[slug]);
      return data[slug];
    } catch {
      return 1;
    }
  }

  async fetchViews(slug) {
    const cached = this.getCached(slug);
    if (cached !== null) {
      return cached;
    }

    if (!this.apiAvailable) {
      return this.getLocalFallback(slug);
    }

    try {
      const response = await fetch(`${this.apiBase}/${slug}.json`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const views = data.views || 0;
      this.setCached(slug, views);
      return views;
    } catch (error) {
      console.warn(`API error for ${slug}, using local fallback`, error);
      this.apiAvailable = false;
      return this.getLocalFallback(slug);
    }
  }

  formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '—';
    return num.toLocaleString();
  }

  async updateCounter(elementId, slug) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const views = await this.fetchViews(slug);
    el.textContent = this.formatNumber(views);
    
    if (el.textContent === '—' || el.textContent === '0') {
      const local = this.getLocalFallback(slug);
      el.textContent = this.formatNumber(local);
    }
  }

  async updateWriteupCounters() {
    const writeupCards = document.querySelectorAll('.writeup-card');
    
    writeupCards.forEach(async (card) => {
      const counterEl = card.querySelector('.writeup-view-counter .view-count');
      if (!counterEl) return;

      const link = card.querySelector('.writeup-link');
      if (!link) return;

      const href = link.getAttribute('href');
      let slug = 'writeup';
      if (href.includes('support')) slug = 'anxs3c-support';
      else if (href.includes('twomillion')) slug = 'anxs3c-twomillion';
      else if (href.includes('cap')) slug = 'anxs3c-cap';
      else if (href.includes('seapanda')) slug = 'anxs3c-seapanda';
      else if (href.includes('ghostlink')) slug = 'anxs3c-ghostlink';
      else {
        const filename = href.split('/').pop().replace('.html', '');
        slug = `anxs3c-${filename}`;
      }

      const views = await this.fetchViews(slug);
      counterEl.textContent = this.formatNumber(views);
      
      if (counterEl.textContent === '—' || counterEl.textContent === '0') {
        const local = this.getLocalFallback(slug);
        counterEl.textContent = this.formatNumber(local);
      }
    });
  }

  async init() {
    await this.updateCounter('total-views', this.slugs.total);
    await this.updateCounter('writeup-views', this.slugs.writeups);
    await this.updateCounter('today-views', this.slugs.today);
    
    const visitorEl = document.getElementById('visitor-count');
    if (visitorEl) {
      try {
        const totalViews = await this.fetchViews(this.slugs.total);
        const views = typeof totalViews === 'number' ? totalViews : 0;
        const estimatedVisitors = Math.floor(views * 0.3);
        visitorEl.textContent = this.formatNumber(estimatedVisitors);
      } catch (e) {
        const local = this.getLocalFallback(this.slugs.total);
        const estimatedVisitors = Math.floor(local * 0.3);
        visitorEl.textContent = this.formatNumber(estimatedVisitors);
      }
    }
    
    await this.updateWriteupCounters();
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const counter = new ViewCounter();
  await counter.init();
});
