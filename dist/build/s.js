!function(){"use strict";const t=16,F=document,e=devicePixelRatio;function n(t){return t.getContext("2d")}function a(){return F.createElement("canvas")}const o=[];function i(t){return o.includes(t)}const c=[];let s=0,r=0,f=0;function d(t){let F=c.length;return c.push(t),F}function h(t,F){const{width:e,height:n}=t,a=t.data,o=F.data;for(let t=0;t<e;t++)for(let F=0;F<n;F++){let n=4*(F*e+t),i=4*(F*e+(e-1-t));o[i++]=a[n++],o[i++]=a[n++],o[i++]=a[n++],o[i++]=a[n++]}}function l(t,F){!function(t,F){u(t,F),t.data.set(F.data,0),u(t,F)}(t,F),t.data.set(F.data,0),u(t,F)}function u(t,F){!function(t,F){const{width:e,height:n}=t,a=t.data,o=F.data;for(let t=0;t<e;t++)for(let F=0;F<n;F++){let n=4*(F*e+t),i=4*(t*e+F);o[i++]=a[n++],o[i++]=a[n++],o[i++]=a[n++],o[i++]=a[n++]}}(t,F),t.data.set(F.data,0),function(t,F){const{width:e,height:n}=t,a=t.data,o=F.data;for(let t=0;t<e;t++)for(let F=0;F<n;F++){let i=4*(F*e+t),c=4*((n-1-F)*e+t);o[c++]=a[i++],o[c++]=a[i++],o[c++]=a[i++],o[c++]=a[i++]}}(t,F)}function g(t,F){const{width:e,height:o}=t,i=n(t).getImageData(0,0,e,o),c=a();c.width=e,c.height=o;const s=n(c),r=s.getImageData(0,0,e,o);for(const t of F)t(i,r),i.data.set(r.data,0);return s.putImageData(r,0,0),c}function w(t=0,F=0){return{x:t,y:F}}function m(t,F){let e=function(t){return Math.hypot(t.x,t.y)}(t);e>0&&(e=F/e,t.x*=e,t.y*=e)}const y=[7,8,9,10],p=[11,12,13,14],x=[15,16,17,18],v=[19,20,21,22],D={frame:0,position:w()};let E,L=performance.now();function A(t,F){return t.y+t.z-(F.y+F.z)}function M(){const F=function(){const t=performance.now(),F=t-L;return L=t,F/1e3}(),n=performance.now();!function(t,F){let e=t.stage.cubes.find((t=>0===t.id));if(e){let t;const o=w();if(i("ArrowLeft")?(t=v,o.x=-1):i("ArrowRight")&&(t=p,o.x=1),i("ArrowUp")?(t=x,o.y=-1):i("ArrowDown")&&(t=y,o.y=1),t){D.frame+=10*F;let i=Math.floor(D.frame%t.length);e.t.f=t[i],m(o,30*F),a=o,(n=D.position).x+=a.x,n.y+=a.y,e.x=Math.floor(D.position.x),e.y=Math.floor(D.position.y)}}var n,a}(E,F);const{world:a,screen:o}=E;a.clearRect(0,0,a.canvas.width,a.canvas.height);E.stage.cubes.sort(A);for(let F of E.stage.cubes){const e=F.x+0,n=F.y+32,o=F.z,i=F.t;if(void 0!==i.f){let t=c[i.f];a.drawImage(t,e,n-o)}if(void 0!==i.t){let F=c[i.t];a.drawImage(F,e,n-o-t)}}const s=innerWidth*e,r=innerHeight*e;o.canvas.width!=s&&(o.canvas.width=s),o.canvas.height!=r&&(o.canvas.height=r);const f=Math.min(o.canvas.width/a.canvas.width,o.canvas.height/a.canvas.height);o.clearRect(0,0,o.canvas.width,o.canvas.height),o.setTransform(f,0,0,f,0,0),o.shadowBlur=0,o.imageSmoothingEnabled=!1,o.drawImage(a.canvas,0,0);const d=(performance.now()-n).toFixed(),h=(1/F).toFixed();o.shadowBlur=10,o.shadowColor="black",o.fillStyle="white",o.font="arial 20px",o.fillText("FPS "+h+" TIME "+d+" ms",0,20),requestAnimationFrame(M)}function G(){const F=n(a());F.canvas.width=240,F.canvas.height=240;const e=n(document.getElementById("c")),o=function(){const F=[];let e={A:{f:30,t:23},B:{f:31,t:24},C:{t:25},D:{t:r},E:{t:s},F:{t:4},G:{t:5},H:{f:31,t:r},I:{f:31,t:s},J:{f:0,t:23},K:{t:f},L:{f:30,t:28},M:{t:6}},n=[["               "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FMFFFFGGGFFFF "," FFFMFFFFFFFFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FMFFFFGGGFFFF "," FFFFFFFFFMFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "," FFFGFFFFFFFFF "],["CAABBABJAABAAAK","D             E","D             E","D             E","D    LLLLL    E","D        L    E","D      LLL    E","DLLLLLLL      E","D             E","D             E","D             E","D             E","D             E","H             I"]],a=0;for(const o of n){let n=0,i=0;for(const c of o){for(const o of c){if(" "!==o){let t=e[o];(t.f||t.t)&&F.push({x:n,y:i,z:a,t:t})}n+=t}n=0,i+=t}a+=t}return F.push({x:Math.ceil(73.6),y:Math.ceil(89.6),z:t,t:{f:7}}),F.push({x:64,y:Math.ceil(121.6),z:t,id:0,t:{f:12}}),{cubes:F}}();E={world:F,screen:e,stage:o}}!async function(){await async function(){const t=await fetch("r"),F=await t.arrayBuffer(),e=new Uint8Array(F);let n=0;const a=4*e[n++],o=e.slice(n,n+a);n+=a;let i=e[n++];for(;i-- >0;){const t=e[n++],F=e[n++],a=t*F,i=e.slice(n,n+a);n+=a;let s=document.createElement("canvas");s.width=t,s.height=F;let r=s.getContext("2d"),f=r.getImageData(0,0,t,F),d=0;for(let t in i){let F=4*i[t];f.data[d++]=o[F++],f.data[d++]=o[F++],f.data[d++]=o[F++],f.data[d++]=o[F]}r.putImageData(f,0,0),c.push(s)}}(),s=d(g(c[23],[l])),r=d(g(c[23],[u])),f=d(g(c[25],[h])),F.onkeydown=t=>{o.includes(t.code)||o.push(t.code)},F.onkeyup=t=>{o.includes(t.code)&&o.splice(o.indexOf(t.code),1)},G(),function(t){let F=t.stage.cubes.find((t=>0===t.id));F&&(D.position.x=F.x,D.position.y=F.y)}(E),M()}()}();
