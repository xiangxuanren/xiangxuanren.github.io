const papers=[
  {
    "year": 2026,
    "title": "Grounding Everything in Tokens for Multimodal Large Language Models",
    "authors": "X Ren, Z Wang, L Hou, P Tang, G Wang, C Ma",
    "venue": "CVPR 2026",
    "id": "LkGwnXOMwfcC",
    "paper": "https://arxiv.org/abs/2512.10554",
    "key": "getok",
    "method": "GETok",
    "insight": "Anchoring spatial tokens to the image plane gives language a unified vocabulary for referring to visual regions and progressively refining their locations.",
    "project": "https://getokpage.github.io/",
    "keywords": [
      "Multimodal grounding",
      "Unified vocabulary",
      "Spatial anchors"
    ],
    "category": "Multimodal Large Language Models & World Model",
    "video": "assets/publications/getok-demo.mp4",
    "poster": "assets/publications/getok.webp"
  },
  {
    "year": 2026,
    "title": "Learning Vision-Language-Action World Models for Autonomous Driving",
    "authors": "G Wang, P Tang, X Ren, G Zhao, B Feng, C Ma",
    "venue": "CVPR 2026 Findings",
    "id": "_FxGoFyzp5QC",
    "paper": "https://arxiv.org/abs/2604.09059",
    "key": "vlaworld",
    "method": "VLA-World",
    "insight": "An imagined future becomes useful for planning when the model can reason about it: generate the scene under a proposed action, then use it to refine the trajectory.",
    "project": "https://vlaworld.github.io",
    "keywords": [
      "World models",
      "Predictive imagination",
      "Reflective reasoning"
    ],
    "category": "Multimodal Large Language Models & World Model"
  },
  {
    "year": 2026,
    "title": "PixelPilot: Scalable Vision-Language-Action Models for End-to-End Autonomous Driving",
    "authors": "P Tang, G Wang, X Ren, Z Wang, G Zhao, B Feng, C Ma",
    "venue": "ECCV 2026",
    "id": "Se3iqnhoufwC",
    "paper": "https://arxiv.org/abs/2607.04637",
    "key": "pixelpilot",
    "method": "PixelPilot",
    "insight": "Learning to plan in image space, with 3D lifting deferred to inference, separates driving decisions from camera geometry and enables training across heterogeneous datasets.",
    "project": "https://pixelpilotvla.github.io/",
    "keywords": [
      "Vision–language–action",
      "Image-space planning",
      "Data scaling"
    ],
    "category": "Multimodal Large Language Models & World Model",
    "video": "assets/publications/pixelpilot-demo.mp4",
    "poster": "assets/publications/pixelpilot-poster.jpg"
  },
  {
    "year": 2026,
    "title": "Targeted Structure Completion for Sparse-View 3D Reconstruction in Autonomous Driving",
    "authors": "G Wang, P Tang, X Ren, L Hou, C Ma",
    "venue": "ECCV 2026",
    "id": "roLk4NBRz8UC",
    "paper": "https://arxiv.org/abs/2607.04661",
    "key": "focusgs",
    "method": "FocusGS",
    "insight": "Sparse views leave geometry uncertain in specific regions, so directing Gaussian completion to those regions improves reconstruction without densifying the entire scene.",
    "project": "https://focusgs.github.io/",
    "keywords": [
      "Sparse-view reconstruction",
      "3D Gaussian splatting",
      "Geometric ambiguity"
    ],
    "category": "3D Perception & Autonomous Driving"
  },
  {
    "key": "occtrans",
    "method": "OccTrans",
    "year": 2026,
    "title": "Exploring World Transitions via 3D Occupancy World Model",
    "authors": "G Wang, P Tang, X Ren, C Ma",
    "venue": "ICME 2026 · Oral",
    "project": "https://occtrans.github.io/",
    "insight": "Separating changes caused by the moving observer from changes in the scene lets an occupancy world model learn residual dynamics and preserve consistency over longer forecasts.",
    "keywords": [
      "Occupancy world models",
      "Ego-motion compensation",
      "Temporal dynamics"
    ],
    "category": "Multimodal Large Language Models & World Model"
  },
  {
    "year": 2025,
    "title": "LiteFusion: Taming 3D Object Detectors from Vision-Based to Multi-Modal with Minimal Adaptation",
    "authors": "X Ren, Z Wang, P Tang, G Wang, J Zheng, C Ma",
    "venue": "Preprint · 2025",
    "id": "eQOLeE2rZwMC",
    "paper": "https://arxiv.org/abs/2512.20217",
    "key": "litefusion",
    "method": "LiteFusion",
    "insight": "LiDAR can supply geometry directly to a camera detector, improving 3D detection without a separate point-cloud backbone while retaining the ability to operate when LiDAR is missing.",
    "keywords": [
      "3D object detection",
      "Camera–LiDAR fusion",
      "Efficient adaptation"
    ],
    "category": "3D Perception & Autonomous Driving"
  },
  {
    "year": 2024,
    "title": "Single-Model and Any-Modality for Video Object Tracking",
    "authors": "Z Wu, J Zheng, X Ren, F-A Vasluianu, C Ma, D P Paudel, L Van Gool, R Timofte",
    "venue": "CVPR 2024",
    "id": "2osOgNQ5qMEC",
    "paper": "https://arxiv.org/abs/2311.15851",
    "key": "untrack",
    "method": "Un-Track",
    "insight": "A shared representation learned from RGB paired with depth, thermal, or event data lets one tracker use the available modality without requiring all sensors to appear together.",
    "keywords": [
      "Multimodal tracking",
      "Shared representations",
      "Missing modalities"
    ],
    "category": "Visual Learning & Scene Understanding",
    "figures": [
      {
        "src": "assets/publications/untrack-modalities.png",
        "alt": "Un-Track uses one parameter set to track with RGB paired with depth, thermal or event inputs (paper Figure 1).",
        "width": 535,
        "height": 443
      },
      {
        "src": "assets/publications/untrack-transfer.png",
        "alt": "RGBT234 comparison across fast motion, motion blur, occlusion, scale variation, camera motion and background clutter (paper Figure 6).",
        "width": 897,
        "height": 569
      }
    ]
  },
  {
    "year": 2024,
    "title": "SparseOcc: Rethinking Sparse Latent Representation for Vision-Based Semantic Occupancy Prediction",
    "authors": "P Tang, Z Wang, G Wang, J Zheng, X Ren, B Feng, C Ma",
    "venue": "CVPR 2024",
    "id": "qjMakFHDy7sC",
    "paper": "https://arxiv.org/abs/2404.09502",
    "supp": "IjCSPb-OGe4C",
    "key": "sparseocc",
    "method": "SparseOcc",
    "insight": "Keeping scene features sparse in 3D preserves fine geometry while reducing computation and false occupancy predictions in the largely empty space around the vehicle.",
    "project": "https://pintang1999.github.io/sparseocc.html",
    "keywords": [
      "Semantic occupancy",
      "Sparse 3D representations",
      "Efficient perception"
    ],
    "category": "3D Perception & Autonomous Driving",
    "video": "assets/publications/sparseocc-demo.mp4",
    "poster": "assets/publications/sparseocc-poster.jpg"
  },
  {
    "year": 2025,
    "title": "Bi-Stream Knowledge Transfer for Semi-Supervised 3D Point Cloud Object Detection",
    "authors": "J Zheng, P Tang, X Ren, Z Wang, C Ma",
    "venue": "ICRA 2025",
    "id": "Y0pCki6q_DkC",
    "paper": "https://doi.org/10.1109/ICRA55743.2025.11127349",
    "key": "bikt",
    "method": "BiKT",
    "image": "assets/publications/bikt.png",
    "insight": "Separating confident and ambiguous pseudo-labels into two supervision streams lets a 3D detector learn from uncertain predictions that confidence filtering would otherwise discard.",
    "keywords": [
      "Semi-supervised 3D detection",
      "Bi-stream knowledge transfer",
      "Pseudo-label denoising"
    ],
    "category": "3D Perception & Autonomous Driving"
  },
  {
    "year": 2024,
    "title": "OccGen: Generative Multi-modal 3D Occupancy Prediction for Autonomous Driving",
    "authors": "G Wang, Z Wang, P Tang, J Zheng, X Ren, B Feng, C Ma",
    "venue": "ECCV 2024",
    "id": "UeHWp8X0CEIC",
    "paper": "https://arxiv.org/abs/2404.15014",
    "key": "occgen",
    "method": "OccGen",
    "insight": "Treating occupancy prediction as conditional denoising lets the model progressively recover finer scene details and estimate uncertainty from how its predictions change across refinement steps.",
    "project": "https://occgen-ad.github.io/",
    "keywords": [
      "Generative perception",
      "Diffusion models",
      "Uncertainty estimation"
    ],
    "category": "3D Perception & Autonomous Driving",
    "video": "assets/publications/occgen-demo.mp4",
    "poster": "assets/publications/occgen-poster.jpg"
  },
  {
    "year": 2024,
    "title": "VEON: Vocabulary-Enhanced Occupancy Prediction",
    "authors": "J Zheng, P Tang, Z Wang, G Wang, X Ren, B Feng, C Ma",
    "venue": "ECCV 2024",
    "id": "zYLM7Y9cAGgC",
    "paper": "https://arxiv.org/abs/2407.12294",
    "supp": "Tyk-4Ss8FVUC",
    "key": "veon",
    "method": "VEON",
    "insight": "Adapting pretrained depth and vision–language models lifts open-vocabulary semantics into 3D, enabling occupancy recognition beyond fixed categories without manual semantic labels.",
    "keywords": [
      "Open-vocabulary occupancy",
      "2D-to-3D transfer",
      "Foundation models"
    ],
    "category": "3D Perception & Autonomous Driving"
  },
  {
    "year": 2023,
    "title": "Curiosity-Driven Attention for Anomaly Road Obstacles Segmentation in Autonomous Driving",
    "authors": "X Ren, Min Li, Zhenhua Li, Wentao Wu, Lin Bai, Weidong Zhang",
    "venue": "IEEE TIV 2023",
    "id": "u-x6o8ySG0sC",
    "paper": "https://doi.org/10.1109/TIV.2022.3204714",
    "key": "cudam",
    "method": "CuDAM",
    "insight": "Teaching a segmenter to attend to uncertain regions makes attention a useful anomaly signal, helping reveal unfamiliar road obstacles that ordinary class confidence can miss.",
    "keywords": [
      "Anomaly segmentation",
      "Curiosity-driven attention",
      "Uncertainty estimation"
    ],
    "category": "Visual Learning & Scene Understanding"
  },
  {
    "year": 2021,
    "title": "Robust Monocular 3D Lane Detection with Dual Attention",
    "authors": "Yujie Jin, X Ren, Fengxiang Chen, Weidong Zhang",
    "venue": "ICIP 2021",
    "id": "u5HHmVD_uO8C",
    "key": "dualattention",
    "method": "Dual Attention",
    "insight": "Sharing context across lanes and along their length helps recover 3D lane structure under difficult conditions, while supervising interpolated points improves the fit between sparse predictions.",
    "paper": "https://doi.org/10.1109/ICIP42928.2021.9506296",
    "keywords": [
      "Monocular 3D lanes",
      "Dual attention",
      "Dense supervision"
    ],
    "category": "Visual Learning & Scene Understanding",
    "equalContributors": [
      "Yujie Jin",
      "X Ren"
    ]
  }
];
const fullNames={"X Ren":"Xiangxuan Ren","Z Wang":"Zhongdao Wang","P Tang":"Pin Tang","G Wang":"Guoqing Wang","J Zheng":"Jilai Zheng","C Ma":"Chao Ma","B Feng":"Bailan Feng","L Hou":"Liping Hou","G Zhao":"Guodongfang Zhao","Z Wu":"Zongwei Wu","F-A Vasluianu":"Florin-Alexandru Vasluianu","D P Paudel":"Danda Pani Paudel","L Van Gool":"Luc Van Gool","R Timofte":"Radu Timofte"};

function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function externalLink(url,label){return '<a href="'+escapeHtml(url)+'" target="_blank" rel="noopener">'+label+'</a>';}
const root=document.getElementById('publication-list');
const categories=['Multimodal Large Language Models & World Model','3D Perception & Autonomous Driving','Visual Learning & Scene Understanding'];
for(const category of categories){
 const group=document.createElement('section');group.className='pub-topic-group';
 group.innerHTML='<h3 class="pub-topic">'+escapeHtml(category)+'</h3><div class="topic-papers"></div>';
 for(const paper of papers.filter(p=>p.category===category).sort((a,b)=>Number(b.authors.split(', ')[0]==='X Ren')-Number(a.authors.split(', ')[0]==='X Ren'))){
  const item=document.createElement('article');item.className='paper';item.id='paper-'+paper.key;
  const authors=paper.authors.split(', ').map(author=>{
    const name=author==='X Ren'?'<strong>Xiangxuan Ren</strong>':escapeHtml(fullNames[author]||author);
    return name+(paper.equalContributors?.includes(author)?'<sup aria-label="equal contribution">*</sup>':'');
  }).join(', ');
  const contributionNote=paper.equalContributors?.length?' <span class="equal-contribution">· * Equal contribution</span>':'';
  const image=paper.image||'assets/publications/'+paper.key+(paper.key==='dualattention'?'.svg':'.webp');
  const url=paper.paper||paper.project;
  const still='<a class="paper-figure" href="'+image+'" target="_blank" rel="noopener" aria-label="View '+escapeHtml(paper.method)+' figure"><img src="'+image+'" alt="'+escapeHtml(paper.method)+(paper.key==='dualattention'?' conceptual method diagram':' method overview')+'" width="560" height="250" loading="lazy" decoding="async"></a>';
  const detailFigures=paper.figures?'<div class="paper-figure-pair">'+paper.figures.map(figure=>'<a class="paper-figure" href="'+escapeHtml(figure.src)+'" target="_blank" rel="noopener" aria-label="'+escapeHtml(figure.alt)+'"><img src="'+escapeHtml(figure.src)+'" alt="'+escapeHtml(figure.alt)+'" width="'+figure.width+'" height="'+figure.height+'" loading="lazy" decoding="async"></a>').join('')+'</div>':'';
  const media=detailFigures?'<div class="paper-media-stack paper-figure-collage">'+still+detailFigures+'</div>':paper.video?'<div class="paper-media-stack">'+still+'<div class="paper-figure paper-video"><video muted loop playsinline controls preload="none" poster="'+escapeHtml(paper.poster)+'" data-src="'+escapeHtml(paper.video)+'" aria-label="'+escapeHtml(paper.method)+' research demonstration"></video></div>'+'</div>':still;
  item.innerHTML=media+'<div class="paper-content"><h4>'+externalLink(url,escapeHtml(paper.title))+'</h4><p class="authors">'+authors+'</p><p class="venue '+(paper.venue.startsWith('Preprint')?'preprint':'')+'">'+escapeHtml(paper.venue)+contributionNote+'</p><p class="publication-insight">'+escapeHtml(paper.insight)+'</p><div class="publication-keywords" aria-label="Keywords">'+paper.keywords.map(keyword=>'<span class="keyword">'+escapeHtml(keyword)+'</span>').join('')+'</div></div>';
  const video=item.querySelector('video');
  if(video)video.addEventListener('error',()=>{item.querySelector('.paper-video').remove();},{once:true});
  group.querySelector('.topic-papers').append(item);
 }root.append(group);
}
// Only visible demonstrations run; controls remain available for pausing and full-screen viewing.
const reduceVideoMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const videoObserver=new IntersectionObserver(entries=>{
 for(const {target:video,isIntersecting} of entries){
  video.dataset.visible=String(isIntersecting);
  if(isIntersecting){
   if(!video.getAttribute('src'))video.src=video.dataset.src;
   if(!reduceVideoMotion.matches&&!document.hidden&&!video.dataset.userPaused){video.muted=true;video.play().catch(()=>{});}
  }else{video.dataset.automaticPause='true';video.pause();}
 }
},{threshold:.15});
document.querySelectorAll('.paper-video video').forEach(video=>{
 video.addEventListener('pause',()=>{if(video.dataset.automaticPause){delete video.dataset.automaticPause;}else if(video.dataset.visible==='true'&&!document.hidden){video.dataset.userPaused='true';}});
 video.addEventListener('play',()=>{delete video.dataset.userPaused;delete video.dataset.automaticPause;});
 videoObserver.observe(video);
});
document.addEventListener('visibilitychange',()=>{
 document.querySelectorAll('.paper-video video').forEach(video=>{
  if(document.hidden){video.dataset.automaticPause='true';video.pause();}
  else if(video.dataset.visible==='true'&&!reduceVideoMotion.matches&&!video.dataset.userPaused){video.play().catch(()=>{});}
 });
});
