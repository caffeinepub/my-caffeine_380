import{c as l}from"./index-Bd1LfYOC.js";import{r as c}from"./vendor-Cp4Rjhw2.js";import{u as w}from"./useActor-Bk0Q8h3z.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]],C=l("banknote",I);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],D=l("calendar",b);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],$=l("trending-down",A);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],O=l("trending-up",N),g="isp_expenses",u="expenses_migrated_to_backend";function x(){try{const e=localStorage.getItem(g);return e?JSON.parse(e):[]}catch{return[]}}function o(e){try{localStorage.setItem(g,JSON.stringify(e))}catch{}}function h(e){return{id:e.id,serial:BigInt(e.serial),category:e.category,description:e.description,unit:e.unit,rate:e.rate,amount:e.amount,createdAt:BigInt(e.createdAt),date:e.date}}function v(e){return{id:e.id,serial:Number(e.serial),category:e.category,description:e.description,unit:e.unit,rate:e.rate,amount:e.amount,createdAt:Number(e.createdAt),date:e.date}}function R(){const{actor:e,isFetching:p}=w(),[f,r]=c.useState(x),[y,i]=c.useState(!1),m=c.useRef(!1);c.useEffect(()=>{!e||p||m.current||(i(!0),e.getExpenses().then(async t=>{m.current=!0;const n=t.map(v),a=localStorage.getItem(u);if(!a&&n.length===0){const s=x();if(s.length>0){await Promise.all(s.map(d=>e.addExpense(h(d)).catch(()=>{}))),localStorage.setItem(u,"1"),r(s),o(s),i(!1);return}}a||localStorage.setItem(u,"1"),r(n),o(n),i(!1)}).catch(()=>{i(!1)}))},[e,p]);const k=c.useCallback(t=>{let n;r(a=>{const s=a.reduce((S,M)=>Math.max(S,M.serial),0);n={...t,date:t.date||new Date().toISOString().split("T")[0],id:`exp_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,serial:s+1,createdAt:Date.now()};const d=[...a,n];return o(d),d}),e&&Promise.resolve().then(()=>{e.addExpense(h(n)).catch(()=>{})})},[e]),E=c.useCallback(t=>{r(n=>{const a=n.map(s=>s.id===t.id?t:s);return o(a),a}),e&&e.updateExpense(h(t)).catch(()=>{})},[e]),_=c.useCallback(t=>{r(n=>{const a=n.filter(s=>s.id!==t);return o(a),a}),e&&e.deleteExpense(t).catch(()=>{})},[e]);return{expenses:f,addExpense:k,updateExpense:E,deleteExpense:_,loading:y}}export{C as B,D as C,O as T,$ as a,R as u};
