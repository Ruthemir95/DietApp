import{r as e,j as t,c as n,R as s}from"./vendor-react-2952a862.js";import{C as a,a as i,D as l,b as r,c as o,N as c,T as d}from"./components-5f2525f1.js";import{a as m}from"./utils-261f79e3.js";import{c as u,d as p,e as h,R as g,P as x,f as y,g as f,h as j,i as N,j as E}from"./vendor-icons-c7e63e01.js";import"./vendor-a9d0ef7a.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const S={},w=function(e,t,n){if(!t||0===t.length)return e();const s=document.getElementsByTagName("link");return Promise.all(t.map((e=>{if((e=function(e){return"/DietApp/"+e}(e))in S)return;S[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(!!n)for(let n=s.length-1;n>=0;n--){const a=s[n];if(a.href===e&&(!t||"stylesheet"===a.rel))return}else if(document.querySelector(`link[href="${e}"]${a}`))return;const i=document.createElement("link");return i.rel=t?"stylesheet":"modulepreload",t||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),t?new Promise(((t,n)=>{i.addEventListener("load",t),i.addEventListener("error",(()=>n(new Error(`Unable to preload CSS for ${e}`))))})):void 0}))).then((()=>e())).catch((e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}))},b=(t,n)=>{const[s,a]=e.useState((()=>{try{const e=window.localStorage.getItem(t);return e?JSON.parse(e):n}catch(e){return n}}));return e.useEffect((()=>{try{window.localStorage.setItem(t,JSON.stringify(s))}catch(e){}}),[t,s]),[s,a]},D=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.U))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),_=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.M))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),v=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.e))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),C=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.f))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),A=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.S))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),O=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.g))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),P=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.d))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),I=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.R))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),L=e.lazy((()=>w((()=>import("./components-5f2525f1.js").then((e=>e.W))),["assets/components-5f2525f1.js","assets/vendor-react-2952a862.js","assets/vendor-a9d0ef7a.js","assets/vendor-icons-c7e63e01.js","assets/utils-261f79e3.js"]))),T={Colazione:t.jsx(y,{className:"h-5 w-5"}),"Spuntino Matt.":t.jsx(f,{className:"h-5 w-5"}),Pranzo:t.jsx(j,{className:"h-5 w-5"}),Merenda:t.jsx(N,{className:"h-5 w-5"}),Cena:t.jsx(E,{className:"h-5 w-5"})};function R(){return["DOMENICA","LUNEDÌ","MARTEDÌ","MERCOLEDÌ","GIOVEDÌ","VENERDÌ","SABATO"][(new Date).getDay()]}const z=()=>{var n,s;const[d,y]=b("mealPlans",[]),[f,j]=b("currentPlanId",null),[N,E]=b("nutritionData",{}),[S,w]=b("userName",""),[z,k]=e.useState(!1),[M,V]=b("selectedDay",R());e.useEffect((()=>{f&&V(R())}),[f]);const[U,$]=e.useState(!1),[B,F]=e.useState(null),[G,q]=b("swappedDays",[]),[J,W]=e.useState(null),[H,K]=e.useState(!1);e.useState(!1);const[Q,X]=e.useState(!1),[Y,Z]=e.useState(null),[ee,te]=e.useState(!1),[ne,se]=e.useState(null),[ae,ie]=e.useState(!1),[le,re]=e.useState(!1),[oe,ce]=e.useState(""),[de,me]=e.useState(!1),ue=d.find((e=>e.id===f)),pe=(e,t="success",n=null)=>{Z({message:e,type:t,action:n})},he=(null==(n=null==ue?void 0:ue.plan)?void 0:n[M])?m(ue.plan[M]):{calories:0,protein:0,carbs:0,fat:0};return t.jsxs("div",{className:"max-w-md mx-auto p-4 bg-gray-50 min-h-screen",children:[t.jsxs("div",{className:"sticky top-0 z-50 bg-gray-50 pb-4",children:[t.jsxs("div",{className:"flex items-center justify-start mb-3",children:[t.jsxs("picture",{children:[t.jsx("source",{srcSet:"/DietApp/DietApp-logo.webp",type:"image/webp"}),t.jsx("img",{src:"/DietApp/DietApp-logo.png",alt:"DietApp Logo",className:"h-16 w-auto mr-2"})]}),t.jsx("span",{className:"text-2xl font-bold text-gray-700",children:"DietApp"})]}),f&&t.jsx(a,{className:"mb-2",children:t.jsx(i,{className:"py-3 px-4",children:t.jsxs("div",{className:"text-center",children:[t.jsx("h2",{className:"text-lg font-medium text-gray-700",children:(()=>{const e=(new Date).getHours();return`${e>=5&&e<12?"Buongiorno":e>=12&&e<18?"Buon pomeriggio":"Buonasera"}, ${S||"Ospite"} 👋`})()}),t.jsx("p",{className:"text-sm text-gray-500 mt-1",children:(new Date).toLocaleDateString("it-IT",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]})})}),t.jsx("div",{onClick:()=>me(!de),className:"cursor-pointer mb-4",children:t.jsxs("div",{className:"flex items-center justify-between bg-white rounded-lg p-3 shadow-sm",children:[t.jsx("span",{className:"text-sm font-medium text-gray-700",children:f?null==(s=d.find((e=>e.id===f)))?void 0:s.name:"Seleziona o carica un piano"}),t.jsx(u,{className:"h-4 w-4 text-gray-400 transition-transform duration-200 "+(de?"rotate-180":"")})]})}),de&&t.jsx("div",{className:"mb-4",children:t.jsx(D,{currentUser:f,users:d.map((e=>({id:e.id,name:e.name}))),onUserChange:e=>{j(e),V(R()),me(!1)},onPlanUpload:async e=>{const t=e.target.files[0];if(t)try{const e=await parseFile(t),n=`plan-${Date.now()}`,s=t.name.split(".")[0];y((t=>[...t,{id:n,name:s,plan:e,created:(new Date).toISOString()}])),j(n),k(!0)}catch(n){pe(`Errore nel caricamento del file: ${n.message}`,"error")}},onNutritionUpload:async e=>{const t=e.target.files[0];if(t)try{const e=await parseNutritionData(t);E((t=>({...t,...e}))),alert("Informazioni nutrizionali caricate con successo!")}catch(n){alert(`Errore nel caricamento del file: ${n.message}`)}},onDeletePlan:e=>{const t=e===f,n=d.filter((t=>t.id!==e));t&&(n.length>0?j(n[0].id):j(null),q([])),y(n),pe("Piano eliminato con successo","success")},onClearAll:()=>{y([]),j(null),q([]),pe("Tutti i piani sono stati eliminati","success")},onAddManualPlan:()=>{X(!0)}})}),f&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex justify-between items-center mb-2",children:[t.jsx("button",{onClick:()=>{$(!U),F(null)},className:"p-2 rounded-lg transition-all duration-200 "+(U?"bg-yellow-500 text-white":"bg-white text-gray-600 hover:bg-gray-100"),title:U?"Annulla Scambio":"Scambia Giorni",children:t.jsx(p,{className:"h-5 w-5"})}),t.jsx("div",{className:"flex space-x-2",children:G.length>0&&t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:()=>{if(0===G.length)return;const e=d.find((e=>e.id===f));if(!e)return;const t=G[G.length-1],n={...e},s={...n.plan[t.day1]};n.plan[t.day1]={...n.plan[t.day2]},n.plan[t.day2]=s,y((e=>e.map((e=>e.id===f?n:e)))),q((e=>e.slice(0,-1)))},className:"p-2 rounded-lg bg-gray-100 hover:bg-gray-200",title:"Annulla Ultimo Scambio",children:t.jsx(h,{className:"h-5 w-5 text-gray-600"})}),t.jsx("button",{onClick:()=>{if(0===G.length)return;const e=d.find((e=>e.id===f));if(!e)return;let t={...e};[...G].reverse().forEach((e=>{const n={...t.plan[e.day1]};t.plan[e.day1]={...t.plan[e.day2]},t.plan[e.day2]=n})),y((e=>e.map((e=>e.id===f?t:e)))),q([])},className:"p-2 rounded-lg bg-red-100 hover:bg-red-200",title:"Ripristina Tutti gli Scambi",children:t.jsx(g,{className:"h-5 w-5 text-red-600"})})]})})]}),t.jsx("div",{className:"grid grid-cols-7 gap-1 mb-4",children:["LUNEDÌ","MARTEDÌ","MERCOLEDÌ","GIOVEDÌ","VENERDÌ","SABATO","DOMENICA"].map((e=>{const n=G.find((t=>t.day1===e||t.day2===e)),s=n?{otherDay:n.day1===e?n.day2:n.day1,date:n.date}:null;return t.jsx(l,{day:e,isSelected:M===e,isSwapMode:U,isFirstDay:B===e,isSwapped:!!n,swapInfo:s,onClick:()=>U?(e=>{if(B){if(B!==e){const t=d.find((e=>e.id===f));if(!t)return;const n={...t},s={...n.plan[B]};n.plan[B]={...n.plan[e]},n.plan[e]=s,y((e=>e.map((e=>e.id===f?n:e)))),q((t=>[...t,{day1:B,day2:e,date:(new Date).toISOString()}])),F(null),$(!1)}}else F(e)})(e):V(e)},e)}))}),U&&t.jsx("div",{className:"mt-2 text-sm text-center text-gray-600 mb-4",children:B?"Ora seleziona il secondo giorno per completare lo scambio":"Seleziona il primo giorno da scambiare"})]})]}),t.jsxs(e.Suspense,{fallback:t.jsx("div",{className:"p-4 text-center",children:"Caricamento..."}),children:[z&&t.jsx(L,{onSaveName:e=>{w(e),k(!1)},onClose:()=>k(!1)}),J&&t.jsx(_,{meal:J.meal,items:J.items,nutritionData:N,onSave:e=>{const t={...ue};t.plan[M][J.meal]=e,y((e=>e.map((e=>e.id===f?t:e)))),W(null)},onCancel:()=>W(null)}),(H||ae)&&t.jsx(v,{nutritionData:N,initialPlan:null==ue?void 0:ue.plan,isEditing:ae,onSave:e=>{if(ae)y((t=>t.map((t=>t.id===f?{...t,plan:e}:t)))),ie(!1),pe("Piano aggiornato con successo","success");else{d.find((e=>e.id===f))&&(y((t=>t.map((t=>t.id===f?{...t,plan:e}:t)))),K(!1),pe("Nuovo piano creato con successo","success"))}},onCancel:handleCancelPlanEdit})]}),Q&&t.jsx(O,{onConfirm:e=>{ce(e),X(!1),re(!0)},onCancel:()=>X(!1)}),f&&(null==ue?void 0:ue.plan)&&t.jsx(A,{onSwipe:e=>{const t=Object.keys(ue.plan),n=t.indexOf(M),s="left"===e?(n+1)%t.length:(n-1+t.length)%t.length;V(t[s])},children:t.jsxs("div",{className:"space-y-4 mt-4",children:[t.jsx(a,{className:"mb-6",children:t.jsxs(i,{className:"py-3 px-4",children:[t.jsx(r,{className:"text-sm font-medium",children:"Totali Giornalieri"}),t.jsx(o,{children:t.jsx(c,{nutrition:he})})]})}),Object.entries(ue.plan[M]||{}).map((([e,n])=>t.jsxs("div",{className:"relative",children:[t.jsx("button",{onClick:()=>W({meal:e,items:n}),className:"absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 z-10",children:t.jsx(x,{className:"h-4 w-4"})}),t.jsx(C,{title:e,items:n,mealIcons:T,nutritionData:N})]},e)))]})}),Y&&t.jsx(P,{message:Y.message,type:Y.type,action:Y.action,onClose:()=>Z(null)}),ee&&ne&&t.jsx(I,{currentName:ne.name,onConfirm:e=>{const t=e.toLowerCase().includes("piano")?e:`Piano Alimentare ${e}`;y((e=>e.map((e=>e.id===ne.id?{...e,name:t}:e)))),te(!1),se(null),pe("Piano rinominato con successo","success")},onCancel:()=>{te(!1),se(null)}})]})},k=e.createContext(null),M=({children:n})=>{const[s,a]=e.useState(null),i=e.useCallback(((e,t="success",n=3e3)=>{a({message:e,type:t,duration:n})}),[]),l=e.useCallback((()=>{a(null)}),[]);return t.jsxs(k.Provider,{value:{showToast:i,hideToast:l},children:[n,s&&t.jsx(d,{message:s.message,type:s.type,duration:s.duration,onClose:l})]})};n.createRoot(document.getElementById("root")).render(t.jsx(s.StrictMode,{children:t.jsx(M,{children:t.jsx(z,{})})}));
