  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.12});
    revealEls.forEach(el => io.observe(el));
  } else { revealEls.forEach(el => el.classList.add('in')); }

  const navA = document.querySelectorAll('nav.links a');
  const spySections = ['about','stack','projects','contact'].map(id => document.getElementById(id));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navA.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`nav.links a[href="#${entry.target.id}"]`);
        if(match) match.classList.add('active');
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px'});
  spySections.forEach(s => s && spy.observe(s));
