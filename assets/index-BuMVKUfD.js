var Tp=n=>{throw TypeError(n)};var bs=(n,e,t)=>e.has(n)?Tp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function Ap(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const le=[{name:"Blue",hex:3824880,css:"#3a5cf0",pos:[-56,56]},{name:"Red",hex:14693675,css:"#e0352b",pos:[56,-56]},{name:"Green",hex:3129158,css:"#2fbf46",pos:[-56,-56]},{name:"Yellow",hex:15778841,css:"#f0c419",pos:[56,56]}],as={roman:{name:"Romans",code:"r"},greek:{name:"Greeks",code:"g"},barbarian:{name:"Barbarians",code:"b"}},mc=["roman","greek","barbarian"],Cp=n=>mc.find(e=>as[e].code===n)||"roman",wp={ffa:[0,1,2,3],"2v2":[0,1,1,0],"2v1v1":[0,1,2,0],"3v1":[0,1,0,0]},Vh=["A","B","C","D"],vr={conquest:{name:"Conquest",time:600,title:"Castle Strength",desc:"Knock down every enemy castle. A castle only takes damage from fighters on foot."},dm:{name:"Deathmatch",time:480,title:"Tickets",desc:"Each team has 250 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold."},ctf:{name:"Capture the Fort",time:600,title:"Captures",desc:"A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins."}},ha={dunes:{id:"dunes",name:"Dune Field",desc:"Open sand and scattered fences. Straight fights.",sky:14472902,fog:[70,190],g1:13216120,g2:12096874,g3:11045474,hill:7234136,rock:9273716},river:{id:"river",name:"River Ford",desc:"A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.",sky:13622752,fog:[70,190],g1:8362572,g2:7113282,g3:6123328,hill:5990997,rock:9080198},forest:{id:"forest",name:"Pine Forest",desc:"Dense pine clusters. Trees stop arrows and hide ambushes.",sky:12175536,fog:[34,120],g1:5600058,g2:6455359,g3:4479023,hill:4082740,rock:8027248},frost:{id:"frost",name:"Frost Hill",desc:"A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.",sky:15002866,fog:[60,170],g1:15660022,g2:14147816,g3:12109006,hill:10135218,rock:9344668}},Wh=["captain","foot","spear","arch"],Jt={captain:{hp:150,dmg:22,reach:1.3,cd:.6,spd:5.4,r:.62,block:.3},foot:{hp:95,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.3,cost:40,name:"Footman"},spear:{hp:88,dmg:14,reach:2.4,cd:1.1,spd:5,r:.55,block:.08,cost:45,name:"Spearman"},arch:{hp:60,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,cost:50,name:"Archer",range:22,shoot:2.3,arrow:10}},Ul={dmg:30,spd:6.3},Xh=["foot","spear","arch"],jh=[{name:"Recruit",dmg:.7,income:8},{name:"Soldier",dmg:1,income:10},{name:"Warlord",dmg:1.25,income:12}],gc={humanIncome:10,startGold:60,aiRecruitEvery:[1.5,3]},Rp=["foot","foot","foot","foot","spear","spear","spear","arch","arch","arch"],Pp=["foot","foot","foot","foot","foot","foot","foot","foot","spear","spear","spear","spear","spear","spear","arch","arch","arch","arch","arch","arch"],Ds=["follow","hold","charge","testudo"],Wo={follow:"Follow me!",hold:"Hold here!",charge:"Charge!",testudo:"Testudo!"},Ai=[{id:"dmg",name:"Damage",desc:"+10% squad damage"},{id:"armor",name:"Armor",desc:"-10% damage to squad"},{id:"speed",name:"Speed",desc:"+6% squad speed"},{id:"aura",name:"Aura",desc:"Bigger, stronger aura"},{id:"horse",name:"Horse",desc:"Tougher, faster, back sooner"}],Lp=[80,140,220],qh=3,Xo={range:8,perRange:3,bonus:.1,perBonus:.05},Fs=9.5,Fi=11,Dp=120,Ip=20,$h=250,zs=3,oo=88,g={role:"solo",state:"title",mode:"conquest",map:ha.dunes,diff:1,preset:"ffa",ALLY:[0,1,2,3],myTi:0,factions:["roman","roman","roman","roman"],seed:1,T:0,units:[],horses:[],arrows:[],teams:[],flag:null,bounty:-1,player:null,layout:null,kills:0,recruited:0,uid:0,arrowN:0,horseN:0,endInfo:null,squadCap:20},Jn=(n,e)=>g.ALLY[n]!==g.ALLY[e],Ci=(n,e)=>g.ALLY[n.ti]!==g.ALLY[e.ti],qc=()=>new Set(g.ALLY).size===4,Ca={},xt={on(n,e){(Ca[n]||(Ca[n]=[])).push(e)},emit(n,e){const t=Ca[n];if(t)for(const i of t)i(e)}};function Ks(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Zt=(n,e,t)=>n<e?e:n>t?t:n,ue=(n,e)=>n+Math.random()*(e-n),Sr=(n,e)=>{let t=e-n;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t},cs=(n,e,t)=>n+Zt(Sr(n,e),-t,t);function Yh(n,e){return 7*Math.exp(-(n*n+e*e)/(2*20*20))}function _c(n){return Math.abs(n+32)<2.4||Math.abs(n-32)<2.4}function $c(n,e){return g.map.id==="river"&&Math.abs(e)<5&&Math.hypot(n,e)>=7}function Up(n,e){return $c(n,e)&&Math.abs(n)<14}function Ut(n,e){return g.map.id==="frost"?Yh(n,e):g.map.id==="river"&&Math.abs(e)<5.5&&Math.hypot(n,e)>=7?_c(n)?.38:-.45:0}function Kh(n,e){const t=Math.hypot(n,e),i=Math.sin(n*.07)*Math.cos(e*.05)+Math.sin(n*.023+e*.031)*1.4;let r=0;if(g.map.id==="frost"&&(r=Yh(n,e)),g.map.id==="river"){const s=Math.abs(e);s<7&&Math.hypot(n,e)>=7.5&&(r=s<5?-.95:-.95*(7-s)/2)}return t>92&&(r+=(t-92)*.25+Math.max(0,i)*((t-92)*.18)),r}function $i(n,e=0,t=0){const i=Math.hypot(n.pos[0],n.pos[1]),r=-n.pos[0]/i,s=-n.pos[1]/i;return[n.pos[0]+r*(Fs+2.5+t)+s*e,n.pos[1]+s*(Fs+2.5+t)-r*e]}function Yc(n,e,t){const i=Ks(t|0),r=(o,c)=>o+i()*(c-o),s={mapId:n,withFort:e,hills:[],palisades:[],rocks:[],trees:[],stones:[],obstacles:[],treeColliders:[],fortSegments:[]},a=(o,c,f=0)=>!le.some(l=>Math.hypot(l.pos[0]-o,l.pos[1]-c)<20+f)&&Math.hypot(o,c)>(e?12:8)+f&&!(n==="river"&&Math.abs(c)<9);for(let o=0;o<14;o++){const c=o/14*Math.PI*2+r(-.1,.1);s.hills.push({a:c,d:r(150,185),rad:r(18,34),sy:r(.35,.6)})}if(n==="dunes"){const o=[[-18,6,.4],[16,-8,-.3],[0,24,1.57],[0,-26,1.57],[-30,-8,.9],[30,10,.9],[-8,-40,0],[10,40,0]];for(const[c,f,l]of o){const h=[];for(let d=0;d<9;d++){const p=(d-4)*.66,x=c+Math.cos(l)*p,_=f-Math.sin(l)*p;h.push({x,z:_,rot:r(0,3),sy:r(.85,1.1)}),d%2===0&&s.obstacles.push({x,z:_,r:.75})}s.palisades.push({x:c,z:f,a:l,logs:h})}}if(n==="river")for(let o=0;o<22;o++){const c=r(-14,14),f=r(-4.5,4.5),l=r(.25,.5);Math.hypot(c,f)<7.5||s.stones.push({x:c,z:f,s:l})}if(n==="forest"){for(let o=0;o<16;o++){let c,f,l=0;do c=r(-82,82),f=r(-82,82),l++;while(!a(c,f,4)&&l<40);const h=5+Math.floor(i()*6);for(let d=0;d<h;d++){const p=c+r(-6,6),x=f+r(-6,6),_=r(.85,1.35);a(p,x)&&s.trees.push({x:p,z:x,s:_})}}for(let o=0;o<40;o++){const c=r(0,6.28),f=r(95,130);s.trees.push({x:Math.cos(c)*f,z:Math.sin(c)*f,s:r(1,1.6)})}for(const o of s.trees)Math.hypot(o.x,o.z)<90&&(s.obstacles.push({x:o.x,z:o.z,r:.7*o.s}),s.treeColliders.push({x:o.x,z:o.z,r:1.4*o.s}))}for(let o=0;o<(n==="forest"?10:20);o++){const c=r(-80,80),f=r(-80,80),l=r(.6,1.7),h=r(0,3),d=r(0,3);a(c,f)&&(s.rocks.push({x:c,z:f,r:l,rx:h,ry:d}),l>1.1&&s.obstacles.push({x:c,z:f,r:l*.9}))}for(const o of le)s.obstacles.push({x:o.pos[0],z:o.pos[1],r:Fs,castle:!0});if(e)for(let o=0;o<12;o++){if(o%3===0)continue;const c=o/12*Math.PI*2,f=Math.cos(c)*6,l=Math.sin(c)*6;s.fortSegments.push({a:c,x:f,z:l}),s.obstacles.push({x:f,z:l,r:1.3})}return s}const Bt=(n,...e)=>xt.emit("msg",{k:n,a:e}),Un=(n,e)=>xt.emit(n,e),ai=(n,e,t,i,r)=>Un("spark",{x:n,y:e,z:t,c:i,n:r}),Gt=(n,e,t)=>Un("sfx",{name:n,x:e,z:t});function Kc(n){return le.map((e,t)=>({points:100,tickets:$h,caps:0,gold:gc.startGold,alive:!0,plan:null,leaderDeadT:0,recruitT:ue(2,6),thinkT:0,human:!!n[t],order:"follow",holdPt:null,towerT:ue(0,1.4),leader:null,up:{dmg:0,armor:0,speed:0,aura:0,horse:0},arrowHits:0,testudoT:0,upT:ue(20,40)}))}function ls(n,e,t,i,r=!1){const s=Jt[i],a={id:++g.uid,ti:n,kind:i,leader:i==="captain",human:r,isMe:r&&n===g.myTi&&g.role!=="client",remote:r&&n!==g.myTi,x:e,z:t,y:Ut(e,t),vx:0,vz:0,vy:0,face:Math.atan2(-e,-t),hp:s.hp,max:s.hp,dmg:r?Ul.dmg:s.dmg,spd:r?Ul.spd:s.spd,r:s.r,reach:s.reach,cd:ue(0,.6),shootCd:ue(0,1.5),swing:0,pending:null,stun:0,blockT:0,rt:ue(0,.3),foe:null,fd:1e9,dead:!1,deadT:0,trampleT:0,lastHit:-9,blocking:!1,aim:!1,mounted:!1,horse:null,summon:null,horseHp:Js(n),horseCd:0,carrying:!1,aura:!1,testudo:!1,kick:{n:0,vx:0,vz:0,st:0,dirty:!1}};return g.units.push(a),a}const _s=n=>g.units.filter(e=>!e.dead&&e.ti===n&&!e.leader);function Np(n){g.layout=Yc(g.map.id,g.mode==="ctf",g.seed),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.uid=0,g.arrowN=0,g.endInfo=null,g.teams=Kc(n),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,le.forEach((e,t)=>{const[i,r]=$i(e,0,7);g.teams[t].leader=ls(t,i,r,"captain",g.teams[t].human),(g.fullSquads?Pp:Rp).slice(0,g.squadCap).forEach((a,o)=>{const[c,f]=$i(e,(o%7-3)*1.4,1.5+Math.floor(o/7)*1.4);ls(t,c,f,a)})}),g.player=g.teams[g.myTi].leader,g.state="play",Bt("start")}function kp(n,e){const t=g.teams[n];t.order=e;const i=t.leader;e==="hold"&&i&&(t.holdPt={x:i.x,z:i.z,face:i.face,isFront:!0})}function Jr(n){const e=g.teams[n];return g.mode==="conquest"?e.alive:g.mode==="dm"?e.tickets>0:!0}function Jc(n,e){const t=g.teams[n],i=Jt[e].cost;if(!Jr(n)||t.gold<i||_s(n).length>=g.squadCap)return!1;t.gold-=i;const[r,s]=$i(le[n],ue(-2,2));return ls(n,r,s,e),n===g.myTi&&(g.recruited++,Gt("coin")),!0}const Nn=(n,e)=>g.teams[n]&&g.teams[n].up?g.teams[n].up[e]:0,Js=n=>Dp+30*Nn(n,"horse"),jo=n=>Ip-4*Nn(n,"horse"),Jh=n=>Xo.range+Xo.perRange*Nn(n,"aura"),xc=n=>Xo.bonus+Xo.perBonus*Nn(n,"aura"),Bs=(n,e)=>Nn(n,e)>=qh?null:Lp[Nn(n,e)];function Zc(n,e){const t=g.teams[n],i=Bs(n,e);return!t||i==null||t.gold<i||!Ai.some(r=>r.id===e)?!1:(t.gold-=i,t.up[e]++,e==="horse"&&t.leader&&!t.leader.mounted&&(t.leader.horseHp=Js(n)),e==="horse"&&t.leader&&t.leader.horseCd>jo(n)&&(t.leader.horseCd=jo(n)),n===g.myTi&&(Gt("coin"),Bt("upgrade",n,e,t.up[e])),!0)}const Zh=n=>{const e=g.teams[n],t=e.leader,i=t&&!t.dead;return e.human?e.order||"follow":e.testudoT>0&&i?"testudo":i?"follow":"charge"};function Qh(n){const e=g.teams[n];return g.mode==="conquest"?e.alive:g.mode==="dm"?e.tickets>0:!0}function da(n,e,t,i){n.remote?(n.kick.vx+=e,n.kick.vz+=t,n.kick.st=Math.max(n.kick.st,i||0),n.kick.dirty=!0):(n.vx+=e,n.vz+=t),i&&(n.stun=Math.max(n.stun,i))}function zi(n){let e=n.spd;return n.mounted&&(e*=1.8*(1+.05*Nn(n.ti,"horse"))),n.leader||(e*=1+.06*Nn(n.ti,"speed"),n.aura&&(e*=1+xc(n.ti)*.5),n.testudo&&(e*=.6)),n.carrying&&(e*=.7),Up(n.x,n.z)&&(e*=.6),n.human&&n.blocking&&!n.mounted&&(e*=.5),e}function ed(n){if(n.mounted||n.summon||n.horseCd>0||n.dead||n.carrying||g.T-n.lastHit<2)return!1;const e=n.face+Math.PI+ue(-.6,.6),t=Zt(n.x+Math.sin(e)*14,-86,86),i=Zt(n.z+Math.cos(e)*14,-86,86),r={id:++g.horseN,x:t,z:i,face:Math.atan2(n.x-t,n.z-i),state:"coming",rider:n,t:0,spd:0,ti:n.ti,fall:1};return g.horses.push(r),n.summon=r,n.isMe&&Gt("neigh"),!0}function Op(n,e){n.summon=null,n.mounted=!0,n.horse=e,e.state="ridden",n.r=.95,n.isMe&&Un("float",{x:n.x,y:n.y+3.4,z:n.z,text:"Mounted",color:"#fff"})}function yr(n,e){if(!n.mounted)return;const t=n.horse;n.mounted=!1,n.horse=null,n.r=Jt.captain.r,e?(t.state="dead",t.t=0,t.fall=Math.random()<.5?1:-1,n.horseCd=jo(n.ti),n.horseHp=Js(n.ti),da(n,Math.sin(n.face+Math.PI/2)*5,Math.cos(n.face+Math.PI/2)*5,1),n.human&&Bt("horseDown",n.ti)):(t.state="leaving",t.t=0)}function Qc(n,e){n.horseHp-=e,ai(n.x,n.y+1.3,n.z,"#d42a1e",5),Gt("hit",n.x,n.z),n.horseHp<=0&&yr(n,!0)}const td=(n,e)=>g.units.some(t=>!t.dead&&Ci(t,n)&&t.kind==="spear"&&Math.hypot(t.x-n.x,t.z-n.z)<e),nd=n=>n.kind==="spear"&&n.stun<=0&&Math.hypot(n.vx,n.vz)<2.2;function id(n){if(!(!n||n.dead)){if(n.mounted){yr(n,!1);return}if(!n.summon){if(n.carrying){Bt("rideNo",n.ti,"banner");return}if(n.horseCd>0){Bt("rideNo",n.ti,"rest",Math.ceil(n.horseCd));return}if(g.T-n.lastHit<2){Bt("rideNo",n.ti,"hot");return}ed(n)}}}function vi(n,e,t){let i=null,r=e*e;for(const s of g.units){if(s.dead||!Ci(s,n)||t&&!t(s))continue;const a=s.x-n.x,o=s.z-n.z,c=a*a+o*o;c<r&&(r=c,i=s)}return[i,Math.sqrt(r)]}function rd(n){if(g.mode!=="conquest")return[-1,1e9];let e=-1,t=1e9;return g.teams.forEach((i,r)=>{if(!Jn(r,n.ti)||!i.alive)return;const s=Math.hypot(le[r].pos[0]-n.x,le[r].pos[1]-n.z);s<t&&(t=s,e=r)}),[e,t]}const el=n=>g.teams[n]&&g.teams[n].human?1:jh[g.diff].dmg;function Vn(n,e){return n.cd>0||n.stun>0||n.dead||n.carrying?!1:(n.swing=.38,n.cd=(n.leader?n.mounted?.8:.6:Jt[n.kind].cd)*ue(.9,1.15),n.pending={t:.15,target:e},Gt("swing",n.x,n.z),!0)}function sd(n){n.cd>0||n.stun>0||n.dead||(n.swing=.38,n.cd=.8,n.pending={t:.15,sweep:!0},Gt("swing",n.x,n.z))}function Fp(n){const e=n.pending,t=e.target;if(n.pending=null,e.sweep){const i=.8*(1+Math.hypot(n.vx,n.vz)/12);for(const r of g.units)r.dead||!Ci(r,n)||Math.hypot(r.x-n.x,r.z-n.z)>3.1||Math.abs(Sr(n.face,Math.atan2(r.x-n.x,r.z-n.z)))>1.25||Nl(n,r,i);return}if(t&&t.castle!==void 0){const i=g.teams[t.castle];if(!i.alive||n.mounted||!Jn(t.castle,n.ti)||Math.hypot(le[t.castle].pos[0]-n.x,le[t.castle].pos[1]-n.z)>Fi+.8)return;i.points-=n.human?1.3:n.leader?.7:n.kind==="arch"?.08:.2,Gt("wall",n.x,n.z),ai(n.x+Math.sin(n.face)*1.2,1.4,n.z+Math.cos(n.face)*1.2,"#cfc8b8",5),i.points<=0&&Bp(t.castle,n.ti);return}!t||t.dead||Math.hypot(t.x-n.x,t.z-n.z)>n.r+t.r+n.reach+.5||Nl(n,t,1)}function Nl(n,e,t=1){if(!Ci(n,e))return;let i=n.dmg*ue(.8,1.2)*t*el(n.ti);if(n.leader||(i*=1+.1*Nn(n.ti,"dmg"),n.aura&&(i*=1+xc(n.ti))),e.leader||(i*=1-.1*Nn(e.ti,"armor")),n.kind==="spear"&&e.kind==="foot"&&(i*=1.3),n.kind==="spear"&&e.leader&&(i*=1.4),n.kind==="foot"&&e.kind==="arch"&&(i*=1.4),g.map.id==="frost"&&n.y-e.y>.8&&(i*=1.2),e.lastHit=g.T,e.mounted&&(n.kind==="spear"||Math.random()<.5)){Qc(e,i*(n.kind==="spear"?3:1));return}let r=n.leader?n.mounted?9:7:4.5;const s=Math.abs(Sr(e.face,Math.atan2(n.x-e.x,n.z-e.z)))<1.1;let a=!1;s&&e.stun<=0&&!e.mounted&&!e.carrying&&(e.human?a=e.blocking:Math.random()<Jt[e.kind].block+(e.aura?xc(e.ti):0)+(e.testudo&&e.kind==="foot"?.3:0)&&(a=!0,e.blockT=.45));const o=(n.x+e.x)/2,c=(n.z+e.z)/2,f=(n.y+e.y)/2+1.2;a?(i*=e.human?.12:.25,r*=.4,ai(o,f,c,"#fff3b0",7),Gt("clang",o,c),e.blockT=Math.max(e.blockT,.2),e.isMe&&Un("buzz",15)):(ai(o,f,c,le[e.ti].css,6),Gt("hit",o,c),Math.random()<.4&&Un("splat",{x:e.x+ue(-.4,.4),z:e.z+ue(-.4,.4),s:ue(.6,1.1),ti:e.ti}),e.isMe&&(Un("shake",.35),Un("buzz",35))),e.hp-=i;const l=Math.atan2(e.x-n.x,e.z-n.z);da(e,Math.sin(l)*r,Math.cos(l)*r,a?0:.22),e.hp<=0&&tl(e,n,l)}function od(n,e,t=1.6){const i=.35+Math.hypot(e.x-n.x,e.z-n.z)/30,r=e.x+e.vx*i+ue(-.8,.8),s=e.z+e.vz*i+ue(-.8,.8),a=Math.hypot(r-n.x,s-n.z),o=(n.y||0)+t;g.arrows.push(ad({id:++g.arrowN,x0:n.x,y0:o,z0:n.z,x1:r,z1:s,y1:Ut(r,s)+1.1,dur:.25+a/28,peak:Math.min(6,a*.16),ti:n.ti,t:0,shooter:n})),n.tower||(n.swing=.38),Gt("bow",n.x,n.z)}function ad(n){return n.x=n.x0,n.y=n.y0,n.z=n.z0,n.px=n.x0,n.py=n.y0,n.pz=n.z0,n}function zp(n,e){let t=Jt.arch.arrow*ue(.8,1.2)*el(n.ti);if(e.kind==="spear"&&(t*=1.5),e.leader||(t*=1-.1*Nn(e.ti,"armor")),n.shooter&&!n.shooter.tower&&(t*=1+.1*Nn(n.ti,"dmg")),g.teams[e.ti]&&g.teams[e.ti].arrowHits++,e.testudo&&(e.kind==="foot"||Math.random()<.6)){ai(e.x,e.y+2.2,e.z,"#e8d9b0",4),Gt("thud",e.x,e.z);return}if(e.lastHit=g.T,e.mounted&&Math.random()<.6){Qc(e,t);return}const i=Math.abs(Sr(e.face,Math.atan2(n.x0-e.x,n.z0-e.z)))<1.1;let r=!1;if(i&&!e.mounted&&!e.carrying&&(e.kind==="foot"&&Math.random()<.7&&(r=!0),e.leader&&(e.human?e.blocking:Math.random()<.35)&&(r=!0)),r){ai(e.x,e.y+1.3,e.z,"#e8d9b0",4),Gt("thud",e.x,e.z),e.blockT=Math.max(e.blockT,.2);return}e.hp-=t,ai(e.x,e.y+1.3,e.z,le[e.ti].css,4),Gt("hit",e.x,e.z),da(e,0,0,.12),e.isMe&&(Un("shake",.25),Un("buzz",20));const s=n.shooter;e.hp<=0&&tl(e,s&&!s.dead&&!s.tower?s:{ti:n.ti,human:!1},Math.atan2(e.x-n.x0,e.z-n.z0))}function tl(n,e,t){if(n.dead)return;n.dead=!0,n.deadT=0,n.vx+=Math.sin(t)*6,n.vz+=Math.cos(t)*6,n.vy=ue(3,6),n.fallDir=Math.random()<.5?1:-1,Un("splat",{x:n.x,z:n.z,s:ue(1,1.5),ti:n.ti}),Gt("die",n.x,n.z),n.mounted&&yr(n,!1),n.summon&&(n.summon.state="leaving",n.summon.t=0,n.summon=null),n.carrying&&Vp(n);const i=g.teams[n.ti];if(g.mode==="dm"&&(i.tickets=Math.max(0,i.tickets-(n.leader?5:1)),i.tickets<=0&&i.alive&&(i.alive=!1,Bt("tickets0",n.ti))),e){const r=g.mode==="dm"&&n.leader&&n.ti===g.bounty,s=n.leader?r?50:25:8;g.teams[e.ti].gold+=s,e.human&&e.ti===g.myTi&&g.kills++,e.human&&Bt("gold",e.ti,Math.round(n.x*10)/10,Math.round(n.z*10)/10,s),r&&Bt("bountyClaimed",e.ti),n.leader&&Bt("capDown",n.ti,e.ti)}n.leader&&(i.leaderDeadT=n.human?5:9,n.human&&Bt("fell",n.ti,Qh(n.ti)?1:0)),nl()}function Bp(n,e){const t=g.teams[n];t.alive=!1,t.points=0,Bt("castleDown",n,e),nl()}function cd(n){const e=g.teams[n];return g.mode==="conquest"?!e.alive:g.mode==="dm"?!e.alive&&!g.units.some(t=>!t.dead&&t.ti===n):!1}const ld=n=>{const e=g.teams[n];return g.mode==="conquest"?e.points:g.mode==="dm"?e.tickets:e.caps},fd=n=>g.teams.reduce((e,t,i)=>e+(g.ALLY[i]===n?t.caps:0),0),Hp=()=>[...new Set(le.map((n,e)=>e).filter(n=>!cd(n)).map(n=>g.ALLY[n]))];function nl(){if(!(g.state!=="play"||g.role==="client")){if(g.mode==="conquest"||g.mode==="dm"){const n=Hp();if(n.length===1)return pr(n[0],g.mode==="conquest"?"castles":"tickets");if(n.length===0)return pr(-1,"time")}if(g.mode==="ctf"){for(const n of new Set(g.ALLY))if(fd(n)>=zs)return pr(n,"caps")}}}function Gp(){if(g.state!=="play"||g.T<vr[g.mode].time)return;const n={};le.forEach((t,i)=>{g.mode==="conquest"&&!g.teams[i].alive||(n[g.ALLY[i]]=(n[g.ALLY[i]]||0)+ld(i))});const e=Object.entries(n).map(([t,i])=>[+t,i]).sort((t,i)=>i[1]-t[1]);if(!e.length||e.length>1&&e[0][1]===e[1][1])return pr(-1,"time");pr(e[0][0],"time")}function pr(n,e){g.state==="play"&&(g.state="end",g.endInfo={w:n,why:e},xt.emit("end",g.endInfo))}function Vp(n){const e=g.flag;n.carrying=!1,e.state="dropped",e.carrier=null,e.x=n.x,e.z=n.z,e.dropT=10,Bt("flagDropped",n.ti)}function Wp(n){const e=g.flag;if(e){if(e.state==="carried"){const t=e.carrier,i=le[t.ti];Math.hypot(t.x-i.pos[0],t.z-i.pos[1])<Fs+3.5&&(g.teams[t.ti].caps++,g.teams[t.ti].gold+=50,t.carrying=!1,e.state="home",e.carrier=null,e.x=0,e.z=0,Bt("capture",t.ti),g.teams.forEach(r=>r.thinkT=0),nl());return}e.state==="dropped"&&(e.dropT-=n,e.dropT<=0&&(e.state="home",e.x=0,e.z=0,Bt("flagHome")));for(const t of g.units)if(!(t.dead||!t.leader||Math.hypot(t.x-e.x,t.z-e.z)>=1.9)){if(t.mounted){t.isMe&&Un("hint","Get off your horse to take it");continue}t.summon&&(t.summon.state="leaving",t.summon.t=0,t.summon=null),t.carrying=!0,e.state="carried",e.carrier=t,g.teams.forEach(i=>i.thinkT=0),Bt("flagTaken",t.ti);break}}}function hd(n){let e=null,t=1e9;for(const i of g.units){if(i.dead||!Ci(i,n))continue;const r=Math.hypot(i.x-n.x,i.z-n.z);if(r>3.4)continue;const s=r+Math.abs(Sr(n.face,Math.atan2(i.x-n.x,i.z-n.z)))*1.5;s<t&&(t=s,e=i)}return e}function il(n){if(!n||n.dead||n.carrying)return;if(n.mounted){sd(n);return}const e=hd(n);if(e){Vn(n,e)&&(n.face=Math.atan2(e.x-n.x,e.z-n.z));return}const[t,i]=rd(n);if(t>=0&&i<Fi+.6){Vn(n,{castle:t})&&(n.face=Math.atan2(le[t].pos[0]-n.x,le[t].pos[1]-n.z));return}Vn(n,null)}function Xp(n,e,t){const i=l=>l<5.2,r=Math.hypot(n.x,n.z),s=Math.hypot(e,t);if(i(r)===i(s))return null;const a=i(r)?[e,t]:[n.x,n.z],o=Math.round(Math.atan2(a[1],a[0])/(Math.PI/2))*(Math.PI/2),c=Math.cos(o),f=Math.sin(o);return i(r)?[c*8.5,f*8.5]:Math.abs(-n.x*f+n.z*c)>.9?[c*8.5,f*8.5]:[e,t]}function jp(n,e,t){if(g.layout.withFort&&Math.hypot(n.x,n.z)<14){const f=Xp(n,e,t);if(f)return f}if(g.map.id!=="river")return[e,t];const i=f=>f>5?1:f<-5?-1:0,r=i(n.z),s=i(t);if(r===s)return[e,t];let a=-32,o=1e9;for(const f of[-32,0,32]){const l=Math.abs(n.x-f)+Math.abs(e-f);l<o&&(o=l,a=f)}const c=a===0?9:1.4;if(r!==0){const f=a+Zt(n.x-a,-c*.6,c*.6);return Math.abs(n.x-a)>c?[f,r*6.5]:[f,-r*6.5]}return[Zt(n.x,a-c*.8,a+c*.8),(s||1)*6.5]}function ki(n,e,t,i,r,s=.3){const a=e-n.x,o=t-n.z,c=Math.hypot(a,o);let f=0,l=0;if(c>s){const d=i*Math.min(1,(c-s)/1.2+.2);f=a/c*d,l=o/c*d}const h=n.stun>0?1.5:n.mounted?4:10;return n.vx+=(f-n.vx)*Math.min(1,r*h),n.vz+=(l-n.vz)*Math.min(1,r*h),c}const Pn=(n,e,t,i,r=9)=>{n.face=cs(n.face,Math.atan2(e-n.x,t-n.z),i*r)};function Rn(n,e,t,i,r,s=.3){const[a,o]=jp(n,e,t);return ki(n,a,o,i,r,a===e&&o===t?s:.2),Math.hypot(a-n.x,o-n.z)>.6&&Pn(n,a,o,r,n.mounted?4:8),Math.hypot(e-n.x,t-n.z)}function qp(n,e){const t=le[n.ti],i=_s(n.ti).length;if(g.mode==="conquest"){const r=g.units.some(o=>!o.dead&&Ci(o,n)&&Math.hypot(o.x-t.pos[0],o.z-t.pos[1])<22),s=e.plan&&e.plan.kind==="castle"?4:11;if(e.alive&&(r||i<s)){e.plan={kind:"defend"};return}let a=e.plan&&e.plan.kind==="castle"&&g.teams[e.plan.ti].alive&&Math.random()>.08?e.plan.ti:null;if(a==null){const o=g.teams.map((c,f)=>f).filter(c=>Jn(c,n.ti)&&g.teams[c].alive).sort((c,f)=>Math.hypot(le[c].pos[0]-n.x,le[c].pos[1]-n.z)-Math.hypot(le[f].pos[0]-n.x,le[f].pos[1]-n.z));o.length&&(a=o[Math.random()<.7?0:Math.min(1,o.length-1)])}e.plan=a==null?{kind:"defend"}:{kind:"castle",ti:a}}else if(g.mode==="dm"){const r=e.plan&&e.plan.kind==="hunt"?3:9;if(i<r&&e.tickets>0){e.plan={kind:"defend"};return}const[s]=vi(n,400,c=>c.leader),[a]=vi(n,400),o=g.bounty>=0&&Jn(g.bounty,n.ti)&&Math.random()<.5?g.teams[g.bounty].leader:null;e.plan={kind:"hunt",target:o&&!o.dead?o:s||a}}else{const r=g.flag;n.carrying?e.plan={kind:"home"}:r.state==="carried"?e.plan={kind:Ci(r.carrier,n)?"hunt":"escort",target:r.carrier}:e.plan={kind:"banner"}}}function $p(n,e){const t=e.plan;if(!t)return null;const i=le[n.ti];switch(t.kind){case"defend":{const[r,s]=$i(i,0,1);return{x:r,z:s,stop:1.5}}case"castle":return{x:le[t.ti].pos[0],z:le[t.ti].pos[1],stop:Fi-.8,castle:t.ti};case"hunt":case"escort":return t.target&&!t.target.dead?{x:t.target.x,z:t.target.z,stop:t.kind==="escort"?3:1.5}:null;case"home":{const[r,s]=$i(i);return{x:r,z:s,stop:.5}}case"banner":return{x:g.flag.x,z:g.flag.z,stop:.2}}return null}function Yp(n,e){if(n.carrying){n.mounted&&yr(n,!1);return}!n.mounted&&!n.summon&&e>30&&!(n.foe&&n.fd<14)&&ed(n);const t=g.teams[n.ti].plan&&g.teams[n.ti].plan.kind;n.mounted&&(e<(t==="hunt"?6:12)||td(n,g.diff===2?11:7))&&yr(n,!1)}function Kp(n,e,t){e.thinkT-=t,(e.thinkT<=0||!e.plan)&&(e.thinkT=ue(1.2,2.4),qp(n,e));const i=n.foe,r=n.fd;if(i&&r<(n.mounted?12:10)&&!n.carrying&&!(e.plan&&e.plan.kind==="escort"&&r>5)){if(n.mounted){td(n,7)&&yr(n,!1);const o=1/Math.max(r,.1);Rn(n,i.x+(i.x-n.x)*o*4,i.z+(i.z-n.z)*o*4,zi(n),t,.1),r<3&&sd(n)}else Rn(n,i.x,i.z,zi(n),t,n.r+i.r+n.reach*.6),Pn(n,i.x,i.z,t),r<n.r+i.r+n.reach&&Vn(n,i);return}const s=$p(n,e);if(!s){ki(n,n.x,n.z,0,t),e.thinkT=Math.min(e.thinkT,.3);return}Yp(n,Math.hypot(s.x-n.x,s.z-n.z));const a=Rn(n,s.x,s.z,zi(n),t,s.stop);s.castle!=null?a<Fi&&!n.mounted&&(Pn(n,s.x,s.z,t,6),Vn(n,{castle:s.castle})):e.plan.kind==="defend"&&a<2&&Pn(n,0,0,t,3)}function Jp(n,e,t,i,r){const a=Math.floor(t/5),o=(t%5-2)*1.45,c=i?e?2+a*1.5:1.8+Math.ceil(r/5)*1.5+a*1.5:e?-(2.2+a*1.5):1.8+a*1.5,f=n.face,l=Math.sin(f),h=Math.cos(f),d=Math.cos(f),p=-Math.sin(f);return[n.x-l*c+d*o,n.z-h*c+p*o]}function Zp(n,e,t){const i=Math.floor(t/5),r=(t%5-2)*1.02,s=e?-(1.6+i*1.05):1.6+i*1.05,a=n.face,o=Math.sin(a),c=Math.cos(a),f=Math.cos(a),l=-Math.sin(a);return[n.x-o*s+f*r,n.z-c*s+l*r]}function Qp(n,e){const t=g.teams[n.ti],i=t.leader,r=i&&!i.dead,s=Zh(n.ti),a=Jt[n.kind];if(s==="testudo"&&r){n.aim=!1;const _=n.foe;_&&n.fd<n.r+_.r+n.reach&&(Pn(n,_.x,_.z,e),Vn(n,_));const[m,u]=Zp(i,!!i.human,n.tslot||0);Rn(n,m,u,zi(n)*(Math.hypot(m-n.x,u-n.z)>5?1.5:1),e,.15)<1&&!(_&&n.fd<3)&&(n.face=cs(n.face,i.face,e*6));return}const o=n.kind==="arch"?a.range*(g.map.id==="frost"&&n.y>3?1.3:1):0;if(n.aim=!1,n.kind==="spear"&&s!=="charge"){const[_,m]=vi(n,9,u=>u.mounted);if(_){ki(n,n.x,n.z,0,e),Pn(n,_.x,_.z,e,10),m<n.r+_.r+n.reach&&Vn(n,_);return}}const c=s==="charge"?45:n.kind==="arch"?o:s==="hold"?8:10,f=n.foe,l=n.fd,h=s==="follow"&&r&&f&&Math.hypot(f.x-i.x,f.z-i.z)>18;if(f&&l<c&&!h){n.kind==="arch"?l<n.r+f.r+n.reach?(Vn(n,f),Pn(n,f.x,f.z,e),ki(n,n.x,n.z,0,e)):l<5.5?(ki(n,n.x-(f.x-n.x),n.z-(f.z-n.z),n.spd,e),Pn(n,f.x,f.z,e,6)):l<=o?(n.aim=!0,ki(n,n.x,n.z,0,e),Pn(n,f.x,f.z,e,8),n.shootCd<=0&&n.stun<=0&&Math.abs(Sr(n.face,Math.atan2(f.x-n.x,f.z-n.z)))<.3&&(od(n,f),n.shootCd=a.shoot*ue(.85,1.2))):Rn(n,f.x,f.z,zi(n),e,o*.8):(Rn(n,f.x,f.z,zi(n),e,n.r+f.r+n.reach*.7),Pn(n,f.x,f.z,e),l<n.r+f.r+n.reach&&Vn(n,f));return}const[d,p]=rd(n);if(s==="charge"){if(g.mode==="conquest"&&d>=0){const _=le[d].pos;Rn(n,_[0],_[1],n.spd,e,Fi-1),p<Fi&&(Pn(n,_[0],_[1],e,6),Vn(n,{castle:d}))}else if(g.mode==="ctf"){const _=g.flag,m=_.state==="carried"&&Ci(_.carrier,n)?_.carrier:_;Rn(n,m.x,m.z,n.spd,e,1)}else{const[_]=vi(n,300);_?Rn(n,_.x,_.z,n.spd,e,1):Rn(n,0,0,n.spd,e,4)}return}if(g.mode==="conquest"&&d>=0&&p<Fi&&s==="follow"&&r&&!i.mounted&&Math.hypot(i.x-le[d].pos[0],i.z-le[d].pos[1])<Fi+6){Pn(n,le[d].pos[0],le[d].pos[1],e,6),ki(n,n.x,n.z,0,e),Vn(n,{castle:d});return}const x=s==="hold"&&t.holdPt?t.holdPt:r?i:null;if(x){const[_,m]=Jp(x,x.isFront||!!x.human,n.slot||0,n.kind==="arch",n.meleeN||0);Rn(n,_,m,zi(n)*(Math.hypot(_-n.x,m-n.z)>6?1.15:1),e)<1&&(n.face=cs(n.face,x.face,e*6))}else{const[_,m]=$i(le[n.ti],0,2);Rn(n,_,m,n.spd,e,3)}}function em(n){const e=Math.random();if(g.diff===2){const t=le.map((c,f)=>f).filter(c=>g.teams[c].human&&Jn(c,n)),i=t.flatMap(c=>_s(c)),r=c=>i.filter(f=>f.kind===c).length,s=r("foot"),a=r("spear"),o=r("arch");return t.some(c=>g.teams[c].leader&&g.teams[c].leader.mounted)&&e<.5?"spear":o>=s&&o>=a?e<.7?"foot":"spear":s>=a?e<.7?"spear":"arch":e<.7?"arch":"foot"}return e<.45?"foot":e<.75?"spear":"arch"}function dd(n,e,t){n.x+=n.vx*e,n.z+=n.vz*e;for(const i of g.layout.obstacles){const r=n.x-i.x,s=n.z-i.z,a=i.r+n.r;if(Math.abs(r)>a||Math.abs(s)>a)continue;const o=Math.hypot(r,s);o<a&&o>0&&(n.x=i.x+r/o*a,n.z=i.z+s/o*a)}if(g.map.id==="river"&&($c(n.x,n.z)&&!_c(n.x)&&Math.abs(n.x)>=14&&(n.z=(t>=0?1:-1)*5.05),Math.abs(n.z)<5&&_c(n.x)&&Math.abs(n.x)>20)){const i=n.x<0?-32:32;n.x=Zt(n.x,i-2.1,i+2.1)}n.x=Zt(n.x,-oo,oo),n.z=Zt(n.z,-oo,oo),n.y=Ut(n.x,n.z)}function ud(n,e,t){n.blocking=!!e.block&&!n.mounted;const i=zi(n)*(n.swing>0&&!n.mounted?.6:1);ki(n,n.x+e.wx*3,n.z+e.wz*3,i*e.mag,t,.05),e.mag>.15&&(n.swing<=0||n.mounted)&&(n.face=cs(n.face,Math.atan2(e.wx,e.wz),t*(n.mounted?4.5:n.blocking?5:12))),n.blocking&&e.mag<.15&&(n.face=cs(n.face,e.camYaw,t*6))}function pd(n,e){if(g.T+=n,g.teams.forEach((l,h)=>{if(Jr(h)&&(l.gold+=n*(l.human?gc.humanIncome:jh[g.diff].income)),!l.human&&Jr(h)&&(l.recruitT-=n,l.recruitT<=0&&(l.recruitT=ue(...gc.aiRecruitEvery),Jc(h,em(h)))),!l.human){if(l.upT-=n,l.upT<=0&&(l.upT=ue(6,12),_s(h).length>=g.squadCap-3||!Jr(h))){const d=Ai.map(p=>p.id).filter(p=>Bs(h,p)!=null&&l.gold>=Bs(h,p)+30);d.length&&Zc(h,d[Math.floor(Math.random()*d.length)])}if(l.arrowHits=Math.max(0,l.arrowHits-n*.6),l.testudoT-=n,l.arrowHits>=4&&l.testudoT<=0&&l.leader&&!l.leader.dead){const[d]=vi(l.leader,9,p=>p.kind!=="arch");d||(l.testudoT=7,l.arrowHits=0)}if(l.testudoT>0&&l.leader&&!l.leader.dead){const[d]=vi(l.leader,5,p=>p.kind!=="arch");d&&(l.testudoT=0)}}if(l.leader.dead&&Qh(h)&&(l.leaderDeadT-=n,l.leaderDeadT<=0)){const[d,p]=$i(le[h],0,7),x=ls(h,d,p,"captain",l.human);l.leader=x,l.plan=null,h===g.myTi&&(g.player=x,xt.emit("respawnMe",x)),l.human&&Bt("respawn",h)}}),g.mode==="dm"){const l=g.teams.map((d,p)=>[d.tickets,p]).filter(d=>g.teams[d[1]].alive).sort((d,p)=>p[0]-d[0]),h=l.length>1&&l[0][0]-l[1][0]>=10?l[0][1]:-1;h!==g.bounty&&(g.bounty=h,h>=0&&Bt("bounty",h))}const t=g.player;t&&!t.dead&&e&&(ud(t,e,n),e.attackHeld&&t.cd<=0&&il(t));for(const l of g.teams){const h=l.leader;if(h&&h.human&&!h.dead){const[d]=vi(h,12);!d&&h.hp<h.max&&(h.hp=Math.min(h.max,h.hp+n*6))}}const i=[0,0,0,0],r=[0,0,0,0],s=[0,0,0,0],a=[0,0,0,0],o=g.teams.map((l,h)=>Zh(h)),c=g.teams.map((l,h)=>Jh(h)**2);for(const l of g.units){if(l.dead||l.leader)continue;l.kind!=="arch"&&s[l.ti]++;const h=g.teams[l.ti].leader,d=h?h.x-l.x:0,p=h?h.z-l.z:0;l.aura=!!h&&!h.dead&&d*d+p*p<c[l.ti],l.testudo=o[l.ti]==="testudo";const x=l.kind==="foot"?0:l.kind==="spear"?1:2;l.tkey=g.teams[l.ti].human?2-x:x}for(const l of[0,1,2])for(const h of g.units)!h.dead&&!h.leader&&h.tkey===l&&(h.tslot=a[h.ti]++);for(const l of g.units)l.dead||(l.cd-=n,l.shootCd-=n,l.stun-=n,l.blockT-=n,l.rt-=n,l.trampleT-=n,l.horseCd>0&&(l.horseCd-=n),l.swing>0&&(l.swing-=n),l.pending&&(l.pending.t-=n,l.pending.t<=0&&Fp(l)),l.rt<=0&&(l.rt=ue(.25,.4),[l.foe,l.fd]=vi(l,50)),l.foe&&l.foe.dead&&(l.foe=null,l.fd=1e9),l.foe&&(l.fd=Math.hypot(l.foe.x-l.x,l.foe.z-l.z)),!(l.human||l.dead)&&(l.leader?Kp(l,g.teams[l.ti],n):(l.slot=l.kind==="arch"?r[l.ti]++:i[l.ti]++,l.meleeN=s[l.ti],Qp(l,n))));for(const l of g.horses)if(l.t+=n,l.state==="coming"){const h=l.rider;if(h.dead||h.summon!==l){l.state="leaving",l.t=0;continue}const d=h.x-l.x,p=h.z-l.z,x=Math.hypot(d,p)||.01;l.face=Math.atan2(d,p);const _=Math.min(16,x*4);l.x+=d/x*_*n,l.z+=p/x*_*n,l.spd=_,x<1.3&&Op(h,l)}else if(l.state==="ridden"){const h=l.rider;l.x=h.x,l.z=h.z,l.face=h.face,l.spd=Math.hypot(h.vx,h.vz)}else l.state==="leaving"&&(l.x+=Math.sin(l.face)*10*n,l.z+=Math.cos(l.face)*10*n,l.spd=10);g.horses=g.horses.filter(l=>!(l.state==="leaving"&&l.t>3||l.state==="dead"&&l.t>8));for(const l of g.units){if(l.dead||!l.mounted)continue;const h=Math.hypot(l.vx,l.vz);for(const d of g.units){if(d.dead||!Ci(d,l)||d.mounted)continue;const p=d.x-l.x,x=d.z-l.z;if(Math.abs(p)>4||Math.abs(x)>4)continue;const _=Math.hypot(p,x);if(d.kind==="spear"&&_<d.r+l.r+1.6&&nd(d)&&h>4&&Math.abs(Sr(d.face,Math.atan2(l.x-d.x,l.z-d.z)))<1){Qc(l,55),l.mounted&&yr(l,!0),ai(d.x,d.y+1.5,d.z,"#fff3b0",8),Gt("clang",d.x,d.z),Un("float",{x:d.x,y:d.y+2.8,z:d.z,text:"Spear wall!",color:le[d.ti].css});break}if(h>6&&_<d.r+l.r+.3&&d.trampleT<=0){d.trampleT=.8,d.lastHit=g.T;const m=Math.atan2(p,x);da(d,Math.sin(m)*10+l.vx*.5,Math.cos(m)*10+l.vz*.5,.7),d.hp-=12*el(l.ti),ai(d.x,d.y+1,d.z,"#c9b28a",6),Gt("trample",d.x,d.z),d.hp<=0&&tl(d,l,m)}}Math.random()<n*h*.9&&Gt("hoof",l.x,l.z)}const f=g.units.filter(l=>!l.dead);for(let l=0;l<f.length;l++){const h=f[l];for(let d=l+1;d<f.length;d++){const p=f[d],x=p.x-h.x,_=p.z-h.z,m=h.r+p.r;if(x>m||x<-m||_>m||_<-m)continue;const u=Math.hypot(x,_)||.01;if(u>=m)continue;const v=(m-u)/2,M=x/u,E=_/u;let R=h.remote?0:h.human||h.mounted?.4:1,C=p.remote?0:p.human||p.mounted?.4:1;R===0&&(C=2),C===0&&(R=2),h.x-=M*v*R,h.z-=E*v*R,p.x+=M*v*C,p.z+=E*v*C}}for(const l of g.units){if(l.dead){rl(l,n);continue}if(l.remote){l.y=Ut(l.x,l.z);continue}dd(l,n,l.z)}g.units=g.units.filter(l=>!(l.dead&&l.deadT>14)),le.forEach((l,h)=>{const d=g.teams[h];if(g.mode==="conquest"&&!d.alive||(d.towerT-=n,d.towerT>0))return;d.towerT=1.4;const[p]=vi({x:l.pos[0],z:l.pos[1],ti:h},24);p&&od({x:l.pos[0],z:l.pos[1],y:0,vx:0,vz:0,ti:h,tower:!0},p,5.5)}),md(n,!0),Wp(n),Gp()}function rl(n,e){n.deadT+=e,n.x+=n.vx*e,n.z+=n.vz*e,n.vy-=18*e;const t=Ut(n.x,n.z);n.y=Math.max(t,n.y+n.vy*e);const i=Math.pow(n.y>t?.6:.03,e);n.vx*=i,n.vz*=i}function md(n,e){for(const t of g.arrows){if(t.stuck){t.life-=n;continue}t.t+=n/t.dur;const i=Math.min(1,t.t),r=t.x0+(t.x1-t.x0)*i,s=t.z0+(t.z1-t.z0)*i,a=t.y0+(t.y1-t.y0)*i+t.peak*4*i*(1-i);if(t.px=t.x,t.py=t.y,t.pz=t.z,t.x=r,t.y=a,t.z=s,g.map.id==="forest"&&a<7){for(const o of g.layout.treeColliders)if(Math.abs(o.x-r)<o.r&&Math.abs(o.z-s)<o.r&&Math.hypot(o.x-r,o.z-s)<o.r){t.stuck=!0,t.life=2,Gt("thud",r,s),ai(r,a,s,"#6b4a2e",3);break}if(t.stuck)continue}if(t.t>=1)if(e){let o=null,c=1;for(const f of g.units){if(f.dead||!Jn(f.ti,t.ti))continue;const l=Math.hypot(f.x-t.x1,f.z-t.z1)-(f.mounted?.5:0);l<c&&(c=l,o=f)}o?(zp(t,o),t.done=!0):(t.stuck=!0,t.life=3)}else t.stuck=!0,t.life=2.5}g.arrows=g.arrows.filter(t=>!(t.done||t.stuck&&t.life<=0))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sl="160",tm=0,kl=1,nm=2,ol=1,gd=2,xi=3,Yi=0,an=1,Wt=2,Xi=0,Zr=1,Ol=2,Fl=3,zl=4,im=5,ar=100,rm=101,sm=102,Bl=103,Hl=104,om=200,am=201,cm=202,lm=203,vc=204,yc=205,fm=206,hm=207,dm=208,um=209,pm=210,mm=211,gm=212,_m=213,xm=214,vm=0,ym=1,Mm=2,qo=3,Sm=4,bm=5,Em=6,Tm=7,ua=0,Am=1,Cm=2,ji=0,wm=1,Rm=2,Pm=3,_d=4,Lm=5,Dm=6,xd=300,fs=301,hs=302,Mc=303,Sc=304,pa=306,$o=1e3,jn=1001,bc=1002,on=1003,Gl=1004,wa=1005,Dn=1006,Im=1007,Hs=1008,qi=1009,Um=1010,Nm=1011,al=1012,vd=1013,Bi=1014,Hi=1015,Gs=1016,yd=1017,Md=1018,mr=1020,km=1021,qn=1023,Om=1024,Fm=1025,gr=1026,ds=1027,zm=1028,Sd=1029,Bm=1030,bd=1031,Ed=1033,Ra=33776,Pa=33777,La=33778,Da=33779,Vl=35840,Wl=35841,Xl=35842,jl=35843,Td=36196,ql=37492,$l=37496,Yl=37808,Kl=37809,Jl=37810,Zl=37811,Ql=37812,ef=37813,tf=37814,nf=37815,rf=37816,sf=37817,of=37818,af=37819,cf=37820,lf=37821,Ia=36492,ff=36494,hf=36495,Hm=36283,df=36284,uf=36285,pf=36286,Ad=3e3,_r=3001,Gm=3200,Vm=3201,cl=0,Wm=1,Sn="",Rt="srgb",wi="srgb-linear",ll="display-p3",ma="display-p3-linear",Yo="linear",_t="srgb",Ko="rec709",Jo="p3",wr=7680,mf=519,Xm=512,jm=513,qm=514,Cd=515,$m=516,Ym=517,Km=518,Jm=519,gf=35044,_f=35048,xf="300 es",Ec=1035,Si=2e3,Zo=2001;class xs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ua=Math.PI/180,Tc=180/Math.PI;function Zs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]).toLowerCase()}function hn(n,e,t){return Math.max(e,Math.min(t,n))}function Zm(n,e){return(n%e+e)%e}function Na(n,e,t){return(1-t)*n+t*e}function vf(n){return(n&n-1)===0&&n!==0}function Ac(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Es(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,i,r,s,a,o,c,f){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f)}set(e,t,i,r,s,a,o,c,f){const l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=s,l[5]=c,l[6]=i,l[7]=a,l[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],f=i[1],l=i[4],h=i[7],d=i[2],p=i[5],x=i[8],_=r[0],m=r[3],u=r[6],v=r[1],M=r[4],E=r[7],R=r[2],C=r[5],w=r[8];return s[0]=a*_+o*v+c*R,s[3]=a*m+o*M+c*C,s[6]=a*u+o*E+c*w,s[1]=f*_+l*v+h*R,s[4]=f*m+l*M+h*C,s[7]=f*u+l*E+h*w,s[2]=d*_+p*v+x*R,s[5]=d*m+p*M+x*C,s[8]=d*u+p*E+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8];return t*a*l-t*o*f-i*s*l+i*o*c+r*s*f-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=l*a-o*f,d=o*c-l*s,p=f*s-a*c,x=t*h+i*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/x;return e[0]=h*_,e[1]=(r*f-l*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(l*t-r*c)*_,e[5]=(r*s-o*t)*_,e[6]=p*_,e[7]=(i*c-f*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),f=Math.sin(s);return this.set(i*c,i*f,-i*(c*a+f*o)+a+e,-r*f,r*c,-r*(-f*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ka.makeScale(e,t)),this}rotate(e){return this.premultiply(ka.makeRotation(-e)),this}translate(e,t){return this.premultiply(ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ka=new Ye;function wd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Qo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qm(){const n=Qo("canvas");return n.style.display="block",n}const yf={};function Us(n){n in yf||(yf[n]=!0,console.warn(n))}const Mf=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sf=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ao={[wi]:{transfer:Yo,primaries:Ko,toReference:n=>n,fromReference:n=>n},[Rt]:{transfer:_t,primaries:Ko,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ma]:{transfer:Yo,primaries:Jo,toReference:n=>n.applyMatrix3(Sf),fromReference:n=>n.applyMatrix3(Mf)},[ll]:{transfer:_t,primaries:Jo,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Sf),fromReference:n=>n.applyMatrix3(Mf).convertLinearToSRGB()}},eg=new Set([wi,ma]),st={enabled:!0,_workingColorSpace:wi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!eg.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=ao[e].toReference,r=ao[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return ao[n].primaries},getTransfer:function(n){return n===Sn?Yo:ao[n].transfer}};function Qr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Oa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Rr;class Rd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rr===void 0&&(Rr=Qo("canvas")),Rr.width=e.width,Rr.height=e.height;const i=Rr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Rr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=Qo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qr(t[i]/255)*255):t[i]=Qr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let tg=0;class Pd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Zs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fa(r[a].image)):s.push(Fa(r[a]))}else s=Fa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Fa(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Rd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ng=0;class dn extends xs{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,i=jn,r=jn,s=Dn,a=Hs,o=qn,c=qi,f=dn.DEFAULT_ANISOTROPY,l=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Zs(),this.name="",this.source=new Pd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=f,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===_r?Rt:Sn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $o:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case bc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $o:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case bc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Rt?_r:Ad}set encoding(e){Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===_r?Rt:Sn}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=xd;dn.DEFAULT_ANISOTROPY=1;class Ht{constructor(e=0,t=0,i=0,r=1){Ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,f=c[0],l=c[4],h=c[8],d=c[1],p=c[5],x=c[9],_=c[2],m=c[6],u=c[10];if(Math.abs(l-d)<.01&&Math.abs(h-_)<.01&&Math.abs(x-m)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+_)<.1&&Math.abs(x+m)<.1&&Math.abs(f+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(f+1)/2,E=(p+1)/2,R=(u+1)/2,C=(l+d)/4,w=(h+_)/4,k=(x+m)/4;return M>E&&M>R?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=C/i,s=w/i):E>R?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=C/r,s=k/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=w/s,r=k/s),this.set(i,r,s,t),this}let v=Math.sqrt((m-x)*(m-x)+(h-_)*(h-_)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(m-x)/v,this.y=(h-_)/v,this.z=(d-l)/v,this.w=Math.acos((f+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ig extends xs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Us("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===_r?Rt:Sn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new dn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mr extends ig{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ld extends dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rg extends dn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],f=i[r+1],l=i[r+2],h=i[r+3];const d=s[a+0],p=s[a+1],x=s[a+2],_=s[a+3];if(o===0){e[t+0]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=x,e[t+3]=_;return}if(h!==_||c!==d||f!==p||l!==x){let m=1-o;const u=c*d+f*p+l*x+h*_,v=u>=0?1:-1,M=1-u*u;if(M>Number.EPSILON){const R=Math.sqrt(M),C=Math.atan2(R,u*v);m=Math.sin(m*C)/R,o=Math.sin(o*C)/R}const E=o*v;if(c=c*m+d*E,f=f*m+p*E,l=l*m+x*E,h=h*m+_*E,m===1-o){const R=1/Math.sqrt(c*c+f*f+l*l+h*h);c*=R,f*=R,l*=R,h*=R}}e[t]=c,e[t+1]=f,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],f=i[r+2],l=i[r+3],h=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+l*h+c*p-f*d,e[t+1]=c*x+l*d+f*h-o*p,e[t+2]=f*x+l*p+o*d-c*h,e[t+3]=l*x-o*h-c*d-f*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,f=o(i/2),l=o(r/2),h=o(s/2),d=c(i/2),p=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*l*h+f*p*x,this._y=f*p*h-d*l*x,this._z=f*l*x+d*p*h,this._w=f*l*h-d*p*x;break;case"YXZ":this._x=d*l*h+f*p*x,this._y=f*p*h-d*l*x,this._z=f*l*x-d*p*h,this._w=f*l*h+d*p*x;break;case"ZXY":this._x=d*l*h-f*p*x,this._y=f*p*h+d*l*x,this._z=f*l*x+d*p*h,this._w=f*l*h-d*p*x;break;case"ZYX":this._x=d*l*h-f*p*x,this._y=f*p*h+d*l*x,this._z=f*l*x-d*p*h,this._w=f*l*h+d*p*x;break;case"YZX":this._x=d*l*h+f*p*x,this._y=f*p*h+d*l*x,this._z=f*l*x-d*p*h,this._w=f*l*h-d*p*x;break;case"XZY":this._x=d*l*h-f*p*x,this._y=f*p*h-d*l*x,this._z=f*l*x+d*p*h,this._w=f*l*h+d*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],f=t[2],l=t[6],h=t[10],d=i+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(l-c)*p,this._y=(s-f)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(l-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+f)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-f)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+l)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+f)/p,this._y=(c+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(hn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,f=t._z,l=t._w;return this._x=i*l+a*o+r*f-s*c,this._y=r*l+a*c+s*o-i*f,this._z=s*l+a*f+i*c-r*o,this._w=a*l-i*o-r*c-s*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const f=Math.sqrt(c),l=Math.atan2(f,o),h=Math.sin((1-t)*l)/f,d=Math.sin(t*l)/f;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,f=2*(a*r-o*i),l=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*f+a*h-o*l,this.y=i+c*l+o*f-s*h,this.z=r+c*h+s*l-a*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return za.copy(this).projectOnVector(e),this.sub(za)}reflect(e){return this.sub(za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(hn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const za=new D,bf=new Zn;class br{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fn):Fn.fromBufferAttribute(s,a),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),co.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),co.copy(i.boundingBox)),co.applyMatrix4(e.matrixWorld),this.union(co)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),lo.subVectors(this.max,Ts),Pr.subVectors(e.a,Ts),Lr.subVectors(e.b,Ts),Dr.subVectors(e.c,Ts),Ri.subVectors(Lr,Pr),Pi.subVectors(Dr,Lr),er.subVectors(Pr,Dr);let t=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-er.z,er.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,er.z,0,-er.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-er.y,er.x,0];return!Ba(t,Pr,Lr,Dr,lo)||(t=[1,0,0,0,1,0,0,0,1],!Ba(t,Pr,Lr,Dr,lo))?!1:(fo.crossVectors(Ri,Pi),t=[fo.x,fo.y,fo.z],Ba(t,Pr,Lr,Dr,lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new D,new D,new D,new D,new D,new D,new D,new D],Fn=new D,co=new br,Pr=new D,Lr=new D,Dr=new D,Ri=new D,Pi=new D,er=new D,Ts=new D,lo=new D,fo=new D,tr=new D;function Ba(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){tr.fromArray(n,s);const o=r.x*Math.abs(tr.x)+r.y*Math.abs(tr.y)+r.z*Math.abs(tr.z),c=e.dot(tr),f=t.dot(tr),l=i.dot(tr);if(Math.max(-Math.max(c,f,l),Math.min(c,f,l))>o)return!1}return!0}const sg=new br,As=new D,Ha=new D;class Qs{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):sg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);const t=As.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(As,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(Ha)),this.expandByPoint(As.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hi=new D,Ga=new D,ho=new D,Li=new D,Va=new D,uo=new D,Wa=new D;class og{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ga.copy(e).add(t).multiplyScalar(.5),ho.copy(t).sub(e).normalize(),Li.copy(this.origin).sub(Ga);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ho),o=Li.dot(this.direction),c=-Li.dot(ho),f=Li.lengthSq(),l=Math.abs(1-a*a);let h,d,p,x;if(l>0)if(h=a*c-o,d=a*o-c,x=s*l,h>=0)if(d>=-x)if(d<=x){const _=1/l;h*=_,d*=_,p=h*(h+a*d+2*o)+d*(a*h+d+2*c)+f}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+f):d<=x?(h=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+f):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+f);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ga).addScaledVector(ho,d),p}intersectSphere(e,t){hi.subVectors(e.center,this.origin);const i=hi.dot(this.direction),r=hi.dot(hi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const f=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return f>=0?(i=(e.min.x-d.x)*f,r=(e.max.x-d.x)*f):(i=(e.max.x-d.x)*f,r=(e.min.x-d.x)*f),l>=0?(s=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(s=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,i,r,s){Va.subVectors(t,e),uo.subVectors(i,e),Wa.crossVectors(Va,uo);let a=this.direction.dot(Wa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Li.subVectors(this.origin,e);const c=o*this.direction.dot(uo.crossVectors(Li,uo));if(c<0)return null;const f=o*this.direction.dot(Va.cross(Li));if(f<0||c+f>a)return null;const l=-o*Li.dot(Wa);return l<0?null:this.at(l/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,i,r,s,a,o,c,f,l,h,d,p,x,_,m){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,f,l,h,d,p,x,_,m)}set(e,t,i,r,s,a,o,c,f,l,h,d,p,x,_,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=f,u[6]=l,u[10]=h,u[14]=d,u[3]=p,u[7]=x,u[11]=_,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ir.setFromMatrixColumn(e,0).length(),s=1/Ir.setFromMatrixColumn(e,1).length(),a=1/Ir.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),f=Math.sin(r),l=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*l,p=a*h,x=o*l,_=o*h;t[0]=c*l,t[4]=-c*h,t[8]=f,t[1]=p+x*f,t[5]=d-_*f,t[9]=-o*c,t[2]=_-d*f,t[6]=x+p*f,t[10]=a*c}else if(e.order==="YXZ"){const d=c*l,p=c*h,x=f*l,_=f*h;t[0]=d+_*o,t[4]=x*o-p,t[8]=a*f,t[1]=a*h,t[5]=a*l,t[9]=-o,t[2]=p*o-x,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*l,p=c*h,x=f*l,_=f*h;t[0]=d-_*o,t[4]=-a*h,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*l,t[9]=_-d*o,t[2]=-a*f,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*l,p=a*h,x=o*l,_=o*h;t[0]=c*l,t[4]=x*f-p,t[8]=d*f+_,t[1]=c*h,t[5]=_*f+d,t[9]=p*f-x,t[2]=-f,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*f,x=o*c,_=o*f;t[0]=c*l,t[4]=_-d*h,t[8]=x*h+p,t[1]=h,t[5]=a*l,t[9]=-o*l,t[2]=-f*l,t[6]=p*h+x,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,p=a*f,x=o*c,_=o*f;t[0]=c*l,t[4]=-h,t[8]=f*l,t[1]=d*h+_,t[5]=a*l,t[9]=p*h-x,t[2]=x*h-p,t[6]=o*l,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ag,e,cg)}lookAt(e,t,i){const r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Di.crossVectors(i,mn),Di.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Di.crossVectors(i,mn)),Di.normalize(),po.crossVectors(mn,Di),r[0]=Di.x,r[4]=po.x,r[8]=mn.x,r[1]=Di.y,r[5]=po.y,r[9]=mn.y,r[2]=Di.z,r[6]=po.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],f=i[12],l=i[1],h=i[5],d=i[9],p=i[13],x=i[2],_=i[6],m=i[10],u=i[14],v=i[3],M=i[7],E=i[11],R=i[15],C=r[0],w=r[4],k=r[8],y=r[12],T=r[1],B=r[5],W=r[9],N=r[13],P=r[2],I=r[6],V=r[10],$=r[14],j=r[3],q=r[7],Y=r[11],ne=r[15];return s[0]=a*C+o*T+c*P+f*j,s[4]=a*w+o*B+c*I+f*q,s[8]=a*k+o*W+c*V+f*Y,s[12]=a*y+o*N+c*$+f*ne,s[1]=l*C+h*T+d*P+p*j,s[5]=l*w+h*B+d*I+p*q,s[9]=l*k+h*W+d*V+p*Y,s[13]=l*y+h*N+d*$+p*ne,s[2]=x*C+_*T+m*P+u*j,s[6]=x*w+_*B+m*I+u*q,s[10]=x*k+_*W+m*V+u*Y,s[14]=x*y+_*N+m*$+u*ne,s[3]=v*C+M*T+E*P+R*j,s[7]=v*w+M*B+E*I+R*q,s[11]=v*k+M*W+E*V+R*Y,s[15]=v*y+M*N+E*$+R*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],f=e[13],l=e[2],h=e[6],d=e[10],p=e[14],x=e[3],_=e[7],m=e[11],u=e[15];return x*(+s*c*h-r*f*h-s*o*d+i*f*d+r*o*p-i*c*p)+_*(+t*c*p-t*f*d+s*a*d-r*a*p+r*f*l-s*c*l)+m*(+t*f*h-t*o*p-s*a*h+i*a*p+s*o*l-i*f*l)+u*(-r*o*l-t*c*h+t*o*d+r*a*h-i*a*d+i*c*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],f=e[7],l=e[8],h=e[9],d=e[10],p=e[11],x=e[12],_=e[13],m=e[14],u=e[15],v=h*m*f-_*d*f+_*c*p-o*m*p-h*c*u+o*d*u,M=x*d*f-l*m*f-x*c*p+a*m*p+l*c*u-a*d*u,E=l*_*f-x*h*f+x*o*p-a*_*p-l*o*u+a*h*u,R=x*h*c-l*_*c-x*o*d+a*_*d+l*o*m-a*h*m,C=t*v+i*M+r*E+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=v*w,e[1]=(_*d*s-h*m*s-_*r*p+i*m*p+h*r*u-i*d*u)*w,e[2]=(o*m*s-_*c*s+_*r*f-i*m*f-o*r*u+i*c*u)*w,e[3]=(h*c*s-o*d*s-h*r*f+i*d*f+o*r*p-i*c*p)*w,e[4]=M*w,e[5]=(l*m*s-x*d*s+x*r*p-t*m*p-l*r*u+t*d*u)*w,e[6]=(x*c*s-a*m*s-x*r*f+t*m*f+a*r*u-t*c*u)*w,e[7]=(a*d*s-l*c*s+l*r*f-t*d*f-a*r*p+t*c*p)*w,e[8]=E*w,e[9]=(x*h*s-l*_*s-x*i*p+t*_*p+l*i*u-t*h*u)*w,e[10]=(a*_*s-x*o*s+x*i*f-t*_*f-a*i*u+t*o*u)*w,e[11]=(l*o*s-a*h*s-l*i*f+t*h*f+a*i*p-t*o*p)*w,e[12]=R*w,e[13]=(l*_*r-x*h*r+x*i*d-t*_*d-l*i*m+t*h*m)*w,e[14]=(x*o*r-a*_*r-x*i*c+t*_*c+a*i*m-t*o*m)*w,e[15]=(a*h*r-l*o*r+l*i*c-t*h*c-a*i*d+t*o*d)*w,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,f=s*a,l=s*o;return this.set(f*a+i,f*o-r*c,f*c+r*o,0,f*o+r*c,l*o+i,l*c-r*a,0,f*c-r*o,l*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,f=s+s,l=a+a,h=o+o,d=s*f,p=s*l,x=s*h,_=a*l,m=a*h,u=o*h,v=c*f,M=c*l,E=c*h,R=i.x,C=i.y,w=i.z;return r[0]=(1-(_+u))*R,r[1]=(p+E)*R,r[2]=(x-M)*R,r[3]=0,r[4]=(p-E)*C,r[5]=(1-(d+u))*C,r[6]=(m+v)*C,r[7]=0,r[8]=(x+M)*w,r[9]=(m-v)*w,r[10]=(1-(d+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ir.set(r[0],r[1],r[2]).length();const a=Ir.set(r[4],r[5],r[6]).length(),o=Ir.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],zn.copy(this);const f=1/s,l=1/a,h=1/o;return zn.elements[0]*=f,zn.elements[1]*=f,zn.elements[2]*=f,zn.elements[4]*=l,zn.elements[5]*=l,zn.elements[6]*=l,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,t.setFromRotationMatrix(zn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Si){const c=this.elements,f=2*s/(t-e),l=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,x;if(o===Si)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Zo)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=l,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Si){const c=this.elements,f=1/(t-e),l=1/(i-r),h=1/(a-s),d=(t+e)*f,p=(i+r)*l;let x,_;if(o===Si)x=(a+s)*h,_=-2*h;else if(o===Zo)x=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*f,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ir=new D,zn=new Ze,ag=new D(0,0,0),cg=new D(1,1,1),Di=new D,po=new D,mn=new D,Ef=new Ze,Tf=new Zn;class Ji{constructor(e=0,t=0,i=0,r=Ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],f=r[5],l=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(hn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,f),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,f)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(hn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,f)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-hn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,f));break;case"YZX":this._z=Math.asin(hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,f),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,f),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ef.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ef,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tf.setFromEuler(this),this.setFromQuaternion(Tf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ji.DEFAULT_ORDER="XYZ";class Dd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lg=0;const Af=new D,Ur=new Zn,di=new Ze,mo=new D,Cs=new D,fg=new D,hg=new Zn,Cf=new D(1,0,0),wf=new D(0,1,0),Rf=new D(0,0,1),dg={type:"added"},ug={type:"removed"};class Vt extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new D,t=new Ji,i=new Zn,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Ye}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.premultiply(Ur),this}rotateX(e){return this.rotateOnAxis(Cf,e)}rotateY(e){return this.rotateOnAxis(wf,e)}rotateZ(e){return this.rotateOnAxis(Rf,e)}translateOnAxis(e,t){return Af.copy(e).applyQuaternion(this.quaternion),this.position.add(Af.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cf,e)}translateY(e){return this.translateOnAxis(wf,e)}translateZ(e){return this.translateOnAxis(Rf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?mo.copy(e):mo.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Cs,mo,this.up):di.lookAt(mo,Cs,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),Ur.setFromRotationMatrix(di),this.quaternion.premultiply(Ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(dg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ug)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,e,fg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,hg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let f=0,l=c.length;f<l;f++){const h=c[f];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,f=this.material.length;c<f;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),f=a(e.textures),l=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),f.length>0&&(i.textures=f),l.length>0&&(i.images=l),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const c=[];for(const f in o){const l=o[f];delete l.metadata,c.push(l)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new D(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new D,ui=new D,Xa=new D,pi=new D,Nr=new D,kr=new D,Pf=new D,ja=new D,qa=new D,$a=new D;let go=!1;class Wn{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Bn.subVectors(e,t),r.cross(Bn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Bn.subVectors(r,t),ui.subVectors(i,t),Xa.subVectors(e,t);const a=Bn.dot(Bn),o=Bn.dot(ui),c=Bn.dot(Xa),f=ui.dot(ui),l=ui.dot(Xa),h=a*f-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(f*c-o*l)*d,x=(a*l-o*c)*d;return s.set(1-p-x,x,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getUV(e,t,i,r,s,a,o,c){return go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),go=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static isFrontFacing(e,t,i,r){return Bn.subVectors(i,t),ui.subVectors(e,t),Bn.cross(ui).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Bn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),go=!0),Wn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Wn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Nr.subVectors(r,i),kr.subVectors(s,i),ja.subVectors(e,i);const c=Nr.dot(ja),f=kr.dot(ja);if(c<=0&&f<=0)return t.copy(i);qa.subVectors(e,r);const l=Nr.dot(qa),h=kr.dot(qa);if(l>=0&&h<=l)return t.copy(r);const d=c*h-l*f;if(d<=0&&c>=0&&l<=0)return a=c/(c-l),t.copy(i).addScaledVector(Nr,a);$a.subVectors(e,s);const p=Nr.dot($a),x=kr.dot($a);if(x>=0&&p<=x)return t.copy(s);const _=p*f-c*x;if(_<=0&&f>=0&&x<=0)return o=f/(f-x),t.copy(i).addScaledVector(kr,o);const m=l*x-p*h;if(m<=0&&h-l>=0&&p-x>=0)return Pf.subVectors(s,r),o=(h-l)/(h-l+(p-x)),t.copy(r).addScaledVector(Pf,o);const u=1/(m+_+d);return a=_*u,o=d*u,t.copy(i).addScaledVector(Nr,a).addScaledVector(kr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},_o={h:0,s:0,l:0};function Ya(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class we{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=Zm(e,1),t=hn(t,0,1),i=hn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ya(a,s,e+1/3),this.g=Ya(a,s,e),this.b=Ya(a,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,t=Rt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const i=Id[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}copyLinearToSRGB(e){return this.r=Oa(e.r),this.g=Oa(e.g),this.b=Oa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return st.fromWorkingColorSpace(qt.copy(this),e),Math.round(hn(qt.r*255,0,255))*65536+Math.round(hn(qt.g*255,0,255))*256+Math.round(hn(qt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(qt.copy(this),t);const i=qt.r,r=qt.g,s=qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,f;const l=(o+a)/2;if(o===a)c=0,f=0;else{const h=a-o;switch(f=l<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=f,e.l=l,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Rt){st.fromWorkingColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,r=qt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(_o);const i=Na(Ii.h,_o.h,t),r=Na(Ii.s,_o.s,t),s=Na(Ii.l,_o.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new we;we.NAMES=Id;let pg=0;class vs extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Zs(),this.name="",this.type="Material",this.blending=Zr,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vc,this.blendDst=yc,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zr&&(i.blending=this.blending),this.side!==Yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vc&&(i.blendSrc=this.blendSrc),this.blendDst!==yc&&(i.blendDst=this.blendDst),this.blendEquation!==ar&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==qo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class si extends vs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new D,xo=new Ke;class Kn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xo.fromBufferAttribute(this,t),xo.applyMatrix3(e),this.setXY(t,xo.x,xo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Es(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Es(t,this.array)),t}setX(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Es(t,this.array)),t}setY(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Es(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Es(t,this.array)),t}setW(e,t){return this.normalized&&(t=ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),r=ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ln(t,this.array),i=ln(i,this.array),r=ln(r,this.array),s=ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gf&&(e.usage=this.usage),e}}class Ud extends Kn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Nd extends Kn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class at extends Kn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let mg=0;const Tn=new Ze,Ka=new Vt,Or=new D,gn=new br,ws=new br,Ot=new D;class un extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wd(e)?Nd:Ud)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return Ka.lookAt(e),Ka.updateMatrix(),this.applyMatrix4(Ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(gn.min,ws.min),gn.expandByPoint(Ot),Ot.addVectors(gn.max,ws.max),gn.expandByPoint(Ot)):(gn.expandByPoint(ws.min),gn.expandByPoint(ws.max))}gn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let f=0,l=o.count;f<l;f++)Ot.fromBufferAttribute(o,f),c&&(Or.fromBufferAttribute(e,f),Ot.add(Or)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,f=[],l=[];for(let T=0;T<o;T++)f[T]=new D,l[T]=new D;const h=new D,d=new D,p=new D,x=new Ke,_=new Ke,m=new Ke,u=new D,v=new D;function M(T,B,W){h.fromArray(r,T*3),d.fromArray(r,B*3),p.fromArray(r,W*3),x.fromArray(a,T*2),_.fromArray(a,B*2),m.fromArray(a,W*2),d.sub(h),p.sub(h),_.sub(x),m.sub(x);const N=1/(_.x*m.y-m.x*_.y);isFinite(N)&&(u.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(N),v.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(N),f[T].add(u),f[B].add(u),f[W].add(u),l[T].add(v),l[B].add(v),l[W].add(v))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let T=0,B=E.length;T<B;++T){const W=E[T],N=W.start,P=W.count;for(let I=N,V=N+P;I<V;I+=3)M(i[I+0],i[I+1],i[I+2])}const R=new D,C=new D,w=new D,k=new D;function y(T){w.fromArray(s,T*3),k.copy(w);const B=f[T];R.copy(B),R.sub(w.multiplyScalar(w.dot(B))).normalize(),C.crossVectors(k,B);const N=C.dot(l[T])<0?-1:1;c[T*4]=R.x,c[T*4+1]=R.y,c[T*4+2]=R.z,c[T*4+3]=N}for(let T=0,B=E.length;T<B;++T){const W=E[T],N=W.start,P=W.count;for(let I=N,V=N+P;I<V;I+=3)y(i[I+0]),y(i[I+1]),y(i[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Kn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,c=new D,f=new D,l=new D,h=new D;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,_),f.fromBufferAttribute(i,m),o.add(l),c.add(l),f.add(l),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,f.x,f.y,f.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),l.subVectors(a,s),h.subVectors(r,s),l.cross(h),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){const f=o.array,l=o.itemSize,h=o.normalized,d=new f.constructor(c.length*l);let p=0,x=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*l;for(let u=0;u<l;u++)d[x++]=f[p++]}return new Kn(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new un,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],f=e(c,i);t.setAttribute(o,f)}const s=this.morphAttributes;for(const o in s){const c=[],f=s[o];for(let l=0,h=f.length;l<h;l++){const d=f[l],p=e(d,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const f=a[o];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const f in c)c[f]!==void 0&&(e[f]=c[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const f=i[c];e.data.attributes[c]=f.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const f=this.morphAttributes[c],l=[];for(let h=0,d=f.length;h<d;h++){const p=f[h];l.push(p.toJSON(e.data))}l.length>0&&(r[c]=l,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const f in r){const l=r[f];this.setAttribute(f,l.clone(t))}const s=e.morphAttributes;for(const f in s){const l=[],h=s[f];for(let d=0,p=h.length;d<p;d++)l.push(h[d].clone(t));this.morphAttributes[f]=l}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let f=0,l=a.length;f<l;f++){const h=a[f];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lf=new Ze,nr=new og,vo=new Qs,Df=new D,Fr=new D,zr=new D,Br=new D,Ja=new D,yo=new D,Mo=new Ke,So=new Ke,bo=new Ke,If=new D,Uf=new D,Nf=new D,Eo=new D,To=new D;class lt extends Vt{constructor(e=new un,t=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){yo.set(0,0,0);for(let c=0,f=s.length;c<f;c++){const l=o[c],h=s[c];l!==0&&(Ja.fromBufferAttribute(h,e),a?yo.addScaledVector(Ja,l):yo.addScaledVector(Ja.sub(t),l))}t.add(yo)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(s),nr.copy(e.ray).recast(e.near),!(vo.containsPoint(nr.origin)===!1&&(nr.intersectSphere(vo,Df)===null||nr.origin.distanceToSquared(Df)>(e.far-e.near)**2))&&(Lf.copy(s).invert(),nr.copy(e.ray).applyMatrix4(Lf),!(i.boundingBox!==null&&nr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,nr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,f=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,_=d.length;x<_;x++){const m=d[x],u=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=v,R=M;E<R;E+=3){const C=o.getX(E),w=o.getX(E+1),k=o.getX(E+2);r=Ao(this,u,e,i,f,l,h,C,w,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=x,u=_;m<u;m+=3){const v=o.getX(m),M=o.getX(m+1),E=o.getX(m+2);r=Ao(this,a,e,i,f,l,h,v,M,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,_=d.length;x<_;x++){const m=d[x],u=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=v,R=M;E<R;E+=3){const C=E,w=E+1,k=E+2;r=Ao(this,u,e,i,f,l,h,C,w,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=x,u=_;m<u;m+=3){const v=m,M=m+1,E=m+2;r=Ao(this,a,e,i,f,l,h,v,M,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function gg(n,e,t,i,r,s,a,o){let c;if(e.side===an?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Yi,o),c===null)return null;To.copy(o),To.applyMatrix4(n.matrixWorld);const f=t.ray.origin.distanceTo(To);return f<t.near||f>t.far?null:{distance:f,point:To.clone(),object:n}}function Ao(n,e,t,i,r,s,a,o,c,f){n.getVertexPosition(o,Fr),n.getVertexPosition(c,zr),n.getVertexPosition(f,Br);const l=gg(n,e,t,i,Fr,zr,Br,Eo);if(l){r&&(Mo.fromBufferAttribute(r,o),So.fromBufferAttribute(r,c),bo.fromBufferAttribute(r,f),l.uv=Wn.getInterpolation(Eo,Fr,zr,Br,Mo,So,bo,new Ke)),s&&(Mo.fromBufferAttribute(s,o),So.fromBufferAttribute(s,c),bo.fromBufferAttribute(s,f),l.uv1=Wn.getInterpolation(Eo,Fr,zr,Br,Mo,So,bo,new Ke),l.uv2=l.uv1),a&&(If.fromBufferAttribute(a,o),Uf.fromBufferAttribute(a,c),Nf.fromBufferAttribute(a,f),l.normal=Wn.getInterpolation(Eo,Fr,zr,Br,If,Uf,Nf,new D),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const h={a:o,b:c,c:f,normal:new D,materialIndex:0};Wn.getNormal(Fr,zr,Br,h.normal),l.face=h}return l}class ot extends un{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],f=[],l=[],h=[];let d=0,p=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new at(f,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(h,2));function x(_,m,u,v,M,E,R,C,w,k,y){const T=E/w,B=R/k,W=E/2,N=R/2,P=C/2,I=w+1,V=k+1;let $=0,j=0;const q=new D;for(let Y=0;Y<V;Y++){const ne=Y*B-N;for(let ie=0;ie<I;ie++){const X=ie*T-W;q[_]=X*v,q[m]=ne*M,q[u]=P,f.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[u]=C>0?1:-1,l.push(q.x,q.y,q.z),h.push(ie/w),h.push(1-Y/k),$+=1}}for(let Y=0;Y<k;Y++)for(let ne=0;ne<w;ne++){const ie=d+ne+I*Y,X=d+ne+I*(Y+1),K=d+(ne+1)+I*(Y+1),fe=d+(ne+1)+I*Y;c.push(ie,X,fe),c.push(X,K,fe),j+=6}o.addGroup(p,j,y),p+=j,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ot(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function us(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=us(n[t]);for(const r in i)e[r]=i[r]}return e}function _g(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kd(n){return n.getRenderTarget()===null?n.outputColorSpace:st.workingColorSpace}const xg={clone:us,merge:sn};var vg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends vs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vg,this.fragmentShader=yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=_g(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Od extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class In extends Od{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Tc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ua*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tc*2*Math.atan(Math.tan(Ua*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ua*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,f=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/f,r*=a.width/c,i*=a.height/f}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Hr=-90,Gr=1;class Mg extends Vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(Hr,Gr,e,t);r.layers=this.layers,this.add(r);const s=new In(Hr,Gr,e,t);s.layers=this.layers,this.add(s);const a=new In(Hr,Gr,e,t);a.layers=this.layers,this.add(a);const o=new In(Hr,Gr,e,t);o.layers=this.layers,this.add(o);const c=new In(Hr,Gr,e,t);c.layers=this.layers,this.add(c);const f=new In(Hr,Gr,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const f of t)this.remove(f);if(e===Si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,f,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,f),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,l),e.setRenderTarget(h,d,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Fd extends dn{constructor(e,t,i,r,s,a,o,c,f,l){e=e!==void 0?e:[],t=t!==void 0?t:fs,super(e,t,i,r,s,a,o,c,f,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sg extends Mr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Us("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===_r?Rt:Sn),this.texture=new Fd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ot(5,5,5),s=new Ki({name:"CubemapFromEquirect",uniforms:us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:Xi});s.uniforms.tEquirect.value=t;const a=new lt(r,s),o=t.minFilter;return t.minFilter===Hs&&(t.minFilter=Dn),new Mg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Za=new D,bg=new D,Eg=new Ye;class sr{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Za.subVectors(i,t).cross(bg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Za),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Eg.getNormalMatrix(e),r=this.coplanarPoint(Za).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ir=new Qs,Co=new D;class fl{constructor(e=new sr,t=new sr,i=new sr,r=new sr,s=new sr,a=new sr){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Si){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],f=r[4],l=r[5],h=r[6],d=r[7],p=r[8],x=r[9],_=r[10],m=r[11],u=r[12],v=r[13],M=r[14],E=r[15];if(i[0].setComponents(c-s,d-f,m-p,E-u).normalize(),i[1].setComponents(c+s,d+f,m+p,E+u).normalize(),i[2].setComponents(c+a,d+l,m+x,E+v).normalize(),i[3].setComponents(c-a,d-l,m-x,E-v).normalize(),i[4].setComponents(c-o,d-h,m-_,E-M).normalize(),t===Si)i[5].setComponents(c+o,d+h,m+_,E+M).normalize();else if(t===Zo)i[5].setComponents(o,h,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ir)}intersectsSprite(e){return ir.center.set(0,0,0),ir.radius=.7071067811865476,ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(ir)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Co.x=r.normal.x>0?e.max.x:e.min.x,Co.y=r.normal.y>0?e.max.y:e.min.y,Co.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zd(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Tg(n,e){const t=e.isWebGL2,i=new WeakMap;function r(f,l){const h=f.array,d=f.usage,p=h.byteLength,x=n.createBuffer();n.bindBuffer(l,x),n.bufferData(l,h,d),f.onUploadCallback();let _;if(h instanceof Float32Array)_=n.FLOAT;else if(h instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=n.SHORT;else if(h instanceof Uint32Array)_=n.UNSIGNED_INT;else if(h instanceof Int32Array)_=n.INT;else if(h instanceof Int8Array)_=n.BYTE;else if(h instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:x,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:p}}function s(f,l,h){const d=l.array,p=l._updateRange,x=l.updateRanges;if(n.bindBuffer(h,f),p.count===-1&&x.length===0&&n.bufferSubData(h,0,d),x.length!==0){for(let _=0,m=x.length;_<m;_++){const u=x[_];t?n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}l.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),l.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),i.get(f)}function o(f){f.isInterleavedBufferAttribute&&(f=f.data);const l=i.get(f);l&&(n.deleteBuffer(l.buffer),i.delete(f))}function c(f,l){if(f.isGLBufferAttribute){const d=i.get(f);(!d||d.version<f.version)&&i.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);const h=i.get(f);if(h===void 0)i.set(f,r(f,l));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,f,l),h.version=f.version}}return{get:a,remove:o,update:c}}class kn extends un{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),f=o+1,l=c+1,h=e/o,d=t/c,p=[],x=[],_=[],m=[];for(let u=0;u<l;u++){const v=u*d-a;for(let M=0;M<f;M++){const E=M*h-s;x.push(E,-v,0),_.push(0,0,1),m.push(M/o),m.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<o;v++){const M=v+f*u,E=v+f*(u+1),R=v+1+f*(u+1),C=v+1+f*u;p.push(M,E,C),p.push(E,R,C)}this.setIndex(p),this.setAttribute("position",new at(x,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cg=`#ifdef USE_ALPHAHASH
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
#endif`,wg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Lg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dg=`#ifdef USE_AOMAP
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
#endif`,Ig=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ug=`#ifdef USE_BATCHING
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
#endif`,Ng=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,kg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Og=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zg=`#ifdef USE_IRIDESCENCE
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
#endif`,Bg=`#ifdef USE_BUMPMAP
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
#endif`,Hg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Yg=`#define PI 3.141592653589793
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
} // validated`,Kg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jg=`vec3 transformedNormal = objectNormal;
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
#endif`,Zg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n0="gl_FragColor = linearToOutputTexel( gl_FragColor );",i0=`
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
}`,r0=`#ifdef USE_ENVMAP
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
#endif`,s0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,o0=`#ifdef USE_ENVMAP
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
#endif`,a0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c0=`#ifdef USE_ENVMAP
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
#endif`,l0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,u0=`#ifdef USE_GRADIENTMAP
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
}`,p0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,m0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,x0=`uniform bool receiveShadow;
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
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,y0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,E0=`PhysicalMaterial material;
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
#endif`,T0=`struct PhysicalMaterial {
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
}`,A0=`
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
#endif`,C0=`#if defined( RE_IndirectDiffuse )
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
#endif`,w0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,R0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,D0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,I0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,U0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,N0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k0=`#if defined( USE_POINTS_UV )
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
#endif`,O0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,z0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,B0=`#ifdef USE_MORPHNORMALS
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
#endif`,H0=`#ifdef USE_MORPHTARGETS
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
#endif`,G0=`#ifdef USE_MORPHTARGETS
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
#endif`,V0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,W0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,X0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$0=`#ifdef USE_NORMALMAP
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
#endif`,Y0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,J0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,t_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,f_=`float getShadowMask() {
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
}`,h_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d_=`#ifdef USE_SKINNING
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
#endif`,u_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p_=`#ifdef USE_SKINNING
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
#endif`,m_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,__=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,v_=`#ifdef USE_TRANSMISSION
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
#endif`,y_=`#ifdef USE_TRANSMISSION
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
#endif`,M_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const T_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,A_=`uniform sampler2D t2D;
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
}`,C_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,R_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`#include <common>
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
}`,D_=`#if DEPTH_PACKING == 3200
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
}`,I_=`#define DISTANCE
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
}`,U_=`#define DISTANCE
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
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`uniform float scale;
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
}`,F_=`uniform vec3 diffuse;
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
}`,z_=`#include <common>
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
}`,B_=`uniform vec3 diffuse;
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
}`,H_=`#define LAMBERT
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
}`,G_=`#define LAMBERT
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
}`,V_=`#define MATCAP
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
}`,W_=`#define MATCAP
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
}`,X_=`#define NORMAL
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
}`,j_=`#define NORMAL
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
}`,q_=`#define PHONG
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
}`,$_=`#define PHONG
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
}`,Y_=`#define STANDARD
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
}`,K_=`#define STANDARD
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
}`,J_=`#define TOON
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
}`,Z_=`#define TOON
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
}`,Q_=`uniform float size;
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
}`,ex=`uniform vec3 diffuse;
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
}`,tx=`#include <common>
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
}`,nx=`uniform vec3 color;
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
}`,ix=`uniform float rotation;
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
}`,rx=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Ag,alphahash_pars_fragment:Cg,alphamap_fragment:wg,alphamap_pars_fragment:Rg,alphatest_fragment:Pg,alphatest_pars_fragment:Lg,aomap_fragment:Dg,aomap_pars_fragment:Ig,batching_pars_vertex:Ug,batching_vertex:Ng,begin_vertex:kg,beginnormal_vertex:Og,bsdfs:Fg,iridescence_fragment:zg,bumpmap_pars_fragment:Bg,clipping_planes_fragment:Hg,clipping_planes_pars_fragment:Gg,clipping_planes_pars_vertex:Vg,clipping_planes_vertex:Wg,color_fragment:Xg,color_pars_fragment:jg,color_pars_vertex:qg,color_vertex:$g,common:Yg,cube_uv_reflection_fragment:Kg,defaultnormal_vertex:Jg,displacementmap_pars_vertex:Zg,displacementmap_vertex:Qg,emissivemap_fragment:e0,emissivemap_pars_fragment:t0,colorspace_fragment:n0,colorspace_pars_fragment:i0,envmap_fragment:r0,envmap_common_pars_fragment:s0,envmap_pars_fragment:o0,envmap_pars_vertex:a0,envmap_physical_pars_fragment:v0,envmap_vertex:c0,fog_vertex:l0,fog_pars_vertex:f0,fog_fragment:h0,fog_pars_fragment:d0,gradientmap_pars_fragment:u0,lightmap_fragment:p0,lightmap_pars_fragment:m0,lights_lambert_fragment:g0,lights_lambert_pars_fragment:_0,lights_pars_begin:x0,lights_toon_fragment:y0,lights_toon_pars_fragment:M0,lights_phong_fragment:S0,lights_phong_pars_fragment:b0,lights_physical_fragment:E0,lights_physical_pars_fragment:T0,lights_fragment_begin:A0,lights_fragment_maps:C0,lights_fragment_end:w0,logdepthbuf_fragment:R0,logdepthbuf_pars_fragment:P0,logdepthbuf_pars_vertex:L0,logdepthbuf_vertex:D0,map_fragment:I0,map_pars_fragment:U0,map_particle_fragment:N0,map_particle_pars_fragment:k0,metalnessmap_fragment:O0,metalnessmap_pars_fragment:F0,morphcolor_vertex:z0,morphnormal_vertex:B0,morphtarget_pars_vertex:H0,morphtarget_vertex:G0,normal_fragment_begin:V0,normal_fragment_maps:W0,normal_pars_fragment:X0,normal_pars_vertex:j0,normal_vertex:q0,normalmap_pars_fragment:$0,clearcoat_normal_fragment_begin:Y0,clearcoat_normal_fragment_maps:K0,clearcoat_pars_fragment:J0,iridescence_pars_fragment:Z0,opaque_fragment:Q0,packing:e_,premultiplied_alpha_fragment:t_,project_vertex:n_,dithering_fragment:i_,dithering_pars_fragment:r_,roughnessmap_fragment:s_,roughnessmap_pars_fragment:o_,shadowmap_pars_fragment:a_,shadowmap_pars_vertex:c_,shadowmap_vertex:l_,shadowmask_pars_fragment:f_,skinbase_vertex:h_,skinning_pars_vertex:d_,skinning_vertex:u_,skinnormal_vertex:p_,specularmap_fragment:m_,specularmap_pars_fragment:g_,tonemapping_fragment:__,tonemapping_pars_fragment:x_,transmission_fragment:v_,transmission_pars_fragment:y_,uv_pars_fragment:M_,uv_pars_vertex:S_,uv_vertex:b_,worldpos_vertex:E_,background_vert:T_,background_frag:A_,backgroundCube_vert:C_,backgroundCube_frag:w_,cube_vert:R_,cube_frag:P_,depth_vert:L_,depth_frag:D_,distanceRGBA_vert:I_,distanceRGBA_frag:U_,equirect_vert:N_,equirect_frag:k_,linedashed_vert:O_,linedashed_frag:F_,meshbasic_vert:z_,meshbasic_frag:B_,meshlambert_vert:H_,meshlambert_frag:G_,meshmatcap_vert:V_,meshmatcap_frag:W_,meshnormal_vert:X_,meshnormal_frag:j_,meshphong_vert:q_,meshphong_frag:$_,meshphysical_vert:Y_,meshphysical_frag:K_,meshtoon_vert:J_,meshtoon_frag:Z_,points_vert:Q_,points_frag:ex,shadow_vert:tx,shadow_frag:nx,sprite_vert:ix,sprite_frag:rx},se={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ni={basic:{uniforms:sn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:sn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new we(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:sn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:sn([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:sn([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new we(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:sn([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:sn([se.points,se.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:sn([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:sn([se.common,se.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:sn([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:sn([se.sprite,se.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:sn([se.common,se.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:sn([se.lights,se.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ni.physical={uniforms:sn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const wo={r:0,b:0,g:0};function sx(n,e,t,i,r,s,a){const o=new we(0);let c=s===!0?0:1,f,l,h=null,d=0,p=null;function x(m,u){let v=!1,M=u.isScene===!0?u.background:null;M&&M.isTexture&&(M=(u.backgroundBlurriness>0?t:e).get(M)),M===null?_(o,c):M&&M.isColor&&(_(M,1),v=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===pa)?(l===void 0&&(l=new lt(new ot(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:us(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=st.getTransfer(M.colorSpace)!==_t,(h!==M||d!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(f===void 0&&(f=new lt(new kn(2,2),new Ki({name:"BackgroundMaterial",uniforms:us(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=M,f.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,f.material.toneMapped=st.getTransfer(M.colorSpace)!==_t,M.matrixAutoUpdate===!0&&M.updateMatrix(),f.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||p!==n.toneMapping)&&(f.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),f.layers.enableAll(),m.unshift(f,f.geometry,f.material,0,0,null))}function _(m,u){m.getRGB(wo,kd(n)),i.buffers.color.setClear(wo.r,wo.g,wo.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(m,u=1){o.set(m),c=u,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:x}}function ox(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=m(null);let f=c,l=!1;function h(P,I,V,$,j){let q=!1;if(a){const Y=_($,V,I);f!==Y&&(f=Y,p(f.object)),q=u(P,$,V,j),q&&v(P,$,V,j)}else{const Y=I.wireframe===!0;(f.geometry!==$.id||f.program!==V.id||f.wireframe!==Y)&&(f.geometry=$.id,f.program=V.id,f.wireframe=Y,q=!0)}j!==null&&t.update(j,n.ELEMENT_ARRAY_BUFFER),(q||l)&&(l=!1,k(P,I,V,$),j!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function x(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,I,V){const $=V.wireframe===!0;let j=o[P.id];j===void 0&&(j={},o[P.id]=j);let q=j[I.id];q===void 0&&(q={},j[I.id]=q);let Y=q[$];return Y===void 0&&(Y=m(d()),q[$]=Y),Y}function m(P){const I=[],V=[],$=[];for(let j=0;j<r;j++)I[j]=0,V[j]=0,$[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:$,object:P,attributes:{},index:null}}function u(P,I,V,$){const j=f.attributes,q=I.attributes;let Y=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const K=j[ie];let fe=q[ie];if(fe===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor)),K===void 0||K.attribute!==fe||fe&&K.data!==fe.data)return!0;Y++}return f.attributesNum!==Y||f.index!==$}function v(P,I,V,$){const j={},q=I.attributes;let Y=0;const ne=V.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let K=q[ie];K===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const fe={};fe.attribute=K,K&&K.data&&(fe.data=K.data),j[ie]=fe,Y++}f.attributes=j,f.attributesNum=Y,f.index=$}function M(){const P=f.newAttributes;for(let I=0,V=P.length;I<V;I++)P[I]=0}function E(P){R(P,0)}function R(P,I){const V=f.newAttributes,$=f.enabledAttributes,j=f.attributeDivisors;V[P]=1,$[P]===0&&(n.enableVertexAttribArray(P),$[P]=1),j[P]!==I&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,I),j[P]=I)}function C(){const P=f.newAttributes,I=f.enabledAttributes;for(let V=0,$=I.length;V<$;V++)I[V]!==P[V]&&(n.disableVertexAttribArray(V),I[V]=0)}function w(P,I,V,$,j,q,Y){Y===!0?n.vertexAttribIPointer(P,I,V,j,q):n.vertexAttribPointer(P,I,V,$,j,q)}function k(P,I,V,$){if(i.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;M();const j=$.attributes,q=V.getAttributes(),Y=I.defaultAttributeValues;for(const ne in q){const ie=q[ne];if(ie.location>=0){let X=j[ne];if(X===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(X=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(X=P.instanceColor)),X!==void 0){const K=X.normalized,fe=X.itemSize,be=t.get(X);if(be===void 0)continue;const Me=be.buffer,Fe=be.type,Be=be.bytesPerElement,Pe=i.isWebGL2===!0&&(Fe===n.INT||Fe===n.UNSIGNED_INT||X.gpuType===vd);if(X.isInterleavedBufferAttribute){const et=X.data,O=et.stride,en=X.offset;if(et.isInstancedInterleavedBuffer){for(let Te=0;Te<ie.locationSize;Te++)R(ie.location+Te,et.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Te=0;Te<ie.locationSize;Te++)E(ie.location+Te);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Te=0;Te<ie.locationSize;Te++)w(ie.location+Te,fe/ie.locationSize,Fe,K,O*Be,(en+fe/ie.locationSize*Te)*Be,Pe)}else{if(X.isInstancedBufferAttribute){for(let et=0;et<ie.locationSize;et++)R(ie.location+et,X.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let et=0;et<ie.locationSize;et++)E(ie.location+et);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let et=0;et<ie.locationSize;et++)w(ie.location+et,fe/ie.locationSize,Fe,K,fe*Be,fe/ie.locationSize*et*Be,Pe)}}else if(Y!==void 0){const K=Y[ne];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(ie.location,K);break;case 3:n.vertexAttrib3fv(ie.location,K);break;case 4:n.vertexAttrib4fv(ie.location,K);break;default:n.vertexAttrib1fv(ie.location,K)}}}}C()}function y(){W();for(const P in o){const I=o[P];for(const V in I){const $=I[V];for(const j in $)x($[j].object),delete $[j];delete I[V]}delete o[P]}}function T(P){if(o[P.id]===void 0)return;const I=o[P.id];for(const V in I){const $=I[V];for(const j in $)x($[j].object),delete $[j];delete I[V]}delete o[P.id]}function B(P){for(const I in o){const V=o[I];if(V[P.id]===void 0)continue;const $=V[P.id];for(const j in $)x($[j].object),delete $[j];delete V[P.id]}}function W(){N(),l=!0,f!==c&&(f=c,p(f.object))}function N(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:N,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:M,enableAttribute:E,disableUnusedAttributes:C}}function ax(n,e,t,i){const r=i.isWebGL2;let s;function a(l){s=l}function o(l,h){n.drawArrays(s,l,h),t.update(h,s,1)}function c(l,h,d){if(d===0)return;let p,x;if(r)p=n,x="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](s,l,h,d),t.update(h,s,d)}function f(l,h,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<d;x++)this.render(l[x],h[x]);else{p.multiDrawArraysWEBGL(s,l,0,h,0,d);let x=0;for(let _=0;_<d;_++)x+=h[_];t.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=f}function cx(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const f=a||e.has("WEBGL_draw_buffers"),l=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=d>0,E=a||e.has("OES_texture_float"),R=M&&E,C=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:f,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:x,maxAttributes:_,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:M,floatFragmentTextures:E,floatVertexTextures:R,maxSamples:C}}function lx(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new sr,o=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=l(h,d,0)},this.setState=function(h,d,p){const x=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,u=n.get(h);if(!r||x===null||x.length===0||s&&!m)s?l(null):f();else{const v=s?0:i,M=v*4;let E=u.clippingState||null;c.value=E,E=l(x,d,M,p);for(let R=0;R!==M;++R)E[R]=t[R];u.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function f(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function l(h,d,p,x){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,x!==!0||m===null){const u=p+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<u)&&(m=new Float32Array(u));for(let M=0,E=p;M!==_;++M,E+=4)a.copy(h[M]).applyMatrix4(v,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function fx(n){let e=new WeakMap;function t(a,o){return o===Mc?a.mapping=fs:o===Sc&&(a.mapping=hs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Mc||o===Sc)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const f=new Sg(c.height/2);return f.fromEquirectangularTexture(n,a),e.set(a,f),a.addEventListener("dispose",r),t(f.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Bd extends Od{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,a=s+f*this.view.width,o-=l*this.view.offsetY,c=o-l*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const jr=4,kf=[.125,.215,.35,.446,.526,.582],cr=20,Qa=new Bd,Of=new we;let ec=null,tc=0,nc=0;const or=(1+Math.sqrt(5))/2,Vr=1/or,Ff=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,or,Vr),new D(0,or,-Vr),new D(Vr,0,or),new D(-Vr,0,or),new D(or,Vr,0),new D(-or,Vr,0)];class zf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ec,tc,nc),e.scissorTest=!1,Ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:Gs,format:qn,colorSpace:wi,depthBuffer:!1},r=Bf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bf(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hx(s)),this._blurMaterial=dx(s,e,t)}return r}_compileMaterial(e){const t=new lt(this._lodPlanes[0],e);this._renderer.compile(t,Qa)}_sceneToCubeUV(e,t,i,r){const o=new In(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,d=l.toneMapping;l.getClearColor(Of),l.toneMapping=ji,l.autoClear=!1;const p=new si({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),x=new lt(new ot,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Of),_=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(o.up.set(0,c[u],0),o.lookAt(f[u],0,0)):v===1?(o.up.set(0,0,c[u]),o.lookAt(0,f[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,f[u]));const M=this._cubeSize;Ro(r,v*M,u>2?M:0,M,M),l.setRenderTarget(r),_&&l.render(x,o),l.render(e,o)}x.geometry.dispose(),x.material.dispose(),l.toneMapping=d,l.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===fs||e.mapping===hs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new lt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ro(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Qa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ff[(r-1)%Ff.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,f=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,h=new lt(this._lodPlanes[r],f),d=f.uniforms,p=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*cr-1),_=s/x,m=isFinite(s)?1+Math.floor(l*_):cr;m>cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${cr}`);const u=[];let v=0;for(let w=0;w<cr;++w){const k=w/_,y=Math.exp(-k*k/2);u.push(y),w===0?v+=y:w<m&&(v+=2*y)}for(let w=0;w<u.length;w++)u[w]=u[w]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=x,d.mipInt.value=M-i;const E=this._sizeLods[r],R=3*E*(r>M-jr?r-M+jr:0),C=4*(this._cubeSize-E);Ro(t,R,C,3*E,2*E),c.setRenderTarget(t),c.render(h,Qa)}}function hx(n){const e=[],t=[],i=[];let r=n;const s=n-jr+1+kf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-jr?c=kf[a-n+jr-1]:a===0&&(c=0),i.push(c);const f=1/(o-2),l=-f,h=1+f,d=[l,l,h,l,h,h,l,l,h,h,l,h],p=6,x=6,_=3,m=2,u=1,v=new Float32Array(_*x*p),M=new Float32Array(m*x*p),E=new Float32Array(u*x*p);for(let C=0;C<p;C++){const w=C%3*2/3-1,k=C>2?0:-1,y=[w,k,0,w+2/3,k,0,w+2/3,k+1,0,w,k,0,w+2/3,k+1,0,w,k+1,0];v.set(y,_*x*C),M.set(d,m*x*C);const T=[C,C,C,C,C,C];E.set(T,u*x*C)}const R=new un;R.setAttribute("position",new Kn(v,_)),R.setAttribute("uv",new Kn(M,m)),R.setAttribute("faceIndex",new Kn(E,u)),e.push(R),r>jr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Bf(n,e,t){const i=new Mr(n,e,t);return i.texture.mapping=pa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ro(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function dx(n,e,t){const i=new Float32Array(cr),r=new D(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:hl(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Hf(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hl(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Gf(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function hl(){return`

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
	`}function ux(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,f=c===Mc||c===Sc,l=c===fs||c===hs;if(f||l)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new zf(n)),h=f?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(f&&h&&h.height>0||l&&h&&r(h)){t===null&&(t=new zf(n));const d=f?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const f=6;for(let l=0;l<f;l++)o[l]!==void 0&&c++;return c===f}function s(o){const c=o.target;c.removeEventListener("dispose",s);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function px(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function mx(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);for(const x in d.morphAttributes){const _=d.morphAttributes[x];for(let m=0,u=_.length;m<u;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const x in d)e.update(d[x],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const x in p){const _=p[x];for(let m=0,u=_.length;m<u;m++)e.update(_[m],n.ARRAY_BUFFER)}}function f(h){const d=[],p=h.index,x=h.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let M=0,E=v.length;M<E;M+=3){const R=v[M+0],C=v[M+1],w=v[M+2];d.push(R,C,C,w,w,R)}}else if(x!==void 0){const v=x.array;_=x.version;for(let M=0,E=v.length/3-1;M<E;M+=3){const R=M+0,C=M+1,w=M+2;d.push(R,C,C,w,w,R)}}else return;const m=new(wd(d)?Nd:Ud)(d,1);m.version=_;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function l(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&f(h)}else f(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:l}}function gx(n,e,t,i){const r=i.isWebGL2;let s;function a(p){s=p}let o,c;function f(p){o=p.type,c=p.bytesPerElement}function l(p,x){n.drawElements(s,x,o,p*c),t.update(x,s,1)}function h(p,x,_){if(_===0)return;let m,u;if(r)m=n,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](s,x,o,p*c,_),t.update(x,s,_)}function d(p,x,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<_;u++)this.render(p[u]/c,x[u]);else{m.multiDrawElementsWEBGL(s,x,0,o,p,0,_);let u=0;for(let v=0;v<_;v++)u+=x[v];t.update(u,s,1)}}this.setMode=a,this.setIndex=f,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function _x(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function xx(n,e){return n[0]-e[0]}function vx(n,e){return Math.abs(e[1])-Math.abs(n[1])}function yx(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new Ht,o=[];for(let f=0;f<8;f++)o[f]=[f,0];function c(f,l,h){const d=f.morphTargetInfluences;if(e.isWebGL2===!0){const x=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,_=x!==void 0?x.length:0;let m=s.get(l);if(m===void 0||m.count!==_){let I=function(){N.dispose(),s.delete(l),l.removeEventListener("dispose",I)};var p=I;m!==void 0&&m.texture.dispose();const M=l.morphAttributes.position!==void 0,E=l.morphAttributes.normal!==void 0,R=l.morphAttributes.color!==void 0,C=l.morphAttributes.position||[],w=l.morphAttributes.normal||[],k=l.morphAttributes.color||[];let y=0;M===!0&&(y=1),E===!0&&(y=2),R===!0&&(y=3);let T=l.attributes.position.count*y,B=1;T>e.maxTextureSize&&(B=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const W=new Float32Array(T*B*4*_),N=new Ld(W,T,B,_);N.type=Hi,N.needsUpdate=!0;const P=y*4;for(let V=0;V<_;V++){const $=C[V],j=w[V],q=k[V],Y=T*B*4*V;for(let ne=0;ne<$.count;ne++){const ie=ne*P;M===!0&&(a.fromBufferAttribute($,ne),W[Y+ie+0]=a.x,W[Y+ie+1]=a.y,W[Y+ie+2]=a.z,W[Y+ie+3]=0),E===!0&&(a.fromBufferAttribute(j,ne),W[Y+ie+4]=a.x,W[Y+ie+5]=a.y,W[Y+ie+6]=a.z,W[Y+ie+7]=0),R===!0&&(a.fromBufferAttribute(q,ne),W[Y+ie+8]=a.x,W[Y+ie+9]=a.y,W[Y+ie+10]=a.z,W[Y+ie+11]=q.itemSize===4?a.w:1)}}m={count:_,texture:N,size:new Ke(T,B)},s.set(l,m),l.addEventListener("dispose",I)}let u=0;for(let M=0;M<d.length;M++)u+=d[M];const v=l.morphTargetsRelative?1:1-u;h.getUniforms().setValue(n,"morphTargetBaseInfluence",v),h.getUniforms().setValue(n,"morphTargetInfluences",d),h.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const x=d===void 0?0:d.length;let _=i[l.id];if(_===void 0||_.length!==x){_=[];for(let E=0;E<x;E++)_[E]=[E,0];i[l.id]=_}for(let E=0;E<x;E++){const R=_[E];R[0]=E,R[1]=d[E]}_.sort(vx);for(let E=0;E<8;E++)E<x&&_[E][1]?(o[E][0]=_[E][0],o[E][1]=_[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(xx);const m=l.morphAttributes.position,u=l.morphAttributes.normal;let v=0;for(let E=0;E<8;E++){const R=o[E],C=R[0],w=R[1];C!==Number.MAX_SAFE_INTEGER&&w?(m&&l.getAttribute("morphTarget"+E)!==m[C]&&l.setAttribute("morphTarget"+E,m[C]),u&&l.getAttribute("morphNormal"+E)!==u[C]&&l.setAttribute("morphNormal"+E,u[C]),r[E]=w,v+=w):(m&&l.hasAttribute("morphTarget"+E)===!0&&l.deleteAttribute("morphTarget"+E),u&&l.hasAttribute("morphNormal"+E)===!0&&l.deleteAttribute("morphNormal"+E),r[E]=0)}const M=l.morphTargetsRelative?1:1-v;h.getUniforms().setValue(n,"morphTargetBaseInfluence",M),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function Mx(n,e,t,i){let r=new WeakMap;function s(c){const f=i.render.frame,l=c.geometry,h=e.get(c,l);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==f&&(d.update(),r.set(d,f))}return h}function a(){r=new WeakMap}function o(c){const f=c.target;f.removeEventListener("dispose",o),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:s,dispose:a}}class Hd extends dn{constructor(e,t,i,r,s,a,o,c,f,l){if(l=l!==void 0?l:gr,l!==gr&&l!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===gr&&(i=Bi),i===void 0&&l===ds&&(i=mr),super(null,r,s,a,o,c,l,i,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gd=new dn,Vd=new Hd(1,1);Vd.compareFunction=Cd;const Wd=new Ld,Xd=new rg,jd=new Fd,Vf=[],Wf=[],Xf=new Float32Array(16),jf=new Float32Array(9),qf=new Float32Array(4);function ys(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Vf[r];if(s===void 0&&(s=new Float32Array(r),Vf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ga(n,e){let t=Wf[e];t===void 0&&(t=new Int32Array(e),Wf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Sx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function Ex(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function Tx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function Ax(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;qf.set(i),n.uniformMatrix2fv(this.addr,!1,qf),It(t,i)}}function Cx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;jf.set(i),n.uniformMatrix3fv(this.addr,!1,jf),It(t,i)}}function wx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;Xf.set(i),n.uniformMatrix4fv(this.addr,!1,Xf),It(t,i)}}function Rx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Px(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function Lx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function Dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Ix(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ux(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Nx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function Ox(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Vd:Gd;t.setTexture2D(e||s,r)}function Fx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Xd,r)}function zx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||jd,r)}function Bx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Wd,r)}function Hx(n){switch(n){case 5126:return Sx;case 35664:return bx;case 35665:return Ex;case 35666:return Tx;case 35674:return Ax;case 35675:return Cx;case 35676:return wx;case 5124:case 35670:return Rx;case 35667:case 35671:return Px;case 35668:case 35672:return Lx;case 35669:case 35673:return Dx;case 5125:return Ix;case 36294:return Ux;case 36295:return Nx;case 36296:return kx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ox;case 35679:case 36299:case 36307:return Fx;case 35680:case 36300:case 36308:case 36293:return zx;case 36289:case 36303:case 36311:case 36292:return Bx}}function Gx(n,e){n.uniform1fv(this.addr,e)}function Vx(n,e){const t=ys(e,this.size,2);n.uniform2fv(this.addr,t)}function Wx(n,e){const t=ys(e,this.size,3);n.uniform3fv(this.addr,t)}function Xx(n,e){const t=ys(e,this.size,4);n.uniform4fv(this.addr,t)}function jx(n,e){const t=ys(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function qx(n,e){const t=ys(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $x(n,e){const t=ys(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Yx(n,e){n.uniform1iv(this.addr,e)}function Kx(n,e){n.uniform2iv(this.addr,e)}function Jx(n,e){n.uniform3iv(this.addr,e)}function Zx(n,e){n.uniform4iv(this.addr,e)}function Qx(n,e){n.uniform1uiv(this.addr,e)}function ev(n,e){n.uniform2uiv(this.addr,e)}function tv(n,e){n.uniform3uiv(this.addr,e)}function nv(n,e){n.uniform4uiv(this.addr,e)}function iv(n,e,t){const i=this.cache,r=e.length,s=ga(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Gd,s[a])}function rv(n,e,t){const i=this.cache,r=e.length,s=ga(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Xd,s[a])}function sv(n,e,t){const i=this.cache,r=e.length,s=ga(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||jd,s[a])}function ov(n,e,t){const i=this.cache,r=e.length,s=ga(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Wd,s[a])}function av(n){switch(n){case 5126:return Gx;case 35664:return Vx;case 35665:return Wx;case 35666:return Xx;case 35674:return jx;case 35675:return qx;case 35676:return $x;case 5124:case 35670:return Yx;case 35667:case 35671:return Kx;case 35668:case 35672:return Jx;case 35669:case 35673:return Zx;case 5125:return Qx;case 36294:return ev;case 36295:return tv;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return rv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return ov}}class cv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Hx(t.type)}}class lv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=av(t.type)}}class fv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ic=/(\w+)(\])?(\[|\.)?/g;function $f(n,e){n.seq.push(e),n.map[e.id]=e}function hv(n,e,t){const i=n.name,r=i.length;for(ic.lastIndex=0;;){const s=ic.exec(i),a=ic.lastIndex;let o=s[1];const c=s[2]==="]",f=s[3];if(c&&(o=o|0),f===void 0||f==="["&&a+2===r){$f(t,f===void 0?new cv(o,n,e):new lv(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new fv(o),$f(t,h)),t=h}}}class No{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);hv(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Yf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const dv=37297;let uv=0;function pv(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function mv(n){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(n);let i;switch(e===t?i="":e===Jo&&t===Ko?i="LinearDisplayP3ToLinearSRGB":e===Ko&&t===Jo&&(i="LinearSRGBToLinearDisplayP3"),n){case wi:case ma:return[i,"LinearTransferOETF"];case Rt:case ll:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Kf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+pv(n.getShaderSource(e),a)}else return r}function gv(n,e){const t=mv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function _v(n,e){let t;switch(e){case wm:t="Linear";break;case Rm:t="Reinhard";break;case Pm:t="OptimizedCineon";break;case _d:t="ACESFilmic";break;case Dm:t="AgX";break;case Lm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function xv(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(qr).join(`
`)}function vv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(qr).join(`
`)}function yv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Mv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function qr(n){return n!==""}function Jf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cc(n){return n.replace(Sv,Ev)}const bv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ev(n,e){let t=Ge[e];if(t===void 0){const i=bv.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Cc(t)}const Tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qf(n){return n.replace(Tv,Av)}function Av(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eh(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Cv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ol?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===gd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===xi&&(e="SHADOWMAP_TYPE_VSM"),e}function wv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case fs:case hs:e="ENVMAP_TYPE_CUBE";break;case pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Rv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hs:e="ENVMAP_MODE_REFRACTION";break}return e}function Pv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ua:e="ENVMAP_BLENDING_MULTIPLY";break;case Am:e="ENVMAP_BLENDING_MIX";break;case Cm:e="ENVMAP_BLENDING_ADD";break}return e}function Lv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Dv(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Cv(t),f=wv(t),l=Rv(t),h=Pv(t),d=Lv(t),p=t.isWebGL2?"":xv(t),x=vv(t),_=yv(s),m=r.createProgram();let u,v,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qr).join(`
`),u.length>0&&(u+=`
`),v=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qr).join(`
`),v.length>0&&(v+=`
`)):(u=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),v=[p,eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ji?_v("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,gv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),a=Cc(a),a=Jf(a,t),a=Zf(a,t),o=Cc(o),o=Jf(o,t),o=Zf(o,t),a=Qf(a),o=Qf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,u=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===xf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const E=M+u+a,R=M+v+o,C=Yf(r,r.VERTEX_SHADER,E),w=Yf(r,r.FRAGMENT_SHADER,R);r.attachShader(m,C),r.attachShader(m,w),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function k(W){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(C).trim(),I=r.getShaderInfoLog(w).trim();let V=!0,$=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,C,w);else{const j=Kf(r,C,"vertex"),q=Kf(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+j+`
`+q)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(P===""||I==="")&&($=!1);$&&(W.diagnostics={runnable:V,programLog:N,vertexShader:{log:P,prefix:u},fragmentShader:{log:I,prefix:v}})}r.deleteShader(C),r.deleteShader(w),y=new No(r,m),T=Mv(r,m)}let y;this.getUniforms=function(){return y===void 0&&k(this),y};let T;this.getAttributes=function(){return T===void 0&&k(this),T};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(m,dv)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=uv++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=w,this}let Iv=0;class Uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Nv(e),t.set(e,i)),i}}class Nv{constructor(e){this.id=Iv++,this.code=e,this.usedTimes=0}}function kv(n,e,t,i,r,s,a){const o=new Dd,c=new Uv,f=[],l=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,T,B,W,N){const P=W.fog,I=N.geometry,V=y.isMeshStandardMaterial?W.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),j=$&&$.mapping===pa?$.image.height:null,q=x[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const Y=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ne=Y!==void 0?Y.length:0;let ie=0;I.morphAttributes.position!==void 0&&(ie=1),I.morphAttributes.normal!==void 0&&(ie=2),I.morphAttributes.color!==void 0&&(ie=3);let X,K,fe,be;if(q){const tn=ni[q];X=tn.vertexShader,K=tn.fragmentShader}else X=y.vertexShader,K=y.fragmentShader,c.update(y),fe=c.getVertexShaderID(y),be=c.getFragmentShaderID(y);const Me=n.getRenderTarget(),Fe=N.isInstancedMesh===!0,Be=N.isBatchedMesh===!0,Pe=!!y.map,et=!!y.matcap,O=!!$,en=!!y.aoMap,Te=!!y.lightMap,Ne=!!y.bumpMap,xe=!!y.normalMap,vt=!!y.displacementMap,Ve=!!y.emissiveMap,A=!!y.metalnessMap,S=!!y.roughnessMap,z=y.anisotropy>0,Q=y.clearcoat>0,Z=y.iridescence>0,ee=y.sheen>0,ve=y.transmission>0,ce=z&&!!y.anisotropyMap,me=Q&&!!y.clearcoatMap,Re=Q&&!!y.clearcoatNormalMap,We=Q&&!!y.clearcoatRoughnessMap,J=Z&&!!y.iridescenceMap,rt=Z&&!!y.iridescenceThicknessMap,Je=ee&&!!y.sheenColorMap,Ie=ee&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,ge=!!y.specularColorMap,He=!!y.specularIntensityMap,nt=ve&&!!y.transmissionMap,St=ve&&!!y.thicknessMap,qe=!!y.gradientMap,re=!!y.alphaMap,L=y.alphaTest>0,oe=!!y.alphaHash,ae=!!y.extensions,Le=!!I.attributes.uv1,Ae=!!I.attributes.uv2,ht=!!I.attributes.uv3;let dt=ji;return y.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(dt=n.toneMapping),{isWebGL2:l,shaderID:q,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:K,defines:y.defines,customVertexShaderID:fe,customFragmentShaderID:be,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Be,instancing:Fe,instancingColor:Fe&&N.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Me===null?n.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:wi,map:Pe,matcap:et,envMap:O,envMapMode:O&&$.mapping,envMapCubeUVHeight:j,aoMap:en,lightMap:Te,bumpMap:Ne,normalMap:xe,displacementMap:d&&vt,emissiveMap:Ve,normalMapObjectSpace:xe&&y.normalMapType===Wm,normalMapTangentSpace:xe&&y.normalMapType===cl,metalnessMap:A,roughnessMap:S,anisotropy:z,anisotropyMap:ce,clearcoat:Q,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:We,iridescence:Z,iridescenceMap:J,iridescenceThicknessMap:rt,sheen:ee,sheenColorMap:Je,sheenRoughnessMap:Ie,specularMap:Ee,specularColorMap:ge,specularIntensityMap:He,transmission:ve,transmissionMap:nt,thicknessMap:St,gradientMap:qe,opaque:y.transparent===!1&&y.blending===Zr,alphaMap:re,alphaTest:L,alphaHash:oe,combine:y.combine,mapUv:Pe&&_(y.map.channel),aoMapUv:en&&_(y.aoMap.channel),lightMapUv:Te&&_(y.lightMap.channel),bumpMapUv:Ne&&_(y.bumpMap.channel),normalMapUv:xe&&_(y.normalMap.channel),displacementMapUv:vt&&_(y.displacementMap.channel),emissiveMapUv:Ve&&_(y.emissiveMap.channel),metalnessMapUv:A&&_(y.metalnessMap.channel),roughnessMapUv:S&&_(y.roughnessMap.channel),anisotropyMapUv:ce&&_(y.anisotropyMap.channel),clearcoatMapUv:me&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:We&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(y.sheenRoughnessMap.channel),specularMapUv:Ee&&_(y.specularMap.channel),specularColorMapUv:ge&&_(y.specularColorMap.channel),specularIntensityMapUv:He&&_(y.specularIntensityMap.channel),transmissionMapUv:nt&&_(y.transmissionMap.channel),thicknessMapUv:St&&_(y.thicknessMap.channel),alphaMapUv:re&&_(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(xe||z),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Le,vertexUv2s:Ae,vertexUv3s:ht,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(Pe||re),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:N.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:dt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Pe&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===_t,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Wt,flipSided:y.side===an,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ae&&y.extensions.derivatives===!0,extensionFragDepth:ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function u(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const B in y.defines)T.push(B),T.push(y.defines[B]);return y.isRawShaderMaterial===!1&&(v(T,y),M(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function v(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function M(y,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function E(y){const T=x[y.type];let B;if(T){const W=ni[T];B=xg.clone(W.uniforms)}else B=y.uniforms;return B}function R(y,T){let B;for(let W=0,N=f.length;W<N;W++){const P=f[W];if(P.cacheKey===T){B=P,++B.usedTimes;break}}return B===void 0&&(B=new Dv(n,T,y,s),f.push(B)),B}function C(y){if(--y.usedTimes===0){const T=f.indexOf(y);f[T]=f[f.length-1],f.pop(),y.destroy()}}function w(y){c.remove(y)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:E,acquireProgram:R,releaseProgram:C,releaseShaderCache:w,programs:f,dispose:k}}function Ov(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Fv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function th(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,d,p,x,_,m){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:d,material:p,groupOrder:x,renderOrder:h.renderOrder,z:_,group:m},n[e]=u):(u.id=h.id,u.object=h,u.geometry=d,u.material=p,u.groupOrder=x,u.renderOrder=h.renderOrder,u.z=_,u.group=m),e++,u}function o(h,d,p,x,_,m){const u=a(h,d,p,x,_,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):t.push(u)}function c(h,d,p,x,_,m){const u=a(h,d,p,x,_,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):t.unshift(u)}function f(h,d){t.length>1&&t.sort(h||Fv),i.length>1&&i.sort(d||th),r.length>1&&r.sort(d||th)}function l(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:l,sort:f}}function zv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new nh,n.set(i,[a])):r>=s.length?(a=new nh,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Bv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new we};break;case"SpotLight":t={position:new D,direction:new D,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function Hv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Gv=0;function Vv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Wv(n,e){const t=new Bv,i=Hv(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new D);const s=new D,a=new Ze,o=new Ze;function c(l,h){let d=0,p=0,x=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,m=0,u=0,v=0,M=0,E=0,R=0,C=0,w=0,k=0,y=0;l.sort(Vv);const T=h===!0?Math.PI:1;for(let W=0,N=l.length;W<N;W++){const P=l[W],I=P.color,V=P.intensity,$=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=I.r*V*T,p+=I.g*V*T,x+=I.b*V*T;else if(P.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(P.sh.coefficients[q],V);y++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*T),P.castShadow){const Y=P.shadow,ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,r.directionalShadow[_]=ne,r.directionalShadowMap[_]=j,r.directionalShadowMatrix[_]=P.shadow.matrix,E++}r.directional[_]=q,_++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(I).multiplyScalar(V*T),q.distance=$,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,r.spot[u]=q;const Y=P.shadow;if(P.map&&(r.spotLightMap[w]=P.map,w++,Y.updateMatrices(P),P.castShadow&&k++),r.spotLightMatrix[u]=Y.matrix,P.castShadow){const ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,r.spotShadow[u]=ne,r.spotShadowMap[u]=j,C++}u++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(I).multiplyScalar(V),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),r.rectArea[v]=q,v++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*T),q.distance=P.distance,q.decay=P.decay,P.castShadow){const Y=P.shadow,ne=i.get(P);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,ne.shadowCameraNear=Y.camera.near,ne.shadowCameraFar=Y.camera.far,r.pointShadow[m]=ne,r.pointShadowMap[m]=j,r.pointShadowMatrix[m]=P.shadow.matrix,R++}r.point[m]=q,m++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(V*T),q.groundColor.copy(P.groundColor).multiplyScalar(V*T),r.hemi[M]=q,M++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=x;const B=r.hash;(B.directionalLength!==_||B.pointLength!==m||B.spotLength!==u||B.rectAreaLength!==v||B.hemiLength!==M||B.numDirectionalShadows!==E||B.numPointShadows!==R||B.numSpotShadows!==C||B.numSpotMaps!==w||B.numLightProbes!==y)&&(r.directional.length=_,r.spot.length=u,r.rectArea.length=v,r.point.length=m,r.hemi.length=M,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=C+w-k,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=k,r.numLightProbes=y,B.directionalLength=_,B.pointLength=m,B.spotLength=u,B.rectAreaLength=v,B.hemiLength=M,B.numDirectionalShadows=E,B.numPointShadows=R,B.numSpotShadows=C,B.numSpotMaps=w,B.numLightProbes=y,r.version=Gv++)}function f(l,h){let d=0,p=0,x=0,_=0,m=0;const u=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){const E=l[v];if(E.isDirectionalLight){const R=r.directional[d];R.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),d++}else if(E.isSpotLight){const R=r.spot[x];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),R.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),x++}else if(E.isRectAreaLight){const R=r.rectArea[_];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),o.identity(),a.copy(E.matrixWorld),a.premultiply(u),o.extractRotation(a),R.halfWidth.set(E.width*.5,0,0),R.halfHeight.set(0,E.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const R=r.point[p];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(u),p++}else if(E.isHemisphereLight){const R=r.hemi[m];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(u),m++}}}return{setup:c,setupView:f,state:r}}function ih(n,e){const t=new Wv(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(h){i.push(h)}function o(h){r.push(h)}function c(h){t.setup(i,h)}function f(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o}}function Xv(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new ih(n,e),t.set(s,[c])):a>=o.length?(c=new ih(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class jv extends vs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qv extends vs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yv=`uniform sampler2D shadow_pass;
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
}`;function Kv(n,e,t){let i=new fl;const r=new Ke,s=new Ke,a=new Ht,o=new jv({depthPacking:Vm}),c=new qv,f={},l=t.maxTextureSize,h={[Yi]:an,[an]:Yi,[Wt]:Wt},d=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:$v,fragmentShader:Yv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new un;x.setAttribute("position",new Kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new lt(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ol;let u=this.type;this.render=function(C,w,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const y=n.getRenderTarget(),T=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Xi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const N=u!==xi&&this.type===xi,P=u===xi&&this.type!==xi;for(let I=0,V=C.length;I<V;I++){const $=C[I],j=$.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const q=j.getFrameExtents();if(r.multiply(q),s.copy(j.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/q.x),r.x=s.x*q.x,j.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/q.y),r.y=s.y*q.y,j.mapSize.y=s.y)),j.map===null||N===!0||P===!0){const ne=this.type!==xi?{minFilter:on,magFilter:on}:{};j.map!==null&&j.map.dispose(),j.map=new Mr(r.x,r.y,ne),j.map.texture.name=$.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const Y=j.getViewportCount();for(let ne=0;ne<Y;ne++){const ie=j.getViewport(ne);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),W.viewport(a),j.updateMatrices($,ne),i=j.getFrustum(),E(w,k,j.camera,$,this.type)}j.isPointLightShadow!==!0&&this.type===xi&&v(j,k),j.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(y,T,B)};function v(C,w){const k=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mr(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(w,null,k,d,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(w,null,k,p,_,null)}function M(C,w,k,y){let T=null;const B=k.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(B!==void 0)T=B;else if(T=k.isPointLight===!0?c:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=T.uuid,N=w.uuid;let P=f[W];P===void 0&&(P={},f[W]=P);let I=P[N];I===void 0&&(I=T.clone(),P[N]=I,w.addEventListener("dispose",R)),T=I}if(T.visible=w.visible,T.wireframe=w.wireframe,y===xi?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:h[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,k.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=n.properties.get(T);W.light=k}return T}function E(C,w,k,y,T){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&T===xi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,C.matrixWorld);const N=e.update(C),P=C.material;if(Array.isArray(P)){const I=N.groups;for(let V=0,$=I.length;V<$;V++){const j=I[V],q=P[j.materialIndex];if(q&&q.visible){const Y=M(C,q,y,T);C.onBeforeShadow(n,C,w,k,N,Y,j),n.renderBufferDirect(k,null,N,Y,C,j),C.onAfterShadow(n,C,w,k,N,Y,j)}}}else if(P.visible){const I=M(C,P,y,T);C.onBeforeShadow(n,C,w,k,N,I,null),n.renderBufferDirect(k,null,N,I,C,null),C.onAfterShadow(n,C,w,k,N,I,null)}}const W=C.children;for(let N=0,P=W.length;N<P;N++)E(W[N],w,k,y,T)}function R(C){C.target.removeEventListener("dispose",R);for(const k in f){const y=f[k],T=C.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}function Jv(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const oe=new Ht;let ae=null;const Le=new Ht(0,0,0,0);return{setMask:function(Ae){ae!==Ae&&!L&&(n.colorMask(Ae,Ae,Ae,Ae),ae=Ae)},setLocked:function(Ae){L=Ae},setClear:function(Ae,ht,dt,Nt,tn){tn===!0&&(Ae*=Nt,ht*=Nt,dt*=Nt),oe.set(Ae,ht,dt,Nt),Le.equals(oe)===!1&&(n.clearColor(Ae,ht,dt,Nt),Le.copy(oe))},reset:function(){L=!1,ae=null,Le.set(-1,0,0,0)}}}function s(){let L=!1,oe=null,ae=null,Le=null;return{setTest:function(Ae){Ae?Be(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(Ae){oe!==Ae&&!L&&(n.depthMask(Ae),oe=Ae)},setFunc:function(Ae){if(ae!==Ae){switch(Ae){case vm:n.depthFunc(n.NEVER);break;case ym:n.depthFunc(n.ALWAYS);break;case Mm:n.depthFunc(n.LESS);break;case qo:n.depthFunc(n.LEQUAL);break;case Sm:n.depthFunc(n.EQUAL);break;case bm:n.depthFunc(n.GEQUAL);break;case Em:n.depthFunc(n.GREATER);break;case Tm:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Ae}},setLocked:function(Ae){L=Ae},setClear:function(Ae){Le!==Ae&&(n.clearDepth(Ae),Le=Ae)},reset:function(){L=!1,oe=null,ae=null,Le=null}}}function a(){let L=!1,oe=null,ae=null,Le=null,Ae=null,ht=null,dt=null,Nt=null,tn=null;return{setTest:function(ut){L||(ut?Be(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(ut){oe!==ut&&!L&&(n.stencilMask(ut),oe=ut)},setFunc:function(ut,nn,Qn){(ae!==ut||Le!==nn||Ae!==Qn)&&(n.stencilFunc(ut,nn,Qn),ae=ut,Le=nn,Ae=Qn)},setOp:function(ut,nn,Qn){(ht!==ut||dt!==nn||Nt!==Qn)&&(n.stencilOp(ut,nn,Qn),ht=ut,dt=nn,Nt=Qn)},setLocked:function(ut){L=ut},setClear:function(ut){tn!==ut&&(n.clearStencil(ut),tn=ut)},reset:function(){L=!1,oe=null,ae=null,Le=null,Ae=null,ht=null,dt=null,Nt=null,tn=null}}}const o=new r,c=new s,f=new a,l=new WeakMap,h=new WeakMap;let d={},p={},x=new WeakMap,_=[],m=null,u=!1,v=null,M=null,E=null,R=null,C=null,w=null,k=null,y=new we(0,0,0),T=0,B=!1,W=null,N=null,P=null,I=null,V=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,q=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),j=q>=1):Y.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),j=q>=2);let ne=null,ie={};const X=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),fe=new Ht().fromArray(X),be=new Ht().fromArray(K);function Me(L,oe,ae,Le){const Ae=new Uint8Array(4),ht=n.createTexture();n.bindTexture(L,ht),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let dt=0;dt<ae;dt++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(oe,0,n.RGBA,1,1,Le,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(oe+dt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return ht}const Fe={};Fe[n.TEXTURE_2D]=Me(n.TEXTURE_2D,n.TEXTURE_2D,1),Fe[n.TEXTURE_CUBE_MAP]=Me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Fe[n.TEXTURE_2D_ARRAY]=Me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Fe[n.TEXTURE_3D]=Me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),f.setClear(0),Be(n.DEPTH_TEST),c.setFunc(qo),Ve(!1),A(kl),Be(n.CULL_FACE),xe(Xi);function Be(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Pe(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function et(L,oe){return p[L]!==oe?(n.bindFramebuffer(L,oe),p[L]=oe,i&&(L===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=oe),L===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=oe)),!0):!1}function O(L,oe){let ae=_,Le=!1;if(L)if(ae=x.get(oe),ae===void 0&&(ae=[],x.set(oe,ae)),L.isWebGLMultipleRenderTargets){const Ae=L.texture;if(ae.length!==Ae.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let ht=0,dt=Ae.length;ht<dt;ht++)ae[ht]=n.COLOR_ATTACHMENT0+ht;ae.length=Ae.length,Le=!0}}else ae[0]!==n.COLOR_ATTACHMENT0&&(ae[0]=n.COLOR_ATTACHMENT0,Le=!0);else ae[0]!==n.BACK&&(ae[0]=n.BACK,Le=!0);Le&&(t.isWebGL2?n.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function en(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const Te={[ar]:n.FUNC_ADD,[rm]:n.FUNC_SUBTRACT,[sm]:n.FUNC_REVERSE_SUBTRACT};if(i)Te[Bl]=n.MIN,Te[Hl]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Te[Bl]=L.MIN_EXT,Te[Hl]=L.MAX_EXT)}const Ne={[om]:n.ZERO,[am]:n.ONE,[cm]:n.SRC_COLOR,[vc]:n.SRC_ALPHA,[pm]:n.SRC_ALPHA_SATURATE,[dm]:n.DST_COLOR,[fm]:n.DST_ALPHA,[lm]:n.ONE_MINUS_SRC_COLOR,[yc]:n.ONE_MINUS_SRC_ALPHA,[um]:n.ONE_MINUS_DST_COLOR,[hm]:n.ONE_MINUS_DST_ALPHA,[mm]:n.CONSTANT_COLOR,[gm]:n.ONE_MINUS_CONSTANT_COLOR,[_m]:n.CONSTANT_ALPHA,[xm]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(L,oe,ae,Le,Ae,ht,dt,Nt,tn,ut){if(L===Xi){u===!0&&(Pe(n.BLEND),u=!1);return}if(u===!1&&(Be(n.BLEND),u=!0),L!==im){if(L!==v||ut!==B){if((M!==ar||C!==ar)&&(n.blendEquation(n.FUNC_ADD),M=ar,C=ar),ut)switch(L){case Zr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ol:n.blendFunc(n.ONE,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Zr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ol:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,R=null,w=null,k=null,y.set(0,0,0),T=0,v=L,B=ut}return}Ae=Ae||oe,ht=ht||ae,dt=dt||Le,(oe!==M||Ae!==C)&&(n.blendEquationSeparate(Te[oe],Te[Ae]),M=oe,C=Ae),(ae!==E||Le!==R||ht!==w||dt!==k)&&(n.blendFuncSeparate(Ne[ae],Ne[Le],Ne[ht],Ne[dt]),E=ae,R=Le,w=ht,k=dt),(Nt.equals(y)===!1||tn!==T)&&(n.blendColor(Nt.r,Nt.g,Nt.b,tn),y.copy(Nt),T=tn),v=L,B=!1}function vt(L,oe){L.side===Wt?Pe(n.CULL_FACE):Be(n.CULL_FACE);let ae=L.side===an;oe&&(ae=!ae),Ve(ae),L.blending===Zr&&L.transparent===!1?xe(Xi):xe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),o.setMask(L.colorWrite);const Le=L.stencilWrite;f.setTest(Le),Le&&(f.setMask(L.stencilWriteMask),f.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),f.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),z(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Be(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){W!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),W=L)}function A(L){L!==tm?(Be(n.CULL_FACE),L!==N&&(L===kl?n.cullFace(n.BACK):L===nm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),N=L}function S(L){L!==P&&(j&&n.lineWidth(L),P=L)}function z(L,oe,ae){L?(Be(n.POLYGON_OFFSET_FILL),(I!==oe||V!==ae)&&(n.polygonOffset(oe,ae),I=oe,V=ae)):Pe(n.POLYGON_OFFSET_FILL)}function Q(L){L?Be(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function Z(L){L===void 0&&(L=n.TEXTURE0+$-1),ne!==L&&(n.activeTexture(L),ne=L)}function ee(L,oe,ae){ae===void 0&&(ne===null?ae=n.TEXTURE0+$-1:ae=ne);let Le=ie[ae];Le===void 0&&(Le={type:void 0,texture:void 0},ie[ae]=Le),(Le.type!==L||Le.texture!==oe)&&(ne!==ae&&(n.activeTexture(ae),ne=ae),n.bindTexture(L,oe||Fe[L]),Le.type=L,Le.texture=oe)}function ve(){const L=ie[ne];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ce(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function We(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function rt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Je(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(L){fe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),fe.copy(L))}function nt(L){be.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),be.copy(L))}function St(L,oe){let ae=h.get(oe);ae===void 0&&(ae=new WeakMap,h.set(oe,ae));let Le=ae.get(L);Le===void 0&&(Le=n.getUniformBlockIndex(oe,L.name),ae.set(L,Le))}function qe(L,oe){const Le=h.get(oe).get(L);l.get(oe)!==Le&&(n.uniformBlockBinding(oe,Le,L.__bindingPointIndex),l.set(oe,Le))}function re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ne=null,ie={},p={},x=new WeakMap,_=[],m=null,u=!1,v=null,M=null,E=null,R=null,C=null,w=null,k=null,y=new we(0,0,0),T=0,B=!1,W=null,N=null,P=null,I=null,V=null,fe.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),f.reset()}return{buffers:{color:o,depth:c,stencil:f},enable:Be,disable:Pe,bindFramebuffer:et,drawBuffers:O,useProgram:en,setBlending:xe,setMaterial:vt,setFlipSided:Ve,setCullFace:A,setLineWidth:S,setPolygonOffset:z,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:ve,compressedTexImage2D:ce,compressedTexImage3D:me,texImage2D:Ee,texImage3D:ge,updateUBOMapping:St,uniformBlockBinding:qe,texStorage2D:Je,texStorage3D:Ie,texSubImage2D:Re,texSubImage3D:We,compressedTexSubImage2D:J,compressedTexSubImage3D:rt,scissor:He,viewport:nt,reset:re}}function Zv(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,S){return p?new OffscreenCanvas(A,S):Qo("canvas")}function _(A,S,z,Q){let Z=1;if((A.width>Q||A.height>Q)&&(Z=Q/Math.max(A.width,A.height)),Z<1||S===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){const ee=S?Ac:Math.floor,ve=ee(Z*A.width),ce=ee(Z*A.height);h===void 0&&(h=x(ve,ce));const me=z?x(ve,ce):h;return me.width=ve,me.height=ce,me.getContext("2d").drawImage(A,0,0,ve,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+ve+"x"+ce+")."),me}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return vf(A.width)&&vf(A.height)}function u(A){return o?!1:A.wrapS!==jn||A.wrapT!==jn||A.minFilter!==on&&A.minFilter!==Dn}function v(A,S){return A.generateMipmaps&&S&&A.minFilter!==on&&A.minFilter!==Dn}function M(A){n.generateMipmap(A)}function E(A,S,z,Q,Z=!1){if(o===!1)return S;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ee=S;if(S===n.RED&&(z===n.FLOAT&&(ee=n.R32F),z===n.HALF_FLOAT&&(ee=n.R16F),z===n.UNSIGNED_BYTE&&(ee=n.R8)),S===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(ee=n.R8UI),z===n.UNSIGNED_SHORT&&(ee=n.R16UI),z===n.UNSIGNED_INT&&(ee=n.R32UI),z===n.BYTE&&(ee=n.R8I),z===n.SHORT&&(ee=n.R16I),z===n.INT&&(ee=n.R32I)),S===n.RG&&(z===n.FLOAT&&(ee=n.RG32F),z===n.HALF_FLOAT&&(ee=n.RG16F),z===n.UNSIGNED_BYTE&&(ee=n.RG8)),S===n.RGBA){const ve=Z?Yo:st.getTransfer(Q);z===n.FLOAT&&(ee=n.RGBA32F),z===n.HALF_FLOAT&&(ee=n.RGBA16F),z===n.UNSIGNED_BYTE&&(ee=ve===_t?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function R(A,S,z){return v(A,z)===!0||A.isFramebufferTexture&&A.minFilter!==on&&A.minFilter!==Dn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){return A===on||A===Gl||A===wa?n.NEAREST:n.LINEAR}function w(A){const S=A.target;S.removeEventListener("dispose",w),y(S),S.isVideoTexture&&l.delete(S)}function k(A){const S=A.target;S.removeEventListener("dispose",k),B(S)}function y(A){const S=i.get(A);if(S.__webglInit===void 0)return;const z=A.source,Q=d.get(z);if(Q){const Z=Q[S.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(A),Object.keys(Q).length===0&&d.delete(z)}i.remove(A)}function T(A){const S=i.get(A);n.deleteTexture(S.__webglTexture);const z=A.source,Q=d.get(z);delete Q[S.__cacheKey],a.memory.textures--}function B(A){const S=A.texture,z=i.get(A),Q=i.get(S);if(Q.__webglTexture!==void 0&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(z.__webglFramebuffer[Z]))for(let ee=0;ee<z.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(z.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(z.__webglFramebuffer[Z]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[Z])}else{if(Array.isArray(z.__webglFramebuffer))for(let Z=0;Z<z.__webglFramebuffer.length;Z++)n.deleteFramebuffer(z.__webglFramebuffer[Z]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let Z=0;Z<z.__webglColorRenderbuffer.length;Z++)z.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[Z]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let Z=0,ee=S.length;Z<ee;Z++){const ve=i.get(S[Z]);ve.__webglTexture&&(n.deleteTexture(ve.__webglTexture),a.memory.textures--),i.remove(S[Z])}i.remove(S),i.remove(A)}let W=0;function N(){W=0}function P(){const A=W;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),W+=1,A}function I(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function V(A,S){const z=i.get(A);if(A.isVideoTexture&&vt(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(z,A,S);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+S)}function $(A,S){const z=i.get(A);if(A.version>0&&z.__version!==A.version){fe(z,A,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+S)}function j(A,S){const z=i.get(A);if(A.version>0&&z.__version!==A.version){fe(z,A,S);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+S)}function q(A,S){const z=i.get(A);if(A.version>0&&z.__version!==A.version){be(z,A,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+S)}const Y={[$o]:n.REPEAT,[jn]:n.CLAMP_TO_EDGE,[bc]:n.MIRRORED_REPEAT},ne={[on]:n.NEAREST,[Gl]:n.NEAREST_MIPMAP_NEAREST,[wa]:n.NEAREST_MIPMAP_LINEAR,[Dn]:n.LINEAR,[Im]:n.LINEAR_MIPMAP_NEAREST,[Hs]:n.LINEAR_MIPMAP_LINEAR},ie={[Xm]:n.NEVER,[Jm]:n.ALWAYS,[jm]:n.LESS,[Cd]:n.LEQUAL,[qm]:n.EQUAL,[Km]:n.GEQUAL,[$m]:n.GREATER,[Ym]:n.NOTEQUAL};function X(A,S,z){if(z?(n.texParameteri(A,n.TEXTURE_WRAP_S,Y[S.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Y[S.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Y[S.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ne[S.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ne[S.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(S.wrapS!==jn||S.wrapT!==jn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,C(S.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,C(S.minFilter)),S.minFilter!==on&&S.minFilter!==Dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ie[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===on||S.minFilter!==wa&&S.minFilter!==Hs||S.type===Hi&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===Gs&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(n.texParameterf(A,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function K(A,S){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",w));const Q=S.source;let Z=d.get(Q);Z===void 0&&(Z={},d.set(Q,Z));const ee=I(S);if(ee!==A.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Z[ee].usedTimes++;const ve=Z[A.__cacheKey];ve!==void 0&&(Z[A.__cacheKey].usedTimes--,ve.usedTimes===0&&T(S)),A.__cacheKey=ee,A.__webglTexture=Z[ee].texture}return z}function fe(A,S,z){let Q=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=n.TEXTURE_3D);const Z=K(A,S),ee=S.source;t.bindTexture(Q,A.__webglTexture,n.TEXTURE0+z);const ve=i.get(ee);if(ee.version!==ve.__version||Z===!0){t.activeTexture(n.TEXTURE0+z);const ce=st.getPrimaries(st.workingColorSpace),me=S.colorSpace===Sn?null:st.getPrimaries(S.colorSpace),Re=S.colorSpace===Sn||ce===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const We=u(S)&&m(S.image)===!1;let J=_(S.image,We,!1,r.maxTextureSize);J=Ve(S,J);const rt=m(J)||o,Je=s.convert(S.format,S.colorSpace);let Ie=s.convert(S.type),Ee=E(S.internalFormat,Je,Ie,S.colorSpace,S.isVideoTexture);X(Q,S,rt);let ge;const He=S.mipmaps,nt=o&&S.isVideoTexture!==!0&&Ee!==Td,St=ve.__version===void 0||Z===!0,qe=R(S,J,rt);if(S.isDepthTexture)Ee=n.DEPTH_COMPONENT,o?S.type===Hi?Ee=n.DEPTH_COMPONENT32F:S.type===Bi?Ee=n.DEPTH_COMPONENT24:S.type===mr?Ee=n.DEPTH24_STENCIL8:Ee=n.DEPTH_COMPONENT16:S.type===Hi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===gr&&Ee===n.DEPTH_COMPONENT&&S.type!==al&&S.type!==Bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Bi,Ie=s.convert(S.type)),S.format===ds&&Ee===n.DEPTH_COMPONENT&&(Ee=n.DEPTH_STENCIL,S.type!==mr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=mr,Ie=s.convert(S.type))),St&&(nt?t.texStorage2D(n.TEXTURE_2D,1,Ee,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Ee,J.width,J.height,0,Je,Ie,null));else if(S.isDataTexture)if(He.length>0&&rt){nt&&St&&t.texStorage2D(n.TEXTURE_2D,qe,Ee,He[0].width,He[0].height);for(let re=0,L=He.length;re<L;re++)ge=He[re],nt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,Je,Ie,ge.data):t.texImage2D(n.TEXTURE_2D,re,Ee,ge.width,ge.height,0,Je,Ie,ge.data);S.generateMipmaps=!1}else nt?(St&&t.texStorage2D(n.TEXTURE_2D,qe,Ee,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,Je,Ie,J.data)):t.texImage2D(n.TEXTURE_2D,0,Ee,J.width,J.height,0,Je,Ie,J.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){nt&&St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,qe,Ee,He[0].width,He[0].height,J.depth);for(let re=0,L=He.length;re<L;re++)ge=He[re],S.format!==qn?Je!==null?nt?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,J.depth,Je,ge.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ee,ge.width,ge.height,J.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,J.depth,Je,Ie,ge.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ee,ge.width,ge.height,J.depth,0,Je,Ie,ge.data)}else{nt&&St&&t.texStorage2D(n.TEXTURE_2D,qe,Ee,He[0].width,He[0].height);for(let re=0,L=He.length;re<L;re++)ge=He[re],S.format!==qn?Je!==null?nt?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,Je,ge.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ee,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge.width,ge.height,Je,Ie,ge.data):t.texImage2D(n.TEXTURE_2D,re,Ee,ge.width,ge.height,0,Je,Ie,ge.data)}else if(S.isDataArrayTexture)nt?(St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,qe,Ee,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Je,Ie,J.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,J.width,J.height,J.depth,0,Je,Ie,J.data);else if(S.isData3DTexture)nt?(St&&t.texStorage3D(n.TEXTURE_3D,qe,Ee,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Je,Ie,J.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,J.width,J.height,J.depth,0,Je,Ie,J.data);else if(S.isFramebufferTexture){if(St)if(nt)t.texStorage2D(n.TEXTURE_2D,qe,Ee,J.width,J.height);else{let re=J.width,L=J.height;for(let oe=0;oe<qe;oe++)t.texImage2D(n.TEXTURE_2D,oe,Ee,re,L,0,Je,Ie,null),re>>=1,L>>=1}}else if(He.length>0&&rt){nt&&St&&t.texStorage2D(n.TEXTURE_2D,qe,Ee,He[0].width,He[0].height);for(let re=0,L=He.length;re<L;re++)ge=He[re],nt?t.texSubImage2D(n.TEXTURE_2D,re,0,0,Je,Ie,ge):t.texImage2D(n.TEXTURE_2D,re,Ee,Je,Ie,ge);S.generateMipmaps=!1}else nt?(St&&t.texStorage2D(n.TEXTURE_2D,qe,Ee,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Je,Ie,J)):t.texImage2D(n.TEXTURE_2D,0,Ee,Je,Ie,J);v(S,rt)&&M(Q),ve.__version=ee.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function be(A,S,z){if(S.image.length!==6)return;const Q=K(A,S),Z=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const ee=i.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+z);const ve=st.getPrimaries(st.workingColorSpace),ce=S.colorSpace===Sn?null:st.getPrimaries(S.colorSpace),me=S.colorSpace===Sn||ve===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Re=S.isCompressedTexture||S.image[0].isCompressedTexture,We=S.image[0]&&S.image[0].isDataTexture,J=[];for(let re=0;re<6;re++)!Re&&!We?J[re]=_(S.image[re],!1,!0,r.maxCubemapSize):J[re]=We?S.image[re].image:S.image[re],J[re]=Ve(S,J[re]);const rt=J[0],Je=m(rt)||o,Ie=s.convert(S.format,S.colorSpace),Ee=s.convert(S.type),ge=E(S.internalFormat,Ie,Ee,S.colorSpace),He=o&&S.isVideoTexture!==!0,nt=ee.__version===void 0||Q===!0;let St=R(S,rt,Je);X(n.TEXTURE_CUBE_MAP,S,Je);let qe;if(Re){He&&nt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,St,ge,rt.width,rt.height);for(let re=0;re<6;re++){qe=J[re].mipmaps;for(let L=0;L<qe.length;L++){const oe=qe[L];S.format!==qn?Ie!==null?He?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,oe.width,oe.height,Ie,oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,ge,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,oe.width,oe.height,Ie,Ee,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,ge,oe.width,oe.height,0,Ie,Ee,oe.data)}}}else{qe=S.mipmaps,He&&nt&&(qe.length>0&&St++,t.texStorage2D(n.TEXTURE_CUBE_MAP,St,ge,J[0].width,J[0].height));for(let re=0;re<6;re++)if(We){He?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,J[re].width,J[re].height,Ie,Ee,J[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,J[re].width,J[re].height,0,Ie,Ee,J[re].data);for(let L=0;L<qe.length;L++){const ae=qe[L].image[re].image;He?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,ae.width,ae.height,Ie,Ee,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,ge,ae.width,ae.height,0,Ie,Ee,ae.data)}}else{He?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ie,Ee,J[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ge,Ie,Ee,J[re]);for(let L=0;L<qe.length;L++){const oe=qe[L];He?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,Ie,Ee,oe.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,ge,Ie,Ee,oe.image[re])}}}v(S,Je)&&M(n.TEXTURE_CUBE_MAP),ee.__version=Z.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Me(A,S,z,Q,Z,ee){const ve=s.convert(z.format,z.colorSpace),ce=s.convert(z.type),me=E(z.internalFormat,ve,ce,z.colorSpace);if(!i.get(S).__hasExternalTextures){const We=Math.max(1,S.width>>ee),J=Math.max(1,S.height>>ee);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,me,We,J,S.depth,0,ve,ce,null):t.texImage2D(Z,ee,me,We,J,0,ve,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),xe(S)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,Z,i.get(z).__webglTexture,0,Ne(S)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,Z,i.get(z).__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(A,S,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),S.depthBuffer&&!S.stencilBuffer){let Q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||xe(S)){const Z=S.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Hi?Q=n.DEPTH_COMPONENT32F:Z.type===Bi&&(Q=n.DEPTH_COMPONENT24));const ee=Ne(S);xe(S)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,Q,S.width,S.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,Q,S.width,S.height)}else n.renderbufferStorage(n.RENDERBUFFER,Q,S.width,S.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(S.depthBuffer&&S.stencilBuffer){const Q=Ne(S);z&&xe(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,S.width,S.height):xe(S)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const Q=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],ve=s.convert(ee.format,ee.colorSpace),ce=s.convert(ee.type),me=E(ee.internalFormat,ve,ce,ee.colorSpace),Re=Ne(S);z&&xe(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,me,S.width,S.height):xe(S)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,me,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,me,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const Q=i.get(S.depthTexture).__webglTexture,Z=Ne(S);if(S.depthTexture.format===gr)xe(S)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(S.depthTexture.format===ds)xe(S)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Pe(A){const S=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Be(S.__webglFramebuffer,A)}else if(z){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]=n.createRenderbuffer(),Fe(S.__webglDepthbuffer[Q],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),Fe(S.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function et(A,S,z){const Q=i.get(A);S!==void 0&&Me(Q.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Pe(A)}function O(A){const S=A.texture,z=i.get(A),Q=i.get(S);A.addEventListener("dispose",k),A.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=S.version,a.memory.textures++);const Z=A.isWebGLCubeRenderTarget===!0,ee=A.isWebGLMultipleRenderTargets===!0,ve=m(A)||o;if(Z){z.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[ce]=[];for(let me=0;me<S.mipmaps.length;me++)z.__webglFramebuffer[ce][me]=n.createFramebuffer()}else z.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let ce=0;ce<S.mipmaps.length;ce++)z.__webglFramebuffer[ce]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ee)if(r.drawBuffers){const ce=A.texture;for(let me=0,Re=ce.length;me<Re;me++){const We=i.get(ce[me]);We.__webglTexture===void 0&&(We.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&xe(A)===!1){const ce=ee?S:[S];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<ce.length;me++){const Re=ce[me];z.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[me]);const We=s.convert(Re.format,Re.colorSpace),J=s.convert(Re.type),rt=E(Re.internalFormat,We,J,Re.colorSpace,A.isXRRenderTarget===!0),Je=Ne(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Je,rt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,z.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Fe(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),X(n.TEXTURE_CUBE_MAP,S,ve);for(let ce=0;ce<6;ce++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)Me(z.__webglFramebuffer[ce][me],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else Me(z.__webglFramebuffer[ce],A,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);v(S,ve)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const ce=A.texture;for(let me=0,Re=ce.length;me<Re;me++){const We=ce[me],J=i.get(We);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),X(n.TEXTURE_2D,We,ve),Me(z.__webglFramebuffer,A,We,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),v(We,ve)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?ce=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Q.__webglTexture),X(ce,S,ve),o&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)Me(z.__webglFramebuffer[me],A,S,n.COLOR_ATTACHMENT0,ce,me);else Me(z.__webglFramebuffer,A,S,n.COLOR_ATTACHMENT0,ce,0);v(S,ve)&&M(ce),t.unbindTexture()}A.depthBuffer&&Pe(A)}function en(A){const S=m(A)||o,z=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let Q=0,Z=z.length;Q<Z;Q++){const ee=z[Q];if(v(ee,S)){const ve=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ce=i.get(ee).__webglTexture;t.bindTexture(ve,ce),M(ve),t.unbindTexture()}}}function Te(A){if(o&&A.samples>0&&xe(A)===!1){const S=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],z=A.width,Q=A.height;let Z=n.COLOR_BUFFER_BIT;const ee=[],ve=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(A),me=A.isWebGLMultipleRenderTargets===!0;if(me)for(let Re=0;Re<S.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Re=0;Re<S.length;Re++){ee.push(n.COLOR_ATTACHMENT0+Re),A.depthBuffer&&ee.push(ve);const We=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(We===!1&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),me&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[Re]),We===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ve]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ve])),me){const J=i.get(S[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,z,Q,0,0,z,Q,Z,n.NEAREST),f&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<S.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,ce.__webglColorRenderbuffer[Re]);const We=i.get(S[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,We,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Ne(A){return Math.min(r.maxSamples,A.samples)}function xe(A){const S=i.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function vt(A){const S=a.render.frame;l.get(A)!==S&&(l.set(A,S),A.update())}function Ve(A,S){const z=A.colorSpace,Q=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Ec||z!==wi&&z!==Sn&&(st.getTransfer(z)===_t?o===!1?e.has("EXT_sRGB")===!0&&Q===qn?(A.format=Ec,A.minFilter=Dn,A.generateMipmaps=!1):S=Rd.sRGBToLinear(S):(Q!==qn||Z!==qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}this.allocateTextureUnit=P,this.resetTextureUnits=N,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=j,this.setTextureCube=q,this.rebindTextures=et,this.setupRenderTarget=O,this.updateRenderTargetMipmap=en,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=xe}function Qv(n,e,t){const i=t.isWebGL2;function r(s,a=Sn){let o;const c=st.getTransfer(a);if(s===qi)return n.UNSIGNED_BYTE;if(s===yd)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Md)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Um)return n.BYTE;if(s===Nm)return n.SHORT;if(s===al)return n.UNSIGNED_SHORT;if(s===vd)return n.INT;if(s===Bi)return n.UNSIGNED_INT;if(s===Hi)return n.FLOAT;if(s===Gs)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===km)return n.ALPHA;if(s===qn)return n.RGBA;if(s===Om)return n.LUMINANCE;if(s===Fm)return n.LUMINANCE_ALPHA;if(s===gr)return n.DEPTH_COMPONENT;if(s===ds)return n.DEPTH_STENCIL;if(s===Ec)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===zm)return n.RED;if(s===Sd)return n.RED_INTEGER;if(s===Bm)return n.RG;if(s===bd)return n.RG_INTEGER;if(s===Ed)return n.RGBA_INTEGER;if(s===Ra||s===Pa||s===La||s===Da)if(c===_t)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Ra)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Pa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===La)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Da)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Ra)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Pa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===La)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Da)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Vl||s===Wl||s===Xl||s===jl)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Vl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Wl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Xl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===jl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Td)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ql||s===$l)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===ql)return c===_t?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===$l)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Yl||s===Kl||s===Jl||s===Zl||s===Ql||s===ef||s===tf||s===nf||s===rf||s===sf||s===of||s===af||s===cf||s===lf)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Yl)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Kl)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Jl)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Zl)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ql)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ef)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===tf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===nf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===rf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===sf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===of)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===af)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===cf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===lf)return c===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ia||s===ff||s===hf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Ia)return c===_t?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ff)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===hf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Hm||s===df||s===uf||s===pf)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Ia)return o.COMPRESSED_RED_RGTC1_EXT;if(s===df)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===uf)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===pf)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===mr?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class ey extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Yn extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ty={type:"move"};class rc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),u=this._getHandJoint(f,_);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const l=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],d=l.position.distanceTo(h.position),p=.02,x=.005;f.inputState.pinching&&d>p+x?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&d<=p-x&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ty)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),f!==null&&(f.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Yn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ny extends xs{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,f=null,l=null,h=null,d=null,p=null,x=null;const _=t.getContextAttributes();let m=null,u=null;const v=[],M=[],E=new Ke;let R=null;const C=new In;C.layers.enable(1),C.viewport=new Ht;const w=new In;w.layers.enable(2),w.viewport=new Ht;const k=[C,w],y=new ey;y.layers.enable(1),y.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=v[X];return K===void 0&&(K=new rc,v[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=v[X];return K===void 0&&(K=new rc,v[X]=K),K.getGripSpace()},this.getHand=function(X){let K=v[X];return K===void 0&&(K=new rc,v[X]=K),K.getHandSpace()};function W(X){const K=M.indexOf(X.inputSource);if(K===-1)return;const fe=v[K];fe!==void 0&&(fe.update(X.inputSource,X.frame,f||a),fe.dispatchEvent({type:X.type,data:X.inputSource}))}function N(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",P);for(let X=0;X<v.length;X++){const K=M[X];K!==null&&(M[X]=null,v[X].disconnect(K))}T=null,B=null,e.setRenderTarget(m),p=null,d=null,h=null,r=null,u=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||a},this.setReferenceSpace=function(X){f=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",N),r.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new Mr(p.framebufferWidth,p.framebufferHeight,{format:qn,type:qi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,fe=null,be=null;_.depth&&(be=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?ds:gr,fe=_.stencil?mr:Bi);const Me={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(Me),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),u=new Mr(d.textureWidth,d.textureHeight,{format:qn,type:qi,depthTexture:new Hd(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Fe=e.properties.get(u);Fe.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),f=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(X){for(let K=0;K<X.removed.length;K++){const fe=X.removed[K],be=M.indexOf(fe);be>=0&&(M[be]=null,v[be].disconnect(fe))}for(let K=0;K<X.added.length;K++){const fe=X.added[K];let be=M.indexOf(fe);if(be===-1){for(let Fe=0;Fe<v.length;Fe++)if(Fe>=M.length){M.push(fe),be=Fe;break}else if(M[Fe]===null){M[Fe]=fe,be=Fe;break}if(be===-1)break}const Me=v[be];Me&&Me.connect(fe)}}const I=new D,V=new D;function $(X,K,fe){I.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(fe.matrixWorld);const be=I.distanceTo(V),Me=K.projectionMatrix.elements,Fe=fe.projectionMatrix.elements,Be=Me[14]/(Me[10]-1),Pe=Me[14]/(Me[10]+1),et=(Me[9]+1)/Me[5],O=(Me[9]-1)/Me[5],en=(Me[8]-1)/Me[0],Te=(Fe[8]+1)/Fe[0],Ne=Be*en,xe=Be*Te,vt=be/(-en+Te),Ve=vt*-en;K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ve),X.translateZ(vt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const A=Be+vt,S=Pe+vt,z=Ne-Ve,Q=xe+(be-Ve),Z=et*Pe/S*A,ee=O*Pe/S*A;X.projectionMatrix.makePerspective(z,Q,Z,ee,A,S),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function j(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.near=w.near=C.near=X.near,y.far=w.far=C.far=X.far,(T!==y.near||B!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,B=y.far);const K=X.parent,fe=y.cameras;j(y,K);for(let be=0;be<fe.length;be++)j(fe[be],K);fe.length===2?$(y,C,w):y.projectionMatrix.copy(C.projectionMatrix),q(X,y,K)};function q(X,K,fe){fe===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(fe.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Tc*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let Y=null;function ne(X,K){if(l=K.getViewerPose(f||a),x=K,l!==null){const fe=l.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let be=!1;fe.length!==y.cameras.length&&(y.cameras.length=0,be=!0);for(let Me=0;Me<fe.length;Me++){const Fe=fe[Me];let Be=null;if(p!==null)Be=p.getViewport(Fe);else{const et=h.getViewSubImage(d,Fe);Be=et.viewport,Me===0&&(e.setRenderTargetTextures(u,et.colorTexture,d.ignoreDepthValues?void 0:et.depthStencilTexture),e.setRenderTarget(u))}let Pe=k[Me];Pe===void 0&&(Pe=new In,Pe.layers.enable(Me),Pe.viewport=new Ht,k[Me]=Pe),Pe.matrix.fromArray(Fe.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Fe.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Be.x,Be.y,Be.width,Be.height),Me===0&&(y.matrix.copy(Pe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),be===!0&&y.cameras.push(Pe)}}for(let fe=0;fe<v.length;fe++){const be=M[fe],Me=v[fe];be!==null&&Me!==void 0&&Me.update(be,K,f||a)}Y&&Y(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const ie=new zd;ie.setAnimationLoop(ne),this.setAnimationLoop=function(X){Y=X},this.dispose=function(){}}}function iy(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,kd(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,v,M,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),l(m,u)):u.isMeshStandardMaterial?(s(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,E)):u.isMeshMatcapMaterial?(s(m,u),x(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),_(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?c(m,u,v,M):u.isSpriteMaterial?f(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===an&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===an&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const M=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*M,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function c(m,u,v,M){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*v,m.scale.value=M*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,v){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===an&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,u){u.matcap&&(m.matcap.value=u.matcap)}function _(m,u){const v=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ry(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,M){const E=M.program;i.uniformBlockBinding(v,E)}function f(v,M){let E=r[v.id];E===void 0&&(x(v),E=l(v),r[v.id]=E,v.addEventListener("dispose",m));const R=M.program;i.updateUBOMapping(v,R);const C=e.render.frame;s[v.id]!==C&&(d(v),s[v.id]=C)}function l(v){const M=h();v.__bindingPointIndex=M;const E=n.createBuffer(),R=v.__size,C=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const M=r[v.id],E=v.uniforms,R=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let C=0,w=E.length;C<w;C++){const k=Array.isArray(E[C])?E[C]:[E[C]];for(let y=0,T=k.length;y<T;y++){const B=k[y];if(p(B,C,y,R)===!0){const W=B.__offset,N=Array.isArray(B.value)?B.value:[B.value];let P=0;for(let I=0;I<N.length;I++){const V=N[I],$=_(V);typeof V=="number"||typeof V=="boolean"?(B.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,W+P,B.__data)):V.isMatrix3?(B.__data[0]=V.elements[0],B.__data[1]=V.elements[1],B.__data[2]=V.elements[2],B.__data[3]=0,B.__data[4]=V.elements[3],B.__data[5]=V.elements[4],B.__data[6]=V.elements[5],B.__data[7]=0,B.__data[8]=V.elements[6],B.__data[9]=V.elements[7],B.__data[10]=V.elements[8],B.__data[11]=0):(V.toArray(B.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,B.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,M,E,R){const C=v.value,w=M+"_"+E;if(R[w]===void 0)return typeof C=="number"||typeof C=="boolean"?R[w]=C:R[w]=C.clone(),!0;{const k=R[w];if(typeof C=="number"||typeof C=="boolean"){if(k!==C)return R[w]=C,!0}else if(k.equals(C)===!1)return k.copy(C),!0}return!1}function x(v){const M=v.uniforms;let E=0;const R=16;for(let w=0,k=M.length;w<k;w++){const y=Array.isArray(M[w])?M[w]:[M[w]];for(let T=0,B=y.length;T<B;T++){const W=y[T],N=Array.isArray(W.value)?W.value:[W.value];for(let P=0,I=N.length;P<I;P++){const V=N[P],$=_(V),j=E%R;j!==0&&R-j<$.boundary&&(E+=R-j),W.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=E,E+=$.storage}}}const C=E%R;return C>0&&(E+=R-C),v.__size=E,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function u(){for(const v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:f,dispose:u}}class qd{constructor(e={}){const{canvas:t=Qm(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:f=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),x=new Int32Array(4);let _=null,m=null;const u=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this._useLegacyLights=!1,this.toneMapping=ji,this.toneMappingExposure=1;const M=this;let E=!1,R=0,C=0,w=null,k=-1,y=null;const T=new Ht,B=new Ht;let W=null;const N=new we(0);let P=0,I=t.width,V=t.height,$=1,j=null,q=null;const Y=new Ht(0,0,I,V),ne=new Ht(0,0,I,V);let ie=!1;const X=new fl;let K=!1,fe=!1,be=null;const Me=new Ze,Fe=new Ke,Be=new D,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function et(){return w===null?$:1}let O=i;function en(b,U){for(let H=0;H<b.length;H++){const G=b[H],F=t.getContext(G,U);if(F!==null)return F}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:f,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${sl}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",oe,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&U.shift(),O=en(U,b),O===null)throw en(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Te,Ne,xe,vt,Ve,A,S,z,Q,Z,ee,ve,ce,me,Re,We,J,rt,Je,Ie,Ee,ge,He,nt;function St(){Te=new px(O),Ne=new cx(O,Te,e),Te.init(Ne),ge=new Qv(O,Te,Ne),xe=new Jv(O,Te,Ne),vt=new _x(O),Ve=new Ov,A=new Zv(O,Te,xe,Ve,Ne,ge,vt),S=new fx(M),z=new ux(M),Q=new Tg(O,Ne),He=new ox(O,Te,Q,Ne),Z=new mx(O,Q,vt,He),ee=new Mx(O,Z,Q,vt),Je=new yx(O,Ne,A),We=new lx(Ve),ve=new kv(M,S,z,Te,Ne,He,We),ce=new iy(M,Ve),me=new zv,Re=new Xv(Te,Ne),rt=new sx(M,S,z,xe,ee,d,c),J=new Kv(M,ee,Ne),nt=new ry(O,vt,Ne,xe),Ie=new ax(O,Te,vt,Ne),Ee=new gx(O,Te,vt,Ne),vt.programs=ve.programs,M.capabilities=Ne,M.extensions=Te,M.properties=Ve,M.renderLists=me,M.shadowMap=J,M.state=xe,M.info=vt}St();const qe=new ny(M,O);this.xr=qe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=Te.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Te.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(I,V,!1))},this.getSize=function(b){return b.set(I,V)},this.setSize=function(b,U,H=!0){if(qe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=b,V=U,t.width=Math.floor(b*$),t.height=Math.floor(U*$),H===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(I*$,V*$).floor()},this.setDrawingBufferSize=function(b,U,H){I=b,V=U,$=H,t.width=Math.floor(b*H),t.height=Math.floor(U*H),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,U,H,G){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,U,H,G),xe.viewport(T.copy(Y).multiplyScalar($).floor())},this.getScissor=function(b){return b.copy(ne)},this.setScissor=function(b,U,H,G){b.isVector4?ne.set(b.x,b.y,b.z,b.w):ne.set(b,U,H,G),xe.scissor(B.copy(ne).multiplyScalar($).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(b){xe.setScissorTest(ie=b)},this.setOpaqueSort=function(b){j=b},this.setTransparentSort=function(b){q=b},this.getClearColor=function(b){return b.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor.apply(rt,arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha.apply(rt,arguments)},this.clear=function(b=!0,U=!0,H=!0){let G=0;if(b){let F=!1;if(w!==null){const de=w.texture.format;F=de===Ed||de===bd||de===Sd}if(F){const de=w.texture.type,ye=de===qi||de===Bi||de===al||de===mr||de===yd||de===Md,Ce=rt.getClearColor(),De=rt.getClearAlpha(),Xe=Ce.r,ke=Ce.g,ze=Ce.b;ye?(p[0]=Xe,p[1]=ke,p[2]=ze,p[3]=De,O.clearBufferuiv(O.COLOR,0,p)):(x[0]=Xe,x[1]=ke,x[2]=ze,x[3]=De,O.clearBufferiv(O.COLOR,0,x))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT),H&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),me.dispose(),Re.dispose(),Ve.dispose(),S.dispose(),z.dispose(),ee.dispose(),He.dispose(),nt.dispose(),ve.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",tn),qe.removeEventListener("sessionend",ut),be&&(be.dispose(),be=null),nn.stop()};function re(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const b=vt.autoReset,U=J.enabled,H=J.autoUpdate,G=J.needsUpdate,F=J.type;St(),vt.autoReset=b,J.enabled=U,J.autoUpdate=H,J.needsUpdate=G,J.type=F}function oe(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ae(b){const U=b.target;U.removeEventListener("dispose",ae),Le(U)}function Le(b){Ae(b),Ve.remove(b)}function Ae(b){const U=Ve.get(b).programs;U!==void 0&&(U.forEach(function(H){ve.releaseProgram(H)}),b.isShaderMaterial&&ve.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,H,G,F,de){U===null&&(U=Pe);const ye=F.isMesh&&F.matrixWorld.determinant()<0,Ce=Mp(b,U,H,G,F);xe.setMaterial(G,ye);let De=H.index,Xe=1;if(G.wireframe===!0){if(De=Z.getWireframeAttribute(H),De===void 0)return;Xe=2}const ke=H.drawRange,ze=H.attributes.position;let Tt=ke.start*Xe,pn=(ke.start+ke.count)*Xe;de!==null&&(Tt=Math.max(Tt,de.start*Xe),pn=Math.min(pn,(de.start+de.count)*Xe)),De!==null?(Tt=Math.max(Tt,0),pn=Math.min(pn,De.count)):ze!=null&&(Tt=Math.max(Tt,0),pn=Math.min(pn,ze.count));const kt=pn-Tt;if(kt<0||kt===1/0)return;He.setup(F,G,Ce,H,De);let li,yt=Ie;if(De!==null&&(li=Q.get(De),yt=Ee,yt.setIndex(li)),F.isMesh)G.wireframe===!0?(xe.setLineWidth(G.wireframeLinewidth*et()),yt.setMode(O.LINES)):yt.setMode(O.TRIANGLES);else if(F.isLine){let $e=G.linewidth;$e===void 0&&($e=1),xe.setLineWidth($e*et()),F.isLineSegments?yt.setMode(O.LINES):F.isLineLoop?yt.setMode(O.LINE_LOOP):yt.setMode(O.LINE_STRIP)}else F.isPoints?yt.setMode(O.POINTS):F.isSprite&&yt.setMode(O.TRIANGLES);if(F.isBatchedMesh)yt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)yt.renderInstances(Tt,kt,F.count);else if(H.isInstancedBufferGeometry){const $e=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ba=Math.min(H.instanceCount,$e);yt.renderInstances(Tt,kt,ba)}else yt.render(Tt,kt)};function ht(b,U,H){b.transparent===!0&&b.side===Wt&&b.forceSinglePass===!1?(b.side=an,b.needsUpdate=!0,so(b,U,H),b.side=Yi,b.needsUpdate=!0,so(b,U,H),b.side=Wt):so(b,U,H)}this.compile=function(b,U,H=null){H===null&&(H=b),m=Re.get(H),m.init(),v.push(m),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),b!==H&&b.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(M._useLegacyLights);const G=new Set;return b.traverse(function(F){const de=F.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){const Ce=de[ye];ht(Ce,H,F),G.add(Ce)}else ht(de,H,F),G.add(de)}),v.pop(),m=null,G},this.compileAsync=function(b,U,H=null){const G=this.compile(b,U,H);return new Promise(F=>{function de(){if(G.forEach(function(ye){Ve.get(ye).currentProgram.isReady()&&G.delete(ye)}),G.size===0){F(b);return}setTimeout(de,10)}Te.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let dt=null;function Nt(b){dt&&dt(b)}function tn(){nn.stop()}function ut(){nn.start()}const nn=new zd;nn.setAnimationLoop(Nt),typeof self!="undefined"&&nn.setContext(self),this.setAnimationLoop=function(b){dt=b,qe.setAnimationLoop(b),b===null?nn.stop():nn.start()},qe.addEventListener("sessionstart",tn),qe.addEventListener("sessionend",ut),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(U),U=qe.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,U,w),m=Re.get(b,v.length),m.init(),v.push(m),Me.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Me),fe=this.localClippingEnabled,K=We.init(this.clippingPlanes,fe),_=me.get(b,u.length),_.init(),u.push(_),Qn(b,U,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(j,q),this.info.render.frame++,K===!0&&We.beginShadows();const H=m.state.shadowsArray;if(J.render(H,b,U),K===!0&&We.endShadows(),this.info.autoReset===!0&&this.info.reset(),rt.render(_,b),m.setupLights(M._useLegacyLights),U.isArrayCamera){const G=U.cameras;for(let F=0,de=G.length;F<de;F++){const ye=G[F];wl(_,b,ye,ye.viewport)}}else wl(_,b,U);w!==null&&(A.updateMultisampleRenderTarget(w),A.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(M,b,U),He.resetDefaultState(),k=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function Qn(b,U,H,G){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){G&&Be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Me);const ye=ee.update(b),Ce=b.material;Ce.visible&&_.push(b,ye,Ce,H,Be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const ye=ee.update(b),Ce=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Be.copy(b.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Be.copy(ye.boundingSphere.center)),Be.applyMatrix4(b.matrixWorld).applyMatrix4(Me)),Array.isArray(Ce)){const De=ye.groups;for(let Xe=0,ke=De.length;Xe<ke;Xe++){const ze=De[Xe],Tt=Ce[ze.materialIndex];Tt&&Tt.visible&&_.push(b,ye,Tt,H,Be.z,ze)}}else Ce.visible&&_.push(b,ye,Ce,H,Be.z,null)}}const de=b.children;for(let ye=0,Ce=de.length;ye<Ce;ye++)Qn(de[ye],U,H,G)}function wl(b,U,H,G){const F=b.opaque,de=b.transmissive,ye=b.transparent;m.setupLightsView(H),K===!0&&We.setGlobalState(M.clippingPlanes,H),de.length>0&&yp(F,de,U,H),G&&xe.viewport(T.copy(G)),F.length>0&&ro(F,U,H),de.length>0&&ro(de,U,H),ye.length>0&&ro(ye,U,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function yp(b,U,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const de=Ne.isWebGL2;be===null&&(be=new Mr(1,1,{generateMipmaps:!0,type:Te.has("EXT_color_buffer_half_float")?Gs:qi,minFilter:Hs,samples:de?4:0})),M.getDrawingBufferSize(Fe),de?be.setSize(Fe.x,Fe.y):be.setSize(Ac(Fe.x),Ac(Fe.y));const ye=M.getRenderTarget();M.setRenderTarget(be),M.getClearColor(N),P=M.getClearAlpha(),P<1&&M.setClearColor(16777215,.5),M.clear();const Ce=M.toneMapping;M.toneMapping=ji,ro(b,H,G),A.updateMultisampleRenderTarget(be),A.updateRenderTargetMipmap(be);let De=!1;for(let Xe=0,ke=U.length;Xe<ke;Xe++){const ze=U[Xe],Tt=ze.object,pn=ze.geometry,kt=ze.material,li=ze.group;if(kt.side===Wt&&Tt.layers.test(G.layers)){const yt=kt.side;kt.side=an,kt.needsUpdate=!0,Rl(Tt,H,G,pn,kt,li),kt.side=yt,kt.needsUpdate=!0,De=!0}}De===!0&&(A.updateMultisampleRenderTarget(be),A.updateRenderTargetMipmap(be)),M.setRenderTarget(ye),M.setClearColor(N,P),M.toneMapping=Ce}function ro(b,U,H){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,de=b.length;F<de;F++){const ye=b[F],Ce=ye.object,De=ye.geometry,Xe=G===null?ye.material:G,ke=ye.group;Ce.layers.test(H.layers)&&Rl(Ce,U,H,De,Xe,ke)}}function Rl(b,U,H,G,F,de){b.onBeforeRender(M,U,H,G,F,de),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(M,U,H,G,b,de),F.transparent===!0&&F.side===Wt&&F.forceSinglePass===!1?(F.side=an,F.needsUpdate=!0,M.renderBufferDirect(H,U,G,F,b,de),F.side=Yi,F.needsUpdate=!0,M.renderBufferDirect(H,U,G,F,b,de),F.side=Wt):M.renderBufferDirect(H,U,G,F,b,de),b.onAfterRender(M,U,H,G,F,de)}function so(b,U,H){U.isScene!==!0&&(U=Pe);const G=Ve.get(b),F=m.state.lights,de=m.state.shadowsArray,ye=F.state.version,Ce=ve.getParameters(b,F.state,de,U,H),De=ve.getProgramCacheKey(Ce);let Xe=G.programs;G.environment=b.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(b.isMeshStandardMaterial?z:S).get(b.envMap||G.environment),Xe===void 0&&(b.addEventListener("dispose",ae),Xe=new Map,G.programs=Xe);let ke=Xe.get(De);if(ke!==void 0){if(G.currentProgram===ke&&G.lightsStateVersion===ye)return Ll(b,Ce),ke}else Ce.uniforms=ve.getUniforms(b),b.onBuild(H,Ce,M),b.onBeforeCompile(Ce,M),ke=ve.acquireProgram(Ce,De),Xe.set(De,ke),G.uniforms=Ce.uniforms;const ze=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ze.clippingPlanes=We.uniform),Ll(b,Ce),G.needsLights=bp(b),G.lightsStateVersion=ye,G.needsLights&&(ze.ambientLightColor.value=F.state.ambient,ze.lightProbe.value=F.state.probe,ze.directionalLights.value=F.state.directional,ze.directionalLightShadows.value=F.state.directionalShadow,ze.spotLights.value=F.state.spot,ze.spotLightShadows.value=F.state.spotShadow,ze.rectAreaLights.value=F.state.rectArea,ze.ltc_1.value=F.state.rectAreaLTC1,ze.ltc_2.value=F.state.rectAreaLTC2,ze.pointLights.value=F.state.point,ze.pointLightShadows.value=F.state.pointShadow,ze.hemisphereLights.value=F.state.hemi,ze.directionalShadowMap.value=F.state.directionalShadowMap,ze.directionalShadowMatrix.value=F.state.directionalShadowMatrix,ze.spotShadowMap.value=F.state.spotShadowMap,ze.spotLightMatrix.value=F.state.spotLightMatrix,ze.spotLightMap.value=F.state.spotLightMap,ze.pointShadowMap.value=F.state.pointShadowMap,ze.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=ke,G.uniformsList=null,ke}function Pl(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=No.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Ll(b,U){const H=Ve.get(b);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Mp(b,U,H,G,F){U.isScene!==!0&&(U=Pe),A.resetTextureUnits();const de=U.fog,ye=G.isMeshStandardMaterial?U.environment:null,Ce=w===null?M.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:wi,De=(G.isMeshStandardMaterial?z:S).get(G.envMap||ye),Xe=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ke=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),ze=!!H.morphAttributes.position,Tt=!!H.morphAttributes.normal,pn=!!H.morphAttributes.color;let kt=ji;G.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(kt=M.toneMapping);const li=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,yt=li!==void 0?li.length:0,$e=Ve.get(G),ba=m.state.lights;if(K===!0&&(fe===!0||b!==y)){const En=b===y&&G.id===k;We.setState(G,b,En)}let bt=!1;G.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==ba.state.version||$e.outputColorSpace!==Ce||F.isBatchedMesh&&$e.batching===!1||!F.isBatchedMesh&&$e.batching===!0||F.isInstancedMesh&&$e.instancing===!1||!F.isInstancedMesh&&$e.instancing===!0||F.isSkinnedMesh&&$e.skinning===!1||!F.isSkinnedMesh&&$e.skinning===!0||F.isInstancedMesh&&$e.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&$e.instancingColor===!1&&F.instanceColor!==null||$e.envMap!==De||G.fog===!0&&$e.fog!==de||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==We.numPlanes||$e.numIntersection!==We.numIntersection)||$e.vertexAlphas!==Xe||$e.vertexTangents!==ke||$e.morphTargets!==ze||$e.morphNormals!==Tt||$e.morphColors!==pn||$e.toneMapping!==kt||Ne.isWebGL2===!0&&$e.morphTargetsCount!==yt)&&(bt=!0):(bt=!0,$e.__version=G.version);let Zi=$e.currentProgram;bt===!0&&(Zi=so(G,U,F));let Dl=!1,Ss=!1,Ea=!1;const Xt=Zi.getUniforms(),Qi=$e.uniforms;if(xe.useProgram(Zi.program)&&(Dl=!0,Ss=!0,Ea=!0),G.id!==k&&(k=G.id,Ss=!0),Dl||y!==b){Xt.setValue(O,"projectionMatrix",b.projectionMatrix),Xt.setValue(O,"viewMatrix",b.matrixWorldInverse);const En=Xt.map.cameraPosition;En!==void 0&&En.setValue(O,Be.setFromMatrixPosition(b.matrixWorld)),Ne.logarithmicDepthBuffer&&Xt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Xt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Ss=!0,Ea=!0)}if(F.isSkinnedMesh){Xt.setOptional(O,F,"bindMatrix"),Xt.setOptional(O,F,"bindMatrixInverse");const En=F.skeleton;En&&(Ne.floatVertexTextures?(En.boneTexture===null&&En.computeBoneTexture(),Xt.setValue(O,"boneTexture",En.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Xt.setOptional(O,F,"batchingTexture"),Xt.setValue(O,"batchingTexture",F._matricesTexture,A));const Ta=H.morphAttributes;if((Ta.position!==void 0||Ta.normal!==void 0||Ta.color!==void 0&&Ne.isWebGL2===!0)&&Je.update(F,H,Zi),(Ss||$e.receiveShadow!==F.receiveShadow)&&($e.receiveShadow=F.receiveShadow,Xt.setValue(O,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Qi.envMap.value=De,Qi.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Ss&&(Xt.setValue(O,"toneMappingExposure",M.toneMappingExposure),$e.needsLights&&Sp(Qi,Ea),de&&G.fog===!0&&ce.refreshFogUniforms(Qi,de),ce.refreshMaterialUniforms(Qi,G,$,V,be),No.upload(O,Pl($e),Qi,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(No.upload(O,Pl($e),Qi,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Xt.setValue(O,"center",F.center),Xt.setValue(O,"modelViewMatrix",F.modelViewMatrix),Xt.setValue(O,"normalMatrix",F.normalMatrix),Xt.setValue(O,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const En=G.uniformsGroups;for(let Aa=0,Ep=En.length;Aa<Ep;Aa++)if(Ne.isWebGL2){const Il=En[Aa];nt.update(Il,Zi),nt.bind(Il,Zi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Zi}function Sp(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function bp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,U,H){Ve.get(b.texture).__webglTexture=U,Ve.get(b.depthTexture).__webglTexture=H;const G=Ve.get(b);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,U){const H=Ve.get(b);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,H=0){w=b,R=U,C=H;let G=!0,F=null,de=!1,ye=!1;if(b){const De=Ve.get(b);De.__useDefaultFramebuffer!==void 0?(xe.bindFramebuffer(O.FRAMEBUFFER,null),G=!1):De.__webglFramebuffer===void 0?A.setupRenderTarget(b):De.__hasExternalTextures&&A.rebindTextures(b,Ve.get(b.texture).__webglTexture,Ve.get(b.depthTexture).__webglTexture);const Xe=b.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(ye=!0);const ke=Ve.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?F=ke[U][H]:F=ke[U],de=!0):Ne.isWebGL2&&b.samples>0&&A.useMultisampledRTT(b)===!1?F=Ve.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?F=ke[H]:F=ke,T.copy(b.viewport),B.copy(b.scissor),W=b.scissorTest}else T.copy(Y).multiplyScalar($).floor(),B.copy(ne).multiplyScalar($).floor(),W=ie;if(xe.bindFramebuffer(O.FRAMEBUFFER,F)&&Ne.drawBuffers&&G&&xe.drawBuffers(b,F),xe.viewport(T),xe.scissor(B),xe.setScissorTest(W),de){const De=Ve.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,De.__webglTexture,H)}else if(ye){const De=Ve.get(b.texture),Xe=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,De.__webglTexture,H||0,Xe)}k=-1},this.readRenderTargetPixels=function(b,U,H,G,F,de,ye){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ve.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){xe.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const De=b.texture,Xe=De.format,ke=De.type;if(Xe!==qn&&ge.convert(Xe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ze=ke===Gs&&(Te.has("EXT_color_buffer_half_float")||Ne.isWebGL2&&Te.has("EXT_color_buffer_float"));if(ke!==qi&&ge.convert(ke)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Hi&&(Ne.isWebGL2||Te.has("OES_texture_float")||Te.has("WEBGL_color_buffer_float")))&&!ze){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-G&&H>=0&&H<=b.height-F&&O.readPixels(U,H,G,F,ge.convert(Xe),ge.convert(ke),de)}finally{const De=w!==null?Ve.get(w).__webglFramebuffer:null;xe.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(b,U,H=0){const G=Math.pow(2,-H),F=Math.floor(U.image.width*G),de=Math.floor(U.image.height*G);A.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,b.x,b.y,F,de),xe.unbindTexture()},this.copyTextureToTexture=function(b,U,H,G=0){const F=U.image.width,de=U.image.height,ye=ge.convert(H.format),Ce=ge.convert(H.type);A.setTexture2D(H,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,G,b.x,b.y,F,de,ye,Ce,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,G,b.x,b.y,U.mipmaps[0].width,U.mipmaps[0].height,ye,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,G,b.x,b.y,ye,Ce,U.image),G===0&&H.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),xe.unbindTexture()},this.copyTextureToTexture3D=function(b,U,H,G,F=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=b.max.x-b.min.x+1,ye=b.max.y-b.min.y+1,Ce=b.max.z-b.min.z+1,De=ge.convert(G.format),Xe=ge.convert(G.type);let ke;if(G.isData3DTexture)A.setTexture3D(G,0),ke=O.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)A.setTexture2DArray(G,0),ke=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const ze=O.getParameter(O.UNPACK_ROW_LENGTH),Tt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),pn=O.getParameter(O.UNPACK_SKIP_PIXELS),kt=O.getParameter(O.UNPACK_SKIP_ROWS),li=O.getParameter(O.UNPACK_SKIP_IMAGES),yt=H.isCompressedTexture?H.mipmaps[F]:H.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,yt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,yt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,b.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,b.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,b.min.z),H.isDataTexture||H.isData3DTexture?O.texSubImage3D(ke,F,U.x,U.y,U.z,de,ye,Ce,De,Xe,yt.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(ke,F,U.x,U.y,U.z,de,ye,Ce,De,yt.data)):O.texSubImage3D(ke,F,U.x,U.y,U.z,de,ye,Ce,De,Xe,yt),O.pixelStorei(O.UNPACK_ROW_LENGTH,ze),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Tt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,pn),O.pixelStorei(O.UNPACK_SKIP_ROWS,kt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,li),F===0&&G.generateMipmaps&&O.generateMipmap(ke),xe.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),xe.unbindTexture()},this.resetState=function(){R=0,C=0,w=null,xe.reset(),He.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ll?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===ma?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Rt?_r:Ad}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===_r?Rt:wi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class sy extends qd{}sy.prototype.isWebGL1Renderer=!0;class dl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=i}clone(){return new dl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class oy extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Vs extends Kn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wr=new Ze,rh=new Ze,Po=[],sh=new br,ay=new Ze,Rs=new lt,Ps=new Qs;class ii extends lt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vs(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,ay)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new br),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wr),sh.copy(e.boundingBox).applyMatrix4(Wr),this.boundingBox.union(sh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wr),Ps.copy(e.boundingSphere).applyMatrix4(Wr),this.boundingSphere.union(Ps)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ps.copy(this.boundingSphere),Ps.applyMatrix4(i),e.ray.intersectsSphere(Ps)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Wr),rh.multiplyMatrices(i,Wr),Rs.matrixWorld=rh,Rs.raycast(e,Po);for(let a=0,o=Po.length;a<o;a++){const c=Po[a];c.instanceId=s,c.object=this,t.push(c)}Po.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vs(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ul extends dn{constructor(e,t,i,r,s,a,o,c,f){super(e,t,i,r,s,a,o,c,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _a extends un{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],f=new D,l=new Ke;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const p=i+h/t*r;f.x=e*Math.cos(p),f.y=e*Math.sin(p),a.push(f.x,f.y,f.z),o.push(0,0,1),l.x=(a[d]/e+1)/2,l.y=(a[d+1]/e+1)/2,c.push(l.x,l.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(o,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class mt extends un{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const f=this;r=Math.floor(r),s=Math.floor(s);const l=[],h=[],d=[],p=[];let x=0;const _=[],m=i/2;let u=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(l),this.setAttribute("position",new at(h,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(p,2));function v(){const E=new D,R=new D;let C=0;const w=(t-e)/i;for(let k=0;k<=s;k++){const y=[],T=k/s,B=T*(t-e)+e;for(let W=0;W<=r;W++){const N=W/r,P=N*c+o,I=Math.sin(P),V=Math.cos(P);R.x=B*I,R.y=-T*i+m,R.z=B*V,h.push(R.x,R.y,R.z),E.set(I,w,V).normalize(),d.push(E.x,E.y,E.z),p.push(N,1-T),y.push(x++)}_.push(y)}for(let k=0;k<r;k++)for(let y=0;y<s;y++){const T=_[y][k],B=_[y+1][k],W=_[y+1][k+1],N=_[y][k+1];l.push(T,B,N),l.push(B,W,N),C+=6}f.addGroup(u,C,0),u+=C}function M(E){const R=x,C=new Ke,w=new D;let k=0;const y=E===!0?e:t,T=E===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,m*T,0),d.push(0,T,0),p.push(.5,.5),x++;const B=x;for(let W=0;W<=r;W++){const P=W/r*c+o,I=Math.cos(P),V=Math.sin(P);w.x=y*V,w.y=m*T,w.z=y*I,h.push(w.x,w.y,w.z),d.push(0,T,0),C.x=I*.5+.5,C.y=V*.5*T+.5,p.push(C.x,C.y),x++}for(let W=0;W<r;W++){const N=R+W,P=B+W;E===!0?l.push(P,P+1,N):l.push(P+1,P,N),k+=3}f.addGroup(u,k,E===!0?1:2),u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bi extends mt{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new bi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class pl extends un{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),f(i),l(),this.setAttribute("position",new at(s,3)),this.setAttribute("normal",new at(s.slice(),3)),this.setAttribute("uv",new at(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new D,E=new D,R=new D;for(let C=0;C<t.length;C+=3)p(t[C+0],M),p(t[C+1],E),p(t[C+2],R),c(M,E,R,v)}function c(v,M,E,R){const C=R+1,w=[];for(let k=0;k<=C;k++){w[k]=[];const y=v.clone().lerp(E,k/C),T=M.clone().lerp(E,k/C),B=C-k;for(let W=0;W<=B;W++)W===0&&k===C?w[k][W]=y:w[k][W]=y.clone().lerp(T,W/B)}for(let k=0;k<C;k++)for(let y=0;y<2*(C-k)-1;y++){const T=Math.floor(y/2);y%2===0?(d(w[k][T+1]),d(w[k+1][T]),d(w[k][T])):(d(w[k][T+1]),d(w[k+1][T+1]),d(w[k+1][T]))}}function f(v){const M=new D;for(let E=0;E<s.length;E+=3)M.x=s[E+0],M.y=s[E+1],M.z=s[E+2],M.normalize().multiplyScalar(v),s[E+0]=M.x,s[E+1]=M.y,s[E+2]=M.z}function l(){const v=new D;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const E=m(v)/2/Math.PI+.5,R=u(v)/Math.PI+.5;a.push(E,1-R)}x(),h()}function h(){for(let v=0;v<a.length;v+=6){const M=a[v+0],E=a[v+2],R=a[v+4],C=Math.max(M,E,R),w=Math.min(M,E,R);C>.9&&w<.1&&(M<.2&&(a[v+0]+=1),E<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function p(v,M){const E=v*3;M.x=e[E+0],M.y=e[E+1],M.z=e[E+2]}function x(){const v=new D,M=new D,E=new D,R=new D,C=new Ke,w=new Ke,k=new Ke;for(let y=0,T=0;y<s.length;y+=9,T+=6){v.set(s[y+0],s[y+1],s[y+2]),M.set(s[y+3],s[y+4],s[y+5]),E.set(s[y+6],s[y+7],s[y+8]),C.set(a[T+0],a[T+1]),w.set(a[T+2],a[T+3]),k.set(a[T+4],a[T+5]),R.copy(v).add(M).add(E).divideScalar(3);const B=m(R);_(C,T+0,v,B),_(w,T+2,M,B),_(k,T+4,E,B)}}function _(v,M,E,R){R<0&&v.x===1&&(a[M]=v.x-1),E.x===0&&E.z===0&&(a[M]=R/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pl(e.vertices,e.indices,e.radius,e.details)}}class ea extends pl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ea(e.radius,e.detail)}}class eo extends un{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],f=[],l=[];let h=e;const d=(t-e)/r,p=new D,x=new Ke;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const u=s+m/i*a;p.x=h*Math.cos(u),p.y=h*Math.sin(u),c.push(p.x,p.y,p.z),f.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,l.push(x.x,x.y)}h+=d}for(let _=0;_<r;_++){const m=_*(i+1);for(let u=0;u<i;u++){const v=u+m,M=v,E=v+i+1,R=v+i+2,C=v+1;o.push(M,E,C),o.push(E,R,C)}}this.setIndex(o),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(f,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class yn extends un{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let f=0;const l=[],h=new D,d=new D,p=[],x=[],_=[],m=[];for(let u=0;u<=i;u++){const v=[],M=u/i;let E=0;u===0&&a===0?E=.5/t:u===i&&c===Math.PI&&(E=-.5/t);for(let R=0;R<=t;R++){const C=R/t;h.x=-e*Math.cos(r+C*s)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(r+C*s)*Math.sin(a+M*o),x.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(C+E,1-M),v.push(f++)}l.push(v)}for(let u=0;u<i;u++)for(let v=0;v<t;v++){const M=l[u][v+1],E=l[u][v],R=l[u+1][v],C=l[u+1][v+1];(u!==0||a>0)&&p.push(M,E,C),(u!==i-1||c<Math.PI)&&p.push(E,R,C)}this.setIndex(p),this.setAttribute("position",new at(x,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $r extends un{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],f=[],l=new D,h=new D,d=new D;for(let p=0;p<=i;p++)for(let x=0;x<=r;x++){const _=x/r*s,m=p/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),l.x=e*Math.cos(_),l.y=e*Math.sin(_),d.subVectors(h,l).normalize(),c.push(d.x,d.y,d.z),f.push(x/r),f.push(p/i)}for(let p=1;p<=i;p++)for(let x=1;x<=r;x++){const _=(r+1)*p+x-1,m=(r+1)*(p-1)+x-1,u=(r+1)*(p-1)+x,v=(r+1)*p+x;a.push(_,m,v),a.push(m,u,v)}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class $d extends vs{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class On extends vs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yd extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class cy extends Yd{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const sc=new Ze,oh=new D,ah=new D;class ly{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fl,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(oh),ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ah),t.updateMatrixWorld(),sc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fy extends ly{constructor(){super(new Bd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hy extends Yd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new fy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sl);const Kd={low:{name:"Low",pixelRatio:1,antialias:!1,particles:120,splats:30,fogScale:.8,shadows:0,softShadows:!1,shadowRange:0,grass:0,clouds:!1},medium:{name:"Medium",pixelRatio:1.35,antialias:!0,particles:260,splats:60,fogScale:1,shadows:1024,softShadows:!1,shadowRange:30,grass:2600,clouds:!0},high:{name:"High",pixelRatio:2,antialias:!0,particles:420,splats:90,fogScale:1,shadows:2048,softShadows:!0,shadowRange:42,grass:6e3,clouds:!0}},ch=["low","medium","high"];function dy(){try{return localStorage.getItem("rally-quality")||"auto"}catch{return"auto"}}function uy(n){try{localStorage.setItem("rally-quality",n)}catch{}}function py(){let n="";try{const r=document.createElement("canvas"),s=r.getContext("webgl"),a=s&&s.getExtension("WEBGL_debug_renderer_info");n=a?String(s.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{}const e=navigator.hardwareConcurrency||4,t=navigator.deviceMemory||4,i=matchMedia("(pointer: coarse)").matches;return/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(n)||t<=2||e<=2?"low":i?t<=3||e<=4?"low":"medium":"high"}const ft={setting:dy(),detected:py(),level:"medium",stepped:!1,get cfg(){return Kd[this.level]}};ft.level=ft.setting==="auto"?ft.detected:ft.setting;function my(){const n=ch.indexOf(ft.level);return n<=0?null:(ft.level=ch[n-1],ft.stepped=!0,ft.level)}const lh={dunes:{g1:14859650,g2:13804648,g3:12160860,zenith:4160208,horizon:15128248,sun:16773330,sunI:3.1,sky:14214911,gnd:11570268,hemiI:1.25,fog:[70,230],sunDir:[.55,.62,.3],ground:"sand",grass:.22,grassCol:[11046984,15258238]},river:{g1:8824908,g2:7312448,zenith:4883152,horizon:14280426,sun:16774108,sunI:3,sky:13952255,gnd:6123328,hemiI:1.3,fog:[60,210],sunDir:[.5,.66,.35],ground:"grass",grass:1,grassCol:[4155946,10272866]},forest:{g1:6258744,g2:7180094,zenith:5998260,horizon:13030594,sun:16772816,sunI:2.7,sky:13622506,gnd:4479023,hemiI:1.35,fog:[30,140],sunDir:[.45,.7,.4],ground:"grass",grass:1.2,grassCol:[3496484,8826194]},frost:{g1:13884902,g2:12569816,g3:11056834,zenith:6262732,horizon:15002609,sun:16774890,sunI:2.3,sky:15134463,gnd:10135218,hemiI:1.1,fog:[50,190],sunDir:[.5,.6,.45],ground:"snow",grass:.12,grassCol:[8227450,13227727]}},Jd=n=>lh[n]||lh.dunes,oc={};function ml(n,e,t,i=!0){if(oc[n])return oc[n];const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d");t(s,e,Ks(n.length*7919+e));const a=new ul(r);return a.wrapS=a.wrapT=$o,a.anisotropy=4,a.colorSpace=i?Rt:Sn,oc[n]=a}function gy(n,e,t){const i=[];for(let a=0;a<e*e;a++)i.push(t());const r=(a,o)=>i[(o+e)%e*e+(a+e)%e],s=a=>a*a*(3-2*a);return(a,o)=>{const c=a/n*e,f=o/n*e,l=Math.floor(c),h=Math.floor(f),d=s(c-l),p=s(f-h);return(r(l,h)*(1-d)+r(l+1,h)*d)*(1-p)+(r(l,h+1)*(1-d)+r(l+1,h+1)*d)*p}}function Ns(n,e,t,i,r,s){const a=n.createImageData(e,e),o=a.data,c=s.map(([f,l])=>[gy(e,f,t),l]);for(let f=0;f<e;f++)for(let l=0;l<e;l++){let h=0;for(const[x,_]of c)h+=(x(l,f)-.5)*_;const d=Math.max(0,Math.min(255,(i+h*r)*255)),p=(f*e+l)*4;o[p]=o[p+1]=o[p+2]=d,o[p+3]=255}n.putImageData(a,0,0)}const _y=n=>ml("ground-"+n,256,(e,t,i)=>{if(n==="sand"){Ns(e,t,i,.86,.5,[[4,.6],[16,.5],[64,.35]]),e.globalAlpha=.07,e.strokeStyle="#000",e.lineWidth=3;for(let r=0;r<14;r++){const s=r*t/14+i()*6;e.beginPath();for(let a=-10;a<=t+10;a+=8)e.lineTo(a,s+Math.sin(a/t*Math.PI*4+r)*5);e.stroke()}e.globalAlpha=.25;for(let r=0;r<900;r++)e.fillStyle=i()<.5?"#fff":"#6b5a40",e.fillRect(i()*t,i()*t,1,1)}else if(n==="snow"){Ns(e,t,i,.95,.25,[[4,.6],[16,.4],[64,.2]]),e.globalAlpha=.5;for(let r=0;r<400;r++)e.fillStyle="#fff",e.fillRect(i()*t,i()*t,1,1)}else{Ns(e,t,i,.82,.55,[[4,.7],[16,.5],[64,.3]]),e.lineWidth=1.2;for(let r=0;r<2600;r++){const s=i()*t,a=i()*t,o=3+i()*6,c=(i()-.5)*.9;e.globalAlpha=.18+i()*.2,e.strokeStyle=i()<.5?"#1c2a10":"#ffffff",e.beginPath(),e.moveTo(s,a),e.lineTo(s+Math.sin(c)*o,a-Math.cos(c)*o),e.stroke()}}e.globalAlpha=1}),ta=()=>ml("stone",256,(n,e,t)=>{Ns(n,e,t,.8,.35,[[8,.5],[32,.5]]);const i=8,r=e/i;for(let s=0;s<i;s++){const a=s%2*.5,o=4;for(let c=-1;c<o;c++){const f=e/o,l=(c+a)*f+(t()-.5)*6;n.globalAlpha=.12+t()*.12,n.fillStyle=t()<.5?"#000":"#fff",n.fillRect(l+2,s*r+2,f-4,r-4),n.globalAlpha=.3,n.strokeStyle="#3a3733",n.lineWidth=2,n.strokeRect(l+1,s*r+1,f-2,r-2)}}n.globalAlpha=1}),to=()=>ml("wood",128,(n,e,t)=>{Ns(n,e,t,.8,.3,[[4,.4]]);for(let i=0;i<90;i++){const r=t()*e;n.globalAlpha=.08+t()*.15,n.fillStyle=t()<.6?"#000":"#fff",n.fillRect(r,0,1+t()*2,e)}n.globalAlpha=1});function Xn(n,e,t){const i=n.attributes.uv;for(let r=0;r<i.count;r++)i.setXY(r,i.getX(r)*e,i.getY(r)*t);return n}const xy=document.getElementById("gl"),bn=new qd({canvas:xy,antialias:ft.cfg.antialias,powerPreference:"high-performance"});bn.outputColorSpace=Rt;bn.toneMapping=_d;bn.toneMappingExposure=1.15;const Ct=new oy;Ct.fog=new dl(14472902,70,190);const pt=new In(60,1,.1,420),ko=new cy(14214911,11570268,1.25);Ct.add(ko);const $n=new hy(16773330,3);Ct.add($n,$n.target);const fr=new D(.55,.62,.3).normalize(),hr={zenith:{value:new we},horizon:{value:new we},sunCol:{value:new we},sunDir:{value:fr.clone()},time:{value:0},clouds:{value:1}},xa=new lt(new yn(400,32,16),new Ki({uniforms:hr,side:an,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position.z = gl_Position.w; }",fragmentShader:`
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
    }`}));xa.renderOrder=-10;xa.frustumCulled=!1;Ct.add(xa);const gt={W:0,H:0,DPR:1};function Zd(){bn.setPixelRatio(Math.min(window.devicePixelRatio||1,ft.cfg.pixelRatio))}function vy(){gt.W=innerWidth,gt.H=innerHeight,gt.DPR=Math.min(window.devicePixelRatio||1,2),Zd(),bn.setSize(gt.W,gt.H,!1),pt.aspect=gt.W/gt.H,pt.fov=gt.W<gt.H?78:60,pt.updateProjectionMatrix()}function Qd(){const n=ft.cfg,e=n.shadows>0,t=bn.shadowMap.enabled!==e;if(bn.shadowMap.enabled=e,bn.shadowMap.type=n.softShadows?gd:ol,$n.castShadow=e,e){const i=$n.shadow,r=n.shadowRange;i.mapSize.set(n.shadows,n.shadows),i.camera.left=-r,i.camera.right=r,i.camera.top=r,i.camera.bottom=-r,i.camera.near=1,i.camera.far=260,i.camera.updateProjectionMatrix(),i.bias=-6e-4,i.normalBias=.04,i.map&&(i.map.dispose(),i.map=null)}return t&&Ct.traverse(i=>{i.material&&[].concat(i.material).forEach(r=>r.needsUpdate=!0)}),hr.clouds.value=n.clouds?1:0,e}const eu=()=>bn.shadowMap.enabled,yy=new D;function tu(n,e,t){if(hr.time.value=t,xa.position.copy(pt.position),!$n.castShadow){$n.position.set(n,0,e).addScaledVector(fr,150),$n.target.position.set(n,0,e);return}const i=ft.cfg.shadowRange,r=2*i/ft.cfg.shadows,s=yy.set(fr.z,0,-fr.x).normalize(),a=n*s.x+e*s.z,o=Math.round(a/r)*r-a,c=n+s.x*o,f=e+s.z*o;$n.target.position.set(c,0,f),$n.position.set(c,0,f).addScaledVector(fr,150)}function My(n){const e=Jd(n.id);hr.zenith.value.set(e.zenith),hr.horizon.value.set(e.horizon),hr.sunCol.value.set(e.sun),fr.set(...e.sunDir).normalize(),hr.sunDir.value.copy(fr),Ct.fog.color.set(e.horizon),Ct.fog.near=e.fog[0]*ft.cfg.fogScale,Ct.fog.far=e.fog[1]*ft.cfg.fogScale,ko.color.set(e.sky),ko.groundColor.set(e.gnd),ko.intensity=e.hemiI,$n.color.set(e.sun),$n.intensity=e.sunI}let Kt=null,wc=[],yi=null;const Mn=(n,e,t={})=>new On(Object.assign({color:n,map:e||null},t)),Ni=Mn(14275526,ta()),Rc=Mn(12433323,ta()),Pc=Mn(3812384,to()),Sy=new On({color:16183520,side:Wt}),by=new On({color:16764730,side:Wt}),fh=le.map(n=>new On({color:n.hex,side:Wt})),hh=Mn(6966067,to()),Ey=Mn(8018490,to()),Ty=Mn(5586986,to());function Ay(n){n.traverse(e=>{e.geometry&&e.geometry.dispose()}),Ct.remove(n)}const Gn=(n,e=!0)=>(n.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=!0)}),n);function nu(n){var v,M,E;Kt&&Ay(Kt),yi&&Ct.remove(yi.banner),Kt=new Yn,Ct.add(Kt),wc=[],yi=null;const e=g.map,t=Jd(e.id);My(e);const i=new kn(420,420,140,140);i.rotateX(-Math.PI/2),Xn(i,64,64);const r=i.attributes.position,s=[],a=new we((v=t.g1)!=null?v:e.g1),o=new we((M=t.g2)!=null?M:e.g2),c=new we((E=t.g3)!=null?E:e.g3),f=new we(8022604);for(let R=0;R<r.count;R++){const C=r.getX(R),w=r.getZ(R),k=Math.hypot(C,w);r.setY(R,Kh(C,w));const y=(Math.sin(C*.11+w*.07)+1)/2,T=(Math.sin(C*.031-w*.043)+1)/2,B=a.clone().lerp(o,y*.7+T*.3);k>92&&B.lerp(c,Math.min(1,(k-92)/40)),e.id==="river"&&Math.abs(w)<6.5&&Math.hypot(C,w)>=7.5&&B.lerp(f,.6),s.push(B.r,B.g,B.b)}i.setAttribute("color",new at(s,3)),i.computeVertexNormals();const l=new lt(i,new On({vertexColors:!0,map:_y(t.ground)}));l.receiveShadow=!0,Kt.add(l);const h=Mn(e.hill);for(const R of n.hills){const C=new lt(new yn(R.rad,12,8),h);C.scale.y=R.sy,C.position.set(Math.cos(R.a)*R.d,-3,Math.sin(R.a)*R.d),Kt.add(C)}const d=new Ze,p=new Zn,x=new D,_=new D(0,1,0),m=new D;if(n.palisades.length){const R=n.palisades.flatMap(y=>y.logs),C=Xn(new mt(.32,.36,3.2,8),1,2);C.translate(0,0,0);const w=new ii(C,hh,R.length);R.forEach((y,T)=>{p.setFromAxisAngle(_,y.rot),x.set(1,y.sy,1),d.compose(m.set(y.x,1.5*y.sy,y.z),p,x),w.setMatrixAt(T,d)});const k=new ii(new bi(.34,.5,8),hh,R.length);R.forEach((y,T)=>{p.setFromAxisAngle(_,y.rot),d.compose(m.set(y.x,3.2*y.sy+.22,y.z),p,x.set(1,1,1)),k.setMatrixAt(T,d)}),Kt.add(Gn(w),Gn(k))}if(e.id==="river"){const R=new lt(new kn(420,10.4),new $d({color:3832483,specular:10471134,shininess:80,transparent:!0,opacity:.84}));R.rotation.x=-Math.PI/2,R.position.y=-.18,R.receiveShadow=!0,Kt.add(R);for(const w of[-32,32]){const k=new lt(Xn(new ot(5,.3,14),2,5),Ey);k.position.set(w,.22,0),Kt.add(Gn(k));for(const y of[-2.4,2.4]){const T=new lt(new ot(.18,.9,14),Ty);T.position.set(w+y,.8,0),Kt.add(Gn(T))}}const C=Mn(10132372,ta());for(const w of n.stones){const k=new lt(new ea(w.s),C);k.position.set(w.x,-.15,w.z),Kt.add(Gn(k))}}if(n.trees.length){const R=n.trees.length,C=new ii(Xn(new mt(.25,.35,2.4,7),1,2),Mn(5914152,to()),R),w=new ii(new bi(2.1,4.2,9),Mn(2905392),R),k=new ii(new bi(1.5,3.2,9),Mn(3631674),R);n.trees.forEach((y,T)=>{d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,1.2*y.s,y.z),C.setMatrixAt(T,d),d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,3.6*y.s,y.z),w.setMatrixAt(T,d),d.makeScale(y.s,y.s,y.s),d.setPosition(y.x,5.4*y.s,y.z),k.setMatrixAt(T,d)}),Kt.add(Gn(C),Gn(w),Gn(k))}const u=Mn(e.rock,ta());for(const R of n.rocks){const C=new lt(new ea(R.r),u);C.position.set(R.x,Ut(R.x,R.z)+R.r*.4,R.z),C.rotation.set(R.rx,R.ry,0),Kt.add(Gn(C))}le.forEach((R,C)=>wc.push(Cy(R,C))),n.withFort&&wy(n),Py(n,t)}function Cy(n,e){const t=new Yn,i=7,r=(_,m,u,v,M,E=0)=>{const R=new lt(_,m);return R.position.set(u,v,M),R.rotation.y=E,t.add(R),R},s=Xn(new ot(i*2,4,1.2),14/3,4/3);r(s,Ni,0,2,-i),r(s,Ni,-i,2,0,Math.PI/2),r(s,Ni,i,2,0,Math.PI/2);const a=Xn(new ot(i-1.8,4,1.2),(i-1.8)/3,4/3);r(a,Ni,-8.8/2,2,i),r(a,Ni,(i+1.8)/2,2,i),r(Xn(new ot(3.6,1.2,1.3),1.2,.4),Ni,0,3.4,i),r(Xn(new ot(3.4,2.8,.3),2,1),Pc,0,1.4,i-.3);const o=new ii(new ot(.8,.8,1.3),Ni,64),c=new Ze;let f=0;for(let _=-6;_<=6;_+=1.5)for(const[m,u,v]of[[_,-i,0],[_,i,0],[-i,_,1],[i,_,1]]){if(f>=64)break;c.makeRotationY(v?Math.PI/2:0),c.setPosition(m,4.4,u),o.setMatrixAt(f++,c)}o.count=f,t.add(o);const l=Xn(new mt(1.9,2.1,6.2,12),4,2),h=new bi(2.4,2.6,12),d=Mn(8010538);for(const[_,m]of[[-i,-i],[i,-i],[-i,i],[i,i]])r(l,Rc,_,3.1,m),r(h,d,_,7.5,m);r(Xn(new ot(5,7.5,5),5/3,7.5/3),Rc,0,3.75,-1.5),r(new bi(4,2.6,4),d,0,8.8,-1.5,Math.PI/4);const p=new kn(1.3,3);for(const _ of[-4.6,-2.6,2.6,4.6])r(p,fh[e],_,2.4,i+.62);r(new mt(.08,.08,4,6),Pc,0,11.4,-1.5);const x=r(new kn(2.6,1.6),fh[e],1.3,12.5,-1.5);return t.position.set(n.pos[0],0,n.pos[1]),t.rotation.y=Math.atan2(-n.pos[0],-n.pos[1]),Kt.add(Gn(t)),{grp:t,flag:x,fell:!1}}function wy(n){const e=new Yn;e.position.y=Ut(0,0),Kt.add(e);const t=Xn(new ot(2.9,2.2,.9),1,.75);for(const c of n.fortSegments){const f=new lt(t,Ni);f.position.set(c.x,1.1,c.z),f.rotation.y=-c.a+Math.PI/2,e.add(f)}for(let c=0;c<4;c++){const f=c/4*Math.PI*2+Math.PI/12,l=new lt(new mt(.5,.6,3,8),Rc);l.position.set(Math.cos(f)*6.4,1.5,Math.sin(f)*6.4),e.add(l)}Gn(e);const i=new Yn,r=new lt(new mt(.07,.07,3.4,6),Pc);r.position.y=1.7,i.add(r);const s=new lt(new kn(1.6,1.1),Sy);s.position.set(.8,2.8,0),i.add(s);const a=new lt(new kn(1.6,.18),by);a.position.set(.8,2.2,.01),i.add(a);const o=new lt(new eo(1.3,1.6,28),new si({color:16764730,transparent:!0,opacity:.6,side:Wt,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.y=.06,i.add(o),r.castShadow=s.castShadow=!0,Ct.add(i),yi={banner:i,ring:o,cloth:s}}const gl={time:{value:0}},Ry=(()=>{const n=[],e=[],t=Ks(3);for(let r=0;r<6;r++){const s=t()*Math.PI*2,a=t()*.22,o=.55+t()*.5,c=.07,f=(t()-.5)*.5,l=Math.cos(s)*a,h=Math.sin(s)*a,d=Math.cos(s+1.57)*c,p=Math.sin(s+1.57)*c,x=l+Math.cos(s)*f,_=h+Math.sin(s)*f;n.push(l-d,0,h-p,l+d,0,h+p,x,o,_,l+d,0,h+p,l-d,0,h-p,x,o,_),e.push(.5,.5,.5,.5,.5,.5,1,1,1,.5,.5,.5,.5,.5,.5,1,1,1)}const i=new un;return i.setAttribute("position",new at(n,3)),i.setAttribute("color",new at(e,3)),i.computeVertexNormals(),i})(),iu=new On({vertexColors:!0});iu.onBeforeCompile=n=>{n.uniforms.time=gl.time,n.vertexShader=`uniform float time;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
    #ifdef USE_INSTANCING
      vec2 ip = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
    #else
      vec2 ip = vec2(0.);
    #endif
    float sway = sin(time * 1.7 + ip.x * .35 + ip.y * .22) * .5 + sin(time * 3.1 + ip.x * .9) * .18;
    transformed.x += sway * .16 * position.y * position.y;
    transformed.z += sway * .08 * position.y * position.y;`),n.vertexShader=n.vertexShader.replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0., 1., 0.);")};function Py(n,e){const t=Math.round(ft.cfg.grass*e.grass);if(!t)return;const i=Ks((g.seed|0)+11),r=new ii(Ry,iu,t),s=new we(e.grassCol[0]),a=new we(e.grassCol[1]),o=new we,c=new Ze,f=new Zn,l=new Ji,h=new D,d=new D,p=(u,v)=>le.some(M=>Math.hypot(M.pos[0]-u,M.pos[1]-v)<Fs+1.5)||n.withFort&&Math.hypot(u,v)<7.5||g.map.id==="river"&&Math.abs(v)<6&&Math.hypot(u,v)>=7||n.obstacles.some(M=>!M.castle&&Math.abs(M.x-u)<M.r&&Math.abs(M.z-v)<M.r),x=(u,v)=>Math.sin(u*.09+1.3)*Math.cos(v*.08-.7)+Math.sin(u*.031-v*.027)*.8;let _=0,m=0;for(;_<t&&m<t*6;){m++;const u=(i()-.5)*220,v=(i()-.5)*220;if(x(u,v)<-.2+i()*.6||p(u,v))continue;const M=.75+i()*.7;l.set(0,i()*6.28,0),f.setFromEuler(l),c.compose(h.set(u,Kh(u,v),v),f,d.set(M,M*(.8+i()*.5),M)),r.setMatrixAt(_,c),r.setColorAt(_,o.copy(s).lerp(a,i())),_++}r.count=_,r.receiveShadow=!0,r.frustumCulled=!1,Kt.add(r)}function ru(n,e){gl.time.value+=n,le.forEach((r,s)=>{const a=g.teams[s],o=wc[s];if(!o||!a)return;const c=g.mode!=="conquest"?1:a.alive?1-(1-a.points/100)*.12:.28;o.grp.scale.y+=(c-o.grp.scale.y)*Math.min(1,n*3),o.flag.visible=g.mode!=="conquest"||a.alive,g.mode==="conquest"&&a.alive&&a.points<35&&Math.random()<n*6&&e("smoke",r.pos),g.mode==="conquest"&&!a.alive&&!o.fell&&(o.fell=!0,e("rubble",r.pos))});const t=g.flag;if(!t||!yi)return;const i=yi.banner;if(t.state==="carried"&&t.carrier){const r=t.carrier;i.position.set(r.x-Math.sin(r.face)*.45,r.y+.9,r.z-Math.cos(r.face)*.45),i.rotation.y=r.face+Math.PI/2,i.scale.setScalar(.8),yi.ring.visible=!1}else i.position.set(t.x,Ut(t.x,t.z),t.z),i.rotation.y=g.T*.6,i.scale.setScalar(1),yi.ring.visible=!0;yi.cloth.rotation.y=Math.sin(g.T*3)*.25}const dh=()=>gl.time.value,su=320,Ly=(()=>{const n=new mt(1,1,1.15,10,1,!0,-.42,.84);return n.translate(0,0,-1),n})(),Dy=(()=>{const n=new yn(.95,20,6,0,Math.PI*2,0,.7);return n.rotateX(Math.PI/2),n.translate(0,0,-.95*Math.cos(.7)),n.scale(1,1,.6),n})(),Iy=(()=>{const n=new mt(.5,.5,.08,18);return n.rotateX(Math.PI/2),n})(),Uy={leg:new mt(.15,.13,.7,7),boot:new ot(.2,.14,.32),greave:new mt(.16,.15,.32,8),torso:new mt(.42,.36,.78,12),skirt:new mt(.43,.52,.32,12),belt:new mt(.44,.44,.14,12),head:new yn(.4,14,10),helm:new yn(.44,14,8,0,Math.PI*2,0,Math.PI/2),corinth:new yn(.47,14,10,0,Math.PI*2,0,Math.PI*.52),cone:new bi(.44,.7,12),hood:new yn(.45,12,8,0,Math.PI*2,0,Math.PI*.6),brim:new mt(.66,.66,.05,16),crest:new ot(.1,.22,.62),cheek:new ot(.08,.3,.24),neckGuard:new ot(.56,.08,.22),nose:new ot(.07,.24,.05),knob:new yn(.08,8,6),hair:new yn(.45,12,8,0,Math.PI*2,0,Math.PI*.55),beard:new ot(.44,.3,.2),circlet:new $r(.42,.045,6,18),mantle:new mt(.58,.5,.26,12),face:new kn(.5,.26),arm:new mt(.11,.1,.55,6),blade:new ot(.07,.07,1),gladius:new ot(.09,.06,.72),guard:new ot(.32,.06,.06),haft:new mt(.04,.04,1.05,6),axeHead:new ot(.05,.36,.26),shaft:new mt(.04,.04,3,5),tip:new bi(.09,.35,5),bow:new $r(.6,.035,5,14,Math.PI),quiver:new mt(.13,.11,.7,6),scutum:Ly,hoplon:Dy,roundShield:Iy,rim:new $r(.6,.05,6,24),woodRim:new $r(.5,.04,6,20),boss:new yn(.12,8,6),shadow:new _a(.62,14),ring:new eo(.8,1,24),cape:new kn(.9,1.1)},Ny=(()=>{const n=document.createElement("canvas");n.width=128,n.height=64;const e=n.getContext("2d");e.fillStyle="#1b1512",e.beginPath(),e.ellipse(40,26,7,9,0,0,Math.PI*2),e.ellipse(88,26,7,9,0,0,Math.PI*2),e.fill(),e.lineWidth=7,e.lineCap="round",e.strokeStyle="#1b1512",e.beginPath(),e.moveTo(24,10),e.lineTo(54,17),e.moveTo(104,10),e.lineTo(74,17),e.stroke(),e.beginPath(),e.moveTo(64,48),e.quadraticCurveTo(44,42,30,56),e.quadraticCurveTo(46,50,64,54),e.quadraticCurveTo(82,50,98,56),e.quadraticCurveTo(84,42,64,48),e.fill();const t=new ul(n);return t.colorSpace=Rt,t})(),ky={plain:new On({color:16777215}),plain2:new On({color:16777215,side:Wt}),metal:new $d({color:16777215,shininess:70,specular:6974058}),shadow:new si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),ring:new si({color:16764730,transparent:!0,opacity:.8,side:Wt,depthWrite:!1}),ringAlly:new si({color:16777215,transparent:!0,opacity:.45,side:Wt,depthWrite:!1}),face:new si({map:Ny,transparent:!0,depthWrite:!1})},Oy=new Set(["plain","plain2","metal"]),uh=new Set(["shadow","ring","ringAlly","face"]),Hn=n=>new we(n),Oe={skin:[15914684,14990488,13145710].map(Hn),hair:[14727260,11886634,5913122,3023904].map(Hn),steel:Hn(10923448),bronze:Hn(13144124),wood:Hn(7031342),leather:Hn(5125152),gold:Hn(16764730),linen:Hn(15524552),fur:Hn(8018492),team:le.map(n=>Hn(n.hex)),dark:le.map(n=>Hn(n.hex).multiplyScalar(.62))},ou=n=>Math.imul(n.id|0,2654435761)>>>0,Lo=n=>Oe.skin[ou(n)%3],ph=n=>Oe.hair[(ou(n)>>>4)%4],na=n=>g.factions&&g.factions[n.ti]||"roman",_e=(n,e,t,i=0,r=0,s=0,a=1,o=1,c=1)=>new Ze().compose(new D(n,e,t),new Zn().setFromEuler(new Ji(i,r,s)),new D(a,o,c)),At=(...n)=>new Set(n),je=(...n)=>new Set(n),_n=At("foot","captain"),An=At("foot","captain","spear"),ei=n=>Oe.team[n.ti],Do=n=>Oe.dark[n.ti],au=[{bone:"root",geo:"shadow",mat:"shadow",m:_e(0,.03,0,-Math.PI/2),when:"blob"},{bone:"root",geo:"ring",mat:"ring",m:_e(0,.05,0,-Math.PI/2),when:"me"},{bone:"root",geo:"ring",mat:"ringAlly",m:_e(0,.05,0,-Math.PI/2),when:"ally"},{bone:"legL",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:Do},{bone:"legR",geo:"leg",mat:"plain",m:_e(0,-.35,0),col:Do},{bone:"legL",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Oe.leather},{bone:"legR",geo:"boot",mat:"plain",m:_e(0,-.68,.05),col:()=>Oe.leather},{bone:"legL",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"legR",geo:"greave",mat:"metal",m:_e(0,-.46,0),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:je("roman"),k:An,col:()=>Oe.steel},{bone:"body",geo:"torso",mat:"metal",m:_e(0,1.08,0),f:je("greek"),k:At("captain"),col:()=>Oe.bronze},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:je("greek"),k:At("foot","spear"),col:()=>Oe.linen},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:je("barbarian"),k:_n,col:Lo},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),f:je("barbarian"),k:At("spear"),col:Do},{bone:"body",geo:"torso",mat:"plain",m:_e(0,1.08,0),k:At("arch"),col:Do},{bone:"body",geo:"skirt",mat:"plain",m:_e(0,.64,0),f:je("roman","greek"),col:ei},{bone:"body",geo:"belt",mat:"plain",m:_e(0,.78,0),col:n=>na(n)==="barbarian"?ei(n):Oe.leather},{bone:"body",geo:"head",mat:"plain",m:_e(0,1.78,0),col:Lo},{bone:"body",geo:"face",mat:"face",m:_e(0,1.73,.39)},{bone:"body",geo:"hood",mat:"plain",m:_e(0,1.82,-.02),k:At("arch"),f:je("roman","barbarian"),col:ei},{bone:"body",geo:"helm",mat:"plain",m:_e(0,1.9,0,0,0,0,.8,.7,.8),k:At("arch"),f:je("greek"),col:()=>Oe.leather},{bone:"body",geo:"brim",mat:"plain",m:_e(0,1.98,0),k:At("arch"),f:je("greek"),col:ei},{bone:"body",geo:"quiver",mat:"plain",m:_e(.2,1.25,-.42,0,0,.4),k:At("arch"),col:()=>Oe.leather},{bone:"body",geo:"helm",mat:"metal",m:_e(0,1.86,0),f:je("roman"),k:An,col:()=>Oe.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(.34,1.64,.12,0,0,.12),f:je("roman"),k:An,col:()=>Oe.steel},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.34,1.64,.12,0,0,-.12),f:je("roman"),k:An,col:()=>Oe.steel},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0),f:je("roman"),k:At("foot"),col:ei},{bone:"body",geo:"knob",mat:"metal",m:_e(0,2.3,0),f:je("roman"),k:At("spear"),col:()=>Oe.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.36,0,0,Math.PI/2,0,1.3,1.5,1.25),f:je("roman"),k:At("captain"),col:()=>Oe.gold},{bone:"body",geo:"corinth",mat:"metal",m:_e(0,1.8,0),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"body",geo:"nose",mat:"metal",m:_e(0,1.74,.45),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(.33,1.62,.18,0,0,.1),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"body",geo:"cheek",mat:"metal",m:_e(-.33,1.62,.18,0,0,-.1),f:je("greek"),k:An,col:()=>Oe.bronze},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.5,-.04,0,0,0,1.2,2.3,1.6),f:je("greek"),k:At("foot","spear"),col:ei},{bone:"body",geo:"crest",mat:"plain",m:_e(0,2.58,-.04,0,0,0,1.4,2.8,1.9),f:je("greek"),k:At("captain"),col:()=>Oe.gold},{bone:"body",geo:"hair",mat:"plain",m:_e(0,1.82,-.03),f:je("barbarian"),k:An,col:ph},{bone:"body",geo:"beard",mat:"plain",m:_e(0,1.55,.3,.15),f:je("barbarian"),k:An,col:ph},{bone:"body",geo:"circlet",mat:"metal",m:_e(0,1.92,0,Math.PI/2),f:je("barbarian"),k:At("captain"),col:()=>Oe.gold},{bone:"body",geo:"mantle",mat:"plain",m:_e(0,1.44,0),f:je("barbarian"),k:At("captain","foot"),col:()=>Oe.fur},{bone:"body",geo:"cape",mat:"plain2",m:_e(0,1.02,-.44,.12),k:At("captain"),col:ei},{bone:"sArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:Lo},{bone:"wArm",geo:"arm",mat:"plain",m:_e(0,-.22,0),col:Lo},{bone:"shield",geo:"scutum",mat:"plain2",m:_e(0,0,0),f:je("roman"),k:_n,col:ei},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.05),f:je("roman"),k:_n,col:n=>n.leader?Oe.gold:Oe.steel},{bone:"shield",geo:"hoplon",mat:"plain2",m:_e(0,0,0),f:je("greek"),k:_n,col:ei},{bone:"shield",geo:"rim",mat:"metal",m:_e(0,0,0),f:je("greek"),k:_n,col:n=>n.leader?Oe.gold:Oe.bronze},{bone:"shield",geo:"roundShield",mat:"plain",m:_e(0,0,0),f:je("barbarian"),k:_n,col:ei},{bone:"shield",geo:"woodRim",mat:"plain",m:_e(0,0,0),f:je("barbarian"),k:_n,col:()=>Oe.wood},{bone:"shield",geo:"boss",mat:"metal",m:_e(0,0,.06),f:je("barbarian"),k:_n,col:n=>n.leader?Oe.gold:Oe.steel},{bone:"wArm",geo:"guard",mat:"plain",m:_e(0,-.5,.12),f:je("roman","greek"),k:_n,col:()=>Oe.leather},{bone:"wArm",geo:"gladius",mat:"metal",m:_e(0,-.5,.5),f:je("roman"),k:_n,col:()=>Oe.steel},{bone:"wArm",geo:"blade",mat:"metal",m:_e(0,-.5,.6),f:je("greek"),k:_n,col:()=>Oe.bronze},{bone:"wArm",geo:"haft",mat:"plain",m:_e(0,-.5,.42,Math.PI/2),f:je("barbarian"),k:_n,col:()=>Oe.wood},{bone:"wArm",geo:"axeHead",mat:"metal",m:_e(0,-.35,.86),f:je("barbarian"),k:_n,col:()=>Oe.steel},{bone:"spear",geo:"shaft",mat:"plain",m:_e(0,0,.6,Math.PI/2),k:At("spear"),col:()=>Oe.wood},{bone:"spear",geo:"tip",mat:"metal",m:_e(0,0,2.2,Math.PI/2),k:At("spear"),col:n=>na(n)==="greek"?Oe.bronze:Oe.steel},{bone:"sArm",geo:"bow",mat:"plain",m:_e(0,-.48,.2,0,Math.PI/2,Math.PI/2),k:At("arch"),col:()=>Oe.wood}],ps=new Map;for(const n of au){const e=n.geo+"|"+n.mat;let t=ps.get(e);t||(t={perUnit:0,n:0,mesh:null,geo:n.geo,mat:n.mat},ps.set(e,t)),t.perUnit++,n.batch=t}for(const n of ps.values()){const e=Math.max(1,n.perUnit)*su,t=new ii(Uy[n.geo],ky[n.mat],e);t.instanceMatrix.setUsage(_f),Oy.has(n.mat)&&(t.instanceColor=new Vs(new Float32Array(e*3),3),t.instanceColor.setUsage(_f)),t.frustumCulled=!1,t.count=0,t.castShadow=!uh.has(n.mat),t.receiveShadow=n.mat!=="face"&&!uh.has(n.mat),(n.mat==="shadow"||n.mat.startsWith("ring"))&&(t.renderOrder=1),Ct.add(t),n.mesh=t}const Fy=()=>[...ps.values()].filter(n=>n.mesh.count>0).length,mh=new WeakMap;function zy(n){let e=mh.get(n);return e||(e={walk:Math.random()*6,bodyY:0,bodyRX:0,bodyRZ:0,yaw:0,lift:0,sink:0,legL:[0,0,0],legR:[0,0,0],sArmX:0,sArmPX:.5,wArmX:0,wArmZ:0,spearRX:0,spearZ:0,block:0,over:0,rag:null},mh.set(n,e)),e}const By=n=>n.kind!=="captain"?null:n.ti===g.myTi?"me":!qc()&&!Jn(n.ti,g.myTi)?"ally":null;function Hy(n,e,t){let i=e.rag;if(!i){const a=(c,f)=>c+Math.random()*(f-c),o=n.fallDir||1;i=e.rag={dir:o,pitch:e.bodyRX,pv:-o*a(3,6),roll:0,rollT:a(-.4,.4),spin:a(-4,4),arms:[a(-3,-.3),a(-3,-.3),a(-1.3,-.2)],legs:[a(-.7,.7),a(-.7,.7),a(.05,.5)]}}const r=-i.dir*Math.PI/2*.97;i.pv+=((r-i.pitch)*70-i.pv*6)*t,i.pitch+=i.pv*t,Math.abs(i.pitch)>Math.PI/2*1.02&&(i.pitch=Math.sign(i.pitch)*Math.PI/2*1.02,i.pv*=-.35),i.spin*=Math.exp(-t*2.5),e.yaw+=i.spin*t,i.roll+=(i.rollT-i.roll)*Math.min(1,t*5);const s=Math.min(1,t*9);e.sArmX+=(i.arms[0]-e.sArmX)*s,e.wArmX+=(i.arms[1]-e.wArmX)*s,e.wArmZ+=(i.arms[2]-e.wArmZ)*s,e.legL[0]+=(i.legs[0]-e.legL[0])*s,e.legR[0]+=(i.legs[1]-e.legR[0])*s,e.legL[2]+=(i.legs[2]-e.legL[2])*s,e.legR[2]+=(-i.legs[2]-e.legR[2])*s,e.bodyY=0,e.bodyRX=i.pitch,e.bodyRZ=i.roll,e.block+=(0-e.block)*s,e.lift=.3*Math.min(1,Math.abs(i.pitch)/1.4),e.sink=n.deadT>10?Math.min(1.5,(n.deadT-10)*.4):0}function Gy(n,e){const t=zy(n);if(n.dead)return Hy(n,t,e),t;t.rag=null,t.yaw=0,t.lift=0,t.sink=0,t.bodyRZ=0;const i=Math.hypot(n.vx,n.vz);if(n.mounted)t.bodyY=1.02+.03*Math.sin(t.walk*2),t.legL[0]=-.9,t.legL[1]=0,t.legL[2]=.55,t.legR[0]=-.9,t.legR[1]=0,t.legR[2]=-.55,t.bodyRX=0,t.walk+=e*i*.9;else{t.walk+=e*i*2.2;const a=Math.sin(t.walk)*Math.min(1,i/3)*.7;t.legL[0]=a,t.legL[1]=t.legL[2]=0,t.legR[0]=-a,t.legR[1]=t.legR[2]=0,t.bodyY=Math.abs(Math.cos(t.walk))*Math.min(1,i/3)*.08,t.bodyRX=n.stun>0?-.25:Math.min(.15,i*.02)}const r=n.swing>0?1-n.swing/.38:-1;let s=!1;if(n.kind==="spear"){const a=nd(n)||n.swing>0;t.wArmX+=((a?-1.45:-.35)-t.wArmX)*Math.min(1,e*10),t.spearRX=a?1.45:-.2,t.spearZ=r>=0?Math.sin(r*Math.PI)*.8:0,t.sArmX+=(-.6-t.sArmX)*Math.min(1,e*8)}else if(n.kind==="arch")t.sArmX+=((n.aim?-1.5:-.3)-t.sArmX)*Math.min(1,e*10),t.wArmX+=((n.aim?r>=0?-1.2:-1.5:-.35)-t.wArmX)*Math.min(1,e*12);else{r>=0?(t.wArmX=r<.35?-.35-2.65*(r/.35):-3+2.2*Math.min(1,(r-.35)/.3),t.wArmZ=n.mounted?-.9:-.3):(t.wArmX+=(-.35-t.wArmX)*Math.min(1,e*10),t.wArmZ=0),s=(n.human&&n.blocking||n.blockT>0)&&!n.mounted;const a=n.testudo&&n.kind==="foot";t.over+=((a?1:0)-t.over)*Math.min(1,e*8),t.sArmX+=((a?-2.9:s?-1.35:n.carrying?-.1:-.35)-t.sArmX)*Math.min(1,e*14),t.sArmPX=s?.28:.5}return t.block+=((s?1:0)-t.block)*Math.min(1,e*16),t}const Yt={root:new Ze,body:new Ze,legL:new Ze,legR:new Ze,sArm:new Ze,wArm:new Ze,spear:new Ze,shield:new Ze},Vy=new Ze,gh=new Ze,ia=new Ji,ra=new Zn,cu=new D,lu=new D;function rr(n,e,t,i,r,s){return ia.set(i,r,s),ra.setFromEuler(ia),Vy.compose(cu.set(n,e,t),ra,lu.set(1,1,1))}function Wy(n,e){const t=n.kind==="captain"?1.18:1;if(ia.set(0,n.face+e.yaw,0),ra.setFromEuler(ia),Yt.root.compose(cu.set(n.x,n.y+e.lift-e.sink,n.z),ra,lu.set(t,t,t)),Yt.body.multiplyMatrices(Yt.root,rr(0,e.bodyY,0,e.bodyRX,0,e.bodyRZ)),Yt.legL.multiplyMatrices(Yt.body,rr(-.18,.7,0,e.legL[0],e.legL[1],e.legL[2])),Yt.legR.multiplyMatrices(Yt.body,rr(.18,.7,0,e.legR[0],e.legR[1],e.legR[2])),Yt.sArm.multiplyMatrices(Yt.body,rr(e.sArmPX,1.3,.05,e.sArmX,0,0)),Yt.wArm.multiplyMatrices(Yt.body,rr(-.5,1.3,.05,e.wArmX,0,e.wArmZ)),n.kind==="spear"&&Yt.spear.multiplyMatrices(Yt.wArm,rr(0,-.48,e.spearZ,e.spearRX,0,0)),n.kind==="foot"||n.kind==="captain"){const i=e.over,r=e.block*(1-i),s=na(n)==="greek"?.08:0,a=.56-.38*r,o=1.02+.26*r+s,c=.3+.3*r;Yt.shield.multiplyMatrices(Yt.body,rr(a+(.08-a)*i,o+(2.5-o)*i,c+(.1-c)*i,-.05*(1-r)*(1-i)-Math.PI/2*i,.5*(1-r)*(1-i),0))}}function fu(n,e){for(const r of ps.values())r.n=0;const t=!eu();let i=0;for(const r of n){if(r.hidden)continue;if(i>=su)break;i++;const s=Gy(r,e);Wy(r,s);const a=By(r),o=na(r);for(const c of au){if(c.k&&!c.k.has(r.kind)||c.f&&!c.f.has(o)||c.when&&(c.when==="blob"?!t:c.when!==a))continue;const f=c.batch,l=f.n++;gh.multiplyMatrices(Yt[c.bone],c.m),f.mesh.setMatrixAt(l,gh),c.col&&f.mesh.setColorAt(l,c.col(r))}}for(const r of ps.values()){if(r.mesh.count=r.n,!r.n)continue;const s=r.mesh.instanceMatrix;s.clearUpdateRanges(),s.addUpdateRange(0,r.n*16),s.needsUpdate=!0;const a=r.mesh.instanceColor;a&&(a.clearUpdateRanges(),a.addUpdateRange(0,r.n*3),a.needsUpdate=!0)}}const mi={torso:new yn(1,14,10),neck:new mt(.2,.3,1,8),head:new ot(.32,.36,.78),leg:new mt(.1,.08,1,6),hoof:new ot(.16,.12,.2),tail:new mt(.06,.14,.9,6),cloth:new ot(.95,.08,.85),mane:new ot(.08,.3,.9),shadow:new _a(.62,14)},_h=[8014378,3877408,13616304].map(n=>new On({color:n})),ac=new On({color:2234386}),Xy=new si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),jy=le.map(n=>new On({color:n.hex}));function qy(n,e){const t=new Yn,i=new Yn;t.add(i);const r=_h[e%_h.length],s=(c,f,l,h,d,p)=>{const x=new lt(c,f);return x.position.set(h,d,p),l.add(x),x},a=s(mi.shadow,Xy,t,0,.03,0);a.rotation.x=-Math.PI/2,a.scale.set(1.2,2.2,1),s(mi.torso,r,i,0,1.35,0).scale.set(.55,.6,1.15),s(mi.neck,r,i,0,1.85,.95).rotation.x=.65,s(mi.head,r,i,0,2.25,1.35).rotation.x=.55,s(mi.mane,ac,i,0,2.05,.8).rotation.x=.65,s(mi.tail,ac,i,0,1.35,-1.2).rotation.x=-.7,s(mi.cloth,jy[n],i,0,1.95,-.05);const o=[];for(const[c,f]of[[-.28,.72],[.28,.72],[-.28,-.72],[.28,-.72]]){const l=new Yn;l.position.set(c,1.05,f),i.add(l),s(mi.leg,r,l,0,-.5,0),s(mi.hoof,ac,l,0,-1,.03),o.push(l)}return i.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0)}),Ct.add(t),{root:t,body:i,legs:o,sh:a,walk:0}}const Yr=new Map;function hu(n,e){const t=new Set;for(const i of n){t.add(i.key);let r=Yr.get(i.key);if(r||(r=qy(i.ti,Math.abs(i.key*7919)%3),Yr.set(i.key,r)),r.root.position.set(i.x,Ut(i.x,i.z),i.z),r.root.rotation.y=i.face,r.root.visible=!0,r.sh.visible=!eu(),i.state==="dead"){r.body.rotation.z=Math.min(1,i.t/.5)*Math.PI/2*.9*(i.fall||1),i.t>6&&(r.root.position.y-=(i.t-6)*.6);continue}r.walk+=e*i.spd*1.1;const s=Math.min(1,i.spd/4)*.8;r.legs[0].rotation.x=r.legs[3].rotation.x=Math.sin(r.walk)*s,r.legs[1].rotation.x=r.legs[2].rotation.x=Math.sin(r.walk+Math.PI)*s,r.body.position.y=Math.abs(Math.sin(r.walk))*.12*Math.min(1,i.spd/4),i.state==="leaving"&&(r.root.visible=i.t<2.6)}for(const[i,r]of Yr)t.has(i)||(Ct.remove(r.root),Yr.delete(i))}function du(){for(const n of Yr.values())Ct.remove(n.root);Yr.clear()}let Ei=[],es=[];function $y(n,e,t,i,r){const s=ft.cfg.particles;for(let a=0;a<r&&Ei.length<s;a++)Ei.push({x:n,y:e,z:t,vx:ue(-4,4),vy:ue(1,5),vz:ue(-4,4),life:ue(.25,.5),c:i,s:ue(2,4)})}function Lc(n){Ei.length<ft.cfg.particles+40&&Ei.push(n)}const xh={dunes:"#dcc69c",river:"#b7a888",forest:"#a89a7c",frost:"#f4f7fa"};function Yy(n,e){const t=xh[g.map.id]||xh.dunes,i=Ut(n,e)+.3;for(let r=0;r<3;r++)Lc({x:n+ue(-.4,.4),y:i,z:e+ue(-.4,.4),vx:ue(-1,1),vy:ue(.8,1.6),vz:ue(-1,1),life:ue(.5,.8),c:t,s:ue(5.5,8)})}function ts(n,e,t,i,r){es.push({x:n,y:e,z:t,text:i,color:r,t:0})}function Ky(n,e){if(n==="smoke")Lc({x:e[0]+ue(-6,6),y:ue(3,6),z:e[1]+ue(-6,6),vx:ue(-.4,.4),vy:ue(1.5,3),vz:ue(-.4,.4),life:ue(1.2,2),c:"#5b5550",s:ue(5,9)});else for(let t=0;t<30;t++)Lc({x:e[0]+ue(-8,8),y:ue(0,6),z:e[1]+ue(-8,8),vx:ue(-3,3),vy:ue(1,5),vz:ue(-3,3),life:ue(1,2.2),c:"#bdb3a2",s:ue(3,7)})}const va=90,Jy=(()=>{const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d");e.fillStyle="#ffffff";for(let t=0;t<9;t++)e.beginPath(),e.arc(32+ue(-14,14),32+ue(-14,14),ue(4,12),0,Math.PI*2),e.fill();for(let t=0;t<8;t++)e.beginPath(),e.arc(32+ue(-28,28),32+ue(-28,28),ue(1.5,3.5),0,Math.PI*2),e.fill();return new ul(n)})(),uu=new si({map:Jy,transparent:!0,depthWrite:!1});uu.onBeforeCompile=n=>{n.vertexShader=`attribute float aAlpha;
varying float vAlpha;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vAlpha = aAlpha;`),n.fragmentShader=`varying float vAlpha;
`+n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vAlpha;`)};const pu=new kn(1,1),Dc=new Vs(new Float32Array(va),1);pu.setAttribute("aAlpha",Dc);const Mi=new ii(pu,uu,va);Mi.instanceColor=new Vs(new Float32Array(va*3),3);Mi.frustumCulled=!1;Mi.count=0;Ct.add(Mi);let Ti=[],Zy=0;const Qy=le.map(n=>new we(n.hex).multiplyScalar(.85)),vh=new Ze,yh=new Zn,Mh=new Ji,eM=new D,tM=new D;function nM(n,e,t,i){if($c(n,e))return;const r=ft.cfg.splats;Ti.length>=r&&Ti.shift(),Ti.push({x:n,z:e,s:t,rot:ue(0,6),t:0,c:Qy[i==null?1:i],lift:Zy++%va*4e-4})}const mu=160,iM=(()=>{const n=new mt(.03,.03,.9,4);return n.rotateX(Math.PI/2),n})(),ns=new ii(iM,new On({color:3811868}),mu);ns.frustumCulled=!1;ns.count=0;Ct.add(ns);const Xr=new Vt;function rM(n){for(const e of Ei)e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.vy-=(e.s>5?-.5:9)*n,e.life-=n;Ei=Ei.filter(e=>e.life>0&&e.y>-1);for(const e of es)e.t+=n,e.y+=n*1.2;es=es.filter(e=>e.t<1.3);for(const e of Ti)e.t+=n;Ti=Ti.filter(e=>e.t<30)}function gu(){Ti.forEach((e,t)=>{Mh.set(-Math.PI/2,0,e.rot),yh.setFromEuler(Mh),vh.compose(eM.set(e.x,Ut(e.x,e.z)+.04+e.lift,e.z),yh,tM.set(e.s,e.s,e.s)),Mi.setMatrixAt(t,vh),Mi.setColorAt(t,e.c),Dc.array[t]=e.t>25?Math.max(0,.85-(e.t-25)/5):.85}),Mi.count=Ti.length,Mi.instanceMatrix.needsUpdate=!0,Mi.instanceColor.needsUpdate=!0,Dc.needsUpdate=!0;let n=0;for(const e of g.arrows){if(n>=mu)break;const t=e.x-e.px,i=e.y-e.py,r=e.z-e.pz;Xr.position.set(e.x,e.y,e.z),t||i||r?(Xr.lookAt(e.x+t+1e-4,e.y+i,e.z+r),e.q=(e.q||new Zn).copy(Xr.quaternion)):e.q&&Xr.quaternion.copy(e.q),Xr.updateMatrix(),ns.setMatrixAt(n++,Xr.matrix)}ns.count=n,ns.instanceMatrix.needsUpdate=!0}function _u(){Ei=[],es=[],Ti=[]}const Ic=new si({color:16777215,transparent:!0,opacity:.22,depthWrite:!1,side:Wt}),Gi=new lt(new eo(.93,1,72),Ic);Gi.rotation.x=-Math.PI/2;Gi.renderOrder=1;Gi.visible=!1;Ct.add(Gi);function sM(n,e,t){Gi.visible=!!(n&&!n.dead&&g.state==="play"),Gi.visible&&(Gi.position.set(n.x,Ut(n.x,n.z)+.07,n.z),Gi.scale.setScalar(e),Ic.color.set(le[n.ti].hex),Ic.opacity=.16+.08*Math.sin(t*2.4))}const tt={yaw:0,pitch:.32,shake:0},oM=matchMedia("(prefers-reduced-motion: reduce)").matches;function xu(){const n=g.player;if(n&&!n.dead)return n;const e=g.teams.map(t=>t.leader).find(t=>t&&!t.dead&&!Jn(t.ti,g.myTi));return e||g.units.find(t=>!t.dead&&t.ti===g.myTi)||g.units.find(t=>!t.dead)||null}function aM(n){tt.shake=Math.max(0,tt.shake-n*1.6);const e=xu();if(!e)return;const t=e.x,i=e.z,r=e.y,s=(gt.W<gt.H?10:8.5)+(e.mounted?3:0),a=2.2+Math.sin(tt.pitch)*s+(e.mounted?1:0),o=t-Math.sin(tt.yaw)*Math.cos(tt.pitch)*s,c=i-Math.cos(tt.yaw)*Math.cos(tt.pitch)*s,f=Math.min(1,n*8);pt.position.x+=(o-pt.position.x)*f,pt.position.z+=(c-pt.position.z)*f,pt.position.y+=(r+a-pt.position.y)*f;const l=Ut(pt.position.x,pt.position.z)+1;pt.position.y<l&&(pt.position.y=l),tt.shake>0&&!oM&&(pt.position.x+=ue(-1,1)*tt.shake*.3,pt.position.y+=ue(-1,1)*tt.shake*.3),pt.lookAt(t+Math.sin(tt.yaw)*3,r+1.6+(e.mounted?1:0),i+Math.cos(tt.yaw)*3)}function cM(n){pt.position.set(Math.cos(n*.05)*62,26+(g.map.id==="frost"?4:0),Math.sin(n*.05)*62),pt.lookAt(0,Ut(0,0),0)}const Uc=document.getElementById("fx"),he=Uc.getContext("2d"),vu=document.getElementById("mini"),Qe=vu.getContext("2d"),Vi=new D,lM=new D;function fM(){Uc.width=Math.round(gt.W*gt.DPR),Uc.height=Math.round(gt.H*gt.DPR)}function cc(n,e,t){return Vi.set(n,e,t).project(pt),Vi.z<=1?[(Vi.x+1)/2*gt.W,(1-Vi.y)/2*gt.H,!0]:[0,0,!1]}function yu(){he.setTransform(gt.DPR,0,0,gt.DPR,0,0),he.clearRect(0,0,gt.W,gt.H)}function hM(n){const e=gt.W,t=gt.H;yu();for(const s of Ei){const[a,o,c]=cc(s.x,s.y,s.z);if(!c)continue;const f=pt.position.distanceTo(lM.set(s.x,s.y,s.z)),l=s.s*Zt(14/f,.3,2.5);he.globalAlpha=Math.min(1,s.life*2),he.fillStyle=s.c,s.s>4?(he.beginPath(),he.arc(a,o,l,0,Math.PI*2),he.fill()):he.fillRect(a-l/2,o-l/2,l,l)}he.globalAlpha=1,he.textAlign="center",he.font="italic 20px Bangers, Impact, sans-serif";for(const s of es){const[a,o,c]=cc(s.x,s.y,s.z);c&&(he.globalAlpha=1-s.t/1.3,he.lineWidth=4,he.strokeStyle="rgba(0,0,0,.6)",he.strokeText(s.text,a,o),he.fillStyle=s.color,he.fillText(s.text,a,o))}he.globalAlpha=1;const i=g.player;if(g.state==="play"){for(const s of g.units){if(s.dead||s===i||s.hp>=s.max-.5&&!s.leader||Math.hypot(s.x-pt.position.x,s.z-pt.position.z)>34)continue;const[o,c,f]=cc(s.x,s.y+(s.leader?3.2:2.8)+(s.mounted?1.2:0),s.z);if(!f)continue;const l=s.leader?40:26;if(he.fillStyle="rgba(0,0,0,.55)",he.fillRect(o-l/2,c,l,4),he.fillStyle=le[s.ti].css,he.fillRect(o-l/2,c,l*Math.max(0,s.hp/s.max),4),s.leader&&g.teams[s.ti]&&g.teams[s.ti].human&&n.nickFor){const h=n.nickFor(s.ti);h&&(he.font='800 12px "Barlow Semi Condensed", sans-serif',he.lineWidth=3,he.strokeStyle="rgba(0,0,0,.6)",he.strokeText(h,o,c-6),he.fillStyle="#fff",he.fillText(h,o,c-6))}g.mode==="dm"&&s.leader&&s.ti===g.bounty&&(he.font="italic 16px Bangers, Impact, sans-serif",he.lineWidth=3,he.strokeStyle="rgba(0,0,0,.6)",he.strokeText("BOUNTY",o,c-20),he.fillStyle="#ffcf3a",he.fillText("BOUNTY",o,c-20))}g.flag&&dM(),g.mode==="dm"&&g.bounty===g.myTi&&i&&!i.dead&&performance.now()/500%1<.7&&(he.font="italic 18px Bangers, Impact, sans-serif",he.fillStyle="#ffcf3a",he.fillText("BOUNTY ON YOU",e/2,118))}const r=n.joy;r&&r.active&&(he.strokeStyle="rgba(255,255,255,.4)",he.lineWidth=2,he.beginPath(),he.arc(r.ox,r.oy,50,0,Math.PI*2),he.stroke(),he.fillStyle="rgba(255,255,255,.55)",he.beginPath(),he.arc(r.ox+r.x*50,r.oy+r.y*50,22,0,Math.PI*2),he.fill()),g.state==="play"&&(!i||i.dead)&&(he.fillStyle="rgba(120,0,0,.18)",he.fillRect(0,0,e,t)),uM()}function dM(){const n=gt.W,e=gt.H,t=g.flag,i=t.state==="carried"?t.carrier:null;if(i&&i===g.player)return;const r=i?i.x:t.x,s=i?i.z:t.z,a=(i?i.y:Ut(r,s))+3.4,o=i?le[i.ti].css:"#ffffff";Vi.set(r,a,s).project(pt);let c=(Vi.x+1)/2*n,f=(1-Vi.y)/2*e;const l=Vi.z>1;l&&(c=n-c,f=e-40);const h=60,d=!l&&c>h&&c<n-h&&f>h&&f<e-h;if(he.font="italic 15px Bangers, Impact, sans-serif",he.lineWidth=3,he.strokeStyle="rgba(0,0,0,.6)",d){const v=i?`${le[i.ti].name.toUpperCase()} CARRIER`:"BANNER";he.strokeText(v,c,f),he.fillStyle=o,he.fillText(v,c,f);return}const p=n/2,x=e/2,_=Math.atan2(f-x,c-p),m=Zt(p+Math.cos(_)*n,h,n-h),u=Zt(x+Math.sin(_)*e,h+50,e-h-20);he.save(),he.translate(m,u),he.rotate(_),he.fillStyle=o,he.strokeStyle="rgba(0,0,0,.5)",he.lineWidth=2,he.beginPath(),he.moveTo(16,0),he.lineTo(-8,-11),he.lineTo(-8,11),he.closePath(),he.fill(),he.stroke(),he.restore()}function uM(){if(g.state!=="play")return;const n=vu.width,e=n/190,t=n/2;Qe.clearRect(0,0,n,n),Qe.save(),Qe.translate(t,t),Qe.rotate(tt.yaw+Math.PI);const i=g.map.id;if(i==="river"&&(Qe.fillStyle="rgba(63,127,166,.8)",Qe.fillRect(-95*e,-5*e,190*e,10*e),Qe.fillStyle="rgba(107,74,46,.9)",Qe.fillRect(-34.5*e,-7*e,5*e,14*e),Qe.fillRect(29.5*e,-7*e,5*e,14*e)),i==="frost"&&(Qe.fillStyle="rgba(255,255,255,.2)",Qe.beginPath(),Qe.arc(0,0,24*e,0,Math.PI*2),Qe.fill()),i==="forest"&&g.layout){Qe.fillStyle="rgba(47,90,52,.7)";for(const r of g.layout.treeColliders)Qe.fillRect(r.x*e-2,r.z*e-2,4,4)}le.forEach((r,s)=>{Qe.fillStyle=g.mode!=="conquest"||g.teams[s].alive?r.css:"#555",Qe.fillRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18),!qc()&&!Jn(s,g.myTi)&&(Qe.strokeStyle="#fff",Qe.lineWidth=2,Qe.strokeRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18))});for(const r of g.units){if(r.dead)continue;Qe.fillStyle=le[r.ti].css;const s=r.leader?6:3.5;Qe.fillRect(r.x*e-s/2,r.z*e-s/2,s,s)}if(g.flag){const r=g.flag.state==="carried"&&g.flag.carrier?g.flag.carrier:g.flag;Qe.fillStyle="#fff",Qe.strokeStyle="#000",Qe.lineWidth=1.5,Qe.beginPath(),Qe.arc(r.x*e,r.z*e,5,0,Math.PI*2),Qe.fill(),Qe.stroke()}Qe.restore(),Qe.fillStyle="#fff",Qe.beginPath(),Qe.moveTo(t,t-8),Qe.lineTo(t-5,t+5),Qe.lineTo(t+5,t+5),Qe.fill()}let Pt=null,Nc=null;const lc={};function Wi(){if(Pt){Pt.state==="suspended"&&Pt.resume();return}try{Pt=new(window.AudioContext||window.webkitAudioContext),Nc=Pt.createBuffer(1,Pt.sampleRate*.6,Pt.sampleRate);const n=Nc.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1}catch{Pt=null}}function wn(n,e){const t=performance.now();return lc[n]&&t-lc[n]<e?!1:(lc[n]=t,!0)}function gi(n,e,t,i,r="bandpass",s,a=1){if(!Pt)return;const o=Pt.currentTime,c=Pt.createBufferSource(),f=Pt.createBiquadFilter(),l=Pt.createGain();c.buffer=Nc,f.type=r,f.frequency.setValueAtTime(e,o),s&&f.frequency.exponentialRampToValueAtTime(s,o+n),f.Q.value=t,l.gain.setValueAtTime(Math.max(.0011,i*a),o),l.gain.exponentialRampToValueAtTime(.001,o+n),c.connect(f).connect(l).connect(Pt.destination),c.start(o),c.stop(o+n)}function rn(n,e,t,i="sine",r,s=0){if(!Pt)return;const a=Pt.currentTime+s,o=Pt.createOscillator(),c=Pt.createGain();o.type=i,o.frequency.setValueAtTime(n,a),r&&o.frequency.exponentialRampToValueAtTime(r,a+e),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),a+.02),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(c).connect(Pt.destination),o.start(a),o.stop(a+e)}function _i(n,e){const t=g.player;if(!t||n==null)return 1;const i=Math.hypot(n-t.x,e-t.z);return Zt(1.2-i/40,0,1)}const Lt={swing(n,e){const t=_i(n,e);t>.1&&wn("sw",60)&&gi(.14,1800,1,.12,"bandpass",600,t)},clang(n,e){const t=_i(n,e);t>.1&&wn("cl",60)&&(gi(.08,3400,7,.22,"bandpass",0,t),rn(1500+Math.random()*600,.14,.07*t,"triangle"))},hit(n,e){const t=_i(n,e);t>.1&&wn("hi",50)&&(gi(.12,380,1,.4,"lowpass",0,t),rn(130,.1,.15*t,"triangle",60))},die(n,e){const t=_i(n,e);t>.15&&wn("di",140)&&rn(260,.35,.08*t,"sawtooth",110)},wall(n,e){const t=_i(n,e);t>.1&&wn("wa",120)&&gi(.2,500,1.2,.3,"lowpass",0,t)},bow(n,e){const t=_i(n,e);t>.1&&wn("bo",80)&&(rn(220,.12,.06*t,"triangle",140),gi(.25,2600,2,.06,"bandpass",900,t))},thud(n,e){const t=_i(n,e);t>.1&&wn("th",80)&&gi(.07,900,1.5,.15,"bandpass",0,t)},hoof(n,e){const t=_i(n,e);t>.1&&wn("ho",95)&&gi(.05,260,2,.25,"bandpass",0,t)},neigh(){rn(700,.45,.07,"sawtooth",1100),rn(900,.4,.05,"sawtooth",500,.2)},trample(n,e){const t=_i(n,e);t>.1&&wn("tr",90)&&gi(.2,200,1,.5,"lowpass",0,t)},coin(){wn("co",50)&&(rn(1300,.08,.08,"square"),rn(1750,.12,.07,"square",0,.07))},horn(){rn(196,.9,.14,"sawtooth",200),rn(294,.9,.08,"sawtooth",296)},order(){rn(392,.12,.1,"square"),rn(523,.18,.1,"square",0,.1)},crumble(){gi(1.2,300,.7,.6,"lowpass",80)},capture(){rn(523,.2,.12,"square"),rn(659,.2,.12,"square",0,.18),rn(784,.4,.12,"square",0,.36)}};function Kr(n){try{navigator.vibrate&&navigator.vibrate(n)}catch{}}const Ue={NET:null,myNick:""};try{Ue.myNick=localStorage.getItem("fb-nick")||""}catch{}const ri=()=>!!(Ue.NET&&Ue.NET.role==="client"),dr=()=>!!(Ue.NET&&Ue.NET.role==="host"),Sh=(n,e)=>{var t;try{return(t=localStorage.getItem(n))!=null?t:e}catch{return e}},zt={faction:Sh("rally-faction","roman"),color:+Sh("rally-color","0")||0,save(){try{localStorage.setItem("rally-faction",this.faction),localStorage.setItem("rally-color",String(this.color))}catch{}}},ct=n=>document.getElementById(n),_l=n=>(n=Math.max(0,Math.floor(n)),Math.floor(n/60)+":"+String(n%60).padStart(2,"0"));function pM(){ct("ptsTitle").textContent=vr[g.mode].title,ct("tpRows").innerHTML=le.map((n,e)=>`<div class="tp${e===g.myTi?" me":""}" id="tp${e}"><span class="al">${qc()?"":Vh[g.ALLY[e]]}</span><div class="bar"><i style="background:${n.css}"></i></div><b>0</b></div>`).join(""),ct("pips").innerHTML=le.map((n,e)=>`<span class="pip" id="pip${e}" style="background:${n.css}">${n.name[0]}</span>`).join(""),ct("clockMax").textContent=_l(vr[g.mode].time)}function mM(){["ovTitle","ovEnd","ovBrowse","ovLobby"].forEach(n=>ct(n).hidden=!0),ct("hudWrap").hidden=!1,ct("joyhint").style.opacity=1}function xl(n){g.teams.forEach((d,p)=>{const x=ct("tp"+p);if(!x)return;const _=ld(p),m=g.mode==="conquest"?100:g.mode==="dm"?$h:zs;x.querySelector("i").style.transform=`scaleX(${Math.max(0,_)/m})`,x.querySelector("b").textContent=g.mode==="ctf"?`${_}/${zs}`:Math.max(0,Math.ceil(_));const u=cd(p);x.classList.toggle("out",u);const v=ct("pip"+p);v.classList.toggle("out",u),v.classList.toggle("hum",!!d.human),v.textContent=u?"✕":le[p].name[0]}),ct("clockT").textContent=_l(g.T);const e=g.player,t=g.teams[g.myTi];e&&(ct("hpT").textContent=`${Math.max(0,Math.ceil(e.hp))}/${e.max}`,ct("hpBar").style.transform=`scaleX(${Math.max(0,e.hp)/e.max})`,ct("horseBarWrap").hidden=!e.mounted,ct("horseBar").style.transform=`scaleX(${Math.min(1,Math.max(0,e.horseHp)/Js(g.myTi))})`);const i=Math.floor(t.gold);ct("gold").textContent=i;const r=_s(g.myTi);ct("squadN").textContent=r.length;const s=d=>r.filter(p=>p.kind===d).length;ct("squadMix").textContent=`F${s("foot")} S${s("spear")} A${s("arch")}`,document.querySelectorAll("#tray button").forEach(d=>{d.setAttribute("aria-disabled",i<Jt[d.dataset.kind].cost||r.length>=g.squadCap||!Jr(g.myTi)?"true":"false")}),document.querySelectorAll("#upTray button").forEach(d=>{const p=d.dataset.up,x=t.up?t.up[p]:0,_=Bs(g.myTi,p);d.querySelector(".lv").dataset.pips="●".repeat(x)+"○".repeat(qh-x),d.querySelector("em").textContent=_==null?"Max":_+"g",d.setAttribute("aria-disabled",_==null||i<_?"true":"false")});let a="Ride",o="horse";e&&e.mounted?(a="Walk",o="get off"):e&&e.summon?(a="…",o="coming"):e&&e.horseCd>0&&(a=Math.ceil(e.horseCd)+"s",o="resting"),ct("mntT").textContent=a,ct("mntS").textContent=o,ct("mnt").classList.toggle("dim",!e||!e.mounted&&(e.horseCd>0||e.carrying||e.dead)),ct("blk").classList.toggle("dim",!e||e.mounted),ct("atk").classList.toggle("dim",!e||e.carrying);const c=t.order||"follow";ct("cmdT").textContent=Wo[c]||Wo.follow;const f=c==="follow"?"var(--green)":c==="hold"?"var(--yellow)":c==="testudo"?"var(--blue)":"var(--red)";ct("cmdBtn").style.borderLeftColor=f,ct("cmdBtn").querySelector(".ic").style.background=f;const l=Ue.NET,h=ct("netTag");if(l){h.hidden=!1;const d=le.map((p,x)=>x).filter(p=>g.teams[p].human&&p!==g.myTi).map(p=>le[p].name);if(ri()){const p=performance.now()-(n||0)>2500;h.textContent=p?"Waiting for the host…":`Online · ${d.length?"with "+d.join(", "):"host"}`,h.classList.toggle("bad",p)}else h.textContent=`Hosting · ${d.length?d.join(", "):"no one else yet"}`}else h.hidden=!0}let bh;function Oi(n,e,t){const i=ct("banner");i.innerHTML="";const r=document.createElement("span");if(r.textContent=n,r.style.color=t||"#fff",i.appendChild(r),e){const s=document.createElement("small");s.textContent=e,i.appendChild(s)}i.classList.add("on"),clearTimeout(bh),bh=setTimeout(()=>i.classList.remove("on"),2e3)}const gM=n=>le.filter((e,t)=>g.ALLY[t]===n).map(e=>e.name).join(" & ");function _M(n,e){const t=g.myTi,i=o=>le[o].name,r=o=>le[o].css,s=o=>o===t,a=o=>!Jn(o,t);switch(n){case"start":return[vr[g.mode].name,g.mode==="conquest"?"Tear down every enemy castle":g.mode==="dm"?"Last side with tickets wins":"Bring the banner home three times"];case"castleDown":return s(e[0])?["Your castle has fallen!","No more recruits. Stay alive.","#e0352b"]:[`${i(e[0])} castle destroyed!`,e[1]===t?"Your doing":`by ${i(e[1])}`,r(e[0])];case"tickets0":return[`${i(e[0])} out of tickets!`,s(e[0])?"No more respawns":a(e[0])?"Protect your ally":"Finish them off",r(e[0])];case"bounty":return[`Bounty on ${i(e[0])}'s captain`,s(e[0])?"Everyone is coming for you":"Double gold for the kill",r(e[0])];case"bountyClaimed":return s(e[0])?["Bounty claimed!","+50 gold","#ffcf3a"]:null;case"capDown":return s(e[1])?[`${i(e[0])} captain down`,"",r(e[0])]:null;case"fell":return s(e[0])?["You fell!",e[1]?"Back in the fight in 5 seconds":"No way back. Your allies fight on.","#e0352b"]:null;case"respawn":return s(e[0])?["Back on your feet","Rally your squad"]:null;case"horseDown":return s(e[0])?["Your horse is down!",`New horse in ${jo(e[0])} seconds`,"#e0352b"]:null;case"rideNo":return s(e[0])?e[1]==="banner"?["Not with the banner","Carry it home on foot"]:e[1]==="rest"?["Your horse is resting",`Ready in ${e[2]} seconds`]:["Too hot to call your horse","Get clear of the fight first"]:null;case"flagTaken":return s(e[0])?["You have the banner!","Carry it home. Your squad will escort you.",r(e[0])]:[`${i(e[0])} has the banner!`,a(e[0])?"Escort them home":"Stop the carrier",r(e[0])];case"flagDropped":return s(e[0])?["Banner dropped!","Grab it again before it returns"]:[`${i(e[0])} dropped the banner`,"",r(e[0])];case"flagHome":return["The banner returns to the fort",""];case"capture":return[`${i(e[0])} captures the banner!`,`${fd(g.ALLY[e[0]])} of ${zs}`,r(e[0])];case"upgrade":{const o=Ai.find(c=>c.id===e[1]);return s(e[0])&&o?[`${o.name} level ${e[2]}`,o.desc,"#ffcf3a"]:null}case"left":return[`${i(e[0])}'s player left`,"The computer takes over their army",r(e[0])]}return null}function is(n,e){const t=g.myTi;if(n==="gold"){e[0]===t&&(ts(e[1],Ut(e[1],e[2])+2.6,e[2],`+${e[3]} gold`,"#ffcf3a"),Lt.coin());return}const i=_M(n,e);i&&(Oi(i[0],i[1],i[2]),n==="horseDown"&&e[0]===t&&(Kr(120),tt.shake=.5),n==="capture"&&(Lt.capture(),Jn(e[0],t)||Kr([60,40,60])),n==="castleDown"&&(Lt.crumble(),tt.shake=.6,e[0]===t&&Kr([100,60,100])),n==="flagTaken"&&e[0]===t&&(Lt.order(),Kr(50)))}const Ln=n=>document.getElementById(n),it={joy:{active:!1,id:null,ox:0,oy:0,x:0,y:0},look:{id:null,lx:0,ly:0},keys:{},attackHeld:!1,blockHeld:!1,trayIsOpen:!1,upIsOpen:!1};let $t={attack(){},ride(){},order(){},recruit(){},upgrade(){}};function Ws(n){it.trayIsOpen=n,Ln("tray").hidden=!n,Ln("recBtn").classList.toggle("open",n),n&&rs(!1)}function rs(n){it.upIsOpen=n,Ln("upTray").hidden=!n,Ln("upBtn").classList.toggle("open",n),n&&Ws(!1)}function Mu(){it.keys={},it.attackHeld=it.blockHeld=!1,it.joy.active=!1,it.joy.x=it.joy.y=0,it.look.id=null}function Su(n){const{joy:e,keys:t}=it;let i=e.x,r=e.y;t.KeyA&&(i-=1),t.KeyD&&(i+=1),t.KeyW&&(r-=1),t.KeyS&&(r+=1),t.ArrowLeft&&(tt.yaw+=n*2.4),t.ArrowRight&&(tt.yaw-=n*2.4),t.ArrowUp&&(r-=1),t.ArrowDown&&(r+=1);let s=Math.hypot(i,r);s>1&&(i/=s,r/=s,s=1);const a=tt.yaw,o=Math.sin(a),c=Math.cos(a),f=-Math.cos(a),l=Math.sin(a);return{wx:o*-r+f*i,wz:c*-r+l*i,mag:s,block:it.blockHeld,attackHeld:it.attackHeld,camYaw:a}}function xM(n){$t=n;const e=Ln("touch"),{joy:t,look:i}=it;e.addEventListener("pointerdown",o=>{if(g.state==="play"){Wi(),o.preventDefault(),Ws(!1),rs(!1),o.clientX<gt.W*.42&&!t.active?(t.active=!0,t.id=o.pointerId,t.ox=o.clientX,t.oy=o.clientY,t.x=t.y=0,Ln("joyhint").style.opacity=0):i.id===null&&(i.id=o.pointerId,i.lx=o.clientX,i.ly=o.clientY);try{e.setPointerCapture(o.pointerId)}catch{}}}),e.addEventListener("pointermove",o=>{if(o.pointerId===t.id){const c=o.clientX-t.ox,f=o.clientY-t.oy,l=50,h=Math.hypot(c,f);h>l&&(t.ox+=c*(1-l/h)*.4,t.oy+=f*(1-l/h)*.4),t.x=Zt(c/l,-1,1),t.y=Zt(f/l,-1,1);const d=Math.hypot(t.x,t.y);d>1&&(t.x/=d,t.y/=d)}else o.pointerId===i.id&&(tt.yaw-=(o.clientX-i.lx)*.0075,tt.pitch=Zt(tt.pitch+(o.clientY-i.ly)*.004,.12,.75),i.lx=o.clientX,i.ly=o.clientY)});const r=o=>{o.pointerId===t.id&&(t.active=!1,t.id=null,t.x=t.y=0),o.pointerId===i.id&&(i.id=null)};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r);const s=(o,c,f)=>{o.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),Wi();try{o.setPointerCapture(h.pointerId)}catch{}o.classList.add("held"),c()});const l=()=>{o.classList.remove("held"),f()};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l)},a=(o,c)=>{o.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),Wi(),c()}),o.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),c())})};s(Ln("atk"),()=>{it.attackHeld=!0,$t.attack()},()=>{it.attackHeld=!1}),s(Ln("blk"),()=>{it.blockHeld=!0},()=>{it.blockHeld=!1}),a(Ln("mnt"),()=>$t.ride()),a(Ln("cmdBtn"),()=>$t.order()),a(Ln("recBtn"),()=>Ws(!it.trayIsOpen)),document.querySelectorAll("#tray button").forEach(o=>a(o,()=>$t.recruit(o.dataset.kind))),a(Ln("upBtn"),()=>rs(!it.upIsOpen)),document.querySelectorAll("#upTray button").forEach(o=>a(o,()=>$t.upgrade(o.dataset.up))),addEventListener("keydown",o=>{if(g.state!=="play"||o.target&&o.target.tagName==="INPUT"||(Wi(),it.keys[o.code]=!0,o.code==="Space"&&(o.preventDefault(),it.attackHeld=!0,o.repeat||$t.attack()),(o.code==="ShiftLeft"||o.code==="ShiftRight")&&(it.blockHeld=!0),o.repeat))return;o.code==="KeyQ"&&$t.order("follow"),o.code==="KeyF"&&$t.order("hold"),o.code==="KeyE"&&$t.order("charge"),o.code==="KeyT"&&$t.order("testudo"),o.code==="KeyU"&&rs(!it.upIsOpen);const c=["Digit4","Digit5","Digit6","Digit7","Digit8"].indexOf(o.code);c>=0&&$t.upgrade(["dmg","armor","speed","aura","horse"][c]),o.code==="KeyH"&&$t.ride(),o.code==="Digit1"&&$t.recruit("foot"),o.code==="Digit2"&&$t.recruit("spear"),o.code==="Digit3"&&$t.recruit("arch")}),addEventListener("keyup",o=>{it.keys[o.code]=!1,o.code==="Space"&&(it.attackHeld=!1),o.code.startsWith("Shift")&&(it.blockHeld=!1)}),addEventListener("blur",Mu)}const Eh=[3,2,1,0],vM=[1,0,3,2];function Xs(n,e){const t=[0,1,2,3];if(n==="2v2"){const i=Eh[e];for(let r=0;r<4;r++)t[r]=r===e||r===i?0:1}else if(n==="2v1v1"){const i=Eh[e];let r=1;for(let s=0;s<4;s++)t[s]=s===e||s===i?0:r++}else if(n==="3v1"){const i=vM[e];for(let r=0;r<4;r++)t[r]=r===i?1:0}return t}function yM(n,e){const t=f=>f===e?`you (${le[f].name})`:le[f].name,i=[...new Set(n)].map(f=>le.map((l,h)=>h).filter(l=>n[l]===f));if(i.length===4)return`Every team for itself. You are ${le[e].name}.`;const r=f=>f.length<2?f.join(""):f.slice(0,-1).join(", ")+" and "+f[f.length-1],s=f=>r(f.map(t)),a=i.find(f=>f.includes(e)),o=i.filter(f=>f!==a),c=`${s(a)} against ${r(o.map(s))}`;return c[0].toUpperCase()+c.slice(1)+(o.length>1?", each on their own.":".")}function vl(n,e){const t=Ks((e|0)+101),i=n.slice(),r=new Set(n.filter(Boolean));let s=mc.filter(a=>!r.has(a));for(let a=0;a<4;a++)i[a]||(s.length||(s=mc.slice()),i[a]=s.splice(Math.floor(t()*s.length),1)[0]);return i}const te={},ms=n=>Math.round(n*10)/10,ss=n=>Math.round(n*100)/100,xn=n=>Math.max(0,Math.round(n)).toString(36),vn=n=>parseInt(n,36),ti=n=>xn((n+100)*10),Cn=n=>vn(n)/10-100,Th=n=>xn((n%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*72%72),Ah=n=>vn(n)/72*Math.PI*2,ya=n=>{const e=n.peers().find(t=>t.sameTab);return e?e.peer:null};let js={onMatchStart(){},onAbort(){},onLobby(){}};function MM(n){js=Object.assign(js,n)}xt.on("msg",n=>{const e=Ue.NET;dr()&&e.msgs&&(e.msgs.push([++e.msgN,n.k,...n.a]),e.msgs.length>8&&e.msgs.shift())});function SM(){const n=c=>Ai.reduce((f,l,h)=>f+c.up[l.id]*4**h,0),e=g.teams.map(c=>[Math.round(c.points*10),c.tickets,c.caps,Math.floor(c.gold),c.alive?1:0,Math.max(0,Math.ceil(c.leaderDeadT)),n(c)].join(",")).join(";"),t=[];for(const c of g.units){if(c.dead)continue;const f=Wh.indexOf(c.kind)*4+c.ti,l=(c.swing>0?1:0)|(c.mounted?2:0)|(c.blockT>0||c.human&&c.blocking?4:0)|(c.carrying?8:0)|(c.stun>0?16:0)|(c.aim?32:0)|(c.testudo?64:0);t.push([xn(c.id),f.toString(16),ti(c.x),ti(c.z),Th(c.face),xn(Zt(c.hp/c.max,0,1)*35),xn(l)].join(","))}const i=g.arrows.filter(c=>!c.stuck&&!c.done).slice(-18).map(c=>[xn(c.id),ti(c.x0),ti(c.z0),xn(c.y0*10),ti(c.x1),ti(c.z1),xn(c.y1*10+20),xn(c.dur*100),xn(c.peak*10),xn(c.t*100),c.ti].join(",")),r=g.horses.filter(c=>c.state==="coming").map(c=>[ti(c.x),ti(c.z),Th(c.face),c.ti].join(",")),s=g.flag,a=s?[s.state==="home"?0:s.state==="dropped"?1:2,ti(s.x),ti(s.z),s.carrier?xn(s.carrier.id):""].join(","):"",o=g.teams.map((c,f)=>{if(!c.human||f===g.myTi)return"";const l=c.leader,h=l.kick;return h.dirty&&(h.n++,h.dirty=!1,h.lvx=h.vx,h.lvz=h.vz,h.lst=h.st,h.vx=0,h.vz=0,h.st=0),[f,xn(l.id),l.dead?1:0,Math.round(l.horseHp),Math.ceil(l.horseCd),l.summon?1:0,h.n,ms(h.lvx||0),ms(h.lvz||0),ss(h.lst||0),Math.round(l.hp)].join(",")}).filter(Boolean).join(";");return[Math.round(g.T*10),e,t.join(";"),i.join(";"),r.join(";"),a,o,g.bounty].join("|")}function bM(){performance.now()-(Ue.NET.lastSend||0)<80||Ma()}function Ma(){const n=Ue.NET;if(!n)return;n.lastSend=performance.now();const e={role:"host",ph:g.state==="end"?"end":"play",seed:g.seed,mode:g.mode,map:g.map.id,diff:g.diff,al:g.ALLY.join(""),seats:n.seats,nick:Ue.myNick||"Host",fa:g.factions.map(i=>(as[i]||as.roman).code).join(""),n:++n.snapN,s:SM(),m:n.msgs};g.state==="end"&&g.endInfo&&(e.res=[g.endInfo.w,g.endInfo.why]);let t=JSON.stringify(e);for(;t.length>3900;){const i=e.s.split("|"),r=i[3].split(";");if(r.length&&r[0])r.shift(),i[3]=r.join(";"),e.s=i.join("|");else if(e.m.length)e.m=e.m.slice(1);else break;t=JSON.stringify(e)}n.lastSize=t.length,n.room.presence(e).catch(()=>{})}function EM(){const n=Ue.NET,e=n.room.peers(),t=new Set(e.map(i=>i.peer));for(const[i,r]of Object.entries(n.seats))if(r!==g.myTi&&!t.has(i)&&g.teams[r].human){g.teams[r].human=!1;const s=g.teams[r].leader;s&&(s.human=!1,s.remote=!1,s.dmg=Jt.captain.dmg,s.spd=Jt.captain.spd),delete n.seats[i],xt.emit("msg",{k:"left",a:[r]})}for(const i of e){if(i.sameTab)continue;const r=n.seats[i.peer];if(r===void 0)continue;const s=i.presence||{};if(s.seed!==g.seed||s.ph!=="play")continue;const a=g.teams[r],o=a.leader;if(!a.human)continue;const c=n.inp[r]||(n.inp[r]={atk:0,ride:0,rec:[0,0,0],up:[0,0,0,0,0]});if(o&&!o.dead&&Array.isArray(s.cap)&&s.cap[0]===o.id&&(o.x=+s.cap[1],o.z=+s.cap[2],o.face=+s.cap[3],o.vx=+s.cap[4],o.vz=+s.cap[5],o.blocking=!!s.blk),typeof s.atk=="number"&&s.atk>c.atk&&(o&&!o.dead&&(typeof s.face=="number"&&(o.face=s.face),il(o)),c.atk=s.atk),typeof s.ride=="number"&&s.ride>c.ride&&(o&&id(o),c.ride=s.ride),Array.isArray(s.up))for(let f=0;f<Ai.length;f++)for(;(s.up[f]|0)>c.up[f];)c.up[f]++,Zc(r,Ai[f].id);if(s.ord&&s.ord!==a.order&&Ds.includes(s.ord)&&(a.order=s.ord,s.ord==="hold")){const f=Array.isArray(s.hold)?s.hold:[o.x,o.z,o.face];a.holdPt={x:+f[0],z:+f[1],face:+f[2],isFront:!0}}if(Array.isArray(s.rec))for(let f=0;f<3;f++)for(;(s.rec[f]|0)>c.rec[f];)c.rec[f]++,Jc(r,Xh[f])}}function TM(n){g.role="client",g.mode=n.mode,g.map=ha[n.map],g.diff=n.diff,g.ALLY=n.al.split("").map(Number),g.seed=n.seed,g.factions=String(n.fa||"rrrr").split("").map(Cp),g.layout=Yc(g.map.id,g.mode==="ctf",g.seed),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.endInfo=null;const e=[0,0,0,0];Object.values(n.seats||{}).forEach(t=>e[t]=1),g.teams=Kc(e),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,Object.assign(te,{byId:new Map,lastN:-1,lastMsgN:n.m&&n.m.length?n.m[n.m.length-1][0]:0,meId:null,meInit:!1,kickN:0,localCd:0,lastSnapAt:performance.now(),inp:{atk:0,ride:0,rec:[0,0,0],up:[0,0,0,0,0],ord:"follow",hold:null,face:0},sendAt:0,arrowIds:new Set,coming:[],leaving:[],horseKey:0,riderKeys:new Map,hudT:0}),g.player=null,tt.yaw=Math.atan2(-le[g.myTi].pos[0],-le[g.myTi].pos[1]),tt.pitch=.32,g.state="play",js.onMatchStart(),Lt.horn(),is("start",[]),bu(n)}function AM(n,e,t,i,r){const s=e==="captain"&&g.teams[t].human,a={id:n,kind:e,ti:t,leader:e==="captain",human:s,x:i,z:r,y:Ut(i,r),tx:i,tz:r,tface:0,face:0,vx:0,vz:0,vy:0,hp:Jt[e].hp,max:Jt[e].hp,r:Jt[e].r,swing:0,stun:0,blockT:0,dead:!1,deadT:0,mounted:!1,carrying:!1,aim:!1,spd:s?6.3:Jt[e].spd,horseHp:Js(t),horseCd:0,summon:!1,testudo:!1,blocking:!1,lastHit:-9};return g.units.push(a),te.byId.set(n,a),a}function CM(n){n.dead||(n.dead=!0,n.deadT=0,n.vy=ue(3,6),n.fallDir=Math.random()<.5?1:-1,n.vx*=.5,n.vz*=.5,xt.emit("splat",{x:n.x,z:n.z,s:ue(1,1.5),ti:n.ti}),Lt.die(n.x,n.z),te.byId.delete(n.id))}function bu(n){if(n.n===te.lastN)return;te.lastN=n.n,te.lastSnapAt=performance.now();const e=(n.s||"").split("|");if(e.length<8)return;const t=g.myTi;g.T=+e[0]/10,e[1].split(";").forEach((o,c)=>{const f=o.split(",").map(Number),l=g.teams[c];l&&(l.points=f[0]/10,l.tickets=f[1],l.caps=f[2],(c!==t||performance.now()-(te.goldLocalAt||0)>700)&&(l.gold=f[3]),l.alive=!!f[4],l.leaderDeadT=f[5],f.length>6&&(c!==t||performance.now()-(te.upLocalAt||0)>700)&&Ai.forEach((h,d)=>{l.up[h.id]=Math.floor(f[6]/4**d)%4}))}),g.bounty=+e[7];const i=e[6]?e[6].split(";").map(o=>o.split(",")).find(o=>+o[0]===t):null;let r=null;i&&(r=vn(i[1]),te.meInfo={dead:+i[2],horseHp:+i[3],horseCd:+i[4],summon:+i[5],kn:+i[6],kvx:+i[7],kvz:+i[8],kst:+i[9],hp:+i[10]});const s=new Set;if(e[2])for(const o of e[2].split(";")){const c=o.split(","),f=vn(c[0]),l=parseInt(c[1],16),h=Wh[l>>2],d=l&3,p=Cn(c[2]),x=Cn(c[3]),_=Ah(c[4]),m=vn(c[5]),u=vn(c[6]);s.add(f);let v=te.byId.get(f);v||(v=AM(f,h,d,p,x),v.face=_);const M=v.hp;v.hp=m/35*v.max,v.hp<M-.5&&f!==r&&(xt.emit("spark",{x:v.x,y:v.y+1.2,z:v.z,c:u&4?"#fff3b0":le[v.ti].css,n:5}),u&4?Lt.clang(v.x,v.z):(Lt.hit(v.x,v.z),Math.random()<.35&&xt.emit("splat",{x:v.x+ue(-.4,.4),z:v.z+ue(-.4,.4),s:ue(.6,1.1),ti:v.ti}))),u&1&&v.swing<=0&&f!==r&&(v.swing=.38,Lt.swing(v.x,v.z)),v.mounted=!!(u&2),v.carrying=!!(u&8),v.testudo=!!(u&64),f!==r&&(v.blockT=u&4?.2:0,v.stun=u&16?.1:0,v.aim=!!(u&32)),f!==r?(v.tx=p,v.tz=x,v.tface=_,Math.hypot(v.x-p,v.z-x)>8&&(v.x=p,v.z=x)):(!te.meInit||te.meId!==f)&&(v.x=p,v.z=x,v.face=_)}for(const o of[...te.byId.values()])s.has(o.id)||CM(o);if(r!=null&&te.byId.get(r)){const o=te.byId.get(r);te.meId!==r&&(te.meId=r,te.meInit=!0,g.player=o,tt.yaw=o.face,te.kickN=te.meInfo?te.meInfo.kn:0),g.player=o,o.horseHp=te.meInfo.horseHp,o.horseCd=te.meInfo.horseCd,o.summon=!!te.meInfo.summon,o.hp=te.meInfo.hp,te.meInfo.kn!==te.kickN&&(te.kickN=te.meInfo.kn,o.vx+=te.meInfo.kvx,o.vz+=te.meInfo.kvz,o.stun=Math.max(o.stun,te.meInfo.kst),(te.meInfo.kvx||te.meInfo.kvz)&&(tt.shake=.35,Kr(30),xt.emit("spark",{x:o.x,y:o.y+1.2,z:o.z,c:le[o.ti].css,n:5}),Lt.hit(o.x,o.z)))}if(g.player&&g.player.dead&&(g.player=null),e[3])for(const o of e[3].split(";")){const c=o.split(","),f=vn(c[0]);if(te.arrowIds.has(f))continue;te.arrowIds.add(f);const l=ad({id:f,x0:Cn(c[1]),z0:Cn(c[2]),y0:vn(c[3])/10,x1:Cn(c[4]),z1:Cn(c[5]),y1:(vn(c[6])-20)/10,dur:vn(c[7])/100,peak:vn(c[8])/10,ti:+c[10],t:vn(c[9])/100});g.arrows.push(l),Lt.bow(l.x0,l.z0)}te.arrowIds.size>400&&(te.arrowIds=new Set([...te.arrowIds].slice(-200)));const a=e[4]?e[4].split(";").map(o=>o.split(",")):[];if(te.coming.length=Math.min(te.coming.length,a.length),a.forEach((o,c)=>{let f=te.coming[c];f||(f={key:2e5+ ++te.horseKey,ti:+o[3],x:Cn(o[0]),z:Cn(o[1]),face:0,spd:14,state:"coming",t:0},te.coming.push(f)),f.tx=Cn(o[0]),f.tz=Cn(o[1]),f.face=Ah(o[2])}),g.flag&&e[5]){const o=e[5].split(","),c=g.flag;c.state=["home","dropped","carried"][+o[0]],c.x=Cn(o[1]),c.z=Cn(o[2]),c.carrier=o[3]&&te.byId.get(vn(o[3]))||null,c.carrier&&(c.carrier.carrying=!0)}for(const o of n.m||[])o[0]>te.lastMsgN&&(te.lastMsgN=o[0],is(o[1],o.slice(2)))}function wM(n){const e=Ue.NET,t=e.room.peers().find(s=>s.peer===e.hostPeer);if(t){e.hostGoneAt=0;const s=t.presence||{};if(s.ph==="lobby")return js.onLobby(),!1;s.seed===g.seed&&(s.ph==="play"||s.ph==="end")&&bu(s),s.ph==="end"&&g.state==="play"&&Array.isArray(s.res)&&xt.emit("hostEnd",s.res)}else if(e.hostGoneAt||(e.hostGoneAt=performance.now()),performance.now()-e.hostGoneAt>1500)return js.onAbort("The host left the battle."),!1;if(g.state!=="play"&&g.state!=="end")return!1;te.localCd-=n;const i=g.player;if(i&&!i.dead&&g.state==="play"){i.stun-=n,ud(i,Su(n),n);for(const s of g.units){if(s===i||s.dead)continue;const a=i.x-s.x,o=i.z-s.z,c=i.r+s.r;if(Math.abs(a)>c||Math.abs(o)>c)continue;const f=Math.hypot(a,o)||.01;f<c&&(i.x+=a/f*(c-f)*.7,i.z+=o/f*(c-f)*.7)}dd(i,n,i.z),i.r=i.mounted?.95:Jt.captain.r,it.attackHeld&&te.localCd<=0&&yl.attack()}const r=Math.min(1,n*10);for(const s of g.units){if(s.dead){rl(s,n);continue}if(s===i)continue;const a=s.x,o=s.z;s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r,s.face=cs(s.face,s.tface,n*12),s.vx=(s.x-a)/Math.max(n,.001),s.vz=(s.z-o)/Math.max(n,.001),s.y=Ut(s.x,s.z),s.swing>0&&(s.swing-=n)}i&&i.swing>0&&(i.swing-=n),g.units=g.units.filter(s=>!(s.dead&&s.deadT>12));for(const s of g.units){const a=te.riderKeys.get(s);s.mounted&&!s.dead&&!a&&te.riderKeys.set(s,1e5+ ++te.horseKey),(!s.mounted||s.dead)&&a&&(te.leaving.push({key:a,ti:s.ti,x:s.x,z:s.z,face:s.face,spd:10,state:"leaving",t:0}),te.riderKeys.delete(s))}for(const s of te.coming)s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r;for(const s of te.leaving)s.t+=n,s.x+=Math.sin(s.face)*10*n,s.z+=Math.cos(s.face)*10*n;if(te.leaving=te.leaving.filter(s=>s.t<3),md(n,!1),performance.now()-te.sendAt>66&&g.state==="play"){te.sendAt=performance.now();const s={role:"player",nick:Ue.myNick||"Captain",ph:"play",seed:g.seed,atk:te.inp.atk,ride:te.inp.ride,rec:te.inp.rec,up:te.inp.up,ord:te.inp.ord,hold:te.inp.hold,face:te.inp.face,blk:it.blockHeld?1:0};i&&!i.dead&&(s.cap=[i.id,ss(i.x),ss(i.z),ss(i.face),ms(i.vx),ms(i.vz)]),e.room.presence(s).catch(()=>{})}return!0}function RM(){const n=[...te.coming,...te.leaving];for(const[e,t]of te.riderKeys)e.dead||n.push({key:t,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:Math.hypot(e.vx,e.vz),state:"ridden",t:0});return n}const PM=n=>Wo[n]||Wo.follow,yl={attack(){const n=g.player;if(!(!n||n.dead||g.state!=="play")){if(n.carrying){wn("carryhint",1500)&&ts(n.x,n.y+3.2,n.z,"Hands full: carry it home","#fff");return}if(ri()){if(te.localCd>0)return;te.localCd=n.mounted?.8:.6;const e=hd(n);e&&!n.mounted&&(n.face=Math.atan2(e.x-n.x,e.z-n.z)),n.swing=.38,Lt.swing(n.x,n.z),te.inp.atk++,te.inp.face=ss(n.face);return}il(n)}},ride(){const n=g.player;if(!(g.state!=="play"||!n||n.dead)){if(ri()){if(!n.mounted){if(n.carrying){is("rideNo",[g.myTi,"banner"]);return}if(n.horseCd>0){is("rideNo",[g.myTi,"rest",Math.ceil(n.horseCd)]);return}Lt.neigh()}te.inp.ride++;return}id(n)}},order(n){const e=g.player;if(g.state!=="play"||!e||e.dead)return;const t=g.teams[g.myTi].order||"follow",i=Ds.includes(n)?n:Ds[(Ds.indexOf(t)+1)%Ds.length];i===t&&i!=="hold"||(ri()?(g.teams[g.myTi].order=i,te.inp.ord=i,i==="hold"&&(te.inp.hold=[ms(e.x),ms(e.z),ss(e.face)])):kp(g.myTi,i),Lt.order(),ts(e.x,e.y+3.2,e.z,PM(i),"#fff"),xt.emit("hud"))},upgrade(n){if(g.state!=="play")return;const e=g.teams[g.myTi],t=Bs(g.myTi,n),i=Ai.find(r=>r.id===n);if(i){if(t==null){Oi(`${i.name} is maxed`,"Try another upgrade");return}if(e.gold<t){Oi("Not enough gold",`${i.name} costs ${t} gold`,"#ffcf3a");return}ri()?(te.inp.up[Ai.indexOf(i)]++,e.gold-=t,e.up[n]++,te.goldLocalAt=te.upLocalAt=performance.now(),Lt.coin(),is("upgrade",[g.myTi,n,e.up[n]])):Zc(g.myTi,n),xt.emit("hud")}},recruit(n){if(g.state!=="play")return;const e=Jt[n],t=g.teams[g.myTi];if(!Jr(g.myTi)){Oi("No recruits",g.mode==="dm"?"Your team is out of tickets":"You need a castle to recruit","#e0352b");return}if(_s(g.myTi).length>=g.squadCap){Oi("Squad full",`${g.squadCap} soldiers is the limit`);return}if(t.gold<e.cost){Oi("Not enough gold",`A ${e.name.toLowerCase()} costs ${e.cost} gold`,"#ffcf3a");return}ri()?(te.inp.rec[Xh.indexOf(n)]++,t.gold-=e.cost,te.goldLocalAt=performance.now(),g.recruited++,Lt.coin()):Jc(g.myTi,n);const i=g.player;i&&ts(i.x,i.y+3,i.z,`${e.name} on the way`,"#fff")}};class LM{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return DM(e).buffer}}function DM(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function Eu(n){return new IM(n).unpack()}function Tu(n){const e=new UM,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class IM{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,a;for(;i<e;)s=t[i],s<160?(a=s,i++):(s^192)<32?(a=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(a=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(a=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(a);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,a=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*a}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class UM{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),a=2**32,o=t<<31|i+1023<<20|s/a&1048575,c=s%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const a=t[s];if(e.hasOwnProperty(a)){this.pack(a);const o=this.pack(e[a]);if(o instanceof Promise)return o.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new LM,this._textEncoder=new TextEncoder}}let Au=!0,Cu=!0;function Is(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Er(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Ml("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(o,c){if(o!==e)return s.apply(this,arguments);const f=l=>{const h=t(l);h&&(c.handleEvent?c.handleEvent(h):c(h))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,f),s.apply(this,[o,f])};const a=r.removeEventListener;r.removeEventListener=function(o,c){if(o!==e||!this._eventMap||!this._eventMap[e])return a.apply(this,arguments);if(!this._eventMap[e].has(c))return a.apply(this,arguments);const f=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,f])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(o){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),o&&this.addEventListener(e,this["_on"+e]=o)},enumerable:!0,configurable:!0})}function NM(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Au=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function kM(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Cu=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Ml(){if(typeof window=="object"){if(Au)return;typeof console!="undefined"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Sl(n,e){Cu&&console.warn(n+" is deprecated, please use "+e+" instead.")}function OM(n){const e={browser:null,version:null};if(typeof n=="undefined"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Is(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Is(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Is(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Is(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function Ch(n){return Object.prototype.toString.call(n)==="[object Object]"}function wu(n){return Ch(n)?Object.keys(n).reduce(function(e,t){const i=Ch(n[t]),r=i?wu(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function kc(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?kc(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{kc(n,n.get(r),t)})}))}function wh(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(a=>{a.type==="track"&&a.trackIdentifier===e.id&&s.push(a)}),s.forEach(a=>{n.forEach(o=>{o.type===i&&o.trackId===a.id&&kc(n,o,r)})}),r}const Rh=Ml;function Ru(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;const c={};return Object.keys(o).forEach(f=>{if(f==="require"||f==="advanced"||f==="mediaSource")return;const l=typeof o[f]=="object"?o[f]:{ideal:o[f]};l.exact!==void 0&&typeof l.exact=="number"&&(l.min=l.max=l.exact);const h=function(d,p){return d?d+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(l.ideal!==void 0){c.optional=c.optional||[];let d={};typeof l.ideal=="number"?(d[h("min",f)]=l.ideal,c.optional.push(d),d={},d[h("max",f)]=l.ideal,c.optional.push(d)):(d[h("",f)]=l.ideal,c.optional.push(d))}l.exact!==void 0&&typeof l.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[h("",f)]=l.exact):["min","max"].forEach(d=>{l[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[h(d,f)]=l[d])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},r=function(o,c){if(e.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){const f=function(l,h,d){h in l&&!(d in l)&&(l[d]=l[h],delete l[h])};o=JSON.parse(JSON.stringify(o)),f(o.audio,"autoGainControl","googAutoGainControl"),f(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=i(o.audio)}if(o&&typeof o.video=="object"){let f=o.video.facingMode;f=f&&(typeof f=="object"?f:{ideal:f});const l=e.version<66;if(f&&(f.exact==="user"||f.exact==="environment"||f.ideal==="user"||f.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!l)){delete o.video.facingMode;let h;if(f.exact==="environment"||f.ideal==="environment"?h=["back","rear"]:(f.exact==="user"||f.ideal==="user")&&(h=["front"]),h)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(x=>x.kind==="videoinput");let p=d.find(x=>h.some(_=>x.label.toLowerCase().includes(_)));return!p&&d.length&&h.includes("back")&&(p=d[d.length-1]),p&&(o.video.deviceId=f.exact?{exact:p.deviceId}:{ideal:p.deviceId}),o.video=i(o.video),Rh("chrome: "+JSON.stringify(o)),c(o)})}o.video=i(o.video)}return Rh("chrome: "+JSON.stringify(o)),c(o)},s=function(o){return e.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,f){r(o,l=>{t.webkitGetUserMedia(l,c,h=>{f&&f(s(h))})})};if(t.getUserMedia=a.bind(t),t.mediaDevices.getUserMedia){const o=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,f=>o(f).then(l=>{if(f.audio&&!l.getAudioTracks().length||f.video&&!l.getVideoTracks().length)throw l.getTracks().forEach(h=>{h.stop()}),new DOMException("","NotFoundError");return l},l=>Promise.reject(s(l))))}}}function Pu(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Lu(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):a={track:s.track};const o=new Event("track");o.track=s.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)}),r.stream.getTracks().forEach(s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.id):a={track:s};const o=new Event("track");o.track=s,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Er(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Du(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,c){let f=r.apply(this,arguments);return f||(f=e(this,o),this._senders.push(f)),f};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){s.apply(this,arguments);const c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(a=>{this._senders.push(e(this,a))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(a=>{const o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Iu(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const a=i.apply(this,[]);return a.forEach(o=>o._pc=this),a});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const a=r.apply(this,arguments);return a._pc=this,a}),n.RTCRtpSender.prototype.getStats=function(){const a=this;return this._pc.getStats().then(o=>wh(o,a.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(a=>a._pc=this),s}),Er(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(a=>wh(a,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,a,o;return this.getSenders().forEach(c=>{c.track===r&&(s?o=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(a?o=!0:a=c),c.track===r)),o||s&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function Uu(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(f=>{if(this.getSenders().find(h=>h.track===f))throw new DOMException("Track already exists.","InvalidAccessError")});const o=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(f=>o.indexOf(f)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{const c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),r.apply(this,arguments)}}function Nu(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return Uu(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const l=t.apply(this);return this._reverseStreams=this._reverseStreams||{},l.map(h=>this._reverseStreams[h.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(l){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},l.getTracks().forEach(h=>{if(this.getSenders().find(p=>p.track===h))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[l.id]){const h=new n.MediaStream(l.getTracks());this._streams[l.id]=h,this._reverseStreams[h.id]=l,l=h}i.apply(this,[l])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(l){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[l.id]||l]),delete this._reverseStreams[this._streams[l.id]?this._streams[l.id].id:l.id],delete this._streams[l.id]},n.RTCPeerConnection.prototype.addTrack=function(l,h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(_=>_===l))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===l))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const x=this._streams[h.id];if(x)x.addTrack(l),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new n.MediaStream([l]);this._streams[h.id]=_,this._reverseStreams[_.id]=h,this.addStream(_)}return this.getSenders().find(_=>_.track===l)};function s(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const p=f._reverseStreams[d],x=f._streams[p.id];h=h.replace(new RegExp(x.id,"g"),p.id)}),new RTCSessionDescription({type:l.type,sdp:h})}function a(f,l){let h=l.sdp;return Object.keys(f._reverseStreams||[]).forEach(d=>{const p=f._reverseStreams[d],x=f._streams[p.id];h=h.replace(new RegExp(p.id,"g"),x.id)}),new RTCSessionDescription({type:l.type,sdp:h})}["createOffer","createAnswer"].forEach(function(f){const l=n.RTCPeerConnection.prototype[f],h={[f](){const d=arguments;return arguments.length&&typeof arguments[0]=="function"?l.apply(this,[x=>{const _=s(this,x);d[0].apply(null,[_])},x=>{d[1]&&d[1].apply(null,x)},arguments[2]]):l.apply(this,arguments).then(x=>s(this,x))}};n.RTCPeerConnection.prototype[f]=h[f]});const o=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const f=c.get.apply(this);return f.type===""?f:s(this,f)}}),n.RTCPeerConnection.prototype.removeTrack=function(l){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!l._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(l._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(_=>l.track===_)&&(d=this._streams[p])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(l.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Oc(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function ku(n,e){e.version>102||Er(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const Ph=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:ku,shimAddTrackRemoveTrack:Nu,shimAddTrackRemoveTrackWithNative:Uu,shimGetSendersWithDtmf:Du,shimGetUserMedia:Ru,shimMediaStream:Pu,shimOnTrack:Lu,shimPeerConnection:Oc,shimSenderReceiverGetStats:Iu},Symbol.toStringTag,{value:"Module"}));function Ou(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,a){Sl("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,a)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a.audio,"autoGainControl","mozAutoGainControl"),r(a.audio,"noiseSuppression","mozNoiseSuppression")),s(a)},i&&i.prototype.getSettings){const a=i.prototype.getSettings;i.prototype.getSettings=function(){const o=a.apply(this,arguments);return r(o,"mozAutoGainControl","autoGainControl"),r(o,"mozNoiseSuppression","noiseSuppression"),o}}if(i&&i.prototype.applyConstraints){const a=i.prototype.applyConstraints;i.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o,"autoGainControl","mozAutoGainControl"),r(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function FM(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Fu(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Fc(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function zu(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!a)try{c.forEach(f=>{f.type=t[f.type]||f.type})}catch(f){if(f.name!=="TypeError")throw f;c.forEach((l,h)=>{c.set(h,Object.assign({},l,{type:t[l.type]||l.type}))})}return c}).then(a,o)}}function Bu(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Hu(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),Er(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Gu(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Sl("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Vu(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Wu(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const a=t.apply(this,arguments);if(s){const{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,o.sendEncodings=r,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function Xu(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function ju(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function qu(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const Lh=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:Wu,shimCreateAnswer:qu,shimCreateOffer:ju,shimGetDisplayMedia:FM,shimGetParameters:Xu,shimGetStats:zu,shimGetUserMedia:Ou,shimOnTrack:Fu,shimPeerConnection:Fc,shimRTCDataChannel:Vu,shimReceiverGetStats:Hu,shimRemoveStream:Gu,shimSenderGetStats:Bu},Symbol.toStringTag,{value:"Module"}));function $u(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function Yu(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const a=new Event("addstream");a.stream=s,i.dispatchEvent(a)})}),e.apply(i,arguments)}}}function Ku(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,a=e.addIceCandidate;e.createOffer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d},e.createAnswer=function(f,l){const h=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[h]);return l?(d.then(f,l),Promise.resolve()):d};let o=function(c,f,l){const h=r.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h};e.setLocalDescription=o,o=function(c,f,l){const h=s.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.setRemoteDescription=o,o=function(c,f,l){const h=a.apply(this,[c]);return l?(h.then(f,l),Promise.resolve()):h},e.addIceCandidate=o}function Ju(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(Zu(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}.bind(e))}function Zu(n){return n&&n.video!==void 0?Object.assign({},n,{video:wu(n.video)}):n}function Qu(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let a=0;a<i.iceServers.length;a++){let o=i.iceServers[a];o.urls===void 0&&o.url?(Sl("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,s.push(o)):s.push(i.iceServers[a])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function ep(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function tp(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio!="undefined"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo!="undefined"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(a=>a.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function np(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Dh=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:np,shimCallbacksAPI:Ku,shimConstraints:Zu,shimCreateOfferLegacy:tp,shimGetUserMedia:Ju,shimLocalStreamsAPI:$u,shimRTCIceServerUrls:Qu,shimRemoteStreamsAPI:Yu,shimTrackEventTransceiver:ep},Symbol.toStringTag,{value:"Module"}));function zM(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var ip={exports:{}};(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
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
`),i.headerExtensions&&i.headerExtensions.forEach(a=>{r+=e.writeExtmap(a)}),r},e.parseRtpEncodingParameters=function(t){const i=[],r=e.parseRtpParameters(t),s=r.fecMechanisms.indexOf("RED")!==-1,a=r.fecMechanisms.indexOf("ULPFEC")!==-1,o=e.matchPrefix(t,"a=ssrc:").map(d=>e.parseSsrcMedia(d)).filter(d=>d.attribute==="cname"),c=o.length>0&&o[0].ssrc;let f;const l=e.matchPrefix(t,"a=ssrc-group:FID").map(d=>d.substring(17).split(" ").map(x=>parseInt(x,10)));l.length>0&&l[0].length>1&&l[0][0]===c&&(f=l[0][1]),r.codecs.forEach(d=>{if(d.name.toUpperCase()==="RTX"&&d.parameters.apt){let p={ssrc:c,codecPayloadType:parseInt(d.parameters.apt,10)};c&&f&&(p.rtx={ssrc:f}),i.push(p),s&&(p=JSON.parse(JSON.stringify(p)),p.fec={ssrc:c,mechanism:a?"red+ulpfec":"red"},i.push(p))}}),i.length===0&&c&&i.push({ssrc:c});let h=e.matchPrefix(t,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-50*40*8:h=void 0,i.forEach(d=>{d.maxBitrate=h})),i},e.parseRtcpParameters=function(t){const i={},r=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const a=e.matchPrefix(t,"a=rtcp-mux");return i.mux=a.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
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
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(ip);var rp=ip.exports;const os=zM(rp),BM=Ap({__proto__:null,default:os},[rp]);function Oo(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=os.parseCandidate(i.candidate);for(const a in s)a in r||Object.defineProperty(r,a,{value:s[a]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Er(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function zc(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Er(n,"icecandidate",e=>{if(e.candidate){const t=os.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Fo(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp}});const t=function(o){if(!o||!o.sdp)return!1;const c=os.splitSections(o.sdp);return c.shift(),c.some(f=>{const l=os.parseMLine(f);return l&&l.kind==="application"&&l.protocol.indexOf("SCTP")!==-1})},i=function(o){const c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const f=parseInt(c[1],10);return f!==f?-1:f},r=function(o){let c=65536;return e.browser==="firefox"&&(e.version<57?o===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(o,c){let f=65536;e.browser==="firefox"&&e.version===57&&(f=65535);const l=os.matchPrefix(o.sdp,"a=max-message-size:");return l.length>0?f=parseInt(l[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(f=2147483637),f},a=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),f=r(c),l=s(arguments[0],c);let h;f===0&&l===0?h=Number.POSITIVE_INFINITY:f===0||l===0?h=Math.max(f,l):h=Math.min(f,l);const d={};Object.defineProperty(d,"maxMessageSize",{get(){return h}}),this._sctp=d}return a.apply(this,arguments)}}function zo(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const a=r.send;r.send=function(){const c=arguments[0],f=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&f>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return a.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},Er(n,"datachannel",r=>(t(r.channel,r.target),r))}function Bc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const a=new Event("connectionstatechange",r);s.dispatchEvent(a)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Hc(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function Bo(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Ho(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>t.apply(this,[a]))})}const HM=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:Hc,shimAddIceCandidateNullOrEmpty:Bo,shimConnectionState:Bc,shimMaxMessageSize:Fo,shimParameterlessSetLocalDescription:Ho,shimRTCIceCandidate:Oo,shimRTCIceCandidateRelayProtocol:zc,shimSendThrowTypeError:zo},Symbol.toStringTag,{value:"Module"}));function GM({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Ml,i=OM(n),r={browserDetails:i,commonShim:HM,extractVersion:Is,disableLog:NM,disableWarnings:kM,sdp:BM};switch(i.browser){case"chrome":if(!Ph||!Oc||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=Ph,Bo(n,i),Ho(n),Ru(n,i),Pu(n),Oc(n,i),Lu(n,i),Nu(n,i),Du(n),Iu(n,i),ku(n,i),Oo(n),zc(n),Bc(n),Fo(n,i),zo(n,i),Hc(n,i);break;case"firefox":if(!Lh||!Fc||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=Lh,Bo(n,i),Ho(n),Ou(n,i),Fc(n,i),zu(n,i),Fu(n),Gu(n),Bu(n),Hu(n),Vu(n),Wu(n,i),Xu(n,i),ju(n,i),qu(n,i),Oo(n),Bc(n),Fo(n,i),zo(n,i);break;case"safari":if(!Dh||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Dh,Bo(n,i),Ho(n),Qu(n),tp(n),Ku(n),$u(n),Yu(n),ep(n),Ju(n),np(n),Oo(n),zc(n),Fo(n,i),zo(n,i),Hc(n,i);break;default:t("Unsupported browser!");break}return r}const Ih=GM({window:typeof window=="undefined"?void 0:window});function Tr(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class sp{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,a=0;for(;a<i;){const o=Math.min(i,a+this.chunkedMTU),c=e.slice(a,o),f={__peerData:this._dataCount,n:s,data:c,total:r};t.push(f),a=o,s++}return this._dataCount++,t}}}function VM(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const fc=Ih.default||Ih,Ls=new class{isWebRTCSupported(){return typeof RTCPeerConnection!="undefined"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return fc.browserDetails.browser}getVersion(){return fc.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=fc.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator!="undefined"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},WM=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),op=()=>Math.random().toString(36).slice(2),Uh={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class XM extends sp{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Uh,this.browser=Ls.getBrowser(),this.browserVersion=Ls.getVersion(),this.pack=Tu,this.unpack=Eu,this.supports=function(){const t={browser:Ls.isBrowserSupported(),webRTC:Ls.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(Uh),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!Ls.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t}(),this.validateId=WM,this.randomToken=op}}const fn=new XM,jM="PeerJS: ";var Nh;(function(n){n[n.Disabled=0]="Disabled",n[n.Errors=1]="Errors",n[n.Warnings=2]="Warnings",n[n.All=3]="All"})(Nh||(Nh={}));class qM{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[jM,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var pe=new qM,bl={},$M=Object.prototype.hasOwnProperty,cn="~";function qs(){}Object.create&&(qs.prototype=Object.create(null),new qs().__proto__||(cn=!1));function YM(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function ap(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new YM(t,i||n,r),a=cn?cn+e:e;return n._events[a]?n._events[a].fn?n._events[a]=[n._events[a],s]:n._events[a].push(s):(n._events[a]=s,n._eventsCount++),n}function Go(n,e){--n._eventsCount===0?n._events=new qs:delete n._events[e]}function Qt(){this._events=new qs,this._eventsCount=0}Qt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)$M.call(t,i)&&e.push(cn?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Qt.prototype.listeners=function(e){var t=cn?cn+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,a=new Array(s);r<s;r++)a[r]=i[r].fn;return a};Qt.prototype.listenerCount=function(e){var t=cn?cn+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Qt.prototype.emit=function(e,t,i,r,s,a){var o=cn?cn+e:e;if(!this._events[o])return!1;var c=this._events[o],f=arguments.length,l,h;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,a),!0}for(h=1,l=new Array(f-1);h<f;h++)l[h-1]=arguments[h];c.fn.apply(c.context,l)}else{var d=c.length,p;for(h=0;h<d;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),f){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,t);break;case 3:c[h].fn.call(c[h].context,t,i);break;case 4:c[h].fn.call(c[h].context,t,i,r);break;default:if(!l)for(p=1,l=new Array(f-1);p<f;p++)l[p-1]=arguments[p];c[h].fn.apply(c[h].context,l)}}return!0};Qt.prototype.on=function(e,t,i){return ap(this,e,t,i,!1)};Qt.prototype.once=function(e,t,i){return ap(this,e,t,i,!0)};Qt.prototype.removeListener=function(e,t,i,r){var s=cn?cn+e:e;if(!this._events[s])return this;if(!t)return Go(this,s),this;var a=this._events[s];if(a.fn)a.fn===t&&(!r||a.once)&&(!i||a.context===i)&&Go(this,s);else{for(var o=0,c=[],f=a.length;o<f;o++)(a[o].fn!==t||r&&!a[o].once||i&&a[o].context!==i)&&c.push(a[o]);c.length?this._events[s]=c.length===1?c[0]:c:Go(this,s)}return this};Qt.prototype.removeAllListeners=function(e){var t;return e?(t=cn?cn+e:e,this._events[t]&&Go(this,t)):(this._events=new qs,this._eventsCount=0),this};Qt.prototype.off=Qt.prototype.removeListener;Qt.prototype.addListener=Qt.prototype.on;Qt.prefixed=cn;Qt.EventEmitter=Qt;bl=Qt;var Ar={};Tr(Ar,"ConnectionType",()=>ci);Tr(Ar,"PeerErrorType",()=>Et);Tr(Ar,"BaseConnectionErrorType",()=>$s);Tr(Ar,"DataConnectionErrorType",()=>Ys);Tr(Ar,"SerializationType",()=>gs);Tr(Ar,"SocketEventType",()=>oi);Tr(Ar,"ServerMessageType",()=>Ft);var ci;(function(n){n.Data="data",n.Media="media"})(ci||(ci={}));var Et;(function(n){n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc"})(Et||(Et={}));var $s;(function(n){n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed"})($s||($s={}));var Ys;(function(n){n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big"})(Ys||(Ys={}));var gs;(function(n){n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw"})(gs||(gs={}));var oi;(function(n){n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close"})(oi||(oi={}));var Ft;(function(n){n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE"})(Ft||(Ft={}));var El={};El=JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');class KM extends bl.EventEmitter{constructor(e,t,i,r,s,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];const o=e?"wss://":"ws://";this._baseUrl=o+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+El.version),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),pe.log("Server message received:",s)}catch{pe.log("Invalid server message",r.data);return}this.emit(oi.Message,s)},this._socket.onclose=r=>{this._disconnected||(pe.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(oi.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){pe.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:Ft.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(oi.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class cp{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===ci.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){pe.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;pe.log("Listening for ICE candidates."),e.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(pe.log(`Received ICE candidates for ${t}:`,a.candidate),s.socket.send({type:Ft.Candidate,payload:{candidate:a.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError($s.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError($s.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},pe.log("Listening for data channel"),e.ondatachannel=a=>{pe.log("Received data channel");const o=a.channel;s.getConnection(t,i)._initializeDataChannel(o)},pe.log("Listening for remote stream"),e.ontrack=a=>{pe.log("Received remote stream");const o=a.streams[0],c=s.getConnection(t,i);if(c.type===ci.Media){const f=c;this._addStreamToMediaConnection(o,f)}}}cleanup(){pe.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===ci.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:Ft.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Et.WebRTC,r),pe.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(Et.WebRTC,i),pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),pe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Ft.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(Et.WebRTC,r),pe.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(Et.WebRTC,i),pe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;pe.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(a){r.emitError(Et.WebRTC,a),pe.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(e){pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Et.WebRTC,t),pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class lp extends bl.EventEmitter{emitError(e,t){pe.error("Error:",t),this.emit("error",new JM(`${e}`,t))}}class JM extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class fp extends lp{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var Vc;const ks=class ks extends fp{get type(){return ci.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||ks.ID_PREFIX+fn.randomToken(),this._negotiator=new cp(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case Ft.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Ft.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};Vc=new WeakMap,bs(ks,Vc,ks.ID_PREFIX="mc_");let sa=ks;class ZM{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:a}=this._options,o=new URL(`${t}://${i}:${r}${s}${a}/${e}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",El.version),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==fn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===fn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var Wc,Xc;const lr=class lr extends fp{get type(){return ci.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||lr.ID_PREFIX+op(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new cp(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Ys.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case Ft.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Ft.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};Wc=new WeakMap,Xc=new WeakMap,bs(lr,Wc,lr.ID_PREFIX="dc_"),bs(lr,Xc,lr.MAX_BUFFERED_AMOUNT=8388608);let oa=lr;class Tl extends oa{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>oa.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class hc extends Tl{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new sp,this.serialization=gs.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=Eu(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=VM(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=Tu(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class QM extends Tl{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=gs.None}}class eS extends Tl{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=fn.chunkedMTU){this.emitError(Ys.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=gs.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var jc;const Os=class Os extends lp{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:QM,json:eS,binary:hc,"binary-utf8":hc,default:hc},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:fn.CLOUD_HOST,port:fn.CLOUD_PORT,path:"/",key:Os.DEFAULT_KEY,token:fn.randomToken(),config:fn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==fn.CLOUD_HOST?this._options.secure=fn.isSecure():this._options.host==fn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&pe.setLogFunction(this._options.logFunction),pe.logLevel=this._options.debug||0,this._api=new ZM(t),this._socket=this._createServerConnection(),!fn.supports.audioVideo&&!fn.supports.data){this._delayedAbort(Et.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!fn.validateId(i)){this._delayedAbort(Et.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(Et.ServerError,r))}_createServerConnection(){const e=new KM(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(oi.Message,t=>{this._handleMessage(t)}),e.on(oi.Error,t=>{this._abort(Et.SocketError,t)}),e.on(oi.Disconnected,()=>{this.disconnected||(this.emitError(Et.Network,"Lost connection to server."),this.disconnect())}),e.on(oi.Close,()=>{this.disconnected||this._abort(Et.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case Ft.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Ft.Error:this._abort(Et.ServerError,i.msg);break;case Ft.IdTaken:this._abort(Et.UnavailableID,`ID "${this.id}" is taken`);break;case Ft.InvalidKey:this._abort(Et.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Ft.Leave:pe.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case Ft.Expire:this.emitError(Et.PeerUnavailable,`Could not connect to peer ${r}`);break;case Ft.Offer:{const s=i.connectionId;let a=this.getConnection(r,s);if(a&&(a.close(),pe.warn(`Offer received for existing Connection ID:${s}`)),i.type===ci.Media){const c=new sa(r,this,{connectionId:s,_payload:i,metadata:i.metadata});a=c,this._addConnection(r,a),this.emit("call",c)}else if(i.type===ci.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});a=c,this._addConnection(r,a),this.emit("connection",c)}else{pe.warn(`Received malformed connection type:${i.type}`);return}const o=this._getMessages(s);for(const c of o)a.handleMessage(c);break}default:{if(!i){pe.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,a=this.getConnection(r,s);a&&a.peerConnection?a.handleMessage(e):s?this._storeMessage(s,e):pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Et.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Et.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new sa(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Et.ServerError,t))}};jc=new WeakMap,bs(Os,jc,Os.DEFAULT_KEY="peerjs");let aa=Os;const dc="fourbanners-v1-",kh="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function tS(){let n="";for(let e=0;e<4;e++)n+=kh[Math.floor(Math.random()*kh.length)];return n}const nS=()=>typeof window.RTCPeerConnection=="function"&&/^https?:$/.test(location.protocol),Oh=()=>Object.assign({debug:0},window.__PEER_OPTS||{});function Fh(n,e){return new Promise((t,i)=>{if(typeof window.RTCPeerConnection!="function"){i({type:"no-webrtc"});return}const r=new Map,s=[],a=new Map,o=new Map;let c={},f=null,l=null,h=!1,d=0,p=null;const x=(N,P)=>{h||(h=!0,clearTimeout(_),N?t(P):i(P))},_=setTimeout(()=>{try{k.destroy()}catch{}x(!1,{type:"timeout"})},12e3),m=N=>N===f||performance.now()-(o.get(N)||0)<6e3,u=()=>[...r.entries()].filter(([N])=>m(N)).map(([N,P])=>({peer:N,sameTab:N===f,isMe:N===f,presence:P}));let v=null;const M=()=>{v=null;const N=u();for(const P of s)try{P({peers:N})}catch(I){console.error(I)}},E=()=>{v||(v=setTimeout(M,16))},R=N=>({role:N.role,nick:N.nick,want:N.want,ph:N.ph,fac:N.fac});function C(){d=performance.now(),p=null;const N={};for(const[P,I]of r)N[P]=P===f?I:R(I);for(const P of a.values())if(P.open)try{P.send({t:"all",all:N})}catch{}}function w(){if(p)return;const N=Math.max(0,250-(performance.now()-d));p=setTimeout(C,N)}const k=e?new aa(dc+n,Oh()):new aa(Oh());k.on("open",N=>{if(f=N,r.set(N,c),e){x(!0,W);return}l=k.connect(dc+n,{reliable:!0,serialization:"json"}),l.on("open",()=>{try{l.send({t:"p",pr:c})}catch{}x(!0,W)}),l.on("data",P=>{if(!(!P||typeof P!="object")){if(o.set(dc+n,performance.now()),P.t==="full"){x(!1,{type:"full"});return}if(P.t==="all"&&P.all&&typeof P.all=="object"){for(const I of[...r.keys()])I!==f&&!(I in P.all)&&r.delete(I);for(const[I,V]of Object.entries(P.all))I!==f&&V&&typeof V=="object"&&(r.set(I,V),o.set(I,performance.now()));E()}else P.t==="h"&&typeof P.id=="string"&&P.pr&&typeof P.pr=="object"&&(r.set(P.id,P.pr),E())}}),l.on("close",()=>{for(const P of[...r.keys()])P!==f&&r.delete(P);E()}),l.on("error",()=>{})}),k.on("connection",N=>{if(!e){N.close();return}if(a.size>=3){N.on("open",()=>{try{N.send({t:"full"})}catch{}setTimeout(()=>N.close(),400)});return}a.set(N.peer,N),o.set(N.peer,performance.now()),N.on("open",()=>{C();try{N.send({t:"h",id:f,pr:c})}catch{}}),N.on("data",I=>{if(!I||I.t!=="p"||!I.pr||typeof I.pr!="object")return;o.set(N.peer,performance.now());const V=r.get(N.peer);r.set(N.peer,I.pr),E(),(!V||V.nick!==I.pr.nick||V.want!==I.pr.want||V.ph!==I.pr.ph||V.role!==I.pr.role||V.fac!==I.pr.fac)&&w()});const P=()=>{a.has(N.peer)&&(a.delete(N.peer),r.delete(N.peer),E(),w())};N.on("close",P),N.on("error",P)}),k.on("error",N=>{if(!h){try{k.destroy()}catch{}x(!1,N);return}if(N&&N.type==="peer-unavailable"&&!e){for(const P of[...r.keys()])P!==f&&r.delete(P);E()}}),k.on("disconnected",()=>{if(!k.destroyed)try{k.reconnect()}catch{}});let y=0;const T=()=>{if(y=performance.now(),e){for(const N of a.values())if(N.open)try{N.send({t:"h",id:f,pr:c})}catch{}}else if(l&&l.open)try{l.send({t:"p",pr:c})}catch{}},B=setInterval(()=>{if(k.destroyed){clearInterval(B);return}if(performance.now()-y>1500&&T(),e){for(const[N,P]of[...a])if(performance.now()-(o.get(N)||performance.now())>8e3){try{P.close()}catch{}a.delete(N),r.delete(N),E(),w()}}E()},1e3),W={name:n,presence:async N=>{for(const P in N)N[P]===null?delete c[P]:c[P]=N[P];r.set(f,c),T()},peers:u,onPeers:N=>(s.push(N),setTimeout(()=>N({peers:u()}),0),()=>{const P=s.indexOf(N);P>=0&&s.splice(P,1)}),leave:async()=>{clearInterval(B);try{k.destroy()}catch{}}}})}const Se=n=>document.getElementById(n);let ur={startMatch(){},seedDemo(){},preset:()=>"ffa",resetSolo(){}};const ca=()=>{var n;return{role:"player",nick:Ue.myNick||"Captain",ph:"lobby",want:(n=Ue.NET.want)!=null?n:-1,fac:zt.faction}};let Ui=!1;function hp(){["ovTitle","ovLobby","ovEnd"].forEach(e=>Se(e).hidden=!0),Se("ovBrowse").hidden=!1,Se("nick").value=Ue.myNick,Se("netNote").textContent="";const n=nS();Se("hostBtn").disabled=!n,Se("joinBtn").disabled=!n,n||(Se("netNote").textContent=/^https?:$/.test(location.protocol)?"Multiplayer could not start in this browser. Open the game's website link in Safari or Chrome.":"Multiplayer only works when the game is opened from its website.")}function Io(){Ue.myNick=(Se("nick").value||"").trim().slice(0,16);try{localStorage.setItem("fb-nick",Ue.myNick)}catch{}}function la(){const n=Ue.NET;g.state!=="lobby"&&ur.seedDemo(),n.lobbySig=null,g.state="lobby",["ovTitle","ovBrowse","ovEnd"].forEach(e=>Se(e).hidden=!0),Se("hudWrap").hidden=!0,Se("ovLobby").hidden=!1,n.role==="host"?xr():n.room.presence(ca()).catch(()=>{}),fa()}function xr(){const n=Ue.NET;if(!n||n.role!=="host")return;const e=n.room.peers(),t=new Set(e.map(a=>a.peer)),i=ya(n.room);if(i&&n.me!==i){const a=n.seats[n.me];delete n.seats[n.me],n.me=i,n.seats[i]=a===void 0?0:a}for(const a of Object.keys(n.seats))!t.has(a)&&a!==n.me&&delete n.seats[a];const r=()=>Object.values(n.seats);for(const a of e){if(a.sameTab)continue;const o=a.presence||{};if(o.role!=="player")continue;const c=o.want;if(typeof c=="number"&&c>=0&&c<4){if(n.seats[a.peer]===c)continue;r().includes(c)||(n.seats[a.peer]=c)}else c===-1&&n.seats[a.peer]!==void 0&&delete n.seats[a.peer]}const s=n.lobby;n.room.presence({role:"host",ph:"lobby",nick:Ue.myNick||"Host",fac:zt.faction,mode:s.mode,map:s.map,diff:s.diff,al:s.al.join(""),seats:n.seats,s:null,m:null,res:null}).catch(()=>{}),fa()}function dp(){const n=Ue.NET;if(n.role==="host")return{mode:n.lobby.mode,map:n.lobby.map,diff:n.lobby.diff,al:n.lobby.al,seats:n.seats,hostNick:Ue.myNick||"Host"};const e=n.room.peers().find(i=>i.presence&&i.presence.role==="host");if(!e)return null;n.hostPeer=e.peer;const t=e.presence;return{mode:t.mode,map:t.map,diff:t.diff,al:String(t.al||"0123").split("").map(Number),seats:t.seats||{},hostNick:t.nick,ph:t.ph,hostP:e}}function fa(){const n=Ue.NET;if(!n||Se("ovLobby").hidden)return;const e=dp(),t=n.role==="host";if(!e){Se("lobbyStatus").textContent="Connecting to the host…",Se("codeTxt").textContent=n.name||"",Se("seats").innerHTML="",n.lobbySig=null;return}Se("lobbyTitle").textContent=t?"Your battle":`${String(e.hostNick||"Host").slice(0,16)}'s battle`,Se("codeTxt").textContent=n.name||"",Se("copyBtn").hidden=!t;const i=n.room.peers(),r=m=>{const u=i.find(v=>v.peer===m);return u&&u.presence&&u.presence.nick?String(u.presence.nick).slice(0,16):"Player"},s=m=>{const u=i.find(M=>M.peer===m),v=u&&u.presence&&u.presence.fac;return as[v]?as[v].name:""},a=ya(n.room),o=m=>Object.keys(e.seats).find(u=>e.seats[u]===m),c=JSON.stringify([a,e.mode,e.map,e.diff,e.al,e.seats,e.hostNick,i.map(m=>[m.peer,m.presence&&m.presence.nick,m.presence&&m.presence.role,m.presence&&m.presence.fac])]);if(c===n.lobbySig)return;n.lobbySig=c;const f=Se("seats");f.innerHTML="",le.forEach((m,u)=>{const v=o(u),M=document.createElement("button");M.type="button",M.className="seat"+(v===a?" mine":"")+(v&&v!==a?" taken":""),M.style.background=m.css;const E=document.createElement("b");E.textContent=m.name;const R=document.createElement("span");if(R.textContent=v?(v===a?"You":r(v))+(i.find(w=>w.peer===v&&w.presence&&w.presence.role==="host")?" · host":""):"Computer",M.append(E,R),v&&s(v)){const w=document.createElement("small");w.textContent=s(v),M.appendChild(w)}const C=document.createElement("span");C.className="alchip",C.setAttribute("role","button"),C.textContent="Team "+Vh[e.al[u]],t&&(C.tabIndex=0,C.addEventListener("click",w=>{w.stopPropagation(),n.lobby.al[u]=(n.lobby.al[u]+1)%4,xr()})),M.appendChild(C),M.addEventListener("click",()=>{v&&v!==a||(t?v||(n.seats[a]=u,xr()):(n.want=v===a?-1:u,n.room.presence(ca()).catch(()=>{})))}),f.appendChild(M)});const l=(m,u,v)=>{const M=Se(m);M.classList.toggle("ro",v),M.querySelectorAll("button").forEach(E=>E.setAttribute("aria-pressed",String(E.dataset.v===String(u))))},h=t?n.seats[n.me]:e.seats[n.hostPeer],d=m=>Object.keys(wp).find(u=>Xs(u,h!=null?h:0).join("")===m.join(""))||"";l("lobbyFaction",zt.faction,!1),l("lobbyTeams",d(e.al),!t),l("lobbyMode",e.mode,!t),l("lobbyMap",e.map,!t),l("lobbyDiff",e.diff,!t),Se("startBtn").hidden=!t;const p=new Set(e.al).size,x=Object.keys(e.seats).length;Se("startBtn").disabled=p<2;const _=e.seats[a];Se("lobbyStatus").textContent=t?p<2?"Everyone is on one team. Split the teams to start.":x<2?"Share the code. Friends open this page, tap Play with friends and enter it.":`${x} players · computer plays the rest`:_===void 0?"Tap a color to take it":`You are ${le[_].name}. Waiting for the host to start…`}async function Sa(n){const e=Ue.NET;if(Ue.NET=null,e){try{e.unsub&&e.unsub()}catch{}try{await e.room.leave()}catch{}}ur.resetSolo(),g.state="title",Se("hudWrap").hidden=!0,["ovLobby","ovEnd","ovBrowse"].forEach(t=>Se(t).hidden=!0),ur.seedDemo(),n?(hp(),Se("netNote").textContent=n):Se("ovTitle").hidden=!1}function iS(){const n=Ue.NET;if(!n||n.role!=="client")return;const e=dp();if(!e){n.hostGoneAt||(n.hostGoneAt=performance.now()),performance.now()-n.hostGoneAt>6e3&&Sa("That battle is no longer open.");return}if(n.hostGoneAt=0,e.ph==="play"&&e.hostP.presence.seed){const t=e.seats[ya(n.room)];if(t===void 0){n.toldLate||(n.toldLate=!0,Se("lobbyStatus").textContent="The battle started without you. Wait here for the next one.");return}n.toldLate=!1,g.state==="lobby"&&(g.myTi=t,TM(e.hostP.presence))}}function rS(n){ur=Object.assign(ur,n),Se("nick").addEventListener("change",Io),Se("browseBack").addEventListener("click",()=>{Io(),Se("ovBrowse").hidden=!0,Se("ovTitle").hidden=!1}),Se("mpBtn").addEventListener("click",()=>{Wi(),hp()}),Se("codeIn").addEventListener("input",t=>{t.target.value=t.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")}),Se("codeIn").addEventListener("keydown",t=>{t.key==="Enter"&&Se("joinBtn").click()}),Se("copyBtn").addEventListener("click",()=>{const t=Ue.NET&&Ue.NET.name;if(!t)return;const i=()=>{Se("copyBtn").textContent="Copied",setTimeout(()=>Se("copyBtn").textContent="Copy",1500)};try{navigator.clipboard.writeText(t).then(i,()=>{})}catch{}}),Se("hostBtn").addEventListener("click",async()=>{if(Ui)return;Ui=!0,Io(),Se("netNote").textContent="Opening a battle…";let t=null,i=null;for(let a=0;a<4&&!t;a++){i=tS();try{t=await Fh(i,!0)}catch(o){if(!(o&&o.type==="unavailable-id")){Se("netNote").textContent="Could not reach the multiplayer server. Check your connection and try again.",Ui=!1;return}}}if(Ui=!1,!t){Se("netNote").textContent="Could not open a battle. Try again.";return}Se("netNote").textContent="";const r=Ue.NET={role:"host",room:t,name:i,seats:{},msgs:[],msgN:0,snapN:0,inp:{},lobby:{mode:g.mode,map:g.map.id,diff:g.diff,al:Xs(ur.preset(),zt.color)}},s=ya(t)||"me";r.me=s,r.seats[s]=zt.color,g.myTi=zt.color,g.role="host",r.unsub=t.onPeers(()=>{g.state==="lobby"&&xr()}),la()}),Se("joinBtn").addEventListener("click",async()=>{const t=(Se("codeIn").value||"").trim().toUpperCase();if(t.length!==4){Se("netNote").textContent="Battle codes are 4 letters or numbers.";return}if(Ui)return;Ui=!0,Io(),Se("netNote").textContent=`Joining ${t}…`;let i;try{i=await Fh(t,!1)}catch(s){Ui=!1;const a=s&&s.type;Se("netNote").textContent=a==="peer-unavailable"?`No battle found with code ${t}. Check the code with your host.`:a==="full"?"That battle already has four players.":"Could not connect. Check your internet connection and try again.";return}Ui=!1,Se("netNote").textContent="";const r=Ue.NET={role:"client",room:i,name:t,seats:{},hostPeer:null};g.role="client",r.unsub=i.onPeers(()=>{g.state==="lobby"&&fa()}),i.presence(ca()).catch(()=>{}),la()});const e=(t,i)=>Se(t).addEventListener("click",r=>{var o;const s=r.target.closest("button"),a=Ue.NET;!s||!a||a.role!=="host"||(i==="al"?a.lobby.al=Xs(s.dataset.v,(o=a.seats[a.me])!=null?o:0):i==="diff"?a.lobby.diff=+s.dataset.v:a.lobby[i]=s.dataset.v,xr())});Se("lobbyFaction").addEventListener("click",t=>{const i=t.target.closest("button"),r=Ue.NET;!i||!r||(zt.faction=i.dataset.v,zt.save(),r.role==="host"?xr():(r.lobbySig=null,r.room.presence(ca()).catch(()=>{}),fa()))}),e("lobbyTeams","al"),e("lobbyMode","mode"),e("lobbyMap","map"),e("lobbyDiff","diff"),Se("startBtn").addEventListener("click",()=>{var o;const t=Ue.NET;if(!t||t.role!=="host")return;Wi();const i=t.lobby;g.mode=i.mode,g.map=ha[i.map],g.diff=i.diff,g.ALLY=[...i.al],g.myTi=(o=t.seats[t.me])!=null?o:0,g.seed=Math.random()*1e9|0,t.msgs=[],t.msgN=0,t.inp={},t.snapN=0;const r=[0,0,0,0],s=[null,null,null,null],a=t.room.peers();for(const[c,f]of Object.entries(t.seats)){r[f]=1;const l=(a.find(h=>h.peer===c)||{}).presence||{};s[f]=c===t.me?zt.faction:as[l.fac]?l.fac:null}g.factions=vl(s,g.seed),ur.startMatch(r),Ma()}),Se("leaveBtn").addEventListener("click",()=>Sa())}const Mt=n=>document.getElementById(n);{const n=Mt("nojs");n&&n.remove()}document.addEventListener("gesturestart",n=>n.preventDefault());document.addEventListener("gesturechange",n=>n.preventDefault());let zh=0;document.addEventListener("touchend",n=>{const e=Date.now();e-zh<300&&!(n.target.closest&&n.target.closest("input"))&&n.preventDefault(),zh=e},{passive:!1});const sS=new URLSearchParams(location.search);sS.get("stress")==="1"&&(g.fullSquads=!0);let Al="ffa";xt.on("msg",n=>is(n.k,n.a));xt.on("spark",n=>$y(n.x,n.y,n.z,n.c,n.n));xt.on("splat",n=>{nM(n.x,n.z,n.s,n.ti),Yy(n.x,n.z)});xt.on("float",n=>ts(n.x,n.y,n.z,n.text,n.color));xt.on("sfx",n=>{const e=Lt[n.name];e&&e(n.x,n.z)});xt.on("shake",n=>{tt.shake=n});xt.on("buzz",n=>Kr(n));xt.on("hint",n=>{const e=g.player;e&&wn("mhint",2500)&&ts(e.x,e.y+3.4,e.z,n,"#fff")});xt.on("respawnMe",n=>{tt.yaw=n.face});xt.on("hud",()=>{g.state==="play"&&xl(te.lastSnapAt)});xt.on("hostEnd",n=>pr(n[0],n[1]));xt.on("end",({w:n,why:e})=>{Mu(),Ws(!1),rs(!1),xl(te.lastSnapAt);const t=g.ALLY[g.myTi],i=n<0?"draw":n===t?"win":"lose",r=i==="win"?"Victory":i==="draw"?"Draw":"Defeat";i==="win"?(Lt.horn(),Oi("Victory!","","#ffcf3a")):Oi(r,"",i==="draw"?"#fff":"#e0352b"),Mt("endTitle").innerHTML=`<span>${r}</span>`,Mt("endText").textContent=`${vr[g.mode].name} on ${g.map.name}. ${oS(n,e)}`,Mt("sKills").textContent=g.kills,Mt("sSquad").textContent=g.recruited,Mt("sTime").textContent=_l(g.T);const s=dr(),a=ri();Mt("againBtn").hidden=a,Mt("againBtn").textContent=s?"Back to lobby":"Fight again",Mt("menuBtn").textContent=Ue.NET?"Leave":"Menu",Mt("endNote").textContent=a?"Waiting for the host to start the next battle…":"",s&&Ma(),setTimeout(()=>{g.state==="end"&&(Mt("ovEnd").hidden=!1)},1600)});function oS(n,e){if(n<0)return"Time ran out with no clear winner.";const t=gM(n),i=t.indexOf("&")<0;return e==="castles"?`${t} tore down every enemy castle.`:e==="tickets"?`${t} ${i?"is":"are"} the last side with tickets.`:e==="caps"?`${t} carried the banner home ${zs} times.`:`Time is up and ${t} ${i?"leads":"lead"}.`}function up(){nu(g.layout),_u(),du(),pM(),mM(),Ws(!1),rs(!1),xp.reset()}function pp(n){Ue.NET||(g.role="solo"),Np(n),tt.yaw=g.player.face,tt.pitch=.32,up(),Lt.horn()}MM({onMatchStart:up,onAbort:n=>Sa(n),onLobby:()=>la()});rS({startMatch:pp,seedDemo:Ms,preset:()=>Al,resetSolo:()=>io()});xM(yl);let Uo=0,Vo=null;function Ms(){g.layout=Yc(g.map.id,!1,7),g.units=[],g.horses=[],g.arrows=[],g.flag=null,g.player=null,g.uid=0,g.teams=Kc([0,0,0,0]),g.factions=vl(le.map((i,r)=>r===g.myTi?zt.faction:null),7),nu(g.layout),_u(),du();const n=["foot","spear","arch","foot","spear"];le.forEach((i,r)=>n.forEach((s,a)=>{const[o,c]=$i(i,(a-2)*1.5),f=ls(r,o*.5,c*.5,s);f.face=Math.atan2(-f.x,-f.z),f.demo=!0}));const e=ls(g.myTi,0,22,"captain");e.demo=!0;const t={id:1,x:0,z:22,face:0,state:"ridden",rider:e,t:0,spd:9,ti:g.myTi};g.horses.push(t),e.mounted=!0,e.horse=t,Vo=e}function Bh(n){if(Uo+=n,Vo&&Vo.horse){const e=Uo*.35,t=Vo;t.x=Math.cos(e)*22,t.z=Math.sin(e)*22,t.y=Ut(t.x,t.z),t.face=Math.atan2(-Math.sin(e),Math.cos(e)),t.vx=-Math.sin(e)*8,t.vz=Math.cos(e)*8;const i=t.horse;i.x=t.x,i.z=t.z,i.face=t.face,i.spd=8}fu(g.units,n),hu(g.horses.map(e=>({key:e.id,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:e.spd,state:e.state,t:e.t,fall:e.fall})),n),gu(),ru(n,()=>{}),cM(Uo),tu(0,0,Uo),bn.render(Ct,pt),yu()}function Cr(n,e){Mt(n).addEventListener("click",t=>{const i=t.target.closest("button");i&&(Mt(n).querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed",r===i?"true":"false")),e(i.dataset.v))})}function no(){const n=yM(g.ALLY,g.myTi);Mt("desc").innerHTML=`<strong>${vr[g.mode].name}.</strong> ${vr[g.mode].desc}<br><strong>${g.map.name}.</strong> ${g.map.desc} <strong>Teams:</strong> ${n}`}function mp(){const n=Kd[ft.level].name;Mt("qualityNote").textContent=ft.stepped?`Lowered to ${n} to keep the game smooth.`:ft.setting==="auto"?`Auto picked ${n} for this device.`:"",Mt("segQuality").querySelectorAll("button").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.v===ft.setting)))}Cr("segMode",n=>{g.mode=n,no()});Cr("segMap",n=>{g.map=ha[n],no(),Ms()});Cr("segTeams",n=>{Al=n,g.ALLY=Xs(n,g.myTi),no()});Cr("segFaction",n=>{zt.faction=n,zt.save(),Ms()});Cr("segColor",n=>{zt.color=+n,zt.save(),io(),no(),Ms()});function io(){g.role="solo",g.myTi=zt.color,g.ALLY=Xs(Al,g.myTi)}function gp(){Wi(),Ue.NET=null,io(),g.seed=Math.random()*1e9|0,g.factions=vl(le.map((n,e)=>e===g.myTi?zt.faction:null),g.seed),pp(le.map((n,e)=>e===g.myTi?1:0))}const _p=(n,e)=>Mt(n).querySelectorAll("button").forEach(t=>t.setAttribute("aria-pressed",String(t.dataset.v===String(e))));Cr("segDiff",n=>{g.diff=+n});Cr("segQuality",n=>{n!==ft.setting&&(uy(n),location.reload())});Mt("goBtn").addEventListener("click",gp);Mt("againBtn").addEventListener("click",()=>{if(Wi(),dr()){la();return}gp()});Mt("menuBtn").addEventListener("click",()=>{if(Ue.NET){Sa();return}g.state="title",io(),Mt("ovEnd").hidden=!0,Mt("hudWrap").hidden=!0,Mt("ovTitle").hidden=!1,Ms()});const xp={t:0,frames:0,steps:0,reset(){this.t=0,this.frames=0},tick(n){if(ft.setting!=="auto"||this.steps>=2||this.t>8||(this.t+=n,this.frames++,this.t<8))return;this.frames/this.t<30&&my()&&(this.steps++,Qd(),Zd(),Cl(),mp(),this.reset())}};function uc(n){fu(g.units,n);const e=ri()?RM():g.horses.map(i=>({key:i.id,ti:i.ti,x:i.x,z:i.z,face:i.face,spd:i.spd,state:i.state,t:i.t,fall:i.fall}));hu(e,n),ru(n,Ky),rM(n),gu(),aM(n),sM(g.player,Jh(g.myTi),dh());const t=xu();tu(t?t.x:0,t?t.z:0,dh()),bn.render(Ct,pt),hM({joy:it.joy,nickFor:aS})}function aS(n){const e=Ue.NET;if(!e)return null;const t=e.room.peers(),i=e.role==="host"?e.seats:((t.find(a=>a.peer===e.hostPeer)||{}).presence||{}).seats||{},r=Object.keys(i).find(a=>i[a]===n);if(!r)return null;const s=t.find(a=>a.peer===r);return s&&s.presence&&s.presence.nick?String(s.presence.nick).slice(0,16):null}let pc=0,Hh=performance.now(),Gc=60;function vp(n){const e=(n-Hh)/1e3,t=Math.min(.05,e);Hh=n,e>0&&(Gc+=(1/e-Gc)*.05);try{if(ri()&&(g.state==="play"||g.state==="end"))wM(t)&&(g.state==="play"||g.state==="end")?uc(t):Bh(t);else if(g.state==="play")dr()&&EM(),pd(t,Su(t)),dr()&&g.state==="play"&&bM(),uc(t),xp.tick(e);else if(g.state==="end"){for(const i of g.units)i.dead&&rl(i,t);uc(t),dr()&&n-(Ue.NET.lastSend||0)>500&&Ma(!0)}else Bh(t),g.state==="lobby"&&(ri()?iS():dr()&&n-(Ue.NET.lastLobby||0)>700&&(Ue.NET.lastLobby=n,xr()));g.state==="play"&&(pc-=t,pc<=0&&(pc=.1,xl(te.lastSnapAt)))}catch(i){console.error(i)}requestAnimationFrame(vp)}const Gh=n=>Math.round(n*10)/10;window.__fb={end(){pr(g.ALLY[g.myTi],"time")},get info(){const n=Ue.NET,e=g.player;return{state:g.state,T:Math.round(g.T),MODE:g.mode,map:g.map.id,myTi:g.myTi,al:g.ALLY.join(""),units:g.units.length,horses:g.horses.length,arrows:g.arrows.length,net:n&&{role:n.role,seats:n.seats,size:n.lastSize,hostPeer:n.hostPeer},teams:g.teams.map(t=>({p:Math.round(t.points),t:t.tickets,c:t.caps,g:Math.round(t.gold),alive:t.alive,h:t.human?1:0,plan:t.plan&&t.plan.kind,lead:t.leader&&{m:t.leader.mounted,dead:t.leader.dead}})),kinds:["foot","spear","arch"].map(t=>g.units.filter(i=>!i.dead&&i.kind===t).length),flag:g.flag&&{s:g.flag.state},player:e&&{x:Gh(e.x),z:Gh(e.z),hp:Math.round(e.hp),mounted:e.mounted,dead:e.dead,id:e.id},gfx:{level:ft.level,setting:ft.setting,fps:Math.round(Gc),calls:bn.info.render.calls,tris:bn.info.render.triangles,batches:Fy()}}},step(n,e=1/30){for(let t=0;t<n&&g.state==="play";t++)pd(e,null)},ride(){g.player&&(g.player.lastHit=-9,yl.ride())},G:g,cam:tt};function Cl(){vy(),fM()}addEventListener("resize",Cl);_p("segFaction",zt.faction);_p("segColor",zt.color);io();Qd();Cl();no();mp();Ms();requestAnimationFrame(vp);
