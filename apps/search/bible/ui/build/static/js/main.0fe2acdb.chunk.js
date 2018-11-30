(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){e.exports=a(143)},110:function(e,t,a){},112:function(e,t,a){},143:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(23),c=a(34),s=a.n(c),l=(a(110),a(42)),i=a(43),u=a(52),p=a(44),h=a(54),m=(a(112),function(e){var t=e.number,a=e.text;return r.a.createElement("div",{className:"verse"},r.a.createElement("span",{className:"verse-number",style:{marginRight:"2px"}},t,"."),r.a.createElement("span",{className:"verse-text",dangerouslySetInnerHTML:function(e){return{__html:e}}(a)}))}),d=a(79),v={data:[],count:null};function b(e){return{type:"GET_VERSES",payload:{request:{url:"/verses/",params:{book_title:e,chapter_number:arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,search:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,page:arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,page_size:100}}}}}var f=a(20),E=a(147);var g=function(e){function t(e){var a;return Object(l.a)(this,t),a=Object(u.a)(this,Object(p.a)(t).call(this,e)),window.onscroll=function(){var e=document.body.scrollTop||document.documentElement.scrollTop;window.innerHeight+e===document.documentElement.offsetHeight&&a.loadData()},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"loadData",value:function(){var e=this.props,t=e.dispatch,a=e.filters,n=e.page;e.hasMore&&t(b(a.book,a.chapter,a.search,n?n+1:n))}},{key:"render",value:function(){return r.a.createElement("div",{className:"verses-wrapper"},this.props.verses.map(function(e,t,a){return r.a.createElement("div",{key:t},function(e,t,a){var n=a[t-1];return!!Object(f.isUndefined)(n)||n.book_title!==e.book_title}(e,t,a)&&r.a.createElement("h2",null,e.book_title),function(e,t,a){var n=a[t-1];return!!Object(f.isUndefined)(n)||n.chapter_number!==e.chapter_number}(e,t,a)&&r.a.createElement("h3",null,e.chapter_number),r.a.createElement(m,{key:t,number:e.number,text:e.text_highlight?e.text_highlight:e.text}))}),!this.props.verses.length&&r.a.createElement("h4",{className:"no-results"},"No results..."))}}]),t}(n.Component);var O=Object(o.b)(function(e){var t=Object(E.a)("filters");return{verses:e.verses.data,page:e.verses.page,hasMore:e.verses.hasMore,filters:t(e,"book","chapter","search")}})(g),y=a(145),j=a(144),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handleKeyPress=function(e){"Enter"===e.key&&a.search()},a.search=function(){(0,a.props.onSearch)(a.textInput.current.value)},a.textInput=r.a.createRef(),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"input-group"},r.a.createElement("input",Object.assign({type:"text",onKeyPress:this.handleKeyPress,className:"form-control",placeholder:"Search...",style:{height:"38px"},ref:this.textInput},this.props.input)),r.a.createElement("span",{className:"input-group-btn"},r.a.createElement("button",{onClick:this.search,className:"btn btn-default",style:{height:"38px"},type:"button"},"Go!")))}}]),t}(n.Component),w=a(60),x=a(101),S=function(e){var t=e.options,a=e.value,n=e.placeholder,o=e.input.onChange;return r.a.createElement(x.a,{isClearable:!0,options:t,value:a,placeholder:n,onChange:function(e){return o(e?e.value:null)}})},_=function(e){var t=e.handleSubmit,a=e.book,n=e.chapter,o=e.dispatch;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-2",style:{margin:"5px"}},r.a.createElement(y.a,{name:"book",component:S,placeholder:"Book",options:a.options,value:a.value})),r.a.createElement("div",{className:"col-sm-2",style:{margin:"5px"}},r.a.createElement(y.a,{name:"chapter",component:S,placeholder:"Chapter",isClearable:!0,options:n.options,value:n.value})),r.a.createElement("div",{className:"col-sm-3",style:{margin:"5px"}},r.a.createElement(y.a,{name:"search",component:k,onSearch:function(e){return o({type:"VERSE_SEARCH",payload:e})}}))))};_=Object(j.a)({form:"filters"})(_);var N=Object(w.a)(function(e){var t=Object(f.values)(e.books.data).map(function(e){return{value:e.title,label:e.title}}),a=Object(f.values)(e.chapters.data).map(function(e){return{value:e.number,label:e.number}}),n=Object(E.a)("filters")(e,"book","chapter");if(Object(f.isEmpty)(n))return{book:{value:null,options:t},chapter:{value:null,options:[]}};var r=n.book;return{book:{value:r,options:t},chapter:{value:n.chapter,options:r?a:[]}}})(_),C=function(){return r.a.createElement("div",null,r.a.createElement(N,null),r.a.createElement(O,null))},T={data:[],count:null};var R=function(e){return e.show?r.a.createElement("div",{className:"spinner"},r.a.createElement("svg",{width:"30px",height:"30px",viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("circle",{fill:"none",strokeWidth:"5",strokeLinecap:"round",cx:"33",cy:"33",r:"30",className:"circle"}))):null},L=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;setTimeout(function(){return document.getElementById("loader").style.display="none"},250),e({type:"GET_BOOKS",payload:{request:{url:"/books/",params:{page_size:1e3}}}}),e(b())}},{key:"render",value:function(){return r.a.createElement("div",{id:"page-wrapper"},r.a.createElement("div",{className:"row page-header-row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("h2",{className:"page-header"},"Bible"),r.a.createElement(R,{show:this.props.isLoading}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{id:"content-wrapper"},r.a.createElement("div",{className:"App"},r.a.createElement(C,null)))))}}]),t}(n.Component);var B=Object(o.b)(function(e){return{isLoading:e.api.isLoading}})(L);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=a(14),H=a.n(G),A=a(8),I=a(99),M=a(16),U=a(97),K=a.n(U),P=a(98),V=a.n(P),q=a(146),z={data:[],count:null};var D={isLoading:!1,isVisible:!1};var W=H.a.mark(X),J=H.a.mark(Y),$=H.a.mark(Z),F=H.a.mark(ee),Q=H.a.mark(te);function X(){return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.d)("VERSE_SEARCH",ee);case 2:return e.next=4,Object(M.d)("@@redux-form/CHANGE",te);case 4:case"end":return e.stop()}},W,this)}function Y(e){var t,a;return H.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t=e.book,a=e.search,!t){n.next=4;break}return n.next=4,Object(M.b)({type:"GET_CHAPTERS",payload:{request:{url:"/chapters/",params:{book_title:t,page_size:1e3}}}});case 4:return n.next=6,Object(M.b)(b(t,null,a));case 6:case"end":return n.stop()}},J,this)}function Z(e){var t,a,n;return H.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.book,a=e.chapter,n=e.search,r.next=3,Object(M.b)(b(t,a,n));case 3:case"end":return r.stop()}},$,this)}function ee(){var e,t,a,n,r;return H.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return e=Object(E.a)("filters"),o.next=3,Object(M.c)(function(t){return e(t,"book","chapter","search")});case 3:return t=o.sent,a=t.book,n=t.chapter,r=t.search,o.next=7,Object(M.b)(b(a,n,r));case 7:case"end":return o.stop()}},F,this)}function te(e){var t;return H.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(M.c)(function(e){return e.form.filters.values});case 2:t=a.sent,a.t0=e.meta.field,a.next="book"===a.t0?6:"chapter"===a.t0?9:12;break;case 6:return a.next=8,Y(t);case 8:return a.abrupt("break",13);case 9:return a.next=11,Z(t);case 11:case 12:return a.abrupt("break",13);case 13:case"end":return a.stop()}},Q,this)}var ae=H.a.mark(ne);function ne(){return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.a)([X()]);case 2:case"end":return e.stop()}},ae,this)}var re=Object(A.c)({books:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_BOOKS_SUCCESS":return{data:t.payload.data.results,count:t.payload.data.count};default:return e}},chapters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_CHAPTERS_SUCCESS":return{data:t.payload.data.results,count:t.payload.data.count};default:return e}},verses:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_VERSES_SUCCESS":var a=t.payload.data;return{data:function(e){return 1===e.page}(a)?a.results:Object(d.a)(e.data).concat(Object(d.a)(a.results)),count:a.count,page:a.page,hasMore:a.has_more};default:return e}},api:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(f.has)(t.payload,"request")?Object(f.has)(t.payload,"status")?{isLoading:!1}:{isLoading:!0}:Object(f.has)(t,"error")?{isLoading:!1}:e},form:q.a}),oe=K.a.create({baseURL:"/api",responseType:"json"});var ce=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object(I.a)(),n=Object(A.d)(re,t,Object(A.a)(V()(oe),a));return a.run(ne),n}({});ce.subscribe(function(){console.log(ce.getState())}),s.a.render(r.a.createElement(o.a,{store:ce},r.a.createElement(B,{store:ce})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[102,2,1]]]);
//# sourceMappingURL=main.0fe2acdb.chunk.js.map