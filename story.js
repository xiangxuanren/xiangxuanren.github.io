(() => {
  const scene=document.querySelector('.scene');if(!scene||!Element.prototype.animate)return;
  const T=80, duration=50000, animations=[], ns='http://www.w3.org/2000/svg';
  const $=s=>scene.querySelector(s), chapters=[0,20,46,62], buttons=[...scene.querySelectorAll('[data-chapter]')];
  // Original story coordinates remain intact; viewing time follows each chapter's density.
  // Seeing 8s, Thinking 20s (GETok + ThinkAxis), Understanding 10s, World Intelligence 12s.
  const pacing=[[0,0],[20,8],[46,28],[62,38],[80,50]];
  function mapTime(value,from,to){
    const index=pacing.findIndex((point,i)=>i<pacing.length-1&&value<=pacing[i+1][from]);
    const [a,b]=index<0?pacing.slice(-2):[pacing[index],pacing[index+1]];
    const fraction=Math.max(0,Math.min(1,(value-a[from])/(b[from]-a[from])));
    return a[to]+fraction*(b[to]-a[to]);
  }
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,visible=true,inView=true,raf=0,last=-1;
  const beats=[
  {
    "at": 0,
    "quote": "Perception reveals structure across space and time."
  },
  {
    "at": 20,
    "quote": "A shared visual vocabulary gives perception a language for thought."
  },
  {
    "at": 32,
    "quote": "Reasoning takes shape when models can act on what they see."
  },
  {
    "at": 46,
    "quote": "Understanding connects things, their relations, and how they change."
  },
  {
    "at": 62,
    "quote": "Imagine how the world unfolds, and learn through interaction."
  }
];
  function node(tag,attrs,parent){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.append(e);return e;}
  function text(parent,x,y,label,cls=''){const e=node('text',{x,y,'text-anchor':'middle',class:cls},parent);e.textContent=label;return e;}
  function path(parent,d,cls='ink'){return node('path',{d,class:cls},parent);}
  function circle(parent,x,y,r=7,cls='entity'){return node('circle',{cx:x,cy:y,r,class:cls},parent);}
  function animate(el,frames){const target=typeof el==='string'?$(el):el;const a=target.animate(frames.map(([t,p])=>({offset:mapTime(t,0,1)/(duration/1000),...p})),{duration,iterations:Infinity,fill:'both',easing:'linear'});animations.push(a);return a;}
  function pose(el,keys){return animate(el,keys.map(([t,transform])=>[t,{transform,easing:'cubic-bezier(.4,0,.25,1)'}]));}
  function appear(el,at,opacity=1){animate(el,[[0,{opacity:0}],[at,{opacity:0}],[at+1,{opacity}],[78,{opacity}],[79.5,{opacity:0}],[80,{opacity:0}]]);}
  function transient(el,start,end){animate(el,[[0,{opacity:0}],[start,{opacity:0}],[start+1,{opacity:1}],[end-1,{opacity:1}],[end,{opacity:0}],[80,{opacity:0}]]);}
  // The opening is temporary scenery; what survives is a representation of the observation.
  transient('.opening-house',0,5);transient('.opening-tree',0,5);transient('.opening-car',0,5);
  pose('.opening-car',[[0,'translateX(0)'],[3,'translateX(0)'],[10,'translateX(70px)'],[11,'translateX(70px)'],[80,'translateX(0)']]);
  // One scene, four complementary perception tasks, all retained in the final representation.
  function drawIn(el,at,span=2){const length=el.getTotalLength();el.style.strokeDasharray=length;animate(el,[[0,{strokeDashoffset:length}],[at,{strokeDashoffset:length}],[at+span,{strokeDashoffset:0}],[78,{strokeDashoffset:0}],[80,{strokeDashoffset:length}]]);}
  function box(parent,x,y,w,h,d,cls='ink'){return path(parent,`M${x} ${y}h${w}v${h}h${-w}Z m0 0 ${d} ${-d}h${w}v${h}l${-d} ${d}m0 ${-h} ${d} ${-d}M${x+w+d} ${y+h-d}h${-w}l${-d} ${d}M${x+d} ${y-d}v${h}`,cls);}
  function asset(parent,name,x,y,w,h=w){return node('image',{href:`assets/${name}.svg`,x,y,width:w,height:h},parent);}
  // Four recognizable task outputs, rather than an unlabeled geometric abstraction.
  const time=$('.idea-time svg');time.setAttribute('viewBox','0 0 220 150');
  const lanes=node('g',{},time);asset(lanes,'car',34,18,27);path(lanes,'M11 51L30 11 M75 51L61 11','blue');path(lanes,'M40 47L44 39m3-9 2-6','trail');text(lanes,45,67,'3D lanes');appear(lanes,0);
  const detection=node('g',{},time);asset(detection,'car',137,18,38);const bb=box(detection,131,21,43,28,9,'gold');drawIn(bb,3,2);text(detection,162,67,'3D detection');appear(detection,2);
  const occ=node('g',{},time);asset(occ,'tree',23,79,46);for(let i=0;i<12;i++){const x=18+(i%4)*12,y=122-Math.floor(i/4)*12;const v=box(occ,x,y,9,8,3,i%3?'blue':'gold');appear(v,6+i*.25,.6);}text(occ,48,147,'occupancy');appear(occ,5);
  const tr=node('g',{},time);asset(tr,'car',119,91,28).setAttribute('opacity','.25');asset(tr,'car',147,83,28).setAttribute('opacity','.45');asset(tr,'car',174,76,28);const trail=path(tr,'M127 124Q161 115 191 104','gold');drawIn(trail,11,4);text(tr,162,147,'tracking · same ID');appear(tr,10);
  // GETok's central idea: one vocabulary for linguistic descriptions and anchored visual references.
  const grid=$('.idea-grid svg');grid.setAttribute('viewBox','0 0 220 150');
  text(grid,110,14,'“the cat by the flowers”');
  const shared=node('g',{},grid);text(shared,110,47,'words  +  spatial tokens');path(shared,'M24 32H196V56H24Z','gold');appear(shared,21);
  for(let x=40;x<=170;x+=26)path(grid,`M${x} 75V127`,'trail');for(let y=75;y<=127;y+=26)path(grid,`M40 ${y}H170`,'trail');
  asset(grid,'cat',62,81,34);asset(grid,'plant-2',123,87,35);
  const anchor=circle(grid,78,101,4,'focus');appear(anchor,23);path(grid,'M74 57L78 92 M148 57L138 93','blue');
  const locate=node('rect',{x:60,y:77,width:38,height:39,rx:2,class:'gold'},grid);appear(locate,25);text(grid,110,148,'visual anchors ↔ language');
  // ThinkAxis: explicit deletion, addition and boundary movement in one shared visual context.
  const action=$('.idea-action svg');circle(action,48,64,21,'entity');circle(action,132,53,12,'entity');text(action,48,18,'target');
  const wrong=node('rect',{x:111,y:34,width:40,height:38,rx:2,class:'obsolete'},action);transient(wrong,33,37);
  const cross=path(action,'M108 31l47 45m0-45-47 45','obsolete');transient(cross,35,38);
  const history=node('rect',{x:18,y:54,width:60,height:28,rx:2,class:'obsolete'},action);appear(history,39,.4);
  const correct=node('rect',{x:18,y:54,width:60,height:28,rx:2,class:'gold'},action);appear(correct,38);
  animate(correct,[[0,{x:'18px',y:'54px',width:'60px',height:'28px'}],[40,{x:'18px',y:'54px',width:'60px',height:'28px'}],[44,{x:'25px',y:'41px',width:'46px',height:'46px'}],[78,{x:'25px',y:'41px',width:'46px',height:'46px'}],[80,{x:'18px',y:'54px',width:'60px',height:'28px'}]]);
  const edge=path(action,'M29 53 Q48 36 67 53','blue');appear(edge,41);text(action,126,89,'edge');path(action,'M110 85L67 49','trail');
  const actionWords=['<delete>','<add>','<move>','<end>'].map((word,i)=>text(action,[24,69,112,155][i],113,word,'tiny')); 
  // Relations name the reference frame instead of pretending positions are absolute.
  const rel=$('.idea-relation svg');rel.setAttribute('viewBox','0 0 220 150');
  asset(rel,'cat',27,64,33);asset(rel,'tree',129,33,65);asset(rel,'plant-2',91,88,33);
  path(rel,'M15 125H204 M15 125V27','ink');text(rel,24,20,'viewpoint');
  const near=path(rel,'M53 96Q69 80 93 103','gold');drawIn(near,47,3);const nearText=text(rel,78,81,'near');appear(nearText,47);
  const hidden=path(rel,'M56 71L138 52','trail');drawIn(hidden,50,2);const hiddenText=text(rel,100,44,'occludes?');appear(hiddenText,50);
  const route=path(rel,'M49 111Q96 141 161 110','blue');drawIn(route,53,3);const routeText=text(rel,120,148,'reachable?');appear(routeText,53);
  const frame=path(rel,'M22 115L51 83 M22 115L67 111','blue');appear(frame,56,.7);
  // A research horizon, deliberately broader than a particular forecasting task.
  const world=$('.idea-world svg');
  path(world,'M20 65Q47 34 77 60 M20 65Q48 94 77 60','trail');text(world,38,22,'observations');
  const latent=node('g',{},world);node('ellipse',{cx:116,cy:63,rx:36,ry:31,class:'gold'},latent);node('ellipse',{cx:116,cy:63,rx:15,ry:31,class:'blue'},latent);path(latent,'M81 63Q116 43 151 63Q116 83 81 63','blue');
  [[99,52],[127,44],[137,73],[110,82]].forEach(([x,y],i)=>{circle(latent,x,y,3,i===3?'focus':'entity');});path(latent,'M99 52L127 44L137 73L110 82Z M99 52L137 73','trail');text(world,117,112,'persistent state');
  for(let i=0;i<3;i++){const line=path(world,`M153 63Q180 ${32+i*30} 219 ${29+i*33}`,i===1?'gold':'trail');drawIn(line,64+i,3);circle(world,219,29+i*33,3,i===1?'focus':'entity');}text(world,203,16,'intervene');
  const feedback=path(world,'M211 105Q125 134 39 90','blue');drawIn(feedback,72,4);path(world,'M39 90l4 8m-4-8 9 1','blue');
  const researchSlides=[['.idea-time',0,20],['.idea-grid',20,32],['.idea-action',32,46],['.idea-relation',46,62],['.idea-world',62,80]];
  researchSlides.forEach(([el,start,end])=>{animate(el,[[0,{opacity:0}],[start,{opacity:0}],[start+1.5,{opacity:1}],[end-1.5,{opacity:1}],[end,{opacity:0}],[80,{opacity:0}]]);});
  // One persistent world. Every stage interprets these SAME entities in these SAME places.
  const journey=$('.concept-journey');
  const garden=node('g',{},journey);appear(garden,0);
  const backdrop=node('g',{},garden);
  const meadow=path(backdrop,'M100 214Q281 207 445 215T688 211','blue');drawIn(meadow,4,4);
  const road=path(backdrop,'M653 220Q759 204 920 221 M653 238Q772 222 920 239','ink');drawIn(road,7,5);
  for(let i=0;i<5;i++)drawIn(path(backdrop,`M${675+i*47} 229l22-1`,'trail'),9+i*.3,1);
  const flowers=node('g',{},garden);asset(flowers,'plant-2',173,138,77);asset(flowers,'flower',188,118,43);appear(flowers,3);
  const cat=node('g',{},garden);asset(cat,'cat',334,146,68);appear(cat,0);
  const tree=node('g',{},garden);asset(tree,'tree-scene',523,67,164);appear(tree,8);
  const car=node('g',{},garden);asset(car,'car',760,143,95);appear(car,5);
  const butterfly=node('g',{},garden);asset(butterfly,'butterfly',257,85,40);appear(butterfly,11);
  const sun=node('g',{},garden);asset(sun,'sun',666,18,60);appear(sun,63);
  const cloud=node('g',{},garden);asset(cloud,'cloud',449,26,89);appear(cloud,64);
  const smallPlants=node('g',{},garden);[119,449,677,887].forEach((x,i)=>asset(smallPlants,'plant-2',x,190-i%2*9,29));appear(smallPlants,65);
  // Ground language in the existing cat, flowers and car; labels become relational phrases later.
  const naming=node('g',{},journey);appear(naming,20);
  const catWord=text(naming,368,126,'cat'),flowerWord=text(naming,210,101,'flowers'),carWord=text(naming,808,141,'car');
  const catAnchor=circle(naming,368,211,4,'focus');const flowerAnchor=circle(naming,210,209,4,'focus');const carAnchor=circle(naming,806,214,4,'focus');
  const utterance=text(naming,350,53,'“the cat beside the flowers”');
  const reference=path(naming,'M345 62Q332 85 365 115','gold');drawIn(reference,23,3);
  const target=node('rect',{x:323,y:138,width:91,height:80,rx:6,class:'gold'},naming);appear(target,25);
  animate(target,[[0,{x:'323px',width:'91px'}],[34,{x:'323px',width:'91px'}],[43,{x:'331px',width:'74px'}],[78,{x:'331px',width:'74px'}],[80,{x:'323px',width:'91px'}]]);
  // Meaningful relations grow within the scene instead of replacing it with a graph.
  const relations=node('g',{},journey);appear(relations,46);
  const beside=path(relations,'M250 177Q291 148 330 178','gold');drawIn(beside,46,3);const besideWord=text(relations,292,153,'beside');appear(besideWord,47);
  const above=path(relations,'M265 111Q233 118 227 142','blue');drawIn(above,49,2);const aboveWord=text(relations,295,91,'above');appear(aboveWord,49);
  const under=path(relations,'M405 185Q469 161 570 184','gold');drawIn(under,51,3);const shadeWord=text(relations,478,170,'left of the tree');appear(shadeWord,52);
  const onRoad=path(relations,'M805 235v15h73','blue');drawIn(onRoad,54,2);const roadWord=text(relations,876,267,'on the road');appear(roadWord,55);
  // The world stage links nature, motion, hidden state and counterfactual interaction.
  const whole=node('g',{},journey);appear(whole,62);
  const growth=path(whole,'M678 69Q537 5 226 121','gold');drawIn(growth,63,4);const growthWord=text(whole,562,18,'light → growth');appear(growthWord,64);
  const rain=path(whole,'M478 89l-9 18m22-15-9 18m-12-7-9 18','blue');appear(rain,65,.7);
  const water=path(whole,'M471 113Q381 79 235 144','blue');drawIn(water,66,3);
  const futureRoute=path(whole,'M406 214Q484 226 552 205Q617 188 682 213','trail');drawIn(futureRoute,67,4);const routeWord=text(whole,516,254,'same world · different actions');appear(routeWord,68);
  const crossing=path(whole,'M693 213Q737 152 776 185','gold');drawIn(crossing,70,3);const futureWord=text(whole,771,109,'what could follow?');appear(futureWord,71);

  [utterance,shadeWord,roadWord,routeWord,futureWord].forEach(e=>e.classList.add('detail-label'));
  [catWord,flowerWord,carWord,besideWord,aboveWord,growthWord].forEach(e=>e.classList.add('core-label'));
  const compact=matchMedia('(max-width:650px)');const resizeWorld=()=>journey.setAttribute('viewBox',compact.matches?'100 -20 830 320':'0 0 1000 280');compact.addEventListener('change',resizeWorld);resizeWorld();
  // World finale: the observer pauses, asks a counterfactual, and reads a shared world.
  const futures=node('g',{},journey);appear(futures,64);
  const safe=path(futures,'M379 202Q471 170 574 198','gold');drawIn(safe,64,5);
  const explore=path(futures,'M379 208Q524 259 721 211','blue');drawIn(explore,66,6);
  const possibleCatA=node('g',{},futures);asset(possibleCatA,'cat',340,159,54);appear(possibleCatA,64,.28);pose(possibleCatA,[[0,'translate(0,0)'],[64,'translate(0,0)'],[69,'translate(206px,-7px)'],[78,'translate(206px,-7px)'],[80,'translate(0,0)']]);
  const possibleCatB=node('g',{},futures);asset(possibleCatB,'cat',340,159,54);appear(possibleCatB,66,.2);pose(possibleCatB,[[0,'translate(0,0)'],[66,'translate(0,0)'],[72,'translate(355px,8px)'],[78,'translate(355px,8px)'],[80,'translate(0,0)']]);
  const memory=path(futures,'M347 214L325 216m-12 1-10 1m-10 1-8 0','trail');drawIn(memory,64,2);
  const unity=path(journey,'M128 252C45 216 68 69 151 48C313-9 781-12 900 83C952 132 943 233 875 260C654 265 324 263 128 252','gold');drawIn(unity,70,6);animate(unity,[[0,{opacity:0}],[70,{opacity:0}],[73,{opacity:.35}],[77,{opacity:.45}],[78,{opacity:.45}],[80,{opacity:0}]]);
  const revisionSignal=circle(journey,940,186,3,'focus');transient(revisionSignal,72,78);pose(revisionSignal,[[0,'translate(0,0)'],[73,'translate(0,0)'],[75,'translate(-235px,-70px)'],[77,'translate(-572px,22px)'],[80,'translate(0,0)']]);
  // Earlier descriptions recede gently so the complete world, rather than its annotations, leads.
  animate(naming,[[0,{opacity:0}],[20,{opacity:0}],[21,{opacity:1}],[62,{opacity:1}],[66,{opacity:.25}],[78,{opacity:.25}],[80,{opacity:0}]]);
  animate(relations,[[0,{opacity:0}],[46,{opacity:0}],[47,{opacity:1}],[64,{opacity:1}],[70,{opacity:.4}],[78,{opacity:.4}],[80,{opacity:0}]]);
  animate('.world-question',[[0,{opacity:0}],[63,{opacity:0}],[64,{opacity:1}],[68,{opacity:1}],[69,{opacity:0}],[72,{opacity:0}],[73,{opacity:1}],[77,{opacity:1}],[79,{opacity:0}],[80,{opacity:0}]]);
  pose('.observer-gaze',[[0,'scaleX(1)'],[62,'scaleX(1)'],[64,'scaleX(-1)'],[76,'scaleX(-1)'],[77,'scaleX(1)'],[80,'scaleX(1)']]);
  pose('.observer-body',[[0,'rotate(0deg)'],[64,'rotate(0deg)'],[65,'rotate(-7deg)'],[67,'rotate(0deg)'],[72,'rotate(0deg)'],[73,'rotate(-5deg)'],[75,'rotate(0deg)'],[80,'rotate(0deg)']]);
  // Gentle animation continues in the same physical space throughout the later stages.
  const flutter=[];for(let t=0;t<=80;t+=2){flutter.push([t,`translate(${t<12?0:Math.sin(t)*11}px,${t<12?0:Math.cos(t)*7}px) rotate(${Math.sin(t)*6}deg)`]);}pose(butterfly,flutter);
  pose(cat,[[0,'translate(0,0)'],[14,'translate(0,0)'],[16,'translate(7px,-3px)'],[18,'translate(0,0)'],[67,'translate(0,0)'],[70,'translate(10px,-3px)'],[74,'translate(0,0)'],[80,'translate(0,0)']]);
  pose(car,[[0,'translate(-30px,0)'],[5,'translate(-30px,0)'],[13,'translate(0,0)'],[64,'translate(0,0)'],[71,'translate(17px,-1px)'],[76,'translate(0,0)'],[80,'translate(-30px,0)']]);
  pose(flowers,[[0,'rotate(0deg)'],[20,'rotate(0deg)'],[40,'rotate(1deg)'],[62,'rotate(0deg)'],[67,'rotate(-2deg)'],[72,'rotate(2deg)'],[78,'rotate(0deg)'],[80,'rotate(0deg)']]);flowers.style.transformOrigin='210px 213px';

  const clock=animate(scene,[[0,{opacity:1}],[80,{opacity:1}]]);
  animate('.observer-actor',[[0,{left:'3%',opacity:1}],[20,{left:'25%',opacity:1}],[46,{left:'55%',opacity:1}],[62,{left:'76%',opacity:1}],[64,{left:'85%',opacity:1}],[76,{left:'85%',opacity:1}],[77,{left:'90%',opacity:1}],[78.5,{left:'93%',opacity:0}],[79,{left:'3%',opacity:0}],[80,{left:'3%',opacity:1}]]);
  animate('.journey-ink',[[0,{width:'4%',opacity:1}],[20,{width:'26%',opacity:1}],[46,{width:'56%',opacity:1}],[62,{width:'77%',opacity:1}],[64,{width:'86%',opacity:1}],[76,{width:'86%',opacity:1}],[77,{width:'91%',opacity:1}],[78.5,{width:'94%',opacity:0}],[79,{width:'4%',opacity:0}],[80,{width:'4%',opacity:1}]]);
  const back=[],front=[],bob=[];for(let i=0;i<=200;i++){const t=i*.4,side=i%2?1:-1,walk=t<62||(t>76&&t<78)||t>=79.2;back.push([t,`rotate(${walk?side*14:0}deg)`]);front.push([t,`rotate(${walk?-side*12:0}deg)`]);bob.push([t,`translateY(${walk&&i%2?-1.5:0}px) rotate(${walk?side:0}deg)`]);}pose('.leg-back',back);pose('.leg-front',front);pose('.walker-pose',bob);
  // Chapter words emerge from the same clock as the walker, then fade with the loop.
  buttons.forEach((button,i)=>{
    const start=chapters[i];
    animate(button,i===0?[[0,{opacity:1}],[78,{opacity:1}],[79.2,{opacity:0}],[79.8,{opacity:0}],[80,{opacity:1}]]:[[0,{opacity:0}],[start,{opacity:0}],[start+1.1,{opacity:1}],[78,{opacity:1}],[79.2,{opacity:0}],[80,{opacity:0}]]);
  });
  const origin=document.timeline.currentTime;animations.forEach(a=>a.startTime=origin);
  function render(){const t=mapTime(((Number(clock.currentTime)||0)%duration)/1000,1,0),index=beats.findLastIndex(b=>t>=b.at);
    if(index!==last){$('#journey-quote').textContent=beats[index].quote;scene.dataset.beat=String(index);last=index;}
    researchSlides.forEach(([selector,start,end])=>{const active=t>=start&&t<end;const slide=$(selector);slide.setAttribute('aria-hidden',String(!active));slide.inert=!active;slide.style.pointerEvents=active?'auto':'none';});
    $('.world-question span').textContent=t<71?'Imagine worlds\nthat respond.':'Learn through\ninteraction.';
    latent.setAttribute('transform',`rotate(${t>=62?Math.sin((t-62)*.6)*4:0} 116 63)`);
    const actionStep=t<37?0:t<41?1:t<45?2:3;actionWords.forEach((word,i)=>{word.style.opacity=i>actionStep?'.18':i===actionStep?'1':'.65';});
    buttons.forEach((b,i)=>{
      const start=chapters[i],end=chapters[i+1]||78,revealed=t>=start&&t<79.2;
      b.setAttribute('aria-pressed',String(t>=start&&t<(chapters[i+1]||T)));
      b.classList.toggle('is-complete',t>=end);
      b.setAttribute('aria-hidden',String(!revealed));b.inert=!revealed;
      // A drawn highlight fills this stage as the walker advances; finished stages stay filled.
      const progress=Math.max(0,Math.min(1,(t-start)/(end-start)));
      b.style.setProperty('--chapter-unfilled',`${(1-progress)*100}%`);
    });
  }
  function tick(){render();raf=requestAnimationFrame(tick);}
  function playback(){cancelAnimationFrame(raf);const run=!paused&&visible&&inView;animations.forEach(a=>run?a.play():a.pause());const b=document.getElementById('toggle-story');b.textContent=paused?'Play':'Pause';b.setAttribute('aria-label',paused?'Play research animation':'Pause research animation');render();if(run)raf=requestAnimationFrame(tick);}
  function seek(ms){animations.forEach(a=>a.currentTime=mapTime(ms/1000,0,1)*1000);render();}
  document.getElementById('toggle-story').addEventListener('click',()=>{paused=!paused;playback();});document.getElementById('restart-story').addEventListener('click',()=>{seek(0);paused=reduce.matches;playback();});
  buttons.forEach((b,i)=>b.addEventListener('click',()=>{seek((chapters[i]+(i===3?2:4))*1000);playback();}));
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;playback();});new IntersectionObserver(([e])=>{inView=e.isIntersecting;playback();},{threshold:.05}).observe(scene);
  reduce.addEventListener('change',e=>{paused=e.matches;if(paused)seek(74000);playback();});if(reduce.matches)seek(74000);playback();
})();
