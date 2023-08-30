(function(){const e=10,t=90,s=0,o=1,i=1,r=.5,n=.5,a=.5,l=0;function d(e,t){const s=e.sdk.events,o=e.view.eventsFunctionArrays;o[`on${t}`]=[],o[`after${t}`]=[],s[`on${t}`]=function(...e){c(e,o[`on${t}`])},s[`after${t}`]=function(...e){c(e,o[`after${t}`])}}function u(e){e.forEach((e=>e()))}function c(e,t){function s(e){"function"==typeof e&&t.push(e)}e.forEach?e.forEach((e=>s(e))):s(e)}function m(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}const f=function(e,t="standard"){return new Promise((function(s,o){setTimeout((function(){o(new Error(`Request took too long! Timeout after ${e/("quick"===t?10:1)} second`))}),1e3*e/("quick"===t?10:1))}))},p=async function(t,s={},o=e){try{const e=await Promise.race([fetch(t,s),f(o)]),i=await e.json();if(!e.ok)throw new Error(`${i.message} (${e.status})`);return i}catch(e){throw e}};function g(e){if(!m(e.elements.wrapper))throw new Error(`StudioForm[${e.sdk.i}] -> modes.ts -> default: state.elements.wrapper is not an element`);e.modes={};const t=e.modes,s=e.elements.wrapper;t.simpleSdk="true"===(s.getAttribute("data-simple-sdk")||"true"),t.removeVisualDividers="true"===(s.getAttribute("data-remove-visual-diviers")||s.getAttribute("data-remove-diviers")||"true"),t.removeConditionallyInvisibeSlides="true"===(s.getAttribute("data-remove-conditionally-invisible-slides")||"true"),t.isWfForm=s.classList.contains("w-form"),t.isSlider=!t.isWfForm||"true"===(s.getAttribute("data-is-slider-mode")||"false"),t.removeRequiredAttributeFromCheckboxAndRadioOnlys="true"===(s.getAttribute("data-remove-required-attribute-from-checkbox-and-radio-onlys")||"true"),t.swapSubmitButtons="true"===(s.getAttribute("data-swap-submit-buttons")||"true"),t.calculateProgress="true"===(s.getAttribute("data-calculate-progress")||"false"),t.autoRemoveButtonSuggestion="true"===(s.getAttribute("data-auto-remove-button-suggestion")||"true"),t.autoSuggestButtons="true"===(s.getAttribute("data-auto-suggest-buttons")||"true"),t.scrollToActive="true"===(s.getAttribute("data-auto-scroll-to-active")||"true"),t.waitForAnimations="true"===(s.getAttribute("data-wait-for-animations")||"true"),t.hideErrorMessageOnClick="true"===(s.getAttribute("data-hide-error-message-on-click")||"true"),t.scrollOnRequirementsError="true"===(s.getAttribute("data-scroll-on-requirements-error")||"true"),t.forceScrollOnRequirementsError="true"===(s.getAttribute("data-force-scroll-on-requirements-error")||"false"),t.nativeReportVadility="true"===(s.getAttribute("data-native-report-vadility")||"true")}function h(e,t){const s=e.querySelectorAll("input, select, textarea"),o=e.querySelectorAll('[studio-form="next"], .w-button:not([studio-form="Not a Button"], [studio-form="no-button"])'),i=s.length<1;let r=o.length<1,n=!0;r&&s.forEach((e=>{"radio"!==e.getAttribute("type")&&(r=!1)})),n&&s.forEach((e=>{"checkbox"!==e.getAttribute("type")&&(n=!1)}));let a="standard";n&&(a="checkbox"),r&&(a="radio"),i&&(a="empty");const l=e.getAttribute("data-step-type");return l&&""!==l&&(a=l),t.modes.removeRequiredAttributeFromCheckboxAndRadioOnlys&&(r||n)&&s.forEach((e=>e.removeAttribute("required"))),a}function b(e,t,s){const o=t.querySelectorAll("input, select, textarea"),i=t.querySelectorAll('[studio-form="next"], .w-button:not([studio-form="Not a Button"], [studio-form="no-button"])'),r=[];function n(e,t){const s={};s.i=t,s.el=e,s.conditional=e?.getAttribute("data-conditional")||"",s.next="submit"!==e?.getAttribute("studio-form"),r.push(s)}return"radio"===e?(o.forEach(((e,t)=>{n(e.closest('label, [studio-form="label"]'),t)})),r):(i.forEach(((e,t)=>{n(e,t)})),r)}function k(e,t){if(!t.modes.swapSubmitButtons)return;const s=e.querySelectorAll('input[type="submit"]');s.length<1||s.forEach((e=>{const t=e.attributes,s={};for(const e of t)s[e.name]=e.value;const o=document.createElement("a");for(const e in s)o.setAttribute(e,s[e]);o.removeAttribute("type"),o.removeAttribute("value"),o.setAttribute("studio-form","submit"),o.innerHTML=e.getAttribute("value")||"",e.after(o),e.remove()}))}function y(e){const t=A[e],s=[];for(let e=0,o=t.elements.slides.length;e<o;e++){const o=t.elements.slides[e],i={};i.i=e,i.el=o,k(o,t),i.type=h(o,t),i.btns=b(i.type,o),i.conditionalNext="true"===(o.getAttribute("data-conditional-next")||"false"),i.conditional=o.getAttribute("data-conditional")||"",s.push(i)}s.forEach((e=>{if(e.btns.length<1){e.btns=!1;let t=!1;return t=(()=>{for(let t=0,o=s.length;t<o;t++){const o=s[t];if(o.i>e.i&&""===o.conditional&&!1===o.conditionalNext)return o.i}})(),e.i<s.length-1&&!0===s[e.i+1]?.conditionalNext&&(t=e.i+1),e.i>=s.length-1&&(t=!1),void(e.next=t)}e.btns.every((o=>{if(!1===o.next)return!0;if(o.el.setAttribute("studio-form","next"),e.i>=s.length-1)return o.next=!1,o.el.setAttribute("studio-form","submit"),!0;if(""!==o.conditional){let i;if(s.every((e=>o.conditional!==e.conditional||(i=e,!1))),i){let t=i.i;t<=e.i&&(o.conditionalPrev=!0),o.next=t}else console.warn(`StudioForm[${t.sdk.i}] -> slideLogic.ts -> default -> slideLogic.forEach() callback -> slide.btns.every() callback: The partner slide for btns[${o.i}].conditional === '${o.conditional}' (in state.elements.slides[${e.i}]) has not been found.`),o.el.setAttribute("studio-form","submit"),o.next=!1;return!0}return!0===s[e.i+1]?.conditionalNext?(o.next=e.i+1,!0):(o.next=(()=>{for(let t=0,o=s.length;t<o;t++){const o=s[t];if(o.i>e.i&&""===o.conditional&&!1===o.conditionalNext)return o.i}})(),!0)}))})),t.sdk.slideLogic=s}function v(e){const t=A[e];if(t.sdk.slideLogic.length<1||t.sdk.slideRecord.length<1)throw new Error(`StudioForm[${t.sdk.i}] -> calculateProgress.ts -> default: state.sdk.slideLogic.length and/or state.sdk.slideRecord.length can't equal 0`);const s=t.sdk.slideLogic,o=t.sdk.slideRecord,i=o[o.length-1],r=o.length;let n=s.length,a=0,l=0,d=0,u=[];!function e(t){let o=function(e){let t=[];e.btns?e.btns.forEach((e=>{-1!==t.indexOf(e.next)||e.conditionalPrev||t.push(e.next)})):t.push(e.next);return t}(t);l++,d++,[...o].filter((e=>!1!==e)).length>1&&(u.push(d),d=0);let i=!1;!1!==t.btns?t.btns.every((e=>!1!==e.next||(a=Math.max(a,l),n=Math.min(n,l),l=0,u.forEach((e=>{l+=e})),u.pop(),i=!0,!1))):!1===t.next&&(a=Math.max(a,l),n=Math.min(n,l),l=0,u.forEach((e=>{l+=e})),u.pop(),i=!0),i||o.forEach((t=>{!1!==t&&e(s[t])}))}(s[i]),n+=r,a+=r;return{shortest:{percentage:r/n*100,path:n,walked:r},longest:{percentage:r/a*100,path:a,walked:r}}}function w(e,t,s){if(!0===s.doNotCheckSlideRequirements)return!0;const o=A[e],i=o.sdk.slideLogic[t],r=[];if(!0===o.modes.isSlider)return!0;if("empty"===i.type)return!0;if("checkbox"===i.type){const e=i.el.querySelectorAll('input[type="checkbox"]');let t=!1;return e.forEach((e=>{"on"===e.value&&(t=!0)})),o.sdk.slideRequirementsData=r,!!t||(e.forEach((e=>r.push({el:e,msg:"nothing checked",regExp:void 0}))),o.sdk.slideRequirementsData=r,o.view.renderRequirements(r),!1)}if("radio"===i.type){const e=i.el.querySelectorAll('input[type="radio"]');let t=!1;return e.forEach((e=>{e.hasAttribute("data-selected")&&(t=!0)})),o.sdk.slideRequirementsData=r,!!t||(e.forEach((e=>r.push({el:e,msg:"nothing selected",regExp:void 0}))),o.sdk.slideRequirementsData=r,o.view.renderRequirements(r),!1)}if("standard"===i.type){const e=i.el.querySelectorAll('input[type="radio"]'),t=[];return e.forEach((e=>{-1===t.indexOf(e.name)&&t.push(e.name)})),t.forEach((e=>{const t=o.elements.mask.querySelectorAll(`input[type="radio"][name="${e}"]`);let s=!1;t.forEach((e=>{e.hasAttribute("data-selected")&&(s=!0)})),s||t.forEach((e=>r.push({el:e,msg:"nothing selected",regExp:void 0})))})),i.el.querySelectorAll("input, textarea, select").forEach((e=>{if("radio"!==e.type&&e.hasAttribute("required"))if(""!==e.value){if(e.getAttribute("data-reg-exp"))try{const t=new RegExp(e.getAttribute("data-reg-exp")||"");return t.test(e.value)?void 0:void r.push({el:e,msg:"custom regular expression",regExp:t})}catch(t){console.warn(`StudioForm[${o.sdk.i}] -> requirements.ts -> default -> forEach() callback: Unvalid regex test!`,e)}if("email"===e.type){const t=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;if(!t.test(e.value))return void r.push({el:e,msg:"email",regExp:t})}if("tel"===e.type){const t=/^[\d\s\-\+\(\)\.\/*#]+$/;if(!t.test(e.value))return void r.push({el:e,msg:"telephone",regExp:t})}if("number"===e.type){const t=/^-?(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/;if(!t.test(e.value))return void r.push({el:e,msg:"number",regExp:t})}}else r.push({el:e,msg:"empty",regExp:void 0})})),o.sdk.slideRequirementsData=r,!(r.length>0)||(o.view.renderRequirements(r),!1)}return!!i.el.getAttribute("data-requirements","true")}async function S(t){const s=A[t],o=s.elements.mask;let i="POST",r="https://webflow.com/api/v1/form/"+document.querySelector("html")?.getAttribute("data-wf-site");if(!m(o))throw new Error(`StudioForm[${s.sdk.i}] -> post.ts -> default: Couldn't find form!`);const n=[],a=[],l={name:o.getAttribute("data-name"),pageId:document.querySelector("html")?.getAttribute("data-wf-page"),elementId:o.getAttribute("data-wf-element-id"),source:location.href};s.sdk.slideRecord.forEach((e=>{s.sdk.slideLogic[e].el.querySelectorAll("input").forEach((e=>{const t=e.getAttribute("data-name")||e.getAttribute("name")||e.getAttribute("id")||e.getAttribute("class")||e.getAttribute("type")||e.tagName;if("radio"!==e.type||e.hasAttribute("data-selected"))if("file"!==e.type)n.push({key:t,value:e.value});else if(e.files)for(let s=0,o=e.files.length;s<o;s++)a.push({key:`${t}][${s}`,value:e.files[s]})}))}));const d=a.length>0;n.forEach((e=>{l[`fields[${e.key}]`]=e.value})),a.forEach((e=>{l[`files[${e.key}]`]=e.value}));const u=d?new FormData:new URLSearchParams;for(const e in l)u.append(e,l[e]);if(o.getAttribute("action")){i=(o.getAttribute("method")||"").toUpperCase(),r=o.getAttribute("action")||"";const e=(o.getAttribute("data-method")||s.elements.wrapper.getAttribute("data-method")||"").toUpperCase();["GET","PUT","POST","PATCH","DELETE"].includes(e)&&(i=e)}const c={method:i,headers:{Accept:"application/json, text/javascript, */*; q=0.01","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:d?u:u.toString()};let f;d&&delete c.headers;let g="done";try{f=await p(r,c,parseInt(s.elements.wrapper.getAttribute("data-form-submit-timeout-sec")||e.toString()))}catch(e){console.error(`StudioForm[${s.sdk.i}] -> post.ts -> default -> await fetch(): `,e),g="fail",f=e}return s.sdk.data.endpoint=r,s.sdk.data.options=c,s.sdk.data.method=i,s.sdk.data.payload=l,s.sdk.data.response=f,s.sdk.data.status=g,f}const A=[];function E(e,t){const s={elements:{}};s.elements.wrapper=e,s.sdk={},s.sdk.i=t,s.sdk.events={},s.sdk.animationData={},s.sdk.register={},s.sdk.slideRecord=[0],g(s),s.view={},s.view.eventsFunctionArrays={},s.view.gsapTimeline={},s.model={},s.model.generateSlideLogic=function(){y(t)},s.sdk.data={},s.model.post=async function(){return S(t)},s.model.generateProgressData=function(){const e=v(t);s.sdk.pathProgressData=e};const o=s.view.eventsFunctionArrays;d(s,"CheckSlideRequirements"),s.sdk.slideRequirementsData={},s.sdk.slideRequirements=function(e,s={}){u(o.onCheckSlideRequirements);const i=w(t,e,s);return u(o.afterCheckSlideRequirements),i},A.push(s)}function x(e){const t=e.elements,s=e.elements.wrapper;function o(t,...s){return s.map((s=>{const o=`[studio-form="${s}"]`;return t?o+`,[studio-form-${e.sdk.i}="${s}"]`:o})).join(",")}t.mask=s.querySelector(o(!1,"mask"))||s.querySelector("form");const i=t.mask?.querySelectorAll(o(!1,"Visual Divider","visual-divider","divider"));e.modes.removeVisualDividers&&i.forEach((e=>e.remove())),e.modes.removeConditionallyInvisibeSlides&&t.mask?.childNodes.forEach((e=>{e.classList.contains("w-condition-invisible")&&e.remove()})),t.slides=t.mask?.querySelectorAll(o(!1,"slide")),0===t.slides?.length&&(t.slides=t.mask?.childNodes),e.modes.isWfForm&&(t.successMsg=s.querySelector(".w-form-done"),t.errorMsg=s.querySelector(".w-form-fail")),Object.keys(t).every((s=>{if(NodeList.prototype.isPrototypeOf(t[s])||HTMLCollection.prototype.isPrototypeOf(t[s])){if(t[s].length<1)throw new Error(`StudioForm[${e.sdk.i}] -> elements.ts -> default: state.elements.${s}.length is 0`);return!0}if(!m(t[s]))throw new Error(`StudioForm[${e.sdk.i}] -> elements.ts -> default: state.elements.${s} is not an element`);return!0})),t.progress={},t.progress.bars=s.querySelectorAll(o(!0,"progress-bar")),t.progress.currentSlides=s.querySelectorAll(o(!0,"current-slide")),t.progress.minMaxSlides=s.querySelectorAll(o(!0,"min-max-slides")),t.progress.minSlides=s.querySelectorAll(o(!0,"min-slides")),t.progress.maxSlides=s.querySelectorAll(o(!0,"max-slides")),t.prevBtns=[],s.querySelectorAll(o(!0,"prev","Backwards Button")).forEach((e=>t.prevBtns.push(e))),t.nextBtns=[];for(let e=0,o=s.childNodes.length;e<o;e++){const o=s.childNodes[e];o.isEqualNode(t.mask)||["next","Continue Button"].forEach((e=>{o.querySelectorAll(`[studio-form="${e}"]`).forEach((e=>{t.nextBtns.push(e)}))}))}document.querySelectorAll(`[studio-form-${e.sdk.i}="next"`).forEach((e=>t.nextBtns.push(e))),t.responseData=s.querySelectorAll(o(!0,"response-data","response"))}function q(e,t){const s=A[e];let o;const i=s.sdk.slideRecord[s.sdk.slideRecord.length-1];if(!0===s.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===s.view.gsapTimeline.isRunning){const e=`StudioForm[${s.sdk.i}] -> next.ts -> default: The animation is not yet finished!`;return console.warn(e),e}if(!0===s.sdk.isSubmitted){const e=`StudioForm[${s.sdk.i}] -> next.ts -> default: Form already submitted!`;return console.warn(e),e}if(t.btn&&(o=t.btn.next),!t.btn){const e=s.sdk.slideLogic[i];if(!e)throw new Error(`StudioForm[${s.sdk.i}] -> next.ts -> default: Unable to find the current slide!`);if(!1===e.btns)o=e.next;else if(1===e.btns.length)o=e.btns[0].next;else{let t,r=!1;if(e.btns.every((e=>!e.suggested||(o=e.next,r=!0,t=e.i,!1))),r){return e.btns[t].el.click(),{msg:`StudioForm[${s.sdk.i}] -> state.sdk.slideLogic[${e.i}] -> .btns[${t}] was clicked!`,slideId:e.i,buttonId:t}}if(!r)return s.modes.autoSuggestButtons&&s.sdk.suggestButton(i,0),{msg:`StudioForm[${s.sdk.i}] -> state.sdk.slideLogic[${e.i}] -> .btns[0] was suggested!`,slideId:e.i,buttonId:0}}}if("number"!=typeof o&&!1!==o)throw new Error(`StudioForm[${s.sdk.i}] -> next.ts -> default: Unable to find a logical next slide!`);if(!1===o)return void s.sdk.submit(t);if(!s.sdk.slideRequirements(i,t))return;const r=s.sdk.slideRecord.indexOf(o);if(o<i){if(r<0)throw new Error(`StudioForm[${s.sdk.i}] -> next.ts -> default -> if (next < currentSlideId) { ... }: Unable to find a logical next slide!`);s.sdk.slideRecord=s.sdk.slideRecord.slice(0,r+1)}else o!==i&&r<0&&s.sdk.slideRecord.push(o);s.view.animate({...t,currentSlideId:i,nextSlideId:o}),o>i&&s.elements.prevBtns.forEach((e=>{e.classList.remove("sf-hide")}))}function R(e,t){const s=A[e];if(!0===s.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===s.view.gsapTimeline.isRunning){const e=`StudioForm[${s.sdk.i}] -> prev.ts -> default: The animation is not yet finished!`;return console.warn(e),e}if(!0===s.sdk.isSubmitted){const e=`StudioForm[${s.sdk.i}] -> prev.ts -> default: Form already submitted!`;return console.warn(e),e}if(s.sdk.slideRecord.length<=1){s.elements.prevBtns.forEach((e=>{e.classList.add("sf-hide")}));const e=`StudioForm[${s.sdk.i}] -> prev.ts -> default: Can't navigate backwards any further!`;return console.warn(e),e}const o=s.sdk.slideRecord[s.sdk.slideRecord.length-1],i=s.sdk.slideRecord[s.sdk.slideRecord.length-2],r=s.sdk.slideRecord.indexOf(i);s.sdk.slideRecord.pop(),s.view.animate({...t,currentSlideId:o,nextSlideId:i}),0===r&&s.elements.prevBtns.forEach((e=>{e.classList.add("sf-hide")}))}async function F(e,t){const s=A[e],o=s.sdk.slideRecord[s.sdk.slideRecord.length-1];if(!0===s.modes.isSlider){const e=`StudioForm[${s.sdk.i}] -> submit.ts -> default: Slider mode doesn't allow for submission!`;return console.warn(e),e}if(!0===s.modes.waitForAnimations&&!0!==t.doNotWaitForAnimations&&!0===s.view.gsapTimeline.isRunning){const e=`StudioForm[${s.sdk.i}] -> submit.ts -> default: The animation is not yet finished!`;return console.warn(e),e}if(!0===s.sdk.isSubmitted){const e=`StudioForm[${s.sdk.i}] -> submit.ts -> default: Form already submitted!`;return console.warn(e),e}if(!s.sdk.slideRequirements(o,t)&&!t.doNotCheckSlideRequirements)return;s.elements.errorMsg.style.display="",s.sdk.isSubmitted=!0;const i=s.sdk.slideLogic[o].btns;i&&i.forEach((e=>{""!==(e.el.getAttribute("data-wait")||"")&&(e.textDefault||(e.textDefault=e.el.innerText),e.el.innerHTML=e.el.getAttribute("data-wait"))}));const r=await s.model.post();let n;try{n="fail"===s.sdk.data.status?s.sdk.data.response.message:JSON.stringify(r,null,2)}catch(e){const t=`StudioForm[${s.sdk.i}] -> submit.ts -> default: Unable to produce "resVal: string" value!`;console.warn(t,e)}if("string"==typeof n&&s.elements.responseData.forEach((e=>{e.style.whiteSpace="pre-wrap",e.innerHTML=n})),"done"!==s.sdk.data.status&&!0!==t.forceDone){i&&i.forEach((e=>{""!==(e.el.getAttribute("data-wait")||"")&&(e.el.innerHTML=e.textDefault)})),s.elements.errorMsg.style.display="block",s.modes.hideErrorMessageOnClick&&document.body.addEventListener("click",(function(){s.elements.errorMsg.style.display=""}),{once:!0}),s.sdk.isSubmitted=void 0;return`StudioForm[${s.sdk.i}] -> submit.ts -> default: Form submission not successful!`}s.elements.wrapper.childNodes.forEach((e=>{e!==s.elements.mask&&e!==s.elements.errorMsg&&e!==s.elements.successMsg&&e.classList.add("sf-hide")})),s.view.animate({...t,currentSlideId:o,isSubmit:!0});return`StudioForm[${s.sdk.i}] -> submit.ts -> default: Form submission successful!`}function L(e){const t=e.view.eventsFunctionArrays;function s(s,o){u(t.onButtonSuggestionClear);const i=e.sdk.slideLogic[s],r=i.btns[o];if(!i||!r)return void console.warn(`StudioForm[${e.sdk.i}] -> suggestButton.ts -> init -> clear: Unable to find slide and/or button!`);r.suggested=void 0;const n=[],a="LABEL"!==r.el.tagName&&r.el.closest('label, [studio-form="label"]')?r.el.closest('label, [studio-form="label"]'):r.el;n.push(a),a.querySelectorAll("*").forEach((e=>n.push(e))),n.forEach((e=>e.classList.remove("sf-suggested"))),u(t.afterButtonSuggestionClear)}d(e,"ButtonSuggestion"),d(e,"ButtonSuggestionClear"),e.sdk.suggestButton=function(o,i){!function(o,i){u(t.onButtonSuggestion);const r=e.sdk.slideLogic[o],n=r.btns[i];if(!r||!n)throw new Error(`StudioForm[${e.sdk.i}] -> suggestButton.ts -> init -> suggest: Unable to find slide and/or button!`);e.modes.autoRemoveButtonSuggestion&&setTimeout((()=>{document.body.addEventListener("click",(function(){setTimeout((()=>{s(o,i)}),1)}),{once:!0})}),1);n.suggested=!0;const a=[],l="LABEL"!==n.el.tagName&&n.el.closest('label, [studio-form="label"]')?n.el.closest('label, [studio-form="label"]'):n.el;a.push(l),l.querySelectorAll("*").forEach((e=>a.push(e))),a.forEach((e=>e.classList.add("sf-suggested"))),u(t.afterButtonSuggestion)}(o,i)},e.sdk.clearSuggestedButton=function(e,t){s(e,t)}}function $(e){e.sdk.slideLogic.forEach((t=>{t.el.querySelectorAll("input").forEach((t=>{if("checkbox"!==t.type&&"radio"!==t.type)return;const s=t.closest('label, [studio-form="label"]')||t,o=[s];s.querySelectorAll("*").forEach((e=>o.push(e)));let i=t.hasAttribute("checked"),r=!1;"checkbox"===t.type&&(i?o.forEach((e=>e.classList.add("sf-selected"))):t.hasAttribute("required")?t.value="":t.value="off"),s.addEventListener("click",(()=>{if(!r){if(r=!0,setTimeout((()=>{r=!1}),1),"radio"===t.type){const s=e.elements.mask.querySelectorAll(`input[type="radio"][name="${t.name}"]:not([value="${t.value}"])`),i=[];s.forEach((e=>{const s=e.closest('label, [studio-form="label"]')||t;i.push(s),s.querySelectorAll("*").forEach((e=>i.push(e)))})),o.forEach((e=>e.classList.add("sf-selected"))),t.setAttribute("data-selected",""),i.forEach((e=>e.classList.remove("sf-selected"))),s.forEach((e=>e.removeAttribute("data-selected")))}"checkbox"===t.type&&(i?(o.forEach((e=>e.classList.remove("sf-selected"))),t.hasAttribute("required")?t.value="":t.value="off",i=!1):(o.forEach((e=>e.classList.add("sf-selected"))),t.value="on",i=!0))}}))}))}))}function N(e){const t=e.view.eventsFunctionArrays;d(e,"Next"),d(e,"Prev"),d(e,"Submit"),e.sdk.next=(s={})=>{u(t.onNext);const o=q(e.sdk.i,s);return u(t.afterNext),o},e.sdk.prev=(s={})=>{u(t.onPrev);const o=R(e.sdk.i,s);return u(t.afterPrev),o},e.sdk.submit=async(s={})=>{u(t.onSubmit);const o=await F(e.sdk.i,s);return u(t.afterSubmit),o},$(e),L(e),e.sdk.slideLogic.forEach((t=>{t.btns&&t.btns.forEach((t=>t.el.addEventListener("click",(()=>{e.sdk.next({btn:t})}))))})),e.elements.nextBtns.forEach((t=>t.addEventListener("click",(()=>{e.sdk.next()})))),e.elements.prevBtns.forEach((t=>{t.classList.add("sf-hide"),t.addEventListener("click",(()=>{e.sdk.prev()}))}))}function T(e,l){const d=A[e],u=l.currentSlideId,c=l.nextSlideId,m=l.isSubmit;if(l.doNotAnimate)return;if("number"!=typeof u)throw new Error(`StudioForm[${d.sdk.i}] -> animate.ts -> default: options.currentSlideId is not a number!`);if("number"!=typeof c&&!0!==m)throw new Error(`StudioForm[${d.sdk.i}] -> animate.ts -> default: options.nextSlideId or options.isSubmit are not defined!`);if(u===c)return void console.warn(`StudioForm[${d.sdk.i}] -> animate.ts -> default: options.currentSlideId (${u}) and options.nextSlideId (${c}) are equal!`);const f=!0!==m?d.sdk.slideLogic[u]:{el:d.elements.mask},p=!0!==m?d.sdk.slideLogic[c]:{el:d.elements.successMsg},g=!0!==m?d.elements.mask:d.elements.wrapper,h=g.closest('[studio-form="overflow-wrapper"]')||g.closest("section")||d.elements.wrapper,b=f.el.offsetWidth,k=f.el.offsetHeight;p.el.style.display=!0===m?"block":"";const y=p.el.offsetWidth,v=p.el.offsetHeight;p.el.style.display="none";const w=b===y&&k===v;let S=parseFloat(f.el.getAttribute("data-slide-equal-dimensions-multiplier")||d.elements.wrapper.getAttribute("data-slide-equal-dimensions-multiplier")||a.toString());S=isNaN(S)?0:S;const E=!0!==m&&u>c;let x=parseFloat(f.el.getAttribute("data-slide-opacity")||d.elements.wrapper.getAttribute("data-slide-opacity")||s.toString());x=isNaN(x)?0:x;let q=parseFloat(p.el.getAttribute("data-slide-opacity")||d.elements.wrapper.getAttribute("data-slide-opacity")||s.toString());q=isNaN(q)?0:q;let R=parseFloat(p.el.getAttribute("data-slide-z-index")||d.elements.wrapper.getAttribute("data-slide-z-index"));R=isNaN(R)?1:R;let F=parseFloat(f.el.getAttribute("data-slide-move-current")||d.elements.wrapper.getAttribute("data-slide-move-current")||o.toString());F=isNaN(F)?1:F;let L=parseFloat(f.el.getAttribute("data-slide-time-sec-current")||d.elements.wrapper.getAttribute("data-slide-time-sec-current")||r.toString());L=isNaN(L)?1:L;let $=parseFloat(f.el.getAttribute("data-slide-move-next")||d.elements.wrapper.getAttribute("data-slide-move-next")||i.toString());$=isNaN($)?1:$;let N=parseFloat(f.el.getAttribute("data-slide-time-sec-next")||d.elements.wrapper.getAttribute("data-slide-time-sec-next")||n.toString());N=isNaN(N)?1:N;let T=parseFloat(f.el.getAttribute("data-slide-direction")||d.elements.wrapper.getAttribute("data-slide-direction"));T=isNaN(T)?t:T,T=Math.min(Math.max(T,0),359.9999)-(E?-180:0);const M=(T-90)*Math.PI/180,B=b*F*Math.cos(M)*-1,D=k*F*Math.sin(M)*-1,C=y*$*Math.cos(M),I=v*$*Math.sin(M);d.sdk.animationData={...d.sdk.animationData,currentElement:f.el,nextElement:p.el,parentElement:g,overflowElement:h,direction:T,angle:M,opacityNext:q,opacityCurrent:x,zIndex:R,xCurrent:B,yCurrent:D,currentWidth:b,currentHeight:k,moveCurrentMultiplier:F,timeCurrent:L,xNext:C,yNext:I,nextWidth:y,nextHeight:v,moveNextMultiplier:$,timeNext:L,equalDimensions:w,equalDimensionsMulitplier:S,timeBoth:L*(w?S:1)+N};const P=gsap.timeline(),O=d.view.gsapTimeline;O.isRunning&&(O.tl.progress(),O.tl.clear()),O.tl=P,O.isRunning=!0,P.set(h,{overflow:"hidden"}),P.set(g,{width:b,height:k,position:"relative"}),P.set(f.el,{x:0,y:0,opacity:1,display:"",position:"absolute",left:0,top:0,right:0}),P.set(p.el,{x:C,y:I,opacity:q,zIndex:R,display:!0!==m?"":"block",position:"absolute",left:0,top:0,right:0}),P.to(f.el,{duration:L,x:B,y:D,opacity:x}),P.to(g,{duration:L,width:Math.max(b,y),height:Math.max(k,v)},"<"),P.to(p.el,{duration:N,x:0,y:0,opacity:1},`<+=${w?L*S:L}`),P.to(g,{duration:N,width:y,height:v},"<"),P.set(f.el,{x:"",y:"",opacity:"",display:"none",position:"",left:"",top:"",right:"",bottom:""}),P.set(p.el,{x:"",y:"",opacity:"",zIndex:"",position:"",left:"",top:"",right:"",bottom:""}),P.set(g,{width:"",height:"",position:""}),P.set(h,{overflow:""}),P.call((()=>{O.isRunning=void 0})),d.view.progress(l),d.sdk.scrollTo({...l,attributeReferenceElement:p.el})}function M(e,t){const s=A[e];if(s.elements.progress.bars.length<1&&s.elements.progress.currentSlides.length<1&&s.elements.progress.minMaxSlides.length<1&&s.elements.progress.minSlides.length<1&&s.elements.progress.maxSlides.length<1&&!s.modes.calculateProgress)return;s.model.generateProgressData();const o=s.sdk.pathProgressData,i=s.sdk.animationData;if("object"!=typeof o)throw new Error(`StudioForm[${s.sdk.i}] -> animateProgress.ts -> default: pathProgressData is not an object!`);let r=[];[s.elements.progress.bars,document.querySelectorAll(`[studio-form-${s.sdk.i}="progress-bar"`)].forEach((e=>e.forEach((e=>r.push(e))))),r.forEach((e=>{const t=e.getAttribute("data-axis")||"x",r=t.indexOf("x")>-1,n=t.indexOf("y")>-1,a={duration:i.timeBoth,width:r?(!0===s.sdk.isSubmitted?100:o.longest.percentage)+"%":"",height:n?(!0===s.sdk.isSubmitted?100:o.longest.percentage)+"%":""};gsap.to(e,a)})),s.elements.progress.currentSlides.forEach((e=>{e.innerHTML=o.longest.walked})),s.elements.progress.minSlides.forEach((e=>{e.innerHTML=o.shortest.path})),s.elements.progress.maxSlides.forEach((e=>{e.innerHTML=o.longest.path})),s.elements.progress.minMaxSlides.forEach((e=>{const t=o.longest.path>o.shortest.path?o.shortest.path+" - "+o.longest.path:o.longest.path;e.innerHTML=t}))}function B(t,s){const o=A[t];if(!0!==s.scrollToActive&&!o.modes.scrollToActive)return;const i="string"==typeof s.target?s.target:s.attributeReferenceElement?.getAttribute("data-scroll-to-target")||o.elements.wrapper?.getAttribute("data-scroll-to-target")||"",r="string"==typeof s.offset?s.offset:s.attributeReferenceElement?.getAttribute("data-scroll-to-offset")||o.elements.wrapper?.getAttribute("data-scroll-to-offset")||"",n=m(s.target)?s.target:""!==i&&document.querySelector(i)||o.elements.wrapper;let a=m(s.offset)?s.target:""!==r?document.querySelector("string"==typeof s.offset?s.offset:r):null;a="number"==typeof s.offset?s.offset:a?.offsetHeight||l;let d,u=n.getBoundingClientRect().top+window.scrollY-a;function c(){Math.round(window.scrollY)===Math.round(u)&&(window.removeEventListener("scroll",c),clearTimeout(d),"function"==typeof s.callback&&s.callback(!0))}u=Math.max(u,0),window.scrollTo({top:u,behavior:"smooth"}),window.addEventListener("scroll",c),d=setTimeout((function(){window.removeEventListener("scroll",c),"function"==typeof s.callback&&s.callback(!1),console.warn(`StudioForm[${o.sdk.i}] -> anchor.ts -> default -> setTimeout() callback: Scrolling operation timed out.`)}),1e3*e),o.sdk.animationData.scrollToY=u,o.sdk.animationData.scrollToTarget=n,o.sdk.animationData.scrollToOffset=a}function D(e,t){const s=A[e];if(t.length<1)return void console.warn(`StudioForm[${s.sdk.i}] -> required.ts -> default: The supplied data is empty!`);const o=t[0].el.closest('label, [studio-form="label"]')||t[0].el,i=o.getBoundingClientRect(),r=window.innerHeight||document.documentElement.clientHeight,n=window.innerWidth||document.documentElement.clientWidth,a=i.top>=0&&i.bottom<=r&&i.left>=0&&i.right<=n;function l(){try{s.elements.mask.reportValidity()}catch(e){console.warn(`StudioForm[${s.sdk.i}] -> required.ts -> default: state.elements.mask.reportValidity() produces unexpected error!`,e)}}(s.modes.scrollOnRequirementsError&&!a||s.modes.forceScrollOnRequirementsError)&&s.sdk.scrollTo({target:o,attributeReferenceElement:s.sdk.slideLogic[s.sdk.slideLogic.length-1].el,callback:e=>{s.modes.nativeReportVadility&&e&&l()}}),s.modes.nativeReportVadility&&a&&!s.modes.forceScrollOnRequirementsError&&l(),setTimeout((()=>{t.forEach((e=>{const t=e.el.closest('label, [studio-form="label"]')||e.el,s=[t];t.querySelectorAll("*").forEach((e=>s.push(e))),s.forEach((e=>e.classList.add("sf-required")))})),document.body.addEventListener("click",(function(){t.forEach((e=>{const t=e.el.closest('label, [studio-form="label"]')||e.el,s=[t];t.querySelectorAll("*").forEach((e=>s.push(e))),s.forEach((e=>e.classList.remove("sf-required")))}))}),{once:!0})}),1)}function C(e){x(e),e.model.generateSlideLogic(),e.view.progress=function(t={}){M(e.sdk.i)},e.view.progress(),e.sdk.scrollTo=function(t={}){B(e.sdk.i,t)};const t=e.view.eventsFunctionArrays;d(e,"Animate"),e.view.animate=function(s={}){u(t.onAnimate),T(e.sdk.i,s),u(t.afterAnimate)},d(e,"RenderRequirements"),e.view.renderRequirements=function(s=[]){u(t.onRenderRequirements),D(e.sdk.i,s),u(t.afterRenderRequirements)},e.sdk.slideLogic.forEach((e=>{e.el.style.display="none"})),e.sdk.slideLogic[0].el.style.display="",N(e)}function I(){if(void 0!==window.StudioForm)return void console.warn("StudioForm -> controller.ts -> main: Studio Form is being loaded multiple times. However, the functionality should not be affected.");const e=[];document.querySelectorAll('[studio-form="wrapper"]').forEach(((t,s)=>{E(t,s),C(A[s]),A[s].modes.simpleSdk?e.push(A[s].sdk):e.push(A[s])})),window.StudioForm=e}function P(){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",I):I()}"undefined"==typeof gsap?function(e="foo.js",t){new Promise(((t,s)=>{const o=document.createElement("script");document.head.appendChild(o),o.onload=t,o.onerror=s,o.async=!0,o.src=e})).then(t)}("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js",P):P();})()