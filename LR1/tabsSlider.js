/*! For license information please see tabsSlider.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TabsSlider",[],e):"object"==typeof exports?exports.TabsSlider=e():t.TabsSlider=e()}(self,(function(){return function(){"use strict";var t={d:function(e,s){for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}},e={};return function(){t.d(e,{default:function(){return s}});class s{constructor(t,e){if("string"==typeof t&&(t=document.querySelector(t)),!(t instanceof HTMLElement))throw Error("Check the argument of the selector");this.tabs=t,this.tabs&&!this.tabs.activated&&(this.tabs.activated=!0,this.tabs.setAttribute("data-tabs-active",""),this.settings=Object.assign({animate:!0,slide:0,rtl:!1,draggable:!0,underline:!0,heightAnimate:!0,duration:500,easing:"cubic-bezier(0.0, 0.0, 0.2, 1)"},e),this._init())}_dragEvent(){const t=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch);return{start:t?"touchstart":"mousedown",move:t?"touchmove":"mousemove",end:t?"touchend":"mouseup",leave:"mouseleave"}}_init(){this.tabsBarWrap=this.tabs.querySelector(".tabs__bar-wrap"),this.bar=this.tabs.querySelector(".tabs__bar"),this.content=this.tabs.querySelector(".tabs__content"),this.controls=Array.prototype.slice.call(this.bar.querySelectorAll(".buta")),this.sections=Array.prototype.slice.call(this.content.querySelectorAll(".tabs__section")),this.offset=0,this.currentId=this.settings.slide,this.slidesLen=this.sections.length,this.tabsHasOverflow=!1,this.rtl=this.settings.rtl?1:-1,this.transformProperty="transform",this.transitionProperty="transition",this._dimmensions(),this.settings.underline&&this._setSliderLine(),this.settings.draggable&&(this.dragX,this.dragY,this.delta,this.target,this.dragFlag=!1,this.isMoving=!1,this.preventClick=!1),this._addEvents(),this._checkTabsOverflow(),this.show(this.currentId)}destroy(){this._removeEvents(),this.bar.removeChild(this.line),this.content.classList.remove("has-grab"),this.controls[this.currentId].classList.remove("is-active"),this.tabs.removeAttribute("data-tabs-active"),delete this.tabs.activated,Object.keys(this).forEach((t=>{delete this[t]}))}_addEvents(){this._handlerClick=this._selectTab.bind(this),this._handlerResize=this._responsive.bind(this),this._handlerTabFocus=this._handlerTabFocus.bind(this),this._handleTabOverflow=this._checkTabsOverflow.bind(this),this.bar.addEventListener("click",this._handlerClick),this.bar.addEventListener("scroll",this._handleTabOverflow),this.content.addEventListener("focus",this._handlerTabFocus,!0),window.addEventListener("resize",this._handlerResize),this.settings.draggable&&(this.handlerStart=this._start.bind(this),this.handlerMove=this._move.bind(this),this.handlerEnd=this._end.bind(this),this.handlerLeave=this._leave.bind(this),this.handlerLink=this._click.bind(this),this.dragEvent=this._dragEvent(),this.content.addEventListener(this.dragEvent.start,this.handlerStart,{passive:!1}),this.content.addEventListener(this.dragEvent.move,this.handlerMove,{passive:!1}),this.content.addEventListener(this.dragEvent.end,this.handlerEnd),this.content.addEventListener(this.dragEvent.leave,this.handlerLeave),this.content.addEventListener("click",this.handlerLink))}_removeEvents(){this.bar.removeEventListener("click",this._handlerClick),this.bar.removeEventListener("scroll",this._handleTabOverflow),this.content.removeEventListener("focus",this._handlerTabFocus,!0),window.removeEventListener("resize",this._handlerResize),this.settings.draggable&&(this.content.removeEventListener(this.dragEvent.start,this.handlerStart,{passive:!1}),this.content.removeEventListener(this.dragEvent.move,this.handlerMove,{passive:!1}),this.content.removeEventListener(this.dragEvent.end,this.handlerEnd),this.content.removeEventListener(this.dragEvent.leave,this.handlerLeave),this.content.removeEventListener("click",this.handlerLink))}_handlerTabFocus(t){const e=t.target.closest(".tabs__section");if(!e)return;this.tabs.scrollLeft=0,this.content.scrollTop=0,setTimeout((()=>{this.content.scrollTop=0,this.tabs.scrollLeft=0}),0);const s=this.sections.indexOf(e);this.show(s)}_setSliderLine(){this.line=Object.assign(document.createElement("span"),{className:"tabs__line"}),this.bar.appendChild(this.line),this._moveSliderLine(),this.settings.animate&&(this.line.style[this.transitionProperty]=`\n        ${this.transformProperty} ${this.settings.duration}ms ${this.settings.easing}\n      `)}_scrollLeft(t,e,s){let{to:i=0,duration:n=150}=e;const r=t.scrollLeft;if(r===i)return s&&s();const h=Date.now(),a=()=>{const e=Date.now(),o=Math.min(1,(e-h)/n);if(t.scrollLeft=o*(i-r)+r,o>=1)return s&&s();window.requestAnimationFrame(a)};window.requestAnimationFrame(a)}_moveSliderLine(){const{offsetWidth:t,offsetLeft:e}=this.controls[this.currentId];let s=`translate3d(${e}px, 0, 0)`;this.line.style.transform=`${s} scaleX(${t/this.w})`}_checkTabsOverflow(){this.tabsHasOverflow=this.bar.offsetWidth<this.bar.scrollWidth;const t=this.tabsHasOverflow&&this.bar.scrollWidth>this.bar.scrollLeft+this.bar.offsetWidth,e=this.bar.scrollLeft>0;this.tabsBarWrap.classList.toggle("has-right-overflow",t),this.tabsBarWrap.classList.toggle("has-left-overflow",e)}_observeTabInViewport(){if(!this.tabsHasOverflow)return;const t=this.controls[this.currentId],{offsetWidth:e,offsetLeft:s}=t;let i=this.bar.scrollLeft;s<=this.bar.scrollLeft?i=s:s+e>=this.bar.scrollLeft+this.bar.offsetWidth&&(i=this.bar.scrollLeft+this.bar.offsetWidth-e),this._scrollLeft(this.bar,{to:i},(()=>{this._checkTabsOverflow()}))}_dimmensions(){this.w=this.tabs.offsetWidth;const t=this.sections[this.currentId].offsetHeight;this.sections.forEach((t=>{t.style.width=`${this.w}px`})),this.content.style.width=this.w*this.sections.length+"px",this.content.style.height=`${t}px`}_responsive(){this._dimmensions(),this.offset=this.rtl*(this.w*this.currentId),this._moveSlide(this.offset,!1),this._checkTabsOverflow()}_selectTab(t){const e=t.target.closest(".buta");if(!e)return;t.preventDefault();const s=this.controls.indexOf(e);s!==this.currentId&&this.show(s)}_moveSlide(t,e){if(void 0===e&&(e=!0),this.settings.animate){let t=e?this.settings.duration:0,s=[`${this.transformProperty} ${t}ms ${this.settings.easing}`];this.settings.heightAnimate&&s.push(`height ${t}ms ${this.settings.easing}`),this.content.style[this.transitionProperty]=s.join(",")}this.content.style[this.transformProperty]=`translate3d(${t}px, 0, 0)`;const s=this.sections[this.currentId].offsetHeight;this.content.style.height=`${s}px`,this.settings.underline&&this._moveSliderLine()}_click(t){this.preventClick&&t.preventDefault(),this.preventClick=!1}_start(t){if(this.dragFlag)return;let e;t.targetTouches?(this.target=t.targetTouches[0].target,e=t.targetTouches[0]):(e=t,t.preventDefault()),this.delta=0,this.dragX=e.pageX||e.clientX,this.dragY=e.pageY||e.clientY,this.dragFlag=!0,this.content.classList.add("has-grab")}_move(t){if(!this.dragFlag)return;let e=t;if(t.targetTouches){if(t.targetTouches.length>1||this.target!==t.targetTouches[0].target)return;e=t.targetTouches[0]}else"A"===t.target.nodeName&&(this.preventClick=!0);const s=e.pageX||e.clientX,i=e.pageY||e.clientY;if(this.isMoving||(this.isMoving=Math.abs(this.dragX-s)>=Math.abs(this.dragY-i)),this.isMoving){if(t.preventDefault(),this.delta=(this.dragX-s)/2,!this.settings.animate)return;this._moveSlide(this.offset-this.delta,!1)}}_swipeTo(){return this.settings.rtl?this.delta>0?this.currentId-1:this.currentId+1:this.delta<0?this.currentId-1:this.currentId+1}_end(){if(!this.dragFlag)return;const t=this._swipeTo();if(this.isMoving=!1,this.content.classList.remove("has-grab"),Math.abs(this.delta)<20||t>this.slidesLen-1||t<0)return this.dragFlag=!1,void this._moveSlide(this.offset);this.dragFlag=!1,this.target=null,this.show(t)}_leave(){this.dragFlag&&(this._moveSlide(this.offset),this.dragFlag=!1,this.preventClick=!1,this.content.classList.remove("has-grab"))}recalcStyles(){this._responsive()}show(t){(t=Math.abs(t))>=this.slidesLen&&(t=this.slidesLen-1),this.controls[this.currentId].classList.remove("is-active");const e=this.currentId;this.currentId=t,this.offset=this.rtl*(this.w*this.currentId),this._moveSlide(this.offset),this.controls[this.currentId].classList.add("is-active");const s=new CustomEvent("tabChange",{detail:{currentIndex:this.currentId,prevIndex:e,currentSlide:this.sections[this.currentId],currentTab:this.controls[this.currentId]}});this.tabs.dispatchEvent(s),this._observeTabInViewport()}}}(),e.default}()}));

$('.buta').on('click', function(){
    $('button').removeClass('selected');
    $(this).addClass('selected');
});


$("#buta1").click(function(){

    $('.main').animate({

        height:'1480px',
        duration: 0,

    }, 0);

    $('.maind').animate({

        height:'1480px',
        duration: 0,

    }, 0);
});

$("#buta2").click(function(){

    $('.main').animate({

        height:'2000px',
        duration: 0,

    },0);

    $('.maind').animate({

        height:'2000px',
        duration: 0,

    },0);
});

$("#buta3").click(function(){

    $('.main').animate({

        height:'1200px',
        duration: 0,

    },0);

    $('.maind').animate({

        height:'1200px',
        duration: 0,

    },0);
});
$("#buta4").click(function(){

    $('.main').animate({

        height:'1200px',
        duration: 0,
    },0);

    $('.maind').animate({

        height:'1200px',
        duration: 0,

    },0);
});

$("#buta5").click(function(){

    $('.main').animate({

        height:'1200px',
        duration: 0,

    },0);

    $('.maind').animate({

        height:'1200px',
        duration: 0,

    },0);
});


