var bg=t=>{throw TypeError(t)};var ko=(t,e,n)=>e.has(t)?bg("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n);function Sg(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const he=[{name:"Blue",hex:3824880,css:"#3a5cf0",pos:[-56,56]},{name:"Red",hex:14693675,css:"#e0352b",pos:[56,-56]},{name:"Green",hex:3129158,css:"#2fbf46",pos:[-56,-56]},{name:"Yellow",hex:15778841,css:"#f0c419",pos:[56,56]}],uo={roman:{name:"Romans",code:"r"},greek:{name:"Greeks",code:"g"},barbarian:{name:"Barbarians",code:"b"}},Ql=["roman","greek","barbarian"],Tg=t=>Ql.find(e=>uo[e].code===t)||"roman",Eg={ffa:[0,1,2,3],"2v2":[0,1,1,0],"2v1v1":[0,1,2,0],"3v1":[0,1,0,0]},pp=["A","B","C","D"],hs={conquest:{name:"Conquest",time:600,title:"Castle Strength",desc:"Knock down every enemy castle. A castle only takes damage from fighters on foot."},dm:{name:"Deathmatch",time:480,title:"Tickets",desc:"Each team has 250 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold."},ctf:{name:"Capture the Fort",time:600,title:"Captures",desc:"A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins."},ctrl:{name:"Control",time:600,title:"Control Score",desc:"Five points are scattered across the map. Whoever has the most soldiers on a point owns it, and every point you hold adds to your score each second. Allies pool their score; first alliance to 450 wins."}},Tr={captureTime:5,rate:1,win:450,radius:5},Bc={forum:{id:"forum",name:"Forum",desc:"A Roman city. Streets between the houses funnel every army, and four temples give the high ground: fighting down their steps deals +20% damage and archers on top shoot 30% farther.",sky:14472902,fog:[70,200],g1:14273972,g2:13154716,g3:11904388,hill:9075814,rock:10195844},colosseum:{id:"colosseum",name:"Colosseum",desc:"An arena ringed by a roaring crowd. The inner pit has four gates that slam shut for 20 seconds every minute.",sky:14472902,fog:[80,220],g1:14467214,g2:13479544,g3:12098154,hill:9075814,rock:10195844},desert:{id:"desert",name:"Desert Fort",desc:"A walled fortress on a plateau in the middle of the sands. Four ramps lead up through its gates; hold them and you hold the high ground.",sky:15128248,fog:[70,230],g1:14859650,g2:13804648,g3:12160860,hill:10254928,rock:10848872},wooden:{id:"wooden",name:"Wooden Fort",desc:"Every castle sits inside a log palisade with two gates, in a green valley of huts and watchtowers. Defenders fight at the gates.",sky:13622752,fog:[60,210],g1:8364106,g2:7113282,g3:6123328,hill:5990997,rock:9080198},valley:{id:"valley",name:"Grass Valley",desc:"Open fields and gentle hills. A ring of rocky outcrops guards the middle with eight passes. Horses shine here; archers need the rocks for cover.",sky:13622752,fog:[60,220],g1:9088336,g2:7772223,g3:6123328,hill:5990997,rock:9408390},dunes:{id:"dunes",name:"Dune Field",desc:"Open sand and scattered fences. Straight fights.",sky:14472902,fog:[70,190],g1:13216120,g2:12096874,g3:11045474,hill:7234136,rock:9273716},river:{id:"river",name:"River Ford",desc:"A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.",sky:13622752,fog:[70,190],g1:8362572,g2:7113282,g3:6123328,hill:5990997,rock:9080198},forest:{id:"forest",name:"Pine Forest",desc:"Dense pine clusters. Trees stop arrows and hide ambushes.",sky:12175536,fog:[34,120],g1:5600058,g2:6455359,g3:4479023,hill:4082740,rock:8027248},frost:{id:"frost",name:"Frost Hill",desc:"A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.",sky:15002866,fog:[60,170],g1:15660022,g2:14147816,g3:12109006,hill:10135218,rock:9344668}},mp=["captain","foot","arch"],mn={captain:{hp:150,dmg:22,reach:1.3,cd:.6,spd:5.4,r:.62,block:.3},foot:{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,cost:40,name:"Footman"},arch:{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,cost:50,name:"Archer",range:22,shoot:2.3,arrow:10,jitter:.8}},ef={dmg:30,spd:6.3},gp=["foot","arch"],_p=[{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.35,javelin:!1,name:"Footman"},{hp:105,dmg:15,reach:2.1,cd:1,spd:5.2,r:.55,block:.4,javelin:!0,name:"Footman (Arms)"},{hp:130,dmg:16,reach:2.1,cd:1,spd:5,r:.55,block:.45,javelin:!0,name:"Footman (Armor)"}],xp=[{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,range:22,shoot:2.3,arrow:10,jitter:.8,name:"Archer"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:23,shoot:2.1,arrow:11,jitter:.7,name:"Archer (Training)"},{hp:68,dmg:7,reach:1.1,cd:1.1,spd:5.4,r:.5,block:0,range:29,shoot:2,arrow:12,jitter:.45,name:"Archer (Marksman)"}],vp=[{hpB:0,dmgB:0,reachB:0,javelin:!1},{hpB:15,dmgB:4,reachB:.3,javelin:!0},{hpB:35,dmgB:7,reachB:.3,javelin:!0}],Hc={dmg:24,range:10,cd:6.5},wg={cd:9},js=["sword","spear","jav"],yp={sword:"Sword",spear:"Spear",jav:"Javelins"},wo={sword:{cd:.36,finisherCd:.62,window:.85,mult:1,finisherMult:1.5,aim:3.6},spear:{cd:.66,reachB:1.1,mult:1.15,pierce:.7,aim:4.6},jav:{cd:.5,dmg:30,range:16,ammo:3,regen:4},jump:{v:7.6,g:22,cd:.3},leap:{mult:1.4,range:3,arc:1.3,stun:.6,cd:.7}},hi=[{name:"Recruit",xp:0,joke:"still has all ten fingers"},{name:"Legionary",xp:150,joke:"owns a pointy stick"},{name:"Veteran",xp:400,joke:"has seen things (mostly mud)"},{name:"Centurion",xp:800,joke:"can count to a hundred, mostly"},{name:"Tribune",xp:1400,joke:"has a nicer helmet than you"},{name:"Legate",xp:2200,joke:"hasn’t walked anywhere in years"},{name:"General",xp:3200,joke:"points at maps, dramatically"},{name:"Warlord",xp:4500,joke:"even the goats salute"}],is=[{name:"Gold",hex:16764730,css:"#ffcf3a"},{name:"Silver",hex:14212579,css:"#d8dde3"},{name:"Crimson",hex:12592685,css:"#c0262d"},{name:"Obsidian",hex:2763312,css:"#2a2a30"},{name:"Royal",hex:6963125,css:"#6a3fb5"},{name:"Ivory",hex:16052193,css:"#f4efe1"},{name:"Emerald",hex:3122010,css:"#2fa35a"},{name:"Flame",hex:16738842,css:"#ff6a1a"}],Ag={win:["Glory! And only slightly fewer sandals.","The bards will sing of this. Badly.","Victory! Somebody fetch the goats.","Flawless. Well, mostly flawless.","They’ll be finding helmets for weeks."],lose:["A tactical retreat. Very tactical.","We’ll call that a rehearsal.","At least the helmets had fun.","In fairness, they had more pointy sticks.","Morale is… present."],draw:["Everybody lost. Mostly the goats.","A draw. Nobody tell the emperor.","Honours even. Bruises everywhere."]},Fh=["Hitting people is faster than asking nicely.","Spears beat horses. Horses beat feet. Nobody beats the goat.","A shieldwall stops arrows, not gossip.","Jump, then hit. Physics does the rest.","Archers aim for the head. Wear a helmet. Keep it on.","Three sword swings in a row: the third one really means it.","Your aura makes men braver. Or at least louder.","Horses are fast. Stopping them is a spearman’s hobby.","Castles only take damage from men on foot. Horses refuse to help."],Ms={base:25,perKill:4,maxKills:40,win:75,draw:35,diffMult:[.75,1,1.35]},Mp=[{name:"Recruit",dmg:.7,income:8},{name:"Soldier",dmg:1,income:10},{name:"Warlord",dmg:1.25,income:12}],tf={humanIncome:10,startGold:60,aiRecruitEvery:[1.5,3]},Cg=["foot","foot","foot","foot","foot","foot","foot","arch","arch","arch"],Rg=["foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","foot","arch","arch","arch","arch","arch","arch"],jo=["follow","hold","charge","shieldwall"],Bh={follow:"Follow me!",hold:"Hold here!",charge:"Charge!",shieldwall:"Shieldwall!"},Ri=[{id:"foot1",name:"Arms",desc:"Footmen: spear + javelin throw, better sword & shield",cost:[90]},{id:"foot2",name:"Armor",desc:"Footmen: heavier armor, more HP",cost:[160]},{id:"arch1",name:"Training",desc:"Archers: all-round stat increase",cost:[90]},{id:"arch2",name:"Marksman",desc:"Archers: +range, +accuracy",cost:[160]},{id:"aura",name:"Aura",desc:"Bigger, stronger aura",cost:[80,140,220]},{id:"horse",name:"Horse",desc:"Tougher, faster, back sooner",cost:[80,140,220]}],uc={range:8,perRange:3,bonus:.1,perBonus:.05},Qo=9.5,mr=11,Pg=120,Lg=20,bp=250,ea=3,Ma=88,m={role:"solo",state:"title",mode:"conquest",map:Bc.forum,diff:1,preset:"ffa",ALLY:[0,1,2,3],myTi:0,factions:["roman","roman","roman","roman"],seed:1,T:0,units:[],horses:[],arrows:[],teams:[],flag:null,bounty:-1,player:null,layout:null,kills:0,recruited:0,uid:0,arrowN:0,horseN:0,endInfo:null,squadCap:20,duo:[!1,!1,!1,!1]},Te=t=>t%4,Ig=t=>t<4?0:1,Vf=()=>{const t=[0,1,2,3];for(let e=0;e<4;e++)m.duo[e]&&t.push(e+4);return t},ti=(t,e)=>m.ALLY[Te(t)]!==m.ALLY[Te(e)],kn=(t,e)=>m.ALLY[Te(t.ti)]!==m.ALLY[Te(e.ti)],Wf=()=>new Set(m.ALLY).size===4,ol={},ct={on(t,e){(ol[t]||(ol[t]=[])).push(e)},emit(t,e){const n=ol[t];if(n)for(const i of n)i(e)}};function ds(t){return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Jt=(t,e,n)=>t<e?e:t>n?n:t,ie=(t,e)=>t+Math.random()*(e-t),_n=(t,e)=>{let n=e-t;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n},po=(t,e,n)=>t+Jt(_n(t,e),-n,n),jf=[[0,50],[50,0],[0,-50],[-50,0]].map(([t,e])=>{const n=Math.hypot(t,e);return{x:t,z:e,vx:t/n,vz:e/n,rot:Math.atan2(t/n,e/n)}}),yt={hw:9,front:-6,back:6,steps:3,h:1.8},Et={r:17.5,wall:18.4,ramp:25,h:2.4,lane:3},Dg=[[0,46],[46,0],[0,-46],[-46,0]],pn={r:86,inner:24,gateW:3.4,cycle:60,open:40},Sp=t=>t%pn.cycle<pn.open,kg=(t,e,n)=>{const i=e-t.x,r=n-t.z;return[i*t.vz-r*t.vx,i*t.vx+r*t.vz]};function Ug(t,e){return 7*Math.exp(-(t*t+e*e)/(2*20*20))}function pc(t){return Math.abs(t+32)<2.4||Math.abs(t-32)<2.4}function Gc(t,e){return m.map.id==="river"&&Math.abs(e)<5&&Math.hypot(t,e)>=7}function Tp(t,e){return Gc(t,e)&&Math.abs(t)<14}function Ng(t,e){for(const n of jf){if(Math.abs(t-n.x)>13||Math.abs(e-n.z)>13)continue;const[i,r]=kg(n,t,e);if(!(Math.abs(i)>yt.hw)){if(r>=yt.front&&r<=yt.back)return yt.h;if(r>=yt.front-yt.steps&&r<yt.front)return yt.h*(r-(yt.front-yt.steps))/yt.steps}}return 0}function zg(t,e){const n=Math.abs(t),i=Math.abs(e);if(n>Et.ramp||i>Et.ramp)return 0;const r=Math.hypot(t,e);return r<Et.r?Et.h:r<Et.ramp&&Math.min(n,i)<Et.lane?Et.h*(Et.ramp-r)/(Et.ramp-Et.r):0}function Og(t,e){let n=0;for(const[i,r]of Dg){const s=t-i,o=e-r;Math.abs(s)<30&&Math.abs(o)<30&&(n+=4.5*Math.exp(-(s*s+o*o)/(2*9.5*9.5)))}return n}function vt(t,e){switch(m.map.id){case"frost":return Ug(t,e);case"river":return Math.abs(e)<5.5&&Math.hypot(t,e)>=7?pc(t)?.38:-.45:0;case"forum":return Ng(t,e);case"desert":return zg(t,e);case"valley":return Og(t,e)}return 0}function gr(t,e){const n=Math.hypot(t,e),i=Math.sin(t*.07)*Math.cos(e*.05)+Math.sin(t*.023+e*.031)*1.4;let r=m.map.id==="river"?0:vt(t,e);if(m.map.id==="river"){const s=Math.abs(e);s<7&&Math.hypot(t,e)>=7.5&&(r=s<5?-.95:-.95*(7-s)/2)}return m.map.id==="desert"&&n>30&&(r+=Math.max(0,i)*Math.min(1,(n-30)/20)*1.2),n>92&&(r+=(n-92)*.25+Math.max(0,i)*((n-92)*.18)),r}function Lr(t,e=0,n=0){const i=Math.hypot(t.pos[0],t.pos[1]),r=-t.pos[0]/i,s=-t.pos[1]/i;return[t.pos[0]+r*(Qo+2.5+n)+s*e,t.pos[1]+s*(Qo+2.5+n)-r*e]}function Fg(t,e,n,i,r,s,o,a={}){const c=Math.hypot(i-e,r-n),f=Math.max(1,Math.ceil(c/(s*1.3))),l=[];for(let h=0;h<=f;h++){const d=Object.assign({x:e+(i-e)*h/f,z:n+(r-n)*h/f,r:s},a);l.push(d),t.obstacles.push(d),t.blockers.push({x:d.x,z:d.z,r:s,h:o,gate:a.gate})}return l}function al(t,e,n,i,r,s,o,a={}){const c=Math.ceil(Math.PI*2*i/(r*1.3));for(let f=0;f<c;f++){const l=f/c*Math.PI*2;if(o&&o(l))continue;const h=Object.assign({x:e+Math.cos(l)*i,z:n+Math.sin(l)*i,r},a);t.obstacles.push(h),s&&t.blockers.push({x:h.x,z:h.z,r,h:s})}}function bs(t,e,n,i,r,s,o,a){const c={box:!0,x:e,z:n,hw:i,hd:r,rot:s};if(t.obstacles.push(c),o){const f=Math.cos(s),l=Math.sin(s),h=Math.min(i,r);for(let d=-i+h;d<=i-h+.01;d+=h)for(let u=-r+h;u<=r-h+.01;u+=h)t.blockers.push({x:e+d*f+u*l,z:n-d*l+u*f,r:h*1.2,h:o})}return a&&t.buildings.push({x:e,z:n,w:i*2,d:r*2,rot:s,h:o,kind:a}),c}const Ss=(t,e,n)=>e.some(i=>Math.abs(_n(t,i))<n),nr=[Math.PI/4,3*Math.PI/4,-3*Math.PI/4,-Math.PI/4],Nr=[0,Math.PI/2,Math.PI,-Math.PI/2],Bg=["A","B","C","D","E"];function Hh(t,e,n,i){return!t.obstacles.some(r=>r.box?Math.abs((e-r.x)*Math.cos(r.rot)-(n-r.z)*Math.sin(r.rot))<r.hw+i&&Math.abs((e-r.x)*Math.sin(r.rot)+(n-r.z)*Math.cos(r.rot))<r.hd+i:Math.hypot(e-r.x,n-r.z)<r.r+i)}function Hg(t,e,n){if(Hh(t,e,n,3))return[e,n];for(let i=3;i<=18;i+=3)for(let r=0;r<10;r++){const s=r/10*Math.PI*2,o=e+Math.cos(s)*i,a=n+Math.sin(s)*i;if(Hh(t,o,a,3))return[o,a]}return[e,n]}function Gg(t){return[[0,0],[42,0],[-42,0],[0,42],[0,-42]].map(([n,i],r)=>{const[s,o]=Hg(t,n,i);return{id:r,letter:Bg[r],x:s,z:o}})}function Xf(t,e,n,i){const r=ds(i|0),s=(h,d)=>h+r()*(d-h),o={mapId:t,withFort:e,hills:[],palisades:[],rocks:[],trees:[],stones:[],obstacles:[],blockers:[],fortSegments:[],buildings:[],columns:[],towers:[],rings:[],gates:[],palms:[],huts:[],statues:[]},a=(h,d,u)=>he.some(_=>Math.hypot(_.pos[0]-h,_.pos[1]-d)<20+u),c=(h,d,u=0)=>!a(h,d,u)&&Math.hypot(h,d)>(e?12:8)+u&&!(t==="river"&&Math.abs(d)<9);for(let h=0;h<14;h++){const d=h/14*Math.PI*2+s(-.1,.1);o.hills.push({a:d,d:s(150,185),rad:s(18,34),sy:s(.35,.6)})}const f=(h,d=c)=>{for(let u=0;u<h;u++){const _=s(-80,80),x=s(-80,80),g=s(.6,1.7),p=s(0,3),v=s(0,3);d(_,x)&&(o.rocks.push({x:_,z:x,r:g,rx:p,ry:v}),g>1.1&&o.obstacles.push({x:_,z:x,r:g*.9}))}},l=(h,d,u)=>{o.trees.push({x:h,z:d,s:u}),Math.hypot(h,d)<90&&(o.obstacles.push({x:h,z:d,r:.7*u}),o.blockers.push({x:h,z:d,r:1.4*u,h:7}))};if(t==="dunes"){const h=[[-18,6,.4],[16,-8,-.3],[0,24,1.57],[0,-26,1.57],[-30,-8,.9],[30,10,.9],[-8,-40,0],[10,40,0]];for(const[d,u,_]of h){const x=[];for(let g=0;g<9;g++){const p=(g-4)*.66,v=d+Math.cos(_)*p,y=u-Math.sin(_)*p;x.push({x:v,z:y,rot:s(0,3),sy:s(.85,1.1)}),g%2===0&&o.obstacles.push({x:v,z:y,r:.75})}o.palisades.push({x:d,z:u,a:_,logs:x})}f(20)}if(t==="river"){for(let h=0;h<22;h++){const d=s(-14,14),u=s(-4.5,4.5),_=s(.25,.5);Math.hypot(d,u)<7.5||o.stones.push({x:d,z:u,s:_})}f(20)}if(t==="forest"){for(let h=0;h<16;h++){let d,u,_=0;do d=s(-82,82),u=s(-82,82),_++;while(!c(d,u,4)&&_<40);const x=5+Math.floor(r()*6);for(let g=0;g<x;g++){const p=d+s(-6,6),v=u+s(-6,6),y=s(.85,1.35);c(p,v)&&l(p,v,y)}}for(let h=0;h<40;h++){const d=s(0,6.28),u=s(95,130);o.trees.push({x:Math.cos(d)*u,z:Math.sin(d)*u,s:s(1,1.6)})}f(10)}if(t==="frost"&&f(20),t==="forum"){for(const d of jf){const u=(v,y)=>[d.x+v*d.vz+y*d.vx,d.z-v*d.vx+y*d.vz],[_,x]=u(0,3);bs(o,_,x,6,3,d.rot,6.5);for(const v of[-1,1]){const[y,b]=u(v*(yt.hw+.45),-1.5);bs(o,y,b,.45,7.5,d.rot,0)}const[g,p]=u(0,yt.back+.45);bs(o,g,p,yt.hw+.9,.45,d.rot,0);for(let v=-7.5;v<=7.5;v+=3){const[y,b]=u(v,-4.8);o.obstacles.push({x:y,z:b,r:.55}),o.blockers.push({x:y,z:b,r:.55,h:6}),o.columns.push({x:y,z:b,y:yt.h,h:5.2,r:.45})}}const h=[[26,26,6,6],[47,20,5,4],[20,47,4,5],[33,8,4,3.5],[8,33,3.5,4]];for(const[d,u,_,x]of h)for(const[g,p]of[[1,1],[-1,1],[1,-1],[-1,-1]]){const v=d*g,y=u*p,b=5+(Math.abs(v*7+y*3)|0)%3;bs(o,v,y,_,x,0,b,"house")}for(let d=0;d<Math.PI*2-.01;d+=2.6/17){if(Ss(d,[...Nr,...nr],.22))continue;const u=Math.cos(d)*17,_=Math.sin(d)*17;o.obstacles.push({x:u,z:_,r:.5}),o.columns.push({x:u,z:_,y:0,h:4.6,r:.42})}for(const[d,u]of[[11,0],[-11,0],[0,11],[0,-11]])e||(o.obstacles.push({x:d,z:u,r:.9}),o.statues.push({x:d,z:u}))}if(t==="colosseum"){al(o,0,0,pn.inner,1.2,4.5,h=>Ss(h,nr,pn.gateW/pn.inner)),o.rings.push({r:pn.inner,h:4.5,gaps:nr,gapW:pn.gateW/pn.inner}),nr.forEach((h,d)=>{const u=Math.cos(h)*pn.inner,_=Math.sin(h)*pn.inner,x=-Math.sin(h),g=Math.cos(h),p={id:d,x:u,z:_,rot:Math.atan2(Math.cos(h),Math.sin(h))+Math.PI/2,w:pn.gateW*2};p.obs=Fg(o,u-x*pn.gateW,_-g*pn.gateW,u+x*pn.gateW,_+g*pn.gateW,.9,4,{gate:d+1}),o.gates.push(p)});for(const h of Nr)for(const d of[44,64]){const u=Math.cos(h)*d,_=Math.sin(h)*d;o.obstacles.push({x:u,z:_,r:1.3}),o.blockers.push({x:u,z:_,r:1.3,h:7}),o.statues.push({x:u,z:_,big:!0})}o.round=pn.r}if(t==="desert"){al(o,0,0,Et.wall,1.1,4.2,h=>Ss(h,Nr,(Et.lane+.4)/Et.wall)||Ss(h,nr,3/Et.wall)),o.rings.push({r:Et.wall,h:4.2,gaps:Nr,gapW:(Et.lane+.4)/Et.wall,towersAt:nr});for(const h of nr){const d=Math.cos(h)*Et.wall,u=Math.sin(h)*Et.wall;o.obstacles.push({x:d,z:u,r:2.6}),o.blockers.push({x:d,z:u,r:2.6,h:7}),o.towers.push({x:d,z:u,r:2.4,h:7.5,kind:"sand"})}for(let h=0;h<40;h++){const d=s(-80,80),u=s(-80,80);!c(d,u,2)||Math.hypot(d,u)<30||(o.palms.push({x:d,z:u,s:s(.9,1.3),lean:s(-.25,.25),rot:s(0,6.28)}),o.obstacles.push({x:d,z:u,r:.5}))}for(let h=0;h<10;h++){const d=s(-70,70),u=s(-70,70);!c(d,u,3)||Math.hypot(d,u)<32||bs(o,d,u,1.8,1.4,s(0,3),2.4,"tent")}f(12,(h,d)=>c(h,d)&&Math.hypot(h,d)>28)}if(t==="wooden"){he.forEach(h=>{const d=Math.atan2(-h.pos[1],-h.pos[0]),u=d+Math.PI/2;al(o,h.pos[0],h.pos[1],22,.8,3.4,_=>Ss(_,[d,u],3.4/22)),o.rings.push({x:h.pos[0],z:h.pos[1],r:22,h:3.4,gaps:[d,u],gapW:3.4/22,kind:"logs"});for(const _ of[d,u])for(const x of[-1,1]){const g=_+x*3.9/22,p=h.pos[0]+Math.cos(g)*22,v=h.pos[1]+Math.sin(g)*22;o.towers.push({x:p,z:v,r:1.1,h:6,kind:"wood",small:!0})}});for(const h of Nr){const d=Math.cos(h)*33,u=Math.sin(h)*33;o.obstacles.push({x:d,z:u,r:1.8}),o.blockers.push({x:d,z:u,r:1.8,h:4}),o.towers.push({x:d,z:u,r:1.6,h:8,kind:"wood"})}for(const h of Nr)for(let d=0;d<4;d++){const u=56+s(-6,8),_=s(-14,14),x=Math.cos(h)*u-Math.sin(h)*_,g=Math.sin(h)*u+Math.cos(h)*_;a(x,g,6)||Math.abs(x)>82||Math.abs(g)>82||bs(o,x,g,2.2,1.8,s(0,3),3.5,"hut")}for(let h=0;h<8;h++){const d=s(-80,80),u=s(-80,80);if(!(!c(d,u,8)||Math.hypot(d,u)<38))for(let _=0;_<5;_++){const x=d+s(-5,5),g=u+s(-5,5);c(x,g,4)&&l(x,g,s(.9,1.3))}}for(let h=0;h<40;h++){const d=s(0,6.28),u=s(95,130);o.trees.push({x:Math.cos(d)*u,z:Math.sin(d)*u,s:s(1,1.6)})}}if(t==="valley"){const h=[...Nr,...nr],d=31,u=Math.ceil(Math.PI*2*d/2.6);for(let _=0;_<u;_++){const x=_/u*Math.PI*2;if(Ss(x,h,4.2/d))continue;const g=d+s(-1.5,1.5),p=Math.cos(x)*g,v=Math.sin(x)*g,y=s(1.6,2.6);o.rocks.push({x:p,z:v,r:y,rx:s(0,3),ry:s(0,3),big:!0}),o.obstacles.push({x:p,z:v,r:y*.95}),o.blockers.push({x:p,z:v,r:y,h:y*1.6})}for(let _=0;_<10;_++){const x=s(-80,80),g=s(-80,80);if(!(!c(x,g,6)||Math.abs(Math.hypot(x,g)-d)<8))for(let p=0;p<4;p++){const v=x+s(-4,4),y=g+s(-4,4);c(v,y,4)&&l(v,y,s(.8,1.2))}}for(let _=0;_<40;_++){const x=s(0,6.28),g=s(95,130);o.trees.push({x:Math.cos(x)*g,z:Math.sin(x)*g,s:s(1,1.6)})}f(14,(_,x)=>c(_,x)&&Math.abs(Math.hypot(_,x)-d)>6)}for(const h of he)o.obstacles.push({x:h.pos[0],z:h.pos[1],r:Qo,castle:!0});if(e)for(let h=0;h<12;h++){if(h%3===0)continue;const d=h/12*Math.PI*2,u=Math.cos(d)*6,_=Math.sin(d)*6;o.fortSegments.push({a:d,x:u,z:_}),o.obstacles.push({x:u,z:_,r:1.3})}return o.ctrlSpots=n?Gg(o):[],o}const mo=1.5,da=90,at=Math.ceil(da*2/mo),Gh=.55,Ep=6,ur=Math.ceil(da*2/Ep);let Xs=new Uint8Array(at*at),nf=[],rf=[],sf=[],mc=!0;const ui=t=>Math.max(0,Math.min(at-1,Math.floor((t+da)/mo))),ci=t=>-da+(t+.5)*mo,_r=t=>Math.max(0,Math.min(ur-1,Math.floor((t+da)/Ep)));function wp(t,e,n,i){if(t.box){const a=e-t.x,c=n-t.z,f=Math.cos(t.rot),l=Math.sin(t.rot),h=a*f-c*l,d=a*l+c*f;return Math.abs(h)<t.hw+i&&Math.abs(d)<t.hd+i}const r=e-t.x,s=n-t.z,o=t.r+i;return r*r+s*s<o*o}const Vh=t=>t.box?Math.hypot(t.hw,t.hd):t.r;function $f(t){Xs=new Uint8Array(at*at),nf=Array.from({length:ur*ur},()=>[]),rf=Array.from({length:ur*ur},()=>[]),sf=[];const e=(i,r)=>{const s=Vh(i)+Gh,o=ui(i.x-s),a=ui(i.x+s),c=ui(i.z-s),f=ui(i.z+s);for(let l=c;l<=f;l++)for(let h=o;h<=a;h++)wp(i,ci(h),ci(l),Gh)&&(r?r.push(l*at+h):Xs[l*at+h]++)},n=(i,r)=>{const s=Vh(i)+1;for(let o=_r(i.z-s);o<=_r(i.z+s);o++)for(let a=_r(i.x-s);a<=_r(i.x+s);a++)r[o*ur+a].push(i)};for(const i of t.obstacles)if(n(i,nf),i.gate){const r=[];e(i,r),sf.push(...r)}else(i.box||i.r>=.7)&&e(i,null);for(const i of t.blockers)n(i,rf);if(t.mapId==="river")for(let i=0;i<at;i++)for(let r=0;r<at;r++){const s=ci(r),o=ci(i);Gc(s,o)&&!Tp(s,o)&&!pc(s)&&Math.abs(o)<4.5&&Xs[i*at+r]++}if(t.round)for(let i=0;i<at;i++)for(let r=0;r<at;r++)Math.hypot(ci(r),ci(i))>t.round-1&&Xs[i*at+r]++;mc=!0,qf()}function qf(){const t=m.layout&&m.layout.gates.length?Sp(m.T):!0;if(t!==mc){mc=t;for(const e of sf)Xs[e]+=t?-1:1}}const Ap=t=>!!t.gate&&!mc,Cp=(t,e)=>nf[_r(e)*ur+_r(t)]||[],Vg=(t,e)=>rf[_r(e)*ur+_r(t)]||[],hr=(t,e)=>t>=0&&e>=0&&t<at&&e<at&&!Xs[e*at+t],of=(t,e)=>hr(ui(t),ui(e));function gc(t,e,n,i){const r=Math.hypot(n-t,i-e),s=Math.ceil(r/(mo*.5));for(let o=1;o<=s;o++){const a=o/s;if(!hr(ui(t+(n-t)*a),ui(e+(i-e)*a)))return!1}return!0}function Wg(t,e,n,i){if(of(t,e))return[t,e];const r=Math.hypot(n-t,i-e)||1,s=(n-t)/r,o=(i-e)/r;for(let a=mo*.5;a<Math.min(r,16);a+=mo*.5){const c=t+s*a,f=e+o*a;if(of(c,f))return[c,f]}return[t,e]}const ba=new Float32Array(at*at),cl=new Int32Array(at*at),ll=new Uint32Array(at*at),fl=new Uint32Array(at*at);let zr=0;const Tt={a:new Int32Array(at*at),f:new Float32Array(at*at),n:0};function Wh(t,e){let n=Tt.n++;for(;n>0;){const i=n-1>>1;if(Tt.f[i]<=e)break;Tt.a[n]=Tt.a[i],Tt.f[n]=Tt.f[i],n=i}Tt.a[n]=t,Tt.f[n]=e}function jg(){const t=Tt.a[0],e=Tt.a[--Tt.n],n=Tt.f[Tt.n];let i=0;for(;;){let r=2*i+1;if(r>=Tt.n||(r+1<Tt.n&&Tt.f[r+1]<Tt.f[r]&&r++,Tt.f[r]>=n))break;Tt.a[i]=Tt.a[r],Tt.f[i]=Tt.f[r],i=r}return Tt.a[i]=e,Tt.f[i]=n,t}const Xg=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];function $g(t,e,n,i,r=3e3){let s=ui(t),o=ui(e);const a=ui(n),c=ui(i);if(!hr(a,c))return null;if(!hr(s,o)){let g=null,p=1e9;for(let v=-2;v<=2;v++)for(let y=-2;y<=2;y++){if(!hr(s+y,o+v))continue;const b=Math.hypot(ci(s+y)-t,ci(o+v)-e);b<p&&gc(t,e,ci(s+y),ci(o+v))!==null&&(p=b,g=[s+y,o+v])}if(!g)return null;[s,o]=g}zr++,Tt.n=0;const f=o*at+s,l=c*at+a,h=(g,p)=>{const v=Math.abs(g-a),y=Math.abs(p-c);return Math.max(v,y)+.414*Math.min(v,y)};ll[f]=zr,ba[f]=0,cl[f]=-1,Wh(f,h(s,o));let d=0;for(;Tt.n;){const g=jg();if(fl[g]===zr)continue;if(fl[g]=zr,g===l)break;if(++d>r)return null;const p=g%at,v=g/at|0;for(const[y,b,C]of Xg){const w=p+y,R=v+b;if(!hr(w,R)||y&&b&&(!hr(p+y,v)||!hr(p,v+b)))continue;const L=R*at+w,M=ba[g]+C;ll[L]===zr&&M>=ba[L]||(ll[L]=zr,ba[L]=M,cl[L]=g,Wh(L,M+h(w,R)))}}if(fl[l]!==zr)return null;const u=[];for(let g=l;g!==-1;g=cl[g])u.push([ci(g%at),ci(g/at|0)]);u.reverse();const _=[u[0]];let x=0;for(;x<u.length-1;){let g=x+1;for(;g+1<u.length&&gc(u[x][0],u[x][1],u[g+1][0],u[g+1][1]);)g++;_.push(u[g]),x=g}return _[_.length-1]=[n,i],_}const Kt=(t,...e)=>ct.emit("msg",{k:t,a:e}),Mn=(t,e)=>ct.emit(t,e),pi=(t,e,n,i,r)=>Mn("spark",{x:t,y:e,z:n,c:i,n:r}),Pt=(t,e,n)=>Mn("sfx",{name:t,x:e,z:n});function Yf(t,e=[1,1,1,1,0,0,0,0]){return Array.from({length:8},(n,i)=>({points:100,tickets:bp,caps:0,ctrlScore:0,gold:tf.startGold,alive:!0,plan:null,leaderDeadT:0,recruitT:ie(2,6),thinkT:0,human:!!t[i],active:!!e[i],order:"follow",holdPt:null,towerT:ie(0,1.4),leader:null,up:{foot1:0,foot2:0,arch1:0,arch2:0,aura:0,horse:0},arrowHits:0,shieldwallT:0,volleyCd:0,upT:ie(20,40)}))}function go(t,e,n,i,r=!1){const s=mn[i],o=i==="foot"||i==="captain"?Jf(t):i==="arch"?Pp(t):0,a=i==="foot"?_p[o]:i==="arch"?xp[o]:s,c=i==="captain"?vp[o]:null,f={id:++m.uid,ti:t,kind:i,leader:i==="captain",human:r,isMe:r&&t===m.myTi&&m.role!=="client",remote:r&&t!==m.myTi,x:e,z:n,y:vt(e,n),vx:0,vz:0,vy:0,face:Math.atan2(-e,-n),hp:a.hp+(c?c.hpB:0),max:a.hp+(c?c.hpB:0),dmg:(r?ef.dmg:a.dmg)+(c?c.dmgB:0),spd:r?ef.spd:a.spd,r:a.r,reach:a.reach+(c?c.reachB:0),block:a.block||0,range:a.range||0,shootBase:a.shoot||0,arrow:a.arrow||0,jitter:a.jitter||.8,javelin:c?c.javelin:!!a.javelin,javCd:0,tier:o,cd:ie(0,.6),shootCd:ie(0,1.5),swing:0,pending:null,stun:0,blockT:0,rt:ie(0,.3),foe:null,fd:1e9,dead:!1,deadT:0,trampleT:0,lastHit:-9,blocking:!1,aim:!1,mounted:!1,horse:null,summon:null,horseHp:ua(t),horseCd:0,carrying:!1,aura:!1,shieldwall:!1,kick:{n:0,vx:0,vz:0,st:0,dirty:!1},weapon:i==="captain"&&r?m.teams[t]&&m.teams[t].weapon||"sword":void 0,jy:0,jvy:0,jumpCd:0,javAmmo:wo.jav.ammo+o,javRegen:0,combo:0,lastSwingT:-9,atkBuf:0};return m.units.push(f),f}const Ao=t=>m.units.filter(e=>!e.dead&&e.ti===t&&!e.leader);function qg(t,e=[1,1,1,1,0,0,0,0]){m.layout=Xf(m.map.id,m.mode==="ctf",m.mode==="ctrl",m.seed),$f(m.layout),m.units=[],m.horses=[],m.arrows=[],m.T=0,m.kills=0,m.recruited=0,m.bounty=-1,m.uid=0,m.arrowN=0,m.endInfo=null,m.awarded=!1,m.teams=Yf(t,e),m.duo=[0,1,2,3].map(n=>!!e[n+4]),m.flag=m.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,m.ctrlPoints=m.mode==="ctrl"?Gp(m.layout):null;for(let n=0;n<8;n++){if(!m.teams[n].active)continue;const i=he[Te(n)],r=n>=4,[s,o]=Lr(i,r?9:0,7);m.teams[n].leader=go(n,s,o,"captain",m.teams[n].human),(m.fullSquads?Rg:Cg).slice(0,m.squadCap).forEach((c,f)=>{const[l,h]=Lr(i,(f%7-3)*1.4+(r?9:0),1.5+Math.floor(f/7)*1.4);go(n,l,h,c)})}m.player=m.teams[m.myTi].leader,m.state="play",Kt("start")}function Yg(t,e){const n=m.teams[t];n.order=e;const i=n.leader;e==="hold"&&i&&(n.holdPt={x:i.x,z:i.z,face:i.face,isFront:!0})}function to(t){const e=m.teams[t];return m.mode==="conquest"?m.teams[Te(t)].alive:m.mode==="dm"?e.tickets>0:!0}function Kf(t,e){const n=m.teams[t],i=mn[e].cost;if(!to(t)||n.gold<i||Ao(t).length>=m.squadCap)return!1;n.gold-=i;const[r,s]=Lr(he[Te(t)],ie(-2,2)+(t>=4?9:0));return go(t,r,s,e),t===m.myTi&&(m.recruited++,Pt("coin")),!0}const mi=(t,e)=>m.teams[t]&&m.teams[t].up?m.teams[t].up[e]:0,ua=t=>Pg+30*mi(t,"horse"),_c=t=>Lg-4*mi(t,"horse"),Rp=t=>uc.range+uc.perRange*mi(t,"aura"),af=t=>uc.bonus+uc.perBonus*mi(t,"aura"),Jf=t=>Math.min(2,mi(t,"foot1")+mi(t,"foot2")),Pp=t=>Math.min(2,mi(t,"arch1")+mi(t,"arch2")),ta=(t,e)=>{const n=Ri.find(r=>r.id===e);if(!n)return null;const i=mi(t,e);return i>=n.cost.length?null:n.cost[i]};function Kg(t){const e=Jf(t),n=_p[e],i=vp[e];for(const r of m.units)if(!(r.dead||r.ti!==t)){if(r.kind==="foot"){const s=n.hp;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=n.dmg,r.reach=n.reach,r.block=n.block,r.spd=n.spd,r.javelin=n.javelin,r.tier=e}else if(r.leader){const s=mn.captain.hp+i.hpB;r.hp=Math.min(s,Math.max(1,r.hp+(s-r.max))),r.max=s,r.dmg=(r.human?ef.dmg:mn.captain.dmg)+i.dmgB,r.reach=mn.captain.reach+i.reachB,r.javelin=i.javelin,r.tier=e}}}function Jg(t){const e=Pp(t),n=xp[e];for(const i of m.units){if(i.dead||i.ti!==t||i.kind!=="arch")continue;const r=n.hp;i.hp=Math.min(r,Math.max(1,i.hp+(r-i.max))),i.max=r,i.dmg=n.dmg,i.spd=n.spd,i.range=n.range,i.shootBase=n.shoot,i.arrow=n.arrow,i.jitter=n.jitter,i.tier=e}}function Zf(t,e){const n=m.teams[t],i=ta(t,e);return!n||i==null||n.gold<i||!Ri.some(r=>r.id===e)||e==="foot2"&&mi(t,"foot1")<1||e==="arch2"&&mi(t,"arch1")<1?!1:(n.gold-=i,n.up[e]++,(e==="foot1"||e==="foot2")&&Kg(t),(e==="arch1"||e==="arch2")&&Jg(t),e==="horse"&&n.leader&&!n.leader.mounted&&(n.leader.horseHp=ua(t)),e==="horse"&&n.leader&&n.leader.horseCd>_c(t)&&(n.leader.horseCd=_c(t)),t===m.myTi&&(Pt("coin"),Kt("upgrade",t,e,n.up[e])),!0)}const Lp=t=>{const e=m.teams[t],n=e.leader,i=n&&!n.dead;return e.human?e.order||"follow":e.shieldwallT>0&&i?"shieldwall":i?"follow":"charge"};function Ip(t){const e=m.teams[t];return m.mode==="conquest"?m.teams[Te(t)].alive:m.mode==="dm"?e.tickets>0:!0}function Vc(t,e,n,i){t.remote?(t.kick.vx+=e,t.kick.vz+=n,t.kick.st=Math.max(t.kick.st,i||0),t.kick.dirty=!0):(t.vx+=e,t.vz+=n),i&&(t.stun=Math.max(t.stun,i))}function Ji(t){let e=t.spd;return t.mounted&&(e*=1.8*(1+.05*mi(t.ti,"horse"))),t.leader||(t.aura&&(e*=1+af(t.ti)*.5),t.shieldwall&&(e*=.55)),t.carrying&&(e*=.7),Tp(t.x,t.z)&&(e*=.6),t.human&&t.blocking&&!t.mounted&&(e*=.5),e}function Dp(t){if(t.mounted||t.summon||t.horseCd>0||t.dead||t.carrying||m.T-t.lastHit<2)return!1;const e=t.face+Math.PI+ie(-.6,.6),n=Jt(t.x+Math.sin(e)*14,-86,86),i=Jt(t.z+Math.cos(e)*14,-86,86),r={id:++m.horseN,x:n,z:i,face:Math.atan2(t.x-n,t.z-i),state:"coming",rider:t,t:0,spd:0,ti:t.ti,fall:1};return m.horses.push(r),t.summon=r,t.isMe&&Pt("neigh"),!0}function Zg(t,e){t.jy=0,t.jvy=0,t.summon=null,t.mounted=!0,t.horse=e,e.state="ridden",t.r=.95,t.isMe&&Mn("float",{x:t.x,y:t.y+3.4,z:t.z,text:"Mounted",color:"#fff"})}function us(t,e){if(!t.mounted)return;const n=t.horse;t.mounted=!1,t.horse=null,t.r=mn.captain.r,e?(n.state="dead",n.t=0,n.fall=Math.random()<.5?1:-1,t.horseCd=_c(t.ti),t.horseHp=ua(t.ti),Vc(t,Math.sin(t.face+Math.PI/2)*5,Math.cos(t.face+Math.PI/2)*5,1),t.human&&Kt("horseDown",t.ti)):(n.state="leaving",n.t=0)}function Qf(t,e){t.horseHp-=e,pi(t.x,t.y+1.3,t.z,"#d42a1e",5),Pt("hit",t.x,t.z),t.horseHp<=0&&us(t,!0)}const kp=(t,e)=>m.units.some(n=>!n.dead&&kn(n,t)&&n.kind==="foot"&&n.tier>=1&&Math.hypot(n.x-t.x,n.z-t.z)<e),Up=t=>t.kind==="foot"&&t.tier>=1&&t.stun<=0&&Math.hypot(t.vx,t.vz)<2.2;function Np(t){if(!(!t||t.dead)){if(t.mounted){us(t,!1);return}if(!t.summon){if(t.carrying){Kt("rideNo",t.ti,"banner");return}if(t.horseCd>0){Kt("rideNo",t.ti,"rest",Math.ceil(t.horseCd));return}if(m.T-t.lastHit<2){Kt("rideNo",t.ti,"hot");return}Dp(t)}}}function Si(t,e,n){let i=null,r=e*e;for(const s of m.units){if(s.dead||!kn(s,t)||n&&!n(s))continue;const o=s.x-t.x,a=s.z-t.z,c=o*o+a*a;c<r&&(r=c,i=s)}return[i,Math.sqrt(r)]}function zp(t){if(m.mode!=="conquest")return[-1,1e9];let e=-1,n=1e9;for(let i=0;i<4;i++){if(!ti(i,t.ti)||!m.teams[i].alive)continue;const r=Math.hypot(he[i].pos[0]-t.x,he[i].pos[1]-t.z);r<n&&(n=r,e=i)}return[e,n]}const xc=t=>m.teams[t]&&m.teams[t].human?1:Mp[m.diff].dmg;function $i(t,e){return t.cd>0||t.stun>0||t.dead||t.carrying?!1:(t.swing=.38,t.cd=(t.leader?t.mounted?.8:.6:mn[t.kind].cd)*ie(.9,1.15),t.pending={t:.15,target:e},Pt("swing",t.x,t.z),!0)}function Op(t){t.cd>0||t.stun>0||t.dead||(t.swing=.38,t.cd=.8,t.pending={t:.15,sweep:!0},Pt("swing",t.x,t.z))}function Qg(t){const e=t.pending,n=e.target;t.pending=null;const i=e.mult||1;if(e.leap){e_(t);return}if(e.sweep){const a=i*.8*(1+Math.hypot(t.vx,t.vz)/12);for(const c of m.units)c.dead||!kn(c,t)||Math.hypot(c.x-t.x,c.z-t.z)>3.1+(e.reachB||0)||Math.abs(_n(t.face,Math.atan2(c.x-t.x,c.z-t.z)))>1.25||Xo(t,c,a);return}if(n&&n.castle!==void 0){const a=m.teams[n.castle];if(!a.alive||t.mounted||!ti(n.castle,t.ti)||Math.hypot(he[n.castle].pos[0]-t.x,he[n.castle].pos[1]-t.z)>mr+.8)return;a.points-=t.human?1.3:t.leader?.7:t.kind==="arch"?.08:.2,Pt("wall",t.x,t.z),pi(t.x+Math.sin(t.face)*1.2,1.4,t.z+Math.cos(t.face)*1.2,"#cfc8b8",5),a.points<=0&&n_(n.castle,t.ti);return}const r=t.reach+(e.reachB||0),s=e.kb?{kb:e.kb}:void 0;let o=!1;if(n&&!n.dead&&Math.hypot(n.x-t.x,n.z-t.z)<=t.r+n.r+r+.5&&(Xo(t,n,i,s),o=!0),e.cleave){let a=0;for(const c of m.units)if(!(c===n||c.dead||!kn(c,t))&&!(Math.hypot(c.x-t.x,c.z-t.z)>t.r+c.r+r+.3)&&!(Math.abs(_n(t.face,Math.atan2(c.x-t.x,c.z-t.z)))>1.1)&&(Xo(t,c,i*.8,s),++a>=2))break}if(e.pierce&&o){for(const a of m.units)if(!(a===n||a.dead||!kn(a,t))&&!(Math.hypot(a.x-t.x,a.z-t.z)>t.r+a.r+r+1.3)&&!(Math.abs(_n(t.face,Math.atan2(a.x-t.x,a.z-t.z)))>.35)){Xo(t,a,i*e.pierce,s);break}}}function e_(t){const e=wo.leap,n=t.x+Math.sin(t.face)*1.2,i=t.z+Math.cos(t.face)*1.2;pi(n,vt(n,i)+.2,i,"#c9b28a",14),Pt("trample",n,i),t.isMe&&(Mn("shake",.45),Mn("buzz",40));for(const r of m.units)r.dead||!kn(r,t)||Math.hypot(r.x-t.x,r.z-t.z)>e.range+r.r||Math.abs(_n(t.face,Math.atan2(r.x-t.x,r.z-t.z)))>e.arc||Xo(t,r,e.mult,{stun:e.stun,kb:1.3,unblockable:!0})}function Xo(t,e,n=1,i){if(!kn(t,e))return;let r=t.dmg*ie(.8,1.2)*n*xc(t.ti);!t.leader&&t.aura&&(r*=1+af(t.ti)),t.y-e.y>.8&&(r*=1.2),e.lastHit=m.T;const s=t.kind==="foot"&&t.tier>=1||t.leader&&t.weapon==="spear";if(e.mounted&&(s||Math.random()<.5)){Qf(e,r*(s?3:1));return}let o=(t.leader?t.mounted?9:7:4.5)*(i&&i.kb||1);const a=Math.abs(_n(e.face,Math.atan2(t.x-e.x,t.z-e.z)))<1.1;let c=!1;a&&e.stun<=0&&!e.mounted&&!e.carrying&&!(i&&i.unblockable)&&(e.human?c=e.blocking:Math.random()<(e.block||0)+(e.aura?af(e.ti):0)+(e.shieldwall&&e.kind==="foot"?.3:0)&&(c=!0,e.blockT=.45));const f=(t.x+e.x)/2,l=(t.z+e.z)/2,h=(t.y+e.y)/2+1.2;if(c?(r*=e.human?.12:.25,o*=.4,pi(f,h,l,"#fff3b0",7),Pt("clang",f,l),e.blockT=Math.max(e.blockT,.2),e.isMe&&Mn("buzz",15)):(pi(f,h,l,he[Te(e.ti)].css,6),Pt("hit",f,l),Math.random()<.4&&Mn("splat",{x:e.x+ie(-.4,.4),z:e.z+ie(-.4,.4),s:ie(.6,1.1),ti:e.ti}),e.isMe&&(Mn("shake",.35),Mn("buzz",35))),e.hp-=r,t.isMe){const u=!c&&(n>=1.35||e.hp<=0);Mn("hitstop",c?.03:u?.1:.055),u&&Pt("heavy",f,l)}const d=Math.atan2(e.x-t.x,e.z-t.z);Vc(e,Math.sin(d)*o,Math.cos(d)*o,c?0:i&&i.stun||.22),e.hp<=0&&ih(e,t,d,n>=1.35||i&&i.unblockable||t.leader&&Math.random()<.18?1:0)}function eh(t,e,n=1.6){const i=t.jitter||.8,r=.35+Math.hypot(e.x-t.x,e.z-t.z)/30,s=e.x+e.vx*r+ie(-i,i),o=e.z+e.vz*r+ie(-i,i),a=Math.hypot(s-t.x,o-t.z),c=(t.y||0)+n;m.arrows.push(nh({id:++m.arrowN,x0:t.x,y0:c,z0:t.z,x1:s,z1:o,y1:vt(s,o)+1.1,dur:.25+a/28,peak:Math.min(6,a*.16),ti:t.ti,t:0,shooter:t})),t.tower||(t.swing=.38),Pt("bow",t.x,t.z)}function th(t,e,n){const i=Math.hypot(e.x-t.x,e.z-t.z),r=(t.y||0)+1.5;m.arrows.push(nh({id:++m.arrowN,x0:t.x,y0:r,z0:t.z,x1:e.x,z1:e.z,y1:vt(e.x,e.z)+1.1,dur:.18+i/22,peak:Math.min(3.5,i*.09),ti:t.ti,t:0,shooter:t,javelin:!0,jd:n})),t.javCd=Hc.cd,t.swing=.3,Pt("bow",t.x,t.z)}function nh(t){return t.x=t.x0,t.y=t.y0,t.z=t.z0,t.px=t.x0,t.py=t.y0,t.pz=t.z0,t}function t_(t,e){const n=t.shooter;let i,r="body";if(t.javelin)i=(t.jd||Hc.dmg)*ie(.85,1.15)*xc(t.ti);else{i=(n&&n.arrow!=null?n.arrow:mn.arch.arrow)*ie(.8,1.2)*xc(t.ti);const c=n&&n.jitter!=null?n.jitter:.8,f=.08+(1-c)*.22,l=Math.random();l<f?(i*=1.8,r="head"):l>.82&&(i*=.6,r="legs")}m.teams[e.ti]&&m.teams[e.ti].arrowHits++;const s=Math.abs(_n(e.face,Math.atan2(t.x0-e.x,t.z0-e.z)))<1.1;if(e.shieldwall&&s&&(e.kind==="foot"||Math.random()<.6)){pi(e.x,e.y+2.2,e.z,"#e8d9b0",4),Pt("thud",e.x,e.z);return}if(e.lastHit=m.T,e.mounted&&Math.random()<.6){Qf(e,i);return}let o=!1;if(s&&!e.mounted&&!e.carrying&&r!=="head"&&(e.kind==="foot"&&Math.random()<.7&&(o=!0),e.leader&&(e.human?e.blocking:Math.random()<.35)&&(o=!0)),o){pi(e.x,e.y+1.3,e.z,"#e8d9b0",4),Pt("thud",e.x,e.z),e.blockT=Math.max(e.blockT,.2);return}e.hp-=i,pi(e.x,e.y+1.3,e.z,he[Te(e.ti)].css,4),Pt("hit",e.x,e.z),Vc(e,0,0,.12),e.isMe&&(Mn("shake",.25),Mn("buzz",20));const a=t.shooter;e.hp<=0&&ih(e,a&&!a.dead&&!a.tower?a:{ti:t.ti,human:!1},Math.atan2(e.x-t.x0,e.z-t.z0))}function ih(t,e,n,i=0){if(t.dead)return;if(t.dead=!0,t.deadT=0,i){const s=ie(8.5,12);t.vx+=Math.sin(n)*s,t.vz+=Math.cos(n)*s,t.vy=ie(9,12),t.launch=!0,Pt("whee",t.x,t.z)}else t.vx+=Math.sin(n)*6,t.vz+=Math.cos(n)*6,t.vy=ie(3,6);t.fallDir=Math.random()<.5?1:-1,Mn("splat",{x:t.x,z:t.z,s:ie(1,1.5),ti:t.ti}),Pt("die",t.x,t.z),t.mounted&&us(t,!1),t.summon&&(t.summon.state="leaving",t.summon.t=0,t.summon=null),t.carrying&&h_(t);const r=m.teams[t.ti];if(m.mode==="dm"&&(r.tickets=Math.max(0,r.tickets-(t.leader?5:1)),r.tickets<=0&&r.alive&&(r.alive=!1,Kt("tickets0",t.ti))),e){const s=m.mode==="dm"&&t.leader&&t.ti===m.bounty,o=t.leader?s?50:25:8;m.teams[e.ti].gold+=o,e.human&&e.ti===m.myTi&&m.kills++,e.human&&Kt("gold",e.ti,Math.round(t.x*10)/10,Math.round(t.z*10)/10,o),s&&Kt("bountyClaimed",e.ti),t.leader&&Kt("capDown",t.ti,e.ti)}t.leader&&(r.leaderDeadT=t.human?5:9,t.human&&Kt("fell",t.ti,Ip(t.ti)?1:0)),Wc()}function n_(t,e){const n=m.teams[t];n.alive=!1,n.points=0,Kt("castleDown",t,e),Wc()}function Fp(t){const e=m.teams[t];return m.mode==="conquest"?!m.teams[Te(t)].alive:m.mode==="dm"?!e.alive&&!m.units.some(n=>!n.dead&&n.ti===t):!1}const rh=t=>m.duo[t]?[t,t+4]:[t],Bp={dm:"tickets",ctf:"caps",ctrl:"ctrlScore"};function i_(t){if(m.mode==="conquest")return m.teams[t].points;const e=Bp[m.mode];return rh(t).reduce((n,i)=>n+m.teams[i][e],0)}const r_=t=>rh(t).every(e=>Fp(e)),s_=t=>rh(t).some(e=>m.teams[e].human),o_=t=>{const e=m.teams[t];return m.mode==="conquest"?m.teams[Te(t)].points:e[Bp[m.mode]]},Hp=t=>m.teams.reduce((e,n,i)=>e+(m.ALLY[Te(i)]===t?n.caps:0),0),a_=t=>m.teams.reduce((e,n,i)=>e+(m.ALLY[Te(i)]===t?n.ctrlScore:0),0),c_=()=>[...new Set(Vf().filter(t=>!Fp(t)).map(t=>m.ALLY[Te(t)]))];function Wc(){if(!(m.state!=="play"||m.role==="client")){if(m.mode==="conquest"||m.mode==="dm"){const t=c_();if(t.length===1)return xr(t[0],m.mode==="conquest"?"castles":"tickets");if(t.length===0)return xr(-1,"time")}if(m.mode==="ctf"){for(const t of new Set(m.ALLY))if(Hp(t)>=ea)return xr(t,"caps")}if(m.mode==="ctrl"){for(const t of new Set(m.ALLY))if(a_(t)>=Tr.win)return xr(t,"control")}}}function l_(){if(m.state!=="play"||m.T<hs[m.mode].time)return;const t={};if(m.mode==="conquest")for(let n=0;n<4;n++)m.teams[n].alive&&(t[m.ALLY[n]]=(t[m.ALLY[n]]||0)+m.teams[n].points);else for(const n of Vf())t[m.ALLY[Te(n)]]=(t[m.ALLY[Te(n)]]||0)+o_(n);const e=Object.entries(t).map(([n,i])=>[+n,i]).sort((n,i)=>i[1]-n[1]);if(!e.length||e.length>1&&e[0][1]===e[1][1])return xr(-1,"time");xr(e[0][0],"time")}function xr(t,e){m.state==="play"&&(m.state="end",m.endInfo={w:t,why:e},ct.emit("end",m.endInfo))}function Gp(t){return t.ctrlSpots.map(e=>({...e,owner:-1,prog:0}))}function f_(t){const e=m.ctrlPoints;if(e){for(const n of e){const i={};for(const c of m.units)c.dead||c.mounted||Math.hypot(c.x-n.x,c.z-n.z)>Tr.radius||(i[c.ti]=(i[c.ti]||0)+1);const r=Object.entries(i).map(([c,f])=>[+c,f]).sort((c,f)=>f[1]-c[1]),s=r[0],o=r[1]&&r[1][1]===s[1],a=s&&!o?s[0]:null;if(a==null||a===n.owner){n.prog=0;continue}n.capturer=a,n.prog+=t/Tr.captureTime,n.prog>=1&&(n.owner=a,n.prog=0,Kt("pointCaptured",a,n.letter))}for(const n of e)n.owner>=0&&m.teams[n.owner]&&m.teams[n.owner].active&&(m.teams[n.owner].ctrlScore+=Tr.rate*t);Wc()}}function h_(t){const e=m.flag;t.carrying=!1,e.state="dropped",e.carrier=null,e.x=t.x,e.z=t.z,e.dropT=10,Kt("flagDropped",t.ti)}function d_(t){const e=m.flag;if(e){if(e.state==="carried"){const n=e.carrier,i=he[Te(n.ti)];Math.hypot(n.x-i.pos[0],n.z-i.pos[1])<Qo+3.5&&(m.teams[n.ti].caps++,m.teams[n.ti].gold+=50,n.carrying=!1,e.state="home",e.carrier=null,e.x=0,e.z=0,Kt("capture",n.ti),m.teams.forEach(r=>r.thinkT=0),Wc());return}e.state==="dropped"&&(e.dropT-=t,e.dropT<=0&&(e.state="home",e.x=0,e.z=0,Kt("flagHome")));for(const n of m.units)if(!(n.dead||!n.leader||Math.hypot(n.x-e.x,n.z-e.z)>=1.9)){if(n.mounted){n.isMe&&Mn("hint","Get off your horse to take it");continue}n.summon&&(n.summon.state="leaving",n.summon.t=0,n.summon=null),n.carrying=!0,e.state="carried",e.carrier=n,m.teams.forEach(i=>i.thinkT=0),Kt("flagTaken",n.ti);break}}}function Vp(t,e=3.4){let n=null,i=1e9;for(const r of m.units){if(r.dead||!kn(r,t))continue;const s=Math.hypot(r.x-t.x,r.z-t.z);if(s>e)continue;const o=s+Math.abs(_n(t.face,Math.atan2(r.x-t.x,r.z-t.z)))*1.5;o<i&&(i=o,n=r)}return n}const Yt=wo,Wp=t=>Yt.jav.ammo+Jf(t),jp=t=>(t.jy||0)>.25,u_=t=>t.weapon==="spear"?Yt.spear.aim:Yt.sword.aim;function Xp(t){return!t||t.dead||t.mounted||t.stun>0||t.jy>0||t.jvy>0||t.jumpCd>0||t.carrying?!1:(t.jvy=Yt.jump.v,t.jy=.001,Pt("jump",t.x,t.z),!0)}function $p(t,e){t.jumpCd>0&&(t.jumpCd-=e),!(!(t.jy>0)&&!(t.jvy>0))&&(t.jvy-=Yt.jump.g*e,t.jy+=t.jvy*e,t.jy<=0&&(t.jy=0,t.jvy=0,t.jumpCd=Yt.jump.cd,Pt("land",t.x,t.z),pi(t.x,vt(t.x,t.z)+.1,t.z,"#c9b28a",4)))}function p_(t,e){if(!t||t.dead)return null;const n=js.includes(e)?e:js[(js.indexOf(t.weapon||"sword")+1)%js.length];return t.weapon=n,t.combo=0,t.cd=Math.max(t.cd,.12),m.teams[t.ti]&&(m.teams[t.ti].weapon=n),n}function qp(t){let e=null,n=1e9;for(const r of m.units){if(r.dead||!kn(r,t))continue;const s=Math.hypot(r.x-t.x,r.z-t.z);if(s>Yt.jav.range||s<1.2)continue;const o=Math.abs(_n(t.face,Math.atan2(r.x-t.x,r.z-t.z)));if(o>.6)continue;const a=s+o*10;a<n&&(n=a,e=r)}if(!e)return{x:t.x+Math.sin(t.face)*12,z:t.z+Math.cos(t.face)*12,foe:null};const i=(.18+Math.hypot(e.x-t.x,e.z-t.z)/22)*.8;return{x:e.x+e.vx*i,z:e.z+e.vz*i,foe:e}}function jh(t){if((t.javAmmo||0)<1)return!1;const e=qp(t);return t.face=Math.atan2(e.x-t.x,e.z-t.z),th(t,e,Yt.jav.dmg),t.javAmmo--,t.javRegen<=0&&(t.javRegen=Yt.jav.regen),t.cd=Yt.jav.cd,t.swing=.38,t.swingKind=4,!0}function m_(t){t.leaps=(t.leaps||0)+1,t.swing=.38,t.cd=Yt.leap.cd,t.pending={t:.1,leap:!0},t.swingKind=2,t.jvy=Math.min(t.jvy,-9),t.vx+=Math.sin(t.face)*3,t.vz+=Math.cos(t.face)*3,Pt("swing",t.x,t.z)}function rs(t){if(!t||t.dead||t.carrying)return;if(t.cd>0||t.stun>0){t.atkBuf=.4;return}t.atkBuf=0;const e=t.weapon||"sword";if(t.mounted){if(e==="jav"&&jh(t))return;Op(t),t.pending&&e==="spear"&&(t.pending.mult=1.3,t.pending.reachB=.8);return}if(jp(t)){m_(t);return}if(e==="jav"){if(jh(t))return;t.weapon="sword",m.teams[t.ti]&&(m.teams[t.ti].weapon="sword"),t.isMe&&Mn("float",{x:t.x,y:t.y+3.2,z:t.z,text:"Out of javelins",color:"#fff"})}const n=t.weapon==="spear",i=Yt.sword,r=Vp(t,n?Yt.spear.aim:i.aim);let s=r;if(!r){const[o,a]=zp(t);o>=0&&a<mr+.6&&(s={castle:o},t.face=Math.atan2(he[o].pos[0]-t.x,he[o].pos[1]-t.z))}if($i(t,s)){if(t.pending.t=.12,r){const o=Math.atan2(r.x-t.x,r.z-t.z),a=Math.hypot(r.x-t.x,r.z-t.z);t.face=o;const c=t.r+r.r+t.reach+(n?Yt.spear.reachB:0)-.2;a>c&&(t.vx+=Math.sin(o)*4,t.vz+=Math.cos(o)*4)}if(n)Object.assign(t.pending,{mult:Yt.spear.mult,reachB:Yt.spear.reachB,pierce:Yt.spear.pierce,kb:.8}),t.cd=Yt.spear.cd,t.combo=0,t.swingKind=3;else{const o=m.T-t.lastSwingT<i.window?(t.combo+1)%3:0,a=o===2;Object.assign(t.pending,{mult:a?i.finisherMult:i.mult,cleave:a,kb:a?1.25:.4}),t.cd=a?i.finisherCd:i.cd,t.combo=o,t.swingKind=o}t.lastSwingT=m.T}}function Yp(t){const e=m.teams[t];if(!e||!e.active||e.volleyCd>0)return!1;let n=!1;for(const i of m.units)if(!(i.dead||i.ti!==t||i.stun>0)){if(i.kind==="arch"){const r=i.range*(i.y>2.2?1.3:1),[s]=Si(i,r);s&&(i.face=Math.atan2(s.x-i.x,s.z-i.z),eh(i,s),i.shootCd=i.shootBase*ie(.85,1.2),n=!0)}else if(i.kind==="foot"&&i.javelin&&i.javCd<=0){const[r]=Si(i,Hc.range,s=>!s.mounted);r&&(i.face=Math.atan2(r.x-i.x,r.z-i.z),th(i,r),n=!0)}}return n&&(e.volleyCd=wg.cd),n}let cf=0;function g_(t,e,n){const i=t.nav||(t.nav={next:0,direct:!0,pts:null,i:0,gx:1e9,gz:1e9,repath:0,skipT:0});if(m.T>=i.next){i.next=m.T+.25+Math.random()*.15;const[c,f]=Wg(e,n,t.x,t.z);i.direct=gc(t.x,t.z,c,f),i.ox=c,i.oz=f}if(i.direct)return i.pts=null,[e,n];const r=i.ox,s=i.oz;if((m.T>i.repath||Math.hypot(r-i.gx,s-i.gz)>4)&&cf>0&&(cf--,i.pts=$g(t.x,t.z,r,s),i.i=of(t.x,t.z)?1:0,i.gx=r,i.gz=s,i.repath=m.T+(i.pts?2+Math.random():1.5+Math.random())),!i.pts||i.pts.length<2)return[e,n];const o=i.pts;for(;i.i<o.length-1&&Math.hypot(o[i.i][0]-t.x,o[i.i][1]-t.z)<(i.i?1.3:.5);)i.i++;i.i<o.length-1&&m.T>=i.skipT&&(i.skipT=m.T+.3,gc(t.x,t.z,o[i.i+1][0],o[i.i+1][1])&&i.i++);const a=o[Math.min(i.i,o.length-1)];return i.i>=o.length-1?[e,n]:[a[0],a[1]]}function Di(t,e,n,i,r,s=.3){const o=e-t.x,a=n-t.z,c=Math.hypot(o,a);let f=0,l=0;if(c>s){const d=i*Math.min(1,(c-s)/1.2+.2);f=o/c*d,l=a/c*d}const h=t.stun>0?1.5:t.mounted?4:10;return t.vx+=(f-t.vx)*Math.min(1,r*h),t.vz+=(l-t.vz)*Math.min(1,r*h),c}const Ln=(t,e,n,i,r=9)=>{t.face=po(t.face,Math.atan2(e-t.x,n-t.z),i*r)};function qn(t,e,n,i,r,s=.3){const[o,a]=g_(t,e,n);return Di(t,o,a,i,r,o===e&&a===n?s:.2),Math.hypot(o-t.x,a-t.z)>.6&&Ln(t,o,a,r,t.mounted?4:8),Math.hypot(e-t.x,n-t.z)}function __(t,e){const n=he[Te(t.ti)],i=Ao(t.ti).length;if(m.mode==="conquest"){const r=m.units.some(a=>!a.dead&&kn(a,t)&&Math.hypot(a.x-n.pos[0],a.z-n.pos[1])<22),s=e.plan&&e.plan.kind==="castle"?4:11;if(m.teams[Te(t.ti)].alive&&(r||i<s)){e.plan={kind:"defend"};return}let o=e.plan&&e.plan.kind==="castle"&&m.teams[e.plan.ti].alive&&Math.random()>.08?e.plan.ti:null;if(o==null){const a=[0,1,2,3].filter(c=>ti(c,t.ti)&&m.teams[c].alive).sort((c,f)=>Math.hypot(he[c].pos[0]-t.x,he[c].pos[1]-t.z)-Math.hypot(he[f].pos[0]-t.x,he[f].pos[1]-t.z));a.length&&(o=a[Math.random()<.7?0:Math.min(1,a.length-1)])}e.plan=o==null?{kind:"defend"}:{kind:"castle",ti:o}}else if(m.mode==="dm"){const r=e.plan&&e.plan.kind==="hunt"?3:9;if(i<r&&e.tickets>0){e.plan={kind:"defend"};return}const[s]=Si(t,400,c=>c.leader),[o]=Si(t,400),a=m.bounty>=0&&ti(m.bounty,t.ti)&&Math.random()<.5?m.teams[m.bounty].leader:null;e.plan={kind:"hunt",target:a&&!a.dead?a:s||o}}else if(m.mode==="ctrl"){const r=e.plan&&e.plan.kind==="point"?4:9;if(i<r){e.plan={kind:"defend"};return}const s=e.plan&&e.plan.kind==="point"?m.ctrlPoints[e.plan.id]:null;if(s&&s.owner!==t.ti&&Math.random()>.1)return;const o=m.ctrlPoints.filter(a=>a.owner!==t.ti).sort((a,c)=>Math.hypot(a.x-t.x,a.z-t.z)-Math.hypot(c.x-t.x,c.z-t.z));e.plan=o.length?{kind:"point",id:o[0].id}:{kind:"defend"}}else{const r=m.flag;t.carrying?e.plan={kind:"home"}:r.state==="carried"?e.plan={kind:kn(r.carrier,t)?"hunt":"escort",target:r.carrier}:e.plan={kind:"banner"}}}function x_(t,e){const n=e.plan;if(!n)return null;const i=he[Te(t.ti)],r=t.ti>=4;switch(n.kind){case"defend":{const[s,o]=Lr(i,r?9:0,1);return{x:s,z:o,stop:1.5}}case"castle":return{x:he[n.ti].pos[0],z:he[n.ti].pos[1],stop:mr-.8,castle:n.ti};case"hunt":case"escort":return n.target&&!n.target.dead?{x:n.target.x,z:n.target.z,stop:n.kind==="escort"?3:1.5}:null;case"home":{const[s,o]=Lr(i);return{x:s,z:o,stop:.5}}case"banner":return{x:m.flag.x,z:m.flag.z,stop:.2};case"point":{const s=m.ctrlPoints&&m.ctrlPoints[n.id];return s?{x:s.x,z:s.z,stop:Tr.radius*.6}:null}}return null}function v_(t,e){if(t.carrying){t.mounted&&us(t,!1);return}!t.mounted&&!t.summon&&e>30&&!(t.foe&&t.fd<14)&&Dp(t);const n=m.teams[t.ti].plan&&m.teams[t.ti].plan.kind;t.mounted&&(e<(n==="hunt"?6:12)||kp(t,m.diff===2?11:7))&&us(t,!1)}function y_(t,e,n,i){const r=m.diff>=2;if(t.weapon||(t.weapon="sword"),t.wpnT=(t.wpnT||0)-i,t.leapT=(t.leapT||0)-i,t.wpnT<=0){t.wpnT=r?ie(.8,1.4):ie(1.6,2.6);const a=e.mounted||m.units.some(c=>!c.dead&&c.mounted&&kn(c,t)&&Math.hypot(c.x-t.x,c.z-t.z)<12)?"spear":n>4.5&&t.javAmmo>=1?"jav":r||Math.random()<.5?"sword":"spear";a!==t.weapon&&(t.weapon=a,t.combo=0,t.cd=Math.max(t.cd,.25))}if(t.weapon==="jav")if(t.javAmmo<1||n<3)t.weapon="sword",t.wpnT=ie(.6,1.2);else{Di(t,t.x,t.z,0,i),Ln(t,e.x,e.z,i,10),t.cd<=0&&Math.abs(_n(t.face,Math.atan2(e.x-t.x,e.z-t.z)))<.3&&(rs(t),r||(t.cd+=.5));return}const s=t.r+e.r+t.reach+(t.weapon==="spear"?wo.spear.reachB:0);if(qn(t,e.x,e.z,Ji(t),i,s*.7),Ln(t,e.x,e.z,i),t.jy>0){t.jvy<2&&t.cd<=0&&rs(t);return}t.leapT<=0&&n<3.4&&t.jumpCd<=0&&t.stun<=0&&(t.leapT=r?ie(2.5,4):ie(7,11),m.units.filter(a=>!a.dead&&kn(a,t)&&Math.hypot(a.x-t.x,a.z-t.z)<3.6&&Math.abs(_n(t.face,Math.atan2(a.x-t.x,a.z-t.z)))<1.2).length>=2&&(r||Math.random()<.5)&&Xp(t))||n<s&&t.cd<=0&&t.stun<=0&&(rs(t),r||(t.cd+=.2))}function M_(t,e,n){e.thinkT-=n,(e.thinkT<=0||!e.plan)&&(e.thinkT=ie(1.2,2.4),__(t,e));const i=t.foe,r=t.fd;if(i&&r<(t.mounted?12:10)&&!t.carrying&&!(e.plan&&e.plan.kind==="escort"&&r>5)){if(t.mounted){kp(t,7)&&us(t,!1);const a=1/Math.max(r,.1);qn(t,i.x+(i.x-t.x)*a*4,i.z+(i.z-t.z)*a*4,Ji(t),n,.1),r<3&&Op(t)}else m.diff>=1?y_(t,i,r,n):(qn(t,i.x,i.z,Ji(t),n,t.r+i.r+t.reach*.6),Ln(t,i.x,i.z,n),r<t.r+i.r+t.reach&&$i(t,i));return}const s=x_(t,e);if(!s){Di(t,t.x,t.z,0,n),e.thinkT=Math.min(e.thinkT,.3);return}v_(t,Math.hypot(s.x-t.x,s.z-t.z));const o=qn(t,s.x,s.z,Ji(t),n,s.stop);s.castle!=null?o<mr&&!t.mounted&&(Ln(t,s.x,s.z,n,6),$i(t,{castle:s.castle})):e.plan.kind==="defend"&&o<2&&Ln(t,0,0,n,3)}function b_(t,e,n,i,r){const o=Math.floor(n/5),a=(n%5-2)*1.45,c=i?e?2+o*1.5:1.8+Math.ceil(r/5)*1.5+o*1.5:e?-(2.2+o*1.5):1.8+o*1.5,f=t.face,l=Math.sin(f),h=Math.cos(f),d=Math.cos(f),u=-Math.sin(f);return[t.x-l*c+d*a,t.z-h*c+u*a]}function S_(t,e,n){const r=Math.floor(n/9),s=(n%9-8/2)*.95,o=e?-(1.6+r*1.1):1.6+r*1.1,a=t.face,c=Math.sin(a),f=Math.cos(a),l=Math.cos(a),h=-Math.sin(a);return[t.x-c*o+l*s,t.z-f*o+h*s]}function T_(t,e){const n=m.teams[t.ti],i=n.leader,r=i&&!i.dead,s=Lp(t.ti);if(s==="shieldwall"&&r){t.aim=!1;const _=t.foe;_&&t.fd<t.r+_.r+t.reach&&(Ln(t,_.x,_.z,e),$i(t,_));const[x,g]=S_(i,!!i.human,t.tslot||0);qn(t,x,g,Ji(t)*(Math.hypot(x-t.x,g-t.z)>5?1.5:1),e,.15)<1&&!(_&&t.fd<3)&&(t.face=po(t.face,i.face,e*6));return}const o=t.kind==="arch"?t.range*(t.y>2.2?1.3:1):0;if(t.aim=!1,t.kind==="foot"&&t.tier>=1&&s!=="charge"){const[_,x]=Si(t,9,g=>g.mounted);if(_){Di(t,t.x,t.z,0,e),Ln(t,_.x,_.z,e,10),x<t.r+_.r+t.reach&&$i(t,_);return}}const a=s==="charge"?45:t.kind==="arch"?o:s==="hold"?8:10,c=t.foe,f=t.fd,l=s==="follow"&&r&&c&&Math.hypot(c.x-i.x,c.z-i.z)>18;if(c&&f<a&&!l){t.kind==="arch"?f<t.r+c.r+t.reach?($i(t,c),Ln(t,c.x,c.z,e),Di(t,t.x,t.z,0,e)):f<5.5?(Di(t,t.x-(c.x-t.x),t.z-(c.z-t.z),t.spd,e),Ln(t,c.x,c.z,e,6)):f<=o?(t.aim=!0,Di(t,t.x,t.z,0,e),Ln(t,c.x,c.z,e,8),t.shootCd<=0&&t.stun<=0&&Math.abs(_n(t.face,Math.atan2(c.x-t.x,c.z-t.z)))<.3&&(eh(t,c),t.shootCd=t.shootBase*ie(.85,1.2))):qn(t,c.x,c.z,Ji(t),e,o*.8):t.javelin&&t.javCd<=0&&f>t.r+c.r+t.reach+.3&&f<Hc.range&&!c.mounted?(Di(t,t.x,t.z,0,e),Ln(t,c.x,c.z,e,8),Math.abs(_n(t.face,Math.atan2(c.x-t.x,c.z-t.z)))<.3&&th(t,c)):(qn(t,c.x,c.z,Ji(t),e,t.r+c.r+t.reach*.7),Ln(t,c.x,c.z,e),f<t.r+c.r+t.reach&&$i(t,c));return}const[h,d]=zp(t);if(s==="charge"){if(m.mode==="conquest"&&h>=0){const _=he[h].pos;qn(t,_[0],_[1],t.spd,e,mr-1),d<mr&&(Ln(t,_[0],_[1],e,6),$i(t,{castle:h}))}else if(m.mode==="ctf"){const _=m.flag,x=_.state==="carried"&&kn(_.carrier,t)?_.carrier:_;qn(t,x.x,x.z,t.spd,e,1)}else{const[_]=Si(t,300);_?qn(t,_.x,_.z,t.spd,e,1):qn(t,0,0,t.spd,e,4)}return}if(m.mode==="conquest"&&h>=0&&d<mr&&s==="follow"&&r&&!i.mounted&&Math.hypot(i.x-he[h].pos[0],i.z-he[h].pos[1])<mr+6){Ln(t,he[h].pos[0],he[h].pos[1],e,6),Di(t,t.x,t.z,0,e),$i(t,{castle:h});return}const u=s==="hold"&&n.holdPt?n.holdPt:r?i:null;if(u){const[_,x]=b_(u,u.isFront||!!u.human,t.slot||0,t.kind==="arch",t.meleeN||0);qn(t,_,x,Ji(t)*(Math.hypot(_-t.x,x-t.z)>6?1.15:1),e)<1&&(t.face=po(t.face,u.face,e*6))}else{const[_,x]=Lr(he[Te(t.ti)],t.ti>=4?9:0,2);qn(t,_,x,t.spd,e,3)}}function E_(t){const e=Math.random();if(m.diff===2){const i=Vf().filter(a=>m.teams[a].human&&ti(a,t)).flatMap(a=>Ao(a)),r=a=>i.filter(c=>c.kind===a).length,s=r("foot");return r("arch")>=s?e<.7?"foot":"arch":e<.35?"arch":"foot"}return e<.65?"foot":"arch"}function Kp(t,e,n){t.x+=t.vx*e,t.z+=t.vz*e;for(const i of Cp(t.x,t.z)){if(i.gate&&!Ap(i))continue;const r=t.x-i.x,s=t.z-i.z;if(i.box){const c=Math.cos(i.rot),f=Math.sin(i.rot),l=r*c-s*f,h=r*f+s*c,d=i.hw+t.r-Math.abs(l),u=i.hd+t.r-Math.abs(h);if(d<=0||u<=0)continue;let _=l,x=h;d<u?_=Math.sign(l||1)*(i.hw+t.r):x=Math.sign(h||1)*(i.hd+t.r),t.x=i.x+_*c+x*f,t.z=i.z-_*f+x*c;continue}const o=i.r+t.r;if(Math.abs(r)>o||Math.abs(s)>o)continue;const a=Math.hypot(r,s);a<o&&a>0&&(t.x=i.x+r/a*o,t.z=i.z+s/a*o)}if(m.layout.round){const i=Math.hypot(t.x,t.z),r=m.layout.round-t.r;i>r&&(t.x*=r/i,t.z*=r/i)}if(m.map.id==="river"&&(Gc(t.x,t.z)&&!pc(t.x)&&Math.abs(t.x)>=14&&(t.z=(n>=0?1:-1)*5.05),Math.abs(t.z)<5&&pc(t.x)&&Math.abs(t.x)>20)){const i=t.x<0?-32:32;t.x=Jt(t.x,i-2.1,i+2.1)}t.x=Jt(t.x,-Ma,Ma),t.z=Jt(t.z,-Ma,Ma),t.y=vt(t.x,t.z)+(t.jy||0)}function Jp(t,e,n){const i=(t.jy||0)>.01;t.blocking=!!e.block&&!t.mounted&&!i;const r=t.swing>0&&!t.mounted,s=Ji(t)*(r?.85:1);if(i){const o=Math.min(1,n*2.5);t.vx+=(e.wx*s*e.mag-t.vx)*o,t.vz+=(e.wz*s*e.mag-t.vz)*o}else Di(t,t.x+e.wx*3,t.z+e.wz*3,s*e.mag,n,.05);e.mag>.15&&(t.face=po(t.face,Math.atan2(e.wx,e.wz),n*(t.mounted?4.5:t.blocking?5:r?6:12))),t.blocking&&e.mag<.15&&(t.face=po(t.face,e.camYaw,n*6)),$p(t,n)}function lf(t,e){const n=Wp(t.ti);if(t.javAmmo>=n){t.javAmmo=n,t.javRegen=0;return}t.javRegen-=e,t.javRegen<=0&&(t.javAmmo++,t.javRegen=t.javAmmo<n?Yt.jav.regen:0)}function Zp(t,e){if(m.T+=t,qf(),cf=Math.max(2,Math.round(4*80/Math.max(80,m.units.length))),m.teams.forEach((l,h)=>{if(l.active){if(l.volleyCd>0&&(l.volleyCd-=t),to(h)&&(l.gold+=t*(l.human?tf.humanIncome:Mp[m.diff].income)),!l.human&&to(h)&&(l.recruitT-=t,l.recruitT<=0&&(l.recruitT=ie(...tf.aiRecruitEvery),Kf(h,E_(h)))),!l.human){if(l.upT-=t,l.upT<=0&&(l.upT=ie(6,12),Ao(h).length>=m.squadCap-3||!to(h))){const d=Ri.map(u=>u.id).filter(u=>ta(h,u)!=null&&l.gold>=ta(h,u)+30);d.length&&Zf(h,d[Math.floor(Math.random()*d.length)])}if(l.arrowHits=Math.max(0,l.arrowHits-t*.6),l.shieldwallT-=t,l.arrowHits>=4&&l.shieldwallT<=0&&l.leader&&!l.leader.dead){const[d]=Si(l.leader,9,u=>u.kind!=="arch");d||(l.shieldwallT=7,l.arrowHits=0)}if(l.shieldwallT>0&&l.leader&&!l.leader.dead){const[d]=Si(l.leader,5,u=>u.kind!=="arch");d&&(l.shieldwallT=0)}}if(l.leader.dead&&Ip(h)&&(l.leaderDeadT-=t,l.leaderDeadT<=0)){const[d,u]=Lr(he[Te(h)],h>=4?9:0,7),_=go(h,d,u,"captain",l.human);l.leader=_,l.plan=null,h===m.myTi&&(m.player=_,ct.emit("respawnMe",_)),l.human&&Kt("respawn",h)}}}),m.mode==="dm"){const l=m.teams.map((d,u)=>[d.tickets,u]).filter(d=>m.teams[d[1]].active&&m.teams[d[1]].alive).sort((d,u)=>u[0]-d[0]),h=l.length>1&&l[0][0]-l[1][0]>=10?l[0][1]:-1;h!==m.bounty&&(m.bounty=h,h>=0&&Kt("bounty",h))}const n=m.player;n&&!n.dead&&e&&(Jp(n,e,t),(e.attackHeld||n.atkBuf>0)&&n.cd<=0&&n.stun<=0&&rs(n));for(const l of m.teams){const h=l.leader;h&&h.human&&!h.dead&&(h.atkBuf>0&&(h.atkBuf-=t,h.remote&&h.cd<=0&&h.stun<=0&&rs(h)),lf(h,t))}for(const l of m.teams){const h=l.leader;if(h&&h.human&&!h.dead){const[d]=Si(h,12);!d&&h.hp<h.max&&(h.hp=Math.min(h.max,h.hp+t*6))}}const i=[0,0,0,0,0,0,0,0],r=[0,0,0,0,0,0,0,0],s=[0,0,0,0,0,0,0,0],o=[0,0,0,0,0,0,0,0],a=m.teams.map((l,h)=>Lp(h)),c=m.teams.map((l,h)=>Rp(h)**2);for(const l of m.units){if(l.dead||l.leader)continue;l.kind!=="arch"&&s[l.ti]++;const h=m.teams[l.ti].leader,d=h?h.x-l.x:0,u=h?h.z-l.z:0;l.aura=!!h&&!h.dead&&d*d+u*u<c[l.ti],l.shieldwall=a[l.ti]==="shieldwall";const _=l.kind==="foot"?0:1;l.tkey=m.teams[l.ti].human?1-_:_}for(const l of[0,1])for(const h of m.units)!h.dead&&!h.leader&&h.tkey===l&&(h.tslot=o[h.ti]++);for(const l of m.units)l.dead||(l.cd-=t,l.shootCd-=t,l.javCd-=t,l.stun-=t,l.blockT-=t,l.rt-=t,l.trampleT-=t,l.horseCd>0&&(l.horseCd-=t),l.swing>0&&(l.swing-=t),l.pending&&(l.pending.t-=t,l.pending.t<=0&&Qg(l)),l.rt<=0&&(l.rt=ie(.25,.4),[l.foe,l.fd]=Si(l,50)),l.foe&&l.foe.dead&&(l.foe=null,l.fd=1e9),l.foe&&(l.fd=Math.hypot(l.foe.x-l.x,l.foe.z-l.z)),!(l.human||l.dead)&&(l.leader?($p(l,t),lf(l,t),M_(l,m.teams[l.ti],t)):(l.slot=l.kind==="arch"?r[l.ti]++:i[l.ti]++,l.meleeN=s[l.ti],T_(l,t))));for(const l of m.horses)if(l.t+=t,l.state==="coming"){const h=l.rider;if(h.dead||h.summon!==l){l.state="leaving",l.t=0;continue}const d=h.x-l.x,u=h.z-l.z,_=Math.hypot(d,u)||.01;l.face=Math.atan2(d,u);const x=Math.min(16,_*4);l.x+=d/_*x*t,l.z+=u/_*x*t,l.spd=x,_<1.3&&Zg(h,l)}else if(l.state==="ridden"){const h=l.rider;l.x=h.x,l.z=h.z,l.face=h.face,l.spd=Math.hypot(h.vx,h.vz)}else l.state==="leaving"&&(l.x+=Math.sin(l.face)*10*t,l.z+=Math.cos(l.face)*10*t,l.spd=10);m.horses=m.horses.filter(l=>!(l.state==="leaving"&&l.t>3||l.state==="dead"&&l.t>8));for(const l of m.units){if(l.dead||!l.mounted)continue;const h=Math.hypot(l.vx,l.vz);for(const d of m.units){if(d.dead||!kn(d,l)||d.mounted)continue;const u=d.x-l.x,_=d.z-l.z;if(Math.abs(u)>4||Math.abs(_)>4)continue;const x=Math.hypot(u,_);if(d.kind==="foot"&&d.tier>=1&&x<d.r+l.r+1.6&&Up(d)&&h>4&&Math.abs(_n(d.face,Math.atan2(l.x-d.x,l.z-d.z)))<1){Qf(l,55),l.mounted&&us(l,!0),pi(d.x,d.y+1.5,d.z,"#fff3b0",8),Pt("clang",d.x,d.z),Mn("float",{x:d.x,y:d.y+2.8,z:d.z,text:"Spear wall!",color:he[Te(d.ti)].css});break}if(h>6&&x<d.r+l.r+.3&&d.trampleT<=0){d.trampleT=.8,d.lastHit=m.T;const g=Math.atan2(u,_);Vc(d,Math.sin(g)*10+l.vx*.5,Math.cos(g)*10+l.vz*.5,.7),d.hp-=12*xc(l.ti),pi(d.x,d.y+1,d.z,"#c9b28a",6),Pt("trample",d.x,d.z),d.hp<=0&&ih(d,l,g,1)}}Math.random()<t*h*.9&&Pt("hoof",l.x,l.z)}const f=m.units.filter(l=>!l.dead);for(let l=0;l<f.length;l++){const h=f[l];for(let d=l+1;d<f.length;d++){const u=f[d],_=u.x-h.x,x=u.z-h.z,g=h.r+u.r;if(_>g||_<-g||x>g||x<-g)continue;const p=Math.hypot(_,x)||.01;if(p>=g)continue;const v=(g-p)/2,y=_/p,b=x/p;let C=h.remote?0:h.human||h.mounted?.4:1,w=u.remote?0:u.human||u.mounted?.4:1;C===0&&(w=2),w===0&&(C=2),h.x-=y*v*C,h.z-=b*v*C,u.x+=y*v*w,u.z+=b*v*w}}for(const l of m.units){if(l.dead){sh(l,t);continue}if(l.remote){l.y=vt(l.x,l.z)+(l.jy||0);continue}Kp(l,t,l.z)}m.units=m.units.filter(l=>!(l.dead&&l.deadT>14)),he.forEach((l,h)=>{const d=m.teams[h];if(m.mode==="conquest"&&!d.alive||(d.towerT-=t,d.towerT>0))return;d.towerT=1.4;const[u]=Si({x:l.pos[0],z:l.pos[1],ti:h},24);u&&eh({x:l.pos[0],z:l.pos[1],y:0,vx:0,vz:0,ti:h,tower:!0},u,5.5)}),Qp(t,!0),d_(t),f_(t),l_()}function sh(t,e){t.deadT+=e,t.x+=t.vx*e,t.z+=t.vz*e,t.vy-=18*e;const n=vt(t.x,t.z),i=t.y+t.vy*e;i<=n&&t.vy<-5?(t.vy=-t.vy*.38,t.y=n,t.bounces=(t.bounces||0)+1,t.launch&&ct.emit("sfx",{name:"thump",x:t.x,z:t.z})):t.y=Math.max(n,i);const r=t.y>n+.05,s=Math.pow(r?.7:.03,e);t.vx*=s,t.vz*=s}function Qp(t,e){for(const n of m.arrows){if(n.stuck){n.life-=t;continue}n.t+=t/n.dur;const i=Math.min(1,n.t),r=n.x0+(n.x1-n.x0)*i,s=n.z0+(n.z1-n.z0)*i,o=n.y0+(n.y1-n.y0)*i+n.peak*4*i*(1-i);if(n.px=n.x,n.py=n.y,n.pz=n.z,n.x=r,n.y=o,n.z=s,o<8&&n.t>.12){for(const a of Vg(r,s))if(!(o>a.h+vt(a.x,a.z)||a.gate&&!Ap(a))&&Math.abs(a.x-r)<a.r&&Math.abs(a.z-s)<a.r&&Math.hypot(a.x-r,a.z-s)<a.r){n.stuck=!0,n.life=2,Pt("thud",r,s),pi(r,o,s,"#8a7a62",3);break}if(n.stuck)continue}if(n.t>=1)if(e){let a=null,c=1;for(const f of m.units){if(f.dead||!ti(f.ti,n.ti))continue;const l=Math.hypot(f.x-n.x1,f.z-n.z1)-(f.mounted?.5:0);l<c&&(c=l,a=f)}a?(t_(n,a),n.done=!0):(n.stuck=!0,n.life=3)}else n.stuck=!0,n.life=2.5}m.arrows=m.arrows.filter(n=>!(n.done||n.stuck&&n.life<=0))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oh="160",w_=0,Xh=1,A_=2,ah=1,em=2,Xi=3,Ir=0,Zt=1,Dt=2,Er=0,no=1,$h=2,qh=3,Yh=4,C_=5,Xr=100,R_=101,P_=102,Kh=103,Jh=104,L_=200,I_=201,D_=202,k_=203,ff=204,hf=205,U_=206,N_=207,z_=208,O_=209,F_=210,B_=211,H_=212,G_=213,V_=214,W_=0,j_=1,X_=2,vc=3,$_=4,q_=5,Y_=6,K_=7,jc=0,J_=1,Z_=2,wr=0,Q_=1,ex=2,tx=3,tm=4,nx=5,ix=6,nm=300,_o=301,xo=302,df=303,uf=304,Xc=306,vo=1e3,Ti=1001,pf=1002,In=1003,Zh=1004,hl=1005,li=1006,rx=1007,na=1008,Ar=1009,sx=1010,ox=1011,ch=1012,im=1013,vr=1014,yr=1015,ia=1016,rm=1017,sm=1018,ss=1020,ax=1021,Ei=1023,cx=1024,lx=1025,os=1026,yo=1027,fx=1028,om=1029,hx=1030,am=1031,cm=1033,dl=33776,ul=33777,pl=33778,ml=33779,Qh=35840,ed=35841,td=35842,nd=35843,lm=36196,id=37492,rd=37496,sd=37808,od=37809,ad=37810,cd=37811,ld=37812,fd=37813,hd=37814,dd=37815,ud=37816,pd=37817,md=37818,gd=37819,_d=37820,xd=37821,gl=36492,vd=36494,yd=36495,dx=36283,Md=36284,bd=36285,Sd=36286,fm=3e3,as=3001,ux=3200,px=3201,lh=0,mx=1,Kn="",Gt="srgb",tr="srgb-linear",fh="display-p3",$c="display-p3-linear",yc="linear",Rt="srgb",Mc="rec709",bc="p3",Ts=7680,Td=519,gx=512,_x=513,xx=514,hm=515,vx=516,yx=517,Mx=518,bx=519,Ed=35044,wd=35048,Ad="300 es",mf=1035,Zi=2e3,Sc=2001;class Co{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_l=Math.PI/180,gf=180/Math.PI;function pa(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(vn[t&255]+vn[t>>8&255]+vn[t>>16&255]+vn[t>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[n&63|128]+vn[n>>8&255]+"-"+vn[n>>16&255]+vn[n>>24&255]+vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]).toLowerCase()}function Hn(t,e,n){return Math.max(e,Math.min(n,t))}function Sx(t,e){return(t%e+e)%e}function xl(t,e,n){return(1-n)*t+n*e}function Cd(t){return(t&t-1)===0&&t!==0}function _f(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Uo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function zn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,n=0){rt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class it{constructor(e,n,i,r,s,o,a,c,f){it.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,c,f)}set(e,n,i,r,s,o,a,c,f){const l=this.elements;return l[0]=e,l[1]=r,l[2]=a,l[3]=n,l[4]=s,l[5]=c,l[6]=i,l[7]=o,l[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],f=i[1],l=i[4],h=i[7],d=i[2],u=i[5],_=i[8],x=r[0],g=r[3],p=r[6],v=r[1],y=r[4],b=r[7],C=r[2],w=r[5],R=r[8];return s[0]=o*x+a*v+c*C,s[3]=o*g+a*y+c*w,s[6]=o*p+a*b+c*R,s[1]=f*x+l*v+h*C,s[4]=f*g+l*y+h*w,s[7]=f*p+l*b+h*R,s[2]=d*x+u*v+_*C,s[5]=d*g+u*y+_*w,s[8]=d*p+u*b+_*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],f=e[7],l=e[8];return n*o*l-n*a*f-i*s*l+i*a*c+r*s*f-r*o*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],f=e[7],l=e[8],h=l*o-a*f,d=a*c-l*s,u=f*s-o*c,_=n*h+i*d+r*u;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=h*x,e[1]=(r*f-l*i)*x,e[2]=(a*i-r*o)*x,e[3]=d*x,e[4]=(l*n-r*c)*x,e[5]=(r*s-a*n)*x,e[6]=u*x,e[7]=(i*c-f*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const c=Math.cos(s),f=Math.sin(s);return this.set(i*c,i*f,-i*(c*o+f*a)+o+e,-r*f,r*c,-r*(-f*o+c*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(vl.makeScale(e,n)),this}rotate(e){return this.premultiply(vl.makeRotation(-e)),this}translate(e,n){return this.premultiply(vl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vl=new it;function dm(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Tc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Tx(){const t=Tc("canvas");return t.style.display="block",t}const Rd={};function Yo(t){t in Rd||(Rd[t]=!0,console.warn(t))}const Pd=new it().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ld=new it().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Sa={[tr]:{transfer:yc,primaries:Mc,toReference:t=>t,fromReference:t=>t},[Gt]:{transfer:Rt,primaries:Mc,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[$c]:{transfer:yc,primaries:bc,toReference:t=>t.applyMatrix3(Ld),fromReference:t=>t.applyMatrix3(Pd)},[fh]:{transfer:Rt,primaries:bc,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Ld),fromReference:t=>t.applyMatrix3(Pd).convertLinearToSRGB()}},Ex=new Set([tr,$c]),xt={enabled:!0,_workingColorSpace:tr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Ex.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Sa[e].toReference,r=Sa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Sa[t].primaries},getTransfer:function(t){return t===Kn?yc:Sa[t].transfer}};function io(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function yl(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Es;class um{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Es===void 0&&(Es=Tc("canvas")),Es.width=e.width,Es.height=e.height;const i=Es.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Es}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const n=Tc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=io(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(io(n[i]/255)*255):n[i]=io(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wx=0;class pm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=pa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ml(r[o].image)):s.push(Ml(r[o]))}else s=Ml(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Ml(t){return typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap?um.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ax=0;class Vn extends Co{constructor(e=Vn.DEFAULT_IMAGE,n=Vn.DEFAULT_MAPPING,i=Ti,r=Ti,s=li,o=na,a=Ei,c=Ar,f=Vn.DEFAULT_ANISOTROPY,l=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ax++}),this.uuid=pa(),this.name="",this.source=new pm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=f,this.format=a,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(Yo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===as?Gt:Kn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vo:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case pf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vo:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case pf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Yo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Gt?as:fm}set encoding(e){Yo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===as?Gt:Kn}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=nm;Vn.DEFAULT_ANISOTROPY=1;class dn{constructor(e=0,n=0,i=0,r=1){dn.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,f=c[0],l=c[4],h=c[8],d=c[1],u=c[5],_=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(l-d)<.01&&Math.abs(h-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+x)<.1&&Math.abs(_+g)<.1&&Math.abs(f+u+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(f+1)/2,b=(u+1)/2,C=(p+1)/2,w=(l+d)/4,R=(h+x)/4,L=(_+g)/4;return y>b&&y>C?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=w/i,s=R/i):b>C?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=w/r,s=L/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=R/s,r=L/s),this.set(i,r,s,n),this}let v=Math.sqrt((g-_)*(g-_)+(h-x)*(h-x)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(g-_)/v,this.y=(h-x)/v,this.z=(d-l)/v,this.w=Math.acos((f+u+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cx extends Co{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new dn(0,0,e,n),this.scissorTest=!1,this.viewport=new dn(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(Yo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===as?Gt:Kn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Vn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new pm(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends Cx{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class mm extends Vn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rx extends Vn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ni{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let c=i[r+0],f=i[r+1],l=i[r+2],h=i[r+3];const d=s[o+0],u=s[o+1],_=s[o+2],x=s[o+3];if(a===0){e[n+0]=c,e[n+1]=f,e[n+2]=l,e[n+3]=h;return}if(a===1){e[n+0]=d,e[n+1]=u,e[n+2]=_,e[n+3]=x;return}if(h!==x||c!==d||f!==u||l!==_){let g=1-a;const p=c*d+f*u+l*_+h*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,p*v);g=Math.sin(g*w)/C,a=Math.sin(a*w)/C}const b=a*v;if(c=c*g+d*b,f=f*g+u*b,l=l*g+_*b,h=h*g+x*b,g===1-a){const C=1/Math.sqrt(c*c+f*f+l*l+h*h);c*=C,f*=C,l*=C,h*=C}}e[n]=c,e[n+1]=f,e[n+2]=l,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],c=i[r+1],f=i[r+2],l=i[r+3],h=s[o],d=s[o+1],u=s[o+2],_=s[o+3];return e[n]=a*_+l*h+c*u-f*d,e[n+1]=c*_+l*d+f*h-a*u,e[n+2]=f*_+l*u+a*d-c*h,e[n+3]=l*_-a*h-c*d-f*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,f=a(i/2),l=a(r/2),h=a(s/2),d=c(i/2),u=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=d*l*h+f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h-d*u*_;break;case"YXZ":this._x=d*l*h+f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h+d*u*_;break;case"ZXY":this._x=d*l*h-f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h-d*u*_;break;case"ZYX":this._x=d*l*h-f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h+d*u*_;break;case"YZX":this._x=d*l*h+f*u*_,this._y=f*u*h+d*l*_,this._z=f*l*_-d*u*h,this._w=f*l*h-d*u*_;break;case"XZY":this._x=d*l*h-f*u*_,this._y=f*u*h-d*l*_,this._z=f*l*_+d*u*h,this._w=f*l*h+d*u*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],f=n[2],l=n[6],h=n[10],d=i+a+h;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(l-c)*u,this._y=(s-f)*u,this._z=(o-r)*u}else if(i>a&&i>h){const u=2*Math.sqrt(1+i-a-h);this._w=(l-c)/u,this._x=.25*u,this._y=(r+o)/u,this._z=(s+f)/u}else if(a>h){const u=2*Math.sqrt(1+a-i-h);this._w=(s-f)/u,this._x=(r+o)/u,this._y=.25*u,this._z=(c+l)/u}else{const u=2*Math.sqrt(1+h-i-a);this._w=(o-r)/u,this._x=(s+f)/u,this._y=(c+l)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Hn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,c=n._y,f=n._z,l=n._w;return this._x=i*l+o*a+r*f-s*c,this._y=r*l+o*c+s*a-i*f,this._z=s*l+o*f+i*c-r*a,this._w=o*l-i*a-r*c-s*f,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const u=1-n;return this._w=u*o+n*this._w,this._x=u*i+n*this._x,this._y=u*r+n*this._y,this._z=u*s+n*this._z,this.normalize(),this}const f=Math.sqrt(c),l=Math.atan2(f,a),h=Math.sin((1-n)*l)/f,d=Math.sin(n*l)/f;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,n=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Id.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Id.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,f=2*(o*r-a*i),l=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+c*f+o*h-a*l,this.y=i+c*l+a*f-s*h,this.z=r+c*h+s*l-o*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bl.copy(this).projectOnVector(e),this.sub(bl)}reflect(e){return this.sub(bl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bl=new D,Id=new ni;class ms{constructor(e=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(gi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(gi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=gi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,gi):gi.fromBufferAttribute(s,o),gi.applyMatrix4(e.matrixWorld),this.expandByPoint(gi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ta.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ta.copy(i.boundingBox)),Ta.applyMatrix4(e.matrixWorld),this.union(Ta)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,gi),gi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),Ea.subVectors(this.max,No),ws.subVectors(e.a,No),As.subVectors(e.b,No),Cs.subVectors(e.c,No),ir.subVectors(As,ws),rr.subVectors(Cs,As),Or.subVectors(ws,Cs);let n=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-Or.z,Or.y,ir.z,0,-ir.x,rr.z,0,-rr.x,Or.z,0,-Or.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-Or.y,Or.x,0];return!Sl(n,ws,As,Cs,Ea)||(n=[1,0,0,0,1,0,0,0,1],!Sl(n,ws,As,Cs,Ea))?!1:(wa.crossVectors(ir,rr),n=[wa.x,wa.y,wa.z],Sl(n,ws,As,Cs,Ea))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new D,new D,new D,new D,new D,new D,new D,new D],gi=new D,Ta=new ms,ws=new D,As=new D,Cs=new D,ir=new D,rr=new D,Or=new D,No=new D,Ea=new D,wa=new D,Fr=new D;function Sl(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Fr.fromArray(t,s);const a=r.x*Math.abs(Fr.x)+r.y*Math.abs(Fr.y)+r.z*Math.abs(Fr.z),c=e.dot(Fr),f=n.dot(Fr),l=i.dot(Fr);if(Math.max(-Math.max(c,f,l),Math.min(c,f,l))>a)return!1}return!0}const Px=new ms,zo=new D,Tl=new D;class ma{constructor(e=new D,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Px.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zo.subVectors(e,this.center);const n=zo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(zo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zo.copy(e.center).add(Tl)),this.expandByPoint(zo.copy(e.center).sub(Tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new D,El=new D,Aa=new D,sr=new D,wl=new D,Ca=new D,Al=new D;class Lx{constructor(e=new D,n=new D(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Bi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,n),Bi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){El.copy(e).add(n).multiplyScalar(.5),Aa.copy(n).sub(e).normalize(),sr.copy(this.origin).sub(El);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Aa),a=sr.dot(this.direction),c=-sr.dot(Aa),f=sr.lengthSq(),l=Math.abs(1-o*o);let h,d,u,_;if(l>0)if(h=o*c-a,d=o*a-c,_=s*l,h>=0)if(d>=-_)if(d<=_){const x=1/l;h*=x,d*=x,u=h*(h+o*d+2*a)+d*(o*h+d+2*c)+f}else d=s,h=Math.max(0,-(o*d+a)),u=-h*h+d*(d+2*c)+f;else d=-s,h=Math.max(0,-(o*d+a)),u=-h*h+d*(d+2*c)+f;else d<=-_?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-c),s),u=-h*h+d*(d+2*c)+f):d<=_?(h=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+f):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-c),s),u=-h*h+d*(d+2*c)+f);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),u=-h*h+d*(d+2*c)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(El).addScaledVector(Aa,d),u}intersectSphere(e,n){Bi.subVectors(e.center,this.origin);const i=Bi.dot(this.direction),r=Bi.dot(Bi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,c;const f=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return f>=0?(i=(e.min.x-d.x)*f,r=(e.max.x-d.x)*f):(i=(e.max.x-d.x)*f,r=(e.min.x-d.x)*f),l>=0?(s=(e.min.y-d.y)*l,o=(e.max.y-d.y)*l):(s=(e.max.y-d.y)*l,o=(e.min.y-d.y)*l),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,n,i,r,s){wl.subVectors(n,e),Ca.subVectors(i,e),Al.crossVectors(wl,Ca);let o=this.direction.dot(Al),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sr.subVectors(this.origin,e);const c=a*this.direction.dot(Ca.crossVectors(sr,Ca));if(c<0)return null;const f=a*this.direction.dot(wl.cross(sr));if(f<0||c+f>o)return null;const l=-a*sr.dot(Al);return l<0?null:this.at(l/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(e,n,i,r,s,o,a,c,f,l,h,d,u,_,x,g){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,c,f,l,h,d,u,_,x,g)}set(e,n,i,r,s,o,a,c,f,l,h,d,u,_,x,g){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=f,p[6]=l,p[10]=h,p[14]=d,p[3]=u,p[7]=_,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Rs.setFromMatrixColumn(e,0).length(),s=1/Rs.setFromMatrixColumn(e,1).length(),o=1/Rs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),f=Math.sin(r),l=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*l,u=o*h,_=a*l,x=a*h;n[0]=c*l,n[4]=-c*h,n[8]=f,n[1]=u+_*f,n[5]=d-x*f,n[9]=-a*c,n[2]=x-d*f,n[6]=_+u*f,n[10]=o*c}else if(e.order==="YXZ"){const d=c*l,u=c*h,_=f*l,x=f*h;n[0]=d+x*a,n[4]=_*a-u,n[8]=o*f,n[1]=o*h,n[5]=o*l,n[9]=-a,n[2]=u*a-_,n[6]=x+d*a,n[10]=o*c}else if(e.order==="ZXY"){const d=c*l,u=c*h,_=f*l,x=f*h;n[0]=d-x*a,n[4]=-o*h,n[8]=_+u*a,n[1]=u+_*a,n[5]=o*l,n[9]=x-d*a,n[2]=-o*f,n[6]=a,n[10]=o*c}else if(e.order==="ZYX"){const d=o*l,u=o*h,_=a*l,x=a*h;n[0]=c*l,n[4]=_*f-u,n[8]=d*f+x,n[1]=c*h,n[5]=x*f+d,n[9]=u*f-_,n[2]=-f,n[6]=a*c,n[10]=o*c}else if(e.order==="YZX"){const d=o*c,u=o*f,_=a*c,x=a*f;n[0]=c*l,n[4]=x-d*h,n[8]=_*h+u,n[1]=h,n[5]=o*l,n[9]=-a*l,n[2]=-f*l,n[6]=u*h+_,n[10]=d-x*h}else if(e.order==="XZY"){const d=o*c,u=o*f,_=a*c,x=a*f;n[0]=c*l,n[4]=-h,n[8]=f*l,n[1]=d*h+x,n[5]=o*l,n[9]=u*h-_,n[2]=_*h-u,n[6]=a*l,n[10]=x*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ix,e,Dx)}lookAt(e,n,i){const r=this.elements;return jn.subVectors(e,n),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),or.crossVectors(i,jn),or.lengthSq()===0&&(Math.abs(i.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),or.crossVectors(i,jn)),or.normalize(),Ra.crossVectors(jn,or),r[0]=or.x,r[4]=Ra.x,r[8]=jn.x,r[1]=or.y,r[5]=Ra.y,r[9]=jn.y,r[2]=or.z,r[6]=Ra.z,r[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],f=i[12],l=i[1],h=i[5],d=i[9],u=i[13],_=i[2],x=i[6],g=i[10],p=i[14],v=i[3],y=i[7],b=i[11],C=i[15],w=r[0],R=r[4],L=r[8],M=r[12],S=r[1],N=r[5],W=r[9],z=r[13],P=r[2],k=r[6],V=r[10],K=r[14],$=r[3],Y=r[7],J=r[11],re=r[15];return s[0]=o*w+a*S+c*P+f*$,s[4]=o*R+a*N+c*k+f*Y,s[8]=o*L+a*W+c*V+f*J,s[12]=o*M+a*z+c*K+f*re,s[1]=l*w+h*S+d*P+u*$,s[5]=l*R+h*N+d*k+u*Y,s[9]=l*L+h*W+d*V+u*J,s[13]=l*M+h*z+d*K+u*re,s[2]=_*w+x*S+g*P+p*$,s[6]=_*R+x*N+g*k+p*Y,s[10]=_*L+x*W+g*V+p*J,s[14]=_*M+x*z+g*K+p*re,s[3]=v*w+y*S+b*P+C*$,s[7]=v*R+y*N+b*k+C*Y,s[11]=v*L+y*W+b*V+C*J,s[15]=v*M+y*z+b*K+C*re,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],f=e[13],l=e[2],h=e[6],d=e[10],u=e[14],_=e[3],x=e[7],g=e[11],p=e[15];return _*(+s*c*h-r*f*h-s*a*d+i*f*d+r*a*u-i*c*u)+x*(+n*c*u-n*f*d+s*o*d-r*o*u+r*f*l-s*c*l)+g*(+n*f*h-n*a*u-s*o*h+i*o*u+s*a*l-i*f*l)+p*(-r*a*l-n*c*h+n*a*d+r*o*h-i*o*d+i*c*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],f=e[7],l=e[8],h=e[9],d=e[10],u=e[11],_=e[12],x=e[13],g=e[14],p=e[15],v=h*g*f-x*d*f+x*c*u-a*g*u-h*c*p+a*d*p,y=_*d*f-l*g*f-_*c*u+o*g*u+l*c*p-o*d*p,b=l*x*f-_*h*f+_*a*u-o*x*u-l*a*p+o*h*p,C=_*h*c-l*x*c-_*a*d+o*x*d+l*a*g-o*h*g,w=n*v+i*y+r*b+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=v*R,e[1]=(x*d*s-h*g*s-x*r*u+i*g*u+h*r*p-i*d*p)*R,e[2]=(a*g*s-x*c*s+x*r*f-i*g*f-a*r*p+i*c*p)*R,e[3]=(h*c*s-a*d*s-h*r*f+i*d*f+a*r*u-i*c*u)*R,e[4]=y*R,e[5]=(l*g*s-_*d*s+_*r*u-n*g*u-l*r*p+n*d*p)*R,e[6]=(_*c*s-o*g*s-_*r*f+n*g*f+o*r*p-n*c*p)*R,e[7]=(o*d*s-l*c*s+l*r*f-n*d*f-o*r*u+n*c*u)*R,e[8]=b*R,e[9]=(_*h*s-l*x*s-_*i*u+n*x*u+l*i*p-n*h*p)*R,e[10]=(o*x*s-_*a*s+_*i*f-n*x*f-o*i*p+n*a*p)*R,e[11]=(l*a*s-o*h*s-l*i*f+n*h*f+o*i*u-n*a*u)*R,e[12]=C*R,e[13]=(l*x*r-_*h*r+_*i*d-n*x*d-l*i*g+n*h*g)*R,e[14]=(_*a*r-o*x*r-_*i*c+n*x*c+o*i*g-n*a*g)*R,e[15]=(o*h*r-l*a*r+l*i*c-n*h*c-o*i*d+n*a*d)*R,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,c=e.z,f=s*o,l=s*a;return this.set(f*o+i,f*a-r*c,f*c+r*a,0,f*a+r*c,l*a+i,l*c-r*o,0,f*c-r*a,l*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,f=s+s,l=o+o,h=a+a,d=s*f,u=s*l,_=s*h,x=o*l,g=o*h,p=a*h,v=c*f,y=c*l,b=c*h,C=i.x,w=i.y,R=i.z;return r[0]=(1-(x+p))*C,r[1]=(u+b)*C,r[2]=(_-y)*C,r[3]=0,r[4]=(u-b)*w,r[5]=(1-(d+p))*w,r[6]=(g+v)*w,r[7]=0,r[8]=(_+y)*R,r[9]=(g-v)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Rs.set(r[0],r[1],r[2]).length();const o=Rs.set(r[4],r[5],r[6]).length(),a=Rs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],_i.copy(this);const f=1/s,l=1/o,h=1/a;return _i.elements[0]*=f,_i.elements[1]*=f,_i.elements[2]*=f,_i.elements[4]*=l,_i.elements[5]*=l,_i.elements[6]*=l,_i.elements[8]*=h,_i.elements[9]*=h,_i.elements[10]*=h,n.setFromRotationMatrix(_i),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Zi){const c=this.elements,f=2*s/(n-e),l=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r);let u,_;if(a===Zi)u=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Sc)u=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=l,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=u,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Zi){const c=this.elements,f=1/(n-e),l=1/(i-r),h=1/(o-s),d=(n+e)*f,u=(i+r)*l;let _,x;if(a===Zi)_=(o+s)*h,x=-2*h;else if(a===Sc)_=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*f,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-u,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Rs=new D,_i=new qe,Ix=new D(0,0,0),Dx=new D(1,1,1),or=new D,Ra=new D,jn=new D,Dd=new qe,kd=new ni;class zi{constructor(e=0,n=0,i=0,r=zi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],f=r[5],l=r[9],h=r[2],d=r[6],u=r[10];switch(n){case"XYZ":this._y=Math.asin(Hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,u),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,f),this._z=0);break;case"YXZ":this._x=Math.asin(-Hn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(c,f)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Hn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-o,f)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Hn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,f));break;case"YZX":this._z=Math.asin(Hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,f),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-Hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,f),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-l,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return kd.setFromEuler(this),this.setFromQuaternion(kd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zi.DEFAULT_ORDER="XYZ";class gm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kx=0;const Ud=new D,Ps=new ni,Hi=new qe,Pa=new D,Oo=new D,Ux=new D,Nx=new ni,Nd=new D(1,0,0),zd=new D(0,1,0),Od=new D(0,0,1),zx={type:"added"},Ox={type:"removed"};class un extends Co{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=pa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new D,n=new zi,i=new ni,r=new D(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new qe},normalMatrix:{value:new it}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ps.setFromAxisAngle(e,n),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,n){return Ps.setFromAxisAngle(e,n),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(Nd,e)}rotateY(e){return this.rotateOnAxis(zd,e)}rotateZ(e){return this.rotateOnAxis(Od,e)}translateOnAxis(e,n){return Ud.copy(e).applyQuaternion(this.quaternion),this.position.add(Ud.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Nd,e)}translateY(e){return this.translateOnAxis(zd,e)}translateZ(e){return this.translateOnAxis(Od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Pa.copy(e):Pa.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hi.lookAt(Oo,Pa,this.up):Hi.lookAt(Pa,Oo,this.up),this.quaternion.setFromRotationMatrix(Hi),r&&(Hi.extractRotation(r.matrixWorld),Ps.setFromRotationMatrix(Hi),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(zx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Ox)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,e,Ux),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,Nx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let f=0,l=c.length;f<l;f++){const h=c[f];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,f=this.material.length;c<f;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(n){const a=o(e.geometries),c=o(e.materials),f=o(e.textures),l=o(e.images),h=o(e.shapes),d=o(e.skeletons),u=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),f.length>0&&(i.textures=f),l.length>0&&(i.images=l),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const c=[];for(const f in a){const l=a[f];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}un.DEFAULT_UP=new D(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xi=new D,Gi=new D,Cl=new D,Vi=new D,Ls=new D,Is=new D,Fd=new D,Rl=new D,Pl=new D,Ll=new D;let La=!1;class Mi{constructor(e=new D,n=new D,i=new D){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),xi.subVectors(e,n),r.cross(xi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){xi.subVectors(r,n),Gi.subVectors(i,n),Cl.subVectors(e,n);const o=xi.dot(xi),a=xi.dot(Gi),c=xi.dot(Cl),f=Gi.dot(Gi),l=Gi.dot(Cl),h=o*f-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,u=(f*c-a*l)*d,_=(o*l-a*c)*d;return s.set(1-u-_,_,u)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getUV(e,n,i,r,s,o,a,c){return La===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),La=!0),this.getInterpolation(e,n,i,r,s,o,a,c)}static getInterpolation(e,n,i,r,s,o,a,c){return this.getBarycoord(e,n,i,r,Vi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Vi.x),c.addScaledVector(o,Vi.y),c.addScaledVector(a,Vi.z),c)}static isFrontFacing(e,n,i,r){return xi.subVectors(i,n),Gi.subVectors(e,n),xi.cross(Gi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xi.subVectors(this.c,this.b),Gi.subVectors(this.a,this.b),xi.cross(Gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Mi.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return La===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),La=!0),Mi.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Mi.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Mi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Ls.subVectors(r,i),Is.subVectors(s,i),Rl.subVectors(e,i);const c=Ls.dot(Rl),f=Is.dot(Rl);if(c<=0&&f<=0)return n.copy(i);Pl.subVectors(e,r);const l=Ls.dot(Pl),h=Is.dot(Pl);if(l>=0&&h<=l)return n.copy(r);const d=c*h-l*f;if(d<=0&&c>=0&&l<=0)return o=c/(c-l),n.copy(i).addScaledVector(Ls,o);Ll.subVectors(e,s);const u=Ls.dot(Ll),_=Is.dot(Ll);if(_>=0&&u<=_)return n.copy(s);const x=u*f-c*_;if(x<=0&&f>=0&&_<=0)return a=f/(f-_),n.copy(i).addScaledVector(Is,a);const g=l*_-u*h;if(g<=0&&h-l>=0&&u-_>=0)return Fd.subVectors(s,r),a=(h-l)/(h-l+(u-_)),n.copy(r).addScaledVector(Fd,a);const p=1/(g+x+d);return o=x*p,a=d*p,n.copy(i).addScaledVector(Ls,o).addScaledVector(Is,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _m={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function Il(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class xe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=xt.workingColorSpace){return this.r=e,this.g=n,this.b=i,xt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=xt.workingColorSpace){if(e=Sx(e,1),n=Hn(n,0,1),i=Hn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Il(o,s,e+1/3),this.g=Il(o,s,e),this.b=Il(o,s,e-1/3)}return xt.toWorkingColorSpace(this,r),this}setStyle(e,n=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Gt){const i=_m[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}copyLinearToSRGB(e){return this.r=yl(e.r),this.g=yl(e.g),this.b=yl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return xt.fromWorkingColorSpace(yn.copy(this),e),Math.round(Hn(yn.r*255,0,255))*65536+Math.round(Hn(yn.g*255,0,255))*256+Math.round(Hn(yn.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=xt.workingColorSpace){xt.fromWorkingColorSpace(yn.copy(this),n);const i=yn.r,r=yn.g,s=yn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,f;const l=(a+o)/2;if(a===o)c=0,f=0;else{const h=o-a;switch(f=l<=.5?h/(o+a):h/(2-o-a),o){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=f,e.l=l,e}getRGB(e,n=xt.workingColorSpace){return xt.fromWorkingColorSpace(yn.copy(this),n),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=Gt){xt.fromWorkingColorSpace(yn.copy(this),e);const n=yn.r,i=yn.g,r=yn.b;return e!==Gt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+n,ar.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ar),e.getHSL(Ia);const i=xl(ar.h,Ia.h,n),r=xl(ar.s,Ia.s,n),s=xl(ar.l,Ia.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new xe;xe.NAMES=_m;let Fx=0;class Ro extends Co{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=pa(),this.name="",this.type="Material",this.blending=no,this.side=Ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ff,this.blendDst=hf,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=vc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(i.blending=this.blending),this.side!==Ir&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ff&&(i.blendSrc=this.blendSrc),this.blendDst!==hf&&(i.blendDst=this.blendDst),this.blendEquation!==Xr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Td&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ai extends Ro{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vt=new D,Da=new rt;class Ci{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Ed,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=yr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Da.fromBufferAttribute(this,n),Da.applyMatrix3(e),this.setXY(n,Da.x,Da.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Vt.fromBufferAttribute(this,n),Vt.applyMatrix3(e),this.setXYZ(n,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Vt.fromBufferAttribute(this,n),Vt.applyMatrix4(e),this.setXYZ(n,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Vt.fromBufferAttribute(this,n),Vt.applyNormalMatrix(e),this.setXYZ(n,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Vt.fromBufferAttribute(this,n),Vt.transformDirection(e),this.setXYZ(n,Vt.x,Vt.y,Vt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Uo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=zn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Uo(n,this.array)),n}setX(e,n){return this.normalized&&(n=zn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Uo(n,this.array)),n}setY(e,n){return this.normalized&&(n=zn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Uo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=zn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Uo(n,this.array)),n}setW(e,n){return this.normalized&&(n=zn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array),r=zn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array),r=zn(r,this.array),s=zn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ed&&(e.usage=this.usage),e}}class xm extends Ci{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class vm extends Ci{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class gt extends Ci{constructor(e,n,i){super(new Float32Array(e),n,i)}}let Bx=0;const ri=new qe,Dl=new un,Ds=new D,Xn=new ms,Fo=new ms,rn=new D;class Nn extends Co{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bx++}),this.uuid=pa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dm(e)?vm:xm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new it().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ri.makeRotationFromQuaternion(e),this.applyMatrix4(ri),this}rotateX(e){return ri.makeRotationX(e),this.applyMatrix4(ri),this}rotateY(e){return ri.makeRotationY(e),this.applyMatrix4(ri),this}rotateZ(e){return ri.makeRotationZ(e),this.applyMatrix4(ri),this}translate(e,n,i){return ri.makeTranslation(e,n,i),this.applyMatrix4(ri),this}scale(e,n,i){return ri.makeScale(e,n,i),this.applyMatrix4(ri),this}lookAt(e){return Dl.lookAt(e),Dl.updateMatrix(),this.applyMatrix4(Dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new gt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ms);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Xn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ma);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Fo.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(Xn.min,Fo.min),Xn.expandByPoint(rn),rn.addVectors(Xn.max,Fo.max),Xn.expandByPoint(rn)):(Xn.expandByPoint(Fo.min),Xn.expandByPoint(Fo.max))}Xn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)rn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(rn));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let f=0,l=a.count;f<l;f++)rn.fromBufferAttribute(a,f),c&&(Ds.fromBufferAttribute(e,f),rn.add(Ds)),r=Math.max(r,i.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ci(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,f=[],l=[];for(let S=0;S<a;S++)f[S]=new D,l[S]=new D;const h=new D,d=new D,u=new D,_=new rt,x=new rt,g=new rt,p=new D,v=new D;function y(S,N,W){h.fromArray(r,S*3),d.fromArray(r,N*3),u.fromArray(r,W*3),_.fromArray(o,S*2),x.fromArray(o,N*2),g.fromArray(o,W*2),d.sub(h),u.sub(h),x.sub(_),g.sub(_);const z=1/(x.x*g.y-g.x*x.y);isFinite(z)&&(p.copy(d).multiplyScalar(g.y).addScaledVector(u,-x.y).multiplyScalar(z),v.copy(u).multiplyScalar(x.x).addScaledVector(d,-g.x).multiplyScalar(z),f[S].add(p),f[N].add(p),f[W].add(p),l[S].add(v),l[N].add(v),l[W].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let S=0,N=b.length;S<N;++S){const W=b[S],z=W.start,P=W.count;for(let k=z,V=z+P;k<V;k+=3)y(i[k+0],i[k+1],i[k+2])}const C=new D,w=new D,R=new D,L=new D;function M(S){R.fromArray(s,S*3),L.copy(R);const N=f[S];C.copy(N),C.sub(R.multiplyScalar(R.dot(N))).normalize(),w.crossVectors(L,N);const z=w.dot(l[S])<0?-1:1;c[S*4]=C.x,c[S*4+1]=C.y,c[S*4+2]=C.z,c[S*4+3]=z}for(let S=0,N=b.length;S<N;++S){const W=b[S],z=W.start,P=W.count;for(let k=z,V=z+P;k<V;k+=3)M(i[k+0]),M(i[k+1]),M(i[k+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ci(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,o=new D,a=new D,c=new D,f=new D,l=new D,h=new D;if(e)for(let d=0,u=e.count;d<u;d+=3){const _=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,g),l.subVectors(o,s),h.subVectors(r,s),l.cross(h),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),f.fromBufferAttribute(i,g),a.add(l),c.add(l),f.add(l),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(g,f.x,f.y,f.z)}else for(let d=0,u=n.count;d<u;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),l.subVectors(o,s),h.subVectors(r,s),l.cross(h),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)rn.fromBufferAttribute(e,n),rn.normalize(),e.setXYZ(n,rn.x,rn.y,rn.z)}toNonIndexed(){function e(a,c){const f=a.array,l=a.itemSize,h=a.normalized,d=new f.constructor(c.length*l);let u=0,_=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?u=c[x]*a.data.stride+a.offset:u=c[x]*l;for(let p=0;p<l;p++)d[_++]=f[u++]}return new Ci(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Nn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],f=e(c,i);n.setAttribute(a,f)}const s=this.morphAttributes;for(const a in s){const c=[],f=s[a];for(let l=0,h=f.length;l<h;l++){const d=f[l],u=e(d,i);c.push(u)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const f=o[a];n.addGroup(f.start,f.count,f.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const f in c)c[f]!==void 0&&(e[f]=c[f]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const f=i[c];e.data.attributes[c]=f.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const f=this.morphAttributes[c],l=[];for(let h=0,d=f.length;h<d;h++){const u=f[h];l.push(u.toJSON(e.data))}l.length>0&&(r[c]=l,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const f in r){const l=r[f];this.setAttribute(f,l.clone(n))}const s=e.morphAttributes;for(const f in s){const l=[],h=s[f];for(let d=0,u=h.length;d<u;d++)l.push(h[d].clone(n));this.morphAttributes[f]=l}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let f=0,l=o.length;f<l;f++){const h=o[f];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bd=new qe,Br=new Lx,ka=new ma,Hd=new D,ks=new D,Us=new D,Ns=new D,kl=new D,Ua=new D,Na=new rt,za=new rt,Oa=new rt,Gd=new D,Vd=new D,Wd=new D,Fa=new D,Ba=new D;class ye extends un{constructor(e=new Nn,n=new Ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ua.set(0,0,0);for(let c=0,f=s.length;c<f;c++){const l=a[c],h=s[c];l!==0&&(kl.fromBufferAttribute(h,e),o?Ua.addScaledVector(kl,l):Ua.addScaledVector(kl.sub(n),l))}n.add(Ua)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ka.copy(i.boundingSphere),ka.applyMatrix4(s),Br.copy(e.ray).recast(e.near),!(ka.containsPoint(Br.origin)===!1&&(Br.intersectSphere(ka,Hd)===null||Br.origin.distanceToSquared(Hd)>(e.far-e.near)**2))&&(Bd.copy(s).invert(),Br.copy(e.ray).applyMatrix4(Bd),!(i.boundingBox!==null&&Br.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Br)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,f=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,d=s.groups,u=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const g=d[_],p=o[g.materialIndex],v=Math.max(g.start,u.start),y=Math.min(a.count,Math.min(g.start+g.count,u.start+u.count));for(let b=v,C=y;b<C;b+=3){const w=a.getX(b),R=a.getX(b+1),L=a.getX(b+2);r=Ha(this,p,e,i,f,l,h,w,R,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,u.start),x=Math.min(a.count,u.start+u.count);for(let g=_,p=x;g<p;g+=3){const v=a.getX(g),y=a.getX(g+1),b=a.getX(g+2);r=Ha(this,o,e,i,f,l,h,v,y,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const g=d[_],p=o[g.materialIndex],v=Math.max(g.start,u.start),y=Math.min(c.count,Math.min(g.start+g.count,u.start+u.count));for(let b=v,C=y;b<C;b+=3){const w=b,R=b+1,L=b+2;r=Ha(this,p,e,i,f,l,h,w,R,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,u.start),x=Math.min(c.count,u.start+u.count);for(let g=_,p=x;g<p;g+=3){const v=g,y=g+1,b=g+2;r=Ha(this,o,e,i,f,l,h,v,y,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Hx(t,e,n,i,r,s,o,a){let c;if(e.side===Zt?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Ir,a),c===null)return null;Ba.copy(a),Ba.applyMatrix4(t.matrixWorld);const f=n.ray.origin.distanceTo(Ba);return f<n.near||f>n.far?null:{distance:f,point:Ba.clone(),object:t}}function Ha(t,e,n,i,r,s,o,a,c,f){t.getVertexPosition(a,ks),t.getVertexPosition(c,Us),t.getVertexPosition(f,Ns);const l=Hx(t,e,n,i,ks,Us,Ns,Fa);if(l){r&&(Na.fromBufferAttribute(r,a),za.fromBufferAttribute(r,c),Oa.fromBufferAttribute(r,f),l.uv=Mi.getInterpolation(Fa,ks,Us,Ns,Na,za,Oa,new rt)),s&&(Na.fromBufferAttribute(s,a),za.fromBufferAttribute(s,c),Oa.fromBufferAttribute(s,f),l.uv1=Mi.getInterpolation(Fa,ks,Us,Ns,Na,za,Oa,new rt),l.uv2=l.uv1),o&&(Gd.fromBufferAttribute(o,a),Vd.fromBufferAttribute(o,c),Wd.fromBufferAttribute(o,f),l.normal=Mi.getInterpolation(Fa,ks,Us,Ns,Gd,Vd,Wd,new D),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const h={a,b:c,c:f,normal:new D,materialIndex:0};Mi.getNormal(ks,Us,Ns,h.normal),l.face=h}return l}class De extends Nn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],f=[],l=[],h=[];let d=0,u=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(h,2));function _(x,g,p,v,y,b,C,w,R,L,M){const S=b/R,N=C/L,W=b/2,z=C/2,P=w/2,k=R+1,V=L+1;let K=0,$=0;const Y=new D;for(let J=0;J<V;J++){const re=J*N-z;for(let se=0;se<k;se++){const j=se*S-W;Y[x]=j*v,Y[g]=re*y,Y[p]=P,f.push(Y.x,Y.y,Y.z),Y[x]=0,Y[g]=0,Y[p]=w>0?1:-1,l.push(Y.x,Y.y,Y.z),h.push(se/R),h.push(1-J/L),K+=1}}for(let J=0;J<L;J++)for(let re=0;re<R;re++){const se=d+re+k*J,j=d+re+k*(J+1),Z=d+(re+1)+k*(J+1),de=d+(re+1)+k*J;c.push(se,j,de),c.push(j,Z,de),$+=6}a.addGroup(u,$,M),u+=$,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new De(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Rn(t){const e={};for(let n=0;n<t.length;n++){const i=Mo(t[n]);for(const r in i)e[r]=i[r]}return e}function Gx(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function ym(t){return t.getRenderTarget()===null?t.outputColorSpace:xt.workingColorSpace}const Vx={clone:Mo,merge:Rn};var Wx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dr extends Ro{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wx,this.fragmentShader=jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mo(e.uniforms),this.uniformsGroups=Gx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Mm extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Zi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class fi extends Mm{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=gf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_l*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gf*2*Math.atan(Math.tan(_l*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_l*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,f=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/f,r*=o.width/c,i*=o.height/f}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const zs=-90,Os=1;class Xx extends un{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new fi(zs,Os,e,n);r.layers=this.layers,this.add(r);const s=new fi(zs,Os,e,n);s.layers=this.layers,this.add(s);const o=new fi(zs,Os,e,n);o.layers=this.layers,this.add(o);const a=new fi(zs,Os,e,n);a.layers=this.layers,this.add(a);const c=new fi(zs,Os,e,n);c.layers=this.layers,this.add(c);const f=new fi(zs,Os,e,n);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const f of n)this.remove(f);if(e===Zi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of n)this.add(f),f.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,f,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,f),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,l),e.setRenderTarget(h,d,u),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class bm extends Vn{constructor(e,n,i,r,s,o,a,c,f,l){e=e!==void 0?e:[],n=n!==void 0?n:_o,super(e,n,i,r,s,o,a,c,f,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $x extends ps{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Yo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===as?Gt:Kn),this.texture=new bm(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:li}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new De(5,5,5),s=new Dr({name:"CubemapFromEquirect",uniforms:Mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:Er});s.uniforms.tEquirect.value=n;const o=new ye(r,s),a=n.minFilter;return n.minFilter===na&&(n.minFilter=li),new Xx(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Ul=new D,qx=new D,Yx=new it;class Vr{constructor(e=new D(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Ul.subVectors(i,n).cross(qx.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Ul),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Yx.getNormalMatrix(e),r=this.coplanarPoint(Ul).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hr=new ma,Ga=new D;class hh{constructor(e=new Vr,n=new Vr,i=new Vr,r=new Vr,s=new Vr,o=new Vr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Zi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],f=r[4],l=r[5],h=r[6],d=r[7],u=r[8],_=r[9],x=r[10],g=r[11],p=r[12],v=r[13],y=r[14],b=r[15];if(i[0].setComponents(c-s,d-f,g-u,b-p).normalize(),i[1].setComponents(c+s,d+f,g+u,b+p).normalize(),i[2].setComponents(c+o,d+l,g+_,b+v).normalize(),i[3].setComponents(c-o,d-l,g-_,b-v).normalize(),i[4].setComponents(c-a,d-h,g-x,b-y).normalize(),n===Zi)i[5].setComponents(c+a,d+h,g+x,b+y).normalize();else if(n===Sc)i[5].setComponents(a,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){return Hr.center.set(0,0,0),Hr.radius=.7071067811865476,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ga.x=r.normal.x>0?e.max.x:e.min.x,Ga.y=r.normal.y>0?e.max.y:e.min.y,Ga.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ga)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sm(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Kx(t,e){const n=e.isWebGL2,i=new WeakMap;function r(f,l){const h=f.array,d=f.usage,u=h.byteLength,_=t.createBuffer();t.bindBuffer(l,_),t.bufferData(l,h,d),f.onUploadCallback();let x;if(h instanceof Float32Array)x=t.FLOAT;else if(h instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(n)x=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=t.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=t.SHORT;else if(h instanceof Uint32Array)x=t.UNSIGNED_INT;else if(h instanceof Int32Array)x=t.INT;else if(h instanceof Int8Array)x=t.BYTE;else if(h instanceof Uint8Array)x=t.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:u}}function s(f,l,h){const d=l.array,u=l._updateRange,_=l.updateRanges;if(t.bindBuffer(h,f),u.count===-1&&_.length===0&&t.bufferSubData(h,0,d),_.length!==0){for(let x=0,g=_.length;x<g;x++){const p=_[x];n?t.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):t.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}l.clearUpdateRanges()}u.count!==-1&&(n?t.bufferSubData(h,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count):t.bufferSubData(h,u.offset*d.BYTES_PER_ELEMENT,d.subarray(u.offset,u.offset+u.count)),u.count=-1),l.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),i.get(f)}function a(f){f.isInterleavedBufferAttribute&&(f=f.data);const l=i.get(f);l&&(t.deleteBuffer(l.buffer),i.delete(f))}function c(f,l){if(f.isGLBufferAttribute){const d=i.get(f);(!d||d.version<f.version)&&i.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);const h=i.get(f);if(h===void 0)i.set(f,r(f,l));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,f,l),h.version=f.version}}return{get:o,remove:a,update:c}}class gn extends Nn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),c=Math.floor(r),f=a+1,l=c+1,h=e/a,d=n/c,u=[],_=[],x=[],g=[];for(let p=0;p<l;p++){const v=p*d-o;for(let y=0;y<f;y++){const b=y*h-s;_.push(b,-v,0),x.push(0,0,1),g.push(y/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const y=v+f*p,b=v+f*(p+1),C=v+1+f*(p+1),w=v+1+f*p;u.push(y,b,w),u.push(b,C,w)}this.setIndex(u),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Jx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zx=`#ifdef USE_ALPHAHASH
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
#endif`,Qx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ev=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,nv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iv=`#ifdef USE_AOMAP
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
#endif`,rv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sv=`#ifdef USE_BATCHING
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
#endif`,ov=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,av=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fv=`#ifdef USE_IRIDESCENCE
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
#endif`,hv=`#ifdef USE_BUMPMAP
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
#endif`,dv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,uv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,vv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,yv=`#define PI 3.141592653589793
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
} // validated`,Mv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bv=`vec3 transformedNormal = objectNormal;
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
#endif`,Sv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Av="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cv=`
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
}`,Rv=`#ifdef USE_ENVMAP
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
#endif`,Pv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lv=`#ifdef USE_ENVMAP
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
#endif`,Iv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dv=`#ifdef USE_ENVMAP
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
#endif`,kv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ov=`#ifdef USE_GRADIENTMAP
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
}`,Fv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Bv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vv=`uniform bool receiveShadow;
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
#endif`,Wv=`#ifdef USE_ENVMAP
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
#endif`,jv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$v=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yv=`PhysicalMaterial material;
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
#endif`,Kv=`struct PhysicalMaterial {
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
}`,Jv=`
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
#endif`,Zv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ey=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ty=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ny=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,iy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ry=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,oy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ay=`#if defined( USE_POINTS_UV )
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
#endif`,cy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ly=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hy=`#ifdef USE_MORPHNORMALS
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
#endif`,dy=`#ifdef USE_MORPHTARGETS
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
#endif`,uy=`#ifdef USE_MORPHTARGETS
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
#endif`,py=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,my=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_y=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vy=`#ifdef USE_NORMALMAP
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
#endif`,yy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,My=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,by=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ty=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ey=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ay=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ry=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Py=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ly=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Iy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ky=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uy=`float getShadowMask() {
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
}`,Ny=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zy=`#ifdef USE_SKINNING
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
#endif`,Oy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fy=`#ifdef USE_SKINNING
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
#endif`,By=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wy=`#ifdef USE_TRANSMISSION
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
#endif`,jy=`#ifdef USE_TRANSMISSION
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
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ky=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jy=`uniform sampler2D t2D;
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
}`,Zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,eM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nM=`#include <common>
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
}`,iM=`#if DEPTH_PACKING == 3200
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
}`,rM=`#define DISTANCE
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
}`,sM=`#define DISTANCE
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
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`uniform float scale;
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
}`,lM=`uniform vec3 diffuse;
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
}`,fM=`#include <common>
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
}`,hM=`uniform vec3 diffuse;
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
}`,dM=`#define LAMBERT
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
}`,uM=`#define LAMBERT
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
}`,pM=`#define MATCAP
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
}`,mM=`#define MATCAP
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
}`,gM=`#define NORMAL
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
}`,_M=`#define NORMAL
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
}`,xM=`#define PHONG
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
}`,vM=`#define PHONG
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
}`,yM=`#define STANDARD
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
}`,MM=`#define STANDARD
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
}`,bM=`#define TOON
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
}`,SM=`#define TOON
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
}`,TM=`uniform float size;
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
}`,EM=`uniform vec3 diffuse;
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
}`,wM=`#include <common>
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
}`,AM=`uniform vec3 color;
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
}`,CM=`uniform float rotation;
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
}`,RM=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Jx,alphahash_pars_fragment:Zx,alphamap_fragment:Qx,alphamap_pars_fragment:ev,alphatest_fragment:tv,alphatest_pars_fragment:nv,aomap_fragment:iv,aomap_pars_fragment:rv,batching_pars_vertex:sv,batching_vertex:ov,begin_vertex:av,beginnormal_vertex:cv,bsdfs:lv,iridescence_fragment:fv,bumpmap_pars_fragment:hv,clipping_planes_fragment:dv,clipping_planes_pars_fragment:uv,clipping_planes_pars_vertex:pv,clipping_planes_vertex:mv,color_fragment:gv,color_pars_fragment:_v,color_pars_vertex:xv,color_vertex:vv,common:yv,cube_uv_reflection_fragment:Mv,defaultnormal_vertex:bv,displacementmap_pars_vertex:Sv,displacementmap_vertex:Tv,emissivemap_fragment:Ev,emissivemap_pars_fragment:wv,colorspace_fragment:Av,colorspace_pars_fragment:Cv,envmap_fragment:Rv,envmap_common_pars_fragment:Pv,envmap_pars_fragment:Lv,envmap_pars_vertex:Iv,envmap_physical_pars_fragment:Wv,envmap_vertex:Dv,fog_vertex:kv,fog_pars_vertex:Uv,fog_fragment:Nv,fog_pars_fragment:zv,gradientmap_pars_fragment:Ov,lightmap_fragment:Fv,lightmap_pars_fragment:Bv,lights_lambert_fragment:Hv,lights_lambert_pars_fragment:Gv,lights_pars_begin:Vv,lights_toon_fragment:jv,lights_toon_pars_fragment:Xv,lights_phong_fragment:$v,lights_phong_pars_fragment:qv,lights_physical_fragment:Yv,lights_physical_pars_fragment:Kv,lights_fragment_begin:Jv,lights_fragment_maps:Zv,lights_fragment_end:Qv,logdepthbuf_fragment:ey,logdepthbuf_pars_fragment:ty,logdepthbuf_pars_vertex:ny,logdepthbuf_vertex:iy,map_fragment:ry,map_pars_fragment:sy,map_particle_fragment:oy,map_particle_pars_fragment:ay,metalnessmap_fragment:cy,metalnessmap_pars_fragment:ly,morphcolor_vertex:fy,morphnormal_vertex:hy,morphtarget_pars_vertex:dy,morphtarget_vertex:uy,normal_fragment_begin:py,normal_fragment_maps:my,normal_pars_fragment:gy,normal_pars_vertex:_y,normal_vertex:xy,normalmap_pars_fragment:vy,clearcoat_normal_fragment_begin:yy,clearcoat_normal_fragment_maps:My,clearcoat_pars_fragment:by,iridescence_pars_fragment:Sy,opaque_fragment:Ty,packing:Ey,premultiplied_alpha_fragment:wy,project_vertex:Ay,dithering_fragment:Cy,dithering_pars_fragment:Ry,roughnessmap_fragment:Py,roughnessmap_pars_fragment:Ly,shadowmap_pars_fragment:Iy,shadowmap_pars_vertex:Dy,shadowmap_vertex:ky,shadowmask_pars_fragment:Uy,skinbase_vertex:Ny,skinning_pars_vertex:zy,skinning_vertex:Oy,skinnormal_vertex:Fy,specularmap_fragment:By,specularmap_pars_fragment:Hy,tonemapping_fragment:Gy,tonemapping_pars_fragment:Vy,transmission_fragment:Wy,transmission_pars_fragment:jy,uv_pars_fragment:Xy,uv_pars_vertex:$y,uv_vertex:qy,worldpos_vertex:Yy,background_vert:Ky,background_frag:Jy,backgroundCube_vert:Zy,backgroundCube_frag:Qy,cube_vert:eM,cube_frag:tM,depth_vert:nM,depth_frag:iM,distanceRGBA_vert:rM,distanceRGBA_frag:sM,equirect_vert:oM,equirect_frag:aM,linedashed_vert:cM,linedashed_frag:lM,meshbasic_vert:fM,meshbasic_frag:hM,meshlambert_vert:dM,meshlambert_frag:uM,meshmatcap_vert:pM,meshmatcap_frag:mM,meshnormal_vert:gM,meshnormal_frag:_M,meshphong_vert:xM,meshphong_frag:vM,meshphysical_vert:yM,meshphysical_frag:MM,meshtoon_vert:bM,meshtoon_frag:SM,points_vert:TM,points_frag:EM,shadow_vert:wM,shadow_frag:AM,sprite_vert:CM,sprite_frag:RM},ae={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},ki={basic:{uniforms:Rn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Rn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new xe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Rn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Rn([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Rn([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new xe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Rn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Rn([ae.points,ae.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Rn([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Rn([ae.common,ae.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Rn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Rn([ae.sprite,ae.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Rn([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Rn([ae.lights,ae.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ki.physical={uniforms:Rn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Va={r:0,b:0,g:0};function PM(t,e,n,i,r,s,o){const a=new xe(0);let c=s===!0?0:1,f,l,h=null,d=0,u=null;function _(g,p){let v=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?n:e).get(y)),y===null?x(a,c):y&&y.isColor&&(x(y,1),v=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Xc)?(l===void 0&&(l=new ye(new De(1,1,1),new Dr({name:"BackgroundCubeMaterial",uniforms:Mo(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=xt.getTransfer(y.colorSpace)!==Rt,(h!==y||d!==y.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(f===void 0&&(f=new ye(new gn(2,2),new Dr({name:"BackgroundMaterial",uniforms:Mo(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:Ir,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=y,f.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,f.material.toneMapped=xt.getTransfer(y.colorSpace)!==Rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),f.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==t.toneMapping)&&(f.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null))}function x(g,p){g.getRGB(Va,ym(t)),i.buffers.color.setClear(Va.r,Va.g,Va.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(g,p=1){a.set(g),c=p,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,x(a,c)},render:_}}function LM(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=g(null);let f=c,l=!1;function h(P,k,V,K,$){let Y=!1;if(o){const J=x(K,V,k);f!==J&&(f=J,u(f.object)),Y=p(P,K,V,$),Y&&v(P,K,V,$)}else{const J=k.wireframe===!0;(f.geometry!==K.id||f.program!==V.id||f.wireframe!==J)&&(f.geometry=K.id,f.program=V.id,f.wireframe=J,Y=!0)}$!==null&&n.update($,t.ELEMENT_ARRAY_BUFFER),(Y||l)&&(l=!1,L(P,k,V,K),$!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get($).buffer))}function d(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function u(P){return i.isWebGL2?t.bindVertexArray(P):s.bindVertexArrayOES(P)}function _(P){return i.isWebGL2?t.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function x(P,k,V){const K=V.wireframe===!0;let $=a[P.id];$===void 0&&($={},a[P.id]=$);let Y=$[k.id];Y===void 0&&(Y={},$[k.id]=Y);let J=Y[K];return J===void 0&&(J=g(d()),Y[K]=J),J}function g(P){const k=[],V=[],K=[];for(let $=0;$<r;$++)k[$]=0,V[$]=0,K[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:K,object:P,attributes:{},index:null}}function p(P,k,V,K){const $=f.attributes,Y=k.attributes;let J=0;const re=V.getAttributes();for(const se in re)if(re[se].location>=0){const Z=$[se];let de=Y[se];if(de===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),Z===void 0||Z.attribute!==de||de&&Z.data!==de.data)return!0;J++}return f.attributesNum!==J||f.index!==K}function v(P,k,V,K){const $={},Y=k.attributes;let J=0;const re=V.getAttributes();for(const se in re)if(re[se].location>=0){let Z=Y[se];Z===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor));const de={};de.attribute=Z,Z&&Z.data&&(de.data=Z.data),$[se]=de,J++}f.attributes=$,f.attributesNum=J,f.index=K}function y(){const P=f.newAttributes;for(let k=0,V=P.length;k<V;k++)P[k]=0}function b(P){C(P,0)}function C(P,k){const V=f.newAttributes,K=f.enabledAttributes,$=f.attributeDivisors;V[P]=1,K[P]===0&&(t.enableVertexAttribArray(P),K[P]=1),$[P]!==k&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,k),$[P]=k)}function w(){const P=f.newAttributes,k=f.enabledAttributes;for(let V=0,K=k.length;V<K;V++)k[V]!==P[V]&&(t.disableVertexAttribArray(V),k[V]=0)}function R(P,k,V,K,$,Y,J){J===!0?t.vertexAttribIPointer(P,k,V,$,Y):t.vertexAttribPointer(P,k,V,K,$,Y)}function L(P,k,V,K){if(i.isWebGL2===!1&&(P.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const $=K.attributes,Y=V.getAttributes(),J=k.defaultAttributeValues;for(const re in Y){const se=Y[re];if(se.location>=0){let j=$[re];if(j===void 0&&(re==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),re==="instanceColor"&&P.instanceColor&&(j=P.instanceColor)),j!==void 0){const Z=j.normalized,de=j.itemSize,Ae=n.get(j);if(Ae===void 0)continue;const Ee=Ae.buffer,Ge=Ae.type,We=Ae.bytesPerElement,ke=i.isWebGL2===!0&&(Ge===t.INT||Ge===t.UNSIGNED_INT||j.gpuType===im);if(j.isInterleavedBufferAttribute){const ft=j.data,O=ft.stride,wn=j.offset;if(ft.isInstancedInterleavedBuffer){for(let Re=0;Re<se.locationSize;Re++)C(se.location+Re,ft.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Re=0;Re<se.locationSize;Re++)b(se.location+Re);t.bindBuffer(t.ARRAY_BUFFER,Ee);for(let Re=0;Re<se.locationSize;Re++)R(se.location+Re,de/se.locationSize,Ge,Z,O*We,(wn+de/se.locationSize*Re)*We,ke)}else{if(j.isInstancedBufferAttribute){for(let ft=0;ft<se.locationSize;ft++)C(se.location+ft,j.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ft=0;ft<se.locationSize;ft++)b(se.location+ft);t.bindBuffer(t.ARRAY_BUFFER,Ee);for(let ft=0;ft<se.locationSize;ft++)R(se.location+ft,de/se.locationSize,Ge,Z,de*We,de/se.locationSize*ft*We,ke)}}else if(J!==void 0){const Z=J[re];if(Z!==void 0)switch(Z.length){case 2:t.vertexAttrib2fv(se.location,Z);break;case 3:t.vertexAttrib3fv(se.location,Z);break;case 4:t.vertexAttrib4fv(se.location,Z);break;default:t.vertexAttrib1fv(se.location,Z)}}}}w()}function M(){W();for(const P in a){const k=a[P];for(const V in k){const K=k[V];for(const $ in K)_(K[$].object),delete K[$];delete k[V]}delete a[P]}}function S(P){if(a[P.id]===void 0)return;const k=a[P.id];for(const V in k){const K=k[V];for(const $ in K)_(K[$].object),delete K[$];delete k[V]}delete a[P.id]}function N(P){for(const k in a){const V=a[k];if(V[P.id]===void 0)continue;const K=V[P.id];for(const $ in K)_(K[$].object),delete K[$];delete V[P.id]}}function W(){z(),l=!0,f!==c&&(f=c,u(f.object))}function z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:z,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfProgram:N,initAttributes:y,enableAttribute:b,disableUnusedAttributes:w}}function IM(t,e,n,i){const r=i.isWebGL2;let s;function o(l){s=l}function a(l,h){t.drawArrays(s,l,h),n.update(h,s,1)}function c(l,h,d){if(d===0)return;let u,_;if(r)u=t,_="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[_](s,l,h,d),n.update(h,s,d)}function f(l,h,d){if(d===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let _=0;_<d;_++)this.render(l[_],h[_]);else{u.multiDrawArraysWEBGL(s,l,0,h,0,d);let _=0;for(let x=0;x<d;x++)_+=h[x];n.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=f}function DM(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext!="undefined"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const f=o||e.has("WEBGL_draw_buffers"),l=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),d=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),x=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),p=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,b=o||e.has("OES_texture_float"),C=y&&b,w=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:f,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:d,maxTextureSize:u,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:g,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:w}}function kM(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Vr,a=new it,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const u=h.length!==0||d||i!==0||r;return r=d,i=h.length,u},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=l(h,d,0)},this.setState=function(h,d,u){const _=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=t.get(h);if(!r||_===null||_.length===0||s&&!g)s?l(null):f();else{const v=s?0:i,y=v*4;let b=p.clippingState||null;c.value=b,b=l(_,d,y,u);for(let C=0;C!==y;++C)b[C]=n[C];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function f(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function l(h,d,u,_){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=c.value,_!==!0||g===null){const p=u+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,b=u;y!==x;++y,b+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(g,b),g[b+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function UM(t){let e=new WeakMap;function n(o,a){return a===df?o.mapping=_o:a===uf&&(o.mapping=xo),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===df||a===uf)if(e.has(o)){const c=e.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const f=new $x(c.height/2);return f.fromEquirectangularTexture(t,o),e.set(o,f),o.addEventListener("dispose",r),n(f.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Tm extends Mm{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,o=s+f*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const $s=4,jd=[.125,.215,.35,.446,.526,.582],$r=20,Nl=new Tm,Xd=new xe;let zl=null,Ol=0,Fl=0;const Wr=(1+Math.sqrt(5))/2,Fs=1/Wr,$d=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Wr,Fs),new D(0,Wr,-Fs),new D(Fs,0,Wr),new D(-Fs,0,Wr),new D(Wr,Fs,0),new D(-Wr,Fs,0)];class qd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){zl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Fl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zl,Ol,Fl),e.scissorTest=!1,Wa(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===_o||e.mapping===xo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Fl=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:li,minFilter:li,generateMipmaps:!1,type:ia,format:Ei,colorSpace:tr,depthBuffer:!1},r=Yd(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yd(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=NM(s)),this._blurMaterial=zM(s,e,n)}return r}_compileMaterial(e){const n=new ye(this._lodPlanes[0],e);this._renderer.compile(n,Nl)}_sceneToCubeUV(e,n,i,r){const a=new fi(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,d=l.toneMapping;l.getClearColor(Xd),l.toneMapping=wr,l.autoClear=!1;const u=new Ai({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),_=new ye(new De,u);let x=!1;const g=e.background;g?g.isColor&&(u.color.copy(g),e.background=null,x=!0):(u.color.copy(Xd),x=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(f[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,f[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,f[p]));const y=this._cubeSize;Wa(r,v*y,p>2?y:0,y,y),l.setRenderTarget(r),x&&l.render(_,a),l.render(e,a)}_.geometry.dispose(),_.material.dispose(),l.toneMapping=d,l.autoClear=h,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===_o||e.mapping===xo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kd());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ye(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Wa(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,Nl)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$d[(r-1)%$d.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const c=this._renderer,f=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,h=new ye(this._lodPlanes[r],f),d=f.uniforms,u=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*u):2*Math.PI/(2*$r-1),x=s/_,g=isFinite(s)?1+Math.floor(l*x):$r;g>$r&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${$r}`);const p=[];let v=0;for(let R=0;R<$r;++R){const L=R/x,M=Math.exp(-L*L/2);p.push(M),R===0?v+=M:R<g&&(v+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=_,d.mipInt.value=y-i;const b=this._sizeLods[r],C=3*b*(r>y-$s?r-y+$s:0),w=4*(this._cubeSize-b);Wa(n,C,w,3*b,2*b),c.setRenderTarget(n),c.render(h,Nl)}}function NM(t){const e=[],n=[],i=[];let r=t;const s=t-$s+1+jd.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>t-$s?c=jd[o-t+$s-1]:o===0&&(c=0),i.push(c);const f=1/(a-2),l=-f,h=1+f,d=[l,l,h,l,h,h,l,l,h,h,l,h],u=6,_=6,x=3,g=2,p=1,v=new Float32Array(x*_*u),y=new Float32Array(g*_*u),b=new Float32Array(p*_*u);for(let w=0;w<u;w++){const R=w%3*2/3-1,L=w>2?0:-1,M=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];v.set(M,x*_*w),y.set(d,g*_*w);const S=[w,w,w,w,w,w];b.set(S,p*_*w)}const C=new Nn;C.setAttribute("position",new Ci(v,x)),C.setAttribute("uv",new Ci(y,g)),C.setAttribute("faceIndex",new Ci(b,p)),e.push(C),r>$s&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Yd(t,e,n){const i=new ps(t,e,n);return i.texture.mapping=Xc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wa(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function zM(t,e,n){const i=new Float32Array($r),r=new D(0,1,0);return new Dr({name:"SphericalGaussianBlur",defines:{n:$r,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:dh(),fragmentShader:`

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
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Kd(){return new Dr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dh(),fragmentShader:`

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
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Jd(){return new Dr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function dh(){return`

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
	`}function OM(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,f=c===df||c===uf,l=c===_o||c===xo;if(f||l)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return n===null&&(n=new qd(t)),h=f?n.fromEquirectangular(a,h):n.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(f&&h&&h.height>0||l&&h&&r(h)){n===null&&(n=new qd(t));const d=f?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let c=0;const f=6;for(let l=0;l<f;l++)a[l]!==void 0&&c++;return c===f}function s(a){const c=a.target;c.removeEventListener("dispose",s);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function FM(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function BM(t,e,n,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const x=d.morphAttributes[_];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",o),delete r[d.id];const u=s.get(d);u&&(e.remove(u),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function c(h){const d=h.attributes;for(const _ in d)e.update(d[_],t.ARRAY_BUFFER);const u=h.morphAttributes;for(const _ in u){const x=u[_];for(let g=0,p=x.length;g<p;g++)e.update(x[g],t.ARRAY_BUFFER)}}function f(h){const d=[],u=h.index,_=h.attributes.position;let x=0;if(u!==null){const v=u.array;x=u.version;for(let y=0,b=v.length;y<b;y+=3){const C=v[y+0],w=v[y+1],R=v[y+2];d.push(C,w,w,R,R,C)}}else if(_!==void 0){const v=_.array;x=_.version;for(let y=0,b=v.length/3-1;y<b;y+=3){const C=y+0,w=y+1,R=y+2;d.push(C,w,w,R,R,C)}}else return;const g=new(dm(d)?vm:xm)(d,1);g.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function l(h){const d=s.get(h);if(d){const u=h.index;u!==null&&d.version<u.version&&f(h)}else f(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:l}}function HM(t,e,n,i){const r=i.isWebGL2;let s;function o(u){s=u}let a,c;function f(u){a=u.type,c=u.bytesPerElement}function l(u,_){t.drawElements(s,_,a,u*c),n.update(_,s,1)}function h(u,_,x){if(x===0)return;let g,p;if(r)g=t,p="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](s,_,a,u*c,x),n.update(_,s,x)}function d(u,_,x){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<x;p++)this.render(u[p]/c,_[p]);else{g.multiDrawElementsWEBGL(s,_,0,a,u,0,x);let p=0;for(let v=0;v<x;v++)p+=_[v];n.update(p,s,1)}}this.setMode=o,this.setIndex=f,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function GM(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function VM(t,e){return t[0]-e[0]}function WM(t,e){return Math.abs(e[1])-Math.abs(t[1])}function jM(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new dn,a=[];for(let f=0;f<8;f++)a[f]=[f,0];function c(f,l,h){const d=f.morphTargetInfluences;if(e.isWebGL2===!0){const _=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,x=_!==void 0?_.length:0;let g=s.get(l);if(g===void 0||g.count!==x){let k=function(){z.dispose(),s.delete(l),l.removeEventListener("dispose",k)};var u=k;g!==void 0&&g.texture.dispose();const y=l.morphAttributes.position!==void 0,b=l.morphAttributes.normal!==void 0,C=l.morphAttributes.color!==void 0,w=l.morphAttributes.position||[],R=l.morphAttributes.normal||[],L=l.morphAttributes.color||[];let M=0;y===!0&&(M=1),b===!0&&(M=2),C===!0&&(M=3);let S=l.attributes.position.count*M,N=1;S>e.maxTextureSize&&(N=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const W=new Float32Array(S*N*4*x),z=new mm(W,S,N,x);z.type=yr,z.needsUpdate=!0;const P=M*4;for(let V=0;V<x;V++){const K=w[V],$=R[V],Y=L[V],J=S*N*4*V;for(let re=0;re<K.count;re++){const se=re*P;y===!0&&(o.fromBufferAttribute(K,re),W[J+se+0]=o.x,W[J+se+1]=o.y,W[J+se+2]=o.z,W[J+se+3]=0),b===!0&&(o.fromBufferAttribute($,re),W[J+se+4]=o.x,W[J+se+5]=o.y,W[J+se+6]=o.z,W[J+se+7]=0),C===!0&&(o.fromBufferAttribute(Y,re),W[J+se+8]=o.x,W[J+se+9]=o.y,W[J+se+10]=o.z,W[J+se+11]=Y.itemSize===4?o.w:1)}}g={count:x,texture:z,size:new rt(S,N)},s.set(l,g),l.addEventListener("dispose",k)}let p=0;for(let y=0;y<d.length;y++)p+=d[y];const v=l.morphTargetsRelative?1:1-p;h.getUniforms().setValue(t,"morphTargetBaseInfluence",v),h.getUniforms().setValue(t,"morphTargetInfluences",d),h.getUniforms().setValue(t,"morphTargetsTexture",g.texture,n),h.getUniforms().setValue(t,"morphTargetsTextureSize",g.size)}else{const _=d===void 0?0:d.length;let x=i[l.id];if(x===void 0||x.length!==_){x=[];for(let b=0;b<_;b++)x[b]=[b,0];i[l.id]=x}for(let b=0;b<_;b++){const C=x[b];C[0]=b,C[1]=d[b]}x.sort(WM);for(let b=0;b<8;b++)b<_&&x[b][1]?(a[b][0]=x[b][0],a[b][1]=x[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(VM);const g=l.morphAttributes.position,p=l.morphAttributes.normal;let v=0;for(let b=0;b<8;b++){const C=a[b],w=C[0],R=C[1];w!==Number.MAX_SAFE_INTEGER&&R?(g&&l.getAttribute("morphTarget"+b)!==g[w]&&l.setAttribute("morphTarget"+b,g[w]),p&&l.getAttribute("morphNormal"+b)!==p[w]&&l.setAttribute("morphNormal"+b,p[w]),r[b]=R,v+=R):(g&&l.hasAttribute("morphTarget"+b)===!0&&l.deleteAttribute("morphTarget"+b),p&&l.hasAttribute("morphNormal"+b)===!0&&l.deleteAttribute("morphNormal"+b),r[b]=0)}const y=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(t,"morphTargetBaseInfluence",y),h.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:c}}function XM(t,e,n,i){let r=new WeakMap;function s(c){const f=i.render.frame,l=c.geometry,h=e.get(c,l);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==f&&(d.update(),r.set(d,f))}return h}function o(){r=new WeakMap}function a(c){const f=c.target;f.removeEventListener("dispose",a),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:s,dispose:o}}class Em extends Vn{constructor(e,n,i,r,s,o,a,c,f,l){if(l=l!==void 0?l:os,l!==os&&l!==yo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===os&&(i=vr),i===void 0&&l===yo&&(i=ss),super(null,r,s,o,a,c,l,i,f),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:In,this.minFilter=c!==void 0?c:In,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const wm=new Vn,Am=new Em(1,1);Am.compareFunction=hm;const Cm=new mm,Rm=new Rx,Pm=new bm,Zd=[],Qd=[],eu=new Float32Array(16),tu=new Float32Array(9),nu=new Float32Array(4);function Po(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Zd[r];if(s===void 0&&(s=new Float32Array(r),Zd[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Qt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function en(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function qc(t,e){let n=Qd[e];n===void 0&&(n=new Int32Array(e),Qd[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function $M(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function qM(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;t.uniform2fv(this.addr,e),en(n,e)}}function YM(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Qt(n,e))return;t.uniform3fv(this.addr,e),en(n,e)}}function KM(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;t.uniform4fv(this.addr,e),en(n,e)}}function JM(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Qt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),en(n,e)}else{if(Qt(n,i))return;nu.set(i),t.uniformMatrix2fv(this.addr,!1,nu),en(n,i)}}function ZM(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Qt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),en(n,e)}else{if(Qt(n,i))return;tu.set(i),t.uniformMatrix3fv(this.addr,!1,tu),en(n,i)}}function QM(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Qt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),en(n,e)}else{if(Qt(n,i))return;eu.set(i),t.uniformMatrix4fv(this.addr,!1,eu),en(n,i)}}function e1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function t1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;t.uniform2iv(this.addr,e),en(n,e)}}function n1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;t.uniform3iv(this.addr,e),en(n,e)}}function i1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;t.uniform4iv(this.addr,e),en(n,e)}}function r1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function s1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;t.uniform2uiv(this.addr,e),en(n,e)}}function o1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;t.uniform3uiv(this.addr,e),en(n,e)}}function a1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;t.uniform4uiv(this.addr,e),en(n,e)}}function c1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Am:wm;n.setTexture2D(e||s,r)}function l1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Rm,r)}function f1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Pm,r)}function h1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Cm,r)}function d1(t){switch(t){case 5126:return $M;case 35664:return qM;case 35665:return YM;case 35666:return KM;case 35674:return JM;case 35675:return ZM;case 35676:return QM;case 5124:case 35670:return e1;case 35667:case 35671:return t1;case 35668:case 35672:return n1;case 35669:case 35673:return i1;case 5125:return r1;case 36294:return s1;case 36295:return o1;case 36296:return a1;case 35678:case 36198:case 36298:case 36306:case 35682:return c1;case 35679:case 36299:case 36307:return l1;case 35680:case 36300:case 36308:case 36293:return f1;case 36289:case 36303:case 36311:case 36292:return h1}}function u1(t,e){t.uniform1fv(this.addr,e)}function p1(t,e){const n=Po(e,this.size,2);t.uniform2fv(this.addr,n)}function m1(t,e){const n=Po(e,this.size,3);t.uniform3fv(this.addr,n)}function g1(t,e){const n=Po(e,this.size,4);t.uniform4fv(this.addr,n)}function _1(t,e){const n=Po(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function x1(t,e){const n=Po(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function v1(t,e){const n=Po(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function y1(t,e){t.uniform1iv(this.addr,e)}function M1(t,e){t.uniform2iv(this.addr,e)}function b1(t,e){t.uniform3iv(this.addr,e)}function S1(t,e){t.uniform4iv(this.addr,e)}function T1(t,e){t.uniform1uiv(this.addr,e)}function E1(t,e){t.uniform2uiv(this.addr,e)}function w1(t,e){t.uniform3uiv(this.addr,e)}function A1(t,e){t.uniform4uiv(this.addr,e)}function C1(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Qt(i,s)||(t.uniform1iv(this.addr,s),en(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||wm,s[o])}function R1(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Qt(i,s)||(t.uniform1iv(this.addr,s),en(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Rm,s[o])}function P1(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Qt(i,s)||(t.uniform1iv(this.addr,s),en(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Pm,s[o])}function L1(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Qt(i,s)||(t.uniform1iv(this.addr,s),en(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Cm,s[o])}function I1(t){switch(t){case 5126:return u1;case 35664:return p1;case 35665:return m1;case 35666:return g1;case 35674:return _1;case 35675:return x1;case 35676:return v1;case 5124:case 35670:return y1;case 35667:case 35671:return M1;case 35668:case 35672:return b1;case 35669:case 35673:return S1;case 5125:return T1;case 36294:return E1;case 36295:return w1;case 36296:return A1;case 35678:case 36198:case 36298:case 36306:case 35682:return C1;case 35679:case 36299:case 36307:return R1;case 35680:case 36300:case 36308:case 36293:return P1;case 36289:case 36303:case 36311:case 36292:return L1}}class D1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=d1(n.type)}}class k1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=I1(n.type)}}class U1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Bl=/(\w+)(\])?(\[|\.)?/g;function iu(t,e){t.seq.push(e),t.map[e.id]=e}function N1(t,e,n){const i=t.name,r=i.length;for(Bl.lastIndex=0;;){const s=Bl.exec(i),o=Bl.lastIndex;let a=s[1];const c=s[2]==="]",f=s[3];if(c&&(a=a|0),f===void 0||f==="["&&o+2===r){iu(n,f===void 0?new D1(a,t,e):new k1(a,t,e));break}else{let h=n.map[a];h===void 0&&(h=new U1(a),iu(n,h)),n=h}}}class Qa{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);N1(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function ru(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const z1=37297;let O1=0;function F1(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function B1(t){const e=xt.getPrimaries(xt.workingColorSpace),n=xt.getPrimaries(t);let i;switch(e===n?i="":e===bc&&n===Mc?i="LinearDisplayP3ToLinearSRGB":e===Mc&&n===bc&&(i="LinearSRGBToLinearDisplayP3"),t){case tr:case $c:return[i,"LinearTransferOETF"];case Gt:case fh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function su(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+F1(t.getShaderSource(e),o)}else return r}function H1(t,e){const n=B1(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function G1(t,e){let n;switch(e){case Q_:n="Linear";break;case ex:n="Reinhard";break;case tx:n="OptimizedCineon";break;case tm:n="ACESFilmic";break;case ix:n="AgX";break;case nx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function V1(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(qs).join(`
`)}function W1(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(qs).join(`
`)}function j1(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function X1(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function qs(t){return t!==""}function ou(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function au(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $1=/^[ \t]*#include +<([\w\d./]+)>/gm;function xf(t){return t.replace($1,Y1)}const q1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Y1(t,e){let n=Xe[e];if(n===void 0){const i=q1.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return xf(n)}const K1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cu(t){return t.replace(K1,J1)}function J1(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function lu(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Z1(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===ah?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===em?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Xi&&(e="SHADOWMAP_TYPE_VSM"),e}function Q1(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case _o:case xo:e="ENVMAP_TYPE_CUBE";break;case Xc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function eb(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case xo:e="ENVMAP_MODE_REFRACTION";break}return e}function tb(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case jc:e="ENVMAP_BLENDING_MULTIPLY";break;case J_:e="ENVMAP_BLENDING_MIX";break;case Z_:e="ENVMAP_BLENDING_ADD";break}return e}function nb(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function ib(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=Z1(n),f=Q1(n),l=eb(n),h=tb(n),d=nb(n),u=n.isWebGL2?"":V1(n),_=W1(n),x=j1(s),g=r.createProgram();let p,v,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(qs).join(`
`),p.length>0&&(p+=`
`),v=[u,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(qs).join(`
`),v.length>0&&(v+=`
`)):(p=[lu(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),v=[u,lu(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==wr?"#define TONE_MAPPING":"",n.toneMapping!==wr?Xe.tonemapping_pars_fragment:"",n.toneMapping!==wr?G1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,H1("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(qs).join(`
`)),o=xf(o),o=ou(o,n),o=au(o,n),a=xf(a),a=ou(a,n),a=au(a,n),o=cu(o),a=cu(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const b=y+p+o,C=y+v+a,w=ru(r,r.VERTEX_SHADER,b),R=ru(r,r.FRAGMENT_SHADER,C);r.attachShader(g,w),r.attachShader(g,R),n.index0AttributeName!==void 0?r.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function L(W){if(t.debug.checkShaderErrors){const z=r.getProgramInfoLog(g).trim(),P=r.getShaderInfoLog(w).trim(),k=r.getShaderInfoLog(R).trim();let V=!0,K=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,g,w,R);else{const $=su(r,w,"vertex"),Y=su(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+$+`
`+Y)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(P===""||k==="")&&(K=!1);K&&(W.diagnostics={runnable:V,programLog:z,vertexShader:{log:P,prefix:p},fragmentShader:{log:k,prefix:v}})}r.deleteShader(w),r.deleteShader(R),M=new Qa(r,g),S=X1(r,g)}let M;this.getUniforms=function(){return M===void 0&&L(this),M};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(g,z1)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=O1++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=R,this}let rb=0;class sb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new ob(e),n.set(e,i)),i}}class ob{constructor(e){this.id=rb++,this.code=e,this.usedTimes=0}}function ab(t,e,n,i,r,s,o){const a=new gm,c=new sb,f=[],l=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let u=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function g(M,S,N,W,z){const P=W.fog,k=z.geometry,V=M.isMeshStandardMaterial?W.environment:null,K=(M.isMeshStandardMaterial?n:e).get(M.envMap||V),$=K&&K.mapping===Xc?K.image.height:null,Y=_[M.type];M.precision!==null&&(u=r.getMaxPrecision(M.precision),u!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const J=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,re=J!==void 0?J.length:0;let se=0;k.morphAttributes.position!==void 0&&(se=1),k.morphAttributes.normal!==void 0&&(se=2),k.morphAttributes.color!==void 0&&(se=3);let j,Z,de,Ae;if(Y){const An=ki[Y];j=An.vertexShader,Z=An.fragmentShader}else j=M.vertexShader,Z=M.fragmentShader,c.update(M),de=c.getVertexShaderID(M),Ae=c.getFragmentShaderID(M);const Ee=t.getRenderTarget(),Ge=z.isInstancedMesh===!0,We=z.isBatchedMesh===!0,ke=!!M.map,ft=!!M.matcap,O=!!K,wn=!!M.aoMap,Re=!!M.lightMap,Be=!!M.bumpMap,ve=!!M.normalMap,Lt=!!M.displacementMap,Ye=!!M.emissiveMap,A=!!M.metalnessMap,T=!!M.roughnessMap,B=M.anisotropy>0,te=M.clearcoat>0,ee=M.iridescence>0,ne=M.sheen>0,Me=M.transmission>0,fe=B&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,Ie=te&&!!M.clearcoatNormalMap,Ke=te&&!!M.clearcoatRoughnessMap,Q=ee&&!!M.iridescenceMap,_t=ee&&!!M.iridescenceThicknessMap,st=ne&&!!M.sheenColorMap,Oe=ne&&!!M.sheenRoughnessMap,Ce=!!M.specularMap,ge=!!M.specularColorMap,je=!!M.specularIntensityMap,ut=Me&&!!M.transmissionMap,kt=Me&&!!M.thicknessMap,et=!!M.gradientMap,oe=!!M.alphaMap,I=M.alphaTest>0,ce=!!M.alphaHash,le=!!M.extensions,Ue=!!k.attributes.uv1,Pe=!!k.attributes.uv2,Mt=!!k.attributes.uv3;let bt=wr;return M.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(bt=t.toneMapping),{isWebGL2:l,shaderID:Y,shaderType:M.type,shaderName:M.name,vertexShader:j,fragmentShader:Z,defines:M.defines,customVertexShaderID:de,customFragmentShaderID:Ae,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:We,instancing:Ge,instancingColor:Ge&&z.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Ee===null?t.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:tr,map:ke,matcap:ft,envMap:O,envMapMode:O&&K.mapping,envMapCubeUVHeight:$,aoMap:wn,lightMap:Re,bumpMap:Be,normalMap:ve,displacementMap:d&&Lt,emissiveMap:Ye,normalMapObjectSpace:ve&&M.normalMapType===mx,normalMapTangentSpace:ve&&M.normalMapType===lh,metalnessMap:A,roughnessMap:T,anisotropy:B,anisotropyMap:fe,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:Ie,clearcoatRoughnessMap:Ke,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:_t,sheen:ne,sheenColorMap:st,sheenRoughnessMap:Oe,specularMap:Ce,specularColorMap:ge,specularIntensityMap:je,transmission:Me,transmissionMap:ut,thicknessMap:kt,gradientMap:et,opaque:M.transparent===!1&&M.blending===no,alphaMap:oe,alphaTest:I,alphaHash:ce,combine:M.combine,mapUv:ke&&x(M.map.channel),aoMapUv:wn&&x(M.aoMap.channel),lightMapUv:Re&&x(M.lightMap.channel),bumpMapUv:Be&&x(M.bumpMap.channel),normalMapUv:ve&&x(M.normalMap.channel),displacementMapUv:Lt&&x(M.displacementMap.channel),emissiveMapUv:Ye&&x(M.emissiveMap.channel),metalnessMapUv:A&&x(M.metalnessMap.channel),roughnessMapUv:T&&x(M.roughnessMap.channel),anisotropyMapUv:fe&&x(M.anisotropyMap.channel),clearcoatMapUv:me&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ke&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:_t&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:st&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&x(M.sheenRoughnessMap.channel),specularMapUv:Ce&&x(M.specularMap.channel),specularColorMapUv:ge&&x(M.specularColorMap.channel),specularIntensityMapUv:je&&x(M.specularIntensityMap.channel),transmissionMapUv:ut&&x(M.transmissionMap.channel),thicknessMapUv:kt&&x(M.thicknessMap.channel),alphaMapUv:oe&&x(M.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ve||B),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Pe,vertexUv3s:Mt,pointsUvs:z.isPoints===!0&&!!k.attributes.uv&&(ke||oe),fog:!!P,useFog:M.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:se,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:bt,useLegacyLights:t._useLegacyLights,decodeVideoTexture:ke&&M.map.isVideoTexture===!0&&xt.getTransfer(M.map.colorSpace)===Rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Dt,flipSided:M.side===Zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:le&&M.extensions.derivatives===!0,extensionFragDepth:le&&M.extensions.fragDepth===!0,extensionDrawBuffers:le&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const N in M.defines)S.push(N),S.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(t.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.isWebGL2&&a.enable(0),S.supportsVertexTextures&&a.enable(1),S.instancing&&a.enable(2),S.instancingColor&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.useLegacyLights&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function b(M){const S=_[M.type];let N;if(S){const W=ki[S];N=Vx.clone(W.uniforms)}else N=M.uniforms;return N}function C(M,S){let N;for(let W=0,z=f.length;W<z;W++){const P=f[W];if(P.cacheKey===S){N=P,++N.usedTimes;break}}return N===void 0&&(N=new ib(t,S,M,s),f.push(N)),N}function w(M){if(--M.usedTimes===0){const S=f.indexOf(M);f[S]=f[f.length-1],f.pop(),M.destroy()}}function R(M){c.remove(M)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:b,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:f,dispose:L}}function cb(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function lb(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function fu(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function hu(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,d,u,_,x,g){let p=t[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:u,groupOrder:_,renderOrder:h.renderOrder,z:x,group:g},t[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=u,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=x,p.group=g),e++,p}function a(h,d,u,_,x,g){const p=o(h,d,u,_,x,g);u.transmission>0?i.push(p):u.transparent===!0?r.push(p):n.push(p)}function c(h,d,u,_,x,g){const p=o(h,d,u,_,x,g);u.transmission>0?i.unshift(p):u.transparent===!0?r.unshift(p):n.unshift(p)}function f(h,d){n.length>1&&n.sort(h||lb),i.length>1&&i.sort(d||fu),r.length>1&&r.sort(d||fu)}function l(){for(let h=e,d=t.length;h<d;h++){const u=t[h];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:l,sort:f}}function fb(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new hu,t.set(i,[o])):r>=s.length?(o=new hu,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function hb(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new D,color:new xe};break;case"SpotLight":n={position:new D,direction:new D,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new xe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":n={color:new xe,position:new D,halfWidth:new D,halfHeight:new D};break}return t[e.id]=n,n}}}function db(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let ub=0;function pb(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function mb(t,e){const n=new hb,i=db(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new D);const s=new D,o=new qe,a=new qe;function c(l,h){let d=0,u=0,_=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let x=0,g=0,p=0,v=0,y=0,b=0,C=0,w=0,R=0,L=0,M=0;l.sort(pb);const S=h===!0?Math.PI:1;for(let W=0,z=l.length;W<z;W++){const P=l[W],k=P.color,V=P.intensity,K=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=k.r*V*S,u+=k.g*V*S,_+=k.b*V*S;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(P.sh.coefficients[Y],V);M++}else if(P.isDirectionalLight){const Y=n.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*S),P.castShadow){const J=P.shadow,re=i.get(P);re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,r.directionalShadow[x]=re,r.directionalShadowMap[x]=$,r.directionalShadowMatrix[x]=P.shadow.matrix,b++}r.directional[x]=Y,x++}else if(P.isSpotLight){const Y=n.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(k).multiplyScalar(V*S),Y.distance=K,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,r.spot[p]=Y;const J=P.shadow;if(P.map&&(r.spotLightMap[R]=P.map,R++,J.updateMatrices(P),P.castShadow&&L++),r.spotLightMatrix[p]=J.matrix,P.castShadow){const re=i.get(P);re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,r.spotShadow[p]=re,r.spotShadowMap[p]=$,w++}p++}else if(P.isRectAreaLight){const Y=n.get(P);Y.color.copy(k).multiplyScalar(V),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),r.rectArea[v]=Y,v++}else if(P.isPointLight){const Y=n.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*S),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const J=P.shadow,re=i.get(P);re.shadowBias=J.bias,re.shadowNormalBias=J.normalBias,re.shadowRadius=J.radius,re.shadowMapSize=J.mapSize,re.shadowCameraNear=J.camera.near,re.shadowCameraFar=J.camera.far,r.pointShadow[g]=re,r.pointShadowMap[g]=$,r.pointShadowMatrix[g]=P.shadow.matrix,C++}r.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=n.get(P);Y.skyColor.copy(P.color).multiplyScalar(V*S),Y.groundColor.copy(P.groundColor).multiplyScalar(V*S),r.hemi[y]=Y,y++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=u,r.ambient[2]=_;const N=r.hash;(N.directionalLength!==x||N.pointLength!==g||N.spotLength!==p||N.rectAreaLength!==v||N.hemiLength!==y||N.numDirectionalShadows!==b||N.numPointShadows!==C||N.numSpotShadows!==w||N.numSpotMaps!==R||N.numLightProbes!==M)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=v,r.point.length=g,r.hemi.length=y,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+R-L,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=M,N.directionalLength=x,N.pointLength=g,N.spotLength=p,N.rectAreaLength=v,N.hemiLength=y,N.numDirectionalShadows=b,N.numPointShadows=C,N.numSpotShadows=w,N.numSpotMaps=R,N.numLightProbes=M,r.version=ub++)}function f(l,h){let d=0,u=0,_=0,x=0,g=0;const p=h.matrixWorldInverse;for(let v=0,y=l.length;v<y;v++){const b=l[v];if(b.isDirectionalLight){const C=r.directional[d];C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),d++}else if(b.isSpotLight){const C=r.spot[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(b.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const C=r.point[u];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const C=r.hemi[g];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(p),g++}}}return{setup:c,setupView:f,state:r}}function du(t,e){const n=new mb(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function c(h){n.setup(i,h)}function f(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:c,setupLightsView:f,pushLight:o,pushShadow:a}}function gb(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let c;return a===void 0?(c=new du(t,e),n.set(s,[c])):o>=a.length?(c=new du(t,e),a.push(c)):c=a[o],c}function r(){n=new WeakMap}return{get:i,dispose:r}}class _b extends Ro{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ux,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class xb extends Ro{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yb=`uniform sampler2D shadow_pass;
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
}`;function Mb(t,e,n){let i=new hh;const r=new rt,s=new rt,o=new dn,a=new _b({depthPacking:px}),c=new xb,f={},l=n.maxTextureSize,h={[Ir]:Zt,[Zt]:Ir,[Dt]:Dt},d=new Dr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:vb,fragmentShader:yb}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const _=new Nn;_.setAttribute("position",new Ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ye(_,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ah;let p=this.type;this.render=function(w,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const M=t.getRenderTarget(),S=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),W=t.state;W.setBlending(Er),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const z=p!==Xi&&this.type===Xi,P=p===Xi&&this.type!==Xi;for(let k=0,V=w.length;k<V;k++){const K=w[k],$=K.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const Y=$.getFrameExtents();if(r.multiply(Y),s.copy($.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/Y.x),r.x=s.x*Y.x,$.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/Y.y),r.y=s.y*Y.y,$.mapSize.y=s.y)),$.map===null||z===!0||P===!0){const re=this.type!==Xi?{minFilter:In,magFilter:In}:{};$.map!==null&&$.map.dispose(),$.map=new ps(r.x,r.y,re),$.map.texture.name=K.name+".shadowMap",$.camera.updateProjectionMatrix()}t.setRenderTarget($.map),t.clear();const J=$.getViewportCount();for(let re=0;re<J;re++){const se=$.getViewport(re);o.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),W.viewport(o),$.updateMatrices(K,re),i=$.getFrustum(),b(R,L,$.camera,K,this.type)}$.isPointLightShadow!==!0&&this.type===Xi&&v($,L),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,t.setRenderTarget(M,S,N)};function v(w,R){const L=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ps(r.x,r.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(R,null,L,d,x,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(R,null,L,u,x,null)}function y(w,R,L,M){let S=null;const N=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)S=N;else if(S=L.isPointLight===!0?c:a,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const W=S.uuid,z=R.uuid;let P=f[W];P===void 0&&(P={},f[W]=P);let k=P[z];k===void 0&&(k=S.clone(),P[z]=k,R.addEventListener("dispose",C)),S=k}if(S.visible=R.visible,S.wireframe=R.wireframe,M===Xi?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:h[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const W=t.properties.get(S);W.light=L}return S}function b(w,R,L,M,S){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===Xi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const z=e.update(w),P=w.material;if(Array.isArray(P)){const k=z.groups;for(let V=0,K=k.length;V<K;V++){const $=k[V],Y=P[$.materialIndex];if(Y&&Y.visible){const J=y(w,Y,M,S);w.onBeforeShadow(t,w,R,L,z,J,$),t.renderBufferDirect(L,null,z,J,w,$),w.onAfterShadow(t,w,R,L,z,J,$)}}}else if(P.visible){const k=y(w,P,M,S);w.onBeforeShadow(t,w,R,L,z,k,null),t.renderBufferDirect(L,null,z,k,w,null),w.onAfterShadow(t,w,R,L,z,k,null)}}const W=w.children;for(let z=0,P=W.length;z<P;z++)b(W[z],R,L,M,S)}function C(w){w.target.removeEventListener("dispose",C);for(const L in f){const M=f[L],S=w.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function bb(t,e,n){const i=n.isWebGL2;function r(){let I=!1;const ce=new dn;let le=null;const Ue=new dn(0,0,0,0);return{setMask:function(Pe){le!==Pe&&!I&&(t.colorMask(Pe,Pe,Pe,Pe),le=Pe)},setLocked:function(Pe){I=Pe},setClear:function(Pe,Mt,bt,tn,An){An===!0&&(Pe*=tn,Mt*=tn,bt*=tn),ce.set(Pe,Mt,bt,tn),Ue.equals(ce)===!1&&(t.clearColor(Pe,Mt,bt,tn),Ue.copy(ce))},reset:function(){I=!1,le=null,Ue.set(-1,0,0,0)}}}function s(){let I=!1,ce=null,le=null,Ue=null;return{setTest:function(Pe){Pe?We(t.DEPTH_TEST):ke(t.DEPTH_TEST)},setMask:function(Pe){ce!==Pe&&!I&&(t.depthMask(Pe),ce=Pe)},setFunc:function(Pe){if(le!==Pe){switch(Pe){case W_:t.depthFunc(t.NEVER);break;case j_:t.depthFunc(t.ALWAYS);break;case X_:t.depthFunc(t.LESS);break;case vc:t.depthFunc(t.LEQUAL);break;case $_:t.depthFunc(t.EQUAL);break;case q_:t.depthFunc(t.GEQUAL);break;case Y_:t.depthFunc(t.GREATER);break;case K_:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}le=Pe}},setLocked:function(Pe){I=Pe},setClear:function(Pe){Ue!==Pe&&(t.clearDepth(Pe),Ue=Pe)},reset:function(){I=!1,ce=null,le=null,Ue=null}}}function o(){let I=!1,ce=null,le=null,Ue=null,Pe=null,Mt=null,bt=null,tn=null,An=null;return{setTest:function(St){I||(St?We(t.STENCIL_TEST):ke(t.STENCIL_TEST))},setMask:function(St){ce!==St&&!I&&(t.stencilMask(St),ce=St)},setFunc:function(St,Cn,Pi){(le!==St||Ue!==Cn||Pe!==Pi)&&(t.stencilFunc(St,Cn,Pi),le=St,Ue=Cn,Pe=Pi)},setOp:function(St,Cn,Pi){(Mt!==St||bt!==Cn||tn!==Pi)&&(t.stencilOp(St,Cn,Pi),Mt=St,bt=Cn,tn=Pi)},setLocked:function(St){I=St},setClear:function(St){An!==St&&(t.clearStencil(St),An=St)},reset:function(){I=!1,ce=null,le=null,Ue=null,Pe=null,Mt=null,bt=null,tn=null,An=null}}}const a=new r,c=new s,f=new o,l=new WeakMap,h=new WeakMap;let d={},u={},_=new WeakMap,x=[],g=null,p=!1,v=null,y=null,b=null,C=null,w=null,R=null,L=null,M=new xe(0,0,0),S=0,N=!1,W=null,z=null,P=null,k=null,V=null;const K=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Y=0;const J=t.getParameter(t.VERSION);J.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(J)[1]),$=Y>=1):J.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),$=Y>=2);let re=null,se={};const j=t.getParameter(t.SCISSOR_BOX),Z=t.getParameter(t.VIEWPORT),de=new dn().fromArray(j),Ae=new dn().fromArray(Z);function Ee(I,ce,le,Ue){const Pe=new Uint8Array(4),Mt=t.createTexture();t.bindTexture(I,Mt),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let bt=0;bt<le;bt++)i&&(I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY)?t.texImage3D(ce,0,t.RGBA,1,1,Ue,0,t.RGBA,t.UNSIGNED_BYTE,Pe):t.texImage2D(ce+bt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Pe);return Mt}const Ge={};Ge[t.TEXTURE_2D]=Ee(t.TEXTURE_2D,t.TEXTURE_2D,1),Ge[t.TEXTURE_CUBE_MAP]=Ee(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ge[t.TEXTURE_2D_ARRAY]=Ee(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Ge[t.TEXTURE_3D]=Ee(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),f.setClear(0),We(t.DEPTH_TEST),c.setFunc(vc),Ye(!1),A(Xh),We(t.CULL_FACE),ve(Er);function We(I){d[I]!==!0&&(t.enable(I),d[I]=!0)}function ke(I){d[I]!==!1&&(t.disable(I),d[I]=!1)}function ft(I,ce){return u[I]!==ce?(t.bindFramebuffer(I,ce),u[I]=ce,i&&(I===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=ce),I===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=ce)),!0):!1}function O(I,ce){let le=x,Ue=!1;if(I)if(le=_.get(ce),le===void 0&&(le=[],_.set(ce,le)),I.isWebGLMultipleRenderTargets){const Pe=I.texture;if(le.length!==Pe.length||le[0]!==t.COLOR_ATTACHMENT0){for(let Mt=0,bt=Pe.length;Mt<bt;Mt++)le[Mt]=t.COLOR_ATTACHMENT0+Mt;le.length=Pe.length,Ue=!0}}else le[0]!==t.COLOR_ATTACHMENT0&&(le[0]=t.COLOR_ATTACHMENT0,Ue=!0);else le[0]!==t.BACK&&(le[0]=t.BACK,Ue=!0);Ue&&(n.isWebGL2?t.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function wn(I){return g!==I?(t.useProgram(I),g=I,!0):!1}const Re={[Xr]:t.FUNC_ADD,[R_]:t.FUNC_SUBTRACT,[P_]:t.FUNC_REVERSE_SUBTRACT};if(i)Re[Kh]=t.MIN,Re[Jh]=t.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Re[Kh]=I.MIN_EXT,Re[Jh]=I.MAX_EXT)}const Be={[L_]:t.ZERO,[I_]:t.ONE,[D_]:t.SRC_COLOR,[ff]:t.SRC_ALPHA,[F_]:t.SRC_ALPHA_SATURATE,[z_]:t.DST_COLOR,[U_]:t.DST_ALPHA,[k_]:t.ONE_MINUS_SRC_COLOR,[hf]:t.ONE_MINUS_SRC_ALPHA,[O_]:t.ONE_MINUS_DST_COLOR,[N_]:t.ONE_MINUS_DST_ALPHA,[B_]:t.CONSTANT_COLOR,[H_]:t.ONE_MINUS_CONSTANT_COLOR,[G_]:t.CONSTANT_ALPHA,[V_]:t.ONE_MINUS_CONSTANT_ALPHA};function ve(I,ce,le,Ue,Pe,Mt,bt,tn,An,St){if(I===Er){p===!0&&(ke(t.BLEND),p=!1);return}if(p===!1&&(We(t.BLEND),p=!0),I!==C_){if(I!==v||St!==N){if((y!==Xr||w!==Xr)&&(t.blendEquation(t.FUNC_ADD),y=Xr,w=Xr),St)switch(I){case no:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case $h:t.blendFunc(t.ONE,t.ONE);break;case qh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yh:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case no:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case $h:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case qh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yh:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,C=null,R=null,L=null,M.set(0,0,0),S=0,v=I,N=St}return}Pe=Pe||ce,Mt=Mt||le,bt=bt||Ue,(ce!==y||Pe!==w)&&(t.blendEquationSeparate(Re[ce],Re[Pe]),y=ce,w=Pe),(le!==b||Ue!==C||Mt!==R||bt!==L)&&(t.blendFuncSeparate(Be[le],Be[Ue],Be[Mt],Be[bt]),b=le,C=Ue,R=Mt,L=bt),(tn.equals(M)===!1||An!==S)&&(t.blendColor(tn.r,tn.g,tn.b,An),M.copy(tn),S=An),v=I,N=!1}function Lt(I,ce){I.side===Dt?ke(t.CULL_FACE):We(t.CULL_FACE);let le=I.side===Zt;ce&&(le=!le),Ye(le),I.blending===no&&I.transparent===!1?ve(Er):ve(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),a.setMask(I.colorWrite);const Ue=I.stencilWrite;f.setTest(Ue),Ue&&(f.setMask(I.stencilWriteMask),f.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),f.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),B(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?We(t.SAMPLE_ALPHA_TO_COVERAGE):ke(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(I){W!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),W=I)}function A(I){I!==w_?(We(t.CULL_FACE),I!==z&&(I===Xh?t.cullFace(t.BACK):I===A_?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ke(t.CULL_FACE),z=I}function T(I){I!==P&&($&&t.lineWidth(I),P=I)}function B(I,ce,le){I?(We(t.POLYGON_OFFSET_FILL),(k!==ce||V!==le)&&(t.polygonOffset(ce,le),k=ce,V=le)):ke(t.POLYGON_OFFSET_FILL)}function te(I){I?We(t.SCISSOR_TEST):ke(t.SCISSOR_TEST)}function ee(I){I===void 0&&(I=t.TEXTURE0+K-1),re!==I&&(t.activeTexture(I),re=I)}function ne(I,ce,le){le===void 0&&(re===null?le=t.TEXTURE0+K-1:le=re);let Ue=se[le];Ue===void 0&&(Ue={type:void 0,texture:void 0},se[le]=Ue),(Ue.type!==I||Ue.texture!==ce)&&(re!==le&&(t.activeTexture(le),re=le),t.bindTexture(I,ce||Ge[I]),Ue.type=I,Ue.texture=ce)}function Me(){const I=se[re];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function fe(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ie(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ke(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ce(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function je(I){de.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),de.copy(I))}function ut(I){Ae.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),Ae.copy(I))}function kt(I,ce){let le=h.get(ce);le===void 0&&(le=new WeakMap,h.set(ce,le));let Ue=le.get(I);Ue===void 0&&(Ue=t.getUniformBlockIndex(ce,I.name),le.set(I,Ue))}function et(I,ce){const Ue=h.get(ce).get(I);l.get(ce)!==Ue&&(t.uniformBlockBinding(ce,Ue,I.__bindingPointIndex),l.set(ce,Ue))}function oe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},re=null,se={},u={},_=new WeakMap,x=[],g=null,p=!1,v=null,y=null,b=null,C=null,w=null,R=null,L=null,M=new xe(0,0,0),S=0,N=!1,W=null,z=null,P=null,k=null,V=null,de.set(0,0,t.canvas.width,t.canvas.height),Ae.set(0,0,t.canvas.width,t.canvas.height),a.reset(),c.reset(),f.reset()}return{buffers:{color:a,depth:c,stencil:f},enable:We,disable:ke,bindFramebuffer:ft,drawBuffers:O,useProgram:wn,setBlending:ve,setMaterial:Lt,setFlipSided:Ye,setCullFace:A,setLineWidth:T,setPolygonOffset:B,setScissorTest:te,activeTexture:ee,bindTexture:ne,unbindTexture:Me,compressedTexImage2D:fe,compressedTexImage3D:me,texImage2D:Ce,texImage3D:ge,updateUBOMapping:kt,uniformBlockBinding:et,texStorage2D:st,texStorage3D:Oe,texSubImage2D:Ie,texSubImage3D:Ke,compressedTexSubImage2D:Q,compressedTexSubImage3D:_t,scissor:je,viewport:ut,reset:oe}}function Sb(t,e,n,i,r,s,o){const a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap;let h;const d=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,T){return u?new OffscreenCanvas(A,T):Tc("canvas")}function x(A,T,B,te){let ee=1;if((A.width>te||A.height>te)&&(ee=te/Math.max(A.width,A.height)),ee<1||T===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){const ne=T?_f:Math.floor,Me=ne(ee*A.width),fe=ne(ee*A.height);h===void 0&&(h=_(Me,fe));const me=B?_(Me,fe):h;return me.width=Me,me.height=fe,me.getContext("2d").drawImage(A,0,0,Me,fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Me+"x"+fe+")."),me}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function g(A){return Cd(A.width)&&Cd(A.height)}function p(A){return a?!1:A.wrapS!==Ti||A.wrapT!==Ti||A.minFilter!==In&&A.minFilter!==li}function v(A,T){return A.generateMipmaps&&T&&A.minFilter!==In&&A.minFilter!==li}function y(A){t.generateMipmap(A)}function b(A,T,B,te,ee=!1){if(a===!1)return T;if(A!==null){if(t[A]!==void 0)return t[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ne=T;if(T===t.RED&&(B===t.FLOAT&&(ne=t.R32F),B===t.HALF_FLOAT&&(ne=t.R16F),B===t.UNSIGNED_BYTE&&(ne=t.R8)),T===t.RED_INTEGER&&(B===t.UNSIGNED_BYTE&&(ne=t.R8UI),B===t.UNSIGNED_SHORT&&(ne=t.R16UI),B===t.UNSIGNED_INT&&(ne=t.R32UI),B===t.BYTE&&(ne=t.R8I),B===t.SHORT&&(ne=t.R16I),B===t.INT&&(ne=t.R32I)),T===t.RG&&(B===t.FLOAT&&(ne=t.RG32F),B===t.HALF_FLOAT&&(ne=t.RG16F),B===t.UNSIGNED_BYTE&&(ne=t.RG8)),T===t.RGBA){const Me=ee?yc:xt.getTransfer(te);B===t.FLOAT&&(ne=t.RGBA32F),B===t.HALF_FLOAT&&(ne=t.RGBA16F),B===t.UNSIGNED_BYTE&&(ne=Me===Rt?t.SRGB8_ALPHA8:t.RGBA8),B===t.UNSIGNED_SHORT_4_4_4_4&&(ne=t.RGBA4),B===t.UNSIGNED_SHORT_5_5_5_1&&(ne=t.RGB5_A1)}return(ne===t.R16F||ne===t.R32F||ne===t.RG16F||ne===t.RG32F||ne===t.RGBA16F||ne===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function C(A,T,B){return v(A,B)===!0||A.isFramebufferTexture&&A.minFilter!==In&&A.minFilter!==li?Math.log2(Math.max(T.width,T.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?T.mipmaps.length:1}function w(A){return A===In||A===Zh||A===hl?t.NEAREST:t.LINEAR}function R(A){const T=A.target;T.removeEventListener("dispose",R),M(T),T.isVideoTexture&&l.delete(T)}function L(A){const T=A.target;T.removeEventListener("dispose",L),N(T)}function M(A){const T=i.get(A);if(T.__webglInit===void 0)return;const B=A.source,te=d.get(B);if(te){const ee=te[T.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(A),Object.keys(te).length===0&&d.delete(B)}i.remove(A)}function S(A){const T=i.get(A);t.deleteTexture(T.__webglTexture);const B=A.source,te=d.get(B);delete te[T.__cacheKey],o.memory.textures--}function N(A){const T=A.texture,B=i.get(A),te=i.get(T);if(te.__webglTexture!==void 0&&(t.deleteTexture(te.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(B.__webglFramebuffer[ee]))for(let ne=0;ne<B.__webglFramebuffer[ee].length;ne++)t.deleteFramebuffer(B.__webglFramebuffer[ee][ne]);else t.deleteFramebuffer(B.__webglFramebuffer[ee]);B.__webglDepthbuffer&&t.deleteRenderbuffer(B.__webglDepthbuffer[ee])}else{if(Array.isArray(B.__webglFramebuffer))for(let ee=0;ee<B.__webglFramebuffer.length;ee++)t.deleteFramebuffer(B.__webglFramebuffer[ee]);else t.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&t.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&t.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let ee=0;ee<B.__webglColorRenderbuffer.length;ee++)B.__webglColorRenderbuffer[ee]&&t.deleteRenderbuffer(B.__webglColorRenderbuffer[ee]);B.__webglDepthRenderbuffer&&t.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let ee=0,ne=T.length;ee<ne;ee++){const Me=i.get(T[ee]);Me.__webglTexture&&(t.deleteTexture(Me.__webglTexture),o.memory.textures--),i.remove(T[ee])}i.remove(T),i.remove(A)}let W=0;function z(){W=0}function P(){const A=W;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),W+=1,A}function k(A){const T=[];return T.push(A.wrapS),T.push(A.wrapT),T.push(A.wrapR||0),T.push(A.magFilter),T.push(A.minFilter),T.push(A.anisotropy),T.push(A.internalFormat),T.push(A.format),T.push(A.type),T.push(A.generateMipmaps),T.push(A.premultiplyAlpha),T.push(A.flipY),T.push(A.unpackAlignment),T.push(A.colorSpace),T.join()}function V(A,T){const B=i.get(A);if(A.isVideoTexture&&Lt(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const te=A.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,A,T);return}}n.bindTexture(t.TEXTURE_2D,B.__webglTexture,t.TEXTURE0+T)}function K(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,T);return}n.bindTexture(t.TEXTURE_2D_ARRAY,B.__webglTexture,t.TEXTURE0+T)}function $(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,T);return}n.bindTexture(t.TEXTURE_3D,B.__webglTexture,t.TEXTURE0+T)}function Y(A,T){const B=i.get(A);if(A.version>0&&B.__version!==A.version){Ae(B,A,T);return}n.bindTexture(t.TEXTURE_CUBE_MAP,B.__webglTexture,t.TEXTURE0+T)}const J={[vo]:t.REPEAT,[Ti]:t.CLAMP_TO_EDGE,[pf]:t.MIRRORED_REPEAT},re={[In]:t.NEAREST,[Zh]:t.NEAREST_MIPMAP_NEAREST,[hl]:t.NEAREST_MIPMAP_LINEAR,[li]:t.LINEAR,[rx]:t.LINEAR_MIPMAP_NEAREST,[na]:t.LINEAR_MIPMAP_LINEAR},se={[gx]:t.NEVER,[bx]:t.ALWAYS,[_x]:t.LESS,[hm]:t.LEQUAL,[xx]:t.EQUAL,[Mx]:t.GEQUAL,[vx]:t.GREATER,[yx]:t.NOTEQUAL};function j(A,T,B){if(B?(t.texParameteri(A,t.TEXTURE_WRAP_S,J[T.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,J[T.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,J[T.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,re[T.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,re[T.minFilter])):(t.texParameteri(A,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(A,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(T.wrapS!==Ti||T.wrapT!==Ti)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(A,t.TEXTURE_MAG_FILTER,w(T.magFilter)),t.texParameteri(A,t.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==In&&T.minFilter!==li&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,se[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===In||T.minFilter!==hl&&T.minFilter!==na||T.type===yr&&e.has("OES_texture_float_linear")===!1||a===!1&&T.type===ia&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||i.get(T).__currentAnisotropy)&&(t.texParameterf(A,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy)}}function Z(A,T){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,T.addEventListener("dispose",R));const te=T.source;let ee=d.get(te);ee===void 0&&(ee={},d.set(te,ee));const ne=k(T);if(ne!==A.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ee[ne].usedTimes++;const Me=ee[A.__cacheKey];Me!==void 0&&(ee[A.__cacheKey].usedTimes--,Me.usedTimes===0&&S(T)),A.__cacheKey=ne,A.__webglTexture=ee[ne].texture}return B}function de(A,T,B){let te=t.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(te=t.TEXTURE_2D_ARRAY),T.isData3DTexture&&(te=t.TEXTURE_3D);const ee=Z(A,T),ne=T.source;n.bindTexture(te,A.__webglTexture,t.TEXTURE0+B);const Me=i.get(ne);if(ne.version!==Me.__version||ee===!0){n.activeTexture(t.TEXTURE0+B);const fe=xt.getPrimaries(xt.workingColorSpace),me=T.colorSpace===Kn?null:xt.getPrimaries(T.colorSpace),Ie=T.colorSpace===Kn||fe===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const Ke=p(T)&&g(T.image)===!1;let Q=x(T.image,Ke,!1,r.maxTextureSize);Q=Ye(T,Q);const _t=g(Q)||a,st=s.convert(T.format,T.colorSpace);let Oe=s.convert(T.type),Ce=b(T.internalFormat,st,Oe,T.colorSpace,T.isVideoTexture);j(te,T,_t);let ge;const je=T.mipmaps,ut=a&&T.isVideoTexture!==!0&&Ce!==lm,kt=Me.__version===void 0||ee===!0,et=C(T,Q,_t);if(T.isDepthTexture)Ce=t.DEPTH_COMPONENT,a?T.type===yr?Ce=t.DEPTH_COMPONENT32F:T.type===vr?Ce=t.DEPTH_COMPONENT24:T.type===ss?Ce=t.DEPTH24_STENCIL8:Ce=t.DEPTH_COMPONENT16:T.type===yr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===os&&Ce===t.DEPTH_COMPONENT&&T.type!==ch&&T.type!==vr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=vr,Oe=s.convert(T.type)),T.format===yo&&Ce===t.DEPTH_COMPONENT&&(Ce=t.DEPTH_STENCIL,T.type!==ss&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=ss,Oe=s.convert(T.type))),kt&&(ut?n.texStorage2D(t.TEXTURE_2D,1,Ce,Q.width,Q.height):n.texImage2D(t.TEXTURE_2D,0,Ce,Q.width,Q.height,0,st,Oe,null));else if(T.isDataTexture)if(je.length>0&&_t){ut&&kt&&n.texStorage2D(t.TEXTURE_2D,et,Ce,je[0].width,je[0].height);for(let oe=0,I=je.length;oe<I;oe++)ge=je[oe],ut?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,ge.width,ge.height,st,Oe,ge.data):n.texImage2D(t.TEXTURE_2D,oe,Ce,ge.width,ge.height,0,st,Oe,ge.data);T.generateMipmaps=!1}else ut?(kt&&n.texStorage2D(t.TEXTURE_2D,et,Ce,Q.width,Q.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Q.width,Q.height,st,Oe,Q.data)):n.texImage2D(t.TEXTURE_2D,0,Ce,Q.width,Q.height,0,st,Oe,Q.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ut&&kt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,et,Ce,je[0].width,je[0].height,Q.depth);for(let oe=0,I=je.length;oe<I;oe++)ge=je[oe],T.format!==Ei?st!==null?ut?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,Q.depth,st,ge.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,oe,Ce,ge.width,ge.height,Q.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?n.texSubImage3D(t.TEXTURE_2D_ARRAY,oe,0,0,0,ge.width,ge.height,Q.depth,st,Oe,ge.data):n.texImage3D(t.TEXTURE_2D_ARRAY,oe,Ce,ge.width,ge.height,Q.depth,0,st,Oe,ge.data)}else{ut&&kt&&n.texStorage2D(t.TEXTURE_2D,et,Ce,je[0].width,je[0].height);for(let oe=0,I=je.length;oe<I;oe++)ge=je[oe],T.format!==Ei?st!==null?ut?n.compressedTexSubImage2D(t.TEXTURE_2D,oe,0,0,ge.width,ge.height,st,ge.data):n.compressedTexImage2D(t.TEXTURE_2D,oe,Ce,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,ge.width,ge.height,st,Oe,ge.data):n.texImage2D(t.TEXTURE_2D,oe,Ce,ge.width,ge.height,0,st,Oe,ge.data)}else if(T.isDataArrayTexture)ut?(kt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,et,Ce,Q.width,Q.height,Q.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,st,Oe,Q.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ce,Q.width,Q.height,Q.depth,0,st,Oe,Q.data);else if(T.isData3DTexture)ut?(kt&&n.texStorage3D(t.TEXTURE_3D,et,Ce,Q.width,Q.height,Q.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,st,Oe,Q.data)):n.texImage3D(t.TEXTURE_3D,0,Ce,Q.width,Q.height,Q.depth,0,st,Oe,Q.data);else if(T.isFramebufferTexture){if(kt)if(ut)n.texStorage2D(t.TEXTURE_2D,et,Ce,Q.width,Q.height);else{let oe=Q.width,I=Q.height;for(let ce=0;ce<et;ce++)n.texImage2D(t.TEXTURE_2D,ce,Ce,oe,I,0,st,Oe,null),oe>>=1,I>>=1}}else if(je.length>0&&_t){ut&&kt&&n.texStorage2D(t.TEXTURE_2D,et,Ce,je[0].width,je[0].height);for(let oe=0,I=je.length;oe<I;oe++)ge=je[oe],ut?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,st,Oe,ge):n.texImage2D(t.TEXTURE_2D,oe,Ce,st,Oe,ge);T.generateMipmaps=!1}else ut?(kt&&n.texStorage2D(t.TEXTURE_2D,et,Ce,Q.width,Q.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,st,Oe,Q)):n.texImage2D(t.TEXTURE_2D,0,Ce,st,Oe,Q);v(T,_t)&&y(te),Me.__version=ne.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function Ae(A,T,B){if(T.image.length!==6)return;const te=Z(A,T),ee=T.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+B);const ne=i.get(ee);if(ee.version!==ne.__version||te===!0){n.activeTexture(t.TEXTURE0+B);const Me=xt.getPrimaries(xt.workingColorSpace),fe=T.colorSpace===Kn?null:xt.getPrimaries(T.colorSpace),me=T.colorSpace===Kn||Me===fe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ie=T.isCompressedTexture||T.image[0].isCompressedTexture,Ke=T.image[0]&&T.image[0].isDataTexture,Q=[];for(let oe=0;oe<6;oe++)!Ie&&!Ke?Q[oe]=x(T.image[oe],!1,!0,r.maxCubemapSize):Q[oe]=Ke?T.image[oe].image:T.image[oe],Q[oe]=Ye(T,Q[oe]);const _t=Q[0],st=g(_t)||a,Oe=s.convert(T.format,T.colorSpace),Ce=s.convert(T.type),ge=b(T.internalFormat,Oe,Ce,T.colorSpace),je=a&&T.isVideoTexture!==!0,ut=ne.__version===void 0||te===!0;let kt=C(T,_t,st);j(t.TEXTURE_CUBE_MAP,T,st);let et;if(Ie){je&&ut&&n.texStorage2D(t.TEXTURE_CUBE_MAP,kt,ge,_t.width,_t.height);for(let oe=0;oe<6;oe++){et=Q[oe].mipmaps;for(let I=0;I<et.length;I++){const ce=et[I];T.format!==Ei?Oe!==null?je?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I,0,0,ce.width,ce.height,Oe,ce.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I,ge,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I,0,0,ce.width,ce.height,Oe,Ce,ce.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I,ge,ce.width,ce.height,0,Oe,Ce,ce.data)}}}else{et=T.mipmaps,je&&ut&&(et.length>0&&kt++,n.texStorage2D(t.TEXTURE_CUBE_MAP,kt,ge,Q[0].width,Q[0].height));for(let oe=0;oe<6;oe++)if(Ke){je?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Q[oe].width,Q[oe].height,Oe,Ce,Q[oe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ge,Q[oe].width,Q[oe].height,0,Oe,Ce,Q[oe].data);for(let I=0;I<et.length;I++){const le=et[I].image[oe].image;je?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I+1,0,0,le.width,le.height,Oe,Ce,le.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I+1,ge,le.width,le.height,0,Oe,Ce,le.data)}}else{je?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Oe,Ce,Q[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ge,Oe,Ce,Q[oe]);for(let I=0;I<et.length;I++){const ce=et[I];je?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I+1,0,0,Oe,Ce,ce.image[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,I+1,ge,Oe,Ce,ce.image[oe])}}}v(T,st)&&y(t.TEXTURE_CUBE_MAP),ne.__version=ee.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function Ee(A,T,B,te,ee,ne){const Me=s.convert(B.format,B.colorSpace),fe=s.convert(B.type),me=b(B.internalFormat,Me,fe,B.colorSpace);if(!i.get(T).__hasExternalTextures){const Ke=Math.max(1,T.width>>ne),Q=Math.max(1,T.height>>ne);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,ne,me,Ke,Q,T.depth,0,Me,fe,null):n.texImage2D(ee,ne,me,Ke,Q,0,Me,fe,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),ve(T)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,ee,i.get(B).__webglTexture,0,Be(T)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,te,ee,i.get(B).__webglTexture,ne),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(A,T,B){if(t.bindRenderbuffer(t.RENDERBUFFER,A),T.depthBuffer&&!T.stencilBuffer){let te=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(B||ve(T)){const ee=T.depthTexture;ee&&ee.isDepthTexture&&(ee.type===yr?te=t.DEPTH_COMPONENT32F:ee.type===vr&&(te=t.DEPTH_COMPONENT24));const ne=Be(T);ve(T)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ne,te,T.width,T.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,te,T.width,T.height)}else t.renderbufferStorage(t.RENDERBUFFER,te,T.width,T.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,A)}else if(T.depthBuffer&&T.stencilBuffer){const te=Be(T);B&&ve(T)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,T.width,T.height):ve(T)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,T.width,T.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,A)}else{const te=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ee=0;ee<te.length;ee++){const ne=te[ee],Me=s.convert(ne.format,ne.colorSpace),fe=s.convert(ne.type),me=b(ne.internalFormat,Me,fe,ne.colorSpace),Ie=Be(T);B&&ve(T)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ie,me,T.width,T.height):ve(T)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ie,me,T.width,T.height):t.renderbufferStorage(t.RENDERBUFFER,me,T.width,T.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function We(A,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);const te=i.get(T.depthTexture).__webglTexture,ee=Be(T);if(T.depthTexture.format===os)ve(T)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0);else if(T.depthTexture.format===yo)ve(T)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function ke(A){const T=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!T.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");We(T.__webglFramebuffer,A)}else if(B){T.__webglDepthbuffer=[];for(let te=0;te<6;te++)n.bindFramebuffer(t.FRAMEBUFFER,T.__webglFramebuffer[te]),T.__webglDepthbuffer[te]=t.createRenderbuffer(),Ge(T.__webglDepthbuffer[te],A,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=t.createRenderbuffer(),Ge(T.__webglDepthbuffer,A,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function ft(A,T,B){const te=i.get(A);T!==void 0&&Ee(te.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),B!==void 0&&ke(A)}function O(A){const T=A.texture,B=i.get(A),te=i.get(T);A.addEventListener("dispose",L),A.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=t.createTexture()),te.__version=T.version,o.memory.textures++);const ee=A.isWebGLCubeRenderTarget===!0,ne=A.isWebGLMultipleRenderTargets===!0,Me=g(A)||a;if(ee){B.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(a&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer[fe]=[];for(let me=0;me<T.mipmaps.length;me++)B.__webglFramebuffer[fe][me]=t.createFramebuffer()}else B.__webglFramebuffer[fe]=t.createFramebuffer()}else{if(a&&T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer=[];for(let fe=0;fe<T.mipmaps.length;fe++)B.__webglFramebuffer[fe]=t.createFramebuffer()}else B.__webglFramebuffer=t.createFramebuffer();if(ne)if(r.drawBuffers){const fe=A.texture;for(let me=0,Ie=fe.length;me<Ie;me++){const Ke=i.get(fe[me]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&ve(A)===!1){const fe=ne?T:[T];B.__webglMultisampledFramebuffer=t.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let me=0;me<fe.length;me++){const Ie=fe[me];B.__webglColorRenderbuffer[me]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,B.__webglColorRenderbuffer[me]);const Ke=s.convert(Ie.format,Ie.colorSpace),Q=s.convert(Ie.type),_t=b(Ie.internalFormat,Ke,Q,Ie.colorSpace,A.isXRRenderTarget===!0),st=Be(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,st,_t,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,B.__webglColorRenderbuffer[me])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=t.createRenderbuffer(),Ge(B.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ee){n.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture),j(t.TEXTURE_CUBE_MAP,T,Me);for(let fe=0;fe<6;fe++)if(a&&T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Ee(B.__webglFramebuffer[fe][me],A,T,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else Ee(B.__webglFramebuffer[fe],A,T,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);v(T,Me)&&y(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ne){const fe=A.texture;for(let me=0,Ie=fe.length;me<Ie;me++){const Ke=fe[me],Q=i.get(Ke);n.bindTexture(t.TEXTURE_2D,Q.__webglTexture),j(t.TEXTURE_2D,Ke,Me),Ee(B.__webglFramebuffer,A,Ke,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,0),v(Ke,Me)&&y(t.TEXTURE_2D)}n.unbindTexture()}else{let fe=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?fe=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(fe,te.__webglTexture),j(fe,T,Me),a&&T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Ee(B.__webglFramebuffer[me],A,T,t.COLOR_ATTACHMENT0,fe,me);else Ee(B.__webglFramebuffer,A,T,t.COLOR_ATTACHMENT0,fe,0);v(T,Me)&&y(fe),n.unbindTexture()}A.depthBuffer&&ke(A)}function wn(A){const T=g(A)||a,B=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let te=0,ee=B.length;te<ee;te++){const ne=B[te];if(v(ne,T)){const Me=A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,fe=i.get(ne).__webglTexture;n.bindTexture(Me,fe),y(Me),n.unbindTexture()}}}function Re(A){if(a&&A.samples>0&&ve(A)===!1){const T=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],B=A.width,te=A.height;let ee=t.COLOR_BUFFER_BIT;const ne=[],Me=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=i.get(A),me=A.isWebGLMultipleRenderTargets===!0;if(me)for(let Ie=0;Ie<T.length;Ie++)n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Ie=0;Ie<T.length;Ie++){ne.push(t.COLOR_ATTACHMENT0+Ie),A.depthBuffer&&ne.push(Me);const Ke=fe.__ignoreDepthValues!==void 0?fe.__ignoreDepthValues:!1;if(Ke===!1&&(A.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),me&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,fe.__webglColorRenderbuffer[Ie]),Ke===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Me]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Me])),me){const Q=i.get(T[Ie]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Q,0)}t.blitFramebuffer(0,0,B,te,0,0,B,te,ee,t.NEAREST),f&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ne)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),me)for(let Ie=0;Ie<T.length;Ie++){n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,fe.__webglColorRenderbuffer[Ie]);const Ke=i.get(T[Ie]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,fe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,Ke,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}}function Be(A){return Math.min(r.maxSamples,A.samples)}function ve(A){const T=i.get(A);return a&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Lt(A){const T=o.render.frame;l.get(A)!==T&&(l.set(A,T),A.update())}function Ye(A,T){const B=A.colorSpace,te=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===mf||B!==tr&&B!==Kn&&(xt.getTransfer(B)===Rt?a===!1?e.has("EXT_sRGB")===!0&&te===Ei?(A.format=mf,A.minFilter=li,A.generateMipmaps=!1):T=um.sRGBToLinear(T):(te!==Ei||ee!==Ar)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),T}this.allocateTextureUnit=P,this.resetTextureUnits=z,this.setTexture2D=V,this.setTexture2DArray=K,this.setTexture3D=$,this.setTextureCube=Y,this.rebindTextures=ft,this.setupRenderTarget=O,this.updateRenderTargetMipmap=wn,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=ve}function Tb(t,e,n){const i=n.isWebGL2;function r(s,o=Kn){let a;const c=xt.getTransfer(o);if(s===Ar)return t.UNSIGNED_BYTE;if(s===rm)return t.UNSIGNED_SHORT_4_4_4_4;if(s===sm)return t.UNSIGNED_SHORT_5_5_5_1;if(s===sx)return t.BYTE;if(s===ox)return t.SHORT;if(s===ch)return t.UNSIGNED_SHORT;if(s===im)return t.INT;if(s===vr)return t.UNSIGNED_INT;if(s===yr)return t.FLOAT;if(s===ia)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===ax)return t.ALPHA;if(s===Ei)return t.RGBA;if(s===cx)return t.LUMINANCE;if(s===lx)return t.LUMINANCE_ALPHA;if(s===os)return t.DEPTH_COMPONENT;if(s===yo)return t.DEPTH_STENCIL;if(s===mf)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===fx)return t.RED;if(s===om)return t.RED_INTEGER;if(s===hx)return t.RG;if(s===am)return t.RG_INTEGER;if(s===cm)return t.RGBA_INTEGER;if(s===dl||s===ul||s===pl||s===ml)if(c===Rt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===dl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ul)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===pl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ml)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===dl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ul)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===pl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ml)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Qh||s===ed||s===td||s===nd)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Qh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ed)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===td)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===nd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===lm)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===id||s===rd)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===id)return c===Rt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===rd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===sd||s===od||s===ad||s===cd||s===ld||s===fd||s===hd||s===dd||s===ud||s===pd||s===md||s===gd||s===_d||s===xd)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===sd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===od)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ad)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===cd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ld)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===fd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===hd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===dd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ud)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===pd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===md)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===gd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===_d)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===xd)return c===Rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===gl||s===vd||s===yd)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===gl)return c===Rt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===vd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===yd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===dx||s===Md||s===bd||s===Sd)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===gl)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Md)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===bd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Sd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ss?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class Eb extends fi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Sn extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wb={type:"move"};class Hl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,f=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(f&&e.hand){o=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),p=this._getHandJoint(f,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const l=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],d=l.position.distanceTo(h.position),u=.02,_=.005;f.inputState.pinching&&d>u+_?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&d<=u-_&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wb)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),f!==null&&(f.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Sn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class Ab extends Co{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,f=null,l=null,h=null,d=null,u=null,_=null;const x=n.getContextAttributes();let g=null,p=null;const v=[],y=[],b=new rt;let C=null;const w=new fi;w.layers.enable(1),w.viewport=new dn;const R=new fi;R.layers.enable(2),R.viewport=new dn;const L=[w,R],M=new Eb;M.layers.enable(1),M.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=v[j];return Z===void 0&&(Z=new Hl,v[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=v[j];return Z===void 0&&(Z=new Hl,v[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=v[j];return Z===void 0&&(Z=new Hl,v[j]=Z),Z.getHandSpace()};function W(j){const Z=y.indexOf(j.inputSource);if(Z===-1)return;const de=v[Z];de!==void 0&&(de.update(j.inputSource,j.frame,f||o),de.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",P);for(let j=0;j<v.length;j++){const Z=y[j];Z!==null&&(y[j]=null,v[j].disconnect(Z))}S=null,N=null,e.setRenderTarget(g),u=null,d=null,h=null,r=null,p=null,se.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||o},this.setReferenceSpace=function(j){f=j},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(g=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",z),r.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,n,Z),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),p=new ps(u.framebufferWidth,u.framebufferHeight,{format:Ei,type:Ar,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Z=null,de=null,Ae=null;x.depth&&(Ae=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Z=x.stencil?yo:os,de=x.stencil?ss:vr);const Ee={colorFormat:n.RGBA8,depthFormat:Ae,scaleFactor:s};h=new XRWebGLBinding(r,n),d=h.createProjectionLayer(Ee),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new ps(d.textureWidth,d.textureHeight,{format:Ei,type:Ar,depthTexture:new Em(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ge=e.properties.get(p);Ge.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),f=null,o=await r.requestReferenceSpace(a),se.setContext(r),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(j){for(let Z=0;Z<j.removed.length;Z++){const de=j.removed[Z],Ae=y.indexOf(de);Ae>=0&&(y[Ae]=null,v[Ae].disconnect(de))}for(let Z=0;Z<j.added.length;Z++){const de=j.added[Z];let Ae=y.indexOf(de);if(Ae===-1){for(let Ge=0;Ge<v.length;Ge++)if(Ge>=y.length){y.push(de),Ae=Ge;break}else if(y[Ge]===null){y[Ge]=de,Ae=Ge;break}if(Ae===-1)break}const Ee=v[Ae];Ee&&Ee.connect(de)}}const k=new D,V=new D;function K(j,Z,de){k.setFromMatrixPosition(Z.matrixWorld),V.setFromMatrixPosition(de.matrixWorld);const Ae=k.distanceTo(V),Ee=Z.projectionMatrix.elements,Ge=de.projectionMatrix.elements,We=Ee[14]/(Ee[10]-1),ke=Ee[14]/(Ee[10]+1),ft=(Ee[9]+1)/Ee[5],O=(Ee[9]-1)/Ee[5],wn=(Ee[8]-1)/Ee[0],Re=(Ge[8]+1)/Ge[0],Be=We*wn,ve=We*Re,Lt=Ae/(-wn+Re),Ye=Lt*-wn;Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ye),j.translateZ(Lt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const A=We+Lt,T=ke+Lt,B=Be-Ye,te=ve+(Ae-Ye),ee=ft*ke/T*A,ne=O*ke/T*A;j.projectionMatrix.makePerspective(B,te,ee,ne,A,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function $(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;M.near=R.near=w.near=j.near,M.far=R.far=w.far=j.far,(S!==M.near||N!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),S=M.near,N=M.far);const Z=j.parent,de=M.cameras;$(M,Z);for(let Ae=0;Ae<de.length;Ae++)$(de[Ae],Z);de.length===2?K(M,w,R):M.projectionMatrix.copy(w.projectionMatrix),Y(j,M,Z)};function Y(j,Z,de){de===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(de.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=gf*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&u===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=j)};let J=null;function re(j,Z){if(l=Z.getViewerPose(f||o),_=Z,l!==null){const de=l.views;u!==null&&(e.setRenderTargetFramebuffer(p,u.framebuffer),e.setRenderTarget(p));let Ae=!1;de.length!==M.cameras.length&&(M.cameras.length=0,Ae=!0);for(let Ee=0;Ee<de.length;Ee++){const Ge=de[Ee];let We=null;if(u!==null)We=u.getViewport(Ge);else{const ft=h.getViewSubImage(d,Ge);We=ft.viewport,Ee===0&&(e.setRenderTargetTextures(p,ft.colorTexture,d.ignoreDepthValues?void 0:ft.depthStencilTexture),e.setRenderTarget(p))}let ke=L[Ee];ke===void 0&&(ke=new fi,ke.layers.enable(Ee),ke.viewport=new dn,L[Ee]=ke),ke.matrix.fromArray(Ge.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Ge.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(We.x,We.y,We.width,We.height),Ee===0&&(M.matrix.copy(ke.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Ae===!0&&M.cameras.push(ke)}}for(let de=0;de<v.length;de++){const Ae=y[de],Ee=v[de];Ae!==null&&Ee!==void 0&&Ee.update(Ae,Z,f||o)}J&&J(j,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),_=null}const se=new Sm;se.setAnimationLoop(re),this.setAnimationLoop=function(j){J=j},this.dispose=function(){}}}function Cb(t,e){function n(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,ym(t)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,y,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),l(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&u(g,p,b)):p.isMeshMatcapMaterial?(s(g,p),_(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,v,y):p.isSpriteMaterial?f(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,n(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,n(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Zt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,n(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Zt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,n(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,n(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(g.envMap.value=v,g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap){g.lightMap.value=p.lightMap;const y=t._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=p.lightMapIntensity*y,n(p.lightMap,g.lightMapTransform)}p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,n(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,n(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function f(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,n(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,n(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,g.roughnessMapTransform)),e.get(p).envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function u(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Zt&&g.clearcoatNormalScale.value.negate())),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Rb(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,y){const b=y.program;i.uniformBlockBinding(v,b)}function f(v,y){let b=r[v.id];b===void 0&&(_(v),b=l(v),r[v.id]=b,v.addEventListener("dispose",g));const C=y.program;i.updateUBOMapping(v,C);const w=e.render.frame;s[v.id]!==w&&(d(v),s[v.id]=w)}function l(v){const y=h();v.__bindingPointIndex=y;const b=t.createBuffer(),C=v.__size,w=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,C,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,y,b),b}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=r[v.id],b=v.uniforms,C=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,y);for(let w=0,R=b.length;w<R;w++){const L=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,S=L.length;M<S;M++){const N=L[M];if(u(N,w,M,C)===!0){const W=N.__offset,z=Array.isArray(N.value)?N.value:[N.value];let P=0;for(let k=0;k<z.length;k++){const V=z[k],K=x(V);typeof V=="number"||typeof V=="boolean"?(N.__data[0]=V,t.bufferSubData(t.UNIFORM_BUFFER,W+P,N.__data)):V.isMatrix3?(N.__data[0]=V.elements[0],N.__data[1]=V.elements[1],N.__data[2]=V.elements[2],N.__data[3]=0,N.__data[4]=V.elements[3],N.__data[5]=V.elements[4],N.__data[6]=V.elements[5],N.__data[7]=0,N.__data[8]=V.elements[6],N.__data[9]=V.elements[7],N.__data[10]=V.elements[8],N.__data[11]=0):(V.toArray(N.__data,P),P+=K.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,W,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function u(v,y,b,C){const w=v.value,R=y+"_"+b;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const L=C[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return C[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function _(v){const y=v.uniforms;let b=0;const C=16;for(let R=0,L=y.length;R<L;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let S=0,N=M.length;S<N;S++){const W=M[S],z=Array.isArray(W.value)?W.value:[W.value];for(let P=0,k=z.length;P<k;P++){const V=z[P],K=x(V),$=b%C;$!==0&&C-$<K.boundary&&(b+=C-$),W.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=K.storage}}}const w=b%C;return w>0&&(b+=C-w),v.__size=b,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const b=o.indexOf(y.__bindingPointIndex);o.splice(b,1),t.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function p(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:f,dispose:p}}class Lm{constructor(e={}){const{canvas:n=Tx(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:f=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const u=new Uint32Array(4),_=new Int32Array(4);let x=null,g=null;const p=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gt,this._useLegacyLights=!1,this.toneMapping=wr,this.toneMappingExposure=1;const y=this;let b=!1,C=0,w=0,R=null,L=-1,M=null;const S=new dn,N=new dn;let W=null;const z=new xe(0);let P=0,k=n.width,V=n.height,K=1,$=null,Y=null;const J=new dn(0,0,k,V),re=new dn(0,0,k,V);let se=!1;const j=new hh;let Z=!1,de=!1,Ae=null;const Ee=new qe,Ge=new rt,We=new D,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ft(){return R===null?K:1}let O=i;function wn(E,U){for(let H=0;H<E.length;H++){const G=E[H],F=n.getContext(G,U);if(F!==null)return F}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:f,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${oh}`),n.addEventListener("webglcontextlost",oe,!1),n.addEventListener("webglcontextrestored",I,!1),n.addEventListener("webglcontextcreationerror",ce,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),O=wn(U,E),O===null)throw wn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Re,Be,ve,Lt,Ye,A,T,B,te,ee,ne,Me,fe,me,Ie,Ke,Q,_t,st,Oe,Ce,ge,je,ut;function kt(){Re=new FM(O),Be=new DM(O,Re,e),Re.init(Be),ge=new Tb(O,Re,Be),ve=new bb(O,Re,Be),Lt=new GM(O),Ye=new cb,A=new Sb(O,Re,ve,Ye,Be,ge,Lt),T=new UM(y),B=new OM(y),te=new Kx(O,Be),je=new LM(O,Re,te,Be),ee=new BM(O,te,Lt,je),ne=new XM(O,ee,te,Lt),st=new jM(O,Be,A),Ke=new kM(Ye),Me=new ab(y,T,B,Re,Be,je,Ke),fe=new Cb(y,Ye),me=new fb,Ie=new gb(Re,Be),_t=new PM(y,T,B,ve,ne,d,c),Q=new Mb(y,ne,Be),ut=new Rb(O,Lt,Be,ve),Oe=new IM(O,Re,Lt,Be),Ce=new HM(O,Re,Lt,Be),Lt.programs=Me.programs,y.capabilities=Be,y.extensions=Re,y.properties=Ye,y.renderLists=me,y.shadowMap=Q,y.state=ve,y.info=Lt}kt();const et=new Ab(y,O);this.xr=et,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=Re.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Re.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(E){E!==void 0&&(K=E,this.setSize(k,V,!1))},this.getSize=function(E){return E.set(k,V)},this.setSize=function(E,U,H=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=E,V=U,n.width=Math.floor(E*K),n.height=Math.floor(U*K),H===!0&&(n.style.width=E+"px",n.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(k*K,V*K).floor()},this.setDrawingBufferSize=function(E,U,H){k=E,V=U,K=H,n.width=Math.floor(E*H),n.height=Math.floor(U*H),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(S)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,U,H,G){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,U,H,G),ve.viewport(S.copy(J).multiplyScalar(K).floor())},this.getScissor=function(E){return E.copy(re)},this.setScissor=function(E,U,H,G){E.isVector4?re.set(E.x,E.y,E.z,E.w):re.set(E,U,H,G),ve.scissor(N.copy(re).multiplyScalar(K).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){ve.setScissorTest(se=E)},this.setOpaqueSort=function(E){$=E},this.setTransparentSort=function(E){Y=E},this.getClearColor=function(E){return E.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor.apply(_t,arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha.apply(_t,arguments)},this.clear=function(E=!0,U=!0,H=!0){let G=0;if(E){let F=!1;if(R!==null){const ue=R.texture.format;F=ue===cm||ue===am||ue===om}if(F){const ue=R.texture.type,be=ue===Ar||ue===vr||ue===ch||ue===ss||ue===rm||ue===sm,Le=_t.getClearColor(),Ne=_t.getClearAlpha(),Je=Le.r,He=Le.g,Ve=Le.b;be?(u[0]=Je,u[1]=He,u[2]=Ve,u[3]=Ne,O.clearBufferuiv(O.COLOR,0,u)):(_[0]=Je,_[1]=He,_[2]=Ve,_[3]=Ne,O.clearBufferiv(O.COLOR,0,_))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT),H&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",oe,!1),n.removeEventListener("webglcontextrestored",I,!1),n.removeEventListener("webglcontextcreationerror",ce,!1),me.dispose(),Ie.dispose(),Ye.dispose(),T.dispose(),B.dispose(),ne.dispose(),je.dispose(),ut.dispose(),Me.dispose(),et.dispose(),et.removeEventListener("sessionstart",An),et.removeEventListener("sessionend",St),Ae&&(Ae.dispose(),Ae=null),Cn.stop()};function oe(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const E=Lt.autoReset,U=Q.enabled,H=Q.autoUpdate,G=Q.needsUpdate,F=Q.type;kt(),Lt.autoReset=E,Q.enabled=U,Q.autoUpdate=H,Q.needsUpdate=G,Q.type=F}function ce(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function le(E){const U=E.target;U.removeEventListener("dispose",le),Ue(U)}function Ue(E){Pe(E),Ye.remove(E)}function Pe(E){const U=Ye.get(E).programs;U!==void 0&&(U.forEach(function(H){Me.releaseProgram(H)}),E.isShaderMaterial&&Me.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,H,G,F,ue){U===null&&(U=ke);const be=F.isMesh&&F.matrixWorld.determinant()<0,Le=xg(E,U,H,G,F);ve.setMaterial(G,be);let Ne=H.index,Je=1;if(G.wireframe===!0){if(Ne=ee.getWireframeAttribute(H),Ne===void 0)return;Je=2}const He=H.drawRange,Ve=H.attributes.position;let Bt=He.start*Je,Wn=(He.start+He.count)*Je;ue!==null&&(Bt=Math.max(Bt,ue.start*Je),Wn=Math.min(Wn,(ue.start+ue.count)*Je)),Ne!==null?(Bt=Math.max(Bt,0),Wn=Math.min(Wn,Ne.count)):Ve!=null&&(Bt=Math.max(Bt,0),Wn=Math.min(Wn,Ve.count));const nn=Wn-Bt;if(nn<0||nn===1/0)return;je.setup(F,G,Le,H,Ne);let Oi,It=Oe;if(Ne!==null&&(Oi=te.get(Ne),It=Ce,It.setIndex(Oi)),F.isMesh)G.wireframe===!0?(ve.setLineWidth(G.wireframeLinewidth*ft()),It.setMode(O.LINES)):It.setMode(O.TRIANGLES);else if(F.isLine){let tt=G.linewidth;tt===void 0&&(tt=1),ve.setLineWidth(tt*ft()),F.isLineSegments?It.setMode(O.LINES):F.isLineLoop?It.setMode(O.LINE_LOOP):It.setMode(O.LINE_STRIP)}else F.isPoints?It.setMode(O.POINTS):F.isSprite&&It.setMode(O.TRIANGLES);if(F.isBatchedMesh)It.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)It.renderInstances(Bt,nn,F.count);else if(H.isInstancedBufferGeometry){const tt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,nl=Math.min(H.instanceCount,tt);It.renderInstances(Bt,nn,nl)}else It.render(Bt,nn)};function Mt(E,U,H){E.transparent===!0&&E.side===Dt&&E.forceSinglePass===!1?(E.side=Zt,E.needsUpdate=!0,ya(E,U,H),E.side=Ir,E.needsUpdate=!0,ya(E,U,H),E.side=Dt):ya(E,U,H)}this.compile=function(E,U,H=null){H===null&&(H=E),g=Ie.get(H),g.init(),v.push(g),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),E!==H&&E.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),g.setupLights(y._useLegacyLights);const G=new Set;return E.traverse(function(F){const ue=F.material;if(ue)if(Array.isArray(ue))for(let be=0;be<ue.length;be++){const Le=ue[be];Mt(Le,H,F),G.add(Le)}else Mt(ue,H,F),G.add(ue)}),v.pop(),g=null,G},this.compileAsync=function(E,U,H=null){const G=this.compile(E,U,H);return new Promise(F=>{function ue(){if(G.forEach(function(be){Ye.get(be).currentProgram.isReady()&&G.delete(be)}),G.size===0){F(E);return}setTimeout(ue,10)}Re.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let bt=null;function tn(E){bt&&bt(E)}function An(){Cn.stop()}function St(){Cn.start()}const Cn=new Sm;Cn.setAnimationLoop(tn),typeof self!="undefined"&&Cn.setContext(self),this.setAnimationLoop=function(E){bt=E,et.setAnimationLoop(E),E===null?Cn.stop():Cn.start()},et.addEventListener("sessionstart",An),et.addEventListener("sessionend",St),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(U),U=et.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,R),g=Ie.get(E,v.length),g.init(),v.push(g),Ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),j.setFromProjectionMatrix(Ee),de=this.localClippingEnabled,Z=Ke.init(this.clippingPlanes,de),x=me.get(E,p.length),x.init(),p.push(x),Pi(E,U,0,y.sortObjects),x.finish(),y.sortObjects===!0&&x.sort($,Y),this.info.render.frame++,Z===!0&&Ke.beginShadows();const H=g.state.shadowsArray;if(Q.render(H,E,U),Z===!0&&Ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),_t.render(x,E),g.setupLights(y._useLegacyLights),U.isArrayCamera){const G=U.cameras;for(let F=0,ue=G.length;F<ue;F++){const be=G[F];Dh(x,E,be,be.viewport)}}else Dh(x,E,U);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(y,E,U),je.resetDefaultState(),L=-1,M=null,v.pop(),v.length>0?g=v[v.length-1]:g=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Pi(E,U,H,G){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){G&&We.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ee);const be=ne.update(E),Le=E.material;Le.visible&&x.push(E,be,Le,H,We.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const be=ne.update(E),Le=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),We.copy(E.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),We.copy(be.boundingSphere.center)),We.applyMatrix4(E.matrixWorld).applyMatrix4(Ee)),Array.isArray(Le)){const Ne=be.groups;for(let Je=0,He=Ne.length;Je<He;Je++){const Ve=Ne[Je],Bt=Le[Ve.materialIndex];Bt&&Bt.visible&&x.push(E,be,Bt,H,We.z,Ve)}}else Le.visible&&x.push(E,be,Le,H,We.z,null)}}const ue=E.children;for(let be=0,Le=ue.length;be<Le;be++)Pi(ue[be],U,H,G)}function Dh(E,U,H,G){const F=E.opaque,ue=E.transmissive,be=E.transparent;g.setupLightsView(H),Z===!0&&Ke.setGlobalState(y.clippingPlanes,H),ue.length>0&&_g(F,ue,U,H),G&&ve.viewport(S.copy(G)),F.length>0&&va(F,U,H),ue.length>0&&va(ue,U,H),be.length>0&&va(be,U,H),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function _g(E,U,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const ue=Be.isWebGL2;Ae===null&&(Ae=new ps(1,1,{generateMipmaps:!0,type:Re.has("EXT_color_buffer_half_float")?ia:Ar,minFilter:na,samples:ue?4:0})),y.getDrawingBufferSize(Ge),ue?Ae.setSize(Ge.x,Ge.y):Ae.setSize(_f(Ge.x),_f(Ge.y));const be=y.getRenderTarget();y.setRenderTarget(Ae),y.getClearColor(z),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();const Le=y.toneMapping;y.toneMapping=wr,va(E,H,G),A.updateMultisampleRenderTarget(Ae),A.updateRenderTargetMipmap(Ae);let Ne=!1;for(let Je=0,He=U.length;Je<He;Je++){const Ve=U[Je],Bt=Ve.object,Wn=Ve.geometry,nn=Ve.material,Oi=Ve.group;if(nn.side===Dt&&Bt.layers.test(G.layers)){const It=nn.side;nn.side=Zt,nn.needsUpdate=!0,kh(Bt,H,G,Wn,nn,Oi),nn.side=It,nn.needsUpdate=!0,Ne=!0}}Ne===!0&&(A.updateMultisampleRenderTarget(Ae),A.updateRenderTargetMipmap(Ae)),y.setRenderTarget(be),y.setClearColor(z,P),y.toneMapping=Le}function va(E,U,H){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ue=E.length;F<ue;F++){const be=E[F],Le=be.object,Ne=be.geometry,Je=G===null?be.material:G,He=be.group;Le.layers.test(H.layers)&&kh(Le,U,H,Ne,Je,He)}}function kh(E,U,H,G,F,ue){E.onBeforeRender(y,U,H,G,F,ue),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,U,H,G,E,ue),F.transparent===!0&&F.side===Dt&&F.forceSinglePass===!1?(F.side=Zt,F.needsUpdate=!0,y.renderBufferDirect(H,U,G,F,E,ue),F.side=Ir,F.needsUpdate=!0,y.renderBufferDirect(H,U,G,F,E,ue),F.side=Dt):y.renderBufferDirect(H,U,G,F,E,ue),E.onAfterRender(y,U,H,G,F,ue)}function ya(E,U,H){U.isScene!==!0&&(U=ke);const G=Ye.get(E),F=g.state.lights,ue=g.state.shadowsArray,be=F.state.version,Le=Me.getParameters(E,F.state,ue,U,H),Ne=Me.getProgramCacheKey(Le);let Je=G.programs;G.environment=E.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(E.isMeshStandardMaterial?B:T).get(E.envMap||G.environment),Je===void 0&&(E.addEventListener("dispose",le),Je=new Map,G.programs=Je);let He=Je.get(Ne);if(He!==void 0){if(G.currentProgram===He&&G.lightsStateVersion===be)return Nh(E,Le),He}else Le.uniforms=Me.getUniforms(E),E.onBuild(H,Le,y),E.onBeforeCompile(Le,y),He=Me.acquireProgram(Le,Ne),Je.set(Ne,He),G.uniforms=Le.uniforms;const Ve=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ve.clippingPlanes=Ke.uniform),Nh(E,Le),G.needsLights=yg(E),G.lightsStateVersion=be,G.needsLights&&(Ve.ambientLightColor.value=F.state.ambient,Ve.lightProbe.value=F.state.probe,Ve.directionalLights.value=F.state.directional,Ve.directionalLightShadows.value=F.state.directionalShadow,Ve.spotLights.value=F.state.spot,Ve.spotLightShadows.value=F.state.spotShadow,Ve.rectAreaLights.value=F.state.rectArea,Ve.ltc_1.value=F.state.rectAreaLTC1,Ve.ltc_2.value=F.state.rectAreaLTC2,Ve.pointLights.value=F.state.point,Ve.pointLightShadows.value=F.state.pointShadow,Ve.hemisphereLights.value=F.state.hemi,Ve.directionalShadowMap.value=F.state.directionalShadowMap,Ve.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ve.spotShadowMap.value=F.state.spotShadowMap,Ve.spotLightMatrix.value=F.state.spotLightMatrix,Ve.spotLightMap.value=F.state.spotLightMap,Ve.pointShadowMap.value=F.state.pointShadowMap,Ve.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=He,G.uniformsList=null,He}function Uh(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Qa.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Nh(E,U){const H=Ye.get(E);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function xg(E,U,H,G,F){U.isScene!==!0&&(U=ke),A.resetTextureUnits();const ue=U.fog,be=G.isMeshStandardMaterial?U.environment:null,Le=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:tr,Ne=(G.isMeshStandardMaterial?B:T).get(G.envMap||be),Je=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,He=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ve=!!H.morphAttributes.position,Bt=!!H.morphAttributes.normal,Wn=!!H.morphAttributes.color;let nn=wr;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(nn=y.toneMapping);const Oi=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,It=Oi!==void 0?Oi.length:0,tt=Ye.get(G),nl=g.state.lights;if(Z===!0&&(de===!0||E!==M)){const ii=E===M&&G.id===L;Ke.setState(G,E,ii)}let Ut=!1;G.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==nl.state.version||tt.outputColorSpace!==Le||F.isBatchedMesh&&tt.batching===!1||!F.isBatchedMesh&&tt.batching===!0||F.isInstancedMesh&&tt.instancing===!1||!F.isInstancedMesh&&tt.instancing===!0||F.isSkinnedMesh&&tt.skinning===!1||!F.isSkinnedMesh&&tt.skinning===!0||F.isInstancedMesh&&tt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&tt.instancingColor===!1&&F.instanceColor!==null||tt.envMap!==Ne||G.fog===!0&&tt.fog!==ue||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==Ke.numPlanes||tt.numIntersection!==Ke.numIntersection)||tt.vertexAlphas!==Je||tt.vertexTangents!==He||tt.morphTargets!==Ve||tt.morphNormals!==Bt||tt.morphColors!==Wn||tt.toneMapping!==nn||Be.isWebGL2===!0&&tt.morphTargetsCount!==It)&&(Ut=!0):(Ut=!0,tt.__version=G.version);let kr=tt.currentProgram;Ut===!0&&(kr=ya(G,U,F));let zh=!1,Do=!1,il=!1;const xn=kr.getUniforms(),Ur=tt.uniforms;if(ve.useProgram(kr.program)&&(zh=!0,Do=!0,il=!0),G.id!==L&&(L=G.id,Do=!0),zh||M!==E){xn.setValue(O,"projectionMatrix",E.projectionMatrix),xn.setValue(O,"viewMatrix",E.matrixWorldInverse);const ii=xn.map.cameraPosition;ii!==void 0&&ii.setValue(O,We.setFromMatrixPosition(E.matrixWorld)),Be.logarithmicDepthBuffer&&xn.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&xn.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Do=!0,il=!0)}if(F.isSkinnedMesh){xn.setOptional(O,F,"bindMatrix"),xn.setOptional(O,F,"bindMatrixInverse");const ii=F.skeleton;ii&&(Be.floatVertexTextures?(ii.boneTexture===null&&ii.computeBoneTexture(),xn.setValue(O,"boneTexture",ii.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(xn.setOptional(O,F,"batchingTexture"),xn.setValue(O,"batchingTexture",F._matricesTexture,A));const rl=H.morphAttributes;if((rl.position!==void 0||rl.normal!==void 0||rl.color!==void 0&&Be.isWebGL2===!0)&&st.update(F,H,kr),(Do||tt.receiveShadow!==F.receiveShadow)&&(tt.receiveShadow=F.receiveShadow,xn.setValue(O,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ur.envMap.value=Ne,Ur.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Do&&(xn.setValue(O,"toneMappingExposure",y.toneMappingExposure),tt.needsLights&&vg(Ur,il),ue&&G.fog===!0&&fe.refreshFogUniforms(Ur,ue),fe.refreshMaterialUniforms(Ur,G,K,V,Ae),Qa.upload(O,Uh(tt),Ur,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Qa.upload(O,Uh(tt),Ur,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&xn.setValue(O,"center",F.center),xn.setValue(O,"modelViewMatrix",F.modelViewMatrix),xn.setValue(O,"normalMatrix",F.normalMatrix),xn.setValue(O,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const ii=G.uniformsGroups;for(let sl=0,Mg=ii.length;sl<Mg;sl++)if(Be.isWebGL2){const Oh=ii[sl];ut.update(Oh,kr),ut.bind(Oh,kr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return kr}function vg(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function yg(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,U,H){Ye.get(E.texture).__webglTexture=U,Ye.get(E.depthTexture).__webglTexture=H;const G=Ye.get(E);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,U){const H=Ye.get(E);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,H=0){R=E,C=U,w=H;let G=!0,F=null,ue=!1,be=!1;if(E){const Ne=Ye.get(E);Ne.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(O.FRAMEBUFFER,null),G=!1):Ne.__webglFramebuffer===void 0?A.setupRenderTarget(E):Ne.__hasExternalTextures&&A.rebindTextures(E,Ye.get(E.texture).__webglTexture,Ye.get(E.depthTexture).__webglTexture);const Je=E.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(be=!0);const He=Ye.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(He[U])?F=He[U][H]:F=He[U],ue=!0):Be.isWebGL2&&E.samples>0&&A.useMultisampledRTT(E)===!1?F=Ye.get(E).__webglMultisampledFramebuffer:Array.isArray(He)?F=He[H]:F=He,S.copy(E.viewport),N.copy(E.scissor),W=E.scissorTest}else S.copy(J).multiplyScalar(K).floor(),N.copy(re).multiplyScalar(K).floor(),W=se;if(ve.bindFramebuffer(O.FRAMEBUFFER,F)&&Be.drawBuffers&&G&&ve.drawBuffers(E,F),ve.viewport(S),ve.scissor(N),ve.setScissorTest(W),ue){const Ne=Ye.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ne.__webglTexture,H)}else if(be){const Ne=Ye.get(E.texture),Je=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.__webglTexture,H||0,Je)}L=-1},this.readRenderTargetPixels=function(E,U,H,G,F,ue,be){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Ye.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&be!==void 0&&(Le=Le[be]),Le){ve.bindFramebuffer(O.FRAMEBUFFER,Le);try{const Ne=E.texture,Je=Ne.format,He=Ne.type;if(Je!==Ei&&ge.convert(Je)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=He===ia&&(Re.has("EXT_color_buffer_half_float")||Be.isWebGL2&&Re.has("EXT_color_buffer_float"));if(He!==Ar&&ge.convert(He)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===yr&&(Be.isWebGL2||Re.has("OES_texture_float")||Re.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-G&&H>=0&&H<=E.height-F&&O.readPixels(U,H,G,F,ge.convert(Je),ge.convert(He),ue)}finally{const Ne=R!==null?Ye.get(R).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(E,U,H=0){const G=Math.pow(2,-H),F=Math.floor(U.image.width*G),ue=Math.floor(U.image.height*G);A.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,E.x,E.y,F,ue),ve.unbindTexture()},this.copyTextureToTexture=function(E,U,H,G=0){const F=U.image.width,ue=U.image.height,be=ge.convert(H.format),Le=ge.convert(H.type);A.setTexture2D(H,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,G,E.x,E.y,F,ue,be,Le,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,G,E.x,E.y,U.mipmaps[0].width,U.mipmaps[0].height,be,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,G,E.x,E.y,be,Le,U.image),G===0&&H.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(E,U,H,G,F=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=E.max.x-E.min.x+1,be=E.max.y-E.min.y+1,Le=E.max.z-E.min.z+1,Ne=ge.convert(G.format),Je=ge.convert(G.type);let He;if(G.isData3DTexture)A.setTexture3D(G,0),He=O.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)A.setTexture2DArray(G,0),He=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const Ve=O.getParameter(O.UNPACK_ROW_LENGTH),Bt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Wn=O.getParameter(O.UNPACK_SKIP_PIXELS),nn=O.getParameter(O.UNPACK_SKIP_ROWS),Oi=O.getParameter(O.UNPACK_SKIP_IMAGES),It=H.isCompressedTexture?H.mipmaps[F]:H.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,It.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,It.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,E.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,E.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,E.min.z),H.isDataTexture||H.isData3DTexture?O.texSubImage3D(He,F,U.x,U.y,U.z,ue,be,Le,Ne,Je,It.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(He,F,U.x,U.y,U.z,ue,be,Le,Ne,It.data)):O.texSubImage3D(He,F,U.x,U.y,U.z,ue,be,Le,Ne,Je,It),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ve),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Bt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Wn),O.pixelStorei(O.UNPACK_SKIP_ROWS,nn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Oi),F===0&&G.generateMipmaps&&O.generateMipmap(He),ve.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ve.unbindTexture()},this.resetState=function(){C=0,w=0,R=null,ve.reset(),je.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===fh?"display-p3":"srgb",n.unpackColorSpace=xt.workingColorSpace===$c?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Gt?as:fm}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===as?Gt:tr}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Pb extends Lm{}Pb.prototype.isWebGL1Renderer=!0;class uh{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new xe(e),this.near=n,this.far=i}clone(){return new uh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lb extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class bo extends Ci{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Bs=new qe,uu=new qe,ja=[],pu=new ms,Ib=new qe,Bo=new ye,Ho=new ma;class di extends ye{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new bo(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Ib)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new ms),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Bs),pu.copy(e.boundingBox).applyMatrix4(Bs),this.boundingBox.union(pu)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new ma),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Bs),Ho.copy(e.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(Ho)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}raycast(e,n){const i=this.matrixWorld,r=this.count;if(Bo.geometry=this.geometry,Bo.material=this.material,Bo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ho.copy(this.boundingSphere),Ho.applyMatrix4(i),e.ray.intersectsSphere(Ho)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Bs),uu.multiplyMatrices(i,Bs),Bo.matrixWorld=uu,Bo.raycast(e,ja);for(let o=0,a=ja.length;o<a;o++){const c=ja[o];c.instanceId=s,c.object=this,n.push(c)}ja.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new bo(new Float32Array(this.instanceMatrix.count*3),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ra extends Vn{constructor(e,n,i,r,s,o,a,c,f){super(e,n,i,r,s,o,a,c,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yc extends Nn{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],c=[],f=new D,l=new rt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=n;h++,d+=3){const u=i+h/n*r;f.x=e*Math.cos(u),f.y=e*Math.sin(u),o.push(f.x,f.y,f.z),a.push(0,0,1),l.x=(o[d]/e+1)/2,l.y=(o[d+1]/e+1)/2,c.push(l.x,l.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class $e extends Nn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const f=this;r=Math.floor(r),s=Math.floor(s);const l=[],h=[],d=[],u=[];let _=0;const x=[],g=i/2;let p=0;v(),o===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(l),this.setAttribute("position",new gt(h,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(u,2));function v(){const b=new D,C=new D;let w=0;const R=(n-e)/i;for(let L=0;L<=s;L++){const M=[],S=L/s,N=S*(n-e)+e;for(let W=0;W<=r;W++){const z=W/r,P=z*c+a,k=Math.sin(P),V=Math.cos(P);C.x=N*k,C.y=-S*i+g,C.z=N*V,h.push(C.x,C.y,C.z),b.set(k,R,V).normalize(),d.push(b.x,b.y,b.z),u.push(z,1-S),M.push(_++)}x.push(M)}for(let L=0;L<r;L++)for(let M=0;M<s;M++){const S=x[M][L],N=x[M+1][L],W=x[M+1][L+1],z=x[M][L+1];l.push(S,N,z),l.push(N,W,z),w+=6}f.addGroup(p,w,0),p+=w}function y(b){const C=_,w=new rt,R=new D;let L=0;const M=b===!0?e:n,S=b===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,g*S,0),d.push(0,S,0),u.push(.5,.5),_++;const N=_;for(let W=0;W<=r;W++){const P=W/r*c+a,k=Math.cos(P),V=Math.sin(P);R.x=M*V,R.y=g*S,R.z=M*k,h.push(R.x,R.y,R.z),d.push(0,S,0),w.x=k*.5+.5,w.y=V*.5*S+.5,u.push(w.x,w.y),_++}for(let W=0;W<r;W++){const z=C+W,P=N+W;b===!0?l.push(P,P+1,z):l.push(P+1,P,z),L+=3}f.addGroup(p,L,b===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gn extends $e{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Gn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ph extends Nn{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],o=[];a(r),f(i),l(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new D,b=new D,C=new D;for(let w=0;w<n.length;w+=3)u(n[w+0],y),u(n[w+1],b),u(n[w+2],C),c(y,b,C,v)}function c(v,y,b,C){const w=C+1,R=[];for(let L=0;L<=w;L++){R[L]=[];const M=v.clone().lerp(b,L/w),S=y.clone().lerp(b,L/w),N=w-L;for(let W=0;W<=N;W++)W===0&&L===w?R[L][W]=M:R[L][W]=M.clone().lerp(S,W/N)}for(let L=0;L<w;L++)for(let M=0;M<2*(w-L)-1;M++){const S=Math.floor(M/2);M%2===0?(d(R[L][S+1]),d(R[L+1][S]),d(R[L][S])):(d(R[L][S+1]),d(R[L+1][S+1]),d(R[L+1][S]))}}function f(v){const y=new D;for(let b=0;b<s.length;b+=3)y.x=s[b+0],y.y=s[b+1],y.z=s[b+2],y.normalize().multiplyScalar(v),s[b+0]=y.x,s[b+1]=y.y,s[b+2]=y.z}function l(){const v=new D;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const b=g(v)/2/Math.PI+.5,C=p(v)/Math.PI+.5;o.push(b,1-C)}_(),h()}function h(){for(let v=0;v<o.length;v+=6){const y=o[v+0],b=o[v+2],C=o[v+4],w=Math.max(y,b,C),R=Math.min(y,b,C);w>.9&&R<.1&&(y<.2&&(o[v+0]+=1),b<.2&&(o[v+2]+=1),C<.2&&(o[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function u(v,y){const b=v*3;y.x=e[b+0],y.y=e[b+1],y.z=e[b+2]}function _(){const v=new D,y=new D,b=new D,C=new D,w=new rt,R=new rt,L=new rt;for(let M=0,S=0;M<s.length;M+=9,S+=6){v.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),b.set(s[M+6],s[M+7],s[M+8]),w.set(o[S+0],o[S+1]),R.set(o[S+2],o[S+3]),L.set(o[S+4],o[S+5]),C.copy(v).add(y).add(b).divideScalar(3);const N=g(C);x(w,S+0,v,N),x(R,S+2,y,N),x(L,S+4,b,N)}}function x(v,y,b,C){C<0&&v.x===1&&(o[y]=v.x-1),b.x===0&&b.z===0&&(o[y]=C/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ph(e.vertices,e.indices,e.radius,e.details)}}class Ec extends ph{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,n),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Ec(e.radius,e.detail)}}class Lo extends Nn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],c=[],f=[],l=[];let h=e;const d=(n-e)/r,u=new D,_=new rt;for(let x=0;x<=r;x++){for(let g=0;g<=i;g++){const p=s+g/i*o;u.x=h*Math.cos(p),u.y=h*Math.sin(p),c.push(u.x,u.y,u.z),f.push(0,0,1),_.x=(u.x/n+1)/2,_.y=(u.y/n+1)/2,l.push(_.x,_.y)}h+=d}for(let x=0;x<r;x++){const g=x*(i+1);for(let p=0;p<i;p++){const v=p+g,y=v,b=v+i+1,C=v+i+2,w=v+1;a.push(y,b,w),a.push(b,C,w)}}this.setIndex(a),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dn extends Nn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let f=0;const l=[],h=new D,d=new D,u=[],_=[],x=[],g=[];for(let p=0;p<=i;p++){const v=[],y=p/i;let b=0;p===0&&o===0?b=.5/n:p===i&&c===Math.PI&&(b=-.5/n);for(let C=0;C<=n;C++){const w=C/n;h.x=-e*Math.cos(r+w*s)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(r+w*s)*Math.sin(o+y*a),_.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),g.push(w+b,1-y),v.push(f++)}l.push(v)}for(let p=0;p<i;p++)for(let v=0;v<n;v++){const y=l[p][v+1],b=l[p][v],C=l[p+1][v],w=l[p+1][v+1];(p!==0||o>0)&&u.push(y,b,w),(p!==i-1||c<Math.PI)&&u.push(b,C,w)}this.setIndex(u),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ys extends Nn{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],f=[],l=new D,h=new D,d=new D;for(let u=0;u<=i;u++)for(let _=0;_<=r;_++){const x=_/r*s,g=u/i*Math.PI*2;h.x=(e+n*Math.cos(g))*Math.cos(x),h.y=(e+n*Math.cos(g))*Math.sin(x),h.z=n*Math.sin(g),a.push(h.x,h.y,h.z),l.x=e*Math.cos(x),l.y=e*Math.sin(x),d.subVectors(h,l).normalize(),c.push(d.x,d.y,d.z),f.push(_/r),f.push(u/i)}for(let u=1;u<=i;u++)for(let _=1;_<=r;_++){const x=(r+1)*u+_-1,g=(r+1)*(u-1)+_-1,p=(r+1)*(u-1)+_,v=(r+1)*u+_;o.push(x,g,v),o.push(g,p,v)}this.setIndex(o),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class mh extends Ro{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new xe(16777215),this.specular=new xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tn extends Ro{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Im extends un{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}class Db extends Im{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const Gl=new qe,mu=new D,gu=new D;class kb{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hh,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new dn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;mu.setFromMatrixPosition(e.matrixWorld),n.position.copy(mu),gu.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(gu),n.updateMatrixWorld(),Gl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ub extends kb{constructor(){super(new Tm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nb extends Im{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new Ub}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oh);const Dm={low:{name:"Low",pixelRatio:1,antialias:!1,particles:120,splats:30,fogScale:.8,shadows:0,softShadows:!1,shadowRange:0,grass:0,clouds:!1},medium:{name:"Medium",pixelRatio:1.35,antialias:!0,particles:260,splats:60,fogScale:1,shadows:1024,softShadows:!1,shadowRange:30,grass:2600,clouds:!0},high:{name:"High",pixelRatio:2,antialias:!0,particles:420,splats:90,fogScale:1,shadows:2048,softShadows:!0,shadowRange:42,grass:6e3,clouds:!0}},_u=["low","medium","high"];function zb(){try{return localStorage.getItem("rally-quality")||"auto"}catch{return"auto"}}function Ob(t){try{localStorage.setItem("rally-quality",t)}catch{}}function Fb(){let t="";try{const r=document.createElement("canvas"),s=r.getContext("webgl"),o=s&&s.getExtension("WEBGL_debug_renderer_info");t=o?String(s.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{}const e=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||4,i=matchMedia("(pointer: coarse)").matches;return/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(t)||n<=2||e<=2?"low":i?n<=3||e<=4?"low":"medium":"high"}const dt={setting:zb(),detected:Fb(),level:"medium",stepped:!1,get cfg(){return Dm[this.level]}};dt.level=dt.setting==="auto"?dt.detected:dt.setting;function Bb(){const t=_u.indexOf(dt.level);return t<=0?null:(dt.level=_u[t-1],dt.stepped=!0,dt.level)}const xu={dunes:{g1:14859650,g2:13804648,g3:12160860,zenith:4160208,horizon:15128248,sun:16773330,sunI:3.1,sky:14214911,gnd:11570268,hemiI:1.25,fog:[70,230],sunDir:[.55,.62,.3],ground:"sand",grass:.22,grassCol:[11046984,15258238]},river:{g1:8824908,g2:7312448,zenith:4883152,horizon:14280426,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},forest:{g1:6258744,g2:7180094,zenith:5998260,horizon:13030594,sun:16772816,sunI:2.7,sky:13622506,gnd:4479023,hemiI:1.35,fog:[30,140],sunDir:[.45,.7,.4],ground:"grass",grass:1.2,grassCol:[3496484,8826194]},forum:{zenith:4883666,horizon:15129803,sun:16773334,sunI:3,sky:14214399,gnd:11049084,hemiI:1.25,fog:[70,230],sunDir:[.5,.64,.35],ground:"paving",grass:.08,grassCol:[7305788,11055200]},colosseum:{zenith:4882640,horizon:15260868,sun:16773330,sunI:3,sky:14214399,gnd:11570268,hemiI:1.2,fog:[90,260],sunDir:[.45,.72,.3],ground:"sand",grass:0,grassCol:[10127946,14206074]},desert:{g1:14859650,g2:13804648,g3:12160860,zenith:3831504,horizon:15259316,sun:16773328,sunI:3.2,sky:14214911,gnd:11570268,hemiI:1.2,fog:[80,240],sunDir:[.55,.6,.3],ground:"sand",grass:.15,grassCol:[11046984,15258238]},wooden:{g1:8955982,g2:7509066,zenith:4883152,horizon:14083304,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},valley:{g1:9614419,g2:8035908,zenith:4423892,horizon:14412010,sun:16774108,sunI:3.1,sky:13952255,gnd:6123328,hemiI:1.3,fog:[70,230],sunDir:[.52,.62,.38],ground:"grass",grass:1.4,grassCol:[4880942,11849834]},frost:{g1:13884902,g2:12569816,g3:11056834,zenith:6262732,horizon:15002609,sun:16774890,sunI:2.3,sky:15134463,gnd:10135218,hemiI:1.1,fog:[50,190],sunDir:[.5,.6,.45],ground:"snow",grass:.12,grassCol:[8227450,13227727]}},km=t=>xu[t]||xu.dunes,Vl={};function gh(t,e,n,i=!0){if(Vl[t])return Vl[t];const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d");n(s,e,ds(t.length*7919+e));const o=new ra(r);return o.wrapS=o.wrapT=vo,o.anisotropy=4,o.colorSpace=i?Gt:Kn,Vl[t]=o}function Hb(t,e,n){const i=[];for(let o=0;o<e*e;o++)i.push(n());const r=(o,a)=>i[(a+e)%e*e+(o+e)%e],s=o=>o*o*(3-2*o);return(o,a)=>{const c=o/t*e,f=a/t*e,l=Math.floor(c),h=Math.floor(f),d=s(c-l),u=s(f-h);return(r(l,h)*(1-d)+r(l+1,h)*d)*(1-u)+(r(l,h+1)*(1-d)+r(l+1,h+1)*d)*u}}function Ks(t,e,n,i,r,s){const o=t.createImageData(e,e),a=o.data,c=s.map(([f,l])=>[Hb(e,f,n),l]);for(let f=0;f<e;f++)for(let l=0;l<e;l++){let h=0;for(const[_,x]of c)h+=(_(l,f)-.5)*x;const d=Math.max(0,Math.min(255,(i+h*r)*255)),u=(f*e+l)*4;a[u]=a[u+1]=a[u+2]=d,a[u+3]=255}t.putImageData(o,0,0)}const Gb=t=>gh("ground-"+t,256,(e,n,i)=>{if(t==="sand"){Ks(e,n,i,.86,.5,[[4,.6],[16,.5],[64,.35]]),e.globalAlpha=.07,e.strokeStyle="#000",e.lineWidth=3;for(let r=0;r<14;r++){const s=r*n/14+i()*6;e.beginPath();for(let o=-10;o<=n+10;o+=8)e.lineTo(o,s+Math.sin(o/n*Math.PI*4+r)*5);e.stroke()}e.globalAlpha=.25;for(let r=0;r<900;r++)e.fillStyle=i()<.5?"#fff":"#6b5a40",e.fillRect(i()*n,i()*n,1,1)}else if(t==="paving"){Ks(e,n,i,.86,.3,[[8,.5],[32,.4]]);const r=6,s=n/r;for(let o=0;o<r;o++)for(let a=0;a<r;a++){const c=o%2*s/2;e.globalAlpha=.06+i()*.1,e.fillStyle=i()<.5?"#000":"#fff",e.fillRect(a*s+c+2,o*s+2,s-4,s-4),e.globalAlpha=.35,e.strokeStyle="#5a5246",e.lineWidth=2,e.strokeRect(a*s+c+1,o*s+1,s-2,s-2),e.strokeRect(a*s+c-n+1,o*s+1,s-2,s-2)}}else if(t==="snow"){Ks(e,n,i,.95,.25,[[4,.6],[16,.4],[64,.2]]),e.globalAlpha=.5;for(let r=0;r<400;r++)e.fillStyle="#fff",e.fillRect(i()*n,i()*n,1,1)}else{Ks(e,n,i,.82,.55,[[4,.7],[16,.5],[64,.3]]),e.lineWidth=1.2;for(let r=0;r<2600;r++){const s=i()*n,o=i()*n,a=3+i()*6,c=(i()-.5)*.9;e.globalAlpha=.18+i()*.2,e.strokeStyle=i()<.5?"#1c2a10":"#ffffff",e.beginPath(),e.moveTo(s,o),e.lineTo(s+Math.sin(c)*a,o-Math.cos(c)*a),e.stroke()}}e.globalAlpha=1}),Qi=()=>gh("stone",256,(t,e,n)=>{Ks(t,e,n,.8,.35,[[8,.5],[32,.5]]);const i=8,r=e/i;for(let s=0;s<i;s++){const o=s%2*.5,a=4;for(let c=-1;c<a;c++){const f=e/a,l=(c+o)*f+(n()-.5)*6;t.globalAlpha=.12+n()*.12,t.fillStyle=n()<.5?"#000":"#fff",t.fillRect(l+2,s*r+2,f-4,r-4),t.globalAlpha=.3,t.strokeStyle="#3a3733",t.lineWidth=2,t.strokeRect(l+1,s*r+1,f-2,r-2)}}t.globalAlpha=1}),Cr=()=>gh("wood",128,(t,e,n)=>{Ks(t,e,n,.8,.3,[[4,.4]]);for(let i=0;i<90;i++){const r=n()*e;t.globalAlpha=.08+n()*.15,t.fillStyle=n()<.6?"#000":"#fff",t.fillRect(r,0,1+n()*2,e)}t.globalAlpha=1});function qt(t,e,n){const i=t.attributes.uv;for(let r=0;r<i.count;r++)i.setXY(r,i.getX(r)*e,i.getY(r)*n);return t}const Vb=document.getElementById("gl"),ei=new Lm({canvas:Vb,antialias:dt.cfg.antialias,powerPreference:"high-performance"});ei.outputColorSpace=Gt;ei.toneMapping=tm;ei.toneMappingExposure=1.15;const Ft=new Lb;Ft.fog=new uh(14472902,70,190);const mt=new fi(60,1,.1,420),ec=new Db(14214911,11570268,1.25);Ft.add(ec);const wi=new Nb(16773330,3);Ft.add(wi,wi.target);const Kr=new D(.55,.62,.3).normalize(),Jr={zenith:{value:new xe},horizon:{value:new xe},sunCol:{value:new xe},sunDir:{value:Kr.clone()},time:{value:0},clouds:{value:1}},Kc=new ye(new Dn(400,32,16),new Dr({uniforms:Jr,side:Zt,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }",fragmentShader:`
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
    }`}));Kc.renderOrder=-10;Kc.frustumCulled=!1;Ft.add(Kc);const wt={W:0,H:0,DPR:1};function Um(){ei.setPixelRatio(Math.min(window.devicePixelRatio||1,dt.cfg.pixelRatio))}function Wb(){wt.W=innerWidth,wt.H=innerHeight,wt.DPR=Math.min(window.devicePixelRatio||1,2),Um(),ei.setSize(wt.W,wt.H,!1),mt.aspect=wt.W/wt.H,mt.fov=wt.W<wt.H?78:60,mt.updateProjectionMatrix()}function Nm(){const t=dt.cfg,e=t.shadows>0,n=ei.shadowMap.enabled!==e;if(ei.shadowMap.enabled=e,ei.shadowMap.type=t.softShadows?em:ah,wi.castShadow=e,e){const i=wi.shadow,r=t.shadowRange;i.mapSize.set(t.shadows,t.shadows),i.camera.left=-r,i.camera.right=r,i.camera.top=r,i.camera.bottom=-r,i.camera.near=1,i.camera.far=260,i.camera.updateProjectionMatrix(),i.bias=-6e-4,i.normalBias=.04,i.map&&(i.map.dispose(),i.map=null)}return n&&Ft.traverse(i=>{i.material&&[].concat(i.material).forEach(r=>r.needsUpdate=!0)}),Jr.clouds.value=t.clouds?1:0,e}const zm=()=>ei.shadowMap.enabled,jb=new D;function Om(t,e,n){if(Jr.time.value=n,Kc.position.copy(mt.position),!wi.castShadow){wi.position.set(t,0,e).addScaledVector(Kr,150),wi.target.position.set(t,0,e);return}const i=dt.cfg.shadowRange,r=2*i/dt.cfg.shadows,s=jb.set(Kr.z,0,-Kr.x).normalize(),o=t*s.x+e*s.z,a=Math.round(o/r)*r-o,c=t+s.x*a,f=e+s.z*a;wi.target.position.set(c,0,f),wi.position.set(c,0,f).addScaledVector(Kr,150)}function Xb(t){const e=km(t.id);Jr.zenith.value.set(e.zenith),Jr.horizon.value.set(e.horizon),Jr.sunCol.value.set(e.sun),Kr.set(...e.sunDir).normalize(),Jr.sunDir.value.copy(Kr),Ft.fog.color.set(e.horizon),Ft.fog.near=e.fog[0]*dt.cfg.fogScale,Ft.fog.far=e.fog[1]*dt.cfg.fogScale,ec.color.set(e.sky),ec.groundColor.set(e.gnd),ec.intensity=e.hemiI,wi.color.set(e.sun),wi.intensity=e.sunI}const $t=(t,e,n={})=>new Tn(Object.assign({color:t,map:e||null},n)),nt={marble:$t(15920610,Qi()),marbleDark:$t(14209216,Qi()),plaster:$t(15392710),roof:$t(11818298),sand:$t(14729100,Qi()),sandDark:$t(13215346,Qi()),wood:$t(8018490,Cr()),log:$t(6966067,Cr()),thatch:$t(12097104),dark:$t(2760728),bronze:new mh({color:13144124,shininess:60,specular:6706483}),palmTrunk:$t(9071172,Cr()),palmLeaf:$t(4879408,null,{side:Dt}),iron:$t(3815998)},Wt=(t,e=!0)=>(t.traverse(n=>{n.isMesh&&(n.castShadow=e,n.receiveShadow=!0)}),t),vu=new qe,yu=new ni,Mu=new zi,$b=new D,qb=new D,sn=(t,e,n,i,r,s,o,a,c,f,l)=>{Mu.set(s,o,a),yu.setFromEuler(Mu),vu.compose($b.set(n,i,r),yu,qb.set(c,f,l)),t.setMatrixAt(e,vu)};function on(t,e,n,i){const r=new di(t,e,Math.max(1,n.length));return n.forEach((s,o)=>i(r,o,s)),r.count=n.length,r}let Zr={gates:[],crowdU:null};function bu(t,e,n){const i=new Nn,r=t/2,s=n/2,o=[-r,0,s,r,0,s,0,e,s,-r,0,-s,0,e,-s,r,0,-s],a=[0,1,2,5,3,4,0,2,4,0,4,3,1,5,4,1,4,2,0,3,5,0,5,1];return i.setAttribute("position",new gt(o,3)),i.setIndex(a),i.computeVertexNormals(),i.toNonIndexed()}function Yb(t,e){Zr={gates:[],crowdU:null};const n=t.mapId;t.columns.length&&(e.add(Wt(on(new $e(1,1.08,1,12),nt.marble,t.columns,(o,a,c)=>sn(o,a,c.x,c.y+c.h/2,c.z,0,0,0,c.r,c.h,c.r)))),e.add(Wt(on(new De(1,1,1),nt.marbleDark,t.columns,(o,a,c)=>sn(o,a,c.x,c.y+c.h+.15,c.z,0,0,0,c.r*2.6,.3,c.r*2.6)))),e.add(Wt(on(new De(1,1,1),nt.marbleDark,t.columns,(o,a,c)=>sn(o,a,c.x,c.y+.12,c.z,0,0,0,c.r*2.6,.24,c.r*2.6)))));for(const o of t.statues){const a=new Sn,c=o.big?1.6:1,f=new ye(new De(1.6*c,1.4*c,1.6*c),nt.marbleDark);f.position.y=.7*c,a.add(f);const l=new ye(new $e(.35*c,.5*c,1.7*c,10),o.big?nt.bronze:nt.marble);l.position.y=2.25*c,a.add(l);const h=new ye(new Dn(.3*c,10,8),o.big?nt.bronze:nt.marble);h.position.y=3.35*c,a.add(h);const d=new ye(new $e(.09*c,.09*c,1.3*c,6),o.big?nt.bronze:nt.marble);d.position.set(.45*c,3.1*c,0),d.rotation.z=-.5,a.add(d),a.position.set(o.x,vt(o.x,o.z),o.z),a.rotation.y=Math.atan2(-o.x,-o.z),e.add(Wt(a))}const i=t.buildings.filter(o=>o.kind==="house"),r=t.buildings.filter(o=>o.kind==="tent"),s=t.buildings.filter(o=>o.kind==="hut");if(i.length){e.add(Wt(on(new De(1,1,1),nt.plaster,i,(c,f,l)=>sn(c,f,l.x,l.h/2,l.z,0,l.rot,0,l.w,l.h,l.d))));const o=new Gn(Math.SQRT1_2,1,4);o.rotateY(Math.PI/4),o.translate(0,.5,0),e.add(Wt(on(o,nt.roof,i,(c,f,l)=>sn(c,f,l.x,l.h,l.z,0,l.rot,0,l.w*1.12,2.2,l.d*1.12))));const a=[];for(const c of i)for(const[f,l]of[[0,1],[0,-1],[1,0],[-1,0]])for(const h of[-.28,.28])a.push({x:c.x+f*(c.w/2+.02)+(l?h*c.w:0),z:c.z+l*(c.d/2+.02)+(f?h*c.d:0),y:c.h*.62,ry:f?Math.PI/2:0});e.add(on(new gn(.9,1.2),nt.dark,a,(c,f,l)=>sn(c,f,l.x,l.y,l.z,0,l.ry,0,1,1,1)))}if(r.length){const o=new Gn(Math.SQRT1_2,1,4);o.rotateY(Math.PI/4),o.translate(0,.5,0);const a=[15260864,12080698,14267242,9067066],c=on(o,$t(16777215,null,{side:Dt}),r,(f,l,h)=>{sn(f,l,h.x,vt(h.x,h.z),h.z,0,h.rot,0,h.w*1.1,h.h,h.d*1.1),f.setColorAt(l,new xe(a[l%a.length]))});e.add(Wt(c))}s.length&&(e.add(Wt(on(qt(new $e(1,1,1,10),3,1),nt.log,s,(o,a,c)=>sn(o,a,c.x,1.1,c.z,0,c.rot,0,c.w/2,2.2,c.d/2)))),e.add(Wt(on(new Gn(1,1,10),nt.thatch,s,(o,a,c)=>sn(o,a,c.x,3.2,c.z,0,c.rot,0,c.w/2+.5,2.2,c.d/2+.5)))));for(const o of t.towers){const a=new Sn,c=gr(o.x,o.z);if(o.kind==="sand"){const f=new ye(qt(new $e(o.r,o.r*1.12,o.h,14),4,2),nt.sand);f.position.y=o.h/2,a.add(f);const l=new ye(new $e(o.r*1.18,o.r*1.18,.8,14),nt.sandDark);l.position.y=o.h+.4,a.add(l);for(let h=0;h<8;h++){const d=h/8*Math.PI*2,u=new ye(new De(.7,.7,.5),nt.sandDark);u.position.set(Math.cos(d)*o.r*1.05,o.h+1.15,Math.sin(d)*o.r*1.05),u.rotation.y=-d,a.add(u)}}else{const f=o.small?.9:1.5,l=new $e(.14,.16,o.h,6);for(const[u,_]of[[-f,-f],[f,-f],[-f,f],[f,f]]){const x=new ye(l,nt.log);x.position.set(u,o.h/2,_),a.add(x)}const h=new ye(new De(f*2+.8,.25,f*2+.8),nt.wood);h.position.y=o.h-1.4,a.add(h);for(const[u,_,x]of[[0,f+.35,0],[0,-f-.35,0],[f+.35,0,Math.PI/2],[-f-.35,0,Math.PI/2]]){const g=new ye(new De(f*2+.8,.5,.12),nt.wood);g.position.set(u,o.h-1,_),g.rotation.y=x,a.add(g)}const d=new ye(new Gn(f*1.9,1.6,4),nt.thatch);d.position.y=o.h+.7,d.rotation.y=Math.PI/4,a.add(d)}a.position.set(o.x,c,o.z),e.add(Wt(a))}for(const o of t.rings){const a=o.x||0,c=o.z||0,f=x=>o.gaps.some(g=>Math.abs(_n(x,g))<o.gapW)||(o.towersAt||[]).some(g=>Math.abs(_n(x,g))<2.8/o.r);if(o.kind==="logs"){const x=[],g=Math.ceil(Math.PI*2*o.r/.68),p=ds(Math.round(a+c)+7);for(let v=0;v<g;v++){const y=v/g*Math.PI*2;f(y)||x.push({x:a+Math.cos(y)*o.r,z:c+Math.sin(y)*o.r,sy:.9+p()*.25,rot:p()*3})}e.add(Wt(on(qt(new $e(.32,.36,1,7),1,2),nt.log,x,(v,y,b)=>sn(v,y,b.x,gr(b.x,b.z)+o.h*b.sy/2,b.z,0,b.rot,0,1,o.h*b.sy,1)))),e.add(Wt(on(new Gn(.34,.55,7),nt.log,x,(v,y,b)=>sn(v,y,b.x,gr(b.x,b.z)+o.h*b.sy+.27,b.z,0,b.rot,0,1,1,1))));continue}const l=n==="desert"?nt.sand:nt.marbleDark,h=n==="desert"?nt.sandDark:nt.marble,d=[],u=Math.ceil(Math.PI*2*o.r/1.8);for(let x=0;x<u;x++){const g=(x+.5)/u*Math.PI*2;f(g)||d.push({a:g,x:a+Math.cos(g)*o.r,z:c+Math.sin(g)*o.r})}const _=Math.PI*2*o.r/u+.05;e.add(Wt(on(qt(new De(1,1,1),.8,1.4),l,d,(x,g,p)=>sn(x,g,p.x,o.h/2,p.z,0,-p.a,0,1.8,o.h,_)))),e.add(Wt(on(new De(1,1,1),h,d.filter((x,g)=>g%2===0),(x,g,p)=>sn(x,g,p.x,o.h+.35,p.z,0,-p.a,0,1.9,.7,_*.55))));for(const x of o.gaps){const g=o.gapW*o.r+.9;for(const v of[-1,1]){const y=x+v*g/o.r,b=new ye(new De(2.2,o.h+1.6,2.2),h);b.position.set(a+Math.cos(y)*o.r,(o.h+1.6)/2,c+Math.sin(y)*o.r),b.rotation.y=-y,e.add(Wt(b))}const p=new ye(new De(1.6,.9,g*2+2),h);p.position.set(a+Math.cos(x)*o.r,o.h+1.2,c+Math.sin(x)*o.r),p.rotation.y=-x,e.add(Wt(p))}}if(n==="forum")for(const o of jf){const a=new Sn,c=yt.h,f=yt.back-yt.front,l=yt.hw*2,h=new ye(qt(new De(l,c,f),6,1),nt.marbleDark);h.position.set(0,c/2,(yt.back+yt.front)/2),a.add(h);for(let v=0;v<3;v++){const y=new ye(new De(l-1,c*(v+1)/3,1),nt.marble);y.position.set(0,c*(v+1)/6,yt.front-2.5+v),a.add(y)}const d=5.2,u=new ye(qt(new De(12,d,6),4,2),nt.marble);u.position.set(0,c+d/2,3),a.add(u);const _=new ye(new gn(2.4,3.6),nt.dark);_.position.set(0,c+1.8,-.02),_.rotation.y=Math.PI,a.add(_);const x=new ye(new De(l+.4,.7,f+.4),nt.marble);x.position.set(0,c+d+.35,(yt.back+yt.front)/2),a.add(x);const g=new ye(bu(l+.8,2.4,f+.8),nt.roof);g.position.set(0,c+d+.7,(yt.back+yt.front)/2),a.add(g);const p=new ye(bu(l+.4,2.2,.3),nt.marble);p.position.set(0,c+d+.7,yt.front-.15),a.add(p),a.position.set(o.x,0,o.z),a.rotation.y=o.rot,e.add(Wt(a))}if(n==="desert")for(const o of[0,Math.PI/2,Math.PI,-Math.PI/2]){const a=Et.ramp-Et.r,c=Math.hypot(a,Et.h),f=new Sn,l=new ye(qt(new De(Et.lane*2,.5,c),2,3),nt.sandDark);l.rotation.x=Math.atan2(Et.h,a),l.position.set(0,Et.h/2-.22,Et.r+a/2),f.add(l),f.rotation.y=Math.atan2(Math.cos(o),Math.sin(o)),e.add(Wt(f))}if(t.palms.length){const o=[],a=[];for(const f of t.palms){const l=gr(f.x,f.z),h=5,d=1.3*f.s;let u=f.x,_=f.z,x=l;for(let g=0;g<h;g++){const p=f.lean*(g+1)/h;o.push({x:u+Math.sin(f.rot)*p*.5,y:x+d/2,z:_+Math.cos(f.rot)*p*.5,rx:p*Math.cos(f.rot),rz:-p*Math.sin(f.rot),s:f.s*(1-g*.08)}),u+=Math.sin(f.rot)*p*d,_+=Math.cos(f.rot)*p*d,x+=d*.97}for(let g=0;g<7;g++)a.push({x:u,y:x+.1,z:_,ry:g/7*Math.PI*2+f.rot,s:f.s})}e.add(Wt(on(qt(new $e(.2,.26,1.35,7),1,2),nt.palmTrunk,o,(f,l,h)=>sn(f,l,h.x,h.y,h.z,h.rx,0,h.rz,h.s,h.s,h.s))));const c=new De(.55,.05,2.2);c.translate(0,0,1.1),e.add(Wt(on(c,nt.palmLeaf,a,(f,l,h)=>sn(f,l,h.x,h.y,h.z,.45,h.ry,0,h.s,h.s,h.s))))}if(n==="colosseum"){const o=pn.r+2.5,a=(()=>{const L=document.createElement("canvas");L.width=128,L.height=64;const M=L.getContext("2d");M.fillStyle="#d8ccb4",M.fillRect(0,0,128,64),M.fillStyle="#6a5a48";for(const N of[32,96])M.beginPath(),M.moveTo(N-14,64),M.lineTo(N-14,30),M.arc(N,30,14,Math.PI,0),M.lineTo(N+14,64),M.fill();M.fillStyle="#b8aa92",M.fillRect(0,8,128,5);const S=new ra(L);return S.wrapS=vo,S.repeat.set(40,1),S.colorSpace=Gt,S})(),c=new ye(new $e(o,o,7,120,1,!0),$t(16777215,a,{side:Zt}));c.position.y=3.5,c.receiveShadow=!0,e.add(c);const f=new ye(new $e(o+.6,o+.6,.8,120,1,!0),$t(15260868,null,{side:Zt}));f.position.y=7.2,e.add(f);const l=new ye(new $e(o+30,o+1,18,120,1,!0),$t(13221026,Qi(),{side:Zt}));l.position.y=16,e.add(l);const h=new ye(new $e(o+31,o+31,6,120,1,!0),$t(16777215,a,{side:Zt}));h.position.y=28,e.add(h);const d=[];for(let L=0;L<24;L++)d.push({a:L/24*Math.PI*2,ti:L%4});const u=$t(16777215,null,{side:Dt});e.add(on(new gn(2.2,4),u,d,(L,M,S)=>{sn(L,M,Math.cos(S.a)*(o-.15),4.8,Math.sin(S.a)*(o-.15),0,-S.a-Math.PI/2,0,1,1,1),L.setColorAt(M,new xe(he[S.ti].hex))}));const _=dt.level==="high"?3200:dt.level==="medium"?1600:500,x=ds(42),g=[];for(let L=0;L<_;L++){const M=x(),S=o+2+M*27,N=x()*Math.PI*2;g.push({x:Math.cos(N)*S,z:Math.sin(N)*S,y:7+M*18+.5,a:N})}const p={time:{value:0}};Zr.crowdU=p;const v=new Tn({color:16777215});v.onBeforeCompile=L=>{L.uniforms.time=p.time,L.vertexShader=`uniform float time;
`+L.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        float ph = instanceMatrix[3][0] * 1.7 + instanceMatrix[3][2] * 2.3;
        transformed.y += max(0., sin(time * 7. + ph)) * .35 * step(.35, fract(ph * .13));
      #endif`)};const y=[15260864,12080698,6979488,14267242,8034906,10119834,13222064].map(L=>new xe(L)),b=on(new De(.55,1,.4),v,g,(L,M,S)=>{sn(L,M,S.x,S.y,S.z,0,-S.a,0,1,1,1),L.setColorAt(M,y[M%y.length])});b.frustumCulled=!1,e.add(b);const C=on(new Dn(.22,6,5),v,g,(L,M,S)=>{sn(L,M,S.x,S.y+.7,S.z,0,0,0,1,1,1),L.setColorAt(M,new xe(14727316))});C.frustumCulled=!1,e.add(C);const w=(()=>{const L=document.createElement("canvas");L.width=L.height=64;const M=L.getContext("2d");M.fillStyle="#2e2e32";for(let N=0;N<64;N+=12)M.fillRect(N,0,4,64),M.fillRect(0,N,64,3);const S=new ra(L);return S.wrapS=S.wrapT=vo,S})(),R=new Tn({map:w,transparent:!0,alphaTest:.5,side:Dt});w.repeat.set(2,1.5);for(const L of t.gates){const M=Math.atan2(L.z,L.x),S=new ye(new gn(L.w+.4,4.4),R);S.position.set(L.x,2.2,L.z),S.rotation.y=Math.atan2(-Math.cos(M),-Math.sin(M)),S.castShadow=!0,e.add(S),Zr.gates.push({mesh:S,y:2.2})}}}function Kb(t,e){if(Zr.crowdU&&(Zr.crowdU.time.value=e),Zr.gates.length){const n=Sp(m.T);for(const i of Zr.gates){const r=n?6.3:2.2;i.y+=(r-i.y)*Math.min(1,t*4),i.mesh.position.y=i.y}}}let cn=null,vf=[],Yi=null,yf=[];const Mf=10132114,Yn=(t,e,n={})=>new Tn(Object.assign({color:t,map:e||null},n)),fr=Yn(14275526,Qi()),bf=Yn(12433323,Qi()),wc=Yn(3812384,Cr()),Jb=new Tn({color:16183520,side:Dt}),Zb=new Tn({color:16764730,side:Dt}),Su=he.map(t=>new Tn({color:t.hex,side:Dt})),Tu=Yn(6966067,Cr()),Qb=Yn(8018490,Cr()),eS=Yn(5586986,Cr());function tS(t){t.traverse(e=>{e.geometry&&e.geometry.dispose()}),Ft.remove(t)}const ai=(t,e=!0)=>(t.traverse(n=>{n.isMesh&&(n.castShadow=e,n.receiveShadow=!0)}),t);function Fm(t){var v,y,b;cn&&tS(cn),Yi&&Ft.remove(Yi.banner),cn=new Sn,Ft.add(cn),vf=[],Yi=null;const e=m.map,n=km(e.id);Xb(e);const i=new gn(420,420,220,220);i.rotateX(-Math.PI/2),qt(i,64,64);const r=i.attributes.position,s=[],o=new xe((v=n.g1)!=null?v:e.g1),a=new xe((y=n.g2)!=null?y:e.g2),c=new xe((b=n.g3)!=null?b:e.g3),f=new xe(8022604);for(let C=0;C<r.count;C++){const w=r.getX(C),R=r.getZ(C),L=Math.hypot(w,R);r.setY(C,gr(w,R));const M=(Math.sin(w*.11+R*.07)+1)/2,S=(Math.sin(w*.031-R*.043)+1)/2,N=o.clone().lerp(a,M*.7+S*.3);L>92&&N.lerp(c,Math.min(1,(L-92)/40)),e.id==="river"&&Math.abs(R)<6.5&&Math.hypot(w,R)>=7.5&&N.lerp(f,.6),e.id==="valley"&&Math.abs(w-R)<3.2&&L<95&&N.lerp(f,.55),e.id==="wooden"&&(Math.abs(w)<2.6||Math.abs(R)<2.6)&&L>8&&L<80&&N.lerp(f,.45),s.push(N.r,N.g,N.b)}i.setAttribute("color",new gt(s,3)),i.computeVertexNormals();const l=new ye(i,new Tn({vertexColors:!0,map:Gb(n.ground)}));l.receiveShadow=!0,cn.add(l);const h=Yn(e.hill);if(e.id!=="colosseum")for(const C of t.hills){const w=new ye(new Dn(C.rad,12,8),h);w.scale.y=C.sy,w.position.set(Math.cos(C.a)*C.d,-3,Math.sin(C.a)*C.d),cn.add(w)}const d=new qe,u=new ni,_=new D,x=new D(0,1,0),g=new D;if(t.palisades.length){const C=t.palisades.flatMap(M=>M.logs),w=qt(new $e(.32,.36,3.2,8),1,2);w.translate(0,0,0);const R=new di(w,Tu,C.length);C.forEach((M,S)=>{u.setFromAxisAngle(x,M.rot),_.set(1,M.sy,1),d.compose(g.set(M.x,1.5*M.sy,M.z),u,_),R.setMatrixAt(S,d)});const L=new di(new Gn(.34,.5,8),Tu,C.length);C.forEach((M,S)=>{u.setFromAxisAngle(x,M.rot),d.compose(g.set(M.x,3.2*M.sy+.22,M.z),u,_.set(1,1,1)),L.setMatrixAt(S,d)}),cn.add(ai(R),ai(L))}if(e.id==="river"){const C=new ye(new gn(420,10.4),new mh({color:3832483,specular:10471134,shininess:80,transparent:!0,opacity:.84}));C.rotation.x=-Math.PI/2,C.position.y=-.18,C.receiveShadow=!0,cn.add(C);for(const R of[-32,32]){const L=new ye(qt(new De(5,.3,14),2,5),Qb);L.position.set(R,.22,0),cn.add(ai(L));for(const M of[-2.4,2.4]){const S=new ye(new De(.18,.9,14),eS);S.position.set(R+M,.8,0),cn.add(ai(S))}}const w=Yn(10132372,Qi());for(const R of t.stones){const L=new ye(new Ec(R.s),w);L.position.set(R.x,-.15,R.z),cn.add(ai(L))}}if(t.trees.length){const C=t.trees.length,w=new di(qt(new $e(.25,.35,2.4,7),1,2),Yn(5914152,Cr()),C),R=new di(new Gn(2.1,4.2,9),Yn(2905392),C),L=new di(new Gn(1.5,3.2,9),Yn(3631674),C);t.trees.forEach((M,S)=>{const N=gr(M.x,M.z)-.1;d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+1.2*M.s,M.z),w.setMatrixAt(S,d),d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+3.6*M.s,M.z),R.setMatrixAt(S,d),d.makeScale(M.s,M.s,M.s),d.setPosition(M.x,N+5.4*M.s,M.z),L.setMatrixAt(S,d)}),cn.add(ai(w),ai(R),ai(L))}const p=Yn(e.rock,Qi());for(const C of t.rocks){const w=new ye(new Ec(C.r),p);w.position.set(C.x,gr(C.x,C.z)+C.r*(C.big?.55:.4),C.z),w.rotation.set(C.rx,C.ry,0),C.big&&w.scale.set(1,1.35,1),cn.add(ai(w))}he.forEach((C,w)=>vf.push(iS(C,w))),t.withFort&&rS(t),yf=t.ctrlSpots&&t.ctrlSpots.length?nS(t):[],Yb(t,cn),oS(t,n)}function nS(t){return t.ctrlSpots.map(e=>{const n=new Sn;n.position.set(e.x,vt(e.x,e.z),e.z),cn.add(n);const i=new ye(new $e(.09,.09,3.2,6),wc);i.position.y=1.6,n.add(i);const r=new ye(new gn(1.3,.9),new Tn({color:Mf,side:Dt}));r.position.set(.65,2.6,0),n.add(r);const s=new ye(new Lo(Tr.radius-.3,Tr.radius,40),new Ai({color:Mf,transparent:!0,opacity:.35,side:Dt,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.05,n.add(s),ai(n),{id:e.id,grp:n,cloth:r,ring:s}})}function iS(t,e){const n=new Sn,i=7,r=(x,g,p,v,y,b=0)=>{const C=new ye(x,g);return C.position.set(p,v,y),C.rotation.y=b,n.add(C),C},s=qt(new De(i*2,4,1.2),14/3,4/3);r(s,fr,0,2,-i),r(s,fr,-i,2,0,Math.PI/2),r(s,fr,i,2,0,Math.PI/2);const o=qt(new De(i-1.8,4,1.2),(i-1.8)/3,4/3);r(o,fr,-8.8/2,2,i),r(o,fr,(i+1.8)/2,2,i),r(qt(new De(3.6,1.2,1.3),1.2,.4),fr,0,3.4,i),r(qt(new De(3.4,2.8,.3),2,1),wc,0,1.4,i-.3);const a=new di(new De(.8,.8,1.3),fr,64),c=new qe;let f=0;for(let x=-6;x<=6;x+=1.5)for(const[g,p,v]of[[x,-i,0],[x,i,0],[-i,x,1],[i,x,1]]){if(f>=64)break;c.makeRotationY(v?Math.PI/2:0),c.setPosition(g,4.4,p),a.setMatrixAt(f++,c)}a.count=f,n.add(a);const l=qt(new $e(1.9,2.1,6.2,12),4,2),h=new Gn(2.4,2.6,12),d=Yn(8010538);for(const[x,g]of[[-i,-i],[i,-i],[-i,i],[i,i]])r(l,bf,x,3.1,g),r(h,d,x,7.5,g);r(qt(new De(5,7.5,5),5/3,7.5/3),bf,0,3.75,-1.5),r(new Gn(4,2.6,4),d,0,8.8,-1.5,Math.PI/4);const u=new gn(1.3,3);for(const x of[-4.6,-2.6,2.6,4.6])r(u,Su[e],x,2.4,i+.62);r(new $e(.08,.08,4,6),wc,0,11.4,-1.5);const _=r(new gn(2.6,1.6),Su[e],1.3,12.5,-1.5);return n.position.set(t.pos[0],0,t.pos[1]),n.rotation.y=Math.atan2(-t.pos[0],-t.pos[1]),cn.add(ai(n)),{grp:n,flag:_,fell:!1}}function rS(t){const e=new Sn;e.position.y=vt(0,0),cn.add(e);const n=qt(new De(2.9,2.2,.9),1,.75);for(const c of t.fortSegments){const f=new ye(n,fr);f.position.set(c.x,1.1,c.z),f.rotation.y=-c.a+Math.PI/2,e.add(f)}for(let c=0;c<4;c++){const f=c/4*Math.PI*2+Math.PI/12,l=new ye(new $e(.5,.6,3,8),bf);l.position.set(Math.cos(f)*6.4,1.5,Math.sin(f)*6.4),e.add(l)}ai(e);const i=new Sn,r=new ye(new $e(.07,.07,3.4,6),wc);r.position.y=1.7,i.add(r);const s=new ye(new gn(1.6,1.1),Jb);s.position.set(.8,2.8,0),i.add(s);const o=new ye(new gn(1.6,.18),Zb);o.position.set(.8,2.2,.01),i.add(o);const a=new ye(new Lo(1.3,1.6,28),new Ai({color:16764730,transparent:!0,opacity:.6,side:Dt,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.y=.06,i.add(a),r.castShadow=s.castShadow=!0,Ft.add(i),Yi={banner:i,ring:a,cloth:s}}const Ac={time:{value:0}},sS=(()=>{const t=[],e=[],n=ds(3);for(let r=0;r<6;r++){const s=n()*Math.PI*2,o=n()*.22,a=.55+n()*.5,c=.07,f=(n()-.5)*.5,l=Math.cos(s)*o,h=Math.sin(s)*o,d=Math.cos(s+1.57)*c,u=Math.sin(s+1.57)*c,_=l+Math.cos(s)*f,x=h+Math.sin(s)*f;t.push(l-d,0,h-u,l+d,0,h+u,_,a,x,l+d,0,h+u,l-d,0,h-u,_,a,x),e.push(.5,.5,.5,.5,.5,.5,1,1,1,.5,.5,.5,.5,.5,.5,1,1,1)}const i=new Nn;return i.setAttribute("position",new gt(t,3)),i.setAttribute("color",new gt(e,3)),i.computeVertexNormals(),i})(),Bm=new Tn({vertexColors:!0});Bm.onBeforeCompile=t=>{t.uniforms.time=Ac.time,t.vertexShader=`uniform float time;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    #ifdef USE_INSTANCING
      vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
    #else
      vec2 ip = vec2(0.);
    #endif
    float sway = sin(time * 1.7 + ip.x * .35 + ip.y * .22) * .5 + sin(time * 3.1 + ip.x * .9) * .18;
    transformed.x += sway * .16 * position.y * position.y;
    transformed.z += sway * .08 * position.y * position.y;`),t.vertexShader=t.vertexShader.replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0., 1., 0.);")};function oS(t,e){const n=Math.round(dt.cfg.grass*e.grass);if(!n)return;const i=ds((m.seed|0)+11),r=new di(sS,Bm,n),s=new xe(e.grassCol[0]),o=new xe(e.grassCol[1]),a=new xe,c=new qe,f=new ni,l=new zi,h=new D,d=new D,u=(p,v)=>he.some(y=>Math.hypot(y.pos[0]-p,y.pos[1]-v)<Qo+1.5)||t.withFort&&Math.hypot(p,v)<7.5||m.map.id==="river"&&Math.abs(v)<6&&Math.hypot(p,v)>=7||Cp(p,v).some(y=>!y.castle&&wp(y,p,v,.3))||t.round&&Math.hypot(p,v)>t.round-1,_=(p,v)=>Math.sin(p*.09+1.3)*Math.cos(v*.08-.7)+Math.sin(p*.031-v*.027)*.8;let x=0,g=0;for(;x<n&&g<n*6;){g++;const p=(i()-.5)*220,v=(i()-.5)*220;if(_(p,v)<-.2+i()*.6||u(p,v))continue;const y=.75+i()*.7;l.set(0,i()*6.28,0),f.setFromEuler(l),c.compose(h.set(p,gr(p,v),v),f,d.set(y,y*(.8+i()*.5),y)),r.setMatrixAt(x,c),r.setColorAt(x,a.copy(s).lerp(o,i())),x++}r.count=x,r.receiveShadow=!0,r.frustumCulled=!1,cn.add(r)}function Hm(t,e){Ac.time.value+=t,Kb(t,Ac.time.value),aS(),he.forEach((r,s)=>{const o=m.teams[s],a=vf[s];if(!a||!o)return;const c=m.mode!=="conquest"?1:o.alive?1-(1-o.points/100)*.12:.28;a.grp.scale.y+=(c-a.grp.scale.y)*Math.min(1,t*3),a.flag.visible=m.mode!=="conquest"||o.alive,m.mode==="conquest"&&o.alive&&o.points<35&&Math.random()<t*6&&e("smoke",r.pos),m.mode==="conquest"&&!o.alive&&!a.fell&&(a.fell=!0,e("rubble",r.pos))});const n=m.flag;if(!n||!Yi)return;const i=Yi.banner;if(n.state==="carried"&&n.carrier){const r=n.carrier;i.position.set(r.x-Math.sin(r.face)*.45,r.y+.9,r.z-Math.cos(r.face)*.45),i.rotation.y=r.face+Math.PI/2,i.scale.setScalar(.8),Yi.ring.visible=!1}else i.position.set(n.x,vt(n.x,n.z),n.z),i.rotation.y=m.T*.6,i.scale.setScalar(1),Yi.ring.visible=!0;Yi.cloth.rotation.y=Math.sin(m.T*3)*.25}const Wl={own:[],neut:new xe(Mf)};function aS(){const t=m.ctrlPoints;if(!(!t||!yf.length))for(const e of yf){const n=t[e.id];if(!n)continue;const i=n.owner>=0?Wl.own[n.owner]||(Wl.own[n.owner]=new xe(he[n.owner%4].hex)):Wl.neut;e.cloth.material.color.lerp(i,.1),e.cloth.rotation.y=Math.sin(m.T*2.4+e.id)*.2;const r=n.capturer!=null&&n.capturer!==n.owner&&n.prog>0;e.ring.material.color.lerp(r?new xe(16764730):i,.1),e.ring.material.opacity=r?.35+Math.sin(m.T*6)*.2:.35}}const Eu=()=>Ac.time.value,ht={yaw:0,pitch:.42,shake:0},Gm=.42,cS=matchMedia("(prefers-reduced-motion: reduce)").matches;function gs(){const t=m.player;if(t&&!t.dead)return t;const e=m.teams.map(n=>n.leader).find(n=>n&&!n.dead&&!ti(n.ti,m.myTi));return e||m.units.find(n=>!n.dead&&n.ti===m.myTi)||m.units.find(n=>!n.dead)||null}function lS(t){ht.shake=Math.max(0,ht.shake-t*1.6);const e=gs();if(!e)return;const n=e.x,i=e.z,r=e.y,s=(wt.W<wt.H?11:9.5)+(e.mounted?3:0),o=2.2+Math.sin(ht.pitch)*s+(e.mounted?1:0),a=n-Math.sin(ht.yaw)*Math.cos(ht.pitch)*s,c=i-Math.cos(ht.yaw)*Math.cos(ht.pitch)*s,f=Math.min(1,t*8);mt.position.x+=(a-mt.position.x)*f,mt.position.z+=(c-mt.position.z)*f,mt.position.y+=(r+o-mt.position.y)*f;const l=vt(mt.position.x,mt.position.z)+1;mt.position.y<l&&(mt.position.y=l),ht.shake>0&&!cS&&(mt.position.x+=ie(-1,1)*ht.shake*.3,mt.position.y+=ie(-1,1)*ht.shake*.3),mt.lookAt(n+Math.sin(ht.yaw)*3,r+1.6+(e.mounted?1:0),i+Math.cos(ht.yaw)*3)}function fS(t){mt.position.set(Math.cos(t*.05)*62,26+(m.map.id==="frost"?4:0),Math.sin(t*.05)*62),mt.lookAt(0,vt(0,0),0)}let Zn=[],ro=[];function hS(t,e,n,i,r){const s=dt.cfg.particles;Zn.length<s&&Zn.push({x:t,y:e,z:n,vx:0,vy:ie(.2,.6),vz:0,life:.22,c:"#fff8e6",s:9});for(let o=0;o<r&&Zn.length<s;o++)Zn.push({x:t,y:e,z:n,vx:ie(-4,4),vy:ie(1,5),vz:ie(-4,4),life:ie(.25,.5),c:i,s:ie(2,4)})}function Sf(t){Zn.length<dt.cfg.particles+40&&Zn.push(t)}function dS(t,e,n,i){Zn.length<dt.cfg.particles&&Zn.push({x:t,y:e,z:n,vx:ie(-.2,.2),vy:ie(-.1,.2),vz:ie(-.2,.2),life:ie(.08,.14),c:i,s:ie(2.5,4)})}const wu={dunes:"#dcc69c",river:"#b7a888",forest:"#a89a7c",frost:"#f4f7fa"};function uS(t,e){const n=wu[m.map.id]||wu.dunes,i=vt(t,e)+.3;for(let r=0;r<3;r++)Sf({x:t+ie(-.4,.4),y:i,z:e+ie(-.4,.4),vx:ie(-1,1),vy:ie(.8,1.6),vz:ie(-1,1),life:ie(.5,.8),c:n,s:ie(5.5,8)})}function cs(t,e,n,i,r){ro.push({x:t,y:e,z:n,text:i,color:r,t:0})}function pS(t,e){if(t==="smoke")Sf({x:e[0]+ie(-6,6),y:ie(3,6),z:e[1]+ie(-6,6),vx:ie(-.4,.4),vy:ie(1.5,3),vz:ie(-.4,.4),life:ie(1.2,2),c:"#5b5550",s:ie(5,9)});else for(let n=0;n<30;n++)Sf({x:e[0]+ie(-8,8),y:ie(0,6),z:e[1]+ie(-8,8),vx:ie(-3,3),vy:ie(1,5),vz:ie(-3,3),life:ie(1,2.2),c:"#bdb3a2",s:ie(3,7)})}const Jc=90,mS=(()=>{const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d");e.fillStyle="#ffffff";for(let n=0;n<9;n++)e.beginPath(),e.arc(32+ie(-14,14),32+ie(-14,14),ie(4,12),0,Math.PI*2),e.fill();for(let n=0;n<8;n++)e.beginPath(),e.arc(32+ie(-28,28),32+ie(-28,28),ie(1.5,3.5),0,Math.PI*2),e.fill();return new ra(t)})(),Vm=new Ai({map:mS,transparent:!0,depthWrite:!1});Vm.onBeforeCompile=t=>{t.vertexShader=`attribute float aAlpha;
varying float vAlpha;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vAlpha = aAlpha;`),t.fragmentShader=`varying float vAlpha;
`+t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vAlpha;`)};const Wm=new gn(1,1),Tf=new bo(new Float32Array(Jc),1);Wm.setAttribute("aAlpha",Tf);const Ki=new di(Wm,Vm,Jc);Ki.instanceColor=new bo(new Float32Array(Jc*3),3);Ki.frustumCulled=!1;Ki.count=0;Ft.add(Ki);let er=[],gS=0;const _S=he.map(t=>new xe(t.hex).multiplyScalar(.85)),Au=new qe,Cu=new ni,Ru=new zi,xS=new D,vS=new D;function yS(t,e,n,i){if(Gc(t,e))return;const r=dt.cfg.splats;er.length>=r&&er.shift(),er.push({x:t,z:e,s:n,rot:ie(0,6),t:0,c:_S[i==null?1:Te(i)],lift:gS++%Jc*4e-4})}const jm=160,MS=(()=>{const t=new $e(.03,.03,.9,4);return t.rotateX(Math.PI/2),t})(),so=new di(MS,new Tn({color:3811868}),jm);so.frustumCulled=!1;so.count=0;Ft.add(so);const Hs=new un;function bS(t){for(const e of Zn)e.x+=e.vx*t,e.y+=e.vy*t,e.z+=e.vz*t,e.vy-=(e.s>5?-.5:9)*t,e.life-=t;Zn=Zn.filter(e=>e.life>0&&e.y>-1);for(const e of ro)e.t+=t,e.y+=t*1.2;ro=ro.filter(e=>e.t<1.3);for(const e of er)e.t+=t;er=er.filter(e=>e.t<30)}function Xm(){er.forEach((e,n)=>{Ru.set(-Math.PI/2,0,e.rot),Cu.setFromEuler(Ru),Au.compose(xS.set(e.x,vt(e.x,e.z)+.04+e.lift,e.z),Cu,vS.set(e.s,e.s,e.s)),Ki.setMatrixAt(n,Au),Ki.setColorAt(n,e.c),Tf.array[n]=e.t>25?Math.max(0,.85-(e.t-25)/5):.85}),Ki.count=er.length,Ki.instanceMatrix.needsUpdate=!0,Ki.instanceColor.needsUpdate=!0,Tf.needsUpdate=!0;let t=0;for(const e of m.arrows){if(t>=jm)break;const n=e.x-e.px,i=e.y-e.py,r=e.z-e.pz;Hs.position.set(e.x,e.y,e.z),n||i||r?(Hs.lookAt(e.x+n+1e-4,e.y+i,e.z+r),e.q=(e.q||new ni).copy(Hs.quaternion)):e.q&&Hs.quaternion.copy(e.q),Hs.updateMatrix(),so.setMatrixAt(t++,Hs.matrix)}so.count=t,so.instanceMatrix.needsUpdate=!0}function $m(){Zn=[],ro=[],er=[]}const Ef=new Ai({color:16777215,transparent:!0,opacity:.22,depthWrite:!1,side:Dt}),Mr=new ye(new Lo(.93,1,72),Ef);Mr.rotation.x=-Math.PI/2;Mr.renderOrder=1;Mr.visible=!1;Ft.add(Mr);function SS(t,e,n){Mr.visible=!!(t&&!t.dead&&m.state==="play"),Mr.visible&&(Mr.position.set(t.x,vt(t.x,t.z)+.07,t.z),Mr.scale.setScalar(e),Ef.color.set(he[Te(t.ti)].hex),Ef.opacity=.16+.08*Math.sin(n*2.4))}const qm=320,TS=(()=>{const t=new $e(1,1,1.15,14,1,!0,-.42,.84);return t.translate(0,0,-1),t})(),ES=(()=>{const t=new Dn(.95,24,8,0,Math.PI*2,0,.7);return t.rotateX(Math.PI/2),t.translate(0,0,-.95*Math.cos(.7)),t.scale(1,1,.6),t})(),wS=(()=>{const t=new $e(.5,.5,.08,22);return t.rotateX(Math.PI/2),t})(),Ym={leg:new $e(.15,.13,.7,9),boot:new De(.2,.14,.32),greave:new $e(.16,.15,.32,10),torso:new $e(.42,.36,.78,16),skirt:new $e(.43,.52,.32,16),belt:new $e(.44,.44,.14,16),head:new Dn(.4,18,12),helm:new Dn(.44,18,10,0,Math.PI*2,0,Math.PI/2),corinth:new Dn(.47,18,12,0,Math.PI*2,0,Math.PI*.52),cone:new Gn(.44,.7,16),hood:new Dn(.45,16,10,0,Math.PI*2,0,Math.PI*.6),brim:new $e(.66,.66,.05,20),crest:new De(.1,.22,.62),cheek:new De(.08,.3,.24),neckGuard:new De(.56,.08,.22),pauldron:new De(.22,.16,.24),nose:new De(.07,.24,.05),knob:new Dn(.08,10,8),hair:new Dn(.45,16,10,0,Math.PI*2,0,Math.PI*.55),beard:new De(.44,.3,.2),circlet:new Ys(.42,.045,8,22),mantle:new $e(.58,.5,.26,16),face:new gn(.58,.3),arm:new $e(.11,.1,.55,8),blade:new De(.07,.07,1),gladius:new De(.09,.06,.72),guard:new De(.32,.06,.06),haft:new $e(.04,.04,1.05,8),axeHead:new De(.05,.36,.26),shaft:new $e(.04,.04,3,7),tip:new Gn(.09,.35,7),bow:new Ys(.6,.035,6,18,Math.PI),quiver:new $e(.13,.11,.7,8),scutum:TS,hoplon:ES,roundShield:wS,rim:new Ys(.6,.05,8,28),woodRim:new Ys(.5,.04,8,24),boss:new Dn(.12,10,8),shadow:new Yc(.62,18),ring:new Lo(.8,1,28),cape:new gn(.9,1.1)},wf="#1b1512";function Gs(t){const e=document.createElement("canvas");e.width=128,e.height=64;const n=e.getContext("2d");n.fillStyle=wf,n.strokeStyle=wf,n.lineCap="round",n.lineJoin="round",t(n);const i=new ra(e);return i.colorSpace=Gt,i}const Xa=(t,e=7,n=9,i=26)=>{t.beginPath(),t.ellipse(40,i,e,n,0,0,Math.PI*2),t.ellipse(88,i,e,n,0,0,Math.PI*2),t.fill()},jl=(t,e,n,i=7)=>{t.lineWidth=i,t.beginPath(),t.moveTo(24,e),t.lineTo(54,n),t.moveTo(104,e),t.lineTo(74,n),t.stroke()},Km={normal:Gs(t=>{Xa(t),jl(t,10,17),t.beginPath(),t.moveTo(64,48),t.quadraticCurveTo(44,42,30,56),t.quadraticCurveTo(46,50,64,54),t.quadraticCurveTo(82,50,98,56),t.quadraticCurveTo(84,42,64,48),t.fill()}),yell:Gs(t=>{Xa(t,8,5,28),jl(t,8,22,8),t.beginPath(),t.ellipse(64,50,17,11,0,0,Math.PI*2),t.fill(),t.fillStyle="#c0474b",t.beginPath(),t.ellipse(64,55,9,4,0,0,Math.PI*2),t.fill()}),ouch:Gs(t=>{t.lineWidth=6,t.beginPath(),t.moveTo(30,18),t.lineTo(48,26),t.lineTo(30,34),t.moveTo(98,18),t.lineTo(80,26),t.lineTo(98,34),t.stroke(),t.lineWidth=5,t.beginPath(),t.moveTo(40,52),t.lineTo(50,46),t.lineTo(58,52),t.lineTo(66,46),t.lineTo(74,52),t.lineTo(82,46),t.lineTo(90,52),t.stroke()}),dizzy:Gs(t=>{t.lineWidth=3.5;for(const e of[40,88]){t.beginPath();for(let n=0;n<14;n+=.3){const i=n*.75;t.lineTo(e+Math.cos(n)*i,26+Math.sin(n)*i)}t.stroke()}t.lineWidth=5,t.beginPath(),t.moveTo(38,52);for(let e=0;e<=8;e++)t.lineTo(38+e*6.5,52+(e%2?-5:4));t.stroke()}),scared:Gs(t=>{t.fillStyle="#fff",Xa(t,10,12,28),t.fillStyle=wf,Xa(t,4,5,30),jl(t,18,8,6),t.lineWidth=5,t.beginPath(),t.ellipse(64,52,6,7,0,0,Math.PI*2),t.stroke()}),dead:Gs(t=>{t.lineWidth=6;for(const e of[40,88])t.beginPath(),t.moveTo(e-9,17),t.lineTo(e+9,35),t.moveTo(e+9,17),t.lineTo(e-9,35),t.stroke();t.lineWidth=5,t.beginPath(),t.moveTo(44,48),t.lineTo(84,48),t.stroke(),t.fillStyle="#d75a6a",t.beginPath(),t.ellipse(72,55,7,8,0,0,Math.PI*2),t.fill()})},_h=Object.keys(Km),xh={plain:new Tn({color:16777215}),plain2:new Tn({color:16777215,side:Dt}),metal:new mh({color:16777215,shininess:110,specular:10132122}),shadow:new Ai({color:0,transparent:!0,opacity:.28,depthWrite:!1}),ring:new Ai({color:16764730,transparent:!0,opacity:.8,side:Dt,depthWrite:!1}),ringAlly:new Ai({color:16777215,transparent:!0,opacity:.45,side:Dt,depthWrite:!1})};for(const t of _h)xh["face_"+t]=new Ai({map:Km[t],transparent:!0,depthWrite:!1});const AS=new Set(["plain","plain2","metal"]),Pu=new Set(["shadow","ring","ringAlly",..._h.map(t=>"face_"+t)]),vi=t=>new xe(t),ze={skin:[15914684,14990488,13145710].map(vi),hair:[14727260,11886634,5913122,3023904].map(vi),steel:vi(10923448),bronze:vi(13144124),wood:vi(7031342),leather:vi(5125152),gold:vi(16764730),linen:vi(15524552),fur:vi(8018492),team:he.map(t=>vi(t.hex)),dark:he.map(t=>vi(t.hex).multiplyScalar(.62))},Jm=t=>Math.imul(t.id|0,2654435761)>>>0,$a=t=>ze.skin[Jm(t)%3],Lu=t=>ze.hair[(Jm(t)>>>4)%4],Qr=t=>m.factions&&m.factions[Te(t.ti)]||"roman",_e=(t,e,n,i=0,r=0,s=0,o=1,a=1,c=1)=>new qe().compose(new D(t,e,n),new ni().setFromEuler(new zi(i,r,s)),new D(o,a,c)),jt=(...t)=>new Set(t),Ze=(...t)=>new Set(t),Iu=is.map(t=>new xe(t.hex)),jr=t=>Iu[m.crests&&m.crests[t.ti]||0]||Iu[0],an=jt("foot","captain"),si=jt("foot","captain"),qa=t=>t.tier>=1,Du=t=>t.tier>=2,qi=t=>t.weapon?t.weapon!=="sword":t.tier>=1,CS=t=>t.tier>=1,RS=t=>t.tier>=2,Li=t=>ze.team[Te(t.ti)],Ya=t=>ze.dark[Te(t.ti)],Zm=[{bone:"root",geo:"shadow",mat:"shadow",m:_e(0,.03,0,-Math.PI/2),when:"blob"},{bone:"root",geo:"ring",mat:"ring",m:_e(0,.05,0,-Math.PI/2),when:"me"},{bone:"root",geo:"ring",mat:"ringAlly",m:_e(0,.05,0,-Math.PI/2),when:"ally"},{bone:"legL",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:Ya},{bone:"legR",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:Ya},{bone:"legL",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>ze.leather},{bone:"legR",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>ze.leather},{bone:"legL",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"legR",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ze("roman"),k:si,col:()=>ze.steel},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:Ze("greek"),k:jt("captain"),col:()=>ze.bronze},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ze("greek"),k:jt("foot","spear"),col:()=>ze.linen},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ze("barbarian"),k:an,t:t=>!qa(t),col:$a},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:Ze("barbarian"),k:an,t:qa,col:Ya},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),k:jt("arch"),col:Ya},{bone:"body",geo:"skirt",mat:"plain",m:_e(0,.64,0),f:Ze("roman","greek"),col:Li},{bone:"body",geo:"belt",mat:"plain",m:_e(0,.78,0),col:t=>Qr(t)==="barbarian"?Li(t):ze.leather},{bone:"body",geo:"head",mat:"plain",m:_e(0,1.78,0),col:$a},..._h.map(t=>({bone:"body",geo:"face",mat:"face_"+t,m:_e(0,1.73,.39),t:e=>NS(e)===t})),{bone:"body",geo:"hood",mat:"plain",m:_e(0,1.82,-.02),k:jt("arch"),f:Ze("roman","barbarian"),col:Li},{bone:"body",geo:"helm",mat:"plain",m:_e(0,1.9,0,0,0,0,.8,.7,.8),k:jt("arch"),f:Ze("greek"),col:()=>ze.leather},{bone:"body",geo:"brim",mat:"plain",m:_e(0,1.98,0),k:jt("arch"),f:Ze("greek"),col:Li},{bone:"body",geo:"quiver",mat:"plain",m:_e(.2,1.25,-.42,0,0,.4),k:jt("arch"),col:()=>ze.leather},{bone:"body",geo:"helm",mat:"metal",m:_e(0,1.86,0),f:Ze("roman"),k:si,col:()=>ze.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(.34,1.64,.12,0,0,.12),f:Ze("roman"),k:si,col:()=>ze.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.34,1.64,.12,0,0,-.12),f:Ze("roman"),k:si,col:()=>ze.steel},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0),f:Ze("roman"),k:jt("foot"),t:t=>!qa(t),col:Li},{bone:"body",geo:"knob",mat:"metal",m:_e(0,2.3,0),f:Ze("roman"),k:jt("foot"),t:qa,col:()=>ze.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0,0,Math.PI/2,0,1.3,1.5,1.25),f:Ze("roman"),k:jt("captain"),col:jr},{bone:"body",geo:"corinth",mat:"metal",m:_e(0,1.8,0),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"body",geo:"nose",mat:"metal",m:_e(0,1.74,.45),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(.33,1.62,.18,0,0,.1),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.33,1.62,.18,0,0,-.1),f:Ze("greek"),k:si,col:()=>ze.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.5,-.04,0,0,0,1.2,2.3,1.6),f:Ze("greek"),k:jt("foot","spear"),col:Li},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.58,-.04,0,0,0,1.4,2.8,1.9),f:Ze("greek"),k:jt("captain"),col:jr},{bone:"body",geo:"hair",mat:"plain",m:_e(0,1.82,-.03),f:Ze("barbarian"),k:si,col:Lu},{bone:"body",geo:"beard",mat:"plain",m:_e(0,1.55,.3,.15),f:Ze("barbarian"),k:si,col:Lu},{bone:"body",geo:"circlet",mat:"metal",m:_e(0,1.92,0,Math.PI/2),f:Ze("barbarian"),k:jt("captain"),col:jr},{bone:"body",geo:"mantle",mat:"plain",m:_e(0,1.44,0),f:Ze("barbarian"),k:jt("captain","foot"),col:()=>ze.fur},{bone:"body",geo:"cape",mat:"plain2",m:_e(0,1.02,-.44,.12),k:jt("captain"),col:Li},{bone:"sArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:$a},{bone:"wArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:$a},{bone:"shield",geo:"scutum",mat:"plain2",m:_e(0,0,0),f:Ze("roman"),k:an,col:Li},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.05),f:Ze("roman"),k:an,col:t=>t.leader?jr(t):ze.steel},{bone:"shield",geo:"hoplon",mat:"plain2",m:_e(0,0,0),f:Ze("greek"),k:an,col:Li},{bone:"shield",geo:"rim",mat:"metal",m:_e(0,0,0),f:Ze("greek"),k:an,col:t=>t.leader?jr(t):ze.bronze},{bone:"shield",geo:"roundShield",mat:"plain",m:_e(0,0,0),f:Ze("barbarian"),k:an,col:Li},{bone:"shield",geo:"woodRim",mat:"plain",m:_e(0,0,0),f:Ze("barbarian"),k:an,col:()=>ze.wood},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.06),f:Ze("barbarian"),k:an,col:t=>t.leader?jr(t):ze.steel},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),f:Ze("roman","greek"),k:an,col:()=>ze.leather},{bone:"wArm",geo:"gladius",mat:"metal",m:_e(0,-.5,.5),f:Ze("roman"),k:an,t:t=>!qi(t),col:()=>ze.steel},{bone:"wArm",geo:"blade",mat:"metal",m:_e(0,-.5,.6),f:Ze("greek"),k:an,t:t=>!qi(t),col:()=>ze.bronze},{bone:"wArm",geo:"haft",mat:"plain",m:_e(0,-.5,.42,Math.PI/2),f:Ze("barbarian"),k:an,t:t=>!qi(t),col:()=>ze.wood},{bone:"wArm",geo:"axeHead",mat:"metal",m:_e(0,-.35,.86),f:Ze("barbarian"),k:an,t:t=>!qi(t),col:()=>ze.steel},{bone:"spear",geo:"shaft",mat:"plain",m:_e(0,0,.6,Math.PI/2),k:an,t:qi,col:()=>ze.wood},{bone:"spear",geo:"tip",mat:"metal",m:_e(0,0,2.2,Math.PI/2),k:an,t:qi,col:t=>Qr(t)==="greek"?ze.bronze:ze.steel},{bone:"sArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,.3),k:an,t:Du,col:t=>Qr(t)==="greek"?ze.bronze:ze.steel},{bone:"wArm",geo:"pauldron",mat:"metal",m:_e(0,.08,.02,0,0,-.3),k:an,t:Du,col:t=>Qr(t)==="greek"?ze.bronze:ze.steel},{bone:"sArm",geo:"bow",mat:"plain",m:_e(0,-.48,.2,0,Math.PI/2,Math.PI/2),k:jt("arch"),col:()=>ze.wood},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),k:jt("arch"),t:CS,col:()=>ze.leather},{bone:"wArm",geo:"guard",mat:"metal",m:_e(0,-.5,.3),k:jt("arch"),t:RS,col:()=>ze.steel}],So=new Map;for(const t of Zm){const e=t.geo+"|"+t.mat;let n=So.get(e);n||(n={perUnit:0,n:0,mesh:null,geo:t.geo,mat:t.mat},So.set(e,n)),n.perUnit++,t.batch=n}for(const t of So.values()){const e=Math.max(1,t.perUnit)*qm,n=new di(Ym[t.geo],xh[t.mat],e);n.instanceMatrix.setUsage(wd),AS.has(t.mat)&&(n.instanceColor=new bo(new Float32Array(e*3),3),n.instanceColor.setUsage(wd)),n.frustumCulled=!1,n.count=0,n.castShadow=!Pu.has(t.mat),n.receiveShadow=!Pu.has(t.mat),(t.mat==="shadow"||t.mat.startsWith("ring"))&&(n.renderOrder=1),Ft.add(n),t.mesh=n}const PS=new Set(["helm","corinth","crest","cheek","nose","knob","circlet"]),Af=36,ls=[],oo={};for(const t of["helm","corinth","circlet"]){const e=new di(Ym[t],xh.metal,Af);e.instanceColor=new bo(new Float32Array(Af*3),3),e.count=0,e.castShadow=!0,e.frustumCulled=!1,Ft.add(e),oo[t]=e}function LS(t){const e=Qr(t),n=t.kind==="captain"?1.18:1,i=e==="roman"?"helm":e==="greek"?"corinth":t.kind==="captain"?"circlet":null;if(!i){t.helmOff=!1;return}ls.length>=Af&&ls.shift();const r=(s,o)=>s+Math.random()*(o-s);ls.push({geo:i,s:n,col:i==="helm"?ze.steel:i==="corinth"?ze.bronze:jr(t),x:t.x,y:t.y+1.9*n,z:t.z,vx:t.vx*.6+r(-2,2),vy:r(6,9)+Math.max(0,t.vy)*.4,vz:t.vz*.6+r(-2,2),rx:0,ry:0,rz:0,wx:r(-12,12),wy:r(-8,8),wz:r(-12,12),t:0,clank:0})}const ku=new qe,Uu=new ni,Nu=new zi,IS=new D,DS=new D;function kS(t){const e={helm:0,corinth:0,circlet:0};for(let n=ls.length-1;n>=0;n--){const i=ls[n];if(i.t+=t,i.t>14){ls.splice(n,1);continue}const r=vt(i.x,i.z)+.18*i.s;if(i.vy-=20*t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<r){i.y=r,i.vy<-2.5?(i.vy=-i.vy*.42,i.wx*=.6,i.wz*=.6,i.clank<3&&(i.clank++,ct.emit("sfx",{name:"helmClank",x:i.x,z:i.z}))):(i.vy=0,i.rx+=(Math.round(i.rx/Math.PI)*Math.PI-i.rx)*Math.min(1,t*6),i.rz+=(0-i.rz)*Math.min(1,t*6),i.wx=i.wz=0);const c=Math.pow(.08,t);i.vx*=c,i.vz*=c,i.wy*=c}i.rx+=i.wx*t,i.ry+=i.wy*t,i.rz+=i.wz*t;const s=i.t>11?(i.t-11)*.25:0;Nu.set(i.rx,i.ry,i.rz),Uu.setFromEuler(Nu),ku.compose(IS.set(i.x,i.y-s,i.z),Uu,DS.set(i.s,i.s,i.s));const o=oo[i.geo],a=e[i.geo]++;o.setMatrixAt(a,ku),o.setColorAt(a,i.col)}for(const n in oo){const i=oo[n];i.count=e[n],i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}}function Qm(){ls.length=0;for(const t in oo)oo[t].count=0}const US=()=>[...So.values()].filter(t=>t.mesh.count>0).length,Cf=new WeakMap;function NS(t){const e=Cf.get(t);return e&&e.expr||"normal"}function e0(t){let e=Cf.get(t);return e||(e={walk:Math.random()*6,bodyY:0,bodyRX:0,bodyRZ:0,yaw:0,lift:0,sink:0,legL:[0,0,0],legR:[0,0,0],sArmX:0,sArmPX:.5,wArmX:0,wArmZ:0,spearRX:0,spearZ:0,block:0,over:0,rag:null},Cf.set(t,e)),e}const zS=t=>t.kind!=="captain"?null:t.ti===m.myTi?"me":!Wf()&&!ti(t.ti,m.myTi)?"ally":null;function OS(t,e,n){let i=e.rag;if(!i){const a=(f,l)=>f+Math.random()*(l-f),c=t.fallDir||1;i=e.rag={dir:c,pitch:e.bodyRX,pv:-c*a(3,6),roll:0,rollT:a(-.4,.4),spin:a(-4,4),arms:[a(-3,-.3),a(-3,-.3),a(-1.3,-.2)],legs:[a(-.7,.7),a(-.7,.7),a(.05,.5)],flip:t.launch?c*a(9,15):0,twirl:t.launch?a(-8,8):0,cart:t.launch&&Math.random()<.35?a(8,12)*(Math.random()<.5?-1:1):0,fl:0},t.kind!=="arch"&&(t.launch?Math.random()<.8:Math.random()<.12)&&(t.helmOff=!0,LS(t))}const r=t.y-vt(t.x,t.z)>.25;if(i.flip||i.cart){if(r&&t.deadT<3){i.pitch+=i.flip*n,i.roll+=i.cart*n,e.yaw+=i.twirl*n,i.fl+=n*22,e.sArmX=-1.6+Math.sin(i.fl)*1.4,e.wArmX=-1.6+Math.sin(i.fl+2)*1.4,e.wArmZ=Math.sin(i.fl*.7)*.8,e.legL[0]=Math.sin(i.fl+1)*.9,e.legR[0]=Math.sin(i.fl+3.5)*.9,e.legL[2]=.3,e.legR[2]=-.3,e.bodyY=0,e.bodyRX=i.pitch,e.bodyRZ=i.roll,e.lift=.5,e.sink=0;return}const a=Math.PI*2,c=f=>(f%a+a+Math.PI)%a-Math.PI;i.pitch=c(i.pitch),i.dir=i.pitch>0?-1:1,i.roll=c(i.roll)*.3,i.rollT=0,i.pv=0,i.flip=i.cart=0,i.spin=i.twirl*.3}const s=-i.dir*Math.PI/2*.97;i.pv+=((s-i.pitch)*70-i.pv*6)*n,i.pitch+=i.pv*n,Math.abs(i.pitch)>Math.PI/2*1.02&&(i.pitch=Math.sign(i.pitch)*Math.PI/2*1.02,i.pv*=-.35),i.spin*=Math.exp(-n*2.5),e.yaw+=i.spin*n,i.roll+=(i.rollT-i.roll)*Math.min(1,n*5);const o=Math.min(1,n*9);e.sArmX+=(i.arms[0]-e.sArmX)*o,e.wArmX+=(i.arms[1]-e.wArmX)*o,e.wArmZ+=(i.arms[2]-e.wArmZ)*o,e.legL[0]+=(i.legs[0]-e.legL[0])*o,e.legR[0]+=(i.legs[1]-e.legR[0])*o,e.legL[2]+=(i.legs[2]-e.legL[2])*o,e.legR[2]+=(-i.legs[2]-e.legR[2])*o,e.bodyY=0,e.bodyRX=i.pitch,e.bodyRZ=i.roll,e.block+=(0-e.block)*o,e.lift=.3*Math.min(1,Math.abs(i.pitch)/1.4),e.sink=t.deadT>10?Math.min(1.5,(t.deadT-10)*.4):0}const tc=t=>t<=0?0:t>=1?1:t*t*(3-2*t);function FS(t){return t<.18?tc(t/.18):t<.34?1-2*tc((t-.18)/.16):t<.62?-1:-1+tc((t-.62)/.38)}const $n=(t,e,n)=>t+(e-t)*n;function BS(t,e){const n=e0(t);if(t.dead)return n.bodyRY=0,n.expr="dead",n.dizzy=0,OS(t,n,e),n;if(n.rag=null,n.yaw=0,n.lift=0,n.sink=0,n.bodyRZ=0,n.bodyRY=0,n.idle=(n.idle||0)+e,n.hp!=null&&t.hp<n.hp-.5){const v=Math.min(1,(n.hp-t.hp)/18);n.flash=Math.min(1,Math.max(n.flash||0,v)),v>.8&&Math.random()<.35&&(n.dizzy=1.4),n.stagV=(n.stagV||0)-(3+6*v),n.stagYV=(n.stagYV||0)+(Math.random()<.5?-1:1)*4*v}n.hp=t.hp,n.flash>0&&(n.flash=Math.max(0,n.flash-e*6)),n.stag=n.stag||0,n.stagY=n.stagY||0,n.stagV=n.stagV||0,n.stagYV=n.stagYV||0,n.stagV+=(-n.stag*140-n.stagV*13)*e,n.stag+=n.stagV*e,n.stagYV+=(-n.stagY*120-n.stagYV*12)*e,n.stagY+=n.stagYV*e;const i=Math.hypot(t.vx,t.vz),r=Math.min(1,i/3),s=t.swing>0?1-t.swing/.38:-1,o=s>=0?FS(s):0;t.stun>.3&&(n.dizzy=Math.max(n.dizzy||0,t.stun+.4)),n.dizzy>0&&(n.dizzy-=e);const a=m.teams[t.ti]&&m.teams[t.ti].leader;n.expr=n.dizzy>0?"dizzy":n.flash>.25?"ouch":s>=0&&s<.62&&t.kind!=="arch"?"yell":!t.leader&&a&&a.dead||t.hp<t.max*.25?"scared":"normal",t.seesStars=n.dizzy>0;const c=t.mounted?0:t.swingKind|0,f=(t.kind==="foot"||t.kind==="captain")&&qi(t),l=t.kind==="foot"||t.kind==="captain",h=l&&!t.mounted&&!t.carrying&&t.fd!=null&&t.fd<6&&i<3.5;n.ready=$n(n.ready||0,h?1:0,Math.min(1,e*6));const d=t.jy>.05;n.wasAir&&!d&&(n.land=.2),n.wasAir=d,n.land>0&&(n.land-=e);const u=n.land>0?n.land/.2:0;if(t.mounted)n.bodyY=1.02+.03*Math.sin(n.walk*2),n.legL[0]=-.9,n.legL[1]=0,n.legL[2]=.55,n.legR[0]=-.9,n.legR[1]=0,n.legR[2]=-.55,n.bodyRX=0,n.bodyRY=.35*o,n.walk+=e*i*.9;else{n.walk+=e*i*2.2;const v=Math.sin(n.walk)*r*.7,y=.13*n.ready;if(n.legL[0]=v,n.legL[1]=0,n.legL[2]=y,n.legR[0]=-v,n.legR[1]=0,n.legR[2]=-y,n.bodyY=Math.abs(Math.cos(n.walk))*r*.08+(1-r)*.012*Math.sin(n.idle*2.1)-.05*n.ready,n.bodyRZ=Math.sin(n.walk)*r*.05,n.bodyRX=t.stun>0?-.2:Math.min(.15,i*.02)+.06*n.ready,s>=0&&l){const b=Math.max(0,-o);n.legL[0]-=.45*b,n.legR[0]+=.25*b,n.bodyRX+=(c===2?.35:.16)*b-.08*Math.max(0,o),c===2&&(n.bodyY-=.08*b)}d&&(n.legL[0]=-.9,n.legR[0]=.35,n.bodyY=0,n.bodyRX=.12),u&&(n.bodyY-=.2*u,n.legL[0]=-.55*u,n.legR[0]=.45*u,n.bodyRX+=.15*u)}n.bodyRX+=n.stag,n.bodyRY+=n.stagY*.5,n.yaw=n.stagY*.3;let _=!1;const x=Math.min(1,e*8),g=Math.min(1,e*12),p=Math.sin(n.walk)*r*.35;if(t.weapon==="jav"&&!t.mounted){const v=s>=0?tc(Math.min(1,s/.4)):0;n.wArmX=$n(n.wArmX,s>=0?-2.75+2.4*v:-2.6,Math.min(1,e*(s>=0?30:10))),n.spearRX=1.5+.4*v,n.spearZ=s>=0?-.35+.95*v:-.5,n.bodyRY+=s>=0?.45-.8*v:.3,n.sArmX=$n(n.sArmX,-.9+.4*v,x)}else if(f){const v=Up(t)||t.swing>0||n.ready>.5;n.wArmX=$n(n.wArmX,v?-1.45:-.35+p,Math.min(1,e*10)),n.spearRX=v?1.45:-.2,n.spearZ=s>=0?o>0?-.5*o:1*-o:0,n.bodyRY+=s>=0?.3*o:0,s>=0&&(n.bodyRX+=.15*Math.max(0,-o)),n.sArmX=$n(n.sArmX,-.6-.25*n.ready,x)}else if(t.kind==="arch")n.sArmX=$n(n.sArmX,t.aim?-1.5:-.3-p,Math.min(1,e*10)),n.wArmX=$n(n.wArmX,t.aim?s>=0?-1.2:-1.5:-.35+p,g),t.aim&&(n.bodyRY+=.25);else{if(s>=0)c===2?(n.wArmX=-1.55-1.65*o,n.wArmZ=-.1):c===1?(n.wArmX=-1.5-.9*Math.abs(o),n.wArmZ=.25+.75*o,n.bodyRY-=.45*o):(n.wArmX=-1.5-.9*Math.abs(o),n.wArmZ=(t.mounted?-.6:-.2)-.7*o,n.bodyRY+=.45*o);else{const b=-.35+p*(1-n.ready)-.5*n.ready+.03*Math.sin(n.idle*2.1+1);n.wArmX=$n(n.wArmX,b,Math.min(1,e*10)),n.wArmZ=$n(n.wArmZ,0,Math.min(1,e*10))}_=(t.human&&t.blocking||t.blockT>0)&&!t.mounted;const v=t.shieldwall&&t.kind==="foot";n.over=$n(n.over,v?1:0,x);const y=t.carrying?-.1:-.35-p*(1-n.ready)-.45*n.ready;n.sArmX=$n(n.sArmX,(v?-2.9:_?-1.35:y)+(s>=0&&!_&&!v?.25*o:0),Math.min(1,e*14)),n.sArmPX=_?.28:.5,_&&(n.bodyY-=.05,n.bodyRX+=.08)}return d&&!t.mounted&&s<0&&t.weapon!=="jav"&&(n.sArmX=$n(n.sArmX,-1.1,g)),n.block=$n(n.block,_?1:0,Math.min(1,e*16)),n}const Xt={root:new qe,hips:new qe,body:new qe,legL:new qe,legR:new qe,sArm:new qe,wArm:new qe,spear:new qe,shield:new qe},HS=new xe,GS=new xe(1,1,1),VS=new qe,zu=new qe,Cc=new zi,Rc=new ni,t0=new D,n0=new D,Go=new D;function cr(t,e,n,i,r,s){return Cc.set(i,r,s),Rc.setFromEuler(Cc),VS.compose(t0.set(t,e,n),Rc,n0.set(1,1,1))}function WS(t,e){const n=t.kind==="captain"?1.18:1;if(Cc.set(0,t.face+e.yaw,0),Rc.setFromEuler(Cc),Xt.root.compose(t0.set(t.x,t.y+e.lift-e.sink,t.z),Rc,n0.set(n,n,n)),Xt.body.multiplyMatrices(Xt.root,cr(0,e.bodyY,0,e.bodyRX,e.bodyRY||0,e.bodyRZ)),Xt.hips.multiplyMatrices(Xt.root,cr(0,e.bodyY,0,e.bodyRX*(t.dead?1:.35),0,e.bodyRZ)),Xt.legL.multiplyMatrices(Xt.hips,cr(-.18,.7,0,e.legL[0],e.legL[1],e.legL[2])),Xt.legR.multiplyMatrices(Xt.hips,cr(.18,.7,0,e.legR[0],e.legR[1],e.legR[2])),Xt.sArm.multiplyMatrices(Xt.body,cr(e.sArmPX,1.3,.05,e.sArmX,0,0)),Xt.wArm.multiplyMatrices(Xt.body,cr(-.5,1.3,.05,e.wArmX,0,e.wArmZ)),(t.kind==="foot"||t.kind==="captain")&&qi(t)&&Xt.spear.multiplyMatrices(Xt.wArm,cr(0,-.48,e.spearZ,e.spearRX,0,0)),t.kind==="foot"||t.kind==="captain"){const i=e.over,r=e.block*(1-i),s=Qr(t)==="greek"?.08:0,o=.56-.38*r,a=1.02+.26*r+s,c=.3+.3*r;Xt.shield.multiplyMatrices(Xt.body,cr(o+(.08-o)*i,a+(2.5-a)*i,c+(.1-c)*i,-.05*(1-r)*(1-i)-Math.PI/2*i,.5*(1-r)*(1-i),0))}}function i0(t,e){for(const l of So.values())l.n=0;const n=!zm();let i=0;const r=gs(),s=mt.position;let o=0,a=0,c=0,f=0;r&&!r.dead&&(o=r.x-s.x,a=r.y+1.3-s.y,c=r.z-s.z,f=o*o+a*a+c*c);for(const l of t){if(l.hidden)continue;if(f>0&&l!==r&&!l.dead){const _=e0(l);if(!ti(l.ti,m.myTi)){const x=l.x-s.x,g=l.y+1.1-s.y,p=l.z-s.z,v=(x*o+g*a+p*c)/f;if(v>0&&v<.93){const y=x-o*v,b=g-a*v,C=p-c*v;y*y+b*b+C*C<1.05*1.05&&(_.occT=.3)}}if(_.occT>0){_.occT-=e;continue}}if(i>=qm)break;i++;const h=BS(l,e);WS(l,h),l.swing>0&&!l.dead&&(l.kind==="foot"||l.kind==="captain")&&(qi(l)?Go.set(0,0,2.1).applyMatrix4(Xt.spear):Go.set(0,-.4,1).applyMatrix4(Xt.wArm),dS(Go.x,Go.y,Go.z,"#eef2f5"));const d=zS(l),u=Qr(l);for(const _ of Zm){if(_.k&&!_.k.has(l.kind)||_.f&&!_.f.has(u)||_.t&&!_.t(l)||l.helmOff&&PS.has(_.geo)||_.when&&(_.when==="blob"?!n:_.when!==d))continue;const x=_.batch,g=x.n++;zu.multiplyMatrices(Xt[_.bone],_.m),x.mesh.setMatrixAt(g,zu),_.col&&x.mesh.setColorAt(g,h.flash>0?HS.copy(_.col(l)).lerp(GS,h.flash*.75):_.col(l))}}kS(e);for(const l of So.values()){if(l.mesh.count=l.n,!l.n)continue;const h=l.mesh.instanceMatrix;h.clearUpdateRanges(),h.addUpdateRange(0,l.n*16),h.needsUpdate=!0;const d=l.mesh.instanceColor;d&&(d.clearUpdateRanges(),d.addUpdateRange(0,l.n*3),d.needsUpdate=!0)}}const r0={launch:["Wheeee!","I can fly!","Not agaaain!","Mummyyy!","Worth it!","My sandals!","Tell my goat…","Bye!","Too high!","Wasn’t ready!"],clout:["Not the face!","Ow! My everything!","Rude!","That’ll bruise.","I felt that.","Ow, ow, ow.","My helmet!","Oof."],stars:["Pretty stars…","Mummy?","Which way is up?","Three of you now?","Is it Tuesday?"],capDown:["Who’s in charge now?","Captain?! …Captain?","Run! Er, regroup!","I’m the captain now!","Nobody panic!","AAAAH!"],march:["Are we there yet?","My feet hurt.","I joined for the free sandals.","Is it lunch yet?","Tell my goat I loved him.","For the… uh… glory!","Who packed the snacks?","I think I left the oven on.","Left, right, left… which is left?","Nice day for it."],win:["We did it?","Victory! And snacks!","Glory!","Told you so."],follow:["With me, lads!","This way!","Follow the shiny helmet!","Keep up!"],hold:["Hold the line!","Hold! …which line?","Stay! Good soldiers.","Nobody move!"],charge:["CHAAARGE!","At them!","For glory! And lunch!","GO GO GO!"],shieldwall:["Shields up!","Wall! Not that high, Marcus.","Turtle time!","Lock shields!"]},Ka=[];function jS(t){const e=r0[t];let n,i=0;do n=e[Math.random()*e.length|0];while(Ka.includes(n)&&++i<6);return Ka.push(n),Ka.length>10&&Ka.shift(),n}const Rr=[];let Pc=2,nc=12;function Js(t,e,n=!1){!t||!r0[e]||!n&&(Pc>0||Rr.length>=3)||Rr.some(i=>i.u===t)||(Rr.push({u:t,text:jS(e),t:0,dur:e==="launch"?1.4:2.1,big:n}),Pc=n?.6:1.3+Math.random()*1.2)}const Ou=new WeakMap;function XS(t){Pc-=t,nc-=t;for(let n=Rr.length-1;n>=0;n--){const i=Rr[n];i.t+=t,i.t>i.dur&&Rr.splice(n,1)}if(m.state!=="play")return;const e=gs();if(e){for(const n of m.units){const i=Math.hypot(n.x-e.x,n.z-e.z);let r=Ou.get(n);if(!r){r={hp:n.hp,dead:n.dead,stars:!1},Ou.set(n,r);continue}i<26&&(n.dead&&!r.dead&&n.launch&&Math.random()<.45?Js(n,"launch"):!n.dead&&r.hp-n.hp>n.max*.3&&Math.random()<.22?Js(n,"clout"):!n.dead&&n.seesStars&&!r.stars&&Math.random()<.3&&Js(n,"stars")),r.hp=n.hp,r.dead=n.dead,r.stars=!!n.seesStars}if(nc<=0){nc=18+Math.random()*16;const n=!m.units.some(r=>!r.dead&&ti(r.ti,m.myTi)&&Math.hypot(r.x-e.x,r.z-e.z)<18),i=m.units.filter(r=>!r.dead&&!r.leader&&r.ti===m.myTi&&Math.hypot(r.x-e.x,r.z-e.z)<14);n&&i.length&&Js(i[Math.random()*i.length|0],"march")}}}function $S(){Rr.length=0,Pc=2,nc=12}ct.on("shout",({u:t,kind:e})=>Js(t,e,!0));ct.on("shownMsg",t=>{if(t.k!=="capDown"&&t.k!=="fell")return;const e=t.a[0],n=gs();if(!n)return;const i=m.units.filter(r=>!r.dead&&!r.leader&&r.ti===e&&Math.hypot(r.x-n.x,r.z-n.z)<24);i.length&&setTimeout(()=>Js(i[Math.random()*i.length|0],"capDown"),500)});const Wi={torso:new Dn(1,14,10),neck:new $e(.2,.3,1,8),head:new De(.32,.36,.78),leg:new $e(.1,.08,1,6),hoof:new De(.16,.12,.2),tail:new $e(.06,.14,.9,6),cloth:new De(.95,.08,.85),mane:new De(.08,.3,.9),shadow:new Yc(.62,14)},Fu=[8014378,3877408,13616304].map(t=>new Tn({color:t})),Xl=new Tn({color:2234386}),qS=new Ai({color:0,transparent:!0,opacity:.28,depthWrite:!1}),YS=he.map(t=>new Tn({color:t.hex}));function KS(t,e){const n=new Sn,i=new Sn;n.add(i);const r=Fu[e%Fu.length],s=(c,f,l,h,d,u)=>{const _=new ye(c,f);return _.position.set(h,d,u),l.add(_),_},o=s(Wi.shadow,qS,n,0,.03,0);o.rotation.x=-Math.PI/2,o.scale.set(1.2,2.2,1),s(Wi.torso,r,i,0,1.35,0).scale.set(.55,.6,1.15),s(Wi.neck,r,i,0,1.85,.95).rotation.x=.65,s(Wi.head,r,i,0,2.25,1.35).rotation.x=.55,s(Wi.mane,Xl,i,0,2.05,.8).rotation.x=.65,s(Wi.tail,Xl,i,0,1.35,-1.2).rotation.x=-.7,s(Wi.cloth,YS[Te(t)],i,0,1.95,-.05);const a=[];for(const[c,f]of[[-.28,.72],[.28,.72],[-.28,-.72],[.28,-.72]]){const l=new Sn;l.position.set(c,1.05,f),i.add(l),s(Wi.leg,r,l,0,-.5,0),s(Wi.hoof,Xl,l,0,-1,.03),a.push(l)}return i.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0)}),Ft.add(n),{root:n,body:i,legs:a,sh:o,walk:0}}const Zs=new Map;function s0(t,e){const n=new Set;for(const i of t){n.add(i.key);let r=Zs.get(i.key);if(r||(r=KS(i.ti,Math.abs(i.key*7919)%3),Zs.set(i.key,r)),r.root.position.set(i.x,vt(i.x,i.z),i.z),r.root.rotation.y=i.face,r.root.visible=!0,r.sh.visible=!zm(),i.state==="dead"){r.body.rotation.z=Math.min(1,i.t/.5)*Math.PI/2*.9*(i.fall||1),i.t>6&&(r.root.position.y-=(i.t-6)*.6);continue}r.walk+=e*i.spd*1.1;const s=Math.min(1,i.spd/4)*.8;r.legs[0].rotation.x=r.legs[3].rotation.x=Math.sin(r.walk)*s,r.legs[1].rotation.x=r.legs[2].rotation.x=Math.sin(r.walk+Math.PI)*s,r.body.position.y=Math.abs(Math.sin(r.walk))*.12*Math.min(1,i.spd/4),i.state==="leaving"&&(r.root.visible=i.t<2.6)}for(const[i,r]of Zs)n.has(i)||(Ft.remove(r.root),Zs.delete(i))}function o0(){for(const t of Zs.values())Ft.remove(t.root);Zs.clear()}const Rf=document.getElementById("fx"),X=Rf.getContext("2d"),a0=document.getElementById("mini"),ot=a0.getContext("2d"),br=new D,JS=new D;function ZS(){Rf.width=Math.round(wt.W*wt.DPR),Rf.height=Math.round(wt.H*wt.DPR)}function ao(t,e,n){return br.set(t,e,n).project(mt),br.z<=1?[(br.x+1)/2*wt.W,(1-br.y)/2*wt.H,!0]:[0,0,!1]}function c0(){X.setTransform(wt.DPR,0,0,wt.DPR,0,0),X.clearRect(0,0,wt.W,wt.H)}function QS(t){const e=wt.W,n=wt.H;c0();for(const s of Zn){const[o,a,c]=ao(s.x,s.y,s.z);if(!c)continue;const f=mt.position.distanceTo(JS.set(s.x,s.y,s.z)),l=s.s*Jt(14/f,.3,2.5);X.globalAlpha=Math.min(1,s.life*2),X.fillStyle=s.c,s.s>4?(X.beginPath(),X.arc(o,a,l,0,Math.PI*2),X.fill()):X.fillRect(o-l/2,a-l/2,l,l)}X.globalAlpha=1,X.textAlign="center",X.font="italic 20px Bangers, Impact, sans-serif";for(const s of ro){const[o,a,c]=ao(s.x,s.y,s.z);c&&(X.globalAlpha=1-s.t/1.3,X.lineWidth=4,X.strokeStyle="rgba(0,0,0,.6)",X.strokeText(s.text,o,a),X.fillStyle=s.color,X.fillText(s.text,o,a))}X.globalAlpha=1;const i=m.player;if(m.state==="play"){for(const s of m.units){if(s.dead||s===i||s.hp>=s.max-.5&&!s.leader||Math.hypot(s.x-mt.position.x,s.z-mt.position.z)>34)continue;const[a,c,f]=ao(s.x,s.y+(s.leader?3.2:2.8)+(s.mounted?1.2:0),s.z);if(!f)continue;const l=s.leader?40:26;if(X.fillStyle="rgba(0,0,0,.55)",X.fillRect(a-l/2,c,l,4),X.fillStyle=he[Te(s.ti)].css,X.fillRect(a-l/2,c,l*Math.max(0,s.hp/s.max),4),s.leader&&m.teams[s.ti]&&m.teams[s.ti].human&&t.nickFor){const h=t.nickFor(s.ti);h&&(X.font='800 12px "Barlow Semi Condensed", sans-serif',X.lineWidth=3,X.strokeStyle="rgba(0,0,0,.6)",X.strokeText(h,a,c-6),X.fillStyle="#fff",X.fillText(h,a,c-6))}m.mode==="dm"&&s.leader&&s.ti===m.bounty&&(X.font="italic 16px Bangers, Impact, sans-serif",X.lineWidth=3,X.strokeStyle="rgba(0,0,0,.6)",X.strokeText("BOUNTY",a,c-20),X.fillStyle="#ffcf3a",X.fillText("BOUNTY",a,c-20))}tT(),eT(),m.flag&&iT(),m.mode==="ctrl"&&nT(),m.mode==="dm"&&m.bounty===m.myTi&&i&&!i.dead&&performance.now()/500%1<.7&&(X.font="italic 18px Bangers, Impact, sans-serif",X.fillStyle="#ffcf3a",X.fillText("BOUNTY ON YOU",e/2,118))}const r=t.joy;r&&r.active&&(X.strokeStyle="rgba(255,255,255,.4)",X.lineWidth=2,X.beginPath(),X.arc(r.ox,r.oy,50,0,Math.PI*2),X.stroke(),X.fillStyle="rgba(255,255,255,.55)",X.beginPath(),X.arc(r.ox+r.x*50,r.oy+r.y*50,22,0,Math.PI*2),X.fill()),m.state==="play"&&(!i||i.dead)&&(X.fillStyle="rgba(120,0,0,.18)",X.fillRect(0,0,e,n)),sT()}function eT(){for(const t of Rr){const e=t.u,[n,i,r]=ao(e.x,e.y+(e.leader?3.3:2.9)+(e.dead?-1.2:0)+(e.mounted?1.2:0),e.z);if(!r)continue;const s=Math.min(1,t.t/.12),o=Math.min(1,(t.dur-t.t)/.3),a=i-10*(1-s);X.globalAlpha=Math.max(0,o),X.font=`800 ${t.big?15:13}px "Barlow Semi Condensed", sans-serif`;const c=X.measureText(t.text).width+16,f=t.big?26:23,l=n-c/2,h=a-f-8;X.fillStyle="rgba(255,255,255,.95)",X.strokeStyle="rgba(0,0,0,.35)",X.lineWidth=1.5,X.beginPath(),X.roundRect?X.roundRect(l,h,c,f,10):X.rect(l,h,c,f),X.moveTo(n-6,h+f),X.lineTo(n,h+f+8),X.lineTo(n+6,h+f),X.fill(),X.stroke(),X.fillStyle="#1b1512",X.textAlign="center",X.textBaseline="middle",X.fillText(t.text,n,h+f/2+1),X.textBaseline="alphabetic"}X.globalAlpha=1}function tT(){const t=performance.now()/1e3;X.textAlign="center";for(const e of m.units){if(e.dead||!e.seesStars)continue;const n=Math.hypot(e.x-mt.position.x,e.z-mt.position.z);if(n>30)continue;const i=Jt(260/n,9,20),r=e.y+(e.leader?2.75:2.4)+(e.mounted?1.2:0);for(let s=0;s<3;s++){const o=t*5+s*2.094+e.id,[a,c,f]=ao(e.x+Math.cos(o)*.45,r+Math.sin(o*2)*.06,e.z+Math.sin(o)*.45);f&&(X.font=`${i}px sans-serif`,X.lineWidth=2.5,X.strokeStyle="rgba(0,0,0,.55)",X.strokeText("★",a,c),X.fillStyle="#ffd84a",X.fillText("★",a,c))}}}function nT(){const t=m.ctrlPoints;if(t)for(const e of t){const[n,i,r]=ao(e.x,3.4,e.z);if(!r)continue;const s=e.owner>=0?he[Te(e.owner)].css:"#c9c9c0";X.font='800 20px "Barlow Semi Condensed", sans-serif',X.lineWidth=4,X.strokeStyle="rgba(0,0,0,.6)",X.strokeText(e.letter,n,i),X.fillStyle=s,X.fillText(e.letter,n,i),e.capturer!=null&&e.capturer!==e.owner&&e.prog>0&&(X.fillStyle="rgba(0,0,0,.5)",X.fillRect(n-34/2,i+8,34,4),X.fillStyle=he[Te(e.capturer)].css,X.fillRect(n-34/2,i+8,34*Math.min(1,e.prog),4))}}function iT(){const t=wt.W,e=wt.H,n=m.flag,i=n.state==="carried"?n.carrier:null;if(i&&i===m.player)return;const r=i?i.x:n.x,s=i?i.z:n.z,o=(i?i.y:vt(r,s))+3.4,a=i?he[Te(i.ti)].css:"#ffffff";br.set(r,o,s).project(mt);let c=(br.x+1)/2*t,f=(1-br.y)/2*e;const l=br.z>1;l&&(c=t-c,f=e-40);const h=60,d=!l&&c>h&&c<t-h&&f>h&&f<e-h;if(X.font="italic 15px Bangers, Impact, sans-serif",X.lineWidth=3,X.strokeStyle="rgba(0,0,0,.6)",d){const v=i?`${he[Te(i.ti)].name.toUpperCase()} CARRIER`:"BANNER";X.strokeText(v,c,f),X.fillStyle=a,X.fillText(v,c,f);return}const u=t/2,_=e/2,x=Math.atan2(f-_,c-u),g=Jt(u+Math.cos(x)*t,h,t-h),p=Jt(_+Math.sin(x)*e,h+50,e-h-20);X.save(),X.translate(g,p),X.rotate(x),X.fillStyle=a,X.strokeStyle="rgba(0,0,0,.5)",X.lineWidth=2,X.beginPath(),X.moveTo(16,0),X.lineTo(-8,-11),X.lineTo(-8,11),X.closePath(),X.fill(),X.stroke(),X.restore()}let Ws=null,l0=null;function rT(t,e){l0=m.layout,Ws=Ws||document.createElement("canvas"),Ws.width=Ws.height=t;const n=Ws.getContext("2d");n.clearRect(0,0,t,t),n.save(),n.translate(t/2,t/2),n.fillStyle=m.map.id==="forest"?"rgba(47,90,52,.7)":"rgba(20,18,16,.55)";for(const i of m.layout.obstacles)if(!i.castle)if(i.box)n.save(),n.translate(i.x*e,i.z*e),n.rotate(-i.rot),n.fillRect(-i.hw*e,-i.hd*e,i.hw*2*e,i.hd*2*e),n.restore();else{const r=Math.max(1.2,i.r*e);n.fillRect(i.x*e-r,i.z*e-r,r*2,r*2)}m.layout.round&&(n.strokeStyle="rgba(20,18,16,.6)",n.lineWidth=3,n.beginPath(),n.arc(0,0,m.layout.round*e,0,Math.PI*2),n.stroke()),n.restore()}function sT(){if(m.state!=="play")return;const t=a0.width,e=t/190,n=t/2;ot.clearRect(0,0,t,t),ot.save(),ot.translate(n,n),ot.rotate(ht.yaw+Math.PI);const i=m.map.id;i==="river"&&(ot.fillStyle="rgba(63,127,166,.8)",ot.fillRect(-95*e,-5*e,190*e,10*e),ot.fillStyle="rgba(107,74,46,.9)",ot.fillRect(-34.5*e,-7*e,5*e,14*e),ot.fillRect(29.5*e,-7*e,5*e,14*e)),i==="frost"&&(ot.fillStyle="rgba(255,255,255,.2)",ot.beginPath(),ot.arc(0,0,24*e,0,Math.PI*2),ot.fill()),m.layout&&(l0!==m.layout&&rT(t,e),ot.drawImage(Ws,-n,-n)),he.forEach((r,s)=>{ot.fillStyle=m.mode!=="conquest"||m.teams[s].alive?r.css:"#555",ot.fillRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18),!Wf()&&!ti(s,m.myTi)&&(ot.strokeStyle="#fff",ot.lineWidth=2,ot.strokeRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18))});for(const r of m.units){if(r.dead)continue;ot.fillStyle=he[Te(r.ti)].css;const s=r.leader?6:3.5;ot.fillRect(r.x*e-s/2,r.z*e-s/2,s,s)}if(m.flag){const r=m.flag.state==="carried"&&m.flag.carrier?m.flag.carrier:m.flag;ot.fillStyle="#fff",ot.strokeStyle="#000",ot.lineWidth=1.5,ot.beginPath(),ot.arc(r.x*e,r.z*e,5,0,Math.PI*2),ot.fill(),ot.stroke()}ot.restore(),ot.fillStyle="#fff",ot.beginPath(),ot.moveTo(n,n-8),ot.lineTo(n-5,n+5),ot.lineTo(n+5,n+5),ot.fill()}let Se=null,Qs=null,ic=null,Lc=null;const $l={},Ic={},oT={swing:6,hit:8,heavy:5,clang:12,wall:5,thud:5,fall:4,bow:1,draw:5,cloth:4,coins:2,step:5};function Sr(){if(Se){Se.state==="suspended"&&Se.resume();return}try{Se=new(window.AudioContext||window.webkitAudioContext),Lc=Se.createBuffer(1,Se.sampleRate*2,Se.sampleRate);const t=Lc.getChannelData(0);for(let i=0;i<t.length;i++)t[i]=Math.random()*2-1;const e=Se.createDynamicsCompressor();e.threshold.value=-10,e.knee.value=6,e.ratio.value=12,e.attack.value=.003,e.release.value=.2,Qs=Se.createGain(),Qs.gain.value=.9,Qs.connect(e).connect(Se.destination),ic=Se.createConvolver(),ic.buffer=aT(1.7,3.2);const n=Se.createGain();n.gain.value=.55,ic.connect(n).connect(Qs),cT()}catch{Se=null}}function aT(t,e){const n=Math.floor(Se.sampleRate*t),i=Se.createBuffer(2,n,Se.sampleRate);for(let r=0;r<2;r++){const s=i.getChannelData(r);let o=0;for(let a=0;a<n;a++){const c=a/n,f=a<Se.sampleRate*.03?.6:1;o+=(Math.random()*2-1-o)*(.5-.42*c),s[a]=o*Math.pow(1-c,e)*f}}return i}function cT(){const t=e=>new Promise((n,i)=>{const r=Se.decodeAudioData(e,n,i);r&&r.then&&r.then(n,i)});for(const[e,n]of Object.entries(oT))for(let i=1;i<=n;i++)fetch(`sfx/${e}${i}.mp3`).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(t).then(r=>{(Ic[e]=Ic[e]||[]).push(r)}).catch(()=>{})}const lT=()=>({state:Se&&Se.state,banks:Object.fromEntries(Object.entries(Ic).map(([t,e])=>[t,e.length])),voices:rc,heat:+(Ct.heat||0).toFixed(2),near:Ct.near||0,far:Ct.far||0});function zt(t,e){const n=performance.now();return $l[t]&&n-$l[t]<e?!1:($l[t]=n,!0)}function f0(){const t=gs();return t?{x:t.x,z:t.z}:null}function vh(t,e){const n=f0();if(!n||t==null)return{v:1,pan:0,far:0};const i=t-n.x,r=e-n.z,s=Math.hypot(i,r),o=ht.yaw,a=s<.5?0:Jt((i*-Math.cos(o)+r*Math.sin(o))/s,-1,1)*Jt(s/6,0,1)*.75;return{v:Jt(1.15-s/45,0,1),pan:a,far:Jt(s/45,0,1)}}function ga(t,e,n,i=.22){const r=Se.createGain();r.gain.value=e;const s=Se.createBiquadFilter();s.type="lowpass",s.frequency.value=16e3-13500*n.far,s.Q.value=.5;let o=t.connect(r).connect(s);if(Se.createStereoPanner){const c=Se.createStereoPanner();c.pan.value=n.pan,o=o.connect(c)}o.connect(Qs);const a=Se.createGain();return a.gain.value=i+.45*n.far,o.connect(a).connect(ic),r}let rc=0;function Nt(t,e,n,{vol:i=1,rate:r=1,jit:s=.08,delay:o=0,send:a,min:c=.05}={}){if(!Se||rc>28)return!1;const f=Ic[t];if(!f||!f.length)return!1;const l=vh(e,n);if(l.v<c)return!0;const h=Se.createBufferSource();return h.buffer=f[Math.random()*f.length|0],h.playbackRate.value=r*(1+(Math.random()*2-1)*s),ga(h,i*l.v,l,a),rc++,h.onended=()=>{rc--},h.start(Se.currentTime+o),!0}function yi(t,e,n,i,r="bandpass",s,o={v:1,pan:0,far:0},a=0,c=.2){if(!Se)return;const f=Se.currentTime+a,l=Se.createBufferSource(),h=Se.createBiquadFilter();l.buffer=Lc,h.type=r,h.frequency.setValueAtTime(e,f),s&&h.frequency.exponentialRampToValueAtTime(s,f+t),h.Q.value=n,l.connect(h);const d=ga(h,1,o,c);d.gain.setValueAtTime(Math.max(.0011,i*o.v),f),d.gain.exponentialRampToValueAtTime(.001,f+t),l.start(f,Math.random()*1.2),l.stop(f+t)}function dr(t,e,n,i="sine",r,s=0,o={v:1,pan:0,far:0},a=.2){if(!Se)return;const c=Se.currentTime+s,f=Se.createOscillator();f.type=i,f.frequency.setValueAtTime(t,c),r&&f.frequency.exponentialRampToValueAtTime(r,c+e);const l=ga(f,1,o,a);l.gain.setValueAtTime(1e-4,c),l.gain.exponentialRampToValueAtTime(Math.max(2e-4,n*o.v),c+.01),l.gain.exponentialRampToValueAtTime(1e-4,c+e),f.start(c),f.stop(c+e+.02)}function co(t=1,e=0,n=1,i){dr(78*n,.55,.55*t,"sine",42*n,e,i,.35),dr(160*n,.12,.12*t,"triangle",90*n,e,i,.35),yi(.07,1200,.9,.25*t,"bandpass",400,i,e,.35)}function Gr(t,e,n=.12,i=0){if(!Se)return;const r=Se.currentTime+i,s=Se.createBiquadFilter();s.type="lowpass",s.Q.value=2,s.frequency.setValueAtTime(t*1.5,r),s.frequency.linearRampToValueAtTime(t*6,r+.18),s.frequency.linearRampToValueAtTime(t*4,r+e);const o=ga(s,1,{pan:0,far:0},.5);o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(n,r+.09),o.gain.setValueAtTime(n,r+e-.25),o.gain.exponentialRampToValueAtTime(1e-4,r+e);const a=Se.createOscillator(),c=Se.createGain();a.frequency.value=5.2,c.gain.setValueAtTime(0,r),c.gain.linearRampToValueAtTime(t*.012,r+.4),a.connect(c);for(const f of[-7,0,6]){const l=Se.createOscillator();l.type="sawtooth",l.frequency.setValueAtTime(t*.97,r),l.frequency.exponentialRampToValueAtTime(t,r+.07),l.detune.value=f,c.connect(l.frequency),l.connect(s),l.start(r),l.stop(r+e+.05)}a.start(r),a.stop(r+e+.05)}let Jn=null,Ct={t:0,drumT:0,clashT:0,heat:0,arena:!1};function Bu(t,e,n,i){const r=Se.createBufferSource();r.buffer=Lc,r.loop=!0,r.loopStart=Math.random(),r.loopEnd=2;const s=Se.createBiquadFilter();s.type=n,s.frequency.value=t,s.Q.value=e;const o=Se.createGain();return o.gain.value=0,r.connect(s).connect(o).connect(Qs),r.start(),{s:r,gn:o,fl:s,g:i}}function fT(t){if(!Se)return;yh(),Ct={t:0,drumT:1.5,clashT:0,heat:0,arena:t==="colosseum"},Jn={wind:Bu(380,.4,"lowpass",.05),roar:Bu(Ct.arena?520:330,.8,"bandpass",Ct.arena?.16:.1)};const e=Se.currentTime;Jn.wind.gn.gain.linearRampToValueAtTime(Jn.wind.g,e+2),Jn.roar.gn.gain.linearRampToValueAtTime(Jn.roar.g*.4,e+2)}function yh(){if(!Jn||!Se){Jn=null;return}const t=Se.currentTime;for(const e of Object.values(Jn))try{e.gn.gain.cancelScheduledValues(t),e.gn.gain.setValueAtTime(e.gn.gain.value,t),e.gn.gain.linearRampToValueAtTime(0,t+.8),e.s.stop(t+.85)}catch{}Jn=null}function hT(t){if(!Se||!Jn||m.state!=="play")return;Ct.t-=t,Ct.drumT-=t,Ct.clashT-=t;const e=f0();if(Ct.t<=0&&e){Ct.t=.5;let n=0,i=0;for(const o of m.units){if(o.dead||!(o.swing>0||o.fd!=null&&o.fd<2.5))continue;Math.hypot(o.x-e.x,o.z-e.z)<20?n++:i++}Ct.near=n,Ct.far=i;const r=Jt((n*1.5+i)/40,0,1);Ct.heat+=(r-Ct.heat)*.35;const s=Se.currentTime;Jn.roar.gn.gain.setTargetAtTime(Jn.roar.g*(.35+.9*Ct.heat),s,.6),Jn.roar.fl.frequency.setTargetAtTime((Ct.arena?520:300)+280*Ct.heat,s,.6)}if(Ct.clashT<=0&&(Ct.clashT=.12+Math.random()*(Ct.far>6?.25:.9),(Ct.far||0)>0)){const n=Math.random()*Math.PI*2,i=30+Math.random()*30,r=gs();r&&Nt(Math.random()<.6?"clang":"hit",r.x+Math.cos(n)*i,r.z+Math.sin(n)*i,{vol:.35,rate:.85,jit:.12,min:0})}if(Ct.drumT<=0){const n=Ct.heat,i=60/(70+60*n),r={v:.5+.5*n,pan:(Math.random()-.5)*.3,far:.5};co(.55,0,1,r),co(.4,i*.5,1.12,r),n>.35&&co(.35,i*.75,1.2,r),Ct.drumT=i*2}}const ji=(t,e)=>vh(t,e),At={swing(t,e){zt("sw",45)&&(Nt("swing",t,e,{vol:.45,rate:1.05,jit:.12,send:.12})||yi(.14,1800,1,.12,"bandpass",600,ji(t,e)))},hit(t,e){zt("hi",40)&&(Nt("hit",t,e,{vol:.8,jit:.1,send:.18})||yi(.12,380,1,.4,"lowpass",0,ji(t,e)),Math.random()<.35&&Nt("cloth",t,e,{vol:.25,delay:.02}))},clang(t,e){if(!zt("cl",45))return;Nt("clang",t,e,{vol:.7,jit:.1,send:.3})||yi(.08,3400,7,.22,"bandpass",0,ji(t,e));const n=ji(t,e);dr(2200+Math.random()*900,.35,.025,"sine",0,0,n,.4),dr(3700+Math.random()*700,.22,.014,"sine",0,0,n,.4)},heavy(t,e){zt("hv",80)&&(Nt("heavy",t,e,{vol:1,jit:.06,send:.25}),dr(85,.28,.35,"sine",38,0,ji(t,e),.3))},die(t,e){zt("di",90)&&(Nt("fall",t,e,{vol:.75,delay:.18,rate:.9}),Nt("cloth",t,e,{vol:.3,delay:.1}))},wall(t,e){zt("wa",100)&&(Nt("wall",t,e,{vol:.75,rate:.85,send:.35})||yi(.2,500,1.2,.3,"lowpass",0,ji(t,e)))},bow(t,e){zt("bo",60)&&(Nt("bow",t,e,{vol:.5,jit:.12,send:.15})||yi(.25,2600,2,.06,"bandpass",900,ji(t,e)))},thud(t,e){zt("th",60)&&(Nt("thud",t,e,{vol:.45,jit:.15})||yi(.07,900,1.5,.15,"bandpass",0,ji(t,e)))},hoof(t,e){zt("ho",85)&&(Nt("step",t,e,{vol:.55,rate:.6,jit:.1})||yi(.05,260,2,.25,"bandpass",0,ji(t,e)))},trample(t,e){zt("tr",90)&&(Nt("heavy",t,e,{vol:.8,rate:.75}),Nt("fall",t,e,{vol:.5,delay:.08}))},neigh(){for(let t=0;t<6;t++)Nt("step",null,null,{vol:.5-t*.05,rate:.55,jit:.1,delay:t*.11+t%2*.04})},draw(){zt("dr",120)&&(Nt("draw",null,null,{vol:.55,send:.15})||dr(700,.12,.05,"triangle",1300))},jump(t,e){zt("jp",120)&&Nt("cloth",t,e,{vol:.45,rate:1.1})},land(t,e){zt("ld",120)&&Nt("step",t,e,{vol:.6,rate:.8})},coin(){zt("co",60)&&(Nt("coins",null,null,{vol:.45,jit:.05,send:.1})||dr(1300,.08,.08,"square"))},horn(){const t={v:.9,pan:0,far:.3};co(.8,0,1,t),co(.6,.22,1.1,t),co(.9,.44,.95,t),Gr(98,1.9,.1,.55),Gr(147,1.6,.06,.8)},order(){zt("or",150)&&(Gr(196,.32,.07),Gr(262,.42,.05,.16))},capture(){Gr(262,.35,.08),Gr(330,.35,.07,.3),Gr(392,.9,.09,.6)},crumble(){for(let t=0;t<4;t++)Nt("wall",null,null,{vol:.8,rate:.55+t*.08,delay:t*.12});yi(1.6,260,.7,.7,"lowpass",60)},cheer(){zt("ch",400)&&(yi(1.6,700,.8,.18,"bandpass",1400,void 0,0,.4),yi(1.9,480,.6,.14,"bandpass",900,void 0,.1,.4))},whee(t,e){if(!Se||!zt("wh",140))return;const n=vh(t,e);if(n.v<.08)return;const i=Se.currentTime,r=Se.createOscillator(),s=.28+Math.random()*.1,o=520+Math.random()*160;r.type="sine",r.frequency.setValueAtTime(o,i),r.frequency.exponentialRampToValueAtTime(o*3.1,i+s),r.frequency.exponentialRampToValueAtTime(o*.8,i+s+.5);const a=Se.createOscillator(),c=Se.createGain();a.frequency.value=7,c.gain.value=18,a.connect(c).connect(r.frequency);const f=ga(r,1,n,.15);f.gain.setValueAtTime(1e-4,i),f.gain.exponentialRampToValueAtTime(.09*n.v,i+.04),f.gain.setValueAtTime(.09*n.v,i+s+.3),f.gain.exponentialRampToValueAtTime(1e-4,i+s+.55),r.start(i),r.stop(i+s+.6),a.start(i),a.stop(i+s+.6)},helmClank(t,e){zt("hc",60)&&Nt("clang",t,e,{vol:.3,rate:1.5,jit:.15,send:.15})},thump(t,e){zt("tp",70)&&Nt("fall",t,e,{vol:.7,rate:.85})},uiClick(){zt("ui",45)&&dr(620,.04,.04,"triangle",480)}};function eo(t){try{navigator.vibrate&&navigator.vibrate(t)}catch{}}const Fe={NET:null,myNick:""};try{Fe.myNick=localStorage.getItem("fb-nick")||""}catch{}const bi=()=>!!(Fe.NET&&Fe.NET.role==="client"),es=()=>!!(Fe.NET&&Fe.NET.role==="host"),Hu=(t,e)=>{var n;try{return(n=localStorage.getItem(t))!=null?n:e}catch{return e}},fn={faction:Hu("rally-faction","roman"),color:+Hu("rally-color","0")||0,save(){try{localStorage.setItem("rally-faction",this.faction),localStorage.setItem("rally-color",String(this.color))}catch{}}},lt=t=>document.getElementById(t),Mh=t=>(t=Math.max(0,Math.floor(t)),Math.floor(t/60)+":"+String(t%60).padStart(2,"0"));function dT(){lt("ptsTitle").textContent=hs[m.mode].title,lt("tpRows").innerHTML=he.map((t,e)=>`<div class="tp${e===Te(m.myTi)?" me":""}" id="tp${e}"><span class="al">${Wf()?"":pp[m.ALLY[e]]}</span><div class="bar"><i style="background:${t.css}"></i></div><b>0</b></div>`).join(""),lt("pips").innerHTML=he.map((t,e)=>`<span class="pip" id="pip${e}" style="background:${t.css}">${t.name[0]}</span>`).join(""),lt("clockMax").textContent=Mh(hs[m.mode].time)}function uT(){["ovTitle","ovEnd","ovBrowse","ovLobby"].forEach(t=>lt(t).hidden=!0),lt("hudWrap").hidden=!1,lt("joyhint").style.opacity=1}const pT={sword:'<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',spear:'<path d="M4 20 16.5 7.5"/><path d="M14 4.5 20.5 3.5 19.5 10z" fill="#fff"/><path d="M6.5 15.5l2 2"/>',jav:'<path d="M3 18 16 8"/><path d="M14 5.5 21 4 18.5 10.5z" fill="#fff"/><path d="M3 12h5M5 21.5h5"/>'};let Gu=null,Vu=null;const mT={follow:"Follow",hold:"Hold",charge:"Charge",shieldwall:"Wall"},Wu={follow:'<path d="M6 21V4h11l-2.5 4 2.5 4H6"/>',hold:'<path d="M12 5v16M7 9h10M5 14a7 7 0 0 0 14 0"/><circle cx="12" cy="4" r="1.6"/>',charge:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',shieldwall:'<path d="M2.5 7h5.5v5c0 3-2.75 5-2.75 5S2.5 15 2.5 12zM9.25 7h5.5v5c0 3-2.75 5-2.75 5s-2.75-2-2.75-5zM16 7h5.5v5c0 3-2.75 5-2.75 5S16 15 16 12z"/>'};function bh(t){he.forEach((d,u)=>{const _=lt("tp"+u);if(!_)return;const x=i_(u),g=m.mode==="conquest"?100:m.mode==="dm"?bp:m.mode==="ctrl"?Tr.win:ea;_.querySelector("i").style.transform=`scaleX(${Math.max(0,x)/g})`,_.querySelector("b").textContent=m.mode==="ctf"?`${x}/${ea}`:Math.max(0,Math.ceil(x));const p=r_(u);_.classList.toggle("out",p);const v=lt("pip"+u);v.classList.toggle("out",p),v.classList.toggle("hum",s_(u)),v.textContent=p?"✕":d.name[0]}),lt("clockT").textContent=Mh(m.T);const e=m.player,n=m.teams[m.myTi];e&&(lt("hpT").textContent=`${Math.max(0,Math.ceil(e.hp))}/${e.max}`,lt("hpBar").style.transform=`scaleX(${Math.max(0,e.hp)/e.max})`,lt("horseBarWrap").hidden=!e.mounted,lt("horseBar").style.transform=`scaleX(${Math.min(1,Math.max(0,e.horseHp)/ua(m.myTi))})`);const i=Math.floor(n.gold);lt("gold").textContent=i;const r=Ao(m.myTi);lt("squadN").textContent=r.length;const s=d=>r.filter(u=>u.kind===d).length;lt("squadMix").textContent=`F${s("foot")} A${s("arch")}`,document.querySelectorAll("#tray button").forEach(d=>{d.setAttribute("aria-disabled",i<mn[d.dataset.kind].cost||r.length>=m.squadCap||!to(m.myTi)?"true":"false")}),document.querySelectorAll("#upTray button").forEach(d=>{const u=d.dataset.up,_=Ri.find(y=>y.id===u),x=_?_.cost.length:0,g=n.up?n.up[u]:0,p=ta(m.myTi,u),v=u==="foot2"&&!(n.up&&n.up.foot1)||u==="arch2"&&!(n.up&&n.up.arch1);d.querySelector(".lv").dataset.pips="●".repeat(g)+"○".repeat(Math.max(0,x-g)),d.querySelector("em").textContent=p==null?"Max":v?"Locked":p+"g",d.setAttribute("aria-disabled",p==null||i<p||v?"true":"false")}),lt("mnt").classList.toggle("on",!!(e&&e.mounted)),lt("mntT").textContent=e?e.mounted?"Walk":e.summon?"Coming":e.horseCd>0?Math.ceil(e.horseCd)+"s":"Ride":"Ride",lt("mnt").setAttribute("aria-label",e&&e.mounted?"Get off your horse":"Call your horse"),lt("mnt").classList.toggle("dim",!e||!e.mounted&&(e.horseCd>0||e.carrying||e.dead)),lt("blk").classList.toggle("dim",!e||e.mounted),lt("atk").classList.toggle("dim",!e||e.carrying);const o=e&&e.weapon||"sword";Gu!==o&&(Gu=o,lt("atkIc").innerHTML=pT[o]);const a=Wp(m.myTi),c=e?Math.min(a,e.javAmmo|0):0;lt("wpnS").textContent=o==="jav"?`Jav ${c}`:yp[o],lt("jmp").classList.toggle("dim",!e||e.mounted||e.carrying),lt("vlyT").textContent=n.volleyCd>0?Math.ceil(n.volleyCd)+"s":"Volley",lt("vly").classList.toggle("dim",!e||e.dead||n.volleyCd>0);const f=n.order||"follow";Vu!==f&&(Vu=f,lt("cmdIc").innerHTML=Wu[f]||Wu.follow,lt("cmdT").textContent=mT[f]||"Follow",lt("cmdBtn").setAttribute("aria-label","Squad order: "+(Bh[f]||Bh.follow))),lt("cmdBtn").style.borderColor=f==="follow"?"var(--green)":f==="hold"?"var(--yellow)":f==="shieldwall"?"#7f9bff":"var(--red)";const l=Fe.NET,h=lt("netTag");if(l){h.hidden=!1;const d=m.teams.map((u,_)=>_).filter(u=>m.teams[u].active&&m.teams[u].human&&u!==m.myTi).map(u=>he[Te(u)].name+(u>=4?" (co-captain)":""));if(bi()){const u=performance.now()-(t||0)>2500;h.textContent=u?"Waiting for the host…":`Online · ${d.length?"with "+d.join(", "):"host"}`,h.classList.toggle("bad",u)}else h.textContent=`Hosting · ${d.length?d.join(", "):"no one else yet"}`}else h.hidden=!0}let ju;function pr(t,e,n){const i=lt("banner");i.innerHTML="";const r=document.createElement("span");if(r.textContent=t,r.style.color=n||"#fff",i.appendChild(r),e){const s=document.createElement("small");s.textContent=e,i.appendChild(s)}i.classList.add("on"),clearTimeout(ju),ju=setTimeout(()=>i.classList.remove("on"),2e3)}const gT=t=>he.filter((e,n)=>m.ALLY[n]===t).map(e=>e.name).join(" & ");function _T(t,e){const n=m.myTi,i=a=>he[Te(a)].name,r=a=>he[Te(a)].css,s=a=>a===n,o=a=>!ti(a,n);switch(t){case"start":return[hs[m.mode].name,m.mode==="conquest"?"Tear down every enemy castle":m.mode==="dm"?"Last side with tickets wins":m.mode==="ctrl"?"Hold the points to build your score":"Bring the banner home three times"];case"castleDown":return Te(e[0])===Te(n)?["Your castle has fallen!","No more recruits. Stay alive.","#e0352b"]:[`${i(e[0])} castle destroyed!`,e[1]===n?"Your doing":`by ${i(e[1])}`,r(e[0])];case"tickets0":return[`${i(e[0])} out of tickets!`,s(e[0])?"No more respawns":o(e[0])?"Protect your ally":"Finish them off",r(e[0])];case"bounty":return[`Bounty on ${i(e[0])}'s captain`,s(e[0])?"Everyone is coming for you":"Double gold for the kill",r(e[0])];case"bountyClaimed":return s(e[0])?["Bounty claimed!","+50 gold","#ffcf3a"]:null;case"capDown":return s(e[1])?[`${i(e[0])} captain down`,"",r(e[0])]:null;case"fell":return s(e[0])?["You fell!",e[1]?"Back in the fight in 5 seconds":"No way back. Your allies fight on.","#e0352b"]:null;case"respawn":return s(e[0])?["Back on your feet","Rally your squad"]:null;case"horseDown":return s(e[0])?["Your horse is down!",`New horse in ${_c(e[0])} seconds`,"#e0352b"]:null;case"rideNo":return s(e[0])?e[1]==="banner"?["Not with the banner","Carry it home on foot"]:e[1]==="rest"?["Your horse is resting",`Ready in ${e[2]} seconds`]:["Too hot to call your horse","Get clear of the fight first"]:null;case"flagTaken":return s(e[0])?["You have the banner!","Carry it home. Your squad will escort you.",r(e[0])]:[`${i(e[0])} has the banner!`,o(e[0])?"Escort them home":"Stop the carrier",r(e[0])];case"flagDropped":return s(e[0])?["Banner dropped!","Grab it again before it returns"]:[`${i(e[0])} dropped the banner`,"",r(e[0])];case"flagHome":return["The banner returns to the fort",""];case"capture":return[`${i(e[0])} captures the banner!`,`${Hp(m.ALLY[Te(e[0])])} of ${ea}`,r(e[0])];case"upgrade":{const a=Ri.find(c=>c.id===e[1]);return s(e[0])&&a?[`${a.name} level ${e[2]}`,a.desc,"#ffcf3a"]:null}case"left":return[`${i(e[0])}'s player left`,"The computer takes over their army",r(e[0])];case"pointCaptured":return s(e[0])?[`You captured Point ${e[1]}!`,"",r(e[0])]:[`${i(e[0])} captured Point ${e[1]}!`,o(e[0])?"Reinforce them":"Take it back",r(e[0])]}return null}function lo(t,e){ct.emit("shownMsg",{k:t,a:e});const n=m.myTi;if(t==="gold"){e[0]===n&&(cs(e[1],vt(e[1],e[2])+2.6,e[2],`+${e[3]} gold`,"#ffcf3a"),At.coin());return}const i=_T(t,e);i&&(pr(i[0],i[1],i[2]),t==="horseDown"&&e[0]===n&&(eo(120),ht.shake=.5),t==="capture"&&(At.capture(),At.cheer(),ti(e[0],n)||eo([60,40,60])),t==="castleDown"&&(At.crumble(),At.cheer(),ht.shake=.6,e[0]===n&&eo([100,60,100])),t==="flagTaken"&&e[0]===n&&(At.order(),eo(50)))}const Pn=t=>document.getElementById(t),pt={joy:{active:!1,id:null,ox:0,oy:0,x:0,y:0},look:{id:null,lx:0,ly:0},keys:{},attackHeld:!1,blockHeld:!1,trayIsOpen:!1,upIsOpen:!1};let Ht={attack(){},ride(){},order(){},recruit(){},upgrade(){},volley(){},jump(){},weapon(){}};function sa(t){pt.trayIsOpen=t,Pn("tray").hidden=!t,Pn("recBtn").classList.toggle("open",t),t&&fo(!1)}function fo(t){pt.upIsOpen=t,Pn("upTray").hidden=!t,Pn("upBtn").classList.toggle("open",t),t&&sa(!1)}function h0(){pt.keys={},pt.attackHeld=pt.blockHeld=!1,pt.joy.active=!1,pt.joy.x=pt.joy.y=0,pt.look.id=null}function d0(t){const{joy:e,keys:n}=pt;let i=e.x,r=e.y;n.KeyA&&(i-=1),n.KeyD&&(i+=1),n.KeyW&&(r-=1),n.KeyS&&(r+=1),n.ArrowLeft&&(ht.yaw+=t*2.4),n.ArrowRight&&(ht.yaw-=t*2.4),n.ArrowUp&&(r-=1),n.ArrowDown&&(r+=1);let s=Math.hypot(i,r);s>1&&(i/=s,r/=s,s=1);const o=ht.yaw,a=Math.sin(o),c=Math.cos(o),f=-Math.cos(o),l=Math.sin(o);return{wx:a*-r+f*i,wz:c*-r+l*i,mag:s,block:pt.blockHeld,attackHeld:pt.attackHeld,camYaw:o}}function xT(t){Ht=t;const e=Pn("touch"),{joy:n,look:i}=pt;e.addEventListener("pointerdown",a=>{if(m.state==="play"){Sr(),a.preventDefault(),sa(!1),fo(!1),a.clientX<wt.W*.42&&!n.active?(n.active=!0,n.id=a.pointerId,n.ox=a.clientX,n.oy=a.clientY,n.x=n.y=0,Pn("joyhint").style.opacity=0):i.id===null&&(i.id=a.pointerId,i.lx=a.clientX,i.ly=a.clientY);try{e.setPointerCapture(a.pointerId)}catch{}}}),e.addEventListener("pointermove",a=>{if(a.pointerId===n.id){const c=a.clientX-n.ox,f=a.clientY-n.oy,l=50,h=Math.hypot(c,f);h>l&&(n.ox+=c*(1-l/h)*.4,n.oy+=f*(1-l/h)*.4),n.x=Jt(c/l,-1,1),n.y=Jt(f/l,-1,1);const d=Math.hypot(n.x,n.y);d>1&&(n.x/=d,n.y/=d)}else a.pointerId===i.id&&(ht.yaw-=(a.clientX-i.lx)*.0075,ht.pitch=Jt(ht.pitch+(a.clientY-i.ly)*.004,.12,.75),i.lx=a.clientX,i.ly=a.clientY)});const r=a=>{a.pointerId===n.id&&(n.active=!1,n.id=null,n.x=n.y=0),a.pointerId===i.id&&(i.id=null)};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r);const s=(a,c,f)=>{a.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),Sr();try{a.setPointerCapture(h.pointerId)}catch{}a.classList.add("held"),c()});const l=()=>{a.classList.remove("held"),f()};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l)},o=(a,c)=>{a.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),Sr(),c()}),a.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),c())})};s(Pn("atk"),()=>{pt.attackHeld=!0,Ht.attack()},()=>{pt.attackHeld=!1}),s(Pn("blk"),()=>{pt.blockHeld=!0},()=>{pt.blockHeld=!1}),o(Pn("mnt"),()=>Ht.ride()),o(Pn("jmp"),()=>Ht.jump()),o(Pn("wpn"),()=>Ht.weapon()),o(Pn("vly"),()=>Ht.volley()),o(Pn("cmdBtn"),()=>Ht.order()),o(Pn("recBtn"),()=>sa(!pt.trayIsOpen)),document.querySelectorAll("#tray button").forEach(a=>o(a,()=>Ht.recruit(a.dataset.kind))),o(Pn("upBtn"),()=>fo(!pt.upIsOpen)),document.querySelectorAll("#upTray button").forEach(a=>o(a,()=>Ht.upgrade(a.dataset.up))),addEventListener("keydown",a=>{if(m.state!=="play"||a.target&&a.target.tagName==="INPUT"||(Sr(),pt.keys[a.code]=!0,a.code==="Space"&&(a.preventDefault(),pt.attackHeld=!0,a.repeat||Ht.attack()),(a.code==="ShiftLeft"||a.code==="ShiftRight")&&(pt.blockHeld=!0),a.repeat))return;a.code==="KeyQ"&&Ht.order("follow"),a.code==="KeyF"&&Ht.order("hold"),a.code==="KeyE"&&Ht.order("charge"),a.code==="KeyT"&&Ht.order("shieldwall"),a.code==="KeyV"&&Ht.volley(),a.code==="KeyC"&&Ht.jump(),a.code==="KeyR"&&Ht.weapon(),a.code==="KeyU"&&fo(!pt.upIsOpen);const c=["Digit3","Digit4","Digit5","Digit6","Digit7","Digit8"].indexOf(a.code);c>=0&&Ht.upgrade(["foot1","foot2","arch1","arch2","aura","horse"][c]),a.code==="KeyH"&&Ht.ride(),a.code==="Digit1"&&Ht.recruit("foot"),a.code==="Digit2"&&Ht.recruit("arch")}),addEventListener("keyup",a=>{pt.keys[a.code]=!1,a.code==="Space"&&(pt.attackHeld=!1),a.code.startsWith("Shift")&&(pt.blockHeld=!1)}),addEventListener("blur",h0)}const bn=t=>document.getElementById(t),Sh="rally-tutorial-done",vT=()=>{try{return localStorage.getItem(Sh)==="1"}catch{return!0}},yT=()=>{try{localStorage.setItem(Sh,"1")}catch{}},Vs=matchMedia("(pointer: coarse)").matches,MT={conquest:"Now lead your army and tear down the enemy castles.",dm:"Now fight: the last side with tickets wins.",ctf:"Now grab the banner in the centre fort and carry it home.",ctrl:"Now take and hold the lettered points on the map."},fs=[{t:"Move",s:Vs?"Drag on the left of the screen":"W A S D",hi:"joyhint",start:(t,e)=>{e.x=t.x,e.z=t.z},done:(t,e)=>Math.hypot(t.x-e.x,t.z-e.z)>5},{t:"Attack three times, fast",s:Vs?"Tap the red button: the 3rd hit is a heavy blow":"Space ×3: the 3rd hit is a heavy blow",hi:"atk",done:t=>t.combo===2&&m.T-t.lastSwingT<1},{t:"Jump, then attack in mid-air",s:Vs?"A slam that hits everyone in front of you":"C, then Space: slams everyone in front of you",hi:"jmp",start:(t,e)=>{e.n=t.leaps||0},done:(t,e)=>(t.leaps||0)>e.n},{t:"Switch weapon",s:Vs?"Sword → Spear → Javelins":"R: Sword → Spear → Javelins",hi:"wpn",start:(t,e)=>{e.w=t.weapon},done:(t,e)=>t.weapon!==e.w},{t:"Give your squad an order",s:Vs?"The Follow button: Follow, Hold, Charge, Shieldwall":"Q follow · F hold · E charge · T shieldwall",hi:"cmdBtn",start:(t,e)=>{e.o=m.teams[m.myTi].order},done:(t,e)=>m.teams[m.myTi].order!==e.o},{t:"Hire a soldier",s:Vs?"The recruit button, then Footman or Archer":"1 footman · 2 archer",hi:"recBtn",start:(t,e)=>{e.r=m.recruited},done:(t,e)=>m.recruited>e.r}];let Qn=-1,Pf={},Vo=null,Ko=0;function Zc(t){Vo&&Vo.classList.remove("coach-hi"),Vo=t?bn(t):null,Vo&&Vo.classList.add("coach-hi")}function bT(){const t=fs[Qn];bn("coachN").textContent=`${Qn+1} / ${fs.length}`,bn("coachT").textContent=t.t,bn("coachS").textContent=t.s,Zc(t.hi)}function u0(t){if(Qn=t,Pf={},Qn>=fs.length){p0(!0);return}const e=m.player;e&&fs[Qn].start&&fs[Qn].start(e,Pf),bT()}function p0(t){yT(),Zc(null),t?(bn("coachN").textContent="Ready",bn("coachT").textContent="You know the basics",bn("coachS").textContent=MT[m.mode]||"",bn("coachSkip").hidden=!0,Ko=4.5,Qn=fs.length,At.order()):(bn("coach").hidden=!0,Qn=-1)}function ST(){bn("coach").hidden=!0,Zc(null),Qn=-1,Ko=0,!(vT()||m.role!=="solo")&&(bn("coach").hidden=!1,bn("coachSkip").hidden=!1,u0(0))}function m0(){bn("coach").hidden=!0,Zc(null),Qn=-1}function TT(t){if(Qn<0)return;if(Ko>0){Ko-=t,Ko<=0&&m0();return}const e=m.player;!e||e.dead||m.state!=="play"||fs[Qn].done(e,Pf)&&(At.coin(),u0(Qn+1))}function ET(){bn("tutAgain").addEventListener("click",()=>{try{localStorage.removeItem(Sh)}catch{}bn("tutAgain").textContent="The tutorial will show in your next battle"}),bn("coachSkip").addEventListener("pointerdown",t=>{t.preventDefault(),t.stopPropagation(),p0(!1)})}const Xu=(t,e)=>{var n;try{return(n=localStorage.getItem(t))!=null?n:e}catch{return e}},g0=(t,e)=>{try{localStorage.setItem(t,String(e))}catch{}},hn={xp:Math.max(0,+Xu("rally-xp","0")||0),crest:Math.max(0,+Xu("rally-crest","0")||0)};function oa(t){let e=0;return hi.forEach((n,i)=>{t>=n.xp&&(e=i)}),e}const _0=t=>t<=oa(hn.xp);function x0(t){return!_0(t)||!is[t]?!1:(hn.crest=t,g0("rally-crest",t),!0)}function $u(t=hn.xp){const e=oa(t),n=hi[e+1];return{rank:e,into:t-hi[e].xp,span:n?n.xp-hi[e].xp:0}}function wT({result:t,kills:e,diff:n}){var c;const i=hn.xp,r=oa(i),s=Ms.base+Math.min(e,Ms.maxKills)*Ms.perKill+(t==="win"?Ms.win:t==="draw"?Ms.draw:0),o=Math.round(s*((c=Ms.diffMult[n])!=null?c:1));hn.xp=i+o,g0("rally-xp",hn.xp);const a=oa(hn.xp);return a>r&&x0(a),{gained:o,before:i,after:hn.xp,rankUp:a>r,rank:a,unlocked:a>r?is.slice(r+1,a+1).map(f=>f.name):[]}}const qu=[3,2,1,0],AT=[1,0,3,2];function aa(t,e){const n=[0,1,2,3];if(t==="2v2"){const i=qu[e];for(let r=0;r<4;r++)n[r]=r===e||r===i?0:1}else if(t==="2v1v1"){const i=qu[e];let r=1;for(let s=0;s<4;s++)n[s]=s===e||s===i?0:r++}else if(t==="3v1"){const i=AT[e];for(let r=0;r<4;r++)n[r]=r===i?1:0}return n}function CT(t,e){const n=f=>f===e?`you (${he[f].name})`:he[f].name,i=[...new Set(t)].map(f=>he.map((l,h)=>h).filter(l=>t[l]===f));if(i.length===4)return`Every team for itself. You are ${he[e].name}.`;const r=f=>f.length<2?f.join(""):f.slice(0,-1).join(", ")+" and "+f[f.length-1],s=f=>r(f.map(n)),o=i.find(f=>f.includes(e)),a=i.filter(f=>f!==o),c=`${s(o)} against ${r(a.map(s))}`;return c[0].toUpperCase()+c.slice(1)+(a.length>1?", each on their own.":".")}function Th(t,e){const n=ds((e|0)+101),i=t.slice(),r=new Set(t.filter(Boolean));let s=Ql.filter(o=>!r.has(o));for(let o=0;o<4;o++)i[o]||(s.length||(s=Ql.slice()),i[o]=s.splice(Math.floor(n()*s.length),1)[0]);return i}const q={},To=t=>Math.round(t*10)/10,ts=t=>Math.round(t*100)/100,On=t=>Math.max(0,Math.round(t)).toString(36),Fn=t=>parseInt(t,36),Ii=t=>On((t+100)*10),oi=t=>Fn(t)/10-100,Yu=t=>On((t%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*72%72),Ku=t=>Fn(t)/72*Math.PI*2,Qc=t=>{const e=t.peers().find(n=>n.sameTab);return e?e.peer:null};let ca={onMatchStart(){},onAbort(){},onLobby(){}};function RT(t){ca=Object.assign(ca,t)}ct.on("msg",t=>{const e=Fe.NET;es()&&e.msgs&&(e.msgs.push([++e.msgN,t.k,...t.a]),e.msgs.length>8&&e.msgs.shift())});function PT(){const t=c=>Ri.reduce((f,l,h)=>f+c.up[l.id]*4**h,0),e=m.teams.map(c=>[Math.round(c.points*10),c.tickets,c.caps,Math.floor(c.gold),c.alive?1:0,Math.max(0,Math.ceil(c.leaderDeadT)),t(c)].join(",")).join(";"),n=[];for(const c of m.units){if(c.dead)continue;const f=mp.indexOf(c.kind)*8+c.ti,l=(c.swing>0?1:0)|(c.mounted?2:0)|(c.blockT>0||c.human&&c.blocking?4:0)|(c.carrying?8:0)|(c.stun>0?16:0)|(c.aim?32:0)|(c.shieldwall?64:0)|(c.weapon==="spear"?128:c.weapon==="jav"?256:c.weapon==="sword"?512:0),h=[On(c.id),f.toString(16),Ii(c.x),Ii(c.z),Yu(c.face),On(Jt(c.hp/c.max,0,1)*35),On(l)];c.jy>.05&&h.push(On(c.jy*10)),n.push(h.join(","))}const i=m.arrows.filter(c=>!c.stuck&&!c.done).slice(-18).map(c=>[On(c.id),Ii(c.x0),Ii(c.z0),On(c.y0*10),Ii(c.x1),Ii(c.z1),On(c.y1*10+20),On(c.dur*100),On(c.peak*10),On(c.t*100),c.ti].join(",")),r=m.horses.filter(c=>c.state==="coming").map(c=>[Ii(c.x),Ii(c.z),Yu(c.face),c.ti].join(",")),s=m.flag,o=s?[s.state==="home"?0:s.state==="dropped"?1:2,Ii(s.x),Ii(s.z),s.carrier?On(s.carrier.id):""].join(","):"",a=m.teams.map((c,f)=>{if(!c.human||f===m.myTi)return"";const l=c.leader,h=l.kick;return h.dirty&&(h.n++,h.dirty=!1,h.lvx=h.vx,h.lvz=h.vz,h.lst=h.st,h.vx=0,h.vz=0,h.st=0),[f,On(l.id),l.dead?1:0,Math.round(l.horseHp),Math.ceil(l.horseCd),l.summon?1:0,h.n,To(h.lvx||0),To(h.lvz||0),ts(h.lst||0),Math.round(l.hp),l.javAmmo|0].join(",")}).filter(Boolean).join(";");return[Math.round(m.T*10),e,n.join(";"),i.join(";"),r.join(";"),o,a,m.bounty].join("|")}function LT(){performance.now()-(Fe.NET.lastSend||0)<80||el()}function el(){const t=Fe.NET;if(!t)return;t.lastSend=performance.now();const e={role:"host",ph:m.state==="end"?"end":"play",seed:m.seed,mode:m.mode,map:m.map.id,diff:m.diff,al:m.ALLY.join(""),duo:m.duo.map(i=>i?1:0).join(""),seats:t.seats,nick:Fe.myNick||"Host",fa:m.factions.map(i=>(uo[i]||uo.roman).code).join(""),cr:Array.from({length:8},(i,r)=>(m.crests&&m.crests[r])|0).join(""),n:++t.snapN,s:PT(),m:t.msgs};m.state==="end"&&m.endInfo&&(e.res=[m.endInfo.w,m.endInfo.why]);let n=JSON.stringify(e);for(;n.length>3900;){const i=e.s.split("|"),r=i[3].split(";");if(r.length&&r[0])r.shift(),i[3]=r.join(";"),e.s=i.join("|");else if(e.m.length)e.m=e.m.slice(1);else break;n=JSON.stringify(e)}t.lastSize=n.length,t.room.presence(e).catch(()=>{})}function IT(){const t=Fe.NET,e=t.room.peers(),n=new Set(e.map(i=>i.peer));for(const[i,r]of Object.entries(t.seats))if(r!==m.myTi&&!n.has(i)&&m.teams[r].human){m.teams[r].human=!1;const s=m.teams[r].leader;s&&(s.human=!1,s.remote=!1,s.dmg=mn.captain.dmg,s.spd=mn.captain.spd),delete t.seats[i],ct.emit("msg",{k:"left",a:[r]})}for(const i of e){if(i.sameTab)continue;const r=t.seats[i.peer];if(r===void 0)continue;const s=i.presence||{};if(s.seed!==m.seed||s.ph!=="play")continue;const o=m.teams[r],a=o.leader;if(!o.human)continue;const c=t.inp[r]||(t.inp[r]={atk:0,ride:0,vly:0,rec:[0,0,0],up:[0,0,0,0,0]});if(a&&!a.dead&&Array.isArray(s.cap)&&s.cap[0]===a.id){a.x=+s.cap[1],a.z=+s.cap[2],a.face=+s.cap[3],a.vx=+s.cap[4],a.vz=+s.cap[5],a.blocking=!!s.blk,a.jy=Math.max(0,+s.cap[6]||0);const f=js[s.cap[7]|0];f&&a.weapon!==f&&(a.weapon=f,o.weapon=f)}if(typeof s.atk=="number"&&s.atk>c.atk&&(a&&!a.dead&&(typeof s.face=="number"&&(a.face=s.face),rs(a)),c.atk=s.atk),typeof s.ride=="number"&&s.ride>c.ride&&(a&&Np(a),c.ride=s.ride),typeof s.vly=="number"&&s.vly>c.vly&&(Yp(r),c.vly=s.vly),Array.isArray(s.up))for(let f=0;f<Ri.length;f++)for(;(s.up[f]|0)>c.up[f];)c.up[f]++,Zf(r,Ri[f].id);if(s.ord&&s.ord!==o.order&&jo.includes(s.ord)&&(o.order=s.ord,s.ord==="hold")){const f=Array.isArray(s.hold)?s.hold:[a.x,a.z,a.face];o.holdPt={x:+f[0],z:+f[1],face:+f[2],isFront:!0}}if(Array.isArray(s.rec))for(let f=0;f<3;f++)for(;(s.rec[f]|0)>c.rec[f];)c.rec[f]++,Kf(r,gp[f])}}function DT(t){m.role="client",m.mode=t.mode,m.map=Bc[t.map],m.diff=t.diff,m.ALLY=t.al.split("").map(Number),m.seed=t.seed,m.factions=String(t.fa||"rrrr").split("").map(Tg),m.crests=String(t.cr||"").split("").map(i=>Math.min(7,+i||0)),m.duo=String(t.duo||"0000").split("").map(i=>i==="1"),m.layout=Xf(m.map.id,m.mode==="ctf",m.mode==="ctrl",m.seed),$f(m.layout),m.units=[],m.horses=[],m.arrows=[],m.T=0,m.kills=0,m.recruited=0,m.bounty=-1,m.endInfo=null,m.awarded=!1;const e=[0,0,0,0,0,0,0,0];Object.values(t.seats||{}).forEach(i=>e[i]=1);const n=[1,1,1,1,...m.duo.map(i=>i?1:0)];m.teams=Yf(e,n),m.flag=m.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,m.ctrlPoints=m.mode==="ctrl"?Gp(m.layout):null,Object.assign(q,{byId:new Map,lastN:-1,lastMsgN:t.m&&t.m.length?t.m[t.m.length-1][0]:0,meId:null,meInit:!1,kickN:0,localCd:0,lastSnapAt:performance.now(),inp:{atk:0,ride:0,vly:0,rec:[0,0,0],up:[0,0,0,0,0],ord:"follow",hold:null,face:0},sendAt:0,arrowIds:new Set,coming:[],leaving:[],horseKey:0,riderKeys:new Map,hudT:0}),m.player=null,ht.yaw=Math.atan2(-he[Te(m.myTi)].pos[0],-he[Te(m.myTi)].pos[1]),ht.pitch=Gm,m.state="play",ca.onMatchStart(),At.horn(),lo("start",[]),v0(t)}function kT(t,e,n,i,r){const s=e==="captain"&&m.teams[n].human,o={id:t,kind:e,ti:n,leader:e==="captain",human:s,x:i,z:r,y:vt(i,r),tx:i,tz:r,tface:0,face:0,vx:0,vz:0,vy:0,hp:mn[e].hp,max:mn[e].hp,r:mn[e].r,swing:0,stun:0,blockT:0,dead:!1,deadT:0,mounted:!1,carrying:!1,aim:!1,spd:s?6.3:mn[e].spd,horseHp:ua(n),horseCd:0,summon:!1,shieldwall:!1,blocking:!1,lastHit:-9,jy:0,jyT:0,jvy:0,jumpCd:0,weapon:s&&n===m.myTi?m.teams[n].weapon||"sword":void 0,javAmmo:wo.jav.ammo,javRegen:0,combo:0,lastSwingT:-9};return m.units.push(o),q.byId.set(t,o),o}function UT(t){if(!t.dead){if(t.dead=!0,t.deadT=0,t.vy=ie(3,6),t.fallDir=Math.random()<.5?1:-1,t.vx*=.5,t.vz*=.5,t.bigHitT&&performance.now()-t.bigHitT<500||Math.random()<.12){const e=Math.random()*Math.PI*2,n=ie(10,14);t.vx+=Math.sin(e)*n,t.vz+=Math.cos(e)*n,t.vy=ie(9,12),t.launch=!0,At.whee(t.x,t.z)}ct.emit("splat",{x:t.x,z:t.z,s:ie(1,1.5),ti:t.ti}),At.die(t.x,t.z),q.byId.delete(t.id)}}function v0(t){if(t.n===q.lastN)return;q.lastN=t.n,q.lastSnapAt=performance.now();const e=(t.s||"").split("|");if(e.length<8)return;const n=m.myTi;m.T=+e[0]/10,e[1].split(";").forEach((a,c)=>{const f=a.split(",").map(Number),l=m.teams[c];l&&(l.points=f[0]/10,l.tickets=f[1],l.caps=f[2],(c!==n||performance.now()-(q.goldLocalAt||0)>700)&&(l.gold=f[3]),l.alive=!!f[4],l.leaderDeadT=f[5],f.length>6&&(c!==n||performance.now()-(q.upLocalAt||0)>700)&&Ri.forEach((h,d)=>{l.up[h.id]=Math.floor(f[6]/4**d)%4}))}),m.bounty=+e[7];const i=e[6]?e[6].split(";").map(a=>a.split(",")).find(a=>+a[0]===n):null;let r=null;i&&(r=Fn(i[1]),q.meInfo={dead:+i[2],horseHp:+i[3],horseCd:+i[4],summon:+i[5],kn:+i[6],kvx:+i[7],kvz:+i[8],kst:+i[9],hp:+i[10],jav:i[11]===void 0?null:+i[11]});const s=new Set;if(e[2])for(const a of e[2].split(";")){const c=a.split(","),f=Fn(c[0]),l=parseInt(c[1],16),h=mp[l>>3],d=l&7,u=oi(c[2]),_=oi(c[3]),x=Ku(c[4]),g=Fn(c[5]),p=Fn(c[6]);s.add(f);let v=q.byId.get(f);v||(v=kT(f,h,d,u,_),v.face=x);const y=v.hp;if(v.hp=g/35*v.max,y-v.hp>v.max*.3&&(v.bigHitT=performance.now()),v.hp<y-.5&&f!==r)if(ct.emit("spark",{x:v.x,y:v.y+1.2,z:v.z,c:p&4?"#fff3b0":he[Te(v.ti)].css,n:5}),p&4)At.clang(v.x,v.z);else{At.hit(v.x,v.z);const b=m.player;b&&performance.now()-(q.lastAtkAt||0)<700&&Math.hypot(v.x-b.x,v.z-b.z)<5&&(ct.emit("hitstop",.05),ht.shake=Math.max(ht.shake,.15)),Math.random()<.35&&ct.emit("splat",{x:v.x+ie(-.4,.4),z:v.z+ie(-.4,.4),s:ie(.6,1.1),ti:v.ti})}p&1&&v.swing<=0&&f!==r&&(v.swing=.38,At.swing(v.x,v.z)),v.mounted=!!(p&2),v.carrying=!!(p&8),v.shieldwall=!!(p&64),f!==r&&(v.blockT=p&4?.2:0,v.stun=p&16?.1:0,v.aim=!!(p&32),h==="captain"&&(v.weapon=p&128?"spear":p&256?"jav":p&512?"sword":void 0),v.jyT=c[7]?Fn(c[7])/10:0),f!==r?(v.tx=u,v.tz=_,v.tface=x,Math.hypot(v.x-u,v.z-_)>8&&(v.x=u,v.z=_)):(!q.meInit||q.meId!==f)&&(v.x=u,v.z=_,v.face=x)}for(const a of[...q.byId.values()])s.has(a.id)||UT(a);if(r!=null&&q.byId.get(r)){const a=q.byId.get(r);q.meId!==r&&(q.meId=r,q.meInit=!0,m.player=a,ht.yaw=a.face,q.kickN=q.meInfo?q.meInfo.kn:0),m.player=a,a.horseHp=q.meInfo.horseHp,a.horseCd=q.meInfo.horseCd,a.summon=!!q.meInfo.summon,a.hp=q.meInfo.hp,q.meInfo.jav!=null&&performance.now()-(q.javLocalAt||0)>900&&(a.javAmmo=q.meInfo.jav),q.meInfo.kn!==q.kickN&&(q.kickN=q.meInfo.kn,a.vx+=q.meInfo.kvx,a.vz+=q.meInfo.kvz,a.stun=Math.max(a.stun,q.meInfo.kst),(q.meInfo.kvx||q.meInfo.kvz)&&(ht.shake=.35,eo(30),ct.emit("spark",{x:a.x,y:a.y+1.2,z:a.z,c:he[Te(a.ti)].css,n:5}),At.hit(a.x,a.z)))}if(m.player&&m.player.dead&&(m.player=null),e[3])for(const a of e[3].split(";")){const c=a.split(","),f=Fn(c[0]);if(q.arrowIds.has(f))continue;q.arrowIds.add(f);const l=nh({id:f,x0:oi(c[1]),z0:oi(c[2]),y0:Fn(c[3])/10,x1:oi(c[4]),z1:oi(c[5]),y1:(Fn(c[6])-20)/10,dur:Fn(c[7])/100,peak:Fn(c[8])/10,ti:+c[10],t:Fn(c[9])/100});m.arrows.push(l),At.bow(l.x0,l.z0)}q.arrowIds.size>400&&(q.arrowIds=new Set([...q.arrowIds].slice(-200)));const o=e[4]?e[4].split(";").map(a=>a.split(",")):[];if(q.coming.length=Math.min(q.coming.length,o.length),o.forEach((a,c)=>{let f=q.coming[c];f||(f={key:2e5+ ++q.horseKey,ti:+a[3],x:oi(a[0]),z:oi(a[1]),face:0,spd:14,state:"coming",t:0},q.coming.push(f)),f.tx=oi(a[0]),f.tz=oi(a[1]),f.face=Ku(a[2])}),m.flag&&e[5]){const a=e[5].split(","),c=m.flag;c.state=["home","dropped","carried"][+a[0]],c.x=oi(a[1]),c.z=oi(a[2]),c.carrier=a[3]&&q.byId.get(Fn(a[3]))||null,c.carrier&&(c.carrier.carrying=!0)}for(const a of t.m||[])a[0]>q.lastMsgN&&(q.lastMsgN=a[0],lo(a[1],a.slice(2)))}function NT(t){const e=Fe.NET,n=e.room.peers().find(s=>s.peer===e.hostPeer);if(n){e.hostGoneAt=0;const s=n.presence||{};if(s.ph==="lobby")return ca.onLobby(),!1;s.seed===m.seed&&(s.ph==="play"||s.ph==="end")&&v0(s),s.ph==="end"&&m.state==="play"&&Array.isArray(s.res)&&ct.emit("hostEnd",s.res)}else if(e.hostGoneAt||(e.hostGoneAt=performance.now()),performance.now()-e.hostGoneAt>1500)return ca.onAbort("The host left the battle."),!1;if(m.state!=="play"&&m.state!=="end")return!1;q.localCd-=t,qf();const i=m.player;if(i&&!i.dead&&m.state==="play"){i.stun-=t,Jp(i,d0(t),t);for(const s of m.units){if(s===i||s.dead)continue;const o=i.x-s.x,a=i.z-s.z,c=i.r+s.r;if(Math.abs(o)>c||Math.abs(a)>c)continue;const f=Math.hypot(o,a)||.01;f<c&&(i.x+=o/f*(c-f)*.7,i.z+=a/f*(c-f)*.7)}Kp(i,t,i.z),i.r=i.mounted?.95:mn.captain.r,lf(i,t),q.atkBuf>0&&(q.atkBuf-=t),(pt.attackHeld||q.atkBuf>0)&&q.localCd<=0&&qr.attack()}const r=Math.min(1,t*10);for(const s of m.units){if(s.dead){sh(s,t);continue}if(s===i)continue;const o=s.x,a=s.z;s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r,s.face=po(s.face,s.tface,t*12),s.vx=(s.x-o)/Math.max(t,.001),s.vz=(s.z-a)/Math.max(t,.001),s.jy+=((s.jyT||0)-s.jy)*Math.min(1,t*14),s.y=vt(s.x,s.z)+s.jy,s.swing>0&&(s.swing-=t)}i&&i.swing>0&&(i.swing-=t),m.units=m.units.filter(s=>!(s.dead&&s.deadT>12));for(const s of m.units){const o=q.riderKeys.get(s);s.mounted&&!s.dead&&!o&&q.riderKeys.set(s,1e5+ ++q.horseKey),(!s.mounted||s.dead)&&o&&(q.leaving.push({key:o,ti:s.ti,x:s.x,z:s.z,face:s.face,spd:10,state:"leaving",t:0}),q.riderKeys.delete(s))}for(const s of q.coming)s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r;for(const s of q.leaving)s.t+=t,s.x+=Math.sin(s.face)*10*t,s.z+=Math.cos(s.face)*10*t;if(q.leaving=q.leaving.filter(s=>s.t<3),Qp(t,!1),performance.now()-q.sendAt>66&&m.state==="play"){q.sendAt=performance.now();const s={role:"player",nick:Fe.myNick||"Captain",ph:"play",seed:m.seed,atk:q.inp.atk,ride:q.inp.ride,vly:q.inp.vly,rec:q.inp.rec,up:q.inp.up,ord:q.inp.ord,hold:q.inp.hold,face:q.inp.face,blk:pt.blockHeld?1:0};i&&!i.dead&&(s.cap=[i.id,ts(i.x),ts(i.z),ts(i.face),To(i.vx),To(i.vz),ts(i.jy||0),Math.max(0,js.indexOf(i.weapon||"sword"))]),e.room.presence(s).catch(()=>{})}return!0}function zT(){const t=[...q.coming,...q.leaving];for(const[e,n]of q.riderKeys)e.dead||t.push({key:n,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:Math.hypot(e.vx,e.vz),state:"ridden",t:0});return t}function OT(t){const e=wo;if(t.mounted){t.weapon==="jav"&&t.javAmmo>=1?(t.javAmmo--,q.javLocalAt=performance.now(),q.localCd=e.jav.cd):q.localCd=.8;return}if(jp(t)){q.localCd=e.leap.cd,t.jvy=Math.min(t.jvy,-9),t.vx+=Math.sin(t.face)*3,t.vz+=Math.cos(t.face)*3,t.swingKind=2;return}if(t.weapon==="jav"){if(t.javAmmo>=1){const r=qp(t);t.face=Math.atan2(r.x-t.x,r.z-t.z),t.javAmmo--,q.javLocalAt=performance.now(),q.localCd=e.jav.cd,t.swingKind=4;return}t.weapon="sword",m.teams[m.myTi].weapon="sword",cs(t.x,t.y+3.2,t.z,"Out of javelins","#fff"),ct.emit("hud")}const n=t.weapon==="spear",i=Vp(t,u_(t));if(i){const r=Math.atan2(i.x-t.x,i.z-t.z),s=Math.hypot(i.x-t.x,i.z-t.z);t.face=r,s>t.r+i.r+1.3+(n?e.spear.reachB:0)-.2&&(t.vx+=Math.sin(r)*4,t.vz+=Math.cos(r)*4)}if(n)q.localCd=e.spear.cd,t.swingKind=3,t.combo=0;else{const r=performance.now()/1e3-t.lastSwingT<e.sword.window?(t.combo+1)%3:0;t.combo=r,t.swingKind=r,q.localCd=r===2?e.sword.finisherCd:e.sword.cd}t.lastSwingT=performance.now()/1e3}const qr={attack(){const t=m.player;if(!(!t||t.dead||m.state!=="play")){if(t.carrying){zt("carryhint",1500)&&cs(t.x,t.y+3.2,t.z,"Hands full: carry it home","#fff");return}if(bi()){if(q.localCd>0||t.stun>0){q.atkBuf=.4;return}q.atkBuf=0,OT(t),t.swing=.38,At.swing(t.x,t.z),q.inp.atk++,q.inp.face=ts(t.face),q.lastAtkAt=performance.now();return}rs(t)}},jump(){const t=m.player;m.state!=="play"||!t||t.dead||Xp(t)},weapon(t){const e=m.player;if(m.state!=="play"||!e||e.dead)return;const n=p_(e,t);n&&(At.draw(),cs(e.x,e.y+3.2,e.z,n==="jav"?`Javelins ${e.javAmmo|0}`:yp[n],"#fff"),ct.emit("hud"))},ride(){const t=m.player;if(!(m.state!=="play"||!t||t.dead)){if(bi()){if(!t.mounted){if(t.carrying){lo("rideNo",[m.myTi,"banner"]);return}if(t.horseCd>0){lo("rideNo",[m.myTi,"rest",Math.ceil(t.horseCd)]);return}At.neigh()}q.inp.ride++;return}Np(t)}},volley(){const t=m.player;if(!(m.state!=="play"||!t||t.dead)){if(bi()){q.inp.vly++;return}Yp(m.myTi)}},order(t){const e=m.player;if(m.state!=="play"||!e||e.dead)return;const n=m.teams[m.myTi].order||"follow",i=jo.includes(t)?t:jo[(jo.indexOf(n)+1)%jo.length];i===n&&i!=="hold"||(bi()?(m.teams[m.myTi].order=i,q.inp.ord=i,i==="hold"&&(q.inp.hold=[To(e.x),To(e.z),ts(e.face)])):Yg(m.myTi,i),At.order(),ct.emit("shout",{u:e,kind:i}),ct.emit("hud"))},upgrade(t){if(m.state!=="play")return;const e=m.teams[m.myTi],n=ta(m.myTi,t),i=Ri.find(r=>r.id===t);if(i){if(n==null){pr(`${i.name} is maxed`,"Try another upgrade");return}if(e.gold<n){pr("Not enough gold",`${i.name} costs ${n} gold`,"#ffcf3a");return}bi()?(q.inp.up[Ri.indexOf(i)]++,e.gold-=n,e.up[t]++,q.goldLocalAt=q.upLocalAt=performance.now(),At.coin(),lo("upgrade",[m.myTi,t,e.up[t]])):Zf(m.myTi,t),ct.emit("hud")}},recruit(t){if(m.state!=="play")return;const e=mn[t],n=m.teams[m.myTi];if(!to(m.myTi)){pr("No recruits",m.mode==="dm"?"Your team is out of tickets":"You need a castle to recruit","#e0352b");return}if(Ao(m.myTi).length>=m.squadCap){pr("Squad full",`${m.squadCap} soldiers is the limit`);return}if(n.gold<e.cost){pr("Not enough gold",`A ${e.name.toLowerCase()} costs ${e.cost} gold`,"#ffcf3a");return}bi()?(q.inp.rec[gp.indexOf(t)]++,n.gold-=e.cost,q.goldLocalAt=performance.now(),m.recruited++,At.coin()):Kf(m.myTi,t);const i=m.player;i&&cs(i.x,i.y+3,i.z,`${e.name} on the way`,"#fff")}};class FT{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const n of this._parts)e.push(n);return BT(e).buffer}}function BT(t){let e=0;for(const r of t)e+=r.byteLength;const n=new Uint8Array(e);let i=0;for(const r of t){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);n.set(s,i),i+=r.byteLength}return n}function y0(t){return new HT(t).unpack()}function M0(t){const e=new GT,n=e.pack(t);return n instanceof Promise?n.then(()=>e.getBuffer()):e.getBuffer()}class HT{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let n;if((n=e^160)<=15)return this.unpack_raw(n);if((n=e^176)<=15)return this.unpack_string(n);if((n=e^144)<=15)return this.unpack_array(n);if((n=e^128)<=15)return this.unpack_map(n);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return n=this.unpack_uint16(),this.unpack_string(n);case 217:return n=this.unpack_uint32(),this.unpack_string(n);case 218:return n=this.unpack_uint16(),this.unpack_raw(n);case 219:return n=this.unpack_uint32(),this.unpack_raw(n);case 220:return n=this.unpack_uint16(),this.unpack_array(n);case 221:return n=this.unpack_uint32(),this.unpack_array(n);case 222:return n=this.unpack_uint16(),this.unpack_map(n);case 223:return n=this.unpack_uint32(),this.unpack_map(n)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),n=(e[0]&255)*256+(e[1]&255);return this.index+=2,n}unpack_uint32(){const e=this.read(4),n=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,n}unpack_uint64(){const e=this.read(8),n=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,n}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const n=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,n}unpack_string(e){const n=this.read(e);let i=0,r="",s,o;for(;i<e;)s=n[i],s<160?(o=s,i++):(s^192)<32?(o=(s&31)<<6|n[i+1]&63,i+=2):(s^224)<16?(o=(s&15)<<12|(n[i+1]&63)<<6|n[i+2]&63,i+=3):(o=(s&7)<<18|(n[i+1]&63)<<12|(n[i+2]&63)<<6|n[i+3]&63,i+=4),r+=String.fromCodePoint(o);return this.index+=e,r}unpack_array(e){const n=new Array(e);for(let i=0;i<e;i++)n[i]=this.unpack();return n}unpack_map(e){const n={};for(let i=0;i<e;i++){const r=this.unpack();n[r]=this.unpack()}return n}unpack_float(){const e=this.unpack_uint32(),n=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(n===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),n=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(r-20)+n*2**(r-52);return(i===0?1:-1)*o}read(e){const n=this.index;if(n+e<=this.length)return this.dataView.subarray(n,n+e);throw new Error("BinaryPackFailure: read index out of range")}}class GT{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const n=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(n==Object||n.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${n.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const n=e.length;if(n<=15)this.pack_uint8(160+n);else if(n<=65535)this._bufferBuilder.append(218),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const n=this._textEncoder.encode(e),i=n.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(n)}pack_array(e){const n=e.length;if(n<=15)this.pack_uint8(144+n);else if(n<=65535)this._bufferBuilder.append(220),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(n);else throw new Error("Invalid length");const i=r=>{if(r<n){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let n=0;e<0&&(n=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),o=2**32,a=n<<31|i+1023<<20|s/o&1048575,c=s%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){const n=Object.keys(e),i=n.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<n.length){const o=n[s];if(e.hasOwnProperty(o)){this.pack(o);const a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const n=e&4294967295;this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_uint64(e){const n=e/4294967296,i=e%2**32;this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const n=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new FT,this._textEncoder=new TextEncoder}}let b0=!0,S0=!0;function $o(t,e,n){const i=t.match(e);return i&&i.length>=n&&parseFloat(i[n],10)}function _s(t,e,n){if(!t.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Eh("Unable to polyfill events");return}const r=t.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(a,c){if(a!==e)return s.apply(this,arguments);const f=l=>{const h=n(l);h&&(c.handleEvent?c.handleEvent(h):c(h))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,f),s.apply(this,[a,f])};const o=r.removeEventListener;r.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);const f=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,f])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function VT(t){return typeof t!="boolean"?new Error("Argument type: "+typeof t+". Please use a boolean."):(b0=t,t?"adapter.js logging disabled":"adapter.js logging enabled")}function WT(t){return typeof t!="boolean"?new Error("Argument type: "+typeof t+". Please use a boolean."):(S0=!t,"adapter.js deprecation warnings "+(t?"disabled":"enabled"))}function Eh(){if(typeof window=="object"){if(b0)return;typeof console!="undefined"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function wh(t,e){S0&&console.warn(t+" is deprecated, please use "+e+" instead.")}function jT(t){const e={browser:null,version:null};if(typeof t=="undefined"||!t.navigator||!t.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:n}=t;if(n.userAgentData&&n.userAgentData.brands){const i=n.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(n.mozGetUserMedia)e.browser="firefox",e.version=parseInt($o(n.userAgent,/Firefox\/(\d+)\./,1));else if(n.webkitGetUserMedia||t.isSecureContext===!1&&t.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt($o(n.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(t.RTCPeerConnection&&n.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt($o(n.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=t.RTCRtpTransceiver&&"currentDirection"in t.RTCRtpTransceiver.prototype,e._safariVersion=$o(n.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function Ju(t){return Object.prototype.toString.call(t)==="[object Object]"}function T0(t){return Ju(t)?Object.keys(t).reduce(function(e,n){const i=Ju(t[n]),r=i?T0(t[n]):t[n],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[n]:r})},{}):t}function Lf(t,e,n){!e||n.has(e.id)||(n.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Lf(t,t.get(e[i]),n):i.endsWith("Ids")&&e[i].forEach(r=>{Lf(t,t.get(r),n)})}))}function Zu(t,e,n){const i=n?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return t.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&s.push(o)}),s.forEach(o=>{t.forEach(a=>{a.type===i&&a.trackId===o.id&&Lf(t,a,r)})}),r}const Qu=Eh;function E0(t,e){if(e.version>=64)return;const n=t&&t.navigator;if(!n.mediaDevices)return;const i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(f=>{if(f==="require"||f==="advanced"||f==="mediaSource")return;const l=typeof a[f]=="object"?a[f]:{ideal:a[f]};l.exact!==void 0&&typeof l.exact=="number"&&(l.min=l.max=l.exact);const h=function(d,u){return d?d+u.charAt(0).toUpperCase()+u.slice(1):u==="deviceId"?"sourceId":u};if(l.ideal!==void 0){c.optional=c.optional||[];let d={};typeof l.ideal=="number"?(d[h("min",f)]=l.ideal,c.optional.push(d),d={},d[h("max",f)]=l.ideal,c.optional.push(d)):(d[h("",f)]=l.ideal,c.optional.push(d))}l.exact!==void 0&&typeof l.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[h("",f)]=l.exact):["min","max"].forEach(d=>{l[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[h(d,f)]=l[d])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},r=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const f=function(l,h,d){h in l&&!(d in l)&&(l[d]=l[h],delete l[h])};a=JSON.parse(JSON.stringify(a)),f(a.audio,"autoGainControl","googAutoGainControl"),f(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let f=a.video.facingMode;f=f&&(typeof f=="object"?f:{ideal:f});const l=e.version<66;if(f&&(f.exact==="user"||f.exact==="environment"||f.ideal==="user"||f.ideal==="environment")&&!(n.mediaDevices.getSupportedConstraints&&n.mediaDevices.getSupportedConstraints().facingMode&&!l)){delete a.video.facingMode;let h;if(f.exact==="environment"||f.ideal==="environment"?h=["back","rear"]:(f.exact==="user"||f.ideal==="user")&&(h=["front"]),h)return n.mediaDevices.enumerateDevices().then(d=>{d=d.filter(_=>_.kind==="videoinput");let u=d.find(_=>h.some(x=>_.label.toLowerCase().includes(x)));return!u&&d.length&&h.includes("back")&&(u=d[d.length-1]),u&&(a.video.deviceId=f.exact?{exact:u.deviceId}:{ideal:u.deviceId}),a.video=i(a.video),Qu("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return Qu("chrome: "+JSON.stringify(a)),c(a)},s=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,f){r(a,l=>{n.webkitGetUserMedia(l,c,h=>{f&&f(s(h))})})};if(n.getUserMedia=o.bind(n),n.mediaDevices.getUserMedia){const a=n.mediaDevices.getUserMedia.bind(n.mediaDevices);n.mediaDevices.getUserMedia=function(c){return r(c,f=>a(f).then(l=>{if(f.audio&&!l.getAudioTracks().length||f.video&&!l.getVideoTracks().length)throw l.getTracks().forEach(h=>{h.stop()}),new DOMException("","NotFoundError");return l},l=>Promise.reject(s(l))))}}}function w0(t){t.MediaStream=t.MediaStream||t.webkitMediaStream}function A0(t,e){if(!(e.version>102))if(typeof t=="object"&&t.RTCPeerConnection&&!("ontrack"in t.RTCPeerConnection.prototype)){Object.defineProperty(t.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const n=t.RTCPeerConnection.prototype.setRemoteDescription;t.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let o;t.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):o={track:s.track};const a=new Event("track");a.track=s.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)}),r.stream.getTracks().forEach(s=>{let o;t.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===s.id):o={track:s};const a=new Event("track");a.track=s,a.receiver=o,a.transceiver={receiver:o},a.streams=[r.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),n.apply(this,arguments)}}else _s(t,"track",n=>(n.transceiver||Object.defineProperty(n,"transceiver",{value:{receiver:n.receiver}}),n))}function C0(t){if(typeof t=="object"&&t.RTCPeerConnection&&!("getSenders"in t.RTCPeerConnection.prototype)&&"createDTMFSender"in t.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!t.RTCPeerConnection.prototype.getSenders){t.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=t.RTCPeerConnection.prototype.addTrack;t.RTCPeerConnection.prototype.addTrack=function(a,c){let f=r.apply(this,arguments);return f||(f=e(this,a),this._senders.push(f)),f};const s=t.RTCPeerConnection.prototype.removeTrack;t.RTCPeerConnection.prototype.removeTrack=function(a){s.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const n=t.RTCPeerConnection.prototype.addStream;t.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],n.apply(this,[s]),s.getTracks().forEach(o=>{this._senders.push(e(this,o))})};const i=t.RTCPeerConnection.prototype.removeStream;t.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof t=="object"&&t.RTCPeerConnection&&"getSenders"in t.RTCPeerConnection.prototype&&"createDTMFSender"in t.RTCPeerConnection.prototype&&t.RTCRtpSender&&!("dtmf"in t.RTCRtpSender.prototype)){const e=t.RTCPeerConnection.prototype.getSenders;t.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(t.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function R0(t,e){if(e.version>=67||!(typeof t=="object"&&t.RTCPeerConnection&&t.RTCRtpSender&&t.RTCRtpReceiver))return;if(!("getStats"in t.RTCRtpSender.prototype)){const i=t.RTCPeerConnection.prototype.getSenders;i&&(t.RTCPeerConnection.prototype.getSenders=function(){const o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});const r=t.RTCPeerConnection.prototype.addTrack;r&&(t.RTCPeerConnection.prototype.addTrack=function(){const o=r.apply(this,arguments);return o._pc=this,o}),t.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>Zu(a,o.track,!0))}}if(!("getStats"in t.RTCRtpReceiver.prototype)){const i=t.RTCPeerConnection.prototype.getReceivers;i&&(t.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(o=>o._pc=this),s}),_s(t,"track",r=>(r.receiver._pc=r.srcElement,r)),t.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(o=>Zu(o,s.track,!1))}}if(!("getStats"in t.RTCRtpSender.prototype&&"getStats"in t.RTCRtpReceiver.prototype))return;const n=t.RTCPeerConnection.prototype.getStats;t.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof t.MediaStreamTrack){const r=arguments[0];let s,o,a;return this.getSenders().forEach(c=>{c.track===r&&(s?a=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(o?a=!0:o=c),c.track===r)),a||s&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return n.apply(this,arguments)}}function P0(t){t.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const e=t.RTCPeerConnection.prototype.addTrack;t.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const n=t.RTCPeerConnection.prototype.addStream;t.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(f=>{if(this.getSenders().find(h=>h.track===f))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();n.apply(this,arguments);const c=this.getSenders().filter(f=>a.indexOf(f)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const i=t.RTCPeerConnection.prototype.removeStream;t.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};const r=t.RTCPeerConnection.prototype.removeTrack;t.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),r.apply(this,arguments)}}function L0(t,e){if(!t.RTCPeerConnection)return;if(t.RTCPeerConnection.prototype.addTrack&&e.version>=65)return P0(t);const n=t.RTCPeerConnection.prototype.getLocalStreams;t.RTCPeerConnection.prototype.getLocalStreams=function(){const l=n.apply(this);return this._reverseStreams=this._reverseStreams||{},l.map(h=>this._reverseStreams[h.id])};const i=t.RTCPeerConnection.prototype.addStream;t.RTCPeerConnection.prototype.addStream=function(l){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},l.getTracks().forEach(h=>{if(this.getSenders().find(u=>u.track===h))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[l.id]){const h=new t.MediaStream(l.getTracks());this._streams[l.id]=h,this._reverseStreams[h.id]=l,l=h}i.apply(this,[l])};const r=t.RTCPeerConnection.prototype.removeStream;t.RTCPeerConnection.prototype.removeStream=function(l){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[l.id]||l]),delete this._reverseStreams[this._streams[l.id]?this._streams[l.id].id:l.id],delete this._streams[l.id]},t.RTCPeerConnection.prototype.addTrack=function(l,h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(x=>x===l))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(x=>x.track===l))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const _=this._streams[h.id];if(_)_.addTrack(l),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const x=new t.MediaStream([l]);this._streams[h.id]=x,this._reverseStreams[x.id]=h,this.addStream(x)}return this.getSenders().find(x=>x.track===l)};function s(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const u=f._reverseStreams[d],_=f._streams[u.id];h=h.replace(new RegExp(_.id,"g"),u.id)}),new RTCSessionDescription({type:l.type,sdp:h})}function o(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const u=f._reverseStreams[d],_=f._streams[u.id];h=h.replace(new RegExp(u.id,"g"),_.id)}),new RTCSessionDescription({type:l.type,sdp:h})}["createOffer","createAnswer"].forEach(function(f){const l=t.RTCPeerConnection.prototype[f],h={[f](){const d=arguments;return arguments.length&&typeof arguments[0]=="function"?l.apply(this,[_=>{const x=s(this,_);d[0].apply(null,[x])},_=>{d[1]&&d[1].apply(null,_)},arguments[2]]):l.apply(this,arguments).then(_=>s(this,_))}};t.RTCPeerConnection.prototype[f]=h[f]});const a=t.RTCPeerConnection.prototype.setLocalDescription;t.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(t.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(t.RTCPeerConnection.prototype,"localDescription",{get(){const f=c.get.apply(this);return f.type===""?f:s(this,f)}}),t.RTCPeerConnection.prototype.removeTrack=function(l){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!l._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(l._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(u=>{this._streams[u].getTracks().find(x=>l.track===x)&&(d=this._streams[u])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(l.track),this.dispatchEvent(new Event("negotiationneeded")))}}function If(t,e){!t.RTCPeerConnection&&t.webkitRTCPeerConnection&&(t.RTCPeerConnection=t.webkitRTCPeerConnection),t.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(n){const i=t.RTCPeerConnection.prototype[n],r={[n](){return arguments[0]=new(n==="addIceCandidate"?t.RTCIceCandidate:t.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};t.RTCPeerConnection.prototype[n]=r[n]})}function I0(t,e){e.version>102||_s(t,"negotiationneeded",n=>{const i=n.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return n})}const ep=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:I0,shimAddTrackRemoveTrack:L0,shimAddTrackRemoveTrackWithNative:P0,shimGetSendersWithDtmf:C0,shimGetUserMedia:E0,shimMediaStream:w0,shimOnTrack:A0,shimPeerConnection:If,shimSenderReceiverGetStats:R0},Symbol.toStringTag,{value:"Module"}));function D0(t,e){const n=t&&t.navigator;if(!n.mediaDevices)return;const i=t&&t.MediaStreamTrack;if(n.getUserMedia=function(r,s,o){wh("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),n.mediaDevices.getUserMedia(r).then(s,o)},!(e.version>55&&"autoGainControl"in n.mediaDevices.getSupportedConstraints())){const r=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},s=n.mediaDevices.getUserMedia.bind(n.mediaDevices);if(n.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o.audio,"autoGainControl","mozAutoGainControl"),r(o.audio,"noiseSuppression","mozNoiseSuppression")),s(o)},i&&i.prototype.getSettings){const o=i.prototype.getSettings;i.prototype.getSettings=function(){const a=o.apply(this,arguments);return r(a,"mozAutoGainControl","autoGainControl"),r(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){const o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a,"autoGainControl","mozAutoGainControl"),r(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function XT(t,e){t.navigator.mediaDevices&&(t.navigator.mediaDevices&&"getDisplayMedia"in t.navigator.mediaDevices||(t.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,t.navigator.mediaDevices.getUserMedia(i)}))}function k0(t){typeof t=="object"&&t.RTCTrackEvent&&"receiver"in t.RTCTrackEvent.prototype&&!("transceiver"in t.RTCTrackEvent.prototype)&&Object.defineProperty(t.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Df(t,e){typeof t!="object"||!(t.RTCPeerConnection||t.mozRTCPeerConnection)||(!t.RTCPeerConnection&&t.mozRTCPeerConnection&&(t.RTCPeerConnection=t.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(n){const i=t.RTCPeerConnection.prototype[n],r={[n](){return arguments[0]=new(n==="addIceCandidate"?t.RTCIceCandidate:t.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};t.RTCPeerConnection.prototype[n]=r[n]}))}function U0(t,e){if(typeof t!="object"||!(t.RTCPeerConnection||t.mozRTCPeerConnection)||e.version>=151)return;const n={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=t.RTCPeerConnection.prototype.getStats;t.RTCPeerConnection.prototype.getStats=function(){const[s,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(f=>{f.type=n[f.type]||f.type})}catch(f){if(f.name!=="TypeError")throw f;c.forEach((l,h)=>{c.set(h,Object.assign({},l,{type:n[l.type]||l.type}))})}return c}).then(o,a)}}function N0(t){if(!(typeof t=="object"&&t.RTCPeerConnection&&t.RTCRtpSender)||t.RTCRtpSender&&"getStats"in t.RTCRtpSender.prototype)return;const e=t.RTCPeerConnection.prototype.getSenders;e&&(t.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const n=t.RTCPeerConnection.prototype.addTrack;n&&(t.RTCPeerConnection.prototype.addTrack=function(){const r=n.apply(this,arguments);return r._pc=this,r}),t.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function z0(t){if(!(typeof t=="object"&&t.RTCPeerConnection&&t.RTCRtpSender)||t.RTCRtpSender&&"getStats"in t.RTCRtpReceiver.prototype)return;const e=t.RTCPeerConnection.prototype.getReceivers;e&&(t.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),_s(t,"track",n=>(n.receiver._pc=n.srcElement,n)),t.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function O0(t){!t.RTCPeerConnection||"removeStream"in t.RTCPeerConnection.prototype||(t.RTCPeerConnection.prototype.removeStream=function(n){wh("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&n.getTracks().includes(i.track)&&this.removeTrack(i)})})}function F0(t){t.DataChannel&&!t.RTCDataChannel&&(t.RTCDataChannel=t.DataChannel)}function B0(t,e){if(!(typeof t=="object"&&t.RTCPeerConnection)||e.version>=110)return;const n=t.RTCPeerConnection.prototype.addTransceiver;n&&(t.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const o=n.apply(this,arguments);if(s){const{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,a.sendEncodings=r,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function H0(t,e){if(!(typeof t=="object"&&t.RTCRtpSender)||e.version>=110)return;const n=t.RTCRtpSender.prototype.getParameters;n&&(t.RTCRtpSender.prototype.getParameters=function(){const r=n.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function G0(t,e){if(!(typeof t=="object"&&t.RTCPeerConnection)||e.version>=110)return;const n=t.RTCPeerConnection.prototype.createOffer;t.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>n.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):n.apply(this,arguments)}}function V0(t,e){if(!(typeof t=="object"&&t.RTCPeerConnection)||e.version>=110)return;const n=t.RTCPeerConnection.prototype.createAnswer;t.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>n.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):n.apply(this,arguments)}}const tp=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:B0,shimCreateAnswer:V0,shimCreateOffer:G0,shimGetDisplayMedia:XT,shimGetParameters:H0,shimGetStats:U0,shimGetUserMedia:D0,shimOnTrack:k0,shimPeerConnection:Df,shimRTCDataChannel:F0,shimReceiverGetStats:z0,shimRemoveStream:O0,shimSenderGetStats:N0},Symbol.toStringTag,{value:"Module"}));function W0(t){if(!(typeof t!="object"||!t.RTCPeerConnection)){if("getLocalStreams"in t.RTCPeerConnection.prototype||(t.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in t.RTCPeerConnection.prototype)){const e=t.RTCPeerConnection.prototype.addTrack;t.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},t.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in t.RTCPeerConnection.prototype||(t.RTCPeerConnection.prototype.removeStream=function(n){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(n);if(i===-1)return;this._localStreams.splice(i,1);const r=n.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function j0(t){if(!(typeof t!="object"||!t.RTCPeerConnection)&&("getRemoteStreams"in t.RTCPeerConnection.prototype||(t.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in t.RTCPeerConnection.prototype))){Object.defineProperty(t.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(n){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=n),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=t.RTCPeerConnection.prototype.setRemoteDescription;t.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const o=new Event("addstream");o.stream=s,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function X0(t){if(typeof t!="object"||!t.RTCPeerConnection)return;const e=t.RTCPeerConnection.prototype,n=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=n.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d},e.createAnswer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d};let a=function(c,f,l){const h=r.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h};e.setLocalDescription=a,a=function(c,f,l){const h=s.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.setRemoteDescription=a,a=function(c,f,l){const h=o.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.addIceCandidate=a}function $0(t){const e=t&&t.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const n=e.mediaDevices,i=n.getUserMedia.bind(n);e.mediaDevices.getUserMedia=r=>i(q0(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}.bind(e))}function q0(t){return t&&t.video!==void 0?Object.assign({},t,{video:T0(t.video)}):t}function Y0(t){if(!t.RTCPeerConnection)return;const e=t.RTCPeerConnection;t.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(wh("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,s.push(a)):s.push(i.iceServers[o])}i.iceServers=s}return new e(i,r)},t.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(t.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function K0(t){typeof t=="object"&&t.RTCTrackEvent&&"receiver"in t.RTCTrackEvent.prototype&&!("transceiver"in t.RTCTrackEvent.prototype)&&Object.defineProperty(t.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function J0(t){const e=t.RTCPeerConnection.prototype.createOffer;t.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio!="undefined"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo!="undefined"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function Z0(t){typeof t!="object"||t.AudioContext||(t.AudioContext=t.webkitAudioContext)}const np=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:Z0,shimCallbacksAPI:X0,shimConstraints:q0,shimCreateOfferLegacy:J0,shimGetUserMedia:$0,shimLocalStreamsAPI:W0,shimRTCIceServerUrls:Y0,shimRemoteStreamsAPI:j0,shimTrackEventTransceiver:K0},Symbol.toStringTag,{value:"Module"}));function $T(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Q0={exports:{}};(function(t){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(n){return n.trim().split(`
`).map(i=>i.trim())},e.splitSections=function(n){return n.split(`
m=`).map((r,s)=>(s>0?"m="+r:r).trim()+`\r
`)},e.getDescription=function(n){const i=e.splitSections(n);return i&&i[0]},e.getMediaSections=function(n){const i=e.splitSections(n);return i.shift(),i},e.matchPrefix=function(n,i){return e.splitLines(n).filter(r=>r.indexOf(i)===0)},e.parseCandidate=function(n){let i;n.indexOf("a=candidate:")===0?i=n.substring(12).split(" "):i=n.substring(10).split(" ");const r={foundation:i[0],component:{1:"rtp",2:"rtcp"}[i[1]]||i[1],protocol:i[2].toLowerCase(),priority:parseInt(i[3],10),ip:i[4],address:i[4],port:parseInt(i[5],10),type:i[7]};for(let s=8;s<i.length;s+=2)switch(i[s]){case"raddr":r.relatedAddress=i[s+1];break;case"rport":r.relatedPort=parseInt(i[s+1],10);break;case"tcptype":r.tcpType=i[s+1];break;case"ufrag":r.ufrag=i[s+1],r.usernameFragment=i[s+1];break;default:r[i[s]]===void 0&&(r[i[s]]=i[s+1]);break}return r},e.writeCandidate=function(n){const i=[];i.push(n.foundation);const r=n.component;r==="rtp"?i.push(1):r==="rtcp"?i.push(2):i.push(r),i.push(n.protocol.toUpperCase()),i.push(n.priority),i.push(n.address||n.ip),i.push(n.port);const s=n.type;return i.push("typ"),i.push(s),s!=="host"&&n.relatedAddress&&n.relatedPort!==void 0&&(i.push("raddr"),i.push(n.relatedAddress),i.push("rport"),i.push(n.relatedPort)),n.tcpType&&n.protocol.toLowerCase()==="tcp"&&(i.push("tcptype"),i.push(n.tcpType)),(n.usernameFragment||n.ufrag)&&(i.push("ufrag"),i.push(n.usernameFragment||n.ufrag)),"candidate:"+i.join(" ")},e.parseIceOptions=function(n){return n.substring(14).split(" ")},e.parseRtpMap=function(n){let i=n.substring(9).split(" ");const r={payloadType:parseInt(i.shift(),10)};return i=i[0].split("/"),r.name=i[0],r.clockRate=parseInt(i[1],10),r.channels=i.length===3?parseInt(i[2],10):1,r.numChannels=r.channels,r},e.writeRtpMap=function(n){let i=n.payloadType;n.preferredPayloadType!==void 0&&(i=n.preferredPayloadType);const r=n.channels||n.numChannels||1;return"a=rtpmap:"+i+" "+n.name+"/"+n.clockRate+(r!==1?"/"+r:"")+`\r
`},e.parseExtmap=function(n){const i=n.substring(9).split(" ");return{id:parseInt(i[0],10),direction:i[0].indexOf("/")>0?i[0].split("/")[1]:"sendrecv",uri:i[1],attributes:i.slice(2).join(" ")}},e.writeExtmap=function(n){return"a=extmap:"+(n.id||n.preferredId)+(n.direction&&n.direction!=="sendrecv"?"/"+n.direction:"")+" "+n.uri+(n.attributes?" "+n.attributes:"")+`\r
`},e.parseFmtp=function(n){const i={};let r;const s=n.substring(n.indexOf(" ")+1).split(";");for(let o=0;o<s.length;o++)r=s[o].trim().split("="),i[r[0].trim()]=r[1];return i},e.writeFmtp=function(n){let i="",r=n.payloadType;if(n.preferredPayloadType!==void 0&&(r=n.preferredPayloadType),n.parameters&&Object.keys(n.parameters).length){const s=[];Object.keys(n.parameters).forEach(o=>{n.parameters[o]!==void 0?s.push(o+"="+n.parameters[o]):s.push(o)}),i+="a=fmtp:"+r+" "+s.join(";")+`\r
`}return i},e.parseRtcpFb=function(n){const i=n.substring(n.indexOf(" ")+1).split(" ");return{type:i.shift(),parameter:i.join(" ")}},e.writeRtcpFb=function(n){let i="",r=n.payloadType;return n.preferredPayloadType!==void 0&&(r=n.preferredPayloadType),n.rtcpFeedback&&n.rtcpFeedback.length&&n.rtcpFeedback.forEach(s=>{i+="a=rtcp-fb:"+r+" "+s.type+(s.parameter&&s.parameter.length?" "+s.parameter:"")+`\r
`}),i},e.parseSsrcMedia=function(n){const i=n.indexOf(" "),r={ssrc:parseInt(n.substring(7,i),10)},s=n.indexOf(":",i);return s>-1?(r.attribute=n.substring(i+1,s),r.value=n.substring(s+1)):r.attribute=n.substring(i+1),r},e.parseSsrcGroup=function(n){const i=n.substring(13).split(" ");return{semantics:i.shift(),ssrcs:i.map(r=>parseInt(r,10))}},e.getMid=function(n){const i=e.matchPrefix(n,"a=mid:")[0];if(i)return i.substring(6)},e.parseFingerprint=function(n){const i=n.substring(14).split(" ");return{algorithm:i[0].toLowerCase(),value:i[1].toUpperCase()}},e.getDtlsParameters=function(n,i){return{role:"auto",fingerprints:e.matchPrefix(n+i,"a=fingerprint:").map(e.parseFingerprint)}},e.writeDtlsParameters=function(n,i){let r="a=setup:"+i+`\r
`;return n.fingerprints.forEach(s=>{r+="a=fingerprint:"+s.algorithm+" "+s.value+`\r
`}),r},e.parseCryptoLine=function(n){const i=n.substring(9).split(" ");return{tag:parseInt(i[0],10),cryptoSuite:i[1],keyParams:i[2],sessionParams:i.slice(3)}},e.writeCryptoLine=function(n){return"a=crypto:"+n.tag+" "+n.cryptoSuite+" "+(typeof n.keyParams=="object"?e.writeCryptoKeyParams(n.keyParams):n.keyParams)+(n.sessionParams?" "+n.sessionParams.join(" "):"")+`\r
`},e.parseCryptoKeyParams=function(n){if(n.indexOf("inline:")!==0)return null;const i=n.substring(7).split("|");return{keyMethod:"inline",keySalt:i[0],lifeTime:i[1],mkiValue:i[2]?i[2].split(":")[0]:void 0,mkiLength:i[2]?i[2].split(":")[1]:void 0}},e.writeCryptoKeyParams=function(n){return n.keyMethod+":"+n.keySalt+(n.lifeTime?"|"+n.lifeTime:"")+(n.mkiValue&&n.mkiLength?"|"+n.mkiValue+":"+n.mkiLength:"")},e.getCryptoParameters=function(n,i){return e.matchPrefix(n+i,"a=crypto:").map(e.parseCryptoLine)},e.getIceParameters=function(n,i){const r=e.matchPrefix(n+i,"a=ice-ufrag:")[0],s=e.matchPrefix(n+i,"a=ice-pwd:")[0];return r&&s?{usernameFragment:r.substring(12),password:s.substring(10)}:null},e.writeIceParameters=function(n){let i="a=ice-ufrag:"+n.usernameFragment+`\r
a=ice-pwd:`+n.password+`\r
`;return n.iceLite&&(i+=`a=ice-lite\r
`),i},e.parseRtpParameters=function(n){const i={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},s=e.splitLines(n)[0].split(" ");i.profile=s[2];for(let a=3;a<s.length;a++){const c=s[a],f=e.matchPrefix(n,"a=rtpmap:"+c+" ")[0];if(f){const l=e.parseRtpMap(f),h=e.matchPrefix(n,"a=fmtp:"+c+" ");switch(l.parameters=h.length?e.parseFmtp(h[0]):{},l.rtcpFeedback=e.matchPrefix(n,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),i.codecs.push(l),l.name.toUpperCase()){case"RED":case"ULPFEC":i.fecMechanisms.push(l.name.toUpperCase());break}}}e.matchPrefix(n,"a=extmap:").forEach(a=>{i.headerExtensions.push(e.parseExtmap(a))});const o=e.matchPrefix(n,"a=rtcp-fb:* ").map(e.parseRtcpFb);return i.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(l=>l.type===c.type&&l.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),i},e.writeRtpDescription=function(n,i){let r="";r+="m="+n+" ",r+=i.codecs.length>0?"9":"0",r+=" "+(i.profile||"UDP/TLS/RTP/SAVPF")+" ",r+=i.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,r+=`c=IN IP4 0.0.0.0\r
`,r+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,i.codecs.forEach(o=>{r+=e.writeRtpMap(o),r+=e.writeFmtp(o),r+=e.writeRtcpFb(o)});let s=0;return i.codecs.forEach(o=>{o.maxptime>s&&(s=o.maxptime)}),s>0&&(r+="a=maxptime:"+s+`\r
`),i.headerExtensions&&i.headerExtensions.forEach(o=>{r+=e.writeExtmap(o)}),r},e.parseRtpEncodingParameters=function(n){const i=[],r=e.parseRtpParameters(n),s=r.fecMechanisms.indexOf("RED")!==-1,o=r.fecMechanisms.indexOf("ULPFEC")!==-1,a=e.matchPrefix(n,"a=ssrc:").map(d=>e.parseSsrcMedia(d)).filter(d=>d.attribute==="cname"),c=a.length>0&&a[0].ssrc;let f;const l=e.matchPrefix(n,"a=ssrc-group:FID").map(d=>d.substring(17).split(" ").map(_=>parseInt(_,10)));l.length>0&&l[0].length>1&&l[0][0]===c&&(f=l[0][1]),r.codecs.forEach(d=>{if(d.name.toUpperCase()==="RTX"&&d.parameters.apt){let u={ssrc:c,codecPayloadType:parseInt(d.parameters.apt,10)};c&&f&&(u.rtx={ssrc:f}),i.push(u),s&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},i.push(u))}}),i.length===0&&c&&i.push({ssrc:c});let h=e.matchPrefix(n,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-50*40*8:h=void 0,i.forEach(d=>{d.maxBitrate=h})),i},e.parseRtcpParameters=function(n){const i={},r=e.matchPrefix(n,"a=ssrc:").map(a=>e.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(n,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const o=e.matchPrefix(n,"a=rtcp-mux");return i.mux=o.length>0,i},e.writeRtcpParameters=function(n){let i="";return n.reducedSize&&(i+=`a=rtcp-rsize\r
`),n.mux&&(i+=`a=rtcp-mux\r
`),n.ssrc!==void 0&&n.cname&&(i+="a=ssrc:"+n.ssrc+" cname:"+n.cname+`\r
`),i},e.parseMsid=function(n){let i;const r=e.matchPrefix(n,"a=msid:");if(r.length===1)return i=r[0].substring(7).split(" "),{stream:i[0],track:i[1]};const s=e.matchPrefix(n,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(s.length>0)return i=s[0].value.split(" "),{stream:i[0],track:i[1]}},e.parseSctpDescription=function(n){const i=e.parseMLine(n),r=e.matchPrefix(n,"a=max-message-size:");let s;r.length>0&&(s=parseInt(r[0].substring(19),10)),isNaN(s)&&(s=65536);const o=e.matchPrefix(n,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:i.fmt,maxMessageSize:s};const a=e.matchPrefix(n,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:s}}},e.writeSctpDescription=function(n,i){let r=[];return n.protocol!=="DTLS/SCTP"?r=["m="+n.kind+" 9 "+n.protocol+" "+i.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+i.port+`\r
`]:r=["m="+n.kind+" 9 "+n.protocol+" "+i.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+i.port+" "+i.protocol+` 65535\r
`],i.maxMessageSize!==void 0&&r.push("a=max-message-size:"+i.maxMessageSize+`\r
`),r.join("")},e.generateSessionId=function(){return Math.random().toString().substr(2,22)},e.writeSessionBoilerplate=function(n,i,r){let s;const o=i!==void 0?i:2;return n?s=n:s=e.generateSessionId(),`v=0\r
o=`+(r||"thisisadapterortc")+" "+s+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},e.getDirection=function(n,i){const r=e.splitLines(n);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(n){return e.splitLines(n)[0].split(" ")[0].substring(2)},e.isRejected=function(n){return n.split(" ",2)[1]==="0"},e.parseMLine=function(n){const r=e.splitLines(n)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(n){const r=e.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;const i=e.splitLines(n);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},t.exports=e})(Q0);var eg=Q0.exports;const ho=$T(eg),qT=Sg({__proto__:null,default:ho},[eg]);function sc(t){if(!t.RTCIceCandidate||t.RTCIceCandidate&&"foundation"in t.RTCIceCandidate.prototype)return;const e=t.RTCIceCandidate;t.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=ho.parseCandidate(i.candidate);for(const o in s)o in r||Object.defineProperty(r,o,{value:s[o]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},t.RTCIceCandidate.prototype=e.prototype,_s(t,"icecandidate",n=>(n.candidate&&Object.defineProperty(n,"candidate",{value:new t.RTCIceCandidate(n.candidate),writable:"false"}),n))}function kf(t){!t.RTCIceCandidate||t.RTCIceCandidate&&"relayProtocol"in t.RTCIceCandidate.prototype||_s(t,"icecandidate",e=>{if(e.candidate){const n=ho.parseCandidate(e.candidate.candidate);n.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[n.priority>>24])}return e})}function oc(t,e){if(!t.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in t.RTCPeerConnection.prototype||Object.defineProperty(t.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp}});const n=function(a){if(!a||!a.sdp)return!1;const c=ho.splitSections(a.sdp);return c.shift(),c.some(f=>{const l=ho.parseMLine(f);return l&&l.kind==="application"&&l.protocol.indexOf("SCTP")!==-1})},i=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const f=parseInt(c[1],10);return f!==f?-1:f},r=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(a,c){let f=65536;e.browser==="firefox"&&e.version===57&&(f=65535);const l=ho.matchPrefix(a.sdp,"a=max-message-size:");return l.length>0?f=parseInt(l[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(f=2147483637),f},o=t.RTCPeerConnection.prototype.setRemoteDescription;t.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp},enumerable:!0,configurable:!0})}if(n(arguments[0])){const c=i(arguments[0]),f=r(c),l=s(arguments[0],c);let h;f===0&&l===0?h=Number.POSITIVE_INFINITY:f===0||l===0?h=Math.max(f,l):h=Math.min(f,l);const d={};Object.defineProperty(d,"maxMessageSize",{get(){return h}}),this._sctp=d}return o.apply(this,arguments)}}function ac(t,e){if(!(t.RTCPeerConnection&&"createDataChannel"in t.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function n(r,s){const o=r.send;r.send=function(){const c=arguments[0],f=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&f>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return o.apply(r,arguments)}}const i=t.RTCPeerConnection.prototype.createDataChannel;t.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return n(s,this),s},_s(t,"datachannel",r=>(n(r.channel,r.target),r))}function Uf(t){if(!t.RTCPeerConnection||"connectionState"in t.RTCPeerConnection.prototype)return;const e=t.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(n){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),n&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=n)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(n=>{const i=e[n];e[n]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const o=new Event("connectionstatechange",r);s.dispatchEvent(o)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Nf(t,e){if(!t.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const n=t.RTCPeerConnection.prototype.setRemoteDescription;t.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);t.RTCSessionDescription&&r instanceof t.RTCSessionDescription?arguments[0]=new t.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return n.apply(this,arguments)}}function cc(t,e){if(!(t.RTCPeerConnection&&t.RTCPeerConnection.prototype))return;const n=t.RTCPeerConnection.prototype.addIceCandidate;!n||n.length===0||(t.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():n.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function lc(t,e){if(!(t.RTCPeerConnection&&t.RTCPeerConnection.prototype))return;const n=t.RTCPeerConnection.prototype.setLocalDescription;!n||n.length===0||(t.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return n.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?n.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>n.apply(this,[o]))})}const YT=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:Nf,shimAddIceCandidateNullOrEmpty:cc,shimConnectionState:Uf,shimMaxMessageSize:oc,shimParameterlessSetLocalDescription:lc,shimRTCIceCandidate:sc,shimRTCIceCandidateRelayProtocol:kf,shimSendThrowTypeError:ac},Symbol.toStringTag,{value:"Module"}));function KT({window:t}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const n=Eh,i=jT(t),r={browserDetails:i,commonShim:YT,extractVersion:$o,disableLog:VT,disableWarnings:WT,sdp:qT};switch(i.browser){case"chrome":if(!ep||!If||!e.shimChrome)return n("Chrome shim is not included in this adapter release."),r;if(i.version===null)return n("Chrome shim can not determine version, not shimming."),r;n("adapter.js shimming chrome."),r.browserShim=ep,cc(t,i),lc(t),E0(t,i),w0(t),If(t,i),A0(t,i),L0(t,i),C0(t),R0(t,i),I0(t,i),sc(t),kf(t),Uf(t),oc(t,i),ac(t,i),Nf(t,i);break;case"firefox":if(!tp||!Df||!e.shimFirefox)return n("Firefox shim is not included in this adapter release."),r;n("adapter.js shimming firefox."),r.browserShim=tp,cc(t,i),lc(t),D0(t,i),Df(t,i),U0(t,i),k0(t),O0(t),N0(t),z0(t),F0(t),B0(t,i),H0(t,i),G0(t,i),V0(t,i),sc(t),Uf(t),oc(t,i),ac(t,i);break;case"safari":if(!np||!e.shimSafari)return n("Safari shim is not included in this adapter release."),r;n("adapter.js shimming safari."),r.browserShim=np,cc(t,i),lc(t),Y0(t),J0(t),X0(t),W0(t),j0(t),K0(t),$0(t),Z0(t),sc(t),kf(t),oc(t,i),ac(t,i),Nf(t,i);break;default:n("Unsupported browser!");break}return r}const ip=KT({window:typeof window=="undefined"?void 0:window});function xs(t,e,n,i){Object.defineProperty(t,e,{get:n,set:i,enumerable:!0,configurable:!0})}class tg{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const n=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,o=0;for(;o<i;){const a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),f={__peerData:this._dataCount,n:s,data:c,total:r};n.push(f),o=a,s++}return this._dataCount++,n}}}function JT(t){let e=0;for(const r of t)e+=r.byteLength;const n=new Uint8Array(e);let i=0;for(const r of t)n.set(r,i),i+=r.byteLength;return n}const ql=ip.default||ip,Wo=new class{isWebRTCSupported(){return typeof RTCPeerConnection!="undefined"}isBrowserSupported(){const t=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(t)?t==="chrome"?e>=this.minChromeVersion:t==="firefox"?e>=this.minFirefoxVersion:t==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return ql.browserDetails.browser}getVersion(){return ql.browserDetails.version||0}isUnifiedPlanSupported(){const t=this.getBrowser(),e=ql.browserDetails.version||0;if(t==="chrome"&&e<this.minChromeVersion)return!1;if(t==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let n,i=!1;try{n=new RTCPeerConnection,n.addTransceiver("audio"),i=!0}catch{}finally{n&&n.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator!="undefined"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},ZT=t=>!t||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(t),ng=()=>Math.random().toString(36).slice(2),rp={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class QT extends tg{noop(){}blobToArrayBuffer(e,n){const i=new FileReader;return i.onload=function(r){r.target&&n(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i)&255;return n.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=rp,this.browser=Wo.getBrowser(),this.browserVersion=Wo.getVersion(),this.pack=M0,this.unpack=y0,this.supports=function(){const n={browser:Wo.isBrowserSupported(),webRTC:Wo.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!n.webRTC)return n;let i;try{i=new RTCPeerConnection(rp),n.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),n.data=!0,n.reliable=!!r.ordered;try{r.binaryType="blob",n.binaryBlob=!Wo.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return n}(),this.validateId=ZT,this.randomToken=ng}}const Bn=new QT,eE="PeerJS: ";var sp;(function(t){t[t.Disabled=0]="Disabled",t[t.Errors=1]="Errors",t[t.Warnings=2]="Warnings",t[t.All=3]="All"})(sp||(sp={}));class tE{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...n){const i=[eE,...n];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var pe=new tE,Ah={},nE=Object.prototype.hasOwnProperty,Un="~";function la(){}Object.create&&(la.prototype=Object.create(null),new la().__proto__||(Un=!1));function iE(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function ig(t,e,n,i,r){if(typeof n!="function")throw new TypeError("The listener must be a function");var s=new iE(n,i||t,r),o=Un?Un+e:e;return t._events[o]?t._events[o].fn?t._events[o]=[t._events[o],s]:t._events[o].push(s):(t._events[o]=s,t._eventsCount++),t}function fc(t,e){--t._eventsCount===0?t._events=new la:delete t._events[e]}function En(){this._events=new la,this._eventsCount=0}En.prototype.eventNames=function(){var e=[],n,i;if(this._eventsCount===0)return e;for(i in n=this._events)nE.call(n,i)&&e.push(Un?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(n)):e};En.prototype.listeners=function(e){var n=Un?Un+e:e,i=this._events[n];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,o=new Array(s);r<s;r++)o[r]=i[r].fn;return o};En.prototype.listenerCount=function(e){var n=Un?Un+e:e,i=this._events[n];return i?i.fn?1:i.length:0};En.prototype.emit=function(e,n,i,r,s,o){var a=Un?Un+e:e;if(!this._events[a])return!1;var c=this._events[a],f=arguments.length,l,h;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,n),!0;case 3:return c.fn.call(c.context,n,i),!0;case 4:return c.fn.call(c.context,n,i,r),!0;case 5:return c.fn.call(c.context,n,i,r,s),!0;case 6:return c.fn.call(c.context,n,i,r,s,o),!0}for(h=1,l=new Array(f-1);h<f;h++)l[h-1]=arguments[h];c.fn.apply(c.context,l)}else{var d=c.length,u;for(h=0;h<d;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),f){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,n);break;case 3:c[h].fn.call(c[h].context,n,i);break;case 4:c[h].fn.call(c[h].context,n,i,r);break;default:if(!l)for(u=1,l=new Array(f-1);u<f;u++)l[u-1]=arguments[u];c[h].fn.apply(c[h].context,l)}}return!0};En.prototype.on=function(e,n,i){return ig(this,e,n,i,!1)};En.prototype.once=function(e,n,i){return ig(this,e,n,i,!0)};En.prototype.removeListener=function(e,n,i,r){var s=Un?Un+e:e;if(!this._events[s])return this;if(!n)return fc(this,s),this;var o=this._events[s];if(o.fn)o.fn===n&&(!r||o.once)&&(!i||o.context===i)&&fc(this,s);else{for(var a=0,c=[],f=o.length;a<f;a++)(o[a].fn!==n||r&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[s]=c.length===1?c[0]:c:fc(this,s)}return this};En.prototype.removeAllListeners=function(e){var n;return e?(n=Un?Un+e:e,this._events[n]&&fc(this,n)):(this._events=new la,this._eventsCount=0),this};En.prototype.off=En.prototype.removeListener;En.prototype.addListener=En.prototype.on;En.prefixed=Un;En.EventEmitter=En;Ah=En;var vs={};xs(vs,"ConnectionType",()=>Ni);xs(vs,"PeerErrorType",()=>Ot);xs(vs,"BaseConnectionErrorType",()=>fa);xs(vs,"DataConnectionErrorType",()=>ha);xs(vs,"SerializationType",()=>Eo);xs(vs,"SocketEventType",()=>Ui);xs(vs,"ServerMessageType",()=>ln);var Ni;(function(t){t.Data="data",t.Media="media"})(Ni||(Ni={}));var Ot;(function(t){t.BrowserIncompatible="browser-incompatible",t.Disconnected="disconnected",t.InvalidID="invalid-id",t.InvalidKey="invalid-key",t.Network="network",t.PeerUnavailable="peer-unavailable",t.SslUnavailable="ssl-unavailable",t.ServerError="server-error",t.SocketError="socket-error",t.SocketClosed="socket-closed",t.UnavailableID="unavailable-id",t.WebRTC="webrtc"})(Ot||(Ot={}));var fa;(function(t){t.NegotiationFailed="negotiation-failed",t.ConnectionClosed="connection-closed"})(fa||(fa={}));var ha;(function(t){t.NotOpenYet="not-open-yet",t.MessageToBig="message-too-big"})(ha||(ha={}));var Eo;(function(t){t.Binary="binary",t.BinaryUTF8="binary-utf8",t.JSON="json",t.None="raw"})(Eo||(Eo={}));var Ui;(function(t){t.Message="message",t.Disconnected="disconnected",t.Error="error",t.Close="close"})(Ui||(Ui={}));var ln;(function(t){t.Heartbeat="HEARTBEAT",t.Candidate="CANDIDATE",t.Offer="OFFER",t.Answer="ANSWER",t.Open="OPEN",t.Error="ERROR",t.IdTaken="ID-TAKEN",t.InvalidKey="INVALID-KEY",t.Leave="LEAVE",t.Expire="EXPIRE"})(ln||(ln={}));var Ch={};Ch=JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');class rE extends Ah.EventEmitter{constructor(e,n,i,r,s,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=e?"wss://":"ws://";this._baseUrl=a+n+":"+i+r+"peerjs?key="+s}start(e,n){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${n}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Ch.version),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),pe.log("Server message received:",s)}catch{pe.log("Invalid server message",r.data);return}this.emit(Ui.Message,s)},this._socket.onclose=r=>{this._disconnected||(pe.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(Ui.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){pe.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:ln.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const n of e)this.send(n)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Ui.Error,"Invalid message");return}if(!this._wsOpen())return;const n=JSON.stringify(e);this._socket.send(n)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class rg{constructor(e){this.connection=e}startConnection(e){const n=this._startPeerConnection();if(this.connection.peerConnection=n,this.connection.type===Ni.Media&&e._stream&&this._addTracksToConnection(e._stream,n),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=n.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){pe.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const n=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;pe.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(pe.log(`Received ICE candidates for ${n}:`,o.candidate),s.socket.send({type:ln.Candidate,payload:{candidate:o.candidate,type:r,connectionId:i},dst:n}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":pe.log("iceConnectionState is failed, closing connections to "+n),this.connection.emitError(fa.NegotiationFailed,"Negotiation of connection to "+n+" failed."),this.connection.close();break;case"closed":pe.log("iceConnectionState is closed, closing connections to "+n),this.connection.emitError(fa.ConnectionClosed,"Connection to "+n+" closed."),this.connection.close();break;case"disconnected":pe.log("iceConnectionState changed to disconnected on the connection with "+n);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},pe.log("Listening for data channel"),e.ondatachannel=o=>{pe.log("Received data channel");const a=o.channel;s.getConnection(n,i)._initializeDataChannel(a)},pe.log("Listening for remote stream"),e.ontrack=o=>{pe.log("Received remote stream");const a=o.streams[0],c=s.getConnection(n,i);if(c.type===Ni.Media){const f=c;this._addStreamToMediaConnection(a,f)}}}cleanup(){pe.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const n=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(n||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,n=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Ni.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}n.socket.send({type:ln.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(n.emitError(Ot.WebRTC,r),pe.log("Failed to setLocalDescription, ",r))}}catch(i){n.emitError(Ot.WebRTC,i),pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,n=this.connection.provider;try{const i=await e.createAnswer();pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`),n.socket.send({type:ln.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){n.emitError(Ot.WebRTC,r),pe.log("Failed to setLocalDescription, ",r)}}catch(i){n.emitError(Ot.WebRTC,i),pe.log("Failed to create answer, ",i)}}async handleSDP(e,n){n=new RTCSessionDescription(n);const i=this.connection.peerConnection,r=this.connection.provider;pe.log("Setting remote description",n);const s=this;try{await i.setRemoteDescription(n),pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(o){r.emitError(Ot.WebRTC,o),pe.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(n){this.connection.provider.emitError(Ot.WebRTC,n),pe.log("Failed to handleCandidate, ",n)}}_addTracksToConnection(e,n){if(pe.log(`add tracks from stream ${e.id} to peer connection`),!n.addTrack)return pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{n.addTrack(i,e)})}_addStreamToMediaConnection(e,n){pe.log(`add stream ${e.id} to media connection ${n.connectionId}`),n.addStream(e)}}class sg extends Ah.EventEmitter{emitError(e,n){pe.error("Error:",n),this.emit("error",new sE(`${e}`,n))}}class sE extends Error{constructor(e,n){typeof n=="string"?super(n):(super(),Object.assign(this,n)),this.type=e}}class og extends sg{get open(){return this._open}constructor(e,n,i){super(),this.peer=e,this.provider=n,this.options=i,this._open=!1,this.metadata=i.metadata}}var Ff;const Jo=class Jo extends og{get type(){return Ni.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,n,i){super(e,n,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Jo.ID_PREFIX+Bn.randomToken(),this._negotiator=new rg(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const n=e.type,i=e.payload;switch(e.type){case ln.Answer:this._negotiator.handleSDP(n,i.sdp),this._open=!0;break;case ln.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:pe.warn(`Unrecognized message type:${n} from peer:${this.peer}`);break}}answer(e,n={}){if(this._localStream){pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,n&&n.sdpTransform&&(this.options.sdpTransform=n.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};Ff=new WeakMap,ko(Jo,Ff,Jo.ID_PREFIX="mc_");let Dc=Jo;class oE{constructor(e){this._options=e}_buildRequest(e){const n=this._options.secure?"https":"http",{host:i,port:r,path:s,key:o}=this._options,a=new URL(`${n}://${i}:${r}${s}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Ch.version),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){pe.error("Error retrieving ID",e);let n="";throw this._options.path==="/"&&this._options.host!==Bn.CLOUD_HOST&&(n=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+n)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let n="";throw this._options.host===Bn.CLOUD_HOST?n="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":n="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+n)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var Bf,Hf;const Yr=class Yr extends og{get type(){return Ni.Data}constructor(e,n,i){super(e,n,i),this.connectionId=this.options.connectionId||Yr.ID_PREFIX+ng(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new rg(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=n=>{pe.log(`DC#${this.connectionId} dc onmessage:`,n.data)},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,n=!1){if(!this.open){this.emitError(ha.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,n)}async handleMessage(e){const n=e.payload;switch(e.type){case ln.Answer:await this._negotiator.handleSDP(e.type,n.sdp);break;case ln.Candidate:await this._negotiator.handleCandidate(n.candidate);break;default:pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};Bf=new WeakMap,Hf=new WeakMap,ko(Yr,Bf,Yr.ID_PREFIX="dc_"),ko(Yr,Hf,Yr.MAX_BUFFERED_AMOUNT=8388608);let kc=Yr;class Rh extends kc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",n=>this._handleDataMessage(n))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>kc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(n){return pe.error(`DC#:${this.connectionId} Error when sending:`,n),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Yl extends Rh{close(e){super.close(e),this._chunkedData={}}constructor(e,n,i){super(e,n,i),this.chunker=new tg,this.serialization=Eo.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const n=y0(e),i=n.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(n);return}this.emit("data",n)}_handleChunk(e){const n=e.__peerData,i=this._chunkedData[n]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[n]=i,i.total===i.count){delete this._chunkedData[n];const r=JT(i.data);this._handleDataMessage({data:r})}}_send(e,n){const i=M0(e);if(i instanceof Promise)return this._send_blob(i);if(!n&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const n=await e;if(n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}_sendChunks(e){const n=this.chunker.chunk(e);pe.log(`DC#${this.connectionId} Try to send ${n.length} chunks...`);for(const i of n)this.send(i,!0)}}class aE extends Rh{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,n){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Eo.None}}class cE extends Rh{_handleDataMessage({data:e}){const n=this.parse(this.decoder.decode(e)),i=n.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",n)}_send(e,n){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=Bn.chunkedMTU){this.emitError(ha.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Eo.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var Gf;const Zo=class Zo extends sg{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[n,i]of this._connections)e[n]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,n){super(),this._serializers={raw:aE,json:cE,binary:Yl,"binary-utf8":Yl,default:Yl},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?n=e:e&&(i=e.toString()),n={debug:0,host:Bn.CLOUD_HOST,port:Bn.CLOUD_PORT,path:"/",key:Zo.DEFAULT_KEY,token:Bn.randomToken(),config:Bn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...n},this._options=n,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Bn.CLOUD_HOST?this._options.secure=Bn.isSecure():this._options.host==Bn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&pe.setLogFunction(this._options.logFunction),pe.logLevel=this._options.debug||0,this._api=new oE(n),this._socket=this._createServerConnection(),!Bn.supports.audioVideo&&!Bn.supports.data){this._delayedAbort(Ot.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Bn.validateId(i)){this._delayedAbort(Ot.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(Ot.ServerError,r))}_createServerConnection(){const e=new rE(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Ui.Message,n=>{this._handleMessage(n)}),e.on(Ui.Error,n=>{this._abort(Ot.SocketError,n)}),e.on(Ui.Disconnected,()=>{this.disconnected||(this.emitError(Ot.Network,"Lost connection to server."),this.disconnect())}),e.on(Ui.Close,()=>{this.disconnected||this._abort(Ot.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const n=e.type,i=e.payload,r=e.src;switch(n){case ln.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case ln.Error:this._abort(Ot.ServerError,i.msg);break;case ln.IdTaken:this._abort(Ot.UnavailableID,`ID "${this.id}" is taken`);break;case ln.InvalidKey:this._abort(Ot.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case ln.Leave:pe.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case ln.Expire:this.emitError(Ot.PeerUnavailable,`Could not connect to peer ${r}`);break;case ln.Offer:{const s=i.connectionId;let o=this.getConnection(r,s);if(o&&(o.close(),pe.warn(`Offer received for existing Connection ID:${s}`)),i.type===Ni.Media){const c=new Dc(r,this,{connectionId:s,_payload:i,metadata:i.metadata});o=c,this._addConnection(r,o),this.emit("call",c)}else if(i.type===Ni.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(r,o),this.emit("connection",c)}else{pe.warn(`Received malformed connection type:${i.type}`);return}const a=this._getMessages(s);for(const c of a)o.handleMessage(c);break}default:{if(!i){pe.warn(`You received a malformed message from ${r} of type ${n}`);return}const s=i.connectionId,o=this.getConnection(r,s);o&&o.peerConnection?o.handleMessage(e):s?this._storeMessage(s,e):pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,n){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(n)}_getMessages(e){const n=this._lostMessages.get(e);return n?(this._lostMessages.delete(e),n):[]}connect(e,n={}){if(n={serialization:"default",...n},this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ot.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[n.serialization](e,this,n);return this._addConnection(e,i),i}call(e,n,i={}){if(this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ot.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!n){pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new Dc(e,this,{...i,_stream:n});return this._addConnection(e,r),r}_addConnection(e,n){pe.log(`add connection ${n.type}:${n.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(n)}_removeConnection(e){const n=this._connections.get(e.peer);if(n){const i=n.indexOf(e);i!==-1&&n.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,n){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===n)return r;return null}_delayedAbort(e,n){setTimeout(()=>{this._abort(e,n)},0)}_abort(e,n){pe.error("Aborting!"),this.emitError(e,n),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const n=this._connections.get(e);if(n)for(const i of n)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=n=>{}){this._api.listAllPeers().then(n=>e(n)).catch(n=>this._abort(Ot.ServerError,n))}};Gf=new WeakMap,ko(Zo,Gf,Zo.DEFAULT_KEY="peerjs");let Uc=Zo;const Kl="fourbanners-v1-",op="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function lE(){let t="";for(let e=0;e<4;e++)t+=op[Math.floor(Math.random()*op.length)];return t}const fE=()=>typeof window.RTCPeerConnection=="function"&&/^https?:$/.test(location.protocol),ap=()=>Object.assign({debug:0},window.__PEER_OPTS||{});function cp(t,e){return new Promise((n,i)=>{if(typeof window.RTCPeerConnection!="function"){i({type:"no-webrtc"});return}const r=new Map,s=[],o=new Map,a=new Map;let c={},f=null,l=null,h=!1,d=0,u=null;const _=(z,P)=>{h||(h=!0,clearTimeout(x),z?n(P):i(P))},x=setTimeout(()=>{try{L.destroy()}catch{}_(!1,{type:"timeout"})},12e3),g=z=>z===f||performance.now()-(a.get(z)||0)<6e3,p=()=>[...r.entries()].filter(([z])=>g(z)).map(([z,P])=>({peer:z,sameTab:z===f,isMe:z===f,presence:P}));let v=null;const y=()=>{v=null;const z=p();for(const P of s)try{P({peers:z})}catch(k){console.error(k)}},b=()=>{v||(v=setTimeout(y,16))},C=z=>({role:z.role,nick:z.nick,want:z.want,ph:z.ph,fac:z.fac,cr:z.cr});function w(){d=performance.now(),u=null;const z={};for(const[P,k]of r)z[P]=P===f?k:C(k);for(const P of o.values())if(P.open)try{P.send({t:"all",all:z})}catch{}}function R(){if(u)return;const z=Math.max(0,250-(performance.now()-d));u=setTimeout(w,z)}const L=e?new Uc(Kl+t,ap()):new Uc(ap());L.on("open",z=>{if(f=z,r.set(z,c),e){_(!0,W);return}l=L.connect(Kl+t,{reliable:!0,serialization:"json"}),l.on("open",()=>{try{l.send({t:"p",pr:c})}catch{}_(!0,W)}),l.on("data",P=>{if(!(!P||typeof P!="object")){if(a.set(Kl+t,performance.now()),P.t==="full"){_(!1,{type:"full"});return}if(P.t==="all"&&P.all&&typeof P.all=="object"){for(const k of[...r.keys()])k!==f&&!(k in P.all)&&r.delete(k);for(const[k,V]of Object.entries(P.all))k!==f&&V&&typeof V=="object"&&(r.set(k,V),a.set(k,performance.now()));b()}else P.t==="h"&&typeof P.id=="string"&&P.pr&&typeof P.pr=="object"&&(r.set(P.id,P.pr),b())}}),l.on("close",()=>{for(const P of[...r.keys()])P!==f&&r.delete(P);b()}),l.on("error",()=>{})}),L.on("connection",z=>{if(!e){z.close();return}if(o.size>=7){z.on("open",()=>{try{z.send({t:"full"})}catch{}setTimeout(()=>z.close(),400)});return}o.set(z.peer,z),a.set(z.peer,performance.now()),z.on("open",()=>{w();try{z.send({t:"h",id:f,pr:c})}catch{}}),z.on("data",k=>{if(!k||k.t!=="p"||!k.pr||typeof k.pr!="object")return;a.set(z.peer,performance.now());const V=r.get(z.peer);r.set(z.peer,k.pr),b(),(!V||V.nick!==k.pr.nick||V.want!==k.pr.want||V.ph!==k.pr.ph||V.role!==k.pr.role||V.fac!==k.pr.fac)&&R()});const P=()=>{o.has(z.peer)&&(o.delete(z.peer),r.delete(z.peer),b(),R())};z.on("close",P),z.on("error",P)}),L.on("error",z=>{if(!h){try{L.destroy()}catch{}_(!1,z);return}if(z&&z.type==="peer-unavailable"&&!e){for(const P of[...r.keys()])P!==f&&r.delete(P);b()}}),L.on("disconnected",()=>{if(!L.destroyed)try{L.reconnect()}catch{}});let M=0;const S=()=>{if(M=performance.now(),e){for(const z of o.values())if(z.open)try{z.send({t:"h",id:f,pr:c})}catch{}}else if(l&&l.open)try{l.send({t:"p",pr:c})}catch{}},N=setInterval(()=>{if(L.destroyed){clearInterval(N);return}if(performance.now()-M>1500&&S(),e){for(const[z,P]of[...o])if(performance.now()-(a.get(z)||performance.now())>8e3){try{P.close()}catch{}o.delete(z),r.delete(z),b(),R()}}b()},1e3),W={name:t,presence:async z=>{for(const P in z)z[P]===null?delete c[P]:c[P]=z[P];r.set(f,c),S()},peers:p,onPeers:z=>(s.push(z),setTimeout(()=>z({peers:p()}),0),()=>{const P=s.indexOf(z);P>=0&&s.splice(P,1)}),leave:async()=>{clearInterval(N);try{L.destroy()}catch{}}}})}const hE=new Set(["unavailable-id","peer-unavailable","full","no-webrtc","timeout"]);async function lp(t,e){try{return await cp(t,e)}catch(n){if(n&&hE.has(n.type))throw n;return await new Promise(i=>setTimeout(i,800)),cp(t,e)}}const we=t=>document.getElementById(t);let ns={startMatch(){},seedDemo(){},preset:()=>"ffa",resetSolo(){}};const Nc=()=>{var t;return{role:"player",nick:Fe.myNick||"Captain",ph:"lobby",want:(t=Fe.NET.want)!=null?t:-1,fac:fn.faction,cr:hn.crest}};let lr=!1;function ag(){["ovTitle","ovLobby","ovEnd"].forEach(e=>we(e).hidden=!0),we("ovBrowse").hidden=!1,we("nick").value=Fe.myNick,we("netNote").textContent="";const t=fE();we("hostBtn").disabled=!t,we("joinBtn").disabled=!t,t||(we("netNote").textContent=/^https?:$/.test(location.protocol)?"Multiplayer could not start in this browser. Open the game's website link in Safari or Chrome.":"Multiplayer only works when the game is opened from its website.")}function Ja(){Fe.myNick=(we("nick").value||"").trim().slice(0,16);try{localStorage.setItem("fb-nick",Fe.myNick)}catch{}}function zc(){const t=Fe.NET;m.state!=="lobby"&&ns.seedDemo(),t.lobbySig=null,m.state="lobby",["ovTitle","ovBrowse","ovEnd"].forEach(e=>we(e).hidden=!0),we("hudWrap").hidden=!0,we("ovLobby").hidden=!1,t.role==="host"?Pr():t.room.presence(Nc()).catch(()=>{}),Oc()}function Pr(){const t=Fe.NET;if(!t||t.role!=="host")return;const e=t.room.peers(),n=new Set(e.map(o=>o.peer)),i=Qc(t.room);if(i&&t.me!==i){const o=t.seats[t.me];delete t.seats[t.me],t.me=i,t.seats[i]=o===void 0?0:o}for(const o of Object.keys(t.seats))!n.has(o)&&o!==t.me&&delete t.seats[o];const r=t.lobby;for(const o of Object.keys(t.seats))t.seats[o]>=4&&!r.duo[Te(t.seats[o])]&&delete t.seats[o];const s=()=>Object.values(t.seats);for(const o of e){if(o.sameTab)continue;const a=o.presence||{};if(a.role!=="player")continue;const c=a.want;if(typeof c=="number"&&c>=0&&c<8&&(c<4||r.duo[Te(c)])){if(t.seats[o.peer]===c)continue;s().includes(c)||(t.seats[o.peer]=c)}else c===-1&&t.seats[o.peer]!==void 0&&delete t.seats[o.peer]}t.room.presence({role:"host",ph:"lobby",nick:Fe.myNick||"Host",fac:fn.faction,mode:r.mode,map:r.map,diff:r.diff,al:r.al.join(""),duo:r.duo.map(o=>o?1:0).join(""),seats:t.seats,s:null,m:null,res:null}).catch(()=>{}),Oc()}function cg(){const t=Fe.NET;if(t.role==="host")return{mode:t.lobby.mode,map:t.lobby.map,diff:t.lobby.diff,al:t.lobby.al,duo:t.lobby.duo,seats:t.seats,hostNick:Fe.myNick||"Host"};const e=t.room.peers().find(i=>i.presence&&i.presence.role==="host");if(!e)return null;t.hostPeer=e.peer;const n=e.presence;return{mode:n.mode,map:n.map,diff:n.diff,al:String(n.al||"0123").split("").map(Number),duo:String(n.duo||"0000").split("").map(i=>i==="1"),seats:n.seats||{},hostNick:n.nick,ph:n.ph,hostP:e}}function Oc(){const t=Fe.NET;if(!t||we("ovLobby").hidden)return;const e=cg(),n=t.role==="host";if(!e){we("lobbyStatus").textContent="Connecting to the host…",we("codeTxt").textContent=t.name||"",we("seats").innerHTML="",t.lobbySig=null;return}we("lobbyTitle").textContent=n?"Your battle":`${String(e.hostNick||"Host").slice(0,16)}'s battle`,we("codeTxt").textContent=t.name||"",we("copyBtn").hidden=!n;const i=t.room.peers(),r=p=>{const v=i.find(y=>y.peer===p);return v&&v.presence&&v.presence.nick?String(v.presence.nick).slice(0,16):"Player"},s=p=>{const v=i.find(b=>b.peer===p),y=v&&v.presence&&v.presence.fac;return uo[y]?uo[y].name:""},o=Qc(t.room),a=p=>Object.keys(e.seats).find(v=>e.seats[v]===p),c=JSON.stringify([o,e.mode,e.map,e.diff,e.al,e.duo,e.seats,e.hostNick,i.map(p=>[p.peer,p.presence&&p.presence.nick,p.presence&&p.presence.role,p.presence&&p.presence.fac])]);if(c===t.lobbySig)return;t.lobbySig=c;const f=we("seats");f.innerHTML="";const l=(p,v,y)=>{const b=a(p),C=document.createElement("button");C.type="button",C.className="seat"+(y?" slot2":"")+(b===o?" mine":"")+(b&&b!==o?" taken":""),C.style.background=v.css;const w=document.createElement("b");w.textContent=y||v.name;const R=document.createElement("span");if(R.textContent=b?(b===o?"You":r(b))+(i.find(L=>L.peer===b&&L.presence&&L.presence.role==="host")?" · host":""):"Computer",C.append(w,R),b&&s(b)){const L=document.createElement("small");L.textContent=s(b),C.appendChild(L)}return C.addEventListener("click",()=>{b&&b!==o||(n?b||(t.seats[o]=p,Pr()):(t.want=b===o?-1:p,t.room.presence(Nc()).catch(()=>{})))}),C};he.forEach((p,v)=>{const y=document.createElement("div");y.className="seatcol";const b=l(v,p,null),C=document.createElement("span");C.className="alchip",C.setAttribute("role","button"),C.textContent="Team "+pp[e.al[v]],n&&(C.tabIndex=0,C.addEventListener("click",R=>{R.stopPropagation(),t.lobby.al[v]=(t.lobby.al[v]+1)%4,Pr()})),b.appendChild(C);const w=document.createElement("span");w.className="duotog"+(e.duo[v]?" on":""),w.setAttribute("role","button"),w.textContent="Duo",n?(w.tabIndex=0,w.addEventListener("click",R=>{R.stopPropagation(),t.lobby.duo[v]=!t.lobby.duo[v],Pr()})):w.setAttribute("disabled",""),b.appendChild(w),y.appendChild(b),e.duo[v]&&y.appendChild(l(v+4,p,"Co-captain")),f.appendChild(y)});const h=(p,v,y)=>{const b=we(p);b.classList.toggle("ro",y),b.querySelectorAll("button").forEach(C=>C.setAttribute("aria-pressed",String(C.dataset.v===String(v))))},d=n?t.seats[t.me]:e.seats[t.hostPeer],u=p=>Object.keys(Eg).find(v=>aa(v,Te(d!=null?d:0)).join("")===p.join(""))||"";h("lobbyFaction",fn.faction,!1),h("lobbyTeams",u(e.al),!n),h("lobbyMode",e.mode,!n),h("lobbyMap",e.map,!n),h("lobbyDiff",e.diff,!n),we("startBtn").hidden=!n;const _=new Set(e.al).size,x=Object.keys(e.seats).length;we("startBtn").disabled=_<2;const g=e.seats[o];we("lobbyStatus").textContent=n?_<2?"Everyone is on one team. Split the teams to start.":x<2?"Share the code. Friends open this page, tap Play with friends and enter it.":`${x} players · computer plays the rest`:g===void 0?"Tap a color to take it":`You are ${he[Te(g)].name}${Ig(g)?"'s co-captain":""}. Waiting for the host to start…`}async function tl(t){yh();const e=Fe.NET;if(Fe.NET=null,e){try{e.unsub&&e.unsub()}catch{}try{await e.room.leave()}catch{}}ns.resetSolo(),m.state="title",we("hudWrap").hidden=!0,["ovLobby","ovEnd","ovBrowse"].forEach(n=>we(n).hidden=!0),ns.seedDemo(),t?(ag(),we("netNote").textContent=t):we("ovTitle").hidden=!1}function dE(){const t=Fe.NET;if(!t||t.role!=="client")return;const e=cg();if(!e){t.hostGoneAt||(t.hostGoneAt=performance.now()),performance.now()-t.hostGoneAt>6e3&&tl("That battle is no longer open.");return}if(t.hostGoneAt=0,e.ph==="play"&&e.hostP.presence.seed){const n=e.seats[Qc(t.room)];if(n===void 0){t.toldLate||(t.toldLate=!0,we("lobbyStatus").textContent="The battle started without you. Wait here for the next one.");return}t.toldLate=!1,m.state==="lobby"&&(m.myTi=n,DT(e.hostP.presence))}}function uE(t){ns=Object.assign(ns,t),we("nick").addEventListener("change",Ja),we("browseBack").addEventListener("click",()=>{Ja(),we("ovBrowse").hidden=!0,we("ovTitle").hidden=!1}),we("mpBtn").addEventListener("click",()=>{Sr(),ag()}),we("codeIn").addEventListener("input",n=>{n.target.value=n.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")}),we("codeIn").addEventListener("keydown",n=>{n.key==="Enter"&&we("joinBtn").click()}),we("copyBtn").addEventListener("click",()=>{const n=Fe.NET&&Fe.NET.name;if(!n)return;const i=()=>{we("copyBtn").textContent="Copied",setTimeout(()=>we("copyBtn").textContent="Copy",1500)};try{navigator.clipboard.writeText(n).then(i,()=>{})}catch{}}),we("hostBtn").addEventListener("click",async()=>{if(lr)return;lr=!0,Ja(),we("netNote").textContent="Opening a battle…";let n=null,i=null;for(let o=0;o<4&&!n;o++){i=lE();try{n=await lp(i,!0)}catch(a){if(!(a&&a.type==="unavailable-id")){we("netNote").textContent="Could not reach the multiplayer server. Check your connection and try again.",lr=!1;return}}}if(lr=!1,!n){we("netNote").textContent="Could not open a battle. Try again.";return}we("netNote").textContent="";const r=Fe.NET={role:"host",room:n,name:i,seats:{},msgs:[],msgN:0,snapN:0,inp:{},lobby:{mode:m.mode,map:m.map.id,diff:m.diff,al:aa(ns.preset(),fn.color),duo:[!1,!1,!1,!1]}},s=Qc(n)||"me";r.me=s,r.seats[s]=fn.color,m.myTi=fn.color,m.role="host",r.unsub=n.onPeers(()=>{m.state==="lobby"&&Pr()}),zc()}),we("joinBtn").addEventListener("click",async()=>{const n=(we("codeIn").value||"").trim().toUpperCase();if(n.length!==4){we("netNote").textContent="Battle codes are 4 letters or numbers.";return}if(lr)return;lr=!0,Ja(),we("netNote").textContent=`Joining ${n}…`;let i;try{i=await lp(n,!1)}catch(s){lr=!1;const o=s&&s.type;we("netNote").textContent=o==="peer-unavailable"?`No battle found with code ${n}. Check the code with your host.`:o==="full"?"That battle already has eight players.":"Could not connect. Check your internet connection and try again.";return}lr=!1,we("netNote").textContent="";const r=Fe.NET={role:"client",room:i,name:n,seats:{},hostPeer:null};m.role="client",r.unsub=i.onPeers(()=>{m.state==="lobby"&&Oc()}),i.presence(Nc()).catch(()=>{}),zc()});const e=(n,i)=>we(n).addEventListener("click",r=>{var a;const s=r.target.closest("button"),o=Fe.NET;!s||!o||o.role!=="host"||(i==="al"?o.lobby.al=aa(s.dataset.v,Te((a=o.seats[o.me])!=null?a:0)):i==="diff"?o.lobby.diff=+s.dataset.v:o.lobby[i]=s.dataset.v,Pr())});we("lobbyFaction").addEventListener("click",n=>{const i=n.target.closest("button"),r=Fe.NET;!i||!r||(fn.faction=i.dataset.v,fn.save(),r.role==="host"?Pr():(r.lobbySig=null,r.room.presence(Nc()).catch(()=>{}),Oc()))}),e("lobbyTeams","al"),e("lobbyMode","mode"),e("lobbyMap","map"),e("lobbyDiff","diff"),we("startBtn").addEventListener("click",()=>{var c;const n=Fe.NET;if(!n||n.role!=="host")return;Sr();const i=n.lobby;m.mode=i.mode,m.map=Bc[i.map],m.diff=i.diff,m.ALLY=[...i.al],m.myTi=(c=n.seats[n.me])!=null?c:0,m.seed=Math.random()*1e9|0,n.msgs=[],n.msgN=0,n.inp={},n.snapN=0;const r=[0,0,0,0,0,0,0,0],s=[null,null,null,null],o=n.room.peers();m.crests=[];const a=[1,1,1,1,...i.duo.map(f=>f?1:0)];for(const[f,l]of Object.entries(n.seats)){r[l]=1;const h=(o.find(d=>d.peer===f)||{}).presence||{};s[Te(l)]=f===n.me?fn.faction:uo[h.fac]?h.fac:null,m.crests[l]=f===n.me?hn.crest:Math.min(7,Math.max(0,h.cr|0))}m.factions=Th(s,m.seed),ns.startMatch(r,a),el()}),we("leaveBtn").addEventListener("click",()=>tl())}const Qe=t=>document.getElementById(t);{const t=Qe("nojs");t&&t.remove()}document.addEventListener("pointerdown",t=>{t.target.closest&&t.target.closest(".overlay button, .overlay .seat, .overlay .duotog, .overlay .alchip")&&At.uiClick()},!0);document.addEventListener("gesturestart",t=>t.preventDefault());document.addEventListener("gesturechange",t=>t.preventDefault());let fp=0;document.addEventListener("touchend",t=>{const e=Date.now();e-fp<300&&!(t.target.closest&&t.target.closest("input"))&&t.preventDefault(),fp=e},{passive:!1});const pE=new URLSearchParams(location.search);pE.get("stress")==="1"&&(m.fullSquads=!0);let Ph="ffa";ct.on("msg",t=>lo(t.k,t.a));ct.on("spark",t=>hS(t.x,t.y,t.z,t.c,t.n));ct.on("splat",t=>{yS(t.x,t.z,t.s,t.ti),uS(t.x,t.z)});ct.on("float",t=>cs(t.x,t.y,t.z,t.text,t.color));ct.on("sfx",t=>{const e=At[t.name];e&&e(t.x,t.z)});ct.on("shake",t=>{ht.shake=t});let Fc=0;ct.on("hitstop",t=>{Fc=Math.max(Fc,t)});ct.on("buzz",t=>eo(t));ct.on("hint",t=>{const e=m.player;e&&zt("mhint",2500)&&cs(e.x,e.y+3.4,e.z,t,"#fff")});ct.on("respawnMe",t=>{ht.yaw=t.face});ct.on("hud",()=>{m.state==="play"&&bh(q.lastSnapAt)});ct.on("hostEnd",t=>xr(t[0],t[1]));ct.on("end",({w:t,why:e})=>{h0(),sa(!1),fo(!1),m0(),bh(q.lastSnapAt),yh();const n=m.ALLY[Te(m.myTi)],i=t<0?"draw":t===n?"win":"lose",r=i==="win"?"Victory":i==="draw"?"Draw":"Defeat";i==="win"?(At.horn(),pr("Victory!","","#ffcf3a")):pr(r,"",i==="draw"?"#fff":"#e0352b"),Qe("endTitle").innerHTML=`<span>${r}</span>`,Qe("endText").textContent=`${hs[m.mode].name} on ${m.map.name}. ${_E(t,e)}`;const s=Ag[i];Qe("endQuip").textContent=s[Math.random()*s.length|0],Qe("sKills").textContent=m.kills,Qe("sSquad").textContent=m.recruited,Qe("sTime").textContent=Mh(m.T),mE(m.awarded?null:wT({result:i,kills:m.kills,diff:m.diff})),m.awarded=!0;const o=es(),a=bi();Qe("againBtn").hidden=a,Qe("againBtn").textContent=o?"Back to lobby":"Fight again",Qe("menuBtn").textContent=Fe.NET?"Leave":"Menu",Qe("endNote").textContent=a?"Waiting for the host to start the next battle…":"",o&&el(),setTimeout(()=>{m.state==="end"&&(Qe("ovEnd").hidden=!1)},1600)});function mE(t){const e=$u(),n=Qe("xpBar");Qe("rankName").textContent=hi[e.rank].name,Qe("rankNameJoke").textContent=hi[e.rank].joke,Qe("xpGain").textContent=t?`+${t.gained} XP`:"";const i=o=>{const a=$u(o);return a.span?Math.min(100,a.into/a.span*100):100};n.style.transition="none",n.style.width=(t&&!t.rankUp?i(t.before):0)+"%",requestAnimationFrame(()=>requestAnimationFrame(()=>{n.style.transition="",n.style.width=i(hn.xp)+"%"}));const r=Qe("rankNote"),s=hi[e.rank+1];r.classList.toggle("up",!!(t&&t.rankUp)),r.textContent=t&&t.rankUp?`Rank up! New crest: ${t.unlocked.join(", ")}`:s?`${s.xp-hn.xp} XP to ${s.name} (unlocks the ${is[e.rank+1].name} crest)`:"Top rank reached",Lh()}const gE='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';function Lh(){const t=oa(hn.xp),e=hi[t+1];Qe("rankLine").textContent=`Rank: ${hi[t].name}`,Qe("rankJoke").textContent=hi[t].joke,Qe("rankNext").textContent=e?`${hn.xp} / ${e.xp} XP`:`${hn.xp} XP`,Qe("segCrest").innerHTML=is.map((i,r)=>{const s=_0(r),o=s?`${i.name} crest`:`${i.name} crest, unlocks at ${hi[r].name}`;return`<button type="button" data-v="${r}" aria-pressed="${r===hn.crest}" aria-disabled="${!s}" aria-label="${o}" title="${o}" style="background:${i.css}">${s?"":gE}</button>`}).join("");const n=is[t+1];Qe("crestNote").textContent=`Crest: ${is[hn.crest].name}`+(n?` · ${hi[t+1].name} unlocks ${n.name}`:"")}Qe("segCrest").addEventListener("click",t=>{const e=t.target.closest("button");!e||e.getAttribute("aria-disabled")==="true"||x0(+e.dataset.v)&&Lh()});Lh();function lg(){Qe("tip").textContent="Tip: "+Fh[Math.random()*Fh.length|0]}lg();const qo=[...document.querySelectorAll("#ovTitle .tabs button")];function zf(t){qo.forEach(e=>{const n=e.dataset.tab===t;e.setAttribute("aria-selected",String(n)),e.tabIndex=n?0:-1,Qe(e.dataset.tab).hidden=!n})}qo.forEach((t,e)=>{t.addEventListener("click",()=>zf(t.dataset.tab)),t.addEventListener("keydown",n=>{const i=n.key==="ArrowRight"?1:n.key==="ArrowLeft"?-1:0;if(!i)return;const r=qo[(e+i+qo.length)%qo.length];zf(r.dataset.tab),r.focus(),n.preventDefault()})});zf("tabBattle");function _E(t,e){if(t<0)return"Time ran out with no clear winner.";const n=gT(t),i=n.indexOf("&")<0;return e==="castles"?`${n} tore down every enemy castle.`:e==="tickets"?`${n} ${i?"is":"are"} the last side with tickets.`:e==="caps"?`${n} carried the banner home ${ea} times.`:`Time is up and ${n} ${i?"leads":"lead"}.`}function fg(){Fm(m.layout),$m(),o0(),Qm(),$S(),dT(),uT(),sa(!1),fo(!1),mg.reset(),fT(m.map.id)}function hg(t,e){Fe.NET||(m.role="solo"),qg(t,e),ht.yaw=m.player.face,ht.pitch=Gm,fg(),At.horn(),ST()}RT({onMatchStart:fg,onAbort:t=>tl(t),onLobby:()=>zc()});uE({startMatch:hg,seedDemo:Io,preset:()=>Ph,resetSolo:()=>xa()});xT(qr);ET();let Za=0,hc=null;function Io(){m.layout=Xf(m.map.id,!1,!1,7),$f(m.layout),m.units=[],m.horses=[],m.arrows=[],m.flag=null,m.player=null,m.uid=0,m.teams=Yf([0,0,0,0]),m.factions=Th(he.map((i,r)=>r===m.myTi?fn.faction:null),7),Fm(m.layout),$m(),o0(),Qm();const t=["foot","foot","arch","foot","arch"];he.forEach((i,r)=>t.forEach((s,o)=>{const[a,c]=Lr(i,(o-2)*1.5),f=go(r,a*.5,c*.5,s);f.face=Math.atan2(-f.x,-f.z),f.demo=!0}));const e=go(m.myTi,0,22,"captain");e.demo=!0;const n={id:1,x:0,z:22,face:0,state:"ridden",rider:e,t:0,spd:9,ti:m.myTi};m.horses.push(n),e.mounted=!0,e.horse=n,hc=e}function hp(t){if(Za+=t,hc&&hc.horse){const e=Za*.35,n=hc;n.x=Math.cos(e)*22,n.z=Math.sin(e)*22,n.y=vt(n.x,n.z),n.face=Math.atan2(-Math.sin(e),Math.cos(e)),n.vx=-Math.sin(e)*8,n.vz=Math.cos(e)*8;const i=n.horse;i.x=n.x,i.z=n.z,i.face=n.face,i.spd=8}i0(m.units,t),s0(m.horses.map(e=>({key:e.id,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:e.spd,state:e.state,t:e.t,fall:e.fall})),t),Xm(),Hm(t,()=>{}),fS(Za),Om(0,0,Za),ei.render(Ft,mt),c0()}function ys(t,e){Qe(t).addEventListener("click",n=>{const i=n.target.closest("button");i&&(Qe(t).querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed",r===i?"true":"false")),e(i.dataset.v))})}function _a(){const t=CT(m.ALLY,m.myTi);Qe("desc").innerHTML=`<strong>${hs[m.mode].name}.</strong> ${hs[m.mode].desc}<br><strong>${m.map.name}.</strong> ${m.map.desc} <strong>Teams:</strong> ${t}`}function dg(){const t=Dm[dt.level].name;Qe("qualityNote").textContent=dt.stepped?`Lowered to ${t} to keep the game smooth.`:dt.setting==="auto"?`Auto picked ${t} for this device.`:"",Qe("segQuality").querySelectorAll("button").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.v===dt.setting)))}ys("segMode",t=>{m.mode=t,_a()});ys("segMap",t=>{m.map=Bc[t],_a(),Io()});ys("segTeams",t=>{Ph=t,m.ALLY=aa(t,m.myTi),_a()});ys("segFaction",t=>{fn.faction=t,fn.save(),Io()});ys("segColor",t=>{fn.color=+t,fn.save(),xa(),_a(),Io()});const dc=[!1,!1,!1,!1];Qe("segDuo").querySelectorAll("button").forEach((t,e)=>{t.addEventListener("click",()=>{dc[e]=!dc[e],t.setAttribute("aria-pressed",String(dc[e]))})});function xa(){m.role="solo",m.myTi=fn.color,m.ALLY=aa(Ph,m.myTi)}function ug(){Sr(),Fe.NET=null,xa(),m.seed=Math.random()*1e9|0,m.factions=Th(he.map((e,n)=>n===m.myTi?fn.faction:null),m.seed);const t=[1,1,1,1,...dc.map(e=>e?1:0)];m.crests=[],m.crests[m.myTi]=hn.crest,hg(he.map((e,n)=>n===m.myTi?1:0),t)}const pg=(t,e)=>Qe(t).querySelectorAll("button").forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.v===String(e))));ys("segDiff",t=>{m.diff=+t});ys("segQuality",t=>{t!==dt.setting&&(Ob(t),location.reload())});const xE=matchMedia("(pointer: coarse)").matches;function vE(){if(!xE||document.fullscreenElement)return;const t=document.documentElement,e=t.requestFullscreen||t.webkitRequestFullscreen;if(e)try{const n=e.call(t,{navigationUI:"hide"});n&&n.then&&n.then(()=>{try{screen.orientation.lock("landscape").catch(()=>{})}catch{}}).catch(()=>{})}catch{}}["goBtn","againBtn","hostBtn","joinBtn","startBtn"].forEach(t=>{const e=Qe(t);e&&e.addEventListener("click",vE)});Qe("goBtn").addEventListener("click",ug);Qe("againBtn").addEventListener("click",()=>{if(Sr(),es()){zc();return}ug()});Qe("menuBtn").addEventListener("click",()=>{if(Fe.NET){tl();return}m.state="title",xa(),lg(),Qe("ovEnd").hidden=!0,Qe("hudWrap").hidden=!0,Qe("ovTitle").hidden=!1,Io()});const mg={t:0,frames:0,steps:0,reset(){this.t=0,this.frames=0},tick(t){if(dt.setting!=="auto"||this.steps>=2||this.t>8||(this.t+=t,this.frames++,this.t<8))return;this.frames/this.t<30&&Bb()&&(this.steps++,Nm(),Um(),Ih(),dg(),this.reset())}};function Jl(t){hT(t),XS(t),i0(m.units,t);const e=bi()?zT():m.horses.map(i=>({key:i.id,ti:i.ti,x:i.x,z:i.z,face:i.face,spd:i.spd,state:i.state,t:i.t,fall:i.fall}));s0(e,t),Hm(t,pS),bS(t),Xm(),lS(t),SS(m.player,Rp(m.myTi),Eu());const n=gs();Om(n?n.x:0,n?n.z:0,Eu()),ei.render(Ft,mt),QS({joy:pt.joy,nickFor:yE})}function yE(t){const e=Fe.NET;if(!e)return null;const n=e.room.peers(),i=e.role==="host"?e.seats:((n.find(o=>o.peer===e.hostPeer)||{}).presence||{}).seats||{},r=Object.keys(i).find(o=>i[o]===t);if(!r)return null;const s=n.find(o=>o.peer===r);return s&&s.presence&&s.presence.nick?String(s.presence.nick).slice(0,16):null}let Zl=0,dp=performance.now(),Of=60;function gg(t){const e=(t-dp)/1e3;let n=Math.min(.05,e);dp=t,Fc>0&&(Fc-=e,n*=.06),e>0&&(Of+=(1/e-Of)*.05);try{if(bi()&&(m.state==="play"||m.state==="end"))NT(n)&&(m.state==="play"||m.state==="end")?Jl(n):hp(n);else if(m.state==="play")es()&&IT(),Zp(n,d0(n)),es()&&m.state==="play"&&LT(),Jl(n),mg.tick(e);else if(m.state==="end"){for(const i of m.units)i.dead&&sh(i,n);Jl(n),es()&&t-(Fe.NET.lastSend||0)>500&&el(!0)}else hp(n),m.state==="lobby"&&(bi()?dE():es()&&t-(Fe.NET.lastLobby||0)>700&&(Fe.NET.lastLobby=t,Pr()));m.state==="play"&&(Zl-=n,Zl<=0&&(Zl=.1,bh(q.lastSnapAt),TT(.1)))}catch(i){console.error(i)}requestAnimationFrame(gg)}const up=t=>Math.round(t*10)/10;window.__fb={end(){xr(m.ALLY[Te(m.myTi)],"time")},get info(){const t=Fe.NET,e=m.player;return{state:m.state,T:Math.round(m.T),MODE:m.mode,map:m.map.id,myTi:m.myTi,al:m.ALLY.join(""),units:m.units.length,horses:m.horses.length,arrows:m.arrows.length,net:t&&{role:t.role,seats:t.seats,size:t.lastSize,hostPeer:t.hostPeer},teams:m.teams.map(n=>({p:Math.round(n.points),t:n.tickets,c:n.caps,g:Math.round(n.gold),alive:n.alive,h:n.human?1:0,plan:n.plan&&n.plan.kind,lead:n.leader&&{m:n.leader.mounted,dead:n.leader.dead}})),kinds:["foot","arch"].map(n=>m.units.filter(i=>!i.dead&&i.kind===n).length),flag:m.flag&&{s:m.flag.state},player:e&&{x:up(e.x),z:up(e.z),hp:Math.round(e.hp),mounted:e.mounted,dead:e.dead,id:e.id},gfx:{level:dt.level,setting:dt.setting,fps:Math.round(Of),calls:ei.info.render.calls,tris:ei.info.render.triangles,batches:US()}}},step(t,e=1/30,n){const i=n?Object.assign({wx:0,wz:0,mag:0,block:!1,attackHeld:!1,camYaw:0},n===!0?{}:n):null;for(let r=0;r<t&&m.state==="play";r++)Zp(e,i)},ride(){m.player&&(m.player.lastHit=-9,qr.ride())},volley(){qr.volley()},attack(){qr.attack()},jump(){qr.jump()},weapon(t){qr.weapon(t)},G:m,cam:ht,audio:()=>lT()};function Ih(){Wb(),ZS()}addEventListener("resize",Ih);pg("segFaction",fn.faction);pg("segColor",fn.color);xa();Nm();Ih();_a();dg();Io();requestAnimationFrame(gg);
