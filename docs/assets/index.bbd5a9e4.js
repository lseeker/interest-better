import{d as R,r as V,c as f,w as I,a as Y,b as e,e as S,v as D,u as l,f as k,t as u,F as C,g as w,o as j,h as z}from"./vendor.8b6efdb2.js";const A=function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))b(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&b(p)}).observe(document,{childList:!0,subtree:!0});function d(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function b(s){if(s.ep)return;s.ep=!0;const r=d(s);fetch(s.href,r)}};A();const E=e("h1",{class:"text-3xl font-bold"}," Interest Better ",-1),U=e("p",null,"Rate: 2%",-1),P={class:"flex justify-between items-baseline gap-1"},q=w("Base day "),K={class:"flex justify-between items-baseline gap-1"},Z=w("Balance1 "),G={class:"flex justify-between items-baseline gap-1"},H=w("Balance2 "),J={class:"mt-2"},Q={class:"mb-2"},W=e("tr",null,[e("th",null,"Method"),e("th",null,"Balance Total"),e("th",null,"Balance Savings"),e("th",null,"Interest"),e("th",null,"Tax")],-1),X=e("th",null,"Simple",-1),ee=e("td",null,"0",-1),te=e("th",null,"Compound",-1),ne=e("td",null,"0",-1),ae=e("th",null,"Compound w/Savings",-1),le=R({setup(T){var B,F;function h(a){return`${a.getFullYear()}-${`${a.getMonth()+1}`.padStart(2,"0")}-${`${a.getDate()}`.padStart(2,"0")}`}const d=V({baseDay:h(new Date),balance1:(B=Number(localStorage.getItem("balance1")))!=null?B:0,balance2:(F=Number(localStorage.getItem("balance2")))!=null?F:0}),b=f(()=>new Date(d.baseDay)),s=f(()=>{const a=new Date(b.value.getFullYear(),b.value.getMonth(),1);let n=new Date(a.getFullYear(),a.getMonth(),21-a.getDay());if(n<=b.value){const t=new Date(b.value.getFullYear(),b.value.getMonth()+1,1);n=new Date(t.getFullYear(),t.getMonth(),21-t.getDay())}return n}),r=f(()=>d.balance1+d.balance2);I(()=>d.balance1,a=>localStorage.setItem("balance1",`${a}`)),I(()=>d.balance2,a=>localStorage.setItem("balance2",`${a}`));function p(a){const n=Math.floor(a*.014)*10,t=Math.floor(n*.01)*10;return n+t}const M=f(()=>{const n=[];for(let t=10;t<767;t+=10){const o=t/.14,c=Number.isInteger(o)?o-1:Math.floor(o),i=18250*c;if(i>r.value)break;n.push({balance:i,interest:c,tax:p(c)})}return n});function v(a,n=1){const t=Math.floor(a*.02*n/365),o=p(t);return{balance:a+t-o,interest:t,tax:o}}function N(a,n,t=0,o=0){const c={balance:a,interest:t,tax:o};for(let i=0;i<n;i+=1){const g=v(c.balance);c.balance=g.balance,c.interest+=g.interest,c.tax+=g.tax}return c}function $(a,n,t){const o={balance:a,interest:0,tax:0};for(let c=0;c<t;c+=1){const i=v(o.balance);o.balance=i.balance+n,o.interest+=i.interest,o.tax+=i.tax}return o}function O(a,n,t){const o=Math.floor(n*.02/365),c=p(o),i={balance:n,interest:o*t,tax:c*t};return[$(a,o,t),i]}const _=f(()=>Math.ceil((s.value.getTime()-b.value.getTime())/864e5)),L={balance:0,interest:0,tax:0},m=f(()=>{let a=0,n=[L,L];for(let t=0;t<M.value.length;t+=1){const o=M.value[t];if(o.balance>r.value)break;const c=o.balance,i=O(r.value-c,c,_.value),g=i[0].balance+i[1].balance;g>=a&&(a=g,n=i)}return n}),x=f(()=>v(r.value,_.value)),y=f(()=>N(r.value,_.value));return(a,n)=>(j(),Y(C,null,[E,U,e("form",{class:"flex flex-col gap-2 my-2",onSubmit:n[3]||(n[3]=k(()=>{},["prevent"]))},[e("label",P,[q,S(e("input",{"onUpdate:modelValue":n[0]||(n[0]=t=>l(d).baseDay=t),class:"border p-1",type:"date"},null,512),[[D,l(d).baseDay]])]),e("label",K,[Z,S(e("input",{"onUpdate:modelValue":n[1]||(n[1]=t=>l(d).balance1=t),class:"border p-1",type:"number",size:"11"},null,512),[[D,l(d).balance1]])]),e("label",G,[H,S(e("input",{"onUpdate:modelValue":n[2]||(n[2]=t=>l(d).balance2=t),class:"border p-1",type:"number",size:"11"},null,512),[[D,l(d).balance2]])])],32),e("div",J," Total Balance: "+u(l(r).toLocaleString()),1),e("div",Q," To: "+u(h(l(s)))+" ("+u(l(_))+" day"+u(l(_)===1?"":"s")+") ",1),e("table",null,[W,e("tr",null,[X,e("td",null,u(l(x).balance.toLocaleString()),1),ee,e("td",null,u(l(x).interest.toLocaleString()),1),e("td",null,u(l(x).tax),1)]),e("tr",null,[te,e("td",null,u(l(y).balance.toLocaleString()),1),ne,e("td",null,u(l(y).interest.toLocaleString()),1),e("td",null,u(l(y).tax),1)]),e("tr",null,[ae,e("td",null,u((l(m)[0].balance+l(m)[1].balance).toLocaleString()),1),e("td",null,u(l(m)[1].balance.toLocaleString()),1),e("td",null,u((l(m)[0].interest+l(m)[1].interest).toLocaleString()),1),e("td",null,u(l(m)[0].tax+l(m)[1].tax),1)])])],64))}});const oe=z(le);oe.mount("#app");