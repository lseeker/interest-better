var K=Object.defineProperty,Z=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var $=(d,i,o)=>i in d?K(d,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):d[i]=o,O=(d,i)=>{for(var o in i||(i={}))H.call(i,o)&&$(d,o,i[o]);if(C)for(var o of C(i))J.call(i,o)&&$(d,o,i[o]);return d},j=(d,i)=>Z(d,G(i));import{d as Q,r as W,c as g,w as k,a as S,b as l,e as D,v as w,u as f,f as X,t as p,F as V,g as ee,h as F,o as M,n as te,i as ae}from"./vendor.ffbaa745.js";const ne=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))m(u);new MutationObserver(u=>{for(const c of u)if(c.type==="childList")for(const v of c.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&m(v)}).observe(document,{childList:!0,subtree:!0});function o(u){const c={};return u.integrity&&(c.integrity=u.integrity),u.referrerpolicy&&(c.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?c.credentials="include":u.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function m(u){if(u.ep)return;u.ep=!0;const c=o(u);fetch(u.href,c)}};ne();const le=l("h1",{class:"text-3xl font-bold"}," Interest Better ",-1),oe=l("p",null,"Rate: 2%",-1),se={class:"flex justify-between items-baseline gap-1"},re=F("Base day "),ce={class:"flex justify-between items-baseline gap-1"},ie=F("Balance1 "),ue={class:"flex justify-between items-baseline gap-1"},de=F("Balance2 "),be={class:"mt-2"},fe={class:"mb-2"},pe=l("h2",{class:"text-xl font-bold my-2"}," Result ",-1),me={class:"flex flex-wrap justify-center gap-2"},ge=l("dt",null,"Balance",-1),ve=l("dt",null,"Savings",-1),xe=l("dt",null,"Interest",-1),he=l("dt",null,"Tax",-1),_e=l("dt",null,"Profit",-1),ye=Q({setup(d){var R,N;function i(e){return`${e.getFullYear()}-${`${e.getMonth()+1}`.padStart(2,"0")}-${`${e.getDate()}`.padStart(2,"0")}`}const o=W({baseDay:i(new Date),balance1:(R=Number(localStorage.getItem("balance1")))!=null?R:0,balance2:(N=Number(localStorage.getItem("balance2")))!=null?N:0}),m=g(()=>new Date(o.baseDay)),u=g(()=>{const e=new Date(m.value.getFullYear(),m.value.getMonth(),1);let a=new Date(e.getFullYear(),e.getMonth(),21-e.getDay());if(a<=m.value){const t=new Date(m.value.getFullYear(),m.value.getMonth()+1,1);a=new Date(t.getFullYear(),t.getMonth(),21-t.getDay())}return a}),c=g(()=>o.balance1+o.balance2);k(()=>o.balance1,e=>localStorage.setItem("balance1",`${e}`)),k(()=>o.balance2,e=>localStorage.setItem("balance2",`${e}`));function v(e){const a=Math.floor(e*.014)*10,t=Math.floor(a*.01)*10;return a+t}const _=g(()=>{const a=[{balance:0,interest:0,tax:0}];for(let t=10;t<767;t+=10){const n=t/.14,s=Number.isInteger(n)?n-1:Math.floor(n),r=18250*s;if(r>c.value)break;a.push({balance:r,interest:s,tax:v(s)})}return a});function h(e,a=1){const t=Math.floor(e*.02*a/365),n=v(t);return{balance:e+t-n,interest:t,tax:n}}function Y(e,a,t=0,n=0){const s={balance:e,interest:t,tax:n};for(let r=0;r<a;r+=1){const b=h(s.balance);s.balance=b.balance,s.interest+=b.interest,s.tax+=b.tax}return s}function z(e,a,t){const n={balance:e,interest:0,tax:0};for(let s=0;s<t;s+=1){const r=h(n.balance);n.balance=r.balance+a,n.interest+=r.interest,n.tax+=r.tax}return n}function P(e,a,t){const n=Math.floor(a*.02/365),s=v(n),r={balance:a,interest:n*t,tax:s*t};return[z(e,n,t),r]}const x=g(()=>Math.ceil((u.value.getTime()-m.value.getTime())/864e5)),y={balance:0,interest:0,tax:0};function L(e){return{balance:e[0].balance+e[1].balance,savings:e[1].balance,interest:e[0].interest+e[1].interest,tax:e[0].tax+e[1].tax,profit:e[0].interest+e[1].interest-e[0].tax-e[1].tax}}const A=g(()=>{let e=0,a=[y,y];for(let t=0;t<_.value.length;t+=1){const n=_.value[t];if(n.balance>c.value)break;const s=n.balance,r=P(c.value-s,s,x.value),b=r[0].balance+r[1].balance;b>=e&&(e=b,a=r)}return L(a)}),E=g(()=>{let e=0,a=[y,y];for(let t=0;t<_.value.length;t+=1){const n=_.value[t];if(n.balance>c.value)break;const s=n.balance,r=h(s,x.value),b=h(c.value-s,x.value),T=r.balance+b.balance;T>=e&&(e=T,b.balance+=r.interest-r.tax,r.balance=s,a=[b,r])}return L(a)});function B(e){return j(O({},e),{savings:0,profit:e.interest-e.tax})}const I=g(()=>({Simple:B(h(c.value,x.value)),"Simple w/Savings":E.value,Compound:B(Y(c.value,x.value)),"Compound w/Savings":A.value})),U=g(()=>Math.max(...Object.values(I.value).map(e=>e.profit)));function q(e){return e===U.value?"text-red-600":""}return(e,a)=>(M(),S(V,null,[le,oe,l("form",{class:"flex flex-col gap-2 my-2",onSubmit:a[3]||(a[3]=X(()=>{},["prevent"]))},[l("label",se,[re,D(l("input",{"onUpdate:modelValue":a[0]||(a[0]=t=>f(o).baseDay=t),class:"border p-1",type:"date"},null,512),[[w,f(o).baseDay]])]),l("label",ce,[ie,D(l("input",{"onUpdate:modelValue":a[1]||(a[1]=t=>f(o).balance1=t),class:"border p-1",type:"number",size:"11"},null,512),[[w,f(o).balance1]])]),l("label",ue,[de,D(l("input",{"onUpdate:modelValue":a[2]||(a[2]=t=>f(o).balance2=t),class:"border p-1",type:"number",size:"11"},null,512),[[w,f(o).balance2]])])],32),l("div",be," Total Balance: "+p(f(c).toLocaleString()),1),l("div",fe," To: "+p(i(f(u)))+" ("+p(f(x))+" day"+p(f(x)===1?"":"s")+") ",1),pe,l("div",me,[(M(!0),S(V,null,ee(f(I),(t,n)=>(M(),S("section",{key:n},[l("h3",null,p(n),1),l("dl",null,[ge,l("dd",null,p(t.balance.toLocaleString()),1),ve,l("dd",null,p(t.savings.toLocaleString()),1),xe,l("dd",null,p(t.interest.toLocaleString()),1),he,l("dd",null,p(t.tax.toLocaleString()),1),_e,l("dd",{class:te(["font-bold",q(t.profit)])},p(t.profit.toLocaleString()),3)])]))),128))])],64))}});const Se=ae(ye);Se.mount("#app");