const body=document.body,nav=document.getElementById('nav'),langBtn=document.getElementById('langBtn');
window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('done'),400));
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
langBtn.addEventListener('click',()=>{const ar=!body.classList.contains('ar');body.classList.toggle('ar',ar);document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';langBtn.textContent=ar?'EN':'ع';document.querySelectorAll('[data-en]').forEach(el=>el.innerHTML=el.dataset[ar?'ar':'en'])});
const menu=document.getElementById('mobileMenu'),menuBtn=document.getElementById('menuBtn');
menuBtn.addEventListener('click',()=>menu.classList.toggle('open'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filters .active').classList.remove('active');btn.classList.add('active');document.querySelectorAll('.project').forEach(p=>p.classList.toggle('hidden',btn.dataset.filter!=='all'&&p.dataset.category!==btn.dataset.filter))}));
const lightbox=document.getElementById('lightbox'),lightboxImg=document.getElementById('lightboxImg');
document.querySelectorAll('.project').forEach(p=>p.querySelector('.project-img').addEventListener('click',()=>{lightboxImg.src=p.dataset.src;lightbox.classList.add('open');body.style.overflow='hidden'}));
function closeLightbox(){lightbox.classList.remove('open');body.style.overflow=''}
document.getElementById('closeLightbox').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

// Subtle perspective movement for portfolio cards on pointer devices.
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('.project').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1100px) rotateX(${-y*3.5}deg) rotateY(${x*4.5}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

// Scroll parallax gives the page a continuous spatial feel.
let ticking=false;
addEventListener('scroll',()=>{
  if(ticking)return;
  ticking=true;
  requestAnimationFrame(()=>{
    const y=scrollY;
    document.querySelector('.hero-img').style.transform=`scale(1.08) translate3d(0,${y*.09}px,-20px)`;
    document.querySelectorAll('.project-img img').forEach((img,i)=>{
      const r=img.getBoundingClientRect();
      if(r.bottom>0&&r.top<innerHeight) img.style.transform=`scale(1.08) translateY(${(r.top-innerHeight/2)*-.025}px)`;
    });
    ticking=false;
  });
},{passive:true});
