
export const initScrollReveal = () => {
  // Function to check if element is in viewport
  const isInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  };

  // Enhanced reveal effects with staggering
  const handleScrollReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el, index) => {
      if (isInViewport(el)) {
        // Add staggered animation delay for cascade effect
        setTimeout(() => {
          el.classList.add('active');
        }, index * 120); // Staggered delay based on element index
      }
    });

    // Handle premium 3D elements
    const elements3d = document.querySelectorAll('.reveal-3d');
    elements3d.forEach(el => {
      if (isInViewport(el)) {
        el.classList.add('active-3d');
      }
    });

    // Handle fade-in elements with blur
    const fadeElements = document.querySelectorAll('.reveal-fade');
    fadeElements.forEach(el => {
      if (isInViewport(el)) {
        el.classList.add('active-fade');
      }
    });
  };

  // Parallax scroll effect for premium sections
  const handleParallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const scrollPosition = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || '0.5';
      const yPos = -(scrollPosition * parseFloat(speed));
      element.setAttribute('style', `transform: translate3d(0, ${yPos}px, 0)`);
    });
  };

  // Add event listeners for scroll effects
  window.addEventListener('scroll', handleScrollReveal, { passive: true });
  window.addEventListener('scroll', handleParallaxEffect, { passive: true });
  
  // 3D rotation effect on mouse move (subtle)
  const handle3DEffect = () => {
    const cards = document.querySelectorAll('.card-3d');
    
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      cards.forEach((card) => {
        const cardRect = (card as HTMLElement).getBoundingClientRect();
        if (
          e.clientX >= cardRect.left &&
          e.clientX <= cardRect.right &&
          e.clientY >= cardRect.top &&
          e.clientY <= cardRect.bottom
        ) {
          const rotateY = 5 * (x - 0.5);
          const rotateX = -5 * (y - 0.5);
          (card as HTMLElement).style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
          (card as HTMLElement).style.transform = 
            'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
      });
    });
  };
  
  // Initialize all scroll and interactive effects
  handle3DEffect();
  handleScrollReveal();
  handleParallaxEffect();
  
  // Add glossy reflection effect to premium elements
  const addGlossEffect = () => {
    const glossyElements = document.querySelectorAll('.glossy-effect');
    
    glossyElements.forEach(element => {
      const gloss = document.createElement('div');
      gloss.classList.add('gloss-overlay');
      (element as HTMLElement).style.position = 'relative';
      (element as HTMLElement).style.overflow = 'hidden';
      element.appendChild(gloss);
      
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (gloss as HTMLElement).style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
      });
      
      element.addEventListener('mouseleave', () => {
        (gloss as HTMLElement).style.background = 'none';
      });
    });
  };
  
  // Initialize glossy effect
  addGlossEffect();
};
