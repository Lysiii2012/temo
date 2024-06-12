document.addEventListener('DOMContentLoaded', () => {
    // Clone image element
    const container = document.querySelector('.inner-block-ran-text');
    if (container) {
        const imgElement = container.querySelector('img');
        if (imgElement) {
            const duplicateCount = 6;
            for (let i = 1; i < duplicateCount; i++) {
                const clone = imgElement.cloneNode(true);
                container.appendChild(clone);
            }
        }
    }
    
    // Reveal text animation
    const texts = document.querySelectorAll('.reveal-text p');
    if (texts.length > 0) {
        texts.forEach(text => {
            const textContent = text.textContent;
            text.innerHTML = '';
            for (let char of textContent) {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; 
                span.style.opacity = '0';  
                text.appendChild(span);
            }
        });
    
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = Array.from(entry.target.querySelectorAll('span'));
                    const indices = spans.map((_, index) => index);
                    shuffleArray(indices);  
    
                    indices.forEach((index, i) => {
                        setTimeout(() => {
                            spans[index].style.opacity = '1';
                        }, i * 0.5);  
                    });
    
                    observer.unobserve(entry.target);  
                }
            });
        }, { threshold: 0.1 });
    
        texts.forEach(text => observer.observe(text));
    }

    // Mouse circle effect on project items
    const circle = document.querySelector('.mouse-circl');
    const projectItem = document.querySelectorAll('.progict-item');
    if (circle && projectItem.length > 0) {
        projectItem.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.appendChild(circle);
                item.classList.add('hovered');
                circle.style.display = 'flex';
            });
    
            item.addEventListener('mouseleave', () => {
                circle.style.display = 'none';
                item.classList.remove('hovered');
            });
    
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                circle.style.top = `${offsetY - circle.offsetHeight / 2}px`;
                circle.style.left = `${offsetX - circle.offsetWidth / 2}px`;
            });
        });
    }

    // Pop-up form functionality
    const popUpBtn = document.querySelectorAll('.call-back');
    const popForm = document.querySelector('.pop-up-form');
    const closePopUp = document.querySelector('.close-pop-up');
    const body = document.body;
    if (popUpBtn.length > 0 && popForm && closePopUp) {
        popUpBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                popForm.classList.add('active');
                body.classList.add('overlay');
            });
        });
    
        closePopUp.addEventListener('click', (e) => {
            e.preventDefault();
            popForm.classList.remove('active');
            body.classList.remove('overlay');
        });
    
        document.addEventListener('click', (e) => {
            if (!popForm.contains(e.target) && !Array.from(popUpBtn).some(btn => btn.contains(e.target))) {
                popForm.classList.remove('active');
                body.classList.remove('overlay');
            }
        });
    }

    // Scroll animation for list items
    document.addEventListener('scroll', () => {
        const listItems = document.querySelectorAll('.list-result li');
        if (listItems.length > 0) {
            const triggerOffset = window.innerHeight * 0.9;
            listItems.forEach(item => {
                const itemOffset = item.getBoundingClientRect().top;
                if (itemOffset < triggerOffset) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });

    // Toggle active class for questions
    const questions = document.querySelectorAll('.question');
    if (questions.length > 0) {
        questions.forEach(item => {
            item.addEventListener('click', () => { 
                questions.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }

    // Close politic item
    const closePolitic = document.querySelector('.close-box');
    const politicItem = document.querySelector('.polit-box');
    if (closePolitic && politicItem) {
        closePolitic.addEventListener('click', (e) => {
            e.preventDefault();
            politicItem.style.left = '-100%';
        });
    }

    // Mobile navigation toggle
    const burgerNav = document.querySelector('.burger-nav');
    const mobNav = document.querySelector('.header-nav');
    if (burgerNav && mobNav) {
        burgerNav.addEventListener('click', (e) => {
            e.preventDefault();
            burgerNav.classList.toggle('active');
            mobNav.classList.toggle('active');
        });
    
        document.addEventListener('click', (e) => {
            if (!mobNav.contains(e.target) && !burgerNav.contains(e.target)) {
                burgerNav.classList.remove('active');
                mobNav.classList.remove('active');
            }
        });
    }

    // Toggle service items
    const servicesItems = document.querySelectorAll('.services-item');
    if (servicesItems.length > 0) {
        servicesItems.forEach(item => {
            const header = item.querySelector('h3');
            if (header) {
                header.addEventListener('click', () => {
                    item.classList.toggle('active');
                    const revealText = item.querySelector('.reveal-text');
                    if (revealText) {
                        if (item.classList.contains('active')) {
                            revealText.style.maxHeight = revealText.scrollHeight + 'px';
                        } else {
                            revealText.style.maxHeight = '0';
                        }
                    }
    
                    servicesItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherRevealText = otherItem.querySelector('.reveal-text');
                            if (otherRevealText) {
                                otherRevealText.style.maxHeight = '0';
                            }
                        }
                    });
                });
            }
        });
    }

    // Responsive partners list
    const ulElements = document.querySelectorAll('.partners ul');
    if (ulElements.length >= 2) {
        const firstUl = ulElements[0];
        const secondUl = ulElements[1];
    
        const handleResize = () => {
            if (window.innerWidth <= 767) { 
                while (secondUl.firstChild) {
                    firstUl.appendChild(secondUl.firstChild);
                } 
                secondUl.classList.add('hidden');
            } else { 
                secondUl.classList.remove('hidden');
            }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    }

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    if (links.length > 0) {
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Toggle more projects
    const moreProjectLink = document.querySelector('.more-project');
    const projectItems = document.querySelectorAll('.progict-item');
    if (moreProjectLink && projectItems.length > 0) {
        projectItems.forEach((item, index) => {
            if (index >= 6) {
                item.style.display = 'none';
            }
        });
    
        const toggleMoreProjects = () => {
            let shouldShowMore = false;
            projectItems.forEach((item, index) => {
                if (index >= 6 && index < 11) {  
                    item.style.display = item.style.display === 'none' ? 'block' : 'none';
                    if (item.style.display === 'block') {
                        shouldShowMore = true;
                    }
                }
            });
            moreProjectLink.textContent = shouldShowMore ? 'Менше проектів' : 'Більше проєктів';
            moreProjectLink.classList.toggle('upArrow', shouldShowMore);
        };
    
        moreProjectLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMoreProjects();
        });
    }
});
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
});