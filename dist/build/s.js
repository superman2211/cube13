!function(){"use strict";let F=document,X="ontouchstart"in window,t=devicePixelRatio,e=F=>F.getContext("2d"),i=()=>e(F.createElement("canvas")),o=F=>F.canvas,l=F=>o(F).width,G=F=>o(F).height,W=(F,X)=>o(F).width=X,f=(F,X)=>o(F).height=X,r=F=>F.resetTransform(),a=(F,X,t,e)=>F.drawImage(X,t,e),Y=F=>{r(F),F.clearRect(0,0,l(F),G(F))},n=()=>performance.now(),d=F=>JSON.parse(JSON.stringify(F));let P={o:n(),r:0},s=[],c=F=>F*F,u=F=>F<1/2.75?7.5625*F*F:F<2/2.75?7.5625*(F-=1.5/2.75)*F+.75:F<2.5/2.75?7.5625*(F-=2.25/2.75)*F+.9375:7.5625*(F-=2.625/2.75)*F+.984375,b=(F,X,t,e,i,o,l)=>{let G=F[X];s.push({n:F,p:X,m:G,h:t,T:0,v:e,k:i,g:o,V:l})},E=16,M=30,L=F=>F.x>0&&F.x<224&&F.y>0&&F.y<224,O=F=>F.z==E&&L(F),y=F=>0==F.z&&L(F),S=(F,X,t,e)=>({R:F,$:X,j:F+t,B:X+e}),N=(F,X,t,e)=>F.R+X.x<t.j+e.x&&F.$+X.y<t.B+e.y&&t.R+e.x<F.j+X.x&&t.$+e.y<F.B+X.y,U=Math,p=U.floor,A=U.round,m=U.min,h=U.max,w=U.hypot,T=U.abs,v=U.random,k=U.atan2,D=U.PI,x=2*D,g=(F,X,t)=>m(X,h(F,t)),V=(F,X)=>((F,X,t)=>F+t*(X-F))(F,X,v());let I,H=(F=0,X=0)=>({x:F,y:X}),R=(F,X)=>({x:X.x-F.x,y:X.y-F.y}),$=(F,X)=>w(F.x-X.x,F.y-X.y),C=F=>w(F.x,F.y),Z=(F,X)=>{let t=C(F);t>0&&(t=X/t,F.x*=t,F.y*=t)},Q=[],z=F=>Q.find((X=>X.J.id===F)),K=F=>Q.filter((X=>X.J.id===F)),j=F=>Q.splice(Q.indexOf(F),1),B=94,J=109,q={a:1,b:0,c:0,d:1,e:0,f:0},_={a:0,b:1,c:-1,d:0,e:E,f:0},FF={a:-1,b:0,c:0,d:-1,e:E,f:E},XF={a:0,b:-1,c:1,d:0,e:0,f:E},tF=S(0,0,E,E),eF={q:!0,_:tF},iF={_:tF},oF={A:{FF:{id:105},XF:{id:B}},Y:{FF:{id:97},tF:eF},C:{XF:{id:95}},K:{XF:{id:95,eF:_}},D:{XF:{id:B,eF:XF}},E:{XF:{id:B,eF:_}},F:{XF:{id:12},FF:{id:J}},G:{XF:{id:13},FF:{id:J}},P:{XF:{id:14},FF:{id:J},id:9},S:{XF:{id:17},FF:{id:J}},W:{FF:{id:J}},Z:{XF:{id:22},FF:{id:J},id:13},Q:{XF:{id:23},FF:{id:J},id:14},U:{FF:{id:108},tF:eF},H:{FF:{id:108},XF:{id:B,eF:XF}},I:{FF:{id:108},XF:{id:B,eF:_}},L:{FF:{id:97},XF:{id:96},tF:eF},M:{FF:{id:98},XF:{id:96,eF:_},tF:eF},N:{FF:{id:99},XF:{id:96,eF:FF},tF:eF},O:{FF:{id:100},XF:{id:96,eF:XF},tF:eF},X:{tF:eF},a:{tF:iF,FF:{id:0},XF:{id:1},iF:8},b:{tF:iF,FF:{id:2},XF:{id:3},iF:8,id:2},c:{tF:iF,FF:{id:4},XF:{id:5},iF:8,id:4},f:{tF:iF,FF:{id:6},XF:{id:7},iF:8,id:6},u:{tF:{_:S(3,10,9,7)},FF:{id:79},id:0},s:{XF:{id:15},FF:{id:J},id:1},w:{XF:{id:18},FF:{id:J},id:3},y:{XF:{id:20},FF:{id:J},id:5},l:{FF:{id:65},id:10},i:{FF:{id:66},id:11},t:{FF:{id:106},XF:{id:B},id:8},d:{FF:{id:8},XF:{id:B},tF:eF,id:7}},lF=1*(Math.exp(.5)-1);function GF(F,X){let t=function(F){let X=0,t=F[5],e=Math.abs(F[6]),i=F[6]>0,o=F[7],l=F[8],G=F[13],W=F[14],f=F[11],r=F[12],a=t,Y=o,n=G,d=W,P=r,s=F[0],c=F[18],u=.1!==c,b=F[19],E=F[20],M=F[21],L=F[22],O=F[10],y=F[9],S=[F[1],F[2],F[4]],N=F[3],U=F[16],p=F[17],A=F[15],m=0,h=0,w=0,T=new Float32Array(32);for(let F=0;F<32;++F)T[F]=2*Math.random()-1;let v=0,k=0,D=0,x=0,g=0,V=new Float32Array(1024);for(let F=0;F<1024;++F)V[F]=0;let I=[];for(let F=0;0!==A&&++X>=A&&(a=t,Y=o,n=G,d=W,P=r),0!==P&&F>=P&&(P=0,a*=f),Y+=l,a*=Y,!(a>e&&(a=e,i));++F){let F=a;y>0&&(D+=O,F=a*(1+Math.sin(D)*y));let X=Math.floor(F);if(X<8&&(X=8),n+=d,n<0&&(n=0),n>.5&&(n=.5),++k>S[v]&&(k=0,++v>2))break;let t,e=k/S[v];t=0===v?e:1===v?1+2*(1-e)*N:1-e,U+=p;let i=Math.abs(Math.floor(U));i>1023&&(i=1023),0!==L&&(M*=L,M<1e-5&&(M=1e-5),M>.1&&(M=.1));let o=0;for(let F=0;F<8;++F){let F=0;if(++x,x>=X&&(x%=X,3===s))for(let F=0;F<32;++F)T[F]=2*Math.random()-1;let e=x/X;0===s?F=e<n?.5:-.5:1===s?F=e<n?2*e/n-1:1-2*(e-n)/(1-n):2===s?F=Math.sin(2*e*Math.PI):3===s&&(F=T[32*x/X|0]);let l=m;c*=b,c<0&&(c=0),c>.1&&(c=.1),u?(h+=(F-m)*c,h-=h*E):(m=F,h=0),m+=h,w+=m-l,w-=w*M,F=w,V[1023&g]=F,F+=V[g-i+1024&1023],g=g+1&1023,o+=F*t}I.push(o*lF/8)}return new Float32Array(I)}(X),e=F.createBuffer(1,t.length,44100);return e.copyToChannel(t,0,0),e}let WF=[],fF=[];function rF(){I||(I=new AudioContext)}function aF(F,X=1){if(I){fF[F]||(fF[F]=GF(I,new Float32Array(WF[F])));let t=I.createBufferSource();t.buffer=fF[F];let e=I.createGain();e.gain.value=.2*X,t.connect(e),e.connect(I.destination),t.start()}}X||rF();let YF=[],nF=[],dF=[],PF=!1,sF=()=>{PF=!0},cF=()=>{(()=>{if(PF){PF=!1,YF.splice(0,YF.length),nF.splice(0,nF.length),dF.splice(0,dF.length);for(let F of Q)F.J.tF&&YF.push(F),O(F)&&dF.push(F),y(F)&&nF.push(F)}})(),function(){let F=YF.length,X=20;for(;X--;){let X=0;for(let t=0;t<F;t++){let e=YF[t];for(let i=t+1;i<F;i++){let F=YF[i],t=!1;e.J.tF.q?F.J.tF.q||(t=uF(e,F,0,1)):t=F.J.tF.q?uF(e,F,1,0):uF(e,F,.5,.5),t&&X++}}if(!X)break}}(),function(){for(let F of dF)if(F.z==E){let X=F.J.tF?F.J.tF._:tF,t=!1;for(let e of nF)if(N(X,F,tF,e)){t=!0;break}t||MF(F)}}()},uF=(F,X,t,e)=>{let i=N(F.J.tF._,F,X.J.tF._,X);if(i){let i=R(F,X);Z(i,1),T(i.x)>T(i.y)?(F.x-=i.x*t,X.x+=i.x*e,F.y=p(F.y),X.y=p(X.y)):(F.y-=i.y*t,X.y+=i.y*e,F.x=p(F.x),X.x=p(X.x))}return i};let bF,EF=async(F,X)=>{await async function(F){return new Promise((X=>{setTimeout(X,F)}))}(1e3*X),MF(F)},MF=F=>{F.z-=1,delete F.J.tF,sF(),b(F,"z",F.z-96,0,.5,c,(()=>j(F))),0===F.J.id&&aF(7,.7)},LF={oF:!1,lF:0},OF=[8,9,10,11],yF=(F,X,t,e)=>{let i=z(X);if(i&&(F.push(i),i.J.tF)){let F=z(t);F&&$(i,F)<3&&(o=F,(l=i).x=o.x,l.y=o.y,delete i.J.tF,sF(),b(i,"z",8,0,.4,u,(()=>{F.J.XF.id=e,j(i),aF(2)})))}var o,l},SF=["CAAAAAAtAAAAAAK","D             E","D             E","D             E","D             E","D             E","D             E","D             E","D             E","D             E","D             E","D             E","D             E","H             I"],NF=[[[" WWWWWWSWWWWWW "," FFFFFFFFFFFFF "," FFFFGGFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," GGFFFFFFFFFFF "," FFFFFFFFFFFGF "," FFFFFFFFFFFFF "," FFFFFFFFFsFFF "," FFFFFFFFFFFFF "," GFFFFFFFFFFFF "," FFFFFFFFFFFGG ","WFFFFFFFFFFFFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X             X","X             X","X             X","X             X","X             X","X             X","X       b     X","X             X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFGFFFFFFFF "," FFFFFFFFFFGGF "," FFsFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFGFFFFFFFF "," FFGFFFFFFFFFF "," FFFFFFFFFwFFF "," FFFFFFFFFFFFF "," GGGFFFFFFFFFF "," FFFFFFFFFGGFF "," FFFFFFFFFFFFF "," FFGGGFFFFGFFF ","WFFFFFFFFFFFFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X             X","X   b         X","X             X","X             X","X             X","X             X","X             X","X             X","X             X","X          c  X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFGGFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFGGFF "," FFGGGFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFGG "," FFFsFFFFFFFFF "," FFFFFFFFFFFFF "," FGGFFFFFFFFFF "," FFGFFFFFFFFFF "," FFFFFFFFFwFFF "," FFFFFFFFFFFFF ","WFFGFFFGGFFFFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X    b         X","X             X","XLMNOLM       X","X             X","X             X","X             X","X         c   X","X       LMNOLMX","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFyF "," FFFGFFFFGFFFF "," FFFGFGFFFFFFF "," FFFGFFFFFFFFF ","WFFFGFFFFFFFFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X             X","X             X","X             X","X       L     X","X       MOLMNOX","X         a   X","X    f    a   X","X         a   X","X    a    a   X","X         aaaaX","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFFFFFFFFFF "," FFPFFPPFFFFFF "," FFFFFFGGGFFFF "," FFGGFFsPFFFFF "," FFFGFFPFFPFFF "," FFFPFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFPFFFFGF "," FFFGFFFFFFFFF "," FFFGFFFPFFFFF "," FFFGFFFFFFFFF ","WFFFGFFFFFFPFFW"],[" YYYYYYdYYYYYY ","X          a  X","X             X","X             X","X             X","X             X","X      b      X","X             X","X  a          X","X             X","X          a  X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFPPFFFFFFFF "," FFyPPFFFFFFFF "," FFFFFFGGGFwFF "," FFFFFFFFFFGFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFsFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFGGF "," FFFGFFFFFFFFF "," FFFGFFFPFFFFF "," FFFGPPPPFFFFF ","WFFFGFFFFFFPFFW"],[" YYYYYYdYYYYYY ","X             X","X     f       X","X          a  X","X             X","XLNOMLNOM  aaaX","X          acaX","X          aaaX","X             X","X   b         X","X             X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," GFFFFGFPFGFFF "," FPPPFFGPFFFFF "," FFFPFPPPGGFFF "," FPFPGPGPPPPPP "," PPGPPPFsFFFGP "," FPFPPPPPPPPFP "," GPFFGPFFPFFFP "," GPPPGPPPPFPPP "," FFPGFFFFFGPPP "," FFPGPPPPPPPPP "," FFPFFFGPFFFFF "," FFFFPPFPFPFFF ","WFFGFGPFPFFFFFW"],[" YYYYYYdYYYYYY ","X             X","X   a         X","X      a  LMNOX","X             X","X         b   X","X   a         X","X  a          X","X             X","X             X","X             X","X             X","X  a       aaaX","U  a   u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW ","    FGGFGF     ","    F    FFPG  ","  GFFPy   G    ","  F   G   G    ","  F   GFGFF    ","          G    ","  FFFFFFGFFs   ","  F    G   G   ","  G    P       ","  GGFGGF   G   ","       G   FFF ","       F       ","W      F      W"],[" YYYYYYdYYYYYY ","X             X","X             X","X    a        X","X     f       X","X             X","X             X","X        b    X","X             X","X             X","X             X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," GFFFFFFFFFFFF "," FFPFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFsFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFGF "," FFFGFFFFFFFFF "," FFFGFFFPFFFFF "," FFFGFFFFFFFFF ","WFFFGFFFFFFPFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X      LMNOLMNX","X      M  b   X","Xi     N      X","X      L     lX","X      O      X","X             X","X         a   X","X   a         X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFFFFFFFFFG "," FFPFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFsF "," FFFGFFFFFFFFF "," FFFGFFFPFFFFF "," FFFGFFFFFFFFF ","WFFFGFFFFFFPFFW"],[" YYYYYYdYYYYYY ","X             X","X             X","X             X","Xi           lX","Xi            X","X            lX","X    aa aa    X","X             X","X     a       X","X            lX","X             X","X         b   X","U      u      U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFFFFFFFFFF "," FFPZPFFFFFFFF "," FFGGGFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFFFFGGGFFF "," FFFFFFFGZGFGF "," FFsGFFFGGGFFF "," FFFGFFPGFFFFF "," FFFGFFFFFFFFG ","WFFFGFFFFFFPFFW"],[" YYYYYYdYYYYYY ","X             X","X          a  X","X             X","X  aa         X","X             X","X    NOLMNOLMNX","X    M        X","XLNMOL      a X","X             X","X             X","X       b     X","X             X","U      u    aaU"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFFFFFFFFFFQF "," FFPFFFFFFFPFF "," FFFFFFGGGyFPF "," FFFFFFFFFFFFF "," PFFGFFFFFZFFF "," PFFFFFFFFFFFF "," PQFFFFFFFFFFF "," FFFFFFGGGFFFF "," FFFFFFFFFFFFF "," FFFGFFFZFFFFF "," FFFGFFFPFFFsF "," GwFGFFFFFFFFF ","WFFFGFFFF   FFW"],[" YYYYYYdYYYYYY ","X             X","X             X","XLMNOLM    f  X","X a   N       X","X a   MLO     X","X a     N     X","X       M     X","X       L     X","X    MLMNOLMNOX","X   lO        X","X    N        X","X  c M   b    X","U    L u    a U"," XXXXXXXXXXXXX "],SF],[[" WWWWWWSWWWWWW "," FFPPPPFPFZPsF "," FGPPPFPFFFPFF "," FFFFFFGyGFFFF "," FFFFFFFFFFFFF "," FFFFFFFFFFFFF "," FFFFF   FFFFZ "," FQFFF  QFFFFF "," FFFF   GGFFFF "," FF     FFFFFF ","        FFPFF  ","      FPFFF    ","      FFF      ","W      G      W"],[" YYYYYYdYYYYYY ","X        N    X","Xa       La   X","Xi       M    X","X        O   lX","X    NLMNO    X","X  f L        X","X    O      b X","X             X","X             X","X             X","X             X","X             X","U      u      U"," XXXXXXXXXXXXX "],SF]],UF=[],pF={},AF=(F,X)=>{if(void 0===X||1===X)return UF[F];{let t=pF[F];t||(pF[F]={},t=pF[F]);let e=p(16*X),i=t[e];return i||(t[e]=hF(F,(F=>{F[0]=F[0]*X,F[1]=F[1]*X,F[2]=F[2]*X})),i=t[e]),i}},mF=(F,X)=>{if(0==X)return UF[F];{let t=pF[F];t||(pF[F]={},t=pF[F]);let e=t[X];if(!e){let i=X>>16&255,o=X>>8&255,l=255&X;t[X]=hF(F,(F=>{F[0]=i,F[1]=o,F[2]=l})),e=t[X]}return e}},hF=(F,X)=>{let t=e(UF[F]),r=l(t),a=G(t),Y=i();W(Y,r),f(Y,a);let n=t.getImageData(0,0,r,a),d=Y.getImageData(0,0,r,a),P=n.data,s=d.data,c=0;for(;c<P.length;){let F=P.slice(c,c+4);X(F),s.set(F,c),c+=4}return Y.putImageData(d,0,0),o(Y)},wF=[],TF=()=>{for(let F of Q)if(O(F)){let X=F.J;if(X.FF)for(let F=0;F<16;F++){let t={id:X.FF.id,brightness:F/16,run(){AF(this.id,this.brightness)}};wF.push(t)}}},vF=0,kF=H(),DF=e(F.getElementById("c")),xF=0,gF=0,VF=1,IF={},HF=!1,RF=0,$F=!1,CF={},ZF=F=>IF[F],QF=()=>{F.onkeydown=F=>{$F=!0,IF[F.keyCode]=!0,F.preventDefault()},F.onkeyup=F=>{var X;$F=!1,X=F.keyCode,delete IF[X],F.preventDefault()};let e=o(DF);if(X){let F=(F,X)=>{let e=F.changedTouches;for(let F=0;F<e.length;F++){const{clientX:i,clientY:o,identifier:l}=e[F];X(l,H(i*t,o*t))}F.preventDefault()};e.ontouchstart=X=>{F(X,((F,X)=>{CF[F]=X})),RF=n()},e.ontouchmove=X=>{F(X,((F,X)=>{CF[F]=X}))},e.ontouchend=X=>{F(X,((F,X)=>{delete CF[F]})),0!=RF&&(n()-RF<500&&(HF=!0,rF()),RF=0)},e.ontouchcancel=X=>{F(X,((F,X)=>{delete CF[F]}))},e.onclick=()=>{HF=!0,rF()}}},zF=-1,KF=F=>({x:F.x/VF,y:F.y/VF}),jF=()=>{if(X){if(bF)if(CF[bF.id]){bF.GF=KF(CF[bF.id]);let F=R(bF.WF,bF.GF);C(F)>M&&(Z(F,M),bF.GF.x=bF.WF.x+F.x,bF.GF.y=bF.WF.y+F.y)}else bF=void 0;else for(let F in CF){bF={id:F,WF:KF(CF[F]),GF:KF(CF[F])};break}if(zF=-1,bF){let X=R(bF.WF,bF.GF);if(C(X)/M>.3){let t=k((F=X).y,F.x);t<0&&(t+=x),zF=p((t+D/8)/(D/4))}}}var F},BF=[],JF={FF:{id:67},id:12},qF=[67,68,69,70],_F={R:0,$:7,j:E,B:9},FX=0;let XX=(F,X)=>{let t=K(F);for(let F of t)if(F){void 0===F.J.fF&&(F.J.fF=BF.length,BF.push([]));let t=BF[F.J.fF];for(;t.length<13;){let X={x:F.x,y:F.y-1,z:F.z-1,J:d(JF)};t.push(X)}let e=t[0];e.x=F.x,tX(e,X);let i=e.x;for(let e of t){e.x=i;let t=X<0?i<F.x+E:i>F.x-E;i-=E*X,t?Q.includes(e)||Q.push(e):Q.includes(e)&&j(e)}}},tX=(F,X)=>{let t=208;for(;t--&&(F.x+=X,!eX(F)););},eX=F=>{for(let X of YF)if(X.J.tF&&N(_F,F,X.J.tF._,X))return!0;return!1},iX=[71,72,73,74],oX=[75,76,77,78],lX=[79,80,81,82],GX=[83,84,85,86],WX=[87,88],fX=[89,90],rX=[91,92],aX={lF:0,rF:0};function YX(F,X){aX.lF+=12*P.r;let t=p(aX.lF%X.length);F.J.FF.id=X[t]}let nX={aF:0,YF:0,T:0,nF:0,dF:0,scoreTime:0},dX=()=>{nX.T=130,(F=>{let X=NF[F];Q.splice(0,Q.length);let t=0;for(let F of X){let X=0,e=0;for(let i of F){for(let F of i){if(" "!==F){let i=d(oF[F]);Q.push({x:X,y:e,z:t,J:i})}X+=E}X=0,e+=E}t+=E}})(nX.aF),sF(),LF.oF=!1,LF.lF=0,aX.lF=0,aX.rF=0,TF()},PX=()=>{aX.rF>=1&&(nX.nF--,async function(){nX.YF=nX.nF>0?4:5,aF(5)}())},sX=()=>{if(nX.T<=0)return;nX.dF+=P.r;let F=p(nX.T);nX.T-=P.r;let X=p(nX.T);if(F!=X&&X<=13){let F=5;aF(9,.1+.5*g(0,1,(X-F)/(0-F)))}nX.T<=0&&((async()=>{for(let F of Q)y(F)&&EF(F,V(0,1))})(),aF(4),vF=.5,function(){for(let F=0;F<Q.length;F++){let X=Q[F];12!==X.J.id&&11!==X.J.id&&10!==X.J.id||(Q.splice(F,1),F--)}BF.splice(0,BF.length)}())};let cX=(()=>{let F=[];return F[33]=60,F[35]=63,F[46]=61,F[47]=-1,F.push(24,25,26,27,28,29,30,31,32,33),F[64]=62,F.push(34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59),F})(),uX=F=>cX[F],bX=F=>`rgba(${F>>16&255},${F>>8&255},${255&F},${(F>>24&255)/255})`,EX=i(),MX=(F,X)=>F.y+F.z-X.y-X.z,LX=()=>{W(DF,xF),f(DF,gF);let F=p(xF/VF),X=p(gF/VF);W(EX,F),f(EX,X),Y(EX);let t=p((F-240)/2);switch(function(F,X){let t=kF.x+F,e=kF.y+X;Q.sort(MX),hX();for(let F of Q){let X=p(t+F.x),i=p(e+F.y-F.z),o=F.J,l=o.iF||E;mX(EX,X,i,o.FF),mX(EX,X,i-l,o.XF)}}(t,64),SX(t),function(){if(bF&&(pX(EX,bF.WF,M,1442840575),pX(EX,bF.GF,10,2583691263),-1!=zF)){let F=zF*D/4-D/8,X=F+D/4;AX(EX,bF.WF,33,F,X,1442840575),AX(EX,bF.WF,36,F,X,1157627903),AX(EX,bF.WF,39,F,X,872415231),AX(EX,bF.WF,42,F,X,587202559),AX(EX,bF.WF,45,F,X,301989887)}}(),nX.YF){case 0:wX(4278190080,["CUBE 13",71,"",OX(),"",yX("START")]);break;case 1:wX(4281545523,["13 LEVELS %","13 LIVES @","130 SECONDS #","","",yX("START")]);break;case 4:wX(3714449408,["YOU ARE DEAD!",88,"",`LIVES @ ${nX.nF}`,"","",yX("TRY AGAIN")]);break;case 3:wX(3707790848,["LEVEL PASSED!",93,"",`NEXT LEVEL % ${nX.aF+2}`,`TOTAL LEVELS % ${NF.length}`,"","",yX("CONTINUE")]);break;case 5:wX(3711107072,["GAME OVER!",88,"","",yX("GO HOME")]);break;case 6:wX(3707803904,["YOU WIN!!!",93,"","CONGRATULATIONS!","YOU ARE THE BEST!",OX(),"","",yX("GO HOME")])}Y(DF),DF.setTransform(VF,0,0,VF,0,0),DF.imageSmoothingEnabled=!1,a(DF,o(EX),0,0)},OX=()=>nX.scoreTime>0?`YOUR TIME # ${nX.scoreTime.toFixed(1)} SECONDS`:"",yX=F=>X?`TAP TO ${F}`:`PRESS ANY KEY TO ${F}`;let SX=(F,X)=>{r(EX);for(let X=0;X<nX.nF;X++)a(EX,UF[62],F+1+8*X,10);UX(EX,F,1,"LIVES "+nX.nF,16721408);let t=A(nX.T),e=m(A(nX.T),13);for(let X=0;X<e;X++)a(EX,UF[63],F+224+8-8*X,10);let i=h(0,t)+" TIME";UX(EX,F+240-1-8*i.length,1,i,38655);let o="LEVEL "+(nX.aF+1);UX(EX,p(F+(240-8*o.length)/2),1,o,16777215)},NX={35:63,64:62,37:64},UX=(F,X,t,e,i)=>{r(F);for(let o=0;o<e.length;o++){let l=e.charCodeAt(o);if(void 0!==NX[l]){let e=UF[NX[l]];a(F,e,X+8*o,t)}else{let e=uX(l);if(void 0!==e){let l=mF(e,i);a(F,l,X+8*o,t)}}}},pX=(F,X,t,e)=>{AX(F,X,t,0,x,e)},AX=(F,X,t,e,i,o)=>{r(F),F.beginPath(),F.arc(p(X.x),p(X.y),p(t),e,i,!1),F.lineWidth=2,F.strokeStyle=bX(o),F.stroke()},mX=(F,X,t,e)=>{if(e){let i=AF(e.id,e.PF),o=e.eF||q;F.setTransform(o.a,o.b,o.c,o.d,o.e+X,o.f+t),void 0!==e.sF&&(F.globalAlpha=e.sF),a(F,i,0,0),F.globalAlpha=1}},hX=()=>{for(let F of Q){let X=g(0,1,(F.z- -32)/32),t=F.J;t.FF&&(t.FF.PF=X),t.XF&&(t.XF.PF=X)}};function wX(F,X){let t=l(EX),e=G(EX);r(EX),EX.fillStyle=bX(F),EX.fillRect(0,0,t,e);let i=16*X.length,o=0;for(let F=0;F<X.length;F++){let t=X[F];switch(typeof t){case"string":i+=8,o=h(o,8*t.length);break;case"number":let F=UF[t];i+=F.height,o=h(o,F.width)}}let W=0+(t-o)/2,f=0+(e-i)/2;for(let F=0;F<X.length;F++){let t=X[F];switch(typeof t){case"string":let F=t;UX(EX,p(W+(o-8*F.length)/2),p(f),F,16777215),f+=24;break;case"number":let X=UF[t];a(EX,X,p(W+(o-X.width)/2),p(f)),f+=X.height+16}}}let TX=!1,vX=!1,kX=()=>{if(HF||$F&&!TX)switch(HF=!1,nX.YF){case 0:vX?DX():(vX=!0,nX.YF=1);break;case 1:DX();break;case 4:dX(),nX.YF=2;break;case 3:nX.aF++,dX(),nX.YF=2;break;case 5:case 6:nX.YF=0}TX=$F};function DX(){nX.aF=0,nX.nF=NF.length,nX.dF=0,dX(),nX.YF=2}let xX,gX=V(5,10),VX=(F,X)=>{let t=K(X);2==t.length&&(IX(F,t[0],t[1]),IX(F,t[1],t[0]))},IX=(F,X,t)=>{xX||$(F,X)<8&&(xX=t,F.x=F.x-X.x+t.x,F.y=F.y-X.y+t.y,F.J.FF.sF=0,aF(8))};function HX(){(()=>{let F=P.o;P.o=n(),P.r=(P.o-F)/1e3})(),xF=innerWidth*t,gF=innerHeight*t,VF=m(xF/240,gF/304),jF(),2==nX.YF&&((()=>{let F=P.r,X=z(0);if(X)if(aX.rF>0)YX(X,WX);else if(X.z<E)YX(X,lX.includes(X.J.FF.id)||rX.includes(X.J.FF.id)?rX:fX);else{let i=H();if(ZF(37)||ZF(65)?i.x=-1:(ZF(39)||ZF(68))&&(i.x=1),ZF(38)||ZF(87)?i.y=-1:(ZF(40)||ZF(83))&&(i.y=1),-1!=zF&&(i=0==zF?H(1,0):1==zF?H(1,1):2==zF?H(0,1):3==zF?H(-1,1):4==zF?H(-1,0):5==zF?H(-1,-1):6==zF?H(0,-1):H(1,7==zF?-1:0)),C(i)>0){let o=iX;i.x<0?o=GX:i.x>0&&(o=oX),i.y<0?o=lX:i.y>0&&(o=iX),YX(X,o),Z(i,40*F),e=i,(t=X).x+=e.x,t.y+=e.y}}var t,e})(),(()=>{if(XX(10,-1),XX(11,1),FX-=P.r,FX<0){FX=.1;for(let X of BF)for(let t of X)t.J.FF.id=(F=qF)[A(V(0,F.length-1))]}var F})(),(()=>{if(LF.oF)return;let F=[];yF(F,2,1,16),yF(F,4,3,19),yF(F,6,5,21);let X=0;for(let t of F)0==t.z&&X++;if(X==F.length){for(let X of F)delete X.J.id;LF.oF=!0}})(),(()=>{let F=z(0),X=K(9);if(F&&F.z==E&&F.J.tF&&X.length){let t=F.J.tF._;for(let e of X)0==e.z&&N(t,F,tF,e)&&(MF(e),aF(1))}})(),(()=>{if(LF.oF&&LF.lF<OF.length){LF.lF+=5*P.r;let F=p(LF.lF),X=z(7);if(X)if(F<OF.length)X.J.FF.id=OF[F];else{X.J.FF=void 0,X.J.tF=void 0,sF();let F=z(8);F&&(F.J.FF.id=107,aF(3))}}})(),(()=>{let F=z(0);F&&(F.J.FF&&void 0!==F.J.FF.sF&&(F.J.FF.sF+=P.r,F.J.FF.sF>1&&(F.J.FF.sF=void 0)),xX?$(xX,F)>E&&(xX=void 0):(VX(F,13),VX(F,14)))})(),(()=>{let F=z(0),X=z(7);F&&X&&T(F.x-X.x)<8&&F.y<X.y&&(aF(10),nX.aF==NF.length-1?(nX.YF=6,nX.scoreTime=nX.dF):nX.YF=3)})(),sX(),(()=>{let F=z(0);if(0==aX.rF)if(F){if(F.J.tF){let X=K(12);for(let t of X)N(_F,t,F.J.tF._,F)&&(0==aX.rF&&aF(6),aX.rF+=.001)}}else aX.rF=1;else aX.rF+=P.r})(),PX()),cF(),vF>0&&(vF-=P.r,kF.x=V(-4,4),kF.y=V(-4,4),vF<=0&&(kF.x=0,kF.y=0)),kX(),(()=>{let F=n();for(;wF.length&&(wF.shift().run(),!(n()-F>1)););})(),(()=>{let F=P.r;s=s.filter((X=>{if(X.v>0)return X.v-=F,!0;{X.T+=F;const{n:t,p:e,m:i,h:o,k:l,g:G,V:W}=X;if(X.T>l)return t[e]=o,W&&W(),!1;{let F=G(X.T/l);return t[e]=i+(o-i)*F,!0}}}))})(),gX-=P.r,gX<0&&(gX=V(5,10),aF(0,.2)),LX(),requestAnimationFrame(HX)}!async function(){await async function(){let F=await fetch("r"),X=await F.arrayBuffer(),t=new Uint8Array(X),e=0,l=4*t[e++],G=t.slice(e,e+l);e+=l;let r=t[e++];for(;r--;){let F=t[e++],X=t[e++],l=F*X,r=t.slice(e,e+l);e+=l;let a=i();W(a,F),f(a,X);let Y=a.getImageData(0,0,F,X);for(let F=0;F<r.length;F++){let X=r[F]<<2;Y.data.set(G.slice(X,X+4),F<<2)}a.putImageData(Y,0,0),UF.push(o(a))}let a=t[e++];for(;a--;){let F=t[e++];WF.push(X.slice(e,e+F)),e+=F}}(),QF(),HX()}()}();
