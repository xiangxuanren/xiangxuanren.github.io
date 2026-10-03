(() => {
  const hosts=[...document.querySelectorAll('.resonant-name')];
  if(!hosts.length)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0,last=0,inView=true;
  const names=hosts.map(host=>{
    const label=host.querySelector('.name-label'),letters=document.createElement('span');
    letters.className='name-letters';letters.setAttribute('aria-hidden','true');
    // Keep handwritten words intact so shaping and thin strokes survive animation.
    const units=host.classList.contains('tagline-name')?label.textContent.split(/(\s+)/).filter(Boolean):Array.from(label.textContent);
    const glyphs=units.map(c=>{
      const el=document.createElement('span');el.className='name-letter';el.textContent=c;letters.append(el);
      return {el,y:0,v:0,angle:0,angularV:0,center:0};
    });
    host.append(letters);host.classList.add('is-ready');
    return {host,glyphs,chinese:host.lang==='zh',greeting:host.classList.contains('hello')||host.classList.contains('tagline-name'),active:false,x:-1000,energy:0,lastX:0,lastMove:0,radius:65,amplitude:18};
  });
  function measure(){
    names.forEach(n=>{
      const size=parseFloat(getComputedStyle(n.host).fontSize);
      n.radius=n.greeting?32:n.chinese?36:Math.max(44,size*.72);
      n.amplitude=n.greeting?7:n.chinese?8:Math.min(20,Math.max(12,size*.18));
      n.glyphs.forEach(g=>{g.center=g.el.offsetLeft+g.el.offsetWidth/2;});
    });
  }
  function frame(now){
    const dt=Math.min((now-last)/16.667,2);last=now;let moving=false;
    names.forEach(n=>{
      let unsettled=false;
      n.glyphs.forEach(g=>{
        const distance=(g.center-n.x)/n.radius,weight=Math.exp(-distance*distance);
        const target=n.active?-weight*(n.amplitude+n.energy*(n.chinese||n.greeting?2:5)):0;
        const tilt=n.active?Math.max(-3.5,Math.min(3.5,distance*5))*weight:0;
        g.v+=(target-g.y)*.028*dt;g.v*=Math.pow(.84,dt);g.y+=g.v*dt;
        g.angularV+=(tilt-g.angle)*.023*dt;g.angularV*=Math.pow(.83,dt);g.angle+=g.angularV*dt;
        if(Math.abs(g.y-target)>.015||Math.abs(g.v)>.015||Math.abs(g.angle-tilt)>.015||Math.abs(g.angularV)>.015)unsettled=true;
        g.el.style.transform=`translateY(${g.y.toFixed(3)}px) rotate(${g.angle.toFixed(3)}deg)`;
      });
      if(!n.active&&!unsettled)n.glyphs.forEach(g=>{g.y=g.v=g.angle=g.angularV=0;g.el.style.transform='none';});
      n.energy*=Math.pow(.95,dt);
      n.host.dataset.motion=n.active?'resonating':unsettled?'settling':'still';
      moving=moving||n.active||unsettled;
    });
    if(moving&&inView&&!document.hidden&&!reduce.matches)raf=requestAnimationFrame(frame);else raf=0;
  }
  function wake(){if(!raf&&!reduce.matches&&inView&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}}
  function leave(n){n.active=false;n.x=-1000;wake();}
  function leaveAll(){names.forEach(leave);}
  names.forEach(n=>{
    function move(e){
      if(e.pointerType==='touch'&&!e.buttons)return;
      const now=performance.now(),r=n.host.getBoundingClientRect();n.x=e.clientX-r.left;
      n.energy=Math.min(1,Math.abs(n.x-n.lastX)/Math.max(16,now-n.lastMove));n.lastMove=now;n.lastX=n.x;
      n.active=true;wake();
    }
    n.host.addEventListener('pointermove',move);n.host.addEventListener('pointerdown',move);
    n.host.addEventListener('pointerleave',()=>leave(n));n.host.addEventListener('pointercancel',()=>leave(n));
    n.host.addEventListener('pointerup',e=>{if(e.pointerType==='touch')leave(n);});
    new ResizeObserver(measure).observe(n.host);
  });
  document.fonts.ready.then(measure);measure();
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView)leaveAll();else wake();}).observe(document.querySelector('#name'));
  reduce.addEventListener('change',()=>{
    leaveAll();
    if(reduce.matches){cancelAnimationFrame(raf);raf=0;names.forEach(n=>n.glyphs.forEach(g=>{g.y=g.v=g.angle=g.angularV=0;g.el.style.transform='none';}));}
  });

  // Three-note gestures form a larger harmonic arc across successive movements.
  const score=[
    [77,79,84],[83,79,76],
    [76,79,83],[86,84,79],
    [77,81,83],[88,86,81],
    [79,83,86],[84,79,76]
  ];
  const soundButton=document.querySelector('.hero-sound'),soundText=soundButton.querySelector('.sound-text');
  const AudioEngine=window.AudioContext||window.webkitAudioContext;
  let audio=null,master=null,reverb=null,dry=null,enabled=!!AudioEngine,nextPhrase=0,phraseNumber=0,offTimer=0,activation=0,ready=false;
  const voices=new Set();
  function updateSoundControl(){
    const playing=enabled&&ready&&audio?.state==='running';
    soundButton.disabled=!AudioEngine;
    soundButton.dataset.audioState=audio?.state||'locked';
    soundButton.setAttribute('aria-pressed',String(playing));
    soundButton.setAttribute('aria-label',!AudioEngine?'Homepage melody unavailable':playing?'Mute homepage melody':'Enable homepage melody');
    soundText.textContent=!AudioEngine?'Sound unavailable':playing?'Sound on':enabled?'Sound on · tap to start':'Sound off';
  }
  updateSoundControl();
  function initAudio(){
    audio=new AudioEngine();
    const reportState=()=>{if(audio.state!=='running')ready=false;updateSoundControl();};
    audio.addEventListener('statechange',reportState);reportState();
    master=audio.createGain();master.gain.value=0;
    const filter=audio.createBiquadFilter();filter.type='lowpass';filter.frequency.value=4200;filter.Q.value=.4;
    const limiter=audio.createDynamicsCompressor();limiter.threshold.value=-22;limiter.knee.value=18;limiter.ratio.value=3;limiter.attack.value=.02;limiter.release.value=.35;
    master.connect(filter);filter.connect(limiter);limiter.connect(audio.destination);
    dry=audio.createGain();dry.gain.value=.76;dry.connect(master);
    reverb=audio.createConvolver();const length=Math.floor(audio.sampleRate*3.8),impulse=audio.createBuffer(2,length,audio.sampleRate);
    let seed=37;
    for(let ch=0;ch<2;ch++){const data=impulse.getChannelData(ch);let smooth=0;for(let i=0;i<length;i++){seed=(1664525*seed+1013904223)>>>0;smooth=.55*smooth+.45*(seed/4294967296*2-1);data[i]=smooth*Math.min(1,i/(audio.sampleRate*.035))*Math.exp(-i/(audio.sampleRate*.72));}}
    reverb.buffer=impulse;const wet=audio.createGain();wet.gain.value=.28;reverb.connect(wet);wet.connect(master);
  }
  function note(midi,at,velocity,pan=0,bass=false){
    const freq=440*2**((midi-69)/12),position=audio.createStereoPanner();position.pan.value=pan;position.connect(dry);position.connect(reverb);
    // A rounded tine attack, a long fundamental and quickly fading upper modes.
    const partials=bass?[[1,1,3.8],[2,.06,1.8]]:[[1,1,3.4],[2,.095,1.4],[2.756,.04,.65],[5.404,.008,.22]];
    let remaining=partials.length;
    partials.forEach(([ratio,level,decay])=>{
      const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.value=freq*ratio;
      gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(velocity*level,at+(bass?.09:.018));gain.gain.exponentialRampToValueAtTime(.00001,at+decay);
      osc.connect(gain);gain.connect(position);voices.add(osc);
      osc.onended=()=>{osc.disconnect();gain.disconnect();voices.delete(osc);if(--remaining===0)position.disconnect();};osc.start(at);osc.stop(at+decay+.1);
    });
  }
  function playPhrase(position){
    if(!enabled||!audio||audio.state!=='running'||document.hidden)return;
    const now=audio.currentTime;if(now<nextPhrase||voices.size>48)return;
    nextPhrase=now+1.22;
    const movement=Math.max(0,Math.min(1,position)),phrase=score[phraseNumber++%score.length],start=now+.025;
    const pan=(movement-.5)*.36;
    phrase.forEach((m,i)=>note(m,start+[0,.23,.51][i],[.084,.066,.073][i],pan+(i%2?.045:-.045)));
    soundButton.dataset.phrases=String(phraseNumber);
    return true;
  }
  // One instrument across the opening page, including the complete research canvas.
  // Movement is measured in pixels so stationary pointers and tiny jitter stay quiet.
  let pointer=null,travel=0;
  function exploreSound(e){
    if(e.pointerType==='touch'||soundButton.contains(e.target)||!enabled||document.hidden)return;
    if(pointer)travel=Math.min(80,travel+Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y));
    pointer={x:e.clientX,y:e.clientY};
    if(travel<12)return;
    const bounds=e.currentTarget.getBoundingClientRect();
    if(playPhrase((e.clientX-bounds.left)/bounds.width))travel=0;
  }
  document.querySelectorAll('.hero,.site-header').forEach(surface=>{
    surface.addEventListener('pointermove',exploreSound,{passive:true});
    surface.addEventListener('pointerleave',()=>{pointer=null;travel=0;},{passive:true});
    surface.addEventListener('pointercancel',()=>{pointer=null;travel=0;},{passive:true});
  });
  function quietAudio(){
    clearTimeout(offTimer);
    if(audio&&master){master.gain.cancelScheduledValues(audio.currentTime);master.gain.setTargetAtTime(0,audio.currentTime,.12);offTimer=setTimeout(()=>{if(!enabled||document.hidden){voices.forEach(v=>{try{v.stop();}catch{}});audio.suspend().catch(()=>{});}},650);}
  }
  function silence(){
    enabled=false;ready=false;activation++;updateSoundControl();quietAudio();
  }
  async function activateAudio(preview=false){
    if(!enabled||!AudioEngine||document.hidden)return;
    const request=++activation;
    try{
      clearTimeout(offTimer);if(!audio)initAudio();
      // Call resume directly within the trusted gesture, before awaiting it.
      await audio.resume();
      if(request!==activation)return;
      if(!enabled||document.hidden){quietAudio();return;}
      if(audio.state!=='running'){updateSoundControl();return;}
      ready=true;updateSoundControl();
      master.gain.cancelScheduledValues(audio.currentTime);master.gain.setTargetAtTime(.22,audio.currentTime,.35);
      const active=names.find(n=>n.active);
      if(active)playPhrase(active.x/active.host.getBoundingClientRect().width);
      else if(preview)playPhrase(.5);
    }catch{if(request===activation){ready=false;updateSoundControl();}}
  }
  soundButton.addEventListener('click',()=>{
    // A default-on preference is not proof that the browser has unlocked audio.
    if(enabled&&ready&&audio?.state==='running'){silence();return;}
    enabled=true;nextPhrase=0;activateAudio(true);
  });
  // Try on arrival; if blocked, retry directly inside the first trusted gesture.
  function unlockFromGesture(e){
    if(!e.isTrusted||soundButton.contains(e.target)||e.repeat)return;
    if(e.type==='pointerdown'&&e.pointerType!=='mouse')return;
    if(enabled&&(!ready||audio?.state!=='running'))activateAudio(true);
  }
  document.addEventListener('pointerdown',unlockFromGesture,{capture:true});
  document.addEventListener('pointerup',unlockFromGesture,{capture:true});
  document.addEventListener('click',unlockFromGesture,{capture:true});
  document.addEventListener('keydown',unlockFromGesture,{capture:true});
  document.addEventListener('visibilitychange',()=>{leaveAll();if(document.hidden){cancelAnimationFrame(raf);raf=0;quietAudio();}else{wake();if(enabled)activateAudio(phraseNumber===0);}});
  window.addEventListener('pagehide',quietAudio);
  // Allow the hero to paint before preparing the procedural instrument.
  requestAnimationFrame(()=>setTimeout(()=>{if(enabled&&!ready)activateAudio(true);},0));
})();
