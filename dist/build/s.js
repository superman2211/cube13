!function(){"use strict";let F=16,t=document,n=devicePixelRatio,o=F=>F.getContext("2d"),i=()=>o(t.createElement("canvas")),r=F=>F.canvas,e=F=>r(F).width,f=F=>r(F).height,a=(F,t)=>r(F).width=t,l=(F,t)=>r(F).height=t,d=()=>performance.now(),c=function(){let F=i();return a(F,240),l(F,240),F}(),u=o(t.getElementById("c"));let A={};function p(F){return!!A[F]}let s=23,m=[],D={a:1,b:0,c:0,d:1,e:0,f:0},E={a:0,b:1,c:-1,d:0,e:F,f:0},G={a:-1,b:0,c:0,d:-1,e:F,f:F},w={a:0,b:-1,c:1,d:0,e:0,f:F},y=Math,L=y.floor,x=y.min,M=y.hypot;function h(F=0,t=0){return{x:F,y:t}}function b(F,t){let n=function(F){return M(F.x,F.y)}(F);n>0&&(n=t/n,F.x*=n,F.y*=n)}let N=[7,8,9,10],v=[11,12,13,14],z=[15,16,17,18],O=[19,20,21,22],H={t:0,n:h()};let I=[];let g=d();function C(F,t){return F.y+F.z-(t.y+t.z)}function J(){let t=function(){let F=d(),t=F-g;return g=F,t/1e3}(),o=d();!function(F){let t=m.find((F=>0===F.id));if(t){let i,r=h();if(p("ArrowLeft")?(i=O,r.x=-1):p("ArrowRight")&&(i=v,r.x=1),p("ArrowUp")?(i=z,r.y=-1):p("ArrowDown")&&(i=N,r.y=1),i){H.t+=10*F;let e=L(H.t%i.length);t.info.front.id=i[e],b(r,30*F),o=r,(n=H.n).x+=o.x,n.y+=o.y,t.x=L(H.n.x),t.y=L(H.n.y)}}var n,o}(t);let i=e(c),A=f(c),s=r(c);c.clearRect(0,0,i,A);m.sort(C);for(let t of m){let n=t.x+0,o=t.y+32-t.z,i=t.info;P(c,n,o,i.front),P(c,n,o-F,i.top)}let D=innerWidth*n,E=innerHeight*n;e(u)!=D&&a(u,D),f(u)!=E&&l(u,E);let G=e(u),w=f(u),y=x(G/i,w/A);u.clearRect(0,0,G,w),u.setTransform(y,0,0,y,0,0),u.shadowBlur=0,u.imageSmoothingEnabled=!1,u.drawImage(s,0,0);let M=(d()-o).toFixed(),I=(1/t).toFixed();u.shadowBlur=10,u.shadowColor="black",u.fillStyle="white",u.font="arial 20px",u.fillText("FPS "+I+" TIME "+M+" ms",0,20),requestAnimationFrame(J)}function K(){!function(t){t.splice(0,t.length);let n={A:{front:{id:26},top:{id:s}},C:{top:{id:24}},K:{top:{id:24,o:E}},D:{top:{id:s,o:w}},E:{top:{id:s,o:E}},F:{top:{id:4}},G:{top:{id:5}},H:{front:{id:27},top:{id:s,o:w}},I:{front:{id:27},top:{id:s,o:E}},J:{front:{id:0},top:{id:s}},L:{front:{id:26},top:{id:25}},M:{front:{id:27},top:{id:25,o:E}},N:{front:{id:28},top:{id:25,o:G}},O:{front:{id:29},top:{id:25,o:w}}},o=[["               "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "],["CAAAAAAJAAAAAAK","D             E","D             E","D             E","D    LMNOL    E","D        L    E","D        O    E","D      LMN    E","DLMNOLMN      E","D             E","D             E","D             E","D             E","H             I"]],i=0;for(let r of o){let o=0,e=0;for(let f of r){for(let r of f){if(" "!==r){let F=n[r];(F.front||F.top)&&t.push({x:o,y:e,z:i,info:F})}o+=F}o=0,e+=F}i+=F}t.push({x:L(73.6),y:L(89.6),z:F,info:{front:{id:7}}}),t.push({x:64,y:L(137.6),z:F,id:0,info:{front:{id:12}}}),t.push({x:96,y:L(176),z:8,info:n.L})}(m)}function P(F,t,n,o){if(o){let i=I[o.id],r=o.o||D;F.setTransform(r.a,r.b,r.c,r.d,r.e+t,r.f+n),F.drawImage(i,0,0)}}!async function(){await async function(){let F=await fetch("r"),t=await F.arrayBuffer(),n=new Uint8Array(t),o=0,e=4*n[o++],f=n.slice(o,o+e);o+=e;let d=n[o++];for(;d-- >0;){let F=n[o++],t=n[o++],e=F*t,d=n.slice(o,o+e);o+=e;let c=i();a(c,F),l(c,t);let u=c.getImageData(0,0,F,t),A=0;for(let F in d){let t=4*d[F];u.data[A++]=f[t++],u.data[A++]=f[t++],u.data[A++]=f[t++],u.data[A++]=f[t]}c.putImageData(u,0,0),I.push(r(c))}}(),t.onkeydown=F=>{A[F.code]=!0},t.onkeyup=F=>{A[F.code]=void 0},K(),function(){let F=m.find((F=>0===F.id));F&&(H.n.x=F.x,H.n.y=F.y)}(),J()}()}();
