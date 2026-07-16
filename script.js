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

// Immersive spatial scene: gold dust, light tracking and scroll-driven camera.
const canvas=document.getElementById('ambientCanvas');
const ctx=canvas.getContext('2d',{alpha:false});
let points=[];
function sizeScene(){
  const d=Math.min(devicePixelRatio||1,1.6);
  canvas.width=innerWidth*d;canvas.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);
  points=Array.from({length:Math.min(95,Math.floor(innerWidth/12))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:Math.random(),s:Math.random()*1.4+.25}));
}
function drawScene(t){
  ctx.fillStyle='#030303';ctx.fillRect(0,0,innerWidth,innerHeight);
  const g=ctx.createRadialGradient(innerWidth*.72,innerHeight*.28,0,innerWidth*.72,innerHeight*.28,innerWidth*.6);
  g.addColorStop(0,'rgba(116,82,30,.16)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,innerWidth,innerHeight);
  points.forEach(p=>{p.y-=p.s*(.08+p.z*.13);if(p.y<0)p.y=innerHeight;const a=.12+p.z*.42;ctx.fillStyle=`rgba(220,187,115,${a})`;ctx.beginPath();ctx.arc(p.x,p.y,.25+p.z*1.15,0,Math.PI*2);ctx.fill()});
  requestAnimationFrame(drawScene);
}
sizeScene();addEventListener('resize',sizeScene);requestAnimationFrame(drawScene);

const glow=document.getElementById('cursorGlow');
addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});

function spatialScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('scrollProgress').style.height=(max?scrollY/max*100:0)+'%';
  document.querySelectorAll('.project').forEach((card,i)=>{
    const r=card.getBoundingClientRect();
    const p=Math.max(-1,Math.min(1,(r.top-innerHeight*.1)/innerHeight));
    const frame=card.querySelector('.project-img');
    const image=frame.querySelector('img');
    const side=i%2?1:-1;
    frame.style.transform=`translateZ(45px) rotateY(${p*side*8}deg) rotateX(${p*3}deg) scale(${1-Math.abs(p)*.025})`;
    image.style.transform=`scale(1.1) translate3d(${p*side*18}px,${p*-24}px,0)`;
    image.style.filter=`brightness(${1-Math.abs(p)*.18})`;
  });
  const hero=document.querySelector('.hero-img');
  if(hero)hero.style.transform=`perspective(1200px) translate3d(0,${scrollY*.08}px,0) rotateY(${Math.min(scrollY/220,3)}deg) scale(1.04)`;
  const contact=document.querySelector('.contact>img');
  if(contact){const r=contact.getBoundingClientRect();contact.style.transform=`scale(1.12) translateY(${(r.top-innerHeight/2)*-.025}px)`}
}
addEventListener('scroll',()=>requestAnimationFrame(spatialScroll),{passive:true});spatialScroll();
