var Fm=n=>{throw TypeError(n)};var no=(n,e,t)=>e.has(n)?Fm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function Bm(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const de=[{name:"Blue",hex:3824880,css:"#3a5cf0",pos:[-56,56]},{name:"Red",hex:14693675,css:"#e0352b",pos:[56,-56]},{name:"Green",hex:3129158,css:"#2fbf46",pos:[-56,-56]},{name:"Yellow",hex:15778841,css:"#f0c419",pos:[56,56]}],zs={roman:{name:"Romans",code:"r"},greek:{name:"Greeks",code:"g"},barbarian:{name:"Barbarians",code:"b"}},ol=["roman","greek","barbarian"],Hm=n=>ol.find(e=>zs[e].code===n)||"roman",Gm={ffa:[0,1,2,3],"2v2":[0,1,1,0],"2v1v1":[0,1,2,0],"3v1":[0,1,0,0]},Jd=["A","B","C","D"],Wr={conquest:{name:"Conquest",time:600,title:"Castle Strength",desc:"Knock down every enemy castle. A castle only takes damage from fighters on foot."},dm:{name:"Deathmatch",time:480,title:"Tickets",desc:"Each team has 250 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold."},ctf:{name:"Capture the Fort",time:600,title:"Captures",desc:"A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins."}},Ja={forum:{id:"forum",name:"Forum",desc:"A Roman city. Streets between the houses funnel every army, and four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.",sky:14472902,fog:[70,200],g1:14273972,g2:13154716,g3:11904388,hill:9075814,rock:10195844},colosseum:{id:"colosseum",name:"Colosseum",desc:"An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.",sky:14472902,fog:[80,220],g1:14467214,g2:13479544,g3:12098154,hill:9075814,rock:10195844},desert:{id:"desert",name:"Desert Fort",desc:"A walled fortress on a plateau in the middle of the sands. Four ramps lead up through its gates; hold them and you hold the high ground.",sky:15128248,fog:[70,230],g1:14859650,g2:13804648,g3:12160860,hill:10254928,rock:10848872},wooden:{id:"wooden",name:"Wooden Fort",desc:"Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.",sky:13622752,fog:[60,210],g1:8364106,g2:7113282,g3:6123328,hill:5990997,rock:9080198},valley:{id:"valley",name:"Grass Valley",desc:"Open fields and gentle hills. A ring of rocky outcrops guards the middle with eight passes. Horses shine here; archers need the rocks for cover.",sky:13622752,fog:[60,220],g1:9088336,g2:7772223,g3:6123328,hill:5990997,rock:9408390},dunes:{id:"dunes",name:"Dune Field",desc:"Open sand and scattered fences. Straight fights.",sky:14472902,fog:[70,190],g1:13216120,g2:12096874,g3:11045474,hill:7234136,rock:9273716},river:{id:"river",name:"River Ford",desc:"A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.",sky:13622752,fog:[70,190],g1:8362572,g2:7113282,g3:6123328,hill:5990997,rock:9080198},forest:{id:"forest",name:"Pine Forest",desc:"Dense pine clusters. Trees stop arrows and hide ambushes.",sky:12175536,fog:[34,120],g1:5600058,g2:6455359,g3:4479023,hill:4082740,rock:8027248},frost:{id:"frost",name:"Frost Hill",desc:"A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.",sky:15002866,fog:[60,170],g1:15660022,g2:14147816,g3:12109006,hill:10135218,rock:9344668}},Zd=["captain","foot","arch"],an={captain:{hp:150,dmg:22,reach:1.3,cd:.6,spd:5.4,r:.62,block:.3},foot:{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,cost:40,name:"Footman"},arch:{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,cost:50,name:"Archer",range:22,shoot:2.3,arrow:10,jitter:.8}},al={dmg:30,spd:6.3},Qd=["foot","arch"],eu=[{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,javelin:!1,name:"Footman"},{hp:105,dmg:15,reach:2.1,cd:1,spd:5.2,r:.55,block:.4,javelin:!0,name:"Footman (Arms)"},{hp:130,dmg:16,reach:2.1,cd:1,spd:5,r:.55,block:.45,javelin:!0,name:"Footman (Armor)"}],tu=[{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,range:22,shoot:2.3,arrow:10,jitter:.8,name:"Archer"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:23,shoot:2.1,arrow:11,jitter:.7,name:"Archer (Training)"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:29,shoot:2,arrow:12,jitter:.45,name:"Archer (Marksman)"}],nu=[{hpB:0,dmgB:0,reachB:0,javelin:!1},{hpB:15,dmgB:4,reachB:.3,javelin:!0},{hpB:35,dmgB:7,reachB:.3,javelin:!0}],vo={dmg:24,range:10,cd:6.5},iu=[{name:"Recruit",dmg:.7,income:8},{name:"Soldier",dmg:1,income:10},{name:"Warlord",dmg:1.25,income:12}],cl={humanIncome:10,startGold:60,aiRecruitEvery:[1.5,3]},Vm=["foot","foot","foot","foot","foot","foot","foot","arch","arch","arch"],Wm=["foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","arch","arch","arch","arch","arch","arch"],uo=["follow","hold","charge","testudo"],Ca={follow:"Follow me!",hold:"Hold here!",charge:"Charge!",testudo:"Testudo!"},mi=[{id:"foot1",name:"Arms",desc:"Footmen: spear + javelin throw, better sword & shield",cost:[90]},{id:"foot2",name:"Armor",desc:"Footmen: heavier armor, more HP",cost:[160]},{id:"arch1",name:"Training",desc:"Archers: all-round stat increase",cost:[90]},{id:"arch2",name:"Marksman",desc:"Archers: +range, +accuracy",cost:[160]},{id:"aura",name:"Aura",desc:"Bigger, stronger aura",cost:[80,140,220]},{id:"horse",name:"Horse",desc:"Tougher, faster, back sooner",cost:[80,140,220]}],Ra={range:8,perRange:3,bonus:.1,perBonus:.05},yo=9.5,rr=11,Xm=120,jm=20,ru=250,Mo=3,Go=88,g={role:"solo",state:"title",mode:"conquest",map:Ja.forum,diff:1,preset:"ffa",ALLY:[0,1,2,3],myTi:0,factions:["roman","roman","roman","roman"],seed:1,T:0,units:[],horses:[],arrows:[],teams:[],flag:null,bounty:-1,player:null,layout:null,kills:0,recruited:0,uid:0,arrowN:0,horseN:0,endInfo:null,squadCap:20,duo:[!1,!1,!1,!1]},Ae=n=>n%4,qm=n=>n<4?0:1,Wl=()=>{const n=[0,1,2,3];for(let e=0;e<4;e++)g.duo[e]&&n.push(e+4);return n},gi=(n,e)=>g.ALLY[Ae(n)]!==g.ALLY[Ae(e)],Wi=(n,e)=>g.ALLY[Ae(n.ti)]!==g.ALLY[Ae(e.ti)],Xl=()=>new Set(g.ALLY).size===4,pc={},Tt={on(n,e){(pc[n]||(pc[n]=[])).push(e)},emit(n,e){const t=pc[n];if(t)for(const i of t)i(e)}};function Xr(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Ln=(n,e,t)=>n<e?e:n>t?t:n,ue=(n,e)=>n+Math.random()*(e-n),_i=(n,e)=>{let t=e-n;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t},Fs=(n,e,t)=>n+Ln(_i(n,e),-t,t),jl=[[0,50],[50,0],[0,-50],[-50,0]].map(([n,e])=>{const t=Math.hypot(n,e);return{x:n,z:e,vx:n/t,vz:e/t,rot:Math.atan2(n/t,e/t)}}),gt={hw:9,front:-6,back:6,steps:3,h:1.8},St={r:17.5,wall:18.4,ramp:25,h:2.4,lane:3},$m=[[0,46],[46,0],[0,-46],[-46,0]],sn={r:86,inner:24,gateW:3.4,cycle:60,open:40},su=n=>n%sn.cycle<sn.open,Ym=(n,e,t)=>{const i=e-n.x,r=t-n.z;return[i*n.vz-r*n.vx,i*n.vx+r*n.vz]};function Km(n,e){return 7*Math.exp(-(n*n+e*e)/(2*20*20))}function Pa(n){return Math.abs(n+32)<2.4||Math.abs(n-32)<2.4}function Za(n,e){return g.map.id==="river"&&Math.abs(e)<5&&Math.hypot(n,e)>=7}function ou(n,e){return Za(n,e)&&Math.abs(n)<14}function Jm(n,e){for(const t of jl){if(Math.abs(n-t.x)>13||Math.abs(e-t.z)>13)continue;const[i,r]=Ym(t,n,e);if(!(Math.abs(i)>gt.hw)){if(r>=gt.front&&r<=gt.back)return gt.h;if(r>=gt.front-gt.steps&&r<gt.front)return gt.h*(r-(gt.front-gt.steps))/gt.steps}}return 0}function Zm(n,e){const t=Math.abs(n),i=Math.abs(e);if(t>St.ramp||i>St.ramp)return 0;const r=Math.hypot(n,e);return r<St.r?St.h:r<St.ramp&&Math.min(t,i)<St.lane?St.h*(St.ramp-r)/(St.ramp-St.r):0}function Qm(n,e){let t=0;for(const[i,r]of $m){const s=n-i,a=e-r;Math.abs(s)<30&&Math.abs(a)<30&&(t+=4.5*Math.exp(-(s*s+a*a)/(2*9.5*9.5)))}return t}function Rt(n,e){switch(g.map.id){case"frost":return Km(n,e);case"river":return Math.abs(e)<5.5&&Math.hypot(n,e)>=7?Pa(n)?.38:-.45:0;case"forum":return Jm(n,e);case"desert":return Zm(n,e);case"valley":return Qm(n,e)}return 0}function sr(n,e){const t=Math.hypot(n,e),i=Math.sin(n*.07)*Math.cos(e*.05)+Math.sin(n*.023+e*.031)*1.4;let r=g.map.id==="river"?0:Rt(n,e);if(g.map.id==="river"){const s=Math.abs(e);s<7&&Math.hypot(n,e)>=7.5&&(r=s<5?-.95:-.95*(7-s)/2)}return g.map.id==="desert"&&t>30&&(r+=Math.max(0,i)*Math.min(1,(t-30)/20)*1.2),t>92&&(r+=(t-92)*.25+Math.max(0,i)*((t-92)*.18)),r}function xr(n,e=0,t=0){const i=Math.hypot(n.pos[0],n.pos[1]),r=-n.pos[0]/i,s=-n.pos[1]/i;return[n.pos[0]+r*(yo+2.5+t)+s*e,n.pos[1]+s*(yo+2.5+t)-r*e]}function eg(n,e,t,i,r,s,a,o={}){const c=Math.hypot(i-e,r-t),f=Math.max(1,Math.ceil(c/(s*1.3))),l=[];for(let h=0;h<=f;h++){const d=Object.assign({x:e+(i-e)*h/f,z:t+(r-t)*h/f,r:s},o);l.push(d),n.obstacles.push(d),n.blockers.push({x:d.x,z:d.z,r:s,h:a,gate:o.gate})}return l}function mc(n,e,t,i,r,s,a,o={}){const c=Math.ceil(Math.PI*2*i/(r*1.3));for(let f=0;f<c;f++){const l=f/c*Math.PI*2;if(a&&a(l))continue;const h=Object.assign({x:e+Math.cos(l)*i,z:t+Math.sin(l)*i,r},o);n.obstacles.push(h),s&&n.blockers.push({x:h.x,z:h.z,r,h:s})}}function Qr(n,e,t,i,r,s,a,o){const c={box:!0,x:e,z:t,hw:i,hd:r,rot:s};if(n.obstacles.push(c),a){const f=Math.cos(s),l=Math.sin(s),h=Math.min(i,r);for(let d=-i+h;d<=i-h+.01;d+=h)for(let p=-r+h;p<=r-h+.01;p+=h)n.blockers.push({x:e+d*f+p*l,z:t-d*l+p*f,r:h*1.2,h:a})}return o&&n.buildings.push({x:e,z:t,w:i*2,d:r*2,rot:s,h:a,kind:o}),c}const es=(n,e,t)=>e.some(i=>Math.abs(_i(n,i))<t),qi=[Math.PI/4,3*Math.PI/4,-3*Math.PI/4,-Math.PI/4],br=[0,Math.PI/2,Math.PI,-Math.PI/2];function ql(n,e,t){const i=Xr(t|0),r=(l,h)=>l+i()*(h-l),s={mapId:n,withFort:e,hills:[],palisades:[],rocks:[],trees:[],stones:[],obstacles:[],blockers:[],fortSegments:[],buildings:[],columns:[],towers:[],rings:[],gates:[],palms:[],huts:[],statues:[]},a=(l,h,d)=>de.some(p=>Math.hypot(p.pos[0]-l,p.pos[1]-h)<20+d),o=(l,h,d=0)=>!a(l,h,d)&&Math.hypot(l,h)>(e?12:8)+d&&!(n==="river"&&Math.abs(h)<9);for(let l=0;l<14;l++){const h=l/14*Math.PI*2+r(-.1,.1);s.hills.push({a:h,d:r(150,185),rad:r(18,34),sy:r(.35,.6)})}const c=(l,h=o)=>{for(let d=0;d<l;d++){const p=r(-80,80),_=r(-80,80),x=r(.6,1.7),m=r(0,3),u=r(0,3);h(p,_)&&(s.rocks.push({x:p,z:_,r:x,rx:m,ry:u}),x>1.1&&s.obstacles.push({x:p,z:_,r:x*.9}))}},f=(l,h,d)=>{s.trees.push({x:l,z:h,s:d}),Math.hypot(l,h)<90&&(s.obstacles.push({x:l,z:h,r:.7*d}),s.blockers.push({x:l,z:h,r:1.4*d,h:7}))};if(n==="dunes"){const l=[[-18,6,.4],[16,-8,-.3],[0,24,1.57],[0,-26,1.57],[-30,-8,.9],[30,10,.9],[-8,-40,0],[10,40,0]];for(const[h,d,p]of l){const _=[];for(let x=0;x<9;x++){const m=(x-4)*.66,u=h+Math.cos(p)*m,v=d-Math.sin(p)*m;_.push({x:u,z:v,rot:r(0,3),sy:r(.85,1.1)}),x%2===0&&s.obstacles.push({x:u,z:v,r:.75})}s.palisades.push({x:h,z:d,a:p,logs:_})}c(20)}if(n==="river"){for(let l=0;l<22;l++){const h=r(-14,14),d=r(-4.5,4.5),p=r(.25,.5);Math.hypot(h,d)<7.5||s.stones.push({x:h,z:d,s:p})}c(20)}if(n==="forest"){for(let l=0;l<16;l++){let h,d,p=0;do h=r(-82,82),d=r(-82,82),p++;while(!o(h,d,4)&&p<40);const _=5+Math.floor(i()*6);for(let x=0;x<_;x++){const m=h+r(-6,6),u=d+r(-6,6),v=r(.85,1.35);o(m,u)&&f(m,u,v)}}for(let l=0;l<40;l++){const h=r(0,6.28),d=r(95,130);s.trees.push({x:Math.cos(h)*d,z:Math.sin(h)*d,s:r(1,1.6)})}c(10)}if(n==="frost"&&c(20),n==="forum"){for(const h of jl){const d=(u,v)=>[h.x+u*h.vz+v*h.vx,h.z-u*h.vx+v*h.vz],[p,_]=d(0,3);Qr(s,p,_,6,3,h.rot,6.5);for(const u of[-1,1]){const[v,M]=d(u*(gt.hw+.45),-1.5);Qr(s,v,M,.45,7.5,h.rot,0)}const[x,m]=d(0,gt.back+.45);Qr(s,x,m,gt.hw+.9,.45,h.rot,0);for(let u=-7.5;u<=7.5;u+=3){const[v,M]=d(u,-4.8);s.obstacles.push({x:v,z:M,r:.55}),s.blockers.push({x:v,z:M,r:.55,h:6}),s.columns.push({x:v,z:M,y:gt.h,h:5.2,r:.45})}}const l=[[26,26,6,6],[47,20,5,4],[20,47,4,5],[33,8,4,3.5],[8,33,3.5,4]];for(const[h,d,p,_]of l)for(const[x,m]of[[1,1],[-1,1],[1,-1],[-1,-1]]){const u=h*x,v=d*m,M=5+(Math.abs(u*7+v*3)|0)%3;Qr(s,u,v,p,_,0,M,"house")}for(let h=0;h<Math.PI*2-.01;h+=2.6/17){if(es(h,[...br,...qi],.22))continue;const d=Math.cos(h)*17,p=Math.sin(h)*17;s.obstacles.push({x:d,z:p,r:.5}),s.columns.push({x:d,z:p,y:0,h:4.6,r:.42})}for(const[h,d]of[[11,0],[-11,0],[0,11],[0,-11]])e||(s.obstacles.push({x:h,z:d,r:.9}),s.statues.push({x:h,z:d}))}if(n==="colosseum"){mc(s,0,0,sn.inner,1.2,4.5,l=>es(l,qi,sn.gateW/sn.inner)),s.rings.push({r:sn.inner,h:4.5,gaps:qi,gapW:sn.gateW/sn.inner}),qi.forEach((l,h)=>{const d=Math.cos(l)*sn.inner,p=Math.sin(l)*sn.inner,_=-Math.sin(l),x=Math.cos(l),m={id:h,x:d,z:p,rot:Math.atan2(Math.cos(l),Math.sin(l))+Math.PI/2,w:sn.gateW*2};m.obs=eg(s,d-_*sn.gateW,p-x*sn.gateW,d+_*sn.gateW,p+x*sn.gateW,.9,4,{gate:h+1}),s.gates.push(m)});for(const l of br)for(const h of[44,64]){const d=Math.cos(l)*h,p=Math.sin(l)*h;s.obstacles.push({x:d,z:p,r:1.3}),s.blockers.push({x:d,z:p,r:1.3,h:7}),s.statues.push({x:d,z:p,big:!0})}s.round=sn.r}if(n==="desert"){mc(s,0,0,St.wall,1.1,4.2,l=>es(l,br,(St.lane+.4)/St.wall)||es(l,qi,3/St.wall)),s.rings.push({r:St.wall,h:4.2,gaps:br,gapW:(St.lane+.4)/St.wall,towersAt:qi});for(const l of qi){const h=Math.cos(l)*St.wall,d=Math.sin(l)*St.wall;s.obstacles.push({x:h,z:d,r:2.6}),s.blockers.push({x:h,z:d,r:2.6,h:7}),s.towers.push({x:h,z:d,r:2.4,h:7.5,kind:"sand"})}for(let l=0;l<40;l++){const h=r(-80,80),d=r(-80,80);!o(h,d,2)||Math.hypot(h,d)<30||(s.palms.push({x:h,z:d,s:r(.9,1.3),lean:r(-.25,.25),rot:r(0,6.28)}),s.obstacles.push({x:h,z:d,r:.5}))}for(let l=0;l<10;l++){const h=r(-70,70),d=r(-70,70);!o(h,d,3)||Math.hypot(h,d)<32||Qr(s,h,d,1.8,1.4,r(0,3),2.4,"tent")}c(12,(l,h)=>o(l,h)&&Math.hypot(l,h)>28)}if(n==="wooden"){de.forEach(l=>{const h=Math.atan2(-l.pos[1],-l.pos[0]),d=h+Math.PI/2;mc(s,l.pos[0],l.pos[1],22,.8,3.4,p=>es(p,[h,d],3.4/22)),s.rings.push({x:l.pos[0],z:l.pos[1],r:22,h:3.4,gaps:[h,d],gapW:3.4/22,kind:"logs"});for(const p of[h,d])for(const _ of[-1,1]){const x=p+_*3.9/22,m=l.pos[0]+Math.cos(x)*22,u=l.pos[1]+Math.sin(x)*22;s.towers.push({x:m,z:u,r:1.1,h:6,kind:"wood",small:!0})}});for(const l of br){const h=Math.cos(l)*33,d=Math.sin(l)*33;s.obstacles.push({x:h,z:d,r:1.8}),s.blockers.push({x:h,z:d,r:1.8,h:4}),s.towers.push({x:h,z:d,r:1.6,h:8,kind:"wood"})}for(const l of br)for(let h=0;h<4;h++){const d=56+r(-6,8),p=r(-14,14),_=Math.cos(l)*d-Math.sin(l)*p,x=Math.sin(l)*d+Math.cos(l)*p;a(_,x,6)||Math.abs(_)>82||Math.abs(x)>82||Qr(s,_,x,2.2,1.8,r(0,3),3.5,"hut")}for(let l=0;l<8;l++){const h=r(-80,80),d=r(-80,80);if(!(!o(h,d,8)||Math.hypot(h,d)<38))for(let p=0;p<5;p++){const _=h+r(-5,5),x=d+r(-5,5);o(_,x,4)&&f(_,x,r(.9,1.3))}}for(let l=0;l<40;l++){const h=r(0,6.28),d=r(95,130);s.trees.push({x:Math.cos(h)*d,z:Math.sin(h)*d,s:r(1,1.6)})}}if(n==="valley"){const l=[...br,...qi],h=31,d=Math.ceil(Math.PI*2*h/2.6);for(let p=0;p<d;p++){const _=p/d*Math.PI*2;if(es(_,l,4.2/h))continue;const x=h+r(-1.5,1.5),m=Math.cos(_)*x,u=Math.sin(_)*x,v=r(1.6,2.6);s.rocks.push({x:m,z:u,r:v,rx:r(0,3),ry:r(0,3),big:!0}),s.obstacles.push({x:m,z:u,r:v*.95}),s.blockers.push({x:m,z:u,r:v,h:v*1.6})}for(let p=0;p<10;p++){const _=r(-80,80),x=r(-80,80);if(!(!o(_,x,6)||Math.abs(Math.hypot(_,x)-h)<8))for(let m=0;m<4;m++){const u=_+r(-4,4),v=x+r(-4,4);o(u,v,4)&&f(u,v,r(.8,1.2))}}for(let p=0;p<40;p++){const _=r(0,6.28),x=r(95,130);s.trees.push({x:Math.cos(_)*x,z:Math.sin(_)*x,s:r(1,1.6)})}c(14,(p,_)=>o(p,_)&&Math.abs(Math.hypot(p,_)-h)>6)}for(const l of de)s.obstacles.push({x:l.pos[0],z:l.pos[1],r:yo,castle:!0});if(e)for(let l=0;l<12;l++){if(l%3===0)continue;const h=l/12*Math.PI*2,d=Math.cos(h)*6,p=Math.sin(h)*6;s.fortSegments.push({a:h,x:d,z:p}),s.obstacles.push({x:d,z:p,r:1.3})}return s}const Bs=1.5,Io=90,st=Math.ceil(Io*2/Bs),Nf=.55,au=6,nr=Math.ceil(Io*2/au);let ys=new Uint8Array(st*st),ll=[],fl=[],hl=[],La=!0;const Jn=n=>Math.max(0,Math.min(st-1,Math.floor((n+Io)/Bs))),$n=n=>-Io+(n+.5)*Bs,or=n=>Math.max(0,Math.min(nr-1,Math.floor((n+Io)/au)));function cu(n,e,t,i){if(n.box){const o=e-n.x,c=t-n.z,f=Math.cos(n.rot),l=Math.sin(n.rot),h=o*f-c*l,d=o*l+c*f;return Math.abs(h)<n.hw+i&&Math.abs(d)<n.hd+i}const r=e-n.x,s=t-n.z,a=n.r+i;return r*r+s*s<a*a}const Of=n=>n.box?Math.hypot(n.hw,n.hd):n.r;function $l(n){ys=new Uint8Array(st*st),ll=Array.from({length:nr*nr},()=>[]),fl=Array.from({length:nr*nr},()=>[]),hl=[];const e=(i,r)=>{const s=Of(i)+Nf,a=Jn(i.x-s),o=Jn(i.x+s),c=Jn(i.z-s),f=Jn(i.z+s);for(let l=c;l<=f;l++)for(let h=a;h<=o;h++)cu(i,$n(h),$n(l),Nf)&&(r?r.push(l*st+h):ys[l*st+h]++)},t=(i,r)=>{const s=Of(i)+1;for(let a=or(i.z-s);a<=or(i.z+s);a++)for(let o=or(i.x-s);o<=or(i.x+s);o++)r[a*nr+o].push(i)};for(const i of n.obstacles)if(t(i,ll),i.gate){const r=[];e(i,r),hl.push(...r)}else(i.box||i.r>=.7)&&e(i,null);for(const i of n.blockers)t(i,fl);if(n.mapId==="river")for(let i=0;i<st;i++)for(let r=0;r<st;r++){const s=$n(r),a=$n(i);Za(s,a)&&!ou(s,a)&&!Pa(s)&&Math.abs(a)<4.5&&ys[i*st+r]++}if(n.round)for(let i=0;i<st;i++)for(let r=0;r<st;r++)Math.hypot($n(r),$n(i))>n.round-1&&ys[i*st+r]++;La=!0,Yl()}function Yl(){const n=g.layout&&g.layout.gates.length?su(g.T):!0;if(n!==La){La=n;for(const e of hl)ys[e]+=n?-1:1}}const lu=n=>!!n.gate&&!La,fu=(n,e)=>ll[or(e)*nr+or(n)]||[],tg=(n,e)=>fl[or(e)*nr+or(n)]||[],tr=(n,e)=>n>=0&&e>=0&&n<st&&e<st&&!ys[e*st+n],dl=(n,e)=>tr(Jn(n),Jn(e));function Da(n,e,t,i){const r=Math.hypot(t-n,i-e),s=Math.ceil(r/(Bs*.5));for(let a=1;a<=s;a++){const o=a/s;if(!tr(Jn(n+(t-n)*o),Jn(e+(i-e)*o)))return!1}return!0}function ng(n,e,t,i){if(dl(n,e))return[n,e];const r=Math.hypot(t-n,i-e)||1,s=(t-n)/r,a=(i-e)/r;for(let o=Bs*.5;o<Math.min(r,16);o+=Bs*.5){const c=n+s*o,f=e+a*o;if(dl(c,f))return[c,f]}return[n,e]}const Vo=new Float32Array(st*st),gc=new Int32Array(st*st),_c=new Uint32Array(st*st),xc=new Uint32Array(st*st);let Er=0;const yt={a:new Int32Array(st*st),f:new Float32Array(st*st),n:0};function zf(n,e){let t=yt.n++;for(;t>0;){const i=t-1>>1;if(yt.f[i]<=e)break;yt.a[t]=yt.a[i],yt.f[t]=yt.f[i],t=i}yt.a[t]=n,yt.f[t]=e}function ig(){const n=yt.a[0],e=yt.a[--yt.n],t=yt.f[yt.n];let i=0;for(;;){let r=2*i+1;if(r>=yt.n||(r+1<yt.n&&yt.f[r+1]<yt.f[r]&&r++,yt.f[r]>=t))break;yt.a[i]=yt.a[r],yt.f[i]=yt.f[r],i=r}return yt.a[i]=e,yt.f[i]=t,n}const rg=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];function sg(n,e,t,i,r=3e3){let s=Jn(n),a=Jn(e);const o=Jn(t),c=Jn(i);if(!tr(o,c))return null;if(!tr(s,a)){let m=null,u=1e9;for(let v=-2;v<=2;v++)for(let M=-2;M<=2;M++){if(!tr(s+M,a+v))continue;const S=Math.hypot($n(s+M)-n,$n(a+v)-e);S<u&&Da(n,e,$n(s+M),$n(a+v))!==null&&(u=S,m=[s+M,a+v])}if(!m)return null;[s,a]=m}Er++,yt.n=0;const f=a*st+s,l=c*st+o,h=(m,u)=>{const v=Math.abs(m-o),M=Math.abs(u-c);return Math.max(v,M)+.414*Math.min(v,M)};_c[f]=Er,Vo[f]=0,gc[f]=-1,zf(f,h(s,a));let d=0;for(;yt.n;){const m=ig();if(xc[m]===Er)continue;if(xc[m]=Er,m===l)break;if(++d>r)return null;const u=m%st,v=m/st|0;for(const[M,S,C]of rg){const A=u+M,R=v+S;if(!tr(A,R)||M&&S&&(!tr(u+M,v)||!tr(u,v+S)))continue;const L=R*st+A,y=Vo[m]+C;_c[L]===Er&&y>=Vo[L]||(_c[L]=Er,Vo[L]=y,gc[L]=m,zf(L,y+h(A,R)))}}if(xc[l]!==Er)return null;const p=[];for(let m=l;m!==-1;m=gc[m])p.push([$n(m%st),$n(m/st|0)]);p.reverse();const _=[p[0]];let x=0;for(;x<p.length-1;){let m=x+1;for(;m+1<p.length&&Da(p[x][0],p[x][1],p[m+1][0],p[m+1][1]);)m++;_.push(p[m]),x=m}return _[_.length-1]=[t,i],_}const tn=(n,...e)=>Tt.emit("msg",{k:n,a:e}),Zn=(n,e)=>Tt.emit(n,e),Ai=(n,e,t,i,r)=>Zn("spark",{x:n,y:e,z:t,c:i,n:r}),Wt=(n,e,t)=>Zn("sfx",{name:n,x:e,z:t});function Kl(n,e=[1,1,1,1,0,0,0,0]){return Array.from({length:8},(t,i)=>({points:100,tickets:ru,caps:0,gold:cl.startGold,alive:!0,plan:null,leaderDeadT:0,recruitT:ue(2,6),thinkT:0,human:!!n[i],active:!!e[i],order:"follow",holdPt:null,towerT:ue(0,1.4),leader:null,up:{foot1:0,foot2:0,arch1:0,arch2:0,aura:0,horse:0},arrowHits:0,testudoT:0,upT:ue(20,40)}))}function Hs(n,e,t,i,r=!1){const s=an[i],a=i==="foot"||i==="captain"?du(n):i==="arch"?uu(n):0,o=i==="foot"?eu[a]:i==="arch"?tu[a]:s,c=i==="captain"?nu[a]:null,f={id:++g.uid,ti:n,kind:i,leader:i==="captain",human:r,isMe:r&&n===g.myTi&&g.role!=="client",remote:r&&n!==g.myTi,x:e,z:t,y:Rt(e,t),vx:0,vz:0,vy:0,face:Math.atan2(-e,-t),hp:o.hp+(c?c.hpB:0),max:o.hp+(c?c.hpB:0),dmg:(r?al.dmg:o.dmg)+(c?c.dmgB:0),spd:r?al.spd:o.spd,r:o.r,reach:o.reach+(c?c.reachB:0),block:o.block||0,range:o.range||0,shootBase:o.shoot||0,arrow:o.arrow||0,jitter:o.jitter||.8,javelin:c?c.javelin:!!o.javelin,javCd:0,tier:a,cd:ue(0,.6),shootCd:ue(0,1.5),swing:0,pending:null,stun:0,blockT:0,rt:ue(0,.3),foe:null,fd:1e9,dead:!1,deadT:0,trampleT:0,lastHit:-9,blocking:!1,aim:!1,mounted:!1,horse:null,summon:null,horseHp:Uo(n),horseCd:0,carrying:!1,aura:!1,testudo:!1,kick:{n:0,vx:0,vz:0,st:0,dirty:!1}};return g.units.push(f),f}const Ks=n=>g.units.filter(e=>!e.dead&&e.ti===n&&!e.leader);function og(n,e=[1,1,1,1,0,0,0,0]){g.layout=ql(g.map.id,g.mode==="ctf",g.seed),$l(g.layout),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.uid=0,g.arrowN=0,g.endInfo=null,g.teams=Kl(n,e),g.duo=[0,1,2,3].map(t=>!!e[t+4]),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null;for(let t=0;t<8;t++){if(!g.teams[t].active)continue;const i=de[Ae(t)],r=t>=4,[s,a]=xr(i,r?9:0,7);g.teams[t].leader=Hs(t,s,a,"captain",g.teams[t].human),(g.fullSquads?Wm:Vm).slice(0,g.squadCap).forEach((c,f)=>{const[l,h]=xr(i,(f%7-3)*1.4+(r?9:0),1.5+Math.floor(f/7)*1.4);Hs(t,l,h,c)})}g.player=g.teams[g.myTi].leader,g.state="play",tn("start")}function ag(n,e){const t=g.teams[n];t.order=e;const i=t.leader;e==="hold"&&i&&(t.holdPt={x:i.x,z:i.z,face:i.face,isFront:!0})}function Cs(n){const e=g.teams[n];return g.mode==="conquest"?g.teams[Ae(n)].alive:g.mode==="dm"?e.tickets>0:!0}function Jl(n,e){const t=g.teams[n],i=an[e].cost;if(!Cs(n)||t.gold<i||Ks(n).length>=g.squadCap)return!1;t.gold-=i;const[r,s]=xr(de[Ae(n)],ue(-2,2)+(n>=4?9:0));return Hs(n,r,s,e),n===g.myTi&&(g.recruited++,Wt("coin")),!0}const Qn=(n,e)=>g.teams[n]&&g.teams[n].up?g.teams[n].up[e]:0,Uo=n=>Xm+30*Qn(n,"horse"),Ia=n=>jm-4*Qn(n,"horse"),hu=n=>Ra.range+Ra.perRange*Qn(n,"aura"),ul=n=>Ra.bonus+Ra.perBonus*Qn(n,"aura"),du=n=>Math.min(2,Qn(n,"foot1")+Qn(n,"foot2")),uu=n=>Math.min(2,Qn(n,"arch1")+Qn(n,"arch2")),So=(n,e)=>{const t=mi.find(r=>r.id===e);if(!t)return null;const i=Qn(n,e);return i>=t.cost.length?null:t.cost[i]};function cg(n){const e=du(n),t=eu[e],i=nu[e];for(const r of g.units)if(!(r.dead||r.ti!==n)){if(r.kind==="foot"){const s=t.hp;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=t.dmg,r.reach=t.reach,r.block=t.block,r.spd=t.spd,r.javelin=t.javelin,r.tier=e}else if(r.leader){const s=an.captain.hp+i.hpB;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=(r.human?al.dmg:an.captain.dmg)+i.dmgB,r.reach=an.captain.reach+i.reachB,r.javelin=i.javelin,r.tier=e}}}function lg(n){const e=uu(n),t=tu[e];for(const i of g.units){if(i.dead||i.ti!==n||i.kind!=="arch")continue;const r=t.hp;i.hp=Math.min(r,Math.max(1,i.hp+(r-i.max))),i.max=r,i.dmg=t.dmg,i.spd=t.spd,i.range=t.range,i.shootBase=t.shoot,i.arrow=t.arrow,i.jitter=t.jitter,i.tier=e}}function Zl(n,e){const t=g.teams[n],i=So(n,e);return!t||i==null||t.gold<i||!mi.some(r=>r.id===e)||e==="foot2"&&Qn(n,"foot1")<1||e==="arch2"&&Qn(n,"arch1")<1?!1:(t.gold-=i,t.up[e]++,(e==="foot1"||e==="foot2")&&cg(n),(e==="arch1"||e==="arch2")&&lg(n),e==="horse"&&t.leader&&!t.leader.mounted&&(t.leader.horseHp=Uo(n)),e==="horse"&&t.leader&&t.leader.horseCd>Ia(n)&&(t.leader.horseCd=Ia(n)),n===g.myTi&&(Wt("coin"),tn("upgrade",n,e,t.up[e])),!0)}const pu=n=>{const e=g.teams[n],t=e.leader,i=t&&!t.dead;return e.human?e.order||"follow":e.testudoT>0&&i?"testudo":i?"follow":"charge"};function mu(n){const e=g.teams[n];return g.mode==="conquest"?g.teams[Ae(n)].alive:g.mode==="dm"?e.tickets>0:!0}function Qa(n,e,t,i){n.remote?(n.kick.vx+=e,n.kick.vz+=t,n.kick.st=Math.max(n.kick.st,i||0),n.kick.dirty=!0):(n.vx+=e,n.vz+=t),i&&(n.stun=Math.max(n.stun,i))}function ar(n){let e=n.spd;return n.mounted&&(e*=1.8*(1+.05*Qn(n.ti,"horse"))),n.leader||(n.aura&&(e*=1+ul(n.ti)*.5),n.testudo&&(e*=.6)),n.carrying&&(e*=.7),ou(n.x,n.z)&&(e*=.6),n.human&&n.blocking&&!n.mounted&&(e*=.5),e}function gu(n){if(n.mounted||n.summon||n.horseCd>0||n.dead||n.carrying||g.T-n.lastHit<2)return!1;const e=n.face+Math.PI+ue(-.6,.6),t=Ln(n.x+Math.sin(e)*14,-86,86),i=Ln(n.z+Math.cos(e)*14,-86,86),r={id:++g.horseN,x:t,z:i,face:Math.atan2(n.x-t,n.z-i),state:"coming",rider:n,t:0,spd:0,ti:n.ti,fall:1};return g.horses.push(r),n.summon=r,n.isMe&&Wt("neigh"),!0}function fg(n,e){n.summon=null,n.mounted=!0,n.horse=e,e.state="ridden",n.r=.95,n.isMe&&Zn("float",{x:n.x,y:n.y+3.4,z:n.z,text:"Mounted",color:"#fff"})}function jr(n,e){if(!n.mounted)return;const t=n.horse;n.mounted=!1,n.horse=null,n.r=an.captain.r,e?(t.state="dead",t.t=0,t.fall=Math.random()<.5?1:-1,n.horseCd=Ia(n.ti),n.horseHp=Uo(n.ti),Qa(n,Math.sin(n.face+Math.PI/2)*5,Math.cos(n.face+Math.PI/2)*5,1),n.human&&tn("horseDown",n.ti)):(t.state="leaving",t.t=0)}function Ql(n,e){n.horseHp-=e,Ai(n.x,n.y+1.3,n.z,"#d42a1e",5),Wt("hit",n.x,n.z),n.horseHp<=0&&jr(n,!0)}const _u=(n,e)=>g.units.some(t=>!t.dead&&Wi(t,n)&&t.kind==="foot"&&t.tier>=1&&Math.hypot(t.x-n.x,t.z-n.z)<e),xu=n=>n.kind==="foot"&&n.tier>=1&&n.stun<=0&&Math.hypot(n.vx,n.vz)<2.2;function vu(n){if(!(!n||n.dead)){if(n.mounted){jr(n,!1);return}if(!n.summon){if(n.carrying){tn("rideNo",n.ti,"banner");return}if(n.horseCd>0){tn("rideNo",n.ti,"rest",Math.ceil(n.horseCd));return}if(g.T-n.lastHit<2){tn("rideNo",n.ti,"hot");return}gu(n)}}}function li(n,e,t){let i=null,r=e*e;for(const s of g.units){if(s.dead||!Wi(s,n)||t&&!t(s))continue;const a=s.x-n.x,o=s.z-n.z,c=a*a+o*o;c<r&&(r=c,i=s)}return[i,Math.sqrt(r)]}function yu(n){if(g.mode!=="conquest")return[-1,1e9];let e=-1,t=1e9;for(let i=0;i<4;i++){if(!gi(i,n.ti)||!g.teams[i].alive)continue;const r=Math.hypot(de[i].pos[0]-n.x,de[i].pos[1]-n.z);r<t&&(t=r,e=i)}return[e,t]}const Ua=n=>g.teams[n]&&g.teams[n].human?1:iu[g.diff].dmg;function ai(n,e){return n.cd>0||n.stun>0||n.dead||n.carrying?!1:(n.swing=.38,n.cd=(n.leader?n.mounted?.8:.6:an[n.kind].cd)*ue(.9,1.15),n.pending={t:.15,target:e},Wt("swing",n.x,n.z),!0)}function Mu(n){n.cd>0||n.stun>0||n.dead||(n.swing=.38,n.cd=.8,n.pending={t:.15,sweep:!0},Wt("swing",n.x,n.z))}function hg(n){const e=n.pending,t=e.target;if(n.pending=null,e.sweep){const i=.8*(1+Math.hypot(n.vx,n.vz)/12);for(const r of g.units)r.dead||!Wi(r,n)||Math.hypot(r.x-n.x,r.z-n.z)>3.1||Math.abs(_i(n.face,Math.atan2(r.x-n.x,r.z-n.z)))>1.25||Ff(n,r,i);return}if(t&&t.castle!==void 0){const i=g.teams[t.castle];if(!i.alive||n.mounted||!gi(t.castle,n.ti)||Math.hypot(de[t.castle].pos[0]-n.x,de[t.castle].pos[1]-n.z)>rr+.8)return;i.points-=n.human?1.3:n.leader?.7:n.kind==="arch"?.08:.2,Wt("wall",n.x,n.z),Ai(n.x+Math.sin(n.face)*1.2,1.4,n.z+Math.cos(n.face)*1.2,"#cfc8b8",5),i.points<=0&&ug(t.castle,n.ti);return}!t||t.dead||Math.hypot(t.x-n.x,t.z-n.z)>n.r+t.r+n.reach+.5||Ff(n,t,1)}function Ff(n,e,t=1){if(!Wi(n,e))return;let i=n.dmg*ue(.8,1.2)*t*Ua(n.ti);!n.leader&&n.aura&&(i*=1+ul(n.ti)),n.y-e.y>.8&&(i*=1.2),e.lastHit=g.T;const r=n.kind==="foot"&&n.tier>=1;if(e.mounted&&(r||Math.random()<.5)){Ql(e,i*(r?3:1));return}let s=n.leader?n.mounted?9:7:4.5;const a=Math.abs(_i(e.face,Math.atan2(n.x-e.x,n.z-e.z)))<1.1;let o=!1;a&&e.stun<=0&&!e.mounted&&!e.carrying&&(e.human?o=e.blocking:Math.random()<(e.block||0)+(e.aura?ul(e.ti):0)+(e.testudo&&e.kind==="foot"?.3:0)&&(o=!0,e.blockT=.45));const c=(n.x+e.x)/2,f=(n.z+e.z)/2,l=(n.y+e.y)/2+1.2;o?(i*=e.human?.12:.25,s*=.4,Ai(c,l,f,"#fff3b0",7),Wt("clang",c,f),e.blockT=Math.max(e.blockT,.2),e.isMe&&Zn("buzz",15)):(Ai(c,l,f,de[Ae(e.ti)].css,6),Wt("hit",c,f),Math.random()<.4&&Zn("splat",{x:e.x+ue(-.4,.4),z:e.z+ue(-.4,.4),s:ue(.6,1.1),ti:e.ti}),e.isMe&&(Zn("shake",.35),Zn("buzz",35))),e.hp-=i;const h=Math.atan2(e.x-n.x,e.z-n.z);Qa(e,Math.sin(h)*s,Math.cos(h)*s,o?0:.22),e.hp<=0&&tf(e,n,h)}function Su(n,e,t=1.6){const i=n.jitter||.8,r=.35+Math.hypot(e.x-n.x,e.z-n.z)/30,s=e.x+e.vx*r+ue(-i,i),a=e.z+e.vz*r+ue(-i,i),o=Math.hypot(s-n.x,a-n.z),c=(n.y||0)+t;g.arrows.push(ef({id:++g.arrowN,x0:n.x,y0:c,z0:n.z,x1:s,z1:a,y1:Rt(s,a)+1.1,dur:.25+o/28,peak:Math.min(6,o*.16),ti:n.ti,t:0,shooter:n})),n.tower||(n.swing=.38),Wt("bow",n.x,n.z)}function pl(n,e){const t=Math.hypot(e.x-n.x,e.z-n.z),i=(n.y||0)+1.5;g.arrows.push(ef({id:++g.arrowN,x0:n.x,y0:i,z0:n.z,x1:e.x,z1:e.z,y1:Rt(e.x,e.z)+1.1,dur:.18+t/22,peak:Math.min(3.5,t*.09),ti:n.ti,t:0,shooter:n,javelin:!0})),n.javCd=vo.cd,n.swing=.3,Wt("bow",n.x,n.z)}function ef(n){return n.x=n.x0,n.y=n.y0,n.z=n.z0,n.px=n.x0,n.py=n.y0,n.pz=n.z0,n}function dg(n,e){const t=n.shooter;let i,r="body";if(n.javelin)i=vo.dmg*ue(.85,1.15)*Ua(n.ti);else{i=(t?t.arrow:an.arch.arrow)*ue(.8,1.2)*Ua(n.ti);const c=t?t.jitter:.8,f=.08+(1-c)*.22,l=Math.random();l<f?(i*=1.8,r="head"):l>.82&&(i*=.6,r="legs")}if(g.teams[e.ti]&&g.teams[e.ti].arrowHits++,e.testudo&&(e.kind==="foot"||Math.random()<.6)){Ai(e.x,e.y+2.2,e.z,"#e8d9b0",4),Wt("thud",e.x,e.z);return}if(e.lastHit=g.T,e.mounted&&Math.random()<.6){Ql(e,i);return}const s=Math.abs(_i(e.face,Math.atan2(n.x0-e.x,n.z0-e.z)))<1.1;let a=!1;if(s&&!e.mounted&&!e.carrying&&r!=="head"&&(e.kind==="foot"&&Math.random()<.7&&(a=!0),e.leader&&(e.human?e.blocking:Math.random()<.35)&&(a=!0)),a){Ai(e.x,e.y+1.3,e.z,"#e8d9b0",4),Wt("thud",e.x,e.z),e.blockT=Math.max(e.blockT,.2);return}e.hp-=i,Ai(e.x,e.y+1.3,e.z,de[Ae(e.ti)].css,4),Wt("hit",e.x,e.z),Qa(e,0,0,.12),e.isMe&&(Zn("shake",.25),Zn("buzz",20));const o=n.shooter;e.hp<=0&&tf(e,o&&!o.dead&&!o.tower?o:{ti:n.ti,human:!1},Math.atan2(e.x-n.x0,e.z-n.z0))}function tf(n,e,t){if(n.dead)return;n.dead=!0,n.deadT=0,n.vx+=Math.sin(t)*6,n.vz+=Math.cos(t)*6,n.vy=ue(3,6),n.fallDir=Math.random()<.5?1:-1,Zn("splat",{x:n.x,z:n.z,s:ue(1,1.5),ti:n.ti}),Wt("die",n.x,n.z),n.mounted&&jr(n,!1),n.summon&&(n.summon.state="leaving",n.summon.t=0,n.summon=null),n.carrying&&yg(n);const i=g.teams[n.ti];if(g.mode==="dm"&&(i.tickets=Math.max(0,i.tickets-(n.leader?5:1)),i.tickets<=0&&i.alive&&(i.alive=!1,tn("tickets0",n.ti))),e){const r=g.mode==="dm"&&n.leader&&n.ti===g.bounty,s=n.leader?r?50:25:8;g.teams[e.ti].gold+=s,e.human&&e.ti===g.myTi&&g.kills++,e.human&&tn("gold",e.ti,Math.round(n.x*10)/10,Math.round(n.z*10)/10,s),r&&tn("bountyClaimed",e.ti),n.leader&&tn("capDown",n.ti,e.ti)}n.leader&&(i.leaderDeadT=n.human?5:9,n.human&&tn("fell",n.ti,mu(n.ti)?1:0)),rf()}function ug(n,e){const t=g.teams[n];t.alive=!1,t.points=0,tn("castleDown",n,e),rf()}function bu(n){const e=g.teams[n];return g.mode==="conquest"?!g.teams[Ae(n)].alive:g.mode==="dm"?!e.alive&&!g.units.some(t=>!t.dead&&t.ti===n):!1}const nf=n=>g.duo[n]?[n,n+4]:[n];function pg(n){return g.mode==="conquest"?g.teams[n].points:nf(n).reduce((e,t)=>e+(g.mode==="dm"?g.teams[t].tickets:g.teams[t].caps),0)}const mg=n=>nf(n).every(e=>bu(e)),gg=n=>nf(n).some(e=>g.teams[e].human),_g=n=>{const e=g.teams[n];return g.mode==="conquest"?g.teams[Ae(n)].points:g.mode==="dm"?e.tickets:e.caps},Eu=n=>g.teams.reduce((e,t,i)=>e+(g.ALLY[Ae(i)]===n?t.caps:0),0),xg=()=>[...new Set(Wl().filter(n=>!bu(n)).map(n=>g.ALLY[Ae(n)]))];function rf(){if(!(g.state!=="play"||g.role==="client")){if(g.mode==="conquest"||g.mode==="dm"){const n=xg();if(n.length===1)return Br(n[0],g.mode==="conquest"?"castles":"tickets");if(n.length===0)return Br(-1,"time")}if(g.mode==="ctf"){for(const n of new Set(g.ALLY))if(Eu(n)>=Mo)return Br(n,"caps")}}}function vg(){if(g.state!=="play"||g.T<Wr[g.mode].time)return;const n={};if(g.mode==="conquest")for(let t=0;t<4;t++)g.teams[t].alive&&(n[g.ALLY[t]]=(n[g.ALLY[t]]||0)+g.teams[t].points);else for(const t of Wl())n[g.ALLY[Ae(t)]]=(n[g.ALLY[Ae(t)]]||0)+_g(t);const e=Object.entries(n).map(([t,i])=>[+t,i]).sort((t,i)=>i[1]-t[1]);if(!e.length||e.length>1&&e[0][1]===e[1][1])return Br(-1,"time");Br(e[0][0],"time")}function Br(n,e){g.state==="play"&&(g.state="end",g.endInfo={w:n,why:e},Tt.emit("end",g.endInfo))}function yg(n){const e=g.flag;n.carrying=!1,e.state="dropped",e.carrier=null,e.x=n.x,e.z=n.z,e.dropT=10,tn("flagDropped",n.ti)}function Mg(n){const e=g.flag;if(e){if(e.state==="carried"){const t=e.carrier,i=de[Ae(t.ti)];Math.hypot(t.x-i.pos[0],t.z-i.pos[1])<yo+3.5&&(g.teams[t.ti].caps++,g.teams[t.ti].gold+=50,t.carrying=!1,e.state="home",e.carrier=null,e.x=0,e.z=0,tn("capture",t.ti),g.teams.forEach(r=>r.thinkT=0),rf());return}e.state==="dropped"&&(e.dropT-=n,e.dropT<=0&&(e.state="home",e.x=0,e.z=0,tn("flagHome")));for(const t of g.units)if(!(t.dead||!t.leader||Math.hypot(t.x-e.x,t.z-e.z)>=1.9)){if(t.mounted){t.isMe&&Zn("hint","Get off your horse to take it");continue}t.summon&&(t.summon.state="leaving",t.summon.t=0,t.summon=null),t.carrying=!0,e.state="carried",e.carrier=t,g.teams.forEach(i=>i.thinkT=0),tn("flagTaken",t.ti);break}}}function Tu(n){let e=null,t=1e9;for(const i of g.units){if(i.dead||!Wi(i,n))continue;const r=Math.hypot(i.x-n.x,i.z-n.z);if(r>3.4)continue;const s=r+Math.abs(_i(n.face,Math.atan2(i.x-n.x,i.z-n.z)))*1.5;s<t&&(t=s,e=i)}return e}function sf(n){if(!n||n.dead||n.carrying)return;if(n.mounted){if(n.javelin&&n.javCd<=0){const[r,s]=li(n,vo.range,a=>!a.mounted);if(r&&s>3.5){n.face=Math.atan2(r.x-n.x,r.z-n.z),pl(n,r);return}}Mu(n);return}const e=Tu(n);if(e){ai(n,e)&&(n.face=Math.atan2(e.x-n.x,e.z-n.z));return}if(n.javelin&&n.javCd<=0){const[r,s]=li(n,vo.range);if(r&&s>3.4){n.face=Math.atan2(r.x-n.x,r.z-n.z),pl(n,r);return}}const[t,i]=yu(n);if(t>=0&&i<rr+.6){ai(n,{castle:t})&&(n.face=Math.atan2(de[t].pos[0]-n.x,de[t].pos[1]-n.z));return}ai(n,null)}let ml=0;function Sg(n,e,t){const i=n.nav||(n.nav={next:0,direct:!0,pts:null,i:0,gx:1e9,gz:1e9,repath:0,skipT:0});if(g.T>=i.next){i.next=g.T+.25+Math.random()*.15;const[c,f]=ng(e,t,n.x,n.z);i.direct=Da(n.x,n.z,c,f),i.ox=c,i.oz=f}if(i.direct)return i.pts=null,[e,t];const r=i.ox,s=i.oz;if((g.T>i.repath||Math.hypot(r-i.gx,s-i.gz)>4)&&ml>0&&(ml--,i.pts=sg(n.x,n.z,r,s),i.i=dl(n.x,n.z)?1:0,i.gx=r,i.gz=s,i.repath=g.T+(i.pts?2+Math.random():1.5+Math.random())),!i.pts||i.pts.length<2)return[e,t];const a=i.pts;for(;i.i<a.length-1&&Math.hypot(a[i.i][0]-n.x,a[i.i][1]-n.z)<(i.i?1.3:.5);)i.i++;i.i<a.length-1&&g.T>=i.skipT&&(i.skipT=g.T+.3,Da(n.x,n.z,a[i.i+1][0],a[i.i+1][1])&&i.i++);const o=a[Math.min(i.i,a.length-1)];return i.i>=a.length-1?[e,t]:[o[0],o[1]]}function Oi(n,e,t,i,r,s=.3){const a=e-n.x,o=t-n.z,c=Math.hypot(a,o);let f=0,l=0;if(c>s){const d=i*Math.min(1,(c-s)/1.2+.2);f=a/c*d,l=o/c*d}const h=n.stun>0?1.5:n.mounted?4:10;return n.vx+=(f-n.vx)*Math.min(1,r*h),n.vz+=(l-n.vz)*Math.min(1,r*h),c}const zn=(n,e,t,i,r=9)=>{n.face=Fs(n.face,Math.atan2(e-n.x,t-n.z),i*r)};function jn(n,e,t,i,r,s=.3){const[a,o]=Sg(n,e,t);return Oi(n,a,o,i,r,a===e&&o===t?s:.2),Math.hypot(a-n.x,o-n.z)>.6&&zn(n,a,o,r,n.mounted?4:8),Math.hypot(e-n.x,t-n.z)}function bg(n,e){const t=de[Ae(n.ti)],i=Ks(n.ti).length;if(g.mode==="conquest"){const r=g.units.some(o=>!o.dead&&Wi(o,n)&&Math.hypot(o.x-t.pos[0],o.z-t.pos[1])<22),s=e.plan&&e.plan.kind==="castle"?4:11;if(g.teams[Ae(n.ti)].alive&&(r||i<s)){e.plan={kind:"defend"};return}let a=e.plan&&e.plan.kind==="castle"&&g.teams[e.plan.ti].alive&&Math.random()>.08?e.plan.ti:null;if(a==null){const o=[0,1,2,3].filter(c=>gi(c,n.ti)&&g.teams[c].alive).sort((c,f)=>Math.hypot(de[c].pos[0]-n.x,de[c].pos[1]-n.z)-Math.hypot(de[f].pos[0]-n.x,de[f].pos[1]-n.z));o.length&&(a=o[Math.random()<.7?0:Math.min(1,o.length-1)])}e.plan=a==null?{kind:"defend"}:{kind:"castle",ti:a}}else if(g.mode==="dm"){const r=e.plan&&e.plan.kind==="hunt"?3:9;if(i<r&&e.tickets>0){e.plan={kind:"defend"};return}const[s]=li(n,400,c=>c.leader),[a]=li(n,400),o=g.bounty>=0&&gi(g.bounty,n.ti)&&Math.random()<.5?g.teams[g.bounty].leader:null;e.plan={kind:"hunt",target:o&&!o.dead?o:s||a}}else{const r=g.flag;n.carrying?e.plan={kind:"home"}:r.state==="carried"?e.plan={kind:Wi(r.carrier,n)?"hunt":"escort",target:r.carrier}:e.plan={kind:"banner"}}}function Eg(n,e){const t=e.plan;if(!t)return null;const i=de[Ae(n.ti)],r=n.ti>=4;switch(t.kind){case"defend":{const[s,a]=xr(i,r?9:0,1);return{x:s,z:a,stop:1.5}}case"castle":return{x:de[t.ti].pos[0],z:de[t.ti].pos[1],stop:rr-.8,castle:t.ti};case"hunt":case"escort":return t.target&&!t.target.dead?{x:t.target.x,z:t.target.z,stop:t.kind==="escort"?3:1.5}:null;case"home":{const[s,a]=xr(i);return{x:s,z:a,stop:.5}}case"banner":return{x:g.flag.x,z:g.flag.z,stop:.2}}return null}function Tg(n,e){if(n.carrying){n.mounted&&jr(n,!1);return}!n.mounted&&!n.summon&&e>30&&!(n.foe&&n.fd<14)&&gu(n);const t=g.teams[n.ti].plan&&g.teams[n.ti].plan.kind;n.mounted&&(e<(t==="hunt"?6:12)||_u(n,g.diff===2?11:7))&&jr(n,!1)}function Ag(n,e,t){e.thinkT-=t,(e.thinkT<=0||!e.plan)&&(e.thinkT=ue(1.2,2.4),bg(n,e));const i=n.foe,r=n.fd;if(i&&r<(n.mounted?12:10)&&!n.carrying&&!(e.plan&&e.plan.kind==="escort"&&r>5)){if(n.mounted){_u(n,7)&&jr(n,!1);const o=1/Math.max(r,.1);jn(n,i.x+(i.x-n.x)*o*4,i.z+(i.z-n.z)*o*4,ar(n),t,.1),r<3&&Mu(n)}else jn(n,i.x,i.z,ar(n),t,n.r+i.r+n.reach*.6),zn(n,i.x,i.z,t),r<n.r+i.r+n.reach&&ai(n,i);return}const s=Eg(n,e);if(!s){Oi(n,n.x,n.z,0,t),e.thinkT=Math.min(e.thinkT,.3);return}Tg(n,Math.hypot(s.x-n.x,s.z-n.z));const a=jn(n,s.x,s.z,ar(n),t,s.stop);s.castle!=null?a<rr&&!n.mounted&&(zn(n,s.x,s.z,t,6),ai(n,{castle:s.castle})):e.plan.kind==="defend"&&a<2&&zn(n,0,0,t,3)}function wg(n,e,t,i,r){const a=Math.floor(t/5),o=(t%5-2)*1.45,c=i?e?2+a*1.5:1.8+Math.ceil(r/5)*1.5+a*1.5:e?-(2.2+a*1.5):1.8+a*1.5,f=n.face,l=Math.sin(f),h=Math.cos(f),d=Math.cos(f),p=-Math.sin(f);return[n.x-l*c+d*o,n.z-h*c+p*o]}function Cg(n,e,t){const i=Math.floor(t/5),r=(t%5-2)*1.02,s=e?-(1.6+i*1.05):1.6+i*1.05,a=n.face,o=Math.sin(a),c=Math.cos(a),f=Math.cos(a),l=-Math.sin(a);return[n.x-o*s+f*r,n.z-c*s+l*r]}function Rg(n,e){const t=g.teams[n.ti],i=t.leader,r=i&&!i.dead,s=pu(n.ti);if(s==="testudo"&&r){n.aim=!1;const _=n.foe;_&&n.fd<n.r+_.r+n.reach&&(zn(n,_.x,_.z,e),ai(n,_));const[x,m]=Cg(i,!!i.human,n.tslot||0);jn(n,x,m,ar(n)*(Math.hypot(x-n.x,m-n.z)>5?1.5:1),e,.15)<1&&!(_&&n.fd<3)&&(n.face=Fs(n.face,i.face,e*6));return}const a=n.kind==="arch"?n.range*(n.y>2.2?1.3:1):0;if(n.aim=!1,n.kind==="foot"&&n.tier>=1&&s!=="charge"){const[_,x]=li(n,9,m=>m.mounted);if(_){Oi(n,n.x,n.z,0,e),zn(n,_.x,_.z,e,10),x<n.r+_.r+n.reach&&ai(n,_);return}}const o=s==="charge"?45:n.kind==="arch"?a:s==="hold"?8:10,c=n.foe,f=n.fd,l=s==="follow"&&r&&c&&Math.hypot(c.x-i.x,c.z-i.z)>18;if(c&&f<o&&!l){n.kind==="arch"?f<n.r+c.r+n.reach?(ai(n,c),zn(n,c.x,c.z,e),Oi(n,n.x,n.z,0,e)):f<5.5?(Oi(n,n.x-(c.x-n.x),n.z-(c.z-n.z),n.spd,e),zn(n,c.x,c.z,e,6)):f<=a?(n.aim=!0,Oi(n,n.x,n.z,0,e),zn(n,c.x,c.z,e,8),n.shootCd<=0&&n.stun<=0&&Math.abs(_i(n.face,Math.atan2(c.x-n.x,c.z-n.z)))<.3&&(Su(n,c),n.shootCd=n.shootBase*ue(.85,1.2))):jn(n,c.x,c.z,ar(n),e,a*.8):n.javelin&&n.javCd<=0&&f>n.r+c.r+n.reach+.3&&f<vo.range&&!c.mounted?(Oi(n,n.x,n.z,0,e),zn(n,c.x,c.z,e,8),Math.abs(_i(n.face,Math.atan2(c.x-n.x,c.z-n.z)))<.3&&pl(n,c)):(jn(n,c.x,c.z,ar(n),e,n.r+c.r+n.reach*.7),zn(n,c.x,c.z,e),f<n.r+c.r+n.reach&&ai(n,c));return}const[h,d]=yu(n);if(s==="charge"){if(g.mode==="conquest"&&h>=0){const _=de[h].pos;jn(n,_[0],_[1],n.spd,e,rr-1),d<rr&&(zn(n,_[0],_[1],e,6),ai(n,{castle:h}))}else if(g.mode==="ctf"){const _=g.flag,x=_.state==="carried"&&Wi(_.carrier,n)?_.carrier:_;jn(n,x.x,x.z,n.spd,e,1)}else{const[_]=li(n,300);_?jn(n,_.x,_.z,n.spd,e,1):jn(n,0,0,n.spd,e,4)}return}if(g.mode==="conquest"&&h>=0&&d<rr&&s==="follow"&&r&&!i.mounted&&Math.hypot(i.x-de[h].pos[0],i.z-de[h].pos[1])<rr+6){zn(n,de[h].pos[0],de[h].pos[1],e,6),Oi(n,n.x,n.z,0,e),ai(n,{castle:h});return}const p=s==="hold"&&t.holdPt?t.holdPt:r?i:null;if(p){const[_,x]=wg(p,p.isFront||!!p.human,n.slot||0,n.kind==="arch",n.meleeN||0);jn(n,_,x,ar(n)*(Math.hypot(_-n.x,x-n.z)>6?1.15:1),e)<1&&(n.face=Fs(n.face,p.face,e*6))}else{const[_,x]=xr(de[Ae(n.ti)],n.ti>=4?9:0,2);jn(n,_,x,n.spd,e,3)}}function Pg(n){const e=Math.random();if(g.diff===2){const i=Wl().filter(o=>g.teams[o].human&&gi(o,n)).flatMap(o=>Ks(o)),r=o=>i.filter(c=>c.kind===o).length,s=r("foot");return r("arch")>=s?e<.7?"foot":"arch":e<.35?"arch":"foot"}return e<.65?"foot":"arch"}function Au(n,e,t){n.x+=n.vx*e,n.z+=n.vz*e;for(const i of fu(n.x,n.z)){if(i.gate&&!lu(i))continue;const r=n.x-i.x,s=n.z-i.z;if(i.box){const c=Math.cos(i.rot),f=Math.sin(i.rot),l=r*c-s*f,h=r*f+s*c,d=i.hw+n.r-Math.abs(l),p=i.hd+n.r-Math.abs(h);if(d<=0||p<=0)continue;let _=l,x=h;d<p?_=Math.sign(l||1)*(i.hw+n.r):x=Math.sign(h||1)*(i.hd+n.r),n.x=i.x+_*c+x*f,n.z=i.z-_*f+x*c;continue}const a=i.r+n.r;if(Math.abs(r)>a||Math.abs(s)>a)continue;const o=Math.hypot(r,s);o<a&&o>0&&(n.x=i.x+r/o*a,n.z=i.z+s/o*a)}if(g.layout.round){const i=Math.hypot(n.x,n.z),r=g.layout.round-n.r;i>r&&(n.x*=r/i,n.z*=r/i)}if(g.map.id==="river"&&(Za(n.x,n.z)&&!Pa(n.x)&&Math.abs(n.x)>=14&&(n.z=(t>=0?1:-1)*5.05),Math.abs(n.z)<5&&Pa(n.x)&&Math.abs(n.x)>20)){const i=n.x<0?-32:32;n.x=Ln(n.x,i-2.1,i+2.1)}n.x=Ln(n.x,-Go,Go),n.z=Ln(n.z,-Go,Go),n.y=Rt(n.x,n.z)}function wu(n,e,t){n.blocking=!!e.block&&!n.mounted;const i=ar(n)*(n.swing>0&&!n.mounted?.6:1);Oi(n,n.x+e.wx*3,n.z+e.wz*3,i*e.mag,t,.05),e.mag>.15&&(n.swing<=0||n.mounted)&&(n.face=Fs(n.face,Math.atan2(e.wx,e.wz),t*(n.mounted?4.5:n.blocking?5:12))),n.blocking&&e.mag<.15&&(n.face=Fs(n.face,e.camYaw,t*6))}function Cu(n,e){if(g.T+=n,Yl(),ml=Math.max(2,Math.round(4*80/Math.max(80,g.units.length))),g.teams.forEach((l,h)=>{if(l.active){if(Cs(h)&&(l.gold+=n*(l.human?cl.humanIncome:iu[g.diff].income)),!l.human&&Cs(h)&&(l.recruitT-=n,l.recruitT<=0&&(l.recruitT=ue(...cl.aiRecruitEvery),Jl(h,Pg(h)))),!l.human){if(l.upT-=n,l.upT<=0&&(l.upT=ue(6,12),Ks(h).length>=g.squadCap-3||!Cs(h))){const d=mi.map(p=>p.id).filter(p=>So(h,p)!=null&&l.gold>=So(h,p)+30);d.length&&Zl(h,d[Math.floor(Math.random()*d.length)])}if(l.arrowHits=Math.max(0,l.arrowHits-n*.6),l.testudoT-=n,l.arrowHits>=4&&l.testudoT<=0&&l.leader&&!l.leader.dead){const[d]=li(l.leader,9,p=>p.kind!=="arch");d||(l.testudoT=7,l.arrowHits=0)}if(l.testudoT>0&&l.leader&&!l.leader.dead){const[d]=li(l.leader,5,p=>p.kind!=="arch");d&&(l.testudoT=0)}}if(l.leader.dead&&mu(h)&&(l.leaderDeadT-=n,l.leaderDeadT<=0)){const[d,p]=xr(de[Ae(h)],h>=4?9:0,7),_=Hs(h,d,p,"captain",l.human);l.leader=_,l.plan=null,h===g.myTi&&(g.player=_,Tt.emit("respawnMe",_)),l.human&&tn("respawn",h)}}}),g.mode==="dm"){const l=g.teams.map((d,p)=>[d.tickets,p]).filter(d=>g.teams[d[1]].active&&g.teams[d[1]].alive).sort((d,p)=>p[0]-d[0]),h=l.length>1&&l[0][0]-l[1][0]>=10?l[0][1]:-1;h!==g.bounty&&(g.bounty=h,h>=0&&tn("bounty",h))}const t=g.player;t&&!t.dead&&e&&(wu(t,e,n),e.attackHeld&&t.cd<=0&&sf(t));for(const l of g.teams){const h=l.leader;if(h&&h.human&&!h.dead){const[d]=li(h,12);!d&&h.hp<h.max&&(h.hp=Math.min(h.max,h.hp+n*6))}}const i=[0,0,0,0,0,0,0,0],r=[0,0,0,0,0,0,0,0],s=[0,0,0,0,0,0,0,0],a=[0,0,0,0,0,0,0,0],o=g.teams.map((l,h)=>pu(h)),c=g.teams.map((l,h)=>hu(h)**2);for(const l of g.units){if(l.dead||l.leader)continue;l.kind!=="arch"&&s[l.ti]++;const h=g.teams[l.ti].leader,d=h?h.x-l.x:0,p=h?h.z-l.z:0;l.aura=!!h&&!h.dead&&d*d+p*p<c[l.ti],l.testudo=o[l.ti]==="testudo";const _=l.kind==="foot"?0:1;l.tkey=g.teams[l.ti].human?1-_:_}for(const l of[0,1])for(const h of g.units)!h.dead&&!h.leader&&h.tkey===l&&(h.tslot=a[h.ti]++);for(const l of g.units)l.dead||(l.cd-=n,l.shootCd-=n,l.javCd-=n,l.stun-=n,l.blockT-=n,l.rt-=n,l.trampleT-=n,l.horseCd>0&&(l.horseCd-=n),l.swing>0&&(l.swing-=n),l.pending&&(l.pending.t-=n,l.pending.t<=0&&hg(l)),l.rt<=0&&(l.rt=ue(.25,.4),[l.foe,l.fd]=li(l,50)),l.foe&&l.foe.dead&&(l.foe=null,l.fd=1e9),l.foe&&(l.fd=Math.hypot(l.foe.x-l.x,l.foe.z-l.z)),!(l.human||l.dead)&&(l.leader?Ag(l,g.teams[l.ti],n):(l.slot=l.kind==="arch"?r[l.ti]++:i[l.ti]++,l.meleeN=s[l.ti],Rg(l,n))));for(const l of g.horses)if(l.t+=n,l.state==="coming"){const h=l.rider;if(h.dead||h.summon!==l){l.state="leaving",l.t=0;continue}const d=h.x-l.x,p=h.z-l.z,_=Math.hypot(d,p)||.01;l.face=Math.atan2(d,p);const x=Math.min(16,_*4);l.x+=d/_*x*n,l.z+=p/_*x*n,l.spd=x,_<1.3&&fg(h,l)}else if(l.state==="ridden"){const h=l.rider;l.x=h.x,l.z=h.z,l.face=h.face,l.spd=Math.hypot(h.vx,h.vz)}else l.state==="leaving"&&(l.x+=Math.sin(l.face)*10*n,l.z+=Math.cos(l.face)*10*n,l.spd=10);g.horses=g.horses.filter(l=>!(l.state==="leaving"&&l.t>3||l.state==="dead"&&l.t>8));for(const l of g.units){if(l.dead||!l.mounted)continue;const h=Math.hypot(l.vx,l.vz);for(const d of g.units){if(d.dead||!Wi(d,l)||d.mounted)continue;const p=d.x-l.x,_=d.z-l.z;if(Math.abs(p)>4||Math.abs(_)>4)continue;const x=Math.hypot(p,_);if(d.kind==="foot"&&d.tier>=1&&x<d.r+l.r+1.6&&xu(d)&&h>4&&Math.abs(_i(d.face,Math.atan2(l.x-d.x,l.z-d.z)))<1){Ql(l,55),l.mounted&&jr(l,!0),Ai(d.x,d.y+1.5,d.z,"#fff3b0",8),Wt("clang",d.x,d.z),Zn("float",{x:d.x,y:d.y+2.8,z:d.z,text:"Spear wall!",color:de[Ae(d.ti)].css});break}if(h>6&&x<d.r+l.r+.3&&d.trampleT<=0){d.trampleT=.8,d.lastHit=g.T;const m=Math.atan2(p,_);Qa(d,Math.sin(m)*10+l.vx*.5,Math.cos(m)*10+l.vz*.5,.7),d.hp-=12*Ua(l.ti),Ai(d.x,d.y+1,d.z,"#c9b28a",6),Wt("trample",d.x,d.z),d.hp<=0&&tf(d,l,m)}}Math.random()<n*h*.9&&Wt("hoof",l.x,l.z)}const f=g.units.filter(l=>!l.dead);for(let l=0;l<f.length;l++){const h=f[l];for(let d=l+1;d<f.length;d++){const p=f[d],_=p.x-h.x,x=p.z-h.z,m=h.r+p.r;if(_>m||_<-m||x>m||x<-m)continue;const u=Math.hypot(_,x)||.01;if(u>=m)continue;const v=(m-u)/2,M=_/u,S=x/u;let C=h.remote?0:h.human||h.mounted?.4:1,A=p.remote?0:p.human||p.mounted?.4:1;C===0&&(A=2),A===0&&(C=2),h.x-=M*v*C,h.z-=S*v*C,p.x+=M*v*A,p.z+=S*v*A}}for(const l of g.units){if(l.dead){of(l,n);continue}if(l.remote){l.y=Rt(l.x,l.z);continue}Au(l,n,l.z)}g.units=g.units.filter(l=>!(l.dead&&l.deadT>14)),de.forEach((l,h)=>{const d=g.teams[h];if(g.mode==="conquest"&&!d.alive||(d.towerT-=n,d.towerT>0))return;d.towerT=1.4;const[p]=li({x:l.pos[0],z:l.pos[1],ti:h},24);p&&Su({x:l.pos[0],z:l.pos[1],y:0,vx:0,vz:0,ti:h,tower:!0},p,5.5)}),Ru(n,!0),Mg(n),vg()}function of(n,e){n.deadT+=e,n.x+=n.vx*e,n.z+=n.vz*e,n.vy-=18*e;const t=Rt(n.x,n.z);n.y=Math.max(t,n.y+n.vy*e);const i=Math.pow(n.y>t?.6:.03,e);n.vx*=i,n.vz*=i}function Ru(n,e){for(const t of g.arrows){if(t.stuck){t.life-=n;continue}t.t+=n/t.dur;const i=Math.min(1,t.t),r=t.x0+(t.x1-t.x0)*i,s=t.z0+(t.z1-t.z0)*i,a=t.y0+(t.y1-t.y0)*i+t.peak*4*i*(1-i);if(t.px=t.x,t.py=t.y,t.pz=t.z,t.x=r,t.y=a,t.z=s,a<8&&t.t>.12){for(const o of tg(r,s))if(!(a>o.h+Rt(o.x,o.z)||o.gate&&!lu(o))&&Math.abs(o.x-r)<o.r&&Math.abs(o.z-s)<o.r&&Math.hypot(o.x-r,o.z-s)<o.r){t.stuck=!0,t.life=2,Wt("thud",r,s),Ai(r,a,s,"#8a7a62",3);break}if(t.stuck)continue}if(t.t>=1)if(e){let o=null,c=1;for(const f of g.units){if(f.dead||!gi(f.ti,t.ti))continue;const l=Math.hypot(f.x-t.x1,f.z-t.z1)-(f.mounted?.5:0);l<c&&(c=l,o=f)}o?(dg(t,o),t.done=!0):(t.stuck=!0,t.life=3)}else t.stuck=!0,t.life=2.5}g.arrows=g.arrows.filter(t=>!(t.done||t.stuck&&t.life<=0))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const af="160",Lg=0,Bf=1,Dg=2,cf=1,Pu=2,Ni=3,vr=0,Vt=1,Nt=2,ur=0,Rs=1,Hf=2,Gf=3,Vf=4,Ig=5,Dr=100,Ug=101,kg=102,Wf=103,Xf=104,Ng=200,Og=201,zg=202,Fg=203,gl=204,_l=205,Bg=206,Hg=207,Gg=208,Vg=209,Wg=210,Xg=211,jg=212,qg=213,$g=214,Yg=0,Kg=1,Jg=2,ka=3,Zg=4,Qg=5,e0=6,t0=7,ec=0,n0=1,i0=2,pr=0,r0=1,s0=2,o0=3,Lu=4,a0=5,c0=6,Du=300,Gs=301,Vs=302,xl=303,vl=304,tc=306,Ws=1e3,fi=1001,yl=1002,yn=1003,jf=1004,vc=1005,Yn=1006,l0=1007,bo=1008,mr=1009,f0=1010,h0=1011,lf=1012,Iu=1013,cr=1014,lr=1015,Eo=1016,Uu=1017,ku=1018,Hr=1020,d0=1021,hi=1023,u0=1024,p0=1025,Gr=1026,Xs=1027,m0=1028,Nu=1029,g0=1030,Ou=1031,zu=1033,yc=33776,Mc=33777,Sc=33778,bc=33779,qf=35840,$f=35841,Yf=35842,Kf=35843,Fu=36196,Jf=37492,Zf=37496,Qf=37808,eh=37809,th=37810,nh=37811,ih=37812,rh=37813,sh=37814,oh=37815,ah=37816,ch=37817,lh=37818,fh=37819,hh=37820,dh=37821,Ec=36492,uh=36494,ph=36495,_0=36283,mh=36284,gh=36285,_h=36286,Bu=3e3,Vr=3001,x0=3200,v0=3201,ff=0,y0=1,Bn="",kt="srgb",Xi="srgb-linear",hf="display-p3",nc="display-p3-linear",Na="linear",Et="srgb",Oa="rec709",za="p3",ts=7680,xh=519,M0=512,S0=513,b0=514,Hu=515,E0=516,T0=517,A0=518,w0=519,vh=35044,yh=35048,Mh="300 es",Ml=1035,Bi=2e3,Fa=2001;class Js{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tc=Math.PI/180,Sl=180/Math.PI;function ko(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function Rn(n,e,t){return Math.max(e,Math.min(t,n))}function C0(n,e){return(n%e+e)%e}function Ac(n,e,t){return(1-t)*n+t*e}function Sh(n){return(n&n-1)===0&&n!==0}function bl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function io(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function An(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class nt{constructor(e=0,t=0){nt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,i,r,s,a,o,c,f){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f)}set(e,t,i,r,s,a,o,c,f){const l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=s,l[5]=c,l[6]=i,l[7]=a,l[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],f=i[1],l=i[4],h=i[7],d=i[2],p=i[5],_=i[8],x=r[0],m=r[3],u=r[6],v=r[1],M=r[4],S=r[7],C=r[2],A=r[5],R=r[8];return s[0]=a*x+o*v+c*C,s[3]=a*m+o*M+c*A,s[6]=a*u+o*S+c*R,s[1]=f*x+l*v+h*C,s[4]=f*m+l*M+h*A,s[7]=f*u+l*S+h*R,s[2]=d*x+p*v+_*C,s[5]=d*m+p*M+_*A,s[8]=d*u+p*S+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8];return t*a*l-t*o*f-i*s*l+i*o*c+r*s*f-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=l*a-o*f,d=o*c-l*s,p=f*s-a*c,_=t*h+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=h*x,e[1]=(r*f-l*i)*x,e[2]=(o*i-r*a)*x,e[3]=d*x,e[4]=(l*t-r*c)*x,e[5]=(r*s-o*t)*x,e[6]=p*x,e[7]=(i*c-f*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),f=Math.sin(s);return this.set(i*c,i*f,-i*(c*a+f*o)+a+e,-r*f,r*c,-r*(-f*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wc.makeScale(e,t)),this}rotate(e){return this.premultiply(wc.makeRotation(-e)),this}translate(e,t){return this.premultiply(wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wc=new et;function Gu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ba(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function R0(){const n=Ba("canvas");return n.style.display="block",n}const bh={};function go(n){n in bh||(bh[n]=!0,console.warn(n))}const Eh=new et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Th=new et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wo={[Xi]:{transfer:Na,primaries:Oa,toReference:n=>n,fromReference:n=>n},[kt]:{transfer:Et,primaries:Oa,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[nc]:{transfer:Na,primaries:za,toReference:n=>n.applyMatrix3(Th),fromReference:n=>n.applyMatrix3(Eh)},[hf]:{transfer:Et,primaries:za,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Th),fromReference:n=>n.applyMatrix3(Eh).convertLinearToSRGB()}},P0=new Set([Xi,nc]),pt={enabled:!0,_workingColorSpace:Xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!P0.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Wo[e].toReference,r=Wo[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Wo[n].primaries},getTransfer:function(n){return n===Bn?Na:Wo[n].transfer}};function Ps(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Cc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ns;class Vu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ns===void 0&&(ns=Ba("canvas")),ns.width=e.width,ns.height=e.height;const i=ns.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=Ba("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ps(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ps(t[i]/255)*255):t[i]=Ps(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let L0=0;class Wu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=ko(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Rc(r[a].image)):s.push(Rc(r[a]))}else s=Rc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Rc(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Vu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let D0=0;class Dn extends Js{constructor(e=Dn.DEFAULT_IMAGE,t=Dn.DEFAULT_MAPPING,i=fi,r=fi,s=Yn,a=bo,o=hi,c=mr,f=Dn.DEFAULT_ANISOTROPY,l=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=ko(),this.name="",this.source=new Wu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=f,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===Vr?kt:Bn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ws:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case yl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ws:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case yl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===kt?Vr:Bu}set encoding(e){go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Vr?kt:Bn}}Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=Du;Dn.DEFAULT_ANISOTROPY=1;class nn{constructor(e=0,t=0,i=0,r=1){nn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,f=c[0],l=c[4],h=c[8],d=c[1],p=c[5],_=c[9],x=c[2],m=c[6],u=c[10];if(Math.abs(l-d)<.01&&Math.abs(h-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+x)<.1&&Math.abs(_+m)<.1&&Math.abs(f+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(f+1)/2,S=(p+1)/2,C=(u+1)/2,A=(l+d)/4,R=(h+x)/4,L=(_+m)/4;return M>S&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=A/i,s=R/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=A/r,s=L/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=R/s,r=L/s),this.set(i,r,s,t),this}let v=Math.sqrt((m-_)*(m-_)+(h-x)*(h-x)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(h-x)/v,this.z=(d-l)/v,this.w=Math.acos((f+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class I0 extends Js{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nn(0,0,e,t),this.scissorTest=!1,this.viewport=new nn(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(go("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Vr?kt:Bn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Dn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Wu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qr extends I0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Xu extends Dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class U0 extends Dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ei{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],f=i[r+1],l=i[r+2],h=i[r+3];const d=s[a+0],p=s[a+1],_=s[a+2],x=s[a+3];if(o===0){e[t+0]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=x;return}if(h!==x||c!==d||f!==p||l!==_){let m=1-o;const u=c*d+f*p+l*_+h*x,v=u>=0?1:-1,M=1-u*u;if(M>Number.EPSILON){const C=Math.sqrt(M),A=Math.atan2(C,u*v);m=Math.sin(m*A)/C,o=Math.sin(o*A)/C}const S=o*v;if(c=c*m+d*S,f=f*m+p*S,l=l*m+_*S,h=h*m+x*S,m===1-o){const C=1/Math.sqrt(c*c+f*f+l*l+h*h);c*=C,f*=C,l*=C,h*=C}}e[t]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],f=i[r+2],l=i[r+3],h=s[a],d=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+l*h+c*p-f*d,e[t+1]=c*_+l*d+f*h-o*p,e[t+2]=f*_+l*p+o*d-c*h,e[t+3]=l*_-o*h-c*d-f*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,f=o(i/2),l=o(r/2),h=o(s/2),d=c(i/2),p=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*l*h+f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h-d*p*_;break;case"YXZ":this._x=d*l*h+f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h+d*p*_;break;case"ZXY":this._x=d*l*h-f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h-d*p*_;break;case"ZYX":this._x=d*l*h-f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h+d*p*_;break;case"YZX":this._x=d*l*h+f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h-d*p*_;break;case"XZY":this._x=d*l*h-f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],f=t[2],l=t[6],h=t[10],d=i+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(l-c)*p,this._y=(s-f)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(l-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+f)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-f)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+l)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+f)/p,this._y=(c+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,f=t._z,l=t._w;return this._x=i*l+a*o+r*f-s*c,this._y=r*l+a*c+s*o-i*f,this._z=s*l+a*f+i*c-r*o,this._w=a*l-i*o-r*c-s*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const f=Math.sqrt(c),l=Math.atan2(f,o),h=Math.sin((1-t)*l)/f,d=Math.sin(t*l)/f;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,i=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ah.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,f=2*(a*r-o*i),l=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*f+a*h-o*l,this.y=i+c*l+o*f-s*h,this.z=r+c*h+s*l-a*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Pc.copy(this).projectOnVector(e),this.sub(Pc)}reflect(e){return this.sub(Pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Rn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pc=new I,Ah=new ei;class $r{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ti):ti.fromBufferAttribute(s,a),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xo.copy(i.boundingBox)),Xo.applyMatrix4(e.matrixWorld),this.union(Xo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ro),jo.subVectors(this.max,ro),is.subVectors(e.a,ro),rs.subVectors(e.b,ro),ss.subVectors(e.c,ro),$i.subVectors(rs,is),Yi.subVectors(ss,rs),Tr.subVectors(is,ss);let t=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-Tr.z,Tr.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,Tr.z,0,-Tr.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-Tr.y,Tr.x,0];return!Lc(t,is,rs,ss,jo)||(t=[1,0,0,0,1,0,0,0,1],!Lc(t,is,rs,ss,jo))?!1:(qo.crossVectors($i,Yi),t=[qo.x,qo.y,qo.z],Lc(t,is,rs,ss,jo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ri=[new I,new I,new I,new I,new I,new I,new I,new I],ti=new I,Xo=new $r,is=new I,rs=new I,ss=new I,$i=new I,Yi=new I,Tr=new I,ro=new I,jo=new I,qo=new I,Ar=new I;function Lc(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ar.fromArray(n,s);const o=r.x*Math.abs(Ar.x)+r.y*Math.abs(Ar.y)+r.z*Math.abs(Ar.z),c=e.dot(Ar),f=t.dot(Ar),l=i.dot(Ar);if(Math.max(-Math.max(c,f,l),Math.min(c,f,l))>o)return!1}return!0}const k0=new $r,so=new I,Dc=new I;class No{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):k0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;so.subVectors(e,this.center);const t=so.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(so,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(so.copy(e.center).add(Dc)),this.expandByPoint(so.copy(e.center).sub(Dc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new I,Ic=new I,$o=new I,Ki=new I,Uc=new I,Yo=new I,kc=new I;class N0{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ic.copy(e).add(t).multiplyScalar(.5),$o.copy(t).sub(e).normalize(),Ki.copy(this.origin).sub(Ic);const s=e.distanceTo(t)*.5,a=-this.direction.dot($o),o=Ki.dot(this.direction),c=-Ki.dot($o),f=Ki.lengthSq(),l=Math.abs(1-a*a);let h,d,p,_;if(l>0)if(h=a*c-o,d=a*o-c,_=s*l,h>=0)if(d>=-_)if(d<=_){const x=1/l;h*=x,d*=x,p=h*(h+a*d+2*o)+d*(a*h+d+2*c)+f}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;else d<=-_?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+f):d<=_?(h=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+f):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+f);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ic).addScaledVector($o,d),p}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);const i=Pi.dot(this.direction),r=Pi.dot(Pi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const f=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return f>=0?(i=(e.min.x-d.x)*f,r=(e.max.x-d.x)*f):(i=(e.max.x-d.x)*f,r=(e.min.x-d.x)*f),l>=0?(s=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(s=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,i,r,s){Uc.subVectors(t,e),Yo.subVectors(i,e),kc.crossVectors(Uc,Yo);let a=this.direction.dot(kc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ki.subVectors(this.origin,e);const c=o*this.direction.dot(Yo.crossVectors(Ki,Yo));if(c<0)return null;const f=o*this.direction.dot(Uc.cross(Ki));if(f<0||c+f>a)return null;const l=-o*Ki.dot(kc);return l<0?null:this.at(l/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,i,r,s,a,o,c,f,l,h,d,p,_,x,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f,l,h,d,p,_,x,m)}set(e,t,i,r,s,a,o,c,f,l,h,d,p,_,x,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=f,u[6]=l,u[10]=h,u[14]=d,u[3]=p,u[7]=_,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/os.setFromMatrixColumn(e,0).length(),s=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),f=Math.sin(r),l=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*l,p=a*h,_=o*l,x=o*h;t[0]=c*l,t[4]=-c*h,t[8]=f,t[1]=p+_*f,t[5]=d-x*f,t[9]=-o*c,t[2]=x-d*f,t[6]=_+p*f,t[10]=a*c}else if(e.order==="YXZ"){const d=c*l,p=c*h,_=f*l,x=f*h;t[0]=d+x*o,t[4]=_*o-p,t[8]=a*f,t[1]=a*h,t[5]=a*l,t[9]=-o,t[2]=p*o-_,t[6]=x+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*l,p=c*h,_=f*l,x=f*h;t[0]=d-x*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*l,t[9]=x-d*o,t[2]=-a*f,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*l,p=a*h,_=o*l,x=o*h;t[0]=c*l,t[4]=_*f-p,t[8]=d*f+x,t[1]=c*h,t[5]=x*f+d,t[9]=p*f-_,t[2]=-f,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*f,_=o*c,x=o*f;t[0]=c*l,t[4]=x-d*h,t[8]=_*h+p,t[1]=h,t[5]=a*l,t[9]=-o*l,t[2]=-f*l,t[6]=p*h+_,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*c,p=a*f,_=o*c,x=o*f;t[0]=c*l,t[4]=-h,t[8]=f*l,t[1]=d*h+x,t[5]=a*l,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*l,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,z0)}lookAt(e,t,i){const r=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ji.crossVectors(i,Un),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ji.crossVectors(i,Un)),Ji.normalize(),Ko.crossVectors(Un,Ji),r[0]=Ji.x,r[4]=Ko.x,r[8]=Un.x,r[1]=Ji.y,r[5]=Ko.y,r[9]=Un.y,r[2]=Ji.z,r[6]=Ko.z,r[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],f=i[12],l=i[1],h=i[5],d=i[9],p=i[13],_=i[2],x=i[6],m=i[10],u=i[14],v=i[3],M=i[7],S=i[11],C=i[15],A=r[0],R=r[4],L=r[8],y=r[12],b=r[1],N=r[5],W=r[9],O=r[13],P=r[2],U=r[6],V=r[10],$=r[14],j=r[3],q=r[7],Y=r[11],ne=r[15];return s[0]=a*A+o*b+c*P+f*j,s[4]=a*R+o*N+c*U+f*q,s[8]=a*L+o*W+c*V+f*Y,s[12]=a*y+o*O+c*$+f*ne,s[1]=l*A+h*b+d*P+p*j,s[5]=l*R+h*N+d*U+p*q,s[9]=l*L+h*W+d*V+p*Y,s[13]=l*y+h*O+d*$+p*ne,s[2]=_*A+x*b+m*P+u*j,s[6]=_*R+x*N+m*U+u*q,s[10]=_*L+x*W+m*V+u*Y,s[14]=_*y+x*O+m*$+u*ne,s[3]=v*A+M*b+S*P+C*j,s[7]=v*R+M*N+S*U+C*q,s[11]=v*L+M*W+S*V+C*Y,s[15]=v*y+M*O+S*$+C*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],f=e[13],l=e[2],h=e[6],d=e[10],p=e[14],_=e[3],x=e[7],m=e[11],u=e[15];return _*(+s*c*h-r*f*h-s*o*d+i*f*d+r*o*p-i*c*p)+x*(+t*c*p-t*f*d+s*a*d-r*a*p+r*f*l-s*c*l)+m*(+t*f*h-t*o*p-s*a*h+i*a*p+s*o*l-i*f*l)+u*(-r*o*l-t*c*h+t*o*d+r*a*h-i*a*d+i*c*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=e[9],d=e[10],p=e[11],_=e[12],x=e[13],m=e[14],u=e[15],v=h*m*f-x*d*f+x*c*p-o*m*p-h*c*u+o*d*u,M=_*d*f-l*m*f-_*c*p+a*m*p+l*c*u-a*d*u,S=l*x*f-_*h*f+_*o*p-a*x*p-l*o*u+a*h*u,C=_*h*c-l*x*c-_*o*d+a*x*d+l*o*m-a*h*m,A=t*v+i*M+r*S+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=v*R,e[1]=(x*d*s-h*m*s-x*r*p+i*m*p+h*r*u-i*d*u)*R,e[2]=(o*m*s-x*c*s+x*r*f-i*m*f-o*r*u+i*c*u)*R,e[3]=(h*c*s-o*d*s-h*r*f+i*d*f+o*r*p-i*c*p)*R,e[4]=M*R,e[5]=(l*m*s-_*d*s+_*r*p-t*m*p-l*r*u+t*d*u)*R,e[6]=(_*c*s-a*m*s-_*r*f+t*m*f+a*r*u-t*c*u)*R,e[7]=(a*d*s-l*c*s+l*r*f-t*d*f-a*r*p+t*c*p)*R,e[8]=S*R,e[9]=(_*h*s-l*x*s-_*i*p+t*x*p+l*i*u-t*h*u)*R,e[10]=(a*x*s-_*o*s+_*i*f-t*x*f-a*i*u+t*o*u)*R,e[11]=(l*o*s-a*h*s-l*i*f+t*h*f+a*i*p-t*o*p)*R,e[12]=C*R,e[13]=(l*x*r-_*h*r+_*i*d-t*x*d-l*i*m+t*h*m)*R,e[14]=(_*o*r-a*x*r-_*i*c+t*x*c+a*i*m-t*o*m)*R,e[15]=(a*h*r-l*o*r+l*i*c-t*h*c-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,f=s*a,l=s*o;return this.set(f*a+i,f*o-r*c,f*c+r*o,0,f*o+r*c,l*o+i,l*c-r*a,0,f*c-r*o,l*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,f=s+s,l=a+a,h=o+o,d=s*f,p=s*l,_=s*h,x=a*l,m=a*h,u=o*h,v=c*f,M=c*l,S=c*h,C=i.x,A=i.y,R=i.z;return r[0]=(1-(x+u))*C,r[1]=(p+S)*C,r[2]=(_-M)*C,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(d+u))*A,r[6]=(m+v)*A,r[7]=0,r[8]=(_+M)*R,r[9]=(m-v)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=os.set(r[0],r[1],r[2]).length();const a=os.set(r[4],r[5],r[6]).length(),o=os.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ni.copy(this);const f=1/s,l=1/a,h=1/o;return ni.elements[0]*=f,ni.elements[1]*=f,ni.elements[2]*=f,ni.elements[4]*=l,ni.elements[5]*=l,ni.elements[6]*=l,ni.elements[8]*=h,ni.elements[9]*=h,ni.elements[10]*=h,t.setFromRotationMatrix(ni),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Bi){const c=this.elements,f=2*s/(t-e),l=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,_;if(o===Bi)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Fa)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=l,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Bi){const c=this.elements,f=1/(t-e),l=1/(i-r),h=1/(a-s),d=(t+e)*f,p=(i+r)*l;let _,x;if(o===Bi)_=(a+s)*h,x=-2*h;else if(o===Fa)_=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*f,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const os=new I,ni=new tt,O0=new I(0,0,0),z0=new I(1,1,1),Ji=new I,Ko=new I,Un=new I,wh=new tt,Ch=new ei;class ji{constructor(e=0,t=0,i=0,r=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],f=r[5],l=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Rn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,f),this._z=0);break;case"YXZ":this._x=Math.asin(-Rn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,f)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Rn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,f)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Rn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,f));break;case"YZX":this._z=Math.asin(Rn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,f),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Rn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,f),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return wh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class ju{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let F0=0;const Rh=new I,as=new ei,Li=new tt,Jo=new I,oo=new I,B0=new I,H0=new ei,Ph=new I(1,0,0),Lh=new I(0,1,0),Dh=new I(0,0,1),G0={type:"added"},V0={type:"removed"};class rn extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=ko(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new I,t=new ji,i=new ei,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new et}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ju,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Ph,e)}rotateY(e){return this.rotateOnAxis(Lh,e)}rotateZ(e){return this.rotateOnAxis(Dh,e)}translateOnAxis(e,t){return Rh.copy(e).applyQuaternion(this.quaternion),this.position.add(Rh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ph,e)}translateY(e){return this.translateOnAxis(Lh,e)}translateZ(e){return this.translateOnAxis(Dh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Jo.copy(e):Jo.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(oo,Jo,this.up):Li.lookAt(Jo,oo,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),as.setFromRotationMatrix(Li),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(G0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(V0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,e,B0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,H0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let f=0,l=c.length;f<l;f++){const h=c[f];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,f=this.material.length;c<f;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),f=a(e.textures),l=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),f.length>0&&(i.textures=f),l.length>0&&(i.images=l),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const f in o){const l=o[f];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}rn.DEFAULT_UP=new I(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ii=new I,Di=new I,Nc=new I,Ii=new I,cs=new I,ls=new I,Ih=new I,Oc=new I,zc=new I,Fc=new I;let Zo=!1;class ci{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ii.subVectors(e,t),r.cross(ii);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){ii.subVectors(r,t),Di.subVectors(i,t),Nc.subVectors(e,t);const a=ii.dot(ii),o=ii.dot(Di),c=ii.dot(Nc),f=Di.dot(Di),l=Di.dot(Nc),h=a*f-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(f*c-o*l)*d,_=(a*l-o*c)*d;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(e,t,i,r,s,a,o,c){return Zo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zo=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ii.x),c.addScaledVector(a,Ii.y),c.addScaledVector(o,Ii.z),c)}static isFrontFacing(e,t,i,r){return ii.subVectors(i,t),Di.subVectors(e,t),ii.cross(Di).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ii.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Zo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Zo=!0),ci.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return ci.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;cs.subVectors(r,i),ls.subVectors(s,i),Oc.subVectors(e,i);const c=cs.dot(Oc),f=ls.dot(Oc);if(c<=0&&f<=0)return t.copy(i);zc.subVectors(e,r);const l=cs.dot(zc),h=ls.dot(zc);if(l>=0&&h<=l)return t.copy(r);const d=c*h-l*f;if(d<=0&&c>=0&&l<=0)return a=c/(c-l),t.copy(i).addScaledVector(cs,a);Fc.subVectors(e,s);const p=cs.dot(Fc),_=ls.dot(Fc);if(_>=0&&p<=_)return t.copy(s);const x=p*f-c*_;if(x<=0&&f>=0&&_<=0)return o=f/(f-_),t.copy(i).addScaledVector(ls,o);const m=l*_-p*h;if(m<=0&&h-l>=0&&p-_>=0)return Ih.subVectors(s,r),o=(h-l)/(h-l+(p-_)),t.copy(r).addScaledVector(Ih,o);const u=1/(m+x+d);return a=x*u,o=d*u,t.copy(i).addScaledVector(cs,a).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Qo={h:0,s:0,l:0};function Bc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Te{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=pt.workingColorSpace){return this.r=e,this.g=t,this.b=i,pt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=pt.workingColorSpace){if(e=C0(e,1),t=Rn(t,0,1),i=Rn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Bc(a,s,e+1/3),this.g=Bc(a,s,e),this.b=Bc(a,s,e-1/3)}return pt.toWorkingColorSpace(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=qu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}copyLinearToSRGB(e){return this.r=Cc(e.r),this.g=Cc(e.g),this.b=Cc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return pt.fromWorkingColorSpace(fn.copy(this),e),Math.round(Rn(fn.r*255,0,255))*65536+Math.round(Rn(fn.g*255,0,255))*256+Math.round(Rn(fn.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(fn.copy(this),t);const i=fn.r,r=fn.g,s=fn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,f;const l=(o+a)/2;if(o===a)c=0,f=0;else{const h=a-o;switch(f=l<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=f,e.l=l,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=kt){pt.fromWorkingColorSpace(fn.copy(this),e);const t=fn.r,i=fn.g,r=fn.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(Qo);const i=Ac(Zi.h,Qo.h,t),r=Ac(Zi.s,Qo.s,t),s=Ac(Zi.l,Qo.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new Te;Te.NAMES=qu;let W0=0;class Zs extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=ko(),this.name="",this.type="Material",this.blending=Rs,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gl,this.blendDst=_l,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Rs&&(i.blending=this.blending),this.side!==vr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gl&&(i.blendSrc=this.blendSrc),this.blendDst!==_l&&(i.blendDst=this.blendDst),this.blendEquation!==Dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ka&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ei extends Zs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zt=new I,ea=new nt;class pi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=lr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ea.fromBufferAttribute(this,t),ea.applyMatrix3(e),this.setXY(t,ea.x,ea.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=io(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=An(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=io(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=io(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=io(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=io(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array),s=An(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vh&&(e.usage=this.usage),e}}class $u extends pi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yu extends pi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends pi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let X0=0;const Vn=new tt,Hc=new rn,fs=new I,kn=new $r,ao=new $r,Yt=new I;class Tn extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=ko(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gu(e)?Yu:$u)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new et().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return Hc.lookAt(e),Hc.updateMatrix(),this.applyMatrix4(Hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];kn.setFromBufferAttribute(s),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,kn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,kn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(kn.min),this.boundingBox.expandByPoint(kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new No);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(kn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ao.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(kn.min,ao.min),kn.expandByPoint(Yt),Yt.addVectors(kn.max,ao.max),kn.expandByPoint(Yt)):(kn.expandByPoint(ao.min),kn.expandByPoint(ao.max))}kn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let f=0,l=o.count;f<l;f++)Yt.fromBufferAttribute(o,f),c&&(fs.fromBufferAttribute(e,f),Yt.add(fs)),r=Math.max(r,i.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,f=[],l=[];for(let b=0;b<o;b++)f[b]=new I,l[b]=new I;const h=new I,d=new I,p=new I,_=new nt,x=new nt,m=new nt,u=new I,v=new I;function M(b,N,W){h.fromArray(r,b*3),d.fromArray(r,N*3),p.fromArray(r,W*3),_.fromArray(a,b*2),x.fromArray(a,N*2),m.fromArray(a,W*2),d.sub(h),p.sub(h),x.sub(_),m.sub(_);const O=1/(x.x*m.y-m.x*x.y);isFinite(O)&&(u.copy(d).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(O),v.copy(p).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(O),f[b].add(u),f[N].add(u),f[W].add(u),l[b].add(v),l[N].add(v),l[W].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let b=0,N=S.length;b<N;++b){const W=S[b],O=W.start,P=W.count;for(let U=O,V=O+P;U<V;U+=3)M(i[U+0],i[U+1],i[U+2])}const C=new I,A=new I,R=new I,L=new I;function y(b){R.fromArray(s,b*3),L.copy(R);const N=f[b];C.copy(N),C.sub(R.multiplyScalar(R.dot(N))).normalize(),A.crossVectors(L,N);const O=A.dot(l[b])<0?-1:1;c[b*4]=C.x,c[b*4+1]=C.y,c[b*4+2]=C.z,c[b*4+3]=O}for(let b=0,N=S.length;b<N;++b){const W=S[b],O=W.start,P=W.count;for(let U=O,V=O+P;U<V;U+=3)y(i[U+0]),y(i[U+1]),y(i[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,f=new I,l=new I,h=new I;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),f.fromBufferAttribute(i,m),o.add(l),c.add(l),f.add(l),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,f.x,f.y,f.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,c){const f=o.array,l=o.itemSize,h=o.normalized,d=new f.constructor(c.length*l);let p=0,_=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*l;for(let u=0;u<l;u++)d[_++]=f[p++]}return new pi(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],f=e(c,i);t.setAttribute(o,f)}const s=this.morphAttributes;for(const o in s){const c=[],f=s[o];for(let l=0,h=f.length;l<h;l++){const d=f[l],p=e(d,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const f=a[o];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const f in c)c[f]!==void 0&&(e[f]=c[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const f=i[c];e.data.attributes[c]=f.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const f=this.morphAttributes[c],l=[];for(let h=0,d=f.length;h<d;h++){const p=f[h];l.push(p.toJSON(e.data))}l.length>0&&(r[c]=l,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const f in r){const l=r[f];this.setAttribute(f,l.clone(t))}const s=e.morphAttributes;for(const f in s){const l=[],h=s[f];for(let d=0,p=h.length;d<p;d++)l.push(h[d].clone(t));this.morphAttributes[f]=l}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let f=0,l=a.length;f<l;f++){const h=a[f];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uh=new tt,wr=new N0,ta=new No,kh=new I,hs=new I,ds=new I,us=new I,Gc=new I,na=new I,ia=new nt,ra=new nt,sa=new nt,Nh=new I,Oh=new I,zh=new I,oa=new I,aa=new I;class Ee extends rn{constructor(e=new Tn,t=new Ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){na.set(0,0,0);for(let c=0,f=s.length;c<f;c++){const l=o[c],h=s[c];l!==0&&(Gc.fromBufferAttribute(h,e),a?na.addScaledVector(Gc,l):na.addScaledVector(Gc.sub(t),l))}t.add(na)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(s),wr.copy(e.ray).recast(e.near),!(ta.containsPoint(wr.origin)===!1&&(wr.intersectSphere(ta,kh)===null||wr.origin.distanceToSquared(kh)>(e.far-e.near)**2))&&(Uh.copy(s).invert(),wr.copy(e.ray).applyMatrix4(Uh),!(i.boundingBox!==null&&wr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,f=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=d.length;_<x;_++){const m=d[_],u=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,C=M;S<C;S+=3){const A=o.getX(S),R=o.getX(S+1),L=o.getX(S+2);r=ca(this,u,e,i,f,l,h,A,R,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=_,u=x;m<u;m+=3){const v=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);r=ca(this,a,e,i,f,l,h,v,M,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,x=d.length;_<x;_++){const m=d[_],u=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,C=M;S<C;S+=3){const A=S,R=S+1,L=S+2;r=ca(this,u,e,i,f,l,h,A,R,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=_,u=x;m<u;m+=3){const v=m,M=m+1,S=m+2;r=ca(this,a,e,i,f,l,h,v,M,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function j0(n,e,t,i,r,s,a,o){let c;if(e.side===Vt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===vr,o),c===null)return null;aa.copy(o),aa.applyMatrix4(n.matrixWorld);const f=t.ray.origin.distanceTo(aa);return f<t.near||f>t.far?null:{distance:f,point:aa.clone(),object:n}}function ca(n,e,t,i,r,s,a,o,c,f){n.getVertexPosition(o,hs),n.getVertexPosition(c,ds),n.getVertexPosition(f,us);const l=j0(n,e,t,i,hs,ds,us,oa);if(l){r&&(ia.fromBufferAttribute(r,o),ra.fromBufferAttribute(r,c),sa.fromBufferAttribute(r,f),l.uv=ci.getInterpolation(oa,hs,ds,us,ia,ra,sa,new nt)),s&&(ia.fromBufferAttribute(s,o),ra.fromBufferAttribute(s,c),sa.fromBufferAttribute(s,f),l.uv1=ci.getInterpolation(oa,hs,ds,us,ia,ra,sa,new nt),l.uv2=l.uv1),a&&(Nh.fromBufferAttribute(a,o),Oh.fromBufferAttribute(a,c),zh.fromBufferAttribute(a,f),l.normal=ci.getInterpolation(oa,hs,ds,us,Nh,Oh,zh,new I),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const h={a:o,b:c,c:f,normal:new I,materialIndex:0};ci.getNormal(hs,ds,us,h.normal),l.face=h}return l}class Ie extends Tn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],f=[],l=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new dt(f,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(h,2));function _(x,m,u,v,M,S,C,A,R,L,y){const b=S/R,N=C/L,W=S/2,O=C/2,P=A/2,U=R+1,V=L+1;let $=0,j=0;const q=new I;for(let Y=0;Y<V;Y++){const ne=Y*N-O;for(let ie=0;ie<U;ie++){const X=ie*b-W;q[x]=X*v,q[m]=ne*M,q[u]=P,f.push(q.x,q.y,q.z),q[x]=0,q[m]=0,q[u]=A>0?1:-1,l.push(q.x,q.y,q.z),h.push(ie/R),h.push(1-Y/L),$+=1}}for(let Y=0;Y<L;Y++)for(let ne=0;ne<R;ne++){const ie=d+ne+U*Y,X=d+ne+U*(Y+1),K=d+(ne+1)+U*(Y+1),le=d+(ne+1)+U*Y;c.push(ie,X,le),c.push(X,K,le),j+=6}o.addGroup(p,j,y),p+=j,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ie(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function js(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function vn(n){const e={};for(let t=0;t<n.length;t++){const i=js(n[t]);for(const r in i)e[r]=i[r]}return e}function q0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ku(n){return n.getRenderTarget()===null?n.outputColorSpace:pt.workingColorSpace}const $0={clone:js,merge:vn};var Y0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yr extends Zs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y0,this.fragmentShader=K0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=q0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ju extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Kn extends Ju{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Sl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sl*2*Math.atan(Math.tan(Tc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,f=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/f,r*=a.width/c,i*=a.height/f}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class J0 extends rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kn(ps,ms,e,t);r.layers=this.layers,this.add(r);const s=new Kn(ps,ms,e,t);s.layers=this.layers,this.add(s);const a=new Kn(ps,ms,e,t);a.layers=this.layers,this.add(a);const o=new Kn(ps,ms,e,t);o.layers=this.layers,this.add(o);const c=new Kn(ps,ms,e,t);c.layers=this.layers,this.add(c);const f=new Kn(ps,ms,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const f of t)this.remove(f);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,f,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,f),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,l),e.setRenderTarget(h,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Zu extends Dn{constructor(e,t,i,r,s,a,o,c,f,l){e=e!==void 0?e:[],t=t!==void 0?t:Gs,super(e,t,i,r,s,a,o,c,f,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Z0 extends qr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(go("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Vr?kt:Bn),this.texture=new Zu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ie(5,5,5),s=new yr({name:"CubemapFromEquirect",uniforms:js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vt,blending:ur});s.uniforms.tEquirect.value=t;const a=new Ee(r,s),o=t.minFilter;return t.minFilter===bo&&(t.minFilter=Yn),new J0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Vc=new I,Q0=new I,e_=new et;class Pr{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Vc.subVectors(i,t).cross(Q0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Vc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||e_.getNormalMatrix(e),r=this.coplanarPoint(Vc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cr=new No,la=new I;class df{constructor(e=new Pr,t=new Pr,i=new Pr,r=new Pr,s=new Pr,a=new Pr){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],f=r[4],l=r[5],h=r[6],d=r[7],p=r[8],_=r[9],x=r[10],m=r[11],u=r[12],v=r[13],M=r[14],S=r[15];if(i[0].setComponents(c-s,d-f,m-p,S-u).normalize(),i[1].setComponents(c+s,d+f,m+p,S+u).normalize(),i[2].setComponents(c+a,d+l,m+_,S+v).normalize(),i[3].setComponents(c-a,d-l,m-_,S-v).normalize(),i[4].setComponents(c-o,d-h,m-x,S-M).normalize(),t===Bi)i[5].setComponents(c+o,d+h,m+x,S+M).normalize();else if(t===Fa)i[5].setComponents(o,h,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cr)}intersectsSprite(e){return Cr.center.set(0,0,0),Cr.radius=.7071067811865476,Cr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(la.x=r.normal.x>0?e.max.x:e.min.x,la.y=r.normal.y>0?e.max.y:e.min.y,la.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(la)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function t_(n,e){const t=e.isWebGL2,i=new WeakMap;function r(f,l){const h=f.array,d=f.usage,p=h.byteLength,_=n.createBuffer();n.bindBuffer(l,_),n.bufferData(l,h,d),f.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(h instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:p}}function s(f,l,h){const d=l.array,p=l._updateRange,_=l.updateRanges;if(n.bindBuffer(h,f),p.count===-1&&_.length===0&&n.bufferSubData(h,0,d),_.length!==0){for(let x=0,m=_.length;x<m;x++){const u=_[x];t?n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}l.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),l.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),i.get(f)}function o(f){f.isInterleavedBufferAttribute&&(f=f.data);const l=i.get(f);l&&(n.deleteBuffer(l.buffer),i.delete(f))}function c(f,l){if(f.isGLBufferAttribute){const d=i.get(f);(!d||d.version<f.version)&&i.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);const h=i.get(f);if(h===void 0)i.set(f,r(f,l));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,f,l),h.version=f.version}}return{get:a,remove:o,update:c}}class un extends Tn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),f=o+1,l=c+1,h=e/o,d=t/c,p=[],_=[],x=[],m=[];for(let u=0;u<l;u++){const v=u*d-a;for(let M=0;M<f;M++){const S=M*h-s;_.push(S,-v,0),x.push(0,0,1),m.push(M/o),m.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<o;v++){const M=v+f*u,S=v+f*(u+1),C=v+1+f*(u+1),A=v+1+f*u;p.push(M,S,A),p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new dt(_,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.width,e.height,e.widthSegments,e.heightSegments)}}var n_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,i_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,r_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,a_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,l_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,f_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,h_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,d_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,u_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,p_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,m_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,g_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,__=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,v_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,M_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,b_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,E_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,T_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,A_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,w_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,C_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,R_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,P_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D_="gl_FragColor = linearToOutputTexel( gl_FragColor );",I_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,U_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,k_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,N_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,O_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,F_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,W_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,X_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,j_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Y_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,K_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Z_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ex=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ix=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ox=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ax=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,cx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,lx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,px=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,_x=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,xx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ex=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Px=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ux=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,zx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$x=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ev=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ov=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,lv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_v=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ev=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Av=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Iv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:n_,alphahash_pars_fragment:i_,alphamap_fragment:r_,alphamap_pars_fragment:s_,alphatest_fragment:o_,alphatest_pars_fragment:a_,aomap_fragment:c_,aomap_pars_fragment:l_,batching_pars_vertex:f_,batching_vertex:h_,begin_vertex:d_,beginnormal_vertex:u_,bsdfs:p_,iridescence_fragment:m_,bumpmap_pars_fragment:g_,clipping_planes_fragment:__,clipping_planes_pars_fragment:x_,clipping_planes_pars_vertex:v_,clipping_planes_vertex:y_,color_fragment:M_,color_pars_fragment:S_,color_pars_vertex:b_,color_vertex:E_,common:T_,cube_uv_reflection_fragment:A_,defaultnormal_vertex:w_,displacementmap_pars_vertex:C_,displacementmap_vertex:R_,emissivemap_fragment:P_,emissivemap_pars_fragment:L_,colorspace_fragment:D_,colorspace_pars_fragment:I_,envmap_fragment:U_,envmap_common_pars_fragment:k_,envmap_pars_fragment:N_,envmap_pars_vertex:O_,envmap_physical_pars_fragment:Y_,envmap_vertex:z_,fog_vertex:F_,fog_pars_vertex:B_,fog_fragment:H_,fog_pars_fragment:G_,gradientmap_pars_fragment:V_,lightmap_fragment:W_,lightmap_pars_fragment:X_,lights_lambert_fragment:j_,lights_lambert_pars_fragment:q_,lights_pars_begin:$_,lights_toon_fragment:K_,lights_toon_pars_fragment:J_,lights_phong_fragment:Z_,lights_phong_pars_fragment:Q_,lights_physical_fragment:ex,lights_physical_pars_fragment:tx,lights_fragment_begin:nx,lights_fragment_maps:ix,lights_fragment_end:rx,logdepthbuf_fragment:sx,logdepthbuf_pars_fragment:ox,logdepthbuf_pars_vertex:ax,logdepthbuf_vertex:cx,map_fragment:lx,map_pars_fragment:fx,map_particle_fragment:hx,map_particle_pars_fragment:dx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:px,morphcolor_vertex:mx,morphnormal_vertex:gx,morphtarget_pars_vertex:_x,morphtarget_vertex:xx,normal_fragment_begin:vx,normal_fragment_maps:yx,normal_pars_fragment:Mx,normal_pars_vertex:Sx,normal_vertex:bx,normalmap_pars_fragment:Ex,clearcoat_normal_fragment_begin:Tx,clearcoat_normal_fragment_maps:Ax,clearcoat_pars_fragment:wx,iridescence_pars_fragment:Cx,opaque_fragment:Rx,packing:Px,premultiplied_alpha_fragment:Lx,project_vertex:Dx,dithering_fragment:Ix,dithering_pars_fragment:Ux,roughnessmap_fragment:kx,roughnessmap_pars_fragment:Nx,shadowmap_pars_fragment:Ox,shadowmap_pars_vertex:zx,shadowmap_vertex:Fx,shadowmask_pars_fragment:Bx,skinbase_vertex:Hx,skinning_pars_vertex:Gx,skinning_vertex:Vx,skinnormal_vertex:Wx,specularmap_fragment:Xx,specularmap_pars_fragment:jx,tonemapping_fragment:qx,tonemapping_pars_fragment:$x,transmission_fragment:Yx,transmission_pars_fragment:Kx,uv_pars_fragment:Jx,uv_pars_vertex:Zx,uv_vertex:Qx,worldpos_vertex:ev,background_vert:tv,background_frag:nv,backgroundCube_vert:iv,backgroundCube_frag:rv,cube_vert:sv,cube_frag:ov,depth_vert:av,depth_frag:cv,distanceRGBA_vert:lv,distanceRGBA_frag:fv,equirect_vert:hv,equirect_frag:dv,linedashed_vert:uv,linedashed_frag:pv,meshbasic_vert:mv,meshbasic_frag:gv,meshlambert_vert:_v,meshlambert_frag:xv,meshmatcap_vert:vv,meshmatcap_frag:yv,meshnormal_vert:Mv,meshnormal_frag:Sv,meshphong_vert:bv,meshphong_frag:Ev,meshphysical_vert:Tv,meshphysical_frag:Av,meshtoon_vert:wv,meshtoon_frag:Cv,points_vert:Rv,points_frag:Pv,shadow_vert:Lv,shadow_frag:Dv,sprite_vert:Iv,sprite_frag:Uv},se={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Si={basic:{uniforms:vn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:vn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Te(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:vn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:vn([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:vn([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Te(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:vn([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:vn([se.points,se.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:vn([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:vn([se.common,se.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:vn([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:vn([se.sprite,se.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:vn([se.common,se.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:vn([se.lights,se.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Si.physical={uniforms:vn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const fa={r:0,b:0,g:0};function kv(n,e,t,i,r,s,a){const o=new Te(0);let c=s===!0?0:1,f,l,h=null,d=0,p=null;function _(m,u){let v=!1,M=u.isScene===!0?u.background:null;M&&M.isTexture&&(M=(u.backgroundBlurriness>0?t:e).get(M)),M===null?x(o,c):M&&M.isColor&&(x(M,1),v=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===tc)?(l===void 0&&(l=new Ee(new Ie(1,1,1),new yr({name:"BackgroundCubeMaterial",uniforms:js(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=pt.getTransfer(M.colorSpace)!==Et,(h!==M||d!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(f===void 0&&(f=new Ee(new un(2,2),new yr({name:"BackgroundMaterial",uniforms:js(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=M,f.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,f.material.toneMapped=pt.getTransfer(M.colorSpace)!==Et,M.matrixAutoUpdate===!0&&M.updateMatrix(),f.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||p!==n.toneMapping)&&(f.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),f.layers.enableAll(),m.unshift(f,f.geometry,f.material,0,0,null))}function x(m,u){m.getRGB(fa,Ku(n)),i.buffers.color.setClear(fa.r,fa.g,fa.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(m,u=1){o.set(m),c=u,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(o,c)},render:_}}function Nv(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=m(null);let f=c,l=!1;function h(P,U,V,$,j){let q=!1;if(a){const Y=x($,V,U);f!==Y&&(f=Y,p(f.object)),q=u(P,$,V,j),q&&v(P,$,V,j)}else{const Y=U.wireframe===!0;(f.geometry!==$.id||f.program!==V.id||f.wireframe!==Y)&&(f.geometry=$.id,f.program=V.id,f.wireframe=Y,q=!0)}j!==null&&t.update(j,n.ELEMENT_ARRAY_BUFFER),(q||l)&&(l=!1,L(P,U,V,$),j!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function _(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function x(P,U,V){const $=V.wireframe===!0;let j=o[P.id];j===void 0&&(j={},o[P.id]=j);let q=j[U.id];q===void 0&&(q={},j[U.id]=q);let Y=q[$];return Y===void 0&&(Y=m(d()),q[$]=Y),Y}function m(P){const U=[],V=[],$=[];for(let j=0;j<r;j++)U[j]=0,V[j]=0,$[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:$,object:P,attributes:{},index:null}}function u(P,U,V,$){const j=f.attributes,q=U.attributes;let Y=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const K=j[ie];let le=q[ie];if(le===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),K===void 0||K.attribute!==le||le&&K.data!==le.data)return!0;Y++}return f.attributesNum!==Y||f.index!==$}function v(P,U,V,$){const j={},q=U.attributes;let Y=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let K=q[ie];K===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const le={};le.attribute=K,K&&K.data&&(le.data=K.data),j[ie]=le,Y++}f.attributes=j,f.attributesNum=Y,f.index=$}function M(){const P=f.newAttributes;for(let U=0,V=P.length;U<V;U++)P[U]=0}function S(P){C(P,0)}function C(P,U){const V=f.newAttributes,$=f.enabledAttributes,j=f.attributeDivisors;V[P]=1,$[P]===0&&(n.enableVertexAttribArray(P),$[P]=1),j[P]!==U&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,U),j[P]=U)}function A(){const P=f.newAttributes,U=f.enabledAttributes;for(let V=0,$=U.length;V<$;V++)U[V]!==P[V]&&(n.disableVertexAttribArray(V),U[V]=0)}function R(P,U,V,$,j,q,Y){Y===!0?n.vertexAttribIPointer(P,U,V,j,q):n.vertexAttribPointer(P,U,V,$,j,q)}function L(P,U,V,$){if(i.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;M();const j=$.attributes,q=V.getAttributes(),Y=U.defaultAttributeValues;for(const ne in q){const ie=q[ne];if(ie.location>=0){let X=j[ne];if(X===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(X=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(X=P.instanceColor)),X!==void 0){const K=X.normalized,le=X.itemSize,be=t.get(X);if(be===void 0)continue;const Me=be.buffer,He=be.type,Ve=be.bytesPerElement,Ue=i.isWebGL2===!0&&(He===n.INT||He===n.UNSIGNED_INT||X.gpuType===Iu);if(X.isInterleavedBufferAttribute){const ot=X.data,z=ot.stride,mn=X.offset;if(ot.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ie.locationSize;Ce++)C(ie.location+Ce,ot.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ce=0;Ce<ie.locationSize;Ce++)S(ie.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Ce=0;Ce<ie.locationSize;Ce++)R(ie.location+Ce,le/ie.locationSize,He,K,z*Ve,(mn+le/ie.locationSize*Ce)*Ve,Ue)}else{if(X.isInstancedBufferAttribute){for(let ot=0;ot<ie.locationSize;ot++)C(ie.location+ot,X.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let ot=0;ot<ie.locationSize;ot++)S(ie.location+ot);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let ot=0;ot<ie.locationSize;ot++)R(ie.location+ot,le/ie.locationSize,He,K,le*Ve,le/ie.locationSize*ot*Ve,Ue)}}else if(Y!==void 0){const K=Y[ne];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(ie.location,K);break;case 3:n.vertexAttrib3fv(ie.location,K);break;case 4:n.vertexAttrib4fv(ie.location,K);break;default:n.vertexAttrib1fv(ie.location,K)}}}}A()}function y(){W();for(const P in o){const U=o[P];for(const V in U){const $=U[V];for(const j in $)_($[j].object),delete $[j];delete U[V]}delete o[P]}}function b(P){if(o[P.id]===void 0)return;const U=o[P.id];for(const V in U){const $=U[V];for(const j in $)_($[j].object),delete $[j];delete U[V]}delete o[P.id]}function N(P){for(const U in o){const V=o[U];if(V[P.id]===void 0)continue;const $=V[P.id];for(const j in $)_($[j].object),delete $[j];delete V[P.id]}}function W(){O(),l=!0,f!==c&&(f=c,p(f.object))}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:O,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:N,initAttributes:M,enableAttribute:S,disableUnusedAttributes:A}}function Ov(n,e,t,i){const r=i.isWebGL2;let s;function a(l){s=l}function o(l,h){n.drawArrays(s,l,h),t.update(h,s,1)}function c(l,h,d){if(d===0)return;let p,_;if(r)p=n,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,l,h,d),t.update(h,s,d)}function f(l,h,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(l[_],h[_]);else{p.multiDrawArraysWEBGL(s,l,0,h,0,d);let _=0;for(let x=0;x<d;x++)_+=h[x];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=f}function zv(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const f=a||e.has("WEBGL_draw_buffers"),l=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=d>0,S=a||e.has("OES_texture_float"),C=M&&S,A=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:f,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:M,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:A}}function Fv(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Pr,o=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=l(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,u=n.get(h);if(!r||_===null||_.length===0||s&&!m)s?l(null):f();else{const v=s?0:i,M=v*4;let S=u.clippingState||null;c.value=S,S=l(_,d,M,p);for(let C=0;C!==M;++C)S[C]=t[C];u.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function f(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function l(h,d,p,_){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const u=p+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<u)&&(m=new Float32Array(u));for(let M=0,S=p;M!==x;++M,S+=4)a.copy(h[M]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Bv(n){let e=new WeakMap;function t(a,o){return o===xl?a.mapping=Gs:o===vl&&(a.mapping=Vs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===xl||o===vl)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const f=new Z0(c.height/2);return f.fromEquirectangularTexture(n,a),e.set(a,f),a.addEventListener("dispose",r),t(f.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class ep extends Ju{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,a=s+f*this.view.width,o-=l*this.view.offsetY,c=o-l*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,Fh=[.125,.215,.35,.446,.526,.582],Ir=20,Wc=new ep,Bh=new Te;let Xc=null,jc=0,qc=0;const Lr=(1+Math.sqrt(5))/2,gs=1/Lr,Hh=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,Lr,gs),new I(0,Lr,-gs),new I(gs,0,Lr),new I(-gs,0,Lr),new I(Lr,gs,0),new I(-Lr,gs,0)];class Gh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Xc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xc,jc,qc),e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),qc=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:Eo,format:hi,colorSpace:Xi,depthBuffer:!1},r=Vh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vh(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hv(s)),this._blurMaterial=Gv(s,e,t)}return r}_compileMaterial(e){const t=new Ee(this._lodPlanes[0],e);this._renderer.compile(t,Wc)}_sceneToCubeUV(e,t,i,r){const o=new Kn(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,d=l.toneMapping;l.getClearColor(Bh),l.toneMapping=pr,l.autoClear=!1;const p=new Ei({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),_=new Ee(new Ie,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Bh),x=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(o.up.set(0,c[u],0),o.lookAt(f[u],0,0)):v===1?(o.up.set(0,0,c[u]),o.lookAt(0,f[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,f[u]));const M=this._cubeSize;ha(r,v*M,u>2?M:0,M,M),l.setRenderTarget(r),x&&l.render(_,o),l.render(e,o)}_.geometry.dispose(),_.material.dispose(),l.toneMapping=d,l.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Gs||e.mapping===Vs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ee(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ha(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Wc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hh[(r-1)%Hh.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,f=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,h=new Ee(this._lodPlanes[r],f),d=f.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ir-1),x=s/_,m=isFinite(s)?1+Math.floor(l*x):Ir;m>Ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ir}`);const u=[];let v=0;for(let R=0;R<Ir;++R){const L=R/x,y=Math.exp(-L*L/2);u.push(y),R===0?v+=y:R<m&&(v+=2*y)}for(let R=0;R<u.length;R++)u[R]=u[R]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=_,d.mipInt.value=M-i;const S=this._sizeLods[r],C=3*S*(r>M-Ms?r-M+Ms:0),A=4*(this._cubeSize-S);ha(t,C,A,3*S,2*S),c.setRenderTarget(t),c.render(h,Wc)}}function Hv(n){const e=[],t=[],i=[];let r=n;const s=n-Ms+1+Fh.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ms?c=Fh[a-n+Ms-1]:a===0&&(c=0),i.push(c);const f=1/(o-2),l=-f,h=1+f,d=[l,l,h,l,h,h,l,l,h,h,l,h],p=6,_=6,x=3,m=2,u=1,v=new Float32Array(x*_*p),M=new Float32Array(m*_*p),S=new Float32Array(u*_*p);for(let A=0;A<p;A++){const R=A%3*2/3-1,L=A>2?0:-1,y=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];v.set(y,x*_*A),M.set(d,m*_*A);const b=[A,A,A,A,A,A];S.set(b,u*_*A)}const C=new Tn;C.setAttribute("position",new pi(v,x)),C.setAttribute("uv",new pi(M,m)),C.setAttribute("faceIndex",new pi(S,u)),e.push(C),r>Ms&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Vh(n,e,t){const i=new qr(n,e,t);return i.texture.mapping=tc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ha(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Gv(n,e,t){const i=new Float32Array(Ir),r=new I(0,1,0);return new yr({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Wh(){return new yr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Xh(){return new yr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function uf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vv(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,f=c===xl||c===vl,l=c===Gs||c===Vs;if(f||l)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Gh(n)),h=f?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(f&&h&&h.height>0||l&&h&&r(h)){t===null&&(t=new Gh(n));const d=f?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const f=6;for(let l=0;l<f;l++)o[l]!==void 0&&c++;return c===f}function s(o){const c=o.target;c.removeEventListener("dispose",s);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Wv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Xv(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const x=d.morphAttributes[_];for(let m=0,u=x.length;m<u;m++)e.remove(x[m])}d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const x=p[_];for(let m=0,u=x.length;m<u;m++)e.update(x[m],n.ARRAY_BUFFER)}}function f(h){const d=[],p=h.index,_=h.attributes.position;let x=0;if(p!==null){const v=p.array;x=p.version;for(let M=0,S=v.length;M<S;M+=3){const C=v[M+0],A=v[M+1],R=v[M+2];d.push(C,A,A,R,R,C)}}else if(_!==void 0){const v=_.array;x=_.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const C=M+0,A=M+1,R=M+2;d.push(C,A,A,R,R,C)}}else return;const m=new(Gu(d)?Yu:$u)(d,1);m.version=x;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function l(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&f(h)}else f(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:l}}function jv(n,e,t,i){const r=i.isWebGL2;let s;function a(p){s=p}let o,c;function f(p){o=p.type,c=p.bytesPerElement}function l(p,_){n.drawElements(s,_,o,p*c),t.update(_,s,1)}function h(p,_,x){if(x===0)return;let m,u;if(r)m=n,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](s,_,o,p*c,x),t.update(_,s,x)}function d(p,_,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<x;u++)this.render(p[u]/c,_[u]);else{m.multiDrawElementsWEBGL(s,_,0,o,p,0,x);let u=0;for(let v=0;v<x;v++)u+=_[v];t.update(u,s,1)}}this.setMode=a,this.setIndex=f,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function qv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function $v(n,e){return n[0]-e[0]}function Yv(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Kv(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new nn,o=[];for(let f=0;f<8;f++)o[f]=[f,0];function c(f,l,h){const d=f.morphTargetInfluences;if(e.isWebGL2===!0){const _=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,x=_!==void 0?_.length:0;let m=s.get(l);if(m===void 0||m.count!==x){let U=function(){O.dispose(),s.delete(l),l.removeEventListener("dispose",U)};var p=U;m!==void 0&&m.texture.dispose();const M=l.morphAttributes.position!==void 0,S=l.morphAttributes.normal!==void 0,C=l.morphAttributes.color!==void 0,A=l.morphAttributes.position||[],R=l.morphAttributes.normal||[],L=l.morphAttributes.color||[];let y=0;M===!0&&(y=1),S===!0&&(y=2),C===!0&&(y=3);let b=l.attributes.position.count*y,N=1;b>e.maxTextureSize&&(N=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const W=new Float32Array(b*N*4*x),O=new Xu(W,b,N,x);O.type=lr,O.needsUpdate=!0;const P=y*4;for(let V=0;V<x;V++){const $=A[V],j=R[V],q=L[V],Y=b*N*4*V;for(let ne=0;ne<$.count;ne++){const ie=ne*P;M===!0&&(a.fromBufferAttribute($,ne),W[Y+ie+0]=a.x,W[Y+ie+1]=a.y,W[Y+ie+2]=a.z,W[Y+ie+3]=0),S===!0&&(a.fromBufferAttribute(j,ne),W[Y+ie+4]=a.x,W[Y+ie+5]=a.y,W[Y+ie+6]=a.z,W[Y+ie+7]=0),C===!0&&(a.fromBufferAttribute(q,ne),W[Y+ie+8]=a.x,W[Y+ie+9]=a.y,W[Y+ie+10]=a.z,W[Y+ie+11]=q.itemSize===4?a.w:1)}}m={count:x,texture:O,size:new nt(b,N)},s.set(l,m),l.addEventListener("dispose",U)}let u=0;for(let M=0;M<d.length;M++)u+=d[M];const v=l.morphTargetsRelative?1:1-u;h.getUniforms().setValue(n,"morphTargetBaseInfluence",v),h.getUniforms().setValue(n,"morphTargetInfluences",d),h.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const _=d===void 0?0:d.length;let x=i[l.id];if(x===void 0||x.length!==_){x=[];for(let S=0;S<_;S++)x[S]=[S,0];i[l.id]=x}for(let S=0;S<_;S++){const C=x[S];C[0]=S,C[1]=d[S]}x.sort(Yv);for(let S=0;S<8;S++)S<_&&x[S][1]?(o[S][0]=x[S][0],o[S][1]=x[S][1]):(o[S][0]=Number.MAX_SAFE_INTEGER,o[S][1]=0);o.sort($v);const m=l.morphAttributes.position,u=l.morphAttributes.normal;let v=0;for(let S=0;S<8;S++){const C=o[S],A=C[0],R=C[1];A!==Number.MAX_SAFE_INTEGER&&R?(m&&l.getAttribute("morphTarget"+S)!==m[A]&&l.setAttribute("morphTarget"+S,m[A]),u&&l.getAttribute("morphNormal"+S)!==u[A]&&l.setAttribute("morphNormal"+S,u[A]),r[S]=R,v+=R):(m&&l.hasAttribute("morphTarget"+S)===!0&&l.deleteAttribute("morphTarget"+S),u&&l.hasAttribute("morphNormal"+S)===!0&&l.deleteAttribute("morphNormal"+S),r[S]=0)}const M=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(n,"morphTargetBaseInfluence",M),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function Jv(n,e,t,i){let r=new WeakMap;function s(c){const f=i.render.frame,l=c.geometry,h=e.get(c,l);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==f&&(d.update(),r.set(d,f))}return h}function a(){r=new WeakMap}function o(c){const f=c.target;f.removeEventListener("dispose",o),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:s,dispose:a}}class tp extends Dn{constructor(e,t,i,r,s,a,o,c,f,l){if(l=l!==void 0?l:Gr,l!==Gr&&l!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===Gr&&(i=cr),i===void 0&&l===Xs&&(i=Hr),super(null,r,s,a,o,c,l,i,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:yn,this.minFilter=c!==void 0?c:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const np=new Dn,ip=new tp(1,1);ip.compareFunction=Hu;const rp=new Xu,sp=new U0,op=new Zu,jh=[],qh=[],$h=new Float32Array(16),Yh=new Float32Array(9),Kh=new Float32Array(4);function Qs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=jh[r];if(s===void 0&&(s=new Float32Array(r),jh[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ic(n,e){let t=qh[e];t===void 0&&(t=new Int32Array(e),qh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Zv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Qv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),jt(t,e)}}function ey(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),jt(t,e)}}function ty(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),jt(t,e)}}function ny(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Xt(t,i))return;Kh.set(i),n.uniformMatrix2fv(this.addr,!1,Kh),jt(t,i)}}function iy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Xt(t,i))return;Yh.set(i),n.uniformMatrix3fv(this.addr,!1,Yh),jt(t,i)}}function ry(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Xt(t,i))return;$h.set(i),n.uniformMatrix4fv(this.addr,!1,$h),jt(t,i)}}function sy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function oy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),jt(t,e)}}function ay(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),jt(t,e)}}function cy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),jt(t,e)}}function ly(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),jt(t,e)}}function hy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),jt(t,e)}}function dy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),jt(t,e)}}function uy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?ip:np;t.setTexture2D(e||s,r)}function py(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||sp,r)}function my(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||op,r)}function gy(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||rp,r)}function _y(n){switch(n){case 5126:return Zv;case 35664:return Qv;case 35665:return ey;case 35666:return ty;case 35674:return ny;case 35675:return iy;case 35676:return ry;case 5124:case 35670:return sy;case 35667:case 35671:return oy;case 35668:case 35672:return ay;case 35669:case 35673:return cy;case 5125:return ly;case 36294:return fy;case 36295:return hy;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return py;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return gy}}function xy(n,e){n.uniform1fv(this.addr,e)}function vy(n,e){const t=Qs(e,this.size,2);n.uniform2fv(this.addr,t)}function yy(n,e){const t=Qs(e,this.size,3);n.uniform3fv(this.addr,t)}function My(n,e){const t=Qs(e,this.size,4);n.uniform4fv(this.addr,t)}function Sy(n,e){const t=Qs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function by(n,e){const t=Qs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ey(n,e){const t=Qs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Ty(n,e){n.uniform1iv(this.addr,e)}function Ay(n,e){n.uniform2iv(this.addr,e)}function wy(n,e){n.uniform3iv(this.addr,e)}function Cy(n,e){n.uniform4iv(this.addr,e)}function Ry(n,e){n.uniform1uiv(this.addr,e)}function Py(n,e){n.uniform2uiv(this.addr,e)}function Ly(n,e){n.uniform3uiv(this.addr,e)}function Dy(n,e){n.uniform4uiv(this.addr,e)}function Iy(n,e,t){const i=this.cache,r=e.length,s=ic(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||np,s[a])}function Uy(n,e,t){const i=this.cache,r=e.length,s=ic(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||sp,s[a])}function ky(n,e,t){const i=this.cache,r=e.length,s=ic(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||op,s[a])}function Ny(n,e,t){const i=this.cache,r=e.length,s=ic(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||rp,s[a])}function Oy(n){switch(n){case 5126:return xy;case 35664:return vy;case 35665:return yy;case 35666:return My;case 35674:return Sy;case 35675:return by;case 35676:return Ey;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return wy;case 35669:case 35673:return Cy;case 5125:return Ry;case 36294:return Py;case 36295:return Ly;case 36296:return Dy;case 35678:case 36198:case 36298:case 36306:case 35682:return Iy;case 35679:case 36299:case 36307:return Uy;case 35680:case 36300:case 36308:case 36293:return ky;case 36289:case 36303:case 36311:case 36292:return Ny}}class zy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=_y(t.type)}}class Fy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Oy(t.type)}}class By{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const $c=/(\w+)(\])?(\[|\.)?/g;function Jh(n,e){n.seq.push(e),n.map[e.id]=e}function Hy(n,e,t){const i=n.name,r=i.length;for($c.lastIndex=0;;){const s=$c.exec(i),a=$c.lastIndex;let o=s[1];const c=s[2]==="]",f=s[3];if(c&&(o=o|0),f===void 0||f==="["&&a+2===r){Jh(t,f===void 0?new zy(o,n,e):new Fy(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new By(o),Jh(t,h)),t=h}}}class _a{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Hy(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Zh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Gy=37297;let Vy=0;function Wy(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Xy(n){const e=pt.getPrimaries(pt.workingColorSpace),t=pt.getPrimaries(n);let i;switch(e===t?i="":e===za&&t===Oa?i="LinearDisplayP3ToLinearSRGB":e===Oa&&t===za&&(i="LinearSRGBToLinearDisplayP3"),n){case Xi:case nc:return[i,"LinearTransferOETF"];case kt:case hf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Qh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Wy(n.getShaderSource(e),a)}else return r}function jy(n,e){const t=Xy(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qy(n,e){let t;switch(e){case r0:t="Linear";break;case s0:t="Reinhard";break;case o0:t="OptimizedCineon";break;case Lu:t="ACESFilmic";break;case c0:t="AgX";break;case a0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function $y(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ss).join(`
`)}function Yy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ss).join(`
`)}function Ky(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Jy(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ss(n){return n!==""}function ed(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function td(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(n){return n.replace(Zy,eM)}const Qy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function eM(n,e){let t=Xe[e];if(t===void 0){const i=Qy.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return El(t)}const tM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nd(n){return n.replace(tM,nM)}function nM(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function id(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function iM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===cf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Pu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ni&&(e="SHADOWMAP_TYPE_VSM"),e}function rM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Gs:case Vs:e="ENVMAP_TYPE_CUBE";break;case tc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Vs:e="ENVMAP_MODE_REFRACTION";break}return e}function oM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ec:e="ENVMAP_BLENDING_MULTIPLY";break;case n0:e="ENVMAP_BLENDING_MIX";break;case i0:e="ENVMAP_BLENDING_ADD";break}return e}function aM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function cM(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=iM(t),f=rM(t),l=sM(t),h=oM(t),d=aM(t),p=t.isWebGL2?"":$y(t),_=Yy(t),x=Ky(s),m=r.createProgram();let u,v,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Ss).join(`
`),u.length>0&&(u+=`
`),v=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Ss).join(`
`),v.length>0&&(v+=`
`)):(u=[id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),v=[p,id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pr?"#define TONE_MAPPING":"",t.toneMapping!==pr?Xe.tonemapping_pars_fragment:"",t.toneMapping!==pr?qy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,jy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ss).join(`
`)),a=El(a),a=ed(a,t),a=td(a,t),o=El(o),o=ed(o,t),o=td(o,t),a=nd(a),o=nd(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=M+u+a,C=M+v+o,A=Zh(r,r.VERTEX_SHADER,S),R=Zh(r,r.FRAGMENT_SHADER,C);r.attachShader(m,A),r.attachShader(m,R),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function L(W){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(A).trim(),U=r.getShaderInfoLog(R).trim();let V=!0,$=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,A,R);else{const j=Qh(r,A,"vertex"),q=Qh(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+O+`
`+j+`
`+q)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(P===""||U==="")&&($=!1);$&&(W.diagnostics={runnable:V,programLog:O,vertexShader:{log:P,prefix:u},fragmentShader:{log:U,prefix:v}})}r.deleteShader(A),r.deleteShader(R),y=new _a(r,m),b=Jy(r,m)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,Gy)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vy++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}let lM=0;class fM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new hM(e),t.set(e,i)),i}}class hM{constructor(e){this.id=lM++,this.code=e,this.usedTimes=0}}function dM(n,e,t,i,r,s,a){const o=new ju,c=new fM,f=[],l=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function m(y,b,N,W,O){const P=W.fog,U=O.geometry,V=y.isMeshStandardMaterial?W.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),j=$&&$.mapping===tc?$.image.height:null,q=_[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const Y=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ne=Y!==void 0?Y.length:0;let ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let X,K,le,be;if(q){const gn=Si[q];X=gn.vertexShader,K=gn.fragmentShader}else X=y.vertexShader,K=y.fragmentShader,c.update(y),le=c.getVertexShaderID(y),be=c.getFragmentShaderID(y);const Me=n.getRenderTarget(),He=O.isInstancedMesh===!0,Ve=O.isBatchedMesh===!0,Ue=!!y.map,ot=!!y.matcap,z=!!$,mn=!!y.aoMap,Ce=!!y.lightMap,Fe=!!y.bumpMap,xe=!!y.normalMap,wt=!!y.displacementMap,je=!!y.emissiveMap,w=!!y.metalnessMap,E=!!y.roughnessMap,B=y.anisotropy>0,Q=y.clearcoat>0,Z=y.iridescence>0,ee=y.sheen>0,ve=y.transmission>0,ce=B&&!!y.anisotropyMap,me=Q&&!!y.clearcoatMap,De=Q&&!!y.clearcoatNormalMap,qe=Q&&!!y.clearcoatRoughnessMap,J=Z&&!!y.iridescenceMap,ut=Z&&!!y.iridescenceThicknessMap,it=ee&&!!y.sheenColorMap,Oe=ee&&!!y.sheenRoughnessMap,we=!!y.specularMap,ge=!!y.specularColorMap,We=!!y.specularIntensityMap,lt=ve&&!!y.transmissionMap,Pt=ve&&!!y.thicknessMap,Je=!!y.gradientMap,re=!!y.alphaMap,D=y.alphaTest>0,oe=!!y.alphaHash,ae=!!y.extensions,ke=!!U.attributes.uv1,Re=!!U.attributes.uv2,_t=!!U.attributes.uv3;let xt=pr;return y.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(xt=n.toneMapping),{isWebGL2:l,shaderID:q,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:K,defines:y.defines,customVertexShaderID:le,customFragmentShaderID:be,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ve,instancing:He,instancingColor:He&&O.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Me===null?n.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Xi,map:Ue,matcap:ot,envMap:z,envMapMode:z&&$.mapping,envMapCubeUVHeight:j,aoMap:mn,lightMap:Ce,bumpMap:Fe,normalMap:xe,displacementMap:d&&wt,emissiveMap:je,normalMapObjectSpace:xe&&y.normalMapType===y0,normalMapTangentSpace:xe&&y.normalMapType===ff,metalnessMap:w,roughnessMap:E,anisotropy:B,anisotropyMap:ce,clearcoat:Q,clearcoatMap:me,clearcoatNormalMap:De,clearcoatRoughnessMap:qe,iridescence:Z,iridescenceMap:J,iridescenceThicknessMap:ut,sheen:ee,sheenColorMap:it,sheenRoughnessMap:Oe,specularMap:we,specularColorMap:ge,specularIntensityMap:We,transmission:ve,transmissionMap:lt,thicknessMap:Pt,gradientMap:Je,opaque:y.transparent===!1&&y.blending===Rs,alphaMap:re,alphaTest:D,alphaHash:oe,combine:y.combine,mapUv:Ue&&x(y.map.channel),aoMapUv:mn&&x(y.aoMap.channel),lightMapUv:Ce&&x(y.lightMap.channel),bumpMapUv:Fe&&x(y.bumpMap.channel),normalMapUv:xe&&x(y.normalMap.channel),displacementMapUv:wt&&x(y.displacementMap.channel),emissiveMapUv:je&&x(y.emissiveMap.channel),metalnessMapUv:w&&x(y.metalnessMap.channel),roughnessMapUv:E&&x(y.roughnessMap.channel),anisotropyMapUv:ce&&x(y.anisotropyMap.channel),clearcoatMapUv:me&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:De&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:it&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&x(y.sheenRoughnessMap.channel),specularMapUv:we&&x(y.specularMap.channel),specularColorMapUv:ge&&x(y.specularColorMap.channel),specularIntensityMapUv:We&&x(y.specularIntensityMap.channel),transmissionMapUv:lt&&x(y.transmissionMap.channel),thicknessMapUv:Pt&&x(y.thicknessMap.channel),alphaMapUv:re&&x(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(xe||B),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:ke,vertexUv2s:Re,vertexUv3s:_t,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(Ue||re),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:O.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ie,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:xt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ue&&y.map.isVideoTexture===!0&&pt.getTransfer(y.map.colorSpace)===Et,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Nt,flipSided:y.side===Vt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ae&&y.extensions.derivatives===!0,extensionFragDepth:ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function u(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)b.push(N),b.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(v(b,y),M(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function v(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function S(y){const b=_[y.type];let N;if(b){const W=Si[b];N=$0.clone(W.uniforms)}else N=y.uniforms;return N}function C(y,b){let N;for(let W=0,O=f.length;W<O;W++){const P=f[W];if(P.cacheKey===b){N=P,++N.usedTimes;break}}return N===void 0&&(N=new cM(n,b,y,s),f.push(N)),N}function A(y){if(--y.usedTimes===0){const b=f.indexOf(y);f[b]=f[f.length-1],f.pop(),y.destroy()}}function R(y){c.remove(y)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:S,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:f,dispose:L}}function uM(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function pM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function rd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function sd(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,d,p,_,x,m){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:x,group:m},n[e]=u):(u.id=h.id,u.object=h,u.geometry=d,u.material=p,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=x,u.group=m),e++,u}function o(h,d,p,_,x,m){const u=a(h,d,p,_,x,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):t.push(u)}function c(h,d,p,_,x,m){const u=a(h,d,p,_,x,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):t.unshift(u)}function f(h,d){t.length>1&&t.sort(h||pM),i.length>1&&i.sort(d||rd),r.length>1&&r.sort(d||rd)}function l(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:l,sort:f}}function mM(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new sd,n.set(i,[a])):r>=s.length?(a=new sd,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function gM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Te};break;case"SpotLight":t={position:new I,direction:new I,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function _M(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let xM=0;function vM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function yM(n,e){const t=new gM,i=_M(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new I);const s=new I,a=new tt,o=new tt;function c(l,h){let d=0,p=0,_=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let x=0,m=0,u=0,v=0,M=0,S=0,C=0,A=0,R=0,L=0,y=0;l.sort(vM);const b=h===!0?Math.PI:1;for(let W=0,O=l.length;W<O;W++){const P=l[W],U=P.color,V=P.intensity,$=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=U.r*V*b,p+=U.g*V*b,_+=U.b*V*b;else if(P.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(P.sh.coefficients[q],V);y++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*b),P.castShadow){const Y=P.shadow,ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,r.directionalShadow[x]=ne,r.directionalShadowMap[x]=j,r.directionalShadowMatrix[x]=P.shadow.matrix,S++}r.directional[x]=q,x++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(U).multiplyScalar(V*b),q.distance=$,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,r.spot[u]=q;const Y=P.shadow;if(P.map&&(r.spotLightMap[R]=P.map,R++,Y.updateMatrices(P),P.castShadow&&L++),r.spotLightMatrix[u]=Y.matrix,P.castShadow){const ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,r.spotShadow[u]=ne,r.spotShadowMap[u]=j,A++}u++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(U).multiplyScalar(V),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),r.rectArea[v]=q,v++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*b),q.distance=P.distance,q.decay=P.decay,P.castShadow){const Y=P.shadow,ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,ne.shadowCameraNear=Y.camera.near,ne.shadowCameraFar=Y.camera.far,r.pointShadow[m]=ne,r.pointShadowMap[m]=j,r.pointShadowMatrix[m]=P.shadow.matrix,C++}r.point[m]=q,m++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(V*b),q.groundColor.copy(P.groundColor).multiplyScalar(V*b),r.hemi[M]=q,M++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=_;const N=r.hash;(N.directionalLength!==x||N.pointLength!==m||N.spotLength!==u||N.rectAreaLength!==v||N.hemiLength!==M||N.numDirectionalShadows!==S||N.numPointShadows!==C||N.numSpotShadows!==A||N.numSpotMaps!==R||N.numLightProbes!==y)&&(r.directional.length=x,r.spot.length=u,r.rectArea.length=v,r.point.length=m,r.hemi.length=M,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=A+R-L,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=y,N.directionalLength=x,N.pointLength=m,N.spotLength=u,N.rectAreaLength=v,N.hemiLength=M,N.numDirectionalShadows=S,N.numPointShadows=C,N.numSpotShadows=A,N.numSpotMaps=R,N.numLightProbes=y,r.version=xM++)}function f(l,h){let d=0,p=0,_=0,x=0,m=0;const u=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){const S=l[v];if(S.isDirectionalLight){const C=r.directional[d];C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(u),d++}else if(S.isSpotLight){const C=r.spot[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(u),C.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(u),_++}else if(S.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(u),o.identity(),a.copy(S.matrixWorld),a.premultiply(u),o.extractRotation(a),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),x++}else if(S.isPointLight){const C=r.point[p];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(u),p++}else if(S.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(u),m++}}}return{setup:c,setupView:f,state:r}}function od(n,e){const t=new yM(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(h){i.push(h)}function o(h){r.push(h)}function c(h){t.setup(i,h)}function f(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o}}function MM(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new od(n,e),t.set(s,[c])):a>=o.length?(c=new od(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class SM extends Zs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=x0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bM extends Zs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const EM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function AM(n,e,t){let i=new df;const r=new nt,s=new nt,a=new nn,o=new SM({depthPacking:v0}),c=new bM,f={},l=t.maxTextureSize,h={[vr]:Vt,[Vt]:vr,[Nt]:Nt},d=new yr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:EM,fragmentShader:TM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new Tn;_.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ee(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cf;let u=this.type;this.render=function(A,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),W=n.state;W.setBlending(ur),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const O=u!==Ni&&this.type===Ni,P=u===Ni&&this.type!==Ni;for(let U=0,V=A.length;U<V;U++){const $=A[U],j=$.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const q=j.getFrameExtents();if(r.multiply(q),s.copy(j.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/q.x),r.x=s.x*q.x,j.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/q.y),r.y=s.y*q.y,j.mapSize.y=s.y)),j.map===null||O===!0||P===!0){const ne=this.type!==Ni?{minFilter:yn,magFilter:yn}:{};j.map!==null&&j.map.dispose(),j.map=new qr(r.x,r.y,ne),j.map.texture.name=$.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const Y=j.getViewportCount();for(let ne=0;ne<Y;ne++){const ie=j.getViewport(ne);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),W.viewport(a),j.updateMatrices($,ne),i=j.getFrustum(),S(R,L,j.camera,$,this.type)}j.isPointLightShadow!==!0&&this.type===Ni&&v(j,L),j.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(y,b,N)};function v(A,R){const L=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new qr(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,L,d,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,L,p,x,null)}function M(A,R,L,y){let b=null;const N=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)b=N;else if(b=L.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const W=b.uuid,O=R.uuid;let P=f[W];P===void 0&&(P={},f[W]=P);let U=P[O];U===void 0&&(U=b.clone(),P[O]=U,R.addEventListener("dispose",C)),b=U}if(b.visible=R.visible,b.wireframe=R.wireframe,y===Ni?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:h[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,L.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const W=n.properties.get(b);W.light=L}return b}function S(A,R,L,y,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Ni)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const O=e.update(A),P=A.material;if(Array.isArray(P)){const U=O.groups;for(let V=0,$=U.length;V<$;V++){const j=U[V],q=P[j.materialIndex];if(q&&q.visible){const Y=M(A,q,y,b);A.onBeforeShadow(n,A,R,L,O,Y,j),n.renderBufferDirect(L,null,O,Y,A,j),A.onAfterShadow(n,A,R,L,O,Y,j)}}}else if(P.visible){const U=M(A,P,y,b);A.onBeforeShadow(n,A,R,L,O,U,null),n.renderBufferDirect(L,null,O,U,A,null),A.onAfterShadow(n,A,R,L,O,U,null)}}const W=A.children;for(let O=0,P=W.length;O<P;O++)S(W[O],R,L,y,b)}function C(A){A.target.removeEventListener("dispose",C);for(const L in f){const y=f[L],b=A.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function wM(n,e,t){const i=t.isWebGL2;function r(){let D=!1;const oe=new nn;let ae=null;const ke=new nn(0,0,0,0);return{setMask:function(Re){ae!==Re&&!D&&(n.colorMask(Re,Re,Re,Re),ae=Re)},setLocked:function(Re){D=Re},setClear:function(Re,_t,xt,qt,gn){gn===!0&&(Re*=qt,_t*=qt,xt*=qt),oe.set(Re,_t,xt,qt),ke.equals(oe)===!1&&(n.clearColor(Re,_t,xt,qt),ke.copy(oe))},reset:function(){D=!1,ae=null,ke.set(-1,0,0,0)}}}function s(){let D=!1,oe=null,ae=null,ke=null;return{setTest:function(Re){Re?Ve(n.DEPTH_TEST):Ue(n.DEPTH_TEST)},setMask:function(Re){oe!==Re&&!D&&(n.depthMask(Re),oe=Re)},setFunc:function(Re){if(ae!==Re){switch(Re){case Yg:n.depthFunc(n.NEVER);break;case Kg:n.depthFunc(n.ALWAYS);break;case Jg:n.depthFunc(n.LESS);break;case ka:n.depthFunc(n.LEQUAL);break;case Zg:n.depthFunc(n.EQUAL);break;case Qg:n.depthFunc(n.GEQUAL);break;case e0:n.depthFunc(n.GREATER);break;case t0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Re}},setLocked:function(Re){D=Re},setClear:function(Re){ke!==Re&&(n.clearDepth(Re),ke=Re)},reset:function(){D=!1,oe=null,ae=null,ke=null}}}function a(){let D=!1,oe=null,ae=null,ke=null,Re=null,_t=null,xt=null,qt=null,gn=null;return{setTest:function(vt){D||(vt?Ve(n.STENCIL_TEST):Ue(n.STENCIL_TEST))},setMask:function(vt){oe!==vt&&!D&&(n.stencilMask(vt),oe=vt)},setFunc:function(vt,_n,xi){(ae!==vt||ke!==_n||Re!==xi)&&(n.stencilFunc(vt,_n,xi),ae=vt,ke=_n,Re=xi)},setOp:function(vt,_n,xi){(_t!==vt||xt!==_n||qt!==xi)&&(n.stencilOp(vt,_n,xi),_t=vt,xt=_n,qt=xi)},setLocked:function(vt){D=vt},setClear:function(vt){gn!==vt&&(n.clearStencil(vt),gn=vt)},reset:function(){D=!1,oe=null,ae=null,ke=null,Re=null,_t=null,xt=null,qt=null,gn=null}}}const o=new r,c=new s,f=new a,l=new WeakMap,h=new WeakMap;let d={},p={},_=new WeakMap,x=[],m=null,u=!1,v=null,M=null,S=null,C=null,A=null,R=null,L=null,y=new Te(0,0,0),b=0,N=!1,W=null,O=null,P=null,U=null,V=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,q=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),j=q>=1):Y.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),j=q>=2);let ne=null,ie={};const X=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),le=new nn().fromArray(X),be=new nn().fromArray(K);function Me(D,oe,ae,ke){const Re=new Uint8Array(4),_t=n.createTexture();n.bindTexture(D,_t),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let xt=0;xt<ae;xt++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(oe,0,n.RGBA,1,1,ke,0,n.RGBA,n.UNSIGNED_BYTE,Re):n.texImage2D(oe+xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Re);return _t}const He={};He[n.TEXTURE_2D]=Me(n.TEXTURE_2D,n.TEXTURE_2D,1),He[n.TEXTURE_CUBE_MAP]=Me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(He[n.TEXTURE_2D_ARRAY]=Me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),He[n.TEXTURE_3D]=Me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),f.setClear(0),Ve(n.DEPTH_TEST),c.setFunc(ka),je(!1),w(Bf),Ve(n.CULL_FACE),xe(ur);function Ve(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Ue(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function ot(D,oe){return p[D]!==oe?(n.bindFramebuffer(D,oe),p[D]=oe,i&&(D===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=oe)),!0):!1}function z(D,oe){let ae=x,ke=!1;if(D)if(ae=_.get(oe),ae===void 0&&(ae=[],_.set(oe,ae)),D.isWebGLMultipleRenderTargets){const Re=D.texture;if(ae.length!==Re.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,xt=Re.length;_t<xt;_t++)ae[_t]=n.COLOR_ATTACHMENT0+_t;ae.length=Re.length,ke=!0}}else ae[0]!==n.COLOR_ATTACHMENT0&&(ae[0]=n.COLOR_ATTACHMENT0,ke=!0);else ae[0]!==n.BACK&&(ae[0]=n.BACK,ke=!0);ke&&(t.isWebGL2?n.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function mn(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const Ce={[Dr]:n.FUNC_ADD,[Ug]:n.FUNC_SUBTRACT,[kg]:n.FUNC_REVERSE_SUBTRACT};if(i)Ce[Wf]=n.MIN,Ce[Xf]=n.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(Ce[Wf]=D.MIN_EXT,Ce[Xf]=D.MAX_EXT)}const Fe={[Ng]:n.ZERO,[Og]:n.ONE,[zg]:n.SRC_COLOR,[gl]:n.SRC_ALPHA,[Wg]:n.SRC_ALPHA_SATURATE,[Gg]:n.DST_COLOR,[Bg]:n.DST_ALPHA,[Fg]:n.ONE_MINUS_SRC_COLOR,[_l]:n.ONE_MINUS_SRC_ALPHA,[Vg]:n.ONE_MINUS_DST_COLOR,[Hg]:n.ONE_MINUS_DST_ALPHA,[Xg]:n.CONSTANT_COLOR,[jg]:n.ONE_MINUS_CONSTANT_COLOR,[qg]:n.CONSTANT_ALPHA,[$g]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(D,oe,ae,ke,Re,_t,xt,qt,gn,vt){if(D===ur){u===!0&&(Ue(n.BLEND),u=!1);return}if(u===!1&&(Ve(n.BLEND),u=!0),D!==Ig){if(D!==v||vt!==N){if((M!==Dr||A!==Dr)&&(n.blendEquation(n.FUNC_ADD),M=Dr,A=Dr),vt)switch(D){case Rs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hf:n.blendFunc(n.ONE,n.ONE);break;case Gf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Rs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hf:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Gf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,C=null,R=null,L=null,y.set(0,0,0),b=0,v=D,N=vt}return}Re=Re||oe,_t=_t||ae,xt=xt||ke,(oe!==M||Re!==A)&&(n.blendEquationSeparate(Ce[oe],Ce[Re]),M=oe,A=Re),(ae!==S||ke!==C||_t!==R||xt!==L)&&(n.blendFuncSeparate(Fe[ae],Fe[ke],Fe[_t],Fe[xt]),S=ae,C=ke,R=_t,L=xt),(qt.equals(y)===!1||gn!==b)&&(n.blendColor(qt.r,qt.g,qt.b,gn),y.copy(qt),b=gn),v=D,N=!1}function wt(D,oe){D.side===Nt?Ue(n.CULL_FACE):Ve(n.CULL_FACE);let ae=D.side===Vt;oe&&(ae=!ae),je(ae),D.blending===Rs&&D.transparent===!1?xe(ur):xe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),o.setMask(D.colorWrite);const ke=D.stencilWrite;f.setTest(ke),ke&&(f.setMask(D.stencilWriteMask),f.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),f.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),B(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ve(n.SAMPLE_ALPHA_TO_COVERAGE):Ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function je(D){W!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),W=D)}function w(D){D!==Lg?(Ve(n.CULL_FACE),D!==O&&(D===Bf?n.cullFace(n.BACK):D===Dg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ue(n.CULL_FACE),O=D}function E(D){D!==P&&(j&&n.lineWidth(D),P=D)}function B(D,oe,ae){D?(Ve(n.POLYGON_OFFSET_FILL),(U!==oe||V!==ae)&&(n.polygonOffset(oe,ae),U=oe,V=ae)):Ue(n.POLYGON_OFFSET_FILL)}function Q(D){D?Ve(n.SCISSOR_TEST):Ue(n.SCISSOR_TEST)}function Z(D){D===void 0&&(D=n.TEXTURE0+$-1),ne!==D&&(n.activeTexture(D),ne=D)}function ee(D,oe,ae){ae===void 0&&(ne===null?ae=n.TEXTURE0+$-1:ae=ne);let ke=ie[ae];ke===void 0&&(ke={type:void 0,texture:void 0},ie[ae]=ke),(ke.type!==D||ke.texture!==oe)&&(ne!==ae&&(n.activeTexture(ae),ne=ae),n.bindTexture(D,oe||He[D]),ke.type=D,ke.texture=oe)}function ve(){const D=ie[ne];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ce(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function De(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qe(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Oe(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(D){le.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),le.copy(D))}function lt(D){be.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),be.copy(D))}function Pt(D,oe){let ae=h.get(oe);ae===void 0&&(ae=new WeakMap,h.set(oe,ae));let ke=ae.get(D);ke===void 0&&(ke=n.getUniformBlockIndex(oe,D.name),ae.set(D,ke))}function Je(D,oe){const ke=h.get(oe).get(D);l.get(oe)!==ke&&(n.uniformBlockBinding(oe,ke,D.__bindingPointIndex),l.set(oe,ke))}function re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ne=null,ie={},p={},_=new WeakMap,x=[],m=null,u=!1,v=null,M=null,S=null,C=null,A=null,R=null,L=null,y=new Te(0,0,0),b=0,N=!1,W=null,O=null,P=null,U=null,V=null,le.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),f.reset()}return{buffers:{color:o,depth:c,stencil:f},enable:Ve,disable:Ue,bindFramebuffer:ot,drawBuffers:z,useProgram:mn,setBlending:xe,setMaterial:wt,setFlipSided:je,setCullFace:w,setLineWidth:E,setPolygonOffset:B,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:ve,compressedTexImage2D:ce,compressedTexImage3D:me,texImage2D:we,texImage3D:ge,updateUBOMapping:Pt,uniformBlockBinding:Je,texStorage2D:it,texStorage3D:Oe,texSubImage2D:De,texSubImage3D:qe,compressedTexSubImage2D:J,compressedTexSubImage3D:ut,scissor:We,viewport:lt,reset:re}}function CM(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,E){return p?new OffscreenCanvas(w,E):Ba("canvas")}function x(w,E,B,Q){let Z=1;if((w.width>Q||w.height>Q)&&(Z=Q/Math.max(w.width,w.height)),Z<1||E===!0)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap){const ee=E?bl:Math.floor,ve=ee(Z*w.width),ce=ee(Z*w.height);h===void 0&&(h=_(ve,ce));const me=B?_(ve,ce):h;return me.width=ve,me.height=ce,me.getContext("2d").drawImage(w,0,0,ve,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+ve+"x"+ce+")."),me}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return Sh(w.width)&&Sh(w.height)}function u(w){return o?!1:w.wrapS!==fi||w.wrapT!==fi||w.minFilter!==yn&&w.minFilter!==Yn}function v(w,E){return w.generateMipmaps&&E&&w.minFilter!==yn&&w.minFilter!==Yn}function M(w){n.generateMipmap(w)}function S(w,E,B,Q,Z=!1){if(o===!1)return E;if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ee=E;if(E===n.RED&&(B===n.FLOAT&&(ee=n.R32F),B===n.HALF_FLOAT&&(ee=n.R16F),B===n.UNSIGNED_BYTE&&(ee=n.R8)),E===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(ee=n.R8UI),B===n.UNSIGNED_SHORT&&(ee=n.R16UI),B===n.UNSIGNED_INT&&(ee=n.R32UI),B===n.BYTE&&(ee=n.R8I),B===n.SHORT&&(ee=n.R16I),B===n.INT&&(ee=n.R32I)),E===n.RG&&(B===n.FLOAT&&(ee=n.RG32F),B===n.HALF_FLOAT&&(ee=n.RG16F),B===n.UNSIGNED_BYTE&&(ee=n.RG8)),E===n.RGBA){const ve=Z?Na:pt.getTransfer(Q);B===n.FLOAT&&(ee=n.RGBA32F),B===n.HALF_FLOAT&&(ee=n.RGBA16F),B===n.UNSIGNED_BYTE&&(ee=ve===Et?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function C(w,E,B){return v(w,B)===!0||w.isFramebufferTexture&&w.minFilter!==yn&&w.minFilter!==Yn?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function A(w){return w===yn||w===jf||w===vc?n.NEAREST:n.LINEAR}function R(w){const E=w.target;E.removeEventListener("dispose",R),y(E),E.isVideoTexture&&l.delete(E)}function L(w){const E=w.target;E.removeEventListener("dispose",L),N(E)}function y(w){const E=i.get(w);if(E.__webglInit===void 0)return;const B=w.source,Q=d.get(B);if(Q){const Z=Q[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(w),Object.keys(Q).length===0&&d.delete(B)}i.remove(w)}function b(w){const E=i.get(w);n.deleteTexture(E.__webglTexture);const B=w.source,Q=d.get(B);delete Q[E.__cacheKey],a.memory.textures--}function N(w){const E=w.texture,B=i.get(w),Q=i.get(E);if(Q.__webglTexture!==void 0&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(B.__webglFramebuffer[Z]))for(let ee=0;ee<B.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(B.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(B.__webglFramebuffer[Z]);B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer[Z])}else{if(Array.isArray(B.__webglFramebuffer))for(let Z=0;Z<B.__webglFramebuffer.length;Z++)n.deleteFramebuffer(B.__webglFramebuffer[Z]);else n.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&n.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let Z=0;Z<B.__webglColorRenderbuffer.length;Z++)B.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(B.__webglColorRenderbuffer[Z]);B.__webglDepthRenderbuffer&&n.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let Z=0,ee=E.length;Z<ee;Z++){const ve=i.get(E[Z]);ve.__webglTexture&&(n.deleteTexture(ve.__webglTexture),a.memory.textures--),i.remove(E[Z])}i.remove(E),i.remove(w)}let W=0;function O(){W=0}function P(){const w=W;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),W+=1,w}function U(w){const E=[];return E.push(w.wrapS),E.push(w.wrapT),E.push(w.wrapR||0),E.push(w.magFilter),E.push(w.minFilter),E.push(w.anisotropy),E.push(w.internalFormat),E.push(w.format),E.push(w.type),E.push(w.generateMipmaps),E.push(w.premultiplyAlpha),E.push(w.flipY),E.push(w.unpackAlignment),E.push(w.colorSpace),E.join()}function V(w,E){const B=i.get(w);if(w.isVideoTexture&&wt(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){const Q=w.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(B,w,E);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+E)}function $(w,E){const B=i.get(w);if(w.version>0&&B.__version!==w.version){le(B,w,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+E)}function j(w,E){const B=i.get(w);if(w.version>0&&B.__version!==w.version){le(B,w,E);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+E)}function q(w,E){const B=i.get(w);if(w.version>0&&B.__version!==w.version){be(B,w,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+E)}const Y={[Ws]:n.REPEAT,[fi]:n.CLAMP_TO_EDGE,[yl]:n.MIRRORED_REPEAT},ne={[yn]:n.NEAREST,[jf]:n.NEAREST_MIPMAP_NEAREST,[vc]:n.NEAREST_MIPMAP_LINEAR,[Yn]:n.LINEAR,[l0]:n.LINEAR_MIPMAP_NEAREST,[bo]:n.LINEAR_MIPMAP_LINEAR},ie={[M0]:n.NEVER,[w0]:n.ALWAYS,[S0]:n.LESS,[Hu]:n.LEQUAL,[b0]:n.EQUAL,[A0]:n.GEQUAL,[E0]:n.GREATER,[T0]:n.NOTEQUAL};function X(w,E,B){if(B?(n.texParameteri(w,n.TEXTURE_WRAP_S,Y[E.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Y[E.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Y[E.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ne[E.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ne[E.minFilter])):(n.texParameteri(w,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(w,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(E.wrapS!==fi||E.wrapT!==fi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(w,n.TEXTURE_MAG_FILTER,A(E.magFilter)),n.texParameteri(w,n.TEXTURE_MIN_FILTER,A(E.minFilter)),E.minFilter!==yn&&E.minFilter!==Yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ie[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===yn||E.minFilter!==vc&&E.minFilter!==bo||E.type===lr&&e.has("OES_texture_float_linear")===!1||o===!1&&E.type===Eo&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(n.texParameterf(w,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function K(w,E){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",R));const Q=E.source;let Z=d.get(Q);Z===void 0&&(Z={},d.set(Q,Z));const ee=U(E);if(ee!==w.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[ee].usedTimes++;const ve=Z[w.__cacheKey];ve!==void 0&&(Z[w.__cacheKey].usedTimes--,ve.usedTimes===0&&b(E)),w.__cacheKey=ee,w.__webglTexture=Z[ee].texture}return B}function le(w,E,B){let Q=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=n.TEXTURE_3D);const Z=K(w,E),ee=E.source;t.bindTexture(Q,w.__webglTexture,n.TEXTURE0+B);const ve=i.get(ee);if(ee.version!==ve.__version||Z===!0){t.activeTexture(n.TEXTURE0+B);const ce=pt.getPrimaries(pt.workingColorSpace),me=E.colorSpace===Bn?null:pt.getPrimaries(E.colorSpace),De=E.colorSpace===Bn||ce===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const qe=u(E)&&m(E.image)===!1;let J=x(E.image,qe,!1,r.maxTextureSize);J=je(E,J);const ut=m(J)||o,it=s.convert(E.format,E.colorSpace);let Oe=s.convert(E.type),we=S(E.internalFormat,it,Oe,E.colorSpace,E.isVideoTexture);X(Q,E,ut);let ge;const We=E.mipmaps,lt=o&&E.isVideoTexture!==!0&&we!==Fu,Pt=ve.__version===void 0||Z===!0,Je=C(E,J,ut);if(E.isDepthTexture)we=n.DEPTH_COMPONENT,o?E.type===lr?we=n.DEPTH_COMPONENT32F:E.type===cr?we=n.DEPTH_COMPONENT24:E.type===Hr?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:E.type===lr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Gr&&we===n.DEPTH_COMPONENT&&E.type!==lf&&E.type!==cr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=cr,Oe=s.convert(E.type)),E.format===Xs&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,E.type!==Hr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Hr,Oe=s.convert(E.type))),Pt&&(lt?t.texStorage2D(n.TEXTURE_2D,1,we,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,we,J.width,J.height,0,it,Oe,null));else if(E.isDataTexture)if(We.length>0&&ut){lt&&Pt&&t.texStorage2D(n.TEXTURE_2D,Je,we,We[0].width,We[0].height);for(let re=0,D=We.length;re<D;re++)ge=We[re],lt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,Oe,ge.data):t.texImage2D(n.TEXTURE_2D,re,we,ge.width,ge.height,0,it,Oe,ge.data);E.generateMipmaps=!1}else lt?(Pt&&t.texStorage2D(n.TEXTURE_2D,Je,we,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,it,Oe,J.data)):t.texImage2D(n.TEXTURE_2D,0,we,J.width,J.height,0,it,Oe,J.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){lt&&Pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,we,We[0].width,We[0].height,J.depth);for(let re=0,D=We.length;re<D;re++)ge=We[re],E.format!==hi?it!==null?lt?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,J.depth,it,ge.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,we,ge.width,ge.height,J.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,J.depth,it,Oe,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,we,ge.width,ge.height,J.depth,0,it,Oe,ge.data)}else{lt&&Pt&&t.texStorage2D(n.TEXTURE_2D,Je,we,We[0].width,We[0].height);for(let re=0,D=We.length;re<D;re++)ge=We[re],E.format!==hi?it!==null?lt?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,re,we,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,Oe,ge.data):t.texImage2D(n.TEXTURE_2D,re,we,ge.width,ge.height,0,it,Oe,ge.data)}else if(E.isDataArrayTexture)lt?(Pt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,we,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,it,Oe,J.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,J.width,J.height,J.depth,0,it,Oe,J.data);else if(E.isData3DTexture)lt?(Pt&&t.texStorage3D(n.TEXTURE_3D,Je,we,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,it,Oe,J.data)):t.texImage3D(n.TEXTURE_3D,0,we,J.width,J.height,J.depth,0,it,Oe,J.data);else if(E.isFramebufferTexture){if(Pt)if(lt)t.texStorage2D(n.TEXTURE_2D,Je,we,J.width,J.height);else{let re=J.width,D=J.height;for(let oe=0;oe<Je;oe++)t.texImage2D(n.TEXTURE_2D,oe,we,re,D,0,it,Oe,null),re>>=1,D>>=1}}else if(We.length>0&&ut){lt&&Pt&&t.texStorage2D(n.TEXTURE_2D,Je,we,We[0].width,We[0].height);for(let re=0,D=We.length;re<D;re++)ge=We[re],lt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,it,Oe,ge):t.texImage2D(n.TEXTURE_2D,re,we,it,Oe,ge);E.generateMipmaps=!1}else lt?(Pt&&t.texStorage2D(n.TEXTURE_2D,Je,we,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,it,Oe,J)):t.texImage2D(n.TEXTURE_2D,0,we,it,Oe,J);v(E,ut)&&M(Q),ve.__version=ee.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function be(w,E,B){if(E.image.length!==6)return;const Q=K(w,E),Z=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);const ee=i.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);const ve=pt.getPrimaries(pt.workingColorSpace),ce=E.colorSpace===Bn?null:pt.getPrimaries(E.colorSpace),me=E.colorSpace===Bn||ve===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,qe=E.image[0]&&E.image[0].isDataTexture,J=[];for(let re=0;re<6;re++)!De&&!qe?J[re]=x(E.image[re],!1,!0,r.maxCubemapSize):J[re]=qe?E.image[re].image:E.image[re],J[re]=je(E,J[re]);const ut=J[0],it=m(ut)||o,Oe=s.convert(E.format,E.colorSpace),we=s.convert(E.type),ge=S(E.internalFormat,Oe,we,E.colorSpace),We=o&&E.isVideoTexture!==!0,lt=ee.__version===void 0||Q===!0;let Pt=C(E,ut,it);X(n.TEXTURE_CUBE_MAP,E,it);let Je;if(De){We&&lt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Pt,ge,ut.width,ut.height);for(let re=0;re<6;re++){Je=J[re].mipmaps;for(let D=0;D<Je.length;D++){const oe=Je[D];E.format!==hi?Oe!==null?We?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,0,0,oe.width,oe.height,Oe,oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,ge,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,0,0,oe.width,oe.height,Oe,we,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D,ge,oe.width,oe.height,0,Oe,we,oe.data)}}}else{Je=E.mipmaps,We&&lt&&(Je.length>0&&Pt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Pt,ge,J[0].width,J[0].height));for(let re=0;re<6;re++)if(qe){We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,J[re].width,J[re].height,Oe,we,J[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,J[re].width,J[re].height,0,Oe,we,J[re].data);for(let D=0;D<Je.length;D++){const ae=Je[D].image[re].image;We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,0,0,ae.width,ae.height,Oe,we,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,ge,ae.width,ae.height,0,Oe,we,ae.data)}}else{We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Oe,we,J[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,Oe,we,J[re]);for(let D=0;D<Je.length;D++){const oe=Je[D];We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,0,0,Oe,we,oe.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,D+1,ge,Oe,we,oe.image[re])}}}v(E,it)&&M(n.TEXTURE_CUBE_MAP),ee.__version=Z.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function Me(w,E,B,Q,Z,ee){const ve=s.convert(B.format,B.colorSpace),ce=s.convert(B.type),me=S(B.internalFormat,ve,ce,B.colorSpace);if(!i.get(E).__hasExternalTextures){const qe=Math.max(1,E.width>>ee),J=Math.max(1,E.height>>ee);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,me,qe,J,E.depth,0,ve,ce,null):t.texImage2D(Z,ee,me,qe,J,0,ve,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),xe(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,Z,i.get(B).__webglTexture,0,Fe(E)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,Z,i.get(B).__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(w,E,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),E.depthBuffer&&!E.stencilBuffer){let Q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(B||xe(E)){const Z=E.depthTexture;Z&&Z.isDepthTexture&&(Z.type===lr?Q=n.DEPTH_COMPONENT32F:Z.type===cr&&(Q=n.DEPTH_COMPONENT24));const ee=Fe(E);xe(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,Q,E.width,E.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,Q,E.width,E.height)}else n.renderbufferStorage(n.RENDERBUFFER,Q,E.width,E.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,w)}else if(E.depthBuffer&&E.stencilBuffer){const Q=Fe(E);B&&xe(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,E.width,E.height):xe(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,w)}else{const Q=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],ve=s.convert(ee.format,ee.colorSpace),ce=s.convert(ee.type),me=S(ee.internalFormat,ve,ce,ee.colorSpace),De=Fe(E);B&&xe(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,De,me,E.width,E.height):xe(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De,me,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,me,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ve(w,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),V(E.depthTexture,0);const Q=i.get(E.depthTexture).__webglTexture,Z=Fe(E);if(E.depthTexture.format===Gr)xe(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(E.depthTexture.format===Xs)xe(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ue(w){const E=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ve(E.__webglFramebuffer,w)}else if(B){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]=n.createRenderbuffer(),He(E.__webglDepthbuffer[Q],w,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=n.createRenderbuffer(),He(E.__webglDepthbuffer,w,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(w,E,B){const Q=i.get(w);E!==void 0&&Me(Q.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ue(w)}function z(w){const E=w.texture,B=i.get(w),Q=i.get(E);w.addEventListener("dispose",L),w.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=E.version,a.memory.textures++);const Z=w.isWebGLCubeRenderTarget===!0,ee=w.isWebGLMultipleRenderTargets===!0,ve=m(w)||o;if(Z){B.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[ce]=[];for(let me=0;me<E.mipmaps.length;me++)B.__webglFramebuffer[ce][me]=n.createFramebuffer()}else B.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(o&&E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let ce=0;ce<E.mipmaps.length;ce++)B.__webglFramebuffer[ce]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ee)if(r.drawBuffers){const ce=w.texture;for(let me=0,De=ce.length;me<De;me++){const qe=i.get(ce[me]);qe.__webglTexture===void 0&&(qe.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&xe(w)===!1){const ce=ee?E:[E];B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let me=0;me<ce.length;me++){const De=ce[me];B.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[me]);const qe=s.convert(De.format,De.colorSpace),J=s.convert(De.type),ut=S(De.internalFormat,qe,J,De.colorSpace,w.isXRRenderTarget===!0),it=Fe(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,it,ut,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,B.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),He(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),X(n.TEXTURE_CUBE_MAP,E,ve);for(let ce=0;ce<6;ce++)if(o&&E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)Me(B.__webglFramebuffer[ce][me],w,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else Me(B.__webglFramebuffer[ce],w,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);v(E,ve)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const ce=w.texture;for(let me=0,De=ce.length;me<De;me++){const qe=ce[me],J=i.get(qe);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),X(n.TEXTURE_2D,qe,ve),Me(B.__webglFramebuffer,w,qe,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),v(qe,ve)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?ce=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Q.__webglTexture),X(ce,E,ve),o&&E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)Me(B.__webglFramebuffer[me],w,E,n.COLOR_ATTACHMENT0,ce,me);else Me(B.__webglFramebuffer,w,E,n.COLOR_ATTACHMENT0,ce,0);v(E,ve)&&M(ce),t.unbindTexture()}w.depthBuffer&&Ue(w)}function mn(w){const E=m(w)||o,B=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let Q=0,Z=B.length;Q<Z;Q++){const ee=B[Q];if(v(ee,E)){const ve=w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ce=i.get(ee).__webglTexture;t.bindTexture(ve,ce),M(ve),t.unbindTexture()}}}function Ce(w){if(o&&w.samples>0&&xe(w)===!1){const E=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],B=w.width,Q=w.height;let Z=n.COLOR_BUFFER_BIT;const ee=[],ve=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(w),me=w.isWebGLMultipleRenderTargets===!0;if(me)for(let De=0;De<E.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let De=0;De<E.length;De++){ee.push(n.COLOR_ATTACHMENT0+De),w.depthBuffer&&ee.push(ve);const qe=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(qe===!1&&(w.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),me&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[De]),qe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ve]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ve])),me){const J=i.get(E[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,B,Q,0,0,B,Q,Z,n.NEAREST),f&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let De=0;De<E.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,ce.__webglColorRenderbuffer[De]);const qe=i.get(E[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Fe(w){return Math.min(r.maxSamples,w.samples)}function xe(w){const E=i.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function wt(w){const E=a.render.frame;l.get(w)!==E&&(l.set(w,E),w.update())}function je(w,E){const B=w.colorSpace,Q=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===Ml||B!==Xi&&B!==Bn&&(pt.getTransfer(B)===Et?o===!1?e.has("EXT_sRGB")===!0&&Q===hi?(w.format=Ml,w.minFilter=Yn,w.generateMipmaps=!1):E=Vu.sRGBToLinear(E):(Q!==hi||Z!==mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}this.allocateTextureUnit=P,this.resetTextureUnits=O,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=j,this.setTextureCube=q,this.rebindTextures=ot,this.setupRenderTarget=z,this.updateRenderTargetMipmap=mn,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=xe}function RM(n,e,t){const i=t.isWebGL2;function r(s,a=Bn){let o;const c=pt.getTransfer(a);if(s===mr)return n.UNSIGNED_BYTE;if(s===Uu)return n.UNSIGNED_SHORT_4_4_4_4;if(s===ku)return n.UNSIGNED_SHORT_5_5_5_1;if(s===f0)return n.BYTE;if(s===h0)return n.SHORT;if(s===lf)return n.UNSIGNED_SHORT;if(s===Iu)return n.INT;if(s===cr)return n.UNSIGNED_INT;if(s===lr)return n.FLOAT;if(s===Eo)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===d0)return n.ALPHA;if(s===hi)return n.RGBA;if(s===u0)return n.LUMINANCE;if(s===p0)return n.LUMINANCE_ALPHA;if(s===Gr)return n.DEPTH_COMPONENT;if(s===Xs)return n.DEPTH_STENCIL;if(s===Ml)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===m0)return n.RED;if(s===Nu)return n.RED_INTEGER;if(s===g0)return n.RG;if(s===Ou)return n.RG_INTEGER;if(s===zu)return n.RGBA_INTEGER;if(s===yc||s===Mc||s===Sc||s===bc)if(c===Et)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===yc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Mc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Sc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===bc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===yc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Mc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Sc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===bc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===qf||s===$f||s===Yf||s===Kf)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===qf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$f)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Yf)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Kf)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Fu)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Jf||s===Zf)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Jf)return c===Et?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Zf)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Qf||s===eh||s===th||s===nh||s===ih||s===rh||s===sh||s===oh||s===ah||s===ch||s===lh||s===fh||s===hh||s===dh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Qf)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===eh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===th)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===nh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ih)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===rh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===sh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===oh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ah)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ch)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===lh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===fh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===hh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===dh)return c===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ec||s===uh||s===ph)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Ec)return c===Et?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===uh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ph)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===_0||s===mh||s===gh||s===_h)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Ec)return o.COMPRESSED_RED_RGTC1_EXT;if(s===mh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===gh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===_h)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Hr?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class PM extends Kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Sn extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const LM={type:"move"};class Yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),u=this._getHandJoint(f,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const l=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],d=l.position.distanceTo(h.position),p=.02,_=.005;f.inputState.pinching&&d>p+_?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&d<=p-_&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(LM)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),f!==null&&(f.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Sn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class DM extends Js{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,f=null,l=null,h=null,d=null,p=null,_=null;const x=t.getContextAttributes();let m=null,u=null;const v=[],M=[],S=new nt;let C=null;const A=new Kn;A.layers.enable(1),A.viewport=new nn;const R=new Kn;R.layers.enable(2),R.viewport=new nn;const L=[A,R],y=new PM;y.layers.enable(1),y.layers.enable(2);let b=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=v[X];return K===void 0&&(K=new Yc,v[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=v[X];return K===void 0&&(K=new Yc,v[X]=K),K.getGripSpace()},this.getHand=function(X){let K=v[X];return K===void 0&&(K=new Yc,v[X]=K),K.getHandSpace()};function W(X){const K=M.indexOf(X.inputSource);if(K===-1)return;const le=v[K];le!==void 0&&(le.update(X.inputSource,X.frame,f||a),le.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",P);for(let X=0;X<v.length;X++){const K=M[X];K!==null&&(M[X]=null,v[X].disconnect(K))}b=null,N=null,e.setRenderTarget(m),p=null,d=null,h=null,r=null,u=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||a},this.setReferenceSpace=function(X){f=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",O),r.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new qr(p.framebufferWidth,p.framebufferHeight,{format:hi,type:mr,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let K=null,le=null,be=null;x.depth&&(be=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=x.stencil?Xs:Gr,le=x.stencil?Hr:cr);const Me={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(Me),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),u=new qr(d.textureWidth,d.textureHeight,{format:hi,type:mr,depthTexture:new tp(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const He=e.properties.get(u);He.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),f=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(X){for(let K=0;K<X.removed.length;K++){const le=X.removed[K],be=M.indexOf(le);be>=0&&(M[be]=null,v[be].disconnect(le))}for(let K=0;K<X.added.length;K++){const le=X.added[K];let be=M.indexOf(le);if(be===-1){for(let He=0;He<v.length;He++)if(He>=M.length){M.push(le),be=He;break}else if(M[He]===null){M[He]=le,be=He;break}if(be===-1)break}const Me=v[be];Me&&Me.connect(le)}}const U=new I,V=new I;function $(X,K,le){U.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(le.matrixWorld);const be=U.distanceTo(V),Me=K.projectionMatrix.elements,He=le.projectionMatrix.elements,Ve=Me[14]/(Me[10]-1),Ue=Me[14]/(Me[10]+1),ot=(Me[9]+1)/Me[5],z=(Me[9]-1)/Me[5],mn=(Me[8]-1)/Me[0],Ce=(He[8]+1)/He[0],Fe=Ve*mn,xe=Ve*Ce,wt=be/(-mn+Ce),je=wt*-mn;K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(je),X.translateZ(wt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const w=Ve+wt,E=Ue+wt,B=Fe-je,Q=xe+(be-je),Z=ot*Ue/E*w,ee=z*Ue/E*w;X.projectionMatrix.makePerspective(B,Q,Z,ee,w,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function j(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.near=R.near=A.near=X.near,y.far=R.far=A.far=X.far,(b!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,N=y.far);const K=X.parent,le=y.cameras;j(y,K);for(let be=0;be<le.length;be++)j(le[be],K);le.length===2?$(y,A,R):y.projectionMatrix.copy(A.projectionMatrix),q(X,y,K)};function q(X,K,le){le===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(le.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Sl*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let Y=null;function ne(X,K){if(l=K.getViewerPose(f||a),_=K,l!==null){const le=l.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let be=!1;le.length!==y.cameras.length&&(y.cameras.length=0,be=!0);for(let Me=0;Me<le.length;Me++){const He=le[Me];let Ve=null;if(p!==null)Ve=p.getViewport(He);else{const ot=h.getViewSubImage(d,He);Ve=ot.viewport,Me===0&&(e.setRenderTargetTextures(u,ot.colorTexture,d.ignoreDepthValues?void 0:ot.depthStencilTexture),e.setRenderTarget(u))}let Ue=L[Me];Ue===void 0&&(Ue=new Kn,Ue.layers.enable(Me),Ue.viewport=new nn,L[Me]=Ue),Ue.matrix.fromArray(He.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(He.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Me===0&&(y.matrix.copy(Ue.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),be===!0&&y.cameras.push(Ue)}}for(let le=0;le<v.length;le++){const be=M[le],Me=v[le];be!==null&&Me!==void 0&&Me.update(be,K,f||a)}Y&&Y(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}const ie=new Qu;ie.setAnimationLoop(ne),this.setAnimationLoop=function(X){Y=X},this.dispose=function(){}}}function IM(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Ku(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,v,M,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),l(m,u)):u.isMeshStandardMaterial?(s(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(s(m,u),_(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),x(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?c(m,u,v,M):u.isSpriteMaterial?f(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Vt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Vt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const M=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*M,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function c(m,u,v,M){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*v,m.scale.value=M*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,v){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Vt&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){const v=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function UM(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,M){const S=M.program;i.uniformBlockBinding(v,S)}function f(v,M){let S=r[v.id];S===void 0&&(_(v),S=l(v),r[v.id]=S,v.addEventListener("dispose",m));const C=M.program;i.updateUBOMapping(v,C);const A=e.render.frame;s[v.id]!==A&&(d(v),s[v.id]=A)}function l(v){const M=h();v.__bindingPointIndex=M;const S=n.createBuffer(),C=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,S),S}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const M=r[v.id],S=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let A=0,R=S.length;A<R;A++){const L=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,b=L.length;y<b;y++){const N=L[y];if(p(N,A,y,C)===!0){const W=N.__offset,O=Array.isArray(N.value)?N.value:[N.value];let P=0;for(let U=0;U<O.length;U++){const V=O[U],$=x(V);typeof V=="number"||typeof V=="boolean"?(N.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,W+P,N.__data)):V.isMatrix3?(N.__data[0]=V.elements[0],N.__data[1]=V.elements[1],N.__data[2]=V.elements[2],N.__data[3]=0,N.__data[4]=V.elements[3],N.__data[5]=V.elements[4],N.__data[6]=V.elements[5],N.__data[7]=0,N.__data[8]=V.elements[6],N.__data[9]=V.elements[7],N.__data[10]=V.elements[8],N.__data[11]=0):(V.toArray(N.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,M,S,C){const A=v.value,R=M+"_"+S;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const L=C[R];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return C[R]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function _(v){const M=v.uniforms;let S=0;const C=16;for(let R=0,L=M.length;R<L;R++){const y=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,N=y.length;b<N;b++){const W=y[b],O=Array.isArray(W.value)?W.value:[W.value];for(let P=0,U=O.length;P<U;P++){const V=O[P],$=x(V),j=S%C;j!==0&&C-j<$.boundary&&(S+=C-j),W.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=$.storage}}}const A=S%C;return A>0&&(S+=C-A),v.__size=S,v.__cache={},this}function x(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function u(){for(const v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:f,dispose:u}}class ap{constructor(e={}){const{canvas:t=R0(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:f=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),_=new Int32Array(4);let x=null,m=null;const u=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this._useLegacyLights=!1,this.toneMapping=pr,this.toneMappingExposure=1;const M=this;let S=!1,C=0,A=0,R=null,L=-1,y=null;const b=new nn,N=new nn;let W=null;const O=new Te(0);let P=0,U=t.width,V=t.height,$=1,j=null,q=null;const Y=new nn(0,0,U,V),ne=new nn(0,0,U,V);let ie=!1;const X=new df;let K=!1,le=!1,be=null;const Me=new tt,He=new nt,Ve=new I,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ot(){return R===null?$:1}let z=i;function mn(T,k){for(let H=0;H<T.length;H++){const G=T[H],F=t.getContext(G,k);if(F!==null)return F}return null}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:f,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${af}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",oe,!1),z===null){const k=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&k.shift(),z=mn(k,T),z===null)throw mn(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ce,Fe,xe,wt,je,w,E,B,Q,Z,ee,ve,ce,me,De,qe,J,ut,it,Oe,we,ge,We,lt;function Pt(){Ce=new Wv(z),Fe=new zv(z,Ce,e),Ce.init(Fe),ge=new RM(z,Ce,Fe),xe=new wM(z,Ce,Fe),wt=new qv(z),je=new uM,w=new CM(z,Ce,xe,je,Fe,ge,wt),E=new Bv(M),B=new Vv(M),Q=new t_(z,Fe),We=new Nv(z,Ce,Q,Fe),Z=new Xv(z,Q,wt,We),ee=new Jv(z,Z,Q,wt),it=new Kv(z,Fe,w),qe=new Fv(je),ve=new dM(M,E,B,Ce,Fe,We,qe),ce=new IM(M,je),me=new mM,De=new MM(Ce,Fe),ut=new kv(M,E,B,xe,ee,d,c),J=new AM(M,ee,Fe),lt=new UM(z,wt,Fe,xe),Oe=new Ov(z,Ce,wt,Fe),we=new jv(z,Ce,wt,Fe),wt.programs=ve.programs,M.capabilities=Fe,M.extensions=Ce,M.properties=je,M.renderLists=me,M.shadowMap=J,M.state=xe,M.info=wt}Pt();const Je=new DM(M,z);this.xr=Je,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=Ce.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ce.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(U,V,!1))},this.getSize=function(T){return T.set(U,V)},this.setSize=function(T,k,H=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,V=k,t.width=Math.floor(T*$),t.height=Math.floor(k*$),H===!0&&(t.style.width=T+"px",t.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(U*$,V*$).floor()},this.setDrawingBufferSize=function(T,k,H){U=T,V=k,$=H,t.width=Math.floor(T*H),t.height=Math.floor(k*H),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy(Y)},this.setViewport=function(T,k,H,G){T.isVector4?Y.set(T.x,T.y,T.z,T.w):Y.set(T,k,H,G),xe.viewport(b.copy(Y).multiplyScalar($).floor())},this.getScissor=function(T){return T.copy(ne)},this.setScissor=function(T,k,H,G){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,k,H,G),xe.scissor(N.copy(ne).multiplyScalar($).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(T){xe.setScissorTest(ie=T)},this.setOpaqueSort=function(T){j=T},this.setTransparentSort=function(T){q=T},this.getClearColor=function(T){return T.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(T=!0,k=!0,H=!0){let G=0;if(T){let F=!1;if(R!==null){const he=R.texture.format;F=he===zu||he===Ou||he===Nu}if(F){const he=R.texture.type,ye=he===mr||he===cr||he===lf||he===Hr||he===Uu||he===ku,Pe=ut.getClearColor(),Ne=ut.getClearAlpha(),$e=Pe.r,Be=Pe.g,Ge=Pe.b;ye?(p[0]=$e,p[1]=Be,p[2]=Ge,p[3]=Ne,z.clearBufferuiv(z.COLOR,0,p)):(_[0]=$e,_[1]=Be,_[2]=Ge,_[3]=Ne,z.clearBufferiv(z.COLOR,0,_))}else G|=z.COLOR_BUFFER_BIT}k&&(G|=z.DEPTH_BUFFER_BIT),H&&(G|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),me.dispose(),De.dispose(),je.dispose(),E.dispose(),B.dispose(),ee.dispose(),We.dispose(),lt.dispose(),ve.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",gn),Je.removeEventListener("sessionend",vt),be&&(be.dispose(),be=null),_n.stop()};function re(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=wt.autoReset,k=J.enabled,H=J.autoUpdate,G=J.needsUpdate,F=J.type;Pt(),wt.autoReset=T,J.enabled=k,J.autoUpdate=H,J.needsUpdate=G,J.type=F}function oe(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ae(T){const k=T.target;k.removeEventListener("dispose",ae),ke(k)}function ke(T){Re(T),je.remove(T)}function Re(T){const k=je.get(T).programs;k!==void 0&&(k.forEach(function(H){ve.releaseProgram(H)}),T.isShaderMaterial&&ve.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,H,G,F,he){k===null&&(k=Ue);const ye=F.isMesh&&F.matrixWorld.determinant()<0,Pe=km(T,k,H,G,F);xe.setMaterial(G,ye);let Ne=H.index,$e=1;if(G.wireframe===!0){if(Ne=Z.getWireframeAttribute(H),Ne===void 0)return;$e=2}const Be=H.drawRange,Ge=H.attributes.position;let Ut=Be.start*$e,In=(Be.start+Be.count)*$e;he!==null&&(Ut=Math.max(Ut,he.start*$e),In=Math.min(In,(he.start+he.count)*$e)),Ne!==null?(Ut=Math.max(Ut,0),In=Math.min(In,Ne.count)):Ge!=null&&(Ut=Math.max(Ut,0),In=Math.min(In,Ge.count));const $t=In-Ut;if($t<0||$t===1/0)return;We.setup(F,G,Pe,H,Ne);let Ci,Ct=Oe;if(Ne!==null&&(Ci=Q.get(Ne),Ct=we,Ct.setIndex(Ci)),F.isMesh)G.wireframe===!0?(xe.setLineWidth(G.wireframeLinewidth*ot()),Ct.setMode(z.LINES)):Ct.setMode(z.TRIANGLES);else if(F.isLine){let Ze=G.linewidth;Ze===void 0&&(Ze=1),xe.setLineWidth(Ze*ot()),F.isLineSegments?Ct.setMode(z.LINES):F.isLineLoop?Ct.setMode(z.LINE_LOOP):Ct.setMode(z.LINE_STRIP)}else F.isPoints?Ct.setMode(z.POINTS):F.isSprite&&Ct.setMode(z.TRIANGLES);if(F.isBatchedMesh)Ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)Ct.renderInstances(Ut,$t,F.count);else if(H.isInstancedBufferGeometry){const Ze=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,fc=Math.min(H.instanceCount,Ze);Ct.renderInstances(Ut,$t,fc)}else Ct.render(Ut,$t)};function _t(T,k,H){T.transparent===!0&&T.side===Nt&&T.forceSinglePass===!1?(T.side=Vt,T.needsUpdate=!0,Ho(T,k,H),T.side=vr,T.needsUpdate=!0,Ho(T,k,H),T.side=Nt):Ho(T,k,H)}this.compile=function(T,k,H=null){H===null&&(H=T),m=De.get(H),m.init(),v.push(m),H.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==H&&T.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(M._useLegacyLights);const G=new Set;return T.traverse(function(F){const he=F.material;if(he)if(Array.isArray(he))for(let ye=0;ye<he.length;ye++){const Pe=he[ye];_t(Pe,H,F),G.add(Pe)}else _t(he,H,F),G.add(he)}),v.pop(),m=null,G},this.compileAsync=function(T,k,H=null){const G=this.compile(T,k,H);return new Promise(F=>{function he(){if(G.forEach(function(ye){je.get(ye).currentProgram.isReady()&&G.delete(ye)}),G.size===0){F(T);return}setTimeout(he,10)}Ce.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let xt=null;function qt(T){xt&&xt(T)}function gn(){_n.stop()}function vt(){_n.start()}const _n=new Qu;_n.setAnimationLoop(qt),typeof self!="undefined"&&_n.setContext(self),this.setAnimationLoop=function(T){xt=T,Je.setAnimationLoop(T),T===null?_n.stop():_n.start()},Je.addEventListener("sessionstart",gn),Je.addEventListener("sessionend",vt),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(k),k=Je.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,k,R),m=De.get(T,v.length),m.init(),v.push(m),Me.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),X.setFromProjectionMatrix(Me),le=this.localClippingEnabled,K=qe.init(this.clippingPlanes,le),x=me.get(T,u.length),x.init(),u.push(x),xi(T,k,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(j,q),this.info.render.frame++,K===!0&&qe.beginShadows();const H=m.state.shadowsArray;if(J.render(H,T,k),K===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),ut.render(x,T),m.setupLights(M._useLegacyLights),k.isArrayCamera){const G=k.cameras;for(let F=0,he=G.length;F<he;F++){const ye=G[F];Pf(x,T,ye,ye.viewport)}}else Pf(x,T,k);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(M,T,k),We.resetDefaultState(),L=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,u.pop(),u.length>0?x=u[u.length-1]:x=null};function xi(T,k,H,G){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){G&&Ve.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Me);const ye=ee.update(T),Pe=T.material;Pe.visible&&x.push(T,ye,Pe,H,Ve.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const ye=ee.update(T),Pe=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ve.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ve.copy(ye.boundingSphere.center)),Ve.applyMatrix4(T.matrixWorld).applyMatrix4(Me)),Array.isArray(Pe)){const Ne=ye.groups;for(let $e=0,Be=Ne.length;$e<Be;$e++){const Ge=Ne[$e],Ut=Pe[Ge.materialIndex];Ut&&Ut.visible&&x.push(T,ye,Ut,H,Ve.z,Ge)}}else Pe.visible&&x.push(T,ye,Pe,H,Ve.z,null)}}const he=T.children;for(let ye=0,Pe=he.length;ye<Pe;ye++)xi(he[ye],k,H,G)}function Pf(T,k,H,G){const F=T.opaque,he=T.transmissive,ye=T.transparent;m.setupLightsView(H),K===!0&&qe.setGlobalState(M.clippingPlanes,H),he.length>0&&Um(F,he,k,H),G&&xe.viewport(b.copy(G)),F.length>0&&Bo(F,k,H),he.length>0&&Bo(he,k,H),ye.length>0&&Bo(ye,k,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Um(T,k,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const he=Fe.isWebGL2;be===null&&(be=new qr(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?Eo:mr,minFilter:bo,samples:he?4:0})),M.getDrawingBufferSize(He),he?be.setSize(He.x,He.y):be.setSize(bl(He.x),bl(He.y));const ye=M.getRenderTarget();M.setRenderTarget(be),M.getClearColor(O),P=M.getClearAlpha(),P<1&&M.setClearColor(16777215,.5),M.clear();const Pe=M.toneMapping;M.toneMapping=pr,Bo(T,H,G),w.updateMultisampleRenderTarget(be),w.updateRenderTargetMipmap(be);let Ne=!1;for(let $e=0,Be=k.length;$e<Be;$e++){const Ge=k[$e],Ut=Ge.object,In=Ge.geometry,$t=Ge.material,Ci=Ge.group;if($t.side===Nt&&Ut.layers.test(G.layers)){const Ct=$t.side;$t.side=Vt,$t.needsUpdate=!0,Lf(Ut,H,G,In,$t,Ci),$t.side=Ct,$t.needsUpdate=!0,Ne=!0}}Ne===!0&&(w.updateMultisampleRenderTarget(be),w.updateRenderTargetMipmap(be)),M.setRenderTarget(ye),M.setClearColor(O,P),M.toneMapping=Pe}function Bo(T,k,H){const G=k.isScene===!0?k.overrideMaterial:null;for(let F=0,he=T.length;F<he;F++){const ye=T[F],Pe=ye.object,Ne=ye.geometry,$e=G===null?ye.material:G,Be=ye.group;Pe.layers.test(H.layers)&&Lf(Pe,k,H,Ne,$e,Be)}}function Lf(T,k,H,G,F,he){T.onBeforeRender(M,k,H,G,F,he),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(M,k,H,G,T,he),F.transparent===!0&&F.side===Nt&&F.forceSinglePass===!1?(F.side=Vt,F.needsUpdate=!0,M.renderBufferDirect(H,k,G,F,T,he),F.side=vr,F.needsUpdate=!0,M.renderBufferDirect(H,k,G,F,T,he),F.side=Nt):M.renderBufferDirect(H,k,G,F,T,he),T.onAfterRender(M,k,H,G,F,he)}function Ho(T,k,H){k.isScene!==!0&&(k=Ue);const G=je.get(T),F=m.state.lights,he=m.state.shadowsArray,ye=F.state.version,Pe=ve.getParameters(T,F.state,he,k,H),Ne=ve.getProgramCacheKey(Pe);let $e=G.programs;G.environment=T.isMeshStandardMaterial?k.environment:null,G.fog=k.fog,G.envMap=(T.isMeshStandardMaterial?B:E).get(T.envMap||G.environment),$e===void 0&&(T.addEventListener("dispose",ae),$e=new Map,G.programs=$e);let Be=$e.get(Ne);if(Be!==void 0){if(G.currentProgram===Be&&G.lightsStateVersion===ye)return If(T,Pe),Be}else Pe.uniforms=ve.getUniforms(T),T.onBuild(H,Pe,M),T.onBeforeCompile(Pe,M),Be=ve.acquireProgram(Pe,Ne),$e.set(Ne,Be),G.uniforms=Pe.uniforms;const Ge=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ge.clippingPlanes=qe.uniform),If(T,Pe),G.needsLights=Om(T),G.lightsStateVersion=ye,G.needsLights&&(Ge.ambientLightColor.value=F.state.ambient,Ge.lightProbe.value=F.state.probe,Ge.directionalLights.value=F.state.directional,Ge.directionalLightShadows.value=F.state.directionalShadow,Ge.spotLights.value=F.state.spot,Ge.spotLightShadows.value=F.state.spotShadow,Ge.rectAreaLights.value=F.state.rectArea,Ge.ltc_1.value=F.state.rectAreaLTC1,Ge.ltc_2.value=F.state.rectAreaLTC2,Ge.pointLights.value=F.state.point,Ge.pointLightShadows.value=F.state.pointShadow,Ge.hemisphereLights.value=F.state.hemi,Ge.directionalShadowMap.value=F.state.directionalShadowMap,Ge.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ge.spotShadowMap.value=F.state.spotShadowMap,Ge.spotLightMatrix.value=F.state.spotLightMatrix,Ge.spotLightMap.value=F.state.spotLightMap,Ge.pointShadowMap.value=F.state.pointShadowMap,Ge.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Be,G.uniformsList=null,Be}function Df(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=_a.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function If(T,k){const H=je.get(T);H.outputColorSpace=k.outputColorSpace,H.batching=k.batching,H.instancing=k.instancing,H.instancingColor=k.instancingColor,H.skinning=k.skinning,H.morphTargets=k.morphTargets,H.morphNormals=k.morphNormals,H.morphColors=k.morphColors,H.morphTargetsCount=k.morphTargetsCount,H.numClippingPlanes=k.numClippingPlanes,H.numIntersection=k.numClipIntersection,H.vertexAlphas=k.vertexAlphas,H.vertexTangents=k.vertexTangents,H.toneMapping=k.toneMapping}function km(T,k,H,G,F){k.isScene!==!0&&(k=Ue),w.resetTextureUnits();const he=k.fog,ye=G.isMeshStandardMaterial?k.environment:null,Pe=R===null?M.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Xi,Ne=(G.isMeshStandardMaterial?B:E).get(G.envMap||ye),$e=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Be=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ge=!!H.morphAttributes.position,Ut=!!H.morphAttributes.normal,In=!!H.morphAttributes.color;let $t=pr;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&($t=M.toneMapping);const Ci=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ct=Ci!==void 0?Ci.length:0,Ze=je.get(G),fc=m.state.lights;if(K===!0&&(le===!0||T!==y)){const Gn=T===y&&G.id===L;qe.setState(G,T,Gn)}let Lt=!1;G.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==fc.state.version||Ze.outputColorSpace!==Pe||F.isBatchedMesh&&Ze.batching===!1||!F.isBatchedMesh&&Ze.batching===!0||F.isInstancedMesh&&Ze.instancing===!1||!F.isInstancedMesh&&Ze.instancing===!0||F.isSkinnedMesh&&Ze.skinning===!1||!F.isSkinnedMesh&&Ze.skinning===!0||F.isInstancedMesh&&Ze.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ze.instancingColor===!1&&F.instanceColor!==null||Ze.envMap!==Ne||G.fog===!0&&Ze.fog!==he||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==qe.numPlanes||Ze.numIntersection!==qe.numIntersection)||Ze.vertexAlphas!==$e||Ze.vertexTangents!==Be||Ze.morphTargets!==Ge||Ze.morphNormals!==Ut||Ze.morphColors!==In||Ze.toneMapping!==$t||Fe.isWebGL2===!0&&Ze.morphTargetsCount!==Ct)&&(Lt=!0):(Lt=!0,Ze.__version=G.version);let Mr=Ze.currentProgram;Lt===!0&&(Mr=Ho(G,k,F));let Uf=!1,to=!1,hc=!1;const cn=Mr.getUniforms(),Sr=Ze.uniforms;if(xe.useProgram(Mr.program)&&(Uf=!0,to=!0,hc=!0),G.id!==L&&(L=G.id,to=!0),Uf||y!==T){cn.setValue(z,"projectionMatrix",T.projectionMatrix),cn.setValue(z,"viewMatrix",T.matrixWorldInverse);const Gn=cn.map.cameraPosition;Gn!==void 0&&Gn.setValue(z,Ve.setFromMatrixPosition(T.matrixWorld)),Fe.logarithmicDepthBuffer&&cn.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&cn.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,to=!0,hc=!0)}if(F.isSkinnedMesh){cn.setOptional(z,F,"bindMatrix"),cn.setOptional(z,F,"bindMatrixInverse");const Gn=F.skeleton;Gn&&(Fe.floatVertexTextures?(Gn.boneTexture===null&&Gn.computeBoneTexture(),cn.setValue(z,"boneTexture",Gn.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(cn.setOptional(z,F,"batchingTexture"),cn.setValue(z,"batchingTexture",F._matricesTexture,w));const dc=H.morphAttributes;if((dc.position!==void 0||dc.normal!==void 0||dc.color!==void 0&&Fe.isWebGL2===!0)&&it.update(F,H,Mr),(to||Ze.receiveShadow!==F.receiveShadow)&&(Ze.receiveShadow=F.receiveShadow,cn.setValue(z,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Sr.envMap.value=Ne,Sr.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),to&&(cn.setValue(z,"toneMappingExposure",M.toneMappingExposure),Ze.needsLights&&Nm(Sr,hc),he&&G.fog===!0&&ce.refreshFogUniforms(Sr,he),ce.refreshMaterialUniforms(Sr,G,$,V,be),_a.upload(z,Df(Ze),Sr,w)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(_a.upload(z,Df(Ze),Sr,w),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&cn.setValue(z,"center",F.center),cn.setValue(z,"modelViewMatrix",F.modelViewMatrix),cn.setValue(z,"normalMatrix",F.normalMatrix),cn.setValue(z,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Gn=G.uniformsGroups;for(let uc=0,zm=Gn.length;uc<zm;uc++)if(Fe.isWebGL2){const kf=Gn[uc];lt.update(kf,Mr),lt.bind(kf,Mr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mr}function Nm(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Om(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,k,H){je.get(T.texture).__webglTexture=k,je.get(T.depthTexture).__webglTexture=H;const G=je.get(T);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,k){const H=je.get(T);H.__webglFramebuffer=k,H.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,H=0){R=T,C=k,A=H;let G=!0,F=null,he=!1,ye=!1;if(T){const Ne=je.get(T);Ne.__useDefaultFramebuffer!==void 0?(xe.bindFramebuffer(z.FRAMEBUFFER,null),G=!1):Ne.__webglFramebuffer===void 0?w.setupRenderTarget(T):Ne.__hasExternalTextures&&w.rebindTextures(T,je.get(T.texture).__webglTexture,je.get(T.depthTexture).__webglTexture);const $e=T.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(ye=!0);const Be=je.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[k])?F=Be[k][H]:F=Be[k],he=!0):Fe.isWebGL2&&T.samples>0&&w.useMultisampledRTT(T)===!1?F=je.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[H]:F=Be,b.copy(T.viewport),N.copy(T.scissor),W=T.scissorTest}else b.copy(Y).multiplyScalar($).floor(),N.copy(ne).multiplyScalar($).floor(),W=ie;if(xe.bindFramebuffer(z.FRAMEBUFFER,F)&&Fe.drawBuffers&&G&&xe.drawBuffers(T,F),xe.viewport(b),xe.scissor(N),xe.setScissorTest(W),he){const Ne=je.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ne.__webglTexture,H)}else if(ye){const Ne=je.get(T.texture),$e=k||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ne.__webglTexture,H||0,$e)}L=-1},this.readRenderTargetPixels=function(T,k,H,G,F,he,ye){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=je.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){xe.bindFramebuffer(z.FRAMEBUFFER,Pe);try{const Ne=T.texture,$e=Ne.format,Be=Ne.type;if($e!==hi&&ge.convert($e)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=Be===Eo&&(Ce.has("EXT_color_buffer_half_float")||Fe.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(Be!==mr&&ge.convert(Be)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Be===lr&&(Fe.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-G&&H>=0&&H<=T.height-F&&z.readPixels(k,H,G,F,ge.convert($e),ge.convert(Be),he)}finally{const Ne=R!==null?je.get(R).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(T,k,H=0){const G=Math.pow(2,-H),F=Math.floor(k.image.width*G),he=Math.floor(k.image.height*G);w.setTexture2D(k,0),z.copyTexSubImage2D(z.TEXTURE_2D,H,0,0,T.x,T.y,F,he),xe.unbindTexture()},this.copyTextureToTexture=function(T,k,H,G=0){const F=k.image.width,he=k.image.height,ye=ge.convert(H.format),Pe=ge.convert(H.type);w.setTexture2D(H,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,H.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,H.unpackAlignment),k.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,G,T.x,T.y,F,he,ye,Pe,k.image.data):k.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,G,T.x,T.y,k.mipmaps[0].width,k.mipmaps[0].height,ye,k.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,G,T.x,T.y,ye,Pe,k.image),G===0&&H.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),xe.unbindTexture()},this.copyTextureToTexture3D=function(T,k,H,G,F=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=T.max.x-T.min.x+1,ye=T.max.y-T.min.y+1,Pe=T.max.z-T.min.z+1,Ne=ge.convert(G.format),$e=ge.convert(G.type);let Be;if(G.isData3DTexture)w.setTexture3D(G,0),Be=z.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)w.setTexture2DArray(G,0),Be=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const Ge=z.getParameter(z.UNPACK_ROW_LENGTH),Ut=z.getParameter(z.UNPACK_IMAGE_HEIGHT),In=z.getParameter(z.UNPACK_SKIP_PIXELS),$t=z.getParameter(z.UNPACK_SKIP_ROWS),Ci=z.getParameter(z.UNPACK_SKIP_IMAGES),Ct=H.isCompressedTexture?H.mipmaps[F]:H.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,Ct.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ct.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,T.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,T.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,T.min.z),H.isDataTexture||H.isData3DTexture?z.texSubImage3D(Be,F,k.x,k.y,k.z,he,ye,Pe,Ne,$e,Ct.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Be,F,k.x,k.y,k.z,he,ye,Pe,Ne,Ct.data)):z.texSubImage3D(Be,F,k.x,k.y,k.z,he,ye,Pe,Ne,$e,Ct),z.pixelStorei(z.UNPACK_ROW_LENGTH,Ge),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ut),z.pixelStorei(z.UNPACK_SKIP_PIXELS,In),z.pixelStorei(z.UNPACK_SKIP_ROWS,$t),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ci),F===0&&G.generateMipmaps&&z.generateMipmap(Be),xe.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?w.setTextureCube(T,0):T.isData3DTexture?w.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?w.setTexture2DArray(T,0):w.setTexture2D(T,0),xe.unbindTexture()},this.resetState=function(){C=0,A=0,R=null,xe.reset(),We.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===hf?"display-p3":"srgb",t.unpackColorSpace=pt.workingColorSpace===nc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===kt?Vr:Bu}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Vr?kt:Xi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class kM extends ap{}kM.prototype.isWebGL1Renderer=!0;class pf{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Te(e),this.near=t,this.far=i}clone(){return new pf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class NM extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class To extends pi{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _s=new tt,ad=new tt,da=[],cd=new $r,OM=new tt,co=new Ee,lo=new No;class di extends Ee{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new To(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,OM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $r),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_s),cd.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(cd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new No),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_s),lo.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(lo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(co.geometry=this.geometry,co.material=this.material,co.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lo.copy(this.boundingSphere),lo.applyMatrix4(i),e.ray.intersectsSphere(lo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,_s),ad.multiplyMatrices(i,_s),co.matrixWorld=ad,co.raycast(e,da);for(let a=0,o=da.length;a<o;a++){const c=da[a];c.instanceId=s,c.object=this,t.push(c)}da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new To(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ao extends Dn{constructor(e,t,i,r,s,a,o,c,f){super(e,t,i,r,s,a,o,c,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rc extends Tn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],f=new I,l=new nt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const p=i+h/t*r;f.x=e*Math.cos(p),f.y=e*Math.sin(p),a.push(f.x,f.y,f.z),o.push(0,0,1),l.x=(a[d]/e+1)/2,l.y=(a[d+1]/e+1)/2,c.push(l.x,l.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(o,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ke extends Tn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const f=this;r=Math.floor(r),s=Math.floor(s);const l=[],h=[],d=[],p=[];let _=0;const x=[],m=i/2;let u=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(l),this.setAttribute("position",new dt(h,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(p,2));function v(){const S=new I,C=new I;let A=0;const R=(t-e)/i;for(let L=0;L<=s;L++){const y=[],b=L/s,N=b*(t-e)+e;for(let W=0;W<=r;W++){const O=W/r,P=O*c+o,U=Math.sin(P),V=Math.cos(P);C.x=N*U,C.y=-b*i+m,C.z=N*V,h.push(C.x,C.y,C.z),S.set(U,R,V).normalize(),d.push(S.x,S.y,S.z),p.push(O,1-b),y.push(_++)}x.push(y)}for(let L=0;L<r;L++)for(let y=0;y<s;y++){const b=x[y][L],N=x[y+1][L],W=x[y+1][L+1],O=x[y][L+1];l.push(b,N,O),l.push(N,W,O),A+=6}f.addGroup(u,A,0),u+=A}function M(S){const C=_,A=new nt,R=new I;let L=0;const y=S===!0?e:t,b=S===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,m*b,0),d.push(0,b,0),p.push(.5,.5),_++;const N=_;for(let W=0;W<=r;W++){const P=W/r*c+o,U=Math.cos(P),V=Math.sin(P);R.x=y*V,R.y=m*b,R.z=y*U,h.push(R.x,R.y,R.z),d.push(0,b,0),A.x=U*.5+.5,A.y=V*.5*b+.5,p.push(A.x,A.y),_++}for(let W=0;W<r;W++){const O=C+W,P=N+W;S===!0?l.push(P,P+1,O):l.push(P+1,P,O),L+=3}f.addGroup(u,L,S===!0?1:2),u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ke(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pn extends Ke{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Pn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mf extends Tn{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),f(i),l(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new I,S=new I,C=new I;for(let A=0;A<t.length;A+=3)p(t[A+0],M),p(t[A+1],S),p(t[A+2],C),c(M,S,C,v)}function c(v,M,S,C){const A=C+1,R=[];for(let L=0;L<=A;L++){R[L]=[];const y=v.clone().lerp(S,L/A),b=M.clone().lerp(S,L/A),N=A-L;for(let W=0;W<=N;W++)W===0&&L===A?R[L][W]=y:R[L][W]=y.clone().lerp(b,W/N)}for(let L=0;L<A;L++)for(let y=0;y<2*(A-L)-1;y++){const b=Math.floor(y/2);y%2===0?(d(R[L][b+1]),d(R[L+1][b]),d(R[L][b])):(d(R[L][b+1]),d(R[L+1][b+1]),d(R[L+1][b]))}}function f(v){const M=new I;for(let S=0;S<s.length;S+=3)M.x=s[S+0],M.y=s[S+1],M.z=s[S+2],M.normalize().multiplyScalar(v),s[S+0]=M.x,s[S+1]=M.y,s[S+2]=M.z}function l(){const v=new I;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const S=m(v)/2/Math.PI+.5,C=u(v)/Math.PI+.5;a.push(S,1-C)}_(),h()}function h(){for(let v=0;v<a.length;v+=6){const M=a[v+0],S=a[v+2],C=a[v+4],A=Math.max(M,S,C),R=Math.min(M,S,C);A>.9&&R<.1&&(M<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),C<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function p(v,M){const S=v*3;M.x=e[S+0],M.y=e[S+1],M.z=e[S+2]}function _(){const v=new I,M=new I,S=new I,C=new I,A=new nt,R=new nt,L=new nt;for(let y=0,b=0;y<s.length;y+=9,b+=6){v.set(s[y+0],s[y+1],s[y+2]),M.set(s[y+3],s[y+4],s[y+5]),S.set(s[y+6],s[y+7],s[y+8]),A.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),L.set(a[b+4],a[b+5]),C.copy(v).add(M).add(S).divideScalar(3);const N=m(C);x(A,b+0,v,N),x(R,b+2,M,N),x(L,b+4,S,N)}}function x(v,M,S,C){C<0&&v.x===1&&(a[M]=v.x-1),S.x===0&&S.z===0&&(a[M]=C/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mf(e.vertices,e.indices,e.radius,e.details)}}class Ha extends mf{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ha(e.radius,e.detail)}}class Oo extends Tn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],f=[],l=[];let h=e;const d=(t-e)/r,p=new I,_=new nt;for(let x=0;x<=r;x++){for(let m=0;m<=i;m++){const u=s+m/i*a;p.x=h*Math.cos(u),p.y=h*Math.sin(u),c.push(p.x,p.y,p.z),f.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,l.push(_.x,_.y)}h+=d}for(let x=0;x<r;x++){const m=x*(i+1);for(let u=0;u<i;u++){const v=u+m,M=v,S=v+i+1,C=v+i+2,A=v+1;o.push(M,S,A),o.push(S,C,A)}}this.setIndex(o),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(f,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Mn extends Tn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let f=0;const l=[],h=new I,d=new I,p=[],_=[],x=[],m=[];for(let u=0;u<=i;u++){const v=[],M=u/i;let S=0;u===0&&a===0?S=.5/t:u===i&&c===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const A=C/t;h.x=-e*Math.cos(r+A*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(r+A*s)*Math.sin(a+M*o),_.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(A+S,1-M),v.push(f++)}l.push(v)}for(let u=0;u<i;u++)for(let v=0;v<t;v++){const M=l[u][v+1],S=l[u][v],C=l[u+1][v],A=l[u+1][v+1];(u!==0||a>0)&&p.push(M,S,A),(u!==i-1||c<Math.PI)&&p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new dt(_,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class bs extends Tn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],f=[],l=new I,h=new I,d=new I;for(let p=0;p<=i;p++)for(let _=0;_<=r;_++){const x=_/r*s,m=p/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),l.x=e*Math.cos(x),l.y=e*Math.sin(x),d.subVectors(h,l).normalize(),c.push(d.x,d.y,d.z),f.push(_/r),f.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=r;_++){const x=(r+1)*p+_-1,m=(r+1)*(p-1)+_-1,u=(r+1)*(p-1)+_,v=(r+1)*p+_;a.push(x,m,v),a.push(m,u,v)}this.setIndex(a),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class gf extends Zs{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Te(16777215),this.specular=new Te(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ff,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bn extends Zs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ff,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cp extends rn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class zM extends cp{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Kc=new tt,ld=new I,fd=new I;class FM{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new df,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ld.setFromMatrixPosition(e.matrixWorld),t.position.copy(ld),fd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fd),t.updateMatrixWorld(),Kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class BM extends FM{constructor(){super(new ep(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class HM extends cp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new BM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:af}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=af);const lp={low:{name:"Low",pixelRatio:1,antialias:!1,particles:120,splats:30,fogScale:.8,shadows:0,softShadows:!1,shadowRange:0,grass:0,clouds:!1},medium:{name:"Medium",pixelRatio:1.35,antialias:!0,particles:260,splats:60,fogScale:1,shadows:1024,softShadows:!1,shadowRange:30,grass:2600,clouds:!0},high:{name:"High",pixelRatio:2,antialias:!0,particles:420,splats:90,fogScale:1,shadows:2048,softShadows:!0,shadowRange:42,grass:6e3,clouds:!0}},hd=["low","medium","high"];function GM(){try{return localStorage.getItem("rally-quality")||"auto"}catch{return"auto"}}function VM(n){try{localStorage.setItem("rally-quality",n)}catch{}}function WM(){let n="";try{const r=document.createElement("canvas"),s=r.getContext("webgl"),a=s&&s.getExtension("WEBGL_debug_renderer_info");n=a?String(s.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{}const e=navigator.hardwareConcurrency||4,t=navigator.deviceMemory||4,i=matchMedia("(pointer: coarse)").matches;return/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(n)||t<=2||e<=2?"low":i?t<=3||e<=4?"low":"medium":"high"}const ht={setting:GM(),detected:WM(),level:"medium",stepped:!1,get cfg(){return lp[this.level]}};ht.level=ht.setting==="auto"?ht.detected:ht.setting;function XM(){const n=hd.indexOf(ht.level);return n<=0?null:(ht.level=hd[n-1],ht.stepped=!0,ht.level)}const dd={dunes:{g1:14859650,g2:13804648,g3:12160860,zenith:4160208,horizon:15128248,sun:16773330,sunI:3.1,sky:14214911,gnd:11570268,hemiI:1.25,fog:[70,230],sunDir:[.55,.62,.3],ground:"sand",grass:.22,grassCol:[11046984,15258238]},river:{g1:8824908,g2:7312448,zenith:4883152,horizon:14280426,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},forest:{g1:6258744,g2:7180094,zenith:5998260,horizon:13030594,sun:16772816,sunI:2.7,sky:13622506,gnd:4479023,hemiI:1.35,fog:[30,140],sunDir:[.45,.7,.4],ground:"grass",grass:1.2,grassCol:[3496484,8826194]},forum:{zenith:4883666,horizon:15129803,sun:16773334,sunI:3,sky:14214399,gnd:11049084,hemiI:1.25,fog:[70,230],sunDir:[.5,.64,.35],ground:"paving",grass:.08,grassCol:[7305788,11055200]},colosseum:{zenith:4882640,horizon:15260868,sun:16773330,sunI:3,sky:14214399,gnd:11570268,hemiI:1.2,fog:[90,260],sunDir:[.45,.72,.3],ground:"sand",grass:0,grassCol:[10127946,14206074]},desert:{g1:14859650,g2:13804648,g3:12160860,zenith:3831504,horizon:15259316,sun:16773328,sunI:3.2,sky:14214911,gnd:11570268,hemiI:1.2,fog:[80,240],sunDir:[.55,.6,.3],ground:"sand",grass:.15,grassCol:[11046984,15258238]},wooden:{g1:8955982,g2:7509066,zenith:4883152,horizon:14083304,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},valley:{g1:9614419,g2:8035908,zenith:4423892,horizon:14412010,sun:16774108,sunI:3.1,sky:13952255,gnd:6123328,hemiI:1.3,fog:[70,230],sunDir:[.52,.62,.38],ground:"grass",grass:1.4,grassCol:[4880942,11849834]},frost:{g1:13884902,g2:12569816,g3:11056834,zenith:6262732,horizon:15002609,sun:16774890,sunI:2.3,sky:15134463,gnd:10135218,hemiI:1.1,fog:[50,190],sunDir:[.5,.6,.45],ground:"snow",grass:.12,grassCol:[8227450,13227727]}},fp=n=>dd[n]||dd.dunes,Jc={};function _f(n,e,t,i=!0){if(Jc[n])return Jc[n];const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d");t(s,e,Xr(n.length*7919+e));const a=new Ao(r);return a.wrapS=a.wrapT=Ws,a.anisotropy=4,a.colorSpace=i?kt:Bn,Jc[n]=a}function jM(n,e,t){const i=[];for(let a=0;a<e*e;a++)i.push(t());const r=(a,o)=>i[(o+e)%e*e+(a+e)%e],s=a=>a*a*(3-2*a);return(a,o)=>{const c=a/n*e,f=o/n*e,l=Math.floor(c),h=Math.floor(f),d=s(c-l),p=s(f-h);return(r(l,h)*(1-d)+r(l+1,h)*d)*(1-p)+(r(l,h+1)*(1-d)+r(l+1,h+1)*d)*p}}function Es(n,e,t,i,r,s){const a=n.createImageData(e,e),o=a.data,c=s.map(([f,l])=>[jM(e,f,t),l]);for(let f=0;f<e;f++)for(let l=0;l<e;l++){let h=0;for(const[_,x]of c)h+=(_(l,f)-.5)*x;const d=Math.max(0,Math.min(255,(i+h*r)*255)),p=(f*e+l)*4;o[p]=o[p+1]=o[p+2]=d,o[p+3]=255}n.putImageData(a,0,0)}const qM=n=>_f("ground-"+n,256,(e,t,i)=>{if(n==="sand"){Es(e,t,i,.86,.5,[[4,.6],[16,.5],[64,.35]]),e.globalAlpha=.07,e.strokeStyle="#000",e.lineWidth=3;for(let r=0;r<14;r++){const s=r*t/14+i()*6;e.beginPath();for(let a=-10;a<=t+10;a+=8)e.lineTo(a,s+Math.sin(a/t*Math.PI*4+r)*5);e.stroke()}e.globalAlpha=.25;for(let r=0;r<900;r++)e.fillStyle=i()<.5?"#fff":"#6b5a40",e.fillRect(i()*t,i()*t,1,1)}else if(n==="paving"){Es(e,t,i,.86,.3,[[8,.5],[32,.4]]);const r=6,s=t/r;for(let a=0;a<r;a++)for(let o=0;o<r;o++){const c=a%2*s/2;e.globalAlpha=.06+i()*.1,e.fillStyle=i()<.5?"#000":"#fff",e.fillRect(o*s+c+2,a*s+2,s-4,s-4),e.globalAlpha=.35,e.strokeStyle="#5a5246",e.lineWidth=2,e.strokeRect(o*s+c+1,a*s+1,s-2,s-2),e.strokeRect(o*s+c-t+1,a*s+1,s-2,s-2)}}else if(n==="snow"){Es(e,t,i,.95,.25,[[4,.6],[16,.4],[64,.2]]),e.globalAlpha=.5;for(let r=0;r<400;r++)e.fillStyle="#fff",e.fillRect(i()*t,i()*t,1,1)}else{Es(e,t,i,.82,.55,[[4,.7],[16,.5],[64,.3]]),e.lineWidth=1.2;for(let r=0;r<2600;r++){const s=i()*t,a=i()*t,o=3+i()*6,c=(i()-.5)*.9;e.globalAlpha=.18+i()*.2,e.strokeStyle=i()<.5?"#1c2a10":"#ffffff",e.beginPath(),e.moveTo(s,a),e.lineTo(s+Math.sin(c)*o,a-Math.cos(c)*o),e.stroke()}}e.globalAlpha=1}),Hi=()=>_f("stone",256,(n,e,t)=>{Es(n,e,t,.8,.35,[[8,.5],[32,.5]]);const i=8,r=e/i;for(let s=0;s<i;s++){const a=s%2*.5,o=4;for(let c=-1;c<o;c++){const f=e/o,l=(c+a)*f+(t()-.5)*6;n.globalAlpha=.12+t()*.12,n.fillStyle=t()<.5?"#000":"#fff",n.fillRect(l+2,s*r+2,f-4,r-4),n.globalAlpha=.3,n.strokeStyle="#3a3733",n.lineWidth=2,n.strokeRect(l+1,s*r+1,f-2,r-2)}}n.globalAlpha=1}),gr=()=>_f("wood",128,(n,e,t)=>{Es(n,e,t,.8,.3,[[4,.4]]);for(let i=0;i<90;i++){const r=t()*e;n.globalAlpha=.08+t()*.15,n.fillStyle=t()<.6?"#000":"#fff",n.fillRect(r,0,1+t()*2,e)}n.globalAlpha=1});function Gt(n,e,t){const i=n.attributes.uv;for(let r=0;r<i.count;r++)i.setXY(r,i.getX(r)*e,i.getY(r)*t);return n}const $M=document.getElementById("gl"),Hn=new ap({canvas:$M,antialias:ht.cfg.antialias,powerPreference:"high-performance"});Hn.outputColorSpace=kt;Hn.toneMapping=Lu;Hn.toneMappingExposure=1.15;const Ot=new NM;Ot.fog=new pf(14472902,70,190);const Mt=new Kn(60,1,.1,420),xa=new zM(14214911,11570268,1.25);Ot.add(xa);const ui=new HM(16773330,3);Ot.add(ui,ui.target);const kr=new I(.55,.62,.3).normalize(),Nr={zenith:{value:new Te},horizon:{value:new Te},sunCol:{value:new Te},sunDir:{value:kr.clone()},time:{value:0},clouds:{value:1}},sc=new Ee(new Mn(400,32,16),new yr({uniforms:Nr,side:Vt,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }",fragmentShader:`
    uniform vec3 zenith, horizon, sunCol, sunDir; uniform float time, clouds; varying vec3 vDir;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=.5; } return s; }
    void main(){
      vec3 d = normalize(vDir); float h = max(d.y, 0.);
      vec3 col = mix(horizon, zenith, pow(h, .45));
      float sd = max(dot(d, normalize(sunDir)), 0.);
      col += sunCol * (pow(sd, 900.) * 6. + pow(sd, 12.) * .35);
      if (clouds > .5 && d.y > 0.) {
        vec2 uv = d.xz / (d.y + .18) * 1.6 + vec2(time * .012, time * .004);
        float n = fbm(uv);
        float c = smoothstep(.5, .78, n) * smoothstep(.0, .22, d.y);
        vec3 cc = mix(horizon, vec3(1.), .75) * (.85 + .25 * sd);
        col = mix(col, cc, c * .85);
      }
      gl_FragColor = vec4(col, 1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`}));sc.renderOrder=-10;sc.frustumCulled=!1;Ot.add(sc);const bt={W:0,H:0,DPR:1};function hp(){Hn.setPixelRatio(Math.min(window.devicePixelRatio||1,ht.cfg.pixelRatio))}function YM(){bt.W=innerWidth,bt.H=innerHeight,bt.DPR=Math.min(window.devicePixelRatio||1,2),hp(),Hn.setSize(bt.W,bt.H,!1),Mt.aspect=bt.W/bt.H,Mt.fov=bt.W<bt.H?78:60,Mt.updateProjectionMatrix()}function dp(){const n=ht.cfg,e=n.shadows>0,t=Hn.shadowMap.enabled!==e;if(Hn.shadowMap.enabled=e,Hn.shadowMap.type=n.softShadows?Pu:cf,ui.castShadow=e,e){const i=ui.shadow,r=n.shadowRange;i.mapSize.set(n.shadows,n.shadows),i.camera.left=-r,i.camera.right=r,i.camera.top=r,i.camera.bottom=-r,i.camera.near=1,i.camera.far=260,i.camera.updateProjectionMatrix(),i.bias=-6e-4,i.normalBias=.04,i.map&&(i.map.dispose(),i.map=null)}return t&&Ot.traverse(i=>{i.material&&[].concat(i.material).forEach(r=>r.needsUpdate=!0)}),Nr.clouds.value=n.clouds?1:0,e}const up=()=>Hn.shadowMap.enabled,KM=new I;function pp(n,e,t){if(Nr.time.value=t,sc.position.copy(Mt.position),!ui.castShadow){ui.position.set(n,0,e).addScaledVector(kr,150),ui.target.position.set(n,0,e);return}const i=ht.cfg.shadowRange,r=2*i/ht.cfg.shadows,s=KM.set(kr.z,0,-kr.x).normalize(),a=n*s.x+e*s.z,o=Math.round(a/r)*r-a,c=n+s.x*o,f=e+s.z*o;ui.target.position.set(c,0,f),ui.position.set(c,0,f).addScaledVector(kr,150)}function JM(n){const e=fp(n.id);Nr.zenith.value.set(e.zenith),Nr.horizon.value.set(e.horizon),Nr.sunCol.value.set(e.sun),kr.set(...e.sunDir).normalize(),Nr.sunDir.value.copy(kr),Ot.fog.color.set(e.horizon),Ot.fog.near=e.fog[0]*ht.cfg.fogScale,Ot.fog.far=e.fog[1]*ht.cfg.fogScale,xa.color.set(e.sky),xa.groundColor.set(e.gnd),xa.intensity=e.hemiI,ui.color.set(e.sun),ui.intensity=e.sunI}const Ht=(n,e,t={})=>new bn(Object.assign({color:n,map:e||null},t)),Qe={marble:Ht(15920610,Hi()),marbleDark:Ht(14209216,Hi()),plaster:Ht(15392710),roof:Ht(11818298),sand:Ht(14729100,Hi()),sandDark:Ht(13215346,Hi()),wood:Ht(8018490,gr()),log:Ht(6966067,gr()),thatch:Ht(12097104),dark:Ht(2760728),bronze:new gf({color:13144124,shininess:60,specular:6706483}),palmTrunk:Ht(9071172,gr()),palmLeaf:Ht(4879408,null,{side:Nt}),iron:Ht(3815998)},Ft=(n,e=!0)=>(n.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=!0)}),n),ud=new tt,pd=new ei,md=new ji,ZM=new I,QM=new I,Kt=(n,e,t,i,r,s,a,o,c,f,l)=>{md.set(s,a,o),pd.setFromEuler(md),ud.compose(ZM.set(t,i,r),pd,QM.set(c,f,l)),n.setMatrixAt(e,ud)};function Jt(n,e,t,i){const r=new di(n,e,Math.max(1,t.length));return t.forEach((s,a)=>i(r,a,s)),r.count=t.length,r}let Or={gates:[],crowdU:null};function gd(n,e,t){const i=new Tn,r=n/2,s=t/2,a=[-r,0,s,r,0,s,0,e,s,-r,0,-s,0,e,-s,r,0,-s],o=[0,1,2,5,3,4,0,2,4,0,4,3,1,5,4,1,4,2,0,3,5,0,5,1];return i.setAttribute("position",new dt(a,3)),i.setIndex(o),i.computeVertexNormals(),i.toNonIndexed()}function eS(n,e){Or={gates:[],crowdU:null};const t=n.mapId;n.columns.length&&(e.add(Ft(Jt(new Ke(1,1.08,1,12),Qe.marble,n.columns,(a,o,c)=>Kt(a,o,c.x,c.y+c.h/2,c.z,0,0,0,c.r,c.h,c.r)))),e.add(Ft(Jt(new Ie(1,1,1),Qe.marbleDark,n.columns,(a,o,c)=>Kt(a,o,c.x,c.y+c.h+.15,c.z,0,0,0,c.r*2.6,.3,c.r*2.6)))),e.add(Ft(Jt(new Ie(1,1,1),Qe.marbleDark,n.columns,(a,o,c)=>Kt(a,o,c.x,c.y+.12,c.z,0,0,0,c.r*2.6,.24,c.r*2.6)))));for(const a of n.statues){const o=new Sn,c=a.big?1.6:1,f=new Ee(new Ie(1.6*c,1.4*c,1.6*c),Qe.marbleDark);f.position.y=.7*c,o.add(f);const l=new Ee(new Ke(.35*c,.5*c,1.7*c,10),a.big?Qe.bronze:Qe.marble);l.position.y=2.25*c,o.add(l);const h=new Ee(new Mn(.3*c,10,8),a.big?Qe.bronze:Qe.marble);h.position.y=3.35*c,o.add(h);const d=new Ee(new Ke(.09*c,.09*c,1.3*c,6),a.big?Qe.bronze:Qe.marble);d.position.set(.45*c,3.1*c,0),d.rotation.z=-.5,o.add(d),o.position.set(a.x,Rt(a.x,a.z),a.z),o.rotation.y=Math.atan2(-a.x,-a.z),e.add(Ft(o))}const i=n.buildings.filter(a=>a.kind==="house"),r=n.buildings.filter(a=>a.kind==="tent"),s=n.buildings.filter(a=>a.kind==="hut");if(i.length){e.add(Ft(Jt(new Ie(1,1,1),Qe.plaster,i,(c,f,l)=>Kt(c,f,l.x,l.h/2,l.z,0,l.rot,0,l.w,l.h,l.d))));const a=new Pn(Math.SQRT1_2,1,4);a.rotateY(Math.PI/4),a.translate(0,.5,0),e.add(Ft(Jt(a,Qe.roof,i,(c,f,l)=>Kt(c,f,l.x,l.h,l.z,0,l.rot,0,l.w*1.12,2.2,l.d*1.12))));const o=[];for(const c of i)for(const[f,l]of[[0,1],[0,-1],[1,0],[-1,0]])for(const h of[-.28,.28])o.push({x:c.x+f*(c.w/2+.02)+(l?h*c.w:0),z:c.z+l*(c.d/2+.02)+(f?h*c.d:0),y:c.h*.62,ry:f?Math.PI/2:0});e.add(Jt(new un(.9,1.2),Qe.dark,o,(c,f,l)=>Kt(c,f,l.x,l.y,l.z,0,l.ry,0,1,1,1)))}if(r.length){const a=new Pn(Math.SQRT1_2,1,4);a.rotateY(Math.PI/4),a.translate(0,.5,0);const o=[15260864,12080698,14267242,9067066],c=Jt(a,Ht(16777215,null,{side:Nt}),r,(f,l,h)=>{Kt(f,l,h.x,Rt(h.x,h.z),h.z,0,h.rot,0,h.w*1.1,h.h,h.d*1.1),f.setColorAt(l,new Te(o[l%o.length]))});e.add(Ft(c))}s.length&&(e.add(Ft(Jt(Gt(new Ke(1,1,1,10),3,1),Qe.log,s,(a,o,c)=>Kt(a,o,c.x,1.1,c.z,0,c.rot,0,c.w/2,2.2,c.d/2)))),e.add(Ft(Jt(new Pn(1,1,10),Qe.thatch,s,(a,o,c)=>Kt(a,o,c.x,3.2,c.z,0,c.rot,0,c.w/2+.5,2.2,c.d/2+.5)))));for(const a of n.towers){const o=new Sn,c=sr(a.x,a.z);if(a.kind==="sand"){const f=new Ee(Gt(new Ke(a.r,a.r*1.12,a.h,14),4,2),Qe.sand);f.position.y=a.h/2,o.add(f);const l=new Ee(new Ke(a.r*1.18,a.r*1.18,.8,14),Qe.sandDark);l.position.y=a.h+.4,o.add(l);for(let h=0;h<8;h++){const d=h/8*Math.PI*2,p=new Ee(new Ie(.7,.7,.5),Qe.sandDark);p.position.set(Math.cos(d)*a.r*1.05,a.h+1.15,Math.sin(d)*a.r*1.05),p.rotation.y=-d,o.add(p)}}else{const f=a.small?.9:1.5,l=new Ke(.14,.16,a.h,6);for(const[p,_]of[[-f,-f],[f,-f],[-f,f],[f,f]]){const x=new Ee(l,Qe.log);x.position.set(p,a.h/2,_),o.add(x)}const h=new Ee(new Ie(f*2+.8,.25,f*2+.8),Qe.wood);h.position.y=a.h-1.4,o.add(h);for(const[p,_,x]of[[0,f+.35,0],[0,-f-.35,0],[f+.35,0,Math.PI/2],[-f-.35,0,Math.PI/2]]){const m=new Ee(new Ie(f*2+.8,.5,.12),Qe.wood);m.position.set(p,a.h-1,_),m.rotation.y=x,o.add(m)}const d=new Ee(new Pn(f*1.9,1.6,4),Qe.thatch);d.position.y=a.h+.7,d.rotation.y=Math.PI/4,o.add(d)}o.position.set(a.x,c,a.z),e.add(Ft(o))}for(const a of n.rings){const o=a.x||0,c=a.z||0,f=x=>a.gaps.some(m=>Math.abs(_i(x,m))<a.gapW)||(a.towersAt||[]).some(m=>Math.abs(_i(x,m))<2.8/a.r);if(a.kind==="logs"){const x=[],m=Math.ceil(Math.PI*2*a.r/.68),u=Xr(Math.round(o+c)+7);for(let v=0;v<m;v++){const M=v/m*Math.PI*2;f(M)||x.push({x:o+Math.cos(M)*a.r,z:c+Math.sin(M)*a.r,sy:.9+u()*.25,rot:u()*3})}e.add(Ft(Jt(Gt(new Ke(.32,.36,1,7),1,2),Qe.log,x,(v,M,S)=>Kt(v,M,S.x,sr(S.x,S.z)+a.h*S.sy/2,S.z,0,S.rot,0,1,a.h*S.sy,1)))),e.add(Ft(Jt(new Pn(.34,.55,7),Qe.log,x,(v,M,S)=>Kt(v,M,S.x,sr(S.x,S.z)+a.h*S.sy+.27,S.z,0,S.rot,0,1,1,1))));continue}const l=t==="desert"?Qe.sand:Qe.marbleDark,h=t==="desert"?Qe.sandDark:Qe.marble,d=[],p=Math.ceil(Math.PI*2*a.r/1.8);for(let x=0;x<p;x++){const m=(x+.5)/p*Math.PI*2;f(m)||d.push({a:m,x:o+Math.cos(m)*a.r,z:c+Math.sin(m)*a.r})}const _=Math.PI*2*a.r/p+.05;e.add(Ft(Jt(Gt(new Ie(1,1,1),.8,1.4),l,d,(x,m,u)=>Kt(x,m,u.x,a.h/2,u.z,0,-u.a,0,1.8,a.h,_)))),e.add(Ft(Jt(new Ie(1,1,1),h,d.filter((x,m)=>m%2===0),(x,m,u)=>Kt(x,m,u.x,a.h+.35,u.z,0,-u.a,0,1.9,.7,_*.55))));for(const x of a.gaps){const m=a.gapW*a.r+.9;for(const v of[-1,1]){const M=x+v*m/a.r,S=new Ee(new Ie(2.2,a.h+1.6,2.2),h);S.position.set(o+Math.cos(M)*a.r,(a.h+1.6)/2,c+Math.sin(M)*a.r),S.rotation.y=-M,e.add(Ft(S))}const u=new Ee(new Ie(1.6,.9,m*2+2),h);u.position.set(o+Math.cos(x)*a.r,a.h+1.2,c+Math.sin(x)*a.r),u.rotation.y=-x,e.add(Ft(u))}}if(t==="forum")for(const a of jl){const o=new Sn,c=gt.h,f=gt.back-gt.front,l=gt.hw*2,h=new Ee(Gt(new Ie(l,c,f),6,1),Qe.marbleDark);h.position.set(0,c/2,(gt.back+gt.front)/2),o.add(h);for(let v=0;v<3;v++){const M=new Ee(new Ie(l-1,c*(v+1)/3,1),Qe.marble);M.position.set(0,c*(v+1)/6,gt.front-2.5+v),o.add(M)}const d=5.2,p=new Ee(Gt(new Ie(12,d,6),4,2),Qe.marble);p.position.set(0,c+d/2,3),o.add(p);const _=new Ee(new un(2.4,3.6),Qe.dark);_.position.set(0,c+1.8,-.02),_.rotation.y=Math.PI,o.add(_);const x=new Ee(new Ie(l+.4,.7,f+.4),Qe.marble);x.position.set(0,c+d+.35,(gt.back+gt.front)/2),o.add(x);const m=new Ee(gd(l+.8,2.4,f+.8),Qe.roof);m.position.set(0,c+d+.7,(gt.back+gt.front)/2),o.add(m);const u=new Ee(gd(l+.4,2.2,.3),Qe.marble);u.position.set(0,c+d+.7,gt.front-.15),o.add(u),o.position.set(a.x,0,a.z),o.rotation.y=a.rot,e.add(Ft(o))}if(t==="desert")for(const a of[0,Math.PI/2,Math.PI,-Math.PI/2]){const o=St.ramp-St.r,c=Math.hypot(o,St.h),f=new Sn,l=new Ee(Gt(new Ie(St.lane*2,.5,c),2,3),Qe.sandDark);l.rotation.x=Math.atan2(St.h,o),l.position.set(0,St.h/2-.22,St.r+o/2),f.add(l),f.rotation.y=Math.atan2(Math.cos(a),Math.sin(a)),e.add(Ft(f))}if(n.palms.length){const a=[],o=[];for(const f of n.palms){const l=sr(f.x,f.z),h=5,d=1.3*f.s;let p=f.x,_=f.z,x=l;for(let m=0;m<h;m++){const u=f.lean*(m+1)/h;a.push({x:p+Math.sin(f.rot)*u*.5,y:x+d/2,z:_+Math.cos(f.rot)*u*.5,rx:u*Math.cos(f.rot),rz:-u*Math.sin(f.rot),s:f.s*(1-m*.08)}),p+=Math.sin(f.rot)*u*d,_+=Math.cos(f.rot)*u*d,x+=d*.97}for(let m=0;m<7;m++)o.push({x:p,y:x+.1,z:_,ry:m/7*Math.PI*2+f.rot,s:f.s})}e.add(Ft(Jt(Gt(new Ke(.2,.26,1.35,7),1,2),Qe.palmTrunk,a,(f,l,h)=>Kt(f,l,h.x,h.y,h.z,h.rx,0,h.rz,h.s,h.s,h.s))));const c=new Ie(.55,.05,2.2);c.translate(0,0,1.1),e.add(Ft(Jt(c,Qe.palmLeaf,o,(f,l,h)=>Kt(f,l,h.x,h.y,h.z,.45,h.ry,0,h.s,h.s,h.s))))}if(t==="colosseum"){const a=sn.r+2.5,o=(()=>{const L=document.createElement("canvas");L.width=128,L.height=64;const y=L.getContext("2d");y.fillStyle="#d8ccb4",y.fillRect(0,0,128,64),y.fillStyle="#6a5a48";for(const N of[32,96])y.beginPath(),y.moveTo(N-14,64),y.lineTo(N-14,30),y.arc(N,30,14,Math.PI,0),y.lineTo(N+14,64),y.fill();y.fillStyle="#b8aa92",y.fillRect(0,8,128,5);const b=new Ao(L);return b.wrapS=Ws,b.repeat.set(40,1),b.colorSpace=kt,b})(),c=new Ee(new Ke(a,a,7,120,1,!0),Ht(16777215,o,{side:Vt}));c.position.y=3.5,c.receiveShadow=!0,e.add(c);const f=new Ee(new Ke(a+.6,a+.6,.8,120,1,!0),Ht(15260868,null,{side:Vt}));f.position.y=7.2,e.add(f);const l=new Ee(new Ke(a+30,a+1,18,120,1,!0),Ht(13221026,Hi(),{side:Vt}));l.position.y=16,e.add(l);const h=new Ee(new Ke(a+31,a+31,6,120,1,!0),Ht(16777215,o,{side:Vt}));h.position.y=28,e.add(h);const d=[];for(let L=0;L<24;L++)d.push({a:L/24*Math.PI*2,ti:L%4});const p=Ht(16777215,null,{side:Nt});e.add(Jt(new un(2.2,4),p,d,(L,y,b)=>{Kt(L,y,Math.cos(b.a)*(a-.15),4.8,Math.sin(b.a)*(a-.15),0,-b.a-Math.PI/2,0,1,1,1),L.setColorAt(y,new Te(de[b.ti].hex))}));const _=ht.level==="high"?3200:ht.level==="medium"?1600:500,x=Xr(42),m=[];for(let L=0;L<_;L++){const y=x(),b=a+2+y*27,N=x()*Math.PI*2;m.push({x:Math.cos(N)*b,z:Math.sin(N)*b,y:7+y*18+.5,a:N})}const u={time:{value:0}};Or.crowdU=u;const v=new bn({color:16777215});v.onBeforeCompile=L=>{L.uniforms.time=u.time,L.vertexShader=`uniform float time;
`+L.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        float ph = instanceMatrix[3][0] * 1.7 + instanceMatrix[3][2] * 2.3;
        transformed.y += max(0., sin(time * 7. + ph)) * .35 * step(.35, fract(ph * .13));
      #endif`)};const M=[15260864,12080698,6979488,14267242,8034906,10119834,13222064].map(L=>new Te(L)),S=Jt(new Ie(.55,1,.4),v,m,(L,y,b)=>{Kt(L,y,b.x,b.y,b.z,0,-b.a,0,1,1,1),L.setColorAt(y,M[y%M.length])});S.frustumCulled=!1,e.add(S);const C=Jt(new Mn(.22,6,5),v,m,(L,y,b)=>{Kt(L,y,b.x,b.y+.7,b.z,0,0,0,1,1,1),L.setColorAt(y,new Te(14727316))});C.frustumCulled=!1,e.add(C);const A=(()=>{const L=document.createElement("canvas");L.width=L.height=64;const y=L.getContext("2d");y.fillStyle="#2e2e32";for(let N=0;N<64;N+=12)y.fillRect(N,0,4,64),y.fillRect(0,N,64,3);const b=new Ao(L);return b.wrapS=b.wrapT=Ws,b})(),R=new bn({map:A,transparent:!0,alphaTest:.5,side:Nt});A.repeat.set(2,1.5);for(const L of n.gates){const y=Math.atan2(L.z,L.x),b=new Ee(new un(L.w+.4,4.4),R);b.position.set(L.x,2.2,L.z),b.rotation.y=Math.atan2(-Math.cos(y),-Math.sin(y)),b.castShadow=!0,e.add(b),Or.gates.push({mesh:b,y:2.2})}}}function tS(n,e){if(Or.crowdU&&(Or.crowdU.time.value=e),Or.gates.length){const t=su(g.T);for(const i of Or.gates){const r=t?6.3:2.2;i.y+=(r-i.y)*Math.min(1,n*4),i.mesh.position.y=i.y}}}let on=null,Tl=[],zi=null;const Fn=(n,e,t={})=>new bn(Object.assign({color:n,map:e||null},t)),er=Fn(14275526,Hi()),Al=Fn(12433323,Hi()),wl=Fn(3812384,gr()),nS=new bn({color:16183520,side:Nt}),iS=new bn({color:16764730,side:Nt}),_d=de.map(n=>new bn({color:n.hex,side:Nt})),xd=Fn(6966067,gr()),rS=Fn(8018490,gr()),sS=Fn(5586986,gr());function oS(n){n.traverse(e=>{e.geometry&&e.geometry.dispose()}),Ot.remove(n)}const oi=(n,e=!0)=>(n.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=!0)}),n);function mp(n){var v,M,S;on&&oS(on),zi&&Ot.remove(zi.banner),on=new Sn,Ot.add(on),Tl=[],zi=null;const e=g.map,t=fp(e.id);JM(e);const i=new un(420,420,220,220);i.rotateX(-Math.PI/2),Gt(i,64,64);const r=i.attributes.position,s=[],a=new Te((v=t.g1)!=null?v:e.g1),o=new Te((M=t.g2)!=null?M:e.g2),c=new Te((S=t.g3)!=null?S:e.g3),f=new Te(8022604);for(let C=0;C<r.count;C++){const A=r.getX(C),R=r.getZ(C),L=Math.hypot(A,R);r.setY(C,sr(A,R));const y=(Math.sin(A*.11+R*.07)+1)/2,b=(Math.sin(A*.031-R*.043)+1)/2,N=a.clone().lerp(o,y*.7+b*.3);L>92&&N.lerp(c,Math.min(1,(L-92)/40)),e.id==="river"&&Math.abs(R)<6.5&&Math.hypot(A,R)>=7.5&&N.lerp(f,.6),e.id==="valley"&&Math.abs(A-R)<3.2&&L<95&&N.lerp(f,.55),e.id==="wooden"&&(Math.abs(A)<2.6||Math.abs(R)<2.6)&&L>8&&L<80&&N.lerp(f,.45),s.push(N.r,N.g,N.b)}i.setAttribute("color",new dt(s,3)),i.computeVertexNormals();const l=new Ee(i,new bn({vertexColors:!0,map:qM(t.ground)}));l.receiveShadow=!0,on.add(l);const h=Fn(e.hill);if(e.id!=="colosseum")for(const C of n.hills){const A=new Ee(new Mn(C.rad,12,8),h);A.scale.y=C.sy,A.position.set(Math.cos(C.a)*C.d,-3,Math.sin(C.a)*C.d),on.add(A)}const d=new tt,p=new ei,_=new I,x=new I(0,1,0),m=new I;if(n.palisades.length){const C=n.palisades.flatMap(y=>y.logs),A=Gt(new Ke(.32,.36,3.2,8),1,2);A.translate(0,0,0);const R=new di(A,xd,C.length);C.forEach((y,b)=>{p.setFromAxisAngle(x,y.rot),_.set(1,y.sy,1),d.compose(m.set(y.x,1.5*y.sy,y.z),p,_),R.setMatrixAt(b,d)});const L=new di(new Pn(.34,.5,8),xd,C.length);C.forEach((y,b)=>{p.setFromAxisAngle(x,y.rot),d.compose(m.set(y.x,3.2*y.sy+.22,y.z),p,_.set(1,1,1)),L.setMatrixAt(b,d)}),on.add(oi(R),oi(L))}if(e.id==="river"){const C=new Ee(new un(420,10.4),new gf({color:3832483,specular:10471134,shininess:80,transparent:!0,opacity:.84}));C.rotation.x=-Math.PI/2,C.position.y=-.18,C.receiveShadow=!0,on.add(C);for(const R of[-32,32]){const L=new Ee(Gt(new Ie(5,.3,14),2,5),rS);L.position.set(R,.22,0),on.add(oi(L));for(const y of[-2.4,2.4]){const b=new Ee(new Ie(.18,.9,14),sS);b.position.set(R+y,.8,0),on.add(oi(b))}}const A=Fn(10132372,Hi());for(const R of n.stones){const L=new Ee(new Ha(R.s),A);L.position.set(R.x,-.15,R.z),on.add(oi(L))}}if(n.trees.length){const C=n.trees.length,A=new di(Gt(new Ke(.25,.35,2.4,7),1,2),Fn(5914152,gr()),C),R=new di(new Pn(2.1,4.2,9),Fn(2905392),C),L=new di(new Pn(1.5,3.2,9),Fn(3631674),C);n.trees.forEach((y,b)=>{const N=sr(y.x,y.z)-.1;d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,N+1.2*y.s,y.z),A.setMatrixAt(b,d),d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,N+3.6*y.s,y.z),R.setMatrixAt(b,d),d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,N+5.4*y.s,y.z),L.setMatrixAt(b,d)}),on.add(oi(A),oi(R),oi(L))}const u=Fn(e.rock,Hi());for(const C of n.rocks){const A=new Ee(new Ha(C.r),u);A.position.set(C.x,sr(C.x,C.z)+C.r*(C.big?.55:.4),C.z),A.rotation.set(C.rx,C.ry,0),C.big&&A.scale.set(1,1.35,1),on.add(oi(A))}de.forEach((C,A)=>Tl.push(aS(C,A))),n.withFort&&cS(n),eS(n,on),fS(n,t)}function aS(n,e){const t=new Sn,i=7,r=(x,m,u,v,M,S=0)=>{const C=new Ee(x,m);return C.position.set(u,v,M),C.rotation.y=S,t.add(C),C},s=Gt(new Ie(i*2,4,1.2),14/3,4/3);r(s,er,0,2,-i),r(s,er,-i,2,0,Math.PI/2),r(s,er,i,2,0,Math.PI/2);const a=Gt(new Ie(i-1.8,4,1.2),(i-1.8)/3,4/3);r(a,er,-8.8/2,2,i),r(a,er,(i+1.8)/2,2,i),r(Gt(new Ie(3.6,1.2,1.3),1.2,.4),er,0,3.4,i),r(Gt(new Ie(3.4,2.8,.3),2,1),wl,0,1.4,i-.3);const o=new di(new Ie(.8,.8,1.3),er,64),c=new tt;let f=0;for(let x=-6;x<=6;x+=1.5)for(const[m,u,v]of[[x,-i,0],[x,i,0],[-i,x,1],[i,x,1]]){if(f>=64)break;c.makeRotationY(v?Math.PI/2:0),c.setPosition(m,4.4,u),o.setMatrixAt(f++,c)}o.count=f,t.add(o);const l=Gt(new Ke(1.9,2.1,6.2,12),4,2),h=new Pn(2.4,2.6,12),d=Fn(8010538);for(const[x,m]of[[-i,-i],[i,-i],[-i,i],[i,i]])r(l,Al,x,3.1,m),r(h,d,x,7.5,m);r(Gt(new Ie(5,7.5,5),5/3,7.5/3),Al,0,3.75,-1.5),r(new Pn(4,2.6,4),d,0,8.8,-1.5,Math.PI/4);const p=new un(1.3,3);for(const x of[-4.6,-2.6,2.6,4.6])r(p,_d[e],x,2.4,i+.62);r(new Ke(.08,.08,4,6),wl,0,11.4,-1.5);const _=r(new un(2.6,1.6),_d[e],1.3,12.5,-1.5);return t.position.set(n.pos[0],0,n.pos[1]),t.rotation.y=Math.atan2(-n.pos[0],-n.pos[1]),on.add(oi(t)),{grp:t,flag:_,fell:!1}}function cS(n){const e=new Sn;e.position.y=Rt(0,0),on.add(e);const t=Gt(new Ie(2.9,2.2,.9),1,.75);for(const c of n.fortSegments){const f=new Ee(t,er);f.position.set(c.x,1.1,c.z),f.rotation.y=-c.a+Math.PI/2,e.add(f)}for(let c=0;c<4;c++){const f=c/4*Math.PI*2+Math.PI/12,l=new Ee(new Ke(.5,.6,3,8),Al);l.position.set(Math.cos(f)*6.4,1.5,Math.sin(f)*6.4),e.add(l)}oi(e);const i=new Sn,r=new Ee(new Ke(.07,.07,3.4,6),wl);r.position.y=1.7,i.add(r);const s=new Ee(new un(1.6,1.1),nS);s.position.set(.8,2.8,0),i.add(s);const a=new Ee(new un(1.6,.18),iS);a.position.set(.8,2.2,.01),i.add(a);const o=new Ee(new Oo(1.3,1.6,28),new Ei({color:16764730,transparent:!0,opacity:.6,side:Nt,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.y=.06,i.add(o),r.castShadow=s.castShadow=!0,Ot.add(i),zi={banner:i,ring:o,cloth:s}}const Ga={time:{value:0}},lS=(()=>{const n=[],e=[],t=Xr(3);for(let r=0;r<6;r++){const s=t()*Math.PI*2,a=t()*.22,o=.55+t()*.5,c=.07,f=(t()-.5)*.5,l=Math.cos(s)*a,h=Math.sin(s)*a,d=Math.cos(s+1.57)*c,p=Math.sin(s+1.57)*c,_=l+Math.cos(s)*f,x=h+Math.sin(s)*f;n.push(l-d,0,h-p,l+d,0,h+p,_,o,x,l+d,0,h+p,l-d,0,h-p,_,o,x),e.push(.5,.5,.5,.5,.5,.5,1,1,1,.5,.5,.5,.5,.5,.5,1,1,1)}const i=new Tn;return i.setAttribute("position",new dt(n,3)),i.setAttribute("color",new dt(e,3)),i.computeVertexNormals(),i})(),gp=new bn({vertexColors:!0});gp.onBeforeCompile=n=>{n.uniforms.time=Ga.time,n.vertexShader=`uniform float time;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    #ifdef USE_INSTANCING
      vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
    #else
      vec2 ip = vec2(0.);
    #endif
    float sway = sin(time * 1.7 + ip.x * .35 + ip.y * .22) * .5 + sin(time * 3.1 + ip.x * .9) * .18;
    transformed.x += sway * .16 * position.y * position.y;
    transformed.z += sway * .08 * position.y * position.y;`),n.vertexShader=n.vertexShader.replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0., 1., 0.);")};function fS(n,e){const t=Math.round(ht.cfg.grass*e.grass);if(!t)return;const i=Xr((g.seed|0)+11),r=new di(lS,gp,t),s=new Te(e.grassCol[0]),a=new Te(e.grassCol[1]),o=new Te,c=new tt,f=new ei,l=new ji,h=new I,d=new I,p=(u,v)=>de.some(M=>Math.hypot(M.pos[0]-u,M.pos[1]-v)<yo+1.5)||n.withFort&&Math.hypot(u,v)<7.5||g.map.id==="river"&&Math.abs(v)<6&&Math.hypot(u,v)>=7||fu(u,v).some(M=>!M.castle&&cu(M,u,v,.3))||n.round&&Math.hypot(u,v)>n.round-1,_=(u,v)=>Math.sin(u*.09+1.3)*Math.cos(v*.08-.7)+Math.sin(u*.031-v*.027)*.8;let x=0,m=0;for(;x<t&&m<t*6;){m++;const u=(i()-.5)*220,v=(i()-.5)*220;if(_(u,v)<-.2+i()*.6||p(u,v))continue;const M=.75+i()*.7;l.set(0,i()*6.28,0),f.setFromEuler(l),c.compose(h.set(u,sr(u,v),v),f,d.set(M,M*(.8+i()*.5),M)),r.setMatrixAt(x,c),r.setColorAt(x,o.copy(s).lerp(a,i())),x++}r.count=x,r.receiveShadow=!0,r.frustumCulled=!1,on.add(r)}function _p(n,e){Ga.time.value+=n,tS(n,Ga.time.value),de.forEach((r,s)=>{const a=g.teams[s],o=Tl[s];if(!o||!a)return;const c=g.mode!=="conquest"?1:a.alive?1-(1-a.points/100)*.12:.28;o.grp.scale.y+=(c-o.grp.scale.y)*Math.min(1,n*3),o.flag.visible=g.mode!=="conquest"||a.alive,g.mode==="conquest"&&a.alive&&a.points<35&&Math.random()<n*6&&e("smoke",r.pos),g.mode==="conquest"&&!a.alive&&!o.fell&&(o.fell=!0,e("rubble",r.pos))});const t=g.flag;if(!t||!zi)return;const i=zi.banner;if(t.state==="carried"&&t.carrier){const r=t.carrier;i.position.set(r.x-Math.sin(r.face)*.45,r.y+.9,r.z-Math.cos(r.face)*.45),i.rotation.y=r.face+Math.PI/2,i.scale.setScalar(.8),zi.ring.visible=!1}else i.position.set(t.x,Rt(t.x,t.z),t.z),i.rotation.y=g.T*.6,i.scale.setScalar(1),zi.ring.visible=!0;zi.cloth.rotation.y=Math.sin(g.T*3)*.25}const vd=()=>Ga.time.value,xp=320,hS=(()=>{const n=new Ke(1,1,1.15,10,1,!0,-.42,.84);return n.translate(0,0,-1),n})(),dS=(()=>{const n=new Mn(.95,20,6,0,Math.PI*2,0,.7);return n.rotateX(Math.PI/2),n.translate(0,0,-.95*Math.cos(.7)),n.scale(1,1,.6),n})(),uS=(()=>{const n=new Ke(.5,.5,.08,18);return n.rotateX(Math.PI/2),n})(),pS={leg:new Ke(.15,.13,.7,7),boot:new Ie(.2,.14,.32),greave:new Ke(.16,.15,.32,8),torso:new Ke(.42,.36,.78,12),skirt:new Ke(.43,.52,.32,12),belt:new Ke(.44,.44,.14,12),head:new Mn(.4,14,10),helm:new Mn(.44,14,8,0,Math.PI*2,0,Math.PI/2),corinth:new Mn(.47,14,10,0,Math.PI*2,0,Math.PI*.52),cone:new Pn(.44,.7,12),hood:new Mn(.45,12,8,0,Math.PI*2,0,Math.PI*.6),brim:new Ke(.66,.66,.05,16),crest:new Ie(.1,.22,.62),cheek:new Ie(.08,.3,.24),neckGuard:new Ie(.56,.08,.22),pauldron:new Ie(.22,.16,.24),nose:new Ie(.07,.24,.05),knob:new Mn(.08,8,6),hair:new Mn(.45,12,8,0,Math.PI*2,0,Math.PI*.55),beard:new Ie(.44,.3,.2),circlet:new bs(.42,.045,6,18),mantle:new Ke(.58,.5,.26,12),face:new un(.5,.26),arm:new Ke(.11,.1,.55,6),blade:new Ie(.07,.07,1),gladius:new Ie(.09,.06,.72),guard:new Ie(.32,.06,.06),haft:new Ke(.04,.04,1.05,6),axeHead:new Ie(.05,.36,.26),shaft:new Ke(.04,.04,3,5),tip:new Pn(.09,.35,5),bow:new bs(.6,.035,5,14,Math.PI),quiver:new Ke(.13,.11,.7,6),scutum:hS,hoplon:dS,roundShield:uS,rim:new bs(.6,.05,6,24),woodRim:new bs(.5,.04,6,20),boss:new Mn(.12,8,6),shadow:new rc(.62,14),ring:new Oo(.8,1,24),cape:new un(.9,1.1)},mS=(()=>{const n=document.createElement("canvas");n.width=128,n.height=64;const e=n.getContext("2d");e.fillStyle="#1b1512",e.beginPath(),e.ellipse(40,26,7,9,0,0,Math.PI*2),e.ellipse(88,26,7,9,0,0,Math.PI*2),e.fill(),e.lineWidth=7,e.lineCap="round",e.strokeStyle="#1b1512",e.beginPath(),e.moveTo(24,10),e.lineTo(54,17),e.moveTo(104,10),e.lineTo(74,17),e.stroke(),e.beginPath(),e.moveTo(64,48),e.quadraticCurveTo(44,42,30,56),e.quadraticCurveTo(46,50,64,54),e.quadraticCurveTo(82,50,98,56),e.quadraticCurveTo(84,42,64,48),e.fill();const t=new Ao(n);return t.colorSpace=kt,t})(),gS={plain:new bn({color:16777215}),plain2:new bn({color:16777215,side:Nt}),metal:new gf({color:16777215,shininess:70,specular:6974058}),shadow:new Ei({color:0,transparent:!0,opacity:.28,depthWrite:!1}),ring:new Ei({color:16764730,transparent:!0,opacity:.8,side:Nt,depthWrite:!1}),ringAlly:new Ei({color:16777215,transparent:!0,opacity:.45,side:Nt,depthWrite:!1}),face:new Ei({map:mS,transparent:!0,depthWrite:!1})},_S=new Set(["plain","plain2","metal"]),yd=new Set(["shadow","ring","ringAlly","face"]),ri=n=>new Te(n),Le={skin:[15914684,14990488,13145710].map(ri),hair:[14727260,11886634,5913122,3023904].map(ri),steel:ri(10923448),bronze:ri(13144124),wood:ri(7031342),leather:ri(5125152),gold:ri(16764730),linen:ri(15524552),fur:ri(8018492),team:de.map(n=>ri(n.hex)),dark:de.map(n=>ri(n.hex).multiplyScalar(.62))},vp=n=>Math.imul(n.id|0,2654435761)>>>0,ua=n=>Le.skin[vp(n)%3],Md=n=>Le.hair[(vp(n)>>>4)%4],Ts=n=>g.factions&&g.factions[Ae(n.ti)]||"roman",_e=(n,e,t,i=0,r=0,s=0,a=1,o=1,c=1)=>new tt().compose(new I(n,e,t),new ei().setFromEuler(new ji(i,r,s)),new I(a,o,c)),Bt=(...n)=>new Set(n),Ye=(...n)=>new Set(n),Zt=Bt("foot","captain"),Wn=Bt("foot","captain"),vi=n=>n.tier>=1,Sd=n=>n.tier>=2,xS=n=>n.tier>=1,vS=n=>n.tier>=2,yi=n=>Le.team[Ae(n.ti)],pa=n=>Le.dark[Ae(n.ti)],yp=[{bone:"root",geo:"shadow",mat:"shadow",m:_e(0,.03,0,-Math.PI/2),when:"blob"},{bone:"root",geo:"ring",mat:"ring",m:_e(0,.05,0,-Math.PI/2),when:"me"},{bone:"root",geo:"ring",mat:"ringAlly",m:_e(0,.05,0,-Math.PI/2),when:"ally"},{bone:"legL",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:pa},{bone:"legR",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:pa},{bone:"legL",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Le.leather},{bone:"legR",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Le.leather},{bone:"legL",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"legR",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ye("roman"),k:Wn,col:()=>Le.steel},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ye("greek"),k:Bt("captain"),col:()=>Le.bronze},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ye("greek"),k:Bt("foot","spear"),col:()=>Le.linen},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ye("barbarian"),k:Zt,t:n=>!vi(n),col:ua},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ye("barbarian"),k:Zt,t:vi,col:pa},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),k:Bt("arch"),col:pa},{bone:"body",geo:"skirt",mat:"plain",m:_e(0,.64,0),f:Ye("roman","greek"),col:yi},{bone:"body",geo:"belt",mat:"plain",m:_e(0,.78,0),col:n=>Ts(n)==="barbarian"?yi(n):Le.leather},{bone:"body",geo:"head",mat:"plain",m:_e(0,1.78,0),col:ua},{bone:"body",geo:"face",mat:"face",m:_e(0,1.73,.39)},{bone:"body",geo:"hood",mat:"plain",m:_e(0,1.82,-.02),k:Bt("arch"),f:Ye("roman","barbarian"),col:yi},{bone:"body",geo:"helm",mat:"plain",m:_e(0,1.9,0,0,0,0,.8,.7,.8),k:Bt("arch"),f:Ye("greek"),col:()=>Le.leather},{bone:"body",geo:"brim",mat:"plain",m:_e(0,1.98,0),k:Bt("arch"),f:Ye("greek"),col:yi},{bone:"body",geo:"quiver",mat:"plain",m:_e(.2,1.25,-.42,0,0,.4),k:Bt("arch"),col:()=>Le.leather},{bone:"body",geo:"helm",mat:"metal",m:_e(0,1.86,0),f:Ye("roman"),k:Wn,col:()=>Le.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(.34,1.64,.12,0,0,.12),f:Ye("roman"),k:Wn,col:()=>Le.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.34,1.64,.12,0,0,-.12),f:Ye("roman"),k:Wn,col:()=>Le.steel},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0),f:Ye("roman"),k:Bt("foot"),t:n=>!vi(n),col:yi},{bone:"body",geo:"knob",mat:"metal",m:_e(0,2.3,0),f:Ye("roman"),k:Bt("foot"),t:vi,col:()=>Le.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0,0,Math.PI/2,0,1.3,1.5,1.25),f:Ye("roman"),k:Bt("captain"),col:()=>Le.gold},{bone:"body",geo:"corinth",mat:"metal",m:_e(0,1.8,0),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"body",geo:"nose",mat:"metal",m:_e(0,1.74,.45),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(.33,1.62,.18,0,0,.1),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.33,1.62,.18,0,0,-.1),f:Ye("greek"),k:Wn,col:()=>Le.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.5,-.04,0,0,0,1.2,2.3,1.6),f:Ye("greek"),k:Bt("foot","spear"),col:yi},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.58,-.04,0,0,0,1.4,2.8,1.9),f:Ye("greek"),k:Bt("captain"),col:()=>Le.gold},{bone:"body",geo:"hair",mat:"plain",m:_e(0,1.82,-.03),f:Ye("barbarian"),k:Wn,col:Md},{bone:"body",geo:"beard",mat:"plain",m:_e(0,1.55,.3,.15),f:Ye("barbarian"),k:Wn,col:Md},{bone:"body",geo:"circlet",mat:"metal",m:_e(0,1.92,0,Math.PI/2),f:Ye("barbarian"),k:Bt("captain"),col:()=>Le.gold},{bone:"body",geo:"mantle",mat:"plain",m:_e(0,1.44,0),f:Ye("barbarian"),k:Bt("captain","foot"),col:()=>Le.fur},{bone:"body",geo:"cape",mat:"plain2",m:_e(0,1.02,-.44,.12),k:Bt("captain"),col:yi},{bone:"sArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:ua},{bone:"wArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:ua},{bone:"shield",geo:"scutum",mat:"plain2",m:_e(0,0,0),f:Ye("roman"),k:Zt,col:yi},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.05),f:Ye("roman"),k:Zt,col:n=>n.leader?Le.gold:Le.steel},{bone:"shield",geo:"hoplon",mat:"plain2",m:_e(0,0,0),f:Ye("greek"),k:Zt,col:yi},{bone:"shield",geo:"rim",mat:"metal",m:_e(0,0,0),f:Ye("greek"),k:Zt,col:n=>n.leader?Le.gold:Le.bronze},{bone:"shield",geo:"roundShield",mat:"plain",m:_e(0,0,0),f:Ye("barbarian"),k:Zt,col:yi},{bone:"shield",geo:"woodRim",mat:"plain",m:_e(0,0,0),f:Ye("barbarian"),k:Zt,col:()=>Le.wood},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.06),f:Ye("barbarian"),k:Zt,col:n=>n.leader?Le.gold:Le.steel},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),f:Ye("roman","greek"),k:Zt,col:()=>Le.leather},{bone:"wArm",geo:"gladius",mat:"metal",m:_e(0,-.5,.5),f:Ye("roman"),k:Zt,t:n=>!vi(n),col:()=>Le.steel},{bone:"wArm",geo:"blade",mat:"metal",m:_e(0,-.5,.6),f:Ye("greek"),k:Zt,t:n=>!vi(n),col:()=>Le.bronze},{bone:"wArm",geo:"haft",mat:"plain",m:_e(0,-.5,.42,Math.PI/2),f:Ye("barbarian"),k:Zt,t:n=>!vi(n),col:()=>Le.wood},{bone:"wArm",geo:"axeHead",mat:"metal",m:_e(0,-.35,.86),f:Ye("barbarian"),k:Zt,t:n=>!vi(n),col:()=>Le.steel},{bone:"spear",geo:"shaft",mat:"plain",m:_e(0,0,.6,Math.PI/2),k:Zt,t:vi,col:()=>Le.wood},{bone:"spear",geo:"tip",mat:"metal",m:_e(0,0,2.2,Math.PI/2),k:Zt,t:vi,col:n=>Ts(n)==="greek"?Le.bronze:Le.steel},{bone:"sArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,.3),k:Zt,t:Sd,col:n=>Ts(n)==="greek"?Le.bronze:Le.steel},{bone:"wArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,-.3),k:Zt,t:Sd,col:n=>Ts(n)==="greek"?Le.bronze:Le.steel},{bone:"sArm",geo:"bow",mat:"plain",m:_e(0,-.48,.2,0,Math.PI/2,Math.PI/2),k:Bt("arch"),col:()=>Le.wood},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),k:Bt("arch"),t:xS,col:()=>Le.leather},{bone:"wArm",geo:"guard",mat:"metal",m:_e(0,-.5,.3),k:Bt("arch"),t:vS,col:()=>Le.steel}],qs=new Map;for(const n of yp){const e=n.geo+"|"+n.mat;let t=qs.get(e);t||(t={perUnit:0,n:0,mesh:null,geo:n.geo,mat:n.mat},qs.set(e,t)),t.perUnit++,n.batch=t}for(const n of qs.values()){const e=Math.max(1,n.perUnit)*xp,t=new di(pS[n.geo],gS[n.mat],e);t.instanceMatrix.setUsage(yh),_S.has(n.mat)&&(t.instanceColor=new To(new Float32Array(e*3),3),t.instanceColor.setUsage(yh)),t.frustumCulled=!1,t.count=0,t.castShadow=!yd.has(n.mat),t.receiveShadow=n.mat!=="face"&&!yd.has(n.mat),(n.mat==="shadow"||n.mat.startsWith("ring"))&&(t.renderOrder=1),Ot.add(t),n.mesh=t}const yS=()=>[...qs.values()].filter(n=>n.mesh.count>0).length,bd=new WeakMap;function MS(n){let e=bd.get(n);return e||(e={walk:Math.random()*6,bodyY:0,bodyRX:0,bodyRZ:0,yaw:0,lift:0,sink:0,legL:[0,0,0],legR:[0,0,0],sArmX:0,sArmPX:.5,wArmX:0,wArmZ:0,spearRX:0,spearZ:0,block:0,over:0,rag:null},bd.set(n,e)),e}const SS=n=>n.kind!=="captain"?null:n.ti===g.myTi?"me":!Xl()&&!gi(n.ti,g.myTi)?"ally":null;function bS(n,e,t){let i=e.rag;if(!i){const a=(c,f)=>c+Math.random()*(f-c),o=n.fallDir||1;i=e.rag={dir:o,pitch:e.bodyRX,pv:-o*a(3,6),roll:0,rollT:a(-.4,.4),spin:a(-4,4),arms:[a(-3,-.3),a(-3,-.3),a(-1.3,-.2)],legs:[a(-.7,.7),a(-.7,.7),a(.05,.5)]}}const r=-i.dir*Math.PI/2*.97;i.pv+=((r-i.pitch)*70-i.pv*6)*t,i.pitch+=i.pv*t,Math.abs(i.pitch)>Math.PI/2*1.02&&(i.pitch=Math.sign(i.pitch)*Math.PI/2*1.02,i.pv*=-.35),i.spin*=Math.exp(-t*2.5),e.yaw+=i.spin*t,i.roll+=(i.rollT-i.roll)*Math.min(1,t*5);const s=Math.min(1,t*9);e.sArmX+=(i.arms[0]-e.sArmX)*s,e.wArmX+=(i.arms[1]-e.wArmX)*s,e.wArmZ+=(i.arms[2]-e.wArmZ)*s,e.legL[0]+=(i.legs[0]-e.legL[0])*s,e.legR[0]+=(i.legs[1]-e.legR[0])*s,e.legL[2]+=(i.legs[2]-e.legL[2])*s,e.legR[2]+=(-i.legs[2]-e.legR[2])*s,e.bodyY=0,e.bodyRX=i.pitch,e.bodyRZ=i.roll,e.block+=(0-e.block)*s,e.lift=.3*Math.min(1,Math.abs(i.pitch)/1.4),e.sink=n.deadT>10?Math.min(1.5,(n.deadT-10)*.4):0}function ES(n,e){const t=MS(n);if(n.dead)return bS(n,t,e),t;t.rag=null,t.yaw=0,t.lift=0,t.sink=0,t.bodyRZ=0;const i=Math.hypot(n.vx,n.vz);if(n.mounted)t.bodyY=1.02+.03*Math.sin(t.walk*2),t.legL[0]=-.9,t.legL[1]=0,t.legL[2]=.55,t.legR[0]=-.9,t.legR[1]=0,t.legR[2]=-.55,t.bodyRX=0,t.walk+=e*i*.9;else{t.walk+=e*i*2.2;const o=Math.sin(t.walk)*Math.min(1,i/3)*.7;t.legL[0]=o,t.legL[1]=t.legL[2]=0,t.legR[0]=-o,t.legR[1]=t.legR[2]=0,t.bodyY=Math.abs(Math.cos(t.walk))*Math.min(1,i/3)*.08,t.bodyRX=n.stun>0?-.25:Math.min(.15,i*.02)}const r=n.swing>0?1-n.swing/.38:-1;let s=!1;if((n.kind==="foot"||n.kind==="captain")&&n.tier>=1){const o=xu(n)||n.swing>0;t.wArmX+=((o?-1.45:-.35)-t.wArmX)*Math.min(1,e*10),t.spearRX=o?1.45:-.2,t.spearZ=r>=0?Math.sin(r*Math.PI)*.8:0,t.sArmX+=(-.6-t.sArmX)*Math.min(1,e*8)}else if(n.kind==="arch")t.sArmX+=((n.aim?-1.5:-.3)-t.sArmX)*Math.min(1,e*10),t.wArmX+=((n.aim?r>=0?-1.2:-1.5:-.35)-t.wArmX)*Math.min(1,e*12);else{r>=0?(t.wArmX=r<.35?-.35-2.65*(r/.35):-3+2.2*Math.min(1,(r-.35)/.3),t.wArmZ=n.mounted?-.9:-.3):(t.wArmX+=(-.35-t.wArmX)*Math.min(1,e*10),t.wArmZ=0),s=(n.human&&n.blocking||n.blockT>0)&&!n.mounted;const o=n.testudo&&n.kind==="foot";t.over+=((o?1:0)-t.over)*Math.min(1,e*8),t.sArmX+=((o?-2.9:s?-1.35:n.carrying?-.1:-.35)-t.sArmX)*Math.min(1,e*14),t.sArmPX=s?.28:.5}return t.block+=((s?1:0)-t.block)*Math.min(1,e*16),t}const dn={root:new tt,body:new tt,legL:new tt,legR:new tt,sArm:new tt,wArm:new tt,spear:new tt,shield:new tt},TS=new tt,Ed=new tt,Va=new ji,Wa=new ei,Mp=new I,Sp=new I;function Rr(n,e,t,i,r,s){return Va.set(i,r,s),Wa.setFromEuler(Va),TS.compose(Mp.set(n,e,t),Wa,Sp.set(1,1,1))}function AS(n,e){const t=n.kind==="captain"?1.18:1;if(Va.set(0,n.face+e.yaw,0),Wa.setFromEuler(Va),dn.root.compose(Mp.set(n.x,n.y+e.lift-e.sink,n.z),Wa,Sp.set(t,t,t)),dn.body.multiplyMatrices(dn.root,Rr(0,e.bodyY,0,e.bodyRX,0,e.bodyRZ)),dn.legL.multiplyMatrices(dn.body,Rr(-.18,.7,0,e.legL[0],e.legL[1],e.legL[2])),dn.legR.multiplyMatrices(dn.body,Rr(.18,.7,0,e.legR[0],e.legR[1],e.legR[2])),dn.sArm.multiplyMatrices(dn.body,Rr(e.sArmPX,1.3,.05,e.sArmX,0,0)),dn.wArm.multiplyMatrices(dn.body,Rr(-.5,1.3,.05,e.wArmX,0,e.wArmZ)),(n.kind==="foot"||n.kind==="captain")&&n.tier>=1&&dn.spear.multiplyMatrices(dn.wArm,Rr(0,-.48,e.spearZ,e.spearRX,0,0)),n.kind==="foot"||n.kind==="captain"){const i=e.over,r=e.block*(1-i),s=Ts(n)==="greek"?.08:0,a=.56-.38*r,o=1.02+.26*r+s,c=.3+.3*r;dn.shield.multiplyMatrices(dn.body,Rr(a+(.08-a)*i,o+(2.5-o)*i,c+(.1-c)*i,-.05*(1-r)*(1-i)-Math.PI/2*i,.5*(1-r)*(1-i),0))}}function bp(n,e){for(const r of qs.values())r.n=0;const t=!up();let i=0;for(const r of n){if(r.hidden)continue;if(i>=xp)break;i++;const s=ES(r,e);AS(r,s);const a=SS(r),o=Ts(r);for(const c of yp){if(c.k&&!c.k.has(r.kind)||c.f&&!c.f.has(o)||c.t&&!c.t(r)||c.when&&(c.when==="blob"?!t:c.when!==a))continue;const f=c.batch,l=f.n++;Ed.multiplyMatrices(dn[c.bone],c.m),f.mesh.setMatrixAt(l,Ed),c.col&&f.mesh.setColorAt(l,c.col(r))}}for(const r of qs.values()){if(r.mesh.count=r.n,!r.n)continue;const s=r.mesh.instanceMatrix;s.clearUpdateRanges(),s.addUpdateRange(0,r.n*16),s.needsUpdate=!0;const a=r.mesh.instanceColor;a&&(a.clearUpdateRanges(),a.addUpdateRange(0,r.n*3),a.needsUpdate=!0)}}const Ui={torso:new Mn(1,14,10),neck:new Ke(.2,.3,1,8),head:new Ie(.32,.36,.78),leg:new Ke(.1,.08,1,6),hoof:new Ie(.16,.12,.2),tail:new Ke(.06,.14,.9,6),cloth:new Ie(.95,.08,.85),mane:new Ie(.08,.3,.9),shadow:new rc(.62,14)},Td=[8014378,3877408,13616304].map(n=>new bn({color:n})),Zc=new bn({color:2234386}),wS=new Ei({color:0,transparent:!0,opacity:.28,depthWrite:!1}),CS=de.map(n=>new bn({color:n.hex}));function RS(n,e){const t=new Sn,i=new Sn;t.add(i);const r=Td[e%Td.length],s=(c,f,l,h,d,p)=>{const _=new Ee(c,f);return _.position.set(h,d,p),l.add(_),_},a=s(Ui.shadow,wS,t,0,.03,0);a.rotation.x=-Math.PI/2,a.scale.set(1.2,2.2,1),s(Ui.torso,r,i,0,1.35,0).scale.set(.55,.6,1.15),s(Ui.neck,r,i,0,1.85,.95).rotation.x=.65,s(Ui.head,r,i,0,2.25,1.35).rotation.x=.55,s(Ui.mane,Zc,i,0,2.05,.8).rotation.x=.65,s(Ui.tail,Zc,i,0,1.35,-1.2).rotation.x=-.7,s(Ui.cloth,CS[Ae(n)],i,0,1.95,-.05);const o=[];for(const[c,f]of[[-.28,.72],[.28,.72],[-.28,-.72],[.28,-.72]]){const l=new Sn;l.position.set(c,1.05,f),i.add(l),s(Ui.leg,r,l,0,-.5,0),s(Ui.hoof,Zc,l,0,-1,.03),o.push(l)}return i.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0)}),Ot.add(t),{root:t,body:i,legs:o,sh:a,walk:0}}const As=new Map;function Ep(n,e){const t=new Set;for(const i of n){t.add(i.key);let r=As.get(i.key);if(r||(r=RS(i.ti,Math.abs(i.key*7919)%3),As.set(i.key,r)),r.root.position.set(i.x,Rt(i.x,i.z),i.z),r.root.rotation.y=i.face,r.root.visible=!0,r.sh.visible=!up(),i.state==="dead"){r.body.rotation.z=Math.min(1,i.t/.5)*Math.PI/2*.9*(i.fall||1),i.t>6&&(r.root.position.y-=(i.t-6)*.6);continue}r.walk+=e*i.spd*1.1;const s=Math.min(1,i.spd/4)*.8;r.legs[0].rotation.x=r.legs[3].rotation.x=Math.sin(r.walk)*s,r.legs[1].rotation.x=r.legs[2].rotation.x=Math.sin(r.walk+Math.PI)*s,r.body.position.y=Math.abs(Math.sin(r.walk))*.12*Math.min(1,i.spd/4),i.state==="leaving"&&(r.root.visible=i.t<2.6)}for(const[i,r]of As)t.has(i)||(Ot.remove(r.root),As.delete(i))}function Tp(){for(const n of As.values())Ot.remove(n.root);As.clear()}let Gi=[],Ls=[];function PS(n,e,t,i,r){const s=ht.cfg.particles;for(let a=0;a<r&&Gi.length<s;a++)Gi.push({x:n,y:e,z:t,vx:ue(-4,4),vy:ue(1,5),vz:ue(-4,4),life:ue(.25,.5),c:i,s:ue(2,4)})}function Cl(n){Gi.length<ht.cfg.particles+40&&Gi.push(n)}const Ad={dunes:"#dcc69c",river:"#b7a888",forest:"#a89a7c",frost:"#f4f7fa"};function LS(n,e){const t=Ad[g.map.id]||Ad.dunes,i=Rt(n,e)+.3;for(let r=0;r<3;r++)Cl({x:n+ue(-.4,.4),y:i,z:e+ue(-.4,.4),vx:ue(-1,1),vy:ue(.8,1.6),vz:ue(-1,1),life:ue(.5,.8),c:t,s:ue(5.5,8)})}function Ds(n,e,t,i,r){Ls.push({x:n,y:e,z:t,text:i,color:r,t:0})}function DS(n,e){if(n==="smoke")Cl({x:e[0]+ue(-6,6),y:ue(3,6),z:e[1]+ue(-6,6),vx:ue(-.4,.4),vy:ue(1.5,3),vz:ue(-.4,.4),life:ue(1.2,2),c:"#5b5550",s:ue(5,9)});else for(let t=0;t<30;t++)Cl({x:e[0]+ue(-8,8),y:ue(0,6),z:e[1]+ue(-8,8),vx:ue(-3,3),vy:ue(1,5),vz:ue(-3,3),life:ue(1,2.2),c:"#bdb3a2",s:ue(3,7)})}const oc=90,IS=(()=>{const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d");e.fillStyle="#ffffff";for(let t=0;t<9;t++)e.beginPath(),e.arc(32+ue(-14,14),32+ue(-14,14),ue(4,12),0,Math.PI*2),e.fill();for(let t=0;t<8;t++)e.beginPath(),e.arc(32+ue(-28,28),32+ue(-28,28),ue(1.5,3.5),0,Math.PI*2),e.fill();return new Ao(n)})(),Ap=new Ei({map:IS,transparent:!0,depthWrite:!1});Ap.onBeforeCompile=n=>{n.vertexShader=`attribute float aAlpha;
varying float vAlpha;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vAlpha = aAlpha;`),n.fragmentShader=`varying float vAlpha;
`+n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vAlpha;`)};const wp=new un(1,1),Rl=new To(new Float32Array(oc),1);wp.setAttribute("aAlpha",Rl);const Fi=new di(wp,Ap,oc);Fi.instanceColor=new To(new Float32Array(oc*3),3);Fi.frustumCulled=!1;Fi.count=0;Ot.add(Fi);let Vi=[],US=0;const kS=de.map(n=>new Te(n.hex).multiplyScalar(.85)),wd=new tt,Cd=new ei,Rd=new ji,NS=new I,OS=new I;function zS(n,e,t,i){if(Za(n,e))return;const r=ht.cfg.splats;Vi.length>=r&&Vi.shift(),Vi.push({x:n,z:e,s:t,rot:ue(0,6),t:0,c:kS[i==null?1:Ae(i)],lift:US++%oc*4e-4})}const Cp=160,FS=(()=>{const n=new Ke(.03,.03,.9,4);return n.rotateX(Math.PI/2),n})(),Is=new di(FS,new bn({color:3811868}),Cp);Is.frustumCulled=!1;Is.count=0;Ot.add(Is);const xs=new rn;function BS(n){for(const e of Gi)e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.vy-=(e.s>5?-.5:9)*n,e.life-=n;Gi=Gi.filter(e=>e.life>0&&e.y>-1);for(const e of Ls)e.t+=n,e.y+=n*1.2;Ls=Ls.filter(e=>e.t<1.3);for(const e of Vi)e.t+=n;Vi=Vi.filter(e=>e.t<30)}function Rp(){Vi.forEach((e,t)=>{Rd.set(-Math.PI/2,0,e.rot),Cd.setFromEuler(Rd),wd.compose(NS.set(e.x,Rt(e.x,e.z)+.04+e.lift,e.z),Cd,OS.set(e.s,e.s,e.s)),Fi.setMatrixAt(t,wd),Fi.setColorAt(t,e.c),Rl.array[t]=e.t>25?Math.max(0,.85-(e.t-25)/5):.85}),Fi.count=Vi.length,Fi.instanceMatrix.needsUpdate=!0,Fi.instanceColor.needsUpdate=!0,Rl.needsUpdate=!0;let n=0;for(const e of g.arrows){if(n>=Cp)break;const t=e.x-e.px,i=e.y-e.py,r=e.z-e.pz;xs.position.set(e.x,e.y,e.z),t||i||r?(xs.lookAt(e.x+t+1e-4,e.y+i,e.z+r),e.q=(e.q||new ei).copy(xs.quaternion)):e.q&&xs.quaternion.copy(e.q),xs.updateMatrix(),Is.setMatrixAt(n++,xs.matrix)}Is.count=n,Is.instanceMatrix.needsUpdate=!0}function Pp(){Gi=[],Ls=[],Vi=[]}const Pl=new Ei({color:16777215,transparent:!0,opacity:.22,depthWrite:!1,side:Nt}),fr=new Ee(new Oo(.93,1,72),Pl);fr.rotation.x=-Math.PI/2;fr.renderOrder=1;fr.visible=!1;Ot.add(fr);function HS(n,e,t){fr.visible=!!(n&&!n.dead&&g.state==="play"),fr.visible&&(fr.position.set(n.x,Rt(n.x,n.z)+.07,n.z),fr.scale.setScalar(e),Pl.color.set(de[Ae(n.ti)].hex),Pl.opacity=.16+.08*Math.sin(t*2.4))}const ct={yaw:0,pitch:.32,shake:0},GS=matchMedia("(prefers-reduced-motion: reduce)").matches;function Lp(){const n=g.player;if(n&&!n.dead)return n;const e=g.teams.map(t=>t.leader).find(t=>t&&!t.dead&&!gi(t.ti,g.myTi));return e||g.units.find(t=>!t.dead&&t.ti===g.myTi)||g.units.find(t=>!t.dead)||null}function VS(n){ct.shake=Math.max(0,ct.shake-n*1.6);const e=Lp();if(!e)return;const t=e.x,i=e.z,r=e.y,s=(bt.W<bt.H?10:8.5)+(e.mounted?3:0),a=2.2+Math.sin(ct.pitch)*s+(e.mounted?1:0),o=t-Math.sin(ct.yaw)*Math.cos(ct.pitch)*s,c=i-Math.cos(ct.yaw)*Math.cos(ct.pitch)*s,f=Math.min(1,n*8);Mt.position.x+=(o-Mt.position.x)*f,Mt.position.z+=(c-Mt.position.z)*f,Mt.position.y+=(r+a-Mt.position.y)*f;const l=Rt(Mt.position.x,Mt.position.z)+1;Mt.position.y<l&&(Mt.position.y=l),ct.shake>0&&!GS&&(Mt.position.x+=ue(-1,1)*ct.shake*.3,Mt.position.y+=ue(-1,1)*ct.shake*.3),Mt.lookAt(t+Math.sin(ct.yaw)*3,r+1.6+(e.mounted?1:0),i+Math.cos(ct.yaw)*3)}function WS(n){Mt.position.set(Math.cos(n*.05)*62,26+(g.map.id==="frost"?4:0),Math.sin(n*.05)*62),Mt.lookAt(0,Rt(0,0),0)}const Ll=document.getElementById("fx"),fe=Ll.getContext("2d"),Dp=document.getElementById("mini"),rt=Dp.getContext("2d"),hr=new I,XS=new I;function jS(){Ll.width=Math.round(bt.W*bt.DPR),Ll.height=Math.round(bt.H*bt.DPR)}function Qc(n,e,t){return hr.set(n,e,t).project(Mt),hr.z<=1?[(hr.x+1)/2*bt.W,(1-hr.y)/2*bt.H,!0]:[0,0,!1]}function Ip(){fe.setTransform(bt.DPR,0,0,bt.DPR,0,0),fe.clearRect(0,0,bt.W,bt.H)}function qS(n){const e=bt.W,t=bt.H;Ip();for(const s of Gi){const[a,o,c]=Qc(s.x,s.y,s.z);if(!c)continue;const f=Mt.position.distanceTo(XS.set(s.x,s.y,s.z)),l=s.s*Ln(14/f,.3,2.5);fe.globalAlpha=Math.min(1,s.life*2),fe.fillStyle=s.c,s.s>4?(fe.beginPath(),fe.arc(a,o,l,0,Math.PI*2),fe.fill()):fe.fillRect(a-l/2,o-l/2,l,l)}fe.globalAlpha=1,fe.textAlign="center",fe.font="italic 20px Bangers, Impact, sans-serif";for(const s of Ls){const[a,o,c]=Qc(s.x,s.y,s.z);c&&(fe.globalAlpha=1-s.t/1.3,fe.lineWidth=4,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText(s.text,a,o),fe.fillStyle=s.color,fe.fillText(s.text,a,o))}fe.globalAlpha=1;const i=g.player;if(g.state==="play"){for(const s of g.units){if(s.dead||s===i||s.hp>=s.max-.5&&!s.leader||Math.hypot(s.x-Mt.position.x,s.z-Mt.position.z)>34)continue;const[o,c,f]=Qc(s.x,s.y+(s.leader?3.2:2.8)+(s.mounted?1.2:0),s.z);if(!f)continue;const l=s.leader?40:26;if(fe.fillStyle="rgba(0,0,0,.55)",fe.fillRect(o-l/2,c,l,4),fe.fillStyle=de[Ae(s.ti)].css,fe.fillRect(o-l/2,c,l*Math.max(0,s.hp/s.max),4),s.leader&&g.teams[s.ti]&&g.teams[s.ti].human&&n.nickFor){const h=n.nickFor(s.ti);h&&(fe.font='800 12px "Barlow Semi Condensed", sans-serif',fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText(h,o,c-6),fe.fillStyle="#fff",fe.fillText(h,o,c-6))}g.mode==="dm"&&s.leader&&s.ti===g.bounty&&(fe.font="italic 16px Bangers, Impact, sans-serif",fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText("BOUNTY",o,c-20),fe.fillStyle="#ffcf3a",fe.fillText("BOUNTY",o,c-20))}g.flag&&$S(),g.mode==="dm"&&g.bounty===g.myTi&&i&&!i.dead&&performance.now()/500%1<.7&&(fe.font="italic 18px Bangers, Impact, sans-serif",fe.fillStyle="#ffcf3a",fe.fillText("BOUNTY ON YOU",e/2,118))}const r=n.joy;r&&r.active&&(fe.strokeStyle="rgba(255,255,255,.4)",fe.lineWidth=2,fe.beginPath(),fe.arc(r.ox,r.oy,50,0,Math.PI*2),fe.stroke(),fe.fillStyle="rgba(255,255,255,.55)",fe.beginPath(),fe.arc(r.ox+r.x*50,r.oy+r.y*50,22,0,Math.PI*2),fe.fill()),g.state==="play"&&(!i||i.dead)&&(fe.fillStyle="rgba(120,0,0,.18)",fe.fillRect(0,0,e,t)),KS()}function $S(){const n=bt.W,e=bt.H,t=g.flag,i=t.state==="carried"?t.carrier:null;if(i&&i===g.player)return;const r=i?i.x:t.x,s=i?i.z:t.z,a=(i?i.y:Rt(r,s))+3.4,o=i?de[Ae(i.ti)].css:"#ffffff";hr.set(r,a,s).project(Mt);let c=(hr.x+1)/2*n,f=(1-hr.y)/2*e;const l=hr.z>1;l&&(c=n-c,f=e-40);const h=60,d=!l&&c>h&&c<n-h&&f>h&&f<e-h;if(fe.font="italic 15px Bangers, Impact, sans-serif",fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",d){const v=i?`${de[Ae(i.ti)].name.toUpperCase()} CARRIER`:"BANNER";fe.strokeText(v,c,f),fe.fillStyle=o,fe.fillText(v,c,f);return}const p=n/2,_=e/2,x=Math.atan2(f-_,c-p),m=Ln(p+Math.cos(x)*n,h,n-h),u=Ln(_+Math.sin(x)*e,h+50,e-h-20);fe.save(),fe.translate(m,u),fe.rotate(x),fe.fillStyle=o,fe.strokeStyle="rgba(0,0,0,.5)",fe.lineWidth=2,fe.beginPath(),fe.moveTo(16,0),fe.lineTo(-8,-11),fe.lineTo(-8,11),fe.closePath(),fe.fill(),fe.stroke(),fe.restore()}let vs=null,Up=null;function YS(n,e){Up=g.layout,vs=vs||document.createElement("canvas"),vs.width=vs.height=n;const t=vs.getContext("2d");t.clearRect(0,0,n,n),t.save(),t.translate(n/2,n/2),t.fillStyle=g.map.id==="forest"?"rgba(47,90,52,.7)":"rgba(20,18,16,.55)";for(const i of g.layout.obstacles)if(!i.castle)if(i.box)t.save(),t.translate(i.x*e,i.z*e),t.rotate(-i.rot),t.fillRect(-i.hw*e,-i.hd*e,i.hw*2*e,i.hd*2*e),t.restore();else{const r=Math.max(1.2,i.r*e);t.fillRect(i.x*e-r,i.z*e-r,r*2,r*2)}g.layout.round&&(t.strokeStyle="rgba(20,18,16,.6)",t.lineWidth=3,t.beginPath(),t.arc(0,0,g.layout.round*e,0,Math.PI*2),t.stroke()),t.restore()}function KS(){if(g.state!=="play")return;const n=Dp.width,e=n/190,t=n/2;rt.clearRect(0,0,n,n),rt.save(),rt.translate(t,t),rt.rotate(ct.yaw+Math.PI);const i=g.map.id;i==="river"&&(rt.fillStyle="rgba(63,127,166,.8)",rt.fillRect(-95*e,-5*e,190*e,10*e),rt.fillStyle="rgba(107,74,46,.9)",rt.fillRect(-34.5*e,-7*e,5*e,14*e),rt.fillRect(29.5*e,-7*e,5*e,14*e)),i==="frost"&&(rt.fillStyle="rgba(255,255,255,.2)",rt.beginPath(),rt.arc(0,0,24*e,0,Math.PI*2),rt.fill()),g.layout&&(Up!==g.layout&&YS(n,e),rt.drawImage(vs,-t,-t)),de.forEach((r,s)=>{rt.fillStyle=g.mode!=="conquest"||g.teams[s].alive?r.css:"#555",rt.fillRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18),!Xl()&&!gi(s,g.myTi)&&(rt.strokeStyle="#fff",rt.lineWidth=2,rt.strokeRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18))});for(const r of g.units){if(r.dead)continue;rt.fillStyle=de[Ae(r.ti)].css;const s=r.leader?6:3.5;rt.fillRect(r.x*e-s/2,r.z*e-s/2,s,s)}if(g.flag){const r=g.flag.state==="carried"&&g.flag.carrier?g.flag.carrier:g.flag;rt.fillStyle="#fff",rt.strokeStyle="#000",rt.lineWidth=1.5,rt.beginPath(),rt.arc(r.x*e,r.z*e,5,0,Math.PI*2),rt.fill(),rt.stroke()}rt.restore(),rt.fillStyle="#fff",rt.beginPath(),rt.moveTo(t,t-8),rt.lineTo(t-5,t+5),rt.lineTo(t+5,t+5),rt.fill()}let at=null,Dl=null,fo=null;const el={};function dr(){if(at){at.state==="suspended"&&at.resume();return}try{at=new(window.AudioContext||window.webkitAudioContext),Dl=at.createBuffer(1,at.sampleRate*.6,at.sampleRate);const n=Dl.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1}catch{at=null}}function wn(n,e){const t=performance.now();return el[n]&&t-el[n]<e?!1:(el[n]=t,!0)}function si(n,e,t,i,r="bandpass",s,a=1){if(!at)return;const o=at.currentTime,c=at.createBufferSource(),f=at.createBiquadFilter(),l=at.createGain();c.buffer=Dl,f.type=r,f.frequency.setValueAtTime(e,o),s&&f.frequency.exponentialRampToValueAtTime(s,o+n),f.Q.value=t,l.gain.setValueAtTime(Math.max(.0011,i*a),o),l.gain.exponentialRampToValueAtTime(.001,o+n),c.connect(f).connect(l).connect(at.destination),c.start(o),c.stop(o+n)}function hn(n,e,t,i="sine",r,s=0){if(!at)return;const a=at.currentTime+s,o=at.createOscillator(),c=at.createGain();o.type=i,o.frequency.setValueAtTime(n,a),r&&o.frequency.exponentialRampToValueAtTime(r,a+e),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),a+.02),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(c).connect(at.destination),o.start(a),o.stop(a+e)}function ki(n,e){const t=g.player;if(!t||n==null)return 1;const i=Math.hypot(n-t.x,e-t.z);return Ln(1.2-i/40,0,1)}function JS(){if(fo)return fo;const n=Math.floor(at.sampleRate*4);fo=at.createBuffer(1,n,at.sampleRate);const e=fo.getChannelData(0);let t=0;for(let i=0;i<n;i++)t+=(Math.random()*2-1)*.05,t*=.992,e[i]=t;return fo}let va=null,po=null;function ZS(n){if(!at)return;xf();const e=n==="colosseum",t=at.createBufferSource();t.buffer=JS(),t.loop=!0;const i=at.createBiquadFilter();i.type="bandpass",i.frequency.value=e?480:260,i.Q.value=.7;const r=at.createGain();r.gain.setValueAtTime(0,at.currentTime),t.connect(i).connect(r).connect(at.destination);try{t.start()}catch{return}r.gain.linearRampToValueAtTime(e?.1:.04,at.currentTime+1.4),va=t,po=r}function xf(){if(po)try{po.gain.cancelScheduledValues(at.currentTime),po.gain.linearRampToValueAtTime(0,at.currentTime+.6)}catch{}if(va){const n=va;try{n.stop(at.currentTime+.65)}catch{}}va=null,po=null}const It={swing(n,e){const t=ki(n,e);t>.1&&wn("sw",60)&&si(.14,1800,1,.12,"bandpass",600,t)},clang(n,e){const t=ki(n,e);t>.1&&wn("cl",60)&&(si(.08,3400,7,.22,"bandpass",0,t),hn(1500+Math.random()*600,.14,.07*t,"triangle"))},hit(n,e){const t=ki(n,e);t>.1&&wn("hi",50)&&(si(.12,380,1,.4,"lowpass",0,t),hn(130,.1,.15*t,"triangle",60))},die(n,e){const t=ki(n,e);t>.15&&wn("di",140)&&hn(260,.35,.08*t,"sawtooth",110)},wall(n,e){const t=ki(n,e);t>.1&&wn("wa",120)&&si(.2,500,1.2,.3,"lowpass",0,t)},bow(n,e){const t=ki(n,e);t>.1&&wn("bo",80)&&(hn(220,.12,.06*t,"triangle",140),si(.25,2600,2,.06,"bandpass",900,t))},thud(n,e){const t=ki(n,e);t>.1&&wn("th",80)&&si(.07,900,1.5,.15,"bandpass",0,t)},hoof(n,e){const t=ki(n,e);t>.1&&wn("ho",95)&&si(.05,260,2,.25,"bandpass",0,t)},neigh(){hn(700,.45,.07,"sawtooth",1100),hn(900,.4,.05,"sawtooth",500,.2)},trample(n,e){const t=ki(n,e);t>.1&&wn("tr",90)&&si(.2,200,1,.5,"lowpass",0,t)},coin(){wn("co",50)&&(hn(1300,.08,.08,"square"),hn(1750,.12,.07,"square",0,.07))},horn(){hn(196,.9,.14,"sawtooth",200),hn(294,.9,.08,"sawtooth",296)},order(){hn(392,.12,.1,"square"),hn(523,.18,.1,"square",0,.1)},crumble(){si(1.2,300,.7,.6,"lowpass",80)},capture(){hn(523,.2,.12,"square"),hn(659,.2,.12,"square",0,.18),hn(784,.4,.12,"square",0,.36)},cheer(){wn("ch",400)&&(si(1.4,700,.8,.16,"bandpass",1400),si(1.7,500,.6,.12,"bandpass",900,.8))},uiClick(){wn("ui",45)&&hn(700,.045,.045,"square",500)}};function ws(n){try{navigator.vibrate&&navigator.vibrate(n)}catch{}}const ze={NET:null,myNick:""};try{ze.myNick=localStorage.getItem("fb-nick")||""}catch{}const bi=()=>!!(ze.NET&&ze.NET.role==="client"),zr=()=>!!(ze.NET&&ze.NET.role==="host"),Pd=(n,e)=>{var t;try{return(t=localStorage.getItem(n))!=null?t:e}catch{return e}},en={faction:Pd("rally-faction","roman"),color:+Pd("rally-color","0")||0,save(){try{localStorage.setItem("rally-faction",this.faction),localStorage.setItem("rally-color",String(this.color))}catch{}}},mt=n=>document.getElementById(n),vf=n=>(n=Math.max(0,Math.floor(n)),Math.floor(n/60)+":"+String(n%60).padStart(2,"0"));function QS(){mt("ptsTitle").textContent=Wr[g.mode].title,mt("tpRows").innerHTML=de.map((n,e)=>`<div class="tp${e===Ae(g.myTi)?" me":""}" id="tp${e}"><span class="al">${Xl()?"":Jd[g.ALLY[e]]}</span><div class="bar"><i style="background:${n.css}"></i></div><b>0</b></div>`).join(""),mt("pips").innerHTML=de.map((n,e)=>`<span class="pip" id="pip${e}" style="background:${n.css}">${n.name[0]}</span>`).join(""),mt("clockMax").textContent=vf(Wr[g.mode].time)}function eb(){["ovTitle","ovEnd","ovBrowse","ovLobby"].forEach(n=>mt(n).hidden=!0),mt("hudWrap").hidden=!1,mt("joyhint").style.opacity=1}function yf(n){de.forEach((d,p)=>{const _=mt("tp"+p);if(!_)return;const x=pg(p),m=g.mode==="conquest"?100:g.mode==="dm"?ru:Mo;_.querySelector("i").style.transform=`scaleX(${Math.max(0,x)/m})`,_.querySelector("b").textContent=g.mode==="ctf"?`${x}/${Mo}`:Math.max(0,Math.ceil(x));const u=mg(p);_.classList.toggle("out",u);const v=mt("pip"+p);v.classList.toggle("out",u),v.classList.toggle("hum",gg(p)),v.textContent=u?"✕":d.name[0]}),mt("clockT").textContent=vf(g.T);const e=g.player,t=g.teams[g.myTi];e&&(mt("hpT").textContent=`${Math.max(0,Math.ceil(e.hp))}/${e.max}`,mt("hpBar").style.transform=`scaleX(${Math.max(0,e.hp)/e.max})`,mt("horseBarWrap").hidden=!e.mounted,mt("horseBar").style.transform=`scaleX(${Math.min(1,Math.max(0,e.horseHp)/Uo(g.myTi))})`);const i=Math.floor(t.gold);mt("gold").textContent=i;const r=Ks(g.myTi);mt("squadN").textContent=r.length;const s=d=>r.filter(p=>p.kind===d).length;mt("squadMix").textContent=`F${s("foot")} A${s("arch")}`,document.querySelectorAll("#tray button").forEach(d=>{d.setAttribute("aria-disabled",i<an[d.dataset.kind].cost||r.length>=g.squadCap||!Cs(g.myTi)?"true":"false")}),document.querySelectorAll("#upTray button").forEach(d=>{const p=d.dataset.up,_=mi.find(M=>M.id===p),x=_?_.cost.length:0,m=t.up?t.up[p]:0,u=So(g.myTi,p),v=p==="foot2"&&!(t.up&&t.up.foot1)||p==="arch2"&&!(t.up&&t.up.arch1);d.querySelector(".lv").dataset.pips="●".repeat(m)+"○".repeat(Math.max(0,x-m)),d.querySelector("em").textContent=u==null?"Max":v?"Locked":u+"g",d.setAttribute("aria-disabled",u==null||i<u||v?"true":"false")});let a="Ride",o="horse";e&&e.mounted?(a="Walk",o="get off"):e&&e.summon?(a="…",o="coming"):e&&e.horseCd>0&&(a=Math.ceil(e.horseCd)+"s",o="resting"),mt("mntT").textContent=a,mt("mntS").textContent=o,mt("mnt").classList.toggle("dim",!e||!e.mounted&&(e.horseCd>0||e.carrying||e.dead)),mt("blk").classList.toggle("dim",!e||e.mounted),mt("atk").classList.toggle("dim",!e||e.carrying);const c=t.order||"follow";mt("cmdT").textContent=Ca[c]||Ca.follow;const f=c==="follow"?"var(--green)":c==="hold"?"var(--yellow)":c==="testudo"?"var(--blue)":"var(--red)";mt("cmdBtn").style.borderLeftColor=f,mt("cmdBtn").querySelector(".ic").style.background=f;const l=ze.NET,h=mt("netTag");if(l){h.hidden=!1;const d=g.teams.map((p,_)=>_).filter(p=>g.teams[p].active&&g.teams[p].human&&p!==g.myTi).map(p=>de[Ae(p)].name+(p>=4?" (co-captain)":""));if(bi()){const p=performance.now()-(n||0)>2500;h.textContent=p?"Waiting for the host…":`Online · ${d.length?"with "+d.join(", "):"host"}`,h.classList.toggle("bad",p)}else h.textContent=`Hosting · ${d.length?d.join(", "):"no one else yet"}`}else h.hidden=!0}let Ld;function ir(n,e,t){const i=mt("banner");i.innerHTML="";const r=document.createElement("span");if(r.textContent=n,r.style.color=t||"#fff",i.appendChild(r),e){const s=document.createElement("small");s.textContent=e,i.appendChild(s)}i.classList.add("on"),clearTimeout(Ld),Ld=setTimeout(()=>i.classList.remove("on"),2e3)}const tb=n=>de.filter((e,t)=>g.ALLY[t]===n).map(e=>e.name).join(" & ");function nb(n,e){const t=g.myTi,i=o=>de[Ae(o)].name,r=o=>de[Ae(o)].css,s=o=>o===t,a=o=>!gi(o,t);switch(n){case"start":return[Wr[g.mode].name,g.mode==="conquest"?"Tear down every enemy castle":g.mode==="dm"?"Last side with tickets wins":"Bring the banner home three times"];case"castleDown":return Ae(e[0])===Ae(t)?["Your castle has fallen!","No more recruits. Stay alive.","#e0352b"]:[`${i(e[0])} castle destroyed!`,e[1]===t?"Your doing":`by ${i(e[1])}`,r(e[0])];case"tickets0":return[`${i(e[0])} out of tickets!`,s(e[0])?"No more respawns":a(e[0])?"Protect your ally":"Finish them off",r(e[0])];case"bounty":return[`Bounty on ${i(e[0])}'s captain`,s(e[0])?"Everyone is coming for you":"Double gold for the kill",r(e[0])];case"bountyClaimed":return s(e[0])?["Bounty claimed!","+50 gold","#ffcf3a"]:null;case"capDown":return s(e[1])?[`${i(e[0])} captain down`,"",r(e[0])]:null;case"fell":return s(e[0])?["You fell!",e[1]?"Back in the fight in 5 seconds":"No way back. Your allies fight on.","#e0352b"]:null;case"respawn":return s(e[0])?["Back on your feet","Rally your squad"]:null;case"horseDown":return s(e[0])?["Your horse is down!",`New horse in ${Ia(e[0])} seconds`,"#e0352b"]:null;case"rideNo":return s(e[0])?e[1]==="banner"?["Not with the banner","Carry it home on foot"]:e[1]==="rest"?["Your horse is resting",`Ready in ${e[2]} seconds`]:["Too hot to call your horse","Get clear of the fight first"]:null;case"flagTaken":return s(e[0])?["You have the banner!","Carry it home. Your squad will escort you.",r(e[0])]:[`${i(e[0])} has the banner!`,a(e[0])?"Escort them home":"Stop the carrier",r(e[0])];case"flagDropped":return s(e[0])?["Banner dropped!","Grab it again before it returns"]:[`${i(e[0])} dropped the banner`,"",r(e[0])];case"flagHome":return["The banner returns to the fort",""];case"capture":return[`${i(e[0])} captures the banner!`,`${Eu(g.ALLY[Ae(e[0])])} of ${Mo}`,r(e[0])];case"upgrade":{const o=mi.find(c=>c.id===e[1]);return s(e[0])&&o?[`${o.name} level ${e[2]}`,o.desc,"#ffcf3a"]:null}case"left":return[`${i(e[0])}'s player left`,"The computer takes over their army",r(e[0])]}return null}function Us(n,e){const t=g.myTi;if(n==="gold"){e[0]===t&&(Ds(e[1],Rt(e[1],e[2])+2.6,e[2],`+${e[3]} gold`,"#ffcf3a"),It.coin());return}const i=nb(n,e);i&&(ir(i[0],i[1],i[2]),n==="horseDown"&&e[0]===t&&(ws(120),ct.shake=.5),n==="capture"&&(It.capture(),It.cheer(),gi(e[0],t)||ws([60,40,60])),n==="castleDown"&&(It.crumble(),It.cheer(),ct.shake=.6,e[0]===t&&ws([100,60,100])),n==="flagTaken"&&e[0]===t&&(It.order(),ws(50)))}const qn=n=>document.getElementById(n),ft={joy:{active:!1,id:null,ox:0,oy:0,x:0,y:0},look:{id:null,lx:0,ly:0},keys:{},attackHeld:!1,blockHeld:!1,trayIsOpen:!1,upIsOpen:!1};let xn={attack(){},ride(){},order(){},recruit(){},upgrade(){}};function wo(n){ft.trayIsOpen=n,qn("tray").hidden=!n,qn("recBtn").classList.toggle("open",n),n&&ks(!1)}function ks(n){ft.upIsOpen=n,qn("upTray").hidden=!n,qn("upBtn").classList.toggle("open",n),n&&wo(!1)}function kp(){ft.keys={},ft.attackHeld=ft.blockHeld=!1,ft.joy.active=!1,ft.joy.x=ft.joy.y=0,ft.look.id=null}function Np(n){const{joy:e,keys:t}=ft;let i=e.x,r=e.y;t.KeyA&&(i-=1),t.KeyD&&(i+=1),t.KeyW&&(r-=1),t.KeyS&&(r+=1),t.ArrowLeft&&(ct.yaw+=n*2.4),t.ArrowRight&&(ct.yaw-=n*2.4),t.ArrowUp&&(r-=1),t.ArrowDown&&(r+=1);let s=Math.hypot(i,r);s>1&&(i/=s,r/=s,s=1);const a=ct.yaw,o=Math.sin(a),c=Math.cos(a),f=-Math.cos(a),l=Math.sin(a);return{wx:o*-r+f*i,wz:c*-r+l*i,mag:s,block:ft.blockHeld,attackHeld:ft.attackHeld,camYaw:a}}function ib(n){xn=n;const e=qn("touch"),{joy:t,look:i}=ft;e.addEventListener("pointerdown",o=>{if(g.state==="play"){dr(),o.preventDefault(),wo(!1),ks(!1),o.clientX<bt.W*.42&&!t.active?(t.active=!0,t.id=o.pointerId,t.ox=o.clientX,t.oy=o.clientY,t.x=t.y=0,qn("joyhint").style.opacity=0):i.id===null&&(i.id=o.pointerId,i.lx=o.clientX,i.ly=o.clientY);try{e.setPointerCapture(o.pointerId)}catch{}}}),e.addEventListener("pointermove",o=>{if(o.pointerId===t.id){const c=o.clientX-t.ox,f=o.clientY-t.oy,l=50,h=Math.hypot(c,f);h>l&&(t.ox+=c*(1-l/h)*.4,t.oy+=f*(1-l/h)*.4),t.x=Ln(c/l,-1,1),t.y=Ln(f/l,-1,1);const d=Math.hypot(t.x,t.y);d>1&&(t.x/=d,t.y/=d)}else o.pointerId===i.id&&(ct.yaw-=(o.clientX-i.lx)*.0075,ct.pitch=Ln(ct.pitch+(o.clientY-i.ly)*.004,.12,.75),i.lx=o.clientX,i.ly=o.clientY)});const r=o=>{o.pointerId===t.id&&(t.active=!1,t.id=null,t.x=t.y=0),o.pointerId===i.id&&(i.id=null)};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r);const s=(o,c,f)=>{o.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),dr();try{o.setPointerCapture(h.pointerId)}catch{}o.classList.add("held"),c()});const l=()=>{o.classList.remove("held"),f()};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l)},a=(o,c)=>{o.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),dr(),c()}),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),c())})};s(qn("atk"),()=>{ft.attackHeld=!0,xn.attack()},()=>{ft.attackHeld=!1}),s(qn("blk"),()=>{ft.blockHeld=!0},()=>{ft.blockHeld=!1}),a(qn("mnt"),()=>xn.ride()),a(qn("cmdBtn"),()=>xn.order()),a(qn("recBtn"),()=>wo(!ft.trayIsOpen)),document.querySelectorAll("#tray button").forEach(o=>a(o,()=>xn.recruit(o.dataset.kind))),a(qn("upBtn"),()=>ks(!ft.upIsOpen)),document.querySelectorAll("#upTray button").forEach(o=>a(o,()=>xn.upgrade(o.dataset.up))),addEventListener("keydown",o=>{if(g.state!=="play"||o.target&&o.target.tagName==="INPUT"||(dr(),ft.keys[o.code]=!0,o.code==="Space"&&(o.preventDefault(),ft.attackHeld=!0,o.repeat||xn.attack()),(o.code==="ShiftLeft"||o.code==="ShiftRight")&&(ft.blockHeld=!0),o.repeat))return;o.code==="KeyQ"&&xn.order("follow"),o.code==="KeyF"&&xn.order("hold"),o.code==="KeyE"&&xn.order("charge"),o.code==="KeyT"&&xn.order("testudo"),o.code==="KeyU"&&ks(!ft.upIsOpen);const c=["Digit3","Digit4","Digit5","Digit6","Digit7","Digit8"].indexOf(o.code);c>=0&&xn.upgrade(["foot1","foot2","arch1","arch2","aura","horse"][c]),o.code==="KeyH"&&xn.ride(),o.code==="Digit1"&&xn.recruit("foot"),o.code==="Digit2"&&xn.recruit("arch")}),addEventListener("keyup",o=>{ft.keys[o.code]=!1,o.code==="Space"&&(ft.attackHeld=!1),o.code.startsWith("Shift")&&(ft.blockHeld=!1)}),addEventListener("blur",kp)}const Dd=[3,2,1,0],rb=[1,0,3,2];function Co(n,e){const t=[0,1,2,3];if(n==="2v2"){const i=Dd[e];for(let r=0;r<4;r++)t[r]=r===e||r===i?0:1}else if(n==="2v1v1"){const i=Dd[e];let r=1;for(let s=0;s<4;s++)t[s]=s===e||s===i?0:r++}else if(n==="3v1"){const i=rb[e];for(let r=0;r<4;r++)t[r]=r===i?1:0}return t}function sb(n,e){const t=f=>f===e?`you (${de[f].name})`:de[f].name,i=[...new Set(n)].map(f=>de.map((l,h)=>h).filter(l=>n[l]===f));if(i.length===4)return`Every team for itself. You are ${de[e].name}.`;const r=f=>f.length<2?f.join(""):f.slice(0,-1).join(", ")+" and "+f[f.length-1],s=f=>r(f.map(t)),a=i.find(f=>f.includes(e)),o=i.filter(f=>f!==a),c=`${s(a)} against ${r(o.map(s))}`;return c[0].toUpperCase()+c.slice(1)+(o.length>1?", each on their own.":".")}function Mf(n,e){const t=Xr((e|0)+101),i=n.slice(),r=new Set(n.filter(Boolean));let s=ol.filter(a=>!r.has(a));for(let a=0;a<4;a++)i[a]||(s.length||(s=ol.slice()),i[a]=s.splice(Math.floor(t()*s.length),1)[0]);return i}const te={},$s=n=>Math.round(n*10)/10,Ns=n=>Math.round(n*100)/100,Nn=n=>Math.max(0,Math.round(n)).toString(36),On=n=>parseInt(n,36),Mi=n=>Nn((n+100)*10),Xn=n=>On(n)/10-100,Id=n=>Nn((n%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*72%72),Ud=n=>On(n)/72*Math.PI*2,ac=n=>{const e=n.peers().find(t=>t.sameTab);return e?e.peer:null};let Ro={onMatchStart(){},onAbort(){},onLobby(){}};function ob(n){Ro=Object.assign(Ro,n)}Tt.on("msg",n=>{const e=ze.NET;zr()&&e.msgs&&(e.msgs.push([++e.msgN,n.k,...n.a]),e.msgs.length>8&&e.msgs.shift())});function ab(){const n=c=>mi.reduce((f,l,h)=>f+c.up[l.id]*4**h,0),e=g.teams.map(c=>[Math.round(c.points*10),c.tickets,c.caps,Math.floor(c.gold),c.alive?1:0,Math.max(0,Math.ceil(c.leaderDeadT)),n(c)].join(",")).join(";"),t=[];for(const c of g.units){if(c.dead)continue;const f=Zd.indexOf(c.kind)*8+c.ti,l=(c.swing>0?1:0)|(c.mounted?2:0)|(c.blockT>0||c.human&&c.blocking?4:0)|(c.carrying?8:0)|(c.stun>0?16:0)|(c.aim?32:0)|(c.testudo?64:0);t.push([Nn(c.id),f.toString(16),Mi(c.x),Mi(c.z),Id(c.face),Nn(Ln(c.hp/c.max,0,1)*35),Nn(l)].join(","))}const i=g.arrows.filter(c=>!c.stuck&&!c.done).slice(-18).map(c=>[Nn(c.id),Mi(c.x0),Mi(c.z0),Nn(c.y0*10),Mi(c.x1),Mi(c.z1),Nn(c.y1*10+20),Nn(c.dur*100),Nn(c.peak*10),Nn(c.t*100),c.ti].join(",")),r=g.horses.filter(c=>c.state==="coming").map(c=>[Mi(c.x),Mi(c.z),Id(c.face),c.ti].join(",")),s=g.flag,a=s?[s.state==="home"?0:s.state==="dropped"?1:2,Mi(s.x),Mi(s.z),s.carrier?Nn(s.carrier.id):""].join(","):"",o=g.teams.map((c,f)=>{if(!c.human||f===g.myTi)return"";const l=c.leader,h=l.kick;return h.dirty&&(h.n++,h.dirty=!1,h.lvx=h.vx,h.lvz=h.vz,h.lst=h.st,h.vx=0,h.vz=0,h.st=0),[f,Nn(l.id),l.dead?1:0,Math.round(l.horseHp),Math.ceil(l.horseCd),l.summon?1:0,h.n,$s(h.lvx||0),$s(h.lvz||0),Ns(h.lst||0),Math.round(l.hp)].join(",")}).filter(Boolean).join(";");return[Math.round(g.T*10),e,t.join(";"),i.join(";"),r.join(";"),a,o,g.bounty].join("|")}function cb(){performance.now()-(ze.NET.lastSend||0)<80||cc()}function cc(){const n=ze.NET;if(!n)return;n.lastSend=performance.now();const e={role:"host",ph:g.state==="end"?"end":"play",seed:g.seed,mode:g.mode,map:g.map.id,diff:g.diff,al:g.ALLY.join(""),duo:g.duo.map(i=>i?1:0).join(""),seats:n.seats,nick:ze.myNick||"Host",fa:g.factions.map(i=>(zs[i]||zs.roman).code).join(""),n:++n.snapN,s:ab(),m:n.msgs};g.state==="end"&&g.endInfo&&(e.res=[g.endInfo.w,g.endInfo.why]);let t=JSON.stringify(e);for(;t.length>3900;){const i=e.s.split("|"),r=i[3].split(";");if(r.length&&r[0])r.shift(),i[3]=r.join(";"),e.s=i.join("|");else if(e.m.length)e.m=e.m.slice(1);else break;t=JSON.stringify(e)}n.lastSize=t.length,n.room.presence(e).catch(()=>{})}function lb(){const n=ze.NET,e=n.room.peers(),t=new Set(e.map(i=>i.peer));for(const[i,r]of Object.entries(n.seats))if(r!==g.myTi&&!t.has(i)&&g.teams[r].human){g.teams[r].human=!1;const s=g.teams[r].leader;s&&(s.human=!1,s.remote=!1,s.dmg=an.captain.dmg,s.spd=an.captain.spd),delete n.seats[i],Tt.emit("msg",{k:"left",a:[r]})}for(const i of e){if(i.sameTab)continue;const r=n.seats[i.peer];if(r===void 0)continue;const s=i.presence||{};if(s.seed!==g.seed||s.ph!=="play")continue;const a=g.teams[r],o=a.leader;if(!a.human)continue;const c=n.inp[r]||(n.inp[r]={atk:0,ride:0,rec:[0,0,0],up:[0,0,0,0,0]});if(o&&!o.dead&&Array.isArray(s.cap)&&s.cap[0]===o.id&&(o.x=+s.cap[1],o.z=+s.cap[2],o.face=+s.cap[3],o.vx=+s.cap[4],o.vz=+s.cap[5],o.blocking=!!s.blk),typeof s.atk=="number"&&s.atk>c.atk&&(o&&!o.dead&&(typeof s.face=="number"&&(o.face=s.face),sf(o)),c.atk=s.atk),typeof s.ride=="number"&&s.ride>c.ride&&(o&&vu(o),c.ride=s.ride),Array.isArray(s.up))for(let f=0;f<mi.length;f++)for(;(s.up[f]|0)>c.up[f];)c.up[f]++,Zl(r,mi[f].id);if(s.ord&&s.ord!==a.order&&uo.includes(s.ord)&&(a.order=s.ord,s.ord==="hold")){const f=Array.isArray(s.hold)?s.hold:[o.x,o.z,o.face];a.holdPt={x:+f[0],z:+f[1],face:+f[2],isFront:!0}}if(Array.isArray(s.rec))for(let f=0;f<3;f++)for(;(s.rec[f]|0)>c.rec[f];)c.rec[f]++,Jl(r,Qd[f])}}function fb(n){g.role="client",g.mode=n.mode,g.map=Ja[n.map],g.diff=n.diff,g.ALLY=n.al.split("").map(Number),g.seed=n.seed,g.factions=String(n.fa||"rrrr").split("").map(Hm),g.duo=String(n.duo||"0000").split("").map(i=>i==="1"),g.layout=ql(g.map.id,g.mode==="ctf",g.seed),$l(g.layout),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.endInfo=null;const e=[0,0,0,0,0,0,0,0];Object.values(n.seats||{}).forEach(i=>e[i]=1);const t=[1,1,1,1,...g.duo.map(i=>i?1:0)];g.teams=Kl(e,t),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,Object.assign(te,{byId:new Map,lastN:-1,lastMsgN:n.m&&n.m.length?n.m[n.m.length-1][0]:0,meId:null,meInit:!1,kickN:0,localCd:0,lastSnapAt:performance.now(),inp:{atk:0,ride:0,rec:[0,0,0],up:[0,0,0,0,0],ord:"follow",hold:null,face:0},sendAt:0,arrowIds:new Set,coming:[],leaving:[],horseKey:0,riderKeys:new Map,hudT:0}),g.player=null,ct.yaw=Math.atan2(-de[Ae(g.myTi)].pos[0],-de[Ae(g.myTi)].pos[1]),ct.pitch=.32,g.state="play",Ro.onMatchStart(),It.horn(),Us("start",[]),Op(n)}function hb(n,e,t,i,r){const s=e==="captain"&&g.teams[t].human,a={id:n,kind:e,ti:t,leader:e==="captain",human:s,x:i,z:r,y:Rt(i,r),tx:i,tz:r,tface:0,face:0,vx:0,vz:0,vy:0,hp:an[e].hp,max:an[e].hp,r:an[e].r,swing:0,stun:0,blockT:0,dead:!1,deadT:0,mounted:!1,carrying:!1,aim:!1,spd:s?6.3:an[e].spd,horseHp:Uo(t),horseCd:0,summon:!1,testudo:!1,blocking:!1,lastHit:-9};return g.units.push(a),te.byId.set(n,a),a}function db(n){n.dead||(n.dead=!0,n.deadT=0,n.vy=ue(3,6),n.fallDir=Math.random()<.5?1:-1,n.vx*=.5,n.vz*=.5,Tt.emit("splat",{x:n.x,z:n.z,s:ue(1,1.5),ti:n.ti}),It.die(n.x,n.z),te.byId.delete(n.id))}function Op(n){if(n.n===te.lastN)return;te.lastN=n.n,te.lastSnapAt=performance.now();const e=(n.s||"").split("|");if(e.length<8)return;const t=g.myTi;g.T=+e[0]/10,e[1].split(";").forEach((o,c)=>{const f=o.split(",").map(Number),l=g.teams[c];l&&(l.points=f[0]/10,l.tickets=f[1],l.caps=f[2],(c!==t||performance.now()-(te.goldLocalAt||0)>700)&&(l.gold=f[3]),l.alive=!!f[4],l.leaderDeadT=f[5],f.length>6&&(c!==t||performance.now()-(te.upLocalAt||0)>700)&&mi.forEach((h,d)=>{l.up[h.id]=Math.floor(f[6]/4**d)%4}))}),g.bounty=+e[7];const i=e[6]?e[6].split(";").map(o=>o.split(",")).find(o=>+o[0]===t):null;let r=null;i&&(r=On(i[1]),te.meInfo={dead:+i[2],horseHp:+i[3],horseCd:+i[4],summon:+i[5],kn:+i[6],kvx:+i[7],kvz:+i[8],kst:+i[9],hp:+i[10]});const s=new Set;if(e[2])for(const o of e[2].split(";")){const c=o.split(","),f=On(c[0]),l=parseInt(c[1],16),h=Zd[l>>3],d=l&7,p=Xn(c[2]),_=Xn(c[3]),x=Ud(c[4]),m=On(c[5]),u=On(c[6]);s.add(f);let v=te.byId.get(f);v||(v=hb(f,h,d,p,_),v.face=x);const M=v.hp;v.hp=m/35*v.max,v.hp<M-.5&&f!==r&&(Tt.emit("spark",{x:v.x,y:v.y+1.2,z:v.z,c:u&4?"#fff3b0":de[Ae(v.ti)].css,n:5}),u&4?It.clang(v.x,v.z):(It.hit(v.x,v.z),Math.random()<.35&&Tt.emit("splat",{x:v.x+ue(-.4,.4),z:v.z+ue(-.4,.4),s:ue(.6,1.1),ti:v.ti}))),u&1&&v.swing<=0&&f!==r&&(v.swing=.38,It.swing(v.x,v.z)),v.mounted=!!(u&2),v.carrying=!!(u&8),v.testudo=!!(u&64),f!==r&&(v.blockT=u&4?.2:0,v.stun=u&16?.1:0,v.aim=!!(u&32)),f!==r?(v.tx=p,v.tz=_,v.tface=x,Math.hypot(v.x-p,v.z-_)>8&&(v.x=p,v.z=_)):(!te.meInit||te.meId!==f)&&(v.x=p,v.z=_,v.face=x)}for(const o of[...te.byId.values()])s.has(o.id)||db(o);if(r!=null&&te.byId.get(r)){const o=te.byId.get(r);te.meId!==r&&(te.meId=r,te.meInit=!0,g.player=o,ct.yaw=o.face,te.kickN=te.meInfo?te.meInfo.kn:0),g.player=o,o.horseHp=te.meInfo.horseHp,o.horseCd=te.meInfo.horseCd,o.summon=!!te.meInfo.summon,o.hp=te.meInfo.hp,te.meInfo.kn!==te.kickN&&(te.kickN=te.meInfo.kn,o.vx+=te.meInfo.kvx,o.vz+=te.meInfo.kvz,o.stun=Math.max(o.stun,te.meInfo.kst),(te.meInfo.kvx||te.meInfo.kvz)&&(ct.shake=.35,ws(30),Tt.emit("spark",{x:o.x,y:o.y+1.2,z:o.z,c:de[Ae(o.ti)].css,n:5}),It.hit(o.x,o.z)))}if(g.player&&g.player.dead&&(g.player=null),e[3])for(const o of e[3].split(";")){const c=o.split(","),f=On(c[0]);if(te.arrowIds.has(f))continue;te.arrowIds.add(f);const l=ef({id:f,x0:Xn(c[1]),z0:Xn(c[2]),y0:On(c[3])/10,x1:Xn(c[4]),z1:Xn(c[5]),y1:(On(c[6])-20)/10,dur:On(c[7])/100,peak:On(c[8])/10,ti:+c[10],t:On(c[9])/100});g.arrows.push(l),It.bow(l.x0,l.z0)}te.arrowIds.size>400&&(te.arrowIds=new Set([...te.arrowIds].slice(-200)));const a=e[4]?e[4].split(";").map(o=>o.split(",")):[];if(te.coming.length=Math.min(te.coming.length,a.length),a.forEach((o,c)=>{let f=te.coming[c];f||(f={key:2e5+ ++te.horseKey,ti:+o[3],x:Xn(o[0]),z:Xn(o[1]),face:0,spd:14,state:"coming",t:0},te.coming.push(f)),f.tx=Xn(o[0]),f.tz=Xn(o[1]),f.face=Ud(o[2])}),g.flag&&e[5]){const o=e[5].split(","),c=g.flag;c.state=["home","dropped","carried"][+o[0]],c.x=Xn(o[1]),c.z=Xn(o[2]),c.carrier=o[3]&&te.byId.get(On(o[3]))||null,c.carrier&&(c.carrier.carrying=!0)}for(const o of n.m||[])o[0]>te.lastMsgN&&(te.lastMsgN=o[0],Us(o[1],o.slice(2)))}function ub(n){const e=ze.NET,t=e.room.peers().find(s=>s.peer===e.hostPeer);if(t){e.hostGoneAt=0;const s=t.presence||{};if(s.ph==="lobby")return Ro.onLobby(),!1;s.seed===g.seed&&(s.ph==="play"||s.ph==="end")&&Op(s),s.ph==="end"&&g.state==="play"&&Array.isArray(s.res)&&Tt.emit("hostEnd",s.res)}else if(e.hostGoneAt||(e.hostGoneAt=performance.now()),performance.now()-e.hostGoneAt>1500)return Ro.onAbort("The host left the battle."),!1;if(g.state!=="play"&&g.state!=="end")return!1;te.localCd-=n,Yl();const i=g.player;if(i&&!i.dead&&g.state==="play"){i.stun-=n,wu(i,Np(n),n);for(const s of g.units){if(s===i||s.dead)continue;const a=i.x-s.x,o=i.z-s.z,c=i.r+s.r;if(Math.abs(a)>c||Math.abs(o)>c)continue;const f=Math.hypot(a,o)||.01;f<c&&(i.x+=a/f*(c-f)*.7,i.z+=o/f*(c-f)*.7)}Au(i,n,i.z),i.r=i.mounted?.95:an.captain.r,ft.attackHeld&&te.localCd<=0&&Sf.attack()}const r=Math.min(1,n*10);for(const s of g.units){if(s.dead){of(s,n);continue}if(s===i)continue;const a=s.x,o=s.z;s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r,s.face=Fs(s.face,s.tface,n*12),s.vx=(s.x-a)/Math.max(n,.001),s.vz=(s.z-o)/Math.max(n,.001),s.y=Rt(s.x,s.z),s.swing>0&&(s.swing-=n)}i&&i.swing>0&&(i.swing-=n),g.units=g.units.filter(s=>!(s.dead&&s.deadT>12));for(const s of g.units){const a=te.riderKeys.get(s);s.mounted&&!s.dead&&!a&&te.riderKeys.set(s,1e5+ ++te.horseKey),(!s.mounted||s.dead)&&a&&(te.leaving.push({key:a,ti:s.ti,x:s.x,z:s.z,face:s.face,spd:10,state:"leaving",t:0}),te.riderKeys.delete(s))}for(const s of te.coming)s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r;for(const s of te.leaving)s.t+=n,s.x+=Math.sin(s.face)*10*n,s.z+=Math.cos(s.face)*10*n;if(te.leaving=te.leaving.filter(s=>s.t<3),Ru(n,!1),performance.now()-te.sendAt>66&&g.state==="play"){te.sendAt=performance.now();const s={role:"player",nick:ze.myNick||"Captain",ph:"play",seed:g.seed,atk:te.inp.atk,ride:te.inp.ride,rec:te.inp.rec,up:te.inp.up,ord:te.inp.ord,hold:te.inp.hold,face:te.inp.face,blk:ft.blockHeld?1:0};i&&!i.dead&&(s.cap=[i.id,Ns(i.x),Ns(i.z),Ns(i.face),$s(i.vx),$s(i.vz)]),e.room.presence(s).catch(()=>{})}return!0}function pb(){const n=[...te.coming,...te.leaving];for(const[e,t]of te.riderKeys)e.dead||n.push({key:t,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:Math.hypot(e.vx,e.vz),state:"ridden",t:0});return n}const mb=n=>Ca[n]||Ca.follow,Sf={attack(){const n=g.player;if(!(!n||n.dead||g.state!=="play")){if(n.carrying){wn("carryhint",1500)&&Ds(n.x,n.y+3.2,n.z,"Hands full: carry it home","#fff");return}if(bi()){if(te.localCd>0)return;te.localCd=n.mounted?.8:.6;const e=Tu(n);e&&!n.mounted&&(n.face=Math.atan2(e.x-n.x,e.z-n.z)),n.swing=.38,It.swing(n.x,n.z),te.inp.atk++,te.inp.face=Ns(n.face);return}sf(n)}},ride(){const n=g.player;if(!(g.state!=="play"||!n||n.dead)){if(bi()){if(!n.mounted){if(n.carrying){Us("rideNo",[g.myTi,"banner"]);return}if(n.horseCd>0){Us("rideNo",[g.myTi,"rest",Math.ceil(n.horseCd)]);return}It.neigh()}te.inp.ride++;return}vu(n)}},order(n){const e=g.player;if(g.state!=="play"||!e||e.dead)return;const t=g.teams[g.myTi].order||"follow",i=uo.includes(n)?n:uo[(uo.indexOf(t)+1)%uo.length];i===t&&i!=="hold"||(bi()?(g.teams[g.myTi].order=i,te.inp.ord=i,i==="hold"&&(te.inp.hold=[$s(e.x),$s(e.z),Ns(e.face)])):ag(g.myTi,i),It.order(),Ds(e.x,e.y+3.2,e.z,mb(i),"#fff"),Tt.emit("hud"))},upgrade(n){if(g.state!=="play")return;const e=g.teams[g.myTi],t=So(g.myTi,n),i=mi.find(r=>r.id===n);if(i){if(t==null){ir(`${i.name} is maxed`,"Try another upgrade");return}if(e.gold<t){ir("Not enough gold",`${i.name} costs ${t} gold`,"#ffcf3a");return}bi()?(te.inp.up[mi.indexOf(i)]++,e.gold-=t,e.up[n]++,te.goldLocalAt=te.upLocalAt=performance.now(),It.coin(),Us("upgrade",[g.myTi,n,e.up[n]])):Zl(g.myTi,n),Tt.emit("hud")}},recruit(n){if(g.state!=="play")return;const e=an[n],t=g.teams[g.myTi];if(!Cs(g.myTi)){ir("No recruits",g.mode==="dm"?"Your team is out of tickets":"You need a castle to recruit","#e0352b");return}if(Ks(g.myTi).length>=g.squadCap){ir("Squad full",`${g.squadCap} soldiers is the limit`);return}if(t.gold<e.cost){ir("Not enough gold",`A ${e.name.toLowerCase()} costs ${e.cost} gold`,"#ffcf3a");return}bi()?(te.inp.rec[Qd.indexOf(n)]++,t.gold-=e.cost,te.goldLocalAt=performance.now(),g.recruited++,It.coin()):Jl(g.myTi,n);const i=g.player;i&&Ds(i.x,i.y+3,i.z,`${e.name} on the way`,"#fff")}};class gb{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return _b(e).buffer}}function _b(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function zp(n){return new xb(n).unpack()}function Fp(n){const e=new vb,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class xb{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,a;for(;i<e;)s=t[i],s<160?(a=s,i++):(s^192)<32?(a=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(a=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(a=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(a);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,a=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*a}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class vb{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),a=2**32,o=t<<31|i+1023<<20|s/a&1048575,c=s%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const a=t[s];if(e.hasOwnProperty(a)){this.pack(a);const o=this.pack(e[a]);if(o instanceof Promise)return o.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new gb,this._textEncoder=new TextEncoder}}let Bp=!0,Hp=!0;function mo(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Yr(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){bf("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(o,c){if(o!==e)return s.apply(this,arguments);const f=l=>{const h=t(l);h&&(c.handleEvent?c.handleEvent(h):c(h))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,f),s.apply(this,[o,f])};const a=r.removeEventListener;r.removeEventListener=function(o,c){if(o!==e||!this._eventMap||!this._eventMap[e])return a.apply(this,arguments);if(!this._eventMap[e].has(c))return a.apply(this,arguments);const f=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,f])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(o){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),o&&this.addEventListener(e,this["_on"+e]=o)},enumerable:!0,configurable:!0})}function yb(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Bp=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function Mb(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Hp=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function bf(){if(typeof window=="object"){if(Bp)return;typeof console!="undefined"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Ef(n,e){Hp&&console.warn(n+" is deprecated, please use "+e+" instead.")}function Sb(n){const e={browser:null,version:null};if(typeof n=="undefined"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(mo(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(mo(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(mo(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=mo(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function kd(n){return Object.prototype.toString.call(n)==="[object Object]"}function Gp(n){return kd(n)?Object.keys(n).reduce(function(e,t){const i=kd(n[t]),r=i?Gp(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function Il(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Il(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{Il(n,n.get(r),t)})}))}function Nd(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(a=>{a.type==="track"&&a.trackIdentifier===e.id&&s.push(a)}),s.forEach(a=>{n.forEach(o=>{o.type===i&&o.trackId===a.id&&Il(n,o,r)})}),r}const Od=bf;function Vp(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;const c={};return Object.keys(o).forEach(f=>{if(f==="require"||f==="advanced"||f==="mediaSource")return;const l=typeof o[f]=="object"?o[f]:{ideal:o[f]};l.exact!==void 0&&typeof l.exact=="number"&&(l.min=l.max=l.exact);const h=function(d,p){return d?d+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(l.ideal!==void 0){c.optional=c.optional||[];let d={};typeof l.ideal=="number"?(d[h("min",f)]=l.ideal,c.optional.push(d),d={},d[h("max",f)]=l.ideal,c.optional.push(d)):(d[h("",f)]=l.ideal,c.optional.push(d))}l.exact!==void 0&&typeof l.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[h("",f)]=l.exact):["min","max"].forEach(d=>{l[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[h(d,f)]=l[d])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},r=function(o,c){if(e.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){const f=function(l,h,d){h in l&&!(d in l)&&(l[d]=l[h],delete l[h])};o=JSON.parse(JSON.stringify(o)),f(o.audio,"autoGainControl","googAutoGainControl"),f(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=i(o.audio)}if(o&&typeof o.video=="object"){let f=o.video.facingMode;f=f&&(typeof f=="object"?f:{ideal:f});const l=e.version<66;if(f&&(f.exact==="user"||f.exact==="environment"||f.ideal==="user"||f.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!l)){delete o.video.facingMode;let h;if(f.exact==="environment"||f.ideal==="environment"?h=["back","rear"]:(f.exact==="user"||f.ideal==="user")&&(h=["front"]),h)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(_=>_.kind==="videoinput");let p=d.find(_=>h.some(x=>_.label.toLowerCase().includes(x)));return!p&&d.length&&h.includes("back")&&(p=d[d.length-1]),p&&(o.video.deviceId=f.exact?{exact:p.deviceId}:{ideal:p.deviceId}),o.video=i(o.video),Od("chrome: "+JSON.stringify(o)),c(o)})}o.video=i(o.video)}return Od("chrome: "+JSON.stringify(o)),c(o)},s=function(o){return e.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,f){r(o,l=>{t.webkitGetUserMedia(l,c,h=>{f&&f(s(h))})})};if(t.getUserMedia=a.bind(t),t.mediaDevices.getUserMedia){const o=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,f=>o(f).then(l=>{if(f.audio&&!l.getAudioTracks().length||f.video&&!l.getVideoTracks().length)throw l.getTracks().forEach(h=>{h.stop()}),new DOMException("","NotFoundError");return l},l=>Promise.reject(s(l))))}}}function Wp(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Xp(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):a={track:s.track};const o=new Event("track");o.track=s.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)}),r.stream.getTracks().forEach(s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.id):a={track:s};const o=new Event("track");o.track=s,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Yr(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function jp(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,c){let f=r.apply(this,arguments);return f||(f=e(this,o),this._senders.push(f)),f};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){s.apply(this,arguments);const c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(a=>{this._senders.push(e(this,a))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(a=>{const o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function qp(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const a=i.apply(this,[]);return a.forEach(o=>o._pc=this),a});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const a=r.apply(this,arguments);return a._pc=this,a}),n.RTCRtpSender.prototype.getStats=function(){const a=this;return this._pc.getStats().then(o=>Nd(o,a.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(a=>a._pc=this),s}),Yr(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(a=>Nd(a,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,a,o;return this.getSenders().forEach(c=>{c.track===r&&(s?o=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(a?o=!0:a=c),c.track===r)),o||s&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function $p(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(f=>{if(this.getSenders().find(h=>h.track===f))throw new DOMException("Track already exists.","InvalidAccessError")});const o=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(f=>o.indexOf(f)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{const c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),r.apply(this,arguments)}}function Yp(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return $p(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const l=t.apply(this);return this._reverseStreams=this._reverseStreams||{},l.map(h=>this._reverseStreams[h.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(l){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},l.getTracks().forEach(h=>{if(this.getSenders().find(p=>p.track===h))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[l.id]){const h=new n.MediaStream(l.getTracks());this._streams[l.id]=h,this._reverseStreams[h.id]=l,l=h}i.apply(this,[l])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(l){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[l.id]||l]),delete this._reverseStreams[this._streams[l.id]?this._streams[l.id].id:l.id],delete this._streams[l.id]},n.RTCPeerConnection.prototype.addTrack=function(l,h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(x=>x===l))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(x=>x.track===l))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const _=this._streams[h.id];if(_)_.addTrack(l),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const x=new n.MediaStream([l]);this._streams[h.id]=x,this._reverseStreams[x.id]=h,this.addStream(x)}return this.getSenders().find(x=>x.track===l)};function s(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const p=f._reverseStreams[d],_=f._streams[p.id];h=h.replace(new RegExp(_.id,"g"),p.id)}),new RTCSessionDescription({type:l.type,sdp:h})}function a(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const p=f._reverseStreams[d],_=f._streams[p.id];h=h.replace(new RegExp(p.id,"g"),_.id)}),new RTCSessionDescription({type:l.type,sdp:h})}["createOffer","createAnswer"].forEach(function(f){const l=n.RTCPeerConnection.prototype[f],h={[f](){const d=arguments;return arguments.length&&typeof arguments[0]=="function"?l.apply(this,[_=>{const x=s(this,_);d[0].apply(null,[x])},_=>{d[1]&&d[1].apply(null,_)},arguments[2]]):l.apply(this,arguments).then(_=>s(this,_))}};n.RTCPeerConnection.prototype[f]=h[f]});const o=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const f=c.get.apply(this);return f.type===""?f:s(this,f)}}),n.RTCPeerConnection.prototype.removeTrack=function(l){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!l._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(l._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(x=>l.track===x)&&(d=this._streams[p])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(l.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Ul(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function Kp(n,e){e.version>102||Yr(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const zd=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Kp,shimAddTrackRemoveTrack:Yp,shimAddTrackRemoveTrackWithNative:$p,shimGetSendersWithDtmf:jp,shimGetUserMedia:Vp,shimMediaStream:Wp,shimOnTrack:Xp,shimPeerConnection:Ul,shimSenderReceiverGetStats:qp},Symbol.toStringTag,{value:"Module"}));function Jp(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,a){Ef("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,a)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a.audio,"autoGainControl","mozAutoGainControl"),r(a.audio,"noiseSuppression","mozNoiseSuppression")),s(a)},i&&i.prototype.getSettings){const a=i.prototype.getSettings;i.prototype.getSettings=function(){const o=a.apply(this,arguments);return r(o,"mozAutoGainControl","autoGainControl"),r(o,"mozNoiseSuppression","noiseSuppression"),o}}if(i&&i.prototype.applyConstraints){const a=i.prototype.applyConstraints;i.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o,"autoGainControl","mozAutoGainControl"),r(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function bb(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Zp(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function kl(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function Qp(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!a)try{c.forEach(f=>{f.type=t[f.type]||f.type})}catch(f){if(f.name!=="TypeError")throw f;c.forEach((l,h)=>{c.set(h,Object.assign({},l,{type:t[l.type]||l.type}))})}return c}).then(a,o)}}function em(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function tm(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),Yr(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function nm(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Ef("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function im(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function rm(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const a=t.apply(this,arguments);if(s){const{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,o.sendEncodings=r,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function sm(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function om(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function am(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const Fd=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:rm,shimCreateAnswer:am,shimCreateOffer:om,shimGetDisplayMedia:bb,shimGetParameters:sm,shimGetStats:Qp,shimGetUserMedia:Jp,shimOnTrack:Zp,shimPeerConnection:kl,shimRTCDataChannel:im,shimReceiverGetStats:tm,shimRemoveStream:nm,shimSenderGetStats:em},Symbol.toStringTag,{value:"Module"}));function cm(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function lm(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const a=new Event("addstream");a.stream=s,i.dispatchEvent(a)})}),e.apply(i,arguments)}}}function fm(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,a=e.addIceCandidate;e.createOffer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d},e.createAnswer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d};let o=function(c,f,l){const h=r.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h};e.setLocalDescription=o,o=function(c,f,l){const h=s.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.setRemoteDescription=o,o=function(c,f,l){const h=a.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.addIceCandidate=o}function hm(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(dm(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}.bind(e))}function dm(n){return n&&n.video!==void 0?Object.assign({},n,{video:Gp(n.video)}):n}function um(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let a=0;a<i.iceServers.length;a++){let o=i.iceServers[a];o.urls===void 0&&o.url?(Ef("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,s.push(o)):s.push(i.iceServers[a])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function pm(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function mm(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio!="undefined"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo!="undefined"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(a=>a.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function gm(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Bd=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:gm,shimCallbacksAPI:fm,shimConstraints:dm,shimCreateOfferLegacy:mm,shimGetUserMedia:hm,shimLocalStreamsAPI:cm,shimRTCIceServerUrls:um,shimRemoteStreamsAPI:lm,shimTrackEventTransceiver:pm},Symbol.toStringTag,{value:"Module"}));function Eb(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _m={exports:{}};(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
`).map(i=>i.trim())},e.splitSections=function(t){return t.split(`
m=`).map((r,s)=>(s>0?"m="+r:r).trim()+`\r
`)},e.getDescription=function(t){const i=e.splitSections(t);return i&&i[0]},e.getMediaSections=function(t){const i=e.splitSections(t);return i.shift(),i},e.matchPrefix=function(t,i){return e.splitLines(t).filter(r=>r.indexOf(i)===0)},e.parseCandidate=function(t){let i;t.indexOf("a=candidate:")===0?i=t.substring(12).split(" "):i=t.substring(10).split(" ");const r={foundation:i[0],component:{1:"rtp",2:"rtcp"}[i[1]]||i[1],protocol:i[2].toLowerCase(),priority:parseInt(i[3],10),ip:i[4],address:i[4],port:parseInt(i[5],10),type:i[7]};for(let s=8;s<i.length;s+=2)switch(i[s]){case"raddr":r.relatedAddress=i[s+1];break;case"rport":r.relatedPort=parseInt(i[s+1],10);break;case"tcptype":r.tcpType=i[s+1];break;case"ufrag":r.ufrag=i[s+1],r.usernameFragment=i[s+1];break;default:r[i[s]]===void 0&&(r[i[s]]=i[s+1]);break}return r},e.writeCandidate=function(t){const i=[];i.push(t.foundation);const r=t.component;r==="rtp"?i.push(1):r==="rtcp"?i.push(2):i.push(r),i.push(t.protocol.toUpperCase()),i.push(t.priority),i.push(t.address||t.ip),i.push(t.port);const s=t.type;return i.push("typ"),i.push(s),s!=="host"&&t.relatedAddress&&t.relatedPort!==void 0&&(i.push("raddr"),i.push(t.relatedAddress),i.push("rport"),i.push(t.relatedPort)),t.tcpType&&t.protocol.toLowerCase()==="tcp"&&(i.push("tcptype"),i.push(t.tcpType)),(t.usernameFragment||t.ufrag)&&(i.push("ufrag"),i.push(t.usernameFragment||t.ufrag)),"candidate:"+i.join(" ")},e.parseIceOptions=function(t){return t.substring(14).split(" ")},e.parseRtpMap=function(t){let i=t.substring(9).split(" ");const r={payloadType:parseInt(i.shift(),10)};return i=i[0].split("/"),r.name=i[0],r.clockRate=parseInt(i[1],10),r.channels=i.length===3?parseInt(i[2],10):1,r.numChannels=r.channels,r},e.writeRtpMap=function(t){let i=t.payloadType;t.preferredPayloadType!==void 0&&(i=t.preferredPayloadType);const r=t.channels||t.numChannels||1;return"a=rtpmap:"+i+" "+t.name+"/"+t.clockRate+(r!==1?"/"+r:"")+`\r
`},e.parseExtmap=function(t){const i=t.substring(9).split(" ");return{id:parseInt(i[0],10),direction:i[0].indexOf("/")>0?i[0].split("/")[1]:"sendrecv",uri:i[1],attributes:i.slice(2).join(" ")}},e.writeExtmap=function(t){return"a=extmap:"+(t.id||t.preferredId)+(t.direction&&t.direction!=="sendrecv"?"/"+t.direction:"")+" "+t.uri+(t.attributes?" "+t.attributes:"")+`\r
`},e.parseFmtp=function(t){const i={};let r;const s=t.substring(t.indexOf(" ")+1).split(";");for(let a=0;a<s.length;a++)r=s[a].trim().split("="),i[r[0].trim()]=r[1];return i},e.writeFmtp=function(t){let i="",r=t.payloadType;if(t.preferredPayloadType!==void 0&&(r=t.preferredPayloadType),t.parameters&&Object.keys(t.parameters).length){const s=[];Object.keys(t.parameters).forEach(a=>{t.parameters[a]!==void 0?s.push(a+"="+t.parameters[a]):s.push(a)}),i+="a=fmtp:"+r+" "+s.join(";")+`\r
`}return i},e.parseRtcpFb=function(t){const i=t.substring(t.indexOf(" ")+1).split(" ");return{type:i.shift(),parameter:i.join(" ")}},e.writeRtcpFb=function(t){let i="",r=t.payloadType;return t.preferredPayloadType!==void 0&&(r=t.preferredPayloadType),t.rtcpFeedback&&t.rtcpFeedback.length&&t.rtcpFeedback.forEach(s=>{i+="a=rtcp-fb:"+r+" "+s.type+(s.parameter&&s.parameter.length?" "+s.parameter:"")+`\r
`}),i},e.parseSsrcMedia=function(t){const i=t.indexOf(" "),r={ssrc:parseInt(t.substring(7,i),10)},s=t.indexOf(":",i);return s>-1?(r.attribute=t.substring(i+1,s),r.value=t.substring(s+1)):r.attribute=t.substring(i+1),r},e.parseSsrcGroup=function(t){const i=t.substring(13).split(" ");return{semantics:i.shift(),ssrcs:i.map(r=>parseInt(r,10))}},e.getMid=function(t){const i=e.matchPrefix(t,"a=mid:")[0];if(i)return i.substring(6)},e.parseFingerprint=function(t){const i=t.substring(14).split(" ");return{algorithm:i[0].toLowerCase(),value:i[1].toUpperCase()}},e.getDtlsParameters=function(t,i){return{role:"auto",fingerprints:e.matchPrefix(t+i,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(t,i){let r="a=setup:"+i+`\r
`;return t.fingerprints.forEach(s=>{r+="a=fingerprint:"+s.algorithm+" "+s.value+`\r
`}),r},e.parseCryptoLine=function(t){const i=t.substring(9).split(" ");return{tag:parseInt(i[0],10),cryptoSuite:i[1],keyParams:i[2],sessionParams:i.slice(3)}},e.writeCryptoLine=function(t){return"a=crypto:"+t.tag+" "+t.cryptoSuite+" "+(typeof t.keyParams=="object"?e.writeCryptoKeyParams(t.keyParams):t.keyParams)+(t.sessionParams?" "+t.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(t){if(t.indexOf("inline:")!==0)return null;const i=t.substring(7).split("|");return{keyMethod:"inline",keySalt:i[0],lifeTime:i[1],mkiValue:i[2]?i[2].split(":")[0]:void 0,mkiLength:i[2]?i[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(t){return t.keyMethod+":"+t.keySalt+(t.lifeTime?"|"+t.lifeTime:"")+(t.mkiValue&&t.mkiLength?"|"+t.mkiValue+":"+t.mkiLength:"")},e.getCryptoParameters=function(t,i){return e.matchPrefix(t+i,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(t,i){const r=e.matchPrefix(t+i,"a=ice-ufrag:")[0],s=e.matchPrefix(t+i,"a=ice-pwd:")[0];return r&&s?{usernameFragment:r.substring(12),password:s.substring(10)}:null},e.writeIceParameters=function(t){let i="a=ice-ufrag:"+t.usernameFragment+`\r
a=ice-pwd:`+t.password+`\r
`;return t.iceLite&&(i+=`a=ice-lite\r
`),i},e.parseRtpParameters=function(t){const i={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},s=e.splitLines(t)[0].split(" ");i.profile=s[2];for(let o=3;o<s.length;o++){const c=s[o],f=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(f){const l=e.parseRtpMap(f),h=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(l.parameters=h.length?e.parseFmtp(h[0]):{},l.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),i.codecs.push(l),l.name.toUpperCase()){case"RED":case"ULPFEC":i.fecMechanisms.push(l.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(o=>{i.headerExtensions.push(e.parseExtmap(o))});const a=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return i.codecs.forEach(o=>{a.forEach(c=>{o.rtcpFeedback.find(l=>l.type===c.type&&l.parameter===c.parameter)||o.rtcpFeedback.push(c)})}),i},e.writeRtpDescription=function(t,i){let r="";r+="m="+t+" ",r+=i.codecs.length>0?"9":"0",r+=" "+(i.profile||"UDP/TLS/RTP/SAVPF")+" ",r+=i.codecs.map(a=>a.preferredPayloadType!==void 0?a.preferredPayloadType:a.payloadType).join(" ")+`\r
`,r+=`c=IN IP4 0.0.0.0\r
`,r+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,i.codecs.forEach(a=>{r+=e.writeRtpMap(a),r+=e.writeFmtp(a),r+=e.writeRtcpFb(a)});let s=0;return i.codecs.forEach(a=>{a.maxptime>s&&(s=a.maxptime)}),s>0&&(r+="a=maxptime:"+s+`\r
`),i.headerExtensions&&i.headerExtensions.forEach(a=>{r+=e.writeExtmap(a)}),r},e.parseRtpEncodingParameters=function(t){const i=[],r=e.parseRtpParameters(t),s=r.fecMechanisms.indexOf("RED")!==-1,a=r.fecMechanisms.indexOf("ULPFEC")!==-1,o=e.matchPrefix(t,"a=ssrc:").map(d=>e.parseSsrcMedia(d)).filter(d=>d.attribute==="cname"),c=o.length>0&&o[0].ssrc;let f;const l=e.matchPrefix(t,"a=ssrc-group:FID").map(d=>d.substring(17).split(" ").map(_=>parseInt(_,10)));l.length>0&&l[0].length>1&&l[0][0]===c&&(f=l[0][1]),r.codecs.forEach(d=>{if(d.name.toUpperCase()==="RTX"&&d.parameters.apt){let p={ssrc:c,codecPayloadType:parseInt(d.parameters.apt,10)};c&&f&&(p.rtx={ssrc:f}),i.push(p),s&&(p=JSON.parse(JSON.stringify(p)),p.fec={ssrc:c,mechanism:a?"red+ulpfec":"red"},i.push(p))}}),i.length===0&&c&&i.push({ssrc:c});let h=e.matchPrefix(t,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-50*40*8:h=void 0,i.forEach(d=>{d.maxBitrate=h})),i},e.parseRtcpParameters=function(t){const i={},r=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const a=e.matchPrefix(t,"a=rtcp-mux");return i.mux=a.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
`),t.mux&&(i+=`a=rtcp-mux\r
`),t.ssrc!==void 0&&t.cname&&(i+="a=ssrc:"+t.ssrc+" cname:"+t.cname+`\r
`),i},e.parseMsid=function(t){let i;const r=e.matchPrefix(t,"a=msid:");if(r.length===1)return i=r[0].substring(7).split(" "),{stream:i[0],track:i[1]};const s=e.matchPrefix(t,"a=ssrc:").map(a=>e.parseSsrcMedia(a)).filter(a=>a.attribute==="msid");if(s.length>0)return i=s[0].value.split(" "),{stream:i[0],track:i[1]}},e.parseSctpDescription=function(t){const i=e.parseMLine(t),r=e.matchPrefix(t,"a=max-message-size:");let s;r.length>0&&(s=parseInt(r[0].substring(19),10)),isNaN(s)&&(s=65536);const a=e.matchPrefix(t,"a=sctp-port:");if(a.length>0)return{port:parseInt(a[0].substring(12),10),protocol:i.fmt,maxMessageSize:s};const o=e.matchPrefix(t,"a=sctpmap:");if(o.length>0){const c=o[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:s}}},e.writeSctpDescription=function(t,i){let r=[];return t.protocol!=="DTLS/SCTP"?r=["m="+t.kind+" 9 "+t.protocol+" "+i.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+i.port+`\r
`]:r=["m="+t.kind+" 9 "+t.protocol+" "+i.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+i.port+" "+i.protocol+` 65535\r
`],i.maxMessageSize!==void 0&&r.push("a=max-message-size:"+i.maxMessageSize+`\r
`),r.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(t,i,r){let s;const a=i!==void 0?i:2;return t?s=t:s=e.generateSessionId(),`v=0\r
o=`+(r||"thisisadapterortc")+" "+s+" "+a+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(_m);var xm=_m.exports;const Os=Eb(xm),Tb=Bm({__proto__:null,default:Os},[xm]);function ya(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=Os.parseCandidate(i.candidate);for(const a in s)a in r||Object.defineProperty(r,a,{value:s[a]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Yr(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Nl(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Yr(n,"icecandidate",e=>{if(e.candidate){const t=Os.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Ma(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp}});const t=function(o){if(!o||!o.sdp)return!1;const c=Os.splitSections(o.sdp);return c.shift(),c.some(f=>{const l=Os.parseMLine(f);return l&&l.kind==="application"&&l.protocol.indexOf("SCTP")!==-1})},i=function(o){const c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const f=parseInt(c[1],10);return f!==f?-1:f},r=function(o){let c=65536;return e.browser==="firefox"&&(e.version<57?o===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(o,c){let f=65536;e.browser==="firefox"&&e.version===57&&(f=65535);const l=Os.matchPrefix(o.sdp,"a=max-message-size:");return l.length>0?f=parseInt(l[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(f=2147483637),f},a=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),f=r(c),l=s(arguments[0],c);let h;f===0&&l===0?h=Number.POSITIVE_INFINITY:f===0||l===0?h=Math.max(f,l):h=Math.min(f,l);const d={};Object.defineProperty(d,"maxMessageSize",{get(){return h}}),this._sctp=d}return a.apply(this,arguments)}}function Sa(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const a=r.send;r.send=function(){const c=arguments[0],f=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&f>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return a.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},Yr(n,"datachannel",r=>(t(r.channel,r.target),r))}function Ol(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const a=new Event("connectionstatechange",r);s.dispatchEvent(a)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function zl(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function ba(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Ea(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>t.apply(this,[a]))})}const Ab=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:zl,shimAddIceCandidateNullOrEmpty:ba,shimConnectionState:Ol,shimMaxMessageSize:Ma,shimParameterlessSetLocalDescription:Ea,shimRTCIceCandidate:ya,shimRTCIceCandidateRelayProtocol:Nl,shimSendThrowTypeError:Sa},Symbol.toStringTag,{value:"Module"}));function wb({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=bf,i=Sb(n),r={browserDetails:i,commonShim:Ab,extractVersion:mo,disableLog:yb,disableWarnings:Mb,sdp:Tb};switch(i.browser){case"chrome":if(!zd||!Ul||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=zd,ba(n,i),Ea(n),Vp(n,i),Wp(n),Ul(n,i),Xp(n,i),Yp(n,i),jp(n),qp(n,i),Kp(n,i),ya(n),Nl(n),Ol(n),Ma(n,i),Sa(n,i),zl(n,i);break;case"firefox":if(!Fd||!kl||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=Fd,ba(n,i),Ea(n),Jp(n,i),kl(n,i),Qp(n,i),Zp(n),nm(n),em(n),tm(n),im(n),rm(n,i),sm(n,i),om(n,i),am(n,i),ya(n),Ol(n),Ma(n,i),Sa(n,i);break;case"safari":if(!Bd||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Bd,ba(n,i),Ea(n),um(n),mm(n),fm(n),cm(n),lm(n),pm(n),hm(n),gm(n),ya(n),Nl(n),Ma(n,i),Sa(n,i),zl(n,i);break;default:t("Unsupported browser!");break}return r}const Hd=wb({window:typeof window=="undefined"?void 0:window});function Kr(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class vm{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,a=0;for(;a<i;){const o=Math.min(i,a+this.chunkedMTU),c=e.slice(a,o),f={__peerData:this._dataCount,n:s,data:c,total:r};t.push(f),a=o,s++}return this._dataCount++,t}}}function Cb(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const tl=Hd.default||Hd,ho=new class{isWebRTCSupported(){return typeof RTCPeerConnection!="undefined"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return tl.browserDetails.browser}getVersion(){return tl.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=tl.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator!="undefined"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Rb=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),ym=()=>Math.random().toString(36).slice(2),Gd={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class Pb extends vm{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Gd,this.browser=ho.getBrowser(),this.browserVersion=ho.getVersion(),this.pack=Fp,this.unpack=zp,this.supports=function(){const t={browser:ho.isBrowserSupported(),webRTC:ho.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(Gd),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!ho.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t}(),this.validateId=Rb,this.randomToken=ym}}const Cn=new Pb,Lb="PeerJS: ";var Vd;(function(n){n[n.Disabled=0]="Disabled",n[n.Errors=1]="Errors",n[n.Warnings=2]="Warnings",n[n.All=3]="All"})(Vd||(Vd={}));class Db{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[Lb,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var pe=new Db,Tf={},Ib=Object.prototype.hasOwnProperty,En="~";function Po(){}Object.create&&(Po.prototype=Object.create(null),new Po().__proto__||(En=!1));function Ub(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function Mm(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new Ub(t,i||n,r),a=En?En+e:e;return n._events[a]?n._events[a].fn?n._events[a]=[n._events[a],s]:n._events[a].push(s):(n._events[a]=s,n._eventsCount++),n}function Ta(n,e){--n._eventsCount===0?n._events=new Po:delete n._events[e]}function pn(){this._events=new Po,this._eventsCount=0}pn.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)Ib.call(t,i)&&e.push(En?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};pn.prototype.listeners=function(e){var t=En?En+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,a=new Array(s);r<s;r++)a[r]=i[r].fn;return a};pn.prototype.listenerCount=function(e){var t=En?En+e:e,i=this._events[t];return i?i.fn?1:i.length:0};pn.prototype.emit=function(e,t,i,r,s,a){var o=En?En+e:e;if(!this._events[o])return!1;var c=this._events[o],f=arguments.length,l,h;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,a),!0}for(h=1,l=new Array(f-1);h<f;h++)l[h-1]=arguments[h];c.fn.apply(c.context,l)}else{var d=c.length,p;for(h=0;h<d;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),f){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,t);break;case 3:c[h].fn.call(c[h].context,t,i);break;case 4:c[h].fn.call(c[h].context,t,i,r);break;default:if(!l)for(p=1,l=new Array(f-1);p<f;p++)l[p-1]=arguments[p];c[h].fn.apply(c[h].context,l)}}return!0};pn.prototype.on=function(e,t,i){return Mm(this,e,t,i,!1)};pn.prototype.once=function(e,t,i){return Mm(this,e,t,i,!0)};pn.prototype.removeListener=function(e,t,i,r){var s=En?En+e:e;if(!this._events[s])return this;if(!t)return Ta(this,s),this;var a=this._events[s];if(a.fn)a.fn===t&&(!r||a.once)&&(!i||a.context===i)&&Ta(this,s);else{for(var o=0,c=[],f=a.length;o<f;o++)(a[o].fn!==t||r&&!a[o].once||i&&a[o].context!==i)&&c.push(a[o]);c.length?this._events[s]=c.length===1?c[0]:c:Ta(this,s)}return this};pn.prototype.removeAllListeners=function(e){var t;return e?(t=En?En+e:e,this._events[t]&&Ta(this,t)):(this._events=new Po,this._eventsCount=0),this};pn.prototype.off=pn.prototype.removeListener;pn.prototype.addListener=pn.prototype.on;pn.prefixed=En;pn.EventEmitter=pn;Tf=pn;var Jr={};Kr(Jr,"ConnectionType",()=>wi);Kr(Jr,"PeerErrorType",()=>Dt);Kr(Jr,"BaseConnectionErrorType",()=>Lo);Kr(Jr,"DataConnectionErrorType",()=>Do);Kr(Jr,"SerializationType",()=>Ys);Kr(Jr,"SocketEventType",()=>Ti);Kr(Jr,"ServerMessageType",()=>Qt);var wi;(function(n){n.Data="data",n.Media="media"})(wi||(wi={}));var Dt;(function(n){n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc"})(Dt||(Dt={}));var Lo;(function(n){n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed"})(Lo||(Lo={}));var Do;(function(n){n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big"})(Do||(Do={}));var Ys;(function(n){n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw"})(Ys||(Ys={}));var Ti;(function(n){n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close"})(Ti||(Ti={}));var Qt;(function(n){n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE"})(Qt||(Qt={}));var Af={};Af=JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');class kb extends Tf.EventEmitter{constructor(e,t,i,r,s,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];const o=e?"wss://":"ws://";this._baseUrl=o+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Af.version),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),pe.log("Server message received:",s)}catch{pe.log("Invalid server message",r.data);return}this.emit(Ti.Message,s)},this._socket.onclose=r=>{this._disconnected||(pe.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(Ti.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){pe.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:Qt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Ti.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Sm{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===wi.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){pe.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;pe.log("Listening for ICE candidates."),e.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(pe.log(`Received ICE candidates for ${t}:`,a.candidate),s.socket.send({type:Qt.Candidate,payload:{candidate:a.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Lo.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Lo.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},pe.log("Listening for data channel"),e.ondatachannel=a=>{pe.log("Received data channel");const o=a.channel;s.getConnection(t,i)._initializeDataChannel(o)},pe.log("Listening for remote stream"),e.ontrack=a=>{pe.log("Received remote stream");const o=a.streams[0],c=s.getConnection(t,i);if(c.type===wi.Media){const f=c;this._addStreamToMediaConnection(o,f)}}}cleanup(){pe.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===wi.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:Qt.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Dt.WebRTC,r),pe.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(Dt.WebRTC,i),pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Qt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(Dt.WebRTC,r),pe.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(Dt.WebRTC,i),pe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;pe.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(a){r.emitError(Dt.WebRTC,a),pe.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(e){pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Dt.WebRTC,t),pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class bm extends Tf.EventEmitter{emitError(e,t){pe.error("Error:",t),this.emit("error",new Nb(`${e}`,t))}}class Nb extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class Em extends bm{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var Bl;const _o=class _o extends Em{get type(){return wi.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||_o.ID_PREFIX+Cn.randomToken(),this._negotiator=new Sm(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case Qt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Qt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};Bl=new WeakMap,no(_o,Bl,_o.ID_PREFIX="mc_");let Xa=_o;class Ob{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:a}=this._options,o=new URL(`${t}://${i}:${r}${s}${a}/${e}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",Af.version),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==Cn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===Cn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var Hl,Gl;const Ur=class Ur extends Em{get type(){return wi.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||Ur.ID_PREFIX+ym(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Sm(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Do.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case Qt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Qt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};Hl=new WeakMap,Gl=new WeakMap,no(Ur,Hl,Ur.ID_PREFIX="dc_"),no(Ur,Gl,Ur.MAX_BUFFERED_AMOUNT=8388608);let ja=Ur;class wf extends ja{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>ja.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class nl extends wf{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new vm,this.serialization=Ys.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=zp(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=Cb(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=Fp(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class zb extends wf{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Ys.None}}class Fb extends wf{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=Cn.chunkedMTU){this.emitError(Do.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Ys.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Vl;const xo=class xo extends bm{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:zb,json:Fb,binary:nl,"binary-utf8":nl,default:nl},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:Cn.CLOUD_HOST,port:Cn.CLOUD_PORT,path:"/",key:xo.DEFAULT_KEY,token:Cn.randomToken(),config:Cn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Cn.CLOUD_HOST?this._options.secure=Cn.isSecure():this._options.host==Cn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&pe.setLogFunction(this._options.logFunction),pe.logLevel=this._options.debug||0,this._api=new Ob(t),this._socket=this._createServerConnection(),!Cn.supports.audioVideo&&!Cn.supports.data){this._delayedAbort(Dt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Cn.validateId(i)){this._delayedAbort(Dt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(Dt.ServerError,r))}_createServerConnection(){const e=new kb(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Ti.Message,t=>{this._handleMessage(t)}),e.on(Ti.Error,t=>{this._abort(Dt.SocketError,t)}),e.on(Ti.Disconnected,()=>{this.disconnected||(this.emitError(Dt.Network,"Lost connection to server."),this.disconnect())}),e.on(Ti.Close,()=>{this.disconnected||this._abort(Dt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case Qt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Qt.Error:this._abort(Dt.ServerError,i.msg);break;case Qt.IdTaken:this._abort(Dt.UnavailableID,`ID "${this.id}" is taken`);break;case Qt.InvalidKey:this._abort(Dt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Qt.Leave:pe.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case Qt.Expire:this.emitError(Dt.PeerUnavailable,`Could not connect to peer ${r}`);break;case Qt.Offer:{const s=i.connectionId;let a=this.getConnection(r,s);if(a&&(a.close(),pe.warn(`Offer received for existing Connection ID:${s}`)),i.type===wi.Media){const c=new Xa(r,this,{connectionId:s,_payload:i,metadata:i.metadata});a=c,this._addConnection(r,a),this.emit("call",c)}else if(i.type===wi.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});a=c,this._addConnection(r,a),this.emit("connection",c)}else{pe.warn(`Received malformed connection type:${i.type}`);return}const o=this._getMessages(s);for(const c of o)a.handleMessage(c);break}default:{if(!i){pe.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,a=this.getConnection(r,s);a&&a.peerConnection?a.handleMessage(e):s?this._storeMessage(s,e):pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Dt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Dt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new Xa(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Dt.ServerError,t))}};Vl=new WeakMap,no(xo,Vl,xo.DEFAULT_KEY="peerjs");let qa=xo;const il="fourbanners-v1-",Wd="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function Bb(){let n="";for(let e=0;e<4;e++)n+=Wd[Math.floor(Math.random()*Wd.length)];return n}const Hb=()=>typeof window.RTCPeerConnection=="function"&&/^https?:$/.test(location.protocol),Xd=()=>Object.assign({debug:0},window.__PEER_OPTS||{});function jd(n,e){return new Promise((t,i)=>{if(typeof window.RTCPeerConnection!="function"){i({type:"no-webrtc"});return}const r=new Map,s=[],a=new Map,o=new Map;let c={},f=null,l=null,h=!1,d=0,p=null;const _=(O,P)=>{h||(h=!0,clearTimeout(x),O?t(P):i(P))},x=setTimeout(()=>{try{L.destroy()}catch{}_(!1,{type:"timeout"})},12e3),m=O=>O===f||performance.now()-(o.get(O)||0)<6e3,u=()=>[...r.entries()].filter(([O])=>m(O)).map(([O,P])=>({peer:O,sameTab:O===f,isMe:O===f,presence:P}));let v=null;const M=()=>{v=null;const O=u();for(const P of s)try{P({peers:O})}catch(U){console.error(U)}},S=()=>{v||(v=setTimeout(M,16))},C=O=>({role:O.role,nick:O.nick,want:O.want,ph:O.ph,fac:O.fac});function A(){d=performance.now(),p=null;const O={};for(const[P,U]of r)O[P]=P===f?U:C(U);for(const P of a.values())if(P.open)try{P.send({t:"all",all:O})}catch{}}function R(){if(p)return;const O=Math.max(0,250-(performance.now()-d));p=setTimeout(A,O)}const L=e?new qa(il+n,Xd()):new qa(Xd());L.on("open",O=>{if(f=O,r.set(O,c),e){_(!0,W);return}l=L.connect(il+n,{reliable:!0,serialization:"json"}),l.on("open",()=>{try{l.send({t:"p",pr:c})}catch{}_(!0,W)}),l.on("data",P=>{if(!(!P||typeof P!="object")){if(o.set(il+n,performance.now()),P.t==="full"){_(!1,{type:"full"});return}if(P.t==="all"&&P.all&&typeof P.all=="object"){for(const U of[...r.keys()])U!==f&&!(U in P.all)&&r.delete(U);for(const[U,V]of Object.entries(P.all))U!==f&&V&&typeof V=="object"&&(r.set(U,V),o.set(U,performance.now()));S()}else P.t==="h"&&typeof P.id=="string"&&P.pr&&typeof P.pr=="object"&&(r.set(P.id,P.pr),S())}}),l.on("close",()=>{for(const P of[...r.keys()])P!==f&&r.delete(P);S()}),l.on("error",()=>{})}),L.on("connection",O=>{if(!e){O.close();return}if(a.size>=7){O.on("open",()=>{try{O.send({t:"full"})}catch{}setTimeout(()=>O.close(),400)});return}a.set(O.peer,O),o.set(O.peer,performance.now()),O.on("open",()=>{A();try{O.send({t:"h",id:f,pr:c})}catch{}}),O.on("data",U=>{if(!U||U.t!=="p"||!U.pr||typeof U.pr!="object")return;o.set(O.peer,performance.now());const V=r.get(O.peer);r.set(O.peer,U.pr),S(),(!V||V.nick!==U.pr.nick||V.want!==U.pr.want||V.ph!==U.pr.ph||V.role!==U.pr.role||V.fac!==U.pr.fac)&&R()});const P=()=>{a.has(O.peer)&&(a.delete(O.peer),r.delete(O.peer),S(),R())};O.on("close",P),O.on("error",P)}),L.on("error",O=>{if(!h){try{L.destroy()}catch{}_(!1,O);return}if(O&&O.type==="peer-unavailable"&&!e){for(const P of[...r.keys()])P!==f&&r.delete(P);S()}}),L.on("disconnected",()=>{if(!L.destroyed)try{L.reconnect()}catch{}});let y=0;const b=()=>{if(y=performance.now(),e){for(const O of a.values())if(O.open)try{O.send({t:"h",id:f,pr:c})}catch{}}else if(l&&l.open)try{l.send({t:"p",pr:c})}catch{}},N=setInterval(()=>{if(L.destroyed){clearInterval(N);return}if(performance.now()-y>1500&&b(),e){for(const[O,P]of[...a])if(performance.now()-(o.get(O)||performance.now())>8e3){try{P.close()}catch{}a.delete(O),r.delete(O),S(),R()}}S()},1e3),W={name:n,presence:async O=>{for(const P in O)O[P]===null?delete c[P]:c[P]=O[P];r.set(f,c),b()},peers:u,onPeers:O=>(s.push(O),setTimeout(()=>O({peers:u()}),0),()=>{const P=s.indexOf(O);P>=0&&s.splice(P,1)}),leave:async()=>{clearInterval(N);try{L.destroy()}catch{}}}})}const Se=n=>document.getElementById(n);let Fr={startMatch(){},seedDemo(){},preset:()=>"ffa",resetSolo(){}};const $a=()=>{var n;return{role:"player",nick:ze.myNick||"Captain",ph:"lobby",want:(n=ze.NET.want)!=null?n:-1,fac:en.faction}};let Qi=!1;function Tm(){["ovTitle","ovLobby","ovEnd"].forEach(e=>Se(e).hidden=!0),Se("ovBrowse").hidden=!1,Se("nick").value=ze.myNick,Se("netNote").textContent="";const n=Hb();Se("hostBtn").disabled=!n,Se("joinBtn").disabled=!n,n||(Se("netNote").textContent=/^https?:$/.test(location.protocol)?"Multiplayer could not start in this browser. Open the game's website link in Safari or Chrome.":"Multiplayer only works when the game is opened from its website.")}function ma(){ze.myNick=(Se("nick").value||"").trim().slice(0,16);try{localStorage.setItem("fb-nick",ze.myNick)}catch{}}function Ya(){const n=ze.NET;g.state!=="lobby"&&Fr.seedDemo(),n.lobbySig=null,g.state="lobby",["ovTitle","ovBrowse","ovEnd"].forEach(e=>Se(e).hidden=!0),Se("hudWrap").hidden=!0,Se("ovLobby").hidden=!1,n.role==="host"?_r():n.room.presence($a()).catch(()=>{}),Ka()}function _r(){const n=ze.NET;if(!n||n.role!=="host")return;const e=n.room.peers(),t=new Set(e.map(a=>a.peer)),i=ac(n.room);if(i&&n.me!==i){const a=n.seats[n.me];delete n.seats[n.me],n.me=i,n.seats[i]=a===void 0?0:a}for(const a of Object.keys(n.seats))!t.has(a)&&a!==n.me&&delete n.seats[a];const r=n.lobby;for(const a of Object.keys(n.seats))n.seats[a]>=4&&!r.duo[Ae(n.seats[a])]&&delete n.seats[a];const s=()=>Object.values(n.seats);for(const a of e){if(a.sameTab)continue;const o=a.presence||{};if(o.role!=="player")continue;const c=o.want;if(typeof c=="number"&&c>=0&&c<8&&(c<4||r.duo[Ae(c)])){if(n.seats[a.peer]===c)continue;s().includes(c)||(n.seats[a.peer]=c)}else c===-1&&n.seats[a.peer]!==void 0&&delete n.seats[a.peer]}n.room.presence({role:"host",ph:"lobby",nick:ze.myNick||"Host",fac:en.faction,mode:r.mode,map:r.map,diff:r.diff,al:r.al.join(""),duo:r.duo.map(a=>a?1:0).join(""),seats:n.seats,s:null,m:null,res:null}).catch(()=>{}),Ka()}function Am(){const n=ze.NET;if(n.role==="host")return{mode:n.lobby.mode,map:n.lobby.map,diff:n.lobby.diff,al:n.lobby.al,duo:n.lobby.duo,seats:n.seats,hostNick:ze.myNick||"Host"};const e=n.room.peers().find(i=>i.presence&&i.presence.role==="host");if(!e)return null;n.hostPeer=e.peer;const t=e.presence;return{mode:t.mode,map:t.map,diff:t.diff,al:String(t.al||"0123").split("").map(Number),duo:String(t.duo||"0000").split("").map(i=>i==="1"),seats:t.seats||{},hostNick:t.nick,ph:t.ph,hostP:e}}function Ka(){const n=ze.NET;if(!n||Se("ovLobby").hidden)return;const e=Am(),t=n.role==="host";if(!e){Se("lobbyStatus").textContent="Connecting to the host…",Se("codeTxt").textContent=n.name||"",Se("seats").innerHTML="",n.lobbySig=null;return}Se("lobbyTitle").textContent=t?"Your battle":`${String(e.hostNick||"Host").slice(0,16)}'s battle`,Se("codeTxt").textContent=n.name||"",Se("copyBtn").hidden=!t;const i=n.room.peers(),r=u=>{const v=i.find(M=>M.peer===u);return v&&v.presence&&v.presence.nick?String(v.presence.nick).slice(0,16):"Player"},s=u=>{const v=i.find(S=>S.peer===u),M=v&&v.presence&&v.presence.fac;return zs[M]?zs[M].name:""},a=ac(n.room),o=u=>Object.keys(e.seats).find(v=>e.seats[v]===u),c=JSON.stringify([a,e.mode,e.map,e.diff,e.al,e.duo,e.seats,e.hostNick,i.map(u=>[u.peer,u.presence&&u.presence.nick,u.presence&&u.presence.role,u.presence&&u.presence.fac])]);if(c===n.lobbySig)return;n.lobbySig=c;const f=Se("seats");f.innerHTML="";const l=(u,v,M)=>{const S=o(u),C=document.createElement("button");C.type="button",C.className="seat"+(M?" slot2":"")+(S===a?" mine":"")+(S&&S!==a?" taken":""),C.style.background=v.css;const A=document.createElement("b");A.textContent=M||v.name;const R=document.createElement("span");if(R.textContent=S?(S===a?"You":r(S))+(i.find(L=>L.peer===S&&L.presence&&L.presence.role==="host")?" · host":""):"Computer",C.append(A,R),S&&s(S)){const L=document.createElement("small");L.textContent=s(S),C.appendChild(L)}return C.addEventListener("click",()=>{S&&S!==a||(t?S||(n.seats[a]=u,_r()):(n.want=S===a?-1:u,n.room.presence($a()).catch(()=>{})))}),C};de.forEach((u,v)=>{const M=document.createElement("div");M.className="seatcol";const S=l(v,u,null),C=document.createElement("span");C.className="alchip",C.setAttribute("role","button"),C.textContent="Team "+Jd[e.al[v]],t&&(C.tabIndex=0,C.addEventListener("click",R=>{R.stopPropagation(),n.lobby.al[v]=(n.lobby.al[v]+1)%4,_r()})),S.appendChild(C);const A=document.createElement("span");A.className="duotog"+(e.duo[v]?" on":""),A.setAttribute("role","button"),A.textContent="Duo",t?(A.tabIndex=0,A.addEventListener("click",R=>{R.stopPropagation(),n.lobby.duo[v]=!n.lobby.duo[v],_r()})):A.setAttribute("disabled",""),S.appendChild(A),M.appendChild(S),e.duo[v]&&M.appendChild(l(v+4,u,"Co-captain")),f.appendChild(M)});const h=(u,v,M)=>{const S=Se(u);S.classList.toggle("ro",M),S.querySelectorAll("button").forEach(C=>C.setAttribute("aria-pressed",String(C.dataset.v===String(v))))},d=t?n.seats[n.me]:e.seats[n.hostPeer],p=u=>Object.keys(Gm).find(v=>Co(v,Ae(d!=null?d:0)).join("")===u.join(""))||"";h("lobbyFaction",en.faction,!1),h("lobbyTeams",p(e.al),!t),h("lobbyMode",e.mode,!t),h("lobbyMap",e.map,!t),h("lobbyDiff",e.diff,!t),Se("startBtn").hidden=!t;const _=new Set(e.al).size,x=Object.keys(e.seats).length;Se("startBtn").disabled=_<2;const m=e.seats[a];Se("lobbyStatus").textContent=t?_<2?"Everyone is on one team. Split the teams to start.":x<2?"Share the code. Friends open this page, tap Play with friends and enter it.":`${x} players · computer plays the rest`:m===void 0?"Tap a color to take it":`You are ${de[Ae(m)].name}${qm(m)?"'s co-captain":""}. Waiting for the host to start…`}async function lc(n){xf();const e=ze.NET;if(ze.NET=null,e){try{e.unsub&&e.unsub()}catch{}try{await e.room.leave()}catch{}}Fr.resetSolo(),g.state="title",Se("hudWrap").hidden=!0,["ovLobby","ovEnd","ovBrowse"].forEach(t=>Se(t).hidden=!0),Fr.seedDemo(),n?(Tm(),Se("netNote").textContent=n):Se("ovTitle").hidden=!1}function Gb(){const n=ze.NET;if(!n||n.role!=="client")return;const e=Am();if(!e){n.hostGoneAt||(n.hostGoneAt=performance.now()),performance.now()-n.hostGoneAt>6e3&&lc("That battle is no longer open.");return}if(n.hostGoneAt=0,e.ph==="play"&&e.hostP.presence.seed){const t=e.seats[ac(n.room)];if(t===void 0){n.toldLate||(n.toldLate=!0,Se("lobbyStatus").textContent="The battle started without you. Wait here for the next one.");return}n.toldLate=!1,g.state==="lobby"&&(g.myTi=t,fb(e.hostP.presence))}}function Vb(n){Fr=Object.assign(Fr,n),Se("nick").addEventListener("change",ma),Se("browseBack").addEventListener("click",()=>{ma(),Se("ovBrowse").hidden=!0,Se("ovTitle").hidden=!1}),Se("mpBtn").addEventListener("click",()=>{dr(),Tm()}),Se("codeIn").addEventListener("input",t=>{t.target.value=t.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")}),Se("codeIn").addEventListener("keydown",t=>{t.key==="Enter"&&Se("joinBtn").click()}),Se("copyBtn").addEventListener("click",()=>{const t=ze.NET&&ze.NET.name;if(!t)return;const i=()=>{Se("copyBtn").textContent="Copied",setTimeout(()=>Se("copyBtn").textContent="Copy",1500)};try{navigator.clipboard.writeText(t).then(i,()=>{})}catch{}}),Se("hostBtn").addEventListener("click",async()=>{if(Qi)return;Qi=!0,ma(),Se("netNote").textContent="Opening a battle…";let t=null,i=null;for(let a=0;a<4&&!t;a++){i=Bb();try{t=await jd(i,!0)}catch(o){if(!(o&&o.type==="unavailable-id")){Se("netNote").textContent="Could not reach the multiplayer server. Check your connection and try again.",Qi=!1;return}}}if(Qi=!1,!t){Se("netNote").textContent="Could not open a battle. Try again.";return}Se("netNote").textContent="";const r=ze.NET={role:"host",room:t,name:i,seats:{},msgs:[],msgN:0,snapN:0,inp:{},lobby:{mode:g.mode,map:g.map.id,diff:g.diff,al:Co(Fr.preset(),en.color),duo:[!1,!1,!1,!1]}},s=ac(t)||"me";r.me=s,r.seats[s]=en.color,g.myTi=en.color,g.role="host",r.unsub=t.onPeers(()=>{g.state==="lobby"&&_r()}),Ya()}),Se("joinBtn").addEventListener("click",async()=>{const t=(Se("codeIn").value||"").trim().toUpperCase();if(t.length!==4){Se("netNote").textContent="Battle codes are 4 letters or numbers.";return}if(Qi)return;Qi=!0,ma(),Se("netNote").textContent=`Joining ${t}…`;let i;try{i=await jd(t,!1)}catch(s){Qi=!1;const a=s&&s.type;Se("netNote").textContent=a==="peer-unavailable"?`No battle found with code ${t}. Check the code with your host.`:a==="full"?"That battle already has eight players.":"Could not connect. Check your internet connection and try again.";return}Qi=!1,Se("netNote").textContent="";const r=ze.NET={role:"client",room:i,name:t,seats:{},hostPeer:null};g.role="client",r.unsub=i.onPeers(()=>{g.state==="lobby"&&Ka()}),i.presence($a()).catch(()=>{}),Ya()});const e=(t,i)=>Se(t).addEventListener("click",r=>{var o;const s=r.target.closest("button"),a=ze.NET;!s||!a||a.role!=="host"||(i==="al"?a.lobby.al=Co(s.dataset.v,Ae((o=a.seats[a.me])!=null?o:0)):i==="diff"?a.lobby.diff=+s.dataset.v:a.lobby[i]=s.dataset.v,_r())});Se("lobbyFaction").addEventListener("click",t=>{const i=t.target.closest("button"),r=ze.NET;!i||!r||(en.faction=i.dataset.v,en.save(),r.role==="host"?_r():(r.lobbySig=null,r.room.presence($a()).catch(()=>{}),Ka()))}),e("lobbyTeams","al"),e("lobbyMode","mode"),e("lobbyMap","map"),e("lobbyDiff","diff"),Se("startBtn").addEventListener("click",()=>{var c;const t=ze.NET;if(!t||t.role!=="host")return;dr();const i=t.lobby;g.mode=i.mode,g.map=Ja[i.map],g.diff=i.diff,g.ALLY=[...i.al],g.myTi=(c=t.seats[t.me])!=null?c:0,g.seed=Math.random()*1e9|0,t.msgs=[],t.msgN=0,t.inp={},t.snapN=0;const r=[0,0,0,0,0,0,0,0],s=[null,null,null,null],a=t.room.peers(),o=[1,1,1,1,...i.duo.map(f=>f?1:0)];for(const[f,l]of Object.entries(t.seats)){r[l]=1;const h=(a.find(d=>d.peer===f)||{}).presence||{};s[Ae(l)]=f===t.me?en.faction:zs[h.fac]?h.fac:null}g.factions=Mf(s,g.seed),Fr.startMatch(r,o),cc()}),Se("leaveBtn").addEventListener("click",()=>lc())}const At=n=>document.getElementById(n);{const n=At("nojs");n&&n.remove()}document.addEventListener("pointerdown",n=>{n.target.closest&&n.target.closest(".overlay button, .overlay .seat, .overlay .duotog, .overlay .alchip")&&It.uiClick()},!0);document.addEventListener("gesturestart",n=>n.preventDefault());document.addEventListener("gesturechange",n=>n.preventDefault());let qd=0;document.addEventListener("touchend",n=>{const e=Date.now();e-qd<300&&!(n.target.closest&&n.target.closest("input"))&&n.preventDefault(),qd=e},{passive:!1});const Wb=new URLSearchParams(location.search);Wb.get("stress")==="1"&&(g.fullSquads=!0);let Cf="ffa";Tt.on("msg",n=>Us(n.k,n.a));Tt.on("spark",n=>PS(n.x,n.y,n.z,n.c,n.n));Tt.on("splat",n=>{zS(n.x,n.z,n.s,n.ti),LS(n.x,n.z)});Tt.on("float",n=>Ds(n.x,n.y,n.z,n.text,n.color));Tt.on("sfx",n=>{const e=It[n.name];e&&e(n.x,n.z)});Tt.on("shake",n=>{ct.shake=n});Tt.on("buzz",n=>ws(n));Tt.on("hint",n=>{const e=g.player;e&&wn("mhint",2500)&&Ds(e.x,e.y+3.4,e.z,n,"#fff")});Tt.on("respawnMe",n=>{ct.yaw=n.face});Tt.on("hud",()=>{g.state==="play"&&yf(te.lastSnapAt)});Tt.on("hostEnd",n=>Br(n[0],n[1]));Tt.on("end",({w:n,why:e})=>{kp(),wo(!1),ks(!1),yf(te.lastSnapAt),xf();const t=g.ALLY[Ae(g.myTi)],i=n<0?"draw":n===t?"win":"lose",r=i==="win"?"Victory":i==="draw"?"Draw":"Defeat";i==="win"?(It.horn(),ir("Victory!","","#ffcf3a")):ir(r,"",i==="draw"?"#fff":"#e0352b"),At("endTitle").innerHTML=`<span>${r}</span>`,At("endText").textContent=`${Wr[g.mode].name} on ${g.map.name}. ${Xb(n,e)}`,At("sKills").textContent=g.kills,At("sSquad").textContent=g.recruited,At("sTime").textContent=vf(g.T);const s=zr(),a=bi();At("againBtn").hidden=a,At("againBtn").textContent=s?"Back to lobby":"Fight again",At("menuBtn").textContent=ze.NET?"Leave":"Menu",At("endNote").textContent=a?"Waiting for the host to start the next battle…":"",s&&cc(),setTimeout(()=>{g.state==="end"&&(At("ovEnd").hidden=!1)},1600)});function Xb(n,e){if(n<0)return"Time ran out with no clear winner.";const t=tb(n),i=t.indexOf("&")<0;return e==="castles"?`${t} tore down every enemy castle.`:e==="tickets"?`${t} ${i?"is":"are"} the last side with tickets.`:e==="caps"?`${t} carried the banner home ${Mo} times.`:`Time is up and ${t} ${i?"leads":"lead"}.`}function wm(){mp(g.layout),Pp(),Tp(),QS(),eb(),wo(!1),ks(!1),Dm.reset(),ZS(g.map.id)}function Cm(n,e){ze.NET||(g.role="solo"),og(n,e),ct.yaw=g.player.face,ct.pitch=.32,wm(),It.horn()}ob({onMatchStart:wm,onAbort:n=>lc(n),onLobby:()=>Ya()});Vb({startMatch:Cm,seedDemo:eo,preset:()=>Cf,resetSolo:()=>Fo()});ib(Sf);let ga=0,Aa=null;function eo(){g.layout=ql(g.map.id,!1,7),$l(g.layout),g.units=[],g.horses=[],g.arrows=[],g.flag=null,g.player=null,g.uid=0,g.teams=Kl([0,0,0,0]),g.factions=Mf(de.map((i,r)=>r===g.myTi?en.faction:null),7),mp(g.layout),Pp(),Tp();const n=["foot","foot","arch","foot","arch"];de.forEach((i,r)=>n.forEach((s,a)=>{const[o,c]=xr(i,(a-2)*1.5),f=Hs(r,o*.5,c*.5,s);f.face=Math.atan2(-f.x,-f.z),f.demo=!0}));const e=Hs(g.myTi,0,22,"captain");e.demo=!0;const t={id:1,x:0,z:22,face:0,state:"ridden",rider:e,t:0,spd:9,ti:g.myTi};g.horses.push(t),e.mounted=!0,e.horse=t,Aa=e}function $d(n){if(ga+=n,Aa&&Aa.horse){const e=ga*.35,t=Aa;t.x=Math.cos(e)*22,t.z=Math.sin(e)*22,t.y=Rt(t.x,t.z),t.face=Math.atan2(-Math.sin(e),Math.cos(e)),t.vx=-Math.sin(e)*8,t.vz=Math.cos(e)*8;const i=t.horse;i.x=t.x,i.z=t.z,i.face=t.face,i.spd=8}bp(g.units,n),Ep(g.horses.map(e=>({key:e.id,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:e.spd,state:e.state,t:e.t,fall:e.fall})),n),Rp(),_p(n,()=>{}),WS(ga),pp(0,0,ga),Hn.render(Ot,Mt),Ip()}function Zr(n,e){At(n).addEventListener("click",t=>{const i=t.target.closest("button");i&&(At(n).querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed",r===i?"true":"false")),e(i.dataset.v))})}function zo(){const n=sb(g.ALLY,g.myTi);At("desc").innerHTML=`<strong>${Wr[g.mode].name}.</strong> ${Wr[g.mode].desc}<br><strong>${g.map.name}.</strong> ${g.map.desc} <strong>Teams:</strong> ${n}`}function Rm(){const n=lp[ht.level].name;At("qualityNote").textContent=ht.stepped?`Lowered to ${n} to keep the game smooth.`:ht.setting==="auto"?`Auto picked ${n} for this device.`:"",At("segQuality").querySelectorAll("button").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.v===ht.setting)))}Zr("segMode",n=>{g.mode=n,zo()});Zr("segMap",n=>{g.map=Ja[n],zo(),eo()});Zr("segTeams",n=>{Cf=n,g.ALLY=Co(n,g.myTi),zo()});Zr("segFaction",n=>{en.faction=n,en.save(),eo()});Zr("segColor",n=>{en.color=+n,en.save(),Fo(),zo(),eo()});const wa=[!1,!1,!1,!1];At("segDuo").querySelectorAll("button").forEach((n,e)=>{n.addEventListener("click",()=>{wa[e]=!wa[e],n.setAttribute("aria-pressed",String(wa[e]))})});function Fo(){g.role="solo",g.myTi=en.color,g.ALLY=Co(Cf,g.myTi)}function Pm(){dr(),ze.NET=null,Fo(),g.seed=Math.random()*1e9|0,g.factions=Mf(de.map((e,t)=>t===g.myTi?en.faction:null),g.seed);const n=[1,1,1,1,...wa.map(e=>e?1:0)];Cm(de.map((e,t)=>t===g.myTi?1:0),n)}const Lm=(n,e)=>At(n).querySelectorAll("button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.v===String(e))));Zr("segDiff",n=>{g.diff=+n});Zr("segQuality",n=>{n!==ht.setting&&(VM(n),location.reload())});At("goBtn").addEventListener("click",Pm);At("againBtn").addEventListener("click",()=>{if(dr(),zr()){Ya();return}Pm()});At("menuBtn").addEventListener("click",()=>{if(ze.NET){lc();return}g.state="title",Fo(),At("ovEnd").hidden=!0,At("hudWrap").hidden=!0,At("ovTitle").hidden=!1,eo()});const Dm={t:0,frames:0,steps:0,reset(){this.t=0,this.frames=0},tick(n){if(ht.setting!=="auto"||this.steps>=2||this.t>8||(this.t+=n,this.frames++,this.t<8))return;this.frames/this.t<30&&XM()&&(this.steps++,dp(),hp(),Rf(),Rm(),this.reset())}};function rl(n){bp(g.units,n);const e=bi()?pb():g.horses.map(i=>({key:i.id,ti:i.ti,x:i.x,z:i.z,face:i.face,spd:i.spd,state:i.state,t:i.t,fall:i.fall}));Ep(e,n),_p(n,DS),BS(n),Rp(),VS(n),HS(g.player,hu(g.myTi),vd());const t=Lp();pp(t?t.x:0,t?t.z:0,vd()),Hn.render(Ot,Mt),qS({joy:ft.joy,nickFor:jb})}function jb(n){const e=ze.NET;if(!e)return null;const t=e.room.peers(),i=e.role==="host"?e.seats:((t.find(a=>a.peer===e.hostPeer)||{}).presence||{}).seats||{},r=Object.keys(i).find(a=>i[a]===n);if(!r)return null;const s=t.find(a=>a.peer===r);return s&&s.presence&&s.presence.nick?String(s.presence.nick).slice(0,16):null}let sl=0,Yd=performance.now(),Fl=60;function Im(n){const e=(n-Yd)/1e3,t=Math.min(.05,e);Yd=n,e>0&&(Fl+=(1/e-Fl)*.05);try{if(bi()&&(g.state==="play"||g.state==="end"))ub(t)&&(g.state==="play"||g.state==="end")?rl(t):$d(t);else if(g.state==="play")zr()&&lb(),Cu(t,Np(t)),zr()&&g.state==="play"&&cb(),rl(t),Dm.tick(e);else if(g.state==="end"){for(const i of g.units)i.dead&&of(i,t);rl(t),zr()&&n-(ze.NET.lastSend||0)>500&&cc(!0)}else $d(t),g.state==="lobby"&&(bi()?Gb():zr()&&n-(ze.NET.lastLobby||0)>700&&(ze.NET.lastLobby=n,_r()));g.state==="play"&&(sl-=t,sl<=0&&(sl=.1,yf(te.lastSnapAt)))}catch(i){console.error(i)}requestAnimationFrame(Im)}const Kd=n=>Math.round(n*10)/10;window.__fb={end(){Br(g.ALLY[Ae(g.myTi)],"time")},get info(){const n=ze.NET,e=g.player;return{state:g.state,T:Math.round(g.T),MODE:g.mode,map:g.map.id,myTi:g.myTi,al:g.ALLY.join(""),units:g.units.length,horses:g.horses.length,arrows:g.arrows.length,net:n&&{role:n.role,seats:n.seats,size:n.lastSize,hostPeer:n.hostPeer},teams:g.teams.map(t=>({p:Math.round(t.points),t:t.tickets,c:t.caps,g:Math.round(t.gold),alive:t.alive,h:t.human?1:0,plan:t.plan&&t.plan.kind,lead:t.leader&&{m:t.leader.mounted,dead:t.leader.dead}})),kinds:["foot","arch"].map(t=>g.units.filter(i=>!i.dead&&i.kind===t).length),flag:g.flag&&{s:g.flag.state},player:e&&{x:Kd(e.x),z:Kd(e.z),hp:Math.round(e.hp),mounted:e.mounted,dead:e.dead,id:e.id},gfx:{level:ht.level,setting:ht.setting,fps:Math.round(Fl),calls:Hn.info.render.calls,tris:Hn.info.render.triangles,batches:yS()}}},step(n,e=1/30){for(let t=0;t<n&&g.state==="play";t++)Cu(e,null)},ride(){g.player&&(g.player.lastHit=-9,Sf.ride())},G:g,cam:ct};function Rf(){YM(),jS()}addEventListener("resize",Rf);Lm("segFaction",en.faction);Lm("segColor",en.color);Fo();dp();Rf();zo();Rm();eo();requestAnimationFrame(Im);
