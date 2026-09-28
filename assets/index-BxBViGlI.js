var O0=n=>{throw TypeError(n)};var vo=(n,e,t)=>e.has(n)?O0("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function F0(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const he=[{name:"Blue",hex:3824880,css:"#3a5cf0",pos:[-56,56]},{name:"Red",hex:14693675,css:"#e0352b",pos:[56,-56]},{name:"Green",hex:3129158,css:"#2fbf46",pos:[-56,-56]},{name:"Yellow",hex:15778841,css:"#f0c419",pos:[56,56]}],Zs={roman:{name:"Romans",code:"r"},greek:{name:"Greeks",code:"g"},barbarian:{name:"Barbarians",code:"b"}},Il=["roman","greek","barbarian"],B0=n=>Il.find(e=>Zs[e].code===n)||"roman",H0={ffa:[0,1,2,3],"2v2":[0,1,1,0],"2v1v1":[0,1,2,0],"3v1":[0,1,0,0]},Nu=["A","B","C","D"],ns={conquest:{name:"Conquest",time:600,title:"Castle Strength",desc:"Knock down every enemy castle. A castle only takes damage from fighters on foot."},dm:{name:"Deathmatch",time:480,title:"Tickets",desc:"Each team has 250 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold."},ctf:{name:"Capture the Fort",time:600,title:"Captures",desc:"A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins."},ctrl:{name:"Control",time:600,title:"Control Score",desc:"Five points are scattered across the map. Whoever has the most soldiers on a point owns it, and every point you hold adds to your score each second. Allies pool their score; first alliance to 450 wins."}},yr={captureTime:5,rate:1,win:450,radius:5},yc={forum:{id:"forum",name:"Forum",desc:"A Roman city. Streets between the houses funnel every army, and four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.",sky:14472902,fog:[70,200],g1:14273972,g2:13154716,g3:11904388,hill:9075814,rock:10195844},colosseum:{id:"colosseum",name:"Colosseum",desc:"An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.",sky:14472902,fog:[80,220],g1:14467214,g2:13479544,g3:12098154,hill:9075814,rock:10195844},desert:{id:"desert",name:"Desert Fort",desc:"A walled fortress on a plateau in the middle of the sands. Four ramps lead up through its gates; hold them and you hold the high ground.",sky:15128248,fog:[70,230],g1:14859650,g2:13804648,g3:12160860,hill:10254928,rock:10848872},wooden:{id:"wooden",name:"Wooden Fort",desc:"Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.",sky:13622752,fog:[60,210],g1:8364106,g2:7113282,g3:6123328,hill:5990997,rock:9080198},valley:{id:"valley",name:"Grass Valley",desc:"Open fields and gentle hills. A ring of rocky outcrops guards the middle with eight passes. Horses shine here; archers need the rocks for cover.",sky:13622752,fog:[60,220],g1:9088336,g2:7772223,g3:6123328,hill:5990997,rock:9408390},dunes:{id:"dunes",name:"Dune Field",desc:"Open sand and scattered fences. Straight fights.",sky:14472902,fog:[70,190],g1:13216120,g2:12096874,g3:11045474,hill:7234136,rock:9273716},river:{id:"river",name:"River Ford",desc:"A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.",sky:13622752,fog:[70,190],g1:8362572,g2:7113282,g3:6123328,hill:5990997,rock:9080198},forest:{id:"forest",name:"Pine Forest",desc:"Dense pine clusters. Trees stop arrows and hide ambushes.",sky:12175536,fog:[34,120],g1:5600058,g2:6455359,g3:4479023,hill:4082740,rock:8027248},frost:{id:"frost",name:"Frost Hill",desc:"A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.",sky:15002866,fog:[60,170],g1:15660022,g2:14147816,g3:12109006,hill:10135218,rock:9344668}},zu=["captain","foot","arch"],dn={captain:{hp:150,dmg:22,reach:1.3,cd:.6,spd:5.4,r:.62,block:.3},foot:{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,cost:40,name:"Footman"},arch:{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,cost:50,name:"Archer",range:22,shoot:2.3,arrow:10,jitter:.8}},Dl={dmg:30,spd:6.3},Ou=["foot","arch"],Fu=[{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,javelin:!1,name:"Footman"},{hp:105,dmg:15,reach:2.1,cd:1,spd:5.2,r:.55,block:.4,javelin:!0,name:"Footman (Arms)"},{hp:130,dmg:16,reach:2.1,cd:1,spd:5,r:.55,block:.45,javelin:!0,name:"Footman (Armor)"}],Bu=[{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,range:22,shoot:2.3,arrow:10,jitter:.8,name:"Archer"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:23,shoot:2.1,arrow:11,jitter:.7,name:"Archer (Training)"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:29,shoot:2,arrow:12,jitter:.45,name:"Archer (Marksman)"}],Hu=[{hpB:0,dmgB:0,reachB:0,javelin:!1},{hpB:15,dmgB:4,reachB:.3,javelin:!0},{hpB:35,dmgB:7,reachB:.3,javelin:!0}],Mc={dmg:24,range:10,cd:6.5},G0={cd:9},Us=["sword","spear","jav"],Gu={sword:"Sword",spear:"Spear",jav:"Javelins"},fo={sword:{cd:.36,finisherCd:.62,window:.85,mult:1,finisherMult:1.5,aim:3.6},spear:{cd:.66,reachB:1.1,mult:1.15,pierce:.7,aim:4.6},jav:{cd:.5,dmg:30,range:16,ammo:3,regen:4},jump:{v:7.6,g:22,cd:.3},leap:{mult:1.4,range:3,arc:1.3,stun:.6,cd:.7}},Ii=[{name:"Recruit",xp:0},{name:"Legionary",xp:150},{name:"Veteran",xp:400},{name:"Centurion",xp:800},{name:"Tribune",xp:1400},{name:"Legate",xp:2200},{name:"General",xp:3200},{name:"Warlord",xp:4500}],Kr=[{name:"Gold",hex:16764730,css:"#ffcf3a"},{name:"Silver",hex:14212579,css:"#d8dde3"},{name:"Crimson",hex:12592685,css:"#c0262d"},{name:"Obsidian",hex:2763312,css:"#2a2a30"},{name:"Royal",hex:6963125,css:"#6a3fb5"},{name:"Ivory",hex:16052193,css:"#f4efe1"},{name:"Emerald",hex:3122010,css:"#2fa35a"},{name:"Flame",hex:16738842,css:"#ff6a1a"}],hs={base:25,perKill:4,maxKills:40,win:75,draw:35,diffMult:[.75,1,1.35]},Vu=[{name:"Recruit",dmg:.7,income:8},{name:"Soldier",dmg:1,income:10},{name:"Warlord",dmg:1.25,income:12}],kl={humanIncome:10,startGold:60,aiRecruitEvery:[1.5,3]},V0=["foot","foot","foot","foot","foot","foot","foot","arch","arch","arch"],W0=["foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","arch","arch","arch","arch","arch","arch"],Lo=["follow","hold","charge","shieldwall"],Ya={follow:"Follow me!",hold:"Hold here!",charge:"Charge!",shieldwall:"Shieldwall!"},Ei=[{id:"foot1",name:"Arms",desc:"Footmen: spear + javelin throw, better sword & shield",cost:[90]},{id:"foot2",name:"Armor",desc:"Footmen: heavier armor, more HP",cost:[160]},{id:"arch1",name:"Training",desc:"Archers: all-round stat increase",cost:[90]},{id:"arch2",name:"Marksman",desc:"Archers: +range, +accuracy",cost:[160]},{id:"aura",name:"Aura",desc:"Bigger, stronger aura",cost:[80,140,220]},{id:"horse",name:"Horse",desc:"Tougher, faster, back sooner",cost:[80,140,220]}],Ka={range:8,perRange:3,bonus:.1,perBonus:.05},Fo=9.5,fr=11,j0=120,X0=20,Wu=250,Bo=3,aa=88,m={role:"solo",state:"title",mode:"conquest",map:yc.forum,diff:1,preset:"ffa",ALLY:[0,1,2,3],myTi:0,factions:["roman","roman","roman","roman"],seed:1,T:0,units:[],horses:[],arrows:[],teams:[],flag:null,bounty:-1,player:null,layout:null,kills:0,recruited:0,uid:0,arrowN:0,horseN:0,endInfo:null,squadCap:20,duo:[!1,!1,!1,!1]},Se=n=>n%4,$0=n=>n<4?0:1,vf=()=>{const n=[0,1,2,3];for(let e=0;e<4;e++)m.duo[e]&&n.push(e+4);return n},li=(n,e)=>m.ALLY[Se(n)]!==m.ALLY[Se(e)],In=(n,e)=>m.ALLY[Se(n.ti)]!==m.ALLY[Se(e.ti)],yf=()=>new Set(m.ALLY).size===4,Bc={},pt={on(n,e){(Bc[n]||(Bc[n]=[])).push(e)},emit(n,e){const t=Bc[n];if(t)for(const i of t)i(e)}};function is(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Hn=(n,e,t)=>n<e?e:n>t?t:n,ae=(n,e)=>n+Math.random()*(e-n),pn=(n,e)=>{let t=e-n;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t},Qs=(n,e,t)=>n+Hn(pn(n,e),-t,t),Mf=[[0,50],[50,0],[0,-50],[-50,0]].map(([n,e])=>{const t=Math.hypot(n,e);return{x:n,z:e,vx:n/t,vz:e/t,rot:Math.atan2(n/t,e/t)}}),vt={hw:9,front:-6,back:6,steps:3,h:1.8},Tt={r:17.5,wall:18.4,ramp:25,h:2.4,lane:3},q0=[[0,46],[46,0],[0,-46],[-46,0]],hn={r:86,inner:24,gateW:3.4,cycle:60,open:40},ju=n=>n%hn.cycle<hn.open,Y0=(n,e,t)=>{const i=e-n.x,r=t-n.z;return[i*n.vz-r*n.vx,i*n.vx+r*n.vz]};function K0(n,e){return 7*Math.exp(-(n*n+e*e)/(2*20*20))}function Ja(n){return Math.abs(n+32)<2.4||Math.abs(n-32)<2.4}function bc(n,e){return m.map.id==="river"&&Math.abs(e)<5&&Math.hypot(n,e)>=7}function Xu(n,e){return bc(n,e)&&Math.abs(n)<14}function J0(n,e){for(const t of Mf){if(Math.abs(n-t.x)>13||Math.abs(e-t.z)>13)continue;const[i,r]=Y0(t,n,e);if(!(Math.abs(i)>vt.hw)){if(r>=vt.front&&r<=vt.back)return vt.h;if(r>=vt.front-vt.steps&&r<vt.front)return vt.h*(r-(vt.front-vt.steps))/vt.steps}}return 0}function Z0(n,e){const t=Math.abs(n),i=Math.abs(e);if(t>Tt.ramp||i>Tt.ramp)return 0;const r=Math.hypot(n,e);return r<Tt.r?Tt.h:r<Tt.ramp&&Math.min(t,i)<Tt.lane?Tt.h*(Tt.ramp-r)/(Tt.ramp-Tt.r):0}function Q0(n,e){let t=0;for(const[i,r]of q0){const s=n-i,a=e-r;Math.abs(s)<30&&Math.abs(a)<30&&(t+=4.5*Math.exp(-(s*s+a*a)/(2*9.5*9.5)))}return t}function wt(n,e){switch(m.map.id){case"frost":return K0(n,e);case"river":return Math.abs(e)<5.5&&Math.hypot(n,e)>=7?Ja(n)?.38:-.45:0;case"forum":return J0(n,e);case"desert":return Z0(n,e);case"valley":return Q0(n,e)}return 0}function hr(n,e){const t=Math.hypot(n,e),i=Math.sin(n*.07)*Math.cos(e*.05)+Math.sin(n*.023+e*.031)*1.4;let r=m.map.id==="river"?0:wt(n,e);if(m.map.id==="river"){const s=Math.abs(e);s<7&&Math.hypot(n,e)>=7.5&&(r=s<5?-.95:-.95*(7-s)/2)}return m.map.id==="desert"&&t>30&&(r+=Math.max(0,i)*Math.min(1,(t-30)/20)*1.2),t>92&&(r+=(t-92)*.25+Math.max(0,i)*((t-92)*.18)),r}function wr(n,e=0,t=0){const i=Math.hypot(n.pos[0],n.pos[1]),r=-n.pos[0]/i,s=-n.pos[1]/i;return[n.pos[0]+r*(Fo+2.5+t)+s*e,n.pos[1]+s*(Fo+2.5+t)-r*e]}function eg(n,e,t,i,r,s,a,o={}){const c=Math.hypot(i-e,r-t),f=Math.max(1,Math.ceil(c/(s*1.3))),l=[];for(let h=0;h<=f;h++){const d=Object.assign({x:e+(i-e)*h/f,z:t+(r-t)*h/f,r:s},o);l.push(d),n.obstacles.push(d),n.blockers.push({x:d.x,z:d.z,r:s,h:a,gate:o.gate})}return l}function Hc(n,e,t,i,r,s,a,o={}){const c=Math.ceil(Math.PI*2*i/(r*1.3));for(let f=0;f<c;f++){const l=f/c*Math.PI*2;if(a&&a(l))continue;const h=Object.assign({x:e+Math.cos(l)*i,z:t+Math.sin(l)*i,r},o);n.obstacles.push(h),s&&n.blockers.push({x:h.x,z:h.z,r,h:s})}}function ds(n,e,t,i,r,s,a,o){const c={box:!0,x:e,z:t,hw:i,hd:r,rot:s};if(n.obstacles.push(c),a){const f=Math.cos(s),l=Math.sin(s),h=Math.min(i,r);for(let d=-i+h;d<=i-h+.01;d+=h)for(let u=-r+h;u<=r-h+.01;u+=h)n.blockers.push({x:e+d*f+u*l,z:t-d*l+u*f,r:h*1.2,h:a})}return o&&n.buildings.push({x:e,z:t,w:i*2,d:r*2,rot:s,h:a,kind:o}),c}const us=(n,e,t)=>e.some(i=>Math.abs(pn(n,i))<t),Qi=[Math.PI/4,3*Math.PI/4,-3*Math.PI/4,-Math.PI/4],Lr=[0,Math.PI/2,Math.PI,-Math.PI/2],tg=["A","B","C","D","E"];function uh(n,e,t,i){return!n.obstacles.some(r=>r.box?Math.abs((e-r.x)*Math.cos(r.rot)-(t-r.z)*Math.sin(r.rot))<r.hw+i&&Math.abs((e-r.x)*Math.sin(r.rot)+(t-r.z)*Math.cos(r.rot))<r.hd+i:Math.hypot(e-r.x,t-r.z)<r.r+i)}function ng(n,e,t){if(uh(n,e,t,3))return[e,t];for(let i=3;i<=18;i+=3)for(let r=0;r<10;r++){const s=r/10*Math.PI*2,a=e+Math.cos(s)*i,o=t+Math.sin(s)*i;if(uh(n,a,o,3))return[a,o]}return[e,t]}function ig(n){return[[0,0],[42,0],[-42,0],[0,42],[0,-42]].map(([t,i],r)=>{const[s,a]=ng(n,t,i);return{id:r,letter:tg[r],x:s,z:a}})}function bf(n,e,t,i){const r=is(i|0),s=(h,d)=>h+r()*(d-h),a={mapId:n,withFort:e,hills:[],palisades:[],rocks:[],trees:[],stones:[],obstacles:[],blockers:[],fortSegments:[],buildings:[],columns:[],towers:[],rings:[],gates:[],palms:[],huts:[],statues:[]},o=(h,d,u)=>he.some(_=>Math.hypot(_.pos[0]-h,_.pos[1]-d)<20+u),c=(h,d,u=0)=>!o(h,d,u)&&Math.hypot(h,d)>(e?12:8)+u&&!(n==="river"&&Math.abs(d)<9);for(let h=0;h<14;h++){const d=h/14*Math.PI*2+s(-.1,.1);a.hills.push({a:d,d:s(150,185),rad:s(18,34),sy:s(.35,.6)})}const f=(h,d=c)=>{for(let u=0;u<h;u++){const _=s(-80,80),x=s(-80,80),g=s(.6,1.7),p=s(0,3),v=s(0,3);d(_,x)&&(a.rocks.push({x:_,z:x,r:g,rx:p,ry:v}),g>1.1&&a.obstacles.push({x:_,z:x,r:g*.9}))}},l=(h,d,u)=>{a.trees.push({x:h,z:d,s:u}),Math.hypot(h,d)<90&&(a.obstacles.push({x:h,z:d,r:.7*u}),a.blockers.push({x:h,z:d,r:1.4*u,h:7}))};if(n==="dunes"){const h=[[-18,6,.4],[16,-8,-.3],[0,24,1.57],[0,-26,1.57],[-30,-8,.9],[30,10,.9],[-8,-40,0],[10,40,0]];for(const[d,u,_]of h){const x=[];for(let g=0;g<9;g++){const p=(g-4)*.66,v=d+Math.cos(_)*p,y=u-Math.sin(_)*p;x.push({x:v,z:y,rot:s(0,3),sy:s(.85,1.1)}),g%2===0&&a.obstacles.push({x:v,z:y,r:.75})}a.palisades.push({x:d,z:u,a:_,logs:x})}f(20)}if(n==="river"){for(let h=0;h<22;h++){const d=s(-14,14),u=s(-4.5,4.5),_=s(.25,.5);Math.hypot(d,u)<7.5||a.stones.push({x:d,z:u,s:_})}f(20)}if(n==="forest"){for(let h=0;h<16;h++){let d,u,_=0;do d=s(-82,82),u=s(-82,82),_++;while(!c(d,u,4)&&_<40);const x=5+Math.floor(r()*6);for(let g=0;g<x;g++){const p=d+s(-6,6),v=u+s(-6,6),y=s(.85,1.35);c(p,v)&&l(p,v,y)}}for(let h=0;h<40;h++){const d=s(0,6.28),u=s(95,130);a.trees.push({x:Math.cos(d)*u,z:Math.sin(d)*u,s:s(1,1.6)})}f(10)}if(n==="frost"&&f(20),n==="forum"){for(const d of Mf){const u=(v,y)=>[d.x+v*d.vz+y*d.vx,d.z-v*d.vx+y*d.vz],[_,x]=u(0,3);ds(a,_,x,6,3,d.rot,6.5);for(const v of[-1,1]){const[y,b]=u(v*(vt.hw+.45),-1.5);ds(a,y,b,.45,7.5,d.rot,0)}const[g,p]=u(0,vt.back+.45);ds(a,g,p,vt.hw+.9,.45,d.rot,0);for(let v=-7.5;v<=7.5;v+=3){const[y,b]=u(v,-4.8);a.obstacles.push({x:y,z:b,r:.55}),a.blockers.push({x:y,z:b,r:.55,h:6}),a.columns.push({x:y,z:b,y:vt.h,h:5.2,r:.45})}}const h=[[26,26,6,6],[47,20,5,4],[20,47,4,5],[33,8,4,3.5],[8,33,3.5,4]];for(const[d,u,_,x]of h)for(const[g,p]of[[1,1],[-1,1],[1,-1],[-1,-1]]){const v=d*g,y=u*p,b=5+(Math.abs(v*7+y*3)|0)%3;ds(a,v,y,_,x,0,b,"house")}for(let d=0;d<Math.PI*2-.01;d+=2.6/17){if(us(d,[...Lr,...Qi],.22))continue;const u=Math.cos(d)*17,_=Math.sin(d)*17;a.obstacles.push({x:u,z:_,r:.5}),a.columns.push({x:u,z:_,y:0,h:4.6,r:.42})}for(const[d,u]of[[11,0],[-11,0],[0,11],[0,-11]])e||(a.obstacles.push({x:d,z:u,r:.9}),a.statues.push({x:d,z:u}))}if(n==="colosseum"){Hc(a,0,0,hn.inner,1.2,4.5,h=>us(h,Qi,hn.gateW/hn.inner)),a.rings.push({r:hn.inner,h:4.5,gaps:Qi,gapW:hn.gateW/hn.inner}),Qi.forEach((h,d)=>{const u=Math.cos(h)*hn.inner,_=Math.sin(h)*hn.inner,x=-Math.sin(h),g=Math.cos(h),p={id:d,x:u,z:_,rot:Math.atan2(Math.cos(h),Math.sin(h))+Math.PI/2,w:hn.gateW*2};p.obs=eg(a,u-x*hn.gateW,_-g*hn.gateW,u+x*hn.gateW,_+g*hn.gateW,.9,4,{gate:d+1}),a.gates.push(p)});for(const h of Lr)for(const d of[44,64]){const u=Math.cos(h)*d,_=Math.sin(h)*d;a.obstacles.push({x:u,z:_,r:1.3}),a.blockers.push({x:u,z:_,r:1.3,h:7}),a.statues.push({x:u,z:_,big:!0})}a.round=hn.r}if(n==="desert"){Hc(a,0,0,Tt.wall,1.1,4.2,h=>us(h,Lr,(Tt.lane+.4)/Tt.wall)||us(h,Qi,3/Tt.wall)),a.rings.push({r:Tt.wall,h:4.2,gaps:Lr,gapW:(Tt.lane+.4)/Tt.wall,towersAt:Qi});for(const h of Qi){const d=Math.cos(h)*Tt.wall,u=Math.sin(h)*Tt.wall;a.obstacles.push({x:d,z:u,r:2.6}),a.blockers.push({x:d,z:u,r:2.6,h:7}),a.towers.push({x:d,z:u,r:2.4,h:7.5,kind:"sand"})}for(let h=0;h<40;h++){const d=s(-80,80),u=s(-80,80);!c(d,u,2)||Math.hypot(d,u)<30||(a.palms.push({x:d,z:u,s:s(.9,1.3),lean:s(-.25,.25),rot:s(0,6.28)}),a.obstacles.push({x:d,z:u,r:.5}))}for(let h=0;h<10;h++){const d=s(-70,70),u=s(-70,70);!c(d,u,3)||Math.hypot(d,u)<32||ds(a,d,u,1.8,1.4,s(0,3),2.4,"tent")}f(12,(h,d)=>c(h,d)&&Math.hypot(h,d)>28)}if(n==="wooden"){he.forEach(h=>{const d=Math.atan2(-h.pos[1],-h.pos[0]),u=d+Math.PI/2;Hc(a,h.pos[0],h.pos[1],22,.8,3.4,_=>us(_,[d,u],3.4/22)),a.rings.push({x:h.pos[0],z:h.pos[1],r:22,h:3.4,gaps:[d,u],gapW:3.4/22,kind:"logs"});for(const _ of[d,u])for(const x of[-1,1]){const g=_+x*3.9/22,p=h.pos[0]+Math.cos(g)*22,v=h.pos[1]+Math.sin(g)*22;a.towers.push({x:p,z:v,r:1.1,h:6,kind:"wood",small:!0})}});for(const h of Lr){const d=Math.cos(h)*33,u=Math.sin(h)*33;a.obstacles.push({x:d,z:u,r:1.8}),a.blockers.push({x:d,z:u,r:1.8,h:4}),a.towers.push({x:d,z:u,r:1.6,h:8,kind:"wood"})}for(const h of Lr)for(let d=0;d<4;d++){const u=56+s(-6,8),_=s(-14,14),x=Math.cos(h)*u-Math.sin(h)*_,g=Math.sin(h)*u+Math.cos(h)*_;o(x,g,6)||Math.abs(x)>82||Math.abs(g)>82||ds(a,x,g,2.2,1.8,s(0,3),3.5,"hut")}for(let h=0;h<8;h++){const d=s(-80,80),u=s(-80,80);if(!(!c(d,u,8)||Math.hypot(d,u)<38))for(let _=0;_<5;_++){const x=d+s(-5,5),g=u+s(-5,5);c(x,g,4)&&l(x,g,s(.9,1.3))}}for(let h=0;h<40;h++){const d=s(0,6.28),u=s(95,130);a.trees.push({x:Math.cos(d)*u,z:Math.sin(d)*u,s:s(1,1.6)})}}if(n==="valley"){const h=[...Lr,...Qi],d=31,u=Math.ceil(Math.PI*2*d/2.6);for(let _=0;_<u;_++){const x=_/u*Math.PI*2;if(us(x,h,4.2/d))continue;const g=d+s(-1.5,1.5),p=Math.cos(x)*g,v=Math.sin(x)*g,y=s(1.6,2.6);a.rocks.push({x:p,z:v,r:y,rx:s(0,3),ry:s(0,3),big:!0}),a.obstacles.push({x:p,z:v,r:y*.95}),a.blockers.push({x:p,z:v,r:y,h:y*1.6})}for(let _=0;_<10;_++){const x=s(-80,80),g=s(-80,80);if(!(!c(x,g,6)||Math.abs(Math.hypot(x,g)-d)<8))for(let p=0;p<4;p++){const v=x+s(-4,4),y=g+s(-4,4);c(v,y,4)&&l(v,y,s(.8,1.2))}}for(let _=0;_<40;_++){const x=s(0,6.28),g=s(95,130);a.trees.push({x:Math.cos(x)*g,z:Math.sin(x)*g,s:s(1,1.6)})}f(14,(_,x)=>c(_,x)&&Math.abs(Math.hypot(_,x)-d)>6)}for(const h of he)a.obstacles.push({x:h.pos[0],z:h.pos[1],r:Fo,castle:!0});if(e)for(let h=0;h<12;h++){if(h%3===0)continue;const d=h/12*Math.PI*2,u=Math.cos(d)*6,_=Math.sin(d)*6;a.fortSegments.push({a:d,x:u,z:_}),a.obstacles.push({x:u,z:_,r:1.3})}return a.ctrlSpots=t?ig(a):[],a}const eo=1.5,Qo=90,st=Math.ceil(Qo*2/eo),ph=.55,$u=6,cr=Math.ceil(Qo*2/$u);let Ns=new Uint8Array(st*st),Ul=[],Nl=[],zl=[],Za=!0;const ai=n=>Math.max(0,Math.min(st-1,Math.floor((n+Qo)/eo))),ri=n=>-Qo+(n+.5)*eo,dr=n=>Math.max(0,Math.min(cr-1,Math.floor((n+Qo)/$u)));function qu(n,e,t,i){if(n.box){const o=e-n.x,c=t-n.z,f=Math.cos(n.rot),l=Math.sin(n.rot),h=o*f-c*l,d=o*l+c*f;return Math.abs(h)<n.hw+i&&Math.abs(d)<n.hd+i}const r=e-n.x,s=t-n.z,a=n.r+i;return r*r+s*s<a*a}const mh=n=>n.box?Math.hypot(n.hw,n.hd):n.r;function Sf(n){Ns=new Uint8Array(st*st),Ul=Array.from({length:cr*cr},()=>[]),Nl=Array.from({length:cr*cr},()=>[]),zl=[];const e=(i,r)=>{const s=mh(i)+ph,a=ai(i.x-s),o=ai(i.x+s),c=ai(i.z-s),f=ai(i.z+s);for(let l=c;l<=f;l++)for(let h=a;h<=o;h++)qu(i,ri(h),ri(l),ph)&&(r?r.push(l*st+h):Ns[l*st+h]++)},t=(i,r)=>{const s=mh(i)+1;for(let a=dr(i.z-s);a<=dr(i.z+s);a++)for(let o=dr(i.x-s);o<=dr(i.x+s);o++)r[a*cr+o].push(i)};for(const i of n.obstacles)if(t(i,Ul),i.gate){const r=[];e(i,r),zl.push(...r)}else(i.box||i.r>=.7)&&e(i,null);for(const i of n.blockers)t(i,Nl);if(n.mapId==="river")for(let i=0;i<st;i++)for(let r=0;r<st;r++){const s=ri(r),a=ri(i);bc(s,a)&&!Xu(s,a)&&!Ja(s)&&Math.abs(a)<4.5&&Ns[i*st+r]++}if(n.round)for(let i=0;i<st;i++)for(let r=0;r<st;r++)Math.hypot(ri(r),ri(i))>n.round-1&&Ns[i*st+r]++;Za=!0,Tf()}function Tf(){const n=m.layout&&m.layout.gates.length?ju(m.T):!0;if(n!==Za){Za=n;for(const e of zl)Ns[e]+=n?-1:1}}const Yu=n=>!!n.gate&&!Za,Ku=(n,e)=>Ul[dr(e)*cr+dr(n)]||[],rg=(n,e)=>Nl[dr(e)*cr+dr(n)]||[],ar=(n,e)=>n>=0&&e>=0&&n<st&&e<st&&!Ns[e*st+n],Ol=(n,e)=>ar(ai(n),ai(e));function Qa(n,e,t,i){const r=Math.hypot(t-n,i-e),s=Math.ceil(r/(eo*.5));for(let a=1;a<=s;a++){const o=a/s;if(!ar(ai(n+(t-n)*o),ai(e+(i-e)*o)))return!1}return!0}function sg(n,e,t,i){if(Ol(n,e))return[n,e];const r=Math.hypot(t-n,i-e)||1,s=(t-n)/r,a=(i-e)/r;for(let o=eo*.5;o<Math.min(r,16);o+=eo*.5){const c=n+s*o,f=e+a*o;if(Ol(c,f))return[c,f]}return[n,e]}const ca=new Float32Array(st*st),Gc=new Int32Array(st*st),Vc=new Uint32Array(st*st),Wc=new Uint32Array(st*st);let Ir=0;const St={a:new Int32Array(st*st),f:new Float32Array(st*st),n:0};function gh(n,e){let t=St.n++;for(;t>0;){const i=t-1>>1;if(St.f[i]<=e)break;St.a[t]=St.a[i],St.f[t]=St.f[i],t=i}St.a[t]=n,St.f[t]=e}function og(){const n=St.a[0],e=St.a[--St.n],t=St.f[St.n];let i=0;for(;;){let r=2*i+1;if(r>=St.n||(r+1<St.n&&St.f[r+1]<St.f[r]&&r++,St.f[r]>=t))break;St.a[i]=St.a[r],St.f[i]=St.f[r],i=r}return St.a[i]=e,St.f[i]=t,n}const ag=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];function cg(n,e,t,i,r=3e3){let s=ai(n),a=ai(e);const o=ai(t),c=ai(i);if(!ar(o,c))return null;if(!ar(s,a)){let g=null,p=1e9;for(let v=-2;v<=2;v++)for(let y=-2;y<=2;y++){if(!ar(s+y,a+v))continue;const b=Math.hypot(ri(s+y)-n,ri(a+v)-e);b<p&&Qa(n,e,ri(s+y),ri(a+v))!==null&&(p=b,g=[s+y,a+v])}if(!g)return null;[s,a]=g}Ir++,St.n=0;const f=a*st+s,l=c*st+o,h=(g,p)=>{const v=Math.abs(g-o),y=Math.abs(p-c);return Math.max(v,y)+.414*Math.min(v,y)};Vc[f]=Ir,ca[f]=0,Gc[f]=-1,gh(f,h(s,a));let d=0;for(;St.n;){const g=og();if(Wc[g]===Ir)continue;if(Wc[g]=Ir,g===l)break;if(++d>r)return null;const p=g%st,v=g/st|0;for(const[y,b,C]of ag){const w=p+y,R=v+b;if(!ar(w,R)||y&&b&&(!ar(p+y,v)||!ar(p,v+b)))continue;const L=R*st+w,M=ca[g]+C;Vc[L]===Ir&&M>=ca[L]||(Vc[L]=Ir,ca[L]=M,Gc[L]=g,gh(L,M+h(w,R)))}}if(Wc[l]!==Ir)return null;const u=[];for(let g=l;g!==-1;g=Gc[g])u.push([ri(g%st),ri(g/st|0)]);u.reverse();const _=[u[0]];let x=0;for(;x<u.length-1;){let g=x+1;for(;g+1<u.length&&Qa(u[x][0],u[x][1],u[g+1][0],u[g+1][1]);)g++;_.push(u[g]),x=g}return _[_.length-1]=[t,i],_}const Xt=(n,...e)=>pt.emit("msg",{k:n,a:e}),xn=(n,e)=>pt.emit(n,e),ci=(n,e,t,i,r)=>xn("spark",{x:n,y:e,z:t,c:i,n:r}),It=(n,e,t)=>xn("sfx",{name:n,x:e,z:t});function Ef(n,e=[1,1,1,1,0,0,0,0]){return Array.from({length:8},(t,i)=>({points:100,tickets:Wu,caps:0,ctrlScore:0,gold:kl.startGold,alive:!0,plan:null,leaderDeadT:0,recruitT:ae(2,6),thinkT:0,human:!!n[i],active:!!e[i],order:"follow",holdPt:null,towerT:ae(0,1.4),leader:null,up:{foot1:0,foot2:0,arch1:0,arch2:0,aura:0,horse:0},arrowHits:0,shieldwallT:0,volleyCd:0,upT:ae(20,40)}))}function to(n,e,t,i,r=!1){const s=dn[i],a=i==="foot"||i==="captain"?Af(n):i==="arch"?Zu(n):0,o=i==="foot"?Fu[a]:i==="arch"?Bu[a]:s,c=i==="captain"?Hu[a]:null,f={id:++m.uid,ti:n,kind:i,leader:i==="captain",human:r,isMe:r&&n===m.myTi&&m.role!=="client",remote:r&&n!==m.myTi,x:e,z:t,y:wt(e,t),vx:0,vz:0,vy:0,face:Math.atan2(-e,-t),hp:o.hp+(c?c.hpB:0),max:o.hp+(c?c.hpB:0),dmg:(r?Dl.dmg:o.dmg)+(c?c.dmgB:0),spd:r?Dl.spd:o.spd,r:o.r,reach:o.reach+(c?c.reachB:0),block:o.block||0,range:o.range||0,shootBase:o.shoot||0,arrow:o.arrow||0,jitter:o.jitter||.8,javelin:c?c.javelin:!!o.javelin,javCd:0,tier:a,cd:ae(0,.6),shootCd:ae(0,1.5),swing:0,pending:null,stun:0,blockT:0,rt:ae(0,.3),foe:null,fd:1e9,dead:!1,deadT:0,trampleT:0,lastHit:-9,blocking:!1,aim:!1,mounted:!1,horse:null,summon:null,horseHp:ea(n),horseCd:0,carrying:!1,aura:!1,shieldwall:!1,kick:{n:0,vx:0,vz:0,st:0,dirty:!1},weapon:i==="captain"&&r?m.teams[n]&&m.teams[n].weapon||"sword":void 0,jy:0,jvy:0,jumpCd:0,javAmmo:fo.jav.ammo+a,javRegen:0,combo:0,lastSwingT:-9,atkBuf:0};return m.units.push(f),f}const ho=n=>m.units.filter(e=>!e.dead&&e.ti===n&&!e.leader);function lg(n,e=[1,1,1,1,0,0,0,0]){m.layout=bf(m.map.id,m.mode==="ctf",m.mode==="ctrl",m.seed),Sf(m.layout),m.units=[],m.horses=[],m.arrows=[],m.T=0,m.kills=0,m.recruited=0,m.bounty=-1,m.uid=0,m.arrowN=0,m.endInfo=null,m.awarded=!1,m.teams=Ef(n,e),m.duo=[0,1,2,3].map(t=>!!e[t+4]),m.flag=m.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,m.ctrlPoints=m.mode==="ctrl"?fp(m.layout):null;for(let t=0;t<8;t++){if(!m.teams[t].active)continue;const i=he[Se(t)],r=t>=4,[s,a]=wr(i,r?9:0,7);m.teams[t].leader=to(t,s,a,"captain",m.teams[t].human),(m.fullSquads?W0:V0).slice(0,m.squadCap).forEach((c,f)=>{const[l,h]=wr(i,(f%7-3)*1.4+(r?9:0),1.5+Math.floor(f/7)*1.4);to(t,l,h,c)})}m.player=m.teams[m.myTi].leader,m.state="play",Xt("start")}function fg(n,e){const t=m.teams[n];t.order=e;const i=t.leader;e==="hold"&&i&&(t.holdPt={x:i.x,z:i.z,face:i.face,isFront:!0})}function Ws(n){const e=m.teams[n];return m.mode==="conquest"?m.teams[Se(n)].alive:m.mode==="dm"?e.tickets>0:!0}function wf(n,e){const t=m.teams[n],i=dn[e].cost;if(!Ws(n)||t.gold<i||ho(n).length>=m.squadCap)return!1;t.gold-=i;const[r,s]=wr(he[Se(n)],ae(-2,2)+(n>=4?9:0));return to(n,r,s,e),n===m.myTi&&(m.recruited++,It("coin")),!0}const fi=(n,e)=>m.teams[n]&&m.teams[n].up?m.teams[n].up[e]:0,ea=n=>j0+30*fi(n,"horse"),ec=n=>X0-4*fi(n,"horse"),Ju=n=>Ka.range+Ka.perRange*fi(n,"aura"),Fl=n=>Ka.bonus+Ka.perBonus*fi(n,"aura"),Af=n=>Math.min(2,fi(n,"foot1")+fi(n,"foot2")),Zu=n=>Math.min(2,fi(n,"arch1")+fi(n,"arch2")),Ho=(n,e)=>{const t=Ei.find(r=>r.id===e);if(!t)return null;const i=fi(n,e);return i>=t.cost.length?null:t.cost[i]};function hg(n){const e=Af(n),t=Fu[e],i=Hu[e];for(const r of m.units)if(!(r.dead||r.ti!==n)){if(r.kind==="foot"){const s=t.hp;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=t.dmg,r.reach=t.reach,r.block=t.block,r.spd=t.spd,r.javelin=t.javelin,r.tier=e}else if(r.leader){const s=dn.captain.hp+i.hpB;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=(r.human?Dl.dmg:dn.captain.dmg)+i.dmgB,r.reach=dn.captain.reach+i.reachB,r.javelin=i.javelin,r.tier=e}}}function dg(n){const e=Zu(n),t=Bu[e];for(const i of m.units){if(i.dead||i.ti!==n||i.kind!=="arch")continue;const r=t.hp;i.hp=Math.min(r,Math.max(1,i.hp+(r-i.max))),i.max=r,i.dmg=t.dmg,i.spd=t.spd,i.range=t.range,i.shootBase=t.shoot,i.arrow=t.arrow,i.jitter=t.jitter,i.tier=e}}function Cf(n,e){const t=m.teams[n],i=Ho(n,e);return!t||i==null||t.gold<i||!Ei.some(r=>r.id===e)||e==="foot2"&&fi(n,"foot1")<1||e==="arch2"&&fi(n,"arch1")<1?!1:(t.gold-=i,t.up[e]++,(e==="foot1"||e==="foot2")&&hg(n),(e==="arch1"||e==="arch2")&&dg(n),e==="horse"&&t.leader&&!t.leader.mounted&&(t.leader.horseHp=ea(n)),e==="horse"&&t.leader&&t.leader.horseCd>ec(n)&&(t.leader.horseCd=ec(n)),n===m.myTi&&(It("coin"),Xt("upgrade",n,e,t.up[e])),!0)}const Qu=n=>{const e=m.teams[n],t=e.leader,i=t&&!t.dead;return e.human?e.order||"follow":e.shieldwallT>0&&i?"shieldwall":i?"follow":"charge"};function ep(n){const e=m.teams[n];return m.mode==="conquest"?m.teams[Se(n)].alive:m.mode==="dm"?e.tickets>0:!0}function Sc(n,e,t,i){n.remote?(n.kick.vx+=e,n.kick.vz+=t,n.kick.st=Math.max(n.kick.st,i||0),n.kick.dirty=!0):(n.vx+=e,n.vz+=t),i&&(n.stun=Math.max(n.stun,i))}function $i(n){let e=n.spd;return n.mounted&&(e*=1.8*(1+.05*fi(n.ti,"horse"))),n.leader||(n.aura&&(e*=1+Fl(n.ti)*.5),n.shieldwall&&(e*=.55)),n.carrying&&(e*=.7),Xu(n.x,n.z)&&(e*=.6),n.human&&n.blocking&&!n.mounted&&(e*=.5),e}function tp(n){if(n.mounted||n.summon||n.horseCd>0||n.dead||n.carrying||m.T-n.lastHit<2)return!1;const e=n.face+Math.PI+ae(-.6,.6),t=Hn(n.x+Math.sin(e)*14,-86,86),i=Hn(n.z+Math.cos(e)*14,-86,86),r={id:++m.horseN,x:t,z:i,face:Math.atan2(n.x-t,n.z-i),state:"coming",rider:n,t:0,spd:0,ti:n.ti,fall:1};return m.horses.push(r),n.summon=r,n.isMe&&It("neigh"),!0}function ug(n,e){n.jy=0,n.jvy=0,n.summon=null,n.mounted=!0,n.horse=e,e.state="ridden",n.r=.95,n.isMe&&xn("float",{x:n.x,y:n.y+3.4,z:n.z,text:"Mounted",color:"#fff"})}function rs(n,e){if(!n.mounted)return;const t=n.horse;n.mounted=!1,n.horse=null,n.r=dn.captain.r,e?(t.state="dead",t.t=0,t.fall=Math.random()<.5?1:-1,n.horseCd=ec(n.ti),n.horseHp=ea(n.ti),Sc(n,Math.sin(n.face+Math.PI/2)*5,Math.cos(n.face+Math.PI/2)*5,1),n.human&&Xt("horseDown",n.ti)):(t.state="leaving",t.t=0)}function Rf(n,e){n.horseHp-=e,ci(n.x,n.y+1.3,n.z,"#d42a1e",5),It("hit",n.x,n.z),n.horseHp<=0&&rs(n,!0)}const np=(n,e)=>m.units.some(t=>!t.dead&&In(t,n)&&t.kind==="foot"&&t.tier>=1&&Math.hypot(t.x-n.x,t.z-n.z)<e),ip=n=>n.kind==="foot"&&n.tier>=1&&n.stun<=0&&Math.hypot(n.vx,n.vz)<2.2;function rp(n){if(!(!n||n.dead)){if(n.mounted){rs(n,!1);return}if(!n.summon){if(n.carrying){Xt("rideNo",n.ti,"banner");return}if(n.horseCd>0){Xt("rideNo",n.ti,"rest",Math.ceil(n.horseCd));return}if(m.T-n.lastHit<2){Xt("rideNo",n.ti,"hot");return}tp(n)}}}function xi(n,e,t){let i=null,r=e*e;for(const s of m.units){if(s.dead||!In(s,n)||t&&!t(s))continue;const a=s.x-n.x,o=s.z-n.z,c=a*a+o*o;c<r&&(r=c,i=s)}return[i,Math.sqrt(r)]}function sp(n){if(m.mode!=="conquest")return[-1,1e9];let e=-1,t=1e9;for(let i=0;i<4;i++){if(!li(i,n.ti)||!m.teams[i].alive)continue;const r=Math.hypot(he[i].pos[0]-n.x,he[i].pos[1]-n.z);r<t&&(t=r,e=i)}return[e,t]}const tc=n=>m.teams[n]&&m.teams[n].human?1:Vu[m.diff].dmg;function Vi(n,e){return n.cd>0||n.stun>0||n.dead||n.carrying?!1:(n.swing=.38,n.cd=(n.leader?n.mounted?.8:.6:dn[n.kind].cd)*ae(.9,1.15),n.pending={t:.15,target:e},It("swing",n.x,n.z),!0)}function op(n){n.cd>0||n.stun>0||n.dead||(n.swing=.38,n.cd=.8,n.pending={t:.15,sweep:!0},It("swing",n.x,n.z))}function pg(n){const e=n.pending,t=e.target;n.pending=null;const i=e.mult||1;if(e.leap){mg(n);return}if(e.sweep){const o=i*.8*(1+Math.hypot(n.vx,n.vz)/12);for(const c of m.units)c.dead||!In(c,n)||Math.hypot(c.x-n.x,c.z-n.z)>3.1+(e.reachB||0)||Math.abs(pn(n.face,Math.atan2(c.x-n.x,c.z-n.z)))>1.25||Io(n,c,o);return}if(t&&t.castle!==void 0){const o=m.teams[t.castle];if(!o.alive||n.mounted||!li(t.castle,n.ti)||Math.hypot(he[t.castle].pos[0]-n.x,he[t.castle].pos[1]-n.z)>fr+.8)return;o.points-=n.human?1.3:n.leader?.7:n.kind==="arch"?.08:.2,It("wall",n.x,n.z),ci(n.x+Math.sin(n.face)*1.2,1.4,n.z+Math.cos(n.face)*1.2,"#cfc8b8",5),o.points<=0&&_g(t.castle,n.ti);return}const r=n.reach+(e.reachB||0),s=e.kb?{kb:e.kb}:void 0;let a=!1;if(t&&!t.dead&&Math.hypot(t.x-n.x,t.z-n.z)<=n.r+t.r+r+.5&&(Io(n,t,i,s),a=!0),e.cleave){let o=0;for(const c of m.units)if(!(c===t||c.dead||!In(c,n))&&!(Math.hypot(c.x-n.x,c.z-n.z)>n.r+c.r+r+.3)&&!(Math.abs(pn(n.face,Math.atan2(c.x-n.x,c.z-n.z)))>1.1)&&(Io(n,c,i*.8,s),++o>=2))break}if(e.pierce&&a){for(const o of m.units)if(!(o===t||o.dead||!In(o,n))&&!(Math.hypot(o.x-n.x,o.z-n.z)>n.r+o.r+r+1.3)&&!(Math.abs(pn(n.face,Math.atan2(o.x-n.x,o.z-n.z)))>.35)){Io(n,o,i*e.pierce,s);break}}}function mg(n){const e=fo.leap,t=n.x+Math.sin(n.face)*1.2,i=n.z+Math.cos(n.face)*1.2;ci(t,wt(t,i)+.2,i,"#c9b28a",14),It("trample",t,i),n.isMe&&(xn("shake",.45),xn("buzz",40));for(const r of m.units)r.dead||!In(r,n)||Math.hypot(r.x-n.x,r.z-n.z)>e.range+r.r||Math.abs(pn(n.face,Math.atan2(r.x-n.x,r.z-n.z)))>e.arc||Io(n,r,e.mult,{stun:e.stun,kb:1.3,unblockable:!0})}function Io(n,e,t=1,i){if(!In(n,e))return;let r=n.dmg*ae(.8,1.2)*t*tc(n.ti);!n.leader&&n.aura&&(r*=1+Fl(n.ti)),n.y-e.y>.8&&(r*=1.2),e.lastHit=m.T;const s=n.kind==="foot"&&n.tier>=1||n.leader&&n.weapon==="spear";if(e.mounted&&(s||Math.random()<.5)){Rf(e,r*(s?3:1));return}let a=(n.leader?n.mounted?9:7:4.5)*(i&&i.kb||1);const o=Math.abs(pn(e.face,Math.atan2(n.x-e.x,n.z-e.z)))<1.1;let c=!1;o&&e.stun<=0&&!e.mounted&&!e.carrying&&!(i&&i.unblockable)&&(e.human?c=e.blocking:Math.random()<(e.block||0)+(e.aura?Fl(e.ti):0)+(e.shieldwall&&e.kind==="foot"?.3:0)&&(c=!0,e.blockT=.45));const f=(n.x+e.x)/2,l=(n.z+e.z)/2,h=(n.y+e.y)/2+1.2;if(c?(r*=e.human?.12:.25,a*=.4,ci(f,h,l,"#fff3b0",7),It("clang",f,l),e.blockT=Math.max(e.blockT,.2),e.isMe&&xn("buzz",15)):(ci(f,h,l,he[Se(e.ti)].css,6),It("hit",f,l),Math.random()<.4&&xn("splat",{x:e.x+ae(-.4,.4),z:e.z+ae(-.4,.4),s:ae(.6,1.1),ti:e.ti}),e.isMe&&(xn("shake",.35),xn("buzz",35))),e.hp-=r,n.isMe){const u=!c&&(t>=1.35||e.hp<=0);xn("hitstop",c?.03:u?.1:.055),u&&It("heavy",f,l)}const d=Math.atan2(e.x-n.x,e.z-n.z);Sc(e,Math.sin(d)*a,Math.cos(d)*a,c?0:i&&i.stun||.22),e.hp<=0&&Df(e,n,d)}function Pf(n,e,t=1.6){const i=n.jitter||.8,r=.35+Math.hypot(e.x-n.x,e.z-n.z)/30,s=e.x+e.vx*r+ae(-i,i),a=e.z+e.vz*r+ae(-i,i),o=Math.hypot(s-n.x,a-n.z),c=(n.y||0)+t;m.arrows.push(If({id:++m.arrowN,x0:n.x,y0:c,z0:n.z,x1:s,z1:a,y1:wt(s,a)+1.1,dur:.25+o/28,peak:Math.min(6,o*.16),ti:n.ti,t:0,shooter:n})),n.tower||(n.swing=.38),It("bow",n.x,n.z)}function Lf(n,e,t){const i=Math.hypot(e.x-n.x,e.z-n.z),r=(n.y||0)+1.5;m.arrows.push(If({id:++m.arrowN,x0:n.x,y0:r,z0:n.z,x1:e.x,z1:e.z,y1:wt(e.x,e.z)+1.1,dur:.18+i/22,peak:Math.min(3.5,i*.09),ti:n.ti,t:0,shooter:n,javelin:!0,jd:t})),n.javCd=Mc.cd,n.swing=.3,It("bow",n.x,n.z)}function If(n){return n.x=n.x0,n.y=n.y0,n.z=n.z0,n.px=n.x0,n.py=n.y0,n.pz=n.z0,n}function gg(n,e){const t=n.shooter;let i,r="body";if(n.javelin)i=(n.jd||Mc.dmg)*ae(.85,1.15)*tc(n.ti);else{i=(t&&t.arrow!=null?t.arrow:dn.arch.arrow)*ae(.8,1.2)*tc(n.ti);const c=t&&t.jitter!=null?t.jitter:.8,f=.08+(1-c)*.22,l=Math.random();l<f?(i*=1.8,r="head"):l>.82&&(i*=.6,r="legs")}m.teams[e.ti]&&m.teams[e.ti].arrowHits++;const s=Math.abs(pn(e.face,Math.atan2(n.x0-e.x,n.z0-e.z)))<1.1;if(e.shieldwall&&s&&(e.kind==="foot"||Math.random()<.6)){ci(e.x,e.y+2.2,e.z,"#e8d9b0",4),It("thud",e.x,e.z);return}if(e.lastHit=m.T,e.mounted&&Math.random()<.6){Rf(e,i);return}let a=!1;if(s&&!e.mounted&&!e.carrying&&r!=="head"&&(e.kind==="foot"&&Math.random()<.7&&(a=!0),e.leader&&(e.human?e.blocking:Math.random()<.35)&&(a=!0)),a){ci(e.x,e.y+1.3,e.z,"#e8d9b0",4),It("thud",e.x,e.z),e.blockT=Math.max(e.blockT,.2);return}e.hp-=i,ci(e.x,e.y+1.3,e.z,he[Se(e.ti)].css,4),It("hit",e.x,e.z),Sc(e,0,0,.12),e.isMe&&(xn("shake",.25),xn("buzz",20));const o=n.shooter;e.hp<=0&&Df(e,o&&!o.dead&&!o.tower?o:{ti:n.ti,human:!1},Math.atan2(e.x-n.x0,e.z-n.z0))}function Df(n,e,t){if(n.dead)return;n.dead=!0,n.deadT=0,n.vx+=Math.sin(t)*6,n.vz+=Math.cos(t)*6,n.vy=ae(3,6),n.fallDir=Math.random()<.5?1:-1,xn("splat",{x:n.x,z:n.z,s:ae(1,1.5),ti:n.ti}),It("die",n.x,n.z),n.mounted&&rs(n,!1),n.summon&&(n.summon.state="leaving",n.summon.t=0,n.summon=null),n.carrying&&wg(n);const i=m.teams[n.ti];if(m.mode==="dm"&&(i.tickets=Math.max(0,i.tickets-(n.leader?5:1)),i.tickets<=0&&i.alive&&(i.alive=!1,Xt("tickets0",n.ti))),e){const r=m.mode==="dm"&&n.leader&&n.ti===m.bounty,s=n.leader?r?50:25:8;m.teams[e.ti].gold+=s,e.human&&e.ti===m.myTi&&m.kills++,e.human&&Xt("gold",e.ti,Math.round(n.x*10)/10,Math.round(n.z*10)/10,s),r&&Xt("bountyClaimed",e.ti),n.leader&&Xt("capDown",n.ti,e.ti)}n.leader&&(i.leaderDeadT=n.human?5:9,n.human&&Xt("fell",n.ti,ep(n.ti)?1:0)),Tc()}function _g(n,e){const t=m.teams[n];t.alive=!1,t.points=0,Xt("castleDown",n,e),Tc()}function ap(n){const e=m.teams[n];return m.mode==="conquest"?!m.teams[Se(n)].alive:m.mode==="dm"?!e.alive&&!m.units.some(t=>!t.dead&&t.ti===n):!1}const kf=n=>m.duo[n]?[n,n+4]:[n],cp={dm:"tickets",ctf:"caps",ctrl:"ctrlScore"};function xg(n){if(m.mode==="conquest")return m.teams[n].points;const e=cp[m.mode];return kf(n).reduce((t,i)=>t+m.teams[i][e],0)}const vg=n=>kf(n).every(e=>ap(e)),yg=n=>kf(n).some(e=>m.teams[e].human),Mg=n=>{const e=m.teams[n];return m.mode==="conquest"?m.teams[Se(n)].points:e[cp[m.mode]]},lp=n=>m.teams.reduce((e,t,i)=>e+(m.ALLY[Se(i)]===n?t.caps:0),0),bg=n=>m.teams.reduce((e,t,i)=>e+(m.ALLY[Se(i)]===n?t.ctrlScore:0),0),Sg=()=>[...new Set(vf().filter(n=>!ap(n)).map(n=>m.ALLY[Se(n)]))];function Tc(){if(!(m.state!=="play"||m.role==="client")){if(m.mode==="conquest"||m.mode==="dm"){const n=Sg();if(n.length===1)return ur(n[0],m.mode==="conquest"?"castles":"tickets");if(n.length===0)return ur(-1,"time")}if(m.mode==="ctf"){for(const n of new Set(m.ALLY))if(lp(n)>=Bo)return ur(n,"caps")}if(m.mode==="ctrl"){for(const n of new Set(m.ALLY))if(bg(n)>=yr.win)return ur(n,"control")}}}function Tg(){if(m.state!=="play"||m.T<ns[m.mode].time)return;const n={};if(m.mode==="conquest")for(let t=0;t<4;t++)m.teams[t].alive&&(n[m.ALLY[t]]=(n[m.ALLY[t]]||0)+m.teams[t].points);else for(const t of vf())n[m.ALLY[Se(t)]]=(n[m.ALLY[Se(t)]]||0)+Mg(t);const e=Object.entries(n).map(([t,i])=>[+t,i]).sort((t,i)=>i[1]-t[1]);if(!e.length||e.length>1&&e[0][1]===e[1][1])return ur(-1,"time");ur(e[0][0],"time")}function ur(n,e){m.state==="play"&&(m.state="end",m.endInfo={w:n,why:e},pt.emit("end",m.endInfo))}function fp(n){return n.ctrlSpots.map(e=>({...e,owner:-1,prog:0}))}function Eg(n){const e=m.ctrlPoints;if(e){for(const t of e){const i={};for(const c of m.units)c.dead||c.mounted||Math.hypot(c.x-t.x,c.z-t.z)>yr.radius||(i[c.ti]=(i[c.ti]||0)+1);const r=Object.entries(i).map(([c,f])=>[+c,f]).sort((c,f)=>f[1]-c[1]),s=r[0],a=r[1]&&r[1][1]===s[1],o=s&&!a?s[0]:null;if(o==null||o===t.owner){t.prog=0;continue}t.capturer=o,t.prog+=n/yr.captureTime,t.prog>=1&&(t.owner=o,t.prog=0,Xt("pointCaptured",o,t.letter))}for(const t of e)t.owner>=0&&m.teams[t.owner]&&m.teams[t.owner].active&&(m.teams[t.owner].ctrlScore+=yr.rate*n);Tc()}}function wg(n){const e=m.flag;n.carrying=!1,e.state="dropped",e.carrier=null,e.x=n.x,e.z=n.z,e.dropT=10,Xt("flagDropped",n.ti)}function Ag(n){const e=m.flag;if(e){if(e.state==="carried"){const t=e.carrier,i=he[Se(t.ti)];Math.hypot(t.x-i.pos[0],t.z-i.pos[1])<Fo+3.5&&(m.teams[t.ti].caps++,m.teams[t.ti].gold+=50,t.carrying=!1,e.state="home",e.carrier=null,e.x=0,e.z=0,Xt("capture",t.ti),m.teams.forEach(r=>r.thinkT=0),Tc());return}e.state==="dropped"&&(e.dropT-=n,e.dropT<=0&&(e.state="home",e.x=0,e.z=0,Xt("flagHome")));for(const t of m.units)if(!(t.dead||!t.leader||Math.hypot(t.x-e.x,t.z-e.z)>=1.9)){if(t.mounted){t.isMe&&xn("hint","Get off your horse to take it");continue}t.summon&&(t.summon.state="leaving",t.summon.t=0,t.summon=null),t.carrying=!0,e.state="carried",e.carrier=t,m.teams.forEach(i=>i.thinkT=0),Xt("flagTaken",t.ti);break}}}function hp(n,e=3.4){let t=null,i=1e9;for(const r of m.units){if(r.dead||!In(r,n))continue;const s=Math.hypot(r.x-n.x,r.z-n.z);if(s>e)continue;const a=s+Math.abs(pn(n.face,Math.atan2(r.x-n.x,r.z-n.z)))*1.5;a<i&&(i=a,t=r)}return t}const jt=fo,dp=n=>jt.jav.ammo+Af(n),up=n=>(n.jy||0)>.25,Cg=n=>n.weapon==="spear"?jt.spear.aim:jt.sword.aim;function pp(n){return!n||n.dead||n.mounted||n.stun>0||n.jy>0||n.jvy>0||n.jumpCd>0||n.carrying?!1:(n.jvy=jt.jump.v,n.jy=.001,It("swing",n.x,n.z),!0)}function mp(n,e){n.jumpCd>0&&(n.jumpCd-=e),!(!(n.jy>0)&&!(n.jvy>0))&&(n.jvy-=jt.jump.g*e,n.jy+=n.jvy*e,n.jy<=0&&(n.jy=0,n.jvy=0,n.jumpCd=jt.jump.cd,ci(n.x,wt(n.x,n.z)+.1,n.z,"#c9b28a",4)))}function Rg(n,e){if(!n||n.dead)return null;const t=Us.includes(e)?e:Us[(Us.indexOf(n.weapon||"sword")+1)%Us.length];return n.weapon=t,n.combo=0,n.cd=Math.max(n.cd,.12),m.teams[n.ti]&&(m.teams[n.ti].weapon=t),t}function gp(n){let e=null,t=1e9;for(const r of m.units){if(r.dead||!In(r,n))continue;const s=Math.hypot(r.x-n.x,r.z-n.z);if(s>jt.jav.range||s<1.2)continue;const a=Math.abs(pn(n.face,Math.atan2(r.x-n.x,r.z-n.z)));if(a>.6)continue;const o=s+a*10;o<t&&(t=o,e=r)}if(!e)return{x:n.x+Math.sin(n.face)*12,z:n.z+Math.cos(n.face)*12,foe:null};const i=(.18+Math.hypot(e.x-n.x,e.z-n.z)/22)*.8;return{x:e.x+e.vx*i,z:e.z+e.vz*i,foe:e}}function _h(n){if((n.javAmmo||0)<1)return!1;const e=gp(n);return n.face=Math.atan2(e.x-n.x,e.z-n.z),Lf(n,e,jt.jav.dmg),n.javAmmo--,n.javRegen<=0&&(n.javRegen=jt.jav.regen),n.cd=jt.jav.cd,n.swing=.38,n.swingKind=4,!0}function Pg(n){n.leaps=(n.leaps||0)+1,n.swing=.38,n.cd=jt.leap.cd,n.pending={t:.1,leap:!0},n.swingKind=2,n.jvy=Math.min(n.jvy,-9),n.vx+=Math.sin(n.face)*3,n.vz+=Math.cos(n.face)*3,It("swing",n.x,n.z)}function Jr(n){if(!n||n.dead||n.carrying)return;if(n.cd>0||n.stun>0){n.atkBuf=.4;return}n.atkBuf=0;const e=n.weapon||"sword";if(n.mounted){if(e==="jav"&&_h(n))return;op(n),n.pending&&e==="spear"&&(n.pending.mult=1.3,n.pending.reachB=.8);return}if(up(n)){Pg(n);return}if(e==="jav"){if(_h(n))return;n.weapon="sword",m.teams[n.ti]&&(m.teams[n.ti].weapon="sword"),n.isMe&&xn("float",{x:n.x,y:n.y+3.2,z:n.z,text:"Out of javelins",color:"#fff"})}const t=n.weapon==="spear",i=jt.sword,r=hp(n,t?jt.spear.aim:i.aim);let s=r;if(!r){const[a,o]=sp(n);a>=0&&o<fr+.6&&(s={castle:a},n.face=Math.atan2(he[a].pos[0]-n.x,he[a].pos[1]-n.z))}if(Vi(n,s)){if(n.pending.t=.12,r){const a=Math.atan2(r.x-n.x,r.z-n.z),o=Math.hypot(r.x-n.x,r.z-n.z);n.face=a;const c=n.r+r.r+n.reach+(t?jt.spear.reachB:0)-.2;o>c&&(n.vx+=Math.sin(a)*4,n.vz+=Math.cos(a)*4)}if(t)Object.assign(n.pending,{mult:jt.spear.mult,reachB:jt.spear.reachB,pierce:jt.spear.pierce,kb:.8}),n.cd=jt.spear.cd,n.combo=0,n.swingKind=3;else{const a=m.T-n.lastSwingT<i.window?(n.combo+1)%3:0,o=a===2;Object.assign(n.pending,{mult:o?i.finisherMult:i.mult,cleave:o,kb:o?1.25:.4}),n.cd=o?i.finisherCd:i.cd,n.combo=a,n.swingKind=a}n.lastSwingT=m.T}}function _p(n){const e=m.teams[n];if(!e||!e.active||e.volleyCd>0)return!1;let t=!1;for(const i of m.units)if(!(i.dead||i.ti!==n||i.stun>0)){if(i.kind==="arch"){const r=i.range*(i.y>2.2?1.3:1),[s]=xi(i,r);s&&(i.face=Math.atan2(s.x-i.x,s.z-i.z),Pf(i,s),i.shootCd=i.shootBase*ae(.85,1.2),t=!0)}else if(i.kind==="foot"&&i.javelin&&i.javCd<=0){const[r]=xi(i,Mc.range,s=>!s.mounted);r&&(i.face=Math.atan2(r.x-i.x,r.z-i.z),Lf(i,r),t=!0)}}return t&&(e.volleyCd=G0.cd),t}let Bl=0;function Lg(n,e,t){const i=n.nav||(n.nav={next:0,direct:!0,pts:null,i:0,gx:1e9,gz:1e9,repath:0,skipT:0});if(m.T>=i.next){i.next=m.T+.25+Math.random()*.15;const[c,f]=sg(e,t,n.x,n.z);i.direct=Qa(n.x,n.z,c,f),i.ox=c,i.oz=f}if(i.direct)return i.pts=null,[e,t];const r=i.ox,s=i.oz;if((m.T>i.repath||Math.hypot(r-i.gx,s-i.gz)>4)&&Bl>0&&(Bl--,i.pts=cg(n.x,n.z,r,s),i.i=Ol(n.x,n.z)?1:0,i.gx=r,i.gz=s,i.repath=m.T+(i.pts?2+Math.random():1.5+Math.random())),!i.pts||i.pts.length<2)return[e,t];const a=i.pts;for(;i.i<a.length-1&&Math.hypot(a[i.i][0]-n.x,a[i.i][1]-n.z)<(i.i?1.3:.5);)i.i++;i.i<a.length-1&&m.T>=i.skipT&&(i.skipT=m.T+.3,Qa(n.x,n.z,a[i.i+1][0],a[i.i+1][1])&&i.i++);const o=a[Math.min(i.i,a.length-1)];return i.i>=a.length-1?[e,t]:[o[0],o[1]]}function Pi(n,e,t,i,r,s=.3){const a=e-n.x,o=t-n.z,c=Math.hypot(a,o);let f=0,l=0;if(c>s){const d=i*Math.min(1,(c-s)/1.2+.2);f=a/c*d,l=o/c*d}const h=n.stun>0?1.5:n.mounted?4:10;return n.vx+=(f-n.vx)*Math.min(1,r*h),n.vz+=(l-n.vz)*Math.min(1,r*h),c}const Rn=(n,e,t,i,r=9)=>{n.face=Qs(n.face,Math.atan2(e-n.x,t-n.z),i*r)};function Xn(n,e,t,i,r,s=.3){const[a,o]=Lg(n,e,t);return Pi(n,a,o,i,r,a===e&&o===t?s:.2),Math.hypot(a-n.x,o-n.z)>.6&&Rn(n,a,o,r,n.mounted?4:8),Math.hypot(e-n.x,t-n.z)}function Ig(n,e){const t=he[Se(n.ti)],i=ho(n.ti).length;if(m.mode==="conquest"){const r=m.units.some(o=>!o.dead&&In(o,n)&&Math.hypot(o.x-t.pos[0],o.z-t.pos[1])<22),s=e.plan&&e.plan.kind==="castle"?4:11;if(m.teams[Se(n.ti)].alive&&(r||i<s)){e.plan={kind:"defend"};return}let a=e.plan&&e.plan.kind==="castle"&&m.teams[e.plan.ti].alive&&Math.random()>.08?e.plan.ti:null;if(a==null){const o=[0,1,2,3].filter(c=>li(c,n.ti)&&m.teams[c].alive).sort((c,f)=>Math.hypot(he[c].pos[0]-n.x,he[c].pos[1]-n.z)-Math.hypot(he[f].pos[0]-n.x,he[f].pos[1]-n.z));o.length&&(a=o[Math.random()<.7?0:Math.min(1,o.length-1)])}e.plan=a==null?{kind:"defend"}:{kind:"castle",ti:a}}else if(m.mode==="dm"){const r=e.plan&&e.plan.kind==="hunt"?3:9;if(i<r&&e.tickets>0){e.plan={kind:"defend"};return}const[s]=xi(n,400,c=>c.leader),[a]=xi(n,400),o=m.bounty>=0&&li(m.bounty,n.ti)&&Math.random()<.5?m.teams[m.bounty].leader:null;e.plan={kind:"hunt",target:o&&!o.dead?o:s||a}}else if(m.mode==="ctrl"){const r=e.plan&&e.plan.kind==="point"?4:9;if(i<r){e.plan={kind:"defend"};return}const s=e.plan&&e.plan.kind==="point"?m.ctrlPoints[e.plan.id]:null;if(s&&s.owner!==n.ti&&Math.random()>.1)return;const a=m.ctrlPoints.filter(o=>o.owner!==n.ti).sort((o,c)=>Math.hypot(o.x-n.x,o.z-n.z)-Math.hypot(c.x-n.x,c.z-n.z));e.plan=a.length?{kind:"point",id:a[0].id}:{kind:"defend"}}else{const r=m.flag;n.carrying?e.plan={kind:"home"}:r.state==="carried"?e.plan={kind:In(r.carrier,n)?"hunt":"escort",target:r.carrier}:e.plan={kind:"banner"}}}function Dg(n,e){const t=e.plan;if(!t)return null;const i=he[Se(n.ti)],r=n.ti>=4;switch(t.kind){case"defend":{const[s,a]=wr(i,r?9:0,1);return{x:s,z:a,stop:1.5}}case"castle":return{x:he[t.ti].pos[0],z:he[t.ti].pos[1],stop:fr-.8,castle:t.ti};case"hunt":case"escort":return t.target&&!t.target.dead?{x:t.target.x,z:t.target.z,stop:t.kind==="escort"?3:1.5}:null;case"home":{const[s,a]=wr(i);return{x:s,z:a,stop:.5}}case"banner":return{x:m.flag.x,z:m.flag.z,stop:.2};case"point":{const s=m.ctrlPoints&&m.ctrlPoints[t.id];return s?{x:s.x,z:s.z,stop:yr.radius*.6}:null}}return null}function kg(n,e){if(n.carrying){n.mounted&&rs(n,!1);return}!n.mounted&&!n.summon&&e>30&&!(n.foe&&n.fd<14)&&tp(n);const t=m.teams[n.ti].plan&&m.teams[n.ti].plan.kind;n.mounted&&(e<(t==="hunt"?6:12)||np(n,m.diff===2?11:7))&&rs(n,!1)}function Ug(n,e,t,i){const r=m.diff>=2;if(n.weapon||(n.weapon="sword"),n.wpnT=(n.wpnT||0)-i,n.leapT=(n.leapT||0)-i,n.wpnT<=0){n.wpnT=r?ae(.8,1.4):ae(1.6,2.6);const o=e.mounted||m.units.some(c=>!c.dead&&c.mounted&&In(c,n)&&Math.hypot(c.x-n.x,c.z-n.z)<12)?"spear":t>4.5&&n.javAmmo>=1?"jav":r||Math.random()<.5?"sword":"spear";o!==n.weapon&&(n.weapon=o,n.combo=0,n.cd=Math.max(n.cd,.25))}if(n.weapon==="jav")if(n.javAmmo<1||t<3)n.weapon="sword",n.wpnT=ae(.6,1.2);else{Pi(n,n.x,n.z,0,i),Rn(n,e.x,e.z,i,10),n.cd<=0&&Math.abs(pn(n.face,Math.atan2(e.x-n.x,e.z-n.z)))<.3&&(Jr(n),r||(n.cd+=.5));return}const s=n.r+e.r+n.reach+(n.weapon==="spear"?fo.spear.reachB:0);if(Xn(n,e.x,e.z,$i(n),i,s*.7),Rn(n,e.x,e.z,i),n.jy>0){n.jvy<2&&n.cd<=0&&Jr(n);return}n.leapT<=0&&t<3.4&&n.jumpCd<=0&&n.stun<=0&&(n.leapT=r?ae(2.5,4):ae(7,11),m.units.filter(o=>!o.dead&&In(o,n)&&Math.hypot(o.x-n.x,o.z-n.z)<3.6&&Math.abs(pn(n.face,Math.atan2(o.x-n.x,o.z-n.z)))<1.2).length>=2&&(r||Math.random()<.5)&&pp(n))||t<s&&n.cd<=0&&n.stun<=0&&(Jr(n),r||(n.cd+=.2))}function Ng(n,e,t){e.thinkT-=t,(e.thinkT<=0||!e.plan)&&(e.thinkT=ae(1.2,2.4),Ig(n,e));const i=n.foe,r=n.fd;if(i&&r<(n.mounted?12:10)&&!n.carrying&&!(e.plan&&e.plan.kind==="escort"&&r>5)){if(n.mounted){np(n,7)&&rs(n,!1);const o=1/Math.max(r,.1);Xn(n,i.x+(i.x-n.x)*o*4,i.z+(i.z-n.z)*o*4,$i(n),t,.1),r<3&&op(n)}else m.diff>=1?Ug(n,i,r,t):(Xn(n,i.x,i.z,$i(n),t,n.r+i.r+n.reach*.6),Rn(n,i.x,i.z,t),r<n.r+i.r+n.reach&&Vi(n,i));return}const s=Dg(n,e);if(!s){Pi(n,n.x,n.z,0,t),e.thinkT=Math.min(e.thinkT,.3);return}kg(n,Math.hypot(s.x-n.x,s.z-n.z));const a=Xn(n,s.x,s.z,$i(n),t,s.stop);s.castle!=null?a<fr&&!n.mounted&&(Rn(n,s.x,s.z,t,6),Vi(n,{castle:s.castle})):e.plan.kind==="defend"&&a<2&&Rn(n,0,0,t,3)}function zg(n,e,t,i,r){const a=Math.floor(t/5),o=(t%5-2)*1.45,c=i?e?2+a*1.5:1.8+Math.ceil(r/5)*1.5+a*1.5:e?-(2.2+a*1.5):1.8+a*1.5,f=n.face,l=Math.sin(f),h=Math.cos(f),d=Math.cos(f),u=-Math.sin(f);return[n.x-l*c+d*o,n.z-h*c+u*o]}function Og(n,e,t){const r=Math.floor(t/9),s=(t%9-8/2)*.95,a=e?-(1.6+r*1.1):1.6+r*1.1,o=n.face,c=Math.sin(o),f=Math.cos(o),l=Math.cos(o),h=-Math.sin(o);return[n.x-c*a+l*s,n.z-f*a+h*s]}function Fg(n,e){const t=m.teams[n.ti],i=t.leader,r=i&&!i.dead,s=Qu(n.ti);if(s==="shieldwall"&&r){n.aim=!1;const _=n.foe;_&&n.fd<n.r+_.r+n.reach&&(Rn(n,_.x,_.z,e),Vi(n,_));const[x,g]=Og(i,!!i.human,n.tslot||0);Xn(n,x,g,$i(n)*(Math.hypot(x-n.x,g-n.z)>5?1.5:1),e,.15)<1&&!(_&&n.fd<3)&&(n.face=Qs(n.face,i.face,e*6));return}const a=n.kind==="arch"?n.range*(n.y>2.2?1.3:1):0;if(n.aim=!1,n.kind==="foot"&&n.tier>=1&&s!=="charge"){const[_,x]=xi(n,9,g=>g.mounted);if(_){Pi(n,n.x,n.z,0,e),Rn(n,_.x,_.z,e,10),x<n.r+_.r+n.reach&&Vi(n,_);return}}const o=s==="charge"?45:n.kind==="arch"?a:s==="hold"?8:10,c=n.foe,f=n.fd,l=s==="follow"&&r&&c&&Math.hypot(c.x-i.x,c.z-i.z)>18;if(c&&f<o&&!l){n.kind==="arch"?f<n.r+c.r+n.reach?(Vi(n,c),Rn(n,c.x,c.z,e),Pi(n,n.x,n.z,0,e)):f<5.5?(Pi(n,n.x-(c.x-n.x),n.z-(c.z-n.z),n.spd,e),Rn(n,c.x,c.z,e,6)):f<=a?(n.aim=!0,Pi(n,n.x,n.z,0,e),Rn(n,c.x,c.z,e,8),n.shootCd<=0&&n.stun<=0&&Math.abs(pn(n.face,Math.atan2(c.x-n.x,c.z-n.z)))<.3&&(Pf(n,c),n.shootCd=n.shootBase*ae(.85,1.2))):Xn(n,c.x,c.z,$i(n),e,a*.8):n.javelin&&n.javCd<=0&&f>n.r+c.r+n.reach+.3&&f<Mc.range&&!c.mounted?(Pi(n,n.x,n.z,0,e),Rn(n,c.x,c.z,e,8),Math.abs(pn(n.face,Math.atan2(c.x-n.x,c.z-n.z)))<.3&&Lf(n,c)):(Xn(n,c.x,c.z,$i(n),e,n.r+c.r+n.reach*.7),Rn(n,c.x,c.z,e),f<n.r+c.r+n.reach&&Vi(n,c));return}const[h,d]=sp(n);if(s==="charge"){if(m.mode==="conquest"&&h>=0){const _=he[h].pos;Xn(n,_[0],_[1],n.spd,e,fr-1),d<fr&&(Rn(n,_[0],_[1],e,6),Vi(n,{castle:h}))}else if(m.mode==="ctf"){const _=m.flag,x=_.state==="carried"&&In(_.carrier,n)?_.carrier:_;Xn(n,x.x,x.z,n.spd,e,1)}else{const[_]=xi(n,300);_?Xn(n,_.x,_.z,n.spd,e,1):Xn(n,0,0,n.spd,e,4)}return}if(m.mode==="conquest"&&h>=0&&d<fr&&s==="follow"&&r&&!i.mounted&&Math.hypot(i.x-he[h].pos[0],i.z-he[h].pos[1])<fr+6){Rn(n,he[h].pos[0],he[h].pos[1],e,6),Pi(n,n.x,n.z,0,e),Vi(n,{castle:h});return}const u=s==="hold"&&t.holdPt?t.holdPt:r?i:null;if(u){const[_,x]=zg(u,u.isFront||!!u.human,n.slot||0,n.kind==="arch",n.meleeN||0);Xn(n,_,x,$i(n)*(Math.hypot(_-n.x,x-n.z)>6?1.15:1),e)<1&&(n.face=Qs(n.face,u.face,e*6))}else{const[_,x]=wr(he[Se(n.ti)],n.ti>=4?9:0,2);Xn(n,_,x,n.spd,e,3)}}function Bg(n){const e=Math.random();if(m.diff===2){const i=vf().filter(o=>m.teams[o].human&&li(o,n)).flatMap(o=>ho(o)),r=o=>i.filter(c=>c.kind===o).length,s=r("foot");return r("arch")>=s?e<.7?"foot":"arch":e<.35?"arch":"foot"}return e<.65?"foot":"arch"}function xp(n,e,t){n.x+=n.vx*e,n.z+=n.vz*e;for(const i of Ku(n.x,n.z)){if(i.gate&&!Yu(i))continue;const r=n.x-i.x,s=n.z-i.z;if(i.box){const c=Math.cos(i.rot),f=Math.sin(i.rot),l=r*c-s*f,h=r*f+s*c,d=i.hw+n.r-Math.abs(l),u=i.hd+n.r-Math.abs(h);if(d<=0||u<=0)continue;let _=l,x=h;d<u?_=Math.sign(l||1)*(i.hw+n.r):x=Math.sign(h||1)*(i.hd+n.r),n.x=i.x+_*c+x*f,n.z=i.z-_*f+x*c;continue}const a=i.r+n.r;if(Math.abs(r)>a||Math.abs(s)>a)continue;const o=Math.hypot(r,s);o<a&&o>0&&(n.x=i.x+r/o*a,n.z=i.z+s/o*a)}if(m.layout.round){const i=Math.hypot(n.x,n.z),r=m.layout.round-n.r;i>r&&(n.x*=r/i,n.z*=r/i)}if(m.map.id==="river"&&(bc(n.x,n.z)&&!Ja(n.x)&&Math.abs(n.x)>=14&&(n.z=(t>=0?1:-1)*5.05),Math.abs(n.z)<5&&Ja(n.x)&&Math.abs(n.x)>20)){const i=n.x<0?-32:32;n.x=Hn(n.x,i-2.1,i+2.1)}n.x=Hn(n.x,-aa,aa),n.z=Hn(n.z,-aa,aa),n.y=wt(n.x,n.z)+(n.jy||0)}function vp(n,e,t){const i=(n.jy||0)>.01;n.blocking=!!e.block&&!n.mounted&&!i;const r=n.swing>0&&!n.mounted,s=$i(n)*(r?.85:1);if(i){const a=Math.min(1,t*2.5);n.vx+=(e.wx*s*e.mag-n.vx)*a,n.vz+=(e.wz*s*e.mag-n.vz)*a}else Pi(n,n.x+e.wx*3,n.z+e.wz*3,s*e.mag,t,.05);e.mag>.15&&(n.face=Qs(n.face,Math.atan2(e.wx,e.wz),t*(n.mounted?4.5:n.blocking?5:r?6:12))),n.blocking&&e.mag<.15&&(n.face=Qs(n.face,e.camYaw,t*6)),mp(n,t)}function Hl(n,e){const t=dp(n.ti);if(n.javAmmo>=t){n.javAmmo=t,n.javRegen=0;return}n.javRegen-=e,n.javRegen<=0&&(n.javAmmo++,n.javRegen=n.javAmmo<t?jt.jav.regen:0)}function yp(n,e){if(m.T+=n,Tf(),Bl=Math.max(2,Math.round(4*80/Math.max(80,m.units.length))),m.teams.forEach((l,h)=>{if(l.active){if(l.volleyCd>0&&(l.volleyCd-=n),Ws(h)&&(l.gold+=n*(l.human?kl.humanIncome:Vu[m.diff].income)),!l.human&&Ws(h)&&(l.recruitT-=n,l.recruitT<=0&&(l.recruitT=ae(...kl.aiRecruitEvery),wf(h,Bg(h)))),!l.human){if(l.upT-=n,l.upT<=0&&(l.upT=ae(6,12),ho(h).length>=m.squadCap-3||!Ws(h))){const d=Ei.map(u=>u.id).filter(u=>Ho(h,u)!=null&&l.gold>=Ho(h,u)+30);d.length&&Cf(h,d[Math.floor(Math.random()*d.length)])}if(l.arrowHits=Math.max(0,l.arrowHits-n*.6),l.shieldwallT-=n,l.arrowHits>=4&&l.shieldwallT<=0&&l.leader&&!l.leader.dead){const[d]=xi(l.leader,9,u=>u.kind!=="arch");d||(l.shieldwallT=7,l.arrowHits=0)}if(l.shieldwallT>0&&l.leader&&!l.leader.dead){const[d]=xi(l.leader,5,u=>u.kind!=="arch");d&&(l.shieldwallT=0)}}if(l.leader.dead&&ep(h)&&(l.leaderDeadT-=n,l.leaderDeadT<=0)){const[d,u]=wr(he[Se(h)],h>=4?9:0,7),_=to(h,d,u,"captain",l.human);l.leader=_,l.plan=null,h===m.myTi&&(m.player=_,pt.emit("respawnMe",_)),l.human&&Xt("respawn",h)}}}),m.mode==="dm"){const l=m.teams.map((d,u)=>[d.tickets,u]).filter(d=>m.teams[d[1]].active&&m.teams[d[1]].alive).sort((d,u)=>u[0]-d[0]),h=l.length>1&&l[0][0]-l[1][0]>=10?l[0][1]:-1;h!==m.bounty&&(m.bounty=h,h>=0&&Xt("bounty",h))}const t=m.player;t&&!t.dead&&e&&(vp(t,e,n),(e.attackHeld||t.atkBuf>0)&&t.cd<=0&&t.stun<=0&&Jr(t));for(const l of m.teams){const h=l.leader;h&&h.human&&!h.dead&&(h.atkBuf>0&&(h.atkBuf-=n,h.remote&&h.cd<=0&&h.stun<=0&&Jr(h)),Hl(h,n))}for(const l of m.teams){const h=l.leader;if(h&&h.human&&!h.dead){const[d]=xi(h,12);!d&&h.hp<h.max&&(h.hp=Math.min(h.max,h.hp+n*6))}}const i=[0,0,0,0,0,0,0,0],r=[0,0,0,0,0,0,0,0],s=[0,0,0,0,0,0,0,0],a=[0,0,0,0,0,0,0,0],o=m.teams.map((l,h)=>Qu(h)),c=m.teams.map((l,h)=>Ju(h)**2);for(const l of m.units){if(l.dead||l.leader)continue;l.kind!=="arch"&&s[l.ti]++;const h=m.teams[l.ti].leader,d=h?h.x-l.x:0,u=h?h.z-l.z:0;l.aura=!!h&&!h.dead&&d*d+u*u<c[l.ti],l.shieldwall=o[l.ti]==="shieldwall";const _=l.kind==="foot"?0:1;l.tkey=m.teams[l.ti].human?1-_:_}for(const l of[0,1])for(const h of m.units)!h.dead&&!h.leader&&h.tkey===l&&(h.tslot=a[h.ti]++);for(const l of m.units)l.dead||(l.cd-=n,l.shootCd-=n,l.javCd-=n,l.stun-=n,l.blockT-=n,l.rt-=n,l.trampleT-=n,l.horseCd>0&&(l.horseCd-=n),l.swing>0&&(l.swing-=n),l.pending&&(l.pending.t-=n,l.pending.t<=0&&pg(l)),l.rt<=0&&(l.rt=ae(.25,.4),[l.foe,l.fd]=xi(l,50)),l.foe&&l.foe.dead&&(l.foe=null,l.fd=1e9),l.foe&&(l.fd=Math.hypot(l.foe.x-l.x,l.foe.z-l.z)),!(l.human||l.dead)&&(l.leader?(mp(l,n),Hl(l,n),Ng(l,m.teams[l.ti],n)):(l.slot=l.kind==="arch"?r[l.ti]++:i[l.ti]++,l.meleeN=s[l.ti],Fg(l,n))));for(const l of m.horses)if(l.t+=n,l.state==="coming"){const h=l.rider;if(h.dead||h.summon!==l){l.state="leaving",l.t=0;continue}const d=h.x-l.x,u=h.z-l.z,_=Math.hypot(d,u)||.01;l.face=Math.atan2(d,u);const x=Math.min(16,_*4);l.x+=d/_*x*n,l.z+=u/_*x*n,l.spd=x,_<1.3&&ug(h,l)}else if(l.state==="ridden"){const h=l.rider;l.x=h.x,l.z=h.z,l.face=h.face,l.spd=Math.hypot(h.vx,h.vz)}else l.state==="leaving"&&(l.x+=Math.sin(l.face)*10*n,l.z+=Math.cos(l.face)*10*n,l.spd=10);m.horses=m.horses.filter(l=>!(l.state==="leaving"&&l.t>3||l.state==="dead"&&l.t>8));for(const l of m.units){if(l.dead||!l.mounted)continue;const h=Math.hypot(l.vx,l.vz);for(const d of m.units){if(d.dead||!In(d,l)||d.mounted)continue;const u=d.x-l.x,_=d.z-l.z;if(Math.abs(u)>4||Math.abs(_)>4)continue;const x=Math.hypot(u,_);if(d.kind==="foot"&&d.tier>=1&&x<d.r+l.r+1.6&&ip(d)&&h>4&&Math.abs(pn(d.face,Math.atan2(l.x-d.x,l.z-d.z)))<1){Rf(l,55),l.mounted&&rs(l,!0),ci(d.x,d.y+1.5,d.z,"#fff3b0",8),It("clang",d.x,d.z),xn("float",{x:d.x,y:d.y+2.8,z:d.z,text:"Spear wall!",color:he[Se(d.ti)].css});break}if(h>6&&x<d.r+l.r+.3&&d.trampleT<=0){d.trampleT=.8,d.lastHit=m.T;const g=Math.atan2(u,_);Sc(d,Math.sin(g)*10+l.vx*.5,Math.cos(g)*10+l.vz*.5,.7),d.hp-=12*tc(l.ti),ci(d.x,d.y+1,d.z,"#c9b28a",6),It("trample",d.x,d.z),d.hp<=0&&Df(d,l,g)}}Math.random()<n*h*.9&&It("hoof",l.x,l.z)}const f=m.units.filter(l=>!l.dead);for(let l=0;l<f.length;l++){const h=f[l];for(let d=l+1;d<f.length;d++){const u=f[d],_=u.x-h.x,x=u.z-h.z,g=h.r+u.r;if(_>g||_<-g||x>g||x<-g)continue;const p=Math.hypot(_,x)||.01;if(p>=g)continue;const v=(g-p)/2,y=_/p,b=x/p;let C=h.remote?0:h.human||h.mounted?.4:1,w=u.remote?0:u.human||u.mounted?.4:1;C===0&&(w=2),w===0&&(C=2),h.x-=y*v*C,h.z-=b*v*C,u.x+=y*v*w,u.z+=b*v*w}}for(const l of m.units){if(l.dead){Uf(l,n);continue}if(l.remote){l.y=wt(l.x,l.z)+(l.jy||0);continue}xp(l,n,l.z)}m.units=m.units.filter(l=>!(l.dead&&l.deadT>14)),he.forEach((l,h)=>{const d=m.teams[h];if(m.mode==="conquest"&&!d.alive||(d.towerT-=n,d.towerT>0))return;d.towerT=1.4;const[u]=xi({x:l.pos[0],z:l.pos[1],ti:h},24);u&&Pf({x:l.pos[0],z:l.pos[1],y:0,vx:0,vz:0,ti:h,tower:!0},u,5.5)}),Mp(n,!0),Ag(n),Eg(n),Tg()}function Uf(n,e){n.deadT+=e,n.x+=n.vx*e,n.z+=n.vz*e,n.vy-=18*e;const t=wt(n.x,n.z);n.y=Math.max(t,n.y+n.vy*e);const i=Math.pow(n.y>t?.6:.03,e);n.vx*=i,n.vz*=i}function Mp(n,e){for(const t of m.arrows){if(t.stuck){t.life-=n;continue}t.t+=n/t.dur;const i=Math.min(1,t.t),r=t.x0+(t.x1-t.x0)*i,s=t.z0+(t.z1-t.z0)*i,a=t.y0+(t.y1-t.y0)*i+t.peak*4*i*(1-i);if(t.px=t.x,t.py=t.y,t.pz=t.z,t.x=r,t.y=a,t.z=s,a<8&&t.t>.12){for(const o of rg(r,s))if(!(a>o.h+wt(o.x,o.z)||o.gate&&!Yu(o))&&Math.abs(o.x-r)<o.r&&Math.abs(o.z-s)<o.r&&Math.hypot(o.x-r,o.z-s)<o.r){t.stuck=!0,t.life=2,It("thud",r,s),ci(r,a,s,"#8a7a62",3);break}if(t.stuck)continue}if(t.t>=1)if(e){let o=null,c=1;for(const f of m.units){if(f.dead||!li(f.ti,t.ti))continue;const l=Math.hypot(f.x-t.x1,f.z-t.z1)-(f.mounted?.5:0);l<c&&(c=l,o=f)}o?(gg(t,o),t.done=!0):(t.stuck=!0,t.life=3)}else t.stuck=!0,t.life=2.5}m.arrows=m.arrows.filter(t=>!(t.done||t.stuck&&t.life<=0))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Nf="160",Hg=0,xh=1,Gg=2,zf=1,bp=2,Gi=3,Ar=0,$t=1,Lt=2,Mr=0,js=1,vh=2,yh=3,Mh=4,Vg=5,Br=100,Wg=101,jg=102,bh=103,Sh=104,Xg=200,$g=201,qg=202,Yg=203,Gl=204,Vl=205,Kg=206,Jg=207,Zg=208,Qg=209,e_=210,t_=211,n_=212,i_=213,r_=214,s_=0,o_=1,a_=2,nc=3,c_=4,l_=5,f_=6,h_=7,Ec=0,d_=1,u_=2,br=0,p_=1,m_=2,g_=3,Sp=4,__=5,x_=6,Tp=300,no=301,io=302,Wl=303,jl=304,wc=306,ro=1e3,vi=1001,Xl=1002,Pn=1003,Th=1004,jc=1005,si=1006,v_=1007,Go=1008,Sr=1009,y_=1010,M_=1011,Of=1012,Ep=1013,pr=1014,mr=1015,Vo=1016,wp=1017,Ap=1018,Zr=1020,b_=1021,yi=1023,S_=1024,T_=1025,Qr=1026,so=1027,E_=1028,Cp=1029,w_=1030,Rp=1031,Pp=1033,Xc=33776,$c=33777,qc=33778,Yc=33779,Eh=35840,wh=35841,Ah=35842,Ch=35843,Lp=36196,Rh=37492,Ph=37496,Lh=37808,Ih=37809,Dh=37810,kh=37811,Uh=37812,Nh=37813,zh=37814,Oh=37815,Fh=37816,Bh=37817,Hh=37818,Gh=37819,Vh=37820,Wh=37821,Kc=36492,jh=36494,Xh=36495,A_=36283,$h=36284,qh=36285,Yh=36286,Ip=3e3,es=3001,C_=3200,R_=3201,Ff=0,P_=1,qn="",Ot="srgb",Ji="srgb-linear",Bf="display-p3",Ac="display-p3-linear",ic="linear",At="srgb",rc="rec709",sc="p3",ps=7680,Kh=519,L_=512,I_=513,D_=514,Dp=515,k_=516,U_=517,N_=518,z_=519,Jh=35044,Zh=35048,Qh="300 es",$l=1035,qi=2e3,oc=2001;class uo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jc=Math.PI/180,ql=180/Math.PI;function ta(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]).toLowerCase()}function Fn(n,e,t){return Math.max(e,Math.min(t,n))}function O_(n,e){return(n%e+e)%e}function Zc(n,e,t){return(1-t)*n+t*e}function ed(n){return(n&n-1)===0&&n!==0}function Yl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function yo(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class nt{constructor(e=0,t=0){nt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,i,r,s,a,o,c,f){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f)}set(e,t,i,r,s,a,o,c,f){const l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=s,l[5]=c,l[6]=i,l[7]=a,l[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],f=i[1],l=i[4],h=i[7],d=i[2],u=i[5],_=i[8],x=r[0],g=r[3],p=r[6],v=r[1],y=r[4],b=r[7],C=r[2],w=r[5],R=r[8];return s[0]=a*x+o*v+c*C,s[3]=a*g+o*y+c*w,s[6]=a*p+o*b+c*R,s[1]=f*x+l*v+h*C,s[4]=f*g+l*y+h*w,s[7]=f*p+l*b+h*R,s[2]=d*x+u*v+_*C,s[5]=d*g+u*y+_*w,s[8]=d*p+u*b+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8];return t*a*l-t*o*f-i*s*l+i*o*c+r*s*f-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=l*a-o*f,d=o*c-l*s,u=f*s-a*c,_=t*h+i*d+r*u;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=h*x,e[1]=(r*f-l*i)*x,e[2]=(o*i-r*a)*x,e[3]=d*x,e[4]=(l*t-r*c)*x,e[5]=(r*s-o*t)*x,e[6]=u*x,e[7]=(i*c-f*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),f=Math.sin(s);return this.set(i*c,i*f,-i*(c*a+f*o)+a+e,-r*f,r*c,-r*(-f*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qc=new et;function kp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ac(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function F_(){const n=ac("canvas");return n.style.display="block",n}const td={};function Uo(n){n in td||(td[n]=!0,console.warn(n))}const nd=new et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),id=new et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),la={[Ji]:{transfer:ic,primaries:rc,toReference:n=>n,fromReference:n=>n},[Ot]:{transfer:At,primaries:rc,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ac]:{transfer:ic,primaries:sc,toReference:n=>n.applyMatrix3(id),fromReference:n=>n.applyMatrix3(nd)},[Bf]:{transfer:At,primaries:sc,toReference:n=>n.convertSRGBToLinear().applyMatrix3(id),fromReference:n=>n.applyMatrix3(nd).convertLinearToSRGB()}},B_=new Set([Ji,Ac]),_t={enabled:!0,_workingColorSpace:Ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!B_.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=la[e].toReference,r=la[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return la[n].primaries},getTransfer:function(n){return n===qn?ic:la[n].transfer}};function Xs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function el(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ms;class Up{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=ac("canvas")),ms.width=e.width,ms.height=e.height;const i=ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=ac("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Xs(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xs(t[i]/255)*255):t[i]=Xs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let H_=0;class Np{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:H_++}),this.uuid=ta(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(tl(r[a].image)):s.push(tl(r[a]))}else s=tl(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function tl(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Up.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let G_=0;class Gn extends uo{constructor(e=Gn.DEFAULT_IMAGE,t=Gn.DEFAULT_MAPPING,i=vi,r=vi,s=si,a=Go,o=yi,c=Sr,f=Gn.DEFAULT_ANISOTROPY,l=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=ta(),this.name="",this.source=new Np(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=f,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(Uo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===es?Ot:qn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ro:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case Xl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ro:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case Xl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Uo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ot?es:Ip}set encoding(e){Uo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===es?Ot:qn}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Tp;Gn.DEFAULT_ANISOTROPY=1;class cn{constructor(e=0,t=0,i=0,r=1){cn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,f=c[0],l=c[4],h=c[8],d=c[1],u=c[5],_=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(l-d)<.01&&Math.abs(h-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+x)<.1&&Math.abs(_+g)<.1&&Math.abs(f+u+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(f+1)/2,b=(u+1)/2,C=(p+1)/2,w=(l+d)/4,R=(h+x)/4,L=(_+g)/4;return y>b&&y>C?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=w/i,s=R/i):b>C?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=w/r,s=L/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=R/s,r=L/s),this.set(i,r,s,t),this}let v=Math.sqrt((g-_)*(g-_)+(h-x)*(h-x)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(g-_)/v,this.y=(h-x)/v,this.z=(d-l)/v,this.w=Math.acos((f+u+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class V_ extends uo{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new cn(0,0,e,t),this.scissorTest=!1,this.viewport=new cn(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Uo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===es?Ot:qn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:si,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Gn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Np(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends V_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zp extends Gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class W_ extends Gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],f=i[r+1],l=i[r+2],h=i[r+3];const d=s[a+0],u=s[a+1],_=s[a+2],x=s[a+3];if(o===0){e[t+0]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=u,e[t+2]=_,e[t+3]=x;return}if(h!==x||c!==d||f!==u||l!==_){let g=1-o;const p=c*d+f*u+l*_+h*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,p*v);g=Math.sin(g*w)/C,o=Math.sin(o*w)/C}const b=o*v;if(c=c*g+d*b,f=f*g+u*b,l=l*g+_*b,h=h*g+x*b,g===1-o){const C=1/Math.sqrt(c*c+f*f+l*l+h*h);c*=C,f*=C,l*=C,h*=C}}e[t]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],f=i[r+2],l=i[r+3],h=s[a],d=s[a+1],u=s[a+2],_=s[a+3];return e[t]=o*_+l*h+c*u-f*d,e[t+1]=c*_+l*d+f*h-o*u,e[t+2]=f*_+l*u+o*d-c*h,e[t+3]=l*_-o*h-c*d-f*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,f=o(i/2),l=o(r/2),h=o(s/2),d=c(i/2),u=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*l*h+f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h-d*u*_;break;case"YXZ":this._x=d*l*h+f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h+d*u*_;break;case"ZXY":this._x=d*l*h-f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h-d*u*_;break;case"ZYX":this._x=d*l*h-f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h+d*u*_;break;case"YZX":this._x=d*l*h+f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h-d*u*_;break;case"XZY":this._x=d*l*h-f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h+d*u*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],f=t[2],l=t[6],h=t[10],d=i+o+h;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(l-c)*u,this._y=(s-f)*u,this._z=(a-r)*u}else if(i>o&&i>h){const u=2*Math.sqrt(1+i-o-h);this._w=(l-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+f)/u}else if(o>h){const u=2*Math.sqrt(1+o-i-h);this._w=(s-f)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+l)/u}else{const u=2*Math.sqrt(1+h-i-o);this._w=(a-r)/u,this._x=(s+f)/u,this._y=(c+l)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,f=t._z,l=t._w;return this._x=i*l+a*o+r*f-s*c,this._y=r*l+a*c+s*o-i*f,this._z=s*l+a*f+i*c-r*o,this._w=a*l-i*o-r*c-s*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const u=1-t;return this._w=u*a+t*this._w,this._x=u*i+t*this._x,this._y=u*r+t*this._y,this._z=u*s+t*this._z,this.normalize(),this}const f=Math.sqrt(c),l=Math.atan2(f,o),h=Math.sin((1-t)*l)/f,d=Math.sin(t*l)/f;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,f=2*(a*r-o*i),l=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*f+a*h-o*l,this.y=i+c*l+o*f-s*h,this.z=r+c*h+s*l-a*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return nl.copy(this).projectOnVector(e),this.sub(nl)}reflect(e){return this.sub(nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nl=new D,rd=new hi;class os{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,di):di.fromBufferAttribute(s,a),di.applyMatrix4(e.matrixWorld),this.expandByPoint(di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fa.copy(i.boundingBox)),fa.applyMatrix4(e.matrixWorld),this.union(fa)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,di),di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mo),ha.subVectors(this.max,Mo),gs.subVectors(e.a,Mo),_s.subVectors(e.b,Mo),xs.subVectors(e.c,Mo),er.subVectors(_s,gs),tr.subVectors(xs,_s),Dr.subVectors(gs,xs);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Dr.z,Dr.y,er.z,0,-er.x,tr.z,0,-tr.x,Dr.z,0,-Dr.x,-er.y,er.x,0,-tr.y,tr.x,0,-Dr.y,Dr.x,0];return!il(t,gs,_s,xs,ha)||(t=[1,0,0,0,1,0,0,0,1],!il(t,gs,_s,xs,ha))?!1:(da.crossVectors(er,tr),t=[da.x,da.y,da.z],il(t,gs,_s,xs,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ni=[new D,new D,new D,new D,new D,new D,new D,new D],di=new D,fa=new os,gs=new D,_s=new D,xs=new D,er=new D,tr=new D,Dr=new D,Mo=new D,ha=new D,da=new D,kr=new D;function il(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){kr.fromArray(n,s);const o=r.x*Math.abs(kr.x)+r.y*Math.abs(kr.y)+r.z*Math.abs(kr.z),c=e.dot(kr),f=t.dot(kr),l=i.dot(kr);if(Math.max(-Math.max(c,f,l),Math.min(c,f,l))>o)return!1}return!0}const j_=new os,bo=new D,rl=new D;class na{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):j_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bo.subVectors(e,this.center);const t=bo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(bo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bo.copy(e.center).add(rl)),this.expandByPoint(bo.copy(e.center).sub(rl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zi=new D,sl=new D,ua=new D,nr=new D,ol=new D,pa=new D,al=new D;class X_{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,t),zi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){sl.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),nr.copy(this.origin).sub(sl);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ua),o=nr.dot(this.direction),c=-nr.dot(ua),f=nr.lengthSq(),l=Math.abs(1-a*a);let h,d,u,_;if(l>0)if(h=a*c-o,d=a*o-c,_=s*l,h>=0)if(d>=-_)if(d<=_){const x=1/l;h*=x,d*=x,u=h*(h+a*d+2*o)+d*(a*h+d+2*c)+f}else d=s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*c)+f;else d=-s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*c)+f;else d<=-_?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),u=-h*h+d*(d+2*c)+f):d<=_?(h=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+f):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),u=-h*h+d*(d+2*c)+f);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),u=-h*h+d*(d+2*c)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(sl).addScaledVector(ua,d),u}intersectSphere(e,t){zi.subVectors(e.center,this.origin);const i=zi.dot(this.direction),r=zi.dot(zi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const f=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return f>=0?(i=(e.min.x-d.x)*f,r=(e.max.x-d.x)*f):(i=(e.max.x-d.x)*f,r=(e.min.x-d.x)*f),l>=0?(s=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(s=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,t,i,r,s){ol.subVectors(t,e),pa.subVectors(i,e),al.crossVectors(ol,pa);let a=this.direction.dot(al),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;nr.subVectors(this.origin,e);const c=o*this.direction.dot(pa.crossVectors(nr,pa));if(c<0)return null;const f=o*this.direction.dot(ol.cross(nr));if(f<0||c+f>a)return null;const l=-o*nr.dot(al);return l<0?null:this.at(l/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,i,r,s,a,o,c,f,l,h,d,u,_,x,g){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f,l,h,d,u,_,x,g)}set(e,t,i,r,s,a,o,c,f,l,h,d,u,_,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=f,p[6]=l,p[10]=h,p[14]=d,p[3]=u,p[7]=_,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/vs.setFromMatrixColumn(e,0).length(),s=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),f=Math.sin(r),l=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*l,u=a*h,_=o*l,x=o*h;t[0]=c*l,t[4]=-c*h,t[8]=f,t[1]=u+_*f,t[5]=d-x*f,t[9]=-o*c,t[2]=x-d*f,t[6]=_+u*f,t[10]=a*c}else if(e.order==="YXZ"){const d=c*l,u=c*h,_=f*l,x=f*h;t[0]=d+x*o,t[4]=_*o-u,t[8]=a*f,t[1]=a*h,t[5]=a*l,t[9]=-o,t[2]=u*o-_,t[6]=x+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*l,u=c*h,_=f*l,x=f*h;t[0]=d-x*o,t[4]=-a*h,t[8]=_+u*o,t[1]=u+_*o,t[5]=a*l,t[9]=x-d*o,t[2]=-a*f,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*l,u=a*h,_=o*l,x=o*h;t[0]=c*l,t[4]=_*f-u,t[8]=d*f+x,t[1]=c*h,t[5]=x*f+d,t[9]=u*f-_,t[2]=-f,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,u=a*f,_=o*c,x=o*f;t[0]=c*l,t[4]=x-d*h,t[8]=_*h+u,t[1]=h,t[5]=a*l,t[9]=-o*l,t[2]=-f*l,t[6]=u*h+_,t[10]=d-x*h}else if(e.order==="XZY"){const d=a*c,u=a*f,_=o*c,x=o*f;t[0]=c*l,t[4]=-h,t[8]=f*l,t[1]=d*h+x,t[5]=a*l,t[9]=u*h-_,t[2]=_*h-u,t[6]=o*l,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($_,e,q_)}lookAt(e,t,i){const r=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),ir.crossVectors(i,Wn),ir.lengthSq()===0&&(Math.abs(i.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),ir.crossVectors(i,Wn)),ir.normalize(),ma.crossVectors(Wn,ir),r[0]=ir.x,r[4]=ma.x,r[8]=Wn.x,r[1]=ir.y,r[5]=ma.y,r[9]=Wn.y,r[2]=ir.z,r[6]=ma.z,r[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],f=i[12],l=i[1],h=i[5],d=i[9],u=i[13],_=i[2],x=i[6],g=i[10],p=i[14],v=i[3],y=i[7],b=i[11],C=i[15],w=r[0],R=r[4],L=r[8],M=r[12],S=r[1],N=r[5],W=r[9],z=r[13],P=r[2],k=r[6],V=r[10],Y=r[14],X=r[3],q=r[7],K=r[11],ne=r[15];return s[0]=a*w+o*S+c*P+f*X,s[4]=a*R+o*N+c*k+f*q,s[8]=a*L+o*W+c*V+f*K,s[12]=a*M+o*z+c*Y+f*ne,s[1]=l*w+h*S+d*P+u*X,s[5]=l*R+h*N+d*k+u*q,s[9]=l*L+h*W+d*V+u*K,s[13]=l*M+h*z+d*Y+u*ne,s[2]=_*w+x*S+g*P+p*X,s[6]=_*R+x*N+g*k+p*q,s[10]=_*L+x*W+g*V+p*K,s[14]=_*M+x*z+g*Y+p*ne,s[3]=v*w+y*S+b*P+C*X,s[7]=v*R+y*N+b*k+C*q,s[11]=v*L+y*W+b*V+C*K,s[15]=v*M+y*z+b*Y+C*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],f=e[13],l=e[2],h=e[6],d=e[10],u=e[14],_=e[3],x=e[7],g=e[11],p=e[15];return _*(+s*c*h-r*f*h-s*o*d+i*f*d+r*o*u-i*c*u)+x*(+t*c*u-t*f*d+s*a*d-r*a*u+r*f*l-s*c*l)+g*(+t*f*h-t*o*u-s*a*h+i*a*u+s*o*l-i*f*l)+p*(-r*o*l-t*c*h+t*o*d+r*a*h-i*a*d+i*c*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=e[9],d=e[10],u=e[11],_=e[12],x=e[13],g=e[14],p=e[15],v=h*g*f-x*d*f+x*c*u-o*g*u-h*c*p+o*d*p,y=_*d*f-l*g*f-_*c*u+a*g*u+l*c*p-a*d*p,b=l*x*f-_*h*f+_*o*u-a*x*u-l*o*p+a*h*p,C=_*h*c-l*x*c-_*o*d+a*x*d+l*o*g-a*h*g,w=t*v+i*y+r*b+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=v*R,e[1]=(x*d*s-h*g*s-x*r*u+i*g*u+h*r*p-i*d*p)*R,e[2]=(o*g*s-x*c*s+x*r*f-i*g*f-o*r*p+i*c*p)*R,e[3]=(h*c*s-o*d*s-h*r*f+i*d*f+o*r*u-i*c*u)*R,e[4]=y*R,e[5]=(l*g*s-_*d*s+_*r*u-t*g*u-l*r*p+t*d*p)*R,e[6]=(_*c*s-a*g*s-_*r*f+t*g*f+a*r*p-t*c*p)*R,e[7]=(a*d*s-l*c*s+l*r*f-t*d*f-a*r*u+t*c*u)*R,e[8]=b*R,e[9]=(_*h*s-l*x*s-_*i*u+t*x*u+l*i*p-t*h*p)*R,e[10]=(a*x*s-_*o*s+_*i*f-t*x*f-a*i*p+t*o*p)*R,e[11]=(l*o*s-a*h*s-l*i*f+t*h*f+a*i*u-t*o*u)*R,e[12]=C*R,e[13]=(l*x*r-_*h*r+_*i*d-t*x*d-l*i*g+t*h*g)*R,e[14]=(_*o*r-a*x*r-_*i*c+t*x*c+a*i*g-t*o*g)*R,e[15]=(a*h*r-l*o*r+l*i*c-t*h*c-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,f=s*a,l=s*o;return this.set(f*a+i,f*o-r*c,f*c+r*o,0,f*o+r*c,l*o+i,l*c-r*a,0,f*c-r*o,l*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,f=s+s,l=a+a,h=o+o,d=s*f,u=s*l,_=s*h,x=a*l,g=a*h,p=o*h,v=c*f,y=c*l,b=c*h,C=i.x,w=i.y,R=i.z;return r[0]=(1-(x+p))*C,r[1]=(u+b)*C,r[2]=(_-y)*C,r[3]=0,r[4]=(u-b)*w,r[5]=(1-(d+p))*w,r[6]=(g+v)*w,r[7]=0,r[8]=(_+y)*R,r[9]=(g-v)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=vs.set(r[0],r[1],r[2]).length();const a=vs.set(r[4],r[5],r[6]).length(),o=vs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ui.copy(this);const f=1/s,l=1/a,h=1/o;return ui.elements[0]*=f,ui.elements[1]*=f,ui.elements[2]*=f,ui.elements[4]*=l,ui.elements[5]*=l,ui.elements[6]*=l,ui.elements[8]*=h,ui.elements[9]*=h,ui.elements[10]*=h,t.setFromRotationMatrix(ui),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=qi){const c=this.elements,f=2*s/(t-e),l=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let u,_;if(o===qi)u=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===oc)u=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=l,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=u,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=qi){const c=this.elements,f=1/(t-e),l=1/(i-r),h=1/(a-s),d=(t+e)*f,u=(i+r)*l;let _,x;if(o===qi)_=(a+s)*h,x=-2*h;else if(o===oc)_=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*f,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-u,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const vs=new D,ui=new tt,$_=new D(0,0,0),q_=new D(1,1,1),ir=new D,ma=new D,Wn=new D,sd=new tt,od=new hi;class Zi{constructor(e=0,t=0,i=0,r=Zi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],f=r[5],l=r[9],h=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Fn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,f),this._z=0);break;case"YXZ":this._x=Math.asin(-Fn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,f)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-a,f)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Fn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,f));break;case"YZX":this._z=Math.asin(Fn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,f),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Fn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,f),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-l,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return od.setFromEuler(this),this.setFromQuaternion(od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zi.DEFAULT_ORDER="XYZ";class Op{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Y_=0;const ad=new D,ys=new hi,Oi=new tt,ga=new D,So=new D,K_=new D,J_=new hi,cd=new D(1,0,0),ld=new D(0,1,0),fd=new D(0,0,1),Z_={type:"added"},Q_={type:"removed"};class ln extends uo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ln.DEFAULT_UP.clone();const e=new D,t=new Zi,i=new hi,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new tt},normalMatrix:{value:new et}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Op,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(cd,e)}rotateY(e){return this.rotateOnAxis(ld,e)}rotateZ(e){return this.rotateOnAxis(fd,e)}translateOnAxis(e,t){return ad.copy(e).applyQuaternion(this.quaternion),this.position.add(ad.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cd,e)}translateY(e){return this.translateOnAxis(ld,e)}translateZ(e){return this.translateOnAxis(fd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ga.copy(e):ga.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),So.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(So,ga,this.up):Oi.lookAt(ga,So,this.up),this.quaternion.setFromRotationMatrix(Oi),r&&(Oi.extractRotation(r.matrixWorld),ys.setFromRotationMatrix(Oi),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Z_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Q_)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,e,K_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,J_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let f=0,l=c.length;f<l;f++){const h=c[f];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,f=this.material.length;c<f;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),f=a(e.textures),l=a(e.images),h=a(e.shapes),d=a(e.skeletons),u=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),f.length>0&&(i.textures=f),l.length>0&&(i.images=l),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const f in o){const l=o[f];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ln.DEFAULT_UP=new D(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new D,Fi=new D,cl=new D,Bi=new D,Ms=new D,bs=new D,hd=new D,ll=new D,fl=new D,hl=new D;let _a=!1;class gi{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),pi.subVectors(e,t),r.cross(pi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){pi.subVectors(r,t),Fi.subVectors(i,t),cl.subVectors(e,t);const a=pi.dot(pi),o=pi.dot(Fi),c=pi.dot(cl),f=Fi.dot(Fi),l=Fi.dot(cl),h=a*f-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,u=(f*c-o*l)*d,_=(a*l-o*c)*d;return s.set(1-u-_,_,u)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getUV(e,t,i,r,s,a,o,c){return _a===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),_a=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Bi.x),c.addScaledVector(a,Bi.y),c.addScaledVector(o,Bi.z),c)}static isFrontFacing(e,t,i,r){return pi.subVectors(i,t),Fi.subVectors(e,t),pi.cross(Fi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),Fi.subVectors(this.a,this.b),pi.cross(Fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return _a===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),_a=!0),gi.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return gi.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Ms.subVectors(r,i),bs.subVectors(s,i),ll.subVectors(e,i);const c=Ms.dot(ll),f=bs.dot(ll);if(c<=0&&f<=0)return t.copy(i);fl.subVectors(e,r);const l=Ms.dot(fl),h=bs.dot(fl);if(l>=0&&h<=l)return t.copy(r);const d=c*h-l*f;if(d<=0&&c>=0&&l<=0)return a=c/(c-l),t.copy(i).addScaledVector(Ms,a);hl.subVectors(e,s);const u=Ms.dot(hl),_=bs.dot(hl);if(_>=0&&u<=_)return t.copy(s);const x=u*f-c*_;if(x<=0&&f>=0&&_<=0)return o=f/(f-_),t.copy(i).addScaledVector(bs,o);const g=l*_-u*h;if(g<=0&&h-l>=0&&u-_>=0)return hd.subVectors(s,r),o=(h-l)/(h-l+(u-_)),t.copy(r).addScaledVector(hd,o);const p=1/(g+x+d);return a=x*p,o=d*p,t.copy(i).addScaledVector(Ms,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},xa={h:0,s:0,l:0};function dl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=_t.workingColorSpace){return this.r=e,this.g=t,this.b=i,_t.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=_t.workingColorSpace){if(e=O_(e,1),t=Fn(t,0,1),i=Fn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=dl(a,s,e+1/3),this.g=dl(a,s,e),this.b=dl(a,s,e-1/3)}return _t.toWorkingColorSpace(this,r),this}setStyle(e,t=Ot){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const i=Fp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}copyLinearToSRGB(e){return this.r=el(e.r),this.g=el(e.g),this.b=el(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return _t.fromWorkingColorSpace(_n.copy(this),e),Math.round(Fn(_n.r*255,0,255))*65536+Math.round(Fn(_n.g*255,0,255))*256+Math.round(Fn(_n.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.fromWorkingColorSpace(_n.copy(this),t);const i=_n.r,r=_n.g,s=_n.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,f;const l=(o+a)/2;if(o===a)c=0,f=0;else{const h=a-o;switch(f=l<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=f,e.l=l,e}getRGB(e,t=_t.workingColorSpace){return _t.fromWorkingColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=Ot){_t.fromWorkingColorSpace(_n.copy(this),e);const t=_n.r,i=_n.g,r=_n.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+t,rr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(rr),e.getHSL(xa);const i=Zc(rr.h,xa.h,t),r=Zc(rr.s,xa.s,t),s=Zc(rr.l,xa.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new xe;xe.NAMES=Fp;let ex=0;class po extends uo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=ta(),this.name="",this.type="Material",this.blending=js,this.side=Ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Vl,this.blendEquation=Br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=nc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(i.blending=this.blending),this.side!==Ar&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Gl&&(i.blendSrc=this.blendSrc),this.blendDst!==Vl&&(i.blendDst=this.blendDst),this.blendEquation!==Br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==nc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Si extends po{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new D,va=new nt;class Ti{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Jh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)va.fromBufferAttribute(this,t),va.applyMatrix3(e),this.setXY(t,va.x,va.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=yo(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Un(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),r=Un(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),r=Un(r,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jh&&(e.usage=this.usage),e}}class Bp extends Ti{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Hp extends Ti{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class mt extends Ti{constructor(e,t,i){super(new Float32Array(e),t,i)}}let tx=0;const Qn=new tt,ul=new ln,Ss=new D,jn=new os,To=new os,Zt=new D;class kn extends uo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=ta(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kp(e)?Hp:Bp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new et().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,i){return Qn.makeTranslation(e,t,i),this.applyMatrix4(Qn),this}scale(e,t,i){return Qn.makeScale(e,t,i),this.applyMatrix4(Qn),this}lookAt(e){return ul.lookAt(e),ul.updateMatrix(),this.applyMatrix4(ul.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new mt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];jn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new na);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];To.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(jn.min,To.min),jn.expandByPoint(Zt),Zt.addVectors(jn.max,To.max),jn.expandByPoint(Zt)):(jn.expandByPoint(To.min),jn.expandByPoint(To.max))}jn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let f=0,l=o.count;f<l;f++)Zt.fromBufferAttribute(o,f),c&&(Ss.fromBufferAttribute(e,f),Zt.add(Ss)),r=Math.max(r,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ti(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,f=[],l=[];for(let S=0;S<o;S++)f[S]=new D,l[S]=new D;const h=new D,d=new D,u=new D,_=new nt,x=new nt,g=new nt,p=new D,v=new D;function y(S,N,W){h.fromArray(r,S*3),d.fromArray(r,N*3),u.fromArray(r,W*3),_.fromArray(a,S*2),x.fromArray(a,N*2),g.fromArray(a,W*2),d.sub(h),u.sub(h),x.sub(_),g.sub(_);const z=1/(x.x*g.y-g.x*x.y);isFinite(z)&&(p.copy(d).multiplyScalar(g.y).addScaledVector(u,-x.y).multiplyScalar(z),v.copy(u).multiplyScalar(x.x).addScaledVector(d,-g.x).multiplyScalar(z),f[S].add(p),f[N].add(p),f[W].add(p),l[S].add(v),l[N].add(v),l[W].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let S=0,N=b.length;S<N;++S){const W=b[S],z=W.start,P=W.count;for(let k=z,V=z+P;k<V;k+=3)y(i[k+0],i[k+1],i[k+2])}const C=new D,w=new D,R=new D,L=new D;function M(S){R.fromArray(s,S*3),L.copy(R);const N=f[S];C.copy(N),C.sub(R.multiplyScalar(R.dot(N))).normalize(),w.crossVectors(L,N);const z=w.dot(l[S])<0?-1:1;c[S*4]=C.x,c[S*4+1]=C.y,c[S*4+2]=C.z,c[S*4+3]=z}for(let S=0,N=b.length;S<N;++S){const W=b[S],z=W.start,P=W.count;for(let k=z,V=z+P;k<V;k+=3)M(i[k+0]),M(i[k+1]),M(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ti(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,c=new D,f=new D,l=new D,h=new D;if(e)for(let d=0,u=e.count;d<u;d+=3){const _=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),f.fromBufferAttribute(i,g),o.add(l),c.add(l),f.add(l),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(g,f.x,f.y,f.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,c){const f=o.array,l=o.itemSize,h=o.normalized,d=new f.constructor(c.length*l);let u=0,_=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?u=c[x]*o.data.stride+o.offset:u=c[x]*l;for(let p=0;p<l;p++)d[_++]=f[u++]}return new Ti(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],f=e(c,i);t.setAttribute(o,f)}const s=this.morphAttributes;for(const o in s){const c=[],f=s[o];for(let l=0,h=f.length;l<h;l++){const d=f[l],u=e(d,i);c.push(u)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const f=a[o];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const f in c)c[f]!==void 0&&(e[f]=c[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const f=i[c];e.data.attributes[c]=f.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const f=this.morphAttributes[c],l=[];for(let h=0,d=f.length;h<d;h++){const u=f[h];l.push(u.toJSON(e.data))}l.length>0&&(r[c]=l,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const f in r){const l=r[f];this.setAttribute(f,l.clone(t))}const s=e.morphAttributes;for(const f in s){const l=[],h=s[f];for(let d=0,u=h.length;d<u;d++)l.push(h[d].clone(t));this.morphAttributes[f]=l}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let f=0,l=a.length;f<l;f++){const h=a[f];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dd=new tt,Ur=new X_,ya=new na,ud=new D,Ts=new D,Es=new D,ws=new D,pl=new D,Ma=new D,ba=new nt,Sa=new nt,Ta=new nt,pd=new D,md=new D,gd=new D,Ea=new D,wa=new D;class ye extends ln{constructor(e=new kn,t=new Si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ma.set(0,0,0);for(let c=0,f=s.length;c<f;c++){const l=o[c],h=s[c];l!==0&&(pl.fromBufferAttribute(h,e),a?Ma.addScaledVector(pl,l):Ma.addScaledVector(pl.sub(t),l))}t.add(Ma)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ya.copy(i.boundingSphere),ya.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),!(ya.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(ya,ud)===null||Ur.origin.distanceToSquared(ud)>(e.far-e.near)**2))&&(dd.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(dd),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ur)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,f=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=d.length;_<x;_++){const g=d[_],p=a[g.materialIndex],v=Math.max(g.start,u.start),y=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let b=v,C=y;b<C;b+=3){const w=o.getX(b),R=o.getX(b+1),L=o.getX(b+2);r=Aa(this,p,e,i,f,l,h,w,R,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,u.start),x=Math.min(o.count,u.start+u.count);for(let g=_,p=x;g<p;g+=3){const v=o.getX(g),y=o.getX(g+1),b=o.getX(g+2);r=Aa(this,a,e,i,f,l,h,v,y,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,x=d.length;_<x;_++){const g=d[_],p=a[g.materialIndex],v=Math.max(g.start,u.start),y=Math.min(c.count,Math.min(g.start+g.count,u.start+u.count));for(let b=v,C=y;b<C;b+=3){const w=b,R=b+1,L=b+2;r=Aa(this,p,e,i,f,l,h,w,R,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,u.start),x=Math.min(c.count,u.start+u.count);for(let g=_,p=x;g<p;g+=3){const v=g,y=g+1,b=g+2;r=Aa(this,a,e,i,f,l,h,v,y,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function nx(n,e,t,i,r,s,a,o){let c;if(e.side===$t?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Ar,o),c===null)return null;wa.copy(o),wa.applyMatrix4(n.matrixWorld);const f=t.ray.origin.distanceTo(wa);return f<t.near||f>t.far?null:{distance:f,point:wa.clone(),object:n}}function Aa(n,e,t,i,r,s,a,o,c,f){n.getVertexPosition(o,Ts),n.getVertexPosition(c,Es),n.getVertexPosition(f,ws);const l=nx(n,e,t,i,Ts,Es,ws,Ea);if(l){r&&(ba.fromBufferAttribute(r,o),Sa.fromBufferAttribute(r,c),Ta.fromBufferAttribute(r,f),l.uv=gi.getInterpolation(Ea,Ts,Es,ws,ba,Sa,Ta,new nt)),s&&(ba.fromBufferAttribute(s,o),Sa.fromBufferAttribute(s,c),Ta.fromBufferAttribute(s,f),l.uv1=gi.getInterpolation(Ea,Ts,Es,ws,ba,Sa,Ta,new nt),l.uv2=l.uv1),a&&(pd.fromBufferAttribute(a,o),md.fromBufferAttribute(a,c),gd.fromBufferAttribute(a,f),l.normal=gi.getInterpolation(Ea,Ts,Es,ws,pd,md,gd,new D),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const h={a:o,b:c,c:f,normal:new D,materialIndex:0};gi.getNormal(Ts,Es,ws,h.normal),l.face=h}return l}class Ie extends kn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],f=[],l=[],h=[];let d=0,u=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new mt(f,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(h,2));function _(x,g,p,v,y,b,C,w,R,L,M){const S=b/R,N=C/L,W=b/2,z=C/2,P=w/2,k=R+1,V=L+1;let Y=0,X=0;const q=new D;for(let K=0;K<V;K++){const ne=K*N-z;for(let ie=0;ie<k;ie++){const j=ie*S-W;q[x]=j*v,q[g]=ne*y,q[p]=P,f.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[p]=w>0?1:-1,l.push(q.x,q.y,q.z),h.push(ie/R),h.push(1-K/L),Y+=1}}for(let K=0;K<L;K++)for(let ne=0;ne<R;ne++){const ie=d+ne+k*K,j=d+ne+k*(K+1),J=d+(ne+1)+k*(K+1),de=d+(ne+1)+k*K;c.push(ie,j,de),c.push(j,J,de),X+=6}o.addGroup(u,X,M),u+=X,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ie(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function wn(n){const e={};for(let t=0;t<n.length;t++){const i=oo(n[t]);for(const r in i)e[r]=i[r]}return e}function ix(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gp(n){return n.getRenderTarget()===null?n.outputColorSpace:_t.workingColorSpace}const rx={clone:oo,merge:wn};var sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ox=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cr extends po{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sx,this.fragmentShader=ox,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oo(e.uniforms),this.uniformsGroups=ix(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Vp extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=qi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class oi extends Vp{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ql*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ql*2*Math.atan(Math.tan(Jc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Jc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,f=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/f,r*=a.width/c,i*=a.height/f}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const As=-90,Cs=1;class ax extends ln{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new oi(As,Cs,e,t);r.layers=this.layers,this.add(r);const s=new oi(As,Cs,e,t);s.layers=this.layers,this.add(s);const a=new oi(As,Cs,e,t);a.layers=this.layers,this.add(a);const o=new oi(As,Cs,e,t);o.layers=this.layers,this.add(o);const c=new oi(As,Cs,e,t);c.layers=this.layers,this.add(c);const f=new oi(As,Cs,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const f of t)this.remove(f);if(e===qi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===oc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,f,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,f),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,l),e.setRenderTarget(h,d,u),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Wp extends Gn{constructor(e,t,i,r,s,a,o,c,f,l){e=e!==void 0?e:[],t=t!==void 0?t:no,super(e,t,i,r,s,a,o,c,f,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cx extends ss{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Uo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===es?Ot:qn),this.texture=new Wp(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:si}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ie(5,5,5),s=new Cr({name:"CubemapFromEquirect",uniforms:oo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Mr});s.uniforms.tEquirect.value=t;const a=new ye(r,s),o=t.minFilter;return t.minFilter===Go&&(t.minFilter=si),new ax(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const ml=new D,lx=new D,fx=new et;class Or{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ml.subVectors(i,t).cross(lx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ml),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fx.getNormalMatrix(e),r=this.coplanarPoint(ml).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nr=new na,Ca=new D;class Hf{constructor(e=new Or,t=new Or,i=new Or,r=new Or,s=new Or,a=new Or){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=qi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],f=r[4],l=r[5],h=r[6],d=r[7],u=r[8],_=r[9],x=r[10],g=r[11],p=r[12],v=r[13],y=r[14],b=r[15];if(i[0].setComponents(c-s,d-f,g-u,b-p).normalize(),i[1].setComponents(c+s,d+f,g+u,b+p).normalize(),i[2].setComponents(c+a,d+l,g+_,b+v).normalize(),i[3].setComponents(c-a,d-l,g-_,b-v).normalize(),i[4].setComponents(c-o,d-h,g-x,b-y).normalize(),t===qi)i[5].setComponents(c+o,d+h,g+x,b+y).normalize();else if(t===oc)i[5].setComponents(o,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nr)}intersectsSprite(e){return Nr.center.set(0,0,0),Nr.radius=.7071067811865476,Nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ca.x=r.normal.x>0?e.max.x:e.min.x,Ca.y=r.normal.y>0?e.max.y:e.min.y,Ca.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jp(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function hx(n,e){const t=e.isWebGL2,i=new WeakMap;function r(f,l){const h=f.array,d=f.usage,u=h.byteLength,_=n.createBuffer();n.bindBuffer(l,_),n.bufferData(l,h,d),f.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(h instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:u}}function s(f,l,h){const d=l.array,u=l._updateRange,_=l.updateRanges;if(n.bindBuffer(h,f),u.count===-1&&_.length===0&&n.bufferSubData(h,0,d),_.length!==0){for(let x=0,g=_.length;x<g;x++){const p=_[x];t?n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}l.clearUpdateRanges()}u.count!==-1&&(t?n.bufferSubData(h,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count):n.bufferSubData(h,u.offset*d.BYTES_PER_ELEMENT,d.subarray(u.offset,u.offset+u.count)),u.count=-1),l.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),i.get(f)}function o(f){f.isInterleavedBufferAttribute&&(f=f.data);const l=i.get(f);l&&(n.deleteBuffer(l.buffer),i.delete(f))}function c(f,l){if(f.isGLBufferAttribute){const d=i.get(f);(!d||d.version<f.version)&&i.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);const h=i.get(f);if(h===void 0)i.set(f,r(f,l));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,f,l),h.version=f.version}}return{get:a,remove:o,update:c}}class un extends kn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),f=o+1,l=c+1,h=e/o,d=t/c,u=[],_=[],x=[],g=[];for(let p=0;p<l;p++){const v=p*d-a;for(let y=0;y<f;y++){const b=y*h-s;_.push(b,-v,0),x.push(0,0,1),g.push(y/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const y=v+f*p,b=v+f*(p+1),C=v+1+f*(p+1),w=v+1+f*p;u.push(y,b,w),u.push(b,C,w)}this.setIndex(u),this.setAttribute("position",new mt(_,3)),this.setAttribute("normal",new mt(x,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.width,e.height,e.widthSegments,e.heightSegments)}}var dx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ux=`#ifdef USE_ALPHAHASH
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
#endif`,px=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gx=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,_x=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xx=`#ifdef USE_AOMAP
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
#endif`,vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yx=`#ifdef USE_BATCHING
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
#endif`,Mx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,bx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ex=`#ifdef USE_IRIDESCENCE
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
#endif`,wx=`#ifdef USE_BUMPMAP
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
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ix=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,kx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ux=`#define PI 3.141592653589793
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
} // validated`,Nx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zx=`vec3 transformedNormal = objectNormal;
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
#endif`,Ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vx=`
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
}`,Wx=`#ifdef USE_ENVMAP
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
#endif`,jx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,$x=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qx=`#ifdef USE_GRADIENTMAP
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
}`,ev=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rv=`uniform bool receiveShadow;
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
#endif`,sv=`#ifdef USE_ENVMAP
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
#endif`,ov=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fv=`PhysicalMaterial material;
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
#endif`,hv=`struct PhysicalMaterial {
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
}`,dv=`
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
#endif`,uv=`#if defined( RE_IndirectDiffuse )
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
#endif`,pv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_v=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,vv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bv=`#if defined( USE_POINTS_UV )
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
#endif`,Sv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ev=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wv=`#ifdef USE_MORPHNORMALS
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
#endif`,Av=`#ifdef USE_MORPHTARGETS
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
#endif`,Cv=`#ifdef USE_MORPHTARGETS
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
#endif`,Rv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Pv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kv=`#ifdef USE_NORMALMAP
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
#endif`,Uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ov=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$v=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kv=`float getShadowMask() {
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
}`,Jv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zv=`#ifdef USE_SKINNING
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
#endif`,Qv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ey=`#ifdef USE_SKINNING
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
#endif`,ty=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ny=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ry=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sy=`#ifdef USE_TRANSMISSION
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
#endif`,oy=`#ifdef USE_TRANSMISSION
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
#endif`,ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dy=`uniform sampler2D t2D;
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
}`,uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,py=`#ifdef ENVMAP_TYPE_CUBE
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
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_y=`#include <common>
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
}`,xy=`#if DEPTH_PACKING == 3200
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
}`,vy=`#define DISTANCE
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
}`,yy=`#define DISTANCE
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
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,by=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sy=`uniform float scale;
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
}`,Ty=`uniform vec3 diffuse;
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
}`,Ey=`#include <common>
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
}`,wy=`uniform vec3 diffuse;
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
}`,Ay=`#define LAMBERT
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
}`,Cy=`#define LAMBERT
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
}`,Ry=`#define MATCAP
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
}`,Py=`#define MATCAP
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
}`,Ly=`#define NORMAL
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
}`,Iy=`#define NORMAL
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
}`,Dy=`#define PHONG
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
}`,ky=`#define PHONG
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
}`,Uy=`#define STANDARD
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
}`,Ny=`#define STANDARD
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
}`,zy=`#define TOON
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
}`,Oy=`#define TOON
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
}`,Fy=`uniform float size;
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
}`,By=`uniform vec3 diffuse;
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
}`,Hy=`#include <common>
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
}`,Gy=`uniform vec3 color;
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
}`,Vy=`uniform float rotation;
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
}`,Wy=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:dx,alphahash_pars_fragment:ux,alphamap_fragment:px,alphamap_pars_fragment:mx,alphatest_fragment:gx,alphatest_pars_fragment:_x,aomap_fragment:xx,aomap_pars_fragment:vx,batching_pars_vertex:yx,batching_vertex:Mx,begin_vertex:bx,beginnormal_vertex:Sx,bsdfs:Tx,iridescence_fragment:Ex,bumpmap_pars_fragment:wx,clipping_planes_fragment:Ax,clipping_planes_pars_fragment:Cx,clipping_planes_pars_vertex:Rx,clipping_planes_vertex:Px,color_fragment:Lx,color_pars_fragment:Ix,color_pars_vertex:Dx,color_vertex:kx,common:Ux,cube_uv_reflection_fragment:Nx,defaultnormal_vertex:zx,displacementmap_pars_vertex:Ox,displacementmap_vertex:Fx,emissivemap_fragment:Bx,emissivemap_pars_fragment:Hx,colorspace_fragment:Gx,colorspace_pars_fragment:Vx,envmap_fragment:Wx,envmap_common_pars_fragment:jx,envmap_pars_fragment:Xx,envmap_pars_vertex:$x,envmap_physical_pars_fragment:sv,envmap_vertex:qx,fog_vertex:Yx,fog_pars_vertex:Kx,fog_fragment:Jx,fog_pars_fragment:Zx,gradientmap_pars_fragment:Qx,lightmap_fragment:ev,lightmap_pars_fragment:tv,lights_lambert_fragment:nv,lights_lambert_pars_fragment:iv,lights_pars_begin:rv,lights_toon_fragment:ov,lights_toon_pars_fragment:av,lights_phong_fragment:cv,lights_phong_pars_fragment:lv,lights_physical_fragment:fv,lights_physical_pars_fragment:hv,lights_fragment_begin:dv,lights_fragment_maps:uv,lights_fragment_end:pv,logdepthbuf_fragment:mv,logdepthbuf_pars_fragment:gv,logdepthbuf_pars_vertex:_v,logdepthbuf_vertex:xv,map_fragment:vv,map_pars_fragment:yv,map_particle_fragment:Mv,map_particle_pars_fragment:bv,metalnessmap_fragment:Sv,metalnessmap_pars_fragment:Tv,morphcolor_vertex:Ev,morphnormal_vertex:wv,morphtarget_pars_vertex:Av,morphtarget_vertex:Cv,normal_fragment_begin:Rv,normal_fragment_maps:Pv,normal_pars_fragment:Lv,normal_pars_vertex:Iv,normal_vertex:Dv,normalmap_pars_fragment:kv,clearcoat_normal_fragment_begin:Uv,clearcoat_normal_fragment_maps:Nv,clearcoat_pars_fragment:zv,iridescence_pars_fragment:Ov,opaque_fragment:Fv,packing:Bv,premultiplied_alpha_fragment:Hv,project_vertex:Gv,dithering_fragment:Vv,dithering_pars_fragment:Wv,roughnessmap_fragment:jv,roughnessmap_pars_fragment:Xv,shadowmap_pars_fragment:$v,shadowmap_pars_vertex:qv,shadowmap_vertex:Yv,shadowmask_pars_fragment:Kv,skinbase_vertex:Jv,skinning_pars_vertex:Zv,skinning_vertex:Qv,skinnormal_vertex:ey,specularmap_fragment:ty,specularmap_pars_fragment:ny,tonemapping_fragment:iy,tonemapping_pars_fragment:ry,transmission_fragment:sy,transmission_pars_fragment:oy,uv_pars_fragment:ay,uv_pars_vertex:cy,uv_vertex:ly,worldpos_vertex:fy,background_vert:hy,background_frag:dy,backgroundCube_vert:uy,backgroundCube_frag:py,cube_vert:my,cube_frag:gy,depth_vert:_y,depth_frag:xy,distanceRGBA_vert:vy,distanceRGBA_frag:yy,equirect_vert:My,equirect_frag:by,linedashed_vert:Sy,linedashed_frag:Ty,meshbasic_vert:Ey,meshbasic_frag:wy,meshlambert_vert:Ay,meshlambert_frag:Cy,meshmatcap_vert:Ry,meshmatcap_frag:Py,meshnormal_vert:Ly,meshnormal_frag:Iy,meshphong_vert:Dy,meshphong_frag:ky,meshphysical_vert:Uy,meshphysical_frag:Ny,meshtoon_vert:zy,meshtoon_frag:Oy,points_vert:Fy,points_frag:By,shadow_vert:Hy,shadow_frag:Gy,sprite_vert:Vy,sprite_frag:Wy},se={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Li={basic:{uniforms:wn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:wn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new xe(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:wn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:wn([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:wn([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new xe(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:wn([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:wn([se.points,se.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:wn([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:wn([se.common,se.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:wn([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:wn([se.sprite,se.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:wn([se.common,se.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:wn([se.lights,se.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Li.physical={uniforms:wn([Li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ra={r:0,b:0,g:0};function jy(n,e,t,i,r,s,a){const o=new xe(0);let c=s===!0?0:1,f,l,h=null,d=0,u=null;function _(g,p){let v=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?x(o,c):y&&y.isColor&&(x(y,1),v=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===wc)?(l===void 0&&(l=new ye(new Ie(1,1,1),new Cr({name:"BackgroundCubeMaterial",uniforms:oo(Li.backgroundCube.uniforms),vertexShader:Li.backgroundCube.vertexShader,fragmentShader:Li.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=_t.getTransfer(y.colorSpace)!==At,(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(f===void 0&&(f=new ye(new un(2,2),new Cr({name:"BackgroundMaterial",uniforms:oo(Li.background.uniforms),vertexShader:Li.background.vertexShader,fragmentShader:Li.background.fragmentShader,side:Ar,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=y,f.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,f.material.toneMapped=_t.getTransfer(y.colorSpace)!==At,y.matrixAutoUpdate===!0&&y.updateMatrix(),f.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(f.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null))}function x(g,p){g.getRGB(Ra,Gp(n)),i.buffers.color.setClear(Ra.r,Ra.g,Ra.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(g,p=1){o.set(g),c=p,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,x(o,c)},render:_}}function Xy(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=g(null);let f=c,l=!1;function h(P,k,V,Y,X){let q=!1;if(a){const K=x(Y,V,k);f!==K&&(f=K,u(f.object)),q=p(P,Y,V,X),q&&v(P,Y,V,X)}else{const K=k.wireframe===!0;(f.geometry!==Y.id||f.program!==V.id||f.wireframe!==K)&&(f.geometry=Y.id,f.program=V.id,f.wireframe=K,q=!0)}X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(q||l)&&(l=!1,L(P,k,V,Y),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function u(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function _(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function x(P,k,V){const Y=V.wireframe===!0;let X=o[P.id];X===void 0&&(X={},o[P.id]=X);let q=X[k.id];q===void 0&&(q={},X[k.id]=q);let K=q[Y];return K===void 0&&(K=g(d()),q[Y]=K),K}function g(P){const k=[],V=[],Y=[];for(let X=0;X<r;X++)k[X]=0,V[X]=0,Y[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:Y,object:P,attributes:{},index:null}}function p(P,k,V,Y){const X=f.attributes,q=k.attributes;let K=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const J=X[ie];let de=q[ie];if(de===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),J===void 0||J.attribute!==de||de&&J.data!==de.data)return!0;K++}return f.attributesNum!==K||f.index!==Y}function v(P,k,V,Y){const X={},q=k.attributes;let K=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let J=q[ie];J===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(J=P.instanceColor));const de={};de.attribute=J,J&&J.data&&(de.data=J.data),X[ie]=de,K++}f.attributes=X,f.attributesNum=K,f.index=Y}function y(){const P=f.newAttributes;for(let k=0,V=P.length;k<V;k++)P[k]=0}function b(P){C(P,0)}function C(P,k){const V=f.newAttributes,Y=f.enabledAttributes,X=f.attributeDivisors;V[P]=1,Y[P]===0&&(n.enableVertexAttribArray(P),Y[P]=1),X[P]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,k),X[P]=k)}function w(){const P=f.newAttributes,k=f.enabledAttributes;for(let V=0,Y=k.length;V<Y;V++)k[V]!==P[V]&&(n.disableVertexAttribArray(V),k[V]=0)}function R(P,k,V,Y,X,q,K){K===!0?n.vertexAttribIPointer(P,k,V,X,q):n.vertexAttribPointer(P,k,V,Y,X,q)}function L(P,k,V,Y){if(i.isWebGL2===!1&&(P.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const X=Y.attributes,q=V.getAttributes(),K=k.defaultAttributeValues;for(const ne in q){const ie=q[ne];if(ie.location>=0){let j=X[ne];if(j===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(j=P.instanceColor)),j!==void 0){const J=j.normalized,de=j.itemSize,we=t.get(j);if(we===void 0)continue;const Te=we.buffer,He=we.type,Ve=we.bytesPerElement,De=i.isWebGL2===!0&&(He===n.INT||He===n.UNSIGNED_INT||j.gpuType===Ep);if(j.isInterleavedBufferAttribute){const ot=j.data,O=ot.stride,Sn=j.offset;if(ot.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ie.locationSize;Ce++)C(ie.location+Ce,ot.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ce=0;Ce<ie.locationSize;Ce++)b(ie.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,Te);for(let Ce=0;Ce<ie.locationSize;Ce++)R(ie.location+Ce,de/ie.locationSize,He,J,O*Ve,(Sn+de/ie.locationSize*Ce)*Ve,De)}else{if(j.isInstancedBufferAttribute){for(let ot=0;ot<ie.locationSize;ot++)C(ie.location+ot,j.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ot=0;ot<ie.locationSize;ot++)b(ie.location+ot);n.bindBuffer(n.ARRAY_BUFFER,Te);for(let ot=0;ot<ie.locationSize;ot++)R(ie.location+ot,de/ie.locationSize,He,J,de*Ve,de/ie.locationSize*ot*Ve,De)}}else if(K!==void 0){const J=K[ne];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(ie.location,J);break;case 3:n.vertexAttrib3fv(ie.location,J);break;case 4:n.vertexAttrib4fv(ie.location,J);break;default:n.vertexAttrib1fv(ie.location,J)}}}}w()}function M(){W();for(const P in o){const k=o[P];for(const V in k){const Y=k[V];for(const X in Y)_(Y[X].object),delete Y[X];delete k[V]}delete o[P]}}function S(P){if(o[P.id]===void 0)return;const k=o[P.id];for(const V in k){const Y=k[V];for(const X in Y)_(Y[X].object),delete Y[X];delete k[V]}delete o[P.id]}function N(P){for(const k in o){const V=o[k];if(V[P.id]===void 0)continue;const Y=V[P.id];for(const X in Y)_(Y[X].object),delete Y[X];delete V[P.id]}}function W(){z(),l=!0,f!==c&&(f=c,u(f.object))}function z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:z,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfProgram:N,initAttributes:y,enableAttribute:b,disableUnusedAttributes:w}}function $y(n,e,t,i){const r=i.isWebGL2;let s;function a(l){s=l}function o(l,h){n.drawArrays(s,l,h),t.update(h,s,1)}function c(l,h,d){if(d===0)return;let u,_;if(r)u=n,_="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[_](s,l,h,d),t.update(h,s,d)}function f(l,h,d){if(d===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let _=0;_<d;_++)this.render(l[_],h[_]);else{u.multiDrawArraysWEBGL(s,l,0,h,0,d);let _=0;for(let x=0;x<d;x++)_+=h[x];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=f}function qy(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const f=a||e.has("WEBGL_draw_buffers"),l=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),g=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,b=a||e.has("OES_texture_float"),C=y&&b,w=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:f,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:d,maxTextureSize:u,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:g,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:w}}function Yy(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Or,o=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const u=h.length!==0||d||i!==0||r;return r=d,i=h.length,u},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=l(h,d,0)},this.setState=function(h,d,u){const _=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||_===null||_.length===0||s&&!g)s?l(null):f();else{const v=s?0:i,y=v*4;let b=p.clippingState||null;c.value=b,b=l(_,d,y,u);for(let C=0;C!==y;++C)b[C]=t[C];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function f(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function l(h,d,u,_){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=c.value,_!==!0||g===null){const p=u+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,b=u;y!==x;++y,b+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(g,b),g[b+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Ky(n){let e=new WeakMap;function t(a,o){return o===Wl?a.mapping=no:o===jl&&(a.mapping=io),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Wl||o===jl)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const f=new cx(c.height/2);return f.fromEquirectangularTexture(n,a),e.set(a,f),a.addEventListener("dispose",r),t(f.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Xp extends Vp{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,a=s+f*this.view.width,o-=l*this.view.offsetY,c=o-l*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const zs=4,_d=[.125,.215,.35,.446,.526,.582],Hr=20,gl=new Xp,xd=new xe;let _l=null,xl=0,vl=0;const Fr=(1+Math.sqrt(5))/2,Rs=1/Fr,vd=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Fr,Rs),new D(0,Fr,-Rs),new D(Rs,0,Fr),new D(-Rs,0,Fr),new D(Fr,Rs,0),new D(-Fr,Rs,0)];class yd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){_l=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_l,xl,vl),e.scissorTest=!1,Pa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===no||e.mapping===io?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_l=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:si,minFilter:si,generateMipmaps:!1,type:Vo,format:yi,colorSpace:Ji,depthBuffer:!1},r=Md(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Md(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jy(s)),this._blurMaterial=Zy(s,e,t)}return r}_compileMaterial(e){const t=new ye(this._lodPlanes[0],e);this._renderer.compile(t,gl)}_sceneToCubeUV(e,t,i,r){const o=new oi(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,d=l.toneMapping;l.getClearColor(xd),l.toneMapping=br,l.autoClear=!1;const u=new Si({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),_=new ye(new Ie,u);let x=!1;const g=e.background;g?g.isColor&&(u.color.copy(g),e.background=null,x=!0):(u.color.copy(xd),x=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,c[p],0),o.lookAt(f[p],0,0)):v===1?(o.up.set(0,0,c[p]),o.lookAt(0,f[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,f[p]));const y=this._cubeSize;Pa(r,v*y,p>2?y:0,y,y),l.setRenderTarget(r),x&&l.render(_,o),l.render(e,o)}_.geometry.dispose(),_.material.dispose(),l.toneMapping=d,l.autoClear=h,e.background=g}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===no||e.mapping===io;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new ye(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Pa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,gl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=vd[(r-1)%vd.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,f=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,h=new ye(this._lodPlanes[r],f),d=f.uniforms,u=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*u):2*Math.PI/(2*Hr-1),x=s/_,g=isFinite(s)?1+Math.floor(l*x):Hr;g>Hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Hr}`);const p=[];let v=0;for(let R=0;R<Hr;++R){const L=R/x,M=Math.exp(-L*L/2);p.push(M),R===0?v+=M:R<g&&(v+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=_,d.mipInt.value=y-i;const b=this._sizeLods[r],C=3*b*(r>y-zs?r-y+zs:0),w=4*(this._cubeSize-b);Pa(t,C,w,3*b,2*b),c.setRenderTarget(t),c.render(h,gl)}}function Jy(n){const e=[],t=[],i=[];let r=n;const s=n-zs+1+_d.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-zs?c=_d[a-n+zs-1]:a===0&&(c=0),i.push(c);const f=1/(o-2),l=-f,h=1+f,d=[l,l,h,l,h,h,l,l,h,h,l,h],u=6,_=6,x=3,g=2,p=1,v=new Float32Array(x*_*u),y=new Float32Array(g*_*u),b=new Float32Array(p*_*u);for(let w=0;w<u;w++){const R=w%3*2/3-1,L=w>2?0:-1,M=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];v.set(M,x*_*w),y.set(d,g*_*w);const S=[w,w,w,w,w,w];b.set(S,p*_*w)}const C=new kn;C.setAttribute("position",new Ti(v,x)),C.setAttribute("uv",new Ti(y,g)),C.setAttribute("faceIndex",new Ti(b,p)),e.push(C),r>zs&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Md(n,e,t){const i=new ss(n,e,t);return i.texture.mapping=wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Zy(n,e,t){const i=new Float32Array(Hr),r=new D(0,1,0);return new Cr({name:"SphericalGaussianBlur",defines:{n:Hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Gf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function bd(){return new Cr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Sd(){return new Cr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Gf(){return`

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
	`}function Qy(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,f=c===Wl||c===jl,l=c===no||c===io;if(f||l)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new yd(n)),h=f?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(f&&h&&h.height>0||l&&h&&r(h)){t===null&&(t=new yd(n));const d=f?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const f=6;for(let l=0;l<f;l++)o[l]!==void 0&&c++;return c===f}function s(o){const c=o.target;c.removeEventListener("dispose",s);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function eM(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function tM(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const x=d.morphAttributes[_];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",a),delete r[d.id];const u=s.get(d);u&&(e.remove(u),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const u=h.morphAttributes;for(const _ in u){const x=u[_];for(let g=0,p=x.length;g<p;g++)e.update(x[g],n.ARRAY_BUFFER)}}function f(h){const d=[],u=h.index,_=h.attributes.position;let x=0;if(u!==null){const v=u.array;x=u.version;for(let y=0,b=v.length;y<b;y+=3){const C=v[y+0],w=v[y+1],R=v[y+2];d.push(C,w,w,R,R,C)}}else if(_!==void 0){const v=_.array;x=_.version;for(let y=0,b=v.length/3-1;y<b;y+=3){const C=y+0,w=y+1,R=y+2;d.push(C,w,w,R,R,C)}}else return;const g=new(kp(d)?Hp:Bp)(d,1);g.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function l(h){const d=s.get(h);if(d){const u=h.index;u!==null&&d.version<u.version&&f(h)}else f(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:l}}function nM(n,e,t,i){const r=i.isWebGL2;let s;function a(u){s=u}let o,c;function f(u){o=u.type,c=u.bytesPerElement}function l(u,_){n.drawElements(s,_,o,u*c),t.update(_,s,1)}function h(u,_,x){if(x===0)return;let g,p;if(r)g=n,p="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](s,_,o,u*c,x),t.update(_,s,x)}function d(u,_,x){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<x;p++)this.render(u[p]/c,_[p]);else{g.multiDrawElementsWEBGL(s,_,0,o,u,0,x);let p=0;for(let v=0;v<x;v++)p+=_[v];t.update(p,s,1)}}this.setMode=a,this.setIndex=f,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function iM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function rM(n,e){return n[0]-e[0]}function sM(n,e){return Math.abs(e[1])-Math.abs(n[1])}function oM(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new cn,o=[];for(let f=0;f<8;f++)o[f]=[f,0];function c(f,l,h){const d=f.morphTargetInfluences;if(e.isWebGL2===!0){const _=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,x=_!==void 0?_.length:0;let g=s.get(l);if(g===void 0||g.count!==x){let k=function(){z.dispose(),s.delete(l),l.removeEventListener("dispose",k)};var u=k;g!==void 0&&g.texture.dispose();const y=l.morphAttributes.position!==void 0,b=l.morphAttributes.normal!==void 0,C=l.morphAttributes.color!==void 0,w=l.morphAttributes.position||[],R=l.morphAttributes.normal||[],L=l.morphAttributes.color||[];let M=0;y===!0&&(M=1),b===!0&&(M=2),C===!0&&(M=3);let S=l.attributes.position.count*M,N=1;S>e.maxTextureSize&&(N=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const W=new Float32Array(S*N*4*x),z=new zp(W,S,N,x);z.type=mr,z.needsUpdate=!0;const P=M*4;for(let V=0;V<x;V++){const Y=w[V],X=R[V],q=L[V],K=S*N*4*V;for(let ne=0;ne<Y.count;ne++){const ie=ne*P;y===!0&&(a.fromBufferAttribute(Y,ne),W[K+ie+0]=a.x,W[K+ie+1]=a.y,W[K+ie+2]=a.z,W[K+ie+3]=0),b===!0&&(a.fromBufferAttribute(X,ne),W[K+ie+4]=a.x,W[K+ie+5]=a.y,W[K+ie+6]=a.z,W[K+ie+7]=0),C===!0&&(a.fromBufferAttribute(q,ne),W[K+ie+8]=a.x,W[K+ie+9]=a.y,W[K+ie+10]=a.z,W[K+ie+11]=q.itemSize===4?a.w:1)}}g={count:x,texture:z,size:new nt(S,N)},s.set(l,g),l.addEventListener("dispose",k)}let p=0;for(let y=0;y<d.length;y++)p+=d[y];const v=l.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",v),h.getUniforms().setValue(n,"morphTargetInfluences",d),h.getUniforms().setValue(n,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const _=d===void 0?0:d.length;let x=i[l.id];if(x===void 0||x.length!==_){x=[];for(let b=0;b<_;b++)x[b]=[b,0];i[l.id]=x}for(let b=0;b<_;b++){const C=x[b];C[0]=b,C[1]=d[b]}x.sort(sM);for(let b=0;b<8;b++)b<_&&x[b][1]?(o[b][0]=x[b][0],o[b][1]=x[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(rM);const g=l.morphAttributes.position,p=l.morphAttributes.normal;let v=0;for(let b=0;b<8;b++){const C=o[b],w=C[0],R=C[1];w!==Number.MAX_SAFE_INTEGER&&R?(g&&l.getAttribute("morphTarget"+b)!==g[w]&&l.setAttribute("morphTarget"+b,g[w]),p&&l.getAttribute("morphNormal"+b)!==p[w]&&l.setAttribute("morphNormal"+b,p[w]),r[b]=R,v+=R):(g&&l.hasAttribute("morphTarget"+b)===!0&&l.deleteAttribute("morphTarget"+b),p&&l.hasAttribute("morphNormal"+b)===!0&&l.deleteAttribute("morphNormal"+b),r[b]=0)}const y=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(n,"morphTargetBaseInfluence",y),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function aM(n,e,t,i){let r=new WeakMap;function s(c){const f=i.render.frame,l=c.geometry,h=e.get(c,l);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==f&&(d.update(),r.set(d,f))}return h}function a(){r=new WeakMap}function o(c){const f=c.target;f.removeEventListener("dispose",o),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:s,dispose:a}}class $p extends Gn{constructor(e,t,i,r,s,a,o,c,f,l){if(l=l!==void 0?l:Qr,l!==Qr&&l!==so)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===Qr&&(i=pr),i===void 0&&l===so&&(i=Zr),super(null,r,s,a,o,c,l,i,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Pn,this.minFilter=c!==void 0?c:Pn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const qp=new Gn,Yp=new $p(1,1);Yp.compareFunction=Dp;const Kp=new zp,Jp=new W_,Zp=new Wp,Td=[],Ed=[],wd=new Float32Array(16),Ad=new Float32Array(9),Cd=new Float32Array(4);function mo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Td[r];if(s===void 0&&(s=new Float32Array(r),Td[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function qt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Cc(n,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function cM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function lM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function fM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function hM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function dM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;Cd.set(i),n.uniformMatrix2fv(this.addr,!1,Cd),Yt(t,i)}}function uM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;Ad.set(i),n.uniformMatrix3fv(this.addr,!1,Ad),Yt(t,i)}}function pM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(qt(t,i))return;wd.set(i),n.uniformMatrix4fv(this.addr,!1,wd),Yt(t,i)}}function mM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function gM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function _M(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function xM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function vM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function yM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function MM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function bM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function SM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Yp:qp;t.setTexture2D(e||s,r)}function TM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Jp,r)}function EM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Zp,r)}function wM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Kp,r)}function AM(n){switch(n){case 5126:return cM;case 35664:return lM;case 35665:return fM;case 35666:return hM;case 35674:return dM;case 35675:return uM;case 35676:return pM;case 5124:case 35670:return mM;case 35667:case 35671:return gM;case 35668:case 35672:return _M;case 35669:case 35673:return xM;case 5125:return vM;case 36294:return yM;case 36295:return MM;case 36296:return bM;case 35678:case 36198:case 36298:case 36306:case 35682:return SM;case 35679:case 36299:case 36307:return TM;case 35680:case 36300:case 36308:case 36293:return EM;case 36289:case 36303:case 36311:case 36292:return wM}}function CM(n,e){n.uniform1fv(this.addr,e)}function RM(n,e){const t=mo(e,this.size,2);n.uniform2fv(this.addr,t)}function PM(n,e){const t=mo(e,this.size,3);n.uniform3fv(this.addr,t)}function LM(n,e){const t=mo(e,this.size,4);n.uniform4fv(this.addr,t)}function IM(n,e){const t=mo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function DM(n,e){const t=mo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function kM(n,e){const t=mo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function UM(n,e){n.uniform1iv(this.addr,e)}function NM(n,e){n.uniform2iv(this.addr,e)}function zM(n,e){n.uniform3iv(this.addr,e)}function OM(n,e){n.uniform4iv(this.addr,e)}function FM(n,e){n.uniform1uiv(this.addr,e)}function BM(n,e){n.uniform2uiv(this.addr,e)}function HM(n,e){n.uniform3uiv(this.addr,e)}function GM(n,e){n.uniform4uiv(this.addr,e)}function VM(n,e,t){const i=this.cache,r=e.length,s=Cc(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||qp,s[a])}function WM(n,e,t){const i=this.cache,r=e.length,s=Cc(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Jp,s[a])}function jM(n,e,t){const i=this.cache,r=e.length,s=Cc(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Zp,s[a])}function XM(n,e,t){const i=this.cache,r=e.length,s=Cc(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Kp,s[a])}function $M(n){switch(n){case 5126:return CM;case 35664:return RM;case 35665:return PM;case 35666:return LM;case 35674:return IM;case 35675:return DM;case 35676:return kM;case 5124:case 35670:return UM;case 35667:case 35671:return NM;case 35668:case 35672:return zM;case 35669:case 35673:return OM;case 5125:return FM;case 36294:return BM;case 36295:return HM;case 36296:return GM;case 35678:case 36198:case 36298:case 36306:case 35682:return VM;case 35679:case 36299:case 36307:return WM;case 35680:case 36300:case 36308:case 36293:return jM;case 36289:case 36303:case 36311:case 36292:return XM}}class qM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=AM(t.type)}}class YM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$M(t.type)}}class KM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function Rd(n,e){n.seq.push(e),n.map[e.id]=e}function JM(n,e,t){const i=n.name,r=i.length;for(yl.lastIndex=0;;){const s=yl.exec(i),a=yl.lastIndex;let o=s[1];const c=s[2]==="]",f=s[3];if(c&&(o=o|0),f===void 0||f==="["&&a+2===r){Rd(t,f===void 0?new qM(o,n,e):new YM(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new KM(o),Rd(t,h)),t=h}}}class za{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);JM(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Pd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ZM=37297;let QM=0;function eb(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function tb(n){const e=_t.getPrimaries(_t.workingColorSpace),t=_t.getPrimaries(n);let i;switch(e===t?i="":e===sc&&t===rc?i="LinearDisplayP3ToLinearSRGB":e===rc&&t===sc&&(i="LinearSRGBToLinearDisplayP3"),n){case Ji:case Ac:return[i,"LinearTransferOETF"];case Ot:case Bf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ld(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+eb(n.getShaderSource(e),a)}else return r}function nb(n,e){const t=tb(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ib(n,e){let t;switch(e){case p_:t="Linear";break;case m_:t="Reinhard";break;case g_:t="OptimizedCineon";break;case Sp:t="ACESFilmic";break;case x_:t="AgX";break;case __:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function rb(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Os).join(`
`)}function sb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Os).join(`
`)}function ob(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ab(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Os(n){return n!==""}function Id(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(n){return n.replace(cb,fb)}const lb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fb(n,e){let t=je[e];if(t===void 0){const i=lb.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Kl(t)}const hb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kd(n){return n.replace(hb,db)}function db(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ud(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ub(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===zf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===bp?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function pb(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case no:case io:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function mb(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case io:e="ENVMAP_MODE_REFRACTION";break}return e}function gb(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ec:e="ENVMAP_BLENDING_MULTIPLY";break;case d_:e="ENVMAP_BLENDING_MIX";break;case u_:e="ENVMAP_BLENDING_ADD";break}return e}function _b(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function xb(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ub(t),f=pb(t),l=mb(t),h=gb(t),d=_b(t),u=t.isWebGL2?"":rb(t),_=sb(t),x=ob(s),g=r.createProgram();let p,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Os).join(`
`),p.length>0&&(p+=`
`),v=[u,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Os).join(`
`),v.length>0&&(v+=`
`)):(p=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),v=[u,Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==br?"#define TONE_MAPPING":"",t.toneMapping!==br?je.tonemapping_pars_fragment:"",t.toneMapping!==br?ib("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,nb("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Os).join(`
`)),a=Kl(a),a=Id(a,t),a=Dd(a,t),o=Kl(o),o=Id(o,t),o=Dd(o,t),a=kd(a),o=kd(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const b=y+p+a,C=y+v+o,w=Pd(r,r.VERTEX_SHADER,b),R=Pd(r,r.FRAGMENT_SHADER,C);r.attachShader(g,w),r.attachShader(g,R),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function L(W){if(n.debug.checkShaderErrors){const z=r.getProgramInfoLog(g).trim(),P=r.getShaderInfoLog(w).trim(),k=r.getShaderInfoLog(R).trim();let V=!0,Y=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,w,R);else{const X=Ld(r,w,"vertex"),q=Ld(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+X+`
`+q)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(P===""||k==="")&&(Y=!1);Y&&(W.diagnostics={runnable:V,programLog:z,vertexShader:{log:P,prefix:p},fragmentShader:{log:k,prefix:v}})}r.deleteShader(w),r.deleteShader(R),M=new za(r,g),S=ab(r,g)}let M;this.getUniforms=function(){return M===void 0&&L(this),M};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(g,ZM)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=QM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=R,this}let vb=0;class yb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Mb(e),t.set(e,i)),i}}class Mb{constructor(e){this.id=vb++,this.code=e,this.usedTimes=0}}function bb(n,e,t,i,r,s,a){const o=new Op,c=new yb,f=[],l=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let u=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function g(M,S,N,W,z){const P=W.fog,k=z.geometry,V=M.isMeshStandardMaterial?W.environment:null,Y=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),X=Y&&Y.mapping===wc?Y.image.height:null,q=_[M.type];M.precision!==null&&(u=r.getMaxPrecision(M.precision),u!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const K=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ne=K!==void 0?K.length:0;let ie=0;k.morphAttributes.position!==void 0&&(ie=1),k.morphAttributes.normal!==void 0&&(ie=2),k.morphAttributes.color!==void 0&&(ie=3);let j,J,de,we;if(q){const Tn=Li[q];j=Tn.vertexShader,J=Tn.fragmentShader}else j=M.vertexShader,J=M.fragmentShader,c.update(M),de=c.getVertexShaderID(M),we=c.getFragmentShaderID(M);const Te=n.getRenderTarget(),He=z.isInstancedMesh===!0,Ve=z.isBatchedMesh===!0,De=!!M.map,ot=!!M.matcap,O=!!Y,Sn=!!M.aoMap,Ce=!!M.lightMap,Oe=!!M.bumpMap,ve=!!M.normalMap,Rt=!!M.displacementMap,$e=!!M.emissiveMap,A=!!M.metalnessMap,T=!!M.roughnessMap,B=M.anisotropy>0,ee=M.clearcoat>0,Q=M.iridescence>0,te=M.sheen>0,Me=M.transmission>0,fe=B&&!!M.anisotropyMap,me=ee&&!!M.clearcoatMap,Le=ee&&!!M.clearcoatNormalMap,qe=ee&&!!M.clearcoatRoughnessMap,Z=Q&&!!M.iridescenceMap,gt=Q&&!!M.iridescenceThicknessMap,it=te&&!!M.sheenColorMap,Ne=te&&!!M.sheenRoughnessMap,Ae=!!M.specularMap,ge=!!M.specularColorMap,We=!!M.specularIntensityMap,dt=Me&&!!M.transmissionMap,Dt=Me&&!!M.thicknessMap,Je=!!M.gradientMap,re=!!M.alphaMap,I=M.alphaTest>0,ce=!!M.alphaHash,le=!!M.extensions,ke=!!k.attributes.uv1,Re=!!k.attributes.uv2,yt=!!k.attributes.uv3;let Mt=br;return M.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(Mt=n.toneMapping),{isWebGL2:l,shaderID:q,shaderType:M.type,shaderName:M.name,vertexShader:j,fragmentShader:J,defines:M.defines,customVertexShaderID:de,customFragmentShaderID:we,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Ve,instancing:He,instancingColor:He&&z.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Te===null?n.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Ji,map:De,matcap:ot,envMap:O,envMapMode:O&&Y.mapping,envMapCubeUVHeight:X,aoMap:Sn,lightMap:Ce,bumpMap:Oe,normalMap:ve,displacementMap:d&&Rt,emissiveMap:$e,normalMapObjectSpace:ve&&M.normalMapType===P_,normalMapTangentSpace:ve&&M.normalMapType===Ff,metalnessMap:A,roughnessMap:T,anisotropy:B,anisotropyMap:fe,clearcoat:ee,clearcoatMap:me,clearcoatNormalMap:Le,clearcoatRoughnessMap:qe,iridescence:Q,iridescenceMap:Z,iridescenceThicknessMap:gt,sheen:te,sheenColorMap:it,sheenRoughnessMap:Ne,specularMap:Ae,specularColorMap:ge,specularIntensityMap:We,transmission:Me,transmissionMap:dt,thicknessMap:Dt,gradientMap:Je,opaque:M.transparent===!1&&M.blending===js,alphaMap:re,alphaTest:I,alphaHash:ce,combine:M.combine,mapUv:De&&x(M.map.channel),aoMapUv:Sn&&x(M.aoMap.channel),lightMapUv:Ce&&x(M.lightMap.channel),bumpMapUv:Oe&&x(M.bumpMap.channel),normalMapUv:ve&&x(M.normalMap.channel),displacementMapUv:Rt&&x(M.displacementMap.channel),emissiveMapUv:$e&&x(M.emissiveMap.channel),metalnessMapUv:A&&x(M.metalnessMap.channel),roughnessMapUv:T&&x(M.roughnessMap.channel),anisotropyMapUv:fe&&x(M.anisotropyMap.channel),clearcoatMapUv:me&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Le&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qe&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:it&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&x(M.sheenRoughnessMap.channel),specularMapUv:Ae&&x(M.specularMap.channel),specularColorMapUv:ge&&x(M.specularColorMap.channel),specularIntensityMapUv:We&&x(M.specularIntensityMap.channel),transmissionMapUv:dt&&x(M.transmissionMap.channel),thicknessMapUv:Dt&&x(M.thicknessMap.channel),alphaMapUv:re&&x(M.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ve||B),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:ke,vertexUv2s:Re,vertexUv3s:yt,pointsUvs:z.isPoints===!0&&!!k.attributes.uv&&(De||re),fog:!!P,useFog:M.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ie,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:Mt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:De&&M.map.isVideoTexture===!0&&_t.getTransfer(M.map.colorSpace)===At,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Lt,flipSided:M.side===$t,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:le&&M.extensions.derivatives===!0,extensionFragDepth:le&&M.extensions.fragDepth===!0,extensionDrawBuffers:le&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const N in M.defines)S.push(N),S.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(n.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),M.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.useLegacyLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function b(M){const S=_[M.type];let N;if(S){const W=Li[S];N=rx.clone(W.uniforms)}else N=M.uniforms;return N}function C(M,S){let N;for(let W=0,z=f.length;W<z;W++){const P=f[W];if(P.cacheKey===S){N=P,++N.usedTimes;break}}return N===void 0&&(N=new xb(n,S,M,s),f.push(N)),N}function w(M){if(--M.usedTimes===0){const S=f.indexOf(M);f[S]=f[f.length-1],f.pop(),M.destroy()}}function R(M){c.remove(M)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:b,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:f,dispose:L}}function Sb(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Tb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Nd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function zd(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,d,u,_,x,g){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:u,groupOrder:_,renderOrder:h.renderOrder,z:x,group:g},n[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=u,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=x,p.group=g),e++,p}function o(h,d,u,_,x,g){const p=a(h,d,u,_,x,g);u.transmission>0?i.push(p):u.transparent===!0?r.push(p):t.push(p)}function c(h,d,u,_,x,g){const p=a(h,d,u,_,x,g);u.transmission>0?i.unshift(p):u.transparent===!0?r.unshift(p):t.unshift(p)}function f(h,d){t.length>1&&t.sort(h||Tb),i.length>1&&i.sort(d||Nd),r.length>1&&r.sort(d||Nd)}function l(){for(let h=e,d=n.length;h<d;h++){const u=n[h];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:l,sort:f}}function Eb(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new zd,n.set(i,[a])):r>=s.length?(a=new zd,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function wb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new xe};break;case"SpotLight":t={position:new D,direction:new D,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function Ab(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Cb=0;function Rb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Pb(n,e){const t=new wb,i=Ab(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new D);const s=new D,a=new tt,o=new tt;function c(l,h){let d=0,u=0,_=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let x=0,g=0,p=0,v=0,y=0,b=0,C=0,w=0,R=0,L=0,M=0;l.sort(Rb);const S=h===!0?Math.PI:1;for(let W=0,z=l.length;W<z;W++){const P=l[W],k=P.color,V=P.intensity,Y=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=k.r*V*S,u+=k.g*V*S,_+=k.b*V*S;else if(P.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(P.sh.coefficients[q],V);M++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*S),P.castShadow){const K=P.shadow,ne=i.get(P);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,r.directionalShadow[x]=ne,r.directionalShadowMap[x]=X,r.directionalShadowMatrix[x]=P.shadow.matrix,b++}r.directional[x]=q,x++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(k).multiplyScalar(V*S),q.distance=Y,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,r.spot[p]=q;const K=P.shadow;if(P.map&&(r.spotLightMap[R]=P.map,R++,K.updateMatrices(P),P.castShadow&&L++),r.spotLightMatrix[p]=K.matrix,P.castShadow){const ne=i.get(P);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,r.spotShadow[p]=ne,r.spotShadowMap[p]=X,w++}p++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(k).multiplyScalar(V),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),r.rectArea[v]=q,v++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*S),q.distance=P.distance,q.decay=P.decay,P.castShadow){const K=P.shadow,ne=i.get(P);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,ne.shadowCameraNear=K.camera.near,ne.shadowCameraFar=K.camera.far,r.pointShadow[g]=ne,r.pointShadowMap[g]=X,r.pointShadowMatrix[g]=P.shadow.matrix,C++}r.point[g]=q,g++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(V*S),q.groundColor.copy(P.groundColor).multiplyScalar(V*S),r.hemi[y]=q,y++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=u,r.ambient[2]=_;const N=r.hash;(N.directionalLength!==x||N.pointLength!==g||N.spotLength!==p||N.rectAreaLength!==v||N.hemiLength!==y||N.numDirectionalShadows!==b||N.numPointShadows!==C||N.numSpotShadows!==w||N.numSpotMaps!==R||N.numLightProbes!==M)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=v,r.point.length=g,r.hemi.length=y,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+R-L,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=M,N.directionalLength=x,N.pointLength=g,N.spotLength=p,N.rectAreaLength=v,N.hemiLength=y,N.numDirectionalShadows=b,N.numPointShadows=C,N.numSpotShadows=w,N.numSpotMaps=R,N.numLightProbes=M,r.version=Cb++)}function f(l,h){let d=0,u=0,_=0,x=0,g=0;const p=h.matrixWorldInverse;for(let v=0,y=l.length;v<y;v++){const b=l[v];if(b.isDirectionalLight){const C=r.directional[d];C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),d++}else if(b.isSpotLight){const C=r.spot[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),o.identity(),a.copy(b.matrixWorld),a.premultiply(p),o.extractRotation(a),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){const C=r.point[u];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const C=r.hemi[g];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(p),g++}}}return{setup:c,setupView:f,state:r}}function Od(n,e){const t=new Pb(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(h){i.push(h)}function o(h){r.push(h)}function c(h){t.setup(i,h)}function f(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o}}function Lb(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new Od(n,e),t.set(s,[c])):a>=o.length?(c=new Od(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Ib extends po{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=C_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Db extends po{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ub=`uniform sampler2D shadow_pass;
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
}`;function Nb(n,e,t){let i=new Hf;const r=new nt,s=new nt,a=new cn,o=new Ib({depthPacking:R_}),c=new Db,f={},l=t.maxTextureSize,h={[Ar]:$t,[$t]:Ar,[Lt]:Lt},d=new Cr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:kb,fragmentShader:Ub}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const _=new kn;_.setAttribute("position",new Ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ye(_,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zf;let p=this.type;this.render=function(w,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const M=n.getRenderTarget(),S=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Mr),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const z=p!==Gi&&this.type===Gi,P=p===Gi&&this.type!==Gi;for(let k=0,V=w.length;k<V;k++){const Y=w[k],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const q=X.getFrameExtents();if(r.multiply(q),s.copy(X.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/q.x),r.x=s.x*q.x,X.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/q.y),r.y=s.y*q.y,X.mapSize.y=s.y)),X.map===null||z===!0||P===!0){const ne=this.type!==Gi?{minFilter:Pn,magFilter:Pn}:{};X.map!==null&&X.map.dispose(),X.map=new ss(r.x,r.y,ne),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const K=X.getViewportCount();for(let ne=0;ne<K;ne++){const ie=X.getViewport(ne);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),W.viewport(a),X.updateMatrices(Y,ne),i=X.getFrustum(),b(R,L,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===Gi&&v(X,L),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(M,S,N)};function v(w,R){const L=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ss(r.x,r.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,L,d,x,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,L,u,x,null)}function y(w,R,L,M){let S=null;const N=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)S=N;else if(S=L.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const W=S.uuid,z=R.uuid;let P=f[W];P===void 0&&(P={},f[W]=P);let k=P[z];k===void 0&&(k=S.clone(),P[z]=k,R.addEventListener("dispose",C)),S=k}if(S.visible=R.visible,S.wireframe=R.wireframe,M===Gi?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:h[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const W=n.properties.get(S);W.light=L}return S}function b(w,R,L,M,S){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===Gi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const z=e.update(w),P=w.material;if(Array.isArray(P)){const k=z.groups;for(let V=0,Y=k.length;V<Y;V++){const X=k[V],q=P[X.materialIndex];if(q&&q.visible){const K=y(w,q,M,S);w.onBeforeShadow(n,w,R,L,z,K,X),n.renderBufferDirect(L,null,z,K,w,X),w.onAfterShadow(n,w,R,L,z,K,X)}}}else if(P.visible){const k=y(w,P,M,S);w.onBeforeShadow(n,w,R,L,z,k,null),n.renderBufferDirect(L,null,z,k,w,null),w.onAfterShadow(n,w,R,L,z,k,null)}}const W=w.children;for(let z=0,P=W.length;z<P;z++)b(W[z],R,L,M,S)}function C(w){w.target.removeEventListener("dispose",C);for(const L in f){const M=f[L],S=w.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function zb(n,e,t){const i=t.isWebGL2;function r(){let I=!1;const ce=new cn;let le=null;const ke=new cn(0,0,0,0);return{setMask:function(Re){le!==Re&&!I&&(n.colorMask(Re,Re,Re,Re),le=Re)},setLocked:function(Re){I=Re},setClear:function(Re,yt,Mt,Kt,Tn){Tn===!0&&(Re*=Kt,yt*=Kt,Mt*=Kt),ce.set(Re,yt,Mt,Kt),ke.equals(ce)===!1&&(n.clearColor(Re,yt,Mt,Kt),ke.copy(ce))},reset:function(){I=!1,le=null,ke.set(-1,0,0,0)}}}function s(){let I=!1,ce=null,le=null,ke=null;return{setTest:function(Re){Re?Ve(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(Re){ce!==Re&&!I&&(n.depthMask(Re),ce=Re)},setFunc:function(Re){if(le!==Re){switch(Re){case s_:n.depthFunc(n.NEVER);break;case o_:n.depthFunc(n.ALWAYS);break;case a_:n.depthFunc(n.LESS);break;case nc:n.depthFunc(n.LEQUAL);break;case c_:n.depthFunc(n.EQUAL);break;case l_:n.depthFunc(n.GEQUAL);break;case f_:n.depthFunc(n.GREATER);break;case h_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=Re}},setLocked:function(Re){I=Re},setClear:function(Re){ke!==Re&&(n.clearDepth(Re),ke=Re)},reset:function(){I=!1,ce=null,le=null,ke=null}}}function a(){let I=!1,ce=null,le=null,ke=null,Re=null,yt=null,Mt=null,Kt=null,Tn=null;return{setTest:function(bt){I||(bt?Ve(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(bt){ce!==bt&&!I&&(n.stencilMask(bt),ce=bt)},setFunc:function(bt,En,wi){(le!==bt||ke!==En||Re!==wi)&&(n.stencilFunc(bt,En,wi),le=bt,ke=En,Re=wi)},setOp:function(bt,En,wi){(yt!==bt||Mt!==En||Kt!==wi)&&(n.stencilOp(bt,En,wi),yt=bt,Mt=En,Kt=wi)},setLocked:function(bt){I=bt},setClear:function(bt){Tn!==bt&&(n.clearStencil(bt),Tn=bt)},reset:function(){I=!1,ce=null,le=null,ke=null,Re=null,yt=null,Mt=null,Kt=null,Tn=null}}}const o=new r,c=new s,f=new a,l=new WeakMap,h=new WeakMap;let d={},u={},_=new WeakMap,x=[],g=null,p=!1,v=null,y=null,b=null,C=null,w=null,R=null,L=null,M=new xe(0,0,0),S=0,N=!1,W=null,z=null,P=null,k=null,V=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,q=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(K)[1]),X=q>=1):K.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),X=q>=2);let ne=null,ie={};const j=n.getParameter(n.SCISSOR_BOX),J=n.getParameter(n.VIEWPORT),de=new cn().fromArray(j),we=new cn().fromArray(J);function Te(I,ce,le,ke){const Re=new Uint8Array(4),yt=n.createTexture();n.bindTexture(I,yt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Mt=0;Mt<le;Mt++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(ce,0,n.RGBA,1,1,ke,0,n.RGBA,n.UNSIGNED_BYTE,Re):n.texImage2D(ce+Mt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Re);return yt}const He={};He[n.TEXTURE_2D]=Te(n.TEXTURE_2D,n.TEXTURE_2D,1),He[n.TEXTURE_CUBE_MAP]=Te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(He[n.TEXTURE_2D_ARRAY]=Te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),He[n.TEXTURE_3D]=Te(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),f.setClear(0),Ve(n.DEPTH_TEST),c.setFunc(nc),$e(!1),A(xh),Ve(n.CULL_FACE),ve(Mr);function Ve(I){d[I]!==!0&&(n.enable(I),d[I]=!0)}function De(I){d[I]!==!1&&(n.disable(I),d[I]=!1)}function ot(I,ce){return u[I]!==ce?(n.bindFramebuffer(I,ce),u[I]=ce,i&&(I===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ce),I===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ce)),!0):!1}function O(I,ce){let le=x,ke=!1;if(I)if(le=_.get(ce),le===void 0&&(le=[],_.set(ce,le)),I.isWebGLMultipleRenderTargets){const Re=I.texture;if(le.length!==Re.length||le[0]!==n.COLOR_ATTACHMENT0){for(let yt=0,Mt=Re.length;yt<Mt;yt++)le[yt]=n.COLOR_ATTACHMENT0+yt;le.length=Re.length,ke=!0}}else le[0]!==n.COLOR_ATTACHMENT0&&(le[0]=n.COLOR_ATTACHMENT0,ke=!0);else le[0]!==n.BACK&&(le[0]=n.BACK,ke=!0);ke&&(t.isWebGL2?n.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function Sn(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const Ce={[Br]:n.FUNC_ADD,[Wg]:n.FUNC_SUBTRACT,[jg]:n.FUNC_REVERSE_SUBTRACT};if(i)Ce[bh]=n.MIN,Ce[Sh]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Ce[bh]=I.MIN_EXT,Ce[Sh]=I.MAX_EXT)}const Oe={[Xg]:n.ZERO,[$g]:n.ONE,[qg]:n.SRC_COLOR,[Gl]:n.SRC_ALPHA,[e_]:n.SRC_ALPHA_SATURATE,[Zg]:n.DST_COLOR,[Kg]:n.DST_ALPHA,[Yg]:n.ONE_MINUS_SRC_COLOR,[Vl]:n.ONE_MINUS_SRC_ALPHA,[Qg]:n.ONE_MINUS_DST_COLOR,[Jg]:n.ONE_MINUS_DST_ALPHA,[t_]:n.CONSTANT_COLOR,[n_]:n.ONE_MINUS_CONSTANT_COLOR,[i_]:n.CONSTANT_ALPHA,[r_]:n.ONE_MINUS_CONSTANT_ALPHA};function ve(I,ce,le,ke,Re,yt,Mt,Kt,Tn,bt){if(I===Mr){p===!0&&(De(n.BLEND),p=!1);return}if(p===!1&&(Ve(n.BLEND),p=!0),I!==Vg){if(I!==v||bt!==N){if((y!==Br||w!==Br)&&(n.blendEquation(n.FUNC_ADD),y=Br,w=Br),bt)switch(I){case js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vh:n.blendFunc(n.ONE,n.ONE);break;case yh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case yh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,C=null,R=null,L=null,M.set(0,0,0),S=0,v=I,N=bt}return}Re=Re||ce,yt=yt||le,Mt=Mt||ke,(ce!==y||Re!==w)&&(n.blendEquationSeparate(Ce[ce],Ce[Re]),y=ce,w=Re),(le!==b||ke!==C||yt!==R||Mt!==L)&&(n.blendFuncSeparate(Oe[le],Oe[ke],Oe[yt],Oe[Mt]),b=le,C=ke,R=yt,L=Mt),(Kt.equals(M)===!1||Tn!==S)&&(n.blendColor(Kt.r,Kt.g,Kt.b,Tn),M.copy(Kt),S=Tn),v=I,N=!1}function Rt(I,ce){I.side===Lt?De(n.CULL_FACE):Ve(n.CULL_FACE);let le=I.side===$t;ce&&(le=!le),$e(le),I.blending===js&&I.transparent===!1?ve(Mr):ve(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),o.setMask(I.colorWrite);const ke=I.stencilWrite;f.setTest(ke),ke&&(f.setMask(I.stencilWriteMask),f.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),f.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),B(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ve(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(I){W!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),W=I)}function A(I){I!==Hg?(Ve(n.CULL_FACE),I!==z&&(I===xh?n.cullFace(n.BACK):I===Gg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),z=I}function T(I){I!==P&&(X&&n.lineWidth(I),P=I)}function B(I,ce,le){I?(Ve(n.POLYGON_OFFSET_FILL),(k!==ce||V!==le)&&(n.polygonOffset(ce,le),k=ce,V=le)):De(n.POLYGON_OFFSET_FILL)}function ee(I){I?Ve(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function Q(I){I===void 0&&(I=n.TEXTURE0+Y-1),ne!==I&&(n.activeTexture(I),ne=I)}function te(I,ce,le){le===void 0&&(ne===null?le=n.TEXTURE0+Y-1:le=ne);let ke=ie[le];ke===void 0&&(ke={type:void 0,texture:void 0},ie[le]=ke),(ke.type!==I||ke.texture!==ce)&&(ne!==le&&(n.activeTexture(le),ne=le),n.bindTexture(I,ce||He[I]),ke.type=I,ke.texture=ce)}function Me(){const I=ie[ne];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function fe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qe(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ne(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function We(I){de.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),de.copy(I))}function dt(I){we.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),we.copy(I))}function Dt(I,ce){let le=h.get(ce);le===void 0&&(le=new WeakMap,h.set(ce,le));let ke=le.get(I);ke===void 0&&(ke=n.getUniformBlockIndex(ce,I.name),le.set(I,ke))}function Je(I,ce){const ke=h.get(ce).get(I);l.get(ce)!==ke&&(n.uniformBlockBinding(ce,ke,I.__bindingPointIndex),l.set(ce,ke))}function re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ne=null,ie={},u={},_=new WeakMap,x=[],g=null,p=!1,v=null,y=null,b=null,C=null,w=null,R=null,L=null,M=new xe(0,0,0),S=0,N=!1,W=null,z=null,P=null,k=null,V=null,de.set(0,0,n.canvas.width,n.canvas.height),we.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),f.reset()}return{buffers:{color:o,depth:c,stencil:f},enable:Ve,disable:De,bindFramebuffer:ot,drawBuffers:O,useProgram:Sn,setBlending:ve,setMaterial:Rt,setFlipSided:$e,setCullFace:A,setLineWidth:T,setPolygonOffset:B,setScissorTest:ee,activeTexture:Q,bindTexture:te,unbindTexture:Me,compressedTexImage2D:fe,compressedTexImage3D:me,texImage2D:Ae,texImage3D:ge,updateUBOMapping:Dt,uniformBlockBinding:Je,texStorage2D:it,texStorage3D:Ne,texSubImage2D:Le,texSubImage3D:qe,compressedTexSubImage2D:Z,compressedTexSubImage3D:gt,scissor:We,viewport:dt,reset:re}}function Ob(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap;let h;const d=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,T){return u?new OffscreenCanvas(A,T):ac("canvas")}function x(A,T,B,ee){let Q=1;if((A.width>ee||A.height>ee)&&(Q=ee/Math.max(A.width,A.height)),Q<1||T===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){const te=T?Yl:Math.floor,Me=te(Q*A.width),fe=te(Q*A.height);h===void 0&&(h=_(Me,fe));const me=B?_(Me,fe):h;return me.width=Me,me.height=fe,me.getContext("2d").drawImage(A,0,0,Me,fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Me+"x"+fe+")."),me}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function g(A){return ed(A.width)&&ed(A.height)}function p(A){return o?!1:A.wrapS!==vi||A.wrapT!==vi||A.minFilter!==Pn&&A.minFilter!==si}function v(A,T){return A.generateMipmaps&&T&&A.minFilter!==Pn&&A.minFilter!==si}function y(A){n.generateMipmap(A)}function b(A,T,B,ee,Q=!1){if(o===!1)return T;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let te=T;if(T===n.RED&&(B===n.FLOAT&&(te=n.R32F),B===n.HALF_FLOAT&&(te=n.R16F),B===n.UNSIGNED_BYTE&&(te=n.R8)),T===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(te=n.R8UI),B===n.UNSIGNED_SHORT&&(te=n.R16UI),B===n.UNSIGNED_INT&&(te=n.R32UI),B===n.BYTE&&(te=n.R8I),B===n.SHORT&&(te=n.R16I),B===n.INT&&(te=n.R32I)),T===n.RG&&(B===n.FLOAT&&(te=n.RG32F),B===n.HALF_FLOAT&&(te=n.RG16F),B===n.UNSIGNED_BYTE&&(te=n.RG8)),T===n.RGBA){const Me=Q?ic:_t.getTransfer(ee);B===n.FLOAT&&(te=n.RGBA32F),B===n.HALF_FLOAT&&(te=n.RGBA16F),B===n.UNSIGNED_BYTE&&(te=Me===At?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function C(A,T,B){return v(A,B)===!0||A.isFramebufferTexture&&A.minFilter!==Pn&&A.minFilter!==si?Math.log2(Math.max(T.width,T.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?T.mipmaps.length:1}function w(A){return A===Pn||A===Th||A===jc?n.NEAREST:n.LINEAR}function R(A){const T=A.target;T.removeEventListener("dispose",R),M(T),T.isVideoTexture&&l.delete(T)}function L(A){const T=A.target;T.removeEventListener("dispose",L),N(T)}function M(A){const T=i.get(A);if(T.__webglInit===void 0)return;const B=A.source,ee=d.get(B);if(ee){const Q=ee[T.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(A),Object.keys(ee).length===0&&d.delete(B)}i.remove(A)}function S(A){const T=i.get(A);n.deleteTexture(T.__webglTexture);const B=A.source,ee=d.get(B);delete ee[T.__cacheKey],a.memory.textures--}function N(A){const T=A.texture,B=i.get(A),ee=i.get(T);if(ee.__webglTexture!==void 0&&(n.deleteTexture(ee.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(B.__webglFramebuffer[Q]))for(let te=0;te<B.__webglFramebuffer[Q].length;te++)n.deleteFramebuffer(B.__webglFramebuffer[Q][te]);else n.deleteFramebuffer(B.__webglFramebuffer[Q]);B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer[Q])}else{if(Array.isArray(B.__webglFramebuffer))for(let Q=0;Q<B.__webglFramebuffer.length;Q++)n.deleteFramebuffer(B.__webglFramebuffer[Q]);else n.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&n.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let Q=0;Q<B.__webglColorRenderbuffer.length;Q++)B.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(B.__webglColorRenderbuffer[Q]);B.__webglDepthRenderbuffer&&n.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let Q=0,te=T.length;Q<te;Q++){const Me=i.get(T[Q]);Me.__webglTexture&&(n.deleteTexture(Me.__webglTexture),a.memory.textures--),i.remove(T[Q])}i.remove(T),i.remove(A)}let W=0;function z(){W=0}function P(){const A=W;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),W+=1,A}function k(A){const T=[];return T.push(A.wrapS),T.push(A.wrapT),T.push(A.wrapR||0),T.push(A.magFilter),T.push(A.minFilter),T.push(A.anisotropy),T.push(A.internalFormat),T.push(A.format),T.push(A.type),T.push(A.generateMipmaps),T.push(A.premultiplyAlpha),T.push(A.flipY),T.push(A.unpackAlignment),T.push(A.colorSpace),T.join()}function V(A,T){const B=i.get(A);if(A.isVideoTexture&&Rt(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,A,T);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+T)}function Y(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,T);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+T)}function X(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,T);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+T)}function q(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){we(B,A,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+T)}const K={[ro]:n.REPEAT,[vi]:n.CLAMP_TO_EDGE,[Xl]:n.MIRRORED_REPEAT},ne={[Pn]:n.NEAREST,[Th]:n.NEAREST_MIPMAP_NEAREST,[jc]:n.NEAREST_MIPMAP_LINEAR,[si]:n.LINEAR,[v_]:n.LINEAR_MIPMAP_NEAREST,[Go]:n.LINEAR_MIPMAP_LINEAR},ie={[L_]:n.NEVER,[z_]:n.ALWAYS,[I_]:n.LESS,[Dp]:n.LEQUAL,[D_]:n.EQUAL,[N_]:n.GEQUAL,[k_]:n.GREATER,[U_]:n.NOTEQUAL};function j(A,T,B){if(B?(n.texParameteri(A,n.TEXTURE_WRAP_S,K[T.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,K[T.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,K[T.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ne[T.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ne[T.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(T.wrapS!==vi||T.wrapT!==vi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,w(T.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==Pn&&T.minFilter!==si&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ie[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===Pn||T.minFilter!==jc&&T.minFilter!==Go||T.type===mr&&e.has("OES_texture_float_linear")===!1||o===!1&&T.type===Vo&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||i.get(T).__currentAnisotropy)&&(n.texParameterf(A,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy)}}function J(A,T){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,T.addEventListener("dispose",R));const ee=T.source;let Q=d.get(ee);Q===void 0&&(Q={},d.set(ee,Q));const te=k(T);if(te!==A.__cacheKey){Q[te]===void 0&&(Q[te]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[te].usedTimes++;const Me=Q[A.__cacheKey];Me!==void 0&&(Q[A.__cacheKey].usedTimes--,Me.usedTimes===0&&S(T)),A.__cacheKey=te,A.__webglTexture=Q[te].texture}return B}function de(A,T,B){let ee=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ee=n.TEXTURE_3D);const Q=J(A,T),te=T.source;t.bindTexture(ee,A.__webglTexture,n.TEXTURE0+B);const Me=i.get(te);if(te.version!==Me.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);const fe=_t.getPrimaries(_t.workingColorSpace),me=T.colorSpace===qn?null:_t.getPrimaries(T.colorSpace),Le=T.colorSpace===qn||fe===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const qe=p(T)&&g(T.image)===!1;let Z=x(T.image,qe,!1,r.maxTextureSize);Z=$e(T,Z);const gt=g(Z)||o,it=s.convert(T.format,T.colorSpace);let Ne=s.convert(T.type),Ae=b(T.internalFormat,it,Ne,T.colorSpace,T.isVideoTexture);j(ee,T,gt);let ge;const We=T.mipmaps,dt=o&&T.isVideoTexture!==!0&&Ae!==Lp,Dt=Me.__version===void 0||Q===!0,Je=C(T,Z,gt);if(T.isDepthTexture)Ae=n.DEPTH_COMPONENT,o?T.type===mr?Ae=n.DEPTH_COMPONENT32F:T.type===pr?Ae=n.DEPTH_COMPONENT24:T.type===Zr?Ae=n.DEPTH24_STENCIL8:Ae=n.DEPTH_COMPONENT16:T.type===mr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Qr&&Ae===n.DEPTH_COMPONENT&&T.type!==Of&&T.type!==pr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=pr,Ne=s.convert(T.type)),T.format===so&&Ae===n.DEPTH_COMPONENT&&(Ae=n.DEPTH_STENCIL,T.type!==Zr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Zr,Ne=s.convert(T.type))),Dt&&(dt?t.texStorage2D(n.TEXTURE_2D,1,Ae,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,Ae,Z.width,Z.height,0,it,Ne,null));else if(T.isDataTexture)if(We.length>0&&gt){dt&&Dt&&t.texStorage2D(n.TEXTURE_2D,Je,Ae,We[0].width,We[0].height);for(let re=0,I=We.length;re<I;re++)ge=We[re],dt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,Ne,ge.data):t.texImage2D(n.TEXTURE_2D,re,Ae,ge.width,ge.height,0,it,Ne,ge.data);T.generateMipmaps=!1}else dt?(Dt&&t.texStorage2D(n.TEXTURE_2D,Je,Ae,Z.width,Z.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Z.width,Z.height,it,Ne,Z.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,Z.width,Z.height,0,it,Ne,Z.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){dt&&Dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,Ae,We[0].width,We[0].height,Z.depth);for(let re=0,I=We.length;re<I;re++)ge=We[re],T.format!==yi?it!==null?dt?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,Z.depth,it,ge.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ae,ge.width,ge.height,Z.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,Z.depth,it,Ne,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ae,ge.width,ge.height,Z.depth,0,it,Ne,ge.data)}else{dt&&Dt&&t.texStorage2D(n.TEXTURE_2D,Je,Ae,We[0].width,We[0].height);for(let re=0,I=We.length;re<I;re++)ge=We[re],T.format!==yi?it!==null?dt?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ae,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,it,Ne,ge.data):t.texImage2D(n.TEXTURE_2D,re,Ae,ge.width,ge.height,0,it,Ne,ge.data)}else if(T.isDataArrayTexture)dt?(Dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,Ae,Z.width,Z.height,Z.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,it,Ne,Z.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,Z.width,Z.height,Z.depth,0,it,Ne,Z.data);else if(T.isData3DTexture)dt?(Dt&&t.texStorage3D(n.TEXTURE_3D,Je,Ae,Z.width,Z.height,Z.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,it,Ne,Z.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,Z.width,Z.height,Z.depth,0,it,Ne,Z.data);else if(T.isFramebufferTexture){if(Dt)if(dt)t.texStorage2D(n.TEXTURE_2D,Je,Ae,Z.width,Z.height);else{let re=Z.width,I=Z.height;for(let ce=0;ce<Je;ce++)t.texImage2D(n.TEXTURE_2D,ce,Ae,re,I,0,it,Ne,null),re>>=1,I>>=1}}else if(We.length>0&&gt){dt&&Dt&&t.texStorage2D(n.TEXTURE_2D,Je,Ae,We[0].width,We[0].height);for(let re=0,I=We.length;re<I;re++)ge=We[re],dt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,it,Ne,ge):t.texImage2D(n.TEXTURE_2D,re,Ae,it,Ne,ge);T.generateMipmaps=!1}else dt?(Dt&&t.texStorage2D(n.TEXTURE_2D,Je,Ae,Z.width,Z.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,it,Ne,Z)):t.texImage2D(n.TEXTURE_2D,0,Ae,it,Ne,Z);v(T,gt)&&y(ee),Me.__version=te.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function we(A,T,B){if(T.image.length!==6)return;const ee=J(A,T),Q=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);const te=i.get(Q);if(Q.version!==te.__version||ee===!0){t.activeTexture(n.TEXTURE0+B);const Me=_t.getPrimaries(_t.workingColorSpace),fe=T.colorSpace===qn?null:_t.getPrimaries(T.colorSpace),me=T.colorSpace===qn||Me===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Le=T.isCompressedTexture||T.image[0].isCompressedTexture,qe=T.image[0]&&T.image[0].isDataTexture,Z=[];for(let re=0;re<6;re++)!Le&&!qe?Z[re]=x(T.image[re],!1,!0,r.maxCubemapSize):Z[re]=qe?T.image[re].image:T.image[re],Z[re]=$e(T,Z[re]);const gt=Z[0],it=g(gt)||o,Ne=s.convert(T.format,T.colorSpace),Ae=s.convert(T.type),ge=b(T.internalFormat,Ne,Ae,T.colorSpace),We=o&&T.isVideoTexture!==!0,dt=te.__version===void 0||ee===!0;let Dt=C(T,gt,it);j(n.TEXTURE_CUBE_MAP,T,it);let Je;if(Le){We&&dt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Dt,ge,gt.width,gt.height);for(let re=0;re<6;re++){Je=Z[re].mipmaps;for(let I=0;I<Je.length;I++){const ce=Je[I];T.format!==yi?Ne!==null?We?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,0,0,ce.width,ce.height,Ne,ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,ge,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,0,0,ce.width,ce.height,Ne,Ae,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,ge,ce.width,ce.height,0,Ne,Ae,ce.data)}}}else{Je=T.mipmaps,We&&dt&&(Je.length>0&&Dt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Dt,ge,Z[0].width,Z[0].height));for(let re=0;re<6;re++)if(qe){We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Z[re].width,Z[re].height,Ne,Ae,Z[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,Z[re].width,Z[re].height,0,Ne,Ae,Z[re].data);for(let I=0;I<Je.length;I++){const le=Je[I].image[re].image;We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,0,0,le.width,le.height,Ne,Ae,le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,ge,le.width,le.height,0,Ne,Ae,le.data)}}else{We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ne,Ae,Z[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,Ne,Ae,Z[re]);for(let I=0;I<Je.length;I++){const ce=Je[I];We?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,0,0,Ne,Ae,ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,ge,Ne,Ae,ce.image[re])}}}v(T,it)&&y(n.TEXTURE_CUBE_MAP),te.__version=Q.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function Te(A,T,B,ee,Q,te){const Me=s.convert(B.format,B.colorSpace),fe=s.convert(B.type),me=b(B.internalFormat,Me,fe,B.colorSpace);if(!i.get(T).__hasExternalTextures){const qe=Math.max(1,T.width>>te),Z=Math.max(1,T.height>>te);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,te,me,qe,Z,T.depth,0,Me,fe,null):t.texImage2D(Q,te,me,qe,Z,0,Me,fe,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),ve(T)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Q,i.get(B).__webglTexture,0,Oe(T)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,Q,i.get(B).__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(A,T,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),T.depthBuffer&&!T.stencilBuffer){let ee=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(B||ve(T)){const Q=T.depthTexture;Q&&Q.isDepthTexture&&(Q.type===mr?ee=n.DEPTH_COMPONENT32F:Q.type===pr&&(ee=n.DEPTH_COMPONENT24));const te=Oe(T);ve(T)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,ee,T.width,T.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,te,ee,T.width,T.height)}else n.renderbufferStorage(n.RENDERBUFFER,ee,T.width,T.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(T.depthBuffer&&T.stencilBuffer){const ee=Oe(T);B&&ve(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,n.DEPTH24_STENCIL8,T.width,T.height):ve(T)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,n.DEPTH24_STENCIL8,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const ee=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0;Q<ee.length;Q++){const te=ee[Q],Me=s.convert(te.format,te.colorSpace),fe=s.convert(te.type),me=b(te.internalFormat,Me,fe,te.colorSpace),Le=Oe(T);B&&ve(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,me,T.width,T.height):ve(T)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,me,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,me,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ve(A,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);const ee=i.get(T.depthTexture).__webglTexture,Q=Oe(T);if(T.depthTexture.format===Qr)ve(T)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(T.depthTexture.format===so)ve(T)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function De(A){const T=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!T.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ve(T.__webglFramebuffer,A)}else if(B){T.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[ee]),T.__webglDepthbuffer[ee]=n.createRenderbuffer(),He(T.__webglDepthbuffer[ee],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=n.createRenderbuffer(),He(T.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(A,T,B){const ee=i.get(A);T!==void 0&&Te(ee.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&De(A)}function O(A){const T=A.texture,B=i.get(A),ee=i.get(T);A.addEventListener("dispose",L),A.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=T.version,a.memory.textures++);const Q=A.isWebGLCubeRenderTarget===!0,te=A.isWebGLMultipleRenderTargets===!0,Me=g(A)||o;if(Q){B.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(o&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer[fe]=[];for(let me=0;me<T.mipmaps.length;me++)B.__webglFramebuffer[fe][me]=n.createFramebuffer()}else B.__webglFramebuffer[fe]=n.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer=[];for(let fe=0;fe<T.mipmaps.length;fe++)B.__webglFramebuffer[fe]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(te)if(r.drawBuffers){const fe=A.texture;for(let me=0,Le=fe.length;me<Le;me++){const qe=i.get(fe[me]);qe.__webglTexture===void 0&&(qe.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&ve(A)===!1){const fe=te?T:[T];B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let me=0;me<fe.length;me++){const Le=fe[me];B.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[me]);const qe=s.convert(Le.format,Le.colorSpace),Z=s.convert(Le.type),gt=b(Le.internalFormat,qe,Z,Le.colorSpace,A.isXRRenderTarget===!0),it=Oe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,it,gt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,B.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),He(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),j(n.TEXTURE_CUBE_MAP,T,Me);for(let fe=0;fe<6;fe++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Te(B.__webglFramebuffer[fe][me],A,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else Te(B.__webglFramebuffer[fe],A,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);v(T,Me)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const fe=A.texture;for(let me=0,Le=fe.length;me<Le;me++){const qe=fe[me],Z=i.get(qe);t.bindTexture(n.TEXTURE_2D,Z.__webglTexture),j(n.TEXTURE_2D,qe,Me),Te(B.__webglFramebuffer,A,qe,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),v(qe,Me)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let fe=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?fe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(fe,ee.__webglTexture),j(fe,T,Me),o&&T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Te(B.__webglFramebuffer[me],A,T,n.COLOR_ATTACHMENT0,fe,me);else Te(B.__webglFramebuffer,A,T,n.COLOR_ATTACHMENT0,fe,0);v(T,Me)&&y(fe),t.unbindTexture()}A.depthBuffer&&De(A)}function Sn(A){const T=g(A)||o,B=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ee=0,Q=B.length;ee<Q;ee++){const te=B[ee];if(v(te,T)){const Me=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,fe=i.get(te).__webglTexture;t.bindTexture(Me,fe),y(Me),t.unbindTexture()}}}function Ce(A){if(o&&A.samples>0&&ve(A)===!1){const T=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],B=A.width,ee=A.height;let Q=n.COLOR_BUFFER_BIT;const te=[],Me=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(A),me=A.isWebGLMultipleRenderTargets===!0;if(me)for(let Le=0;Le<T.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Le=0;Le<T.length;Le++){te.push(n.COLOR_ATTACHMENT0+Le),A.depthBuffer&&te.push(Me);const qe=fe.__ignoreDepthValues!==void 0?fe.__ignoreDepthValues:!1;if(qe===!1&&(A.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),me&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[Le]),qe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Me]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Me])),me){const Z=i.get(T[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,B,ee,0,0,B,ee,Q,n.NEAREST),f&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Le=0;Le<T.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,fe.__webglColorRenderbuffer[Le]);const qe=i.get(T[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,qe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}}function Oe(A){return Math.min(r.maxSamples,A.samples)}function ve(A){const T=i.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Rt(A){const T=a.render.frame;l.get(A)!==T&&(l.set(A,T),A.update())}function $e(A,T){const B=A.colorSpace,ee=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===$l||B!==Ji&&B!==qn&&(_t.getTransfer(B)===At?o===!1?e.has("EXT_sRGB")===!0&&ee===yi?(A.format=$l,A.minFilter=si,A.generateMipmaps=!1):T=Up.sRGBToLinear(T):(ee!==yi||Q!==Sr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),T}this.allocateTextureUnit=P,this.resetTextureUnits=z,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=ot,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Sn,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=ve}function Fb(n,e,t){const i=t.isWebGL2;function r(s,a=qn){let o;const c=_t.getTransfer(a);if(s===Sr)return n.UNSIGNED_BYTE;if(s===wp)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Ap)return n.UNSIGNED_SHORT_5_5_5_1;if(s===y_)return n.BYTE;if(s===M_)return n.SHORT;if(s===Of)return n.UNSIGNED_SHORT;if(s===Ep)return n.INT;if(s===pr)return n.UNSIGNED_INT;if(s===mr)return n.FLOAT;if(s===Vo)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===b_)return n.ALPHA;if(s===yi)return n.RGBA;if(s===S_)return n.LUMINANCE;if(s===T_)return n.LUMINANCE_ALPHA;if(s===Qr)return n.DEPTH_COMPONENT;if(s===so)return n.DEPTH_STENCIL;if(s===$l)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===E_)return n.RED;if(s===Cp)return n.RED_INTEGER;if(s===w_)return n.RG;if(s===Rp)return n.RG_INTEGER;if(s===Pp)return n.RGBA_INTEGER;if(s===Xc||s===$c||s===qc||s===Yc)if(c===At)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Xc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===$c)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===qc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Yc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Xc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===$c)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===qc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Yc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Eh||s===wh||s===Ah||s===Ch)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Eh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===wh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ah)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ch)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Lp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Rh||s===Ph)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Rh)return c===At?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ph)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Lh||s===Ih||s===Dh||s===kh||s===Uh||s===Nh||s===zh||s===Oh||s===Fh||s===Bh||s===Hh||s===Gh||s===Vh||s===Wh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Lh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ih)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Dh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===kh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Uh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Nh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===zh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Oh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Bh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Hh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Gh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Vh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Wh)return c===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Kc||s===jh||s===Xh)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Kc)return c===At?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===jh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Xh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===A_||s===$h||s===qh||s===Yh)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Kc)return o.COMPRESSED_RED_RGTC1_EXT;if(s===$h)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===qh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Yh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Zr?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Bb extends oi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class yn extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hb={type:"move"};class Ml{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),p=this._getHandJoint(f,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const l=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],d=l.position.distanceTo(h.position),u=.02,_=.005;f.inputState.pinching&&d>u+_?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&d<=u-_&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hb)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),f!==null&&(f.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new yn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Gb extends uo{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,f=null,l=null,h=null,d=null,u=null,_=null;const x=t.getContextAttributes();let g=null,p=null;const v=[],y=[],b=new nt;let C=null;const w=new oi;w.layers.enable(1),w.viewport=new cn;const R=new oi;R.layers.enable(2),R.viewport=new cn;const L=[w,R],M=new Bb;M.layers.enable(1),M.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=v[j];return J===void 0&&(J=new Ml,v[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=v[j];return J===void 0&&(J=new Ml,v[j]=J),J.getGripSpace()},this.getHand=function(j){let J=v[j];return J===void 0&&(J=new Ml,v[j]=J),J.getHandSpace()};function W(j){const J=y.indexOf(j.inputSource);if(J===-1)return;const de=v[J];de!==void 0&&(de.update(j.inputSource,j.frame,f||a),de.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",P);for(let j=0;j<v.length;j++){const J=y[j];J!==null&&(y[j]=null,v[j].disconnect(J))}S=null,N=null,e.setRenderTarget(g),u=null,d=null,h=null,r=null,p=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||a},this.setReferenceSpace=function(j){f=j},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(g=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",z),r.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),p=new ss(u.framebufferWidth,u.framebufferHeight,{format:yi,type:Sr,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let J=null,de=null,we=null;x.depth&&(we=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=x.stencil?so:Qr,de=x.stencil?Zr:pr);const Te={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(Te),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new ss(d.textureWidth,d.textureHeight,{format:yi,type:Sr,depthTexture:new $p(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const He=e.properties.get(p);He.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),f=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(j){for(let J=0;J<j.removed.length;J++){const de=j.removed[J],we=y.indexOf(de);we>=0&&(y[we]=null,v[we].disconnect(de))}for(let J=0;J<j.added.length;J++){const de=j.added[J];let we=y.indexOf(de);if(we===-1){for(let He=0;He<v.length;He++)if(He>=y.length){y.push(de),we=He;break}else if(y[He]===null){y[He]=de,we=He;break}if(we===-1)break}const Te=v[we];Te&&Te.connect(de)}}const k=new D,V=new D;function Y(j,J,de){k.setFromMatrixPosition(J.matrixWorld),V.setFromMatrixPosition(de.matrixWorld);const we=k.distanceTo(V),Te=J.projectionMatrix.elements,He=de.projectionMatrix.elements,Ve=Te[14]/(Te[10]-1),De=Te[14]/(Te[10]+1),ot=(Te[9]+1)/Te[5],O=(Te[9]-1)/Te[5],Sn=(Te[8]-1)/Te[0],Ce=(He[8]+1)/He[0],Oe=Ve*Sn,ve=Ve*Ce,Rt=we/(-Sn+Ce),$e=Rt*-Sn;J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX($e),j.translateZ(Rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const A=Ve+Rt,T=De+Rt,B=Oe-$e,ee=ve+(we-$e),Q=ot*De/T*A,te=O*De/T*A;j.projectionMatrix.makePerspective(B,ee,Q,te,A,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function X(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;M.near=R.near=w.near=j.near,M.far=R.far=w.far=j.far,(S!==M.near||N!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),S=M.near,N=M.far);const J=j.parent,de=M.cameras;X(M,J);for(let we=0;we<de.length;we++)X(de[we],J);de.length===2?Y(M,w,R):M.projectionMatrix.copy(w.projectionMatrix),q(j,M,J)};function q(j,J,de){de===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(de.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ql*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&u===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=j)};let K=null;function ne(j,J){if(l=J.getViewerPose(f||a),_=J,l!==null){const de=l.views;u!==null&&(e.setRenderTargetFramebuffer(p,u.framebuffer),e.setRenderTarget(p));let we=!1;de.length!==M.cameras.length&&(M.cameras.length=0,we=!0);for(let Te=0;Te<de.length;Te++){const He=de[Te];let Ve=null;if(u!==null)Ve=u.getViewport(He);else{const ot=h.getViewSubImage(d,He);Ve=ot.viewport,Te===0&&(e.setRenderTargetTextures(p,ot.colorTexture,d.ignoreDepthValues?void 0:ot.depthStencilTexture),e.setRenderTarget(p))}let De=L[Te];De===void 0&&(De=new oi,De.layers.enable(Te),De.viewport=new cn,L[Te]=De),De.matrix.fromArray(He.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(He.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Te===0&&(M.matrix.copy(De.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),we===!0&&M.cameras.push(De)}}for(let de=0;de<v.length;de++){const we=y[de],Te=v[de];we!==null&&Te!==void 0&&Te.update(we,J,f||a)}K&&K(j,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),_=null}const ie=new jp;ie.setAnimationLoop(ne),this.setAnimationLoop=function(j){K=j},this.dispose=function(){}}}function Vb(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Gp(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,y,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),l(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&u(g,p,b)):p.isMeshMatcapMaterial?(s(g,p),_(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,v,y):p.isSpriteMaterial?f(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===$t&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===$t&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(g.envMap.value=v,g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap){g.lightMap.value=p.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,g.lightMapTransform)}p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function f(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),e.get(p).envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function u(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&g.clearcoatNormalScale.value.negate())),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Wb(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,y){const b=y.program;i.uniformBlockBinding(v,b)}function f(v,y){let b=r[v.id];b===void 0&&(_(v),b=l(v),r[v.id]=b,v.addEventListener("dispose",g));const C=y.program;i.updateUBOMapping(v,C);const w=e.render.frame;s[v.id]!==w&&(d(v),s[v.id]=w)}function l(v){const y=h();v.__bindingPointIndex=y;const b=n.createBuffer(),C=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,C,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=r[v.id],b=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let w=0,R=b.length;w<R;w++){const L=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,S=L.length;M<S;M++){const N=L[M];if(u(N,w,M,C)===!0){const W=N.__offset,z=Array.isArray(N.value)?N.value:[N.value];let P=0;for(let k=0;k<z.length;k++){const V=z[k],Y=x(V);typeof V=="number"||typeof V=="boolean"?(N.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,W+P,N.__data)):V.isMatrix3?(N.__data[0]=V.elements[0],N.__data[1]=V.elements[1],N.__data[2]=V.elements[2],N.__data[3]=0,N.__data[4]=V.elements[3],N.__data[5]=V.elements[4],N.__data[6]=V.elements[5],N.__data[7]=0,N.__data[8]=V.elements[6],N.__data[9]=V.elements[7],N.__data[10]=V.elements[8],N.__data[11]=0):(V.toArray(N.__data,P),P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(v,y,b,C){const w=v.value,R=y+"_"+b;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const L=C[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return C[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function _(v){const y=v.uniforms;let b=0;const C=16;for(let R=0,L=y.length;R<L;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let S=0,N=M.length;S<N;S++){const W=M[S],z=Array.isArray(W.value)?W.value:[W.value];for(let P=0,k=z.length;P<k;P++){const V=z[P],Y=x(V),X=b%C;X!==0&&C-X<Y.boundary&&(b+=C-X),W.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=Y.storage}}}const w=b%C;return w>0&&(b+=C-w),v.__size=b,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function p(){for(const v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:f,dispose:p}}class Qp{constructor(e={}){const{canvas:t=F_(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:f=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const u=new Uint32Array(4),_=new Int32Array(4);let x=null,g=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this._useLegacyLights=!1,this.toneMapping=br,this.toneMappingExposure=1;const y=this;let b=!1,C=0,w=0,R=null,L=-1,M=null;const S=new cn,N=new cn;let W=null;const z=new xe(0);let P=0,k=t.width,V=t.height,Y=1,X=null,q=null;const K=new cn(0,0,k,V),ne=new cn(0,0,k,V);let ie=!1;const j=new Hf;let J=!1,de=!1,we=null;const Te=new tt,He=new nt,Ve=new D,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ot(){return R===null?Y:1}let O=i;function Sn(E,U){for(let H=0;H<E.length;H++){const G=E[H],F=t.getContext(G,U);if(F!==null)return F}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:f,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nf}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ce,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),O=Sn(U,E),O===null)throw Sn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ce,Oe,ve,Rt,$e,A,T,B,ee,Q,te,Me,fe,me,Le,qe,Z,gt,it,Ne,Ae,ge,We,dt;function Dt(){Ce=new eM(O),Oe=new qy(O,Ce,e),Ce.init(Oe),ge=new Fb(O,Ce,Oe),ve=new zb(O,Ce,Oe),Rt=new iM(O),$e=new Sb,A=new Ob(O,Ce,ve,$e,Oe,ge,Rt),T=new Ky(y),B=new Qy(y),ee=new hx(O,Oe),We=new Xy(O,Ce,ee,Oe),Q=new tM(O,ee,Rt,We),te=new aM(O,Q,ee,Rt),it=new oM(O,Oe,A),qe=new Yy($e),Me=new bb(y,T,B,Ce,Oe,We,qe),fe=new Vb(y,$e),me=new Eb,Le=new Lb(Ce,Oe),gt=new jy(y,T,B,ve,te,d,c),Z=new Nb(y,te,Oe),dt=new Wb(O,Rt,Oe,ve),Ne=new $y(O,Ce,Rt,Oe),Ae=new nM(O,Ce,Rt,Oe),Rt.programs=Me.programs,y.capabilities=Oe,y.extensions=Ce,y.properties=$e,y.renderLists=me,y.shadowMap=Z,y.state=ve,y.info=Rt}Dt();const Je=new Gb(y,O);this.xr=Je,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=Ce.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ce.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(k,V,!1))},this.getSize=function(E){return E.set(k,V)},this.setSize=function(E,U,H=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=E,V=U,t.width=Math.floor(E*Y),t.height=Math.floor(U*Y),H===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(k*Y,V*Y).floor()},this.setDrawingBufferSize=function(E,U,H){k=E,V=U,Y=H,t.width=Math.floor(E*H),t.height=Math.floor(U*H),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(S)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,U,H,G){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,U,H,G),ve.viewport(S.copy(K).multiplyScalar(Y).floor())},this.getScissor=function(E){return E.copy(ne)},this.setScissor=function(E,U,H,G){E.isVector4?ne.set(E.x,E.y,E.z,E.w):ne.set(E,U,H,G),ve.scissor(N.copy(ne).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(E){ve.setScissorTest(ie=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){q=E},this.getClearColor=function(E){return E.copy(gt.getClearColor())},this.setClearColor=function(){gt.setClearColor.apply(gt,arguments)},this.getClearAlpha=function(){return gt.getClearAlpha()},this.setClearAlpha=function(){gt.setClearAlpha.apply(gt,arguments)},this.clear=function(E=!0,U=!0,H=!0){let G=0;if(E){let F=!1;if(R!==null){const ue=R.texture.format;F=ue===Pp||ue===Rp||ue===Cp}if(F){const ue=R.texture.type,be=ue===Sr||ue===pr||ue===Of||ue===Zr||ue===wp||ue===Ap,Pe=gt.getClearColor(),Ue=gt.getClearAlpha(),Ye=Pe.r,Fe=Pe.g,Ge=Pe.b;be?(u[0]=Ye,u[1]=Fe,u[2]=Ge,u[3]=Ue,O.clearBufferuiv(O.COLOR,0,u)):(_[0]=Ye,_[1]=Fe,_[2]=Ge,_[3]=Ue,O.clearBufferiv(O.COLOR,0,_))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT),H&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),me.dispose(),Le.dispose(),$e.dispose(),T.dispose(),B.dispose(),te.dispose(),We.dispose(),dt.dispose(),Me.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",Tn),Je.removeEventListener("sessionend",bt),we&&(we.dispose(),we=null),En.stop()};function re(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const E=Rt.autoReset,U=Z.enabled,H=Z.autoUpdate,G=Z.needsUpdate,F=Z.type;Dt(),Rt.autoReset=E,Z.enabled=U,Z.autoUpdate=H,Z.needsUpdate=G,Z.type=F}function ce(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function le(E){const U=E.target;U.removeEventListener("dispose",le),ke(U)}function ke(E){Re(E),$e.remove(E)}function Re(E){const U=$e.get(E).programs;U!==void 0&&(U.forEach(function(H){Me.releaseProgram(H)}),E.isShaderMaterial&&Me.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,H,G,F,ue){U===null&&(U=De);const be=F.isMesh&&F.matrixWorld.determinant()<0,Pe=k0(E,U,H,G,F);ve.setMaterial(G,be);let Ue=H.index,Ye=1;if(G.wireframe===!0){if(Ue=Q.getWireframeAttribute(H),Ue===void 0)return;Ye=2}const Fe=H.drawRange,Ge=H.attributes.position;let Nt=Fe.start*Ye,Vn=(Fe.start+Fe.count)*Ye;ue!==null&&(Nt=Math.max(Nt,ue.start*Ye),Vn=Math.min(Vn,(ue.start+ue.count)*Ye)),Ue!==null?(Nt=Math.max(Nt,0),Vn=Math.min(Vn,Ue.count)):Ge!=null&&(Nt=Math.max(Nt,0),Vn=Math.min(Vn,Ge.count));const Jt=Vn-Nt;if(Jt<0||Jt===1/0)return;We.setup(F,G,Pe,H,Ue);let Ui,Pt=Ne;if(Ue!==null&&(Ui=ee.get(Ue),Pt=Ae,Pt.setIndex(Ui)),F.isMesh)G.wireframe===!0?(ve.setLineWidth(G.wireframeLinewidth*ot()),Pt.setMode(O.LINES)):Pt.setMode(O.TRIANGLES);else if(F.isLine){let Ze=G.linewidth;Ze===void 0&&(Ze=1),ve.setLineWidth(Ze*ot()),F.isLineSegments?Pt.setMode(O.LINES):F.isLineLoop?Pt.setMode(O.LINE_LOOP):Pt.setMode(O.LINE_STRIP)}else F.isPoints?Pt.setMode(O.POINTS):F.isSprite&&Pt.setMode(O.TRIANGLES);if(F.isBatchedMesh)Pt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)Pt.renderInstances(Nt,Jt,F.count);else if(H.isInstancedBufferGeometry){const Ze=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Nc=Math.min(H.instanceCount,Ze);Pt.renderInstances(Nt,Jt,Nc)}else Pt.render(Nt,Jt)};function yt(E,U,H){E.transparent===!0&&E.side===Lt&&E.forceSinglePass===!1?(E.side=$t,E.needsUpdate=!0,oa(E,U,H),E.side=Ar,E.needsUpdate=!0,oa(E,U,H),E.side=Lt):oa(E,U,H)}this.compile=function(E,U,H=null){H===null&&(H=E),g=Le.get(H),g.init(),v.push(g),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),E!==H&&E.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),g.setupLights(y._useLegacyLights);const G=new Set;return E.traverse(function(F){const ue=F.material;if(ue)if(Array.isArray(ue))for(let be=0;be<ue.length;be++){const Pe=ue[be];yt(Pe,H,F),G.add(Pe)}else yt(ue,H,F),G.add(ue)}),v.pop(),g=null,G},this.compileAsync=function(E,U,H=null){const G=this.compile(E,U,H);return new Promise(F=>{function ue(){if(G.forEach(function(be){$e.get(be).currentProgram.isReady()&&G.delete(be)}),G.size===0){F(E);return}setTimeout(ue,10)}Ce.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Mt=null;function Kt(E){Mt&&Mt(E)}function Tn(){En.stop()}function bt(){En.start()}const En=new jp;En.setAnimationLoop(Kt),typeof self!="undefined"&&En.setContext(self),this.setAnimationLoop=function(E){Mt=E,Je.setAnimationLoop(E),E===null?En.stop():En.start()},Je.addEventListener("sessionstart",Tn),Je.addEventListener("sessionend",bt),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(U),U=Je.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,R),g=Le.get(E,v.length),g.init(),v.push(g),Te.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),j.setFromProjectionMatrix(Te),de=this.localClippingEnabled,J=qe.init(this.clippingPlanes,de),x=me.get(E,p.length),x.init(),p.push(x),wi(E,U,0,y.sortObjects),x.finish(),y.sortObjects===!0&&x.sort(X,q),this.info.render.frame++,J===!0&&qe.beginShadows();const H=g.state.shadowsArray;if(Z.render(H,E,U),J===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),gt.render(x,E),g.setupLights(y._useLegacyLights),U.isArrayCamera){const G=U.cameras;for(let F=0,ue=G.length;F<ue;F++){const be=G[F];ah(x,E,be,be.viewport)}}else ah(x,E,U);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(y,E,U),We.resetDefaultState(),L=-1,M=null,v.pop(),v.length>0?g=v[v.length-1]:g=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function wi(E,U,H,G){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){G&&Ve.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Te);const be=te.update(E),Pe=E.material;Pe.visible&&x.push(E,be,Pe,H,Ve.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const be=te.update(E),Pe=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ve.copy(E.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ve.copy(be.boundingSphere.center)),Ve.applyMatrix4(E.matrixWorld).applyMatrix4(Te)),Array.isArray(Pe)){const Ue=be.groups;for(let Ye=0,Fe=Ue.length;Ye<Fe;Ye++){const Ge=Ue[Ye],Nt=Pe[Ge.materialIndex];Nt&&Nt.visible&&x.push(E,be,Nt,H,Ve.z,Ge)}}else Pe.visible&&x.push(E,be,Pe,H,Ve.z,null)}}const ue=E.children;for(let be=0,Pe=ue.length;be<Pe;be++)wi(ue[be],U,H,G)}function ah(E,U,H,G){const F=E.opaque,ue=E.transmissive,be=E.transparent;g.setupLightsView(H),J===!0&&qe.setGlobalState(y.clippingPlanes,H),ue.length>0&&D0(F,ue,U,H),G&&ve.viewport(S.copy(G)),F.length>0&&sa(F,U,H),ue.length>0&&sa(ue,U,H),be.length>0&&sa(be,U,H),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function D0(E,U,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const ue=Oe.isWebGL2;we===null&&(we=new ss(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?Vo:Sr,minFilter:Go,samples:ue?4:0})),y.getDrawingBufferSize(He),ue?we.setSize(He.x,He.y):we.setSize(Yl(He.x),Yl(He.y));const be=y.getRenderTarget();y.setRenderTarget(we),y.getClearColor(z),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();const Pe=y.toneMapping;y.toneMapping=br,sa(E,H,G),A.updateMultisampleRenderTarget(we),A.updateRenderTargetMipmap(we);let Ue=!1;for(let Ye=0,Fe=U.length;Ye<Fe;Ye++){const Ge=U[Ye],Nt=Ge.object,Vn=Ge.geometry,Jt=Ge.material,Ui=Ge.group;if(Jt.side===Lt&&Nt.layers.test(G.layers)){const Pt=Jt.side;Jt.side=$t,Jt.needsUpdate=!0,ch(Nt,H,G,Vn,Jt,Ui),Jt.side=Pt,Jt.needsUpdate=!0,Ue=!0}}Ue===!0&&(A.updateMultisampleRenderTarget(we),A.updateRenderTargetMipmap(we)),y.setRenderTarget(be),y.setClearColor(z,P),y.toneMapping=Pe}function sa(E,U,H){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ue=E.length;F<ue;F++){const be=E[F],Pe=be.object,Ue=be.geometry,Ye=G===null?be.material:G,Fe=be.group;Pe.layers.test(H.layers)&&ch(Pe,U,H,Ue,Ye,Fe)}}function ch(E,U,H,G,F,ue){E.onBeforeRender(y,U,H,G,F,ue),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,U,H,G,E,ue),F.transparent===!0&&F.side===Lt&&F.forceSinglePass===!1?(F.side=$t,F.needsUpdate=!0,y.renderBufferDirect(H,U,G,F,E,ue),F.side=Ar,F.needsUpdate=!0,y.renderBufferDirect(H,U,G,F,E,ue),F.side=Lt):y.renderBufferDirect(H,U,G,F,E,ue),E.onAfterRender(y,U,H,G,F,ue)}function oa(E,U,H){U.isScene!==!0&&(U=De);const G=$e.get(E),F=g.state.lights,ue=g.state.shadowsArray,be=F.state.version,Pe=Me.getParameters(E,F.state,ue,U,H),Ue=Me.getProgramCacheKey(Pe);let Ye=G.programs;G.environment=E.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(E.isMeshStandardMaterial?B:T).get(E.envMap||G.environment),Ye===void 0&&(E.addEventListener("dispose",le),Ye=new Map,G.programs=Ye);let Fe=Ye.get(Ue);if(Fe!==void 0){if(G.currentProgram===Fe&&G.lightsStateVersion===be)return fh(E,Pe),Fe}else Pe.uniforms=Me.getUniforms(E),E.onBuild(H,Pe,y),E.onBeforeCompile(Pe,y),Fe=Me.acquireProgram(Pe,Ue),Ye.set(Ue,Fe),G.uniforms=Pe.uniforms;const Ge=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ge.clippingPlanes=qe.uniform),fh(E,Pe),G.needsLights=N0(E),G.lightsStateVersion=be,G.needsLights&&(Ge.ambientLightColor.value=F.state.ambient,Ge.lightProbe.value=F.state.probe,Ge.directionalLights.value=F.state.directional,Ge.directionalLightShadows.value=F.state.directionalShadow,Ge.spotLights.value=F.state.spot,Ge.spotLightShadows.value=F.state.spotShadow,Ge.rectAreaLights.value=F.state.rectArea,Ge.ltc_1.value=F.state.rectAreaLTC1,Ge.ltc_2.value=F.state.rectAreaLTC2,Ge.pointLights.value=F.state.point,Ge.pointLightShadows.value=F.state.pointShadow,Ge.hemisphereLights.value=F.state.hemi,Ge.directionalShadowMap.value=F.state.directionalShadowMap,Ge.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ge.spotShadowMap.value=F.state.spotShadowMap,Ge.spotLightMatrix.value=F.state.spotLightMatrix,Ge.spotLightMap.value=F.state.spotLightMap,Ge.pointShadowMap.value=F.state.pointShadowMap,Ge.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Fe,G.uniformsList=null,Fe}function lh(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=za.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function fh(E,U){const H=$e.get(E);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function k0(E,U,H,G,F){U.isScene!==!0&&(U=De),A.resetTextureUnits();const ue=U.fog,be=G.isMeshStandardMaterial?U.environment:null,Pe=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ji,Ue=(G.isMeshStandardMaterial?B:T).get(G.envMap||be),Ye=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Fe=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ge=!!H.morphAttributes.position,Nt=!!H.morphAttributes.normal,Vn=!!H.morphAttributes.color;let Jt=br;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Jt=y.toneMapping);const Ui=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Pt=Ui!==void 0?Ui.length:0,Ze=$e.get(G),Nc=g.state.lights;if(J===!0&&(de===!0||E!==M)){const Zn=E===M&&G.id===L;qe.setState(G,E,Zn)}let kt=!1;G.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==Nc.state.version||Ze.outputColorSpace!==Pe||F.isBatchedMesh&&Ze.batching===!1||!F.isBatchedMesh&&Ze.batching===!0||F.isInstancedMesh&&Ze.instancing===!1||!F.isInstancedMesh&&Ze.instancing===!0||F.isSkinnedMesh&&Ze.skinning===!1||!F.isSkinnedMesh&&Ze.skinning===!0||F.isInstancedMesh&&Ze.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ze.instancingColor===!1&&F.instanceColor!==null||Ze.envMap!==Ue||G.fog===!0&&Ze.fog!==ue||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==qe.numPlanes||Ze.numIntersection!==qe.numIntersection)||Ze.vertexAlphas!==Ye||Ze.vertexTangents!==Fe||Ze.morphTargets!==Ge||Ze.morphNormals!==Nt||Ze.morphColors!==Vn||Ze.toneMapping!==Jt||Oe.isWebGL2===!0&&Ze.morphTargetsCount!==Pt)&&(kt=!0):(kt=!0,Ze.__version=G.version);let Rr=Ze.currentProgram;kt===!0&&(Rr=oa(G,U,F));let hh=!1,xo=!1,zc=!1;const mn=Rr.getUniforms(),Pr=Ze.uniforms;if(ve.useProgram(Rr.program)&&(hh=!0,xo=!0,zc=!0),G.id!==L&&(L=G.id,xo=!0),hh||M!==E){mn.setValue(O,"projectionMatrix",E.projectionMatrix),mn.setValue(O,"viewMatrix",E.matrixWorldInverse);const Zn=mn.map.cameraPosition;Zn!==void 0&&Zn.setValue(O,Ve.setFromMatrixPosition(E.matrixWorld)),Oe.logarithmicDepthBuffer&&mn.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&mn.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,xo=!0,zc=!0)}if(F.isSkinnedMesh){mn.setOptional(O,F,"bindMatrix"),mn.setOptional(O,F,"bindMatrixInverse");const Zn=F.skeleton;Zn&&(Oe.floatVertexTextures?(Zn.boneTexture===null&&Zn.computeBoneTexture(),mn.setValue(O,"boneTexture",Zn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(mn.setOptional(O,F,"batchingTexture"),mn.setValue(O,"batchingTexture",F._matricesTexture,A));const Oc=H.morphAttributes;if((Oc.position!==void 0||Oc.normal!==void 0||Oc.color!==void 0&&Oe.isWebGL2===!0)&&it.update(F,H,Rr),(xo||Ze.receiveShadow!==F.receiveShadow)&&(Ze.receiveShadow=F.receiveShadow,mn.setValue(O,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Pr.envMap.value=Ue,Pr.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),xo&&(mn.setValue(O,"toneMappingExposure",y.toneMappingExposure),Ze.needsLights&&U0(Pr,zc),ue&&G.fog===!0&&fe.refreshFogUniforms(Pr,ue),fe.refreshMaterialUniforms(Pr,G,Y,V,we),za.upload(O,lh(Ze),Pr,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(za.upload(O,lh(Ze),Pr,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&mn.setValue(O,"center",F.center),mn.setValue(O,"modelViewMatrix",F.modelViewMatrix),mn.setValue(O,"normalMatrix",F.normalMatrix),mn.setValue(O,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Zn=G.uniformsGroups;for(let Fc=0,z0=Zn.length;Fc<z0;Fc++)if(Oe.isWebGL2){const dh=Zn[Fc];dt.update(dh,Rr),dt.bind(dh,Rr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Rr}function U0(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function N0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,U,H){$e.get(E.texture).__webglTexture=U,$e.get(E.depthTexture).__webglTexture=H;const G=$e.get(E);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,U){const H=$e.get(E);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,H=0){R=E,C=U,w=H;let G=!0,F=null,ue=!1,be=!1;if(E){const Ue=$e.get(E);Ue.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(O.FRAMEBUFFER,null),G=!1):Ue.__webglFramebuffer===void 0?A.setupRenderTarget(E):Ue.__hasExternalTextures&&A.rebindTextures(E,$e.get(E.texture).__webglTexture,$e.get(E.depthTexture).__webglTexture);const Ye=E.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(be=!0);const Fe=$e.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Fe[U])?F=Fe[U][H]:F=Fe[U],ue=!0):Oe.isWebGL2&&E.samples>0&&A.useMultisampledRTT(E)===!1?F=$e.get(E).__webglMultisampledFramebuffer:Array.isArray(Fe)?F=Fe[H]:F=Fe,S.copy(E.viewport),N.copy(E.scissor),W=E.scissorTest}else S.copy(K).multiplyScalar(Y).floor(),N.copy(ne).multiplyScalar(Y).floor(),W=ie;if(ve.bindFramebuffer(O.FRAMEBUFFER,F)&&Oe.drawBuffers&&G&&ve.drawBuffers(E,F),ve.viewport(S),ve.scissor(N),ve.setScissorTest(W),ue){const Ue=$e.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ue.__webglTexture,H)}else if(be){const Ue=$e.get(E.texture),Ye=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.__webglTexture,H||0,Ye)}L=-1},this.readRenderTargetPixels=function(E,U,H,G,F,ue,be){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=$e.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&be!==void 0&&(Pe=Pe[be]),Pe){ve.bindFramebuffer(O.FRAMEBUFFER,Pe);try{const Ue=E.texture,Ye=Ue.format,Fe=Ue.type;if(Ye!==yi&&ge.convert(Ye)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=Fe===Vo&&(Ce.has("EXT_color_buffer_half_float")||Oe.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(Fe!==Sr&&ge.convert(Fe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Fe===mr&&(Oe.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-G&&H>=0&&H<=E.height-F&&O.readPixels(U,H,G,F,ge.convert(Ye),ge.convert(Fe),ue)}finally{const Ue=R!==null?$e.get(R).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.copyFramebufferToTexture=function(E,U,H=0){const G=Math.pow(2,-H),F=Math.floor(U.image.width*G),ue=Math.floor(U.image.height*G);A.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,E.x,E.y,F,ue),ve.unbindTexture()},this.copyTextureToTexture=function(E,U,H,G=0){const F=U.image.width,ue=U.image.height,be=ge.convert(H.format),Pe=ge.convert(H.type);A.setTexture2D(H,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,G,E.x,E.y,F,ue,be,Pe,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,G,E.x,E.y,U.mipmaps[0].width,U.mipmaps[0].height,be,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,G,E.x,E.y,be,Pe,U.image),G===0&&H.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(E,U,H,G,F=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=E.max.x-E.min.x+1,be=E.max.y-E.min.y+1,Pe=E.max.z-E.min.z+1,Ue=ge.convert(G.format),Ye=ge.convert(G.type);let Fe;if(G.isData3DTexture)A.setTexture3D(G,0),Fe=O.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)A.setTexture2DArray(G,0),Fe=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const Ge=O.getParameter(O.UNPACK_ROW_LENGTH),Nt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Vn=O.getParameter(O.UNPACK_SKIP_PIXELS),Jt=O.getParameter(O.UNPACK_SKIP_ROWS),Ui=O.getParameter(O.UNPACK_SKIP_IMAGES),Pt=H.isCompressedTexture?H.mipmaps[F]:H.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Pt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Pt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,E.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,E.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,E.min.z),H.isDataTexture||H.isData3DTexture?O.texSubImage3D(Fe,F,U.x,U.y,U.z,ue,be,Pe,Ue,Ye,Pt.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Fe,F,U.x,U.y,U.z,ue,be,Pe,Ue,Pt.data)):O.texSubImage3D(Fe,F,U.x,U.y,U.z,ue,be,Pe,Ue,Ye,Pt),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ge),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Nt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Vn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Jt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ui),F===0&&G.generateMipmaps&&O.generateMipmap(Fe),ve.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ve.unbindTexture()},this.resetState=function(){C=0,w=0,R=null,ve.reset(),We.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bf?"display-p3":"srgb",t.unpackColorSpace=_t.workingColorSpace===Ac?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ot?es:Ip}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===es?Ot:Ji}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class jb extends Qp{}jb.prototype.isWebGL1Renderer=!0;class Vf{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new xe(e),this.near=t,this.far=i}clone(){return new Vf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xb extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Wo extends Ti{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ps=new tt,Fd=new tt,La=[],Bd=new os,$b=new tt,Eo=new ye,wo=new na;class Mi extends ye{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wo(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,$b)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new os),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ps),Bd.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(Bd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new na),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ps),wo.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(wo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Eo.geometry=this.geometry,Eo.material=this.material,Eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(i),e.ray.intersectsSphere(wo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ps),Fd.multiplyMatrices(i,Ps),Eo.matrixWorld=Fd,Eo.raycast(e,La);for(let a=0,o=La.length;a<o;a++){const c=La[a];c.instanceId=s,c.object=this,t.push(c)}La.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Wo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class jo extends Gn{constructor(e,t,i,r,s,a,o,c,f){super(e,t,i,r,s,a,o,c,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rc extends kn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],f=new D,l=new nt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const u=i+h/t*r;f.x=e*Math.cos(u),f.y=e*Math.sin(u),a.push(f.x,f.y,f.z),o.push(0,0,1),l.x=(a[d]/e+1)/2,l.y=(a[d+1]/e+1)/2,c.push(l.x,l.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(o,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xe extends kn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const f=this;r=Math.floor(r),s=Math.floor(s);const l=[],h=[],d=[],u=[];let _=0;const x=[],g=i/2;let p=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(l),this.setAttribute("position",new mt(h,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(u,2));function v(){const b=new D,C=new D;let w=0;const R=(t-e)/i;for(let L=0;L<=s;L++){const M=[],S=L/s,N=S*(t-e)+e;for(let W=0;W<=r;W++){const z=W/r,P=z*c+o,k=Math.sin(P),V=Math.cos(P);C.x=N*k,C.y=-S*i+g,C.z=N*V,h.push(C.x,C.y,C.z),b.set(k,R,V).normalize(),d.push(b.x,b.y,b.z),u.push(z,1-S),M.push(_++)}x.push(M)}for(let L=0;L<r;L++)for(let M=0;M<s;M++){const S=x[M][L],N=x[M+1][L],W=x[M+1][L+1],z=x[M][L+1];l.push(S,N,z),l.push(N,W,z),w+=6}f.addGroup(p,w,0),p+=w}function y(b){const C=_,w=new nt,R=new D;let L=0;const M=b===!0?e:t,S=b===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,g*S,0),d.push(0,S,0),u.push(.5,.5),_++;const N=_;for(let W=0;W<=r;W++){const P=W/r*c+o,k=Math.cos(P),V=Math.sin(P);R.x=M*V,R.y=g*S,R.z=M*k,h.push(R.x,R.y,R.z),d.push(0,S,0),w.x=k*.5+.5,w.y=V*.5*S+.5,u.push(w.x,w.y),_++}for(let W=0;W<r;W++){const z=C+W,P=N+W;b===!0?l.push(P,P+1,z):l.push(P+1,P,z),L+=3}f.addGroup(p,L,b===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xe(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bn extends Xe{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Bn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wf extends kn{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),f(i),l(),this.setAttribute("position",new mt(s,3)),this.setAttribute("normal",new mt(s.slice(),3)),this.setAttribute("uv",new mt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const y=new D,b=new D,C=new D;for(let w=0;w<t.length;w+=3)u(t[w+0],y),u(t[w+1],b),u(t[w+2],C),c(y,b,C,v)}function c(v,y,b,C){const w=C+1,R=[];for(let L=0;L<=w;L++){R[L]=[];const M=v.clone().lerp(b,L/w),S=y.clone().lerp(b,L/w),N=w-L;for(let W=0;W<=N;W++)W===0&&L===w?R[L][W]=M:R[L][W]=M.clone().lerp(S,W/N)}for(let L=0;L<w;L++)for(let M=0;M<2*(w-L)-1;M++){const S=Math.floor(M/2);M%2===0?(d(R[L][S+1]),d(R[L+1][S]),d(R[L][S])):(d(R[L][S+1]),d(R[L+1][S+1]),d(R[L+1][S]))}}function f(v){const y=new D;for(let b=0;b<s.length;b+=3)y.x=s[b+0],y.y=s[b+1],y.z=s[b+2],y.normalize().multiplyScalar(v),s[b+0]=y.x,s[b+1]=y.y,s[b+2]=y.z}function l(){const v=new D;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const b=g(v)/2/Math.PI+.5,C=p(v)/Math.PI+.5;a.push(b,1-C)}_(),h()}function h(){for(let v=0;v<a.length;v+=6){const y=a[v+0],b=a[v+2],C=a[v+4],w=Math.max(y,b,C),R=Math.min(y,b,C);w>.9&&R<.1&&(y<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),C<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function u(v,y){const b=v*3;y.x=e[b+0],y.y=e[b+1],y.z=e[b+2]}function _(){const v=new D,y=new D,b=new D,C=new D,w=new nt,R=new nt,L=new nt;for(let M=0,S=0;M<s.length;M+=9,S+=6){v.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),b.set(s[M+6],s[M+7],s[M+8]),w.set(a[S+0],a[S+1]),R.set(a[S+2],a[S+3]),L.set(a[S+4],a[S+5]),C.copy(v).add(y).add(b).divideScalar(3);const N=g(C);x(w,S+0,v,N),x(R,S+2,y,N),x(L,S+4,b,N)}}function x(v,y,b,C){C<0&&v.x===1&&(a[y]=v.x-1),b.x===0&&b.z===0&&(a[y]=C/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wf(e.vertices,e.indices,e.radius,e.details)}}class cc extends Wf{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new cc(e.radius,e.detail)}}class go extends kn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],f=[],l=[];let h=e;const d=(t-e)/r,u=new D,_=new nt;for(let x=0;x<=r;x++){for(let g=0;g<=i;g++){const p=s+g/i*a;u.x=h*Math.cos(p),u.y=h*Math.sin(p),c.push(u.x,u.y,u.z),f.push(0,0,1),_.x=(u.x/t+1)/2,_.y=(u.y/t+1)/2,l.push(_.x,_.y)}h+=d}for(let x=0;x<r;x++){const g=x*(i+1);for(let p=0;p<i;p++){const v=p+g,y=v,b=v+i+1,C=v+i+2,w=v+1;o.push(y,b,w),o.push(b,C,w)}}this.setIndex(o),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(f,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new go(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ln extends kn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let f=0;const l=[],h=new D,d=new D,u=[],_=[],x=[],g=[];for(let p=0;p<=i;p++){const v=[],y=p/i;let b=0;p===0&&a===0?b=.5/t:p===i&&c===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){const w=C/t;h.x=-e*Math.cos(r+w*s)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(r+w*s)*Math.sin(a+y*o),_.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),g.push(w+b,1-y),v.push(f++)}l.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){const y=l[p][v+1],b=l[p][v],C=l[p+1][v],w=l[p+1][v+1];(p!==0||a>0)&&u.push(y,b,w),(p!==i-1||c<Math.PI)&&u.push(b,C,w)}this.setIndex(u),this.setAttribute("position",new mt(_,3)),this.setAttribute("normal",new mt(x,3)),this.setAttribute("uv",new mt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fs extends kn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],f=[],l=new D,h=new D,d=new D;for(let u=0;u<=i;u++)for(let _=0;_<=r;_++){const x=_/r*s,g=u/i*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(x),h.y=(e+t*Math.cos(g))*Math.sin(x),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),l.x=e*Math.cos(x),l.y=e*Math.sin(x),d.subVectors(h,l).normalize(),c.push(d.x,d.y,d.z),f.push(_/r),f.push(u/i)}for(let u=1;u<=i;u++)for(let _=1;_<=r;_++){const x=(r+1)*u+_-1,g=(r+1)*(u-1)+_-1,p=(r+1)*(u-1)+_,v=(r+1)*u+_;a.push(x,g,v),a.push(g,p,v)}this.setIndex(a),this.setAttribute("position",new mt(o,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class jf extends po{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new xe(16777215),this.specular=new xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ff,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mn extends po{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ff,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class em extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class qb extends em{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const bl=new tt,Hd=new D,Gd=new D;class Yb{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hf,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new cn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hd),Gd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gd),t.updateMatrixWorld(),bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Kb extends Yb{constructor(){super(new Xp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jb extends em{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new Kb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nf}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nf);const tm={low:{name:"Low",pixelRatio:1,antialias:!1,particles:120,splats:30,fogScale:.8,shadows:0,softShadows:!1,shadowRange:0,grass:0,clouds:!1},medium:{name:"Medium",pixelRatio:1.35,antialias:!0,particles:260,splats:60,fogScale:1,shadows:1024,softShadows:!1,shadowRange:30,grass:2600,clouds:!0},high:{name:"High",pixelRatio:2,antialias:!0,particles:420,splats:90,fogScale:1,shadows:2048,softShadows:!0,shadowRange:42,grass:6e3,clouds:!0}},Vd=["low","medium","high"];function Zb(){try{return localStorage.getItem("rally-quality")||"auto"}catch{return"auto"}}function Qb(n){try{localStorage.setItem("rally-quality",n)}catch{}}function eS(){let n="";try{const r=document.createElement("canvas"),s=r.getContext("webgl"),a=s&&s.getExtension("WEBGL_debug_renderer_info");n=a?String(s.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{}const e=navigator.hardwareConcurrency||4,t=navigator.deviceMemory||4,i=matchMedia("(pointer: coarse)").matches;return/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(n)||t<=2||e<=2?"low":i?t<=3||e<=4?"low":"medium":"high"}const ht={setting:Zb(),detected:eS(),level:"medium",stepped:!1,get cfg(){return tm[this.level]}};ht.level=ht.setting==="auto"?ht.detected:ht.setting;function tS(){const n=Vd.indexOf(ht.level);return n<=0?null:(ht.level=Vd[n-1],ht.stepped=!0,ht.level)}const Wd={dunes:{g1:14859650,g2:13804648,g3:12160860,zenith:4160208,horizon:15128248,sun:16773330,sunI:3.1,sky:14214911,gnd:11570268,hemiI:1.25,fog:[70,230],sunDir:[.55,.62,.3],ground:"sand",grass:.22,grassCol:[11046984,15258238]},river:{g1:8824908,g2:7312448,zenith:4883152,horizon:14280426,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},forest:{g1:6258744,g2:7180094,zenith:5998260,horizon:13030594,sun:16772816,sunI:2.7,sky:13622506,gnd:4479023,hemiI:1.35,fog:[30,140],sunDir:[.45,.7,.4],ground:"grass",grass:1.2,grassCol:[3496484,8826194]},forum:{zenith:4883666,horizon:15129803,sun:16773334,sunI:3,sky:14214399,gnd:11049084,hemiI:1.25,fog:[70,230],sunDir:[.5,.64,.35],ground:"paving",grass:.08,grassCol:[7305788,11055200]},colosseum:{zenith:4882640,horizon:15260868,sun:16773330,sunI:3,sky:14214399,gnd:11570268,hemiI:1.2,fog:[90,260],sunDir:[.45,.72,.3],ground:"sand",grass:0,grassCol:[10127946,14206074]},desert:{g1:14859650,g2:13804648,g3:12160860,zenith:3831504,horizon:15259316,sun:16773328,sunI:3.2,sky:14214911,gnd:11570268,hemiI:1.2,fog:[80,240],sunDir:[.55,.6,.3],ground:"sand",grass:.15,grassCol:[11046984,15258238]},wooden:{g1:8955982,g2:7509066,zenith:4883152,horizon:14083304,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},valley:{g1:9614419,g2:8035908,zenith:4423892,horizon:14412010,sun:16774108,sunI:3.1,sky:13952255,gnd:6123328,hemiI:1.3,fog:[70,230],sunDir:[.52,.62,.38],ground:"grass",grass:1.4,grassCol:[4880942,11849834]},frost:{g1:13884902,g2:12569816,g3:11056834,zenith:6262732,horizon:15002609,sun:16774890,sunI:2.3,sky:15134463,gnd:10135218,hemiI:1.1,fog:[50,190],sunDir:[.5,.6,.45],ground:"snow",grass:.12,grassCol:[8227450,13227727]}},nm=n=>Wd[n]||Wd.dunes,Sl={};function Xf(n,e,t,i=!0){if(Sl[n])return Sl[n];const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d");t(s,e,is(n.length*7919+e));const a=new jo(r);return a.wrapS=a.wrapT=ro,a.anisotropy=4,a.colorSpace=i?Ot:qn,Sl[n]=a}function nS(n,e,t){const i=[];for(let a=0;a<e*e;a++)i.push(t());const r=(a,o)=>i[(o+e)%e*e+(a+e)%e],s=a=>a*a*(3-2*a);return(a,o)=>{const c=a/n*e,f=o/n*e,l=Math.floor(c),h=Math.floor(f),d=s(c-l),u=s(f-h);return(r(l,h)*(1-d)+r(l+1,h)*d)*(1-u)+(r(l,h+1)*(1-d)+r(l+1,h+1)*d)*u}}function Bs(n,e,t,i,r,s){const a=n.createImageData(e,e),o=a.data,c=s.map(([f,l])=>[nS(e,f,t),l]);for(let f=0;f<e;f++)for(let l=0;l<e;l++){let h=0;for(const[_,x]of c)h+=(_(l,f)-.5)*x;const d=Math.max(0,Math.min(255,(i+h*r)*255)),u=(f*e+l)*4;o[u]=o[u+1]=o[u+2]=d,o[u+3]=255}n.putImageData(a,0,0)}const iS=n=>Xf("ground-"+n,256,(e,t,i)=>{if(n==="sand"){Bs(e,t,i,.86,.5,[[4,.6],[16,.5],[64,.35]]),e.globalAlpha=.07,e.strokeStyle="#000",e.lineWidth=3;for(let r=0;r<14;r++){const s=r*t/14+i()*6;e.beginPath();for(let a=-10;a<=t+10;a+=8)e.lineTo(a,s+Math.sin(a/t*Math.PI*4+r)*5);e.stroke()}e.globalAlpha=.25;for(let r=0;r<900;r++)e.fillStyle=i()<.5?"#fff":"#6b5a40",e.fillRect(i()*t,i()*t,1,1)}else if(n==="paving"){Bs(e,t,i,.86,.3,[[8,.5],[32,.4]]);const r=6,s=t/r;for(let a=0;a<r;a++)for(let o=0;o<r;o++){const c=a%2*s/2;e.globalAlpha=.06+i()*.1,e.fillStyle=i()<.5?"#000":"#fff",e.fillRect(o*s+c+2,a*s+2,s-4,s-4),e.globalAlpha=.35,e.strokeStyle="#5a5246",e.lineWidth=2,e.strokeRect(o*s+c+1,a*s+1,s-2,s-2),e.strokeRect(o*s+c-t+1,a*s+1,s-2,s-2)}}else if(n==="snow"){Bs(e,t,i,.95,.25,[[4,.6],[16,.4],[64,.2]]),e.globalAlpha=.5;for(let r=0;r<400;r++)e.fillStyle="#fff",e.fillRect(i()*t,i()*t,1,1)}else{Bs(e,t,i,.82,.55,[[4,.7],[16,.5],[64,.3]]),e.lineWidth=1.2;for(let r=0;r<2600;r++){const s=i()*t,a=i()*t,o=3+i()*6,c=(i()-.5)*.9;e.globalAlpha=.18+i()*.2,e.strokeStyle=i()<.5?"#1c2a10":"#ffffff",e.beginPath(),e.moveTo(s,a),e.lineTo(s+Math.sin(c)*o,a-Math.cos(c)*o),e.stroke()}}e.globalAlpha=1}),Yi=()=>Xf("stone",256,(n,e,t)=>{Bs(n,e,t,.8,.35,[[8,.5],[32,.5]]);const i=8,r=e/i;for(let s=0;s<i;s++){const a=s%2*.5,o=4;for(let c=-1;c<o;c++){const f=e/o,l=(c+a)*f+(t()-.5)*6;n.globalAlpha=.12+t()*.12,n.fillStyle=t()<.5?"#000":"#fff",n.fillRect(l+2,s*r+2,f-4,r-4),n.globalAlpha=.3,n.strokeStyle="#3a3733",n.lineWidth=2,n.strokeRect(l+1,s*r+1,f-2,r-2)}}n.globalAlpha=1}),Tr=()=>Xf("wood",128,(n,e,t)=>{Bs(n,e,t,.8,.3,[[4,.4]]);for(let i=0;i<90;i++){const r=t()*e;n.globalAlpha=.08+t()*.15,n.fillStyle=t()<.6?"#000":"#fff",n.fillRect(r,0,1+t()*2,e)}n.globalAlpha=1});function Wt(n,e,t){const i=n.attributes.uv;for(let r=0;r<i.count;r++)i.setXY(r,i.getX(r)*e,i.getY(r)*t);return n}const rS=document.getElementById("gl"),Jn=new Qp({canvas:rS,antialias:ht.cfg.antialias,powerPreference:"high-performance"});Jn.outputColorSpace=Ot;Jn.toneMapping=Sp;Jn.toneMappingExposure=1.15;const Ft=new Xb;Ft.fog=new Vf(14472902,70,190);const xt=new oi(60,1,.1,420),Oa=new qb(14214911,11570268,1.25);Ft.add(Oa);const bi=new Jb(16773330,3);Ft.add(bi,bi.target);const Wr=new D(.55,.62,.3).normalize(),jr={zenith:{value:new xe},horizon:{value:new xe},sunCol:{value:new xe},sunDir:{value:Wr.clone()},time:{value:0},clouds:{value:1}},Pc=new ye(new Ln(400,32,16),new Cr({uniforms:jr,side:$t,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }",fragmentShader:`
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
    }`}));Pc.renderOrder=-10;Pc.frustumCulled=!1;Ft.add(Pc);const Et={W:0,H:0,DPR:1};function im(){Jn.setPixelRatio(Math.min(window.devicePixelRatio||1,ht.cfg.pixelRatio))}function sS(){Et.W=innerWidth,Et.H=innerHeight,Et.DPR=Math.min(window.devicePixelRatio||1,2),im(),Jn.setSize(Et.W,Et.H,!1),xt.aspect=Et.W/Et.H,xt.fov=Et.W<Et.H?78:60,xt.updateProjectionMatrix()}function rm(){const n=ht.cfg,e=n.shadows>0,t=Jn.shadowMap.enabled!==e;if(Jn.shadowMap.enabled=e,Jn.shadowMap.type=n.softShadows?bp:zf,bi.castShadow=e,e){const i=bi.shadow,r=n.shadowRange;i.mapSize.set(n.shadows,n.shadows),i.camera.left=-r,i.camera.right=r,i.camera.top=r,i.camera.bottom=-r,i.camera.near=1,i.camera.far=260,i.camera.updateProjectionMatrix(),i.bias=-6e-4,i.normalBias=.04,i.map&&(i.map.dispose(),i.map=null)}return t&&Ft.traverse(i=>{i.material&&[].concat(i.material).forEach(r=>r.needsUpdate=!0)}),jr.clouds.value=n.clouds?1:0,e}const sm=()=>Jn.shadowMap.enabled,oS=new D;function om(n,e,t){if(jr.time.value=t,Pc.position.copy(xt.position),!bi.castShadow){bi.position.set(n,0,e).addScaledVector(Wr,150),bi.target.position.set(n,0,e);return}const i=ht.cfg.shadowRange,r=2*i/ht.cfg.shadows,s=oS.set(Wr.z,0,-Wr.x).normalize(),a=n*s.x+e*s.z,o=Math.round(a/r)*r-a,c=n+s.x*o,f=e+s.z*o;bi.target.position.set(c,0,f),bi.position.set(c,0,f).addScaledVector(Wr,150)}function aS(n){const e=nm(n.id);jr.zenith.value.set(e.zenith),jr.horizon.value.set(e.horizon),jr.sunCol.value.set(e.sun),Wr.set(...e.sunDir).normalize(),jr.sunDir.value.copy(Wr),Ft.fog.color.set(e.horizon),Ft.fog.near=e.fog[0]*ht.cfg.fogScale,Ft.fog.far=e.fog[1]*ht.cfg.fogScale,Oa.color.set(e.sky),Oa.groundColor.set(e.gnd),Oa.intensity=e.hemiI,bi.color.set(e.sun),bi.intensity=e.sunI}const Vt=(n,e,t={})=>new Mn(Object.assign({color:n,map:e||null},t)),Qe={marble:Vt(15920610,Yi()),marbleDark:Vt(14209216,Yi()),plaster:Vt(15392710),roof:Vt(11818298),sand:Vt(14729100,Yi()),sandDark:Vt(13215346,Yi()),wood:Vt(8018490,Tr()),log:Vt(6966067,Tr()),thatch:Vt(12097104),dark:Vt(2760728),bronze:new jf({color:13144124,shininess:60,specular:6706483}),palmTrunk:Vt(9071172,Tr()),palmLeaf:Vt(4879408,null,{side:Lt}),iron:Vt(3815998)},Ht=(n,e=!0)=>(n.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=!0)}),n),jd=new tt,Xd=new hi,$d=new Zi,cS=new D,lS=new D,Qt=(n,e,t,i,r,s,a,o,c,f,l)=>{$d.set(s,a,o),Xd.setFromEuler($d),jd.compose(cS.set(t,i,r),Xd,lS.set(c,f,l)),n.setMatrixAt(e,jd)};function en(n,e,t,i){const r=new Mi(n,e,Math.max(1,t.length));return t.forEach((s,a)=>i(r,a,s)),r.count=t.length,r}let Xr={gates:[],crowdU:null};function qd(n,e,t){const i=new kn,r=n/2,s=t/2,a=[-r,0,s,r,0,s,0,e,s,-r,0,-s,0,e,-s,r,0,-s],o=[0,1,2,5,3,4,0,2,4,0,4,3,1,5,4,1,4,2,0,3,5,0,5,1];return i.setAttribute("position",new mt(a,3)),i.setIndex(o),i.computeVertexNormals(),i.toNonIndexed()}function fS(n,e){Xr={gates:[],crowdU:null};const t=n.mapId;n.columns.length&&(e.add(Ht(en(new Xe(1,1.08,1,12),Qe.marble,n.columns,(a,o,c)=>Qt(a,o,c.x,c.y+c.h/2,c.z,0,0,0,c.r,c.h,c.r)))),e.add(Ht(en(new Ie(1,1,1),Qe.marbleDark,n.columns,(a,o,c)=>Qt(a,o,c.x,c.y+c.h+.15,c.z,0,0,0,c.r*2.6,.3,c.r*2.6)))),e.add(Ht(en(new Ie(1,1,1),Qe.marbleDark,n.columns,(a,o,c)=>Qt(a,o,c.x,c.y+.12,c.z,0,0,0,c.r*2.6,.24,c.r*2.6)))));for(const a of n.statues){const o=new yn,c=a.big?1.6:1,f=new ye(new Ie(1.6*c,1.4*c,1.6*c),Qe.marbleDark);f.position.y=.7*c,o.add(f);const l=new ye(new Xe(.35*c,.5*c,1.7*c,10),a.big?Qe.bronze:Qe.marble);l.position.y=2.25*c,o.add(l);const h=new ye(new Ln(.3*c,10,8),a.big?Qe.bronze:Qe.marble);h.position.y=3.35*c,o.add(h);const d=new ye(new Xe(.09*c,.09*c,1.3*c,6),a.big?Qe.bronze:Qe.marble);d.position.set(.45*c,3.1*c,0),d.rotation.z=-.5,o.add(d),o.position.set(a.x,wt(a.x,a.z),a.z),o.rotation.y=Math.atan2(-a.x,-a.z),e.add(Ht(o))}const i=n.buildings.filter(a=>a.kind==="house"),r=n.buildings.filter(a=>a.kind==="tent"),s=n.buildings.filter(a=>a.kind==="hut");if(i.length){e.add(Ht(en(new Ie(1,1,1),Qe.plaster,i,(c,f,l)=>Qt(c,f,l.x,l.h/2,l.z,0,l.rot,0,l.w,l.h,l.d))));const a=new Bn(Math.SQRT1_2,1,4);a.rotateY(Math.PI/4),a.translate(0,.5,0),e.add(Ht(en(a,Qe.roof,i,(c,f,l)=>Qt(c,f,l.x,l.h,l.z,0,l.rot,0,l.w*1.12,2.2,l.d*1.12))));const o=[];for(const c of i)for(const[f,l]of[[0,1],[0,-1],[1,0],[-1,0]])for(const h of[-.28,.28])o.push({x:c.x+f*(c.w/2+.02)+(l?h*c.w:0),z:c.z+l*(c.d/2+.02)+(f?h*c.d:0),y:c.h*.62,ry:f?Math.PI/2:0});e.add(en(new un(.9,1.2),Qe.dark,o,(c,f,l)=>Qt(c,f,l.x,l.y,l.z,0,l.ry,0,1,1,1)))}if(r.length){const a=new Bn(Math.SQRT1_2,1,4);a.rotateY(Math.PI/4),a.translate(0,.5,0);const o=[15260864,12080698,14267242,9067066],c=en(a,Vt(16777215,null,{side:Lt}),r,(f,l,h)=>{Qt(f,l,h.x,wt(h.x,h.z),h.z,0,h.rot,0,h.w*1.1,h.h,h.d*1.1),f.setColorAt(l,new xe(o[l%o.length]))});e.add(Ht(c))}s.length&&(e.add(Ht(en(Wt(new Xe(1,1,1,10),3,1),Qe.log,s,(a,o,c)=>Qt(a,o,c.x,1.1,c.z,0,c.rot,0,c.w/2,2.2,c.d/2)))),e.add(Ht(en(new Bn(1,1,10),Qe.thatch,s,(a,o,c)=>Qt(a,o,c.x,3.2,c.z,0,c.rot,0,c.w/2+.5,2.2,c.d/2+.5)))));for(const a of n.towers){const o=new yn,c=hr(a.x,a.z);if(a.kind==="sand"){const f=new ye(Wt(new Xe(a.r,a.r*1.12,a.h,14),4,2),Qe.sand);f.position.y=a.h/2,o.add(f);const l=new ye(new Xe(a.r*1.18,a.r*1.18,.8,14),Qe.sandDark);l.position.y=a.h+.4,o.add(l);for(let h=0;h<8;h++){const d=h/8*Math.PI*2,u=new ye(new Ie(.7,.7,.5),Qe.sandDark);u.position.set(Math.cos(d)*a.r*1.05,a.h+1.15,Math.sin(d)*a.r*1.05),u.rotation.y=-d,o.add(u)}}else{const f=a.small?.9:1.5,l=new Xe(.14,.16,a.h,6);for(const[u,_]of[[-f,-f],[f,-f],[-f,f],[f,f]]){const x=new ye(l,Qe.log);x.position.set(u,a.h/2,_),o.add(x)}const h=new ye(new Ie(f*2+.8,.25,f*2+.8),Qe.wood);h.position.y=a.h-1.4,o.add(h);for(const[u,_,x]of[[0,f+.35,0],[0,-f-.35,0],[f+.35,0,Math.PI/2],[-f-.35,0,Math.PI/2]]){const g=new ye(new Ie(f*2+.8,.5,.12),Qe.wood);g.position.set(u,a.h-1,_),g.rotation.y=x,o.add(g)}const d=new ye(new Bn(f*1.9,1.6,4),Qe.thatch);d.position.y=a.h+.7,d.rotation.y=Math.PI/4,o.add(d)}o.position.set(a.x,c,a.z),e.add(Ht(o))}for(const a of n.rings){const o=a.x||0,c=a.z||0,f=x=>a.gaps.some(g=>Math.abs(pn(x,g))<a.gapW)||(a.towersAt||[]).some(g=>Math.abs(pn(x,g))<2.8/a.r);if(a.kind==="logs"){const x=[],g=Math.ceil(Math.PI*2*a.r/.68),p=is(Math.round(o+c)+7);for(let v=0;v<g;v++){const y=v/g*Math.PI*2;f(y)||x.push({x:o+Math.cos(y)*a.r,z:c+Math.sin(y)*a.r,sy:.9+p()*.25,rot:p()*3})}e.add(Ht(en(Wt(new Xe(.32,.36,1,7),1,2),Qe.log,x,(v,y,b)=>Qt(v,y,b.x,hr(b.x,b.z)+a.h*b.sy/2,b.z,0,b.rot,0,1,a.h*b.sy,1)))),e.add(Ht(en(new Bn(.34,.55,7),Qe.log,x,(v,y,b)=>Qt(v,y,b.x,hr(b.x,b.z)+a.h*b.sy+.27,b.z,0,b.rot,0,1,1,1))));continue}const l=t==="desert"?Qe.sand:Qe.marbleDark,h=t==="desert"?Qe.sandDark:Qe.marble,d=[],u=Math.ceil(Math.PI*2*a.r/1.8);for(let x=0;x<u;x++){const g=(x+.5)/u*Math.PI*2;f(g)||d.push({a:g,x:o+Math.cos(g)*a.r,z:c+Math.sin(g)*a.r})}const _=Math.PI*2*a.r/u+.05;e.add(Ht(en(Wt(new Ie(1,1,1),.8,1.4),l,d,(x,g,p)=>Qt(x,g,p.x,a.h/2,p.z,0,-p.a,0,1.8,a.h,_)))),e.add(Ht(en(new Ie(1,1,1),h,d.filter((x,g)=>g%2===0),(x,g,p)=>Qt(x,g,p.x,a.h+.35,p.z,0,-p.a,0,1.9,.7,_*.55))));for(const x of a.gaps){const g=a.gapW*a.r+.9;for(const v of[-1,1]){const y=x+v*g/a.r,b=new ye(new Ie(2.2,a.h+1.6,2.2),h);b.position.set(o+Math.cos(y)*a.r,(a.h+1.6)/2,c+Math.sin(y)*a.r),b.rotation.y=-y,e.add(Ht(b))}const p=new ye(new Ie(1.6,.9,g*2+2),h);p.position.set(o+Math.cos(x)*a.r,a.h+1.2,c+Math.sin(x)*a.r),p.rotation.y=-x,e.add(Ht(p))}}if(t==="forum")for(const a of Mf){const o=new yn,c=vt.h,f=vt.back-vt.front,l=vt.hw*2,h=new ye(Wt(new Ie(l,c,f),6,1),Qe.marbleDark);h.position.set(0,c/2,(vt.back+vt.front)/2),o.add(h);for(let v=0;v<3;v++){const y=new ye(new Ie(l-1,c*(v+1)/3,1),Qe.marble);y.position.set(0,c*(v+1)/6,vt.front-2.5+v),o.add(y)}const d=5.2,u=new ye(Wt(new Ie(12,d,6),4,2),Qe.marble);u.position.set(0,c+d/2,3),o.add(u);const _=new ye(new un(2.4,3.6),Qe.dark);_.position.set(0,c+1.8,-.02),_.rotation.y=Math.PI,o.add(_);const x=new ye(new Ie(l+.4,.7,f+.4),Qe.marble);x.position.set(0,c+d+.35,(vt.back+vt.front)/2),o.add(x);const g=new ye(qd(l+.8,2.4,f+.8),Qe.roof);g.position.set(0,c+d+.7,(vt.back+vt.front)/2),o.add(g);const p=new ye(qd(l+.4,2.2,.3),Qe.marble);p.position.set(0,c+d+.7,vt.front-.15),o.add(p),o.position.set(a.x,0,a.z),o.rotation.y=a.rot,e.add(Ht(o))}if(t==="desert")for(const a of[0,Math.PI/2,Math.PI,-Math.PI/2]){const o=Tt.ramp-Tt.r,c=Math.hypot(o,Tt.h),f=new yn,l=new ye(Wt(new Ie(Tt.lane*2,.5,c),2,3),Qe.sandDark);l.rotation.x=Math.atan2(Tt.h,o),l.position.set(0,Tt.h/2-.22,Tt.r+o/2),f.add(l),f.rotation.y=Math.atan2(Math.cos(a),Math.sin(a)),e.add(Ht(f))}if(n.palms.length){const a=[],o=[];for(const f of n.palms){const l=hr(f.x,f.z),h=5,d=1.3*f.s;let u=f.x,_=f.z,x=l;for(let g=0;g<h;g++){const p=f.lean*(g+1)/h;a.push({x:u+Math.sin(f.rot)*p*.5,y:x+d/2,z:_+Math.cos(f.rot)*p*.5,rx:p*Math.cos(f.rot),rz:-p*Math.sin(f.rot),s:f.s*(1-g*.08)}),u+=Math.sin(f.rot)*p*d,_+=Math.cos(f.rot)*p*d,x+=d*.97}for(let g=0;g<7;g++)o.push({x:u,y:x+.1,z:_,ry:g/7*Math.PI*2+f.rot,s:f.s})}e.add(Ht(en(Wt(new Xe(.2,.26,1.35,7),1,2),Qe.palmTrunk,a,(f,l,h)=>Qt(f,l,h.x,h.y,h.z,h.rx,0,h.rz,h.s,h.s,h.s))));const c=new Ie(.55,.05,2.2);c.translate(0,0,1.1),e.add(Ht(en(c,Qe.palmLeaf,o,(f,l,h)=>Qt(f,l,h.x,h.y,h.z,.45,h.ry,0,h.s,h.s,h.s))))}if(t==="colosseum"){const a=hn.r+2.5,o=(()=>{const L=document.createElement("canvas");L.width=128,L.height=64;const M=L.getContext("2d");M.fillStyle="#d8ccb4",M.fillRect(0,0,128,64),M.fillStyle="#6a5a48";for(const N of[32,96])M.beginPath(),M.moveTo(N-14,64),M.lineTo(N-14,30),M.arc(N,30,14,Math.PI,0),M.lineTo(N+14,64),M.fill();M.fillStyle="#b8aa92",M.fillRect(0,8,128,5);const S=new jo(L);return S.wrapS=ro,S.repeat.set(40,1),S.colorSpace=Ot,S})(),c=new ye(new Xe(a,a,7,120,1,!0),Vt(16777215,o,{side:$t}));c.position.y=3.5,c.receiveShadow=!0,e.add(c);const f=new ye(new Xe(a+.6,a+.6,.8,120,1,!0),Vt(15260868,null,{side:$t}));f.position.y=7.2,e.add(f);const l=new ye(new Xe(a+30,a+1,18,120,1,!0),Vt(13221026,Yi(),{side:$t}));l.position.y=16,e.add(l);const h=new ye(new Xe(a+31,a+31,6,120,1,!0),Vt(16777215,o,{side:$t}));h.position.y=28,e.add(h);const d=[];for(let L=0;L<24;L++)d.push({a:L/24*Math.PI*2,ti:L%4});const u=Vt(16777215,null,{side:Lt});e.add(en(new un(2.2,4),u,d,(L,M,S)=>{Qt(L,M,Math.cos(S.a)*(a-.15),4.8,Math.sin(S.a)*(a-.15),0,-S.a-Math.PI/2,0,1,1,1),L.setColorAt(M,new xe(he[S.ti].hex))}));const _=ht.level==="high"?3200:ht.level==="medium"?1600:500,x=is(42),g=[];for(let L=0;L<_;L++){const M=x(),S=a+2+M*27,N=x()*Math.PI*2;g.push({x:Math.cos(N)*S,z:Math.sin(N)*S,y:7+M*18+.5,a:N})}const p={time:{value:0}};Xr.crowdU=p;const v=new Mn({color:16777215});v.onBeforeCompile=L=>{L.uniforms.time=p.time,L.vertexShader=`uniform float time;
`+L.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        float ph = instanceMatrix[3][0] * 1.7 + instanceMatrix[3][2] * 2.3;
        transformed.y += max(0., sin(time * 7. + ph)) * .35 * step(.35, fract(ph * .13));
      #endif`)};const y=[15260864,12080698,6979488,14267242,8034906,10119834,13222064].map(L=>new xe(L)),b=en(new Ie(.55,1,.4),v,g,(L,M,S)=>{Qt(L,M,S.x,S.y,S.z,0,-S.a,0,1,1,1),L.setColorAt(M,y[M%y.length])});b.frustumCulled=!1,e.add(b);const C=en(new Ln(.22,6,5),v,g,(L,M,S)=>{Qt(L,M,S.x,S.y+.7,S.z,0,0,0,1,1,1),L.setColorAt(M,new xe(14727316))});C.frustumCulled=!1,e.add(C);const w=(()=>{const L=document.createElement("canvas");L.width=L.height=64;const M=L.getContext("2d");M.fillStyle="#2e2e32";for(let N=0;N<64;N+=12)M.fillRect(N,0,4,64),M.fillRect(0,N,64,3);const S=new jo(L);return S.wrapS=S.wrapT=ro,S})(),R=new Mn({map:w,transparent:!0,alphaTest:.5,side:Lt});w.repeat.set(2,1.5);for(const L of n.gates){const M=Math.atan2(L.z,L.x),S=new ye(new un(L.w+.4,4.4),R);S.position.set(L.x,2.2,L.z),S.rotation.y=Math.atan2(-Math.cos(M),-Math.sin(M)),S.castShadow=!0,e.add(S),Xr.gates.push({mesh:S,y:2.2})}}}function hS(n,e){if(Xr.crowdU&&(Xr.crowdU.time.value=e),Xr.gates.length){const t=ju(m.T);for(const i of Xr.gates){const r=t?6.3:2.2;i.y+=(r-i.y)*Math.min(1,n*4),i.mesh.position.y=i.y}}}let rn=null,Jl=[],ji=null,Zl=[];const Ql=10132114,$n=(n,e,t={})=>new Mn(Object.assign({color:n,map:e||null},t)),or=$n(14275526,Yi()),ef=$n(12433323,Yi()),lc=$n(3812384,Tr()),dS=new Mn({color:16183520,side:Lt}),uS=new Mn({color:16764730,side:Lt}),Yd=he.map(n=>new Mn({color:n.hex,side:Lt})),Kd=$n(6966067,Tr()),pS=$n(8018490,Tr()),mS=$n(5586986,Tr());function gS(n){n.traverse(e=>{e.geometry&&e.geometry.dispose()}),Ft.remove(n)}const ii=(n,e=!0)=>(n.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=!0)}),n);function am(n){var v,y,b;rn&&gS(rn),ji&&Ft.remove(ji.banner),rn=new yn,Ft.add(rn),Jl=[],ji=null;const e=m.map,t=nm(e.id);aS(e);const i=new un(420,420,220,220);i.rotateX(-Math.PI/2),Wt(i,64,64);const r=i.attributes.position,s=[],a=new xe((v=t.g1)!=null?v:e.g1),o=new xe((y=t.g2)!=null?y:e.g2),c=new xe((b=t.g3)!=null?b:e.g3),f=new xe(8022604);for(let C=0;C<r.count;C++){const w=r.getX(C),R=r.getZ(C),L=Math.hypot(w,R);r.setY(C,hr(w,R));const M=(Math.sin(w*.11+R*.07)+1)/2,S=(Math.sin(w*.031-R*.043)+1)/2,N=a.clone().lerp(o,M*.7+S*.3);L>92&&N.lerp(c,Math.min(1,(L-92)/40)),e.id==="river"&&Math.abs(R)<6.5&&Math.hypot(w,R)>=7.5&&N.lerp(f,.6),e.id==="valley"&&Math.abs(w-R)<3.2&&L<95&&N.lerp(f,.55),e.id==="wooden"&&(Math.abs(w)<2.6||Math.abs(R)<2.6)&&L>8&&L<80&&N.lerp(f,.45),s.push(N.r,N.g,N.b)}i.setAttribute("color",new mt(s,3)),i.computeVertexNormals();const l=new ye(i,new Mn({vertexColors:!0,map:iS(t.ground)}));l.receiveShadow=!0,rn.add(l);const h=$n(e.hill);if(e.id!=="colosseum")for(const C of n.hills){const w=new ye(new Ln(C.rad,12,8),h);w.scale.y=C.sy,w.position.set(Math.cos(C.a)*C.d,-3,Math.sin(C.a)*C.d),rn.add(w)}const d=new tt,u=new hi,_=new D,x=new D(0,1,0),g=new D;if(n.palisades.length){const C=n.palisades.flatMap(M=>M.logs),w=Wt(new Xe(.32,.36,3.2,8),1,2);w.translate(0,0,0);const R=new Mi(w,Kd,C.length);C.forEach((M,S)=>{u.setFromAxisAngle(x,M.rot),_.set(1,M.sy,1),d.compose(g.set(M.x,1.5*M.sy,M.z),u,_),R.setMatrixAt(S,d)});const L=new Mi(new Bn(.34,.5,8),Kd,C.length);C.forEach((M,S)=>{u.setFromAxisAngle(x,M.rot),d.compose(g.set(M.x,3.2*M.sy+.22,M.z),u,_.set(1,1,1)),L.setMatrixAt(S,d)}),rn.add(ii(R),ii(L))}if(e.id==="river"){const C=new ye(new un(420,10.4),new jf({color:3832483,specular:10471134,shininess:80,transparent:!0,opacity:.84}));C.rotation.x=-Math.PI/2,C.position.y=-.18,C.receiveShadow=!0,rn.add(C);for(const R of[-32,32]){const L=new ye(Wt(new Ie(5,.3,14),2,5),pS);L.position.set(R,.22,0),rn.add(ii(L));for(const M of[-2.4,2.4]){const S=new ye(new Ie(.18,.9,14),mS);S.position.set(R+M,.8,0),rn.add(ii(S))}}const w=$n(10132372,Yi());for(const R of n.stones){const L=new ye(new cc(R.s),w);L.position.set(R.x,-.15,R.z),rn.add(ii(L))}}if(n.trees.length){const C=n.trees.length,w=new Mi(Wt(new Xe(.25,.35,2.4,7),1,2),$n(5914152,Tr()),C),R=new Mi(new Bn(2.1,4.2,9),$n(2905392),C),L=new Mi(new Bn(1.5,3.2,9),$n(3631674),C);n.trees.forEach((M,S)=>{const N=hr(M.x,M.z)-.1;d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+1.2*M.s,M.z),w.setMatrixAt(S,d),d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+3.6*M.s,M.z),R.setMatrixAt(S,d),d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+5.4*M.s,M.z),L.setMatrixAt(S,d)}),rn.add(ii(w),ii(R),ii(L))}const p=$n(e.rock,Yi());for(const C of n.rocks){const w=new ye(new cc(C.r),p);w.position.set(C.x,hr(C.x,C.z)+C.r*(C.big?.55:.4),C.z),w.rotation.set(C.rx,C.ry,0),C.big&&w.scale.set(1,1.35,1),rn.add(ii(w))}he.forEach((C,w)=>Jl.push(xS(C,w))),n.withFort&&vS(n),Zl=n.ctrlSpots&&n.ctrlSpots.length?_S(n):[],fS(n,rn),MS(n,t)}function _S(n){return n.ctrlSpots.map(e=>{const t=new yn;t.position.set(e.x,wt(e.x,e.z),e.z),rn.add(t);const i=new ye(new Xe(.09,.09,3.2,6),lc);i.position.y=1.6,t.add(i);const r=new ye(new un(1.3,.9),new Mn({color:Ql,side:Lt}));r.position.set(.65,2.6,0),t.add(r);const s=new ye(new go(yr.radius-.3,yr.radius,40),new Si({color:Ql,transparent:!0,opacity:.35,side:Lt,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.05,t.add(s),ii(t),{id:e.id,grp:t,cloth:r,ring:s}})}function xS(n,e){const t=new yn,i=7,r=(x,g,p,v,y,b=0)=>{const C=new ye(x,g);return C.position.set(p,v,y),C.rotation.y=b,t.add(C),C},s=Wt(new Ie(i*2,4,1.2),14/3,4/3);r(s,or,0,2,-i),r(s,or,-i,2,0,Math.PI/2),r(s,or,i,2,0,Math.PI/2);const a=Wt(new Ie(i-1.8,4,1.2),(i-1.8)/3,4/3);r(a,or,-8.8/2,2,i),r(a,or,(i+1.8)/2,2,i),r(Wt(new Ie(3.6,1.2,1.3),1.2,.4),or,0,3.4,i),r(Wt(new Ie(3.4,2.8,.3),2,1),lc,0,1.4,i-.3);const o=new Mi(new Ie(.8,.8,1.3),or,64),c=new tt;let f=0;for(let x=-6;x<=6;x+=1.5)for(const[g,p,v]of[[x,-i,0],[x,i,0],[-i,x,1],[i,x,1]]){if(f>=64)break;c.makeRotationY(v?Math.PI/2:0),c.setPosition(g,4.4,p),o.setMatrixAt(f++,c)}o.count=f,t.add(o);const l=Wt(new Xe(1.9,2.1,6.2,12),4,2),h=new Bn(2.4,2.6,12),d=$n(8010538);for(const[x,g]of[[-i,-i],[i,-i],[-i,i],[i,i]])r(l,ef,x,3.1,g),r(h,d,x,7.5,g);r(Wt(new Ie(5,7.5,5),5/3,7.5/3),ef,0,3.75,-1.5),r(new Bn(4,2.6,4),d,0,8.8,-1.5,Math.PI/4);const u=new un(1.3,3);for(const x of[-4.6,-2.6,2.6,4.6])r(u,Yd[e],x,2.4,i+.62);r(new Xe(.08,.08,4,6),lc,0,11.4,-1.5);const _=r(new un(2.6,1.6),Yd[e],1.3,12.5,-1.5);return t.position.set(n.pos[0],0,n.pos[1]),t.rotation.y=Math.atan2(-n.pos[0],-n.pos[1]),rn.add(ii(t)),{grp:t,flag:_,fell:!1}}function vS(n){const e=new yn;e.position.y=wt(0,0),rn.add(e);const t=Wt(new Ie(2.9,2.2,.9),1,.75);for(const c of n.fortSegments){const f=new ye(t,or);f.position.set(c.x,1.1,c.z),f.rotation.y=-c.a+Math.PI/2,e.add(f)}for(let c=0;c<4;c++){const f=c/4*Math.PI*2+Math.PI/12,l=new ye(new Xe(.5,.6,3,8),ef);l.position.set(Math.cos(f)*6.4,1.5,Math.sin(f)*6.4),e.add(l)}ii(e);const i=new yn,r=new ye(new Xe(.07,.07,3.4,6),lc);r.position.y=1.7,i.add(r);const s=new ye(new un(1.6,1.1),dS);s.position.set(.8,2.8,0),i.add(s);const a=new ye(new un(1.6,.18),uS);a.position.set(.8,2.2,.01),i.add(a);const o=new ye(new go(1.3,1.6,28),new Si({color:16764730,transparent:!0,opacity:.6,side:Lt,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.y=.06,i.add(o),r.castShadow=s.castShadow=!0,Ft.add(i),ji={banner:i,ring:o,cloth:s}}const fc={time:{value:0}},yS=(()=>{const n=[],e=[],t=is(3);for(let r=0;r<6;r++){const s=t()*Math.PI*2,a=t()*.22,o=.55+t()*.5,c=.07,f=(t()-.5)*.5,l=Math.cos(s)*a,h=Math.sin(s)*a,d=Math.cos(s+1.57)*c,u=Math.sin(s+1.57)*c,_=l+Math.cos(s)*f,x=h+Math.sin(s)*f;n.push(l-d,0,h-u,l+d,0,h+u,_,o,x,l+d,0,h+u,l-d,0,h-u,_,o,x),e.push(.5,.5,.5,.5,.5,.5,1,1,1,.5,.5,.5,.5,.5,.5,1,1,1)}const i=new kn;return i.setAttribute("position",new mt(n,3)),i.setAttribute("color",new mt(e,3)),i.computeVertexNormals(),i})(),cm=new Mn({vertexColors:!0});cm.onBeforeCompile=n=>{n.uniforms.time=fc.time,n.vertexShader=`uniform float time;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    #ifdef USE_INSTANCING
      vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
    #else
      vec2 ip = vec2(0.);
    #endif
    float sway = sin(time * 1.7 + ip.x * .35 + ip.y * .22) * .5 + sin(time * 3.1 + ip.x * .9) * .18;
    transformed.x += sway * .16 * position.y * position.y;
    transformed.z += sway * .08 * position.y * position.y;`),n.vertexShader=n.vertexShader.replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0., 1., 0.);")};function MS(n,e){const t=Math.round(ht.cfg.grass*e.grass);if(!t)return;const i=is((m.seed|0)+11),r=new Mi(yS,cm,t),s=new xe(e.grassCol[0]),a=new xe(e.grassCol[1]),o=new xe,c=new tt,f=new hi,l=new Zi,h=new D,d=new D,u=(p,v)=>he.some(y=>Math.hypot(y.pos[0]-p,y.pos[1]-v)<Fo+1.5)||n.withFort&&Math.hypot(p,v)<7.5||m.map.id==="river"&&Math.abs(v)<6&&Math.hypot(p,v)>=7||Ku(p,v).some(y=>!y.castle&&qu(y,p,v,.3))||n.round&&Math.hypot(p,v)>n.round-1,_=(p,v)=>Math.sin(p*.09+1.3)*Math.cos(v*.08-.7)+Math.sin(p*.031-v*.027)*.8;let x=0,g=0;for(;x<t&&g<t*6;){g++;const p=(i()-.5)*220,v=(i()-.5)*220;if(_(p,v)<-.2+i()*.6||u(p,v))continue;const y=.75+i()*.7;l.set(0,i()*6.28,0),f.setFromEuler(l),c.compose(h.set(p,hr(p,v),v),f,d.set(y,y*(.8+i()*.5),y)),r.setMatrixAt(x,c),r.setColorAt(x,o.copy(s).lerp(a,i())),x++}r.count=x,r.receiveShadow=!0,r.frustumCulled=!1,rn.add(r)}function lm(n,e){fc.time.value+=n,hS(n,fc.time.value),bS(),he.forEach((r,s)=>{const a=m.teams[s],o=Jl[s];if(!o||!a)return;const c=m.mode!=="conquest"?1:a.alive?1-(1-a.points/100)*.12:.28;o.grp.scale.y+=(c-o.grp.scale.y)*Math.min(1,n*3),o.flag.visible=m.mode!=="conquest"||a.alive,m.mode==="conquest"&&a.alive&&a.points<35&&Math.random()<n*6&&e("smoke",r.pos),m.mode==="conquest"&&!a.alive&&!o.fell&&(o.fell=!0,e("rubble",r.pos))});const t=m.flag;if(!t||!ji)return;const i=ji.banner;if(t.state==="carried"&&t.carrier){const r=t.carrier;i.position.set(r.x-Math.sin(r.face)*.45,r.y+.9,r.z-Math.cos(r.face)*.45),i.rotation.y=r.face+Math.PI/2,i.scale.setScalar(.8),ji.ring.visible=!1}else i.position.set(t.x,wt(t.x,t.z),t.z),i.rotation.y=m.T*.6,i.scale.setScalar(1),ji.ring.visible=!0;ji.cloth.rotation.y=Math.sin(m.T*3)*.25}const Tl={own:[],neut:new xe(Ql)};function bS(){const n=m.ctrlPoints;if(!(!n||!Zl.length))for(const e of Zl){const t=n[e.id];if(!t)continue;const i=t.owner>=0?Tl.own[t.owner]||(Tl.own[t.owner]=new xe(he[t.owner%4].hex)):Tl.neut;e.cloth.material.color.lerp(i,.1),e.cloth.rotation.y=Math.sin(m.T*2.4+e.id)*.2;const r=t.capturer!=null&&t.capturer!==t.owner&&t.prog>0;e.ring.material.color.lerp(r?new xe(16764730):i,.1),e.ring.material.opacity=r?.35+Math.sin(m.T*6)*.2:.35}}const Jd=()=>fc.time.value,lt={yaw:0,pitch:.42,shake:0},fm=.42,SS=matchMedia("(prefers-reduced-motion: reduce)").matches;function $f(){const n=m.player;if(n&&!n.dead)return n;const e=m.teams.map(t=>t.leader).find(t=>t&&!t.dead&&!li(t.ti,m.myTi));return e||m.units.find(t=>!t.dead&&t.ti===m.myTi)||m.units.find(t=>!t.dead)||null}function TS(n){lt.shake=Math.max(0,lt.shake-n*1.6);const e=$f();if(!e)return;const t=e.x,i=e.z,r=e.y,s=(Et.W<Et.H?11:9.5)+(e.mounted?3:0),a=2.2+Math.sin(lt.pitch)*s+(e.mounted?1:0),o=t-Math.sin(lt.yaw)*Math.cos(lt.pitch)*s,c=i-Math.cos(lt.yaw)*Math.cos(lt.pitch)*s,f=Math.min(1,n*8);xt.position.x+=(o-xt.position.x)*f,xt.position.z+=(c-xt.position.z)*f,xt.position.y+=(r+a-xt.position.y)*f;const l=wt(xt.position.x,xt.position.z)+1;xt.position.y<l&&(xt.position.y=l),lt.shake>0&&!SS&&(xt.position.x+=ae(-1,1)*lt.shake*.3,xt.position.y+=ae(-1,1)*lt.shake*.3),xt.lookAt(t+Math.sin(lt.yaw)*3,r+1.6+(e.mounted?1:0),i+Math.cos(lt.yaw)*3)}function ES(n){xt.position.set(Math.cos(n*.05)*62,26+(m.map.id==="frost"?4:0),Math.sin(n*.05)*62),xt.lookAt(0,wt(0,0),0)}let Yn=[],$s=[];function wS(n,e,t,i,r){const s=ht.cfg.particles;Yn.length<s&&Yn.push({x:n,y:e,z:t,vx:0,vy:ae(.2,.6),vz:0,life:.22,c:"#fff8e6",s:9});for(let a=0;a<r&&Yn.length<s;a++)Yn.push({x:n,y:e,z:t,vx:ae(-4,4),vy:ae(1,5),vz:ae(-4,4),life:ae(.25,.5),c:i,s:ae(2,4)})}function tf(n){Yn.length<ht.cfg.particles+40&&Yn.push(n)}function AS(n,e,t,i){Yn.length<ht.cfg.particles&&Yn.push({x:n,y:e,z:t,vx:ae(-.2,.2),vy:ae(-.1,.2),vz:ae(-.2,.2),life:ae(.08,.14),c:i,s:ae(2.5,4)})}const Zd={dunes:"#dcc69c",river:"#b7a888",forest:"#a89a7c",frost:"#f4f7fa"};function CS(n,e){const t=Zd[m.map.id]||Zd.dunes,i=wt(n,e)+.3;for(let r=0;r<3;r++)tf({x:n+ae(-.4,.4),y:i,z:e+ae(-.4,.4),vx:ae(-1,1),vy:ae(.8,1.6),vz:ae(-1,1),life:ae(.5,.8),c:t,s:ae(5.5,8)})}function gr(n,e,t,i,r){$s.push({x:n,y:e,z:t,text:i,color:r,t:0})}function RS(n,e){if(n==="smoke")tf({x:e[0]+ae(-6,6),y:ae(3,6),z:e[1]+ae(-6,6),vx:ae(-.4,.4),vy:ae(1.5,3),vz:ae(-.4,.4),life:ae(1.2,2),c:"#5b5550",s:ae(5,9)});else for(let t=0;t<30;t++)tf({x:e[0]+ae(-8,8),y:ae(0,6),z:e[1]+ae(-8,8),vx:ae(-3,3),vy:ae(1,5),vz:ae(-3,3),life:ae(1,2.2),c:"#bdb3a2",s:ae(3,7)})}const Lc=90,PS=(()=>{const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d");e.fillStyle="#ffffff";for(let t=0;t<9;t++)e.beginPath(),e.arc(32+ae(-14,14),32+ae(-14,14),ae(4,12),0,Math.PI*2),e.fill();for(let t=0;t<8;t++)e.beginPath(),e.arc(32+ae(-28,28),32+ae(-28,28),ae(1.5,3.5),0,Math.PI*2),e.fill();return new jo(n)})(),hm=new Si({map:PS,transparent:!0,depthWrite:!1});hm.onBeforeCompile=n=>{n.vertexShader=`attribute float aAlpha;
varying float vAlpha;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vAlpha = aAlpha;`),n.fragmentShader=`varying float vAlpha;
`+n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vAlpha;`)};const dm=new un(1,1),nf=new Wo(new Float32Array(Lc),1);dm.setAttribute("aAlpha",nf);const Xi=new Mi(dm,hm,Lc);Xi.instanceColor=new Wo(new Float32Array(Lc*3),3);Xi.frustumCulled=!1;Xi.count=0;Ft.add(Xi);let Ki=[],LS=0;const IS=he.map(n=>new xe(n.hex).multiplyScalar(.85)),Qd=new tt,eu=new hi,tu=new Zi,DS=new D,kS=new D;function US(n,e,t,i){if(bc(n,e))return;const r=ht.cfg.splats;Ki.length>=r&&Ki.shift(),Ki.push({x:n,z:e,s:t,rot:ae(0,6),t:0,c:IS[i==null?1:Se(i)],lift:LS++%Lc*4e-4})}const um=160,NS=(()=>{const n=new Xe(.03,.03,.9,4);return n.rotateX(Math.PI/2),n})(),qs=new Mi(NS,new Mn({color:3811868}),um);qs.frustumCulled=!1;qs.count=0;Ft.add(qs);const Ls=new ln;function zS(n){for(const e of Yn)e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.vy-=(e.s>5?-.5:9)*n,e.life-=n;Yn=Yn.filter(e=>e.life>0&&e.y>-1);for(const e of $s)e.t+=n,e.y+=n*1.2;$s=$s.filter(e=>e.t<1.3);for(const e of Ki)e.t+=n;Ki=Ki.filter(e=>e.t<30)}function pm(){Ki.forEach((e,t)=>{tu.set(-Math.PI/2,0,e.rot),eu.setFromEuler(tu),Qd.compose(DS.set(e.x,wt(e.x,e.z)+.04+e.lift,e.z),eu,kS.set(e.s,e.s,e.s)),Xi.setMatrixAt(t,Qd),Xi.setColorAt(t,e.c),nf.array[t]=e.t>25?Math.max(0,.85-(e.t-25)/5):.85}),Xi.count=Ki.length,Xi.instanceMatrix.needsUpdate=!0,Xi.instanceColor.needsUpdate=!0,nf.needsUpdate=!0;let n=0;for(const e of m.arrows){if(n>=um)break;const t=e.x-e.px,i=e.y-e.py,r=e.z-e.pz;Ls.position.set(e.x,e.y,e.z),t||i||r?(Ls.lookAt(e.x+t+1e-4,e.y+i,e.z+r),e.q=(e.q||new hi).copy(Ls.quaternion)):e.q&&Ls.quaternion.copy(e.q),Ls.updateMatrix(),qs.setMatrixAt(n++,Ls.matrix)}qs.count=n,qs.instanceMatrix.needsUpdate=!0}function mm(){Yn=[],$s=[],Ki=[]}const rf=new Si({color:16777215,transparent:!0,opacity:.22,depthWrite:!1,side:Lt}),_r=new ye(new go(.93,1,72),rf);_r.rotation.x=-Math.PI/2;_r.renderOrder=1;_r.visible=!1;Ft.add(_r);function OS(n,e,t){_r.visible=!!(n&&!n.dead&&m.state==="play"),_r.visible&&(_r.position.set(n.x,wt(n.x,n.z)+.07,n.z),_r.scale.setScalar(e),rf.color.set(he[Se(n.ti)].hex),rf.opacity=.16+.08*Math.sin(t*2.4))}const gm=320,FS=(()=>{const n=new Xe(1,1,1.15,14,1,!0,-.42,.84);return n.translate(0,0,-1),n})(),BS=(()=>{const n=new Ln(.95,24,8,0,Math.PI*2,0,.7);return n.rotateX(Math.PI/2),n.translate(0,0,-.95*Math.cos(.7)),n.scale(1,1,.6),n})(),HS=(()=>{const n=new Xe(.5,.5,.08,22);return n.rotateX(Math.PI/2),n})(),GS={leg:new Xe(.15,.13,.7,9),boot:new Ie(.2,.14,.32),greave:new Xe(.16,.15,.32,10),torso:new Xe(.42,.36,.78,16),skirt:new Xe(.43,.52,.32,16),belt:new Xe(.44,.44,.14,16),head:new Ln(.4,18,12),helm:new Ln(.44,18,10,0,Math.PI*2,0,Math.PI/2),corinth:new Ln(.47,18,12,0,Math.PI*2,0,Math.PI*.52),cone:new Bn(.44,.7,16),hood:new Ln(.45,16,10,0,Math.PI*2,0,Math.PI*.6),brim:new Xe(.66,.66,.05,20),crest:new Ie(.1,.22,.62),cheek:new Ie(.08,.3,.24),neckGuard:new Ie(.56,.08,.22),pauldron:new Ie(.22,.16,.24),nose:new Ie(.07,.24,.05),knob:new Ln(.08,10,8),hair:new Ln(.45,16,10,0,Math.PI*2,0,Math.PI*.55),beard:new Ie(.44,.3,.2),circlet:new Fs(.42,.045,8,22),mantle:new Xe(.58,.5,.26,16),face:new un(.5,.26),arm:new Xe(.11,.1,.55,8),blade:new Ie(.07,.07,1),gladius:new Ie(.09,.06,.72),guard:new Ie(.32,.06,.06),haft:new Xe(.04,.04,1.05,8),axeHead:new Ie(.05,.36,.26),shaft:new Xe(.04,.04,3,7),tip:new Bn(.09,.35,7),bow:new Fs(.6,.035,6,18,Math.PI),quiver:new Xe(.13,.11,.7,8),scutum:FS,hoplon:BS,roundShield:HS,rim:new Fs(.6,.05,8,28),woodRim:new Fs(.5,.04,8,24),boss:new Ln(.12,10,8),shadow:new Rc(.62,18),ring:new go(.8,1,28),cape:new un(.9,1.1)},VS=(()=>{const n=document.createElement("canvas");n.width=128,n.height=64;const e=n.getContext("2d");e.fillStyle="#1b1512",e.beginPath(),e.ellipse(40,26,7,9,0,0,Math.PI*2),e.ellipse(88,26,7,9,0,0,Math.PI*2),e.fill(),e.lineWidth=7,e.lineCap="round",e.strokeStyle="#1b1512",e.beginPath(),e.moveTo(24,10),e.lineTo(54,17),e.moveTo(104,10),e.lineTo(74,17),e.stroke(),e.beginPath(),e.moveTo(64,48),e.quadraticCurveTo(44,42,30,56),e.quadraticCurveTo(46,50,64,54),e.quadraticCurveTo(82,50,98,56),e.quadraticCurveTo(84,42,64,48),e.fill();const t=new jo(n);return t.colorSpace=Ot,t})(),WS={plain:new Mn({color:16777215}),plain2:new Mn({color:16777215,side:Lt}),metal:new jf({color:16777215,shininess:110,specular:10132122}),shadow:new Si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),ring:new Si({color:16764730,transparent:!0,opacity:.8,side:Lt,depthWrite:!1}),ringAlly:new Si({color:16777215,transparent:!0,opacity:.45,side:Lt,depthWrite:!1}),face:new Si({map:VS,transparent:!0,depthWrite:!1})},jS=new Set(["plain","plain2","metal"]),nu=new Set(["shadow","ring","ringAlly","face"]),mi=n=>new xe(n),Be={skin:[15914684,14990488,13145710].map(mi),hair:[14727260,11886634,5913122,3023904].map(mi),steel:mi(10923448),bronze:mi(13144124),wood:mi(7031342),leather:mi(5125152),gold:mi(16764730),linen:mi(15524552),fur:mi(8018492),team:he.map(n=>mi(n.hex)),dark:he.map(n=>mi(n.hex).multiplyScalar(.62))},_m=n=>Math.imul(n.id|0,2654435761)>>>0,Ia=n=>Be.skin[_m(n)%3],iu=n=>Be.hair[(_m(n)>>>4)%4],Hs=n=>m.factions&&m.factions[Se(n.ti)]||"roman",_e=(n,e,t,i=0,r=0,s=0,a=1,o=1,c=1)=>new tt().compose(new D(n,e,t),new hi().setFromEuler(new Zi(i,r,s)),new D(a,o,c)),Gt=(...n)=>new Set(n),Ke=(...n)=>new Set(n),ru=Kr.map(n=>new xe(n.hex)),Is=n=>ru[m.crests&&m.crests[n.ti]||0]||ru[0],tn=Gt("foot","captain"),ei=Gt("foot","captain"),Da=n=>n.tier>=1,su=n=>n.tier>=2,Wi=n=>n.weapon?n.weapon!=="sword":n.tier>=1,XS=n=>n.tier>=1,$S=n=>n.tier>=2,Ai=n=>Be.team[Se(n.ti)],ka=n=>Be.dark[Se(n.ti)],xm=[{bone:"root",geo:"shadow",mat:"shadow",m:_e(0,.03,0,-Math.PI/2),when:"blob"},{bone:"root",geo:"ring",mat:"ring",m:_e(0,.05,0,-Math.PI/2),when:"me"},{bone:"root",geo:"ring",mat:"ringAlly",m:_e(0,.05,0,-Math.PI/2),when:"ally"},{bone:"legL",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:ka},{bone:"legR",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:ka},{bone:"legL",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Be.leather},{bone:"legR",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Be.leather},{bone:"legL",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"legR",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ke("roman"),k:ei,col:()=>Be.steel},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ke("greek"),k:Gt("captain"),col:()=>Be.bronze},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ke("greek"),k:Gt("foot","spear"),col:()=>Be.linen},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ke("barbarian"),k:tn,t:n=>!Da(n),col:Ia},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ke("barbarian"),k:tn,t:Da,col:ka},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),k:Gt("arch"),col:ka},{bone:"body",geo:"skirt",mat:"plain",m:_e(0,.64,0),f:Ke("roman","greek"),col:Ai},{bone:"body",geo:"belt",mat:"plain",m:_e(0,.78,0),col:n=>Hs(n)==="barbarian"?Ai(n):Be.leather},{bone:"body",geo:"head",mat:"plain",m:_e(0,1.78,0),col:Ia},{bone:"body",geo:"face",mat:"face",m:_e(0,1.73,.39)},{bone:"body",geo:"hood",mat:"plain",m:_e(0,1.82,-.02),k:Gt("arch"),f:Ke("roman","barbarian"),col:Ai},{bone:"body",geo:"helm",mat:"plain",m:_e(0,1.9,0,0,0,0,.8,.7,.8),k:Gt("arch"),f:Ke("greek"),col:()=>Be.leather},{bone:"body",geo:"brim",mat:"plain",m:_e(0,1.98,0),k:Gt("arch"),f:Ke("greek"),col:Ai},{bone:"body",geo:"quiver",mat:"plain",m:_e(.2,1.25,-.42,0,0,.4),k:Gt("arch"),col:()=>Be.leather},{bone:"body",geo:"helm",mat:"metal",m:_e(0,1.86,0),f:Ke("roman"),k:ei,col:()=>Be.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(.34,1.64,.12,0,0,.12),f:Ke("roman"),k:ei,col:()=>Be.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.34,1.64,.12,0,0,-.12),f:Ke("roman"),k:ei,col:()=>Be.steel},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0),f:Ke("roman"),k:Gt("foot"),t:n=>!Da(n),col:Ai},{bone:"body",geo:"knob",mat:"metal",m:_e(0,2.3,0),f:Ke("roman"),k:Gt("foot"),t:Da,col:()=>Be.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0,0,Math.PI/2,0,1.3,1.5,1.25),f:Ke("roman"),k:Gt("captain"),col:Is},{bone:"body",geo:"corinth",mat:"metal",m:_e(0,1.8,0),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"body",geo:"nose",mat:"metal",m:_e(0,1.74,.45),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(.33,1.62,.18,0,0,.1),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.33,1.62,.18,0,0,-.1),f:Ke("greek"),k:ei,col:()=>Be.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.5,-.04,0,0,0,1.2,2.3,1.6),f:Ke("greek"),k:Gt("foot","spear"),col:Ai},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.58,-.04,0,0,0,1.4,2.8,1.9),f:Ke("greek"),k:Gt("captain"),col:Is},{bone:"body",geo:"hair",mat:"plain",m:_e(0,1.82,-.03),f:Ke("barbarian"),k:ei,col:iu},{bone:"body",geo:"beard",mat:"plain",m:_e(0,1.55,.3,.15),f:Ke("barbarian"),k:ei,col:iu},{bone:"body",geo:"circlet",mat:"metal",m:_e(0,1.92,0,Math.PI/2),f:Ke("barbarian"),k:Gt("captain"),col:Is},{bone:"body",geo:"mantle",mat:"plain",m:_e(0,1.44,0),f:Ke("barbarian"),k:Gt("captain","foot"),col:()=>Be.fur},{bone:"body",geo:"cape",mat:"plain2",m:_e(0,1.02,-.44,.12),k:Gt("captain"),col:Ai},{bone:"sArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:Ia},{bone:"wArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:Ia},{bone:"shield",geo:"scutum",mat:"plain2",m:_e(0,0,0),f:Ke("roman"),k:tn,col:Ai},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.05),f:Ke("roman"),k:tn,col:n=>n.leader?Is(n):Be.steel},{bone:"shield",geo:"hoplon",mat:"plain2",m:_e(0,0,0),f:Ke("greek"),k:tn,col:Ai},{bone:"shield",geo:"rim",mat:"metal",m:_e(0,0,0),f:Ke("greek"),k:tn,col:n=>n.leader?Is(n):Be.bronze},{bone:"shield",geo:"roundShield",mat:"plain",m:_e(0,0,0),f:Ke("barbarian"),k:tn,col:Ai},{bone:"shield",geo:"woodRim",mat:"plain",m:_e(0,0,0),f:Ke("barbarian"),k:tn,col:()=>Be.wood},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.06),f:Ke("barbarian"),k:tn,col:n=>n.leader?Is(n):Be.steel},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),f:Ke("roman","greek"),k:tn,col:()=>Be.leather},{bone:"wArm",geo:"gladius",mat:"metal",m:_e(0,-.5,.5),f:Ke("roman"),k:tn,t:n=>!Wi(n),col:()=>Be.steel},{bone:"wArm",geo:"blade",mat:"metal",m:_e(0,-.5,.6),f:Ke("greek"),k:tn,t:n=>!Wi(n),col:()=>Be.bronze},{bone:"wArm",geo:"haft",mat:"plain",m:_e(0,-.5,.42,Math.PI/2),f:Ke("barbarian"),k:tn,t:n=>!Wi(n),col:()=>Be.wood},{bone:"wArm",geo:"axeHead",mat:"metal",m:_e(0,-.35,.86),f:Ke("barbarian"),k:tn,t:n=>!Wi(n),col:()=>Be.steel},{bone:"spear",geo:"shaft",mat:"plain",m:_e(0,0,.6,Math.PI/2),k:tn,t:Wi,col:()=>Be.wood},{bone:"spear",geo:"tip",mat:"metal",m:_e(0,0,2.2,Math.PI/2),k:tn,t:Wi,col:n=>Hs(n)==="greek"?Be.bronze:Be.steel},{bone:"sArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,.3),k:tn,t:su,col:n=>Hs(n)==="greek"?Be.bronze:Be.steel},{bone:"wArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,-.3),k:tn,t:su,col:n=>Hs(n)==="greek"?Be.bronze:Be.steel},{bone:"sArm",geo:"bow",mat:"plain",m:_e(0,-.48,.2,0,Math.PI/2,Math.PI/2),k:Gt("arch"),col:()=>Be.wood},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),k:Gt("arch"),t:XS,col:()=>Be.leather},{bone:"wArm",geo:"guard",mat:"metal",m:_e(0,-.5,.3),k:Gt("arch"),t:$S,col:()=>Be.steel}],ao=new Map;for(const n of xm){const e=n.geo+"|"+n.mat;let t=ao.get(e);t||(t={perUnit:0,n:0,mesh:null,geo:n.geo,mat:n.mat},ao.set(e,t)),t.perUnit++,n.batch=t}for(const n of ao.values()){const e=Math.max(1,n.perUnit)*gm,t=new Mi(GS[n.geo],WS[n.mat],e);t.instanceMatrix.setUsage(Zh),jS.has(n.mat)&&(t.instanceColor=new Wo(new Float32Array(e*3),3),t.instanceColor.setUsage(Zh)),t.frustumCulled=!1,t.count=0,t.castShadow=!nu.has(n.mat),t.receiveShadow=n.mat!=="face"&&!nu.has(n.mat),(n.mat==="shadow"||n.mat.startsWith("ring"))&&(t.renderOrder=1),Ft.add(t),n.mesh=t}const qS=()=>[...ao.values()].filter(n=>n.mesh.count>0).length,ou=new WeakMap;function vm(n){let e=ou.get(n);return e||(e={walk:Math.random()*6,bodyY:0,bodyRX:0,bodyRZ:0,yaw:0,lift:0,sink:0,legL:[0,0,0],legR:[0,0,0],sArmX:0,sArmPX:.5,wArmX:0,wArmZ:0,spearRX:0,spearZ:0,block:0,over:0,rag:null},ou.set(n,e)),e}const YS=n=>n.kind!=="captain"?null:n.ti===m.myTi?"me":!yf()&&!li(n.ti,m.myTi)?"ally":null;function KS(n,e,t){let i=e.rag;if(!i){const a=(c,f)=>c+Math.random()*(f-c),o=n.fallDir||1;i=e.rag={dir:o,pitch:e.bodyRX,pv:-o*a(3,6),roll:0,rollT:a(-.4,.4),spin:a(-4,4),arms:[a(-3,-.3),a(-3,-.3),a(-1.3,-.2)],legs:[a(-.7,.7),a(-.7,.7),a(.05,.5)]}}const r=-i.dir*Math.PI/2*.97;i.pv+=((r-i.pitch)*70-i.pv*6)*t,i.pitch+=i.pv*t,Math.abs(i.pitch)>Math.PI/2*1.02&&(i.pitch=Math.sign(i.pitch)*Math.PI/2*1.02,i.pv*=-.35),i.spin*=Math.exp(-t*2.5),e.yaw+=i.spin*t,i.roll+=(i.rollT-i.roll)*Math.min(1,t*5);const s=Math.min(1,t*9);e.sArmX+=(i.arms[0]-e.sArmX)*s,e.wArmX+=(i.arms[1]-e.wArmX)*s,e.wArmZ+=(i.arms[2]-e.wArmZ)*s,e.legL[0]+=(i.legs[0]-e.legL[0])*s,e.legR[0]+=(i.legs[1]-e.legR[0])*s,e.legL[2]+=(i.legs[2]-e.legL[2])*s,e.legR[2]+=(-i.legs[2]-e.legR[2])*s,e.bodyY=0,e.bodyRX=i.pitch,e.bodyRZ=i.roll,e.block+=(0-e.block)*s,e.lift=.3*Math.min(1,Math.abs(i.pitch)/1.4),e.sink=n.deadT>10?Math.min(1.5,(n.deadT-10)*.4):0}function JS(n,e){const t=vm(n);if(n.dead)return KS(n,t,e),t;t.rag=null,t.yaw=0,t.lift=0,t.sink=0,t.bodyRZ=0,t.hp!=null&&n.hp<t.hp-.5&&(t.flash=Math.min(1,Math.max(t.flash||0,(t.hp-n.hp)/18))),t.hp=n.hp,t.flash>0&&(t.flash=Math.max(0,t.flash-e*6));const i=Math.hypot(n.vx,n.vz);if(n.mounted)t.bodyY=1.02+.03*Math.sin(t.walk*2),t.legL[0]=-.9,t.legL[1]=0,t.legL[2]=.55,t.legR[0]=-.9,t.legR[1]=0,t.legR[2]=-.55,t.bodyRX=0,t.walk+=e*i*.9;else{t.walk+=e*i*2.2;const o=Math.sin(t.walk)*Math.min(1,i/3)*.7;t.legL[0]=o,t.legL[1]=t.legL[2]=0,t.legR[0]=-o,t.legR[1]=t.legR[2]=0,t.bodyY=Math.abs(Math.cos(t.walk))*Math.min(1,i/3)*.08,t.bodyRX=n.stun>0?-.25:Math.min(.15,i*.02),t.flash>0&&(t.bodyRX-=.45*t.flash,t.yaw=(Math.random()-.5)*.16*t.flash),n.jy>.05&&(t.legL[0]=-.9,t.legR[0]=.35,t.bodyY=0,t.bodyRX=.12)}const r=n.swing>0?1-n.swing/.38:-1;let s=!1;const a=(n.kind==="foot"||n.kind==="captain")&&Wi(n);if(n.weapon==="jav"&&!n.mounted){const o=r>=0?-2.7+2.3*Math.min(1,r/.45):-2.6;t.wArmX+=(o-t.wArmX)*Math.min(1,e*(r>=0?30:10)),t.spearRX=1.5+(r>=0?.4*Math.min(1,r/.45):0),t.spearZ=r>=0?-.3+.9*Math.min(1,r/.45):-.5,t.sArmX+=(-.6-t.sArmX)*Math.min(1,e*8)}else if(a){const o=ip(n)||n.swing>0;t.wArmX+=((o?-1.45:-.35)-t.wArmX)*Math.min(1,e*10),t.spearRX=o?1.45:-.2,t.spearZ=r>=0?Math.sin(r*Math.PI)*.8:0,t.sArmX+=(-.6-t.sArmX)*Math.min(1,e*8)}else if(n.kind==="arch")t.sArmX+=((n.aim?-1.5:-.3)-t.sArmX)*Math.min(1,e*10),t.wArmX+=((n.aim?r>=0?-1.2:-1.5:-.35)-t.wArmX)*Math.min(1,e*12);else{if(r>=0){const c=n.mounted?0:n.swingKind|0;c===2?(t.wArmX=r<.3?-.35-3*(r/.3):-3.35+3*Math.min(1,(r-.3)/.22),t.wArmZ=0,t.bodyRX=r>.3?.3:-.1):(t.wArmX=r<.35?-.35-2.65*(r/.35):-3+2.2*Math.min(1,(r-.35)/.3),t.wArmZ=n.mounted?-.9:c===1?.55:-.3)}else t.wArmX+=(-.35-t.wArmX)*Math.min(1,e*10),t.wArmZ=0;s=(n.human&&n.blocking||n.blockT>0)&&!n.mounted;const o=n.shieldwall&&n.kind==="foot";t.over+=((o?1:0)-t.over)*Math.min(1,e*8),t.sArmX+=((o?-2.9:s?-1.35:n.carrying?-.1:-.35)-t.sArmX)*Math.min(1,e*14),t.sArmPX=s?.28:.5}return t.block+=((s?1:0)-t.block)*Math.min(1,e*16),t}const nn={root:new tt,body:new tt,legL:new tt,legR:new tt,sArm:new tt,wArm:new tt,spear:new tt,shield:new tt},ZS=new xe,QS=new xe(1,1,1),e1=new tt,au=new tt,hc=new Zi,dc=new hi,ym=new D,Mm=new D,Ao=new D;function zr(n,e,t,i,r,s){return hc.set(i,r,s),dc.setFromEuler(hc),e1.compose(ym.set(n,e,t),dc,Mm.set(1,1,1))}function t1(n,e){const t=n.kind==="captain"?1.18:1;if(hc.set(0,n.face+e.yaw,0),dc.setFromEuler(hc),nn.root.compose(ym.set(n.x,n.y+e.lift-e.sink,n.z),dc,Mm.set(t,t,t)),nn.body.multiplyMatrices(nn.root,zr(0,e.bodyY,0,e.bodyRX,0,e.bodyRZ)),nn.legL.multiplyMatrices(nn.body,zr(-.18,.7,0,e.legL[0],e.legL[1],e.legL[2])),nn.legR.multiplyMatrices(nn.body,zr(.18,.7,0,e.legR[0],e.legR[1],e.legR[2])),nn.sArm.multiplyMatrices(nn.body,zr(e.sArmPX,1.3,.05,e.sArmX,0,0)),nn.wArm.multiplyMatrices(nn.body,zr(-.5,1.3,.05,e.wArmX,0,e.wArmZ)),(n.kind==="foot"||n.kind==="captain")&&Wi(n)&&nn.spear.multiplyMatrices(nn.wArm,zr(0,-.48,e.spearZ,e.spearRX,0,0)),n.kind==="foot"||n.kind==="captain"){const i=e.over,r=e.block*(1-i),s=Hs(n)==="greek"?.08:0,a=.56-.38*r,o=1.02+.26*r+s,c=.3+.3*r;nn.shield.multiplyMatrices(nn.body,zr(a+(.08-a)*i,o+(2.5-o)*i,c+(.1-c)*i,-.05*(1-r)*(1-i)-Math.PI/2*i,.5*(1-r)*(1-i),0))}}function bm(n,e){for(const l of ao.values())l.n=0;const t=!sm();let i=0;const r=$f(),s=xt.position;let a=0,o=0,c=0,f=0;r&&!r.dead&&(a=r.x-s.x,o=r.y+1.3-s.y,c=r.z-s.z,f=a*a+o*o+c*c);for(const l of n){if(l.hidden)continue;if(f>0&&l!==r&&!l.dead){const _=vm(l);if(!li(l.ti,m.myTi)){const x=l.x-s.x,g=l.y+1.1-s.y,p=l.z-s.z,v=(x*a+g*o+p*c)/f;if(v>0&&v<.93){const y=x-a*v,b=g-o*v,C=p-c*v;y*y+b*b+C*C<1.05*1.05&&(_.occT=.3)}}if(_.occT>0){_.occT-=e;continue}}if(i>=gm)break;i++;const h=JS(l,e);t1(l,h),l.swing>0&&!l.dead&&(l.kind==="foot"||l.kind==="captain")&&(Wi(l)?Ao.set(0,0,2.1).applyMatrix4(nn.spear):Ao.set(0,-.4,1).applyMatrix4(nn.wArm),AS(Ao.x,Ao.y,Ao.z,"#eef2f5"));const d=YS(l),u=Hs(l);for(const _ of xm){if(_.k&&!_.k.has(l.kind)||_.f&&!_.f.has(u)||_.t&&!_.t(l)||_.when&&(_.when==="blob"?!t:_.when!==d))continue;const x=_.batch,g=x.n++;au.multiplyMatrices(nn[_.bone],_.m),x.mesh.setMatrixAt(g,au),_.col&&x.mesh.setColorAt(g,h.flash>0?ZS.copy(_.col(l)).lerp(QS,h.flash*.75):_.col(l))}}for(const l of ao.values()){if(l.mesh.count=l.n,!l.n)continue;const h=l.mesh.instanceMatrix;h.clearUpdateRanges(),h.addUpdateRange(0,l.n*16),h.needsUpdate=!0;const d=l.mesh.instanceColor;d&&(d.clearUpdateRanges(),d.addUpdateRange(0,l.n*3),d.needsUpdate=!0)}}const Hi={torso:new Ln(1,14,10),neck:new Xe(.2,.3,1,8),head:new Ie(.32,.36,.78),leg:new Xe(.1,.08,1,6),hoof:new Ie(.16,.12,.2),tail:new Xe(.06,.14,.9,6),cloth:new Ie(.95,.08,.85),mane:new Ie(.08,.3,.9),shadow:new Rc(.62,14)},cu=[8014378,3877408,13616304].map(n=>new Mn({color:n})),El=new Mn({color:2234386}),n1=new Si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),i1=he.map(n=>new Mn({color:n.hex}));function r1(n,e){const t=new yn,i=new yn;t.add(i);const r=cu[e%cu.length],s=(c,f,l,h,d,u)=>{const _=new ye(c,f);return _.position.set(h,d,u),l.add(_),_},a=s(Hi.shadow,n1,t,0,.03,0);a.rotation.x=-Math.PI/2,a.scale.set(1.2,2.2,1),s(Hi.torso,r,i,0,1.35,0).scale.set(.55,.6,1.15),s(Hi.neck,r,i,0,1.85,.95).rotation.x=.65,s(Hi.head,r,i,0,2.25,1.35).rotation.x=.55,s(Hi.mane,El,i,0,2.05,.8).rotation.x=.65,s(Hi.tail,El,i,0,1.35,-1.2).rotation.x=-.7,s(Hi.cloth,i1[Se(n)],i,0,1.95,-.05);const o=[];for(const[c,f]of[[-.28,.72],[.28,.72],[-.28,-.72],[.28,-.72]]){const l=new yn;l.position.set(c,1.05,f),i.add(l),s(Hi.leg,r,l,0,-.5,0),s(Hi.hoof,El,l,0,-1,.03),o.push(l)}return i.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0)}),Ft.add(t),{root:t,body:i,legs:o,sh:a,walk:0}}const Gs=new Map;function Sm(n,e){const t=new Set;for(const i of n){t.add(i.key);let r=Gs.get(i.key);if(r||(r=r1(i.ti,Math.abs(i.key*7919)%3),Gs.set(i.key,r)),r.root.position.set(i.x,wt(i.x,i.z),i.z),r.root.rotation.y=i.face,r.root.visible=!0,r.sh.visible=!sm(),i.state==="dead"){r.body.rotation.z=Math.min(1,i.t/.5)*Math.PI/2*.9*(i.fall||1),i.t>6&&(r.root.position.y-=(i.t-6)*.6);continue}r.walk+=e*i.spd*1.1;const s=Math.min(1,i.spd/4)*.8;r.legs[0].rotation.x=r.legs[3].rotation.x=Math.sin(r.walk)*s,r.legs[1].rotation.x=r.legs[2].rotation.x=Math.sin(r.walk+Math.PI)*s,r.body.position.y=Math.abs(Math.sin(r.walk))*.12*Math.min(1,i.spd/4),i.state==="leaving"&&(r.root.visible=i.t<2.6)}for(const[i,r]of Gs)t.has(i)||(Ft.remove(r.root),Gs.delete(i))}function Tm(){for(const n of Gs.values())Ft.remove(n.root);Gs.clear()}const sf=document.getElementById("fx"),oe=sf.getContext("2d"),Em=document.getElementById("mini"),rt=Em.getContext("2d"),xr=new D,s1=new D;function o1(){sf.width=Math.round(Et.W*Et.DPR),sf.height=Math.round(Et.H*Et.DPR)}function Fa(n,e,t){return xr.set(n,e,t).project(xt),xr.z<=1?[(xr.x+1)/2*Et.W,(1-xr.y)/2*Et.H,!0]:[0,0,!1]}function wm(){oe.setTransform(Et.DPR,0,0,Et.DPR,0,0),oe.clearRect(0,0,Et.W,Et.H)}function a1(n){const e=Et.W,t=Et.H;wm();for(const s of Yn){const[a,o,c]=Fa(s.x,s.y,s.z);if(!c)continue;const f=xt.position.distanceTo(s1.set(s.x,s.y,s.z)),l=s.s*Hn(14/f,.3,2.5);oe.globalAlpha=Math.min(1,s.life*2),oe.fillStyle=s.c,s.s>4?(oe.beginPath(),oe.arc(a,o,l,0,Math.PI*2),oe.fill()):oe.fillRect(a-l/2,o-l/2,l,l)}oe.globalAlpha=1,oe.textAlign="center",oe.font="italic 20px Bangers, Impact, sans-serif";for(const s of $s){const[a,o,c]=Fa(s.x,s.y,s.z);c&&(oe.globalAlpha=1-s.t/1.3,oe.lineWidth=4,oe.strokeStyle="rgba(0,0,0,.6)",oe.strokeText(s.text,a,o),oe.fillStyle=s.color,oe.fillText(s.text,a,o))}oe.globalAlpha=1;const i=m.player;if(m.state==="play"){for(const s of m.units){if(s.dead||s===i||s.hp>=s.max-.5&&!s.leader||Math.hypot(s.x-xt.position.x,s.z-xt.position.z)>34)continue;const[o,c,f]=Fa(s.x,s.y+(s.leader?3.2:2.8)+(s.mounted?1.2:0),s.z);if(!f)continue;const l=s.leader?40:26;if(oe.fillStyle="rgba(0,0,0,.55)",oe.fillRect(o-l/2,c,l,4),oe.fillStyle=he[Se(s.ti)].css,oe.fillRect(o-l/2,c,l*Math.max(0,s.hp/s.max),4),s.leader&&m.teams[s.ti]&&m.teams[s.ti].human&&n.nickFor){const h=n.nickFor(s.ti);h&&(oe.font='800 12px "Barlow Semi Condensed", sans-serif',oe.lineWidth=3,oe.strokeStyle="rgba(0,0,0,.6)",oe.strokeText(h,o,c-6),oe.fillStyle="#fff",oe.fillText(h,o,c-6))}m.mode==="dm"&&s.leader&&s.ti===m.bounty&&(oe.font="italic 16px Bangers, Impact, sans-serif",oe.lineWidth=3,oe.strokeStyle="rgba(0,0,0,.6)",oe.strokeText("BOUNTY",o,c-20),oe.fillStyle="#ffcf3a",oe.fillText("BOUNTY",o,c-20))}m.flag&&l1(),m.mode==="ctrl"&&c1(),m.mode==="dm"&&m.bounty===m.myTi&&i&&!i.dead&&performance.now()/500%1<.7&&(oe.font="italic 18px Bangers, Impact, sans-serif",oe.fillStyle="#ffcf3a",oe.fillText("BOUNTY ON YOU",e/2,118))}const r=n.joy;r&&r.active&&(oe.strokeStyle="rgba(255,255,255,.4)",oe.lineWidth=2,oe.beginPath(),oe.arc(r.ox,r.oy,50,0,Math.PI*2),oe.stroke(),oe.fillStyle="rgba(255,255,255,.55)",oe.beginPath(),oe.arc(r.ox+r.x*50,r.oy+r.y*50,22,0,Math.PI*2),oe.fill()),m.state==="play"&&(!i||i.dead)&&(oe.fillStyle="rgba(120,0,0,.18)",oe.fillRect(0,0,e,t)),h1()}function c1(){const n=m.ctrlPoints;if(n)for(const e of n){const[t,i,r]=Fa(e.x,3.4,e.z);if(!r)continue;const s=e.owner>=0?he[Se(e.owner)].css:"#c9c9c0";oe.font='800 20px "Barlow Semi Condensed", sans-serif',oe.lineWidth=4,oe.strokeStyle="rgba(0,0,0,.6)",oe.strokeText(e.letter,t,i),oe.fillStyle=s,oe.fillText(e.letter,t,i),e.capturer!=null&&e.capturer!==e.owner&&e.prog>0&&(oe.fillStyle="rgba(0,0,0,.5)",oe.fillRect(t-34/2,i+8,34,4),oe.fillStyle=he[Se(e.capturer)].css,oe.fillRect(t-34/2,i+8,34*Math.min(1,e.prog),4))}}function l1(){const n=Et.W,e=Et.H,t=m.flag,i=t.state==="carried"?t.carrier:null;if(i&&i===m.player)return;const r=i?i.x:t.x,s=i?i.z:t.z,a=(i?i.y:wt(r,s))+3.4,o=i?he[Se(i.ti)].css:"#ffffff";xr.set(r,a,s).project(xt);let c=(xr.x+1)/2*n,f=(1-xr.y)/2*e;const l=xr.z>1;l&&(c=n-c,f=e-40);const h=60,d=!l&&c>h&&c<n-h&&f>h&&f<e-h;if(oe.font="italic 15px Bangers, Impact, sans-serif",oe.lineWidth=3,oe.strokeStyle="rgba(0,0,0,.6)",d){const v=i?`${he[Se(i.ti)].name.toUpperCase()} CARRIER`:"BANNER";oe.strokeText(v,c,f),oe.fillStyle=o,oe.fillText(v,c,f);return}const u=n/2,_=e/2,x=Math.atan2(f-_,c-u),g=Hn(u+Math.cos(x)*n,h,n-h),p=Hn(_+Math.sin(x)*e,h+50,e-h-20);oe.save(),oe.translate(g,p),oe.rotate(x),oe.fillStyle=o,oe.strokeStyle="rgba(0,0,0,.5)",oe.lineWidth=2,oe.beginPath(),oe.moveTo(16,0),oe.lineTo(-8,-11),oe.lineTo(-8,11),oe.closePath(),oe.fill(),oe.stroke(),oe.restore()}let ks=null,Am=null;function f1(n,e){Am=m.layout,ks=ks||document.createElement("canvas"),ks.width=ks.height=n;const t=ks.getContext("2d");t.clearRect(0,0,n,n),t.save(),t.translate(n/2,n/2),t.fillStyle=m.map.id==="forest"?"rgba(47,90,52,.7)":"rgba(20,18,16,.55)";for(const i of m.layout.obstacles)if(!i.castle)if(i.box)t.save(),t.translate(i.x*e,i.z*e),t.rotate(-i.rot),t.fillRect(-i.hw*e,-i.hd*e,i.hw*2*e,i.hd*2*e),t.restore();else{const r=Math.max(1.2,i.r*e);t.fillRect(i.x*e-r,i.z*e-r,r*2,r*2)}m.layout.round&&(t.strokeStyle="rgba(20,18,16,.6)",t.lineWidth=3,t.beginPath(),t.arc(0,0,m.layout.round*e,0,Math.PI*2),t.stroke()),t.restore()}function h1(){if(m.state!=="play")return;const n=Em.width,e=n/190,t=n/2;rt.clearRect(0,0,n,n),rt.save(),rt.translate(t,t),rt.rotate(lt.yaw+Math.PI);const i=m.map.id;i==="river"&&(rt.fillStyle="rgba(63,127,166,.8)",rt.fillRect(-95*e,-5*e,190*e,10*e),rt.fillStyle="rgba(107,74,46,.9)",rt.fillRect(-34.5*e,-7*e,5*e,14*e),rt.fillRect(29.5*e,-7*e,5*e,14*e)),i==="frost"&&(rt.fillStyle="rgba(255,255,255,.2)",rt.beginPath(),rt.arc(0,0,24*e,0,Math.PI*2),rt.fill()),m.layout&&(Am!==m.layout&&f1(n,e),rt.drawImage(ks,-t,-t)),he.forEach((r,s)=>{rt.fillStyle=m.mode!=="conquest"||m.teams[s].alive?r.css:"#555",rt.fillRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18),!yf()&&!li(s,m.myTi)&&(rt.strokeStyle="#fff",rt.lineWidth=2,rt.strokeRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18))});for(const r of m.units){if(r.dead)continue;rt.fillStyle=he[Se(r.ti)].css;const s=r.leader?6:3.5;rt.fillRect(r.x*e-s/2,r.z*e-s/2,s,s)}if(m.flag){const r=m.flag.state==="carried"&&m.flag.carrier?m.flag.carrier:m.flag;rt.fillStyle="#fff",rt.strokeStyle="#000",rt.lineWidth=1.5,rt.beginPath(),rt.arc(r.x*e,r.z*e,5,0,Math.PI*2),rt.fill(),rt.stroke()}rt.restore(),rt.fillStyle="#fff",rt.beginPath(),rt.moveTo(t,t-8),rt.lineTo(t-5,t+5),rt.lineTo(t+5,t+5),rt.fill()}let ft=null,of=null,Co=null;const wl={};function vr(){if(ft){ft.state==="suspended"&&ft.resume();return}try{ft=new(window.AudioContext||window.webkitAudioContext),of=ft.createBuffer(1,ft.sampleRate*.6,ft.sampleRate);const n=of.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1}catch{ft=null}}function An(n,e){const t=performance.now();return wl[n]&&t-wl[n]<e?!1:(wl[n]=t,!0)}function ti(n,e,t,i,r="bandpass",s,a=1){if(!ft)return;const o=ft.currentTime,c=ft.createBufferSource(),f=ft.createBiquadFilter(),l=ft.createGain();c.buffer=of,f.type=r,f.frequency.setValueAtTime(e,o),s&&f.frequency.exponentialRampToValueAtTime(s,o+n),f.Q.value=t,l.gain.setValueAtTime(Math.max(.0011,i*a),o),l.gain.exponentialRampToValueAtTime(.001,o+n),c.connect(f).connect(l).connect(ft.destination),c.start(o),c.stop(o+n)}function fn(n,e,t,i="sine",r,s=0){if(!ft)return;const a=ft.currentTime+s,o=ft.createOscillator(),c=ft.createGain();o.type=i,o.frequency.setValueAtTime(n,a),r&&o.frequency.exponentialRampToValueAtTime(r,a+e),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),a+.02),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(c).connect(ft.destination),o.start(a),o.stop(a+e)}function Ci(n,e){const t=m.player;if(!t||n==null)return 1;const i=Math.hypot(n-t.x,e-t.z);return Hn(1.2-i/40,0,1)}function d1(){if(Co)return Co;const n=Math.floor(ft.sampleRate*4);Co=ft.createBuffer(1,n,ft.sampleRate);const e=Co.getChannelData(0);let t=0;for(let i=0;i<n;i++)t+=(Math.random()*2-1)*.05,t*=.992,e[i]=t;return Co}let Ba=null,Do=null;function u1(n){if(!ft)return;qf();const e=n==="colosseum",t=ft.createBufferSource();t.buffer=d1(),t.loop=!0;const i=ft.createBiquadFilter();i.type="bandpass",i.frequency.value=e?480:260,i.Q.value=.7;const r=ft.createGain();r.gain.setValueAtTime(0,ft.currentTime),t.connect(i).connect(r).connect(ft.destination);try{t.start()}catch{return}r.gain.linearRampToValueAtTime(e?.1:.04,ft.currentTime+1.4),Ba=t,Do=r}function qf(){if(Do)try{Do.gain.cancelScheduledValues(ft.currentTime),Do.gain.linearRampToValueAtTime(0,ft.currentTime+.6)}catch{}if(Ba){const n=Ba;try{n.stop(ft.currentTime+.65)}catch{}}Ba=null,Do=null}const Ct={swing(n,e){const t=Ci(n,e);t>.1&&An("sw",60)&&ti(.14,1800,1,.12,"bandpass",600,t)},clang(n,e){const t=Ci(n,e);t>.1&&An("cl",60)&&(ti(.08,3400,7,.22,"bandpass",0,t),fn(1500+Math.random()*600,.14,.07*t,"triangle"))},heavy(n,e){const t=Ci(n,e);t>.1&&An("hv",90)&&(fn(95,.22,.3*t,"sine",40),ti(.16,700,1,.5,"lowpass",150,t))},hit(n,e){const t=Ci(n,e);t>.1&&An("hi",50)&&(ti(.12,380,1,.4,"lowpass",0,t),fn(130,.1,.15*t,"triangle",60))},die(n,e){const t=Ci(n,e);t>.15&&An("di",140)&&fn(260,.35,.08*t,"sawtooth",110)},wall(n,e){const t=Ci(n,e);t>.1&&An("wa",120)&&ti(.2,500,1.2,.3,"lowpass",0,t)},bow(n,e){const t=Ci(n,e);t>.1&&An("bo",80)&&(fn(220,.12,.06*t,"triangle",140),ti(.25,2600,2,.06,"bandpass",900,t))},thud(n,e){const t=Ci(n,e);t>.1&&An("th",80)&&ti(.07,900,1.5,.15,"bandpass",0,t)},hoof(n,e){const t=Ci(n,e);t>.1&&An("ho",95)&&ti(.05,260,2,.25,"bandpass",0,t)},neigh(){fn(700,.45,.07,"sawtooth",1100),fn(900,.4,.05,"sawtooth",500,.2)},trample(n,e){const t=Ci(n,e);t>.1&&An("tr",90)&&ti(.2,200,1,.5,"lowpass",0,t)},coin(){An("co",50)&&(fn(1300,.08,.08,"square"),fn(1750,.12,.07,"square",0,.07))},horn(){fn(196,.9,.14,"sawtooth",200),fn(294,.9,.08,"sawtooth",296)},order(){fn(392,.12,.1,"square"),fn(523,.18,.1,"square",0,.1)},crumble(){ti(1.2,300,.7,.6,"lowpass",80)},capture(){fn(523,.2,.12,"square"),fn(659,.2,.12,"square",0,.18),fn(784,.4,.12,"square",0,.36)},cheer(){An("ch",400)&&(ti(1.4,700,.8,.16,"bandpass",1400),ti(1.7,500,.6,.12,"bandpass",900,.8))},uiClick(){An("ui",45)&&fn(700,.045,.045,"square",500)}};function Vs(n){try{navigator.vibrate&&navigator.vibrate(n)}catch{}}const ze={NET:null,myNick:""};try{ze.myNick=localStorage.getItem("fb-nick")||""}catch{}const _i=()=>!!(ze.NET&&ze.NET.role==="client"),$r=()=>!!(ze.NET&&ze.NET.role==="host"),lu=(n,e)=>{var t;try{return(t=localStorage.getItem(n))!=null?t:e}catch{return e}},on={faction:lu("rally-faction","roman"),color:+lu("rally-color","0")||0,save(){try{localStorage.setItem("rally-faction",this.faction),localStorage.setItem("rally-color",String(this.color))}catch{}}},at=n=>document.getElementById(n),Yf=n=>(n=Math.max(0,Math.floor(n)),Math.floor(n/60)+":"+String(n%60).padStart(2,"0"));function p1(){at("ptsTitle").textContent=ns[m.mode].title,at("tpRows").innerHTML=he.map((n,e)=>`<div class="tp${e===Se(m.myTi)?" me":""}" id="tp${e}"><span class="al">${yf()?"":Nu[m.ALLY[e]]}</span><div class="bar"><i style="background:${n.css}"></i></div><b>0</b></div>`).join(""),at("pips").innerHTML=he.map((n,e)=>`<span class="pip" id="pip${e}" style="background:${n.css}">${n.name[0]}</span>`).join(""),at("clockMax").textContent=Yf(ns[m.mode].time)}function m1(){["ovTitle","ovEnd","ovBrowse","ovLobby"].forEach(n=>at(n).hidden=!0),at("hudWrap").hidden=!1,at("joyhint").style.opacity=1}const g1={sword:'<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',spear:'<path d="M4 20 16.5 7.5"/><path d="M14 4.5 20.5 3.5 19.5 10z" fill="#fff"/><path d="M6.5 15.5l2 2"/>',jav:'<path d="M3 18 16 8"/><path d="M14 5.5 21 4 18.5 10.5z" fill="#fff"/><path d="M3 12h5M5 21.5h5"/>'};let fu=null,hu=null;const du={follow:'<path d="M6 21V4h11l-2.5 4 2.5 4H6"/>',hold:'<path d="M12 5v16M7 9h10M5 14a7 7 0 0 0 14 0"/><circle cx="12" cy="4" r="1.6"/>',charge:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',shieldwall:'<path d="M2.5 7h5.5v5c0 3-2.75 5-2.75 5S2.5 15 2.5 12zM9.25 7h5.5v5c0 3-2.75 5-2.75 5s-2.75-2-2.75-5zM16 7h5.5v5c0 3-2.75 5-2.75 5S16 15 16 12z"/>'};function Kf(n){he.forEach((d,u)=>{const _=at("tp"+u);if(!_)return;const x=xg(u),g=m.mode==="conquest"?100:m.mode==="dm"?Wu:m.mode==="ctrl"?yr.win:Bo;_.querySelector("i").style.transform=`scaleX(${Math.max(0,x)/g})`,_.querySelector("b").textContent=m.mode==="ctf"?`${x}/${Bo}`:Math.max(0,Math.ceil(x));const p=vg(u);_.classList.toggle("out",p);const v=at("pip"+u);v.classList.toggle("out",p),v.classList.toggle("hum",yg(u)),v.textContent=p?"✕":d.name[0]}),at("clockT").textContent=Yf(m.T);const e=m.player,t=m.teams[m.myTi];e&&(at("hpT").textContent=`${Math.max(0,Math.ceil(e.hp))}/${e.max}`,at("hpBar").style.transform=`scaleX(${Math.max(0,e.hp)/e.max})`,at("horseBarWrap").hidden=!e.mounted,at("horseBar").style.transform=`scaleX(${Math.min(1,Math.max(0,e.horseHp)/ea(m.myTi))})`);const i=Math.floor(t.gold);at("gold").textContent=i;const r=ho(m.myTi);at("squadN").textContent=r.length;const s=d=>r.filter(u=>u.kind===d).length;at("squadMix").textContent=`F${s("foot")} A${s("arch")}`,document.querySelectorAll("#tray button").forEach(d=>{d.setAttribute("aria-disabled",i<dn[d.dataset.kind].cost||r.length>=m.squadCap||!Ws(m.myTi)?"true":"false")}),document.querySelectorAll("#upTray button").forEach(d=>{const u=d.dataset.up,_=Ei.find(y=>y.id===u),x=_?_.cost.length:0,g=t.up?t.up[u]:0,p=Ho(m.myTi,u),v=u==="foot2"&&!(t.up&&t.up.foot1)||u==="arch2"&&!(t.up&&t.up.arch1);d.querySelector(".lv").dataset.pips="●".repeat(g)+"○".repeat(Math.max(0,x-g)),d.querySelector("em").textContent=p==null?"Max":v?"Locked":p+"g",d.setAttribute("aria-disabled",p==null||i<p||v?"true":"false")}),at("mnt").classList.toggle("on",!!(e&&e.mounted)),at("mntB").textContent=e&&!e.mounted&&!e.summon&&e.horseCd>0?Math.ceil(e.horseCd):e&&e.summon?"…":"",at("mnt").setAttribute("aria-label",e&&e.mounted?"Get off your horse":"Call your horse"),at("mnt").classList.toggle("dim",!e||!e.mounted&&(e.horseCd>0||e.carrying||e.dead)),at("blk").classList.toggle("dim",!e||e.mounted),at("atk").classList.toggle("dim",!e||e.carrying);const a=e&&e.weapon||"sword";fu!==a&&(fu=a,at("atkIc").innerHTML=g1[a]);const o=dp(m.myTi),c=e?Math.min(o,e.javAmmo|0):0;at("wpnS").textContent=a==="jav"?`Jav ${c}`:Gu[a],at("jmp").classList.toggle("dim",!e||e.mounted||e.carrying),at("vlyB").textContent=t.volleyCd>0?Math.ceil(t.volleyCd):"",at("vly").classList.toggle("dim",!e||e.dead||t.volleyCd>0);const f=t.order||"follow";hu!==f&&(hu=f,at("cmdIc").innerHTML=du[f]||du.follow,at("cmdBtn").setAttribute("aria-label","Squad order: "+(Ya[f]||Ya.follow))),at("cmdBtn").style.borderColor=f==="follow"?"var(--green)":f==="hold"?"var(--yellow)":f==="shieldwall"?"#7f9bff":"var(--red)";const l=ze.NET,h=at("netTag");if(l){h.hidden=!1;const d=m.teams.map((u,_)=>_).filter(u=>m.teams[u].active&&m.teams[u].human&&u!==m.myTi).map(u=>he[Se(u)].name+(u>=4?" (co-captain)":""));if(_i()){const u=performance.now()-(n||0)>2500;h.textContent=u?"Waiting for the host…":`Online · ${d.length?"with "+d.join(", "):"host"}`,h.classList.toggle("bad",u)}else h.textContent=`Hosting · ${d.length?d.join(", "):"no one else yet"}`}else h.hidden=!0}let uu;function lr(n,e,t){const i=at("banner");i.innerHTML="";const r=document.createElement("span");if(r.textContent=n,r.style.color=t||"#fff",i.appendChild(r),e){const s=document.createElement("small");s.textContent=e,i.appendChild(s)}i.classList.add("on"),clearTimeout(uu),uu=setTimeout(()=>i.classList.remove("on"),2e3)}const _1=n=>he.filter((e,t)=>m.ALLY[t]===n).map(e=>e.name).join(" & ");function x1(n,e){const t=m.myTi,i=o=>he[Se(o)].name,r=o=>he[Se(o)].css,s=o=>o===t,a=o=>!li(o,t);switch(n){case"start":return[ns[m.mode].name,m.mode==="conquest"?"Tear down every enemy castle":m.mode==="dm"?"Last side with tickets wins":m.mode==="ctrl"?"Hold the points to build your score":"Bring the banner home three times"];case"castleDown":return Se(e[0])===Se(t)?["Your castle has fallen!","No more recruits. Stay alive.","#e0352b"]:[`${i(e[0])} castle destroyed!`,e[1]===t?"Your doing":`by ${i(e[1])}`,r(e[0])];case"tickets0":return[`${i(e[0])} out of tickets!`,s(e[0])?"No more respawns":a(e[0])?"Protect your ally":"Finish them off",r(e[0])];case"bounty":return[`Bounty on ${i(e[0])}'s captain`,s(e[0])?"Everyone is coming for you":"Double gold for the kill",r(e[0])];case"bountyClaimed":return s(e[0])?["Bounty claimed!","+50 gold","#ffcf3a"]:null;case"capDown":return s(e[1])?[`${i(e[0])} captain down`,"",r(e[0])]:null;case"fell":return s(e[0])?["You fell!",e[1]?"Back in the fight in 5 seconds":"No way back. Your allies fight on.","#e0352b"]:null;case"respawn":return s(e[0])?["Back on your feet","Rally your squad"]:null;case"horseDown":return s(e[0])?["Your horse is down!",`New horse in ${ec(e[0])} seconds`,"#e0352b"]:null;case"rideNo":return s(e[0])?e[1]==="banner"?["Not with the banner","Carry it home on foot"]:e[1]==="rest"?["Your horse is resting",`Ready in ${e[2]} seconds`]:["Too hot to call your horse","Get clear of the fight first"]:null;case"flagTaken":return s(e[0])?["You have the banner!","Carry it home. Your squad will escort you.",r(e[0])]:[`${i(e[0])} has the banner!`,a(e[0])?"Escort them home":"Stop the carrier",r(e[0])];case"flagDropped":return s(e[0])?["Banner dropped!","Grab it again before it returns"]:[`${i(e[0])} dropped the banner`,"",r(e[0])];case"flagHome":return["The banner returns to the fort",""];case"capture":return[`${i(e[0])} captures the banner!`,`${lp(m.ALLY[Se(e[0])])} of ${Bo}`,r(e[0])];case"upgrade":{const o=Ei.find(c=>c.id===e[1]);return s(e[0])&&o?[`${o.name} level ${e[2]}`,o.desc,"#ffcf3a"]:null}case"left":return[`${i(e[0])}'s player left`,"The computer takes over their army",r(e[0])];case"pointCaptured":return s(e[0])?[`You captured Point ${e[1]}!`,"",r(e[0])]:[`${i(e[0])} captured Point ${e[1]}!`,a(e[0])?"Reinforce them":"Take it back",r(e[0])]}return null}function Ys(n,e){const t=m.myTi;if(n==="gold"){e[0]===t&&(gr(e[1],wt(e[1],e[2])+2.6,e[2],`+${e[3]} gold`,"#ffcf3a"),Ct.coin());return}const i=x1(n,e);i&&(lr(i[0],i[1],i[2]),n==="horseDown"&&e[0]===t&&(Vs(120),lt.shake=.5),n==="capture"&&(Ct.capture(),Ct.cheer(),li(e[0],t)||Vs([60,40,60])),n==="castleDown"&&(Ct.crumble(),Ct.cheer(),lt.shake=.6,e[0]===t&&Vs([100,60,100])),n==="flagTaken"&&e[0]===t&&(Ct.order(),Vs(50)))}const Cn=n=>document.getElementById(n),ut={joy:{active:!1,id:null,ox:0,oy:0,x:0,y:0},look:{id:null,lx:0,ly:0},keys:{},attackHeld:!1,blockHeld:!1,trayIsOpen:!1,upIsOpen:!1};let zt={attack(){},ride(){},order(){},recruit(){},upgrade(){},volley(){},jump(){},weapon(){}};function Xo(n){ut.trayIsOpen=n,Cn("tray").hidden=!n,Cn("recBtn").classList.toggle("open",n),n&&Ks(!1)}function Ks(n){ut.upIsOpen=n,Cn("upTray").hidden=!n,Cn("upBtn").classList.toggle("open",n),n&&Xo(!1)}function Cm(){ut.keys={},ut.attackHeld=ut.blockHeld=!1,ut.joy.active=!1,ut.joy.x=ut.joy.y=0,ut.look.id=null}function Rm(n){const{joy:e,keys:t}=ut;let i=e.x,r=e.y;t.KeyA&&(i-=1),t.KeyD&&(i+=1),t.KeyW&&(r-=1),t.KeyS&&(r+=1),t.ArrowLeft&&(lt.yaw+=n*2.4),t.ArrowRight&&(lt.yaw-=n*2.4),t.ArrowUp&&(r-=1),t.ArrowDown&&(r+=1);let s=Math.hypot(i,r);s>1&&(i/=s,r/=s,s=1);const a=lt.yaw,o=Math.sin(a),c=Math.cos(a),f=-Math.cos(a),l=Math.sin(a);return{wx:o*-r+f*i,wz:c*-r+l*i,mag:s,block:ut.blockHeld,attackHeld:ut.attackHeld,camYaw:a}}function v1(n){zt=n;const e=Cn("touch"),{joy:t,look:i}=ut;e.addEventListener("pointerdown",o=>{if(m.state==="play"){vr(),o.preventDefault(),Xo(!1),Ks(!1),o.clientX<Et.W*.42&&!t.active?(t.active=!0,t.id=o.pointerId,t.ox=o.clientX,t.oy=o.clientY,t.x=t.y=0,Cn("joyhint").style.opacity=0):i.id===null&&(i.id=o.pointerId,i.lx=o.clientX,i.ly=o.clientY);try{e.setPointerCapture(o.pointerId)}catch{}}}),e.addEventListener("pointermove",o=>{if(o.pointerId===t.id){const c=o.clientX-t.ox,f=o.clientY-t.oy,l=50,h=Math.hypot(c,f);h>l&&(t.ox+=c*(1-l/h)*.4,t.oy+=f*(1-l/h)*.4),t.x=Hn(c/l,-1,1),t.y=Hn(f/l,-1,1);const d=Math.hypot(t.x,t.y);d>1&&(t.x/=d,t.y/=d)}else o.pointerId===i.id&&(lt.yaw-=(o.clientX-i.lx)*.0075,lt.pitch=Hn(lt.pitch+(o.clientY-i.ly)*.004,.12,.75),i.lx=o.clientX,i.ly=o.clientY)});const r=o=>{o.pointerId===t.id&&(t.active=!1,t.id=null,t.x=t.y=0),o.pointerId===i.id&&(i.id=null)};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r);const s=(o,c,f)=>{o.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),vr();try{o.setPointerCapture(h.pointerId)}catch{}o.classList.add("held"),c()});const l=()=>{o.classList.remove("held"),f()};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l)},a=(o,c)=>{o.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),vr(),c()}),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),c())})};s(Cn("atk"),()=>{ut.attackHeld=!0,zt.attack()},()=>{ut.attackHeld=!1}),s(Cn("blk"),()=>{ut.blockHeld=!0},()=>{ut.blockHeld=!1}),a(Cn("mnt"),()=>zt.ride()),a(Cn("jmp"),()=>zt.jump()),a(Cn("wpn"),()=>zt.weapon()),a(Cn("vly"),()=>zt.volley()),a(Cn("cmdBtn"),()=>zt.order()),a(Cn("recBtn"),()=>Xo(!ut.trayIsOpen)),document.querySelectorAll("#tray button").forEach(o=>a(o,()=>zt.recruit(o.dataset.kind))),a(Cn("upBtn"),()=>Ks(!ut.upIsOpen)),document.querySelectorAll("#upTray button").forEach(o=>a(o,()=>zt.upgrade(o.dataset.up))),addEventListener("keydown",o=>{if(m.state!=="play"||o.target&&o.target.tagName==="INPUT"||(vr(),ut.keys[o.code]=!0,o.code==="Space"&&(o.preventDefault(),ut.attackHeld=!0,o.repeat||zt.attack()),(o.code==="ShiftLeft"||o.code==="ShiftRight")&&(ut.blockHeld=!0),o.repeat))return;o.code==="KeyQ"&&zt.order("follow"),o.code==="KeyF"&&zt.order("hold"),o.code==="KeyE"&&zt.order("charge"),o.code==="KeyT"&&zt.order("shieldwall"),o.code==="KeyV"&&zt.volley(),o.code==="KeyC"&&zt.jump(),o.code==="KeyR"&&zt.weapon(),o.code==="KeyU"&&Ks(!ut.upIsOpen);const c=["Digit3","Digit4","Digit5","Digit6","Digit7","Digit8"].indexOf(o.code);c>=0&&zt.upgrade(["foot1","foot2","arch1","arch2","aura","horse"][c]),o.code==="KeyH"&&zt.ride(),o.code==="Digit1"&&zt.recruit("foot"),o.code==="Digit2"&&zt.recruit("arch")}),addEventListener("keyup",o=>{ut.keys[o.code]=!1,o.code==="Space"&&(ut.attackHeld=!1),o.code.startsWith("Shift")&&(ut.blockHeld=!1)}),addEventListener("blur",Cm)}const vn=n=>document.getElementById(n),Jf="rally-tutorial-done",y1=()=>{try{return localStorage.getItem(Jf)==="1"}catch{return!0}},M1=()=>{try{localStorage.setItem(Jf,"1")}catch{}},Ds=matchMedia("(pointer: coarse)").matches,b1={conquest:"Now lead your army and tear down the enemy castles.",dm:"Now fight: the last side with tickets wins.",ctf:"Now grab the banner in the centre fort and carry it home.",ctrl:"Now take and hold the lettered points on the map."},ts=[{t:"Move",s:Ds?"Drag on the left of the screen":"W A S D",hi:"joyhint",start:(n,e)=>{e.x=n.x,e.z=n.z},done:(n,e)=>Math.hypot(n.x-e.x,n.z-e.z)>5},{t:"Attack three times, fast",s:Ds?"Tap the red button: the 3rd hit is a heavy blow":"Space ×3: the 3rd hit is a heavy blow",hi:"atk",done:n=>n.combo===2&&m.T-n.lastSwingT<1},{t:"Jump, then attack in mid-air",s:Ds?"A slam that hits everyone in front of you":"C, then Space: slams everyone in front of you",hi:"jmp",start:(n,e)=>{e.n=n.leaps||0},done:(n,e)=>(n.leaps||0)>e.n},{t:"Switch weapon",s:Ds?"Sword → Spear → Javelins":"R: Sword → Spear → Javelins",hi:"wpn",start:(n,e)=>{e.w=n.weapon},done:(n,e)=>n.weapon!==e.w},{t:"Give your squad an order",s:Ds?"The flag button: Follow, Hold, Charge, Shieldwall":"Q follow · F hold · E charge · T shieldwall",hi:"cmdBtn",start:(n,e)=>{e.o=m.teams[m.myTi].order},done:(n,e)=>m.teams[m.myTi].order!==e.o},{t:"Hire a soldier",s:Ds?"The recruit button, then Footman or Archer":"1 footman · 2 archer",hi:"recBtn",start:(n,e)=>{e.r=m.recruited},done:(n,e)=>m.recruited>e.r}];let Kn=-1,af={},Ro=null,No=0;function Ic(n){Ro&&Ro.classList.remove("coach-hi"),Ro=n?vn(n):null,Ro&&Ro.classList.add("coach-hi")}function S1(){const n=ts[Kn];vn("coachN").textContent=`${Kn+1} / ${ts.length}`,vn("coachT").textContent=n.t,vn("coachS").textContent=n.s,Ic(n.hi)}function Pm(n){if(Kn=n,af={},Kn>=ts.length){Lm(!0);return}const e=m.player;e&&ts[Kn].start&&ts[Kn].start(e,af),S1()}function Lm(n){M1(),Ic(null),n?(vn("coachN").textContent="Ready",vn("coachT").textContent="You know the basics",vn("coachS").textContent=b1[m.mode]||"",vn("coachSkip").hidden=!0,No=4.5,Kn=ts.length,Ct.order()):(vn("coach").hidden=!0,Kn=-1)}function T1(){vn("coach").hidden=!0,Ic(null),Kn=-1,No=0,!(y1()||m.role!=="solo")&&(vn("coach").hidden=!1,vn("coachSkip").hidden=!1,Pm(0))}function Im(){vn("coach").hidden=!0,Ic(null),Kn=-1}function E1(n){if(Kn<0)return;if(No>0){No-=n,No<=0&&Im();return}const e=m.player;!e||e.dead||m.state!=="play"||ts[Kn].done(e,af)&&(Ct.coin(),Pm(Kn+1))}function w1(){vn("tutAgain").addEventListener("click",()=>{try{localStorage.removeItem(Jf)}catch{}vn("tutAgain").textContent="The tutorial will show in your next battle"}),vn("coachSkip").addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),Lm(!1)})}const pu=(n,e)=>{var t;try{return(t=localStorage.getItem(n))!=null?t:e}catch{return e}},Dm=(n,e)=>{try{localStorage.setItem(n,String(e))}catch{}},an={xp:Math.max(0,+pu("rally-xp","0")||0),crest:Math.max(0,+pu("rally-crest","0")||0)};function $o(n){let e=0;return Ii.forEach((t,i)=>{n>=t.xp&&(e=i)}),e}const km=n=>n<=$o(an.xp);function Um(n){return!km(n)||!Kr[n]?!1:(an.crest=n,Dm("rally-crest",n),!0)}function mu(n=an.xp){const e=$o(n),t=Ii[e+1];return{rank:e,into:n-Ii[e].xp,span:t?t.xp-Ii[e].xp:0}}function A1({result:n,kills:e,diff:t}){var c;const i=an.xp,r=$o(i),s=hs.base+Math.min(e,hs.maxKills)*hs.perKill+(n==="win"?hs.win:n==="draw"?hs.draw:0),a=Math.round(s*((c=hs.diffMult[t])!=null?c:1));an.xp=i+a,Dm("rally-xp",an.xp);const o=$o(an.xp);return o>r&&Um(o),{gained:a,before:i,after:an.xp,rankUp:o>r,rank:o,unlocked:o>r?Kr.slice(r+1,o+1).map(f=>f.name):[]}}const gu=[3,2,1,0],C1=[1,0,3,2];function qo(n,e){const t=[0,1,2,3];if(n==="2v2"){const i=gu[e];for(let r=0;r<4;r++)t[r]=r===e||r===i?0:1}else if(n==="2v1v1"){const i=gu[e];let r=1;for(let s=0;s<4;s++)t[s]=s===e||s===i?0:r++}else if(n==="3v1"){const i=C1[e];for(let r=0;r<4;r++)t[r]=r===i?1:0}return t}function R1(n,e){const t=f=>f===e?`you (${he[f].name})`:he[f].name,i=[...new Set(n)].map(f=>he.map((l,h)=>h).filter(l=>n[l]===f));if(i.length===4)return`Every team for itself. You are ${he[e].name}.`;const r=f=>f.length<2?f.join(""):f.slice(0,-1).join(", ")+" and "+f[f.length-1],s=f=>r(f.map(t)),a=i.find(f=>f.includes(e)),o=i.filter(f=>f!==a),c=`${s(a)} against ${r(o.map(s))}`;return c[0].toUpperCase()+c.slice(1)+(o.length>1?", each on their own.":".")}function Zf(n,e){const t=is((e|0)+101),i=n.slice(),r=new Set(n.filter(Boolean));let s=Il.filter(a=>!r.has(a));for(let a=0;a<4;a++)i[a]||(s.length||(s=Il.slice()),i[a]=s.splice(Math.floor(t()*s.length),1)[0]);return i}const $={},co=n=>Math.round(n*10)/10,qr=n=>Math.round(n*100)/100,Nn=n=>Math.max(0,Math.round(n)).toString(36),zn=n=>parseInt(n,36),Ri=n=>Nn((n+100)*10),ni=n=>zn(n)/10-100,_u=n=>Nn((n%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*72%72),xu=n=>zn(n)/72*Math.PI*2,Dc=n=>{const e=n.peers().find(t=>t.sameTab);return e?e.peer:null};let Yo={onMatchStart(){},onAbort(){},onLobby(){}};function P1(n){Yo=Object.assign(Yo,n)}pt.on("msg",n=>{const e=ze.NET;$r()&&e.msgs&&(e.msgs.push([++e.msgN,n.k,...n.a]),e.msgs.length>8&&e.msgs.shift())});function L1(){const n=c=>Ei.reduce((f,l,h)=>f+c.up[l.id]*4**h,0),e=m.teams.map(c=>[Math.round(c.points*10),c.tickets,c.caps,Math.floor(c.gold),c.alive?1:0,Math.max(0,Math.ceil(c.leaderDeadT)),n(c)].join(",")).join(";"),t=[];for(const c of m.units){if(c.dead)continue;const f=zu.indexOf(c.kind)*8+c.ti,l=(c.swing>0?1:0)|(c.mounted?2:0)|(c.blockT>0||c.human&&c.blocking?4:0)|(c.carrying?8:0)|(c.stun>0?16:0)|(c.aim?32:0)|(c.shieldwall?64:0)|(c.weapon==="spear"?128:c.weapon==="jav"?256:c.weapon==="sword"?512:0),h=[Nn(c.id),f.toString(16),Ri(c.x),Ri(c.z),_u(c.face),Nn(Hn(c.hp/c.max,0,1)*35),Nn(l)];c.jy>.05&&h.push(Nn(c.jy*10)),t.push(h.join(","))}const i=m.arrows.filter(c=>!c.stuck&&!c.done).slice(-18).map(c=>[Nn(c.id),Ri(c.x0),Ri(c.z0),Nn(c.y0*10),Ri(c.x1),Ri(c.z1),Nn(c.y1*10+20),Nn(c.dur*100),Nn(c.peak*10),Nn(c.t*100),c.ti].join(",")),r=m.horses.filter(c=>c.state==="coming").map(c=>[Ri(c.x),Ri(c.z),_u(c.face),c.ti].join(",")),s=m.flag,a=s?[s.state==="home"?0:s.state==="dropped"?1:2,Ri(s.x),Ri(s.z),s.carrier?Nn(s.carrier.id):""].join(","):"",o=m.teams.map((c,f)=>{if(!c.human||f===m.myTi)return"";const l=c.leader,h=l.kick;return h.dirty&&(h.n++,h.dirty=!1,h.lvx=h.vx,h.lvz=h.vz,h.lst=h.st,h.vx=0,h.vz=0,h.st=0),[f,Nn(l.id),l.dead?1:0,Math.round(l.horseHp),Math.ceil(l.horseCd),l.summon?1:0,h.n,co(h.lvx||0),co(h.lvz||0),qr(h.lst||0),Math.round(l.hp),l.javAmmo|0].join(",")}).filter(Boolean).join(";");return[Math.round(m.T*10),e,t.join(";"),i.join(";"),r.join(";"),a,o,m.bounty].join("|")}function I1(){performance.now()-(ze.NET.lastSend||0)<80||kc()}function kc(){const n=ze.NET;if(!n)return;n.lastSend=performance.now();const e={role:"host",ph:m.state==="end"?"end":"play",seed:m.seed,mode:m.mode,map:m.map.id,diff:m.diff,al:m.ALLY.join(""),duo:m.duo.map(i=>i?1:0).join(""),seats:n.seats,nick:ze.myNick||"Host",fa:m.factions.map(i=>(Zs[i]||Zs.roman).code).join(""),cr:Array.from({length:8},(i,r)=>(m.crests&&m.crests[r])|0).join(""),n:++n.snapN,s:L1(),m:n.msgs};m.state==="end"&&m.endInfo&&(e.res=[m.endInfo.w,m.endInfo.why]);let t=JSON.stringify(e);for(;t.length>3900;){const i=e.s.split("|"),r=i[3].split(";");if(r.length&&r[0])r.shift(),i[3]=r.join(";"),e.s=i.join("|");else if(e.m.length)e.m=e.m.slice(1);else break;t=JSON.stringify(e)}n.lastSize=t.length,n.room.presence(e).catch(()=>{})}function D1(){const n=ze.NET,e=n.room.peers(),t=new Set(e.map(i=>i.peer));for(const[i,r]of Object.entries(n.seats))if(r!==m.myTi&&!t.has(i)&&m.teams[r].human){m.teams[r].human=!1;const s=m.teams[r].leader;s&&(s.human=!1,s.remote=!1,s.dmg=dn.captain.dmg,s.spd=dn.captain.spd),delete n.seats[i],pt.emit("msg",{k:"left",a:[r]})}for(const i of e){if(i.sameTab)continue;const r=n.seats[i.peer];if(r===void 0)continue;const s=i.presence||{};if(s.seed!==m.seed||s.ph!=="play")continue;const a=m.teams[r],o=a.leader;if(!a.human)continue;const c=n.inp[r]||(n.inp[r]={atk:0,ride:0,vly:0,rec:[0,0,0],up:[0,0,0,0,0]});if(o&&!o.dead&&Array.isArray(s.cap)&&s.cap[0]===o.id){o.x=+s.cap[1],o.z=+s.cap[2],o.face=+s.cap[3],o.vx=+s.cap[4],o.vz=+s.cap[5],o.blocking=!!s.blk,o.jy=Math.max(0,+s.cap[6]||0);const f=Us[s.cap[7]|0];f&&o.weapon!==f&&(o.weapon=f,a.weapon=f)}if(typeof s.atk=="number"&&s.atk>c.atk&&(o&&!o.dead&&(typeof s.face=="number"&&(o.face=s.face),Jr(o)),c.atk=s.atk),typeof s.ride=="number"&&s.ride>c.ride&&(o&&rp(o),c.ride=s.ride),typeof s.vly=="number"&&s.vly>c.vly&&(_p(r),c.vly=s.vly),Array.isArray(s.up))for(let f=0;f<Ei.length;f++)for(;(s.up[f]|0)>c.up[f];)c.up[f]++,Cf(r,Ei[f].id);if(s.ord&&s.ord!==a.order&&Lo.includes(s.ord)&&(a.order=s.ord,s.ord==="hold")){const f=Array.isArray(s.hold)?s.hold:[o.x,o.z,o.face];a.holdPt={x:+f[0],z:+f[1],face:+f[2],isFront:!0}}if(Array.isArray(s.rec))for(let f=0;f<3;f++)for(;(s.rec[f]|0)>c.rec[f];)c.rec[f]++,wf(r,Ou[f])}}function k1(n){m.role="client",m.mode=n.mode,m.map=yc[n.map],m.diff=n.diff,m.ALLY=n.al.split("").map(Number),m.seed=n.seed,m.factions=String(n.fa||"rrrr").split("").map(B0),m.crests=String(n.cr||"").split("").map(i=>Math.min(7,+i||0)),m.duo=String(n.duo||"0000").split("").map(i=>i==="1"),m.layout=bf(m.map.id,m.mode==="ctf",m.mode==="ctrl",m.seed),Sf(m.layout),m.units=[],m.horses=[],m.arrows=[],m.T=0,m.kills=0,m.recruited=0,m.bounty=-1,m.endInfo=null,m.awarded=!1;const e=[0,0,0,0,0,0,0,0];Object.values(n.seats||{}).forEach(i=>e[i]=1);const t=[1,1,1,1,...m.duo.map(i=>i?1:0)];m.teams=Ef(e,t),m.flag=m.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,m.ctrlPoints=m.mode==="ctrl"?fp(m.layout):null,Object.assign($,{byId:new Map,lastN:-1,lastMsgN:n.m&&n.m.length?n.m[n.m.length-1][0]:0,meId:null,meInit:!1,kickN:0,localCd:0,lastSnapAt:performance.now(),inp:{atk:0,ride:0,vly:0,rec:[0,0,0],up:[0,0,0,0,0],ord:"follow",hold:null,face:0},sendAt:0,arrowIds:new Set,coming:[],leaving:[],horseKey:0,riderKeys:new Map,hudT:0}),m.player=null,lt.yaw=Math.atan2(-he[Se(m.myTi)].pos[0],-he[Se(m.myTi)].pos[1]),lt.pitch=fm,m.state="play",Yo.onMatchStart(),Ct.horn(),Ys("start",[]),Nm(n)}function U1(n,e,t,i,r){const s=e==="captain"&&m.teams[t].human,a={id:n,kind:e,ti:t,leader:e==="captain",human:s,x:i,z:r,y:wt(i,r),tx:i,tz:r,tface:0,face:0,vx:0,vz:0,vy:0,hp:dn[e].hp,max:dn[e].hp,r:dn[e].r,swing:0,stun:0,blockT:0,dead:!1,deadT:0,mounted:!1,carrying:!1,aim:!1,spd:s?6.3:dn[e].spd,horseHp:ea(t),horseCd:0,summon:!1,shieldwall:!1,blocking:!1,lastHit:-9,jy:0,jyT:0,jvy:0,jumpCd:0,weapon:s&&t===m.myTi?m.teams[t].weapon||"sword":void 0,javAmmo:fo.jav.ammo,javRegen:0,combo:0,lastSwingT:-9};return m.units.push(a),$.byId.set(n,a),a}function N1(n){n.dead||(n.dead=!0,n.deadT=0,n.vy=ae(3,6),n.fallDir=Math.random()<.5?1:-1,n.vx*=.5,n.vz*=.5,pt.emit("splat",{x:n.x,z:n.z,s:ae(1,1.5),ti:n.ti}),Ct.die(n.x,n.z),$.byId.delete(n.id))}function Nm(n){if(n.n===$.lastN)return;$.lastN=n.n,$.lastSnapAt=performance.now();const e=(n.s||"").split("|");if(e.length<8)return;const t=m.myTi;m.T=+e[0]/10,e[1].split(";").forEach((o,c)=>{const f=o.split(",").map(Number),l=m.teams[c];l&&(l.points=f[0]/10,l.tickets=f[1],l.caps=f[2],(c!==t||performance.now()-($.goldLocalAt||0)>700)&&(l.gold=f[3]),l.alive=!!f[4],l.leaderDeadT=f[5],f.length>6&&(c!==t||performance.now()-($.upLocalAt||0)>700)&&Ei.forEach((h,d)=>{l.up[h.id]=Math.floor(f[6]/4**d)%4}))}),m.bounty=+e[7];const i=e[6]?e[6].split(";").map(o=>o.split(",")).find(o=>+o[0]===t):null;let r=null;i&&(r=zn(i[1]),$.meInfo={dead:+i[2],horseHp:+i[3],horseCd:+i[4],summon:+i[5],kn:+i[6],kvx:+i[7],kvz:+i[8],kst:+i[9],hp:+i[10],jav:i[11]===void 0?null:+i[11]});const s=new Set;if(e[2])for(const o of e[2].split(";")){const c=o.split(","),f=zn(c[0]),l=parseInt(c[1],16),h=zu[l>>3],d=l&7,u=ni(c[2]),_=ni(c[3]),x=xu(c[4]),g=zn(c[5]),p=zn(c[6]);s.add(f);let v=$.byId.get(f);v||(v=U1(f,h,d,u,_),v.face=x);const y=v.hp;if(v.hp=g/35*v.max,v.hp<y-.5&&f!==r)if(pt.emit("spark",{x:v.x,y:v.y+1.2,z:v.z,c:p&4?"#fff3b0":he[Se(v.ti)].css,n:5}),p&4)Ct.clang(v.x,v.z);else{Ct.hit(v.x,v.z);const b=m.player;b&&performance.now()-($.lastAtkAt||0)<700&&Math.hypot(v.x-b.x,v.z-b.z)<5&&(pt.emit("hitstop",.05),lt.shake=Math.max(lt.shake,.15)),Math.random()<.35&&pt.emit("splat",{x:v.x+ae(-.4,.4),z:v.z+ae(-.4,.4),s:ae(.6,1.1),ti:v.ti})}p&1&&v.swing<=0&&f!==r&&(v.swing=.38,Ct.swing(v.x,v.z)),v.mounted=!!(p&2),v.carrying=!!(p&8),v.shieldwall=!!(p&64),f!==r&&(v.blockT=p&4?.2:0,v.stun=p&16?.1:0,v.aim=!!(p&32),h==="captain"&&(v.weapon=p&128?"spear":p&256?"jav":p&512?"sword":void 0),v.jyT=c[7]?zn(c[7])/10:0),f!==r?(v.tx=u,v.tz=_,v.tface=x,Math.hypot(v.x-u,v.z-_)>8&&(v.x=u,v.z=_)):(!$.meInit||$.meId!==f)&&(v.x=u,v.z=_,v.face=x)}for(const o of[...$.byId.values()])s.has(o.id)||N1(o);if(r!=null&&$.byId.get(r)){const o=$.byId.get(r);$.meId!==r&&($.meId=r,$.meInit=!0,m.player=o,lt.yaw=o.face,$.kickN=$.meInfo?$.meInfo.kn:0),m.player=o,o.horseHp=$.meInfo.horseHp,o.horseCd=$.meInfo.horseCd,o.summon=!!$.meInfo.summon,o.hp=$.meInfo.hp,$.meInfo.jav!=null&&performance.now()-($.javLocalAt||0)>900&&(o.javAmmo=$.meInfo.jav),$.meInfo.kn!==$.kickN&&($.kickN=$.meInfo.kn,o.vx+=$.meInfo.kvx,o.vz+=$.meInfo.kvz,o.stun=Math.max(o.stun,$.meInfo.kst),($.meInfo.kvx||$.meInfo.kvz)&&(lt.shake=.35,Vs(30),pt.emit("spark",{x:o.x,y:o.y+1.2,z:o.z,c:he[Se(o.ti)].css,n:5}),Ct.hit(o.x,o.z)))}if(m.player&&m.player.dead&&(m.player=null),e[3])for(const o of e[3].split(";")){const c=o.split(","),f=zn(c[0]);if($.arrowIds.has(f))continue;$.arrowIds.add(f);const l=If({id:f,x0:ni(c[1]),z0:ni(c[2]),y0:zn(c[3])/10,x1:ni(c[4]),z1:ni(c[5]),y1:(zn(c[6])-20)/10,dur:zn(c[7])/100,peak:zn(c[8])/10,ti:+c[10],t:zn(c[9])/100});m.arrows.push(l),Ct.bow(l.x0,l.z0)}$.arrowIds.size>400&&($.arrowIds=new Set([...$.arrowIds].slice(-200)));const a=e[4]?e[4].split(";").map(o=>o.split(",")):[];if($.coming.length=Math.min($.coming.length,a.length),a.forEach((o,c)=>{let f=$.coming[c];f||(f={key:2e5+ ++$.horseKey,ti:+o[3],x:ni(o[0]),z:ni(o[1]),face:0,spd:14,state:"coming",t:0},$.coming.push(f)),f.tx=ni(o[0]),f.tz=ni(o[1]),f.face=xu(o[2])}),m.flag&&e[5]){const o=e[5].split(","),c=m.flag;c.state=["home","dropped","carried"][+o[0]],c.x=ni(o[1]),c.z=ni(o[2]),c.carrier=o[3]&&$.byId.get(zn(o[3]))||null,c.carrier&&(c.carrier.carrying=!0)}for(const o of n.m||[])o[0]>$.lastMsgN&&($.lastMsgN=o[0],Ys(o[1],o.slice(2)))}function z1(n){const e=ze.NET,t=e.room.peers().find(s=>s.peer===e.hostPeer);if(t){e.hostGoneAt=0;const s=t.presence||{};if(s.ph==="lobby")return Yo.onLobby(),!1;s.seed===m.seed&&(s.ph==="play"||s.ph==="end")&&Nm(s),s.ph==="end"&&m.state==="play"&&Array.isArray(s.res)&&pt.emit("hostEnd",s.res)}else if(e.hostGoneAt||(e.hostGoneAt=performance.now()),performance.now()-e.hostGoneAt>1500)return Yo.onAbort("The host left the battle."),!1;if(m.state!=="play"&&m.state!=="end")return!1;$.localCd-=n,Tf();const i=m.player;if(i&&!i.dead&&m.state==="play"){i.stun-=n,vp(i,Rm(n),n);for(const s of m.units){if(s===i||s.dead)continue;const a=i.x-s.x,o=i.z-s.z,c=i.r+s.r;if(Math.abs(a)>c||Math.abs(o)>c)continue;const f=Math.hypot(a,o)||.01;f<c&&(i.x+=a/f*(c-f)*.7,i.z+=o/f*(c-f)*.7)}xp(i,n,i.z),i.r=i.mounted?.95:dn.captain.r,Hl(i,n),$.atkBuf>0&&($.atkBuf-=n),(ut.attackHeld||$.atkBuf>0)&&$.localCd<=0&&Gr.attack()}const r=Math.min(1,n*10);for(const s of m.units){if(s.dead){Uf(s,n);continue}if(s===i)continue;const a=s.x,o=s.z;s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r,s.face=Qs(s.face,s.tface,n*12),s.vx=(s.x-a)/Math.max(n,.001),s.vz=(s.z-o)/Math.max(n,.001),s.jy+=((s.jyT||0)-s.jy)*Math.min(1,n*14),s.y=wt(s.x,s.z)+s.jy,s.swing>0&&(s.swing-=n)}i&&i.swing>0&&(i.swing-=n),m.units=m.units.filter(s=>!(s.dead&&s.deadT>12));for(const s of m.units){const a=$.riderKeys.get(s);s.mounted&&!s.dead&&!a&&$.riderKeys.set(s,1e5+ ++$.horseKey),(!s.mounted||s.dead)&&a&&($.leaving.push({key:a,ti:s.ti,x:s.x,z:s.z,face:s.face,spd:10,state:"leaving",t:0}),$.riderKeys.delete(s))}for(const s of $.coming)s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r;for(const s of $.leaving)s.t+=n,s.x+=Math.sin(s.face)*10*n,s.z+=Math.cos(s.face)*10*n;if($.leaving=$.leaving.filter(s=>s.t<3),Mp(n,!1),performance.now()-$.sendAt>66&&m.state==="play"){$.sendAt=performance.now();const s={role:"player",nick:ze.myNick||"Captain",ph:"play",seed:m.seed,atk:$.inp.atk,ride:$.inp.ride,vly:$.inp.vly,rec:$.inp.rec,up:$.inp.up,ord:$.inp.ord,hold:$.inp.hold,face:$.inp.face,blk:ut.blockHeld?1:0};i&&!i.dead&&(s.cap=[i.id,qr(i.x),qr(i.z),qr(i.face),co(i.vx),co(i.vz),qr(i.jy||0),Math.max(0,Us.indexOf(i.weapon||"sword"))]),e.room.presence(s).catch(()=>{})}return!0}function O1(){const n=[...$.coming,...$.leaving];for(const[e,t]of $.riderKeys)e.dead||n.push({key:t,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:Math.hypot(e.vx,e.vz),state:"ridden",t:0});return n}function F1(n){const e=fo;if(n.mounted){n.weapon==="jav"&&n.javAmmo>=1?(n.javAmmo--,$.javLocalAt=performance.now(),$.localCd=e.jav.cd):$.localCd=.8;return}if(up(n)){$.localCd=e.leap.cd,n.jvy=Math.min(n.jvy,-9),n.vx+=Math.sin(n.face)*3,n.vz+=Math.cos(n.face)*3,n.swingKind=2;return}if(n.weapon==="jav"){if(n.javAmmo>=1){const r=gp(n);n.face=Math.atan2(r.x-n.x,r.z-n.z),n.javAmmo--,$.javLocalAt=performance.now(),$.localCd=e.jav.cd,n.swingKind=4;return}n.weapon="sword",m.teams[m.myTi].weapon="sword",gr(n.x,n.y+3.2,n.z,"Out of javelins","#fff"),pt.emit("hud")}const t=n.weapon==="spear",i=hp(n,Cg(n));if(i){const r=Math.atan2(i.x-n.x,i.z-n.z),s=Math.hypot(i.x-n.x,i.z-n.z);n.face=r,s>n.r+i.r+1.3+(t?e.spear.reachB:0)-.2&&(n.vx+=Math.sin(r)*4,n.vz+=Math.cos(r)*4)}if(t)$.localCd=e.spear.cd,n.swingKind=3,n.combo=0;else{const r=performance.now()/1e3-n.lastSwingT<e.sword.window?(n.combo+1)%3:0;n.combo=r,n.swingKind=r,$.localCd=r===2?e.sword.finisherCd:e.sword.cd}n.lastSwingT=performance.now()/1e3}const B1=n=>Ya[n]||Ya.follow,Gr={attack(){const n=m.player;if(!(!n||n.dead||m.state!=="play")){if(n.carrying){An("carryhint",1500)&&gr(n.x,n.y+3.2,n.z,"Hands full: carry it home","#fff");return}if(_i()){if($.localCd>0||n.stun>0){$.atkBuf=.4;return}$.atkBuf=0,F1(n),n.swing=.38,Ct.swing(n.x,n.z),$.inp.atk++,$.inp.face=qr(n.face),$.lastAtkAt=performance.now();return}Jr(n)}},jump(){const n=m.player;m.state!=="play"||!n||n.dead||pp(n)},weapon(n){const e=m.player;if(m.state!=="play"||!e||e.dead)return;const t=Rg(e,n);t&&(Ct.order(),gr(e.x,e.y+3.2,e.z,t==="jav"?`Javelins ${e.javAmmo|0}`:Gu[t],"#fff"),pt.emit("hud"))},ride(){const n=m.player;if(!(m.state!=="play"||!n||n.dead)){if(_i()){if(!n.mounted){if(n.carrying){Ys("rideNo",[m.myTi,"banner"]);return}if(n.horseCd>0){Ys("rideNo",[m.myTi,"rest",Math.ceil(n.horseCd)]);return}Ct.neigh()}$.inp.ride++;return}rp(n)}},volley(){const n=m.player;if(!(m.state!=="play"||!n||n.dead)){if(_i()){$.inp.vly++;return}_p(m.myTi)}},order(n){const e=m.player;if(m.state!=="play"||!e||e.dead)return;const t=m.teams[m.myTi].order||"follow",i=Lo.includes(n)?n:Lo[(Lo.indexOf(t)+1)%Lo.length];i===t&&i!=="hold"||(_i()?(m.teams[m.myTi].order=i,$.inp.ord=i,i==="hold"&&($.inp.hold=[co(e.x),co(e.z),qr(e.face)])):fg(m.myTi,i),Ct.order(),gr(e.x,e.y+3.2,e.z,B1(i),"#fff"),pt.emit("hud"))},upgrade(n){if(m.state!=="play")return;const e=m.teams[m.myTi],t=Ho(m.myTi,n),i=Ei.find(r=>r.id===n);if(i){if(t==null){lr(`${i.name} is maxed`,"Try another upgrade");return}if(e.gold<t){lr("Not enough gold",`${i.name} costs ${t} gold`,"#ffcf3a");return}_i()?($.inp.up[Ei.indexOf(i)]++,e.gold-=t,e.up[n]++,$.goldLocalAt=$.upLocalAt=performance.now(),Ct.coin(),Ys("upgrade",[m.myTi,n,e.up[n]])):Cf(m.myTi,n),pt.emit("hud")}},recruit(n){if(m.state!=="play")return;const e=dn[n],t=m.teams[m.myTi];if(!Ws(m.myTi)){lr("No recruits",m.mode==="dm"?"Your team is out of tickets":"You need a castle to recruit","#e0352b");return}if(ho(m.myTi).length>=m.squadCap){lr("Squad full",`${m.squadCap} soldiers is the limit`);return}if(t.gold<e.cost){lr("Not enough gold",`A ${e.name.toLowerCase()} costs ${e.cost} gold`,"#ffcf3a");return}_i()?($.inp.rec[Ou.indexOf(n)]++,t.gold-=e.cost,$.goldLocalAt=performance.now(),m.recruited++,Ct.coin()):wf(m.myTi,n);const i=m.player;i&&gr(i.x,i.y+3,i.z,`${e.name} on the way`,"#fff")}};class H1{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return G1(e).buffer}}function G1(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function zm(n){return new V1(n).unpack()}function Om(n){const e=new W1,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class V1{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,a;for(;i<e;)s=t[i],s<160?(a=s,i++):(s^192)<32?(a=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(a=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(a=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(a);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,a=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*a}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class W1{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),a=2**32,o=t<<31|i+1023<<20|s/a&1048575,c=s%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const a=t[s];if(e.hasOwnProperty(a)){this.pack(a);const o=this.pack(e[a]);if(o instanceof Promise)return o.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new H1,this._textEncoder=new TextEncoder}}let Fm=!0,Bm=!0;function ko(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function as(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Qf("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(o,c){if(o!==e)return s.apply(this,arguments);const f=l=>{const h=t(l);h&&(c.handleEvent?c.handleEvent(h):c(h))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,f),s.apply(this,[o,f])};const a=r.removeEventListener;r.removeEventListener=function(o,c){if(o!==e||!this._eventMap||!this._eventMap[e])return a.apply(this,arguments);if(!this._eventMap[e].has(c))return a.apply(this,arguments);const f=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,f])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(o){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),o&&this.addEventListener(e,this["_on"+e]=o)},enumerable:!0,configurable:!0})}function j1(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Fm=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function X1(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Bm=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Qf(){if(typeof window=="object"){if(Fm)return;typeof console!="undefined"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function eh(n,e){Bm&&console.warn(n+" is deprecated, please use "+e+" instead.")}function $1(n){const e={browser:null,version:null};if(typeof n=="undefined"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(ko(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(ko(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(ko(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=ko(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function vu(n){return Object.prototype.toString.call(n)==="[object Object]"}function Hm(n){return vu(n)?Object.keys(n).reduce(function(e,t){const i=vu(n[t]),r=i?Hm(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function cf(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?cf(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{cf(n,n.get(r),t)})}))}function yu(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(a=>{a.type==="track"&&a.trackIdentifier===e.id&&s.push(a)}),s.forEach(a=>{n.forEach(o=>{o.type===i&&o.trackId===a.id&&cf(n,o,r)})}),r}const Mu=Qf;function Gm(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;const c={};return Object.keys(o).forEach(f=>{if(f==="require"||f==="advanced"||f==="mediaSource")return;const l=typeof o[f]=="object"?o[f]:{ideal:o[f]};l.exact!==void 0&&typeof l.exact=="number"&&(l.min=l.max=l.exact);const h=function(d,u){return d?d+u.charAt(0).toUpperCase()+u.slice(1):u==="deviceId"?"sourceId":u};if(l.ideal!==void 0){c.optional=c.optional||[];let d={};typeof l.ideal=="number"?(d[h("min",f)]=l.ideal,c.optional.push(d),d={},d[h("max",f)]=l.ideal,c.optional.push(d)):(d[h("",f)]=l.ideal,c.optional.push(d))}l.exact!==void 0&&typeof l.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[h("",f)]=l.exact):["min","max"].forEach(d=>{l[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[h(d,f)]=l[d])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},r=function(o,c){if(e.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){const f=function(l,h,d){h in l&&!(d in l)&&(l[d]=l[h],delete l[h])};o=JSON.parse(JSON.stringify(o)),f(o.audio,"autoGainControl","googAutoGainControl"),f(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=i(o.audio)}if(o&&typeof o.video=="object"){let f=o.video.facingMode;f=f&&(typeof f=="object"?f:{ideal:f});const l=e.version<66;if(f&&(f.exact==="user"||f.exact==="environment"||f.ideal==="user"||f.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!l)){delete o.video.facingMode;let h;if(f.exact==="environment"||f.ideal==="environment"?h=["back","rear"]:(f.exact==="user"||f.ideal==="user")&&(h=["front"]),h)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(_=>_.kind==="videoinput");let u=d.find(_=>h.some(x=>_.label.toLowerCase().includes(x)));return!u&&d.length&&h.includes("back")&&(u=d[d.length-1]),u&&(o.video.deviceId=f.exact?{exact:u.deviceId}:{ideal:u.deviceId}),o.video=i(o.video),Mu("chrome: "+JSON.stringify(o)),c(o)})}o.video=i(o.video)}return Mu("chrome: "+JSON.stringify(o)),c(o)},s=function(o){return e.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,f){r(o,l=>{t.webkitGetUserMedia(l,c,h=>{f&&f(s(h))})})};if(t.getUserMedia=a.bind(t),t.mediaDevices.getUserMedia){const o=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,f=>o(f).then(l=>{if(f.audio&&!l.getAudioTracks().length||f.video&&!l.getVideoTracks().length)throw l.getTracks().forEach(h=>{h.stop()}),new DOMException("","NotFoundError");return l},l=>Promise.reject(s(l))))}}}function Vm(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Wm(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):a={track:s.track};const o=new Event("track");o.track=s.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)}),r.stream.getTracks().forEach(s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.id):a={track:s};const o=new Event("track");o.track=s,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else as(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function jm(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,c){let f=r.apply(this,arguments);return f||(f=e(this,o),this._senders.push(f)),f};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){s.apply(this,arguments);const c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(a=>{this._senders.push(e(this,a))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(a=>{const o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Xm(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const a=i.apply(this,[]);return a.forEach(o=>o._pc=this),a});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const a=r.apply(this,arguments);return a._pc=this,a}),n.RTCRtpSender.prototype.getStats=function(){const a=this;return this._pc.getStats().then(o=>yu(o,a.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(a=>a._pc=this),s}),as(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(a=>yu(a,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,a,o;return this.getSenders().forEach(c=>{c.track===r&&(s?o=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(a?o=!0:a=c),c.track===r)),o||s&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function $m(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(f=>{if(this.getSenders().find(h=>h.track===f))throw new DOMException("Track already exists.","InvalidAccessError")});const o=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(f=>o.indexOf(f)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{const c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),r.apply(this,arguments)}}function qm(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return $m(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const l=t.apply(this);return this._reverseStreams=this._reverseStreams||{},l.map(h=>this._reverseStreams[h.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(l){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},l.getTracks().forEach(h=>{if(this.getSenders().find(u=>u.track===h))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[l.id]){const h=new n.MediaStream(l.getTracks());this._streams[l.id]=h,this._reverseStreams[h.id]=l,l=h}i.apply(this,[l])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(l){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[l.id]||l]),delete this._reverseStreams[this._streams[l.id]?this._streams[l.id].id:l.id],delete this._streams[l.id]},n.RTCPeerConnection.prototype.addTrack=function(l,h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(x=>x===l))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(x=>x.track===l))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const _=this._streams[h.id];if(_)_.addTrack(l),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const x=new n.MediaStream([l]);this._streams[h.id]=x,this._reverseStreams[x.id]=h,this.addStream(x)}return this.getSenders().find(x=>x.track===l)};function s(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const u=f._reverseStreams[d],_=f._streams[u.id];h=h.replace(new RegExp(_.id,"g"),u.id)}),new RTCSessionDescription({type:l.type,sdp:h})}function a(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const u=f._reverseStreams[d],_=f._streams[u.id];h=h.replace(new RegExp(u.id,"g"),_.id)}),new RTCSessionDescription({type:l.type,sdp:h})}["createOffer","createAnswer"].forEach(function(f){const l=n.RTCPeerConnection.prototype[f],h={[f](){const d=arguments;return arguments.length&&typeof arguments[0]=="function"?l.apply(this,[_=>{const x=s(this,_);d[0].apply(null,[x])},_=>{d[1]&&d[1].apply(null,_)},arguments[2]]):l.apply(this,arguments).then(_=>s(this,_))}};n.RTCPeerConnection.prototype[f]=h[f]});const o=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const f=c.get.apply(this);return f.type===""?f:s(this,f)}}),n.RTCPeerConnection.prototype.removeTrack=function(l){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!l._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(l._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(u=>{this._streams[u].getTracks().find(x=>l.track===x)&&(d=this._streams[u])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(l.track),this.dispatchEvent(new Event("negotiationneeded")))}}function lf(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function Ym(n,e){e.version>102||as(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const bu=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Ym,shimAddTrackRemoveTrack:qm,shimAddTrackRemoveTrackWithNative:$m,shimGetSendersWithDtmf:jm,shimGetUserMedia:Gm,shimMediaStream:Vm,shimOnTrack:Wm,shimPeerConnection:lf,shimSenderReceiverGetStats:Xm},Symbol.toStringTag,{value:"Module"}));function Km(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,a){eh("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,a)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a.audio,"autoGainControl","mozAutoGainControl"),r(a.audio,"noiseSuppression","mozNoiseSuppression")),s(a)},i&&i.prototype.getSettings){const a=i.prototype.getSettings;i.prototype.getSettings=function(){const o=a.apply(this,arguments);return r(o,"mozAutoGainControl","autoGainControl"),r(o,"mozNoiseSuppression","noiseSuppression"),o}}if(i&&i.prototype.applyConstraints){const a=i.prototype.applyConstraints;i.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o,"autoGainControl","mozAutoGainControl"),r(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function q1(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Jm(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function ff(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function Zm(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!a)try{c.forEach(f=>{f.type=t[f.type]||f.type})}catch(f){if(f.name!=="TypeError")throw f;c.forEach((l,h)=>{c.set(h,Object.assign({},l,{type:t[l.type]||l.type}))})}return c}).then(a,o)}}function Qm(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function e0(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),as(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function t0(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){eh("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function n0(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function i0(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const a=t.apply(this,arguments);if(s){const{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,o.sendEncodings=r,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function r0(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function s0(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function o0(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const Su=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:i0,shimCreateAnswer:o0,shimCreateOffer:s0,shimGetDisplayMedia:q1,shimGetParameters:r0,shimGetStats:Zm,shimGetUserMedia:Km,shimOnTrack:Jm,shimPeerConnection:ff,shimRTCDataChannel:n0,shimReceiverGetStats:e0,shimRemoveStream:t0,shimSenderGetStats:Qm},Symbol.toStringTag,{value:"Module"}));function a0(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function c0(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const a=new Event("addstream");a.stream=s,i.dispatchEvent(a)})}),e.apply(i,arguments)}}}function l0(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,a=e.addIceCandidate;e.createOffer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d},e.createAnswer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d};let o=function(c,f,l){const h=r.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h};e.setLocalDescription=o,o=function(c,f,l){const h=s.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.setRemoteDescription=o,o=function(c,f,l){const h=a.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.addIceCandidate=o}function f0(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(h0(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}.bind(e))}function h0(n){return n&&n.video!==void 0?Object.assign({},n,{video:Hm(n.video)}):n}function d0(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let a=0;a<i.iceServers.length;a++){let o=i.iceServers[a];o.urls===void 0&&o.url?(eh("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,s.push(o)):s.push(i.iceServers[a])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function u0(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function p0(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio!="undefined"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo!="undefined"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(a=>a.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function m0(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Tu=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:m0,shimCallbacksAPI:l0,shimConstraints:h0,shimCreateOfferLegacy:p0,shimGetUserMedia:f0,shimLocalStreamsAPI:a0,shimRTCIceServerUrls:d0,shimRemoteStreamsAPI:c0,shimTrackEventTransceiver:u0},Symbol.toStringTag,{value:"Module"}));function Y1(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var g0={exports:{}};(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
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
`),i.headerExtensions&&i.headerExtensions.forEach(a=>{r+=e.writeExtmap(a)}),r},e.parseRtpEncodingParameters=function(t){const i=[],r=e.parseRtpParameters(t),s=r.fecMechanisms.indexOf("RED")!==-1,a=r.fecMechanisms.indexOf("ULPFEC")!==-1,o=e.matchPrefix(t,"a=ssrc:").map(d=>e.parseSsrcMedia(d)).filter(d=>d.attribute==="cname"),c=o.length>0&&o[0].ssrc;let f;const l=e.matchPrefix(t,"a=ssrc-group:FID").map(d=>d.substring(17).split(" ").map(_=>parseInt(_,10)));l.length>0&&l[0].length>1&&l[0][0]===c&&(f=l[0][1]),r.codecs.forEach(d=>{if(d.name.toUpperCase()==="RTX"&&d.parameters.apt){let u={ssrc:c,codecPayloadType:parseInt(d.parameters.apt,10)};c&&f&&(u.rtx={ssrc:f}),i.push(u),s&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:c,mechanism:a?"red+ulpfec":"red"},i.push(u))}}),i.length===0&&c&&i.push({ssrc:c});let h=e.matchPrefix(t,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-50*40*8:h=void 0,i.forEach(d=>{d.maxBitrate=h})),i},e.parseRtcpParameters=function(t){const i={},r=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const a=e.matchPrefix(t,"a=rtcp-mux");return i.mux=a.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
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
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(g0);var _0=g0.exports;const Js=Y1(_0),K1=F0({__proto__:null,default:Js},[_0]);function Ha(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=Js.parseCandidate(i.candidate);for(const a in s)a in r||Object.defineProperty(r,a,{value:s[a]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,as(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function hf(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||as(n,"icecandidate",e=>{if(e.candidate){const t=Js.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Ga(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp}});const t=function(o){if(!o||!o.sdp)return!1;const c=Js.splitSections(o.sdp);return c.shift(),c.some(f=>{const l=Js.parseMLine(f);return l&&l.kind==="application"&&l.protocol.indexOf("SCTP")!==-1})},i=function(o){const c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const f=parseInt(c[1],10);return f!==f?-1:f},r=function(o){let c=65536;return e.browser==="firefox"&&(e.version<57?o===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(o,c){let f=65536;e.browser==="firefox"&&e.version===57&&(f=65535);const l=Js.matchPrefix(o.sdp,"a=max-message-size:");return l.length>0?f=parseInt(l[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(f=2147483637),f},a=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),f=r(c),l=s(arguments[0],c);let h;f===0&&l===0?h=Number.POSITIVE_INFINITY:f===0||l===0?h=Math.max(f,l):h=Math.min(f,l);const d={};Object.defineProperty(d,"maxMessageSize",{get(){return h}}),this._sctp=d}return a.apply(this,arguments)}}function Va(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const a=r.send;r.send=function(){const c=arguments[0],f=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&f>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return a.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},as(n,"datachannel",r=>(t(r.channel,r.target),r))}function df(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const a=new Event("connectionstatechange",r);s.dispatchEvent(a)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function uf(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function Wa(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function ja(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>t.apply(this,[a]))})}const J1=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:uf,shimAddIceCandidateNullOrEmpty:Wa,shimConnectionState:df,shimMaxMessageSize:Ga,shimParameterlessSetLocalDescription:ja,shimRTCIceCandidate:Ha,shimRTCIceCandidateRelayProtocol:hf,shimSendThrowTypeError:Va},Symbol.toStringTag,{value:"Module"}));function Z1({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Qf,i=$1(n),r={browserDetails:i,commonShim:J1,extractVersion:ko,disableLog:j1,disableWarnings:X1,sdp:K1};switch(i.browser){case"chrome":if(!bu||!lf||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=bu,Wa(n,i),ja(n),Gm(n,i),Vm(n),lf(n,i),Wm(n,i),qm(n,i),jm(n),Xm(n,i),Ym(n,i),Ha(n),hf(n),df(n),Ga(n,i),Va(n,i),uf(n,i);break;case"firefox":if(!Su||!ff||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=Su,Wa(n,i),ja(n),Km(n,i),ff(n,i),Zm(n,i),Jm(n),t0(n),Qm(n),e0(n),n0(n),i0(n,i),r0(n,i),s0(n,i),o0(n,i),Ha(n),df(n),Ga(n,i),Va(n,i);break;case"safari":if(!Tu||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Tu,Wa(n,i),ja(n),d0(n),p0(n),l0(n),a0(n),c0(n),u0(n),f0(n),m0(n),Ha(n),hf(n),Ga(n,i),Va(n,i),uf(n,i);break;default:t("Unsupported browser!");break}return r}const Eu=Z1({window:typeof window=="undefined"?void 0:window});function cs(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class x0{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,a=0;for(;a<i;){const o=Math.min(i,a+this.chunkedMTU),c=e.slice(a,o),f={__peerData:this._dataCount,n:s,data:c,total:r};t.push(f),a=o,s++}return this._dataCount++,t}}}function Q1(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const Al=Eu.default||Eu,Po=new class{isWebRTCSupported(){return typeof RTCPeerConnection!="undefined"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Al.browserDetails.browser}getVersion(){return Al.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=Al.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator!="undefined"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},eT=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),v0=()=>Math.random().toString(36).slice(2),wu={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class tT extends x0{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=wu,this.browser=Po.getBrowser(),this.browserVersion=Po.getVersion(),this.pack=Om,this.unpack=zm,this.supports=function(){const t={browser:Po.isBrowserSupported(),webRTC:Po.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(wu),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!Po.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t}(),this.validateId=eT,this.randomToken=v0}}const On=new tT,nT="PeerJS: ";var Au;(function(n){n[n.Disabled=0]="Disabled",n[n.Errors=1]="Errors",n[n.Warnings=2]="Warnings",n[n.All=3]="All"})(Au||(Au={}));class iT{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[nT,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var pe=new iT,th={},rT=Object.prototype.hasOwnProperty,Dn="~";function Ko(){}Object.create&&(Ko.prototype=Object.create(null),new Ko().__proto__||(Dn=!1));function sT(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function y0(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new sT(t,i||n,r),a=Dn?Dn+e:e;return n._events[a]?n._events[a].fn?n._events[a]=[n._events[a],s]:n._events[a].push(s):(n._events[a]=s,n._eventsCount++),n}function Xa(n,e){--n._eventsCount===0?n._events=new Ko:delete n._events[e]}function bn(){this._events=new Ko,this._eventsCount=0}bn.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)rT.call(t,i)&&e.push(Dn?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};bn.prototype.listeners=function(e){var t=Dn?Dn+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,a=new Array(s);r<s;r++)a[r]=i[r].fn;return a};bn.prototype.listenerCount=function(e){var t=Dn?Dn+e:e,i=this._events[t];return i?i.fn?1:i.length:0};bn.prototype.emit=function(e,t,i,r,s,a){var o=Dn?Dn+e:e;if(!this._events[o])return!1;var c=this._events[o],f=arguments.length,l,h;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,a),!0}for(h=1,l=new Array(f-1);h<f;h++)l[h-1]=arguments[h];c.fn.apply(c.context,l)}else{var d=c.length,u;for(h=0;h<d;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),f){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,t);break;case 3:c[h].fn.call(c[h].context,t,i);break;case 4:c[h].fn.call(c[h].context,t,i,r);break;default:if(!l)for(u=1,l=new Array(f-1);u<f;u++)l[u-1]=arguments[u];c[h].fn.apply(c[h].context,l)}}return!0};bn.prototype.on=function(e,t,i){return y0(this,e,t,i,!1)};bn.prototype.once=function(e,t,i){return y0(this,e,t,i,!0)};bn.prototype.removeListener=function(e,t,i,r){var s=Dn?Dn+e:e;if(!this._events[s])return this;if(!t)return Xa(this,s),this;var a=this._events[s];if(a.fn)a.fn===t&&(!r||a.once)&&(!i||a.context===i)&&Xa(this,s);else{for(var o=0,c=[],f=a.length;o<f;o++)(a[o].fn!==t||r&&!a[o].once||i&&a[o].context!==i)&&c.push(a[o]);c.length?this._events[s]=c.length===1?c[0]:c:Xa(this,s)}return this};bn.prototype.removeAllListeners=function(e){var t;return e?(t=Dn?Dn+e:e,this._events[t]&&Xa(this,t)):(this._events=new Ko,this._eventsCount=0),this};bn.prototype.off=bn.prototype.removeListener;bn.prototype.addListener=bn.prototype.on;bn.prefixed=Dn;bn.EventEmitter=bn;th=bn;var ls={};cs(ls,"ConnectionType",()=>ki);cs(ls,"PeerErrorType",()=>Ut);cs(ls,"BaseConnectionErrorType",()=>Jo);cs(ls,"DataConnectionErrorType",()=>Zo);cs(ls,"SerializationType",()=>lo);cs(ls,"SocketEventType",()=>Di);cs(ls,"ServerMessageType",()=>sn);var ki;(function(n){n.Data="data",n.Media="media"})(ki||(ki={}));var Ut;(function(n){n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc"})(Ut||(Ut={}));var Jo;(function(n){n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed"})(Jo||(Jo={}));var Zo;(function(n){n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big"})(Zo||(Zo={}));var lo;(function(n){n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw"})(lo||(lo={}));var Di;(function(n){n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close"})(Di||(Di={}));var sn;(function(n){n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE"})(sn||(sn={}));var nh={};nh=JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');class oT extends th.EventEmitter{constructor(e,t,i,r,s,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];const o=e?"wss://":"ws://";this._baseUrl=o+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+nh.version),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),pe.log("Server message received:",s)}catch{pe.log("Invalid server message",r.data);return}this.emit(Di.Message,s)},this._socket.onclose=r=>{this._disconnected||(pe.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(Di.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){pe.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:sn.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Di.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class M0{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===ki.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){pe.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;pe.log("Listening for ICE candidates."),e.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(pe.log(`Received ICE candidates for ${t}:`,a.candidate),s.socket.send({type:sn.Candidate,payload:{candidate:a.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Jo.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Jo.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},pe.log("Listening for data channel"),e.ondatachannel=a=>{pe.log("Received data channel");const o=a.channel;s.getConnection(t,i)._initializeDataChannel(o)},pe.log("Listening for remote stream"),e.ontrack=a=>{pe.log("Received remote stream");const o=a.streams[0],c=s.getConnection(t,i);if(c.type===ki.Media){const f=c;this._addStreamToMediaConnection(o,f)}}}cleanup(){pe.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===ki.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:sn.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Ut.WebRTC,r),pe.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(Ut.WebRTC,i),pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:sn.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(Ut.WebRTC,r),pe.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(Ut.WebRTC,i),pe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;pe.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(a){r.emitError(Ut.WebRTC,a),pe.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(e){pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Ut.WebRTC,t),pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class b0 extends th.EventEmitter{emitError(e,t){pe.error("Error:",t),this.emit("error",new aT(`${e}`,t))}}class aT extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class S0 extends b0{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var mf;const zo=class zo extends S0{get type(){return ki.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||zo.ID_PREFIX+On.randomToken(),this._negotiator=new M0(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case sn.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case sn.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};mf=new WeakMap,vo(zo,mf,zo.ID_PREFIX="mc_");let uc=zo;class cT{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:a}=this._options,o=new URL(`${t}://${i}:${r}${s}${a}/${e}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",nh.version),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==On.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===On.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var gf,_f;const Vr=class Vr extends S0{get type(){return ki.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||Vr.ID_PREFIX+v0(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new M0(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Zo.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case sn.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case sn.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};gf=new WeakMap,_f=new WeakMap,vo(Vr,gf,Vr.ID_PREFIX="dc_"),vo(Vr,_f,Vr.MAX_BUFFERED_AMOUNT=8388608);let pc=Vr;class ih extends pc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>pc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Cl extends ih{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new x0,this.serialization=lo.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=zm(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=Q1(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=Om(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class lT extends ih{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=lo.None}}class fT extends ih{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=On.chunkedMTU){this.emitError(Zo.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=lo.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var xf;const Oo=class Oo extends b0{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:lT,json:fT,binary:Cl,"binary-utf8":Cl,default:Cl},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:On.CLOUD_HOST,port:On.CLOUD_PORT,path:"/",key:Oo.DEFAULT_KEY,token:On.randomToken(),config:On.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==On.CLOUD_HOST?this._options.secure=On.isSecure():this._options.host==On.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&pe.setLogFunction(this._options.logFunction),pe.logLevel=this._options.debug||0,this._api=new cT(t),this._socket=this._createServerConnection(),!On.supports.audioVideo&&!On.supports.data){this._delayedAbort(Ut.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!On.validateId(i)){this._delayedAbort(Ut.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(Ut.ServerError,r))}_createServerConnection(){const e=new oT(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Di.Message,t=>{this._handleMessage(t)}),e.on(Di.Error,t=>{this._abort(Ut.SocketError,t)}),e.on(Di.Disconnected,()=>{this.disconnected||(this.emitError(Ut.Network,"Lost connection to server."),this.disconnect())}),e.on(Di.Close,()=>{this.disconnected||this._abort(Ut.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case sn.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case sn.Error:this._abort(Ut.ServerError,i.msg);break;case sn.IdTaken:this._abort(Ut.UnavailableID,`ID "${this.id}" is taken`);break;case sn.InvalidKey:this._abort(Ut.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case sn.Leave:pe.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case sn.Expire:this.emitError(Ut.PeerUnavailable,`Could not connect to peer ${r}`);break;case sn.Offer:{const s=i.connectionId;let a=this.getConnection(r,s);if(a&&(a.close(),pe.warn(`Offer received for existing Connection ID:${s}`)),i.type===ki.Media){const c=new uc(r,this,{connectionId:s,_payload:i,metadata:i.metadata});a=c,this._addConnection(r,a),this.emit("call",c)}else if(i.type===ki.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});a=c,this._addConnection(r,a),this.emit("connection",c)}else{pe.warn(`Received malformed connection type:${i.type}`);return}const o=this._getMessages(s);for(const c of o)a.handleMessage(c);break}default:{if(!i){pe.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,a=this.getConnection(r,s);a&&a.peerConnection?a.handleMessage(e):s?this._storeMessage(s,e):pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ut.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ut.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new uc(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Ut.ServerError,t))}};xf=new WeakMap,vo(Oo,xf,Oo.DEFAULT_KEY="peerjs");let mc=Oo;const Rl="fourbanners-v1-",Cu="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function hT(){let n="";for(let e=0;e<4;e++)n+=Cu[Math.floor(Math.random()*Cu.length)];return n}const dT=()=>typeof window.RTCPeerConnection=="function"&&/^https?:$/.test(location.protocol),Ru=()=>Object.assign({debug:0},window.__PEER_OPTS||{});function Pu(n,e){return new Promise((t,i)=>{if(typeof window.RTCPeerConnection!="function"){i({type:"no-webrtc"});return}const r=new Map,s=[],a=new Map,o=new Map;let c={},f=null,l=null,h=!1,d=0,u=null;const _=(z,P)=>{h||(h=!0,clearTimeout(x),z?t(P):i(P))},x=setTimeout(()=>{try{L.destroy()}catch{}_(!1,{type:"timeout"})},12e3),g=z=>z===f||performance.now()-(o.get(z)||0)<6e3,p=()=>[...r.entries()].filter(([z])=>g(z)).map(([z,P])=>({peer:z,sameTab:z===f,isMe:z===f,presence:P}));let v=null;const y=()=>{v=null;const z=p();for(const P of s)try{P({peers:z})}catch(k){console.error(k)}},b=()=>{v||(v=setTimeout(y,16))},C=z=>({role:z.role,nick:z.nick,want:z.want,ph:z.ph,fac:z.fac,cr:z.cr});function w(){d=performance.now(),u=null;const z={};for(const[P,k]of r)z[P]=P===f?k:C(k);for(const P of a.values())if(P.open)try{P.send({t:"all",all:z})}catch{}}function R(){if(u)return;const z=Math.max(0,250-(performance.now()-d));u=setTimeout(w,z)}const L=e?new mc(Rl+n,Ru()):new mc(Ru());L.on("open",z=>{if(f=z,r.set(z,c),e){_(!0,W);return}l=L.connect(Rl+n,{reliable:!0,serialization:"json"}),l.on("open",()=>{try{l.send({t:"p",pr:c})}catch{}_(!0,W)}),l.on("data",P=>{if(!(!P||typeof P!="object")){if(o.set(Rl+n,performance.now()),P.t==="full"){_(!1,{type:"full"});return}if(P.t==="all"&&P.all&&typeof P.all=="object"){for(const k of[...r.keys()])k!==f&&!(k in P.all)&&r.delete(k);for(const[k,V]of Object.entries(P.all))k!==f&&V&&typeof V=="object"&&(r.set(k,V),o.set(k,performance.now()));b()}else P.t==="h"&&typeof P.id=="string"&&P.pr&&typeof P.pr=="object"&&(r.set(P.id,P.pr),b())}}),l.on("close",()=>{for(const P of[...r.keys()])P!==f&&r.delete(P);b()}),l.on("error",()=>{})}),L.on("connection",z=>{if(!e){z.close();return}if(a.size>=7){z.on("open",()=>{try{z.send({t:"full"})}catch{}setTimeout(()=>z.close(),400)});return}a.set(z.peer,z),o.set(z.peer,performance.now()),z.on("open",()=>{w();try{z.send({t:"h",id:f,pr:c})}catch{}}),z.on("data",k=>{if(!k||k.t!=="p"||!k.pr||typeof k.pr!="object")return;o.set(z.peer,performance.now());const V=r.get(z.peer);r.set(z.peer,k.pr),b(),(!V||V.nick!==k.pr.nick||V.want!==k.pr.want||V.ph!==k.pr.ph||V.role!==k.pr.role||V.fac!==k.pr.fac)&&R()});const P=()=>{a.has(z.peer)&&(a.delete(z.peer),r.delete(z.peer),b(),R())};z.on("close",P),z.on("error",P)}),L.on("error",z=>{if(!h){try{L.destroy()}catch{}_(!1,z);return}if(z&&z.type==="peer-unavailable"&&!e){for(const P of[...r.keys()])P!==f&&r.delete(P);b()}}),L.on("disconnected",()=>{if(!L.destroyed)try{L.reconnect()}catch{}});let M=0;const S=()=>{if(M=performance.now(),e){for(const z of a.values())if(z.open)try{z.send({t:"h",id:f,pr:c})}catch{}}else if(l&&l.open)try{l.send({t:"p",pr:c})}catch{}},N=setInterval(()=>{if(L.destroyed){clearInterval(N);return}if(performance.now()-M>1500&&S(),e){for(const[z,P]of[...a])if(performance.now()-(o.get(z)||performance.now())>8e3){try{P.close()}catch{}a.delete(z),r.delete(z),b(),R()}}b()},1e3),W={name:n,presence:async z=>{for(const P in z)z[P]===null?delete c[P]:c[P]=z[P];r.set(f,c),S()},peers:p,onPeers:z=>(s.push(z),setTimeout(()=>z({peers:p()}),0),()=>{const P=s.indexOf(z);P>=0&&s.splice(P,1)}),leave:async()=>{clearInterval(N);try{L.destroy()}catch{}}}})}const uT=new Set(["unavailable-id","peer-unavailable","full","no-webrtc","timeout"]);async function Lu(n,e){try{return await Pu(n,e)}catch(t){if(t&&uT.has(t.type))throw t;return await new Promise(i=>setTimeout(i,800)),Pu(n,e)}}const Ee=n=>document.getElementById(n);let Yr={startMatch(){},seedDemo(){},preset:()=>"ffa",resetSolo(){}};const gc=()=>{var n;return{role:"player",nick:ze.myNick||"Captain",ph:"lobby",want:(n=ze.NET.want)!=null?n:-1,fac:on.faction,cr:an.crest}};let sr=!1;function T0(){["ovTitle","ovLobby","ovEnd"].forEach(e=>Ee(e).hidden=!0),Ee("ovBrowse").hidden=!1,Ee("nick").value=ze.myNick,Ee("netNote").textContent="";const n=dT();Ee("hostBtn").disabled=!n,Ee("joinBtn").disabled=!n,n||(Ee("netNote").textContent=/^https?:$/.test(location.protocol)?"Multiplayer could not start in this browser. Open the game's website link in Safari or Chrome.":"Multiplayer only works when the game is opened from its website.")}function Ua(){ze.myNick=(Ee("nick").value||"").trim().slice(0,16);try{localStorage.setItem("fb-nick",ze.myNick)}catch{}}function _c(){const n=ze.NET;m.state!=="lobby"&&Yr.seedDemo(),n.lobbySig=null,m.state="lobby",["ovTitle","ovBrowse","ovEnd"].forEach(e=>Ee(e).hidden=!0),Ee("hudWrap").hidden=!0,Ee("ovLobby").hidden=!1,n.role==="host"?Er():n.room.presence(gc()).catch(()=>{}),xc()}function Er(){const n=ze.NET;if(!n||n.role!=="host")return;const e=n.room.peers(),t=new Set(e.map(a=>a.peer)),i=Dc(n.room);if(i&&n.me!==i){const a=n.seats[n.me];delete n.seats[n.me],n.me=i,n.seats[i]=a===void 0?0:a}for(const a of Object.keys(n.seats))!t.has(a)&&a!==n.me&&delete n.seats[a];const r=n.lobby;for(const a of Object.keys(n.seats))n.seats[a]>=4&&!r.duo[Se(n.seats[a])]&&delete n.seats[a];const s=()=>Object.values(n.seats);for(const a of e){if(a.sameTab)continue;const o=a.presence||{};if(o.role!=="player")continue;const c=o.want;if(typeof c=="number"&&c>=0&&c<8&&(c<4||r.duo[Se(c)])){if(n.seats[a.peer]===c)continue;s().includes(c)||(n.seats[a.peer]=c)}else c===-1&&n.seats[a.peer]!==void 0&&delete n.seats[a.peer]}n.room.presence({role:"host",ph:"lobby",nick:ze.myNick||"Host",fac:on.faction,mode:r.mode,map:r.map,diff:r.diff,al:r.al.join(""),duo:r.duo.map(a=>a?1:0).join(""),seats:n.seats,s:null,m:null,res:null}).catch(()=>{}),xc()}function E0(){const n=ze.NET;if(n.role==="host")return{mode:n.lobby.mode,map:n.lobby.map,diff:n.lobby.diff,al:n.lobby.al,duo:n.lobby.duo,seats:n.seats,hostNick:ze.myNick||"Host"};const e=n.room.peers().find(i=>i.presence&&i.presence.role==="host");if(!e)return null;n.hostPeer=e.peer;const t=e.presence;return{mode:t.mode,map:t.map,diff:t.diff,al:String(t.al||"0123").split("").map(Number),duo:String(t.duo||"0000").split("").map(i=>i==="1"),seats:t.seats||{},hostNick:t.nick,ph:t.ph,hostP:e}}function xc(){const n=ze.NET;if(!n||Ee("ovLobby").hidden)return;const e=E0(),t=n.role==="host";if(!e){Ee("lobbyStatus").textContent="Connecting to the host…",Ee("codeTxt").textContent=n.name||"",Ee("seats").innerHTML="",n.lobbySig=null;return}Ee("lobbyTitle").textContent=t?"Your battle":`${String(e.hostNick||"Host").slice(0,16)}'s battle`,Ee("codeTxt").textContent=n.name||"",Ee("copyBtn").hidden=!t;const i=n.room.peers(),r=p=>{const v=i.find(y=>y.peer===p);return v&&v.presence&&v.presence.nick?String(v.presence.nick).slice(0,16):"Player"},s=p=>{const v=i.find(b=>b.peer===p),y=v&&v.presence&&v.presence.fac;return Zs[y]?Zs[y].name:""},a=Dc(n.room),o=p=>Object.keys(e.seats).find(v=>e.seats[v]===p),c=JSON.stringify([a,e.mode,e.map,e.diff,e.al,e.duo,e.seats,e.hostNick,i.map(p=>[p.peer,p.presence&&p.presence.nick,p.presence&&p.presence.role,p.presence&&p.presence.fac])]);if(c===n.lobbySig)return;n.lobbySig=c;const f=Ee("seats");f.innerHTML="";const l=(p,v,y)=>{const b=o(p),C=document.createElement("button");C.type="button",C.className="seat"+(y?" slot2":"")+(b===a?" mine":"")+(b&&b!==a?" taken":""),C.style.background=v.css;const w=document.createElement("b");w.textContent=y||v.name;const R=document.createElement("span");if(R.textContent=b?(b===a?"You":r(b))+(i.find(L=>L.peer===b&&L.presence&&L.presence.role==="host")?" · host":""):"Computer",C.append(w,R),b&&s(b)){const L=document.createElement("small");L.textContent=s(b),C.appendChild(L)}return C.addEventListener("click",()=>{b&&b!==a||(t?b||(n.seats[a]=p,Er()):(n.want=b===a?-1:p,n.room.presence(gc()).catch(()=>{})))}),C};he.forEach((p,v)=>{const y=document.createElement("div");y.className="seatcol";const b=l(v,p,null),C=document.createElement("span");C.className="alchip",C.setAttribute("role","button"),C.textContent="Team "+Nu[e.al[v]],t&&(C.tabIndex=0,C.addEventListener("click",R=>{R.stopPropagation(),n.lobby.al[v]=(n.lobby.al[v]+1)%4,Er()})),b.appendChild(C);const w=document.createElement("span");w.className="duotog"+(e.duo[v]?" on":""),w.setAttribute("role","button"),w.textContent="Duo",t?(w.tabIndex=0,w.addEventListener("click",R=>{R.stopPropagation(),n.lobby.duo[v]=!n.lobby.duo[v],Er()})):w.setAttribute("disabled",""),b.appendChild(w),y.appendChild(b),e.duo[v]&&y.appendChild(l(v+4,p,"Co-captain")),f.appendChild(y)});const h=(p,v,y)=>{const b=Ee(p);b.classList.toggle("ro",y),b.querySelectorAll("button").forEach(C=>C.setAttribute("aria-pressed",String(C.dataset.v===String(v))))},d=t?n.seats[n.me]:e.seats[n.hostPeer],u=p=>Object.keys(H0).find(v=>qo(v,Se(d!=null?d:0)).join("")===p.join(""))||"";h("lobbyFaction",on.faction,!1),h("lobbyTeams",u(e.al),!t),h("lobbyMode",e.mode,!t),h("lobbyMap",e.map,!t),h("lobbyDiff",e.diff,!t),Ee("startBtn").hidden=!t;const _=new Set(e.al).size,x=Object.keys(e.seats).length;Ee("startBtn").disabled=_<2;const g=e.seats[a];Ee("lobbyStatus").textContent=t?_<2?"Everyone is on one team. Split the teams to start.":x<2?"Share the code. Friends open this page, tap Play with friends and enter it.":`${x} players · computer plays the rest`:g===void 0?"Tap a color to take it":`You are ${he[Se(g)].name}${$0(g)?"'s co-captain":""}. Waiting for the host to start…`}async function Uc(n){qf();const e=ze.NET;if(ze.NET=null,e){try{e.unsub&&e.unsub()}catch{}try{await e.room.leave()}catch{}}Yr.resetSolo(),m.state="title",Ee("hudWrap").hidden=!0,["ovLobby","ovEnd","ovBrowse"].forEach(t=>Ee(t).hidden=!0),Yr.seedDemo(),n?(T0(),Ee("netNote").textContent=n):Ee("ovTitle").hidden=!1}function pT(){const n=ze.NET;if(!n||n.role!=="client")return;const e=E0();if(!e){n.hostGoneAt||(n.hostGoneAt=performance.now()),performance.now()-n.hostGoneAt>6e3&&Uc("That battle is no longer open.");return}if(n.hostGoneAt=0,e.ph==="play"&&e.hostP.presence.seed){const t=e.seats[Dc(n.room)];if(t===void 0){n.toldLate||(n.toldLate=!0,Ee("lobbyStatus").textContent="The battle started without you. Wait here for the next one.");return}n.toldLate=!1,m.state==="lobby"&&(m.myTi=t,k1(e.hostP.presence))}}function mT(n){Yr=Object.assign(Yr,n),Ee("nick").addEventListener("change",Ua),Ee("browseBack").addEventListener("click",()=>{Ua(),Ee("ovBrowse").hidden=!0,Ee("ovTitle").hidden=!1}),Ee("mpBtn").addEventListener("click",()=>{vr(),T0()}),Ee("codeIn").addEventListener("input",t=>{t.target.value=t.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")}),Ee("codeIn").addEventListener("keydown",t=>{t.key==="Enter"&&Ee("joinBtn").click()}),Ee("copyBtn").addEventListener("click",()=>{const t=ze.NET&&ze.NET.name;if(!t)return;const i=()=>{Ee("copyBtn").textContent="Copied",setTimeout(()=>Ee("copyBtn").textContent="Copy",1500)};try{navigator.clipboard.writeText(t).then(i,()=>{})}catch{}}),Ee("hostBtn").addEventListener("click",async()=>{if(sr)return;sr=!0,Ua(),Ee("netNote").textContent="Opening a battle…";let t=null,i=null;for(let a=0;a<4&&!t;a++){i=hT();try{t=await Lu(i,!0)}catch(o){if(!(o&&o.type==="unavailable-id")){Ee("netNote").textContent="Could not reach the multiplayer server. Check your connection and try again.",sr=!1;return}}}if(sr=!1,!t){Ee("netNote").textContent="Could not open a battle. Try again.";return}Ee("netNote").textContent="";const r=ze.NET={role:"host",room:t,name:i,seats:{},msgs:[],msgN:0,snapN:0,inp:{},lobby:{mode:m.mode,map:m.map.id,diff:m.diff,al:qo(Yr.preset(),on.color),duo:[!1,!1,!1,!1]}},s=Dc(t)||"me";r.me=s,r.seats[s]=on.color,m.myTi=on.color,m.role="host",r.unsub=t.onPeers(()=>{m.state==="lobby"&&Er()}),_c()}),Ee("joinBtn").addEventListener("click",async()=>{const t=(Ee("codeIn").value||"").trim().toUpperCase();if(t.length!==4){Ee("netNote").textContent="Battle codes are 4 letters or numbers.";return}if(sr)return;sr=!0,Ua(),Ee("netNote").textContent=`Joining ${t}…`;let i;try{i=await Lu(t,!1)}catch(s){sr=!1;const a=s&&s.type;Ee("netNote").textContent=a==="peer-unavailable"?`No battle found with code ${t}. Check the code with your host.`:a==="full"?"That battle already has eight players.":"Could not connect. Check your internet connection and try again.";return}sr=!1,Ee("netNote").textContent="";const r=ze.NET={role:"client",room:i,name:t,seats:{},hostPeer:null};m.role="client",r.unsub=i.onPeers(()=>{m.state==="lobby"&&xc()}),i.presence(gc()).catch(()=>{}),_c()});const e=(t,i)=>Ee(t).addEventListener("click",r=>{var o;const s=r.target.closest("button"),a=ze.NET;!s||!a||a.role!=="host"||(i==="al"?a.lobby.al=qo(s.dataset.v,Se((o=a.seats[a.me])!=null?o:0)):i==="diff"?a.lobby.diff=+s.dataset.v:a.lobby[i]=s.dataset.v,Er())});Ee("lobbyFaction").addEventListener("click",t=>{const i=t.target.closest("button"),r=ze.NET;!i||!r||(on.faction=i.dataset.v,on.save(),r.role==="host"?Er():(r.lobbySig=null,r.room.presence(gc()).catch(()=>{}),xc()))}),e("lobbyTeams","al"),e("lobbyMode","mode"),e("lobbyMap","map"),e("lobbyDiff","diff"),Ee("startBtn").addEventListener("click",()=>{var c;const t=ze.NET;if(!t||t.role!=="host")return;vr();const i=t.lobby;m.mode=i.mode,m.map=yc[i.map],m.diff=i.diff,m.ALLY=[...i.al],m.myTi=(c=t.seats[t.me])!=null?c:0,m.seed=Math.random()*1e9|0,t.msgs=[],t.msgN=0,t.inp={},t.snapN=0;const r=[0,0,0,0,0,0,0,0],s=[null,null,null,null],a=t.room.peers();m.crests=[];const o=[1,1,1,1,...i.duo.map(f=>f?1:0)];for(const[f,l]of Object.entries(t.seats)){r[l]=1;const h=(a.find(d=>d.peer===f)||{}).presence||{};s[Se(l)]=f===t.me?on.faction:Zs[h.fac]?h.fac:null,m.crests[l]=f===t.me?an.crest:Math.min(7,Math.max(0,h.cr|0))}m.factions=Zf(s,m.seed),Yr.startMatch(r,o),kc()}),Ee("leaveBtn").addEventListener("click",()=>Uc())}const ct=n=>document.getElementById(n);{const n=ct("nojs");n&&n.remove()}document.addEventListener("pointerdown",n=>{n.target.closest&&n.target.closest(".overlay button, .overlay .seat, .overlay .duotog, .overlay .alchip")&&Ct.uiClick()},!0);document.addEventListener("gesturestart",n=>n.preventDefault());document.addEventListener("gesturechange",n=>n.preventDefault());let Iu=0;document.addEventListener("touchend",n=>{const e=Date.now();e-Iu<300&&!(n.target.closest&&n.target.closest("input"))&&n.preventDefault(),Iu=e},{passive:!1});const gT=new URLSearchParams(location.search);gT.get("stress")==="1"&&(m.fullSquads=!0);let rh="ffa";pt.on("msg",n=>Ys(n.k,n.a));pt.on("spark",n=>wS(n.x,n.y,n.z,n.c,n.n));pt.on("splat",n=>{US(n.x,n.z,n.s,n.ti),CS(n.x,n.z)});pt.on("float",n=>gr(n.x,n.y,n.z,n.text,n.color));pt.on("sfx",n=>{const e=Ct[n.name];e&&e(n.x,n.z)});pt.on("shake",n=>{lt.shake=n});let vc=0;pt.on("hitstop",n=>{vc=Math.max(vc,n)});pt.on("buzz",n=>Vs(n));pt.on("hint",n=>{const e=m.player;e&&An("mhint",2500)&&gr(e.x,e.y+3.4,e.z,n,"#fff")});pt.on("respawnMe",n=>{lt.yaw=n.face});pt.on("hud",()=>{m.state==="play"&&Kf($.lastSnapAt)});pt.on("hostEnd",n=>ur(n[0],n[1]));pt.on("end",({w:n,why:e})=>{Cm(),Xo(!1),Ks(!1),Im(),Kf($.lastSnapAt),qf();const t=m.ALLY[Se(m.myTi)],i=n<0?"draw":n===t?"win":"lose",r=i==="win"?"Victory":i==="draw"?"Draw":"Defeat";i==="win"?(Ct.horn(),lr("Victory!","","#ffcf3a")):lr(r,"",i==="draw"?"#fff":"#e0352b"),ct("endTitle").innerHTML=`<span>${r}</span>`,ct("endText").textContent=`${ns[m.mode].name} on ${m.map.name}. ${vT(n,e)}`,ct("sKills").textContent=m.kills,ct("sSquad").textContent=m.recruited,ct("sTime").textContent=Yf(m.T),_T(m.awarded?null:A1({result:i,kills:m.kills,diff:m.diff})),m.awarded=!0;const s=$r(),a=_i();ct("againBtn").hidden=a,ct("againBtn").textContent=s?"Back to lobby":"Fight again",ct("menuBtn").textContent=ze.NET?"Leave":"Menu",ct("endNote").textContent=a?"Waiting for the host to start the next battle…":"",s&&kc(),setTimeout(()=>{m.state==="end"&&(ct("ovEnd").hidden=!1)},1600)});function _T(n){const e=mu(),t=ct("xpBar");ct("rankName").textContent=Ii[e.rank].name,ct("xpGain").textContent=n?`+${n.gained} XP`:"";const i=a=>{const o=mu(a);return o.span?Math.min(100,o.into/o.span*100):100};t.style.transition="none",t.style.width=(n&&!n.rankUp?i(n.before):0)+"%",requestAnimationFrame(()=>requestAnimationFrame(()=>{t.style.transition="",t.style.width=i(an.xp)+"%"}));const r=ct("rankNote"),s=Ii[e.rank+1];r.classList.toggle("up",!!(n&&n.rankUp)),r.textContent=n&&n.rankUp?`Rank up! New crest: ${n.unlocked.join(", ")}`:s?`${s.xp-an.xp} XP to ${s.name} (unlocks the ${Kr[e.rank+1].name} crest)`:"Top rank reached",sh()}const xT='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';function sh(){const n=$o(an.xp),e=Ii[n+1];ct("rankLine").textContent=`Rank: ${Ii[n].name}`,ct("rankNext").textContent=e?`${an.xp} / ${e.xp} XP`:`${an.xp} XP`,ct("segCrest").innerHTML=Kr.map((i,r)=>{const s=km(r),a=s?`${i.name} crest`:`${i.name} crest, unlocks at ${Ii[r].name}`;return`<button type="button" data-v="${r}" aria-pressed="${r===an.crest}" aria-disabled="${!s}" aria-label="${a}" title="${a}" style="background:${i.css}">${s?"":xT}</button>`}).join("");const t=Kr[n+1];ct("crestNote").textContent=`Crest: ${Kr[an.crest].name}`+(t?` · ${Ii[n+1].name} unlocks ${t.name}`:"")}ct("segCrest").addEventListener("click",n=>{const e=n.target.closest("button");!e||e.getAttribute("aria-disabled")==="true"||Um(+e.dataset.v)&&sh()});sh();function vT(n,e){if(n<0)return"Time ran out with no clear winner.";const t=_1(n),i=t.indexOf("&")<0;return e==="castles"?`${t} tore down every enemy castle.`:e==="tickets"?`${t} ${i?"is":"are"} the last side with tickets.`:e==="caps"?`${t} carried the banner home ${Bo} times.`:`Time is up and ${t} ${i?"leads":"lead"}.`}function w0(){am(m.layout),mm(),Tm(),p1(),m1(),Xo(!1),Ks(!1),L0.reset(),u1(m.map.id)}function A0(n,e){ze.NET||(m.role="solo"),lg(n,e),lt.yaw=m.player.face,lt.pitch=fm,w0(),Ct.horn(),T1()}P1({onMatchStart:w0,onAbort:n=>Uc(n),onLobby:()=>_c()});mT({startMatch:A0,seedDemo:_o,preset:()=>rh,resetSolo:()=>ra()});v1(Gr);w1();let Na=0,$a=null;function _o(){m.layout=bf(m.map.id,!1,!1,7),Sf(m.layout),m.units=[],m.horses=[],m.arrows=[],m.flag=null,m.player=null,m.uid=0,m.teams=Ef([0,0,0,0]),m.factions=Zf(he.map((i,r)=>r===m.myTi?on.faction:null),7),am(m.layout),mm(),Tm();const n=["foot","foot","arch","foot","arch"];he.forEach((i,r)=>n.forEach((s,a)=>{const[o,c]=wr(i,(a-2)*1.5),f=to(r,o*.5,c*.5,s);f.face=Math.atan2(-f.x,-f.z),f.demo=!0}));const e=to(m.myTi,0,22,"captain");e.demo=!0;const t={id:1,x:0,z:22,face:0,state:"ridden",rider:e,t:0,spd:9,ti:m.myTi};m.horses.push(t),e.mounted=!0,e.horse=t,$a=e}function Du(n){if(Na+=n,$a&&$a.horse){const e=Na*.35,t=$a;t.x=Math.cos(e)*22,t.z=Math.sin(e)*22,t.y=wt(t.x,t.z),t.face=Math.atan2(-Math.sin(e),Math.cos(e)),t.vx=-Math.sin(e)*8,t.vz=Math.cos(e)*8;const i=t.horse;i.x=t.x,i.z=t.z,i.face=t.face,i.spd=8}bm(m.units,n),Sm(m.horses.map(e=>({key:e.id,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:e.spd,state:e.state,t:e.t,fall:e.fall})),n),pm(),lm(n,()=>{}),ES(Na),om(0,0,Na),Jn.render(Ft,xt),wm()}function fs(n,e){ct(n).addEventListener("click",t=>{const i=t.target.closest("button");i&&(ct(n).querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed",r===i?"true":"false")),e(i.dataset.v))})}function ia(){const n=R1(m.ALLY,m.myTi);ct("desc").innerHTML=`<strong>${ns[m.mode].name}.</strong> ${ns[m.mode].desc}<br><strong>${m.map.name}.</strong> ${m.map.desc} <strong>Teams:</strong> ${n}`}function C0(){const n=tm[ht.level].name;ct("qualityNote").textContent=ht.stepped?`Lowered to ${n} to keep the game smooth.`:ht.setting==="auto"?`Auto picked ${n} for this device.`:"",ct("segQuality").querySelectorAll("button").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.v===ht.setting)))}fs("segMode",n=>{m.mode=n,ia()});fs("segMap",n=>{m.map=yc[n],ia(),_o()});fs("segTeams",n=>{rh=n,m.ALLY=qo(n,m.myTi),ia()});fs("segFaction",n=>{on.faction=n,on.save(),_o()});fs("segColor",n=>{on.color=+n,on.save(),ra(),ia(),_o()});const qa=[!1,!1,!1,!1];ct("segDuo").querySelectorAll("button").forEach((n,e)=>{n.addEventListener("click",()=>{qa[e]=!qa[e],n.setAttribute("aria-pressed",String(qa[e]))})});function ra(){m.role="solo",m.myTi=on.color,m.ALLY=qo(rh,m.myTi)}function R0(){vr(),ze.NET=null,ra(),m.seed=Math.random()*1e9|0,m.factions=Zf(he.map((e,t)=>t===m.myTi?on.faction:null),m.seed);const n=[1,1,1,1,...qa.map(e=>e?1:0)];m.crests=[],m.crests[m.myTi]=an.crest,A0(he.map((e,t)=>t===m.myTi?1:0),n)}const P0=(n,e)=>ct(n).querySelectorAll("button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.v===String(e))));fs("segDiff",n=>{m.diff=+n});fs("segQuality",n=>{n!==ht.setting&&(Qb(n),location.reload())});ct("goBtn").addEventListener("click",R0);ct("againBtn").addEventListener("click",()=>{if(vr(),$r()){_c();return}R0()});ct("menuBtn").addEventListener("click",()=>{if(ze.NET){Uc();return}m.state="title",ra(),ct("ovEnd").hidden=!0,ct("hudWrap").hidden=!0,ct("ovTitle").hidden=!1,_o()});const L0={t:0,frames:0,steps:0,reset(){this.t=0,this.frames=0},tick(n){if(ht.setting!=="auto"||this.steps>=2||this.t>8||(this.t+=n,this.frames++,this.t<8))return;this.frames/this.t<30&&tS()&&(this.steps++,rm(),im(),oh(),C0(),this.reset())}};function Pl(n){bm(m.units,n);const e=_i()?O1():m.horses.map(i=>({key:i.id,ti:i.ti,x:i.x,z:i.z,face:i.face,spd:i.spd,state:i.state,t:i.t,fall:i.fall}));Sm(e,n),lm(n,RS),zS(n),pm(),TS(n),OS(m.player,Ju(m.myTi),Jd());const t=$f();om(t?t.x:0,t?t.z:0,Jd()),Jn.render(Ft,xt),a1({joy:ut.joy,nickFor:yT})}function yT(n){const e=ze.NET;if(!e)return null;const t=e.room.peers(),i=e.role==="host"?e.seats:((t.find(a=>a.peer===e.hostPeer)||{}).presence||{}).seats||{},r=Object.keys(i).find(a=>i[a]===n);if(!r)return null;const s=t.find(a=>a.peer===r);return s&&s.presence&&s.presence.nick?String(s.presence.nick).slice(0,16):null}let Ll=0,ku=performance.now(),pf=60;function I0(n){const e=(n-ku)/1e3;let t=Math.min(.05,e);ku=n,vc>0&&(vc-=e,t*=.06),e>0&&(pf+=(1/e-pf)*.05);try{if(_i()&&(m.state==="play"||m.state==="end"))z1(t)&&(m.state==="play"||m.state==="end")?Pl(t):Du(t);else if(m.state==="play")$r()&&D1(),yp(t,Rm(t)),$r()&&m.state==="play"&&I1(),Pl(t),L0.tick(e);else if(m.state==="end"){for(const i of m.units)i.dead&&Uf(i,t);Pl(t),$r()&&n-(ze.NET.lastSend||0)>500&&kc(!0)}else Du(t),m.state==="lobby"&&(_i()?pT():$r()&&n-(ze.NET.lastLobby||0)>700&&(ze.NET.lastLobby=n,Er()));m.state==="play"&&(Ll-=t,Ll<=0&&(Ll=.1,Kf($.lastSnapAt),E1(.1)))}catch(i){console.error(i)}requestAnimationFrame(I0)}const Uu=n=>Math.round(n*10)/10;window.__fb={end(){ur(m.ALLY[Se(m.myTi)],"time")},get info(){const n=ze.NET,e=m.player;return{state:m.state,T:Math.round(m.T),MODE:m.mode,map:m.map.id,myTi:m.myTi,al:m.ALLY.join(""),units:m.units.length,horses:m.horses.length,arrows:m.arrows.length,net:n&&{role:n.role,seats:n.seats,size:n.lastSize,hostPeer:n.hostPeer},teams:m.teams.map(t=>({p:Math.round(t.points),t:t.tickets,c:t.caps,g:Math.round(t.gold),alive:t.alive,h:t.human?1:0,plan:t.plan&&t.plan.kind,lead:t.leader&&{m:t.leader.mounted,dead:t.leader.dead}})),kinds:["foot","arch"].map(t=>m.units.filter(i=>!i.dead&&i.kind===t).length),flag:m.flag&&{s:m.flag.state},player:e&&{x:Uu(e.x),z:Uu(e.z),hp:Math.round(e.hp),mounted:e.mounted,dead:e.dead,id:e.id},gfx:{level:ht.level,setting:ht.setting,fps:Math.round(pf),calls:Jn.info.render.calls,tris:Jn.info.render.triangles,batches:qS()}}},step(n,e=1/30,t){const i=t?Object.assign({wx:0,wz:0,mag:0,block:!1,attackHeld:!1,camYaw:0},t===!0?{}:t):null;for(let r=0;r<n&&m.state==="play";r++)yp(e,i)},ride(){m.player&&(m.player.lastHit=-9,Gr.ride())},volley(){Gr.volley()},attack(){Gr.attack()},jump(){Gr.jump()},weapon(n){Gr.weapon(n)},G:m,cam:lt};function oh(){sS(),o1()}addEventListener("resize",oh);P0("segFaction",on.faction);P0("segColor",on.color);ra();rm();oh();ia();C0();_o();requestAnimationFrame(I0);
