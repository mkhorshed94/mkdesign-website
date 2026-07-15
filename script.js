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
