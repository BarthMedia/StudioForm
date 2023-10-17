(function(){const e=10,t=90,r=0,n=1,s=1,o=.5,i=.5,l=.5,a=16,c="studio-form",u="StudioForm",d="sf-",m="data-",f="input, select, textarea",g=`label, [${c}="label"]`,p=`[${c}="submit"], [${c}="next"], .w-button:not([${c}="Not a Button"]):not([${c}="no-button"]):not([${c}="prev"])`,h=e=>`${u}[${e.sdk.i}] -> `,b=e=>{(Array.isArray(e)?e:[e]).forEach((e=>{let t=e.el;if(e.closest){const r=e.closest,n=r.allowParent?.refEl||e.el,s=r.allowParent?.getAttr?n.getAttribute(r.allowParent.getAttr):n.tagName;r.allowParent&&s!==r.allowParent.equals||(t=e.el.closest(r.parent)||t)}const r=[t];e.otherEls&&e.otherEls.forEach((e=>r.push(e))),t.querySelectorAll("*").forEach((e=>r.push(e))),r.forEach((t=>t.classList?.[e.mode](`${d}${e.class}`)))}))},v="hide",y={class:v,closest:{parent:`[${c}="${v}"]`,allowParent:{getAttr:`${m}closest-${v}`,equals:"false"}}};function k(e,t){b({...y,el:e,mode:t})}const w=e=>{k(e,"add")},A=e=>{k(e,"remove")};function $(e,t,r,n=!1){const s=t.elements.wrapper.closest(["window-scroll"].map((e=>`[${c}="${e}"]`)).join(", ")),o=e.getBoundingClientRect(),i=s?.getBoundingClientRect(),l=E(t,r).offset,a=i?.height||window.innerHeight;return o.top-(i?.top||0)-l>=-1&&o.top-(i?.top||0)<a&&(!n||o.bottom-(i?.bottom||0)<a)}function E(e,t){const r=`${m}scroll-to-target`,n="string"==typeof t.target?t.target:t.attributeReferenceElement?.getAttribute(r)||e.elements.wrapper?.getAttribute(r)||"",s=`${m}scroll-to-offset`,o="string"==typeof t.offset?t.offset:t.attributeReferenceElement?.getAttribute(s)||e.elements.wrapper?.getAttribute(s)||"",i=R(t.target)?t.target:""!==n&&document.querySelector(n)||e.elements.wrapper;let l=R(t.offset)?t.target:""!==o?document.querySelector("string"==typeof t.offset?t.offset:o):null;return l="number"==typeof t.offset?t.offset:l?.offsetHeight||a,{target:i,offset:l}}function S(e,t){const r=e.sdk.events,n=e.view.eventsFunctionArrays;n[`on${t}`]=[],n[`after${t}`]=[],r[`on${t}`]=function(...e){q(e,n[`on${t}`])},r[`after${t}`]=function(...e){q(e,n[`after${t}`])}}function x(e){e.forEach((e=>e()))}function q(e,t){function r(e){"function"==typeof e&&t.push(e)}e.forEach?e.forEach((e=>r(e))):r(e)}function R(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}const T=function(e,t="standard"){return new Promise((function(r,n){setTimeout((function(){n(new Error(`Request took too long! Timeout after ${e/("quick"===t?10:1)} second`))}),1e3*e/("quick"===t?10:1))}))},L=async function(t,r={},n=e){try{const e=await Promise.race([fetch(t,r),T(n)]);let s={message:"Unable to format response as JSON."};const o=e.headers.get("Content-Type");if(o&&o.includes("text/html")){s=await e.text();s=(new DOMParser).parseFromString(s,"text/html")}else try{s=await e.json()}catch(e){console.warn("helper.ts -> getJson: ",e)}if(!e.ok)throw new Error(`${s.message} (${e.status})`);return s}catch(e){throw e}},N=e=>`${h(e)}modes.ts -> default: `;function M(e){if(!R(e.elements.wrapper))throw new Error(`${N(e)}state.elements.wrapper is not an element`);e.modes={};const t=e.modes,r=e.elements.wrapper;t.keyboardEvents="true"===(r.getAttribute(`${m}keyboard-events`)||"true"),t.simpleSdk="true"===(r.getAttribute(`${m}simplified-sdk`)||"true"),t.removeVisualDividers="true"===(r.getAttribute(`${m}remove-dividers`)||"true"),t.removeConditionallyInvisibeSlides="true"===(r.getAttribute(`${m}remove-conditionally-invisible-slides`)||"true"),t.isJotFrom="true"===(r.getAttribute(`${m}jot-form-mode`)||"false"),t.isWfForm=r.classList.contains("w-form"),t.isSlider=!t.isWfForm||"true"===(r.getAttribute(`${m}slider-mode`)||"false"),t.temporaryRequired="true"===(r.getAttribute(`${m}temporary-required`)||"true"),t.swapSubmitButtons="true"===(r.getAttribute(`${m}swap-submit-buttons`)||"true"),t.calculateProgress="true"===(r.getAttribute(`${m}calculate-progress`)||"false"),t.autoRemoveButtonSuggestion="true"===(r.getAttribute(`${m}auto-remove-button-suggestion`)||"true"),t.autoSuggestButtons="true"===(r.getAttribute(`${m}auto-suggest-buttons`)||"true"),t.scrollToTarget="true"===(r.getAttribute(`${m}auto-scroll-to-target`)||"true"),t.waitForAnimations="true"===(r.getAttribute(`${m}wait-for-animations`)||"false"),t.hideErrorMessageOnClick="true"===(r.getAttribute(`${m}hide-error-message-on-click`)||"true"),t.scrollOnRequirementsError="true"===(r.getAttribute(`${m}scroll-on-requirements-error`)||"true"),t.forceScrollOnRequirementsError="true"===(r.getAttribute(`${m}force-scroll-on-requirements-error`)||"false"),t.nativeReportVadility="true"===(r.getAttribute(`${m}native-report-validity`)||"true"),t._100PercentProgressOnSubmitOnly="true"===(r.getAttribute(`${m}100-percent-progress-on-submit-only`)||"true"),t.fieldParamsRedirect="true"===(r.getAttribute(`${m}field-params-redirect`)||"true"),t.scrollIfTopNotVisible="true"===(r.getAttribute(`${m}scroll-if-top-not-visible`)||"true"),t.autoSwapFileUploadLabelText="true"===(r.getAttribute(`${m}swap-file-upload-label-text`)||"true")}function F(e,t){const r=e.querySelectorAll(f),n=e.querySelectorAll(p),s=r.length<1;let o=n.length<1,i=!0;o&&r.forEach((e=>{"radio"!==e.getAttribute("type")&&(o=!1)})),i&&r.forEach((e=>{"checkbox"!==e.getAttribute("type")&&(i=!1)}));let l="standard";o&&(l="radio"),s&&(l="empty");const a=e.getAttribute(`${m}slide-type`);return a&&""!==a&&(l=a),l}function B(e,t,r){const n=t.querySelectorAll(f),s=t.querySelectorAll(p),o=[];function i(e,t){const r={};r.i=t,r.el=e,r.conditional=e?.getAttribute(`${m}conditional`)||"",r.next="submit"!==e?.getAttribute(c),o.push(r)}return"radio"===e?(n.forEach(((e,t)=>{i(e.closest(g),t)})),o):(s.forEach(((e,t)=>{i(e,t)})),o)}function P(e,t){if(!t.modes.swapSubmitButtons)return;const r=e.querySelectorAll('input[type="submit"]');r.length<1||r.forEach((e=>{const t=e.attributes,r={};for(const e of t)r[e.name]=e.value;const n=document.createElement("a");for(const e in r)n.setAttribute(e,r[e]);n.removeAttribute("type"),n.removeAttribute("value"),n.setAttribute(c,"submit"),n.innerHTML=e.getAttribute("value")||"",e.after(n),e.remove()}))}const D=e=>`${h(e)}slideLogic.ts -> default`;function C(e){const t=z[e],r=[];for(let e=0,n=t.elements.slides.length;e<n;e++){const n=t.elements.slides[e],s={};s.i=e,s.el=n,P(n,t),s.type=F(n),s.btns=B(s.type,n),s.conditionalNext="true"===(n.getAttribute(`${m}conditional-next`)||"false"),s.conditional=n.getAttribute(`${m}conditional`)||"",r.push(s)}r.forEach((e=>{if(e.btns.length<1){e.btns=!1;let t=!1;return t=(()=>{for(let t=0,n=r.length;t<n;t++){const n=r[t];if(n.i>e.i&&""===n.conditional&&!1===n.conditionalNext)return n.i}})(),e.i<r.length-1&&!0===r[e.i+1]?.conditionalNext&&(t=e.i+1),e.i>=r.length-1&&(t=!1),void(e.next=t)}e.btns.every((n=>{if(!1===n.next)return!0;if(n.el.setAttribute(c,"next"),e.i>=r.length-1)return n.next=!1,n.el.setAttribute(c,"submit"),!0;if(""!==n.conditional){let s;if(r.every((e=>n.conditional!==e.conditional||(s=e,!1))),s){let t=s.i;t<=e.i&&(n.conditionalPrev=!0),n.next=t}else console.warn(`${D(t)}-> slideLogic.forEach() callback -> slide.btns.every() callback: The partner slide for btns[${n.i}].conditional === '${n.conditional}' (in state.elements.slides[${e.i}]) has not been found.`),n.el.setAttribute(c,"submit"),n.next=!1;return!0}return!0===r[e.i+1]?.conditionalNext?(n.next=e.i+1,!0):(n.next=(()=>{for(let t=0,n=r.length;t<n;t++){const n=r[t];if(n.i>e.i&&""===n.conditional&&!1===n.conditionalNext)return n.i}})(),!0)}))})),t.sdk.slideLogic=r}const I=e=>`${h(e)}calculateProgress.ts -> default`;function O(e){const t=z[e];if(t.sdk.slideLogic.length<1||t.sdk.slideRecord.length<1)throw new Error(`${I(t)}: state.sdk.slideLogic.length and/or state.sdk.slideRecord.length can't equal 0`);const r=t.sdk.slideLogic,n=t.sdk.slideRecord,s=n[n.length-1],o=n.length;let i=r.length,l=0,a=0,c=0,u=[];!function e(n){let s=function(e){let t=[];e.btns?e.btns.forEach((e=>{-1!==t.indexOf(e.next)||e.conditionalPrev||t.push(e.next)})):t.push(e.next);return t}(n);a++,c++,[...s].filter((e=>!1!==e)).length>1&&(u.push(c),c=0);let o=!1;!1!==n.btns?n.btns.every((e=>!1!==e.next&&void 0!==e.next||(l=Math.max(l,a),i=Math.min(i,a),a=0,u.forEach((e=>{a+=e})),u.pop(),o=!0,!1))):!1!==n.next&&void 0!==n.next||(l=Math.max(l,a),i=Math.min(i,a),a=0,u.forEach((e=>{a+=e})),u.pop(),o=!0),o||s.forEach((s=>{void 0!==s?!1!==s&&e(r[s]):console.warn(`${I(t)} -> objectLoop -> array.forEach() callback: id === undefined`,n)}))}(r[s]),i+=o-1,l+=o-1;const d=t.modes._100PercentProgressOnSubmitOnly?1:0;return{shortest:{percentage:o/(i+d)*100,path:i,walked:o},longest:{percentage:o/(l+d)*100,path:l,walked:o}}}const H=e=>`${h(e)}requirements.ts -> default`,j=`${m}${d}input-id`;function U(e,t,r){if(!0===r.doNotCheckSlideRequirements)return!0;const n=z[e],s=n.sdk.slideLogic[t],o=[];if(!0===n.modes.isSlider)return!0;if("empty"===s.type)return!0;if("radio"===s.type){const e=s.el.querySelectorAll('input[type="radio"]');let t=!1;return e.forEach((e=>{e.hasAttribute(`${m}selected`)&&(t=!0)})),n.sdk.slideRequirementsData=o,!!t||(e.forEach((e=>o.push({el:e,msg:"nothing selected",regExp:void 0}))),n.sdk.slideRequirementsData=o,n.view.renderRequirements(o),!1)}if("standard"===s.type){s.el.querySelectorAll(f).forEach(((e,t)=>{e.setAttribute(j,t.toString())}));const e=s.el.querySelectorAll('input[type="radio"]'),t=[];return e.forEach((e=>{-1===t.indexOf(e.name)&&t.push(e.name)})),t.forEach((e=>{const t=s.el.querySelectorAll(`input[type="radio"][name="${e}"]`);let r=!1;t.forEach((e=>{e.hasAttribute(`${m}selected`)&&(r=!0)})),r||t.forEach((e=>o.push({el:e,i:parseInt(e.getAttribute(j)||""),msg:"nothing selected",regExp:void 0})))})),s.el.querySelectorAll(f).forEach((e=>{if("radio"===e.type)return;if(!e.hasAttribute("required"))return;const t=parseInt(e.getAttribute(j)||"");if(""===e.value)return void o.push({el:e,i:t,msg:"empty",regExp:void 0});if("number"===e.type){const r=function(e){const t=parseFloat(e.value),r=parseFloat(e.getAttribute("min")||""),n=parseFloat(e.getAttribute("max")||""),s=parseFloat(e.getAttribute("step")||"");return isNaN(t)?"Please enter a valid number.":!isNaN(r)&&t<r?`Value must be greater than or equal to ${r}.`:!isNaN(n)&&t>n?`Value must be less than or equal to ${n}.`:!(!isNaN(s)&&(t-r)%s!=0)||`Value must be in increments of ${s}.`}(e);if(!0!==r)return void o.push({el:e,i:t,msg:r,regExp:void 0})}const r=function(e){const t=e.value,r=e.getAttribute("minlength"),n=e.getAttribute("maxlength");return null!==r&&t.length<parseInt(r)?`Minimum length required: ${r} characters.`:!(null!==n&&t.length>parseInt(n))||`Maximum length allowed: ${n} characters.`}(e);if(!0===r){if(e.getAttribute("pattern"))try{const r=new RegExp(e.getAttribute("pattern")||"");return r.test(e.value)?void 0:void o.push({el:e,i:t,msg:"custom regular expression",regExp:r})}catch(t){console.warn(`${H(n)} -> forEach() callback: Unvalid regex test!`,e)}if("email"===e.type){const r=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;if(!r.test(e.value))return void o.push({el:e,i:t,msg:"email",regExp:r})}if("tel"===e.type){const r=/^[\d\s\-\+\(\)\.\/*#]+$/;if(!r.test(e.value))return void o.push({el:e,i:t,msg:"telephone",regExp:r})}if("number"===e.type){const r=/^-?(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/;if(!r.test(e.value))return void o.push({el:e,i:t,msg:"number",regExp:r})}}else o.push({el:e,i:t,msg:r,regExp:void 0})})),o.sort(((e,t)=>e.i-t.i)),s.el.querySelectorAll(f).forEach((e=>{e.removeAttribute(j)})),n.sdk.slideRequirementsData=o,!(o.length>0)||(n.view.renderRequirements(o),!1)}return!!s.el.getAttribute(`${m}requirements`,"true")}const V=e=>`${h(e)}post.ts -> default`;async function W(t){const r=z[t],n=r.elements.mask;let s="POST",o="https://webflow.com/api/v1/form/"+document.querySelector("html")?.getAttribute("data-wf-site");if(!R(n))throw new Error(`${V(r)}: Couldn't find form!`);const i=[],l=[];let a={name:n.getAttribute("data-name"),pageId:document.querySelector("html")?.getAttribute("data-wf-page"),elementId:n.getAttribute("data-wf-element-id"),source:location.href},c=!1;(r.modes.isJotFrom||(n.getAttribute("action")||"").indexOf("jotform.com/submit")>-1)&&(c=!0,a=[]),r.sdk.slideRecord.forEach((e=>{r.sdk.slideLogic[e].el.querySelectorAll(f).forEach((e=>{const t=e.getAttribute(`${m}name`)||e.getAttribute("name")||e.getAttribute("id")||e.getAttribute("class")||e.getAttribute("type")||e.tagName;if("radio"!==e.type||e.hasAttribute(`${m}selected`))if("file"!==e.type)c&&""===e.value||i.push({key:t,value:e.value});else if(e.files)for(let r=0,n=e.files.length;r<n;r++)l.push({key:`${t}${c?"":"]["}${c?"":r}`,value:e.files[r]})}))}));const u=l.length>0;i.forEach((e=>{c?a.push(e):a[`fields[${e.key}]`]=e.value})),l.forEach((e=>{c?a.push(e):a[`files[${e.key}]`]=e.value}));const d=u?new FormData:new URLSearchParams;if(c)a.forEach((e=>d.append(e.key,e.value)));else for(const e in a)d.append(e,a[e]);if(n.getAttribute("action")){s=(n.getAttribute("method")||"").toUpperCase(),o=n.getAttribute("action")||"";const e=(n.getAttribute(`${m}method`)||r.elements.wrapper.getAttribute(`${m}method`)||"").toUpperCase();["GET","PUT","POST","PATCH","DELETE"].includes(e)&&(s=e)}const g={Accept:n.getAttribute(`${m}headers-accept`)||"application/json, text/javascript, */*; q=0.01","Content-Type":n.getAttribute(`${m}headers-content-type`)||"application/x-www-form-urlencoded; charset=UTF-8"},p=!(!n.getAttribute(`${m}headers-accept`)&&!n.getAttribute(`${m}headers-content-type`)),h={method:s,headers:g,body:u?d:d.toString()};if(u&&!p&&delete h.headers,"GET"===s){p||delete h.headers,delete h.body;const e=new URL(o),t=e.searchParams;for(const e of i)t.append(e.key,e.value);e.search=t.toString(),o=e.href}const b=n.getAttribute(`${m}auth-token`)||"";let v;""!==b&&(h.headers=h.headers?{...h.headers,Authorization:`Bearer ${b}`}:{Authorization:`Bearer ${b}`});let y,k="done";try{v=await L(o,h,parseInt(r.elements.wrapper.getAttribute(`${m}timeout`)||e.toString()))}catch(e){console.error(`${V(r)} -> await fetch(): `,e),k="fail",v=e}if(n.getAttribute("redirect"))try{const e=n.getAttribute("redirect")||"";let t="";/^(https?:\/\/)/i.test(e)||(t=location.protocol+"//"+(e.startsWith("/")?location.hostname:""));let s=new URL(t+e);if(r.modes.fieldParamsRedirect){const e=s.searchParams;for(const t of i)e.append(t.key,t.value);s.search=e.toString()}y=s.href}catch(e){console.error(`${V(r)} -> try { ... redirect url ... } catch: `,e)}return r.sdk.data.endpoint=o,r.sdk.data.options=h,r.sdk.data.method=s,r.sdk.data.payload=a,r.sdk.data.response=v,r.sdk.data.status=k,r.sdk.data.redirect=y,v}const z=[];function J(e,t){const r={elements:{}};r.elements.wrapper=e,r.sdk={},r.sdk.i=t,r.sdk.events={},r.sdk.animationData={},r.sdk.register={},r.sdk.slideRecord=[0],M(r),r.view={},r.view.sfInactiveArray=[],r.view.eventsFunctionArrays={},r.view.gsapTimeline={},r.view.gsapProgressBarTimeline={},r.model={},r.model.generateSlideLogic=function(){C(t)},r.sdk.data={},r.model.post=async function(){return W(t)},r.model.generateProgressData=function(){const e=O(t);r.sdk.pathProgressData=e};const n=r.view.eventsFunctionArrays;S(r,"CheckSlideRequirements"),r.sdk.slideRequirementsData={},r.sdk.slideRequirements=function(e,r={}){x(n.onCheckSlideRequirements);const s=U(t,e,r);return x(n.afterCheckSlideRequirements),s},z.push(r)}const Y=e=>`${h(e)} -> elements.ts -> default: `;function Z(e){const t=e.elements,r=e.elements.wrapper;function n(t,...r){return r.map((r=>{const n=`[${c}="${r}"]`;return t?`[${m}${d}id="${e.sdk.i}"] `+n+`,[${c}-${e.sdk.i}="${r}"]`:n})).join(",")}r.setAttribute(`${m}${d}id`,e.sdk.i),t.mask=r.querySelector(n(!1,"mask"))||r.querySelector("form")||r.querySelector("*");const s=document.querySelectorAll(n(!0,"Visual Divider","visual-divider","divider"));e.modes.removeVisualDividers&&s.forEach((e=>e.remove())),e.modes.removeConditionallyInvisibeSlides&&t.mask?.childNodes.forEach((e=>{e.classList.contains("w-condition-invisible")&&e.remove()})),t.slides=t.mask?.querySelectorAll(n(!1,"slide")),0===t.slides?.length&&(t.slides=t.mask?.childNodes),e.modes.isWfForm&&(t.successMsg=r.querySelector(".w-form-done"),t.errorMsg=r.querySelector(".w-form-fail")),Object.keys(t).every((r=>{if(NodeList.prototype.isPrototypeOf(t[r])||HTMLCollection.prototype.isPrototypeOf(t[r])){if(t[r].length<1)throw new Error(`${Y(e)}state.elements.${r}.length is 0`);return!0}if(!R(t[r]))throw new Error(`${Y(e)}state.elements.${r} is not an element`);return!0})),t.progress={},t.progress.bars=document.querySelectorAll(n(!0,"progress-bar")),t.progress.currentSlides=document.querySelectorAll(n(!0,"current-slide")),t.progress.minMaxSlides=document.querySelectorAll(n(!0,"min-max-slides")),t.progress.minSlides=document.querySelectorAll(n(!0,"min-slides")),t.progress.maxSlides=document.querySelectorAll(n(!0,"max-slides")),t.prevBtns=[],document.querySelectorAll(n(!0,"prev","Backwards Button")).forEach((e=>t.prevBtns.push(e))),t.nextBtns=[];for(let e=0,n=r.childNodes.length;e<n;e++){const n=r.childNodes[e];n.isEqualNode(t.mask)||["next","Continue Button"].forEach((e=>{n.querySelectorAll(`[${c}="${e}"]`).forEach((e=>{t.nextBtns.push(e)}))}))}document.querySelectorAll(`[${c}-${e.sdk.i}="next"`).forEach((e=>t.nextBtns.push(e))),t.responseData=r.querySelectorAll(n(!0,"response-data","response"))}const _=e=>`${h(e)} -> next.ts -> default`;function G(e,t){const r=z[e];let n;const s=r.sdk.slideRecord[r.sdk.slideRecord.length-1];if(r.view.suggestDoubleClick)return;if(!0===r.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===r.view.gsapTimeline.isRunning){const e=`${_}: The animation is not yet finished!`;return console.warn(e),e}if(!0===r.sdk.isSubmitted){const e=`${_}: Form already submitted!`;return console.warn(e),e}if(t.btn&&(n=t.btn.next),!t.btn){const e=r.sdk.slideLogic[s];if(!e)throw new Error(`${_}: Unable to find the current slide!`);if(!1===e.btns)n=e.next;else if(1===e.btns.length)n=e.btns[0].next;else{let t=!1;if(e.btns.every((e=>!e.suggested||(n=e.next,t=!0,!1))),!t){e.btns[0].el;return r.modes.autoSuggestButtons&&r.sdk.suggestButton(s,0),{msg:`${_(r)} -> state.sdk.slideLogic[${e.i}] -> .btns[0] was suggested!`,slideId:e.i,buttonId:0}}}}if(void 0===n&&(n=!1),"number"!=typeof n&&!1!==n)throw new Error(`${_(r)}: Unable to find a logical next slide!`);if(!1===n)return void r.sdk.submit(t);if(!r.sdk.slideRequirements(s,t))return;const o=r.sdk.slideRecord.indexOf(n);if(n<s){if(o<0)throw new Error(`${_(r)} -> if (next < currentSlideId) { ... }: Unable to find a logical next slide!`);r.sdk.slideRecord=r.sdk.slideRecord.slice(0,o+1)}else n!==s&&o<0&&r.sdk.slideRecord.push(n);r.view.animate({...t,currentSlideId:s,nextSlideId:n}),n>s&&r.elements.prevBtns.forEach((e=>{A(e)})),x(r.view.eventsFunctionArrays.afterNext)}const K=e=>`${h(e)}prev.ts -> default: `;function Q(e,t){const r=z[e];if(!0===r.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===r.view.gsapTimeline.isRunning){const e=`${K(r)}The animation is not yet finished!`;return console.warn(e),e}if(!0===r.sdk.isSubmitted){const e=`${K(r)}Form already submitted!`;return console.warn(e),e}if(r.sdk.slideRecord.length<=1){r.elements.prevBtns.forEach((e=>{w(e)}));const e=`${K(r)}Can't navigate backwards any further!`;return console.warn(e),e}const n=r.sdk.slideRecord[r.sdk.slideRecord.length-1],s=r.sdk.slideRecord[r.sdk.slideRecord.length-2],o=r.sdk.slideRecord.indexOf(s);r.sdk.slideRecord.pop(),r.view.animate({...t,currentSlideId:n,nextSlideId:s}),0===o&&r.elements.prevBtns.forEach((e=>{w(e)})),x(r.view.eventsFunctionArrays.afterPrev)}const X=e=>`${h(e)}submit.ts -> default: `;async function ee(e,t){const r=z[e],n=r.sdk.slideRecord[r.sdk.slideRecord.length-1];if(!0===r.modes.isSlider){const e=`${X(r)}Slider mode doesn't allow for submission!`;return console.warn(e),e}if(!0===r.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===r.view.gsapTimeline.isRunning){const e=`${X(r)}The animation is not yet finished!`;return console.warn(e),e}if(!0===r.sdk.isSubmitted){const e=`${X(r)}Form already submitted!`;return console.warn(e),e}if(!r.sdk.slideRequirements(n,t)&&!t.doNotCheckSlideRequirements)return;r.elements.errorMsg.style.display="",r.sdk.isSubmitted=!0;const s="data-wait",o="submit",i=r.sdk.slideLogic[n].btns;i&&i.forEach((e=>{b({el:e.el,class:o,mode:"add"}),""!==(e.el.getAttribute(s)||"")&&(e.textDefault||(e.textDefault=e.el.innerHTML),e.el.innerHTML=e.el.getAttribute(s))}));const l=await r.model.post();let a;try{a=l instanceof Document?JSON.stringify({message:`<b>${u}[0].events.afterSubmit(</b> ...yourCallBackFunctions <b>)</b> states:<br><b>${u}[${r.sdk.i}].data.response</b> is an instance of Document.`},null,2):"fail"===r.sdk.data.status?r.sdk.data.response.message:JSON.stringify(l,null,2)}catch(e){const t=`${X(r)}Unable to produce "resVal: string" value!`;console.warn(t,e)}if("string"==typeof a&&r.elements.responseData.forEach((e=>{e.style.whiteSpace="pre-wrap",e.innerHTML=a})),"done"!==r.sdk.data.status&&!0!==t.forceDone){i&&i.forEach((e=>{b({el:e.el,class:o,mode:"remove"}),""!==(e.el.getAttribute(s)||"")&&(e.el.innerHTML=e.textDefault)})),r.elements.errorMsg.style.display="block",r.modes.hideErrorMessageOnClick&&document.body.addEventListener("click",(function(){r.elements.errorMsg.style.display=""}),{once:!0}),r.sdk.isSubmitted=void 0;return`${X(r)}Form submission not successful!`}r.elements.wrapper.childNodes.forEach((e=>{e!==r.elements.mask&&e!==r.elements.errorMsg&&e!==r.elements.successMsg&&w(e)})),document.querySelectorAll(`[${c}-${r.sdk.i}]`).forEach((e=>w(e))),r.view.animate({...t,currentSlideId:n,isSubmit:!0}),"string"==typeof r.sdk.data.redirect&&setTimeout((()=>{location.href=r.sdk.data.redirect}),1e3*r.sdk.animationData.timeBoth+1),x(r.view.eventsFunctionArrays.afterSubmit);return`${X(r)}Form submission successful!`}function te(e,t){b({el:e,class:ne,mode:t,closest:{parent:g,allowParent:{equals:"LABEL",tagName:!0}}})}const re=e=>`${h(e)}suggestButton.ts -> init -> `,ne="suggested";function se(e){const t=e.view.eventsFunctionArrays;function r(t,r){const s=z[e.sdk.i].sdk.slideLogic[t].btns;if(!s)return;if(1===s.length)return;let o=-1;if(s.every((e=>!e.suggested||(o=e.i,!1))),-1===o)return void n(t,0);const i=Math.min(Math.max(o+r,0),s.length-1);i!==o&&(e.sdk.clearSuggestedButton(t,o),n(t,i))}function n(r,n){x(t.onButtonSuggestion);const o=e.sdk.slideLogic[r],i=o.btns[n];if(!o||!i)throw new Error(`${re(e)}suggest: Unable to find slide and/or button!`);e.view.suggestDoubleClick=!0,i.el.click(),e.view.suggestDoubleClick=!1,e.modes.autoRemoveButtonSuggestion&&setTimeout((()=>{document.body.addEventListener("click",(function(){setTimeout((()=>{s(r,n)}),1)}),{once:!0}),i.suggested=!0,te(i.el,"add")}),1),$(i.el,e,{attributeReferenceElement:o.el},!0)||e.sdk.scrollTo({target:i.el,attributeReferenceElement:o.el}),x(t.afterButtonSuggestion)}function s(r,n){x(t.onButtonSuggestionClear);const s=e.sdk.slideLogic[r],o=s.btns[n];s&&o?(o.suggested=void 0,te(o.el,"remove"),x(t.afterButtonSuggestionClear)):console.warn(`${re(e)}clear: Unable to find slide and/or button!`)}S(e,"ButtonSuggestion"),S(e,"ButtonSuggestionClear"),e.sdk.suggestNext=function(e){r(e,-1)},e.sdk.suggestPrev=function(e){r(e,1)},e.sdk.suggestButton=function(e,t){n(e,t)},e.sdk.clearAllSuggestedButton=function(t){const r=z[e.sdk.i].sdk.slideLogic[t].btns;r&&r.forEach((e=>{e.suggested&&s(t,e.i)}))},e.sdk.clearSuggestedButton=function(e,t){s(e,t)}}const oe=`${m}selected`,ie="selected";function le(e){e.sdk.slideLogic.forEach((e=>{e.el.querySelectorAll("input").forEach((e=>{if("checkbox"!==e.type&&"radio"!==e.type)return;const t=e.closest(g)||e,r={el:e,class:ie,closest:{parent:g}};let n=e.hasAttribute("checked"),s=!1;"checkbox"===e.type&&(n?b({...r,mode:"add"}):e.hasAttribute("required")?e.value="":e.value="off"),t.addEventListener("click",(()=>{if(!s){if(s=!0,setTimeout((()=>{s=!1}),1),"radio"===e.type){const n=[];document.querySelectorAll(`input[type="radio"][name="${e.name}"]`).forEach((t=>{t!==e&&n.push(t)})),b({...r,mode:"add"}),e.setAttribute(oe,""),b((t="remove",n.map((e=>({el:e,class:ie,mode:t,closest:{parent:g}}))))),n.forEach((e=>e.removeAttribute(oe)))}var t;"checkbox"===e.type&&(n?(b({...r,mode:"remove"}),e.hasAttribute("required")?e.value="":e.value="off",n=!1):(b({...r,mode:"add"}),e.value="on",n=!0))}}))}))}))}function ae(e){e.modes.autoSwapFileUploadLabelText&&e.elements.mask.querySelectorAll('input[type="file"]').forEach((e=>{const t=document.querySelector(`[for="${e.id}"]`);if(!t)return;if("true"!==(t.getAttribute(`${m}swap-text`)||"true"))return;const r=t?.innerHTML,n=[t,e];function s(r){b({...{class:"uploaded",mode:r},el:t,otherEls:[e]})}t.childNodes.forEach((e=>n.push(e))),e.addEventListener("change",(n=>{const o=e.files?.[0],i=t.getAttribute(`${m}swap-prefix`)||"";o?(t.innerHTML=i+o.name,s("add")):(t.innerHTML=r,s("remove"))}))}))}function ce(e){e.sdk.slideLogic.forEach((t=>{const r=new Set;t.el.querySelectorAll(`[${m}group]`).forEach((e=>{const t=e.getAttribute(`${m}group`);t&&!r.has(t)&&r.add(t)})),r.forEach((r=>{const n=`[${m}group="${r}"]`,s=t.el.querySelectorAll(`${n} input, input${n}`),o=[];s.forEach((e=>{"checkbox"===e.type&&o.push(e)}));const i=o[0].closest(g)||o[0];let l=parseInt(i.getAttribute(`${m}min`)||"");isNaN(l)&&(l=1);let a=parseInt(i.getAttribute(`${m}max`)||"");function c(e){o.forEach((t=>{const r=["required"];"set"===e&&r.push(""),t[e+"Attribute"](...r)}))}isNaN(a)&&(a=void 0),o.forEach((e=>{e.removeAttribute("required"),e.value=e.hasAttribute("checked")?e.getAttribute(`${m}value`)||"on":"",e.addEventListener("click",(()=>{!function(e){setTimeout((()=>{const t=!!e.classList.contains(`${d}selected`);e.value=t?e.getAttribute(`${m}value`)||"on":""}),1)}(e)}))})),e.sdk.events.onCheckSlideRequirements((()=>{let e=0;o.forEach((t=>{e+=""!==t.value?1:0}));let t=e>=l;void 0!==a&&(t=t&&e<=a),c(t?"remove":"set")}))}))}))}function ue(e){le(e),ce(e),ae(e);const t=e.view.eventsFunctionArrays;S(e,"Next"),S(e,"Prev"),S(e,"Submit"),e.sdk.next=(r={})=>{x(t.onNext);return G(e.sdk.i,r)},e.sdk.prev=(r={})=>{x(t.onPrev);return Q(e.sdk.i,r)},e.sdk.submit=async(r={})=>{x(t.onSubmit);return await ee(e.sdk.i,r)},se(e),e.sdk.slideLogic.forEach((t=>{t.btns&&t.btns.forEach((t=>t.el.addEventListener("click",(()=>{e.sdk.next({btn:t})}))))})),e.elements.nextBtns.forEach((t=>t.addEventListener("click",(()=>{e.sdk.next()})))),e.elements.prevBtns.forEach((t=>{w(t),t.addEventListener("click",(()=>{e.sdk.prev()}))}));const r=`${m}-active`;e.elements.wrapper.addEventListener("mouseover",(()=>{document.querySelectorAll(`[${r}]`).forEach((e=>{e.removeAttribute(r)})),e.elements.wrapper.setAttribute(r,"")})),0===e.sdk.i&&e.elements.wrapper.setAttribute(r,"");const n=`${m}keyboard-events`;document.addEventListener("keydown",(t=>{const s=t.target instanceof HTMLInputElement||t.target instanceof HTMLTextAreaElement?t.target:null;if(!e.elements.wrapper.hasAttribute(r))return;const o=e.sdk.slideLogic[e.sdk.slideRecord[e.sdk.slideRecord.length-1]];if(!e.modes.keyboardEvents||"false"===o.el.getAttribute(n)||"false"===s?.getAttribute(n)||s instanceof HTMLTextAreaElement)return;const i=["text","email","password","phone","number"];if("Backspace"===t.key){if(i.includes(s?.type||""))return;l=o.i,e.sdk.prev(),e.sdk.clearAllSuggestedButton(l)}else if("Enter"===t.key)!function(t){e.sdk.next(),e.sdk.clearAllSuggestedButton(t)}(o.i);else if("ArrowLeft"===t.key)!function(t){e.sdk.suggestNext(t)}(o.i);else if("ArrowRight"===t.key){if(i.includes(s?.type||""))return;!function(t){e.sdk.suggestPrev(t)}(o.i)}var l}))}const de=e=>`${h(e)}animate.ts -> default: `;function me(e,a){const u=z[e],d=a.currentSlideId,f=a.nextSlideId,g=a.isSubmit;if(a.doNotAnimate)return;if("number"!=typeof d)throw new Error(`${de(u)}options.currentSlideId is not a number!`);if("number"!=typeof f&&!0!==g)throw new Error(`${de(u)}options.nextSlideId or options.isSubmit are not defined!`);if(d===f)return void console.warn(`${de(u)}options.currentSlideId (${d}) and options.nextSlideId (${f}) are equal!`);const p=!0!==g?u.sdk.slideLogic[d]:{el:u.elements.mask},h=!0!==g?u.sdk.slideLogic[f]:{el:u.elements.successMsg},b=!0!==g?u.elements.mask:u.elements.wrapper,v=b.closest(["overflow-wrapper","overflow","overflow-hidden"].map((e=>`[${c}="${e}"]`)).join(", "))||b.closest("section")||u.elements.wrapper,y=p.el.offsetWidth,k=p.el.offsetHeight;h.el.style.display=!0===g?"block":"";const w=h.el.offsetWidth,A=h.el.offsetHeight;h.el.style.display="none";const E=g?h:p,S=`${m}slide-equal-dimensions-multiplier`;let q=y===w&&k===A,R=parseFloat(E.el.getAttribute(S)||u.elements.wrapper.getAttribute(S)||l.toString());R=isNaN(R)?0:R;const T=!0!==g&&d>f,L=`${m}slide-opacity`;let N=parseFloat(E.el.getAttribute(L)||u.elements.wrapper.getAttribute(L)||r.toString());N=isNaN(N)?0:N;let M=parseFloat(h.el.getAttribute(L)||u.elements.wrapper.getAttribute(L)||r.toString());M=isNaN(M)?0:M;const F=`${m}slide-z-index`;let B=parseFloat(h.el.getAttribute(F)||u.elements.wrapper.getAttribute(F));B=isNaN(B)?1:B;const P=`${m}slide-move-current`;let D=parseFloat(E.el.getAttribute(P)||u.elements.wrapper.getAttribute(P)||n.toString());D=isNaN(D)?1:D;const C=`${m}slide-time-sec-current`;let I=parseFloat(E.el.getAttribute(C)||u.elements.wrapper.getAttribute(C)||o.toString());I=isNaN(I)?1:I;const O=`${m}slide-move-next`;let H=parseFloat(E.el.getAttribute(O)||u.elements.wrapper.getAttribute(O)||s.toString());H=isNaN(H)?1:H;const j=`${m}slide-time-sec-next`;let U=parseFloat(E.el.getAttribute(j)||u.elements.wrapper.getAttribute(j)||i.toString());U=isNaN(U)?1:U;const V=`${m}slide-direction`;let W=E.el.getAttribute(V)||u.elements.wrapper.getAttribute(V);const J="off"===W?0:1;W=parseFloat(W),W=isNaN(W)?t:W,W=Math.min(Math.max(W,0),359.9999)-(T?-180:0);const Y=(W-90)*Math.PI/180,Z=y*D*Math.cos(Y)*-1*J,_=k*D*Math.sin(Y)*-1*J,G=w*H*Math.cos(Y)*J,K=A*H*Math.sin(Y)*J;J||(q=!1),u.sdk.animationData={...u.sdk.animationData,currentElement:p.el,nextElement:h.el,parentElement:b,overflowElement:v,direction:W,angle:Y,opacityNext:M,opacityCurrent:N,zIndex:B,xCurrent:Z,yCurrent:_,currentWidth:y,currentHeight:k,moveCurrentMultiplier:D,timeCurrent:I,xNext:G,yNext:K,nextWidth:w,nextHeight:A,moveNextMultiplier:H,timeNext:I,equalDimensions:q,equalDimensionsMulitplier:R,timeBoth:I*(q?R:1)+U};const Q=$(p.el,u,{...a,attributeReferenceElement:p.el}),X=gsap.timeline(),ee=u.view.gsapTimeline;ee.isRunning&&(ee.tl.progress(1),ee.tl.clear()),ee.tl=X,ee.isRunning=!0,X.set(v,{overflow:"hidden"}),X.set(b,{width:y,height:k,position:"relative"}),X.set(p.el,{x:0,y:0,opacity:1,display:"",position:"absolute",left:0,top:0,right:0}),X.set(h.el,{x:G,y:K,opacity:M,zIndex:B,display:!0!==g?"":"block",position:"absolute",left:0,top:0,right:0}),X.to(p.el,{duration:I,x:Z,y:_,opacity:N}),X.to(b,{duration:I,width:Math.max(y,w),height:Math.max(k,A)},"<"),X.to(h.el,{duration:U,x:0,y:0,opacity:1},`<+=${q?I*R:I}`),X.to(b,{duration:U,width:w,height:A},"<"),X.set(p.el,{x:"",y:"",opacity:"",display:"none",position:"",left:"",top:"",right:"",bottom:""}),X.set(h.el,{x:"",y:"",opacity:"",zIndex:"",position:"",left:"",top:"",right:"",bottom:""}),X.set(b,{width:"",height:"",position:""}),X.set(v,{overflow:""}),X.call((()=>{ee.isRunning=void 0})),u.view.progress(a),u.modes.scrollIfTopNotVisible&&Q||setTimeout((()=>{u.sdk.scrollTo({...a,attributeReferenceElement:h.el})}),k<A?1e3*I+1:1e3*u.sdk.animationData.timeBoth+1),u.removeSfActive(d),u.addSfActive(f),x(u.view.eventsFunctionArrays.afterAnimate)}const fe=e=>`${h(e)}animateProgress.ts -> default: `;function ge(e,t){const r=z[e];if(r.elements.progress.bars.length<1&&r.elements.progress.currentSlides.length<1&&r.elements.progress.minMaxSlides.length<1&&r.elements.progress.minSlides.length<1&&r.elements.progress.maxSlides.length<1&&!r.modes.calculateProgress)return;r.model.generateProgressData();const n=r.sdk.pathProgressData,s=r.sdk.animationData;if("object"!=typeof n)throw new Error(`${fe(r)}pathProgressData is not an object!`);let o=[];[r.elements.progress.bars,document.querySelectorAll(`[${c}-${r.sdk.i}="progress-bar"`)].forEach((e=>e.forEach((e=>o.push(e))))),o.forEach((e=>{const t=gsap.timeline(),o=r.view.gsapProgressBarTimeline;o.isRunning&&o.tl.clear(),o.tl=t,o.isRunning=!0;const i=e.getAttribute(`${m}axis`)||"x",l=i.indexOf("x")>-1,a=i.indexOf("y")>-1,c={duration:s.timeBoth,width:l?(!0===r.sdk.isSubmitted?100:n.longest.percentage)+"%":"",height:a?(!0===r.sdk.isSubmitted?100:n.longest.percentage)+"%":""};t.to(e,c),t.call((()=>{o.isRunning=void 0}))})),r.elements.progress.currentSlides.forEach((e=>{e.innerHTML=n.longest.walked})),r.elements.progress.minSlides.forEach((e=>{e.innerHTML=n.shortest.path})),r.elements.progress.maxSlides.forEach((e=>{e.innerHTML=n.longest.path})),r.elements.progress.minMaxSlides.forEach((e=>{const t=n.longest.path>n.shortest.path?n.shortest.path+" - "+n.longest.path:n.longest.path;e.innerHTML=t}))}const pe=e=>`${h(e)}scrollTo.ts -> default`;function he(t,r){const n=z[t];if(!1===r.scrollToTarget||!n.modes.scrollToTarget)return;const s=n.elements.wrapper.closest(["window-scroll"].map((e=>`[${c}="${e}"]`)).join(", ")),o=s||window,i=E(n,r);let l,a=i.target.getBoundingClientRect().top-(s?s.getBoundingClientRect().top:0)+(s?s.scrollTop:window.scrollY)-i.offset;function u(){(s?Math.floor(s.scrollTop)+1>=a&&Math.ceil(s.scrollTop)-1<=a:Math.floor(window.scrollY)+1>=a&&Math.ceil(window.scrollY)-1<=a)&&(o.removeEventListener("scroll",u),clearTimeout(l),setTimeout((()=>{"function"==typeof r.callback&&r.callback(!0)}),1))}a=Math.max(a,0),o.addEventListener("scroll",u),l=setTimeout((function(){o.removeEventListener("scroll",u),"function"==typeof r.callback&&r.callback(!1),console.warn(`${pe(n)} -> setTimeout() callback: Scrolling operation timed out.`,{y:a,target:i.target,offset:i.offset})}),1e3*e),o.scrollTo({top:a,behavior:"smooth"}),n.sdk.animationData.scrollToY=a,n.sdk.animationData.scrollToTarget=i.target,n.sdk.animationData.scrollToOffset=i.offset,n.sdk.animationData.scrollToContainer=o}const be=e=>`${h(e)}required.ts -> default: `;function ve(t,r){const n=z[t],s=n.sdk,o=s.slideRecord,i=s.slideLogic[o[o.length-1]].el;if(r.length<1)return void console.warn(`${be(n)}The supplied data is empty!`);let l=()=>{};if(n.modes.temporaryRequired&&!r[0].el.hasAttribute("required")){function a(e){const t=["required"];"set"===e&&t.push(""),r[0].el[e+"Attribute"](...t)}n.requiredSwapResetTimeout&&(clearTimeout(n.requiredSwapResetTimeout),n.requiredSwapResetTimeoutFunction()),a("set"),l=()=>{a("remove")}}const c=r[0].el.closest(g)||r[0].el,u=$(c,n,{attributeReferenceElement:i},!0);function d(){try{r[0].el.reportValidity(),n.requiredSwapResetTimeoutFunction=l,n.requiredSwapResetTimeout=setTimeout(l,1e3*e)}catch(e){console.warn(`${be(n)}data[0].el.reportValidity() produces unexpected error!`,e)}}function m(e,t){b({el:e,class:"required",mode:t,closest:{parent:g}})}(n.modes.scrollOnRequirementsError&&!u||n.modes.forceScrollOnRequirementsError)&&n.sdk.scrollTo({target:c,attributeReferenceElement:i,callback:e=>{n.modes.nativeReportVadility&&e&&d()}}),n.modes.nativeReportVadility&&u&&!n.modes.forceScrollOnRequirementsError&&d(),setTimeout((()=>{r.forEach((e=>{m(e.el,"add")})),document.body.addEventListener("click",(function(){r.forEach((e=>{m(e.el,"remove")}))}),{once:!0})}),1),x(n.view.eventsFunctionArrays.afterRenderRequirements)}function ye(e){function t(r,n,s=""){[e.elements.wrapper.querySelectorAll(`[${c}="active-${r}"]`),document.querySelectorAll(`[${c}-${e.sdk.i}="active-${r}"]`)].forEach((e=>{e.forEach((e=>{b({el:e,class:s+"active",mode:n})}))}));const o=e.view.sfInactiveArray;"add"===n&&""===s?o.forEach((e=>{e>=r&&t(e,"remove","in")})):""===s&&(o.includes(r)||o.push(r))}e.addSfActive=e=>{t(e,"add")},e.removeSfActive=e=>{t(e,"remove"),t(e,"add","in")},e.addSfActive(0)}function ke(e){Z(e),e.model.generateSlideLogic(),ye(e),e.view.progress=function(t={}){ge(e.sdk.i)},e.view.progress(),e.sdk.scrollTo=function(t={}){he(e.sdk.i,t)};const t=e.view.eventsFunctionArrays;S(e,"Animate"),e.view.animate=function(r={}){x(t.onAnimate),me(e.sdk.i,r)},S(e,"RenderRequirements"),e.view.renderRequirements=function(r=[]){x(t.onRenderRequirements),ve(e.sdk.i,r)},e.sdk.slideLogic.forEach((e=>{e.el.style.display="none"})),e.sdk.slideLogic[0].el.style.display="",ue(e)}function we(){if(void 0!==window[u])return void console.warn(`${u} -> controller.ts -> main: Studio Form is being loaded multiple times. However, the functionality should not be affected.`);const e=[];document.querySelectorAll(`[${c}="wrapper"]`).forEach(((t,r)=>{J(t,r),ke(z[r]),z[r].modes.simpleSdk?e.push(z[r].sdk):e.push(z[r])})),window[u]=e}function Ae(){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",we):we()}"undefined"==typeof gsap?function(e="foo.js",t){new Promise(((t,r)=>{const n=document.createElement("script");document.head.appendChild(n),n.onload=t,n.onerror=r,n.async=!0,n.src=e})).then(t)}("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js",Ae):Ae();})()