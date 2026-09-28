var gu=n=>{throw TypeError(n)};var Zr=(n,e,t)=>e.has(n)?gu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);function _u(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const me=[{name:"Blue",hex:3824880,css:"#3a5cf0",pos:[-56,56]},{name:"Red",hex:14693675,css:"#e0352b",pos:[56,-56]},{name:"Green",hex:3129158,css:"#2fbf46",pos:[-56,-56]},{name:"Yellow",hex:15778841,css:"#f0c419",pos:[56,56]}],Yi={ffa:[0,1,2,3],"2v2":[0,1,1,0],"2v1v1":[0,1,2,0],"3v1":[0,1,0,0]},Yf=["A","B","C","D"],Ki={conquest:{name:"Conquest",time:600,title:"Castle Strength",desc:"Knock down every enemy castle. A castle only takes damage from fighters on foot."},dm:{name:"Deathmatch",time:480,title:"Tickets",desc:"Each team has 150 tickets. A lost soldier costs 1, a lost captain 5. The leading captain carries a bounty worth double gold."},ctf:{name:"Capture the Fort",time:600,title:"Captures",desc:"A banner waits in the fort at the centre. Carry it home on foot to score. Allies pool captures; first side to 3 wins."}},To={dunes:{id:"dunes",name:"Dune Field",desc:"Open sand and scattered fences. Straight fights.",sky:14472902,fog:[70,190],g1:13216120,g2:12096874,g3:11045474,hill:7234136,rock:9273716},river:{id:"river",name:"River Ford",desc:"A river splits the field. Two bridges and a shallow ford that slows everyone crossing it.",sky:13622752,fog:[70,190],g1:8362572,g2:7113282,g3:6123328,hill:5990997,rock:9080198},forest:{id:"forest",name:"Pine Forest",desc:"Dense pine clusters. Trees stop arrows and hide ambushes.",sky:12175536,fog:[34,120],g1:5600058,g2:6455359,g3:4479023,hill:4082740,rock:8027248},frost:{id:"frost",name:"Frost Hill",desc:"A snowy hill at the centre. Fighting downhill deals +20% damage and archers on top shoot 30% farther.",sky:15002866,fog:[60,170],g1:15660022,g2:14147816,g3:12109006,hill:10135218,rock:9344668}},Kf=["captain","foot","spear","arch"],Xt={captain:{hp:150,dmg:22,reach:1.3,cd:.6,spd:5.4,r:.62,block:.3},foot:{hp:60,dmg:13,reach:1.25,cd:.95,spd:5.4,r:.55,block:.3,cost:40,name:"Footman"},spear:{hp:55,dmg:14,reach:2.4,cd:1.1,spd:5,r:.55,block:.08,cost:45,name:"Spearman"},arch:{hp:38,dmg:6,reach:1.1,cd:1.2,spd:5.3,r:.5,block:0,cost:50,name:"Archer",range:22,shoot:2.3,arrow:10}},Xc={dmg:30,spd:6.3},Jf=["foot","spear","arch"],Zf=[{name:"Recruit",dmg:.7,income:2.2},{name:"Soldier",dmg:1,income:3},{name:"Warlord",dmg:1.25,income:4}],xu=20,lo=9.5,vi=11,Ao=120,Qf=20,eh=150,us=3,Ps=88,g={role:"solo",state:"title",mode:"conquest",map:To.dunes,diff:1,preset:"ffa",ALLY:[0,1,2,3],myTi:0,factions:["roman","roman","roman","roman"],seed:1,T:0,units:[],horses:[],arrows:[],teams:[],flag:null,bounty:-1,player:null,layout:null,kills:0,recruited:0,uid:0,arrowN:0,horseN:0,endInfo:null,squadCap:12},kn=(n,e)=>g.ALLY[n]!==g.ALLY[e],li=(n,e)=>g.ALLY[n.ti]!==g.ALLY[e.ti],cc=()=>new Set(g.ALLY).size===4,Xo={},ut={on(n,e){(Xo[n]||(Xo[n]=[])).push(e)},emit(n,e){const t=Xo[n];if(t)for(const i of t)i(e)}};function vu(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const jt=(n,e,t)=>n<e?e:n>t?t:n,_e=(n,e)=>n+Math.random()*(e-n),tr=(n,e)=>{let t=e-n;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t},ps=(n,e,t)=>n+jt(tr(n,e),-t,t);function th(n,e){return 7*Math.exp(-(n*n+e*e)/(2*20*20))}function Ia(n){return Math.abs(n+32)<2.4||Math.abs(n-32)<2.4}function lc(n,e){return g.map.id==="river"&&Math.abs(e)<5&&Math.hypot(n,e)>=7}function yu(n,e){return lc(n,e)&&Math.abs(n)<14}function Bt(n,e){return g.map.id==="frost"?th(n,e):g.map.id==="river"&&Math.abs(e)<5.5&&Math.hypot(n,e)>=7?Ia(n)?.38:-.45:0}function Mu(n,e){const t=Math.hypot(n,e),i=Math.sin(n*.07)*Math.cos(e*.05)+Math.sin(n*.023+e*.031)*1.4;let r=0;if(g.map.id==="frost"&&(r=th(n,e)),g.map.id==="river"){const s=Math.abs(e);s<7&&Math.hypot(n,e)>=7.5&&(r=s<5?-.95:-.95*(7-s)/2)}return t>92&&(r+=(t-92)*.25+Math.max(0,i)*((t-92)*.18)),r}function wi(n,e=0,t=0){const i=Math.hypot(n.pos[0],n.pos[1]),r=-n.pos[0]/i,s=-n.pos[1]/i;return[n.pos[0]+r*(lo+2.5+t)+s*e,n.pos[1]+s*(lo+2.5+t)-r*e]}function fc(n,e,t){const i=vu(t|0),r=(o,c)=>o+i()*(c-o),s={mapId:n,withFort:e,hills:[],palisades:[],rocks:[],trees:[],stones:[],obstacles:[],treeColliders:[],fortSegments:[]},a=(o,c,l=0)=>!me.some(f=>Math.hypot(f.pos[0]-o,f.pos[1]-c)<20+l)&&Math.hypot(o,c)>(e?12:8)+l&&!(n==="river"&&Math.abs(c)<9);for(let o=0;o<14;o++){const c=o/14*Math.PI*2+r(-.1,.1);s.hills.push({a:c,d:r(150,185),rad:r(18,34),sy:r(.35,.6)})}if(n==="dunes"){const o=[[-18,6,.4],[16,-8,-.3],[0,24,1.57],[0,-26,1.57],[-30,-8,.9],[30,10,.9],[-8,-40,0],[10,40,0]];for(const[c,l,f]of o){const h=[];for(let d=0;d<9;d++){const m=(d-4)*.66,x=c+Math.cos(f)*m,_=l-Math.sin(f)*m;h.push({x,z:_,rot:r(0,3),sy:r(.85,1.1)}),d%2===0&&s.obstacles.push({x,z:_,r:.75})}s.palisades.push({x:c,z:l,a:f,logs:h})}}if(n==="river")for(let o=0;o<22;o++){const c=r(-14,14),l=r(-4.5,4.5),f=r(.25,.5);Math.hypot(c,l)<7.5||s.stones.push({x:c,z:l,s:f})}if(n==="forest"){for(let o=0;o<16;o++){let c,l,f=0;do c=r(-82,82),l=r(-82,82),f++;while(!a(c,l,4)&&f<40);const h=5+Math.floor(i()*6);for(let d=0;d<h;d++){const m=c+r(-6,6),x=l+r(-6,6),_=r(.85,1.35);a(m,x)&&s.trees.push({x:m,z:x,s:_})}}for(let o=0;o<40;o++){const c=r(0,6.28),l=r(95,130);s.trees.push({x:Math.cos(c)*l,z:Math.sin(c)*l,s:r(1,1.6)})}for(const o of s.trees)Math.hypot(o.x,o.z)<90&&(s.obstacles.push({x:o.x,z:o.z,r:.7*o.s}),s.treeColliders.push({x:o.x,z:o.z,r:1.4*o.s}))}for(let o=0;o<(n==="forest"?10:20);o++){const c=r(-80,80),l=r(-80,80),f=r(.6,1.7),h=r(0,3),d=r(0,3);a(c,l)&&(s.rocks.push({x:c,z:l,r:f,rx:h,ry:d}),f>1.1&&s.obstacles.push({x:c,z:l,r:f*.9}))}for(const o of me)s.obstacles.push({x:o.pos[0],z:o.pos[1],r:lo,castle:!0});if(e)for(let o=0;o<12;o++){if(o%3===0)continue;const c=o/12*Math.PI*2,l=Math.cos(c)*6,f=Math.sin(c)*6;s.fortSegments.push({a:c,x:l,z:f}),s.obstacles.push({x:l,z:f,r:1.3})}return s}const zt=(n,...e)=>ut.emit("msg",{k:n,a:e}),bn=(n,e)=>ut.emit(n,e),fi=(n,e,t,i,r)=>bn("spark",{x:n,y:e,z:t,c:i,n:r}),qt=(n,e,t)=>bn("sfx",{name:n,x:e,z:t});function hc(n){return me.map((e,t)=>({points:100,tickets:eh,caps:0,gold:40,alive:!0,plan:null,leaderDeadT:0,recruitT:_e(2,6),thinkT:0,human:!!n[t],order:"follow",holdPt:null,towerT:_e(0,1.4),leader:null}))}function Fr(n,e,t,i,r=!1){const s=Xt[i],a={id:++g.uid,ti:n,kind:i,leader:i==="captain",human:r,isMe:r&&n===g.myTi&&g.role!=="client",remote:r&&n!==g.myTi,x:e,z:t,y:Bt(e,t),vx:0,vz:0,vy:0,face:Math.atan2(-e,-t),hp:s.hp,max:s.hp,dmg:r?Xc.dmg:s.dmg,spd:r?Xc.spd:s.spd,r:s.r,reach:s.reach,cd:_e(0,.6),shootCd:_e(0,1.5),swing:0,pending:null,stun:0,blockT:0,rt:_e(0,.3),foe:null,fd:1e9,dead:!1,deadT:0,trampleT:0,lastHit:-9,blocking:!1,aim:!1,mounted:!1,horse:null,summon:null,horseHp:Ao,horseCd:0,carrying:!1,kick:{n:0,vx:0,vz:0,st:0,dirty:!1}};return g.units.push(a),a}const Es=n=>g.units.filter(e=>!e.dead&&e.ti===n&&!e.leader);function Su(n){g.layout=fc(g.map.id,g.mode==="ctf",g.seed),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.uid=0,g.arrowN=0,g.endInfo=null,g.teams=hc(n),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,me.forEach((e,t)=>{const[i,r]=wi(e,0,7);g.teams[t].leader=Fr(t,i,r,"captain",g.teams[t].human),(g.squadCap>12?["foot","foot","foot","foot","foot","foot","foot","spear","spear","spear","spear","spear","spear","arch","arch","arch","arch","foot","spear","arch"].slice(0,g.squadCap):["foot","foot","foot","spear","spear","arch"]).forEach((a,o)=>{const[c,l]=wi(e,(o%8-3.5)*1.4,1.5+Math.floor(o/8)*1.4);Fr(t,c,l,a)})}),g.player=g.teams[g.myTi].leader,g.state="play",zt("start")}function bu(n,e){const t=g.teams[n];t.order=e;const i=t.leader;e==="hold"&&i&&(t.holdPt={x:i.x,z:i.z,face:i.face,isFront:!0})}function ms(n){const e=g.teams[n];return g.mode==="conquest"?e.alive:g.mode==="dm"?e.tickets>0:!0}function dc(n,e){const t=g.teams[n],i=Xt[e].cost;if(!ms(n)||t.gold<i||Es(n).length>=g.squadCap)return!1;t.gold-=i;const[r,s]=wi(me[n],_e(-2,2));return Fr(n,r,s,e),n===g.myTi&&(g.recruited++,qt("coin")),!0}function nh(n){const e=g.teams[n];return g.mode==="conquest"?e.alive:g.mode==="dm"?e.tickets>0:!0}function Co(n,e,t,i){n.remote?(n.kick.vx+=e,n.kick.vz+=t,n.kick.st=Math.max(n.kick.st,i||0),n.kick.dirty=!0):(n.vx+=e,n.vz+=t),i&&(n.stun=Math.max(n.stun,i))}function ls(n){let e=n.spd;return n.mounted&&(e*=1.8),n.carrying&&(e*=.7),yu(n.x,n.z)&&(e*=.6),n.human&&n.blocking&&!n.mounted&&(e*=.5),e}function ih(n){if(n.mounted||n.summon||n.horseCd>0||n.dead||n.carrying||g.T-n.lastHit<2)return!1;const e=n.face+Math.PI+_e(-.6,.6),t=jt(n.x+Math.sin(e)*14,-86,86),i=jt(n.z+Math.cos(e)*14,-86,86),r={id:++g.horseN,x:t,z:i,face:Math.atan2(n.x-t,n.z-i),state:"coming",rider:n,t:0,spd:0,ti:n.ti,fall:1};return g.horses.push(r),n.summon=r,n.isMe&&qt("neigh"),!0}function Eu(n,e){n.summon=null,n.mounted=!0,n.horse=e,e.state="ridden",n.r=.95,n.isMe&&bn("float",{x:n.x,y:n.y+3.4,z:n.z,text:"Mounted",color:"#fff"})}function Ji(n,e){if(!n.mounted)return;const t=n.horse;n.mounted=!1,n.horse=null,n.r=Xt.captain.r,e?(t.state="dead",t.t=0,t.fall=Math.random()<.5?1:-1,n.horseCd=Qf,n.horseHp=Ao,Co(n,Math.sin(n.face+Math.PI/2)*5,Math.cos(n.face+Math.PI/2)*5,1),n.human&&zt("horseDown",n.ti)):(t.state="leaving",t.t=0)}function uc(n,e){n.horseHp-=e,fi(n.x,n.y+1.3,n.z,"#d42a1e",5),qt("hit",n.x,n.z),n.horseHp<=0&&Ji(n,!0)}const rh=(n,e)=>g.units.some(t=>!t.dead&&li(t,n)&&t.kind==="spear"&&Math.hypot(t.x-n.x,t.z-n.z)<e),sh=n=>n.kind==="spear"&&n.stun<=0&&Math.hypot(n.vx,n.vz)<2.2;function oh(n){if(!(!n||n.dead)){if(n.mounted){Ji(n,!1);return}if(!n.summon){if(n.carrying){zt("rideNo",n.ti,"banner");return}if(n.horseCd>0){zt("rideNo",n.ti,"rest",Math.ceil(n.horseCd));return}if(g.T-n.lastHit<2){zt("rideNo",n.ti,"hot");return}ih(n)}}}function Wi(n,e,t){let i=null,r=e*e;for(const s of g.units){if(s.dead||!li(s,n)||t&&!t(s))continue;const a=s.x-n.x,o=s.z-n.z,c=a*a+o*o;c<r&&(r=c,i=s)}return[i,Math.sqrt(r)]}function ah(n){if(g.mode!=="conquest")return[-1,1e9];let e=-1,t=1e9;return g.teams.forEach((i,r)=>{if(!kn(r,n.ti)||!i.alive)return;const s=Math.hypot(me[r].pos[0]-n.x,me[r].pos[1]-n.z);s<t&&(t=s,e=r)}),[e,t]}const pc=n=>g.teams[n]&&g.teams[n].human?1:Zf[g.diff].dmg;function Bn(n,e){return n.cd>0||n.stun>0||n.dead||n.carrying?!1:(n.swing=.38,n.cd=(n.leader?n.mounted?.8:.6:Xt[n.kind].cd)*_e(.9,1.15),n.pending={t:.15,target:e},qt("swing",n.x,n.z),!0)}function ch(n){n.cd>0||n.stun>0||n.dead||(n.swing=.38,n.cd=.8,n.pending={t:.15,sweep:!0},qt("swing",n.x,n.z))}function Tu(n){const e=n.pending,t=e.target;if(n.pending=null,e.sweep){const i=.8*(1+Math.hypot(n.vx,n.vz)/12);for(const r of g.units)r.dead||!li(r,n)||Math.hypot(r.x-n.x,r.z-n.z)>3.1||Math.abs(tr(n.face,Math.atan2(r.x-n.x,r.z-n.z)))>1.25||jc(n,r,i);return}if(t&&t.castle!==void 0){const i=g.teams[t.castle];if(!i.alive||n.mounted||!kn(t.castle,n.ti)||Math.hypot(me[t.castle].pos[0]-n.x,me[t.castle].pos[1]-n.z)>vi+.8)return;i.points-=n.human?1.3:n.leader?.7:n.kind==="arch"?.08:.2,qt("wall",n.x,n.z),fi(n.x+Math.sin(n.face)*1.2,1.4,n.z+Math.cos(n.face)*1.2,"#cfc8b8",5),i.points<=0&&Cu(t.castle,n.ti);return}!t||t.dead||Math.hypot(t.x-n.x,t.z-n.z)>n.r+t.r+n.reach+.5||jc(n,t,1)}function jc(n,e,t=1){if(!li(n,e))return;let i=n.dmg*_e(.8,1.2)*t*pc(n.ti);if(n.kind==="spear"&&e.kind==="foot"&&(i*=1.3),n.kind==="spear"&&e.leader&&(i*=1.4),n.kind==="foot"&&e.kind==="arch"&&(i*=1.4),g.map.id==="frost"&&n.y-e.y>.8&&(i*=1.2),e.lastHit=g.T,e.mounted&&(n.kind==="spear"||Math.random()<.5)){uc(e,i*(n.kind==="spear"?3:1));return}let r=n.leader?n.mounted?9:7:4.5;const s=Math.abs(tr(e.face,Math.atan2(n.x-e.x,n.z-e.z)))<1.1;let a=!1;s&&e.stun<=0&&!e.mounted&&!e.carrying&&(e.human?a=e.blocking:Math.random()<Xt[e.kind].block&&(a=!0,e.blockT=.45));const o=(n.x+e.x)/2,c=(n.z+e.z)/2,l=(n.y+e.y)/2+1.2;a?(i*=e.human?.12:.25,r*=.4,fi(o,l,c,"#fff3b0",7),qt("clang",o,c),e.blockT=Math.max(e.blockT,.2),e.isMe&&bn("buzz",15)):(fi(o,l,c,me[e.ti].css,6),qt("hit",o,c),Math.random()<.4&&bn("splat",{x:e.x+_e(-.4,.4),z:e.z+_e(-.4,.4),s:_e(.6,1.1),ti:e.ti}),e.isMe&&(bn("shake",.35),bn("buzz",35))),e.hp-=i;const f=Math.atan2(e.x-n.x,e.z-n.z);Co(e,Math.sin(f)*r,Math.cos(f)*r,a?0:.22),e.hp<=0&&mc(e,n,f)}function lh(n,e,t=1.6){const i=.35+Math.hypot(e.x-n.x,e.z-n.z)/30,r=e.x+e.vx*i+_e(-.8,.8),s=e.z+e.vz*i+_e(-.8,.8),a=Math.hypot(r-n.x,s-n.z),o=(n.y||0)+t;g.arrows.push(fh({id:++g.arrowN,x0:n.x,y0:o,z0:n.z,x1:r,z1:s,y1:Bt(r,s)+1.1,dur:.25+a/28,peak:Math.min(6,a*.16),ti:n.ti,t:0,shooter:n})),n.tower||(n.swing=.38),qt("bow",n.x,n.z)}function fh(n){return n.x=n.x0,n.y=n.y0,n.z=n.z0,n.px=n.x0,n.py=n.y0,n.pz=n.z0,n}function Au(n,e){let t=Xt.arch.arrow*_e(.8,1.2)*pc(n.ti);if(e.kind==="spear"&&(t*=1.5),e.lastHit=g.T,e.mounted&&Math.random()<.6){uc(e,t);return}const i=Math.abs(tr(e.face,Math.atan2(n.x0-e.x,n.z0-e.z)))<1.1;let r=!1;if(i&&!e.mounted&&!e.carrying&&(e.kind==="foot"&&Math.random()<.7&&(r=!0),e.leader&&(e.human?e.blocking:Math.random()<.35)&&(r=!0)),r){fi(e.x,e.y+1.3,e.z,"#e8d9b0",4),qt("thud",e.x,e.z),e.blockT=Math.max(e.blockT,.2);return}e.hp-=t,fi(e.x,e.y+1.3,e.z,me[e.ti].css,4),qt("hit",e.x,e.z),Co(e,0,0,.12),e.isMe&&(bn("shake",.25),bn("buzz",20));const s=n.shooter;e.hp<=0&&mc(e,s&&!s.dead&&!s.tower?s:{ti:n.ti,human:!1},Math.atan2(e.x-n.x0,e.z-n.z0))}function mc(n,e,t){if(n.dead)return;n.dead=!0,n.deadT=0,n.vx+=Math.sin(t)*6,n.vz+=Math.cos(t)*6,n.vy=_e(3,6),n.fallDir=Math.random()<.5?1:-1,bn("splat",{x:n.x,z:n.z,s:_e(1,1.5),ti:n.ti}),qt("die",n.x,n.z),n.mounted&&Ji(n,!1),n.summon&&(n.summon.state="leaving",n.summon.t=0,n.summon=null),n.carrying&&Pu(n);const i=g.teams[n.ti];if(g.mode==="dm"&&(i.tickets=Math.max(0,i.tickets-(n.leader?5:1)),i.tickets<=0&&i.alive&&(i.alive=!1,zt("tickets0",n.ti))),e){const r=g.mode==="dm"&&n.leader&&n.ti===g.bounty,s=n.leader?r?50:25:8;g.teams[e.ti].gold+=s,e.human&&e.ti===g.myTi&&g.kills++,e.human&&zt("gold",e.ti,Math.round(n.x*10)/10,Math.round(n.z*10)/10,s),r&&zt("bountyClaimed",e.ti),n.leader&&zt("capDown",n.ti,e.ti)}n.leader&&(i.leaderDeadT=n.human?5:9,n.human&&zt("fell",n.ti,nh(n.ti)?1:0)),gc()}function Cu(n,e){const t=g.teams[n];t.alive=!1,t.points=0,zt("castleDown",n,e),gc()}function hh(n){const e=g.teams[n];return g.mode==="conquest"?!e.alive:g.mode==="dm"?!e.alive&&!g.units.some(t=>!t.dead&&t.ti===n):!1}const dh=n=>{const e=g.teams[n];return g.mode==="conquest"?e.points:g.mode==="dm"?e.tickets:e.caps},uh=n=>g.teams.reduce((e,t,i)=>e+(g.ALLY[i]===n?t.caps:0),0),Ru=()=>[...new Set(me.map((n,e)=>e).filter(n=>!hh(n)).map(n=>g.ALLY[n]))];function gc(){if(!(g.state!=="play"||g.role==="client")){if(g.mode==="conquest"||g.mode==="dm"){const n=Ru();if(n.length===1)return Xi(n[0],g.mode==="conquest"?"castles":"tickets");if(n.length===0)return Xi(-1,"time")}if(g.mode==="ctf"){for(const n of new Set(g.ALLY))if(uh(n)>=us)return Xi(n,"caps")}}}function wu(){if(g.state!=="play"||g.T<Ki[g.mode].time)return;const n={};me.forEach((t,i)=>{g.mode==="conquest"&&!g.teams[i].alive||(n[g.ALLY[i]]=(n[g.ALLY[i]]||0)+dh(i))});const e=Object.entries(n).map(([t,i])=>[+t,i]).sort((t,i)=>i[1]-t[1]);if(!e.length||e.length>1&&e[0][1]===e[1][1])return Xi(-1,"time");Xi(e[0][0],"time")}function Xi(n,e){g.state==="play"&&(g.state="end",g.endInfo={w:n,why:e},ut.emit("end",g.endInfo))}function Pu(n){const e=g.flag;n.carrying=!1,e.state="dropped",e.carrier=null,e.x=n.x,e.z=n.z,e.dropT=10,zt("flagDropped",n.ti)}function Lu(n){const e=g.flag;if(e){if(e.state==="carried"){const t=e.carrier,i=me[t.ti];Math.hypot(t.x-i.pos[0],t.z-i.pos[1])<lo+3.5&&(g.teams[t.ti].caps++,g.teams[t.ti].gold+=50,t.carrying=!1,e.state="home",e.carrier=null,e.x=0,e.z=0,zt("capture",t.ti),g.teams.forEach(r=>r.thinkT=0),gc());return}e.state==="dropped"&&(e.dropT-=n,e.dropT<=0&&(e.state="home",e.x=0,e.z=0,zt("flagHome")));for(const t of g.units)if(!(t.dead||!t.leader||Math.hypot(t.x-e.x,t.z-e.z)>=1.9)){if(t.mounted){t.isMe&&bn("hint","Get off your horse to take it");continue}t.summon&&(t.summon.state="leaving",t.summon.t=0,t.summon=null),t.carrying=!0,e.state="carried",e.carrier=t,g.teams.forEach(i=>i.thinkT=0),zt("flagTaken",t.ti);break}}}function ph(n){let e=null,t=1e9;for(const i of g.units){if(i.dead||!li(i,n))continue;const r=Math.hypot(i.x-n.x,i.z-n.z);if(r>3.4)continue;const s=r+Math.abs(tr(n.face,Math.atan2(i.x-n.x,i.z-n.z)))*1.5;s<t&&(t=s,e=i)}return e}function _c(n){if(!n||n.dead||n.carrying)return;if(n.mounted){ch(n);return}const e=ph(n);if(e){Bn(n,e)&&(n.face=Math.atan2(e.x-n.x,e.z-n.z));return}const[t,i]=ah(n);if(t>=0&&i<vi+.6){Bn(n,{castle:t})&&(n.face=Math.atan2(me[t].pos[0]-n.x,me[t].pos[1]-n.z));return}Bn(n,null)}function Du(n,e,t){const i=f=>f<5.2,r=Math.hypot(n.x,n.z),s=Math.hypot(e,t);if(i(r)===i(s))return null;const a=i(r)?[e,t]:[n.x,n.z],o=Math.round(Math.atan2(a[1],a[0])/(Math.PI/2))*(Math.PI/2),c=Math.cos(o),l=Math.sin(o);return i(r)?[c*8.5,l*8.5]:Math.abs(-n.x*l+n.z*c)>.9?[c*8.5,l*8.5]:[e,t]}function Iu(n,e,t){if(g.layout.withFort&&Math.hypot(n.x,n.z)<14){const l=Du(n,e,t);if(l)return l}if(g.map.id!=="river")return[e,t];const i=l=>l>5?1:l<-5?-1:0,r=i(n.z),s=i(t);if(r===s)return[e,t];let a=-32,o=1e9;for(const l of[-32,0,32]){const f=Math.abs(n.x-l)+Math.abs(e-l);f<o&&(o=f,a=l)}const c=a===0?9:1.4;if(r!==0){const l=a+jt(n.x-a,-c*.6,c*.6);return Math.abs(n.x-a)>c?[l,r*6.5]:[l,-r*6.5]}return[jt(n.x,a-c*.8,a+c*.8),(s||1)*6.5]}function xi(n,e,t,i,r,s=.3){const a=e-n.x,o=t-n.z,c=Math.hypot(a,o);let l=0,f=0;if(c>s){const d=i*Math.min(1,(c-s)/1.2+.2);l=a/c*d,f=o/c*d}const h=n.stun>0?1.5:n.mounted?4:10;return n.vx+=(l-n.vx)*Math.min(1,r*h),n.vz+=(f-n.vz)*Math.min(1,r*h),c}const Pn=(n,e,t,i,r=9)=>{n.face=ps(n.face,Math.atan2(e-n.x,t-n.z),i*r)};function wn(n,e,t,i,r,s=.3){const[a,o]=Iu(n,e,t);return xi(n,a,o,i,r,a===e&&o===t?s:.2),Math.hypot(a-n.x,o-n.z)>.6&&Pn(n,a,o,r,n.mounted?4:8),Math.hypot(e-n.x,t-n.z)}function Uu(n,e){const t=me[n.ti],i=Es(n.ti).length;if(g.mode==="conquest"){const r=g.units.some(a=>!a.dead&&li(a,n)&&Math.hypot(a.x-t.pos[0],a.z-t.pos[1])<22);if(e.alive&&(r||i<3)){e.plan={kind:"defend"};return}let s=e.plan&&e.plan.kind==="castle"&&g.teams[e.plan.ti].alive&&Math.random()>.08?e.plan.ti:null;if(s==null){const a=g.teams.map((o,c)=>c).filter(o=>kn(o,n.ti)&&g.teams[o].alive).sort((o,c)=>Math.hypot(me[o].pos[0]-n.x,me[o].pos[1]-n.z)-Math.hypot(me[c].pos[0]-n.x,me[c].pos[1]-n.z));a.length&&(s=a[Math.random()<.7?0:Math.min(1,a.length-1)])}e.plan=s==null?{kind:"defend"}:{kind:"castle",ti:s}}else if(g.mode==="dm"){if(i<2&&e.tickets>0&&e.gold>=40){e.plan={kind:"defend"};return}const[r]=Wi(n,400,o=>o.leader),[s]=Wi(n,400),a=g.bounty>=0&&kn(g.bounty,n.ti)&&Math.random()<.5?g.teams[g.bounty].leader:null;e.plan={kind:"hunt",target:a&&!a.dead?a:r||s}}else{const r=g.flag;n.carrying?e.plan={kind:"home"}:r.state==="carried"?e.plan={kind:li(r.carrier,n)?"hunt":"escort",target:r.carrier}:e.plan={kind:"banner"}}}function Nu(n,e){const t=e.plan;if(!t)return null;const i=me[n.ti];switch(t.kind){case"defend":{const[r,s]=wi(i,0,1);return{x:r,z:s,stop:1.5}}case"castle":return{x:me[t.ti].pos[0],z:me[t.ti].pos[1],stop:vi-.8,castle:t.ti};case"hunt":case"escort":return t.target&&!t.target.dead?{x:t.target.x,z:t.target.z,stop:t.kind==="escort"?3:1.5}:null;case"home":{const[r,s]=wi(i);return{x:r,z:s,stop:.5}}case"banner":return{x:g.flag.x,z:g.flag.z,stop:.2}}return null}function ku(n,e){if(n.carrying){n.mounted&&Ji(n,!1);return}!n.mounted&&!n.summon&&e>30&&!(n.foe&&n.fd<14)&&ih(n);const t=g.teams[n.ti].plan&&g.teams[n.ti].plan.kind;n.mounted&&(e<(t==="hunt"?6:12)||rh(n,g.diff===2?11:7))&&Ji(n,!1)}function Ou(n,e,t){e.thinkT-=t,(e.thinkT<=0||!e.plan)&&(e.thinkT=_e(1.2,2.4),Uu(n,e));const i=n.foe,r=n.fd;if(i&&r<(n.mounted?12:10)&&!n.carrying&&!(e.plan&&e.plan.kind==="escort"&&r>5)){if(n.mounted){rh(n,7)&&Ji(n,!1);const o=1/Math.max(r,.1);wn(n,i.x+(i.x-n.x)*o*4,i.z+(i.z-n.z)*o*4,ls(n),t,.1),r<3&&ch(n)}else wn(n,i.x,i.z,ls(n),t,n.r+i.r+n.reach*.6),Pn(n,i.x,i.z,t),r<n.r+i.r+n.reach&&Bn(n,i);return}const s=Nu(n,e);if(!s){xi(n,n.x,n.z,0,t),e.thinkT=Math.min(e.thinkT,.3);return}ku(n,Math.hypot(s.x-n.x,s.z-n.z));const a=wn(n,s.x,s.z,ls(n),t,s.stop);s.castle!=null?a<vi&&!n.mounted&&(Pn(n,s.x,s.z,t,6),Bn(n,{castle:s.castle})):e.plan.kind==="defend"&&a<2&&Pn(n,0,0,t,3)}function Fu(n,e,t,i,r){const s=Math.floor(t/4),a=(t%4-1.5)*1.55,o=i?e?2+s*1.6:1.8+Math.ceil(r/4)*1.6+s*1.6:e?-(2.2+s*1.6):1.8+s*1.6,c=n.face,l=Math.sin(c),f=Math.cos(c),h=Math.cos(c),d=-Math.sin(c);return[n.x-l*o+h*a,n.z-f*o+d*a]}function zu(n,e){const t=g.teams[n.ti],i=t.leader,r=i&&!i.dead,s=t.human?t.order||"follow":r?"follow":"charge",a=Xt[n.kind],o=n.kind==="arch"?a.range*(g.map.id==="frost"&&n.y>3?1.3:1):0;if(n.aim=!1,n.kind==="spear"&&s!=="charge"){const[_,p]=Wi(n,9,u=>u.mounted);if(_){xi(n,n.x,n.z,0,e),Pn(n,_.x,_.z,e,10),p<n.r+_.r+n.reach&&Bn(n,_);return}}const c=s==="charge"?45:n.kind==="arch"?o:s==="hold"?8:10,l=n.foe,f=n.fd,h=s==="follow"&&r&&l&&Math.hypot(l.x-i.x,l.z-i.z)>18;if(l&&f<c&&!h){n.kind==="arch"?f<n.r+l.r+n.reach?(Bn(n,l),Pn(n,l.x,l.z,e),xi(n,n.x,n.z,0,e)):f<5.5?(xi(n,n.x-(l.x-n.x),n.z-(l.z-n.z),n.spd,e),Pn(n,l.x,l.z,e,6)):f<=o?(n.aim=!0,xi(n,n.x,n.z,0,e),Pn(n,l.x,l.z,e,8),n.shootCd<=0&&n.stun<=0&&Math.abs(tr(n.face,Math.atan2(l.x-n.x,l.z-n.z)))<.3&&(lh(n,l),n.shootCd=a.shoot*_e(.85,1.2))):wn(n,l.x,l.z,n.spd,e,o*.8):(wn(n,l.x,l.z,ls(n),e,n.r+l.r+n.reach*.7),Pn(n,l.x,l.z,e),f<n.r+l.r+n.reach&&Bn(n,l));return}const[d,m]=ah(n);if(s==="charge"){if(g.mode==="conquest"&&d>=0){const _=me[d].pos;wn(n,_[0],_[1],n.spd,e,vi-1),m<vi&&(Pn(n,_[0],_[1],e,6),Bn(n,{castle:d}))}else if(g.mode==="ctf"){const _=g.flag,p=_.state==="carried"&&li(_.carrier,n)?_.carrier:_;wn(n,p.x,p.z,n.spd,e,1)}else{const[_]=Wi(n,300);_?wn(n,_.x,_.z,n.spd,e,1):wn(n,0,0,n.spd,e,4)}return}if(g.mode==="conquest"&&d>=0&&m<vi&&s==="follow"&&r&&!i.mounted&&Math.hypot(i.x-me[d].pos[0],i.z-me[d].pos[1])<vi+6){Pn(n,me[d].pos[0],me[d].pos[1],e,6),xi(n,n.x,n.z,0,e),Bn(n,{castle:d});return}const x=s==="hold"&&t.holdPt?t.holdPt:r?i:null;if(x){const[_,p]=Fu(x,x.isFront||!!x.human,n.slot||0,n.kind==="arch",n.meleeN||0);wn(n,_,p,n.spd*(Math.hypot(_-n.x,p-n.z)>6?1.15:1),e)<1&&(n.face=ps(n.face,x.face,e*6))}else{const[_,p]=wi(me[n.ti],0,2);wn(n,_,p,n.spd,e,3)}}function Bu(n){const e=Math.random();if(g.diff===2){const t=me.map((c,l)=>l).filter(c=>g.teams[c].human&&kn(c,n)),i=t.flatMap(c=>Es(c)),r=c=>i.filter(l=>l.kind===c).length,s=r("foot"),a=r("spear"),o=r("arch");return t.some(c=>g.teams[c].leader&&g.teams[c].leader.mounted)&&e<.5?"spear":o>=s&&o>=a?e<.7?"foot":"spear":s>=a?e<.7?"spear":"arch":e<.7?"arch":"foot"}return e<.45?"foot":e<.75?"spear":"arch"}function mh(n,e,t){n.x+=n.vx*e,n.z+=n.vz*e;for(const i of g.layout.obstacles){const r=n.x-i.x,s=n.z-i.z,a=i.r+n.r;if(Math.abs(r)>a||Math.abs(s)>a)continue;const o=Math.hypot(r,s);o<a&&o>0&&(n.x=i.x+r/o*a,n.z=i.z+s/o*a)}if(g.map.id==="river"&&(lc(n.x,n.z)&&!Ia(n.x)&&Math.abs(n.x)>=14&&(n.z=(t>=0?1:-1)*5.05),Math.abs(n.z)<5&&Ia(n.x)&&Math.abs(n.x)>20)){const i=n.x<0?-32:32;n.x=jt(n.x,i-2.1,i+2.1)}n.x=jt(n.x,-Ps,Ps),n.z=jt(n.z,-Ps,Ps),n.y=Bt(n.x,n.z)}function gh(n,e,t){n.blocking=!!e.block&&!n.mounted;const i=ls(n)*(n.swing>0&&!n.mounted?.6:1);xi(n,n.x+e.wx*3,n.z+e.wz*3,i*e.mag,t,.05),e.mag>.15&&(n.swing<=0||n.mounted)&&(n.face=ps(n.face,Math.atan2(e.wx,e.wz),t*(n.mounted?4.5:n.blocking?5:12))),n.blocking&&e.mag<.15&&(n.face=ps(n.face,e.camYaw,t*6))}function _h(n,e){if(g.T+=n,g.teams.forEach((o,c)=>{if(ms(c)&&(o.gold+=n*(o.human?3:Zf[g.diff].income)),!o.human&&ms(c)&&(o.recruitT-=n,o.recruitT<=0&&(o.recruitT=_e(3,6),dc(c,Bu(c)))),o.leader.dead&&nh(c)&&(o.leaderDeadT-=n,o.leaderDeadT<=0)){const[l,f]=wi(me[c],0,7),h=Fr(c,l,f,"captain",o.human);o.leader=h,o.plan=null,c===g.myTi&&(g.player=h,ut.emit("respawnMe",h)),o.human&&zt("respawn",c)}}),g.mode==="dm"){const o=g.teams.map((l,f)=>[l.tickets,f]).filter(l=>g.teams[l[1]].alive).sort((l,f)=>f[0]-l[0]),c=o.length>1&&o[0][0]-o[1][0]>=10?o[0][1]:-1;c!==g.bounty&&(g.bounty=c,c>=0&&zt("bounty",c))}const t=g.player;t&&!t.dead&&e&&(gh(t,e,n),e.attackHeld&&t.cd<=0&&_c(t));for(const o of g.teams){const c=o.leader;if(c&&c.human&&!c.dead){const[l]=Wi(c,12);!l&&c.hp<c.max&&(c.hp=Math.min(c.max,c.hp+n*6))}}const i=[0,0,0,0],r=[0,0,0,0],s=[0,0,0,0];for(const o of g.units)!o.dead&&!o.leader&&o.kind!=="arch"&&s[o.ti]++;for(const o of g.units)o.dead||(o.cd-=n,o.shootCd-=n,o.stun-=n,o.blockT-=n,o.rt-=n,o.trampleT-=n,o.horseCd>0&&(o.horseCd-=n),o.swing>0&&(o.swing-=n),o.pending&&(o.pending.t-=n,o.pending.t<=0&&Tu(o)),o.rt<=0&&(o.rt=_e(.25,.4),[o.foe,o.fd]=Wi(o,50)),o.foe&&o.foe.dead&&(o.foe=null,o.fd=1e9),o.foe&&(o.fd=Math.hypot(o.foe.x-o.x,o.foe.z-o.z)),!(o.human||o.dead)&&(o.leader?Ou(o,g.teams[o.ti],n):(o.slot=o.kind==="arch"?r[o.ti]++:i[o.ti]++,o.meleeN=s[o.ti],zu(o,n))));for(const o of g.horses)if(o.t+=n,o.state==="coming"){const c=o.rider;if(c.dead||c.summon!==o){o.state="leaving",o.t=0;continue}const l=c.x-o.x,f=c.z-o.z,h=Math.hypot(l,f)||.01;o.face=Math.atan2(l,f);const d=Math.min(16,h*4);o.x+=l/h*d*n,o.z+=f/h*d*n,o.spd=d,h<1.3&&Eu(c,o)}else if(o.state==="ridden"){const c=o.rider;o.x=c.x,o.z=c.z,o.face=c.face,o.spd=Math.hypot(c.vx,c.vz)}else o.state==="leaving"&&(o.x+=Math.sin(o.face)*10*n,o.z+=Math.cos(o.face)*10*n,o.spd=10);g.horses=g.horses.filter(o=>!(o.state==="leaving"&&o.t>3||o.state==="dead"&&o.t>8));for(const o of g.units){if(o.dead||!o.mounted)continue;const c=Math.hypot(o.vx,o.vz);for(const l of g.units){if(l.dead||!li(l,o)||l.mounted)continue;const f=l.x-o.x,h=l.z-o.z;if(Math.abs(f)>4||Math.abs(h)>4)continue;const d=Math.hypot(f,h);if(l.kind==="spear"&&d<l.r+o.r+1.6&&sh(l)&&c>4&&Math.abs(tr(l.face,Math.atan2(o.x-l.x,o.z-l.z)))<1){uc(o,55),o.mounted&&Ji(o,!0),fi(l.x,l.y+1.5,l.z,"#fff3b0",8),qt("clang",l.x,l.z),bn("float",{x:l.x,y:l.y+2.8,z:l.z,text:"Spear wall!",color:me[l.ti].css});break}if(c>6&&d<l.r+o.r+.3&&l.trampleT<=0){l.trampleT=.8,l.lastHit=g.T;const m=Math.atan2(f,h);Co(l,Math.sin(m)*10+o.vx*.5,Math.cos(m)*10+o.vz*.5,.7),l.hp-=12*pc(o.ti),fi(l.x,l.y+1,l.z,"#c9b28a",6),qt("trample",l.x,l.z),l.hp<=0&&mc(l,o,m)}}Math.random()<n*c*.9&&qt("hoof",o.x,o.z)}const a=g.units.filter(o=>!o.dead);for(let o=0;o<a.length;o++){const c=a[o];for(let l=o+1;l<a.length;l++){const f=a[l],h=f.x-c.x,d=f.z-c.z,m=c.r+f.r;if(h>m||h<-m||d>m||d<-m)continue;const x=Math.hypot(h,d)||.01;if(x>=m)continue;const _=(m-x)/2,p=h/x,u=d/x;let v=c.remote?0:c.human||c.mounted?.4:1,y=f.remote?0:f.human||f.mounted?.4:1;v===0&&(y=2),y===0&&(v=2),c.x-=p*_*v,c.z-=u*_*v,f.x+=p*_*y,f.z+=u*_*y}}for(const o of g.units){if(o.dead){xc(o,n);continue}if(o.remote){o.y=Bt(o.x,o.z);continue}mh(o,n,o.z)}g.units=g.units.filter(o=>!(o.dead&&o.deadT>14)),me.forEach((o,c)=>{const l=g.teams[c];if(g.mode==="conquest"&&!l.alive||(l.towerT-=n,l.towerT>0))return;l.towerT=1.4;const[f]=Wi({x:o.pos[0],z:o.pos[1],ti:c},24);f&&lh({x:o.pos[0],z:o.pos[1],y:0,vx:0,vz:0,ti:c,tower:!0},f,5.5)}),xh(n,!0),Lu(n),wu()}function xc(n,e){n.deadT+=e,n.x+=n.vx*e,n.z+=n.vz*e,n.vy-=18*e;const t=Bt(n.x,n.z);n.y=Math.max(t,n.y+n.vy*e);const i=Math.pow(n.y>t?.6:.03,e);n.vx*=i,n.vz*=i}function xh(n,e){for(const t of g.arrows){if(t.stuck){t.life-=n;continue}t.t+=n/t.dur;const i=Math.min(1,t.t),r=t.x0+(t.x1-t.x0)*i,s=t.z0+(t.z1-t.z0)*i,a=t.y0+(t.y1-t.y0)*i+t.peak*4*i*(1-i);if(t.px=t.x,t.py=t.y,t.pz=t.z,t.x=r,t.y=a,t.z=s,g.map.id==="forest"&&a<7){for(const o of g.layout.treeColliders)if(Math.abs(o.x-r)<o.r&&Math.abs(o.z-s)<o.r&&Math.hypot(o.x-r,o.z-s)<o.r){t.stuck=!0,t.life=2,qt("thud",r,s),fi(r,a,s,"#6b4a2e",3);break}if(t.stuck)continue}if(t.t>=1)if(e){let o=null,c=1;for(const l of g.units){if(l.dead||!kn(l.ti,t.ti))continue;const f=Math.hypot(l.x-t.x1,l.z-t.z1)-(l.mounted?.5:0);f<c&&(c=f,o=l)}o?(Au(t,o),t.done=!0):(t.stuck=!0,t.life=3)}else t.stuck=!0,t.life=2.5}g.arrows=g.arrows.filter(t=>!(t.done||t.stuck&&t.life<=0))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vc="160",Hu=0,qc=1,Gu=2,vh=1,Vu=2,ei=3,Pi=0,cn=1,Wt=2,Ai=0,Pr=1,$c=2,Yc=3,Kc=4,Wu=5,zi=100,Xu=101,ju=102,Jc=103,Zc=104,qu=200,$u=201,Yu=202,Ku=203,Ua=204,Na=205,Ju=206,Zu=207,Qu=208,ep=209,tp=210,np=211,ip=212,rp=213,sp=214,op=0,ap=1,cp=2,fo=3,lp=4,fp=5,hp=6,dp=7,Ro=0,up=1,pp=2,Ci=0,mp=1,gp=2,_p=3,xp=4,vp=5,yp=6,yh=300,zr=301,Br=302,ka=303,Oa=304,wo=306,Fa=1e3,Dn=1001,za=1002,tn=1003,Qc=1004,jo=1005,Mn=1006,Mp=1007,gs=1008,Ri=1009,Sp=1010,bp=1011,yc=1012,Mh=1013,yi=1014,Mi=1015,_s=1016,Sh=1017,bh=1018,ji=1020,Ep=1021,In=1023,Tp=1024,Ap=1025,qi=1026,Hr=1027,Cp=1028,Eh=1029,Rp=1030,Th=1031,Ah=1033,qo=33776,$o=33777,Yo=33778,Ko=33779,el=35840,tl=35841,nl=35842,il=35843,Ch=36196,rl=37492,sl=37496,ol=37808,al=37809,cl=37810,ll=37811,fl=37812,hl=37813,dl=37814,ul=37815,pl=37816,ml=37817,gl=37818,_l=37819,xl=37820,vl=37821,Jo=36492,yl=36494,Ml=36495,wp=36283,Sl=36284,bl=36285,El=36286,Rh=3e3,$i=3001,Pp=3200,Lp=3201,Mc=0,Dp=1,mn="",Ft="srgb",Vn="srgb-linear",Sc="display-p3",Po="display-p3-linear",ho="linear",ft="srgb",uo="rec709",po="p3",ar=7680,Tl=519,Ip=512,Up=513,Np=514,wh=515,kp=516,Op=517,Fp=518,zp=519,Al=35044,Cl=35048,Rl="300 es",Ba=1035,ri=2e3,mo=2001;class $r{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zo=Math.PI/180,Ha=180/Math.PI;function Ts(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function an(n,e,t){return Math.max(e,Math.min(t,n))}function Bp(n,e){return(n%e+e)%e}function Qo(n,e,t){return(1-t)*n+t*e}function wl(n){return(n&n-1)===0&&n!==0}function Ga(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Qr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(an(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,i,r,s,a,o,c,l){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=c,f[6]=i,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],f=i[4],h=i[7],d=i[2],m=i[5],x=i[8],_=r[0],p=r[3],u=r[6],v=r[1],y=r[4],S=r[7],P=r[2],R=r[5],w=r[8];return s[0]=a*_+o*v+c*P,s[3]=a*p+o*y+c*R,s[6]=a*u+o*S+c*w,s[1]=l*_+f*v+h*P,s[4]=l*p+f*y+h*R,s[7]=l*u+f*S+h*w,s[2]=d*_+m*v+x*P,s[5]=d*p+m*y+x*R,s[8]=d*u+m*S+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-i*s*f+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],h=f*a-o*l,d=o*c-f*s,m=l*s-a*c,x=t*h+i*d+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/x;return e[0]=h*_,e[1]=(r*l-f*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(f*t-r*c)*_,e[5]=(r*s-o*t)*_,e[6]=m*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ea.makeScale(e,t)),this}rotate(e){return this.premultiply(ea.makeRotation(-e)),this}translate(e,t){return this.premultiply(ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new je;function Ph(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function go(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Hp(){const n=go("canvas");return n.style.display="block",n}const Pl={};function fs(n){n in Pl||(Pl[n]=!0,console.warn(n))}const Ll=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Dl=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ls={[Vn]:{transfer:ho,primaries:uo,toReference:n=>n,fromReference:n=>n},[Ft]:{transfer:ft,primaries:uo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Po]:{transfer:ho,primaries:po,toReference:n=>n.applyMatrix3(Dl),fromReference:n=>n.applyMatrix3(Ll)},[Sc]:{transfer:ft,primaries:po,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Dl),fromReference:n=>n.applyMatrix3(Ll).convertLinearToSRGB()}},Gp=new Set([Vn,Po]),et={enabled:!0,_workingColorSpace:Vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Gp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ls[e].toReference,r=Ls[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ls[n].primaries},getTransfer:function(n){return n===mn?ho:Ls[n].transfer}};function Lr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ta(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let cr;class Lh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{cr===void 0&&(cr=go("canvas")),cr.width=e.width,cr.height=e.height;const i=cr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=cr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=go("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Lr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Lr(t[i]/255)*255):t[i]=Lr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vp=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ts(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(na(r[a].image)):s.push(na(r[a]))}else s=na(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function na(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Lh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wp=0;class ln extends $r{constructor(e=ln.DEFAULT_IMAGE,t=ln.DEFAULT_MAPPING,i=Dn,r=Dn,s=Mn,a=gs,o=In,c=Ri,l=ln.DEFAULT_ANISOTROPY,f=mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Ts(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof f=="string"?this.colorSpace=f:(fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=f===$i?Ft:mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fa:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fa:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ft?$i:Rh}set encoding(e){fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===$i?Ft:mn}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=yh;ln.DEFAULT_ANISOTROPY=1;class kt{constructor(e=0,t=0,i=0,r=1){kt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],f=c[4],h=c[8],d=c[1],m=c[5],x=c[9],_=c[2],p=c[6],u=c[10];if(Math.abs(f-d)<.01&&Math.abs(h-_)<.01&&Math.abs(x-p)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+_)<.1&&Math.abs(x+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,S=(m+1)/2,P=(u+1)/2,R=(f+d)/4,w=(h+_)/4,F=(x+p)/4;return y>S&&y>P?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=R/i,s=w/i):S>P?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=R/r,s=F/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=w/s,r=F/s),this.set(i,r,s,t),this}let v=Math.sqrt((p-x)*(p-x)+(h-_)*(h-_)+(d-f)*(d-f));return Math.abs(v)<.001&&(v=1),this.x=(p-x)/v,this.y=(h-_)/v,this.z=(d-f)/v,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xp extends $r{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(fs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===$i?Ft:mn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new ln(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Dh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends Xp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ih extends ln{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jp extends ln{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],f=i[r+2],h=i[r+3];const d=s[a+0],m=s[a+1],x=s[a+2],_=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=f,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=x,e[t+3]=_;return}if(h!==_||c!==d||l!==m||f!==x){let p=1-o;const u=c*d+l*m+f*x+h*_,v=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const P=Math.sqrt(y),R=Math.atan2(P,u*v);p=Math.sin(p*R)/P,o=Math.sin(o*R)/P}const S=o*v;if(c=c*p+d*S,l=l*p+m*S,f=f*p+x*S,h=h*p+_*S,p===1-o){const P=1/Math.sqrt(c*c+l*l+f*f+h*h);c*=P,l*=P,f*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],f=i[r+3],h=s[a],d=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+f*h+c*m-l*d,e[t+1]=c*x+f*d+l*h-o*m,e[t+2]=l*x+f*m+o*d-c*h,e[t+3]=f*x-o*h-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),f=o(r/2),h=o(s/2),d=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*f*h+l*m*x,this._y=l*m*h-d*f*x,this._z=l*f*x+d*m*h,this._w=l*f*h-d*m*x;break;case"YXZ":this._x=d*f*h+l*m*x,this._y=l*m*h-d*f*x,this._z=l*f*x-d*m*h,this._w=l*f*h+d*m*x;break;case"ZXY":this._x=d*f*h-l*m*x,this._y=l*m*h+d*f*x,this._z=l*f*x+d*m*h,this._w=l*f*h-d*m*x;break;case"ZYX":this._x=d*f*h-l*m*x,this._y=l*m*h+d*f*x,this._z=l*f*x-d*m*h,this._w=l*f*h+d*m*x;break;case"YZX":this._x=d*f*h+l*m*x,this._y=l*m*h+d*f*x,this._z=l*f*x-d*m*h,this._w=l*f*h-d*m*x;break;case"XZY":this._x=d*f*h-l*m*x,this._y=l*m*h-d*f*x,this._z=l*f*x+d*m*h,this._w=l*f*h+d*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],h=t[10],d=i+o+h;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(f-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(an(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=i*f+a*o+r*l-s*c,this._y=r*f+a*c+s*o-i*l,this._z=s*f+a*l+i*c-r*o,this._w=a*f-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),f=Math.atan2(l,o),h=Math.sin((1-t)*f)/l,d=Math.sin(t*f)/l;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),f=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*f,this.y=i+c*f+o*l-s*h,this.z=r+c*h+s*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ia.copy(this).projectOnVector(e),this.sub(ia)}reflect(e){return this.sub(ia.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(an(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ia=new D,Il=new Wn;class nr{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(s,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ds.copy(i.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(es),Is.subVectors(this.max,es),lr.subVectors(e.a,es),fr.subVectors(e.b,es),hr.subVectors(e.c,es),hi.subVectors(fr,lr),di.subVectors(hr,fr),Ii.subVectors(lr,hr);let t=[0,-hi.z,hi.y,0,-di.z,di.y,0,-Ii.z,Ii.y,hi.z,0,-hi.x,di.z,0,-di.x,Ii.z,0,-Ii.x,-hi.y,hi.x,0,-di.y,di.x,0,-Ii.y,Ii.x,0];return!ra(t,lr,fr,hr,Is)||(t=[1,0,0,0,1,0,0,0,1],!ra(t,lr,fr,hr,Is))?!1:(Us.crossVectors(hi,di),t=[Us.x,Us.y,Us.z],ra(t,lr,fr,hr,Is))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const jn=[new D,new D,new D,new D,new D,new D,new D,new D],Tn=new D,Ds=new nr,lr=new D,fr=new D,hr=new D,hi=new D,di=new D,Ii=new D,es=new D,Is=new D,Us=new D,Ui=new D;function ra(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ui.fromArray(n,s);const o=r.x*Math.abs(Ui.x)+r.y*Math.abs(Ui.y)+r.z*Math.abs(Ui.z),c=e.dot(Ui),l=t.dot(Ui),f=i.dot(Ui);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const qp=new nr,ts=new D,sa=new D;class As{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):qp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ts.subVectors(e,this.center);const t=ts.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ts,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ts.copy(e.center).add(sa)),this.expandByPoint(ts.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new D,oa=new D,Ns=new D,ui=new D,aa=new D,ks=new D,ca=new D;class $p{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){oa.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(oa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ns),o=ui.dot(this.direction),c=-ui.dot(Ns),l=ui.lengthSq(),f=Math.abs(1-a*a);let h,d,m,x;if(f>0)if(h=a*c-o,d=a*o-c,x=s*f,h>=0)if(d>=-x)if(d<=x){const _=1/f;h*=_,d*=_,m=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l):d<=x?(h=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(oa).addScaledVector(Ns,d),m}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const i=qn.dot(this.direction),r=qn.dot(qn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,i,r,s){aa.subVectors(t,e),ks.subVectors(i,e),ca.crossVectors(aa,ks);let a=this.direction.dot(ca),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ui.subVectors(this.origin,e);const c=o*this.direction.dot(ks.crossVectors(ui,ks));if(c<0)return null;const l=o*this.direction.dot(aa.cross(ui));if(l<0||c+l>a)return null;const f=-o*ui.dot(ca);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,t,i,r,s,a,o,c,l,f,h,d,m,x,_,p){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,f,h,d,m,x,_,p)}set(e,t,i,r,s,a,o,c,l,f,h,d,m,x,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=f,u[10]=h,u[14]=d,u[3]=m,u[7]=x,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/dr.setFromMatrixColumn(e,0).length(),s=1/dr.setFromMatrixColumn(e,1).length(),a=1/dr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*f,m=a*h,x=o*f,_=o*h;t[0]=c*f,t[4]=-c*h,t[8]=l,t[1]=m+x*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*f,m=c*h,x=l*f,_=l*h;t[0]=d+_*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*f,t[9]=-o,t[2]=m*o-x,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*f,m=c*h,x=l*f,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*f,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*f,m=a*h,x=o*f,_=o*h;t[0]=c*f,t[4]=x*l-m,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,x=o*c,_=o*l;t[0]=c*f,t[4]=_-d*h,t[8]=x*h+m,t[1]=h,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=m*h+x,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*c,m=a*l,x=o*c,_=o*l;t[0]=c*f,t[4]=-h,t[8]=l*f,t[1]=d*h+_,t[5]=a*f,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*f,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yp,e,Kp)}lookAt(e,t,i){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),pi.crossVectors(i,hn),pi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),pi.crossVectors(i,hn)),pi.normalize(),Os.crossVectors(hn,pi),r[0]=pi.x,r[4]=Os.x,r[8]=hn.x,r[1]=pi.y,r[5]=Os.y,r[9]=hn.y,r[2]=pi.z,r[6]=Os.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],f=i[1],h=i[5],d=i[9],m=i[13],x=i[2],_=i[6],p=i[10],u=i[14],v=i[3],y=i[7],S=i[11],P=i[15],R=r[0],w=r[4],F=r[8],b=r[12],T=r[1],G=r[5],W=r[9],N=r[13],C=r[2],I=r[6],V=r[10],$=r[14],j=r[3],q=r[7],Y=r[11],te=r[15];return s[0]=a*R+o*T+c*C+l*j,s[4]=a*w+o*G+c*I+l*q,s[8]=a*F+o*W+c*V+l*Y,s[12]=a*b+o*N+c*$+l*te,s[1]=f*R+h*T+d*C+m*j,s[5]=f*w+h*G+d*I+m*q,s[9]=f*F+h*W+d*V+m*Y,s[13]=f*b+h*N+d*$+m*te,s[2]=x*R+_*T+p*C+u*j,s[6]=x*w+_*G+p*I+u*q,s[10]=x*F+_*W+p*V+u*Y,s[14]=x*b+_*N+p*$+u*te,s[3]=v*R+y*T+S*C+P*j,s[7]=v*w+y*G+S*I+P*q,s[11]=v*F+y*W+S*V+P*Y,s[15]=v*b+y*N+S*$+P*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],h=e[6],d=e[10],m=e[14],x=e[3],_=e[7],p=e[11],u=e[15];return x*(+s*c*h-r*l*h-s*o*d+i*l*d+r*o*m-i*c*m)+_*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*f-s*c*f)+p*(+t*l*h-t*o*m-s*a*h+i*a*m+s*o*f-i*l*f)+u*(-r*o*f-t*c*h+t*o*d+r*a*h-i*a*d+i*c*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],h=e[9],d=e[10],m=e[11],x=e[12],_=e[13],p=e[14],u=e[15],v=h*p*l-_*d*l+_*c*m-o*p*m-h*c*u+o*d*u,y=x*d*l-f*p*l-x*c*m+a*p*m+f*c*u-a*d*u,S=f*_*l-x*h*l+x*o*m-a*_*m-f*o*u+a*h*u,P=x*h*c-f*_*c-x*o*d+a*_*d+f*o*p-a*h*p,R=t*v+i*y+r*S+s*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=v*w,e[1]=(_*d*s-h*p*s-_*r*m+i*p*m+h*r*u-i*d*u)*w,e[2]=(o*p*s-_*c*s+_*r*l-i*p*l-o*r*u+i*c*u)*w,e[3]=(h*c*s-o*d*s-h*r*l+i*d*l+o*r*m-i*c*m)*w,e[4]=y*w,e[5]=(f*p*s-x*d*s+x*r*m-t*p*m-f*r*u+t*d*u)*w,e[6]=(x*c*s-a*p*s-x*r*l+t*p*l+a*r*u-t*c*u)*w,e[7]=(a*d*s-f*c*s+f*r*l-t*d*l-a*r*m+t*c*m)*w,e[8]=S*w,e[9]=(x*h*s-f*_*s-x*i*m+t*_*m+f*i*u-t*h*u)*w,e[10]=(a*_*s-x*o*s+x*i*l-t*_*l-a*i*u+t*o*u)*w,e[11]=(f*o*s-a*h*s-f*i*l+t*h*l+a*i*m-t*o*m)*w,e[12]=P*w,e[13]=(f*_*r-x*h*r+x*i*d-t*_*d-f*i*p+t*h*p)*w,e[14]=(x*o*r-a*_*r-x*i*c+t*_*c+a*i*p-t*o*p)*w,e[15]=(a*h*r-f*o*r+f*i*c-t*h*c-a*i*d+t*o*d)*w,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,f=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,f*o+i,f*c-r*a,0,l*c-r*o,f*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,f=a+a,h=o+o,d=s*l,m=s*f,x=s*h,_=a*f,p=a*h,u=o*h,v=c*l,y=c*f,S=c*h,P=i.x,R=i.y,w=i.z;return r[0]=(1-(_+u))*P,r[1]=(m+S)*P,r[2]=(x-y)*P,r[3]=0,r[4]=(m-S)*R,r[5]=(1-(d+u))*R,r[6]=(p+v)*R,r[7]=0,r[8]=(x+y)*w,r[9]=(p-v)*w,r[10]=(1-(d+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=dr.set(r[0],r[1],r[2]).length();const a=dr.set(r[4],r[5],r[6]).length(),o=dr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);const l=1/s,f=1/a,h=1/o;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=f,An.elements[5]*=f,An.elements[6]*=f,An.elements[8]*=h,An.elements[9]*=h,An.elements[10]*=h,t.setFromRotationMatrix(An),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=ri){const c=this.elements,l=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let m,x;if(o===ri)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===mo)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=ri){const c=this.elements,l=1/(t-e),f=1/(i-r),h=1/(a-s),d=(t+e)*l,m=(i+r)*f;let x,_;if(o===ri)x=(a+s)*h,_=-2*h;else if(o===mo)x=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*f,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const dr=new D,An=new Ke,Yp=new D(0,0,0),Kp=new D(1,1,1),pi=new D,Os=new D,hn=new D,Ul=new Ke,Nl=new Wn;class ir{constructor(e=0,t=0,i=0,r=ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],f=r[9],h=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(an(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-an(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(an(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-an(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(an(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ul.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ul,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nl.setFromEuler(this),this.setFromQuaternion(Nl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ir.DEFAULT_ORDER="XYZ";class Uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jp=0;const kl=new D,ur=new Wn,$n=new Ke,Fs=new D,ns=new D,Zp=new D,Qp=new Wn,Ol=new D(1,0,0),Fl=new D(0,1,0),zl=new D(0,0,1),em={type:"added"},tm={type:"removed"};class Ot extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new D,t=new ir,i=new Wn,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ke},normalMatrix:{value:new je}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.multiply(ur),this}rotateOnWorldAxis(e,t){return ur.setFromAxisAngle(e,t),this.quaternion.premultiply(ur),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Fl,e)}rotateZ(e){return this.rotateOnAxis(zl,e)}translateOnAxis(e,t){return kl.copy(e).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Fl,e)}translateZ(e){return this.translateOnAxis(zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fs.copy(e):Fs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(ns,Fs,this.up):$n.lookAt(Fs,ns,this.up),this.quaternion.setFromRotationMatrix($n),r&&($n.extractRotation(r.matrixWorld),ur.setFromRotationMatrix($n),this.quaternion.premultiply(ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(em)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,Zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,Qp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),h=a(e.shapes),d=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ot.DEFAULT_UP=new D(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new D,Yn=new D,la=new D,Kn=new D,pr=new D,mr=new D,Bl=new D,fa=new D,ha=new D,da=new D;let zs=!1;class Ln{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Cn.subVectors(e,t),r.cross(Cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Cn.subVectors(r,t),Yn.subVectors(i,t),la.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot(Yn),c=Cn.dot(la),l=Yn.dot(Yn),f=Yn.dot(la),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,m=(l*c-o*f)*d,x=(a*f-o*c)*d;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getUV(e,t,i,r,s,a,o,c){return zs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),zs=!0),this.getInterpolation(e,t,i,r,s,a,o,c)}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Kn.x),c.addScaledVector(a,Kn.y),c.addScaledVector(o,Kn.z),c)}static isFrontFacing(e,t,i,r){return Cn.subVectors(i,t),Yn.subVectors(e,t),Cn.cross(Yn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Cn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return zs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),zs=!0),Ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;pr.subVectors(r,i),mr.subVectors(s,i),fa.subVectors(e,i);const c=pr.dot(fa),l=mr.dot(fa);if(c<=0&&l<=0)return t.copy(i);ha.subVectors(e,r);const f=pr.dot(ha),h=mr.dot(ha);if(f>=0&&h<=f)return t.copy(r);const d=c*h-f*l;if(d<=0&&c>=0&&f<=0)return a=c/(c-f),t.copy(i).addScaledVector(pr,a);da.subVectors(e,s);const m=pr.dot(da),x=mr.dot(da);if(x>=0&&m<=x)return t.copy(s);const _=m*l-c*x;if(_<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(mr,o);const p=f*x-m*h;if(p<=0&&h-f>=0&&m-x>=0)return Bl.subVectors(s,r),o=(h-f)/(h-f+(m-x)),t.copy(r).addScaledVector(Bl,o);const u=1/(p+_+d);return a=_*u,o=d*u,t.copy(i).addScaledVector(pr,a).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Bs={h:0,s:0,l:0};function ua(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ce{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=Bp(e,1),t=an(t,0,1),i=an(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ua(a,s,e+1/3),this.g=ua(a,s,e),this.b=ua(a,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,t=Ft){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const i=Nh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}copyLinearToSRGB(e){return this.r=ta(e.r),this.g=ta(e.g),this.b=ta(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return et.fromWorkingColorSpace(Vt.copy(this),e),Math.round(an(Vt.r*255,0,255))*65536+Math.round(an(Vt.g*255,0,255))*256+Math.round(an(Vt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Vt.copy(this),t);const i=Vt.r,r=Vt.g,s=Vt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=f<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Ft){et.fromWorkingColorSpace(Vt.copy(this),e);const t=Vt.r,i=Vt.g,r=Vt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(Bs);const i=Qo(mi.h,Bs.h,t),r=Qo(mi.s,Bs.s,t),s=Qo(mi.l,Bs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new Ce;Ce.NAMES=Nh;let nm=0;class Yr extends $r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=Ts(),this.name="",this.type="Material",this.blending=Pr,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ua,this.blendDst=Na,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=fo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ar,this.stencilZFail=ar,this.stencilZPass=ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pr&&(i.blending=this.blending),this.side!==Pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ua&&(i.blendSrc=this.blendSrc),this.blendDst!==Na&&(i.blendDst=this.blendDst),this.blendEquation!==zi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ar&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ar&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ar&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class si extends Yr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new D,Hs=new qe;class Nn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qr(t,this.array)),t}setX(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qr(t,this.array)),t}setY(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qr(t,this.array)),t}setW(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Al&&(e.usage=this.usage),e}}class kh extends Nn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Oh extends Nn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends Nn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let im=0;const xn=new Ke,pa=new Ot,gr=new D,dn=new nr,is=new nr,Dt=new D;class gn extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Ts(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ph(e)?Oh:kh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return pa.lookAt(e),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new lt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new As);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];is.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(dn.min,is.min),dn.expandByPoint(Dt),Dt.addVectors(dn.max,is.max),dn.expandByPoint(Dt)):(dn.expandByPoint(is.min),dn.expandByPoint(is.max))}dn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)Dt.fromBufferAttribute(o,l),c&&(gr.fromBufferAttribute(e,l),Dt.add(gr)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],f=[];for(let T=0;T<o;T++)l[T]=new D,f[T]=new D;const h=new D,d=new D,m=new D,x=new qe,_=new qe,p=new qe,u=new D,v=new D;function y(T,G,W){h.fromArray(r,T*3),d.fromArray(r,G*3),m.fromArray(r,W*3),x.fromArray(a,T*2),_.fromArray(a,G*2),p.fromArray(a,W*2),d.sub(h),m.sub(h),_.sub(x),p.sub(x);const N=1/(_.x*p.y-p.x*_.y);isFinite(N)&&(u.copy(d).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(N),v.copy(m).multiplyScalar(_.x).addScaledVector(d,-p.x).multiplyScalar(N),l[T].add(u),l[G].add(u),l[W].add(u),f[T].add(v),f[G].add(v),f[W].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let T=0,G=S.length;T<G;++T){const W=S[T],N=W.start,C=W.count;for(let I=N,V=N+C;I<V;I+=3)y(i[I+0],i[I+1],i[I+2])}const P=new D,R=new D,w=new D,F=new D;function b(T){w.fromArray(s,T*3),F.copy(w);const G=l[T];P.copy(G),P.sub(w.multiplyScalar(w.dot(G))).normalize(),R.crossVectors(F,G);const N=R.dot(f[T])<0?-1:1;c[T*4]=P.x,c[T*4+1]=P.y,c[T*4+2]=P.z,c[T*4+3]=N}for(let T=0,G=S.length;T<G;++T){const W=S[T],N=W.start,C=W.count;for(let I=N,V=N+C;I<V;I+=3)b(i[I+0]),b(i[I+1]),b(i[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new D,s=new D,a=new D,o=new D,c=new D,l=new D,f=new D,h=new D;if(e)for(let d=0,m=e.count;d<m;d+=3){const x=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),o.add(f),c.add(f),l.add(f),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,h=o.normalized,d=new l.constructor(c.length*f);let m=0,x=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*f;for(let u=0;u<f;u++)d[x++]=l[m++]}return new Nn(d,f,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let f=0,h=l.length;f<h;f++){const d=l[f],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let h=0,d=l.length;h<d;h++){const m=l[h];f.push(m.toJSON(e.data))}f.length>0&&(r[c]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const f=r[l];this.setAttribute(l,f.clone(t))}const s=e.morphAttributes;for(const l in s){const f=[],h=s[l];for(let d=0,m=h.length;d<m;d++)f.push(h[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hl=new Ke,Ni=new $p,Gs=new As,Gl=new D,_r=new D,xr=new D,vr=new D,ma=new D,Vs=new D,Ws=new qe,Xs=new qe,js=new qe,Vl=new D,Wl=new D,Xl=new D,qs=new D,$s=new D;class dt extends Ot{constructor(e=new gn,t=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Vs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const f=o[c],h=s[c];f!==0&&(ma.fromBufferAttribute(h,e),a?Vs.addScaledVector(ma,f):Vs.addScaledVector(ma.sub(t),f))}t.add(Vs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere),Gs.applyMatrix4(s),Ni.copy(e.ray).recast(e.near),!(Gs.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Gs,Gl)===null||Ni.origin.distanceToSquared(Gl)>(e.far-e.near)**2))&&(Hl.copy(s).invert(),Ni.copy(e.ray).applyMatrix4(Hl),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ni)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,_=d.length;x<_;x++){const p=d[x],u=a[p.materialIndex],v=Math.max(p.start,m.start),y=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let S=v,P=y;S<P;S+=3){const R=o.getX(S),w=o.getX(S+1),F=o.getX(S+2);r=Ys(this,u,e,i,l,f,h,R,w,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=x,u=_;p<u;p+=3){const v=o.getX(p),y=o.getX(p+1),S=o.getX(p+2);r=Ys(this,a,e,i,l,f,h,v,y,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,_=d.length;x<_;x++){const p=d[x],u=a[p.materialIndex],v=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let S=v,P=y;S<P;S+=3){const R=S,w=S+1,F=S+2;r=Ys(this,u,e,i,l,f,h,R,w,F),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=x,u=_;p<u;p+=3){const v=p,y=p+1,S=p+2;r=Ys(this,a,e,i,l,f,h,v,y,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function rm(n,e,t,i,r,s,a,o){let c;if(e.side===cn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Pi,o),c===null)return null;$s.copy(o),$s.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo($s);return l<t.near||l>t.far?null:{distance:l,point:$s.clone(),object:n}}function Ys(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,_r),n.getVertexPosition(c,xr),n.getVertexPosition(l,vr);const f=rm(n,e,t,i,_r,xr,vr,qs);if(f){r&&(Ws.fromBufferAttribute(r,o),Xs.fromBufferAttribute(r,c),js.fromBufferAttribute(r,l),f.uv=Ln.getInterpolation(qs,_r,xr,vr,Ws,Xs,js,new qe)),s&&(Ws.fromBufferAttribute(s,o),Xs.fromBufferAttribute(s,c),js.fromBufferAttribute(s,l),f.uv1=Ln.getInterpolation(qs,_r,xr,vr,Ws,Xs,js,new qe),f.uv2=f.uv1),a&&(Vl.fromBufferAttribute(a,o),Wl.fromBufferAttribute(a,c),Xl.fromBufferAttribute(a,l),f.normal=Ln.getInterpolation(qs,_r,xr,vr,Vl,Wl,Xl,new D),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new D,materialIndex:0};Ln.getNormal(_r,xr,vr,h.normal),f.face=h}return f}class bt extends gn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],f=[],h=[];let d=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(f,3)),this.setAttribute("uv",new lt(h,2));function x(_,p,u,v,y,S,P,R,w,F,b){const T=S/w,G=P/F,W=S/2,N=P/2,C=R/2,I=w+1,V=F+1;let $=0,j=0;const q=new D;for(let Y=0;Y<V;Y++){const te=Y*G-N;for(let ie=0;ie<I;ie++){const X=ie*T-W;q[_]=X*v,q[p]=te*y,q[u]=C,l.push(q.x,q.y,q.z),q[_]=0,q[p]=0,q[u]=R>0?1:-1,f.push(q.x,q.y,q.z),h.push(ie/w),h.push(1-Y/F),$+=1}}for(let Y=0;Y<F;Y++)for(let te=0;te<w;te++){const ie=d+te+I*Y,X=d+te+I*(Y+1),K=d+(te+1)+I*(Y+1),le=d+(te+1)+I*Y;c.push(ie,X,le),c.push(X,K,le),j+=6}o.addGroup(m,j,b),m+=j,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=Gr(n[t]);for(const r in i)e[r]=i[r]}return e}function sm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fh(n){return n.getRenderTarget()===null?n.outputColorSpace:et.workingColorSpace}const om={clone:Gr,merge:Qt};var am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qi extends Yr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=am,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gr(e.uniforms),this.uniformsGroups=sm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zh extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=ri}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Sn extends zh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(Zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yr=-90,Mr=1;class lm extends Ot{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Sn(yr,Mr,e,t);r.layers=this.layers,this.add(r);const s=new Sn(yr,Mr,e,t);s.layers=this.layers,this.add(s);const a=new Sn(yr,Mr,e,t);a.layers=this.layers,this.add(a);const o=new Sn(yr,Mr,e,t);o.layers=this.layers,this.add(o);const c=new Sn(yr,Mr,e,t);c.layers=this.layers,this.add(c);const l=new Sn(yr,Mr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===mo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,f),e.setRenderTarget(h,d,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Bh extends ln{constructor(e,t,i,r,s,a,o,c,l,f){e=e!==void 0?e:[],t=t!==void 0?t:zr,super(e,t,i,r,s,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fm extends Zi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(fs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===$i?Ft:mn),this.texture=new Bh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Mn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new bt(5,5,5),s=new Qi({name:"CubemapFromEquirect",uniforms:Gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Ai});s.uniforms.tEquirect.value=t;const a=new dt(r,s),o=t.minFilter;return t.minFilter===gs&&(t.minFilter=Mn),new lm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const ga=new D,hm=new D,dm=new je;class Oi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ga.subVectors(i,t).cross(hm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ga),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||dm.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new As,Ks=new D;class bc{constructor(e=new Oi,t=new Oi,i=new Oi,r=new Oi,s=new Oi,a=new Oi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ri){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],f=r[5],h=r[6],d=r[7],m=r[8],x=r[9],_=r[10],p=r[11],u=r[12],v=r[13],y=r[14],S=r[15];if(i[0].setComponents(c-s,d-l,p-m,S-u).normalize(),i[1].setComponents(c+s,d+l,p+m,S+u).normalize(),i[2].setComponents(c+a,d+f,p+x,S+v).normalize(),i[3].setComponents(c-a,d-f,p-x,S-v).normalize(),i[4].setComponents(c-o,d-h,p-_,S-y).normalize(),t===ri)i[5].setComponents(c+o,d+h,p+_,S+y).normalize();else if(t===mo)i[5].setComponents(o,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ks.x=r.normal.x>0?e.max.x:e.min.x,Ks.y=r.normal.y>0?e.max.y:e.min.y,Ks.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hh(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function um(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,f){const h=l.array,d=l.usage,m=h.byteLength,x=n.createBuffer();n.bindBuffer(f,x),n.bufferData(f,h,d),l.onUploadCallback();let _;if(h instanceof Float32Array)_=n.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=n.SHORT;else if(h instanceof Uint32Array)_=n.UNSIGNED_INT;else if(h instanceof Int32Array)_=n.INT;else if(h instanceof Int8Array)_=n.BYTE;else if(h instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:x,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:m}}function s(l,f,h){const d=f.array,m=f._updateRange,x=f.updateRanges;if(n.bindBuffer(h,l),m.count===-1&&x.length===0&&n.bufferSubData(h,0,d),x.length!==0){for(let _=0,p=x.length;_<p;_++){const u=x[_];t?n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d,u.start,u.count):n.bufferSubData(h,u.start*d.BYTES_PER_ELEMENT,d.subarray(u.start,u.start+u.count))}f.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),f.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);f&&(n.deleteBuffer(f.buffer),i.delete(l))}function c(l,f){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);if(h===void 0)i.set(l,r(l,f));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,l,f),h.version=l.version}}return{get:a,remove:o,update:c}}class En extends gn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,f=c+1,h=e/o,d=t/c,m=[],x=[],_=[],p=[];for(let u=0;u<f;u++){const v=u*d-a;for(let y=0;y<l;y++){const S=y*h-s;x.push(S,-v,0),_.push(0,0,1),p.push(y/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<o;v++){const y=v+l*u,S=v+l*(u+1),P=v+1+l*(u+1),R=v+1+l*u;m.push(y,S,R),m.push(S,P,R)}this.setIndex(m),this.setAttribute("position",new lt(x,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new En(e.width,e.height,e.widthSegments,e.heightSegments)}}var pm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mm=`#ifdef USE_ALPHAHASH
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
#endif`,gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ym=`#ifdef USE_AOMAP
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
#endif`,Mm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sm=`#ifdef USE_BATCHING
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
#endif`,bm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Am=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cm=`#ifdef USE_IRIDESCENCE
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
#endif`,Rm=`#ifdef USE_BUMPMAP
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
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,km=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Om=`#define PI 3.141592653589793
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
} // validated`,Fm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zm=`vec3 transformedNormal = objectNormal;
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
#endif`,Bm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xm=`
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
}`,jm=`#ifdef USE_ENVMAP
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
#endif`,qm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$m=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tg=`#ifdef USE_GRADIENTMAP
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
}`,ng=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,og=`uniform bool receiveShadow;
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
#endif`,ag=`#ifdef USE_ENVMAP
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
#endif`,cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dg=`PhysicalMaterial material;
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
#endif`,ug=`struct PhysicalMaterial {
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
}`,pg=`
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
#endif`,mg=`#if defined( RE_IndirectDiffuse )
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
#endif`,gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_g=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,yg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Mg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Eg=`#if defined( USE_POINTS_UV )
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
#endif`,Tg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ag=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rg=`#ifdef USE_MORPHNORMALS
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
#endif`,wg=`#ifdef USE_MORPHTARGETS
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
#endif`,Pg=`#ifdef USE_MORPHTARGETS
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
#endif`,Lg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kg=`#ifdef USE_NORMALMAP
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
#endif`,Og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zg=`float getShadowMask() {
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
}`,Qg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
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
#endif`,t0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n0=`#ifdef USE_SKINNING
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
#endif`,i0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,s0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,a0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#ifdef USE_TRANSMISSION
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
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,p0=`uniform sampler2D t2D;
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
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`#include <common>
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
}`,y0=`#if DEPTH_PACKING == 3200
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
}`,M0=`#define DISTANCE
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
}`,S0=`#define DISTANCE
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
}`,b0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`uniform float scale;
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
}`,A0=`uniform vec3 diffuse;
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
}`,C0=`#include <common>
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
}`,R0=`uniform vec3 diffuse;
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
}`,w0=`#define LAMBERT
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
}`,P0=`#define LAMBERT
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
}`,L0=`#define MATCAP
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
}`,D0=`#define MATCAP
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
}`,I0=`#define NORMAL
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
}`,U0=`#define NORMAL
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
}`,N0=`#define PHONG
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
}`,k0=`#define PHONG
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
}`,O0=`#define STANDARD
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
}`,F0=`#define STANDARD
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
}`,z0=`#define TOON
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
}`,B0=`#define TOON
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
}`,H0=`uniform float size;
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
}`,G0=`uniform vec3 diffuse;
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
}`,V0=`#include <common>
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
}`,W0=`uniform vec3 color;
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
}`,X0=`uniform float rotation;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:pm,alphahash_pars_fragment:mm,alphamap_fragment:gm,alphamap_pars_fragment:_m,alphatest_fragment:xm,alphatest_pars_fragment:vm,aomap_fragment:ym,aomap_pars_fragment:Mm,batching_pars_vertex:Sm,batching_vertex:bm,begin_vertex:Em,beginnormal_vertex:Tm,bsdfs:Am,iridescence_fragment:Cm,bumpmap_pars_fragment:Rm,clipping_planes_fragment:wm,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Im,color_pars_fragment:Um,color_pars_vertex:Nm,color_vertex:km,common:Om,cube_uv_reflection_fragment:Fm,defaultnormal_vertex:zm,displacementmap_pars_vertex:Bm,displacementmap_vertex:Hm,emissivemap_fragment:Gm,emissivemap_pars_fragment:Vm,colorspace_fragment:Wm,colorspace_pars_fragment:Xm,envmap_fragment:jm,envmap_common_pars_fragment:qm,envmap_pars_fragment:$m,envmap_pars_vertex:Ym,envmap_physical_pars_fragment:ag,envmap_vertex:Km,fog_vertex:Jm,fog_pars_vertex:Zm,fog_fragment:Qm,fog_pars_fragment:eg,gradientmap_pars_fragment:tg,lightmap_fragment:ng,lightmap_pars_fragment:ig,lights_lambert_fragment:rg,lights_lambert_pars_fragment:sg,lights_pars_begin:og,lights_toon_fragment:cg,lights_toon_pars_fragment:lg,lights_phong_fragment:fg,lights_phong_pars_fragment:hg,lights_physical_fragment:dg,lights_physical_pars_fragment:ug,lights_fragment_begin:pg,lights_fragment_maps:mg,lights_fragment_end:gg,logdepthbuf_fragment:_g,logdepthbuf_pars_fragment:xg,logdepthbuf_pars_vertex:vg,logdepthbuf_vertex:yg,map_fragment:Mg,map_pars_fragment:Sg,map_particle_fragment:bg,map_particle_pars_fragment:Eg,metalnessmap_fragment:Tg,metalnessmap_pars_fragment:Ag,morphcolor_vertex:Cg,morphnormal_vertex:Rg,morphtarget_pars_vertex:wg,morphtarget_vertex:Pg,normal_fragment_begin:Lg,normal_fragment_maps:Dg,normal_pars_fragment:Ig,normal_pars_vertex:Ug,normal_vertex:Ng,normalmap_pars_fragment:kg,clearcoat_normal_fragment_begin:Og,clearcoat_normal_fragment_maps:Fg,clearcoat_pars_fragment:zg,iridescence_pars_fragment:Bg,opaque_fragment:Hg,packing:Gg,premultiplied_alpha_fragment:Vg,project_vertex:Wg,dithering_fragment:Xg,dithering_pars_fragment:jg,roughnessmap_fragment:qg,roughnessmap_pars_fragment:$g,shadowmap_pars_fragment:Yg,shadowmap_pars_vertex:Kg,shadowmap_vertex:Jg,shadowmask_pars_fragment:Zg,skinbase_vertex:Qg,skinning_pars_vertex:e0,skinning_vertex:t0,skinnormal_vertex:n0,specularmap_fragment:i0,specularmap_pars_fragment:r0,tonemapping_fragment:s0,tonemapping_pars_fragment:o0,transmission_fragment:a0,transmission_pars_fragment:c0,uv_pars_fragment:l0,uv_pars_vertex:f0,uv_vertex:h0,worldpos_vertex:d0,background_vert:u0,background_frag:p0,backgroundCube_vert:m0,backgroundCube_frag:g0,cube_vert:_0,cube_frag:x0,depth_vert:v0,depth_frag:y0,distanceRGBA_vert:M0,distanceRGBA_frag:S0,equirect_vert:b0,equirect_frag:E0,linedashed_vert:T0,linedashed_frag:A0,meshbasic_vert:C0,meshbasic_frag:R0,meshlambert_vert:w0,meshlambert_frag:P0,meshmatcap_vert:L0,meshmatcap_frag:D0,meshnormal_vert:I0,meshnormal_frag:U0,meshphong_vert:N0,meshphong_frag:k0,meshphysical_vert:O0,meshphysical_frag:F0,meshtoon_vert:z0,meshtoon_frag:B0,points_vert:H0,points_frag:G0,shadow_vert:V0,shadow_frag:W0,sprite_vert:X0,sprite_frag:j0},se={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},zn={basic:{uniforms:Qt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Qt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ce(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Qt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Qt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Qt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ce(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Qt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Qt([se.points,se.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Qt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Qt([se.common,se.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Qt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Qt([se.sprite,se.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Qt([se.common,se.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Qt([se.lights,se.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};zn.physical={uniforms:Qt([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Js={r:0,b:0,g:0};function q0(n,e,t,i,r,s,a){const o=new Ce(0);let c=s===!0?0:1,l,f,h=null,d=0,m=null;function x(p,u){let v=!1,y=u.isScene===!0?u.background:null;y&&y.isTexture&&(y=(u.backgroundBlurriness>0?t:e).get(y)),y===null?_(o,c):y&&y.isColor&&(_(y,1),v=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===wo)?(f===void 0&&(f=new dt(new bt(1,1,1),new Qi({name:"BackgroundCubeMaterial",uniforms:Gr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(P,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),f.material.uniforms.envMap.value=y,f.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,f.material.toneMapped=et.getTransfer(y.colorSpace)!==ft,(h!==y||d!==y.version||m!==n.toneMapping)&&(f.material.needsUpdate=!0,h=y,d=y.version,m=n.toneMapping),f.layers.enableAll(),p.unshift(f,f.geometry,f.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new dt(new En(2,2),new Qi({name:"BackgroundMaterial",uniforms:Gr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,l.material.toneMapped=et.getTransfer(y.colorSpace)!==ft,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,m=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,u){p.getRGB(Js,Fh(n)),i.buffers.color.setClear(Js.r,Js.g,Js.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),c=u,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:x}}function $0(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},c=p(null);let l=c,f=!1;function h(C,I,V,$,j){let q=!1;if(a){const Y=_($,V,I);l!==Y&&(l=Y,m(l.object)),q=u(C,$,V,j),q&&v(C,$,V,j)}else{const Y=I.wireframe===!0;(l.geometry!==$.id||l.program!==V.id||l.wireframe!==Y)&&(l.geometry=$.id,l.program=V.id,l.wireframe=Y,q=!0)}j!==null&&t.update(j,n.ELEMENT_ARRAY_BUFFER),(q||f)&&(f=!1,F(C,I,V,$),j!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(C){return i.isWebGL2?n.bindVertexArray(C):s.bindVertexArrayOES(C)}function x(C){return i.isWebGL2?n.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function _(C,I,V){const $=V.wireframe===!0;let j=o[C.id];j===void 0&&(j={},o[C.id]=j);let q=j[I.id];q===void 0&&(q={},j[I.id]=q);let Y=q[$];return Y===void 0&&(Y=p(d()),q[$]=Y),Y}function p(C){const I=[],V=[],$=[];for(let j=0;j<r;j++)I[j]=0,V[j]=0,$[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:$,object:C,attributes:{},index:null}}function u(C,I,V,$){const j=l.attributes,q=I.attributes;let Y=0;const te=V.getAttributes();for(const ie in te)if(te[ie].location>=0){const K=j[ie];let le=q[ie];if(le===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),K===void 0||K.attribute!==le||le&&K.data!==le.data)return!0;Y++}return l.attributesNum!==Y||l.index!==$}function v(C,I,V,$){const j={},q=I.attributes;let Y=0;const te=V.getAttributes();for(const ie in te)if(te[ie].location>=0){let K=q[ie];K===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(K=C.instanceColor));const le={};le.attribute=K,K&&K.data&&(le.data=K.data),j[ie]=le,Y++}l.attributes=j,l.attributesNum=Y,l.index=$}function y(){const C=l.newAttributes;for(let I=0,V=C.length;I<V;I++)C[I]=0}function S(C){P(C,0)}function P(C,I){const V=l.newAttributes,$=l.enabledAttributes,j=l.attributeDivisors;V[C]=1,$[C]===0&&(n.enableVertexAttribArray(C),$[C]=1),j[C]!==I&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,I),j[C]=I)}function R(){const C=l.newAttributes,I=l.enabledAttributes;for(let V=0,$=I.length;V<$;V++)I[V]!==C[V]&&(n.disableVertexAttribArray(V),I[V]=0)}function w(C,I,V,$,j,q,Y){Y===!0?n.vertexAttribIPointer(C,I,V,j,q):n.vertexAttribPointer(C,I,V,$,j,q)}function F(C,I,V,$){if(i.isWebGL2===!1&&(C.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const j=$.attributes,q=V.getAttributes(),Y=I.defaultAttributeValues;for(const te in q){const ie=q[te];if(ie.location>=0){let X=j[te];if(X===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(X=C.instanceColor)),X!==void 0){const K=X.normalized,le=X.itemSize,Me=t.get(X);if(Me===void 0)continue;const ye=Me.buffer,ke=Me.type,Fe=Me.bytesPerElement,we=i.isWebGL2===!0&&(ke===n.INT||ke===n.UNSIGNED_INT||X.gpuType===Mh);if(X.isInterleavedBufferAttribute){const Je=X.data,k=Je.stride,Yt=X.offset;if(Je.isInstancedInterleavedBuffer){for(let Ee=0;Ee<ie.locationSize;Ee++)P(ie.location+Ee,Je.meshPerAttribute);C.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Je.meshPerAttribute*Je.count)}else for(let Ee=0;Ee<ie.locationSize;Ee++)S(ie.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let Ee=0;Ee<ie.locationSize;Ee++)w(ie.location+Ee,le/ie.locationSize,ke,K,k*Fe,(Yt+le/ie.locationSize*Ee)*Fe,we)}else{if(X.isInstancedBufferAttribute){for(let Je=0;Je<ie.locationSize;Je++)P(ie.location+Je,X.meshPerAttribute);C.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Je=0;Je<ie.locationSize;Je++)S(ie.location+Je);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let Je=0;Je<ie.locationSize;Je++)w(ie.location+Je,le/ie.locationSize,ke,K,le*Fe,le/ie.locationSize*Je*Fe,we)}}else if(Y!==void 0){const K=Y[te];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(ie.location,K);break;case 3:n.vertexAttrib3fv(ie.location,K);break;case 4:n.vertexAttrib4fv(ie.location,K);break;default:n.vertexAttrib1fv(ie.location,K)}}}}R()}function b(){W();for(const C in o){const I=o[C];for(const V in I){const $=I[V];for(const j in $)x($[j].object),delete $[j];delete I[V]}delete o[C]}}function T(C){if(o[C.id]===void 0)return;const I=o[C.id];for(const V in I){const $=I[V];for(const j in $)x($[j].object),delete $[j];delete I[V]}delete o[C.id]}function G(C){for(const I in o){const V=o[I];if(V[C.id]===void 0)continue;const $=V[C.id];for(const j in $)x($[j].object),delete $[j];delete V[C.id]}}function W(){N(),f=!0,l!==c&&(l=c,m(l.object))}function N(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:N,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:G,initAttributes:y,enableAttribute:S,disableUnusedAttributes:R}}function Y0(n,e,t,i){const r=i.isWebGL2;let s;function a(f){s=f}function o(f,h){n.drawArrays(s,f,h),t.update(h,s,1)}function c(f,h,d){if(d===0)return;let m,x;if(r)m=n,x="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[x](s,f,h,d),t.update(h,s,d)}function l(f,h,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<d;x++)this.render(f[x],h[x]);else{m.multiDrawArraysWEBGL(s,f,0,h,0,d);let x=0;for(let _=0;_<d;_++)x+=h[_];t.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function K0(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),f=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,S=a||e.has("OES_texture_float"),P=y&&S,R=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:f,maxTextures:h,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:x,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:y,floatFragmentTextures:S,floatVertexTextures:P,maxSamples:R}}function J0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Oi,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||i!==0||r;return r=d,i=h.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=f(h,d,0)},this.setState=function(h,d,m){const x=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,u=n.get(h);if(!r||x===null||x.length===0||s&&!p)s?f(null):l();else{const v=s?0:i,y=v*4;let S=u.clippingState||null;c.value=S,S=f(x,d,y,m);for(let P=0;P!==y;++P)S[P]=t[P];u.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,m,x){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,x!==!0||p===null){const u=m+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<u)&&(p=new Float32Array(u));for(let y=0,S=m;y!==_;++y,S+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(p,S),p[S+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Z0(n){let e=new WeakMap;function t(a,o){return o===ka?a.mapping=zr:o===Oa&&(a.mapping=Br),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ka||o===Oa)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new fm(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Gh extends zh{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ar=4,jl=[.125,.215,.35,.446,.526,.582],Bi=20,_a=new Gh,ql=new Ce;let xa=null,va=0,ya=0;const Fi=(1+Math.sqrt(5))/2,Sr=1/Fi,$l=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Fi,Sr),new D(0,Fi,-Sr),new D(Sr,0,Fi),new D(-Sr,0,Fi),new D(Fi,Sr,0),new D(-Fi,Sr,0)];class Yl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xa,va,ya),e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zr||e.mapping===Br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:_s,format:In,colorSpace:Vn,depthBuffer:!1},r=Kl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q0(s)),this._blurMaterial=e_(s,e,t)}return r}_compileMaterial(e){const t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,i,r){const o=new Sn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(ql),f.toneMapping=Ci,f.autoClear=!1;const m=new si({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),x=new dt(new bt,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(ql),_=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):v===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const y=this._cubeSize;Zs(r,v*y,u>2?y:0,y,y),f.setRenderTarget(r),_&&f.render(x,o),f.render(e,o)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zr||e.mapping===Br;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Zs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,_a)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=$l[(r-1)%$l.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,h=new dt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Bi-1),_=s/x,p=isFinite(s)?1+Math.floor(f*_):Bi;p>Bi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Bi}`);const u=[];let v=0;for(let w=0;w<Bi;++w){const F=w/_,b=Math.exp(-F*F/2);u.push(b),w===0?v+=b:w<p&&(v+=2*b)}for(let w=0;w<u.length;w++)u[w]=u[w]/v;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=x,d.mipInt.value=y-i;const S=this._sizeLods[r],P=3*S*(r>y-Ar?r-y+Ar:0),R=4*(this._cubeSize-S);Zs(t,P,R,3*S,2*S),c.setRenderTarget(t),c.render(h,_a)}}function Q0(n){const e=[],t=[],i=[];let r=n;const s=n-Ar+1+jl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-Ar?c=jl[a-n+Ar-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),f=-l,h=1+l,d=[f,f,h,f,h,h,f,f,h,h,f,h],m=6,x=6,_=3,p=2,u=1,v=new Float32Array(_*x*m),y=new Float32Array(p*x*m),S=new Float32Array(u*x*m);for(let R=0;R<m;R++){const w=R%3*2/3-1,F=R>2?0:-1,b=[w,F,0,w+2/3,F,0,w+2/3,F+1,0,w,F,0,w+2/3,F+1,0,w,F+1,0];v.set(b,_*x*R),y.set(d,p*x*R);const T=[R,R,R,R,R,R];S.set(T,u*x*R)}const P=new gn;P.setAttribute("position",new Nn(v,_)),P.setAttribute("uv",new Nn(y,p)),P.setAttribute("faceIndex",new Nn(S,u)),e.push(P),r>Ar&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Kl(n,e,t){const i=new Zi(n,e,t);return i.texture.mapping=wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function e_(n,e,t){const i=new Float32Array(Bi),r=new D(0,1,0);return new Qi({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Jl(){return new Qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Zl(){return new Qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Ec(){return`

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
	`}function t_(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===ka||c===Oa,f=c===zr||c===Br;if(l||f)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Yl(n)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(l&&h&&h.height>0||f&&h&&r(h)){t===null&&(t=new Yl(n));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let c=0;const l=6;for(let f=0;f<l;f++)o[f]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function n_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function i_(n,e,t,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);for(const x in d.morphAttributes){const _=d.morphAttributes[x];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const x in d)e.update(d[x],n.ARRAY_BUFFER);const m=h.morphAttributes;for(const x in m){const _=m[x];for(let p=0,u=_.length;p<u;p++)e.update(_[p],n.ARRAY_BUFFER)}}function l(h){const d=[],m=h.index,x=h.attributes.position;let _=0;if(m!==null){const v=m.array;_=m.version;for(let y=0,S=v.length;y<S;y+=3){const P=v[y+0],R=v[y+1],w=v[y+2];d.push(P,R,R,w,w,P)}}else if(x!==void 0){const v=x.array;_=x.version;for(let y=0,S=v.length/3-1;y<S;y+=3){const P=y+0,R=y+1,w=y+2;d.push(P,R,R,w,w,P)}}else return;const p=new(Ph(d)?Oh:kh)(d,1);p.version=_;const u=s.get(h);u&&e.remove(u),s.set(h,p)}function f(h){const d=s.get(h);if(d){const m=h.index;m!==null&&d.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:f}}function r_(n,e,t,i){const r=i.isWebGL2;let s;function a(m){s=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function f(m,x){n.drawElements(s,x,o,m*c),t.update(x,s,1)}function h(m,x,_){if(_===0)return;let p,u;if(r)p=n,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](s,x,o,m*c,_),t.update(x,s,_)}function d(m,x,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(m[u]/c,x[u]);else{p.multiDrawElementsWEBGL(s,x,0,o,m,0,_);let u=0;for(let v=0;v<_;v++)u+=x[v];t.update(u,s,1)}}this.setMode=a,this.setIndex=l,this.render=f,this.renderInstances=h,this.renderMultiDraw=d}function s_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function o_(n,e){return n[0]-e[0]}function a_(n,e){return Math.abs(e[1])-Math.abs(n[1])}function c_(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new kt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,f,h){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const x=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,_=x!==void 0?x.length:0;let p=s.get(f);if(p===void 0||p.count!==_){let I=function(){N.dispose(),s.delete(f),f.removeEventListener("dispose",I)};var m=I;p!==void 0&&p.texture.dispose();const y=f.morphAttributes.position!==void 0,S=f.morphAttributes.normal!==void 0,P=f.morphAttributes.color!==void 0,R=f.morphAttributes.position||[],w=f.morphAttributes.normal||[],F=f.morphAttributes.color||[];let b=0;y===!0&&(b=1),S===!0&&(b=2),P===!0&&(b=3);let T=f.attributes.position.count*b,G=1;T>e.maxTextureSize&&(G=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const W=new Float32Array(T*G*4*_),N=new Ih(W,T,G,_);N.type=Mi,N.needsUpdate=!0;const C=b*4;for(let V=0;V<_;V++){const $=R[V],j=w[V],q=F[V],Y=T*G*4*V;for(let te=0;te<$.count;te++){const ie=te*C;y===!0&&(a.fromBufferAttribute($,te),W[Y+ie+0]=a.x,W[Y+ie+1]=a.y,W[Y+ie+2]=a.z,W[Y+ie+3]=0),S===!0&&(a.fromBufferAttribute(j,te),W[Y+ie+4]=a.x,W[Y+ie+5]=a.y,W[Y+ie+6]=a.z,W[Y+ie+7]=0),P===!0&&(a.fromBufferAttribute(q,te),W[Y+ie+8]=a.x,W[Y+ie+9]=a.y,W[Y+ie+10]=a.z,W[Y+ie+11]=q.itemSize===4?a.w:1)}}p={count:_,texture:N,size:new qe(T,G)},s.set(f,p),f.addEventListener("dispose",I)}let u=0;for(let y=0;y<d.length;y++)u+=d[y];const v=f.morphTargetsRelative?1:1-u;h.getUniforms().setValue(n,"morphTargetBaseInfluence",v),h.getUniforms().setValue(n,"morphTargetInfluences",d),h.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const x=d===void 0?0:d.length;let _=i[f.id];if(_===void 0||_.length!==x){_=[];for(let S=0;S<x;S++)_[S]=[S,0];i[f.id]=_}for(let S=0;S<x;S++){const P=_[S];P[0]=S,P[1]=d[S]}_.sort(a_);for(let S=0;S<8;S++)S<x&&_[S][1]?(o[S][0]=_[S][0],o[S][1]=_[S][1]):(o[S][0]=Number.MAX_SAFE_INTEGER,o[S][1]=0);o.sort(o_);const p=f.morphAttributes.position,u=f.morphAttributes.normal;let v=0;for(let S=0;S<8;S++){const P=o[S],R=P[0],w=P[1];R!==Number.MAX_SAFE_INTEGER&&w?(p&&f.getAttribute("morphTarget"+S)!==p[R]&&f.setAttribute("morphTarget"+S,p[R]),u&&f.getAttribute("morphNormal"+S)!==u[R]&&f.setAttribute("morphNormal"+S,u[R]),r[S]=w,v+=w):(p&&f.hasAttribute("morphTarget"+S)===!0&&f.deleteAttribute("morphTarget"+S),u&&f.hasAttribute("morphNormal"+S)===!0&&f.deleteAttribute("morphNormal"+S),r[S]=0)}const y=f.morphTargetsRelative?1:1-v;h.getUniforms().setValue(n,"morphTargetBaseInfluence",y),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function l_(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,f=c.geometry,h=e.get(c,f);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return h}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Vh extends ln{constructor(e,t,i,r,s,a,o,c,l,f){if(f=f!==void 0?f:qi,f!==qi&&f!==Hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===qi&&(i=yi),i===void 0&&f===Hr&&(i=ji),super(null,r,s,a,o,c,f,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:tn,this.minFilter=c!==void 0?c:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Wh=new ln,Xh=new Vh(1,1);Xh.compareFunction=wh;const jh=new Ih,qh=new jp,$h=new Bh,Ql=[],ef=[],tf=new Float32Array(16),nf=new Float32Array(9),rf=new Float32Array(4);function Kr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ql[r];if(s===void 0&&(s=new Float32Array(r),Ql[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Lo(n,e){let t=ef[e];t===void 0&&(t=new Int32Array(e),ef[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function f_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function h_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function d_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function p_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(Rt(t,i))return;rf.set(i),n.uniformMatrix2fv(this.addr,!1,rf),wt(t,i)}}function m_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(Rt(t,i))return;nf.set(i),n.uniformMatrix3fv(this.addr,!1,nf),wt(t,i)}}function g_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(Rt(t,i))return;tf.set(i),n.uniformMatrix4fv(this.addr,!1,tf),wt(t,i)}}function __(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function v_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function y_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function M_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function S_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function b_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function E_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function T_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Xh:Wh;t.setTexture2D(e||s,r)}function A_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||qh,r)}function C_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$h,r)}function R_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||jh,r)}function w_(n){switch(n){case 5126:return f_;case 35664:return h_;case 35665:return d_;case 35666:return u_;case 35674:return p_;case 35675:return m_;case 35676:return g_;case 5124:case 35670:return __;case 35667:case 35671:return x_;case 35668:case 35672:return v_;case 35669:case 35673:return y_;case 5125:return M_;case 36294:return S_;case 36295:return b_;case 36296:return E_;case 35678:case 36198:case 36298:case 36306:case 35682:return T_;case 35679:case 36299:case 36307:return A_;case 35680:case 36300:case 36308:case 36293:return C_;case 36289:case 36303:case 36311:case 36292:return R_}}function P_(n,e){n.uniform1fv(this.addr,e)}function L_(n,e){const t=Kr(e,this.size,2);n.uniform2fv(this.addr,t)}function D_(n,e){const t=Kr(e,this.size,3);n.uniform3fv(this.addr,t)}function I_(n,e){const t=Kr(e,this.size,4);n.uniform4fv(this.addr,t)}function U_(n,e){const t=Kr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function N_(n,e){const t=Kr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function k_(n,e){const t=Kr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function O_(n,e){n.uniform1iv(this.addr,e)}function F_(n,e){n.uniform2iv(this.addr,e)}function z_(n,e){n.uniform3iv(this.addr,e)}function B_(n,e){n.uniform4iv(this.addr,e)}function H_(n,e){n.uniform1uiv(this.addr,e)}function G_(n,e){n.uniform2uiv(this.addr,e)}function V_(n,e){n.uniform3uiv(this.addr,e)}function W_(n,e){n.uniform4uiv(this.addr,e)}function X_(n,e,t){const i=this.cache,r=e.length,s=Lo(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Wh,s[a])}function j_(n,e,t){const i=this.cache,r=e.length,s=Lo(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||qh,s[a])}function q_(n,e,t){const i=this.cache,r=e.length,s=Lo(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||$h,s[a])}function $_(n,e,t){const i=this.cache,r=e.length,s=Lo(t,r);Rt(i,s)||(n.uniform1iv(this.addr,s),wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||jh,s[a])}function Y_(n){switch(n){case 5126:return P_;case 35664:return L_;case 35665:return D_;case 35666:return I_;case 35674:return U_;case 35675:return N_;case 35676:return k_;case 5124:case 35670:return O_;case 35667:case 35671:return F_;case 35668:case 35672:return z_;case 35669:case 35673:return B_;case 5125:return H_;case 36294:return G_;case 36295:return V_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return j_;case 35680:case 36300:case 36308:case 36293:return q_;case 36289:case 36303:case 36311:case 36292:return $_}}class K_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=w_(t.type)}}class J_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y_(t.type)}}class Z_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function sf(n,e){n.seq.push(e),n.map[e.id]=e}function Q_(n,e,t){const i=n.name,r=i.length;for(Ma.lastIndex=0;;){const s=Ma.exec(i),a=Ma.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){sf(t,l===void 0?new K_(o,n,e):new J_(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Z_(o),sf(t,h)),t=h}}}class to{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Q_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function of(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ex=37297;let tx=0;function nx(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function ix(n){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(n);let i;switch(e===t?i="":e===po&&t===uo?i="LinearDisplayP3ToLinearSRGB":e===uo&&t===po&&(i="LinearSRGBToLinearDisplayP3"),n){case Vn:case Po:return[i,"LinearTransferOETF"];case Ft:case Sc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function af(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+nx(n.getShaderSource(e),a)}else return r}function rx(n,e){const t=ix(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function sx(n,e){let t;switch(e){case mp:t="Linear";break;case gp:t="Reinhard";break;case _p:t="OptimizedCineon";break;case xp:t="ACESFilmic";break;case yp:t="AgX";break;case vp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ox(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Cr).join(`
`)}function ax(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Cr).join(`
`)}function cx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Cr(n){return n!==""}function cf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Va(n){return n.replace(fx,dx)}const hx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function dx(n,e){let t=Be[e];if(t===void 0){const i=hx.get(e);if(i!==void 0)t=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Va(t)}const ux=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ff(n){return n.replace(ux,px)}function px(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hf(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function mx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Vu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function gx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zr:case Br:e="ENVMAP_TYPE_CUBE";break;case wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _x(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Br:e="ENVMAP_MODE_REFRACTION";break}return e}function xx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ro:e="ENVMAP_BLENDING_MULTIPLY";break;case up:e="ENVMAP_BLENDING_MIX";break;case pp:e="ENVMAP_BLENDING_ADD";break}return e}function vx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function yx(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=mx(t),l=gx(t),f=_x(t),h=xx(t),d=vx(t),m=t.isWebGL2?"":ox(t),x=ax(t),_=cx(s),p=r.createProgram();let u,v,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Cr).join(`
`),u.length>0&&(u+=`
`),v=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Cr).join(`
`),v.length>0&&(v+=`
`)):(u=[hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),v=[m,hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?Be.tonemapping_pars_fragment:"",t.toneMapping!==Ci?sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,rx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),a=Va(a),a=cf(a,t),a=lf(a,t),o=Va(o),o=cf(o,t),o=lf(o,t),a=ff(a),o=ff(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,u=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=y+u+a,P=y+v+o,R=of(r,r.VERTEX_SHADER,S),w=of(r,r.FRAGMENT_SHADER,P);r.attachShader(p,R),r.attachShader(p,w),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function F(W){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(p).trim(),C=r.getShaderInfoLog(R).trim(),I=r.getShaderInfoLog(w).trim();let V=!0,$=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,R,w);else{const j=af(r,R,"vertex"),q=af(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+j+`
`+q)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(C===""||I==="")&&($=!1);$&&(W.diagnostics={runnable:V,programLog:N,vertexShader:{log:C,prefix:u},fragmentShader:{log:I,prefix:v}})}r.deleteShader(R),r.deleteShader(w),b=new to(r,p),T=lx(r,p)}let b;this.getUniforms=function(){return b===void 0&&F(this),b};let T;this.getAttributes=function(){return T===void 0&&F(this),T};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=r.getProgramParameter(p,ex)),G},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tx++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=R,this.fragmentShader=w,this}let Mx=0;class Sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new bx(e),t.set(e,i)),i}}class bx{constructor(e){this.id=Mx++,this.code=e,this.usedTimes=0}}function Ex(n,e,t,i,r,s,a){const o=new Uh,c=new Sx,l=[],f=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return b===0?"uv":`uv${b}`}function p(b,T,G,W,N){const C=W.fog,I=N.geometry,V=b.isMeshStandardMaterial?W.environment:null,$=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),j=$&&$.mapping===wo?$.image.height:null,q=x[b.type];b.precision!==null&&(m=r.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));const Y=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,te=Y!==void 0?Y.length:0;let ie=0;I.morphAttributes.position!==void 0&&(ie=1),I.morphAttributes.normal!==void 0&&(ie=2),I.morphAttributes.color!==void 0&&(ie=3);let X,K,le,Me;if(q){const Kt=zn[q];X=Kt.vertexShader,K=Kt.fragmentShader}else X=b.vertexShader,K=b.fragmentShader,c.update(b),le=c.getVertexShaderID(b),Me=c.getFragmentShaderID(b);const ye=n.getRenderTarget(),ke=N.isInstancedMesh===!0,Fe=N.isBatchedMesh===!0,we=!!b.map,Je=!!b.matcap,k=!!$,Yt=!!b.aoMap,Ee=!!b.lightMap,Ue=!!b.bumpMap,ge=!!b.normalMap,pt=!!b.displacementMap,He=!!b.emissiveMap,A=!!b.metalnessMap,M=!!b.roughnessMap,z=b.anisotropy>0,Q=b.clearcoat>0,Z=b.iridescence>0,ee=b.sheen>0,xe=b.transmission>0,ce=z&&!!b.anisotropyMap,ue=Q&&!!b.clearcoatMap,Re=Q&&!!b.clearcoatNormalMap,Ge=Q&&!!b.clearcoatRoughnessMap,J=Z&&!!b.iridescenceMap,tt=Z&&!!b.iridescenceThicknessMap,$e=ee&&!!b.sheenColorMap,De=ee&&!!b.sheenRoughnessMap,be=!!b.specularMap,pe=!!b.specularColorMap,ze=!!b.specularIntensityMap,Ze=xe&&!!b.transmissionMap,xt=xe&&!!b.thicknessMap,We=!!b.gradientMap,re=!!b.alphaMap,L=b.alphaTest>0,oe=!!b.alphaHash,ae=!!b.extensions,Pe=!!I.attributes.uv1,Te=!!I.attributes.uv2,it=!!I.attributes.uv3;let rt=Ci;return b.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(rt=n.toneMapping),{isWebGL2:f,shaderID:q,shaderType:b.type,shaderName:b.name,vertexShader:X,fragmentShader:K,defines:b.defines,customVertexShaderID:le,customFragmentShaderID:Me,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,batching:Fe,instancing:ke,instancingColor:ke&&N.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ye===null?n.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Vn,map:we,matcap:Je,envMap:k,envMapMode:k&&$.mapping,envMapCubeUVHeight:j,aoMap:Yt,lightMap:Ee,bumpMap:Ue,normalMap:ge,displacementMap:d&&pt,emissiveMap:He,normalMapObjectSpace:ge&&b.normalMapType===Dp,normalMapTangentSpace:ge&&b.normalMapType===Mc,metalnessMap:A,roughnessMap:M,anisotropy:z,anisotropyMap:ce,clearcoat:Q,clearcoatMap:ue,clearcoatNormalMap:Re,clearcoatRoughnessMap:Ge,iridescence:Z,iridescenceMap:J,iridescenceThicknessMap:tt,sheen:ee,sheenColorMap:$e,sheenRoughnessMap:De,specularMap:be,specularColorMap:pe,specularIntensityMap:ze,transmission:xe,transmissionMap:Ze,thicknessMap:xt,gradientMap:We,opaque:b.transparent===!1&&b.blending===Pr,alphaMap:re,alphaTest:L,alphaHash:oe,combine:b.combine,mapUv:we&&_(b.map.channel),aoMapUv:Yt&&_(b.aoMap.channel),lightMapUv:Ee&&_(b.lightMap.channel),bumpMapUv:Ue&&_(b.bumpMap.channel),normalMapUv:ge&&_(b.normalMap.channel),displacementMapUv:pt&&_(b.displacementMap.channel),emissiveMapUv:He&&_(b.emissiveMap.channel),metalnessMapUv:A&&_(b.metalnessMap.channel),roughnessMapUv:M&&_(b.roughnessMap.channel),anisotropyMapUv:ce&&_(b.anisotropyMap.channel),clearcoatMapUv:ue&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(b.sheenRoughnessMap.channel),specularMapUv:be&&_(b.specularMap.channel),specularColorMapUv:pe&&_(b.specularColorMap.channel),specularIntensityMapUv:ze&&_(b.specularIntensityMap.channel),transmissionMapUv:Ze&&_(b.transmissionMap.channel),thicknessMapUv:xt&&_(b.thicknessMap.channel),alphaMapUv:re&&_(b.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ge||z),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Pe,vertexUv2s:Te,vertexUv3s:it,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(we||re),fog:!!C,useFog:b.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:N.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:rt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:we&&b.map.isVideoTexture===!0&&et.getTransfer(b.map.colorSpace)===ft,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Wt,flipSided:b.side===cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:ae&&b.extensions.derivatives===!0,extensionFragDepth:ae&&b.extensions.fragDepth===!0,extensionDrawBuffers:ae&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:f||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:f||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:f||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function u(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const G in b.defines)T.push(G),T.push(b.defines[G]);return b.isRawShaderMaterial===!1&&(v(T,b),y(T,b),T.push(n.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function v(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function y(b,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),b.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),b.push(o.mask)}function S(b){const T=x[b.type];let G;if(T){const W=zn[T];G=om.clone(W.uniforms)}else G=b.uniforms;return G}function P(b,T){let G;for(let W=0,N=l.length;W<N;W++){const C=l[W];if(C.cacheKey===T){G=C,++G.usedTimes;break}}return G===void 0&&(G=new yx(n,T,b,s),l.push(G)),G}function R(b){if(--b.usedTimes===0){const T=l.indexOf(b);l[T]=l[l.length-1],l.pop(),b.destroy()}}function w(b){c.remove(b)}function F(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:S,acquireProgram:P,releaseProgram:R,releaseShaderCache:w,programs:l,dispose:F}}function Tx(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Ax(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function df(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function uf(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h,d,m,x,_,p){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:d,material:m,groupOrder:x,renderOrder:h.renderOrder,z:_,group:p},n[e]=u):(u.id=h.id,u.object=h,u.geometry=d,u.material=m,u.groupOrder=x,u.renderOrder=h.renderOrder,u.z=_,u.group=p),e++,u}function o(h,d,m,x,_,p){const u=a(h,d,m,x,_,p);m.transmission>0?i.push(u):m.transparent===!0?r.push(u):t.push(u)}function c(h,d,m,x,_,p){const u=a(h,d,m,x,_,p);m.transmission>0?i.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function l(h,d){t.length>1&&t.sort(h||Ax),i.length>1&&i.sort(d||df),r.length>1&&r.sort(d||df)}function f(){for(let h=e,d=n.length;h<d;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:f,sort:l}}function Cx(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new uf,n.set(i,[a])):r>=s.length?(a=new uf,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Rx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ce};break;case"SpotLight":t={position:new D,direction:new D,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function wx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Px=0;function Lx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Dx(n,e){const t=new Rx,i=wx(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)r.probe.push(new D);const s=new D,a=new Ke,o=new Ke;function c(f,h){let d=0,m=0,x=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,p=0,u=0,v=0,y=0,S=0,P=0,R=0,w=0,F=0,b=0;f.sort(Lx);const T=h===!0?Math.PI:1;for(let W=0,N=f.length;W<N;W++){const C=f[W],I=C.color,V=C.intensity,$=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=I.r*V*T,m+=I.g*V*T,x+=I.b*V*T;else if(C.isLightProbe){for(let q=0;q<9;q++)r.probe[q].addScaledVector(C.sh.coefficients[q],V);b++}else if(C.isDirectionalLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*T),C.castShadow){const Y=C.shadow,te=i.get(C);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,r.directionalShadow[_]=te,r.directionalShadowMap[_]=j,r.directionalShadowMatrix[_]=C.shadow.matrix,S++}r.directional[_]=q,_++}else if(C.isSpotLight){const q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(I).multiplyScalar(V*T),q.distance=$,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,r.spot[u]=q;const Y=C.shadow;if(C.map&&(r.spotLightMap[w]=C.map,w++,Y.updateMatrices(C),C.castShadow&&F++),r.spotLightMatrix[u]=Y.matrix,C.castShadow){const te=i.get(C);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,r.spotShadow[u]=te,r.spotShadowMap[u]=j,R++}u++}else if(C.isRectAreaLight){const q=t.get(C);q.color.copy(I).multiplyScalar(V),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),r.rectArea[v]=q,v++}else if(C.isPointLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity*T),q.distance=C.distance,q.decay=C.decay,C.castShadow){const Y=C.shadow,te=i.get(C);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,te.shadowCameraNear=Y.camera.near,te.shadowCameraFar=Y.camera.far,r.pointShadow[p]=te,r.pointShadowMap[p]=j,r.pointShadowMatrix[p]=C.shadow.matrix,P++}r.point[p]=q,p++}else if(C.isHemisphereLight){const q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(V*T),q.groundColor.copy(C.groundColor).multiplyScalar(V*T),r.hemi[y]=q,y++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=x;const G=r.hash;(G.directionalLength!==_||G.pointLength!==p||G.spotLength!==u||G.rectAreaLength!==v||G.hemiLength!==y||G.numDirectionalShadows!==S||G.numPointShadows!==P||G.numSpotShadows!==R||G.numSpotMaps!==w||G.numLightProbes!==b)&&(r.directional.length=_,r.spot.length=u,r.rectArea.length=v,r.point.length=p,r.hemi.length=y,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=R+w-F,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=b,G.directionalLength=_,G.pointLength=p,G.spotLength=u,G.rectAreaLength=v,G.hemiLength=y,G.numDirectionalShadows=S,G.numPointShadows=P,G.numSpotShadows=R,G.numSpotMaps=w,G.numLightProbes=b,r.version=Px++)}function l(f,h){let d=0,m=0,x=0,_=0,p=0;const u=h.matrixWorldInverse;for(let v=0,y=f.length;v<y;v++){const S=f[v];if(S.isDirectionalLight){const P=r.directional[d];P.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),d++}else if(S.isSpotLight){const P=r.spot[x];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),x++}else if(S.isRectAreaLight){const P=r.rectArea[_];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(u),o.identity(),a.copy(S.matrixWorld),a.premultiply(u),o.extractRotation(a),P.halfWidth.set(S.width*.5,0,0),P.halfHeight.set(0,S.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(u),m++}else if(S.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(S.matrixWorld),P.direction.transformDirection(u),p++}}}return{setup:c,setupView:l,state:r}}function pf(n,e){const t=new Dx(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(h){i.push(h)}function o(h){r.push(h)}function c(h){t.setup(i,h)}function l(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Ix(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let c;return o===void 0?(c=new pf(n,e),t.set(s,[c])):a>=o.length?(c=new pf(n,e),o.push(c)):c=o[a],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Ux extends Yr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nx extends Yr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ox=`uniform sampler2D shadow_pass;
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
}`;function Fx(n,e,t){let i=new bc;const r=new qe,s=new qe,a=new kt,o=new Ux({depthPacking:Lp}),c=new Nx,l={},f=t.maxTextureSize,h={[Pi]:cn,[cn]:Pi,[Wt]:Wt},d=new Qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:kx,fragmentShader:Ox}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const x=new gn;x.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new dt(x,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vh;let u=this.type;this.render=function(R,w,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const b=n.getRenderTarget(),T=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Ai),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const N=u!==ei&&this.type===ei,C=u===ei&&this.type!==ei;for(let I=0,V=R.length;I<V;I++){const $=R[I],j=$.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const q=j.getFrameExtents();if(r.multiply(q),s.copy(j.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/q.x),r.x=s.x*q.x,j.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/q.y),r.y=s.y*q.y,j.mapSize.y=s.y)),j.map===null||N===!0||C===!0){const te=this.type!==ei?{minFilter:tn,magFilter:tn}:{};j.map!==null&&j.map.dispose(),j.map=new Zi(r.x,r.y,te),j.map.texture.name=$.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const Y=j.getViewportCount();for(let te=0;te<Y;te++){const ie=j.getViewport(te);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),W.viewport(a),j.updateMatrices($,te),i=j.getFrustum(),S(w,F,j.camera,$,this.type)}j.isPointLightShadow!==!0&&this.type===ei&&v(j,F),j.needsUpdate=!1}u=this.type,p.needsUpdate=!1,n.setRenderTarget(b,T,G)};function v(R,w){const F=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Zi(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(w,null,F,d,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(w,null,F,m,_,null)}function y(R,w,F,b){let T=null;const G=F.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(G!==void 0)T=G;else if(T=F.isPointLight===!0?c:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=T.uuid,N=w.uuid;let C=l[W];C===void 0&&(C={},l[W]=C);let I=C[N];I===void 0&&(I=T.clone(),C[N]=I,w.addEventListener("dispose",P)),T=I}if(T.visible=w.visible,T.wireframe=w.wireframe,b===ei?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:h[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,F.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=n.properties.get(T);W.light=F}return T}function S(R,w,F,b,T){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&T===ei)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,R.matrixWorld);const N=e.update(R),C=R.material;if(Array.isArray(C)){const I=N.groups;for(let V=0,$=I.length;V<$;V++){const j=I[V],q=C[j.materialIndex];if(q&&q.visible){const Y=y(R,q,b,T);R.onBeforeShadow(n,R,w,F,N,Y,j),n.renderBufferDirect(F,null,N,Y,R,j),R.onAfterShadow(n,R,w,F,N,Y,j)}}}else if(C.visible){const I=y(R,C,b,T);R.onBeforeShadow(n,R,w,F,N,I,null),n.renderBufferDirect(F,null,N,I,R,null),R.onAfterShadow(n,R,w,F,N,I,null)}}const W=R.children;for(let N=0,C=W.length;N<C;N++)S(W[N],w,F,b,T)}function P(R){R.target.removeEventListener("dispose",P);for(const F in l){const b=l[F],T=R.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}function zx(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const oe=new kt;let ae=null;const Pe=new kt(0,0,0,0);return{setMask:function(Te){ae!==Te&&!L&&(n.colorMask(Te,Te,Te,Te),ae=Te)},setLocked:function(Te){L=Te},setClear:function(Te,it,rt,Pt,Kt){Kt===!0&&(Te*=Pt,it*=Pt,rt*=Pt),oe.set(Te,it,rt,Pt),Pe.equals(oe)===!1&&(n.clearColor(Te,it,rt,Pt),Pe.copy(oe))},reset:function(){L=!1,ae=null,Pe.set(-1,0,0,0)}}}function s(){let L=!1,oe=null,ae=null,Pe=null;return{setTest:function(Te){Te?Fe(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(Te){oe!==Te&&!L&&(n.depthMask(Te),oe=Te)},setFunc:function(Te){if(ae!==Te){switch(Te){case op:n.depthFunc(n.NEVER);break;case ap:n.depthFunc(n.ALWAYS);break;case cp:n.depthFunc(n.LESS);break;case fo:n.depthFunc(n.LEQUAL);break;case lp:n.depthFunc(n.EQUAL);break;case fp:n.depthFunc(n.GEQUAL);break;case hp:n.depthFunc(n.GREATER);break;case dp:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Te}},setLocked:function(Te){L=Te},setClear:function(Te){Pe!==Te&&(n.clearDepth(Te),Pe=Te)},reset:function(){L=!1,oe=null,ae=null,Pe=null}}}function a(){let L=!1,oe=null,ae=null,Pe=null,Te=null,it=null,rt=null,Pt=null,Kt=null;return{setTest:function(st){L||(st?Fe(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(st){oe!==st&&!L&&(n.stencilMask(st),oe=st)},setFunc:function(st,Jt,On){(ae!==st||Pe!==Jt||Te!==On)&&(n.stencilFunc(st,Jt,On),ae=st,Pe=Jt,Te=On)},setOp:function(st,Jt,On){(it!==st||rt!==Jt||Pt!==On)&&(n.stencilOp(st,Jt,On),it=st,rt=Jt,Pt=On)},setLocked:function(st){L=st},setClear:function(st){Kt!==st&&(n.clearStencil(st),Kt=st)},reset:function(){L=!1,oe=null,ae=null,Pe=null,Te=null,it=null,rt=null,Pt=null,Kt=null}}}const o=new r,c=new s,l=new a,f=new WeakMap,h=new WeakMap;let d={},m={},x=new WeakMap,_=[],p=null,u=!1,v=null,y=null,S=null,P=null,R=null,w=null,F=null,b=new Ce(0,0,0),T=0,G=!1,W=null,N=null,C=null,I=null,V=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,q=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),j=q>=1):Y.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),j=q>=2);let te=null,ie={};const X=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),le=new kt().fromArray(X),Me=new kt().fromArray(K);function ye(L,oe,ae,Pe){const Te=new Uint8Array(4),it=n.createTexture();n.bindTexture(L,it),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<ae;rt++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(oe,0,n.RGBA,1,1,Pe,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(oe+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return it}const ke={};ke[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),ke[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ke[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ke[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Fe(n.DEPTH_TEST),c.setFunc(fo),He(!1),A(qc),Fe(n.CULL_FACE),ge(Ai);function Fe(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function we(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Je(L,oe){return m[L]!==oe?(n.bindFramebuffer(L,oe),m[L]=oe,i&&(L===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=oe),L===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=oe)),!0):!1}function k(L,oe){let ae=_,Pe=!1;if(L)if(ae=x.get(oe),ae===void 0&&(ae=[],x.set(oe,ae)),L.isWebGLMultipleRenderTargets){const Te=L.texture;if(ae.length!==Te.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let it=0,rt=Te.length;it<rt;it++)ae[it]=n.COLOR_ATTACHMENT0+it;ae.length=Te.length,Pe=!0}}else ae[0]!==n.COLOR_ATTACHMENT0&&(ae[0]=n.COLOR_ATTACHMENT0,Pe=!0);else ae[0]!==n.BACK&&(ae[0]=n.BACK,Pe=!0);Pe&&(t.isWebGL2?n.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Yt(L){return p!==L?(n.useProgram(L),p=L,!0):!1}const Ee={[zi]:n.FUNC_ADD,[Xu]:n.FUNC_SUBTRACT,[ju]:n.FUNC_REVERSE_SUBTRACT};if(i)Ee[Jc]=n.MIN,Ee[Zc]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Ee[Jc]=L.MIN_EXT,Ee[Zc]=L.MAX_EXT)}const Ue={[qu]:n.ZERO,[$u]:n.ONE,[Yu]:n.SRC_COLOR,[Ua]:n.SRC_ALPHA,[tp]:n.SRC_ALPHA_SATURATE,[Qu]:n.DST_COLOR,[Ju]:n.DST_ALPHA,[Ku]:n.ONE_MINUS_SRC_COLOR,[Na]:n.ONE_MINUS_SRC_ALPHA,[ep]:n.ONE_MINUS_DST_COLOR,[Zu]:n.ONE_MINUS_DST_ALPHA,[np]:n.CONSTANT_COLOR,[ip]:n.ONE_MINUS_CONSTANT_COLOR,[rp]:n.CONSTANT_ALPHA,[sp]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(L,oe,ae,Pe,Te,it,rt,Pt,Kt,st){if(L===Ai){u===!0&&(we(n.BLEND),u=!1);return}if(u===!1&&(Fe(n.BLEND),u=!0),L!==Wu){if(L!==v||st!==G){if((y!==zi||R!==zi)&&(n.blendEquation(n.FUNC_ADD),y=zi,R=zi),st)switch(L){case Pr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $c:n.blendFunc(n.ONE,n.ONE);break;case Yc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Pr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $c:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Yc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,P=null,w=null,F=null,b.set(0,0,0),T=0,v=L,G=st}return}Te=Te||oe,it=it||ae,rt=rt||Pe,(oe!==y||Te!==R)&&(n.blendEquationSeparate(Ee[oe],Ee[Te]),y=oe,R=Te),(ae!==S||Pe!==P||it!==w||rt!==F)&&(n.blendFuncSeparate(Ue[ae],Ue[Pe],Ue[it],Ue[rt]),S=ae,P=Pe,w=it,F=rt),(Pt.equals(b)===!1||Kt!==T)&&(n.blendColor(Pt.r,Pt.g,Pt.b,Kt),b.copy(Pt),T=Kt),v=L,G=!1}function pt(L,oe){L.side===Wt?we(n.CULL_FACE):Fe(n.CULL_FACE);let ae=L.side===cn;oe&&(ae=!ae),He(ae),L.blending===Pr&&L.transparent===!1?ge(Ai):ge(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),o.setMask(L.colorWrite);const Pe=L.stencilWrite;l.setTest(Pe),Pe&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),z(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Fe(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(L){W!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),W=L)}function A(L){L!==Hu?(Fe(n.CULL_FACE),L!==N&&(L===qc?n.cullFace(n.BACK):L===Gu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),N=L}function M(L){L!==C&&(j&&n.lineWidth(L),C=L)}function z(L,oe,ae){L?(Fe(n.POLYGON_OFFSET_FILL),(I!==oe||V!==ae)&&(n.polygonOffset(oe,ae),I=oe,V=ae)):we(n.POLYGON_OFFSET_FILL)}function Q(L){L?Fe(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function Z(L){L===void 0&&(L=n.TEXTURE0+$-1),te!==L&&(n.activeTexture(L),te=L)}function ee(L,oe,ae){ae===void 0&&(te===null?ae=n.TEXTURE0+$-1:ae=te);let Pe=ie[ae];Pe===void 0&&(Pe={type:void 0,texture:void 0},ie[ae]=Pe),(Pe.type!==L||Pe.texture!==oe)&&(te!==ae&&(n.activeTexture(ae),te=ae),n.bindTexture(L,oe||ke[L]),Pe.type=L,Pe.texture=oe)}function xe(){const L=ie[te];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ce(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ge(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(L){le.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),le.copy(L))}function Ze(L){Me.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Me.copy(L))}function xt(L,oe){let ae=h.get(oe);ae===void 0&&(ae=new WeakMap,h.set(oe,ae));let Pe=ae.get(L);Pe===void 0&&(Pe=n.getUniformBlockIndex(oe,L.name),ae.set(L,Pe))}function We(L,oe){const Pe=h.get(oe).get(L);f.get(oe)!==Pe&&(n.uniformBlockBinding(oe,Pe,L.__bindingPointIndex),f.set(oe,Pe))}function re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},te=null,ie={},m={},x=new WeakMap,_=[],p=null,u=!1,v=null,y=null,S=null,P=null,R=null,w=null,F=null,b=new Ce(0,0,0),T=0,G=!1,W=null,N=null,C=null,I=null,V=null,le.set(0,0,n.canvas.width,n.canvas.height),Me.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Fe,disable:we,bindFramebuffer:Je,drawBuffers:k,useProgram:Yt,setBlending:ge,setMaterial:pt,setFlipSided:He,setCullFace:A,setLineWidth:M,setPolygonOffset:z,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:xe,compressedTexImage2D:ce,compressedTexImage3D:ue,texImage2D:be,texImage3D:pe,updateUBOMapping:xt,uniformBlockBinding:We,texStorage2D:$e,texStorage3D:De,texSubImage2D:Re,texSubImage3D:Ge,compressedTexSubImage2D:J,compressedTexSubImage3D:tt,scissor:ze,viewport:Ze,reset:re}}function Bx(n,e,t,i,r,s,a){const o=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new WeakMap;let h;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,M){return m?new OffscreenCanvas(A,M):go("canvas")}function _(A,M,z,Q){let Z=1;if((A.width>Q||A.height>Q)&&(Z=Q/Math.max(A.width,A.height)),Z<1||M===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){const ee=M?Ga:Math.floor,xe=ee(Z*A.width),ce=ee(Z*A.height);h===void 0&&(h=x(xe,ce));const ue=z?x(xe,ce):h;return ue.width=xe,ue.height=ce,ue.getContext("2d").drawImage(A,0,0,xe,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+xe+"x"+ce+")."),ue}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function p(A){return wl(A.width)&&wl(A.height)}function u(A){return o?!1:A.wrapS!==Dn||A.wrapT!==Dn||A.minFilter!==tn&&A.minFilter!==Mn}function v(A,M){return A.generateMipmaps&&M&&A.minFilter!==tn&&A.minFilter!==Mn}function y(A){n.generateMipmap(A)}function S(A,M,z,Q,Z=!1){if(o===!1)return M;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ee=M;if(M===n.RED&&(z===n.FLOAT&&(ee=n.R32F),z===n.HALF_FLOAT&&(ee=n.R16F),z===n.UNSIGNED_BYTE&&(ee=n.R8)),M===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(ee=n.R8UI),z===n.UNSIGNED_SHORT&&(ee=n.R16UI),z===n.UNSIGNED_INT&&(ee=n.R32UI),z===n.BYTE&&(ee=n.R8I),z===n.SHORT&&(ee=n.R16I),z===n.INT&&(ee=n.R32I)),M===n.RG&&(z===n.FLOAT&&(ee=n.RG32F),z===n.HALF_FLOAT&&(ee=n.RG16F),z===n.UNSIGNED_BYTE&&(ee=n.RG8)),M===n.RGBA){const xe=Z?ho:et.getTransfer(Q);z===n.FLOAT&&(ee=n.RGBA32F),z===n.HALF_FLOAT&&(ee=n.RGBA16F),z===n.UNSIGNED_BYTE&&(ee=xe===ft?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function P(A,M,z){return v(A,z)===!0||A.isFramebufferTexture&&A.minFilter!==tn&&A.minFilter!==Mn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function R(A){return A===tn||A===Qc||A===jo?n.NEAREST:n.LINEAR}function w(A){const M=A.target;M.removeEventListener("dispose",w),b(M),M.isVideoTexture&&f.delete(M)}function F(A){const M=A.target;M.removeEventListener("dispose",F),G(M)}function b(A){const M=i.get(A);if(M.__webglInit===void 0)return;const z=A.source,Q=d.get(z);if(Q){const Z=Q[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(A),Object.keys(Q).length===0&&d.delete(z)}i.remove(A)}function T(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const z=A.source,Q=d.get(z);delete Q[M.__cacheKey],a.memory.textures--}function G(A){const M=A.texture,z=i.get(A),Q=i.get(M);if(Q.__webglTexture!==void 0&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(z.__webglFramebuffer[Z]))for(let ee=0;ee<z.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(z.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(z.__webglFramebuffer[Z]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[Z])}else{if(Array.isArray(z.__webglFramebuffer))for(let Z=0;Z<z.__webglFramebuffer.length;Z++)n.deleteFramebuffer(z.__webglFramebuffer[Z]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let Z=0;Z<z.__webglColorRenderbuffer.length;Z++)z.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[Z]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let Z=0,ee=M.length;Z<ee;Z++){const xe=i.get(M[Z]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),a.memory.textures--),i.remove(M[Z])}i.remove(M),i.remove(A)}let W=0;function N(){W=0}function C(){const A=W;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),W+=1,A}function I(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function V(A,M){const z=i.get(A);if(A.isVideoTexture&&pt(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(z,A,M);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+M)}function $(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){le(z,A,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+M)}function j(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){le(z,A,M);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+M)}function q(A,M){const z=i.get(A);if(A.version>0&&z.__version!==A.version){Me(z,A,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+M)}const Y={[Fa]:n.REPEAT,[Dn]:n.CLAMP_TO_EDGE,[za]:n.MIRRORED_REPEAT},te={[tn]:n.NEAREST,[Qc]:n.NEAREST_MIPMAP_NEAREST,[jo]:n.NEAREST_MIPMAP_LINEAR,[Mn]:n.LINEAR,[Mp]:n.LINEAR_MIPMAP_NEAREST,[gs]:n.LINEAR_MIPMAP_LINEAR},ie={[Ip]:n.NEVER,[zp]:n.ALWAYS,[Up]:n.LESS,[wh]:n.LEQUAL,[Np]:n.EQUAL,[Fp]:n.GEQUAL,[kp]:n.GREATER,[Op]:n.NOTEQUAL};function X(A,M,z){if(z?(n.texParameteri(A,n.TEXTURE_WRAP_S,Y[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Y[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Y[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,te[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,te[M.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(M.wrapS!==Dn||M.wrapT!==Dn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,R(M.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,R(M.minFilter)),M.minFilter!==tn&&M.minFilter!==Mn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===tn||M.minFilter!==jo&&M.minFilter!==gs||M.type===Mi&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===_s&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(A,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function K(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));const Q=M.source;let Z=d.get(Q);Z===void 0&&(Z={},d.set(Q,Z));const ee=I(M);if(ee!==A.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Z[ee].usedTimes++;const xe=Z[A.__cacheKey];xe!==void 0&&(Z[A.__cacheKey].usedTimes--,xe.usedTimes===0&&T(M)),A.__cacheKey=ee,A.__webglTexture=Z[ee].texture}return z}function le(A,M,z){let Q=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=n.TEXTURE_3D);const Z=K(A,M),ee=M.source;t.bindTexture(Q,A.__webglTexture,n.TEXTURE0+z);const xe=i.get(ee);if(ee.version!==xe.__version||Z===!0){t.activeTexture(n.TEXTURE0+z);const ce=et.getPrimaries(et.workingColorSpace),ue=M.colorSpace===mn?null:et.getPrimaries(M.colorSpace),Re=M.colorSpace===mn||ce===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ge=u(M)&&p(M.image)===!1;let J=_(M.image,Ge,!1,r.maxTextureSize);J=He(M,J);const tt=p(J)||o,$e=s.convert(M.format,M.colorSpace);let De=s.convert(M.type),be=S(M.internalFormat,$e,De,M.colorSpace,M.isVideoTexture);X(Q,M,tt);let pe;const ze=M.mipmaps,Ze=o&&M.isVideoTexture!==!0&&be!==Ch,xt=xe.__version===void 0||Z===!0,We=P(M,J,tt);if(M.isDepthTexture)be=n.DEPTH_COMPONENT,o?M.type===Mi?be=n.DEPTH_COMPONENT32F:M.type===yi?be=n.DEPTH_COMPONENT24:M.type===ji?be=n.DEPTH24_STENCIL8:be=n.DEPTH_COMPONENT16:M.type===Mi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===qi&&be===n.DEPTH_COMPONENT&&M.type!==yc&&M.type!==yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=yi,De=s.convert(M.type)),M.format===Hr&&be===n.DEPTH_COMPONENT&&(be=n.DEPTH_STENCIL,M.type!==ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ji,De=s.convert(M.type))),xt&&(Ze?t.texStorage2D(n.TEXTURE_2D,1,be,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,be,J.width,J.height,0,$e,De,null));else if(M.isDataTexture)if(ze.length>0&&tt){Ze&&xt&&t.texStorage2D(n.TEXTURE_2D,We,be,ze[0].width,ze[0].height);for(let re=0,L=ze.length;re<L;re++)pe=ze[re],Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,$e,De,pe.data):t.texImage2D(n.TEXTURE_2D,re,be,pe.width,pe.height,0,$e,De,pe.data);M.generateMipmaps=!1}else Ze?(xt&&t.texStorage2D(n.TEXTURE_2D,We,be,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,$e,De,J.data)):t.texImage2D(n.TEXTURE_2D,0,be,J.width,J.height,0,$e,De,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ze&&xt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,be,ze[0].width,ze[0].height,J.depth);for(let re=0,L=ze.length;re<L;re++)pe=ze[re],M.format!==In?$e!==null?Ze?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,J.depth,$e,pe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,be,pe.width,pe.height,J.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,J.depth,$e,De,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,be,pe.width,pe.height,J.depth,0,$e,De,pe.data)}else{Ze&&xt&&t.texStorage2D(n.TEXTURE_2D,We,be,ze[0].width,ze[0].height);for(let re=0,L=ze.length;re<L;re++)pe=ze[re],M.format!==In?$e!==null?Ze?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,$e,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,be,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,$e,De,pe.data):t.texImage2D(n.TEXTURE_2D,re,be,pe.width,pe.height,0,$e,De,pe.data)}else if(M.isDataArrayTexture)Ze?(xt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,be,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,$e,De,J.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,be,J.width,J.height,J.depth,0,$e,De,J.data);else if(M.isData3DTexture)Ze?(xt&&t.texStorage3D(n.TEXTURE_3D,We,be,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,$e,De,J.data)):t.texImage3D(n.TEXTURE_3D,0,be,J.width,J.height,J.depth,0,$e,De,J.data);else if(M.isFramebufferTexture){if(xt)if(Ze)t.texStorage2D(n.TEXTURE_2D,We,be,J.width,J.height);else{let re=J.width,L=J.height;for(let oe=0;oe<We;oe++)t.texImage2D(n.TEXTURE_2D,oe,be,re,L,0,$e,De,null),re>>=1,L>>=1}}else if(ze.length>0&&tt){Ze&&xt&&t.texStorage2D(n.TEXTURE_2D,We,be,ze[0].width,ze[0].height);for(let re=0,L=ze.length;re<L;re++)pe=ze[re],Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,$e,De,pe):t.texImage2D(n.TEXTURE_2D,re,be,$e,De,pe);M.generateMipmaps=!1}else Ze?(xt&&t.texStorage2D(n.TEXTURE_2D,We,be,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,$e,De,J)):t.texImage2D(n.TEXTURE_2D,0,be,$e,De,J);v(M,tt)&&y(Q),xe.__version=ee.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Me(A,M,z){if(M.image.length!==6)return;const Q=K(A,M),Z=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const ee=i.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+z);const xe=et.getPrimaries(et.workingColorSpace),ce=M.colorSpace===mn?null:et.getPrimaries(M.colorSpace),ue=M.colorSpace===mn||xe===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Re=M.isCompressedTexture||M.image[0].isCompressedTexture,Ge=M.image[0]&&M.image[0].isDataTexture,J=[];for(let re=0;re<6;re++)!Re&&!Ge?J[re]=_(M.image[re],!1,!0,r.maxCubemapSize):J[re]=Ge?M.image[re].image:M.image[re],J[re]=He(M,J[re]);const tt=J[0],$e=p(tt)||o,De=s.convert(M.format,M.colorSpace),be=s.convert(M.type),pe=S(M.internalFormat,De,be,M.colorSpace),ze=o&&M.isVideoTexture!==!0,Ze=ee.__version===void 0||Q===!0;let xt=P(M,tt,$e);X(n.TEXTURE_CUBE_MAP,M,$e);let We;if(Re){ze&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xt,pe,tt.width,tt.height);for(let re=0;re<6;re++){We=J[re].mipmaps;for(let L=0;L<We.length;L++){const oe=We[L];M.format!==In?De!==null?ze?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,oe.width,oe.height,De,oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,pe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,0,0,oe.width,oe.height,De,be,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L,pe,oe.width,oe.height,0,De,be,oe.data)}}}else{We=M.mipmaps,ze&&Ze&&(We.length>0&&xt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,xt,pe,J[0].width,J[0].height));for(let re=0;re<6;re++)if(Ge){ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,J[re].width,J[re].height,De,be,J[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,pe,J[re].width,J[re].height,0,De,be,J[re].data);for(let L=0;L<We.length;L++){const ae=We[L].image[re].image;ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,ae.width,ae.height,De,be,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,pe,ae.width,ae.height,0,De,be,ae.data)}}else{ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,De,be,J[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,pe,De,be,J[re]);for(let L=0;L<We.length;L++){const oe=We[L];ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,0,0,De,be,oe.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,L+1,pe,De,be,oe.image[re])}}}v(M,$e)&&y(n.TEXTURE_CUBE_MAP),ee.__version=Z.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ye(A,M,z,Q,Z,ee){const xe=s.convert(z.format,z.colorSpace),ce=s.convert(z.type),ue=S(z.internalFormat,xe,ce,z.colorSpace);if(!i.get(M).__hasExternalTextures){const Ge=Math.max(1,M.width>>ee),J=Math.max(1,M.height>>ee);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,ue,Ge,J,M.depth,0,xe,ce,null):t.texImage2D(Z,ee,ue,Ge,J,0,xe,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),ge(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,Z,i.get(z).__webglTexture,0,Ue(M)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,Z,i.get(z).__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(A,M,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let Q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||ge(M)){const Z=M.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Mi?Q=n.DEPTH_COMPONENT32F:Z.type===yi&&(Q=n.DEPTH_COMPONENT24));const ee=Ue(M);ge(M)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,Q,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,Q,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const Q=Ue(M);z&&ge(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):ge(M)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],xe=s.convert(ee.format,ee.colorSpace),ce=s.convert(ee.type),ue=S(ee.internalFormat,xe,ce,ee.colorSpace),Re=Ue(M);z&&ge(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ue,M.width,M.height):ge(M)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,ue,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ue,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Fe(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const Q=i.get(M.depthTexture).__webglTexture,Z=Ue(M);if(M.depthTexture.format===qi)ge(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Hr)ge(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function we(A){const M=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Fe(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=n.createRenderbuffer(),ke(M.__webglDepthbuffer[Q],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),ke(M.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Je(A,M,z){const Q=i.get(A);M!==void 0&&ye(Q.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&we(A)}function k(A){const M=A.texture,z=i.get(A),Q=i.get(M);A.addEventListener("dispose",F),A.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=M.version,a.memory.textures++);const Z=A.isWebGLCubeRenderTarget===!0,ee=A.isWebGLMultipleRenderTargets===!0,xe=p(A)||o;if(Z){z.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ce]=[];for(let ue=0;ue<M.mipmaps.length;ue++)z.__webglFramebuffer[ce][ue]=n.createFramebuffer()}else z.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ce=0;ce<M.mipmaps.length;ce++)z.__webglFramebuffer[ce]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ee)if(r.drawBuffers){const ce=A.texture;for(let ue=0,Re=ce.length;ue<Re;ue++){const Ge=i.get(ce[ue]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&ge(A)===!1){const ce=ee?M:[M];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ue=0;ue<ce.length;ue++){const Re=ce[ue];z.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ue]);const Ge=s.convert(Re.format,Re.colorSpace),J=s.convert(Re.type),tt=S(Re.internalFormat,Ge,J,Re.colorSpace,A.isXRRenderTarget===!0),$e=Ue(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,tt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,z.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),X(n.TEXTURE_CUBE_MAP,M,xe);for(let ce=0;ce<6;ce++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)ye(z.__webglFramebuffer[ce][ue],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ue);else ye(z.__webglFramebuffer[ce],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);v(M,xe)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const ce=A.texture;for(let ue=0,Re=ce.length;ue<Re;ue++){const Ge=ce[ue],J=i.get(Ge);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),X(n.TEXTURE_2D,Ge,xe),ye(z.__webglFramebuffer,A,Ge,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),v(Ge,xe)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?ce=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Q.__webglTexture),X(ce,M,xe),o&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)ye(z.__webglFramebuffer[ue],A,M,n.COLOR_ATTACHMENT0,ce,ue);else ye(z.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,ce,0);v(M,xe)&&y(ce),t.unbindTexture()}A.depthBuffer&&we(A)}function Yt(A){const M=p(A)||o,z=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let Q=0,Z=z.length;Q<Z;Q++){const ee=z[Q];if(v(ee,M)){const xe=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ce=i.get(ee).__webglTexture;t.bindTexture(xe,ce),y(xe),t.unbindTexture()}}}function Ee(A){if(o&&A.samples>0&&ge(A)===!1){const M=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],z=A.width,Q=A.height;let Z=n.COLOR_BUFFER_BIT;const ee=[],xe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(A),ue=A.isWebGLMultipleRenderTargets===!0;if(ue)for(let Re=0;Re<M.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Re=0;Re<M.length;Re++){ee.push(n.COLOR_ATTACHMENT0+Re),A.depthBuffer&&ee.push(xe);const Ge=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Ge===!1&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ue&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[Re]),Ge===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[xe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[xe])),ue){const J=i.get(M[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,z,Q,0,0,z,Q,Z,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Re=0;Re<M.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,ce.__webglColorRenderbuffer[Re]);const Ge=i.get(M[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,Ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Ue(A){return Math.min(r.maxSamples,A.samples)}function ge(A){const M=i.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function pt(A){const M=a.render.frame;f.get(A)!==M&&(f.set(A,M),A.update())}function He(A,M){const z=A.colorSpace,Q=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Ba||z!==Vn&&z!==mn&&(et.getTransfer(z)===ft?o===!1?e.has("EXT_sRGB")===!0&&Q===In?(A.format=Ba,A.minFilter=Mn,A.generateMipmaps=!1):M=Lh.sRGBToLinear(M):(Q!==In||Z!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}this.allocateTextureUnit=C,this.resetTextureUnits=N,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=j,this.setTextureCube=q,this.rebindTextures=Je,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=ge}function Hx(n,e,t){const i=t.isWebGL2;function r(s,a=mn){let o;const c=et.getTransfer(a);if(s===Ri)return n.UNSIGNED_BYTE;if(s===Sh)return n.UNSIGNED_SHORT_4_4_4_4;if(s===bh)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Sp)return n.BYTE;if(s===bp)return n.SHORT;if(s===yc)return n.UNSIGNED_SHORT;if(s===Mh)return n.INT;if(s===yi)return n.UNSIGNED_INT;if(s===Mi)return n.FLOAT;if(s===_s)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Ep)return n.ALPHA;if(s===In)return n.RGBA;if(s===Tp)return n.LUMINANCE;if(s===Ap)return n.LUMINANCE_ALPHA;if(s===qi)return n.DEPTH_COMPONENT;if(s===Hr)return n.DEPTH_STENCIL;if(s===Ba)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Cp)return n.RED;if(s===Eh)return n.RED_INTEGER;if(s===Rp)return n.RG;if(s===Th)return n.RG_INTEGER;if(s===Ah)return n.RGBA_INTEGER;if(s===qo||s===$o||s===Yo||s===Ko)if(c===ft)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===qo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===$o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Yo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===qo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===$o)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Yo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ko)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===el||s===tl||s===nl||s===il)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===el)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===tl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===nl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===il)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ch)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===rl||s===sl)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===rl)return c===ft?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===sl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ol||s===al||s===cl||s===ll||s===fl||s===hl||s===dl||s===ul||s===pl||s===ml||s===gl||s===_l||s===xl||s===vl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===ol)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===al)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===cl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ll)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===fl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===hl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===dl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ul)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===pl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ml)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===gl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===_l)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===xl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===vl)return c===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Jo||s===yl||s===Ml)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Jo)return c===ft?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===yl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ml)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===wp||s===Sl||s===bl||s===El)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Jo)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Sl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===bl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===El)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ji?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Gx extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Un extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vx={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),u=this._getHandJoint(l,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const f=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=f.position.distanceTo(h.position),m=.02,x=.005;l.inputState.pinching&&d>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vx)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Un;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wx extends $r{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,f=null,h=null,d=null,m=null,x=null;const _=t.getContextAttributes();let p=null,u=null;const v=[],y=[],S=new qe;let P=null;const R=new Sn;R.layers.enable(1),R.viewport=new kt;const w=new Sn;w.layers.enable(2),w.viewport=new kt;const F=[R,w],b=new Gx;b.layers.enable(1),b.layers.enable(2);let T=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=v[X];return K===void 0&&(K=new Sa,v[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=v[X];return K===void 0&&(K=new Sa,v[X]=K),K.getGripSpace()},this.getHand=function(X){let K=v[X];return K===void 0&&(K=new Sa,v[X]=K),K.getHandSpace()};function W(X){const K=y.indexOf(X.inputSource);if(K===-1)return;const le=v[K];le!==void 0&&(le.update(X.inputSource,X.frame,l||a),le.dispatchEvent({type:X.type,data:X.inputSource}))}function N(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",C);for(let X=0;X<v.length;X++){const K=y[X];K!==null&&(y[X]=null,v[X].disconnect(K))}T=null,G=null,e.setRenderTarget(p),m=null,d=null,h=null,r=null,u=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",N),r.addEventListener("inputsourceschange",C),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new Zi(m.framebufferWidth,m.framebufferHeight,{format:In,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,le=null,Me=null;_.depth&&(Me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?Hr:qi,le=_.stencil?ji:yi);const ye={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(ye),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),u=new Zi(d.textureWidth,d.textureHeight,{format:In,type:Ri,depthTexture:new Vh(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const ke=e.properties.get(u);ke.__ignoreDepthValues=d.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function C(X){for(let K=0;K<X.removed.length;K++){const le=X.removed[K],Me=y.indexOf(le);Me>=0&&(y[Me]=null,v[Me].disconnect(le))}for(let K=0;K<X.added.length;K++){const le=X.added[K];let Me=y.indexOf(le);if(Me===-1){for(let ke=0;ke<v.length;ke++)if(ke>=y.length){y.push(le),Me=ke;break}else if(y[ke]===null){y[ke]=le,Me=ke;break}if(Me===-1)break}const ye=v[Me];ye&&ye.connect(le)}}const I=new D,V=new D;function $(X,K,le){I.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(le.matrixWorld);const Me=I.distanceTo(V),ye=K.projectionMatrix.elements,ke=le.projectionMatrix.elements,Fe=ye[14]/(ye[10]-1),we=ye[14]/(ye[10]+1),Je=(ye[9]+1)/ye[5],k=(ye[9]-1)/ye[5],Yt=(ye[8]-1)/ye[0],Ee=(ke[8]+1)/ke[0],Ue=Fe*Yt,ge=Fe*Ee,pt=Me/(-Yt+Ee),He=pt*-Yt;K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(He),X.translateZ(pt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const A=Fe+pt,M=we+pt,z=Ue-He,Q=ge+(Me-He),Z=Je*we/M*A,ee=k*we/M*A;X.projectionMatrix.makePerspective(z,Q,Z,ee,A,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function j(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;b.near=w.near=R.near=X.near,b.far=w.far=R.far=X.far,(T!==b.near||G!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),T=b.near,G=b.far);const K=X.parent,le=b.cameras;j(b,K);for(let Me=0;Me<le.length;Me++)j(le[Me],K);le.length===2?$(b,R,w):b.projectionMatrix.copy(R.projectionMatrix),q(X,b,K)};function q(X,K,le){le===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(le.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ha*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)};let Y=null;function te(X,K){if(f=K.getViewerPose(l||a),x=K,f!==null){const le=f.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let Me=!1;le.length!==b.cameras.length&&(b.cameras.length=0,Me=!0);for(let ye=0;ye<le.length;ye++){const ke=le[ye];let Fe=null;if(m!==null)Fe=m.getViewport(ke);else{const Je=h.getViewSubImage(d,ke);Fe=Je.viewport,ye===0&&(e.setRenderTargetTextures(u,Je.colorTexture,d.ignoreDepthValues?void 0:Je.depthStencilTexture),e.setRenderTarget(u))}let we=F[ye];we===void 0&&(we=new Sn,we.layers.enable(ye),we.viewport=new kt,F[ye]=we),we.matrix.fromArray(ke.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(ke.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),ye===0&&(b.matrix.copy(we.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Me===!0&&b.cameras.push(we)}}for(let le=0;le<v.length;le++){const Me=y[le],ye=v[le];Me!==null&&ye!==void 0&&ye.update(Me,K,l||a)}Y&&Y(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const ie=new Hh;ie.setAnimationLoop(te),this.setAnimationLoop=function(X){Y=X},this.dispose=function(){}}}function Xx(n,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,Fh(n)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,v,y,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),h(p,u)):u.isMeshPhongMaterial?(s(p,u),f(p,u)):u.isMeshStandardMaterial?(s(p,u),d(p,u),u.isMeshPhysicalMaterial&&m(p,u,S)):u.isMeshMatcapMaterial?(s(p,u),x(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),_(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,v,y):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===cn&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===cn&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*y,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,v,y){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*v,p.scale.value=y*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function f(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function h(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function d(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,v){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===cn&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const v=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function jx(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,y){const S=y.program;i.uniformBlockBinding(v,S)}function l(v,y){let S=r[v.id];S===void 0&&(x(v),S=f(v),r[v.id]=S,v.addEventListener("dispose",p));const P=y.program;i.updateUBOMapping(v,P);const R=e.render.frame;s[v.id]!==R&&(d(v),s[v.id]=R)}function f(v){const y=h();v.__bindingPointIndex=y;const S=n.createBuffer(),P=v.__size,R=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,P,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,S),S}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=r[v.id],S=v.uniforms,P=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let R=0,w=S.length;R<w;R++){const F=Array.isArray(S[R])?S[R]:[S[R]];for(let b=0,T=F.length;b<T;b++){const G=F[b];if(m(G,R,b,P)===!0){const W=G.__offset,N=Array.isArray(G.value)?G.value:[G.value];let C=0;for(let I=0;I<N.length;I++){const V=N[I],$=_(V);typeof V=="number"||typeof V=="boolean"?(G.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,W+C,G.__data)):V.isMatrix3?(G.__data[0]=V.elements[0],G.__data[1]=V.elements[1],G.__data[2]=V.elements[2],G.__data[3]=0,G.__data[4]=V.elements[3],G.__data[5]=V.elements[4],G.__data[6]=V.elements[5],G.__data[7]=0,G.__data[8]=V.elements[6],G.__data[9]=V.elements[7],G.__data[10]=V.elements[8],G.__data[11]=0):(V.toArray(G.__data,C),C+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,G.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(v,y,S,P){const R=v.value,w=y+"_"+S;if(P[w]===void 0)return typeof R=="number"||typeof R=="boolean"?P[w]=R:P[w]=R.clone(),!0;{const F=P[w];if(typeof R=="number"||typeof R=="boolean"){if(F!==R)return P[w]=R,!0}else if(F.equals(R)===!1)return F.copy(R),!0}return!1}function x(v){const y=v.uniforms;let S=0;const P=16;for(let w=0,F=y.length;w<F;w++){const b=Array.isArray(y[w])?y[w]:[y[w]];for(let T=0,G=b.length;T<G;T++){const W=b[T],N=Array.isArray(W.value)?W.value:[W.value];for(let C=0,I=N.length;C<I;C++){const V=N[C],$=_(V),j=S%P;j!==0&&P-j<$.boundary&&(S+=P-j),W.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=$.storage}}}const R=S%P;return R>0&&(S+=P-R),v.__size=S,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){const y=v.target;y.removeEventListener("dispose",p);const S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function u(){for(const v in r)n.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:u}}class Yh{constructor(e={}){const{canvas:t=Hp(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),x=new Int32Array(4);let _=null,p=null;const u=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this._useLegacyLights=!1,this.toneMapping=Ci,this.toneMappingExposure=1;const y=this;let S=!1,P=0,R=0,w=null,F=-1,b=null;const T=new kt,G=new kt;let W=null;const N=new Ce(0);let C=0,I=t.width,V=t.height,$=1,j=null,q=null;const Y=new kt(0,0,I,V),te=new kt(0,0,I,V);let ie=!1;const X=new bc;let K=!1,le=!1,Me=null;const ye=new Ke,ke=new qe,Fe=new D,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Je(){return w===null?$:1}let k=i;function Yt(E,U){for(let B=0;B<E.length;B++){const H=E[B],O=t.getContext(H,U);if(O!==null)return O}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vc}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",oe,!1),k===null){const U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),k=Yt(U,E),k===null)throw Yt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ee,Ue,ge,pt,He,A,M,z,Q,Z,ee,xe,ce,ue,Re,Ge,J,tt,$e,De,be,pe,ze,Ze;function xt(){Ee=new n_(k),Ue=new K0(k,Ee,e),Ee.init(Ue),pe=new Hx(k,Ee,Ue),ge=new zx(k,Ee,Ue),pt=new s_(k),He=new Tx,A=new Bx(k,Ee,ge,He,Ue,pe,pt),M=new Z0(y),z=new t_(y),Q=new um(k,Ue),ze=new $0(k,Ee,Q,Ue),Z=new i_(k,Q,pt,ze),ee=new l_(k,Z,Q,pt),$e=new c_(k,Ue,A),Ge=new J0(He),xe=new Ex(y,M,z,Ee,Ue,ze,Ge),ce=new Xx(y,He),ue=new Cx,Re=new Ix(Ee,Ue),tt=new q0(y,M,z,ge,ee,d,c),J=new Fx(y,ee,Ue),Ze=new jx(k,pt,Ue,ge),De=new Y0(k,Ee,pt,Ue),be=new r_(k,Ee,pt,Ue),pt.programs=xe.programs,y.capabilities=Ue,y.extensions=Ee,y.properties=He,y.renderLists=ue,y.shadowMap=J,y.state=ge,y.info=pt}xt();const We=new Wx(y,k);this.xr=We,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const E=Ee.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ee.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(E){E!==void 0&&($=E,this.setSize(I,V,!1))},this.getSize=function(E){return E.set(I,V)},this.setSize=function(E,U,B=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=E,V=U,t.width=Math.floor(E*$),t.height=Math.floor(U*$),B===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(I*$,V*$).floor()},this.setDrawingBufferSize=function(E,U,B){I=E,V=U,$=B,t.width=Math.floor(E*B),t.height=Math.floor(U*B),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(T)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,U,B,H){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,U,B,H),ge.viewport(T.copy(Y).multiplyScalar($).floor())},this.getScissor=function(E){return E.copy(te)},this.setScissor=function(E,U,B,H){E.isVector4?te.set(E.x,E.y,E.z,E.w):te.set(E,U,B,H),ge.scissor(G.copy(te).multiplyScalar($).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(E){ge.setScissorTest(ie=E)},this.setOpaqueSort=function(E){j=E},this.setTransparentSort=function(E){q=E},this.getClearColor=function(E){return E.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(E=!0,U=!0,B=!0){let H=0;if(E){let O=!1;if(w!==null){const he=w.texture.format;O=he===Ah||he===Th||he===Eh}if(O){const he=w.texture.type,ve=he===Ri||he===yi||he===yc||he===ji||he===Sh||he===bh,Ae=tt.getClearColor(),Le=tt.getClearAlpha(),Ve=Ae.r,Ne=Ae.g,Oe=Ae.b;ve?(m[0]=Ve,m[1]=Ne,m[2]=Oe,m[3]=Le,k.clearBufferuiv(k.COLOR,0,m)):(x[0]=Ve,x[1]=Ne,x[2]=Oe,x[3]=Le,k.clearBufferiv(k.COLOR,0,x))}else H|=k.COLOR_BUFFER_BIT}U&&(H|=k.DEPTH_BUFFER_BIT),B&&(H|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),ue.dispose(),Re.dispose(),He.dispose(),M.dispose(),z.dispose(),ee.dispose(),ze.dispose(),Ze.dispose(),xe.dispose(),We.dispose(),We.removeEventListener("sessionstart",Kt),We.removeEventListener("sessionend",st),Me&&(Me.dispose(),Me=null),Jt.stop()};function re(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=pt.autoReset,U=J.enabled,B=J.autoUpdate,H=J.needsUpdate,O=J.type;xt(),pt.autoReset=E,J.enabled=U,J.autoUpdate=B,J.needsUpdate=H,J.type=O}function oe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ae(E){const U=E.target;U.removeEventListener("dispose",ae),Pe(U)}function Pe(E){Te(E),He.remove(E)}function Te(E){const U=He.get(E).programs;U!==void 0&&(U.forEach(function(B){xe.releaseProgram(B)}),E.isShaderMaterial&&xe.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,B,H,O,he){U===null&&(U=we);const ve=O.isMesh&&O.matrixWorld.determinant()<0,Ae=du(E,U,B,H,O);ge.setMaterial(H,ve);let Le=B.index,Ve=1;if(H.wireframe===!0){if(Le=Z.getWireframeAttribute(B),Le===void 0)return;Ve=2}const Ne=B.drawRange,Oe=B.attributes.position;let St=Ne.start*Ve,fn=(Ne.start+Ne.count)*Ve;he!==null&&(St=Math.max(St,he.start*Ve),fn=Math.min(fn,(he.start+he.count)*Ve)),Le!==null?(St=Math.max(St,0),fn=Math.min(fn,Le.count)):Oe!=null&&(St=Math.max(St,0),fn=Math.min(fn,Oe.count));const Lt=fn-St;if(Lt<0||Lt===1/0)return;ze.setup(O,H,Ae,B,Le);let Xn,mt=De;if(Le!==null&&(Xn=Q.get(Le),mt=be,mt.setIndex(Xn)),O.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*Je()),mt.setMode(k.LINES)):mt.setMode(k.TRIANGLES);else if(O.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),ge.setLineWidth(Xe*Je()),O.isLineSegments?mt.setMode(k.LINES):O.isLineLoop?mt.setMode(k.LINE_LOOP):mt.setMode(k.LINE_STRIP)}else O.isPoints?mt.setMode(k.POINTS):O.isSprite&&mt.setMode(k.TRIANGLES);if(O.isBatchedMesh)mt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)mt.renderInstances(St,Lt,O.count);else if(B.isInstancedBufferGeometry){const Xe=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ho=Math.min(B.instanceCount,Xe);mt.renderInstances(St,Lt,Ho)}else mt.render(St,Lt)};function it(E,U,B){E.transparent===!0&&E.side===Wt&&E.forceSinglePass===!1?(E.side=cn,E.needsUpdate=!0,ws(E,U,B),E.side=Pi,E.needsUpdate=!0,ws(E,U,B),E.side=Wt):ws(E,U,B)}this.compile=function(E,U,B=null){B===null&&(B=E),p=Re.get(B),p.init(),v.push(p),B.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==B&&E.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(y._useLegacyLights);const H=new Set;return E.traverse(function(O){const he=O.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const Ae=he[ve];it(Ae,B,O),H.add(Ae)}else it(he,B,O),H.add(he)}),v.pop(),p=null,H},this.compileAsync=function(E,U,B=null){const H=this.compile(E,U,B);return new Promise(O=>{function he(){if(H.forEach(function(ve){He.get(ve).currentProgram.isReady()&&H.delete(ve)}),H.size===0){O(E);return}setTimeout(he,10)}Ee.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let rt=null;function Pt(E){rt&&rt(E)}function Kt(){Jt.stop()}function st(){Jt.start()}const Jt=new Hh;Jt.setAnimationLoop(Pt),typeof self!="undefined"&&Jt.setContext(self),this.setAnimationLoop=function(E){rt=E,We.setAnimationLoop(E),E===null?Jt.stop():Jt.start()},We.addEventListener("sessionstart",Kt),We.addEventListener("sessionend",st),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(U),U=We.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,w),p=Re.get(E,v.length),p.init(),v.push(p),ye.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(ye),le=this.localClippingEnabled,K=Ge.init(this.clippingPlanes,le),_=ue.get(E,u.length),_.init(),u.push(_),On(E,U,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(j,q),this.info.render.frame++,K===!0&&Ge.beginShadows();const B=p.state.shadowsArray;if(J.render(B,E,U),K===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),tt.render(_,E),p.setupLights(y._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let O=0,he=H.length;O<he;O++){const ve=H[O];zc(_,E,ve,ve.viewport)}}else zc(_,E,U);w!==null&&(A.updateMultisampleRenderTarget(w),A.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(y,E,U),ze.resetDefaultState(),F=-1,b=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function On(E,U,B,H){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||X.intersectsSprite(E)){H&&Fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ye);const ve=ee.update(E),Ae=E.material;Ae.visible&&_.push(E,ve,Ae,B,Fe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||X.intersectsObject(E))){const ve=ee.update(E),Ae=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Fe.copy(E.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Fe.copy(ve.boundingSphere.center)),Fe.applyMatrix4(E.matrixWorld).applyMatrix4(ye)),Array.isArray(Ae)){const Le=ve.groups;for(let Ve=0,Ne=Le.length;Ve<Ne;Ve++){const Oe=Le[Ve],St=Ae[Oe.materialIndex];St&&St.visible&&_.push(E,ve,St,B,Fe.z,Oe)}}else Ae.visible&&_.push(E,ve,Ae,B,Fe.z,null)}}const he=E.children;for(let ve=0,Ae=he.length;ve<Ae;ve++)On(he[ve],U,B,H)}function zc(E,U,B,H){const O=E.opaque,he=E.transmissive,ve=E.transparent;p.setupLightsView(B),K===!0&&Ge.setGlobalState(y.clippingPlanes,B),he.length>0&&hu(O,he,U,B),H&&ge.viewport(T.copy(H)),O.length>0&&Rs(O,U,B),he.length>0&&Rs(he,U,B),ve.length>0&&Rs(ve,U,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function hu(E,U,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const he=Ue.isWebGL2;Me===null&&(Me=new Zi(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?_s:Ri,minFilter:gs,samples:he?4:0})),y.getDrawingBufferSize(ke),he?Me.setSize(ke.x,ke.y):Me.setSize(Ga(ke.x),Ga(ke.y));const ve=y.getRenderTarget();y.setRenderTarget(Me),y.getClearColor(N),C=y.getClearAlpha(),C<1&&y.setClearColor(16777215,.5),y.clear();const Ae=y.toneMapping;y.toneMapping=Ci,Rs(E,B,H),A.updateMultisampleRenderTarget(Me),A.updateRenderTargetMipmap(Me);let Le=!1;for(let Ve=0,Ne=U.length;Ve<Ne;Ve++){const Oe=U[Ve],St=Oe.object,fn=Oe.geometry,Lt=Oe.material,Xn=Oe.group;if(Lt.side===Wt&&St.layers.test(H.layers)){const mt=Lt.side;Lt.side=cn,Lt.needsUpdate=!0,Bc(St,B,H,fn,Lt,Xn),Lt.side=mt,Lt.needsUpdate=!0,Le=!0}}Le===!0&&(A.updateMultisampleRenderTarget(Me),A.updateRenderTargetMipmap(Me)),y.setRenderTarget(ve),y.setClearColor(N,C),y.toneMapping=Ae}function Rs(E,U,B){const H=U.isScene===!0?U.overrideMaterial:null;for(let O=0,he=E.length;O<he;O++){const ve=E[O],Ae=ve.object,Le=ve.geometry,Ve=H===null?ve.material:H,Ne=ve.group;Ae.layers.test(B.layers)&&Bc(Ae,U,B,Le,Ve,Ne)}}function Bc(E,U,B,H,O,he){E.onBeforeRender(y,U,B,H,O,he),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(y,U,B,H,E,he),O.transparent===!0&&O.side===Wt&&O.forceSinglePass===!1?(O.side=cn,O.needsUpdate=!0,y.renderBufferDirect(B,U,H,O,E,he),O.side=Pi,O.needsUpdate=!0,y.renderBufferDirect(B,U,H,O,E,he),O.side=Wt):y.renderBufferDirect(B,U,H,O,E,he),E.onAfterRender(y,U,B,H,O,he)}function ws(E,U,B){U.isScene!==!0&&(U=we);const H=He.get(E),O=p.state.lights,he=p.state.shadowsArray,ve=O.state.version,Ae=xe.getParameters(E,O.state,he,U,B),Le=xe.getProgramCacheKey(Ae);let Ve=H.programs;H.environment=E.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(E.isMeshStandardMaterial?z:M).get(E.envMap||H.environment),Ve===void 0&&(E.addEventListener("dispose",ae),Ve=new Map,H.programs=Ve);let Ne=Ve.get(Le);if(Ne!==void 0){if(H.currentProgram===Ne&&H.lightsStateVersion===ve)return Gc(E,Ae),Ne}else Ae.uniforms=xe.getUniforms(E),E.onBuild(B,Ae,y),E.onBeforeCompile(Ae,y),Ne=xe.acquireProgram(Ae,Le),Ve.set(Le,Ne),H.uniforms=Ae.uniforms;const Oe=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Oe.clippingPlanes=Ge.uniform),Gc(E,Ae),H.needsLights=pu(E),H.lightsStateVersion=ve,H.needsLights&&(Oe.ambientLightColor.value=O.state.ambient,Oe.lightProbe.value=O.state.probe,Oe.directionalLights.value=O.state.directional,Oe.directionalLightShadows.value=O.state.directionalShadow,Oe.spotLights.value=O.state.spot,Oe.spotLightShadows.value=O.state.spotShadow,Oe.rectAreaLights.value=O.state.rectArea,Oe.ltc_1.value=O.state.rectAreaLTC1,Oe.ltc_2.value=O.state.rectAreaLTC2,Oe.pointLights.value=O.state.point,Oe.pointLightShadows.value=O.state.pointShadow,Oe.hemisphereLights.value=O.state.hemi,Oe.directionalShadowMap.value=O.state.directionalShadowMap,Oe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Oe.spotShadowMap.value=O.state.spotShadowMap,Oe.spotLightMatrix.value=O.state.spotLightMatrix,Oe.spotLightMap.value=O.state.spotLightMap,Oe.pointShadowMap.value=O.state.pointShadowMap,Oe.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Ne,H.uniformsList=null,Ne}function Hc(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=to.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Gc(E,U){const B=He.get(E);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function du(E,U,B,H,O){U.isScene!==!0&&(U=we),A.resetTextureUnits();const he=U.fog,ve=H.isMeshStandardMaterial?U.environment:null,Ae=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Vn,Le=(H.isMeshStandardMaterial?z:M).get(H.envMap||ve),Ve=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Oe=!!B.morphAttributes.position,St=!!B.morphAttributes.normal,fn=!!B.morphAttributes.color;let Lt=Ci;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Lt=y.toneMapping);const Xn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,mt=Xn!==void 0?Xn.length:0,Xe=He.get(H),Ho=p.state.lights;if(K===!0&&(le===!0||E!==b)){const _n=E===b&&H.id===F;Ge.setState(H,E,_n)}let vt=!1;H.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Ho.state.version||Xe.outputColorSpace!==Ae||O.isBatchedMesh&&Xe.batching===!1||!O.isBatchedMesh&&Xe.batching===!0||O.isInstancedMesh&&Xe.instancing===!1||!O.isInstancedMesh&&Xe.instancing===!0||O.isSkinnedMesh&&Xe.skinning===!1||!O.isSkinnedMesh&&Xe.skinning===!0||O.isInstancedMesh&&Xe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Xe.instancingColor===!1&&O.instanceColor!==null||Xe.envMap!==Le||H.fog===!0&&Xe.fog!==he||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==Ge.numPlanes||Xe.numIntersection!==Ge.numIntersection)||Xe.vertexAlphas!==Ve||Xe.vertexTangents!==Ne||Xe.morphTargets!==Oe||Xe.morphNormals!==St||Xe.morphColors!==fn||Xe.toneMapping!==Lt||Ue.isWebGL2===!0&&Xe.morphTargetsCount!==mt)&&(vt=!0):(vt=!0,Xe.__version=H.version);let Li=Xe.currentProgram;vt===!0&&(Li=ws(H,U,O));let Vc=!1,Jr=!1,Go=!1;const Ht=Li.getUniforms(),Di=Xe.uniforms;if(ge.useProgram(Li.program)&&(Vc=!0,Jr=!0,Go=!0),H.id!==F&&(F=H.id,Jr=!0),Vc||b!==E){Ht.setValue(k,"projectionMatrix",E.projectionMatrix),Ht.setValue(k,"viewMatrix",E.matrixWorldInverse);const _n=Ht.map.cameraPosition;_n!==void 0&&_n.setValue(k,Fe.setFromMatrixPosition(E.matrixWorld)),Ue.logarithmicDepthBuffer&&Ht.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ht.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,Jr=!0,Go=!0)}if(O.isSkinnedMesh){Ht.setOptional(k,O,"bindMatrix"),Ht.setOptional(k,O,"bindMatrixInverse");const _n=O.skeleton;_n&&(Ue.floatVertexTextures?(_n.boneTexture===null&&_n.computeBoneTexture(),Ht.setValue(k,"boneTexture",_n.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Ht.setOptional(k,O,"batchingTexture"),Ht.setValue(k,"batchingTexture",O._matricesTexture,A));const Vo=B.morphAttributes;if((Vo.position!==void 0||Vo.normal!==void 0||Vo.color!==void 0&&Ue.isWebGL2===!0)&&$e.update(O,B,Li),(Jr||Xe.receiveShadow!==O.receiveShadow)&&(Xe.receiveShadow=O.receiveShadow,Ht.setValue(k,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Di.envMap.value=Le,Di.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),Jr&&(Ht.setValue(k,"toneMappingExposure",y.toneMappingExposure),Xe.needsLights&&uu(Di,Go),he&&H.fog===!0&&ce.refreshFogUniforms(Di,he),ce.refreshMaterialUniforms(Di,H,$,V,Me),to.upload(k,Hc(Xe),Di,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(to.upload(k,Hc(Xe),Di,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ht.setValue(k,"center",O.center),Ht.setValue(k,"modelViewMatrix",O.modelViewMatrix),Ht.setValue(k,"normalMatrix",O.normalMatrix),Ht.setValue(k,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const _n=H.uniformsGroups;for(let Wo=0,mu=_n.length;Wo<mu;Wo++)if(Ue.isWebGL2){const Wc=_n[Wo];Ze.update(Wc,Li),Ze.bind(Wc,Li)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Li}function uu(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function pu(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,U,B){He.get(E.texture).__webglTexture=U,He.get(E.depthTexture).__webglTexture=B;const H=He.get(E);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,U){const B=He.get(E);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,B=0){w=E,P=U,R=B;let H=!0,O=null,he=!1,ve=!1;if(E){const Le=He.get(E);Le.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(k.FRAMEBUFFER,null),H=!1):Le.__webglFramebuffer===void 0?A.setupRenderTarget(E):Le.__hasExternalTextures&&A.rebindTextures(E,He.get(E.texture).__webglTexture,He.get(E.depthTexture).__webglTexture);const Ve=E.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ve=!0);const Ne=He.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?O=Ne[U][B]:O=Ne[U],he=!0):Ue.isWebGL2&&E.samples>0&&A.useMultisampledRTT(E)===!1?O=He.get(E).__webglMultisampledFramebuffer:Array.isArray(Ne)?O=Ne[B]:O=Ne,T.copy(E.viewport),G.copy(E.scissor),W=E.scissorTest}else T.copy(Y).multiplyScalar($).floor(),G.copy(te).multiplyScalar($).floor(),W=ie;if(ge.bindFramebuffer(k.FRAMEBUFFER,O)&&Ue.drawBuffers&&H&&ge.drawBuffers(E,O),ge.viewport(T),ge.scissor(G),ge.setScissorTest(W),he){const Le=He.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,Le.__webglTexture,B)}else if(ve){const Le=He.get(E.texture),Ve=U||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Le.__webglTexture,B||0,Ve)}F=-1},this.readRenderTargetPixels=function(E,U,B,H,O,he,ve){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=He.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ve!==void 0&&(Ae=Ae[ve]),Ae){ge.bindFramebuffer(k.FRAMEBUFFER,Ae);try{const Le=E.texture,Ve=Le.format,Ne=Le.type;if(Ve!==In&&pe.convert(Ve)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=Ne===_s&&(Ee.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==Ri&&pe.convert(Ne)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Mi&&(Ue.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-H&&B>=0&&B<=E.height-O&&k.readPixels(U,B,H,O,pe.convert(Ve),pe.convert(Ne),he)}finally{const Le=w!==null?He.get(w).__webglFramebuffer:null;ge.bindFramebuffer(k.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(E,U,B=0){const H=Math.pow(2,-B),O=Math.floor(U.image.width*H),he=Math.floor(U.image.height*H);A.setTexture2D(U,0),k.copyTexSubImage2D(k.TEXTURE_2D,B,0,0,E.x,E.y,O,he),ge.unbindTexture()},this.copyTextureToTexture=function(E,U,B,H=0){const O=U.image.width,he=U.image.height,ve=pe.convert(B.format),Ae=pe.convert(B.type);A.setTexture2D(B,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment),U.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,H,E.x,E.y,O,he,ve,Ae,U.image.data):U.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,H,E.x,E.y,U.mipmaps[0].width,U.mipmaps[0].height,ve,U.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,H,E.x,E.y,ve,Ae,U.image),H===0&&B.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(E,U,B,H,O=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=E.max.x-E.min.x+1,ve=E.max.y-E.min.y+1,Ae=E.max.z-E.min.z+1,Le=pe.convert(H.format),Ve=pe.convert(H.type);let Ne;if(H.isData3DTexture)A.setTexture3D(H,0),Ne=k.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)A.setTexture2DArray(H,0),Ne=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const Oe=k.getParameter(k.UNPACK_ROW_LENGTH),St=k.getParameter(k.UNPACK_IMAGE_HEIGHT),fn=k.getParameter(k.UNPACK_SKIP_PIXELS),Lt=k.getParameter(k.UNPACK_SKIP_ROWS),Xn=k.getParameter(k.UNPACK_SKIP_IMAGES),mt=B.isCompressedTexture?B.mipmaps[O]:B.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,mt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,mt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,E.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,E.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,E.min.z),B.isDataTexture||B.isData3DTexture?k.texSubImage3D(Ne,O,U.x,U.y,U.z,he,ve,Ae,Le,Ve,mt.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Ne,O,U.x,U.y,U.z,he,ve,Ae,Le,mt.data)):k.texSubImage3D(Ne,O,U.x,U.y,U.z,he,ve,Ae,Le,Ve,mt),k.pixelStorei(k.UNPACK_ROW_LENGTH,Oe),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,St),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Lt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Xn),O===0&&H.generateMipmaps&&k.generateMipmap(Ne),ge.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ge.unbindTexture()},this.resetState=function(){P=0,R=0,w=null,ge.reset(),ze.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Sc?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===Po?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ft?$i:Rh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===$i?Ft:Vn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class qx extends Yh{}qx.prototype.isWebGL1Renderer=!0;class Tc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ce(e),this.near=t,this.far=i}clone(){return new Tc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class $x extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class xs extends Nn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const br=new Ke,mf=new Ke,Qs=[],gf=new nr,Yx=new Ke,rs=new dt,ss=new As;class Si extends dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xs(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Yx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,br),gf.copy(e.boundingBox).applyMatrix4(br),this.boundingBox.union(gf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new As),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,br),ss.copy(e.boundingSphere).applyMatrix4(br),this.boundingSphere.union(ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ss.copy(this.boundingSphere),ss.applyMatrix4(i),e.ray.intersectsSphere(ss)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,br),mf.multiplyMatrices(i,br),rs.matrixWorld=mf,rs.raycast(e,Qs);for(let a=0,o=Qs.length;a<o;a++){const c=Qs[a];c.instanceId=s,c.object=this,t.push(c)}Qs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xs(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Kh extends ln{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Do extends gn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new D,f=new qe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const m=i+h/t*r;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),f.x=(a[d]/e+1)/2,f.y=(a[d+1]/e+1)/2,c.push(f.x,f.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(o,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Do(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Tt extends gn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const f=[],h=[],d=[],m=[];let x=0;const _=[],p=i/2;let u=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(f),this.setAttribute("position",new lt(h,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(m,2));function v(){const S=new D,P=new D;let R=0;const w=(t-e)/i;for(let F=0;F<=s;F++){const b=[],T=F/s,G=T*(t-e)+e;for(let W=0;W<=r;W++){const N=W/r,C=N*c+o,I=Math.sin(C),V=Math.cos(C);P.x=G*I,P.y=-T*i+p,P.z=G*V,h.push(P.x,P.y,P.z),S.set(I,w,V).normalize(),d.push(S.x,S.y,S.z),m.push(N,1-T),b.push(x++)}_.push(b)}for(let F=0;F<r;F++)for(let b=0;b<s;b++){const T=_[b][F],G=_[b+1][F],W=_[b+1][F+1],N=_[b][F+1];f.push(T,G,N),f.push(G,W,N),R+=6}l.addGroup(u,R,0),u+=R}function y(S){const P=x,R=new qe,w=new D;let F=0;const b=S===!0?e:t,T=S===!0?1:-1;for(let W=1;W<=r;W++)h.push(0,p*T,0),d.push(0,T,0),m.push(.5,.5),x++;const G=x;for(let W=0;W<=r;W++){const C=W/r*c+o,I=Math.cos(C),V=Math.sin(C);w.x=b*V,w.y=p*T,w.z=b*I,h.push(w.x,w.y,w.z),d.push(0,T,0),R.x=I*.5+.5,R.y=V*.5*T+.5,m.push(R.x,R.y),x++}for(let W=0;W<r;W++){const N=P+W,C=G+W;S===!0?f.push(C,C+1,N):f.push(C+1,C,N),F+=3}l.addGroup(u,F,S===!0?1:2),u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vr extends Tt{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Vr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ac extends gn{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),l(i),f(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const y=new D,S=new D,P=new D;for(let R=0;R<t.length;R+=3)m(t[R+0],y),m(t[R+1],S),m(t[R+2],P),c(y,S,P,v)}function c(v,y,S,P){const R=P+1,w=[];for(let F=0;F<=R;F++){w[F]=[];const b=v.clone().lerp(S,F/R),T=y.clone().lerp(S,F/R),G=R-F;for(let W=0;W<=G;W++)W===0&&F===R?w[F][W]=b:w[F][W]=b.clone().lerp(T,W/G)}for(let F=0;F<R;F++)for(let b=0;b<2*(R-F)-1;b++){const T=Math.floor(b/2);b%2===0?(d(w[F][T+1]),d(w[F+1][T]),d(w[F][T])):(d(w[F][T+1]),d(w[F+1][T+1]),d(w[F+1][T]))}}function l(v){const y=new D;for(let S=0;S<s.length;S+=3)y.x=s[S+0],y.y=s[S+1],y.z=s[S+2],y.normalize().multiplyScalar(v),s[S+0]=y.x,s[S+1]=y.y,s[S+2]=y.z}function f(){const v=new D;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const S=p(v)/2/Math.PI+.5,P=u(v)/Math.PI+.5;a.push(S,1-P)}x(),h()}function h(){for(let v=0;v<a.length;v+=6){const y=a[v+0],S=a[v+2],P=a[v+4],R=Math.max(y,S,P),w=Math.min(y,S,P);R>.9&&w<.1&&(y<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),P<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function m(v,y){const S=v*3;y.x=e[S+0],y.y=e[S+1],y.z=e[S+2]}function x(){const v=new D,y=new D,S=new D,P=new D,R=new qe,w=new qe,F=new qe;for(let b=0,T=0;b<s.length;b+=9,T+=6){v.set(s[b+0],s[b+1],s[b+2]),y.set(s[b+3],s[b+4],s[b+5]),S.set(s[b+6],s[b+7],s[b+8]),R.set(a[T+0],a[T+1]),w.set(a[T+2],a[T+3]),F.set(a[T+4],a[T+5]),P.copy(v).add(y).add(S).divideScalar(3);const G=p(P);_(R,T+0,v,G),_(w,T+2,y,G),_(F,T+4,S,G)}}function _(v,y,S,P){P<0&&v.x===1&&(a[y]=v.x-1),S.x===0&&S.z===0&&(a[y]=P/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.vertices,e.indices,e.radius,e.details)}}class _o extends Ac{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _o(e.radius,e.detail)}}class Io extends gn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],f=[];let h=e;const d=(t-e)/r,m=new D,x=new qe;for(let _=0;_<=r;_++){for(let p=0;p<=i;p++){const u=s+p/i*a;m.x=h*Math.cos(u),m.y=h*Math.sin(u),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,f.push(x.x,x.y)}h+=d}for(let _=0;_<r;_++){const p=_*(i+1);for(let u=0;u<i;u++){const v=u+p,y=v,S=v+i+1,P=v+i+2,R=v+1;o.push(y,S,R),o.push(S,P,R)}}this.setIndex(o),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class bi extends gn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const f=[],h=new D,d=new D,m=[],x=[],_=[],p=[];for(let u=0;u<=i;u++){const v=[],y=u/i;let S=0;u===0&&a===0?S=.5/t:u===i&&c===Math.PI&&(S=-.5/t);for(let P=0;P<=t;P++){const R=P/t;h.x=-e*Math.cos(r+R*s)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(r+R*s)*Math.sin(a+y*o),x.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),p.push(R+S,1-y),v.push(l++)}f.push(v)}for(let u=0;u<i;u++)for(let v=0;v<t;v++){const y=f[u][v+1],S=f[u][v],P=f[u+1][v],R=f[u+1][v+1];(u!==0||a>0)&&m.push(y,S,R),(u!==i-1||c<Math.PI)&&m.push(S,P,R)}this.setIndex(m),this.setAttribute("position",new lt(x,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Cc extends gn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],l=[],f=new D,h=new D,d=new D;for(let m=0;m<=i;m++)for(let x=0;x<=r;x++){const _=x/r*s,p=m/i*Math.PI*2;h.x=(e+t*Math.cos(p))*Math.cos(_),h.y=(e+t*Math.cos(p))*Math.sin(_),h.z=t*Math.sin(p),o.push(h.x,h.y,h.z),f.x=e*Math.cos(_),f.y=e*Math.sin(_),d.subVectors(h,f).normalize(),c.push(d.x,d.y,d.z),l.push(x/r),l.push(m/i)}for(let m=1;m<=i;m++)for(let x=1;x<=r;x++){const _=(r+1)*m+x-1,p=(r+1)*(m-1)+x-1,u=(r+1)*(m-1)+x,v=(r+1)*m+x;a.push(_,p,v),a.push(p,u,v)}this.setIndex(a),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class _f extends Yr{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ce(16777215),this.specular=new Ce(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gt extends Yr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jh extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Kx extends Jh{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ba=new Ke,xf=new D,vf=new D;class Jx{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bc,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;xf.setFromMatrixPosition(e.matrixWorld),t.position.copy(xf),vf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vf),t.updateMatrixWorld(),ba.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ba),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ba)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Zx extends Jx{constructor(){super(new Gh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qx extends Jh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new Zx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vc}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vc);const Zh={low:{name:"Low",pixelRatio:1,antialias:!1,particles:120,splats:30,fogScale:.8},medium:{name:"Medium",pixelRatio:1.35,antialias:!0,particles:260,splats:60,fogScale:1},high:{name:"High",pixelRatio:2,antialias:!0,particles:420,splats:90,fogScale:1}},yf=["low","medium","high"];function ev(){try{return localStorage.getItem("rally-quality")||"auto"}catch{return"auto"}}function tv(n){try{localStorage.setItem("rally-quality",n)}catch{}}function nv(){let n="";try{const r=document.createElement("canvas"),s=r.getContext("webgl"),a=s&&s.getExtension("WEBGL_debug_renderer_info");n=a?String(s.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{}const e=navigator.hardwareConcurrency||4,t=navigator.deviceMemory||4,i=matchMedia("(pointer: coarse)").matches;return/SwiftShader|llvmpipe|Mali-4|Mali-T|Adreno \(TM\) [3-5]\d\d|PowerVR/i.test(n)||t<=2||e<=2?"low":i?t<=3||e<=4?"low":"medium":"high"}const _t={setting:ev(),detected:nv(),level:"medium",stepped:!1,get cfg(){return Zh[this.level]}};_t.level=_t.setting==="auto"?_t.detected:_t.setting;function iv(){const n=yf.indexOf(_t.level);return n<=0?null:(_t.level=yf[n-1],_t.stepped=!0,_t.level)}et.enabled=!1;const rv=document.getElementById("gl"),er=new Yh({canvas:rv,antialias:_t.cfg.antialias,powerPreference:"high-performance"});er.outputColorSpace=Vn;const At=new $x;At.background=new Ce(14472902);At.fog=new Tc(14472902,70,190);const ht=new Sn(60,1,.1,400);At.add(new Kx(16774112,7232068,.72*Math.PI));const Qh=new Qx(16773336,.6*Math.PI);Qh.position.set(40,80,20);At.add(Qh);const ct={W:0,H:0,DPR:1};function ed(){er.setPixelRatio(Math.min(window.devicePixelRatio||1,_t.cfg.pixelRatio))}function sv(){ct.W=innerWidth,ct.H=innerHeight,ct.DPR=Math.min(window.devicePixelRatio||1,2),ed(),er.setSize(ct.W,ct.H,!1),ht.aspect=ct.W/ct.H,ht.fov=ct.W<ct.H?78:60,ht.updateProjectionMatrix()}function ov(n){At.background.set(n.sky),At.fog.color.set(n.sky),At.fog.near=n.fog[0]*_t.cfg.fogScale,At.fog.far=n.fog[1]*_t.cfg.fogScale}let en=null,Wa=[],ni=null;const _i=new gt({color:10131087}),Xa=new gt({color:7631211}),ja=new gt({color:2760986}),av=new gt({color:16183520,side:Wt}),cv=new gt({color:16764730,side:Wt}),Mf=me.map(n=>new gt({color:n.hex,side:Wt}));function lv(n){n.traverse(e=>{e.geometry&&e.geometry.dispose()}),At.remove(n)}function td(n){en&&lv(en),ni&&At.remove(ni.banner),en=new Un,At.add(en),Wa=[],ni=null;const e=g.map;ov(e);const t=new En(420,420,110,110);t.rotateX(-Math.PI/2);const i=t.attributes.position,r=[],s=new Ce(e.g1),a=new Ce(e.g2),o=new Ce(e.g3),c=new Ce(8022604);for(let p=0;p<i.count;p++){const u=i.getX(p),v=i.getZ(p),y=Math.hypot(u,v);i.setY(p,Mu(u,v));const S=(Math.sin(u*.11+v*.07)+1)/2,P=s.clone().lerp(a,S*.8);y>92&&P.lerp(o,Math.min(1,(y-92)/40)),e.id==="river"&&Math.abs(v)<6.5&&Math.hypot(u,v)>=7.5&&P.lerp(c,.6),r.push(P.r,P.g,P.b)}t.setAttribute("color",new lt(r,3)),t.computeVertexNormals(),en.add(new dt(t,new gt({vertexColors:!0})));const l=new gt({color:e.hill});for(const p of n.hills){const u=new dt(new bi(p.rad,10,6),l);u.scale.y=p.sy,u.position.set(Math.cos(p.a)*p.d,-3,Math.sin(p.a)*p.d),en.add(u)}const f=new Ke,h=new Wn,d=new D,m=new D(0,1,0),x=new D;if(n.palisades.length){const p=n.palisades.flatMap(v=>v.logs),u=new Si(new Tt(.32,.36,3.2,7),new gt({color:4863270}),p.length);p.forEach((v,y)=>{h.setFromAxisAngle(m,v.rot),d.set(1,v.sy,1),f.compose(x.set(v.x,1.5*v.sy,v.z),h,d),u.setMatrixAt(y,f)}),en.add(u)}if(e.id==="river"){const p=new dt(new En(420,10.4),new gt({color:4161446,transparent:!0,opacity:.82}));p.rotation.x=-Math.PI/2,p.position.y=-.18,en.add(p);const u=new gt({color:7031342}),v=new gt({color:4862752});for(const S of[-32,32]){const P=new dt(new bt(5,.3,14),u);P.position.set(S,.22,0),en.add(P);for(const R of[-2.4,2.4]){const w=new dt(new bt(.18,.9,14),v);w.position.set(S+R,.8,0),en.add(w)}}const y=new gt({color:10132372});for(const S of n.stones){const P=new dt(new _o(S.s),y);P.position.set(S.x,-.15,S.z),en.add(P)}}if(n.trees.length){const p=n.trees.length,u=new Si(new Tt(.25,.35,2.4,6),new gt({color:5914152}),p),v=new Si(new Vr(2.1,4.2,8),new gt({color:3103284}),p),y=new Si(new Vr(1.5,3.2,8),new gt({color:3828284}),p);n.trees.forEach((S,P)=>{f.makeScale(S.s,S.s,S.s),f.setPosition(S.x,1.2*S.s,S.z),u.setMatrixAt(P,f),f.makeScale(S.s,S.s,S.s),f.setPosition(S.x,3.6*S.s,S.z),v.setMatrixAt(P,f),f.makeScale(S.s,S.s,S.s),f.setPosition(S.x,5.4*S.s,S.z),y.setMatrixAt(P,f)}),en.add(u,v,y)}const _=new gt({color:e.rock});for(const p of n.rocks){const u=new dt(new _o(p.r),_);u.position.set(p.x,Bt(p.x,p.z)+p.r*.4,p.z),u.rotation.set(p.rx,p.ry,0),en.add(u)}me.forEach((p,u)=>Wa.push(fv(p,u))),n.withFort&&hv(n)}function fv(n,e){const t=new Un,i=7,r=(m,x,_,p,u,v=0)=>{const y=new dt(m,x);return y.position.set(_,p,u),y.rotation.y=v,t.add(y),y},s=new bt(i*2,4,1.2);r(s,_i,0,2,-i),r(s,_i,-i,2,0,Math.PI/2),r(s,_i,i,2,0,Math.PI/2);const a=new bt(i-1.8,4,1.2);r(a,_i,-8.8/2,2,i),r(a,_i,(i+1.8)/2,2,i),r(new bt(3.6,1.2,1.3),_i,0,3.4,i),r(new bt(3.4,2.8,.3),ja,0,1.4,i-.3);const o=new Si(new bt(.8,.8,1.3),_i,64),c=new Ke;let l=0;for(let m=-6;m<=6;m+=1.5)for(const[x,_,p]of[[m,-i,0],[m,i,0],[-i,m,1],[i,m,1]]){if(l>=64)break;c.makeRotationY(p?Math.PI/2:0),c.setPosition(x,4.4,_),o.setMatrixAt(l++,c)}o.count=l,t.add(o);const f=new Tt(1.9,2.1,6.2,10);for(const[m,x]of[[-i,-i],[i,-i],[-i,i],[i,i]])r(f,Xa,m,3.1,x);r(new bt(5,7.5,5),Xa,0,3.75,-1.5);const h=new En(1.3,3);for(const m of[-4.6,-2.6,2.6,4.6])r(h,Mf[e],m,2.4,i+.62);r(new Tt(.08,.08,4,6),ja,0,9.5,-1.5);const d=r(new En(2.6,1.6),Mf[e],1.3,10.6,-1.5);return t.position.set(n.pos[0],0,n.pos[1]),t.rotation.y=Math.atan2(-n.pos[0],-n.pos[1]),en.add(t),{grp:t,flag:d,fell:!1}}function hv(n){const e=new Un;e.position.y=Bt(0,0),en.add(e);const t=new bt(2.9,2.2,.9);for(const c of n.fortSegments){const l=new dt(t,_i);l.position.set(c.x,1.1,c.z),l.rotation.y=-c.a+Math.PI/2,e.add(l)}for(let c=0;c<4;c++){const l=c/4*Math.PI*2+Math.PI/12,f=new dt(new Tt(.5,.6,3,8),Xa);f.position.set(Math.cos(l)*6.4,1.5,Math.sin(l)*6.4),e.add(f)}const i=new Un,r=new dt(new Tt(.07,.07,3.4,6),ja);r.position.y=1.7,i.add(r);const s=new dt(new En(1.6,1.1),av);s.position.set(.8,2.8,0),i.add(s);const a=new dt(new En(1.6,.18),cv);a.position.set(.8,2.2,.01),i.add(a);const o=new dt(new Io(1.3,1.6,28),new si({color:16764730,transparent:!0,opacity:.6,side:Wt,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.y=.06,i.add(o),At.add(i),ni={banner:i,ring:o,cloth:s}}function dv(n,e){me.forEach((r,s)=>{const a=g.teams[s],o=Wa[s];if(!o||!a)return;const c=g.mode!=="conquest"?1:a.alive?1-(1-a.points/100)*.12:.28;o.grp.scale.y+=(c-o.grp.scale.y)*Math.min(1,n*3),o.flag.visible=g.mode!=="conquest"||a.alive,g.mode==="conquest"&&a.alive&&a.points<35&&Math.random()<n*6&&e("smoke",r.pos),g.mode==="conquest"&&!a.alive&&!o.fell&&(o.fell=!0,e("rubble",r.pos))});const t=g.flag;if(!t||!ni)return;const i=ni.banner;if(t.state==="carried"&&t.carrier){const r=t.carrier;i.position.set(r.x-Math.sin(r.face)*.45,r.y+.9,r.z-Math.cos(r.face)*.45),i.rotation.y=r.face+Math.PI/2,i.scale.setScalar(.8),ni.ring.visible=!1}else i.position.set(t.x,Bt(t.x,t.z),t.z),i.rotation.y=g.T*.6,i.scale.setScalar(1),ni.ring.visible=!0;ni.cloth.rotation.y=Math.sin(g.T*3)*.25}const qa=320,uv={leg:new Tt(.15,.13,.7,7),torso:new Tt(.42,.36,.78,10),belt:new Tt(.43,.43,.14,10),head:new bi(.4,14,10),helm:new bi(.44,14,8,0,Math.PI*2,0,Math.PI/2),cone:new Vr(.44,.7,12),hood:new bi(.45,12,8,0,Math.PI*2,0,Math.PI*.6),crest:new bt(.1,.22,.62),face:new En(.5,.26),arm:new Tt(.11,.1,.55,6),blade:new bt(.07,.07,1),guard:new bt(.32,.06,.06),shaft:new Tt(.04,.04,3,5),tip:new Vr(.09,.35,5),bow:new Cc(.6,.035,5,14,Math.PI),quiver:new Tt(.13,.11,.7,6),shield:new Tt(.52,.52,.09,18),boss:new bi(.12,8,6),shadow:new Do(.62,14),ring:new Io(.8,1,24),cape:new En(.9,1.1)},pv=(()=>{const n=document.createElement("canvas");n.width=128,n.height=64;const e=n.getContext("2d");e.fillStyle="#1b1512",e.beginPath(),e.ellipse(40,26,7,9,0,0,Math.PI*2),e.ellipse(88,26,7,9,0,0,Math.PI*2),e.fill(),e.lineWidth=7,e.lineCap="round",e.strokeStyle="#1b1512",e.beginPath(),e.moveTo(24,10),e.lineTo(54,17),e.moveTo(104,10),e.lineTo(74,17),e.stroke(),e.beginPath(),e.moveTo(64,48),e.quadraticCurveTo(44,42,30,56),e.quadraticCurveTo(46,50,64,54),e.quadraticCurveTo(82,50,98,56),e.quadraticCurveTo(84,42,64,48),e.fill();const t=new Kh(n);return t.colorSpace=mn,t})(),mv={plain:new gt({color:16777215}),plain2:new gt({color:16777215,side:Wt}),helm:new _f({color:12106948,shininess:70,specular:8947848}),steel:new _f({color:14212322,shininess:90,specular:11184810}),shadow:new si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),ring:new si({color:16764730,transparent:!0,opacity:.8,side:Wt,depthWrite:!1}),ringAlly:new si({color:16777215,transparent:!0,opacity:.45,side:Wt,depthWrite:!1}),face:new si({map:pv,transparent:!0,depthWrite:!1})},It={skin:new Ce(15785160),belt:new Ce(5913378),wood:new Ce(7031342),gold:new Ce(16764730),team:me.map(n=>new Ce(n.hex)),dark:me.map(n=>new Ce(n.hex).multiplyScalar(.7))},ot=(n,e,t,i=0,r=0,s=0,a=1,o=1,c=1)=>new Ke().compose(new D(n,e,t),new Wn().setFromEuler(new ir(i,r,s)),new D(a,o,c)),Sf=n=>n==="captain",os=n=>n==="foot"||n==="captain",nd=[{bone:"root",geo:"shadow",mat:"shadow",m:ot(0,.03,0,-Math.PI/2)},{bone:"root",geo:"ring",mat:"ring",m:ot(0,.05,0,-Math.PI/2),when:(n,e)=>e==="me"},{bone:"root",geo:"ring",mat:"ringAlly",m:ot(0,.05,0,-Math.PI/2),when:(n,e)=>e==="ally"},{bone:"legL",geo:"leg",mat:"plain",m:ot(0,-.35,0),col:n=>It.dark[n.ti]},{bone:"legR",geo:"leg",mat:"plain",m:ot(0,-.35,0),col:n=>It.dark[n.ti]},{bone:"body",geo:"torso",mat:"plain",m:ot(0,1.08,0),col:n=>n.kind==="arch"?It.dark[n.ti]:It.skin},{bone:"body",geo:"belt",mat:"plain",m:ot(0,.76,0),col:n=>It.team[n.ti]},{bone:"body",geo:"head",mat:"plain",m:ot(0,1.78,0),col:()=>It.skin},{bone:"body",geo:"face",mat:"face",m:ot(0,1.73,.39)},{bone:"body",geo:"hood",mat:"plain",m:ot(0,1.82,-.02),kinds:n=>n==="arch",col:n=>It.team[n.ti]},{bone:"body",geo:"quiver",mat:"plain",m:ot(.2,1.25,-.42,0,0,.4),kinds:n=>n==="arch",col:()=>It.belt},{bone:"body",geo:"cone",mat:"helm",m:ot(0,2.12,0),kinds:n=>n==="spear"},{bone:"body",geo:"belt",mat:"plain",m:ot(0,1.9,0,0,0,0,1.02,.7,1.02),kinds:n=>n==="spear",col:n=>It.team[n.ti]},{bone:"body",geo:"helm",mat:"helm",m:ot(0,1.86,0),kinds:os},{bone:"body",geo:"crest",mat:"plain",m:ot(0,2.36,0),kinds:n=>n==="foot",col:n=>It.team[n.ti]},{bone:"body",geo:"crest",mat:"plain",m:ot(0,2.36,0,0,0,0,1.3,1.6,1.4),kinds:Sf,col:()=>It.gold},{bone:"body",geo:"cape",mat:"plain2",m:ot(0,1.02,-.44,.12),kinds:Sf,col:n=>It.team[n.ti]},{bone:"sArm",geo:"arm",mat:"plain",m:ot(0,-.22,0),col:()=>It.skin},{bone:"wArm",geo:"arm",mat:"plain",m:ot(0,-.22,0),col:()=>It.skin},{bone:"sArm",geo:"shield",mat:"plain",m:ot(0,-.3,.34,Math.PI/2),kinds:os,col:n=>It.team[n.ti]},{bone:"sArm",geo:"boss",mat:"steel",m:ot(0,-.3,.4),kinds:os},{bone:"wArm",geo:"guard",mat:"plain",m:ot(0,-.5,.12),kinds:os,col:()=>It.belt},{bone:"wArm",geo:"blade",mat:"steel",m:ot(0,-.5,.6),kinds:os},{bone:"spear",geo:"shaft",mat:"plain",m:ot(0,0,.6,Math.PI/2),kinds:n=>n==="spear",col:()=>It.wood},{bone:"spear",geo:"tip",mat:"steel",m:ot(0,0,2.2,Math.PI/2),kinds:n=>n==="spear"},{bone:"sArm",geo:"bow",mat:"plain",m:ot(0,-.48,.2,0,Math.PI/2,Math.PI/2),kinds:n=>n==="arch",col:()=>It.wood}],Wr=new Map;for(const n of nd){const e=n.geo+"|"+n.mat;let t=Wr.get(e);t||(t={perUnit:0,n:0,mesh:null,geo:n.geo,mat:n.mat},Wr.set(e,t)),t.perUnit++,n.batch=t}for(const n of Wr.values()){const e=new Si(uv[n.geo],mv[n.mat],n.perUnit*qa);e.instanceMatrix.setUsage(Cl),(n.mat==="plain"||n.mat==="plain2")&&(e.instanceColor=new xs(new Float32Array(n.perUnit*qa*3),3),e.instanceColor.setUsage(Cl)),e.frustumCulled=!1,e.count=0,(n.mat==="shadow"||n.mat.startsWith("ring"))&&(e.renderOrder=1),At.add(e),n.mesh=e}const gv=()=>[...Wr.values()].filter(n=>n.mesh.count>0).length,bf=new WeakMap;function _v(n){let e=bf.get(n);return e||(e={walk:Math.random()*6,bodyY:0,bodyRX:0,legL:[0,0,0],legR:[0,0,0],sArmX:0,sArmPX:.5,wArmX:0,wArmZ:0,spearRX:0,spearZ:0},bf.set(n,e)),e}const xv=n=>n.kind!=="captain"?null:n.ti===g.myTi?"me":!cc()&&!kn(n.ti,g.myTi)?"ally":null;function vv(n,e){const t=_v(n);if(n.dead){const s=Math.min(1,n.deadT/.45);return t.bodyY=0,t.legL[0]=t.legL[1]=t.legL[2]=0,t.legR[0]=t.legR[1]=t.legR[2]=0,t.bodyRX=-s*Math.PI/2*.95*(n.fallDir||1),t.wArmX=-1.2,t.sArmX=-.8,t.sink=n.deadT>10?Math.min(1.5,(n.deadT-10)*.4):0,t}t.sink=0;const i=Math.hypot(n.vx,n.vz);if(n.mounted)t.bodyY=1.02+.03*Math.sin(t.walk*2),t.legL[0]=-.9,t.legL[1]=0,t.legL[2]=.55,t.legR[0]=-.9,t.legR[1]=0,t.legR[2]=-.55,t.bodyRX=0,t.walk+=e*i*.9;else{t.walk+=e*i*2.2;const s=Math.sin(t.walk)*Math.min(1,i/3)*.7;t.legL[0]=s,t.legL[1]=t.legL[2]=0,t.legR[0]=-s,t.legR[1]=t.legR[2]=0,t.bodyY=Math.abs(Math.cos(t.walk))*Math.min(1,i/3)*.08,t.bodyRX=n.stun>0?-.25:Math.min(.15,i*.02)}const r=n.swing>0?1-n.swing/.38:-1;if(n.kind==="spear"){const s=sh(n)||n.swing>0;t.wArmX+=((s?-1.45:-.35)-t.wArmX)*Math.min(1,e*10),t.spearRX=s?1.45:-.2,t.spearZ=r>=0?Math.sin(r*Math.PI)*.8:0,t.sArmX+=(-.6-t.sArmX)*Math.min(1,e*8)}else if(n.kind==="arch")t.sArmX+=((n.aim?-1.5:-.3)-t.sArmX)*Math.min(1,e*10),t.wArmX+=((n.aim?r>=0?-1.2:-1.5:-.35)-t.wArmX)*Math.min(1,e*12);else{r>=0?(t.wArmX=r<.35?-.35-2.65*(r/.35):-3+2.2*Math.min(1,(r-.35)/.3),t.wArmZ=n.mounted?-.9:-.3):(t.wArmX+=(-.35-t.wArmX)*Math.min(1,e*10),t.wArmZ=0);const s=(n.human&&n.blocking||n.blockT>0)&&!n.mounted;t.sArmX+=((s?-1.35:n.carrying?-.1:-.35)-t.sArmX)*Math.min(1,e*14),t.sArmPX=s?.28:.5}return t}const sn={root:new Ke,body:new Ke,legL:new Ke,legR:new Ke,sArm:new Ke,wArm:new Ke,spear:new Ke},yv=new Ke,Ef=new Ke,xo=new ir,vo=new Wn,id=new D,rd=new D;function Er(n,e,t,i,r,s){return xo.set(i,r,s),vo.setFromEuler(xo),yv.compose(id.set(n,e,t),vo,rd.set(1,1,1))}function Mv(n,e){const t=n.kind==="captain"?1.18:1;xo.set(0,n.face,0),vo.setFromEuler(xo),sn.root.compose(id.set(n.x,n.y-(e.sink||0),n.z),vo,rd.set(t,t,t)),sn.body.multiplyMatrices(sn.root,Er(0,e.bodyY,0,e.bodyRX,0,0)),sn.legL.multiplyMatrices(sn.body,Er(-.18,.7,0,e.legL[0],e.legL[1],e.legL[2])),sn.legR.multiplyMatrices(sn.body,Er(.18,.7,0,e.legR[0],e.legR[1],e.legR[2])),sn.sArm.multiplyMatrices(sn.body,Er(e.sArmPX,1.3,.05,e.sArmX,0,0)),sn.wArm.multiplyMatrices(sn.body,Er(-.5,1.3,.05,e.wArmX,0,e.wArmZ)),n.kind==="spear"&&sn.spear.multiplyMatrices(sn.wArm,Er(0,-.48,e.spearZ,e.spearRX,0,0))}function sd(n,e){for(const i of Wr.values())i.n=0;let t=0;for(const i of n){if(i.hidden)continue;if(t>=qa)break;t++;const r=vv(i,e);Mv(i,r);const s=xv(i);for(const a of nd){if(a.kinds&&!a.kinds(i.kind)||a.when&&!a.when(i,s))continue;const o=a.batch,c=o.n++;Ef.multiplyMatrices(sn[a.bone],a.m),o.mesh.setMatrixAt(c,Ef),a.col&&o.mesh.setColorAt(c,a.col(i))}}for(const i of Wr.values()){if(i.mesh.count=i.n,!i.n)continue;const r=i.mesh.instanceMatrix;r.clearUpdateRanges(),r.addUpdateRange(0,i.n*16),r.needsUpdate=!0;const s=i.mesh.instanceColor;s&&(s.clearUpdateRanges(),s.addUpdateRange(0,i.n*3),s.needsUpdate=!0)}}const Jn={torso:new bi(1,14,10),neck:new Tt(.2,.3,1,8),head:new bt(.32,.36,.78),leg:new Tt(.1,.08,1,6),hoof:new bt(.16,.12,.2),tail:new Tt(.06,.14,.9,6),cloth:new bt(.95,.08,.85),mane:new bt(.08,.3,.9),shadow:new Do(.62,14)},Tf=[8014378,3877408,13616304].map(n=>new gt({color:n})),Ea=new gt({color:2234386}),Sv=new si({color:0,transparent:!0,opacity:.28,depthWrite:!1}),bv=me.map(n=>new gt({color:n.hex}));function Ev(n,e){const t=new Un,i=new Un;t.add(i);const r=Tf[e%Tf.length],s=(c,l,f,h,d,m)=>{const x=new dt(c,l);return x.position.set(h,d,m),f.add(x),x},a=s(Jn.shadow,Sv,t,0,.03,0);a.rotation.x=-Math.PI/2,a.scale.set(1.2,2.2,1),s(Jn.torso,r,i,0,1.35,0).scale.set(.55,.6,1.15),s(Jn.neck,r,i,0,1.85,.95).rotation.x=.65,s(Jn.head,r,i,0,2.25,1.35).rotation.x=.55,s(Jn.mane,Ea,i,0,2.05,.8).rotation.x=.65,s(Jn.tail,Ea,i,0,1.35,-1.2).rotation.x=-.7,s(Jn.cloth,bv[n],i,0,1.95,-.05);const o=[];for(const[c,l]of[[-.28,.72],[.28,.72],[-.28,-.72],[.28,-.72]]){const f=new Un;f.position.set(c,1.05,l),i.add(f),s(Jn.leg,r,f,0,-.5,0),s(Jn.hoof,Ea,f,0,-1,.03),o.push(f)}return At.add(t),{root:t,body:i,legs:o,walk:0}}const Rr=new Map;function od(n,e){const t=new Set;for(const i of n){t.add(i.key);let r=Rr.get(i.key);if(r||(r=Ev(i.ti,Math.abs(i.key*7919)%3),Rr.set(i.key,r)),r.root.position.set(i.x,Bt(i.x,i.z),i.z),r.root.rotation.y=i.face,r.root.visible=!0,i.state==="dead"){r.body.rotation.z=Math.min(1,i.t/.5)*Math.PI/2*.9*(i.fall||1),i.t>6&&(r.root.position.y-=(i.t-6)*.6);continue}r.walk+=e*i.spd*1.1;const s=Math.min(1,i.spd/4)*.8;r.legs[0].rotation.x=r.legs[3].rotation.x=Math.sin(r.walk)*s,r.legs[1].rotation.x=r.legs[2].rotation.x=Math.sin(r.walk+Math.PI)*s,r.body.position.y=Math.abs(Math.sin(r.walk))*.12*Math.min(1,i.spd/4),i.state==="leaving"&&(r.root.visible=i.t<2.6)}for(const[i,r]of Rr)t.has(i)||(At.remove(r.root),Rr.delete(i))}function ad(){for(const n of Rr.values())At.remove(n.root);Rr.clear()}let ai=[],Dr=[];function Tv(n,e,t,i,r){const s=_t.cfg.particles;for(let a=0;a<r&&ai.length<s;a++)ai.push({x:n,y:e,z:t,vx:_e(-4,4),vy:_e(1,5),vz:_e(-4,4),life:_e(.25,.5),c:i,s:_e(2,4)})}function Af(n){ai.length<_t.cfg.particles+40&&ai.push(n)}function Ir(n,e,t,i,r){Dr.push({x:n,y:e,z:t,text:i,color:r,t:0})}function Av(n,e){if(n==="smoke")Af({x:e[0]+_e(-6,6),y:_e(3,6),z:e[1]+_e(-6,6),vx:_e(-.4,.4),vy:_e(1.5,3),vz:_e(-.4,.4),life:_e(1.2,2),c:"#5b5550",s:_e(5,9)});else for(let t=0;t<30;t++)Af({x:e[0]+_e(-8,8),y:_e(0,6),z:e[1]+_e(-8,8),vx:_e(-3,3),vy:_e(1,5),vz:_e(-3,3),life:_e(1,2.2),c:"#bdb3a2",s:_e(3,7)})}const Uo=90,Cv=(()=>{const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d");e.fillStyle="#ffffff";for(let t=0;t<9;t++)e.beginPath(),e.arc(32+_e(-14,14),32+_e(-14,14),_e(4,12),0,Math.PI*2),e.fill();for(let t=0;t<8;t++)e.beginPath(),e.arc(32+_e(-28,28),32+_e(-28,28),_e(1.5,3.5),0,Math.PI*2),e.fill();return new Kh(n)})(),cd=new si({map:Cv,transparent:!0,depthWrite:!1});cd.onBeforeCompile=n=>{n.vertexShader=`attribute float aAlpha;
varying float vAlpha;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vAlpha = aAlpha;`),n.fragmentShader=`varying float vAlpha;
`+n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vAlpha;`)};const ld=new En(1,1),$a=new xs(new Float32Array(Uo),1);ld.setAttribute("aAlpha",$a);const ii=new Si(ld,cd,Uo);ii.instanceColor=new xs(new Float32Array(Uo*3),3);ii.frustumCulled=!1;ii.count=0;At.add(ii);let ci=[],Rv=0;const wv=me.map(n=>new Ce(n.hex).multiplyScalar(.85)),Cf=new Ke,Rf=new Wn,wf=new ir,Pv=new D,Lv=new D;function Dv(n,e,t,i){if(lc(n,e))return;const r=_t.cfg.splats;ci.length>=r&&ci.shift(),ci.push({x:n,z:e,s:t,rot:_e(0,6),t:0,c:wv[i==null?1:i],lift:Rv++%Uo*4e-4})}const fd=160,Iv=(()=>{const n=new Tt(.03,.03,.9,4);return n.rotateX(Math.PI/2),n})(),Ur=new Si(Iv,new gt({color:3811868}),fd);Ur.frustumCulled=!1;Ur.count=0;At.add(Ur);const Tr=new Ot;function Uv(n){for(const e of ai)e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.vy-=(e.s>5?-.5:9)*n,e.life-=n;ai=ai.filter(e=>e.life>0&&e.y>-1);for(const e of Dr)e.t+=n,e.y+=n*1.2;Dr=Dr.filter(e=>e.t<1.3);for(const e of ci)e.t+=n;ci=ci.filter(e=>e.t<30)}function hd(){ci.forEach((e,t)=>{wf.set(-Math.PI/2,0,e.rot),Rf.setFromEuler(wf),Cf.compose(Pv.set(e.x,Bt(e.x,e.z)+.04+e.lift,e.z),Rf,Lv.set(e.s,e.s,e.s)),ii.setMatrixAt(t,Cf),ii.setColorAt(t,e.c),$a.array[t]=e.t>25?Math.max(0,.85-(e.t-25)/5):.85}),ii.count=ci.length,ii.instanceMatrix.needsUpdate=!0,ii.instanceColor.needsUpdate=!0,$a.needsUpdate=!0;let n=0;for(const e of g.arrows){if(n>=fd)break;const t=e.x-e.px,i=e.y-e.py,r=e.z-e.pz;Tr.position.set(e.x,e.y,e.z),t||i||r?(Tr.lookAt(e.x+t+1e-4,e.y+i,e.z+r),e.q=(e.q||new Wn).copy(Tr.quaternion)):e.q&&Tr.quaternion.copy(e.q),Tr.updateMatrix(),Ur.setMatrixAt(n++,Tr.matrix)}Ur.count=n,Ur.instanceMatrix.needsUpdate=!0}function dd(){ai=[],Dr=[],ci=[]}const Qe={yaw:0,pitch:.32,shake:0},Nv=matchMedia("(prefers-reduced-motion: reduce)").matches;function kv(){const n=g.player;if(n&&!n.dead)return n;const e=g.teams.map(t=>t.leader).find(t=>t&&!t.dead&&!kn(t.ti,g.myTi));return e||g.units.find(t=>!t.dead&&t.ti===g.myTi)||g.units.find(t=>!t.dead)||null}function Ov(n){Qe.shake=Math.max(0,Qe.shake-n*1.6);const e=kv();if(!e)return;const t=e.x,i=e.z,r=e.y,s=(ct.W<ct.H?10:8.5)+(e.mounted?3:0),a=2.2+Math.sin(Qe.pitch)*s+(e.mounted?1:0),o=t-Math.sin(Qe.yaw)*Math.cos(Qe.pitch)*s,c=i-Math.cos(Qe.yaw)*Math.cos(Qe.pitch)*s,l=Math.min(1,n*8);ht.position.x+=(o-ht.position.x)*l,ht.position.z+=(c-ht.position.z)*l,ht.position.y+=(r+a-ht.position.y)*l;const f=Bt(ht.position.x,ht.position.z)+1;ht.position.y<f&&(ht.position.y=f),Qe.shake>0&&!Nv&&(ht.position.x+=_e(-1,1)*Qe.shake*.3,ht.position.y+=_e(-1,1)*Qe.shake*.3),ht.lookAt(t+Math.sin(Qe.yaw)*3,r+1.6+(e.mounted?1:0),i+Math.cos(Qe.yaw)*3)}function Fv(n){ht.position.set(Math.cos(n*.05)*62,26+(g.map.id==="frost"?4:0),Math.sin(n*.05)*62),ht.lookAt(0,Bt(0,0),0)}const Ya=document.getElementById("fx"),fe=Ya.getContext("2d"),ud=document.getElementById("mini"),Ye=ud.getContext("2d"),Ei=new D,zv=new D;function Bv(){Ya.width=Math.round(ct.W*ct.DPR),Ya.height=Math.round(ct.H*ct.DPR)}function Ta(n,e,t){return Ei.set(n,e,t).project(ht),Ei.z<=1?[(Ei.x+1)/2*ct.W,(1-Ei.y)/2*ct.H,!0]:[0,0,!1]}function pd(){fe.setTransform(ct.DPR,0,0,ct.DPR,0,0),fe.clearRect(0,0,ct.W,ct.H)}function Hv(n){const e=ct.W,t=ct.H;pd();for(const s of ai){const[a,o,c]=Ta(s.x,s.y,s.z);if(!c)continue;const l=ht.position.distanceTo(zv.set(s.x,s.y,s.z)),f=s.s*jt(14/l,.3,2.5);fe.globalAlpha=Math.min(1,s.life*2),fe.fillStyle=s.c,s.s>4?(fe.beginPath(),fe.arc(a,o,f,0,Math.PI*2),fe.fill()):fe.fillRect(a-f/2,o-f/2,f,f)}fe.globalAlpha=1,fe.textAlign="center",fe.font="italic 20px Bangers, Impact, sans-serif";for(const s of Dr){const[a,o,c]=Ta(s.x,s.y,s.z);c&&(fe.globalAlpha=1-s.t/1.3,fe.lineWidth=4,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText(s.text,a,o),fe.fillStyle=s.color,fe.fillText(s.text,a,o))}fe.globalAlpha=1;const i=g.player;if(g.state==="play"){for(const s of g.units){if(s.dead||s===i||s.hp>=s.max-.5&&!s.leader||Math.hypot(s.x-ht.position.x,s.z-ht.position.z)>34)continue;const[o,c,l]=Ta(s.x,s.y+(s.leader?3.2:2.8)+(s.mounted?1.2:0),s.z);if(!l)continue;const f=s.leader?40:26;if(fe.fillStyle="rgba(0,0,0,.55)",fe.fillRect(o-f/2,c,f,4),fe.fillStyle=me[s.ti].css,fe.fillRect(o-f/2,c,f*Math.max(0,s.hp/s.max),4),s.leader&&g.teams[s.ti]&&g.teams[s.ti].human&&n.nickFor){const h=n.nickFor(s.ti);h&&(fe.font='800 12px "Barlow Semi Condensed", sans-serif',fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText(h,o,c-6),fe.fillStyle="#fff",fe.fillText(h,o,c-6))}g.mode==="dm"&&s.leader&&s.ti===g.bounty&&(fe.font="italic 16px Bangers, Impact, sans-serif",fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",fe.strokeText("BOUNTY",o,c-20),fe.fillStyle="#ffcf3a",fe.fillText("BOUNTY",o,c-20))}g.flag&&Gv(),g.mode==="dm"&&g.bounty===g.myTi&&i&&!i.dead&&performance.now()/500%1<.7&&(fe.font="italic 18px Bangers, Impact, sans-serif",fe.fillStyle="#ffcf3a",fe.fillText("BOUNTY ON YOU",e/2,118))}const r=n.joy;r&&r.active&&(fe.strokeStyle="rgba(255,255,255,.4)",fe.lineWidth=2,fe.beginPath(),fe.arc(r.ox,r.oy,50,0,Math.PI*2),fe.stroke(),fe.fillStyle="rgba(255,255,255,.55)",fe.beginPath(),fe.arc(r.ox+r.x*50,r.oy+r.y*50,22,0,Math.PI*2),fe.fill()),g.state==="play"&&(!i||i.dead)&&(fe.fillStyle="rgba(120,0,0,.18)",fe.fillRect(0,0,e,t)),Vv()}function Gv(){const n=ct.W,e=ct.H,t=g.flag,i=t.state==="carried"?t.carrier:null;if(i&&i===g.player)return;const r=i?i.x:t.x,s=i?i.z:t.z,a=(i?i.y:Bt(r,s))+3.4,o=i?me[i.ti].css:"#ffffff";Ei.set(r,a,s).project(ht);let c=(Ei.x+1)/2*n,l=(1-Ei.y)/2*e;const f=Ei.z>1;f&&(c=n-c,l=e-40);const h=60,d=!f&&c>h&&c<n-h&&l>h&&l<e-h;if(fe.font="italic 15px Bangers, Impact, sans-serif",fe.lineWidth=3,fe.strokeStyle="rgba(0,0,0,.6)",d){const v=i?`${me[i.ti].name.toUpperCase()} CARRIER`:"BANNER";fe.strokeText(v,c,l),fe.fillStyle=o,fe.fillText(v,c,l);return}const m=n/2,x=e/2,_=Math.atan2(l-x,c-m),p=jt(m+Math.cos(_)*n,h,n-h),u=jt(x+Math.sin(_)*e,h+50,e-h-20);fe.save(),fe.translate(p,u),fe.rotate(_),fe.fillStyle=o,fe.strokeStyle="rgba(0,0,0,.5)",fe.lineWidth=2,fe.beginPath(),fe.moveTo(16,0),fe.lineTo(-8,-11),fe.lineTo(-8,11),fe.closePath(),fe.fill(),fe.stroke(),fe.restore()}function Vv(){if(g.state!=="play")return;const n=ud.width,e=n/190,t=n/2;Ye.clearRect(0,0,n,n),Ye.save(),Ye.translate(t,t),Ye.rotate(Qe.yaw+Math.PI);const i=g.map.id;if(i==="river"&&(Ye.fillStyle="rgba(63,127,166,.8)",Ye.fillRect(-95*e,-5*e,190*e,10*e),Ye.fillStyle="rgba(107,74,46,.9)",Ye.fillRect(-34.5*e,-7*e,5*e,14*e),Ye.fillRect(29.5*e,-7*e,5*e,14*e)),i==="frost"&&(Ye.fillStyle="rgba(255,255,255,.2)",Ye.beginPath(),Ye.arc(0,0,24*e,0,Math.PI*2),Ye.fill()),i==="forest"&&g.layout){Ye.fillStyle="rgba(47,90,52,.7)";for(const r of g.layout.treeColliders)Ye.fillRect(r.x*e-2,r.z*e-2,4,4)}me.forEach((r,s)=>{Ye.fillStyle=g.mode!=="conquest"||g.teams[s].alive?r.css:"#555",Ye.fillRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18),!cc()&&!kn(s,g.myTi)&&(Ye.strokeStyle="#fff",Ye.lineWidth=2,Ye.strokeRect(r.pos[0]*e-9,r.pos[1]*e-9,18,18))});for(const r of g.units){if(r.dead)continue;Ye.fillStyle=me[r.ti].css;const s=r.leader?6:3.5;Ye.fillRect(r.x*e-s/2,r.z*e-s/2,s,s)}if(g.flag){const r=g.flag.state==="carried"&&g.flag.carrier?g.flag.carrier:g.flag;Ye.fillStyle="#fff",Ye.strokeStyle="#000",Ye.lineWidth=1.5,Ye.beginPath(),Ye.arc(r.x*e,r.z*e,5,0,Math.PI*2),Ye.fill(),Ye.stroke()}Ye.restore(),Ye.fillStyle="#fff",Ye.beginPath(),Ye.moveTo(t,t-8),Ye.lineTo(t-5,t+5),Ye.lineTo(t+5,t+5),Ye.fill()}let Ct=null,Ka=null;const Aa={};function Ti(){if(Ct){Ct.state==="suspended"&&Ct.resume();return}try{Ct=new(window.AudioContext||window.webkitAudioContext),Ka=Ct.createBuffer(1,Ct.sampleRate*.6,Ct.sampleRate);const n=Ka.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1}catch{Ct=null}}function yn(n,e){const t=performance.now();return Aa[n]&&t-Aa[n]<e?!1:(Aa[n]=t,!0)}function Zn(n,e,t,i,r="bandpass",s,a=1){if(!Ct)return;const o=Ct.currentTime,c=Ct.createBufferSource(),l=Ct.createBiquadFilter(),f=Ct.createGain();c.buffer=Ka,l.type=r,l.frequency.setValueAtTime(e,o),s&&l.frequency.exponentialRampToValueAtTime(s,o+n),l.Q.value=t,f.gain.setValueAtTime(Math.max(.0011,i*a),o),f.gain.exponentialRampToValueAtTime(.001,o+n),c.connect(l).connect(f).connect(Ct.destination),c.start(o),c.stop(o+n)}function Zt(n,e,t,i="sine",r,s=0){if(!Ct)return;const a=Ct.currentTime+s,o=Ct.createOscillator(),c=Ct.createGain();o.type=i,o.frequency.setValueAtTime(n,a),r&&o.frequency.exponentialRampToValueAtTime(r,a+e),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),a+.02),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(c).connect(Ct.destination),o.start(a),o.stop(a+e)}function Qn(n,e){const t=g.player;if(!t||n==null)return 1;const i=Math.hypot(n-t.x,e-t.z);return jt(1.2-i/40,0,1)}const Nt={swing(n,e){const t=Qn(n,e);t>.1&&yn("sw",60)&&Zn(.14,1800,1,.12,"bandpass",600,t)},clang(n,e){const t=Qn(n,e);t>.1&&yn("cl",60)&&(Zn(.08,3400,7,.22,"bandpass",0,t),Zt(1500+Math.random()*600,.14,.07*t,"triangle"))},hit(n,e){const t=Qn(n,e);t>.1&&yn("hi",50)&&(Zn(.12,380,1,.4,"lowpass",0,t),Zt(130,.1,.15*t,"triangle",60))},die(n,e){const t=Qn(n,e);t>.15&&yn("di",140)&&Zt(260,.35,.08*t,"sawtooth",110)},wall(n,e){const t=Qn(n,e);t>.1&&yn("wa",120)&&Zn(.2,500,1.2,.3,"lowpass",0,t)},bow(n,e){const t=Qn(n,e);t>.1&&yn("bo",80)&&(Zt(220,.12,.06*t,"triangle",140),Zn(.25,2600,2,.06,"bandpass",900,t))},thud(n,e){const t=Qn(n,e);t>.1&&yn("th",80)&&Zn(.07,900,1.5,.15,"bandpass",0,t)},hoof(n,e){const t=Qn(n,e);t>.1&&yn("ho",95)&&Zn(.05,260,2,.25,"bandpass",0,t)},neigh(){Zt(700,.45,.07,"sawtooth",1100),Zt(900,.4,.05,"sawtooth",500,.2)},trample(n,e){const t=Qn(n,e);t>.1&&yn("tr",90)&&Zn(.2,200,1,.5,"lowpass",0,t)},coin(){yn("co",50)&&(Zt(1300,.08,.08,"square"),Zt(1750,.12,.07,"square",0,.07))},horn(){Zt(196,.9,.14,"sawtooth",200),Zt(294,.9,.08,"sawtooth",296)},order(){Zt(392,.12,.1,"square"),Zt(523,.18,.1,"square",0,.1)},crumble(){Zn(1.2,300,.7,.6,"lowpass",80)},capture(){Zt(523,.2,.12,"square"),Zt(659,.2,.12,"square",0,.18),Zt(784,.4,.12,"square",0,.36)}};function wr(n){try{navigator.vibrate&&navigator.vibrate(n)}catch{}}const Ie={NET:null,myNick:""};try{Ie.myNick=localStorage.getItem("fb-nick")||""}catch{}const oi=()=>!!(Ie.NET&&Ie.NET.role==="client"),Gi=()=>!!(Ie.NET&&Ie.NET.role==="host"),nt=n=>document.getElementById(n),Rc=n=>(n=Math.max(0,Math.floor(n)),Math.floor(n/60)+":"+String(n%60).padStart(2,"0"));function Wv(){nt("ptsTitle").textContent=Ki[g.mode].title,nt("tpRows").innerHTML=me.map((n,e)=>`<div class="tp${e===g.myTi?" me":""}" id="tp${e}"><span class="al">${cc()?"":Yf[g.ALLY[e]]}</span><div class="bar"><i style="background:${n.css}"></i></div><b>0</b></div>`).join(""),nt("pips").innerHTML=me.map((n,e)=>`<span class="pip" id="pip${e}" style="background:${n.css}">${n.name[0]}</span>`).join(""),nt("clockMax").textContent=Rc(Ki[g.mode].time)}function Xv(){["ovTitle","ovEnd","ovBrowse","ovLobby"].forEach(n=>nt(n).hidden=!0),nt("hudWrap").hidden=!1,nt("joyhint").style.opacity=1}function wc(n){g.teams.forEach((d,m)=>{const x=nt("tp"+m);if(!x)return;const _=dh(m),p=g.mode==="conquest"?100:g.mode==="dm"?eh:us;x.querySelector("i").style.transform=`scaleX(${Math.max(0,_)/p})`,x.querySelector("b").textContent=g.mode==="ctf"?`${_}/${us}`:Math.max(0,Math.ceil(_));const u=hh(m);x.classList.toggle("out",u);const v=nt("pip"+m);v.classList.toggle("out",u),v.classList.toggle("hum",!!d.human),v.textContent=u?"✕":me[m].name[0]}),nt("clockT").textContent=Rc(g.T);const e=g.player,t=g.teams[g.myTi];e&&(nt("hpT").textContent=`${Math.max(0,Math.ceil(e.hp))}/${e.max}`,nt("hpBar").style.transform=`scaleX(${Math.max(0,e.hp)/e.max})`,nt("horseBarWrap").hidden=!e.mounted,nt("horseBar").style.transform=`scaleX(${Math.max(0,e.horseHp)/Ao})`);const i=Math.floor(t.gold);nt("gold").textContent=i;const r=Es(g.myTi);nt("squadN").textContent=r.length;const s=d=>r.filter(m=>m.kind===d).length;nt("squadMix").textContent=`F${s("foot")} S${s("spear")} A${s("arch")}`,document.querySelectorAll("#tray button").forEach(d=>{d.setAttribute("aria-disabled",i<Xt[d.dataset.kind].cost||r.length>=g.squadCap||!ms(g.myTi)?"true":"false")});let a="Ride",o="horse";e&&e.mounted?(a="Walk",o="get off"):e&&e.summon?(a="…",o="coming"):e&&e.horseCd>0&&(a=Math.ceil(e.horseCd)+"s",o="resting"),nt("mntT").textContent=a,nt("mntS").textContent=o,nt("mnt").classList.toggle("dim",!e||!e.mounted&&(e.horseCd>0||e.carrying||e.dead)),nt("blk").classList.toggle("dim",!e||e.mounted),nt("atk").classList.toggle("dim",!e||e.carrying);const c=t.order||"follow";nt("cmdT").textContent=c==="follow"?"Follow me!":c==="hold"?"Hold here!":"Charge!";const l=c==="follow"?"var(--green)":c==="hold"?"var(--yellow)":"var(--red)";nt("cmdBtn").style.borderLeftColor=l,nt("cmdBtn").querySelector(".ic").style.background=l;const f=Ie.NET,h=nt("netTag");if(f){h.hidden=!1;const d=me.map((m,x)=>x).filter(m=>g.teams[m].human&&m!==g.myTi).map(m=>me[m].name);if(oi()){const m=performance.now()-(n||0)>2500;h.textContent=m?"Waiting for the host…":`Online · ${d.length?"with "+d.join(", "):"host"}`,h.classList.toggle("bad",m)}else h.textContent=`Hosting · ${d.length?d.join(", "):"no one else yet"}`}else h.hidden=!0}let Pf;function Nr(n,e,t){const i=nt("banner");i.innerHTML="";const r=document.createElement("span");if(r.textContent=n,r.style.color=t||"#fff",i.appendChild(r),e){const s=document.createElement("small");s.textContent=e,i.appendChild(s)}i.classList.add("on"),clearTimeout(Pf),Pf=setTimeout(()=>i.classList.remove("on"),2e3)}const jv=n=>me.filter((e,t)=>g.ALLY[t]===n).map(e=>e.name).join(" & ");function qv(n,e){const t=g.myTi,i=o=>me[o].name,r=o=>me[o].css,s=o=>o===t,a=o=>!kn(o,t);switch(n){case"start":return[Ki[g.mode].name,g.mode==="conquest"?"Tear down every enemy castle":g.mode==="dm"?"Last side with tickets wins":"Bring the banner home three times"];case"castleDown":return s(e[0])?["Your castle has fallen!","No more recruits. Stay alive.","#e0352b"]:[`${i(e[0])} castle destroyed!`,e[1]===t?"Your doing":`by ${i(e[1])}`,r(e[0])];case"tickets0":return[`${i(e[0])} out of tickets!`,s(e[0])?"No more respawns":a(e[0])?"Protect your ally":"Finish them off",r(e[0])];case"bounty":return[`Bounty on ${i(e[0])}'s captain`,s(e[0])?"Everyone is coming for you":"Double gold for the kill",r(e[0])];case"bountyClaimed":return s(e[0])?["Bounty claimed!","+50 gold","#ffcf3a"]:null;case"capDown":return s(e[1])?[`${i(e[0])} captain down`,"",r(e[0])]:null;case"fell":return s(e[0])?["You fell!",e[1]?"Back in the fight in 5 seconds":"No way back. Your allies fight on.","#e0352b"]:null;case"respawn":return s(e[0])?["Back on your feet","Rally your squad"]:null;case"horseDown":return s(e[0])?["Your horse is down!",`New horse in ${Qf} seconds`,"#e0352b"]:null;case"rideNo":return s(e[0])?e[1]==="banner"?["Not with the banner","Carry it home on foot"]:e[1]==="rest"?["Your horse is resting",`Ready in ${e[2]} seconds`]:["Too hot to call your horse","Get clear of the fight first"]:null;case"flagTaken":return s(e[0])?["You have the banner!","Carry it home. Your squad will escort you.",r(e[0])]:[`${i(e[0])} has the banner!`,a(e[0])?"Escort them home":"Stop the carrier",r(e[0])];case"flagDropped":return s(e[0])?["Banner dropped!","Grab it again before it returns"]:[`${i(e[0])} dropped the banner`,"",r(e[0])];case"flagHome":return["The banner returns to the fort",""];case"capture":return[`${i(e[0])} captures the banner!`,`${uh(g.ALLY[e[0]])} of ${us}`,r(e[0])];case"left":return[`${i(e[0])}'s player left`,"The computer takes over their army",r(e[0])]}return null}function vs(n,e){const t=g.myTi;if(n==="gold"){e[0]===t&&(Ir(e[1],Bt(e[1],e[2])+2.6,e[2],`+${e[3]} gold`,"#ffcf3a"),Nt.coin());return}const i=qv(n,e);i&&(Nr(i[0],i[1],i[2]),n==="horseDown"&&e[0]===t&&(wr(120),Qe.shake=.5),n==="capture"&&(Nt.capture(),kn(e[0],t)||wr([60,40,60])),n==="castleDown"&&(Nt.crumble(),Qe.shake=.6,e[0]===t&&wr([100,60,100])),n==="flagTaken"&&e[0]===t&&(Nt.order(),wr(50)))}const ti=n=>document.getElementById(n),at={joy:{active:!1,id:null,ox:0,oy:0,x:0,y:0},look:{id:null,lx:0,ly:0},keys:{},attackHeld:!1,blockHeld:!1,trayIsOpen:!1};let Rn={attack(){},ride(){},order(){},recruit(){}};function yo(n){at.trayIsOpen=n,ti("tray").hidden=!n,ti("recBtn").classList.toggle("open",n)}function md(){at.keys={},at.attackHeld=at.blockHeld=!1,at.joy.active=!1,at.joy.x=at.joy.y=0,at.look.id=null}function gd(n){const{joy:e,keys:t}=at;let i=e.x,r=e.y;t.KeyA&&(i-=1),t.KeyD&&(i+=1),t.KeyW&&(r-=1),t.KeyS&&(r+=1),t.ArrowLeft&&(Qe.yaw+=n*2.4),t.ArrowRight&&(Qe.yaw-=n*2.4),t.ArrowUp&&(r-=1),t.ArrowDown&&(r+=1);let s=Math.hypot(i,r);s>1&&(i/=s,r/=s,s=1);const a=Qe.yaw,o=Math.sin(a),c=Math.cos(a),l=-Math.cos(a),f=Math.sin(a);return{wx:o*-r+l*i,wz:c*-r+f*i,mag:s,block:at.blockHeld,attackHeld:at.attackHeld,camYaw:a}}function $v(n){Rn=n;const e=ti("touch"),{joy:t,look:i}=at;e.addEventListener("pointerdown",o=>{if(g.state==="play"){Ti(),o.preventDefault(),yo(!1),o.clientX<ct.W*.42&&!t.active?(t.active=!0,t.id=o.pointerId,t.ox=o.clientX,t.oy=o.clientY,t.x=t.y=0,ti("joyhint").style.opacity=0):i.id===null&&(i.id=o.pointerId,i.lx=o.clientX,i.ly=o.clientY);try{e.setPointerCapture(o.pointerId)}catch{}}}),e.addEventListener("pointermove",o=>{if(o.pointerId===t.id){const c=o.clientX-t.ox,l=o.clientY-t.oy,f=50,h=Math.hypot(c,l);h>f&&(t.ox+=c*(1-f/h)*.4,t.oy+=l*(1-f/h)*.4),t.x=jt(c/f,-1,1),t.y=jt(l/f,-1,1);const d=Math.hypot(t.x,t.y);d>1&&(t.x/=d,t.y/=d)}else o.pointerId===i.id&&(Qe.yaw-=(o.clientX-i.lx)*.0075,Qe.pitch=jt(Qe.pitch+(o.clientY-i.ly)*.004,.12,.75),i.lx=o.clientX,i.ly=o.clientY)});const r=o=>{o.pointerId===t.id&&(t.active=!1,t.id=null,t.x=t.y=0),o.pointerId===i.id&&(i.id=null)};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r);const s=(o,c,l)=>{o.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),Ti();try{o.setPointerCapture(h.pointerId)}catch{}o.classList.add("held"),c()});const f=()=>{o.classList.remove("held"),l()};o.addEventListener("pointerup",f),o.addEventListener("pointercancel",f),o.addEventListener("lostpointercapture",f)},a=(o,c)=>{o.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),Ti(),c()}),o.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),c())})};s(ti("atk"),()=>{at.attackHeld=!0,Rn.attack()},()=>{at.attackHeld=!1}),s(ti("blk"),()=>{at.blockHeld=!0},()=>{at.blockHeld=!1}),a(ti("mnt"),()=>Rn.ride()),a(ti("cmdBtn"),()=>Rn.order()),a(ti("recBtn"),()=>yo(!at.trayIsOpen)),document.querySelectorAll("#tray button").forEach(o=>a(o,()=>Rn.recruit(o.dataset.kind))),addEventListener("keydown",o=>{g.state==="play"&&(o.target&&o.target.tagName==="INPUT"||(Ti(),at.keys[o.code]=!0,o.code==="Space"&&(o.preventDefault(),at.attackHeld=!0,o.repeat||Rn.attack()),(o.code==="ShiftLeft"||o.code==="ShiftRight")&&(at.blockHeld=!0),!o.repeat&&(o.code==="KeyF"&&Rn.order(),o.code==="KeyH"&&Rn.ride(),o.code==="Digit1"&&Rn.recruit("foot"),o.code==="Digit2"&&Rn.recruit("spear"),o.code==="Digit3"&&Rn.recruit("arch"))))}),addEventListener("keyup",o=>{at.keys[o.code]=!1,o.code==="Space"&&(at.attackHeld=!1),o.code.startsWith("Shift")&&(at.blockHeld=!1)}),addEventListener("blur",md)}const ne={},Xr=n=>Math.round(n*10)/10,kr=n=>Math.round(n*100)/100,un=n=>Math.max(0,Math.round(n)).toString(36),pn=n=>parseInt(n,36),Fn=n=>un((n+100)*10),vn=n=>pn(n)/10-100,Lf=n=>un((n%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*72%72),Df=n=>pn(n)/72*Math.PI*2,No=n=>{const e=n.peers().find(t=>t.sameTab);return e?e.peer:null};let ys={onMatchStart(){},onAbort(){},onLobby(){}};function Yv(n){ys=Object.assign(ys,n)}ut.on("msg",n=>{const e=Ie.NET;Gi()&&e.msgs&&(e.msgs.push([++e.msgN,n.k,...n.a]),e.msgs.length>8&&e.msgs.shift())});function Kv(){const n=g.teams.map(o=>[Math.round(o.points*10),o.tickets,o.caps,Math.floor(o.gold),o.alive?1:0,Math.max(0,Math.ceil(o.leaderDeadT))].join(",")).join(";"),e=[];for(const o of g.units){if(o.dead)continue;const c=Kf.indexOf(o.kind)*4+o.ti,l=(o.swing>0?1:0)|(o.mounted?2:0)|(o.blockT>0||o.human&&o.blocking?4:0)|(o.carrying?8:0)|(o.stun>0?16:0)|(o.aim?32:0);e.push([un(o.id),c.toString(16),Fn(o.x),Fn(o.z),Lf(o.face),un(jt(o.hp/o.max,0,1)*35),un(l)].join(","))}const t=g.arrows.filter(o=>!o.stuck&&!o.done).slice(-18).map(o=>[un(o.id),Fn(o.x0),Fn(o.z0),un(o.y0*10),Fn(o.x1),Fn(o.z1),un(o.y1*10+20),un(o.dur*100),un(o.peak*10),un(o.t*100),o.ti].join(",")),i=g.horses.filter(o=>o.state==="coming").map(o=>[Fn(o.x),Fn(o.z),Lf(o.face),o.ti].join(",")),r=g.flag,s=r?[r.state==="home"?0:r.state==="dropped"?1:2,Fn(r.x),Fn(r.z),r.carrier?un(r.carrier.id):""].join(","):"",a=g.teams.map((o,c)=>{if(!o.human||c===g.myTi)return"";const l=o.leader,f=l.kick;return f.dirty&&(f.n++,f.dirty=!1,f.lvx=f.vx,f.lvz=f.vz,f.lst=f.st,f.vx=0,f.vz=0,f.st=0),[c,un(l.id),l.dead?1:0,Math.round(l.horseHp),Math.ceil(l.horseCd),l.summon?1:0,f.n,Xr(f.lvx||0),Xr(f.lvz||0),kr(f.lst||0),Math.round(l.hp)].join(",")}).filter(Boolean).join(";");return[Math.round(g.T*10),n,e.join(";"),t.join(";"),i.join(";"),s,a,g.bounty].join("|")}function Jv(){performance.now()-(Ie.NET.lastSend||0)<80||ko()}function ko(){const n=Ie.NET;if(!n)return;n.lastSend=performance.now();const e={role:"host",ph:g.state==="end"?"end":"play",seed:g.seed,mode:g.mode,map:g.map.id,diff:g.diff,al:g.ALLY.join(""),seats:n.seats,nick:Ie.myNick||"Host",n:++n.snapN,s:Kv(),m:n.msgs};g.state==="end"&&g.endInfo&&(e.res=[g.endInfo.w,g.endInfo.why]);let t=JSON.stringify(e);for(;t.length>3900;){const i=e.s.split("|"),r=i[3].split(";");if(r.length&&r[0])r.shift(),i[3]=r.join(";"),e.s=i.join("|");else if(e.m.length)e.m=e.m.slice(1);else break;t=JSON.stringify(e)}n.lastSize=t.length,n.room.presence(e).catch(()=>{})}function Zv(){const n=Ie.NET,e=n.room.peers(),t=new Set(e.map(i=>i.peer));for(const[i,r]of Object.entries(n.seats))if(r!==g.myTi&&!t.has(i)&&g.teams[r].human){g.teams[r].human=!1;const s=g.teams[r].leader;s&&(s.human=!1,s.remote=!1,s.dmg=Xt.captain.dmg,s.spd=Xt.captain.spd),delete n.seats[i],ut.emit("msg",{k:"left",a:[r]})}for(const i of e){if(i.sameTab)continue;const r=n.seats[i.peer];if(r===void 0)continue;const s=i.presence||{};if(s.seed!==g.seed||s.ph!=="play")continue;const a=g.teams[r],o=a.leader;if(!a.human)continue;const c=n.inp[r]||(n.inp[r]={atk:0,ride:0,rec:[0,0,0]});if(o&&!o.dead&&Array.isArray(s.cap)&&s.cap[0]===o.id&&(o.x=+s.cap[1],o.z=+s.cap[2],o.face=+s.cap[3],o.vx=+s.cap[4],o.vz=+s.cap[5],o.blocking=!!s.blk),typeof s.atk=="number"&&s.atk>c.atk&&(o&&!o.dead&&(typeof s.face=="number"&&(o.face=s.face),_c(o)),c.atk=s.atk),typeof s.ride=="number"&&s.ride>c.ride&&(o&&oh(o),c.ride=s.ride),s.ord&&s.ord!==a.order&&["follow","hold","charge"].includes(s.ord)&&(a.order=s.ord,s.ord==="hold")){const l=Array.isArray(s.hold)?s.hold:[o.x,o.z,o.face];a.holdPt={x:+l[0],z:+l[1],face:+l[2],isFront:!0}}if(Array.isArray(s.rec))for(let l=0;l<3;l++)for(;(s.rec[l]|0)>c.rec[l];)c.rec[l]++,dc(r,Jf[l])}}function Qv(n){g.role="client",g.mode=n.mode,g.map=To[n.map],g.diff=n.diff,g.ALLY=n.al.split("").map(Number),g.seed=n.seed,g.layout=fc(g.map.id,g.mode==="ctf",g.seed),g.units=[],g.horses=[],g.arrows=[],g.T=0,g.kills=0,g.recruited=0,g.bounty=-1,g.endInfo=null;const e=[0,0,0,0];Object.values(n.seats||{}).forEach(t=>e[t]=1),g.teams=hc(e),g.flag=g.mode==="ctf"?{state:"home",x:0,z:0,carrier:null,dropT:0}:null,Object.assign(ne,{byId:new Map,lastN:-1,lastMsgN:n.m&&n.m.length?n.m[n.m.length-1][0]:0,meId:null,meInit:!1,kickN:0,localCd:0,lastSnapAt:performance.now(),inp:{atk:0,ride:0,rec:[0,0,0],ord:"follow",hold:null,face:0},sendAt:0,arrowIds:new Set,coming:[],leaving:[],horseKey:0,riderKeys:new Map,hudT:0}),g.player=null,Qe.yaw=Math.atan2(-me[g.myTi].pos[0],-me[g.myTi].pos[1]),Qe.pitch=.32,g.state="play",ys.onMatchStart(),Nt.horn(),vs("start",[]),_d(n)}function ey(n,e,t,i,r){const s=e==="captain"&&g.teams[t].human,a={id:n,kind:e,ti:t,leader:e==="captain",human:s,x:i,z:r,y:Bt(i,r),tx:i,tz:r,tface:0,face:0,vx:0,vz:0,vy:0,hp:Xt[e].hp,max:Xt[e].hp,r:Xt[e].r,swing:0,stun:0,blockT:0,dead:!1,deadT:0,mounted:!1,carrying:!1,aim:!1,spd:s?6.3:Xt[e].spd,horseHp:Ao,horseCd:0,summon:!1,blocking:!1,lastHit:-9};return g.units.push(a),ne.byId.set(n,a),a}function ty(n){n.dead||(n.dead=!0,n.deadT=0,n.vy=_e(3,6),n.fallDir=Math.random()<.5?1:-1,n.vx*=.5,n.vz*=.5,ut.emit("splat",{x:n.x,z:n.z,s:_e(1,1.5),ti:n.ti}),Nt.die(n.x,n.z),ne.byId.delete(n.id))}function _d(n){if(n.n===ne.lastN)return;ne.lastN=n.n,ne.lastSnapAt=performance.now();const e=(n.s||"").split("|");if(e.length<8)return;const t=g.myTi;g.T=+e[0]/10,e[1].split(";").forEach((o,c)=>{const l=o.split(",").map(Number),f=g.teams[c];f&&(f.points=l[0]/10,f.tickets=l[1],f.caps=l[2],(c!==t||performance.now()-(ne.goldLocalAt||0)>700)&&(f.gold=l[3]),f.alive=!!l[4],f.leaderDeadT=l[5])}),g.bounty=+e[7];const i=e[6]?e[6].split(";").map(o=>o.split(",")).find(o=>+o[0]===t):null;let r=null;i&&(r=pn(i[1]),ne.meInfo={dead:+i[2],horseHp:+i[3],horseCd:+i[4],summon:+i[5],kn:+i[6],kvx:+i[7],kvz:+i[8],kst:+i[9],hp:+i[10]});const s=new Set;if(e[2])for(const o of e[2].split(";")){const c=o.split(","),l=pn(c[0]),f=parseInt(c[1],16),h=Kf[f>>2],d=f&3,m=vn(c[2]),x=vn(c[3]),_=Df(c[4]),p=pn(c[5]),u=pn(c[6]);s.add(l);let v=ne.byId.get(l);v||(v=ey(l,h,d,m,x),v.face=_);const y=v.hp;v.hp=p/35*v.max,v.hp<y-.5&&l!==r&&(ut.emit("spark",{x:v.x,y:v.y+1.2,z:v.z,c:u&4?"#fff3b0":me[v.ti].css,n:5}),u&4?Nt.clang(v.x,v.z):(Nt.hit(v.x,v.z),Math.random()<.35&&ut.emit("splat",{x:v.x+_e(-.4,.4),z:v.z+_e(-.4,.4),s:_e(.6,1.1),ti:v.ti}))),u&1&&v.swing<=0&&l!==r&&(v.swing=.38,Nt.swing(v.x,v.z)),v.mounted=!!(u&2),v.carrying=!!(u&8),l!==r&&(v.blockT=u&4?.2:0,v.stun=u&16?.1:0,v.aim=!!(u&32)),l!==r?(v.tx=m,v.tz=x,v.tface=_,Math.hypot(v.x-m,v.z-x)>8&&(v.x=m,v.z=x)):(!ne.meInit||ne.meId!==l)&&(v.x=m,v.z=x,v.face=_)}for(const o of[...ne.byId.values()])s.has(o.id)||ty(o);if(r!=null&&ne.byId.get(r)){const o=ne.byId.get(r);ne.meId!==r&&(ne.meId=r,ne.meInit=!0,g.player=o,Qe.yaw=o.face,ne.kickN=ne.meInfo?ne.meInfo.kn:0),g.player=o,o.horseHp=ne.meInfo.horseHp,o.horseCd=ne.meInfo.horseCd,o.summon=!!ne.meInfo.summon,o.hp=ne.meInfo.hp,ne.meInfo.kn!==ne.kickN&&(ne.kickN=ne.meInfo.kn,o.vx+=ne.meInfo.kvx,o.vz+=ne.meInfo.kvz,o.stun=Math.max(o.stun,ne.meInfo.kst),(ne.meInfo.kvx||ne.meInfo.kvz)&&(Qe.shake=.35,wr(30),ut.emit("spark",{x:o.x,y:o.y+1.2,z:o.z,c:me[o.ti].css,n:5}),Nt.hit(o.x,o.z)))}if(g.player&&g.player.dead&&(g.player=null),e[3])for(const o of e[3].split(";")){const c=o.split(","),l=pn(c[0]);if(ne.arrowIds.has(l))continue;ne.arrowIds.add(l);const f=fh({id:l,x0:vn(c[1]),z0:vn(c[2]),y0:pn(c[3])/10,x1:vn(c[4]),z1:vn(c[5]),y1:(pn(c[6])-20)/10,dur:pn(c[7])/100,peak:pn(c[8])/10,ti:+c[10],t:pn(c[9])/100});g.arrows.push(f),Nt.bow(f.x0,f.z0)}ne.arrowIds.size>400&&(ne.arrowIds=new Set([...ne.arrowIds].slice(-200)));const a=e[4]?e[4].split(";").map(o=>o.split(",")):[];if(ne.coming.length=Math.min(ne.coming.length,a.length),a.forEach((o,c)=>{let l=ne.coming[c];l||(l={key:2e5+ ++ne.horseKey,ti:+o[3],x:vn(o[0]),z:vn(o[1]),face:0,spd:14,state:"coming",t:0},ne.coming.push(l)),l.tx=vn(o[0]),l.tz=vn(o[1]),l.face=Df(o[2])}),g.flag&&e[5]){const o=e[5].split(","),c=g.flag;c.state=["home","dropped","carried"][+o[0]],c.x=vn(o[1]),c.z=vn(o[2]),c.carrier=o[3]&&ne.byId.get(pn(o[3]))||null,c.carrier&&(c.carrier.carrying=!0)}for(const o of n.m||[])o[0]>ne.lastMsgN&&(ne.lastMsgN=o[0],vs(o[1],o.slice(2)))}function ny(n){const e=Ie.NET,t=e.room.peers().find(s=>s.peer===e.hostPeer);if(t){e.hostGoneAt=0;const s=t.presence||{};if(s.ph==="lobby")return ys.onLobby(),!1;s.seed===g.seed&&(s.ph==="play"||s.ph==="end")&&_d(s),s.ph==="end"&&g.state==="play"&&Array.isArray(s.res)&&ut.emit("hostEnd",s.res)}else if(e.hostGoneAt||(e.hostGoneAt=performance.now()),performance.now()-e.hostGoneAt>1500)return ys.onAbort("The host left the battle."),!1;if(g.state!=="play"&&g.state!=="end")return!1;ne.localCd-=n;const i=g.player;if(i&&!i.dead&&g.state==="play"){i.stun-=n,gh(i,gd(n),n);for(const s of g.units){if(s===i||s.dead)continue;const a=i.x-s.x,o=i.z-s.z,c=i.r+s.r;if(Math.abs(a)>c||Math.abs(o)>c)continue;const l=Math.hypot(a,o)||.01;l<c&&(i.x+=a/l*(c-l)*.7,i.z+=o/l*(c-l)*.7)}mh(i,n,i.z),i.r=i.mounted?.95:Xt.captain.r,at.attackHeld&&ne.localCd<=0&&Pc.attack()}const r=Math.min(1,n*10);for(const s of g.units){if(s.dead){xc(s,n);continue}if(s===i)continue;const a=s.x,o=s.z;s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r,s.face=ps(s.face,s.tface,n*12),s.vx=(s.x-a)/Math.max(n,.001),s.vz=(s.z-o)/Math.max(n,.001),s.y=Bt(s.x,s.z),s.swing>0&&(s.swing-=n)}i&&i.swing>0&&(i.swing-=n),g.units=g.units.filter(s=>!(s.dead&&s.deadT>12));for(const s of g.units){const a=ne.riderKeys.get(s);s.mounted&&!s.dead&&!a&&ne.riderKeys.set(s,1e5+ ++ne.horseKey),(!s.mounted||s.dead)&&a&&(ne.leaving.push({key:a,ti:s.ti,x:s.x,z:s.z,face:s.face,spd:10,state:"leaving",t:0}),ne.riderKeys.delete(s))}for(const s of ne.coming)s.x+=(s.tx-s.x)*r,s.z+=(s.tz-s.z)*r;for(const s of ne.leaving)s.t+=n,s.x+=Math.sin(s.face)*10*n,s.z+=Math.cos(s.face)*10*n;if(ne.leaving=ne.leaving.filter(s=>s.t<3),xh(n,!1),performance.now()-ne.sendAt>66&&g.state==="play"){ne.sendAt=performance.now();const s={role:"player",nick:Ie.myNick||"Captain",ph:"play",seed:g.seed,atk:ne.inp.atk,ride:ne.inp.ride,rec:ne.inp.rec,ord:ne.inp.ord,hold:ne.inp.hold,face:ne.inp.face,blk:at.blockHeld?1:0};i&&!i.dead&&(s.cap=[i.id,kr(i.x),kr(i.z),kr(i.face),Xr(i.vx),Xr(i.vz)]),e.room.presence(s).catch(()=>{})}return!0}function iy(){const n=[...ne.coming,...ne.leaving];for(const[e,t]of ne.riderKeys)e.dead||n.push({key:t,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:Math.hypot(e.vx,e.vz),state:"ridden",t:0});return n}const ry=n=>n==="follow"?"Follow me!":n==="hold"?"Hold here!":"Charge!",Pc={attack(){const n=g.player;if(!(!n||n.dead||g.state!=="play")){if(n.carrying){yn("carryhint",1500)&&Ir(n.x,n.y+3.2,n.z,"Hands full: carry it home","#fff");return}if(oi()){if(ne.localCd>0)return;ne.localCd=n.mounted?.8:.6;const e=ph(n);e&&!n.mounted&&(n.face=Math.atan2(e.x-n.x,e.z-n.z)),n.swing=.38,Nt.swing(n.x,n.z),ne.inp.atk++,ne.inp.face=kr(n.face);return}_c(n)}},ride(){const n=g.player;if(!(g.state!=="play"||!n||n.dead)){if(oi()){if(!n.mounted){if(n.carrying){vs("rideNo",[g.myTi,"banner"]);return}if(n.horseCd>0){vs("rideNo",[g.myTi,"rest",Math.ceil(n.horseCd)]);return}Nt.neigh()}ne.inp.ride++;return}oh(n)}},order(){const n=g.player;if(g.state!=="play"||!n||n.dead)return;const e=g.teams[g.myTi].order||"follow",t=e==="follow"?"hold":e==="hold"?"charge":"follow";oi()?(g.teams[g.myTi].order=t,ne.inp.ord=t,t==="hold"&&(ne.inp.hold=[Xr(n.x),Xr(n.z),kr(n.face)])):bu(g.myTi,t),Nt.order(),Ir(n.x,n.y+3.2,n.z,ry(t),"#fff"),ut.emit("hud")},recruit(n){if(g.state!=="play")return;const e=Xt[n],t=g.teams[g.myTi];if(!ms(g.myTi)){Nr("No recruits",g.mode==="dm"?"Your team is out of tickets":"You need a castle to recruit","#e0352b");return}if(Es(g.myTi).length>=g.squadCap){Nr("Squad full",`${g.squadCap} soldiers is the limit`);return}if(t.gold<e.cost){Nr("Not enough gold",`A ${e.name.toLowerCase()} costs ${e.cost} gold`,"#ffcf3a");return}oi()?(ne.inp.rec[Jf.indexOf(n)]++,t.gold-=e.cost,ne.goldLocalAt=performance.now(),g.recruited++,Nt.coin()):dc(g.myTi,n);const i=g.player;i&&Ir(i.x,i.y+3,i.z,`${e.name} on the way`,"#fff")}};class sy{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){const e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){const e=[];for(const t of this._parts)e.push(t);return oy(e).buffer}}function oy(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t.set(s,i),i+=r.byteLength}return t}function xd(n){return new ay(n).unpack()}function vd(n){const e=new cy,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}class ay{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){const e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){const e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){const e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){const e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){const e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){const e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){const e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){const e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);const t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){const t=this.read(e);let i=0,r="",s,a;for(;i<e;)s=t[i],s<160?(a=s,i++):(s^192)<32?(a=(s&31)<<6|t[i+1]&63,i+=2):(s^224)<16?(a=(s&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(a=(s&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),r+=String.fromCodePoint(a);return this.index+=e,r}unpack_array(e){const t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){const t={};for(let i=0;i<e;i++){const r=this.unpack();t[r]=this.unpack()}return t}unpack_float(){const e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,r=e&8388607|8388608;return(t===0?1:-1)*r*2**(i-23)}unpack_double(){const e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,r=(e>>20&2047)-1023,a=(e&1048575|1048576)*2**(r-20)+t*2**(r-52);return(i===0?1:-1)*a}read(e){const t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}}class cy{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{const t=e.constructor;if(e instanceof Array){const i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){const i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){const i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){const t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){const t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){const t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");const i=r=>{if(r<t){const s=this.pack(e[r]);return s instanceof Promise?s.then(()=>i(r+1)):i(r+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);const i=Math.floor(Math.log(e)/Math.LN2),r=e/2**i-1,s=Math.floor(r*2**52),a=2**32,o=t<<31|i+1023<<20|s/a&1048575,c=s%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(e){const t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");const r=s=>{if(s<t.length){const a=t[s];if(e.hasOwnProperty(a)){this.pack(a);const o=this.pack(e[a]);if(o instanceof Promise)return o.then(()=>r(s+1))}return r(s+1)}};return r(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){const t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){const t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){const t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new sy,this._textEncoder=new TextEncoder}}let yd=!0,Md=!0;function cs(n,e,t){const i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function rr(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Lc("Unable to polyfill events");return}const r=n.RTCPeerConnection.prototype,s=r.addEventListener;r.addEventListener=function(o,c){if(o!==e)return s.apply(this,arguments);const l=f=>{const h=t(f);h&&(c.handleEvent?c.handleEvent(h):c(h))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),s.apply(this,[o,l])};const a=r.removeEventListener;r.removeEventListener=function(o,c){if(o!==e||!this._eventMap||!this._eventMap[e])return a.apply(this,arguments);if(!this._eventMap[e].has(c))return a.apply(this,arguments);const l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,l])},Object.defineProperty(r,"on"+e,{get(){return this["_on"+e]},set(o){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),o&&this.addEventListener(e,this["_on"+e]=o)},enumerable:!0,configurable:!0})}function ly(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(yd=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function fy(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Md=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Lc(){if(typeof window=="object"){if(yd)return;typeof console!="undefined"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Dc(n,e){Md&&console.warn(n+" is deprecated, please use "+e+" instead.")}function hy(n){const e={browser:null,version:null};if(typeof n=="undefined"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;const{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){const i=t.userAgentData.brands.find(r=>r.brand==="Chromium");if(i){const r=parseInt(i.version,10);if(r>=90)return{browser:"chrome",version:r}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(cs(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(cs(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(cs(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=cs(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function If(n){return Object.prototype.toString.call(n)==="[object Object]"}function Sd(n){return If(n)?Object.keys(n).reduce(function(e,t){const i=If(n[t]),r=i?Sd(n[t]):n[t],s=i&&!Object.keys(r).length;return r===void 0||s?e:Object.assign(e,{[t]:r})},{}):n}function Ja(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Ja(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(r=>{Ja(n,n.get(r),t)})}))}function Uf(n,e,t){const i=t?"outbound-rtp":"inbound-rtp",r=new Map;if(e===null)return r;const s=[];return n.forEach(a=>{a.type==="track"&&a.trackIdentifier===e.id&&s.push(a)}),s.forEach(a=>{n.forEach(o=>{o.type===i&&o.trackId===a.id&&Ja(n,o,r)})}),r}const Nf=Lc;function bd(n,e){if(e.version>=64)return;const t=n&&n.navigator;if(!t.mediaDevices)return;const i=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;const c={};return Object.keys(o).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const f=typeof o[l]=="object"?o[l]:{ideal:o[l]};f.exact!==void 0&&typeof f.exact=="number"&&(f.min=f.max=f.exact);const h=function(d,m){return d?d+m.charAt(0).toUpperCase()+m.slice(1):m==="deviceId"?"sourceId":m};if(f.ideal!==void 0){c.optional=c.optional||[];let d={};typeof f.ideal=="number"?(d[h("min",l)]=f.ideal,c.optional.push(d),d={},d[h("max",l)]=f.ideal,c.optional.push(d)):(d[h("",l)]=f.ideal,c.optional.push(d))}f.exact!==void 0&&typeof f.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[h("",l)]=f.exact):["min","max"].forEach(d=>{f[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[h(d,l)]=f[d])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},r=function(o,c){if(e.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){const l=function(f,h,d){h in f&&!(d in f)&&(f[d]=f[h],delete f[h])};o=JSON.parse(JSON.stringify(o)),l(o.audio,"autoGainControl","googAutoGainControl"),l(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=i(o.audio)}if(o&&typeof o.video=="object"){let l=o.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const f=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!f)){delete o.video.facingMode;let h;if(l.exact==="environment"||l.ideal==="environment"?h=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(h=["front"]),h)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(x=>x.kind==="videoinput");let m=d.find(x=>h.some(_=>x.label.toLowerCase().includes(_)));return!m&&d.length&&h.includes("back")&&(m=d[d.length-1]),m&&(o.video.deviceId=l.exact?{exact:m.deviceId}:{ideal:m.deviceId}),o.video=i(o.video),Nf("chrome: "+JSON.stringify(o)),c(o)})}o.video=i(o.video)}return Nf("chrome: "+JSON.stringify(o)),c(o)},s=function(o){return e.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,l){r(o,f=>{t.webkitGetUserMedia(f,c,h=>{l&&l(s(h))})})};if(t.getUserMedia=a.bind(t),t.mediaDevices.getUserMedia){const o=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return r(c,l=>o(l).then(f=>{if(l.audio&&!f.getAudioTracks().length||l.video&&!f.getVideoTracks().length)throw f.getTracks().forEach(h=>{h.stop()}),new DOMException("","NotFoundError");return f},f=>Promise.reject(s(f))))}}}function Ed(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Td(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=r=>{r.stream.addEventListener("addtrack",s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.track.id):a={track:s.track};const o=new Event("track");o.track=s.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)}),r.stream.getTracks().forEach(s=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===s.id):a={track:s};const o=new Event("track");o.track=s,o.receiver=a,o.transceiver={receiver:a},o.streams=[r.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else rr(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Ad(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){const e=function(r,s){return{track:s,get dtmf(){return this._dtmf===void 0&&(s.kind==="audio"?this._dtmf=r.createDTMFSender(s):this._dtmf=null),this._dtmf},_pc:r}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const r=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,c){let l=r.apply(this,arguments);return l||(l=e(this,o),this._senders.push(l)),l};const s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){s.apply(this,arguments);const c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(s){this._senders=this._senders||[],t.apply(this,[s]),s.getTracks().forEach(a=>{this._senders.push(e(this,a))})};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(s){this._senders=this._senders||[],i.apply(this,[s]),s.getTracks().forEach(a=>{const o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){const e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Cd(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){const i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){const a=i.apply(this,[]);return a.forEach(o=>o._pc=this),a});const r=n.RTCPeerConnection.prototype.addTrack;r&&(n.RTCPeerConnection.prototype.addTrack=function(){const a=r.apply(this,arguments);return a._pc=this,a}),n.RTCRtpSender.prototype.getStats=function(){const a=this;return this._pc.getStats().then(o=>Uf(o,a.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){const i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){const s=i.apply(this,[]);return s.forEach(a=>a._pc=this),s}),rr(n,"track",r=>(r.receiver._pc=r.srcElement,r)),n.RTCRtpReceiver.prototype.getStats=function(){const s=this;return this._pc.getStats().then(a=>Uf(a,s.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;const t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){const r=arguments[0];let s,a,o;return this.getSenders().forEach(c=>{c.track===r&&(s?o=!0:s=c)}),this.getReceivers().forEach(c=>(c.track===r&&(a?o=!0:a=c),c.track===r)),o||s&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):s?s.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function Rd(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=e.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};const t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(l=>{if(this.getSenders().find(h=>h.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const o=this.getSenders();t.apply(this,arguments);const c=this.getSenders().filter(l=>o.indexOf(l)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};const i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],i.apply(this,arguments)};const r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{const c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),r.apply(this,arguments)}}function wd(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return Rd(n);const t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){const f=t.apply(this);return this._reverseStreams=this._reverseStreams||{},f.map(h=>this._reverseStreams[h.id])};const i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(f){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},f.getTracks().forEach(h=>{if(this.getSenders().find(m=>m.track===h))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[f.id]){const h=new n.MediaStream(f.getTracks());this._streams[f.id]=h,this._reverseStreams[h.id]=f,f=h}i.apply(this,[f])};const r=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(f){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},r.apply(this,[this._streams[f.id]||f]),delete this._reverseStreams[this._streams[f.id]?this._streams[f.id].id:f.id],delete this._streams[f.id]},n.RTCPeerConnection.prototype.addTrack=function(f,h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(_=>_===f))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===f))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const x=this._streams[h.id];if(x)x.addTrack(f),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new n.MediaStream([f]);this._streams[h.id]=_,this._reverseStreams[_.id]=h,this.addStream(_)}return this.getSenders().find(_=>_.track===f)};function s(l,f){let h=f.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{const m=l._reverseStreams[d],x=l._streams[m.id];h=h.replace(new RegExp(x.id,"g"),m.id)}),new RTCSessionDescription({type:f.type,sdp:h})}function a(l,f){let h=f.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{const m=l._reverseStreams[d],x=l._streams[m.id];h=h.replace(new RegExp(m.id,"g"),x.id)}),new RTCSessionDescription({type:f.type,sdp:h})}["createOffer","createAnswer"].forEach(function(l){const f=n.RTCPeerConnection.prototype[l],h={[l](){const d=arguments;return arguments.length&&typeof arguments[0]=="function"?f.apply(this,[x=>{const _=s(this,x);d[0].apply(null,[_])},x=>{d[1]&&d[1].apply(null,x)},arguments[2]]):f.apply(this,arguments).then(x=>s(this,x))}};n.RTCPeerConnection.prototype[l]=h[l]});const o=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:s(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(f){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!f._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(f._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(m=>{this._streams[m].getTracks().find(_=>f.track===_)&&(d=this._streams[m])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(f.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Za(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]})}function Pd(n,e){e.version>102||rr(n,"negotiationneeded",t=>{const i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}const kf=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:Pd,shimAddTrackRemoveTrack:wd,shimAddTrackRemoveTrackWithNative:Rd,shimGetSendersWithDtmf:Ad,shimGetUserMedia:bd,shimMediaStream:Ed,shimOnTrack:Td,shimPeerConnection:Za,shimSenderReceiverGetStats:Cd},Symbol.toStringTag,{value:"Module"}));function Ld(n,e){const t=n&&n.navigator;if(!t.mediaDevices)return;const i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(r,s,a){Dc("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(r).then(s,a)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){const r=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},s=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),r(a.audio,"autoGainControl","mozAutoGainControl"),r(a.audio,"noiseSuppression","mozNoiseSuppression")),s(a)},i&&i.prototype.getSettings){const a=i.prototype.getSettings;i.prototype.getSettings=function(){const o=a.apply(this,arguments);return r(o,"mozAutoGainControl","autoGainControl"),r(o,"mozNoiseSuppression","noiseSuppression"),o}}if(i&&i.prototype.applyConstraints){const a=i.prototype.applyConstraints;i.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),r(o,"autoGainControl","mozAutoGainControl"),r(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function dy(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){const r=new DOMException("getDisplayMedia without video constraints is undefined");return r.name="NotFoundError",r.code=8,Promise.reject(r)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Dd(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Qa(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){const i=n.RTCPeerConnection.prototype[t],r={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=r[t]}))}function Id(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;const t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){const[s,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[s||null]).then(c=>{if(e.version<53&&!a)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((f,h)=>{c.set(h,Object.assign({},f,{type:t[f.type]||f.type}))})}return c}).then(a,o)}}function Ud(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;const e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){const r=e.apply(this,[]);return r.forEach(s=>s._pc=this),r});const t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){const r=t.apply(this,arguments);return r._pc=this,r}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Nd(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;const e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){const i=e.apply(this,[]);return i.forEach(r=>r._pc=this),i}),rr(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function kd(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Dc("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Od(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Fd(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let r=arguments[1]&&arguments[1].sendEncodings;r===void 0&&(r=[]),r=[...r];const s=r.length>0;s&&r.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const a=t.apply(this,arguments);if(s){const{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=r,o.sendEncodings=r,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function zd(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;const t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){const r=t.apply(this,arguments);return"encodings"in r||(r.encodings=[].concat(this.sendEncodings||[{}])),r})}function Bd(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Hd(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;const t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}const Of=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:Fd,shimCreateAnswer:Hd,shimCreateOffer:Bd,shimGetDisplayMedia:dy,shimGetParameters:zd,shimGetStats:Id,shimGetUserMedia:Ld,shimOnTrack:Dd,shimPeerConnection:Qa,shimRTCDataChannel:Od,shimReceiverGetStats:Nd,shimRemoveStream:kd,shimSenderGetStats:Ud},Symbol.toStringTag,{value:"Module"}));function Gd(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){const e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(r=>e.call(this,r,i)),i.getVideoTracks().forEach(r=>e.call(this,r,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...r){return r&&r.forEach(s=>{this._localStreams?this._localStreams.includes(s)||this._localStreams.push(s):this._localStreams=[s]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);const i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);const r=t.getTracks();this.getSenders().forEach(s=>{r.includes(s.track)&&this.removeTrack(s)})})}}function Vd(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(r=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(r))return;this._remoteStreams.push(r);const s=new Event("addstream");s.stream=r,this.dispatchEvent(s)})})}});const e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){const i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(r){r.streams.forEach(s=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(s)>=0)return;i._remoteStreams.push(s);const a=new Event("addstream");a.stream=s,i.dispatchEvent(a)})}),e.apply(i,arguments)}}}function Wd(n){if(typeof n!="object"||!n.RTCPeerConnection)return;const e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,r=e.setLocalDescription,s=e.setRemoteDescription,a=e.addIceCandidate;e.createOffer=function(l,f){const h=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[h]);return f?(d.then(l,f),Promise.resolve()):d},e.createAnswer=function(l,f){const h=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[h]);return f?(d.then(l,f),Promise.resolve()):d};let o=function(c,l,f){const h=r.apply(this,[c]);return f?(h.then(l,f),Promise.resolve()):h};e.setLocalDescription=o,o=function(c,l,f){const h=s.apply(this,[c]);return f?(h.then(l,f),Promise.resolve()):h},e.setRemoteDescription=o,o=function(c,l,f){const h=a.apply(this,[c]);return f?(h.then(l,f),Promise.resolve()):h},e.addIceCandidate=o}function Xd(n){const e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){const t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=r=>i(jd(r))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,r,s){e.mediaDevices.getUserMedia(i).then(r,s)}.bind(e))}function jd(n){return n&&n.video!==void 0?Object.assign({},n,{video:Sd(n.video)}):n}function qd(n){if(!n.RTCPeerConnection)return;const e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,r){if(i&&i.iceServers){const s=[];for(let a=0;a<i.iceServers.length;a++){let o=i.iceServers[a];o.urls===void 0&&o.url?(Dc("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,s.push(o)):s.push(i.iceServers[a])}i.iceServers=s}return new e(i,r)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function $d(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Yd(n){const e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio!="undefined"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);const r=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveAudio===!0&&!r&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo!="undefined"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);const s=this.getTransceivers().find(a=>a.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveVideo===!0&&!s&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function Kd(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}const Ff=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:Kd,shimCallbacksAPI:Wd,shimConstraints:jd,shimCreateOfferLegacy:Yd,shimGetUserMedia:Xd,shimLocalStreamsAPI:Gd,shimRTCIceServerUrls:qd,shimRemoteStreamsAPI:Vd,shimTrackEventTransceiver:$d},Symbol.toStringTag,{value:"Module"}));function uy(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Jd={exports:{}};(function(n){const e={};e.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},e.localCName=e.generateIdentifier(),e.splitLines=function(t){return t.trim().split(`
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
`),i},e.parseRtpParameters=function(t){const i={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},s=e.splitLines(t)[0].split(" ");i.profile=s[2];for(let o=3;o<s.length;o++){const c=s[o],l=e.matchPrefix(t,"a=rtpmap:"+c+" ")[0];if(l){const f=e.parseRtpMap(l),h=e.matchPrefix(t,"a=fmtp:"+c+" ");switch(f.parameters=h.length?e.parseFmtp(h[0]):{},f.rtcpFeedback=e.matchPrefix(t,"a=rtcp-fb:"+c+" ").map(e.parseRtcpFb),i.codecs.push(f),f.name.toUpperCase()){case"RED":case"ULPFEC":i.fecMechanisms.push(f.name.toUpperCase());break}}}e.matchPrefix(t,"a=extmap:").forEach(o=>{i.headerExtensions.push(e.parseExtmap(o))});const a=e.matchPrefix(t,"a=rtcp-fb:* ").map(e.parseRtcpFb);return i.codecs.forEach(o=>{a.forEach(c=>{o.rtcpFeedback.find(f=>f.type===c.type&&f.parameter===c.parameter)||o.rtcpFeedback.push(c)})}),i},e.writeRtpDescription=function(t,i){let r="";r+="m="+t+" ",r+=i.codecs.length>0?"9":"0",r+=" "+(i.profile||"UDP/TLS/RTP/SAVPF")+" ",r+=i.codecs.map(a=>a.preferredPayloadType!==void 0?a.preferredPayloadType:a.payloadType).join(" ")+`\r
`,r+=`c=IN IP4 0.0.0.0\r
`,r+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,i.codecs.forEach(a=>{r+=e.writeRtpMap(a),r+=e.writeFmtp(a),r+=e.writeRtcpFb(a)});let s=0;return i.codecs.forEach(a=>{a.maxptime>s&&(s=a.maxptime)}),s>0&&(r+="a=maxptime:"+s+`\r
`),i.headerExtensions&&i.headerExtensions.forEach(a=>{r+=e.writeExtmap(a)}),r},e.parseRtpEncodingParameters=function(t){const i=[],r=e.parseRtpParameters(t),s=r.fecMechanisms.indexOf("RED")!==-1,a=r.fecMechanisms.indexOf("ULPFEC")!==-1,o=e.matchPrefix(t,"a=ssrc:").map(d=>e.parseSsrcMedia(d)).filter(d=>d.attribute==="cname"),c=o.length>0&&o[0].ssrc;let l;const f=e.matchPrefix(t,"a=ssrc-group:FID").map(d=>d.substring(17).split(" ").map(x=>parseInt(x,10)));f.length>0&&f[0].length>1&&f[0][0]===c&&(l=f[0][1]),r.codecs.forEach(d=>{if(d.name.toUpperCase()==="RTX"&&d.parameters.apt){let m={ssrc:c,codecPayloadType:parseInt(d.parameters.apt,10)};c&&l&&(m.rtx={ssrc:l}),i.push(m),s&&(m=JSON.parse(JSON.stringify(m)),m.fec={ssrc:c,mechanism:a?"red+ulpfec":"red"},i.push(m))}}),i.length===0&&c&&i.push({ssrc:c});let h=e.matchPrefix(t,"b=");return h.length&&(h[0].indexOf("b=TIAS:")===0?h=parseInt(h[0].substring(7),10):h[0].indexOf("b=AS:")===0?h=parseInt(h[0].substring(5),10)*1e3*.95-50*40*8:h=void 0,i.forEach(d=>{d.maxBitrate=h})),i},e.parseRtcpParameters=function(t){const i={},r=e.matchPrefix(t,"a=ssrc:").map(o=>e.parseSsrcMedia(o)).filter(o=>o.attribute==="cname")[0];r&&(i.cname=r.value,i.ssrc=r.ssrc);const s=e.matchPrefix(t,"a=rtcp-rsize");i.reducedSize=s.length>0,i.compound=s.length===0;const a=e.matchPrefix(t,"a=rtcp-mux");return i.mux=a.length>0,i},e.writeRtcpParameters=function(t){let i="";return t.reducedSize&&(i+=`a=rtcp-rsize\r
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
`},e.getDirection=function(t,i){const r=e.splitLines(t);for(let s=0;s<r.length;s++)switch(r[s]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[s].substring(2)}return i?e.getDirection(i):"sendrecv"},e.getKind=function(t){return e.splitLines(t)[0].split(" ")[0].substring(2)},e.isRejected=function(t){return t.split(" ",2)[1]==="0"},e.parseMLine=function(t){const r=e.splitLines(t)[0].substring(2).split(" ");return{kind:r[0],port:parseInt(r[1],10),protocol:r[2],fmt:r.slice(3).join(" ")}},e.parseOLine=function(t){const r=e.matchPrefix(t,"o=")[0].substring(2).split(" ");return{username:r[0],sessionId:r[1],sessionVersion:parseInt(r[2],10),netType:r[3],addressType:r[4],address:r[5]}},e.isValidSDP=function(t){if(typeof t!="string"||t.length===0)return!1;const i=e.splitLines(t);for(let r=0;r<i.length;r++)if(i[r].length<2||i[r].charAt(1)!=="=")return!1;return!0},n.exports=e})(Jd);var Zd=Jd.exports;const Or=uy(Zd),py=_u({__proto__:null,default:Or},[Zd]);function no(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;const e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){const r=new e(i),s=Or.parseCandidate(i.candidate);for(const a in s)a in r||Object.defineProperty(r,a,{value:s[a]});return r.toJSON=function(){return{candidate:r.candidate,sdpMid:r.sdpMid,sdpMLineIndex:r.sdpMLineIndex,usernameFragment:r.usernameFragment}},r}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,rr(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function ec(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||rr(n,"icecandidate",e=>{if(e.candidate){const t=Or.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function io(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp}});const t=function(o){if(!o||!o.sdp)return!1;const c=Or.splitSections(o.sdp);return c.shift(),c.some(l=>{const f=Or.parseMLine(l);return f&&f.kind==="application"&&f.protocol.indexOf("SCTP")!==-1})},i=function(o){const c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},r=function(o){let c=65536;return e.browser==="firefox"&&(e.version<57?o===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},s=function(o,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);const f=Or.matchPrefix(o.sdp,"a=max-message-size:");return f.length>0?l=parseInt(f[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},a=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp=="undefined"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){const c=i(arguments[0]),l=r(c),f=s(arguments[0],c);let h;l===0&&f===0?h=Number.POSITIVE_INFINITY:l===0||f===0?h=Math.max(l,f):h=Math.min(l,f);const d={};Object.defineProperty(d,"maxMessageSize",{get(){return h}}),this._sctp=d}return a.apply(this,arguments)}}function ro(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(r,s){const a=r.send;r.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(r.readyState==="open"&&s.sctp&&l>s.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+s.sctp.maxMessageSize+" bytes)");return a.apply(r,arguments)}}const i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){const s=i.apply(this,arguments);return t(s,this),s},rr(n,"datachannel",r=>(t(r.channel,r.target),r))}function tc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;const e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{const i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=r=>{const s=r.target;if(s._lastConnectionState!==s.connectionState){s._lastConnectionState=s.connectionState;const a=new Event("connectionstatechange",r);s.dispatchEvent(a)}return r},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function nc(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;const t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(r){if(r&&r.sdp&&r.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const s=r.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&r instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:r.type,sdp:s}):r.sdp=s}return t.apply(this,arguments)}}function so(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function oo(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;const t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let r=arguments[0]||{};if(typeof r!="object"||r.type&&r.sdp)return t.apply(this,arguments);if(r={type:r.type,sdp:r.sdp},!r.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":r.type="offer";break;default:r.type="answer";break}return r.sdp||r.type!=="offer"&&r.type!=="answer"?t.apply(this,[r]):(r.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>t.apply(this,[a]))})}const my=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:nc,shimAddIceCandidateNullOrEmpty:so,shimConnectionState:tc,shimMaxMessageSize:io,shimParameterlessSetLocalDescription:oo,shimRTCIceCandidate:no,shimRTCIceCandidateRelayProtocol:ec,shimSendThrowTypeError:ro},Symbol.toStringTag,{value:"Module"}));function gy({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const t=Lc,i=hy(n),r={browserDetails:i,commonShim:my,extractVersion:cs,disableLog:ly,disableWarnings:fy,sdp:py};switch(i.browser){case"chrome":if(!kf||!Za||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),r;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),r;t("adapter.js shimming chrome."),r.browserShim=kf,so(n,i),oo(n),bd(n,i),Ed(n),Za(n,i),Td(n,i),wd(n,i),Ad(n),Cd(n,i),Pd(n,i),no(n),ec(n),tc(n),io(n,i),ro(n,i),nc(n,i);break;case"firefox":if(!Of||!Qa||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),r;t("adapter.js shimming firefox."),r.browserShim=Of,so(n,i),oo(n),Ld(n,i),Qa(n,i),Id(n,i),Dd(n),kd(n),Ud(n),Nd(n),Od(n),Fd(n,i),zd(n,i),Bd(n,i),Hd(n,i),no(n),tc(n),io(n,i),ro(n,i);break;case"safari":if(!Ff||!e.shimSafari)return t("Safari shim is not included in this adapter release."),r;t("adapter.js shimming safari."),r.browserShim=Ff,so(n,i),oo(n),qd(n),Yd(n),Wd(n),Gd(n),Vd(n),$d(n),Xd(n),Kd(n),no(n),ec(n),io(n,i),ro(n,i),nc(n,i);break;default:t("Unsupported browser!");break}return r}const zf=gy({window:typeof window=="undefined"?void 0:window});function sr(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}class Qd{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{const t=[],i=e.byteLength,r=Math.ceil(i/this.chunkedMTU);let s=0,a=0;for(;a<i;){const o=Math.min(i,a+this.chunkedMTU),c=e.slice(a,o),l={__peerData:this._dataCount,n:s,data:c,total:r};t.push(l),a=o,s++}return this._dataCount++,t}}}function _y(n){let e=0;for(const r of n)e+=r.byteLength;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.byteLength;return t}const Ca=zf.default||zf,as=new class{isWebRTCSupported(){return typeof RTCPeerConnection!="undefined"}isBrowserSupported(){const n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return Ca.browserDetails.browser}getVersion(){return Ca.browserDetails.version||0}isUnifiedPlanSupported(){const n=this.getBrowser(),e=Ca.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator!="undefined"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},xy=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),eu=()=>Math.random().toString(36).slice(2),Bf={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class vy extends Qd{noop(){}blobToArrayBuffer(e,t){const i=new FileReader;return i.onload=function(r){r.target&&t(r.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Bf,this.browser=as.getBrowser(),this.browserVersion=as.getVersion(),this.pack=vd,this.unpack=xd,this.supports=function(){const t={browser:as.isBrowserSupported(),webRTC:as.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(Bf),t.audioVideo=!0;let r;try{r=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!r.ordered;try{r.binaryType="blob",t.binaryBlob=!as.isIOS}catch{}}catch{}finally{r&&r.close()}}catch{}finally{i&&i.close()}return t}(),this.validateId=xy,this.randomToken=eu}}const on=new vy,yy="PeerJS: ";var Hf;(function(n){n[n.Disabled=0]="Disabled",n[n.Errors=1]="Errors",n[n.Warnings=2]="Warnings",n[n.All=3]="All"})(Hf||(Hf={}));class My{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){const i=[yy,...t];for(const r in i)i[r]instanceof Error&&(i[r]="("+i[r].name+") "+i[r].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}}var de=new My,Ic={},Sy=Object.prototype.hasOwnProperty,nn="~";function Ms(){}Object.create&&(Ms.prototype=Object.create(null),new Ms().__proto__||(nn=!1));function by(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function tu(n,e,t,i,r){if(typeof t!="function")throw new TypeError("The listener must be a function");var s=new by(t,i||n,r),a=nn?nn+e:e;return n._events[a]?n._events[a].fn?n._events[a]=[n._events[a],s]:n._events[a].push(s):(n._events[a]=s,n._eventsCount++),n}function ao(n,e){--n._eventsCount===0?n._events=new Ms:delete n._events[e]}function $t(){this._events=new Ms,this._eventsCount=0}$t.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)Sy.call(t,i)&&e.push(nn?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};$t.prototype.listeners=function(e){var t=nn?nn+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var r=0,s=i.length,a=new Array(s);r<s;r++)a[r]=i[r].fn;return a};$t.prototype.listenerCount=function(e){var t=nn?nn+e:e,i=this._events[t];return i?i.fn?1:i.length:0};$t.prototype.emit=function(e,t,i,r,s,a){var o=nn?nn+e:e;if(!this._events[o])return!1;var c=this._events[o],l=arguments.length,f,h;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,r),!0;case 5:return c.fn.call(c.context,t,i,r,s),!0;case 6:return c.fn.call(c.context,t,i,r,s,a),!0}for(h=1,f=new Array(l-1);h<l;h++)f[h-1]=arguments[h];c.fn.apply(c.context,f)}else{var d=c.length,m;for(h=0;h<d;h++)switch(c[h].once&&this.removeListener(e,c[h].fn,void 0,!0),l){case 1:c[h].fn.call(c[h].context);break;case 2:c[h].fn.call(c[h].context,t);break;case 3:c[h].fn.call(c[h].context,t,i);break;case 4:c[h].fn.call(c[h].context,t,i,r);break;default:if(!f)for(m=1,f=new Array(l-1);m<l;m++)f[m-1]=arguments[m];c[h].fn.apply(c[h].context,f)}}return!0};$t.prototype.on=function(e,t,i){return tu(this,e,t,i,!1)};$t.prototype.once=function(e,t,i){return tu(this,e,t,i,!0)};$t.prototype.removeListener=function(e,t,i,r){var s=nn?nn+e:e;if(!this._events[s])return this;if(!t)return ao(this,s),this;var a=this._events[s];if(a.fn)a.fn===t&&(!r||a.once)&&(!i||a.context===i)&&ao(this,s);else{for(var o=0,c=[],l=a.length;o<l;o++)(a[o].fn!==t||r&&!a[o].once||i&&a[o].context!==i)&&c.push(a[o]);c.length?this._events[s]=c.length===1?c[0]:c:ao(this,s)}return this};$t.prototype.removeAllListeners=function(e){var t;return e?(t=nn?nn+e:e,this._events[t]&&ao(this,t)):(this._events=new Ms,this._eventsCount=0),this};$t.prototype.off=$t.prototype.removeListener;$t.prototype.addListener=$t.prototype.on;$t.prefixed=nn;$t.EventEmitter=$t;Ic=$t;var or={};sr(or,"ConnectionType",()=>Gn);sr(or,"PeerErrorType",()=>yt);sr(or,"BaseConnectionErrorType",()=>Ss);sr(or,"DataConnectionErrorType",()=>bs);sr(or,"SerializationType",()=>jr);sr(or,"SocketEventType",()=>Hn);sr(or,"ServerMessageType",()=>Ut);var Gn;(function(n){n.Data="data",n.Media="media"})(Gn||(Gn={}));var yt;(function(n){n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc"})(yt||(yt={}));var Ss;(function(n){n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed"})(Ss||(Ss={}));var bs;(function(n){n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big"})(bs||(bs={}));var jr;(function(n){n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw"})(jr||(jr={}));var Hn;(function(n){n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close"})(Hn||(Hn={}));var Ut;(function(n){n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE"})(Ut||(Ut={}));var Uc={};Uc=JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz Stückler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","parcel":"^2.9.3","prettier":"^3.0.0","semantic-release":"^21.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');class Ey extends Ic.EventEmitter{constructor(e,t,i,r,s,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];const o=e?"wss://":"ws://";this._baseUrl=o+t+":"+i+r+"peerjs?key="+s}start(e,t){this._id=e;const i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Uc.version),this._disconnected=!1,this._socket.onmessage=r=>{let s;try{s=JSON.parse(r.data),de.log("Server message received:",s)}catch{de.log("Invalid server message",r.data);return}this.emit(Hn.Message,s)},this._socket.onclose=r=>{this._disconnected||(de.log("Socket closed.",r),this._cleanup(),this._disconnected=!0,this.emit(Hn.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),de.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){de.log("Cannot send heartbeat, because socket closed");return}const e=JSON.stringify({type:Ut.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const e=[...this._messagesQueue];this._messagesQueue=[];for(const t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Hn.Error,"Invalid message");return}if(!this._wsOpen())return;const t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class nu{constructor(e){this.connection=e}startConnection(e){const t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Gn.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){const i=this.connection,r={ordered:!!e.reliable},s=t.createDataChannel(i.label,r);i._initializeDataChannel(s),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){de.log("Creating RTCPeerConnection.");const e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){const t=this.connection.peer,i=this.connection.connectionId,r=this.connection.type,s=this.connection.provider;de.log("Listening for ICE candidates."),e.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(de.log(`Received ICE candidates for ${t}:`,a.candidate),s.socket.send({type:Ut.Candidate,payload:{candidate:a.candidate,type:r,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":de.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(Ss.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":de.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(Ss.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":de.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},de.log("Listening for data channel"),e.ondatachannel=a=>{de.log("Received data channel");const o=a.channel;s.getConnection(t,i)._initializeDataChannel(o)},de.log("Listening for remote stream"),e.ontrack=a=>{de.log("Received remote stream");const o=a.streams[0],c=s.getConnection(t,i);if(c.type===Gn.Media){const l=c;this._addStreamToMediaConnection(o,l)}}}cleanup(){de.log("Cleaning up PeerConnection to "+this.connection.peer);const e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};const t=e.signalingState!=="closed";let i=!1;const r=this.connection.dataChannel;r&&(i=!!r.readyState&&r.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createOffer(this.connection.options.constraints);de.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),de.log("Set localDescription:",i,`for:${this.connection.peer}`);let r={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Gn.Data){const s=this.connection;r={...r,label:s.label,reliable:s.reliable,serialization:s.serialization}}t.socket.send({type:Ut.Offer,payload:r,dst:this.connection.peer})}catch(r){r!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(yt.WebRTC,r),de.log("Failed to setLocalDescription, ",r))}}catch(i){t.emitError(yt.WebRTC,i),de.log("Failed to createOffer, ",i)}}async _makeAnswer(){const e=this.connection.peerConnection,t=this.connection.provider;try{const i=await e.createAnswer();de.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),de.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Ut.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(r){t.emitError(yt.WebRTC,r),de.log("Failed to setLocalDescription, ",r)}}catch(i){t.emitError(yt.WebRTC,i),de.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);const i=this.connection.peerConnection,r=this.connection.provider;de.log("Setting remote description",t);const s=this;try{await i.setRemoteDescription(t),de.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await s._makeAnswer()}catch(a){r.emitError(yt.WebRTC,a),de.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(e){de.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),de.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(yt.WebRTC,t),de.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(de.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return de.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){de.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}class iu extends Ic.EventEmitter{emitError(e,t){de.error("Error:",t),this.emit("error",new Ty(`${e}`,t))}}class Ty extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}}class ru extends iu{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}}var rc;const hs=class hs extends ru{get type(){return Gn.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||hs.ID_PREFIX+on.randomToken(),this._negotiator=new nu(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{de.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{de.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){de.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){const t=e.type,i=e.payload;switch(e.type){case Ut.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Ut.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:de.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){de.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});const i=this.provider._getMessages(this.connectionId);for(const r of i)this.handleMessage(r);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};rc=new WeakMap,Zr(hs,rc,hs.ID_PREFIX="mc_");let Mo=hs;class Ay{constructor(e){this._options=e}_buildRequest(e){const t=this._options.secure?"https":"http",{host:i,port:r,path:s,key:a}=this._options,o=new URL(`${t}://${i}:${r}${s}${a}/${e}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",Uc.version),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){de.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==on.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{const e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===on.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw de.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}}var sc,oc;const Hi=class Hi extends ru{get type(){return Gn.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||Hi.ID_PREFIX+eu(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new nu(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{de.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{de.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{de.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(bs.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){const t=e.payload;switch(e.type){case Ut.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Ut.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:de.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};sc=new WeakMap,oc=new WeakMap,Zr(Hi,sc,Hi.ID_PREFIX="dc_"),Zr(Hi,oc,Hi.MAX_BUFFERED_AMOUNT=8388608);let So=Hi;class Nc extends So{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>So.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return de.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e!=null&&e.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class Ra extends Nc{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Qd,this.serialization=jr.Binary,this._chunkedData={}}_handleDataMessage({data:e}){const t=xd(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){const t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];const r=_y(i.data);this._handleDataMessage({data:r})}}_send(e,t){const i=vd(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){const t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){const t=this.chunker.chunk(e);de.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(const i of t)this.send(i,!0)}}class Cy extends Nc{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=jr.None}}class Ry extends Nc{_handleDataMessage({data:e}){const t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){const i=this.encoder.encode(this.stringify(e));if(i.byteLength>=on.chunkedMTU){this.emitError(bs.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=jr.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var ac;const ds=class ds extends iu{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const e=Object.create(null);for(const[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:Cy,json:Ry,binary:Ra,"binary-utf8":Ra,default:Ra},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:on.CLOUD_HOST,port:on.CLOUD_PORT,path:"/",key:ds.DEFAULT_KEY,token:on.randomToken(),config:on.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==on.CLOUD_HOST?this._options.secure=on.isSecure():this._options.host==on.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&de.setLogFunction(this._options.logFunction),de.logLevel=this._options.debug||0,this._api=new Ay(t),this._socket=this._createServerConnection(),!on.supports.audioVideo&&!on.supports.data){this._delayedAbort(yt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!on.validateId(i)){this._delayedAbort(yt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(r=>this._initialize(r)).catch(r=>this._abort(yt.ServerError,r))}_createServerConnection(){const e=new Ey(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Hn.Message,t=>{this._handleMessage(t)}),e.on(Hn.Error,t=>{this._abort(yt.SocketError,t)}),e.on(Hn.Disconnected,()=>{this.disconnected||(this.emitError(yt.Network,"Lost connection to server."),this.disconnect())}),e.on(Hn.Close,()=>{this.disconnected||this._abort(yt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){const t=e.type,i=e.payload,r=e.src;switch(t){case Ut.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Ut.Error:this._abort(yt.ServerError,i.msg);break;case Ut.IdTaken:this._abort(yt.UnavailableID,`ID "${this.id}" is taken`);break;case Ut.InvalidKey:this._abort(yt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Ut.Leave:de.log(`Received leave message from ${r}`),this._cleanupPeer(r),this._connections.delete(r);break;case Ut.Expire:this.emitError(yt.PeerUnavailable,`Could not connect to peer ${r}`);break;case Ut.Offer:{const s=i.connectionId;let a=this.getConnection(r,s);if(a&&(a.close(),de.warn(`Offer received for existing Connection ID:${s}`)),i.type===Gn.Media){const c=new Mo(r,this,{connectionId:s,_payload:i,metadata:i.metadata});a=c,this._addConnection(r,a),this.emit("call",c)}else if(i.type===Gn.Data){const c=new this._serializers[i.serialization](r,this,{connectionId:s,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});a=c,this._addConnection(r,a),this.emit("connection",c)}else{de.warn(`Received malformed connection type:${i.type}`);return}const o=this._getMessages(s);for(const c of o)a.handleMessage(c);break}default:{if(!i){de.warn(`You received a malformed message from ${r} of type ${t}`);return}const s=i.connectionId,a=this.getConnection(r,s);a&&a.peerConnection?a.handleMessage(e):s?this._storeMessage(s,e):de.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){const t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){de.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(yt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){de.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(yt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){de.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const r=new Mo(e,this,{...i,_stream:t});return this._addConnection(e,r),r}_addConnection(e,t){de.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){const t=this._connections.get(e.peer);if(t){const i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){const i=this._connections.get(e);if(!i)return null;for(const r of i)if(r.connectionId===t)return r;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){de.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(de.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){const t=this._connections.get(e);if(t)for(const i of t)i.close()}disconnect(){if(this.disconnected)return;const e=this.id;de.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)de.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)de.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(yt.ServerError,t))}};ac=new WeakMap,Zr(ds,ac,ds.DEFAULT_KEY="peerjs");let bo=ds;const wa="fourbanners-v1-",Gf="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function wy(){let n="";for(let e=0;e<4;e++)n+=Gf[Math.floor(Math.random()*Gf.length)];return n}const Py=()=>typeof window.RTCPeerConnection=="function"&&/^https?:$/.test(location.protocol),Vf=()=>Object.assign({debug:0},window.__PEER_OPTS||{});function Wf(n,e){return new Promise((t,i)=>{if(typeof window.RTCPeerConnection!="function"){i({type:"no-webrtc"});return}const r=new Map,s=[],a=new Map,o=new Map;let c={},l=null,f=null,h=!1,d=0,m=null;const x=(N,C)=>{h||(h=!0,clearTimeout(_),N?t(C):i(C))},_=setTimeout(()=>{try{F.destroy()}catch{}x(!1,{type:"timeout"})},12e3),p=N=>N===l||performance.now()-(o.get(N)||0)<6e3,u=()=>[...r.entries()].filter(([N])=>p(N)).map(([N,C])=>({peer:N,sameTab:N===l,isMe:N===l,presence:C}));let v=null;const y=()=>{v=null;const N=u();for(const C of s)try{C({peers:N})}catch(I){console.error(I)}},S=()=>{v||(v=setTimeout(y,16))},P=N=>({role:N.role,nick:N.nick,want:N.want,ph:N.ph});function R(){d=performance.now(),m=null;const N={};for(const[C,I]of r)N[C]=C===l?I:P(I);for(const C of a.values())if(C.open)try{C.send({t:"all",all:N})}catch{}}function w(){if(m)return;const N=Math.max(0,250-(performance.now()-d));m=setTimeout(R,N)}const F=e?new bo(wa+n,Vf()):new bo(Vf());F.on("open",N=>{if(l=N,r.set(N,c),e){x(!0,W);return}f=F.connect(wa+n,{reliable:!0,serialization:"json"}),f.on("open",()=>{try{f.send({t:"p",pr:c})}catch{}x(!0,W)}),f.on("data",C=>{if(!(!C||typeof C!="object")){if(o.set(wa+n,performance.now()),C.t==="full"){x(!1,{type:"full"});return}if(C.t==="all"&&C.all&&typeof C.all=="object"){for(const I of[...r.keys()])I!==l&&!(I in C.all)&&r.delete(I);for(const[I,V]of Object.entries(C.all))I!==l&&V&&typeof V=="object"&&(r.set(I,V),o.set(I,performance.now()));S()}else C.t==="h"&&typeof C.id=="string"&&C.pr&&typeof C.pr=="object"&&(r.set(C.id,C.pr),S())}}),f.on("close",()=>{for(const C of[...r.keys()])C!==l&&r.delete(C);S()}),f.on("error",()=>{})}),F.on("connection",N=>{if(!e){N.close();return}if(a.size>=3){N.on("open",()=>{try{N.send({t:"full"})}catch{}setTimeout(()=>N.close(),400)});return}a.set(N.peer,N),o.set(N.peer,performance.now()),N.on("open",()=>{R();try{N.send({t:"h",id:l,pr:c})}catch{}}),N.on("data",I=>{if(!I||I.t!=="p"||!I.pr||typeof I.pr!="object")return;o.set(N.peer,performance.now());const V=r.get(N.peer);r.set(N.peer,I.pr),S(),(!V||V.nick!==I.pr.nick||V.want!==I.pr.want||V.ph!==I.pr.ph||V.role!==I.pr.role)&&w()});const C=()=>{a.has(N.peer)&&(a.delete(N.peer),r.delete(N.peer),S(),w())};N.on("close",C),N.on("error",C)}),F.on("error",N=>{if(!h){try{F.destroy()}catch{}x(!1,N);return}if(N&&N.type==="peer-unavailable"&&!e){for(const C of[...r.keys()])C!==l&&r.delete(C);S()}}),F.on("disconnected",()=>{if(!F.destroyed)try{F.reconnect()}catch{}});let b=0;const T=()=>{if(b=performance.now(),e){for(const N of a.values())if(N.open)try{N.send({t:"h",id:l,pr:c})}catch{}}else if(f&&f.open)try{f.send({t:"p",pr:c})}catch{}},G=setInterval(()=>{if(F.destroyed){clearInterval(G);return}if(performance.now()-b>1500&&T(),e){for(const[N,C]of[...a])if(performance.now()-(o.get(N)||performance.now())>8e3){try{C.close()}catch{}a.delete(N),r.delete(N),S(),w()}}S()},1e3),W={name:n,presence:async N=>{for(const C in N)N[C]===null?delete c[C]:c[C]=N[C];r.set(l,c),T()},peers:u,onPeers:N=>(s.push(N),setTimeout(()=>N({peers:u()}),0),()=>{const C=s.indexOf(N);C>=0&&s.splice(C,1)}),leave:async()=>{clearInterval(G);try{F.destroy()}catch{}}}})}const Se=n=>document.getElementById(n);let Vi={startMatch(){},seedDemo(){},preset:()=>"ffa"},gi=!1;function su(){["ovTitle","ovLobby","ovEnd"].forEach(e=>Se(e).hidden=!0),Se("ovBrowse").hidden=!1,Se("nick").value=Ie.myNick,Se("netNote").textContent="";const n=Py();Se("hostBtn").disabled=!n,Se("joinBtn").disabled=!n,n||(Se("netNote").textContent=/^https?:$/.test(location.protocol)?"Multiplayer could not start in this browser. Open the game's website link in Safari or Chrome.":"Multiplayer only works when the game is opened from its website.")}function eo(){Ie.myNick=(Se("nick").value||"").trim().slice(0,16);try{localStorage.setItem("fb-nick",Ie.myNick)}catch{}}function Eo(){var e;const n=Ie.NET;g.state!=="lobby"&&Vi.seedDemo(),n.lobbySig=null,g.state="lobby",["ovTitle","ovBrowse","ovEnd"].forEach(t=>Se(t).hidden=!0),Se("hudWrap").hidden=!0,Se("ovLobby").hidden=!1,n.role==="host"?qr():n.room.presence({role:"player",nick:Ie.myNick||"Captain",ph:"lobby",want:(e=n.want)!=null?e:-1}).catch(()=>{}),kc()}function qr(){const n=Ie.NET;if(!n||n.role!=="host")return;const e=n.room.peers(),t=new Set(e.map(a=>a.peer)),i=No(n.room);if(i&&n.me!==i){const a=n.seats[n.me];delete n.seats[n.me],n.me=i,n.seats[i]=a===void 0?0:a}for(const a of Object.keys(n.seats))!t.has(a)&&a!==n.me&&delete n.seats[a];const r=()=>Object.values(n.seats);for(const a of e){if(a.sameTab)continue;const o=a.presence||{};if(o.role!=="player")continue;const c=o.want;if(typeof c=="number"&&c>=0&&c<4){if(n.seats[a.peer]===c)continue;r().includes(c)||(n.seats[a.peer]=c)}else c===-1&&n.seats[a.peer]!==void 0&&delete n.seats[a.peer]}const s=n.lobby;n.room.presence({role:"host",ph:"lobby",nick:Ie.myNick||"Host",mode:s.mode,map:s.map,diff:s.diff,al:s.al.join(""),seats:n.seats,s:null,m:null,res:null}).catch(()=>{}),kc()}function ou(){const n=Ie.NET;if(n.role==="host")return{mode:n.lobby.mode,map:n.lobby.map,diff:n.lobby.diff,al:n.lobby.al,seats:n.seats,hostNick:Ie.myNick||"Host"};const e=n.room.peers().find(i=>i.presence&&i.presence.role==="host");if(!e)return null;n.hostPeer=e.peer;const t=e.presence;return{mode:t.mode,map:t.map,diff:t.diff,al:String(t.al||"0123").split("").map(Number),seats:t.seats||{},hostNick:t.nick,ph:t.ph,hostP:e}}function kc(){const n=Ie.NET;if(!n||Se("ovLobby").hidden)return;const e=ou(),t=n.role==="host";if(!e){Se("lobbyStatus").textContent="Connecting to the host…",Se("codeTxt").textContent=n.name||"",Se("seats").innerHTML="",n.lobbySig=null;return}Se("lobbyTitle").textContent=t?"Your battle":`${String(e.hostNick||"Host").slice(0,16)}'s battle`,Se("codeTxt").textContent=n.name||"",Se("copyBtn").hidden=!t;const i=n.room.peers(),r=x=>{const _=i.find(p=>p.peer===x);return _&&_.presence&&_.presence.nick?String(_.presence.nick).slice(0,16):"Player"},s=No(n.room),a=x=>Object.keys(e.seats).find(_=>e.seats[_]===x),o=JSON.stringify([s,e.mode,e.map,e.diff,e.al,e.seats,e.hostNick,i.map(x=>[x.peer,x.presence&&x.presence.nick,x.presence&&x.presence.role])]);if(o===n.lobbySig)return;n.lobbySig=o;const c=Se("seats");c.innerHTML="",me.forEach((x,_)=>{const p=a(_),u=document.createElement("button");u.type="button",u.className="seat"+(p===s?" mine":"")+(p&&p!==s?" taken":""),u.style.background=x.css;const v=document.createElement("b");v.textContent=x.name;const y=document.createElement("span");y.textContent=p?(p===s?"You":r(p))+(i.find(P=>P.peer===p&&P.presence&&P.presence.role==="host")?" · host":""):"Computer",u.append(v,y);const S=document.createElement("span");S.className="alchip",S.setAttribute("role","button"),S.textContent="Team "+Yf[e.al[_]],t&&(S.tabIndex=0,S.addEventListener("click",P=>{P.stopPropagation(),n.lobby.al[_]=(n.lobby.al[_]+1)%4,qr()})),u.appendChild(S),u.addEventListener("click",()=>{p&&p!==s||(t?p||(n.seats[s]=_,qr()):(n.want=p===s?-1:_,n.room.presence({role:"player",nick:Ie.myNick||"Captain",ph:"lobby",want:n.want}).catch(()=>{})))}),c.appendChild(u)});const l=(x,_,p)=>{const u=Se(x);u.classList.toggle("ro",p),u.querySelectorAll("button").forEach(v=>v.setAttribute("aria-pressed",String(v.dataset.v===String(_))))};l("lobbyTeams",(x=>Object.keys(Yi).find(_=>Yi[_].join("")===x.join(""))||"")(e.al),!t),l("lobbyMode",e.mode,!t),l("lobbyMap",e.map,!t),l("lobbyDiff",e.diff,!t),Se("startBtn").hidden=!t;const h=new Set(e.al).size,d=Object.keys(e.seats).length;Se("startBtn").disabled=h<2;const m=e.seats[s];Se("lobbyStatus").textContent=t?h<2?"Everyone is on one team. Split the teams to start.":d<2?"Share the code. Friends open this page, tap Play with friends and enter it.":`${d} players · computer plays the rest`:m===void 0?"Tap a color to take it":`You are ${me[m].name}. Waiting for the host to start…`}async function Oo(n){const e=Ie.NET;if(Ie.NET=null,e){try{e.unsub&&e.unsub()}catch{}try{await e.room.leave()}catch{}}g.role="solo",g.myTi=0,g.ALLY=[...Yi[Vi.preset()]],g.state="title",Se("hudWrap").hidden=!0,["ovLobby","ovEnd","ovBrowse"].forEach(t=>Se(t).hidden=!0),Vi.seedDemo(),n?(su(),Se("netNote").textContent=n):Se("ovTitle").hidden=!1}function Ly(){const n=Ie.NET;if(!n||n.role!=="client")return;const e=ou();if(!e){n.hostGoneAt||(n.hostGoneAt=performance.now()),performance.now()-n.hostGoneAt>6e3&&Oo("That battle is no longer open.");return}if(n.hostGoneAt=0,e.ph==="play"&&e.hostP.presence.seed){const t=e.seats[No(n.room)];if(t===void 0){n.toldLate||(n.toldLate=!0,Se("lobbyStatus").textContent="The battle started without you. Wait here for the next one.");return}n.toldLate=!1,g.state==="lobby"&&(g.myTi=t,Qv(e.hostP.presence))}}function Dy(n){Vi=Object.assign(Vi,n),Se("nick").addEventListener("change",eo),Se("browseBack").addEventListener("click",()=>{eo(),Se("ovBrowse").hidden=!0,Se("ovTitle").hidden=!1}),Se("mpBtn").addEventListener("click",()=>{Ti(),su()}),Se("codeIn").addEventListener("input",t=>{t.target.value=t.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")}),Se("codeIn").addEventListener("keydown",t=>{t.key==="Enter"&&Se("joinBtn").click()}),Se("copyBtn").addEventListener("click",()=>{const t=Ie.NET&&Ie.NET.name;if(!t)return;const i=()=>{Se("copyBtn").textContent="Copied",setTimeout(()=>Se("copyBtn").textContent="Copy",1500)};try{navigator.clipboard.writeText(t).then(i,()=>{})}catch{}}),Se("hostBtn").addEventListener("click",async()=>{if(gi)return;gi=!0,eo(),Se("netNote").textContent="Opening a battle…";let t=null,i=null;for(let a=0;a<4&&!t;a++){i=wy();try{t=await Wf(i,!0)}catch(o){if(!(o&&o.type==="unavailable-id")){Se("netNote").textContent="Could not reach the multiplayer server. Check your connection and try again.",gi=!1;return}}}if(gi=!1,!t){Se("netNote").textContent="Could not open a battle. Try again.";return}Se("netNote").textContent="";const r=Ie.NET={role:"host",room:t,name:i,seats:{},msgs:[],msgN:0,snapN:0,inp:{},lobby:{mode:g.mode,map:g.map.id,diff:g.diff,al:[...Yi[Vi.preset()]]}},s=No(t)||"me";r.me=s,r.seats[s]=0,g.myTi=0,g.role="host",r.unsub=t.onPeers(()=>{g.state==="lobby"&&qr()}),Eo()}),Se("joinBtn").addEventListener("click",async()=>{const t=(Se("codeIn").value||"").trim().toUpperCase();if(t.length!==4){Se("netNote").textContent="Battle codes are 4 letters or numbers.";return}if(gi)return;gi=!0,eo(),Se("netNote").textContent=`Joining ${t}…`;let i;try{i=await Wf(t,!1)}catch(s){gi=!1;const a=s&&s.type;Se("netNote").textContent=a==="peer-unavailable"?`No battle found with code ${t}. Check the code with your host.`:a==="full"?"That battle already has four players.":"Could not connect. Check your internet connection and try again.";return}gi=!1,Se("netNote").textContent="";const r=Ie.NET={role:"client",room:i,name:t,seats:{},hostPeer:null};g.role="client",r.unsub=i.onPeers(()=>{g.state==="lobby"&&kc()}),i.presence({role:"player",nick:Ie.myNick||"Captain",ph:"lobby",want:-1}).catch(()=>{}),Eo()});const e=(t,i)=>Se(t).addEventListener("click",r=>{const s=r.target.closest("button"),a=Ie.NET;!s||!a||a.role!=="host"||(i==="al"?a.lobby.al=[...Yi[s.dataset.v]]:i==="diff"?a.lobby.diff=+s.dataset.v:a.lobby[i]=s.dataset.v,qr())});e("lobbyTeams","al"),e("lobbyMode","mode"),e("lobbyMap","map"),e("lobbyDiff","diff"),Se("startBtn").addEventListener("click",()=>{var s;const t=Ie.NET;if(!t||t.role!=="host")return;Ti();const i=t.lobby;g.mode=i.mode,g.map=To[i.map],g.diff=i.diff,g.ALLY=[...i.al],g.myTi=(s=t.seats[t.me])!=null?s:0,g.seed=Math.random()*1e9|0,t.msgs=[],t.msgN=0,t.inp={},t.snapN=0;const r=[0,0,0,0];Object.values(t.seats).forEach(a=>r[a]=1),Vi.startMatch(r),ko()}),Se("leaveBtn").addEventListener("click",()=>Oo())}const Mt=n=>document.getElementById(n);{const n=Mt("nojs");n&&n.remove()}document.addEventListener("gesturestart",n=>n.preventDefault());document.addEventListener("gesturechange",n=>n.preventDefault());let Xf=0;document.addEventListener("touchend",n=>{const e=Date.now();e-Xf<300&&!(n.target.closest&&n.target.closest("input"))&&n.preventDefault(),Xf=e},{passive:!1});const Iy=new URLSearchParams(location.search);Iy.get("stress")==="1"&&(g.squadCap=xu);let Fo="ffa";ut.on("msg",n=>vs(n.k,n.a));ut.on("spark",n=>Tv(n.x,n.y,n.z,n.c,n.n));ut.on("splat",n=>Dv(n.x,n.z,n.s,n.ti));ut.on("float",n=>Ir(n.x,n.y,n.z,n.text,n.color));ut.on("sfx",n=>{const e=Nt[n.name];e&&e(n.x,n.z)});ut.on("shake",n=>{Qe.shake=n});ut.on("buzz",n=>wr(n));ut.on("hint",n=>{const e=g.player;e&&yn("mhint",2500)&&Ir(e.x,e.y+3.4,e.z,n,"#fff")});ut.on("respawnMe",n=>{Qe.yaw=n.face});ut.on("hud",()=>{g.state==="play"&&wc(ne.lastSnapAt)});ut.on("hostEnd",n=>Xi(n[0],n[1]));ut.on("end",({w:n,why:e})=>{md(),yo(!1),wc(ne.lastSnapAt);const t=g.ALLY[g.myTi],i=n<0?"draw":n===t?"win":"lose",r=i==="win"?"Victory":i==="draw"?"Draw":"Defeat";i==="win"?(Nt.horn(),Nr("Victory!","","#ffcf3a")):Nr(r,"",i==="draw"?"#fff":"#e0352b"),Mt("endTitle").innerHTML=`<span>${r}</span>`,Mt("endText").textContent=`${Ki[g.mode].name} on ${g.map.name}. ${Uy(n,e)}`,Mt("sKills").textContent=g.kills,Mt("sSquad").textContent=g.recruited,Mt("sTime").textContent=Rc(g.T);const s=Gi(),a=oi();Mt("againBtn").hidden=a,Mt("againBtn").textContent=s?"Back to lobby":"Fight again",Mt("menuBtn").textContent=Ie.NET?"Leave":"Menu",Mt("endNote").textContent=a?"Waiting for the host to start the next battle…":"",s&&ko(),setTimeout(()=>{g.state==="end"&&(Mt("ovEnd").hidden=!1)},1600)});function Uy(n,e){if(n<0)return"Time ran out with no clear winner.";const t=jv(n),i=t.indexOf("&")<0;return e==="castles"?`${t} tore down every enemy castle.`:e==="tickets"?`${t} ${i?"is":"are"} the last side with tickets.`:e==="caps"?`${t} carried the banner home ${us} times.`:`Time is up and ${t} ${i?"leads":"lead"}.`}function au(){td(g.layout),dd(),ad(),Wv(),Xv(),yo(!1),lu.reset()}function Oc(n){Ie.NET||(g.role="solo"),Su(n),Qe.yaw=g.player.face,Qe.pitch=.32,au(),Nt.horn()}Yv({onMatchStart:au,onAbort:n=>Oo(n),onLobby:()=>Eo()});Dy({startMatch:Oc,seedDemo:zo,preset:()=>Fo});$v(Pc);let Pa=0,co=null;function zo(){g.layout=fc(g.map.id,!1,7),g.units=[],g.horses=[],g.arrows=[],g.flag=null,g.player=null,g.uid=0,g.teams=hc([0,0,0,0]),td(g.layout),dd(),ad();const n=["foot","spear","arch","foot","spear"];me.forEach((i,r)=>n.forEach((s,a)=>{const[o,c]=wi(i,(a-2)*1.5),l=Fr(r,o*.5,c*.5,s);l.face=Math.atan2(-l.x,-l.z),l.demo=!0}));const e=Fr(0,0,22,"captain");e.demo=!0;const t={id:1,x:0,z:22,face:0,state:"ridden",rider:e,t:0,spd:9,ti:0};g.horses.push(t),e.mounted=!0,e.horse=t,co=e}function jf(n){if(Pa+=n,co&&co.horse){const e=Pa*.35,t=co;t.x=Math.cos(e)*22,t.z=Math.sin(e)*22,t.y=Bt(t.x,t.z),t.face=Math.atan2(-Math.sin(e),Math.cos(e)),t.vx=-Math.sin(e)*8,t.vz=Math.cos(e)*8;const i=t.horse;i.x=t.x,i.z=t.z,i.face=t.face,i.spd=8}sd(g.units,n),od(g.horses.map(e=>({key:e.id,ti:e.ti,x:e.x,z:e.z,face:e.face,spd:e.spd,state:e.state,t:e.t,fall:e.fall})),n),hd(),Fv(Pa),er.render(At,ht),pd()}function Cs(n,e){Mt(n).addEventListener("click",t=>{const i=t.target.closest("button");i&&(Mt(n).querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed",r===i?"true":"false")),e(i.dataset.v))})}function Bo(){const n={ffa:"Every team for itself.","2v2":"You and Yellow against Red and Green.","2v1v1":"You and Yellow against Red, and Green on its own.","3v1":"You, Green and Yellow against Red."}[Fo];Mt("desc").innerHTML=`<strong>${Ki[g.mode].name}.</strong> ${Ki[g.mode].desc}<br><strong>${g.map.name}.</strong> ${g.map.desc} <strong>Teams:</strong> ${n}`}function cu(){const n=Zh[_t.level].name;Mt("qualityNote").textContent=_t.stepped?`Lowered to ${n} to keep the game smooth.`:_t.setting==="auto"?`Auto picked ${n} for this device.`:"",Mt("segQuality").querySelectorAll("button").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.v===_t.setting)))}Cs("segMode",n=>{g.mode=n,Bo()});Cs("segMap",n=>{g.map=To[n],Bo(),zo()});Cs("segTeams",n=>{Fo=n,g.ALLY=[...Yi[n]],Bo()});Cs("segDiff",n=>{g.diff=+n});Cs("segQuality",n=>{n!==_t.setting&&(tv(n),location.reload())});Mt("goBtn").addEventListener("click",()=>{Ti(),Ie.NET=null,g.myTi=0,g.ALLY=[...Yi[Fo]],g.seed=Math.random()*1e9|0,Oc([1,0,0,0])});Mt("againBtn").addEventListener("click",()=>{if(Ti(),Gi()){Eo();return}g.seed=Math.random()*1e9|0,Oc([1,0,0,0])});Mt("menuBtn").addEventListener("click",()=>{if(Ie.NET){Oo();return}g.state="title",Mt("ovEnd").hidden=!0,Mt("hudWrap").hidden=!0,Mt("ovTitle").hidden=!1,zo()});const lu={t:0,frames:0,steps:0,reset(){this.t=0,this.frames=0},tick(n){if(_t.setting!=="auto"||this.steps>=2||this.t>8||(this.t+=n,this.frames++,this.t<8))return;this.frames/this.t<30&&iv()&&(this.steps++,ed(),Fc(),cu(),this.reset())}};function La(n){sd(g.units,n);const e=oi()?iy():g.horses.map(t=>({key:t.id,ti:t.ti,x:t.x,z:t.z,face:t.face,spd:t.spd,state:t.state,t:t.t,fall:t.fall}));od(e,n),dv(n,Av),Uv(n),hd(),Ov(n),er.render(At,ht),Hv({joy:at.joy,nickFor:Ny})}function Ny(n){const e=Ie.NET;if(!e)return null;const t=e.room.peers(),i=e.role==="host"?e.seats:((t.find(a=>a.peer===e.hostPeer)||{}).presence||{}).seats||{},r=Object.keys(i).find(a=>i[a]===n);if(!r)return null;const s=t.find(a=>a.peer===r);return s&&s.presence&&s.presence.nick?String(s.presence.nick).slice(0,16):null}let Da=0,qf=performance.now(),ic=60;function fu(n){const e=(n-qf)/1e3,t=Math.min(.05,e);qf=n,e>0&&(ic+=(1/e-ic)*.05);try{if(oi()&&(g.state==="play"||g.state==="end"))ny(t)&&(g.state==="play"||g.state==="end")?La(t):jf(t);else if(g.state==="play")Gi()&&Zv(),_h(t,gd(t)),Gi()&&g.state==="play"&&Jv(),La(t),lu.tick(e);else if(g.state==="end"){for(const i of g.units)i.dead&&xc(i,t);La(t),Gi()&&n-(Ie.NET.lastSend||0)>500&&ko(!0)}else jf(t),g.state==="lobby"&&(oi()?Ly():Gi()&&n-(Ie.NET.lastLobby||0)>700&&(Ie.NET.lastLobby=n,qr()));g.state==="play"&&(Da-=t,Da<=0&&(Da=.1,wc(ne.lastSnapAt)))}catch(i){console.error(i)}requestAnimationFrame(fu)}const $f=n=>Math.round(n*10)/10;window.__fb={end(){Xi(g.ALLY[g.myTi],"time")},get info(){const n=Ie.NET,e=g.player;return{state:g.state,T:Math.round(g.T),MODE:g.mode,map:g.map.id,myTi:g.myTi,al:g.ALLY.join(""),units:g.units.length,horses:g.horses.length,arrows:g.arrows.length,net:n&&{role:n.role,seats:n.seats,size:n.lastSize,hostPeer:n.hostPeer},teams:g.teams.map(t=>({p:Math.round(t.points),t:t.tickets,c:t.caps,g:Math.round(t.gold),alive:t.alive,h:t.human?1:0,plan:t.plan&&t.plan.kind,lead:t.leader&&{m:t.leader.mounted,dead:t.leader.dead}})),kinds:["foot","spear","arch"].map(t=>g.units.filter(i=>!i.dead&&i.kind===t).length),flag:g.flag&&{s:g.flag.state},player:e&&{x:$f(e.x),z:$f(e.z),hp:Math.round(e.hp),mounted:e.mounted,dead:e.dead,id:e.id},gfx:{level:_t.level,setting:_t.setting,fps:Math.round(ic),calls:er.info.render.calls,tris:er.info.render.triangles,batches:gv()}}},step(n,e=1/30){for(let t=0;t<n&&g.state==="play";t++)_h(e,null)},ride(){g.player&&(g.player.lastHit=-9,Pc.ride())}};function Fc(){sv(),Bv()}addEventListener("resize",Fc);Fc();Bo();cu();zo();requestAnimationFrame(fu);
