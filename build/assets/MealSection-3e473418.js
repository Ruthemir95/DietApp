import{j as e,C as o,a as x,b as d,N as u,d as m,I as b}from"./index-c9aac779.js";const f=t=>{if(!Array.isArray(t))return console.warn("items non è un array valido:",t),{calories:0,protein:0,carbs:0,fat:0};const s=t.reduce((a,n)=>{if(n.alternative)return a;const r=n.nutrition||{calories:0,protein:0,carbs:0,fat:0};return{calories:a.calories+(Number(r.calories)||0),protein:a.protein+(Number(r.protein)||0),carbs:a.carbs+(Number(r.carbs)||0),fat:a.fat+(Number(r.fat)||0)}},{calories:0,protein:0,carbs:0,fat:0});return{calories:Math.round(s.calories),protein:Number(s.protein.toFixed(1)),carbs:Number(s.carbs.toFixed(1)),fat:Number(s.fat.toFixed(1))}},N=({title:t,items:s,mealIcons:a})=>{const n=f(s);return e.jsxs(o,{className:"mb-4",children:[e.jsxs(x,{className:"flex flex-row items-center justify-between pb-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[a[t],e.jsx(d,{className:"text-lg font-semibold text-primary",children:t})]}),e.jsx(u,{nutrition:n})]}),e.jsx(m,{children:e.jsx("ul",{className:"space-y-2",children:s.map((r,i)=>{if(r.alternative)return e.jsx("div",{className:"mt-2 pl-4 py-2 bg-gray-50 rounded-lg border-l-4 border-blue-200",children:e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx(b,{className:"h-4 w-4 text-blue-400 mt-1 flex-shrink-0"}),e.jsx("span",{className:"text-sm text-gray-600",children:r.alternative})]})},i);const l=r.item,c=r.nutrition;return e.jsxs("li",{className:"text-sm flex items-center justify-between pl-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"}),e.jsx("span",{children:l})]}),c&&e.jsxs("span",{className:"text-xs text-gray-500",children:[c.calories," kcal"]})]},i)})})})]})};export{N as default};
