(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{149:function(e,t,a){e.exports=a(269)},158:function(e,t,a){},160:function(e,t,a){},269:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(12),s=a(71),c=a(128),i=a(16),l=a.n(i),u=(a(158),a(21)),p=a(22),d=a(24),h=a(23),v=a(25),b=(a(160),a(28)),E=a(4),m=a(10),f=a.n(m),O=a(41),y=a(9),g=a(5),S={data:[],count:null};var j=a(90),_={data:[],errors:[],count:null,page:null,hasMore:null,selected:null,scrolledTo:null};function k(e){return{type:"GET_VERSES",payload:{request:{url:"/verses/",params:{book_number:e,chapter_number:arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,search:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,page:arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,page_size:100}}}}}var x=f.a.mark(L),T=f.a.mark(V),R=f.a.mark(D),w=f.a.mark(H),N=f.a.mark(M),C=f.a.mark(A),I={book:null,chapter:null,search:null,snapshot:{book:null,chapter:null,search:null}};function L(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.f)("VERSE_SEARCH",H);case 2:return e.next=4,Object(g.f)("FORM_CHANGE",M);case 4:return e.next=6,Object(g.f)("SET_FILTERS",A);case 6:case"end":return e.stop()}},x,this)}function V(e){var t,a;return f.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t=e.book,a=e.search,!t){r.next=6;break}return r.next=4,Object(g.c)({type:"GET_CHAPTERS",payload:{request:{url:"/chapters/",params:{book_number:t,page_size:1e3}}}});case 4:r.next=8;break;case 6:return r.next=8,Object(g.c)(G("chapter",null));case 8:return r.next=10,Object(g.c)(k(t,null,a));case 10:return r.next=12,Object(g.e)("GET_VERSES_SUCCESS");case 12:return r.next=14,Object(g.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:t,chapter:null,search:a}});case 14:case"end":return r.stop()}},T,this)}function D(e){var t,a,r;return f.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.book,a=e.chapter,r=e.search,n.next=3,Object(g.c)(k(t,a,r));case 3:return n.next=5,Object(g.e)("GET_VERSES_SUCCESS");case 5:return n.next=7,Object(g.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:t,chapter:a,search:r}});case 7:case"end":return n.stop()}},R,this)}function H(){var e,t,a,r;return f.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(g.d)(function(e){return e.filters});case 2:return e=n.sent,t=e.book,a=e.chapter,r=e.search,n.next=6,Object(g.c)(k(t,a,r,null));case 6:return n.next=8,Object(g.e)(["GET_VERSES_SUCCESS","GET_VERSES_FAIL"]);case 8:return n.next=10,Object(g.c)({type:"SEARCH_FILTERS_SNAPSHOT",payload:{book:t,chapter:a,search:r}});case 10:case"end":return n.stop()}},w,this)}function M(e){var t;return f.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(g.d)(function(e){return e.filters});case 2:t=a.sent,a.t0=e.payload.field,a.next="book"===a.t0?6:"chapter"===a.t0?9:12;break;case 6:return a.next=8,V(t);case 8:return a.abrupt("break",13);case 9:return a.next=11,D(t);case 11:case 12:return a.abrupt("break",13);case 13:case"end":return a.stop()}},N,this)}function A(e){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D(e.payload);case 2:case"end":return t.stop()}},C,this)}var G=function(e,t){return{type:"FORM_CHANGE",payload:{field:e,value:t}}},P=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleKeyPress=function(e){"Enter"===e.key&&a.search()},a.search=function(){(0,a.props.onSearch)(a.textInput.current.value)},a.textInput=n.a.createRef(),a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"input-group"},n.a.createElement("input",{value:this.props.value,type:"text",onKeyPress:this.handleKeyPress,className:"form-control",placeholder:"Search...",style:{height:"38px"},ref:this.textInput,onChange:function(){return e.props.dispatch(G("search",e.textInput.current.value||null))}}),n.a.createElement("span",{className:"input-group-btn"},n.a.createElement("button",{onClick:this.search,className:"btn btn-default",style:{height:"38px"},type:"button"},"Go!")))}}]),t}(r.Component);var F=Object(o.b)(function(e){return{value:e.filters.search||""}})(P),B=a(148),K=Object(o.b)()(function(e){var t=e.name,a=e.options,r=e.placeholder,o=e.value,s=e.dispatch,c=null;return c=Object(E.isObject)(o)?o||null:o?{value:o,label:o}:null,n.a.createElement(B.a,{styles:{clearIndicator:function(e,t){return Object(y.a)({},e,{paddingLeft:"0",paddingRight:"0"})},dropdownIndicator:function(e,t){return Object(y.a)({},e,{paddingLeft:"0",paddingRight:"0"})}},isClearable:!0,options:a,value:c,placeholder:r,onChange:function(e){return s(G(t,e?e.value:null))}})});var U=Object(b.a)(function(e,t){var a=Object(E.values)(e.books.data).map(function(e){return{value:e.number,label:e.title}}),r=Object(E.values)(e.chapters.data).map(function(e){return{value:e.number,label:e.number}}),n=e.filters.book?{value:e.filters.book,label:e.books.data[e.filters.book].title}:null;return{books:a,book:n,chapters:n?r:[],chapter:e.filters.chapter}})(function(e){var t=e.books,a=e.book,r=e.chapters,o=e.chapter,s=e.dispatch;return n.a.createElement("div",null,n.a.createElement("div",{className:"filters-form"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-5 filter-item"},n.a.createElement(K,{name:"book",placeholder:"Book",options:t,value:a})),n.a.createElement("div",{className:"col-sm-3 filter-item"},n.a.createElement(K,{name:"chapter",placeholder:"Chapter",options:r,value:o})),n.a.createElement("div",{className:"col-sm-4 filter-item"},n.a.createElement(F,{onSearch:function(e){return s({type:"VERSE_SEARCH",payload:e})}})))))}),W={},q=Object(o.b)()(function(e){var t=e.item,a=e.isSelected,r=e.dispatch,o=t.text_highlight?t.text_highlight:t.text;return n.a.createElement("div",{onClick:function(e){return function(e,t,a){e.preventDefault(),a({type:"SET_SELECTED_VERSE",payload:t.identifier})}(e,t,r)},onContextMenu:function(e){return function(e,t,a){e.preventDefault();var r={x:e.pageX,y:e.pageY,verse:t};W.root.dispatch({type:"SHOW_VERSE_OPTIONS",payload:r}),a({type:"SET_SELECTED_VERSE",payload:t.identifier})}(e,t,r)},tabIndex:0,className:"verse"+(a?" selected":"")},n.a.createElement("span",{className:"verse-number",style:{marginRight:"2px"}},t.number,"."),n.a.createElement("span",{className:"verse-text",dangerouslySetInnerHTML:function(e){return{__html:e}}(o)}))});var z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleScroll=function(e){var t,r;if(a.props.verseOptionsDisplayed&&W.root.dispatch({type:"HIDE_VERSE_OPTIONS"}),!0===a.props.isMobile){var n=document.body.scrollTop||document.documentElement.scrollTop;r=window.innerHeight+n,t=document.documentElement.offsetHeight}else{var o=a.verseWrapper.current,s=o.scrollTop;r=o.offsetHeight+s,t=o.scrollHeight}r>=t-550&&(a.state.isLoading||a.loadData())},a.state={isLoading:!1},a.verseWrapper=n.a.createRef(),a.verseElements={},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.onscroll=function(){e.handleScroll()}}},{key:"loadData",value:function(){var e=this.props,t=e.dispatch,a=e.filters,r=e.page;e.hasMore&&(this.setState({isLoading:!0}),t(k(a.book,a.chapter,a.search,r?r+1:r)))}},{key:"componentDidUpdate",value:function(e){this.props.scrolledTo&&this.props.scrolledTo!==e.scrolledTo&&this.verseWrapper.current.scrollTo(0,this.verseElements[this.props.scrolledTo].offsetTop)}},{key:"render",value:function(){var e=this,t=this.props,a=t.filtersSnapshot,r=t.books,o=a.book?n.a.createElement("span",null," in ",n.a.createElement("i",null,r[a.book].title)):"",s=a.chapter?n.a.createElement("i",null," ",a.chapter):"",c=a.search?n.a.createElement("span",null,'for "',a.search,'"'):"",i=n.a.createElement("span",null,c,o,s),l=n.a.createElement("span",null,"No results ",i);return n.a.createElement("div",{ref:this.verseWrapper,className:"verses-wrapper",onScroll:this.handleScroll},this.props.verses.map(function(t,a,r){var o=t.identifier===e.props.selected;return n.a.createElement("div",{ref:function(a){return e.verseElements[t.identifier]=a},key:a},function(e,t,a){var r=a[t-1];return!!Object(E.isUndefined)(r)||r.book_number!==e.book_number}(t,a,r)&&n.a.createElement("h2",{className:"verse-book"},t.book_title),function(e,t,a){var r=a[t-1];return!!Object(E.isUndefined)(r)||r.chapter_number!==e.chapter_number}(t,a,r)&&n.a.createElement("h3",{className:"verse-chapter"},t.chapter_number),n.a.createElement(q,{item:t,isSelected:o}))}),this.props.errors&&n.a.createElement("h4",{className:"no-results"},this.props.errors),!this.props.verses.length&&!this.props.errors.length&&n.a.createElement("h4",{className:"no-results"},l,"."))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.isLoading!==t.isLoading&&!1===e.isLoading?{isLoading:!1}:null}}]),t}(r.Component);var J=Object(o.b)(function(e){return{errors:Object(E.values)(e.verses.errors),verses:Object(E.values)(e.verses.data),books:e.books.data,page:e.verses.page,hasMore:e.verses.hasMore,selected:e.verses.selected,scrolledTo:e.verses.scrolledTo,isLoading:e.api.isLoading,filters:e.filters,filtersSnapshot:e.filters.snapshot}})(z),Y=a(50),X=a(13),$=a(89),Q=a(132),Z=a.n(Q),ee={data:[],count:null};var te=a(72),ae={vdcc:{short:"VDCC",long:"Versiunea Dumitru Cornilescu Corectat\u0103"},ntr:{short:"NTR",long:"Noua Traducere Rom\xe2neasc\u0103"},esv:{short:"ESV",long:"English Standard Version"},kjv:{short:"KJV",long:"King James Version"}};function re(e,t){var a,r,n=[],o=Object(E.keys)(e),s=!0,c=!1,i=void 0;try{for(var l,u=o[Symbol.iterator]();!(s=(l=u.next()).done);s=!0){var p=l.value,d=Object(E.split)(p,"__"),h=Object(te.a)(d,2);a=h[0],r=h[1],a===t&&n.push(Object(E.toInteger)(r))}}catch(m){c=!0,i=m}finally{try{s||null==u.return||u.return()}finally{if(c)throw i}}var v=Object(E.isEmpty)(n)?1:Object(E.max)(n)+1,b="".concat(t,"__").concat(v);return Object(O.a)({},b,{ordering:o.length+1,id:b,name:t,index:v,smartIndex:null,labelShort:ae[t].short,labelLong:ae[t].long})}var ne=Object(y.a)({},re({},"vdcc"));function oe(e){return{type:"ADD_VERSION",payload:e}}function se(e){return{type:"SET_VERSION",payload:e}}var ce=a(133),ie=a.n(ce),le=f.a.mark(be),ue=f.a.mark(Ee),pe={isLoading:!1};var de="_SUCCESS",he="_FAIL",ve=ie.a.create({baseURL:"https://myquotes.io/api",responseType:"json"});function be(e,t){var a,r,n,o,s,c,i;return f.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return a=t.type,r=t.payload.request,n=Object(E.split)(e,"__"),o=Object(te.a)(n,1),s=o[0],c=r.url+"".concat(s,"/"),l.prev=3,l.next=6,Object(g.b)(ve,c,{params:r.params});case 6:return i=l.sent,l.next=9,Object(g.c)({type:a+de,payload:i});case 9:l.next=15;break;case 11:return l.prev=11,l.t0=l.catch(3),l.next=15,Object(g.c)({type:a+he,payload:{error:l.t0}});case 15:case"end":return l.stop()}},le,this,[[3,11]])}function Ee(e){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(g.f)(["GET_VERSES","GET_BOOKS","GET_CHAPTERS"],be,e);case 2:case"end":return t.stop()}},ue,this)}var me={displayVersionIndex:!1,isLoading:!1,isMobile:window.innerWidth<768,verseOptions:{display:!1,x:0,y:0}};var fe=f.a.mark(ge),Oe=f.a.mark(Se),ye={highlightedElement:null};function ge(e){var t,a;return f.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.payload,a={book:t.book_number,chapter:t.chapter_number,search:null},r.next=4,Object(g.c)({type:"SET_FILTERS",payload:a});case 4:return r.next=6,Object(g.e)("GET_VERSES_SUCCESS");case 6:return r.next=8,Object(g.c)({type:"SET_SELECTED_VERSE",payload:t.identifier});case 8:return r.next=10,Object(g.c)({type:"SET_SCROLLED_TO",payload:t.identifier});case 10:case"end":return r.stop()}},fe,this)}function Se(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.f)("SET_HIGHLIGHTED_ELEMENT",ge);case 2:case"end":return e.stop()}},Oe,this)}var je=f.a.mark(_e);function _e(e){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(g.a)([L(),Ee(e),Se()]);case 2:case"end":return t.stop()}},je,this)}var ke={key:"cache",storage:Z.a,whitelist:["versions"]},xe=Object(X.c)({versions:function(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(console.log(a,r),r.type){case"ADD_VERSION":e=re(a,r.payload),t=Object(y.a)({},a,e);break;case"REMOVE_VERSION":delete W[r.payload],t=Object(E.omit)(a,r.payload);break;case"SET_VERSION":for(var n in Object(E.keys)(W))delete W[n];e=re(a,r.payload),t=Object(y.a)({},e);break;case"REORDER_VERSIONS":var o=r.payload.source,s=a[o].ordering,c=r.payload.destination,i=s>a[c].ordering,l=(t=Object(y.a)({},a))[c].ordering,u=!0,p=!1,d=void 0;try{for(var h,v=Object(E.values)(t)[Symbol.iterator]();!(u=(h=v.next()).done);u=!0){var b=h.value;i?t[b.id].ordering>=t[c].ordering&&t[b.id].ordering++:t[b.id].ordering<=t[c].ordering&&t[b.id].ordering--}}catch(N){p=!0,d=N}finally{try{u||null==v.return||v.return()}finally{if(p)throw d}}t[o].ordering=l;break;default:t=a}if(Object(E.includes)(["ADD_VERSION","REMOVE_VERSION","SET_VERSION","persist/REHYDRATE"],r.type)){var m={},f=!0,O=!1,g=void 0;try{for(var S,j=Object(E.values)(t)[Symbol.iterator]();!(f=(S=j.next()).done);f=!0)m[S.value.name]=0}catch(N){O=!0,g=N}finally{try{f||null==j.return||j.return()}finally{if(O)throw g}}var _=!0,k=!1,x=void 0;try{for(var T,R=Object(E.values)(t)[Symbol.iterator]();!(_=(T=R.next()).done);_=!0){var w=T.value;w.smartIndex=++m[w.name]}}catch(N){k=!0,x=N}finally{try{_||null==R.return||R.return()}finally{if(k)throw x}}}return t},ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(Object(E.has)(t.payload,"request"))return Object(E.has)(t.payload,"status")?Object(y.a)({},e,{isLoading:!1}):Object(y.a)({},e,{isLoading:!0});if(Object(E.has)(t,"error"))return Object(y.a)({},e,{isLoading:!1});switch(t.type){case"SHOW_VERSE_OPTIONS":return Object(y.a)({},e,{verseOptions:Object(y.a)({display:!0},t.payload)});case"HIDE_VERSE_OPTIONS":return Object(y.a)({},e,{verseOptions:Object(y.a)({display:!1},t.payload)});default:return e}}}),Te=Object(s.a)(ke,xe),Re=Object(X.c)({books:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_BOOKS_SUCCESS":return{data:Object(E.keyBy)(t.payload.data.results,"number"),count:t.payload.data.count};default:return e}},chapters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_CHAPTERS_SUCCESS":return{data:t.payload.data.results,count:t.payload.data.count};default:return e}},verses:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_VERSES_SUCCESS":var a=t.payload.data,r=function(e){return 1===e.page}(a)?a.results:Object(j.a)(Object(E.values)(e.data)).concat(Object(j.a)(a.results));return Object(y.a)({},e,{data:Object(E.keyBy)(r,"identifier"),errors:[],count:a.count,page:a.page,hasMore:a.has_more});case"GET_VERSES_FAIL":return Object(y.a)({},e,{errors:t.payload.error.response.data,data:[],count:null,page:null,hasMore:null,selected:null,scrolledTo:null});case"SET_SELECTED_VERSE":return Object(y.a)({},e,{selected:t.payload});case"SET_SCROLLED_TO":return Object(y.a)({},e,{scrolledTo:t.payload});default:return e}},filters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"FORM_CHANGE":return Object(y.a)({},e,Object(O.a)({},t.payload.field,t.payload.value));case"SET_FILTERS":return Object(y.a)({},e,t.payload);case"SEARCH_FILTERS_SNAPSHOT":return Object(y.a)({},e,{snapshot:t.payload});default:return e}},api:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(E.has)(t.payload,"request")?Object(E.has)(t.payload,"status")?{isLoading:!1}:{isLoading:!0}:Object(E.has)(t,"error")?{isLoading:!1}:e},version:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SET_VERSION":return t.payload;default:return e}},ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SET_HIGHLIGHTED_ELEMENT":return Object(y.a)({},e,{highlightedElement:t.payload});default:return e}}});var we=Object(o.b)(function(e){return{version:e.version}})(function(e){var t=e.displayIndex,a=e.isMobile,r=e.onRemove,o=e.version;return n.a.createElement("div",{className:"infos-wrapper"},!a&&n.a.createElement("button",{onClick:r,className:"close"},n.a.createElement("span",{"aria-hidden":"true"},"\xd7")),t&&n.a.createElement("span",null,"[",o.smartIndex,"]"),n.a.createElement("span",null," ",o.labelShort,"  ",!a&&n.a.createElement("span",null,"(",o.labelLong,")")))}),Ne=a(53),Ce=function(e){function t(e){var a;if(Object(u.a)(this,t),a=Object(d.a)(this,Object(h.a)(t).call(this,e)),Object(E.has)(W,a.props.item.id))a.store=W[a.props.item.id];else{var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object($.a)(),r=Object(X.e)(Re,t,Object(X.a)(a));return a.run(_e,e),W[e]=r,r.subscribe(function(){console.log(e,r.getState())}),r}(a.props.item.id);r.dispatch(se(a.props.item)),r.dispatch({type:"GET_BOOKS",payload:{request:{url:"/books/",params:{page_size:1e3}}}}),r.dispatch(k()),a.store=r}return a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(Y.a,{store:this.store},n.a.createElement(Ne.b,{isDragDisabled:this.props.isDragDisabled,draggableId:this.props.item.id,index:this.props.index},function(t,a){return n.a.createElement("div",Object.assign({className:"panel panel-default",ref:t.innerRef},t.draggableProps),n.a.createElement("div",Object.assign({className:"version-controls panel-heading"},t.dragHandleProps),n.a.createElement(we,{displayIndex:!0,isMobile:e.props.isMobile,onRemove:function(){return e.props.dispatch({type:"REMOVE_VERSION",payload:e.props.item.id})}})),n.a.createElement("div",{className:"panel-body"},n.a.createElement(U,null),n.a.createElement(J,{isMobile:e.props.isMobile,verseOptionsDisplayed:e.props.verseOptionsDisplayed})))}))}}]),t}(r.Component);var Ie=Object(o.b)(function(e){return{isMobile:e.ui.isMobile,verseOptionsDisplayed:e.ui.verseOptions.display,isDragDisabled:1===Object(E.keys)(e.versions).length}})(Ce),Le=function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).handleVersionReorder=function(e){if(!Object(E.isNull)(e.destination)){var t=a.props.versions[e.source.index],r=a.props.versions[e.destination.index],n={source:t.id,destination:r.id};a.props.dispatch({type:"REORDER_VERSIONS",payload:n})}},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=Object(E.toInteger)(12/this.props.versions.length),a="col-lg-"+t+" col-md-"+t+" col-sm-"+t;return n.a.createElement(Ne.a,{onDragEnd:this.handleVersionReorder},n.a.createElement(Ne.c,{droppableId:"droppable",direction:"horizontal"},function(t,r){return n.a.createElement("div",Object.assign({className:"translation-wrapper clearfix",style:{display:"flex"},ref:t.innerRef},t.droppableProps),e.props.versions.map(function(e,r){return n.a.createElement("div",{key:r,className:"translation "+a},n.a.createElement(Ie,{index:r,provided:t,key:e.id,item:e,smartIndex:e.smartIndex}))}),!e.props.versions.length&&n.a.createElement("h4",{className:"no-results"},"No version selected. Please select one!"))}))}}]),t}(n.a.Component);var Ve=Object(b.a)(function(e){return{versions:Object(E.orderBy)(Object(E.values)(e.versions),["ordering","asc"])}})(Le),De=function(e){return e.show?n.a.createElement("div",{className:"spinner"},n.a.createElement("svg",{width:"30px",height:"30px",viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("circle",{fill:"none",strokeWidth:"5",strokeLinecap:"round",cx:"33",cy:"33",r:"30",className:"circle"}))):null},He=a(272),Me=a(271);var Ae=Object(b.a)(function(e){return{versions:Object(E.values)(e.versions).map(function(e){return{value:e,label:e}}),isMobile:e.ui.isMobile}})(function(e){e.versions;var t,a,r,o=e.isMobile,s=e.dispatch;return o?(t=se,a="primary",r="Set Version"):(t=oe,a="success",r="Add Version"),n.a.createElement("div",{className:"version-selector-wrapper"},n.a.createElement(He.a,{bsStyle:a,title:r,id:"add-version-dropdown"},n.a.createElement(Me.a,{header:!0},n.a.createElement("span",{className:"flag-icon flag-icon-ro"})," Romanian"),n.a.createElement(Me.a,{onClick:function(){return s(t("vdcc"))},eventKey:"1"},"VDCC"),n.a.createElement(Me.a,{onClick:function(){return s(t("ntr"))},eventKey:"2"},"NTR"),n.a.createElement(Me.a,{header:!0},n.a.createElement("span",{className:"flag-icon flag-icon-gb"})," English"),n.a.createElement(Me.a,{onClick:function(){return s(t("esv"))},eventKey:"3"},"ESV"),n.a.createElement(Me.a,{onClick:function(){return s(t("kjv"))},eventKey:"3"},"KJV")))});var Ge=Object(b.a)(function(e){return{isLoading:e.ui.isLoading}})(function(e){var t=e.isLoading;e.isMobile;return n.a.createElement("nav",{className:"navbar navbar-default navbar-static-top",role:"navigation"},n.a.createElement("a",{style:{fontSize:"20px"},className:"navbar-brand",target:"_self",href:""},"Bible"),n.a.createElement(Ae,null),n.a.createElement(De,{show:t}))}),Pe=a(146),Fe=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).element=n.a.createRef(),a.height=null,a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"handleClickOutside",value:function(){this.props.dispatch({type:"HIDE_VERSE_OPTIONS"})}},{key:"componentDidMount",value:function(){this.height=this.element.current.clientHeight}},{key:"componentDidUpdate",value:function(){this.height=this.element.current.clientHeight}},{key:"render",value:function(){var e=this.props.options.verse;return n.a.createElement("ul",{ref:this.element,id:"verse-options",className:"dropdown-menu",style:{left:"".concat(this.props.options.x,"px"),top:"".concat(this.props.options.y-this.height,"px"),visibility:this.props.options.display?"initial":"hidden"}},n.a.createElement("li",{onClick:function(t){t.preventDefault();var a="[".concat(e.book_title," ").concat(e.chapter_number,":").concat(e.number,"] ").concat(e.text);navigator.clipboard.writeText(a),W.root.dispatch({type:"HIDE_VERSE_OPTIONS"})}},n.a.createElement("a",{href:"#"},"Copy")),n.a.createElement("li",{role:"separator",className:"divider"}),this.props.versions.map(function(t,a){return n.a.createElement("li",{key:a,onClick:function(a){a.preventDefault(),W[t.id].dispatch({type:"SET_HIGHLIGHTED_ELEMENT",payload:e})}},n.a.createElement("a",{href:"#"},"Open in ",t.labelShort," [",t.smartIndex,"]"))}))}}]),t}(n.a.Component);var Be=Object(o.b)(function(e){return{options:e.ui.verseOptions,versions:Object(E.orderBy)(Object(E.values)(e.versions),["ordering","asc"])}})(Object(Pe.a)(Fe)),Ke=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){setTimeout(function(){return document.getElementById("loader").style.display="none"},250)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(Ge,null),n.a.createElement(Be,null),n.a.createElement("div",{id:"page-wrapper"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{id:"content-wrapper",className:"clearfix"},n.a.createElement("div",{className:"App clearfix"},n.a.createElement(Ve,null))))))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object($.a)(),a=Object(X.e)(Te,e,Object(X.a)(t));return t.run(_e),W.root=a,a.subscribe(function(){console.log("root",a.getState())}),a}(),We=Object(s.b)(Ue);l.a.render(n.a.createElement(o.a,{store:Ue},n.a.createElement(c.a,{loading:null,persistor:We},n.a.createElement(Ke,{store:Ue}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[149,2,1]]]);
//# sourceMappingURL=main.f443a39f.chunk.js.map