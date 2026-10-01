(function(){
var d=document.documentElement;
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function put(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function mark(){
  document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===(d.dataset.lang||'pt'))});
  document.querySelectorAll('[data-theme]').forEach(function(b){if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',b.dataset.theme===d.dataset.theme)});
}
function setLang(l){
  document.querySelectorAll('[data-en]').forEach(function(el){
    if(el.dataset.pt===undefined)el.dataset.pt=el.innerHTML;
    el.innerHTML=l==='en'?el.dataset.en:el.dataset.pt;
  });
  d.dataset.lang=l;d.lang=l==='en'?'en':'pt-BR';
  document.title=l==='en'?document.body.dataset.titleEn:document.body.dataset.titlePt;
  put('mf-lang',l);mark();
}
function setTheme(t){d.dataset.theme=t;put('mf-theme',t);mark()}
var btn=document.getElementById('gearBtn'),cfg=document.getElementById('cfg');
btn.addEventListener('click',function(){var o=cfg.hidden;cfg.hidden=!o;btn.setAttribute('aria-expanded',o)});
document.addEventListener('click',function(e){if(!cfg.hidden&&!e.target.closest('.gear-wrap')){cfg.hidden=true;btn.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!cfg.hidden){cfg.hidden=true;btn.setAttribute('aria-expanded','false');btn.focus()}});
cfg.addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  if(b.dataset.lang)setLang(b.dataset.lang);
  if(b.dataset.theme)setTheme(b.dataset.theme);
});
d.dataset.lang='pt';
var l=get('mf-lang');if(l==='en')setLang('en');else mark();
})();
