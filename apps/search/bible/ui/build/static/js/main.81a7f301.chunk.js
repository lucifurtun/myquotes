(this.webpackJsonpsearch=this.webpackJsonpsearch||[]).push([[0],{121:function(e,t,a){e.exports=a(206)},130:function(e,t,a){},131:function(e,t,a){},206:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(14),o=a(62),c=a(105),l=a(18),i=a.n(l),p=(a(130),a(131),a(24)),u=a(5),d=a(8),h=a.n(d),b=a(6),E=a(7);const m={data:[],count:null};function v(e){return{type:"GET_CHAPTERS",payload:{request:{url:"/chapters/",params:{book_number:e,page_size:1e3}}}}}const O={data:[],errors:[],count:null,page:null,hasMore:null,selected:null,scrolledTo:null};function f(e,t=null,a=null,r=null){return{type:"GET_VERSES",payload:{request:{url:"/verses/",params:{book_number:e,chapter_number:t,search:a,page:r,page_size:100}}}}}var y=h.a.mark(T),S=h.a.mark(R),j=h.a.mark(N),g=h.a.mark(w),_=h.a.mark(C),x=h.a.mark(I);const k={book:null,chapter:null,search:null,snapshot:{book:null,chapter:null,search:null}};function T(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.f)("VERSE_SEARCH",w);case 2:return e.next=4,Object(E.f)("FORM_CHANGE",C);case 4:return e.next=6,Object(E.f)("SET_FILTERS",I);case 6:case"end":return e.stop()}}),y)}function R({book:e,search:t}){return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!e){a.next=5;break}return a.next=3,Object(E.c)(v(e));case 3:a.next=7;break;case 5:return a.next=7,Object(E.c)(V("chapter",null));case 7:return a.next=9,Object(E.c)(f(e,null,t));case 9:return a.next=11,Object(E.e)("GET_VERSES_SUCCESS");case 11:return a.next=13,Object(E.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:e,chapter:null,search:t}});case 13:case"end":return a.stop()}}),S)}function N({book:e,chapter:t,search:a}){return h.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(E.c)(f(e,t,a));case 2:return r.next=4,Object(E.e)("GET_VERSES_SUCCESS");case 4:return r.next=6,Object(E.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:e,chapter:t,search:a}});case 6:case"end":return r.stop()}}),j)}function w(){var e,t,a,r;return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(E.d)(e=>e.filters);case 2:return e=n.sent,t=e.book,a=e.chapter,r=e.search,n.next=6,Object(E.c)(f(t,a,r,null));case 6:return n.next=8,Object(E.e)(["GET_VERSES_SUCCESS","GET_VERSES_FAIL"]);case 8:return n.next=10,Object(E.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:t,chapter:a,search:r}});case 10:case"end":return n.stop()}}),g)}function C(e){var t;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(E.d)(e=>e.filters);case 2:t=a.sent,a.t0=e.payload.field,a.next="book"===a.t0?6:"chapter"===a.t0?9:12;break;case 6:return a.next=8,R(t);case 8:return a.abrupt("break",13);case 9:return a.next=11,N(t);case 11:case 12:return a.abrupt("break",13);case 13:case"end":return a.stop()}}),_)}function I({payload:e}){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N(e);case 2:if(!e.book){t.next=5;break}return t.next=5,Object(E.c)(v(e.book));case 5:case"end":return t.stop()}}),x)}const V=(e,t)=>({type:"FORM_CHANGE",payload:{field:e,value:t}});class L extends r.Component{constructor(e){super(e),this.handleKeyPress=e=>{"Enter"===e.key&&this.search()},this.search=()=>{(0,this.props.onSearch)(this.textInput.current.value)},this.textInput=n.a.createRef()}render(){return n.a.createElement("div",{className:"input-group"},n.a.createElement("input",{value:this.props.value,type:"text",onKeyPress:this.handleKeyPress,className:"form-control",placeholder:"Search...",style:{height:"38px"},ref:this.textInput,onChange:()=>this.props.dispatch(V("search",this.textInput.current.value||null))}),n.a.createElement("span",{className:"input-group-btn"},n.a.createElement("button",{onClick:this.search,className:"btn btn-default",style:{height:"38px"},type:"button"},"Go!")))}}var D=Object(s.b)((function(e){return{value:e.filters.search||""}}))(L),H=a(106);var M=Object(s.b)()(({name:e,options:t,placeholder:a,value:r,dispatch:s})=>{let o=null;return o=Object(u.isObject)(r)?r||null:r?{value:r,label:r}:null,n.a.createElement(H.a,{styles:{clearIndicator:(e,t)=>Object(b.a)(Object(b.a)({},e),{},{paddingLeft:"0",paddingRight:"0"}),dropdownIndicator:(e,t)=>Object(b.a)(Object(b.a)({},e),{},{paddingLeft:"0",paddingRight:"0"})},isClearable:!0,options:t,value:o,placeholder:a,onChange:t=>s(V(e,t?t.value:null))})});var G=Object(p.a)((function(e,t){const a=Object(u.values)(e.books.data).map(e=>({value:e.number,label:e.title})),r=Object(u.values)(e.chapters.data).map(e=>({value:e.number,label:e.number})),n=e.filters.book?{value:e.filters.book,label:e.books.data[e.filters.book].title}:null;return{books:a,book:n,chapters:n?r:[],chapter:e.filters.chapter}}))(e=>{const t=e.books,a=e.book,r=e.chapters,s=e.chapter,o=e.dispatch;return n.a.createElement("div",null,n.a.createElement("div",{className:"filters-form"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-5 filter-item"},n.a.createElement(M,{name:"book",placeholder:"Book",options:t,value:a})),n.a.createElement("div",{className:"col-sm-3 filter-item"},n.a.createElement(M,{name:"chapter",placeholder:"Chapter",options:r,value:s})),n.a.createElement("div",{className:"col-sm-4 filter-item"},n.a.createElement(D,{onSearch:e=>o({type:"VERSE_SEARCH",payload:e})})))))});let A={};const P=e=>({__html:e});var U=Object(s.b)()(({item:e,isSelected:t,dispatch:a})=>{const r=e.text_highlight?e.text_highlight:e.text;return n.a.createElement("div",{onClick:t=>((e,t,a)=>{e.preventDefault(),a({type:"SET_SELECTED_VERSE",payload:t.identifier})})(t,e,a),onContextMenu:t=>((e,t,a)=>{e.preventDefault();const r={x:e.pageX,y:e.pageY,verse:t};A.root.dispatch({type:"SHOW_VERSE_OPTIONS",payload:r}),a({type:"SET_SELECTED_VERSE",payload:t.identifier})})(t,e,a),tabIndex:0,className:"verse"+(t?" selected":"")},n.a.createElement("span",{className:"verse-number",style:{marginRight:"2px"}},e.number,"."),n.a.createElement("span",{className:"verse-text",dangerouslySetInnerHTML:P(r)}))});class F extends r.Component{constructor(e){super(e),this.handleScroll=e=>{let t,a;if(this.props.verseOptionsDisplayed&&A.root.dispatch({type:"HIDE_VERSE_OPTIONS"}),!0===this.props.isMobile){let e=document.body.scrollTop||document.documentElement.scrollTop;a=window.innerHeight+e,t=document.documentElement.offsetHeight}else{let e=this.verseWrapper.current,r=e.scrollTop;a=e.offsetHeight+r,t=e.scrollHeight}a>=t-550&&(this.state.isLoading||this.loadData())},this.state={isLoading:!1},this.verseWrapper=n.a.createRef(),this.verseElements={}}componentDidMount(){window.onscroll=()=>{this.handleScroll()}}loadData(){const e=this.props,t=e.dispatch,a=e.filters,r=e.page;e.hasMore&&(this.setState({isLoading:!0}),t(f(a.book,a.chapter,a.search,r?r+1:r)))}static getDerivedStateFromProps(e,t){return e.isLoading!==t.isLoading&&!1===e.isLoading?{isLoading:!1}:null}componentDidUpdate(e){this.props.scrolledTo&&this.props.scrolledTo!==e.scrolledTo&&this.verseWrapper.current.scrollTo(0,this.verseElements[this.props.scrolledTo].offsetTop)}render(){const e=this.props,t=e.filtersSnapshot,a=e.books,r=t.book?n.a.createElement("span",null," in ",n.a.createElement("i",null,a[t.book].title)):"",s=t.chapter?n.a.createElement("i",null," ",t.chapter):"",o=t.search?n.a.createElement("span",null,'for "',t.search,'"'):"",c=n.a.createElement("span",null,o,r,s),l=n.a.createElement("span",null,"No results ",c);return n.a.createElement("div",{ref:this.verseWrapper,className:"verses-wrapper",onScroll:this.handleScroll},this.props.verses.map((e,t,a)=>{const r=e.identifier===this.props.selected;return n.a.createElement("div",{ref:t=>this.verseElements[e.identifier]=t,key:t},function(e,t,a){const r=a[t-1];return!!Object(u.isUndefined)(r)||r.book_number!==e.book_number}(e,t,a)&&n.a.createElement("h2",{className:"verse-book"},e.book_title),function(e,t,a){const r=a[t-1];return!!Object(u.isUndefined)(r)||r.chapter_number!==e.chapter_number}(e,t,a)&&n.a.createElement("h3",{className:"verse-chapter"},e.chapter_number),n.a.createElement(U,{item:e,isSelected:r}))}),this.props.errors&&n.a.createElement("h4",{className:"no-results"},this.props.errors),!this.props.verses.length&&!this.props.errors.length&&n.a.createElement("h4",{className:"no-results"},l,"."))}}var B=Object(s.b)((function(e){return{errors:Object(u.values)(e.verses.errors),verses:Object(u.values)(e.verses.data),books:e.books.data,page:e.verses.page,hasMore:e.verses.hasMore,selected:e.verses.selected,scrolledTo:e.verses.scrolledTo,isLoading:e.api.isLoading,filters:e.filters,filtersSnapshot:e.filters.snapshot}}))(F),K=a(43),W=a(15),q=a(77),z=a(110),J=a.n(z);const Y={data:[],count:null};var X=a(63),$=a(47);const Q={vdcc:{short:"VDCC",long:"Versiunea Dumitru Cornilescu Corectat\u0103"},ntr:{short:"NTR",long:"Noua Traducere Rom\xe2neasc\u0103"},esv:{short:"ESV",long:"English Standard Version"},kjv:{short:"KJV",long:"King James Version"}};function Z(e,t){let a,r,n=[];const s=Object(u.keys)(e);var o,c=Object($.a)(s);try{for(c.s();!(o=c.n()).done;){let e=o.value;var l=Object(u.split)(e,"__"),i=Object(X.a)(l,2);a=i[0],r=i[1],a===t&&n.push(Object(u.toInteger)(r))}}catch(h){c.e(h)}finally{c.f()}const p=Object(u.isEmpty)(n)?1:Object(u.max)(n)+1,d="".concat(t,"__").concat(p);return{[d]:{ordering:s.length+1,id:d,name:t,index:p,smartIndex:null,labelShort:Q[t].short,labelLong:Q[t].long}}}const ee=Object(b.a)({},Z({},"vdcc"));function te(e){return{type:"ADD_VERSION",payload:e}}function ae(e){return{type:"SET_VERSION",payload:e}}var re=h.a.mark(se),ne=h.a.mark(oe);function se({payload:e}){var t;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(E.c)(ae(e.version));case 2:return a.next=4,Object(E.c)({type:"GET_BOOKS",payload:{request:{url:"/books/",params:{page_size:1e3}}}});case 4:if(!e.previousVersion){a.next=14;break}return a.next=7,Object(E.e)(["GET_BOOKS_SUCCESS"]);case 7:return(t=A[e.previousVersion.id].getState().filters).search=null,t.snapshot.search=null,a.next=12,Object(E.c)({type:"SET_FILTERS",payload:t});case 12:a.next=16;break;case 14:return a.next=16,Object(E.c)(f());case 16:case"end":return a.stop()}}),re)}function oe(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.f)("SETUP_VERSION",se);case 2:case"end":return e.stop()}}),ne)}var ce=a(111),le=a.n(ce),ie=h.a.mark(he),pe=h.a.mark(be);const ue={isLoading:!1};const de=le.a.create({baseURL:"https://api.myquotes.online/api/",responseType:"json"});function he(e,t){var a,r,n,s,o,c,l;return h.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return a=t.type,r=t.payload.request,n=Object(u.split)(e,"__"),s=Object(X.a)(n,1),o=s[0],c=r.url+"".concat(o,"/"),i.prev=3,i.next=6,Object(E.b)(de,c,{params:r.params});case 6:return l=i.sent,i.next=9,Object(E.c)({type:a+"_SUCCESS",payload:l});case 9:i.next=15;break;case 11:return i.prev=11,i.t0=i.catch(3),i.next=15,Object(E.c)({type:a+"_FAIL",payload:{error:i.t0}});case 15:case"end":return i.stop()}}),ie,null,[[3,11]])}function be(e){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(E.f)(["GET_VERSES","GET_BOOKS","GET_CHAPTERS"],he,e);case 2:case"end":return t.stop()}}),pe)}const Ee={displayVersionIndex:!1,isLoading:!1,isMobile:window.innerWidth<768,verseOptions:{display:!1,x:0,y:0}};var me=h.a.mark(fe),ve=h.a.mark(ye);const Oe={highlightedElement:null};function fe(e){var t,a;return h.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,a={book:t.book_number,chapter:t.chapter_number,search:null},r.next=4,Object(E.c)({type:"SET_FILTERS",payload:a});case 4:return r.next=6,Object(E.e)("GET_VERSES_SUCCESS");case 6:return r.next=8,Object(E.c)({type:"SET_SELECTED_VERSE",payload:t.identifier});case 8:return r.next=10,Object(E.c)({type:"SET_SCROLLED_TO",payload:t.identifier});case 10:case"end":return r.stop()}}),me)}function ye(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.f)("SET_HIGHLIGHTED_ELEMENT",fe);case 2:case"end":return e.stop()}}),ve)}var Se=h.a.mark(je);function je(e){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(E.a)([T(),be(e),ye(),oe()]);case 2:case"end":return t.stop()}}),Se)}const ge={key:"cache",storage:J.a,whitelist:["versions"]},_e=Object(W.c)({versions:function(e=ee,t={}){let a,r,n;switch(console.log(e,t),t.type){case"ADD_VERSION":a=t.payload,r=Z(e,a),n=Object(b.a)(Object(b.a)({},e),r);break;case"REMOVE_VERSION":delete A[t.payload],n=Object(u.omit)(e,t.payload);break;case"SET_VERSION":for(let e in Object(u.keys)(A))delete A[e];a=t.payload,r=Z(e,a),n=Object(b.a)({},r);break;case"REORDER_VERSIONS":const c=t.payload.source,l=e[c].ordering,i=t.payload.destination,p=l>e[i].ordering;n=Object(b.a)({},e);const h=n[i].ordering;var s,o=Object($.a)(Object(u.values)(n));try{for(o.s();!(s=o.n()).done;){let e=s.value;p?n[e.id].ordering>=n[i].ordering&&n[e.id].ordering++:n[e.id].ordering<=n[i].ordering&&n[e.id].ordering--}}catch(d){o.e(d)}finally{o.f()}n[c].ordering=h;break;default:n=e}if(Object(u.includes)(["ADD_VERSION","REMOVE_VERSION","SET_VERSION","persist/REHYDRATE"],t.type)){let e={};var c,l=Object($.a)(Object(u.values)(n));try{for(l.s();!(c=l.n()).done;){e[c.value.name]=0}}catch(d){l.e(d)}finally{l.f()}var i,p=Object($.a)(Object(u.values)(n));try{for(p.s();!(i=p.n()).done;){let t=i.value;t.smartIndex=++e[t.name]}}catch(d){p.e(d)}finally{p.f()}}return n},ui:function(e=Ee,t={}){if(Object(u.has)(t.payload,"request"))return Object(u.has)(t.payload,"status")?Object(b.a)(Object(b.a)({},e),{},{isLoading:!1}):Object(b.a)(Object(b.a)({},e),{},{isLoading:!0});if(Object(u.has)(t,"error"))return Object(b.a)(Object(b.a)({},e),{},{isLoading:!1});switch(t.type){case"SHOW_VERSE_OPTIONS":return Object(b.a)(Object(b.a)({},e),{},{verseOptions:Object(b.a)({display:!0},t.payload)});case"HIDE_VERSE_OPTIONS":return Object(b.a)(Object(b.a)({},e),{},{verseOptions:Object(b.a)({display:!1},t.payload)});default:return e}}}),xe=Object(o.a)(ge,_e),ke=Object(W.c)({books:function(e=Y,t={}){switch(t.type){case"GET_BOOKS_SUCCESS":return{data:Object(u.keyBy)(t.payload.data.results,"number"),count:t.payload.data.count};default:return e}},chapters:function(e=m,t={}){switch(t.type){case"GET_CHAPTERS_SUCCESS":return{data:t.payload.data.results,count:t.payload.data.count};default:return e}},verses:function(e=O,t={}){switch(t.type){case"GET_VERSES_SUCCESS":let a=t.payload.data,r=function(e){return 1===e.page}(a)?a.results:[...Object(u.values)(e.data),...a.results];return Object(b.a)(Object(b.a)({},e),{},{data:Object(u.keyBy)(r,"identifier"),errors:[],count:a.count,page:a.page,hasMore:a.has_more});case"GET_VERSES_FAIL":return Object(b.a)(Object(b.a)({},e),{},{errors:t.payload.error.response.data,data:[],count:null,page:null,hasMore:null,selected:null,scrolledTo:null});case"SET_SELECTED_VERSE":return Object(b.a)(Object(b.a)({},e),{},{selected:t.payload});case"SET_SCROLLED_TO":return Object(b.a)(Object(b.a)({},e),{},{scrolledTo:t.payload});default:return e}},filters:function(e=k,t={}){switch(t.type){case"FORM_CHANGE":return Object(b.a)(Object(b.a)({},e),{},{[t.payload.field]:t.payload.value});case"SET_FILTERS":return Object(b.a)(Object(b.a)({},e),t.payload);case"SEARCH_FILTERS_SNAPSHOT":return Object(b.a)(Object(b.a)({},e),{},{snapshot:t.payload});default:return e}},api:function(e=ue,t={}){return Object(u.has)(t.payload,"request")?Object(u.has)(t.payload,"status")?{isLoading:!1}:{isLoading:!0}:Object(u.has)(t,"error")?{isLoading:!1}:e},version:function(e={},t={}){switch(t.type){case"SET_VERSION":return t.payload;default:return e}},ui:function(e=Oe,t={}){switch(t.type){case"SET_HIGHLIGHTED_ELEMENT":return Object(b.a)(Object(b.a)({},e),{},{highlightedElement:t.payload});default:return e}}});var Te=Object(s.b)((function(e){return{version:e.version}}))(({displayIndex:e,isMobile:t,onRemove:a,version:r})=>n.a.createElement("div",{className:"infos-wrapper"},!t&&n.a.createElement("button",{onClick:a,className:"close"},n.a.createElement("span",{"aria-hidden":"true"},"\xd7")),e&&n.a.createElement("span",null,"[",r.smartIndex,"]"),n.a.createElement("span",null," ",r.labelShort,"  ",!t&&n.a.createElement("span",null,"(",r.labelLong,")")))),Re=a(46);class Ne extends r.Component{constructor(e){if(super(e),Object(u.has)(A,this.props.version.id))this.store=A[this.props.version.id];else{const e=function(e,t={}){const a=Object(q.a)(),r=Object(W.e)(ke,t,Object(W.a)(a));return a.run(je,e),A[e]=r,r.subscribe(()=>{console.log(e,r.getState())}),r}(this.props.version.id);e.dispatch(function({version:e,previousVersion:t}){return{type:"SETUP_VERSION",payload:{version:e,previousVersion:t}}}(this.props)),this.store=e}}render(){return n.a.createElement(K.a,{store:this.store},n.a.createElement(Re.b,{isDragDisabled:this.props.isDragDisabled,draggableId:this.props.version.id,index:this.props.index},(e,t)=>n.a.createElement("div",Object.assign({className:"panel panel-default",ref:e.innerRef},e.draggableProps),n.a.createElement("div",Object.assign({className:"version-controls panel-heading"},e.dragHandleProps),n.a.createElement(Te,{displayIndex:!0,isMobile:this.props.isMobile,onRemove:()=>this.props.dispatch({type:"REMOVE_VERSION",payload:this.props.version.id})})),n.a.createElement("div",{className:"panel-body"},n.a.createElement(G,null),n.a.createElement(B,{isMobile:this.props.isMobile,verseOptionsDisplayed:this.props.verseOptionsDisplayed})))))}}var we=Object(s.b)((function(e){return{isMobile:e.ui.isMobile,verseOptionsDisplayed:e.ui.verseOptions.display,isDragDisabled:1===Object(u.keys)(e.versions).length}}))(Ne);class Ce extends n.a.Component{constructor(...e){super(...e),this.handleVersionReorder=e=>{if(Object(u.isNull)(e.destination))return;const t=this.props.versions[e.source.index],a=this.props.versions[e.destination.index],r={source:t.id,destination:a.id};this.props.dispatch({type:"REORDER_VERSIONS",payload:r})}}render(){const e=Object(u.toInteger)(12/this.props.versions.length),t="col-lg-"+e+" col-md-"+e+" col-sm-"+e;return n.a.createElement(Re.a,{onDragEnd:this.handleVersionReorder},n.a.createElement(Re.c,{droppableId:"droppable",direction:"horizontal"},(e,a)=>n.a.createElement("div",Object.assign({className:"translation-wrapper clearfix",style:{display:"flex"},ref:e.innerRef},e.droppableProps),this.props.versions.map((a,r,s)=>n.a.createElement("div",{key:r,className:"translation "+t},n.a.createElement(we,{index:r,provided:e,key:a.id,version:a,previousVersion:s[r-1]?s[r-1]:null,smartIndex:a.smartIndex}))),!this.props.versions.length&&n.a.createElement("h4",{className:"no-results"},"No version selected. Please select one!"))))}}var Ie=Object(p.a)((function(e){return{versions:Object(u.orderBy)(Object(u.values)(e.versions),["ordering","asc"])}}))(Ce);var Ve=({show:e})=>e?n.a.createElement("div",{className:"spinner"},n.a.createElement("svg",{width:"30px",height:"30px",viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("circle",{fill:"none",strokeWidth:"5",strokeLinecap:"round",cx:"33",cy:"33",r:"30",className:"circle"}))):null,Le=a(209),De=a(208);var He=Object(p.a)((function(e){return{versions:Object(u.values)(e.versions).map(e=>({value:e,label:e})),isMobile:e.ui.isMobile}}))(({versions:e,isMobile:t,dispatch:a})=>{let r,s,o;return t?(r=ae,s="primary",o="Set Version"):(r=te,s="success",o="Add Version"),n.a.createElement("div",{className:"version-selector-wrapper"},n.a.createElement(Le.a,{bsStyle:s,title:o,id:"add-version-dropdown"},n.a.createElement(De.a,{header:!0},n.a.createElement("span",{className:"flag-icon flag-icon-ro"})," Romanian"),n.a.createElement(De.a,{onClick:()=>a(r("vdcc")),eventKey:"1"},"VDCC"),n.a.createElement(De.a,{onClick:()=>a(r("ntr")),eventKey:"2"},"NTR"),n.a.createElement(De.a,{header:!0},n.a.createElement("span",{className:"flag-icon flag-icon-gb"})," English"),n.a.createElement(De.a,{onClick:()=>a(r("esv")),eventKey:"3"},"ESV"),n.a.createElement(De.a,{onClick:()=>a(r("kjv")),eventKey:"3"},"KJV")))});var Me=Object(p.a)((function(e){return{isLoading:e.ui.isLoading}}))(({isLoading:e,isMobile:t})=>n.a.createElement("nav",{className:"navbar navbar-default navbar-static-top",role:"navigation"},n.a.createElement("a",{style:{fontSize:"20px"},className:"navbar-brand",target:"_self",href:""},"Bible"),n.a.createElement(He,null),n.a.createElement(Ve,{show:e}))),Ge=a(119);class Ae extends n.a.Component{constructor(e){super(e),this.element=n.a.createRef(),this.height=null}handleClickOutside(){this.props.dispatch({type:"HIDE_VERSE_OPTIONS"})}componentDidMount(){this.height=this.element.current.clientHeight}componentDidUpdate(){this.height=this.element.current.clientHeight}render(){const e=this.props.options.verse;return n.a.createElement("ul",{ref:this.element,id:"verse-options",className:"dropdown-menu",style:{left:"".concat(this.props.options.x,"px"),top:"".concat(this.props.options.y-this.height,"px"),visibility:this.props.options.display?"initial":"hidden"}},n.a.createElement("li",{onClick:t=>{t.preventDefault();const a="[".concat(e.book_title," ").concat(e.chapter_number,":").concat(e.number,"] ").concat(e.text);navigator.clipboard.writeText(a),A.root.dispatch({type:"HIDE_VERSE_OPTIONS"})}},n.a.createElement("a",{href:"#"},"Copy")),n.a.createElement("li",{role:"separator",className:"divider"}),this.props.versions.map((t,a)=>n.a.createElement("li",{key:a,onClick:a=>{a.preventDefault();A[t.id].dispatch({type:"SET_HIGHLIGHTED_ELEMENT",payload:e})}},n.a.createElement("a",{href:"#"},"Open in ",t.labelShort," [",t.smartIndex,"]"))))}}var Pe=Object(s.b)((function(e){return{options:e.ui.verseOptions,versions:Object(u.orderBy)(Object(u.values)(e.versions),["ordering","asc"])}}))(Object(Ge.a)(Ae));class Ue extends r.Component{componentDidMount(){setTimeout(()=>document.getElementById("loader").style.display="none",250)}render(){return n.a.createElement("div",null,n.a.createElement(Me,null),n.a.createElement(Pe,null),n.a.createElement("div",{id:"page-wrapper"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{id:"content-wrapper",className:"clearfix"},n.a.createElement("div",{className:"App clearfix"},n.a.createElement(Ie,null))))))}}var Fe=Ue;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));const Be=function(e={}){const t=Object(q.a)(),a=Object(W.e)(xe,e,Object(W.a)(t));return t.run(je),A.root=a,a.subscribe(()=>{console.log("root",a.getState())}),a}(),Ke=Object(o.b)(Be);i.a.render(n.a.createElement(s.a,{store:Be},n.a.createElement(c.a,{loading:null,persistor:Ke},n.a.createElement(Fe,{store:Be}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[121,1,2]]]);
//# sourceMappingURL=main.81a7f301.chunk.js.map