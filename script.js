/**
 * ==========================================================================
 * RAKESH PORTFOLIO JAVASCRIPT
 * Modern, Modular, Accessible & Production-Ready
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light with LocalStorage)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or default to dark
  const savedTheme = localStorage.getItem('rakesh_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('rakesh_theme', newTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Profile Image Graceful Fallback
  // ------------------------------------------------------------------------
  const profileImg = document.getElementById('profile-img');
  const avatarFallback = document.getElementById('avatar-fallback');

  if (profileImg && avatarFallback) {
    const handleImageError = () => {
      profileImg.classList.add('img-hidden');
      avatarFallback.classList.remove('hidden');
    };

    profileImg.addEventListener('error', handleImageError);

    // If already complete and no natural width (broken image cached)
    if (profileImg.complete && profileImg.naturalWidth === 0) {
      handleImageError();
    }
  }

  // ------------------------------------------------------------------------
  // 3. Header Scroll State, Mobile Navigation & Scroll Progress Bar
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgress = document.getElementById('scroll-progress');
  const floatingTopBtn = document.getElementById('floating-top-btn');

  const handleScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Top Progress Bar
    if (scrollProgress && scrollHeight > 0) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Blurred Header background
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Floating Back-to-Top Button Visibility
    if (floatingTopBtn) {
      if (scrollTop > 350) {
        floatingTopBtn.classList.add('is-visible');
      } else {
        floatingTopBtn.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  // Floating Back to Top Button Click
  if (floatingTopBtn) {
    floatingTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('is-open')) {
        navToggle.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. Active Nav Highlighting on Scroll
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ------------------------------------------------------------------------
  // 5. Typing Animation (Hero Section)
  // ------------------------------------------------------------------------
  const typingTarget = document.getElementById('typing-text');
  const roles = [
    'Data Analyst',
    'Business Intelligence Developer',
    'Finance & Analytics Enthusiast'
  ];

  if (typingTarget) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeRole = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      // If word complete, pause before deleting
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at end of text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeRole, typingSpeed);
    };

    setTimeout(typeRole, 600);
  }

  // ------------------------------------------------------------------------
  // 6. Scroll-Reveal Observer (Fade-Up)
  // ------------------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((element) => revealObserver.observe(element));
  } else {
    reveals.forEach((el) => el.classList.add('is-revealed'));
  }

  // ------------------------------------------------------------------------
  // 7. Animated Stat Counters
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
            const duration = 1600;
            const interval = 30;
            const step = Math.max(1, Math.ceil(target / (duration / interval)));

            const updateCounter = () => {
              count += step;
              if (count >= target) {
                counter.textContent = target;
              } else {
                counter.textContent = count;
                setTimeout(updateCounter, interval);
              }
            };

            updateCounter();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach((stat) => statsObserver.observe(stat));
  }

  // ------------------------------------------------------------------------
  // 8. Animated Skill Progress Bars
  // ------------------------------------------------------------------------
  const skillBars = document.querySelectorAll('.progress-bar');

  if (skillBars.length > 0 && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.25 }
    );

    skillBars.forEach((bar) => skillsObserver.observe(bar));
  } else {
    skillBars.forEach((bar) => {
      bar.style.width = `${bar.getAttribute('data-progress')}%`;
    });
  }

  // ------------------------------------------------------------------------
  // 9. Project Filtering System
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Manage active filter button
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
          // Smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 10. Project Detail Modal
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTags = document.getElementById('modal-tags');
  const modalGithub = document.getElementById('modal-github');
  const modalLive = document.getElementById('modal-live');
  const modalBannerIcon = document.getElementById('modal-banner-icon');

  // Rich metadata for projects
  const projectsData = {
    '1': {
      title: 'Gym Revenue & Expense Dashboard',
      category: 'Dashboards',
      icon: 'fa-chart-pie',
      desc: 'An automated business intelligence solution built for a real gym partnership. It integrates daily receipt logs, operating costs, trainer commission sheets, and renewal trackers into a unified reporting interface.',
      highlights: [
        'Automated monthly P&L calculations that previously required 10+ hours of manual spreadsheet bookkeeping.',
        'Visualized membership churn and seasonal dips, enabling owners to plan summer and new-year promotional discounts.',
        'Formulated custom DAX measures for Revenue Per Active Member (RPAM) and Lifetime Member Value.'
      ],
      tags: ['Power BI', 'Excel', 'DAX Measures', 'Financial Modeling', 'ETL'],
      github: '#',
      live: '#'
    },
    '2': {
      title: 'Student Canteen Demand Analysis',
      category: 'Data Analysis',
      icon: 'fa-chart-column',
      desc: 'An end-to-end data investigation into dining pain points and wait times across campus cafeterias in Chennai, conducted as core market validation for Cruncit.',
      highlights: [
        'Gathered and cleaned 450+ verified college student responses using Pandas and NumPy.',
        'Discovered that 72% of peak lunch congestion occurred within a narrow 25-minute window, justifying a pre-ordering platform model.',
        'Created heatmap visualizations with Seaborn showing meal price sensitivity versus delivery distance.'
      ],
      tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Survey Analytics'],
      github: '#',
      live: '#'
    },
    '3': {
      title: 'Sales Forecasting Model',
      category: 'Machine Learning',
      icon: 'fa-brain',
      desc: 'A machine learning regression pipeline designed to predict future monthly store revenue using historical trends, seasonal markers, and external calendar indicators.',
      highlights: [
        'Engineered lag variables, rolling averages, and cyclical holiday features.',
        'Achieved a Mean Absolute Percentage Error (MAPE) under 7.5% using Scikit-Learn linear regression and cross-validation.',
        'Provided residual diagnostic plots to detect seasonal variance and inventory restock requirements.'
      ],
      tags: ['Python', 'Scikit-Learn', 'Linear Regression', 'Feature Engineering'],
      github: '#',
      live: '#'
    },
    '4': {
      title: 'Financial Statement Analyzer',
      category: 'Data Analysis',
      icon: 'fa-file-invoice',
      desc: 'An automated financial modeling workbook that computes institutional-grade financial ratios, DuPont breakdown, liquidity metrics, and vertical/horizontal P&L comparisons.',
      highlights: [
        'Built automated VBA macros that ingest standard raw ledger sheets and instantly output a 3-statement analysis dashboard.',
        'Formulated DuPont Analysis to isolate Net Profit Margin, Asset Turnover, and Financial Leverage drivers.',
        'Embedded automated conditional formatting checks for covenant compliance and solvency health.'
      ],
      tags: ['Advanced Excel', 'VBA Macros', 'Financial Accounting', 'DuPont Analysis'],
      github: '#',
      live: '#'
    },
    '5': {
      title: 'Customer Churn Prediction',
      category: 'Machine Learning',
      icon: 'fa-user-xmark',
      desc: 'A supervised classification algorithm identifying customer accounts exhibiting high probability of non-renewal, allowing business teams to intervene with targeted retention campaigns.',
      highlights: [
        'Performed outlier clipping, one-hot encoding, and feature scaling on multi-variable customer usage datasets.',
        'Trained and evaluated Logistic Regression with ROC-AUC scoring of 0.84 on held-out test data.',
        'Ranked feature importance to uncover that contract length and customer support call volume were leading churn indicators.'
      ],
      tags: ['Python', 'Logistic Regression', 'ROC-AUC', 'Classification', 'Data Prep'],
      github: '#',
      live: '#'
    },
    '6': {
      title: 'Personal Portfolio Website',
      category: 'Web Development',
      icon: 'fa-laptop-code',
      desc: 'A modern, high-performance, responsive portfolio website built with zero dependencies to exhibit analytical projects, interactive dashboards, and domain expertise.',
      highlights: [
        'Coded from scratch using semantic HTML5, modern CSS3 variables, and modular vanilla JavaScript.',
        'Included theme toggle with persistent storage, custom canvas background particles, and accessible modal navigation.',
        'Achieved fluid responsive layouts across mobile, tablet, and ultra-wide displays without external CSS libraries.'
      ],
      tags: ['HTML5', 'CSS3 Variables', 'Vanilla JS', 'Canvas API', 'Accessible UI'],
      github: '#',
      live: '#'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.desc;
    modalBannerIcon.className = `fa-solid ${data.icon}`;

    // Populate highlights
    modalHighlights.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    // Populate tags
    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalGithub.setAttribute('href', data.github);
    modalLive.setAttribute('href', data.live);

    // Open modal
    projectModal.classList.add('is-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('is-active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Open modal button events
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      if (card) {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Close modal when clicking outside dialog
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-active')) {
      closeProjectModal();
    }
  });

  // ------------------------------------------------------------------------
  // 11. Contact Form Client-Side Validation & Simulation
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (field, errorEl, condition, errorMsg) => {
    if (!condition) {
      field.classList.add('is-invalid');
      errorEl.textContent = errorMsg;
      return false;
    } else {
      field.classList.remove('is-invalid');
      errorEl.textContent = '';
      return true;
    }
  };

  // Live validation on blur
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter your full name (at least 2 characters).');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      validateField(emailInput, emailError, validateEmail(emailInput.value.trim()), 'Please enter a valid email address.');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters long.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter your full name (at least 2 characters).');
      const isEmailValid = validateField(emailInput, emailError, validateEmail(emailInput.value.trim()), 'Please enter a valid email address.');
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters long.');

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // Simulate sending with loading state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Display success banner
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been received. I will reply to <em>${emailInput.value.trim()}</em> shortly.
            </div>
          `;
          formAlert.classList.remove('hidden');
        }

        // Reset form fields
        contactForm.reset();

        // Optional mailto fallback trigger in background
        const mailSubject = encodeURIComponent(document.getElementById('subject')?.value || 'Portfolio Contact Inquiry');
        const mailBody = encodeURIComponent(`Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\n${messageInput.value}`);
        // console.log(`Simulated mailto: mailto:rakesh.dummy@email.com?subject=${mailSubject}&body=${mailBody}`);
      }, 1000);
    });
  }

  // ------------------------------------------------------------------------
  // 12. Current Year in Footer
  // ------------------------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 13. Interactive Subtle Particle / Constellation Canvas Background
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particlesCount = Math.min(Math.floor(width / 24), 50);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(14, 165, 233, 0.35)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particlesCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = htmlRoot.getAttribute('data-theme') === 'dark';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect nearby points with subtle data lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 110) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = isDark ? `rgba(129, 140, 248, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }
});
