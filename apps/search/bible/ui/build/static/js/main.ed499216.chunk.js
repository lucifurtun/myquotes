(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t,a){e.exports=a(205)},130:function(e,t,a){},132:function(e,t,a){},205:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),c=a(61),s=a(104),i=a(17),l=a.n(i),u=(a(130),a(24)),p=a(25),d=a(27),h=a(26),v=a(28),b=(a(132),a(23)),m=a(4),f=a(9),E=a.n(f),O=a(39),y=a(10),g=a(8),j={data:[],count:null};var S=a(76),_={data:[],count:null,page:null,hasMore:null,selected:null,scrolledTo:null};function k(e){return{type:"GET_VERSES",payload:{request:{url:"/verses/",params:{book_number:e,chapter_number:arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,search:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,page:arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,page_size:100}}}}}var x=E.a.mark(L),w=E.a.mark(V),T=E.a.mark(D),N=E.a.mark(H),R=E.a.mark(M),I=E.a.mark(G),C={book:null,chapter:null,search:null};function L(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.f)("VERSE_SEARCH",H);case 2:return e.next=4,Object(g.f)("FORM_CHANGE",M);case 4:return e.next=6,Object(g.f)("SET_FILTERS",G);case 6:case"end":return e.stop()}},x,this)}function V(e){var t,a;return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t=e.book,a=e.search,!t){n.next=6;break}return n.next=4,Object(g.c)({type:"GET_CHAPTERS",payload:{request:{url:"/chapters/",params:{book_number:t,page_size:1e3}}}});case 4:n.next=8;break;case 6:return n.next=8,Object(g.c)(P("chapter",null));case 8:return n.next=10,Object(g.c)(k(t,null,a));case 10:case"end":return n.stop()}},w,this)}function D(e){var t,a,n;return E.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.book,a=e.chapter,n=e.search,r.next=3,Object(g.c)(k(t,a,n));case 3:case"end":return r.stop()}},T,this)}function H(){var e,t,a,n;return E.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(g.d)(function(e){return e.filters});case 2:return e=r.sent,t=e.book,a=e.chapter,n=e.search,r.next=6,Object(g.c)(k(t,a,n,null));case 6:case"end":return r.stop()}},N,this)}function M(e){var t;return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(g.d)(function(e){return e.filters});case 2:t=a.sent,a.t0=e.payload.field,a.next="book"===a.t0?6:"chapter"===a.t0?9:12;break;case 6:return a.next=8,V(t);case 8:return a.abrupt("break",13);case 9:return a.next=11,D(t);case 11:case 12:return a.abrupt("break",13);case 13:case"end":return a.stop()}},R,this)}function G(e){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D(e.payload);case 2:case"end":return t.stop()}},I,this)}var P=function(e,t){return{type:"FORM_CHANGE",payload:{field:e,value:t}}},A=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleKeyPress=function(e){"Enter"===e.key&&a.search()},a.search=function(){(0,a.props.onSearch)(a.textInput.current.value)},a.textInput=r.a.createRef(),a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{value:this.props.value,type:"text",onKeyPress:this.handleKeyPress,className:"form-control",placeholder:"Search...",style:{height:"38px"},ref:this.textInput,onChange:function(){return e.props.dispatch(P("search",e.textInput.current.value||null))}}),r.a.createElement("span",{className:"input-group-btn"},r.a.createElement("button",{onClick:this.search,className:"btn btn-default",style:{height:"38px"},type:"button"},"Go!")))}}]),t}(n.Component);var B=Object(o.b)(function(e){return{value:e.filters.search||""}})(A),U=a(120),W=Object(o.b)()(function(e){var t=e.name,a=e.options,n=e.placeholder,o=e.value,c=e.dispatch,s=null;return s=Object(m.isObject)(o)?o||null:o?{value:o,label:o}:null,r.a.createElement(U.a,{styles:{clearIndicator:function(e,t){return Object(y.a)({},e,{paddingLeft:"0",paddingRight:"0"})},dropdownIndicator:function(e,t){return Object(y.a)({},e,{paddingLeft:"0",paddingRight:"0"})}},isClearable:!0,options:a,value:s,placeholder:n,onChange:function(e){return c(P(t,e?e.value:null))}})});var K=Object(b.a)(function(e,t){var a=Object(m.values)(e.books.data).map(function(e){return{value:e.number,label:e.title}}),n=Object(m.values)(e.chapters.data).map(function(e){return{value:e.number,label:e.number}}),r=e.filters.book?{value:e.filters.book,label:e.books.data[e.filters.book].title}:null;return{books:a,book:r,chapters:r?n:[],chapter:e.filters.chapter}})(function(e){var t=e.handleSubmit,a=e.books,n=e.book,o=e.chapters,c=e.chapter,s=e.dispatch;return r.a.createElement("div",null,r.a.createElement("form",{className:"filters-form",onSubmit:t},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-5 filter-item"},r.a.createElement(W,{name:"book",placeholder:"Book",options:a,value:n})),r.a.createElement("div",{className:"col-sm-3 filter-item"},r.a.createElement(W,{name:"chapter",placeholder:"Chapter",options:o,value:c})),r.a.createElement("div",{className:"col-sm-4 filter-item"},r.a.createElement(B,{onSearch:function(e){return s({type:"VERSE_SEARCH",payload:e})}})))))}),F={},q=Object(o.b)()(function(e){var t=e.item,a=e.isSelected,n=e.dispatch,o=t.text_highlight?t.text_highlight:t.text;return r.a.createElement("div",{onClick:function(e){return function(e,t,a){var n={x:e.clientX,y:e.clientY,verse:t};F.root.dispatch({type:"SHOW_VERSE_OPTIONS",payload:n}),a({type:"SET_SELECTED_VERSE",payload:t.identifier})}(e,t,n)},onBlur:function(e){return function(e,t,a){var n=document.getElementById("verse-options");null!==n&&n.contains(e.relatedTarget)||(F.root.dispatch({type:"HIDE_VERSE_OPTIONS"}),a({type:"SET_SELECTED_VERSE",payload:null}))}(e,0,n)},tabIndex:0,className:"verse"+(a?" selected":"")},r.a.createElement("span",{className:"verse-number",style:{marginRight:"2px"}},t.number,"."),r.a.createElement("span",{className:"verse-text",dangerouslySetInnerHTML:function(e){return{__html:e}}(o)}))});var z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).handleScroll=function(e){var t,n;if(a.props.verseOptionsDisplayed&&F.root.dispatch({type:"HIDE_VERSE_OPTIONS"}),!0===a.props.isMobile){var r=document.body.scrollTop||document.documentElement.scrollTop;n=window.innerHeight+r,t=document.documentElement.offsetHeight}else{var o=a.verseWrapper.current,c=o.scrollTop;n=o.offsetHeight+c,t=o.scrollHeight}n>=t-550&&(a.state.isLoading||a.loadData())},a.state={isLoading:!1},a.verseWrapper=r.a.createRef(),a.verseElements={},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.onscroll=function(){e.handleScroll()}}},{key:"loadData",value:function(){var e=this.props,t=e.dispatch,a=e.filters,n=e.page;e.hasMore&&(this.setState({isLoading:!0}),t(k(a.book,a.chapter,a.search,n?n+1:n)))}},{key:"componentDidUpdate",value:function(e){this.props.scrolledTo&&this.props.scrolledTo!==e.scrolledTo&&this.verseWrapper.current.scrollTo(0,this.verseElements[this.props.scrolledTo].offsetTop)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{ref:this.verseWrapper,className:"verses-wrapper",onScroll:this.handleScroll},this.props.verses.map(function(t,a,n){var o=t.identifier===e.props.selected;return r.a.createElement("div",{ref:function(a){return e.verseElements[t.identifier]=a},key:a},function(e,t,a){var n=a[t-1];return!!Object(m.isUndefined)(n)||n.book_number!==e.book_number}(t,a,n)&&r.a.createElement("h2",{className:"verse-book"},t.book_title),function(e,t,a){var n=a[t-1];return!!Object(m.isUndefined)(n)||n.chapter_number!==e.chapter_number}(t,a,n)&&r.a.createElement("h3",{className:"verse-chapter"},t.chapter_number),r.a.createElement(q,{item:t,isSelected:o}))}),!this.props.verses.length&&r.a.createElement("h4",{className:"no-results"},"No results..."))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.isLoading!==t.isLoading&&!1===e.isLoading?{isLoading:!1}:null}}]),t}(n.Component);var J=Object(o.b)(function(e){return{verses:e.verses.data,page:e.verses.page,hasMore:e.verses.hasMore,selected:e.verses.selected,scrolledTo:e.verses.scrolledTo,isLoading:e.api.isLoading,filters:e.filters}})(z),X=a(46),Y=a(19),$=a(75),Q=a(108),Z=a.n(Q),ee={data:[],count:null};var te=a(62),ae={vdcc:{short:"VDCC",long:"Versiunea Dumitru Cornilescu Corectat\u0103"},ntr:{short:"NTR",long:"Noua Traducere Rom\xe2neasc\u0103"},esv:{short:"ESV",long:"English Standard Version"}};function ne(e,t){var a,n,r=[],o=!0,c=!1,s=void 0;try{for(var i,l=Object(m.keys)(e)[Symbol.iterator]();!(o=(i=l.next()).done);o=!0){var u=i.value,p=Object(m.split)(u,"__"),d=Object(te.a)(p,2);a=d[0],n=d[1],a===t&&r.push(Object(m.toInteger)(n))}}catch(b){c=!0,s=b}finally{try{o||null==l.return||l.return()}finally{if(c)throw s}}var h=Object(m.isEmpty)(r)?1:Object(m.max)(r)+1,v="".concat(t,"__").concat(h);return Object(O.a)({},v,{id:v,name:t,index:h,labelShort:ae[t].short,labelLong:ae[t].long})}var re=Object(y.a)({},ne({},"vdcc"));function oe(e){return{type:"ADD_VERSION",payload:e}}function ce(e){return{type:"SET_VERSION",payload:e}}var se=a(109),ie=a.n(se),le=E.a.mark(be),ue=E.a.mark(me),pe={isLoading:!1};var de="_SUCCESS",he="_FAIL",ve=ie.a.create({baseURL:"/api",responseType:"json"});function be(e,t){var a,n,r,o,c,s,i;return E.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return a=t.type,n=t.payload.request,r=Object(m.split)(e,"__"),o=Object(te.a)(r,1),c=o[0],s=n.url+"".concat(c,"/"),l.prev=3,l.next=6,Object(g.b)(ve,s,{params:n.params});case 6:return i=l.sent,l.next=9,Object(g.c)({type:a+de,payload:i});case 9:l.next=15;break;case 11:return l.prev=11,l.t0=l.catch(3),l.next=15,Object(g.c)({type:a+he,payload:{error:l.t0}});case 15:case"end":return l.stop()}},le,this,[[3,11]])}function me(e){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(g.f)(["GET_VERSES","GET_BOOKS","GET_CHAPTERS"],be,e);case 2:case"end":return t.stop()}},ue,this)}var fe={displayVersionIndex:!1,isLoading:!1,isMobile:window.innerWidth<768,verseOptions:{display:!1,x:0,y:0}};var Ee=E.a.mark(ge),Oe=E.a.mark(je),ye={highlightedElement:null};function ge(e){var t,a;return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.payload,a={book:t.book_number,chapter:t.chapter_number,search:null},n.next=4,Object(g.c)({type:"SET_FILTERS",payload:a});case 4:return n.next=6,Object(g.e)("GET_VERSES_SUCCESS");case 6:return n.next=8,Object(g.c)({type:"SET_SELECTED_VERSE",payload:t.identifier});case 8:return n.next=10,Object(g.c)({type:"SET_SCROLLED_TO",payload:t.identifier});case 10:case"end":return n.stop()}},Ee,this)}function je(){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.f)("SET_HIGHLIGHTED_ELEMENT",ge);case 2:case"end":return e.stop()}},Oe,this)}var Se=E.a.mark(_e);function _e(e){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(g.a)([L(),me(e),je()]);case 2:case"end":return t.stop()}},Se,this)}var ke={key:"base",storage:Z.a,whitelist:["versions"]},xe=Object(Y.c)({versions:function(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(n.type){case"ADD_VERSION":e=ne(a,n.payload),t=Object(y.a)({},a,e);break;case"REMOVE_VERSION":delete F[n.payload],t=Object(m.omit)(a,n.payload);break;case"SET_VERSION":for(var r in Object(m.keys)(F))delete F[r];e=ne(a,n.payload),t=Object(y.a)({},e);break;default:t=a}if(Object(m.includes)(["ADD_VERSION","REMOVE_VERSION","SET_VERSION"],n.type)){var o={},c=!0,s=!1,i=void 0;try{for(var l,u=Object(m.values)(t)[Symbol.iterator]();!(c=(l=u.next()).done);c=!0)o[l.value.name]=0}catch(E){s=!0,i=E}finally{try{c||null==u.return||u.return()}finally{if(s)throw i}}var p=!0,d=!1,h=void 0;try{for(var v,b=Object(m.values)(t)[Symbol.iterator]();!(p=(v=b.next()).done);p=!0){var f=v.value;f.smartIndex=++o[f.name]}}catch(E){d=!0,h=E}finally{try{p||null==b.return||b.return()}finally{if(d)throw h}}}return t},ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(Object(m.has)(t.payload,"request"))return Object(m.has)(t.payload,"status")?Object(y.a)({},e,{isLoading:!1}):Object(y.a)({},e,{isLoading:!0});if(Object(m.has)(t,"error"))return Object(y.a)({},e,{isLoading:!1});switch(t.type){case"SHOW_VERSE_OPTIONS":return Object(y.a)({},e,{verseOptions:Object(y.a)({display:!0},t.payload)});case"HIDE_VERSE_OPTIONS":return Object(y.a)({},e,{verseOptions:Object(y.a)({display:!1},t.payload)});default:return e}}}),we=Object(c.a)(ke,xe),Te=Object(Y.c)({books:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_BOOKS_SUCCESS":return{data:Object(m.keyBy)(t.payload.data.results,"number"),count:t.payload.data.count};default:return e}},chapters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_CHAPTERS_SUCCESS":return{data:t.payload.data.results,count:t.payload.data.count};default:return e}},verses:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"GET_VERSES_SUCCESS":var a=t.payload.data,n=function(e){return 1===e.page}(a)?a.results:Object(S.a)(e.data).concat(Object(S.a)(a.results));return Object(y.a)({},e,{data:n,count:a.count,page:a.page,hasMore:a.has_more});case"SET_SELECTED_VERSE":return Object(y.a)({},e,{selected:t.payload});case"SET_SCROLLED_TO":return Object(y.a)({},e,{scrolledTo:t.payload});default:return e}},filters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"FORM_CHANGE":return Object(y.a)({},e,Object(O.a)({},t.payload.field,t.payload.value));case"SET_FILTERS":return console.log(t.payload),Object(y.a)({},e,t.payload);default:return e}},api:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(m.has)(t.payload,"request")?Object(m.has)(t.payload,"status")?{isLoading:!1}:{isLoading:!0}:Object(m.has)(t,"error")?{isLoading:!1}:e},version:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SET_VERSION":return t.payload;default:return e}},ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SET_HIGHLIGHTED_ELEMENT":return Object(y.a)({},e,{highlightedElement:t.payload});default:return e}}});var Ne=Object(o.b)(function(e){return{version:e.version}})(function(e){var t=e.displayIndex,a=e.isMobile,n=e.onRemove,o=e.version;return r.a.createElement("div",{className:"infos-wrapper"},!a&&r.a.createElement("button",{onClick:n,className:"close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")),t&&r.a.createElement("span",null,"[",o.smartIndex,"]"),r.a.createElement("span",null," ",o.labelShort," (",o.labelLong,")"))}),Re=function(e){function t(e){var a;Object(u.a)(this,t);var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object($.a)(),n=Object(Y.d)(Te,t,Object(Y.a)(a));return a.run(_e,e),F[e]=n,n.subscribe(function(){console.log(e,n.getState())}),n}((a=Object(d.a)(this,Object(h.a)(t).call(this,e))).props.item.id);return n.dispatch(ce(a.props.item)),n.dispatch({type:"GET_BOOKS",payload:{request:{url:"/books/",params:{page_size:1e3}}}}),n.dispatch(k()),a.store=n,a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(X.a,{store:this.store},r.a.createElement("div",{className:"panel panel-default"},r.a.createElement("div",{className:"version-controls panel-heading"},r.a.createElement(Ne,{displayIndex:!0,isMobile:this.props.isMobile,onRemove:function(){return e.props.dispatch({type:"REMOVE_VERSION",payload:e.props.item.id})}})),r.a.createElement("div",{className:"panel-body"},r.a.createElement(K,null),r.a.createElement(J,{isMobile:this.props.isMobile,verseOptionsDisplayed:this.props.verseOptionsDisplayed}))))}}]),t}(n.Component);var Ie=Object(o.b)(function(e){return{isMobile:e.ui.isMobile,verseOptionsDisplayed:e.ui.verseOptions.display}})(Re);var Ce=Object(b.a)(function(e){return{versions:Object(m.values)(e.versions)}})(function(e){var t=e.versions,a=Object(m.toInteger)(12/t.length),n="col-lg-"+a+" col-md-"+a+" col-sm-"+a;return r.a.createElement("div",{className:"translation-wrapper clearfix"},t.map(function(e){return r.a.createElement("div",{key:e.id,className:"translation "+n},r.a.createElement(Ie,{key:e.id,item:e,smartIndex:e.smartIndex}))}),!t.length&&r.a.createElement("h4",{className:"no-results"},"No version selected. Please select one!"))}),Le=function(e){return e.show?r.a.createElement("div",{className:"spinner"},r.a.createElement("svg",{width:"30px",height:"30px",viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("circle",{fill:"none",strokeWidth:"5",strokeLinecap:"round",cx:"33",cy:"33",r:"30",className:"circle"}))):null},Ve=a(208),De=a(207);var He=Object(b.a)(function(e){return{versions:Object(m.values)(e.versions).map(function(e){return{value:e,label:e}}),isMobile:e.ui.isMobile}})(function(e){e.versions;var t,a,n,o=e.isMobile,c=e.dispatch;return o?(t=ce,a="primary",n="Set Version"):(t=oe,a="success",n="Add Version"),r.a.createElement("div",{className:"version-selector-wrapper"},r.a.createElement(Ve.a,{bsStyle:a,title:n,id:"add-version-dropdown"},r.a.createElement(De.a,{header:!0},r.a.createElement("span",{className:"flag-icon flag-icon-ro"})," Romanian"),r.a.createElement(De.a,{onClick:function(){return c(t("vdcc"))},eventKey:"1"},"VDCC"),r.a.createElement(De.a,{onClick:function(){return c(t("ntr"))},eventKey:"2"},"NTR"),r.a.createElement(De.a,{header:!0},r.a.createElement("span",{className:"flag-icon flag-icon-gb"})," English"),r.a.createElement(De.a,{onClick:function(){return c(t("esv"))},eventKey:"3"},"ESV")))});var Me=Object(b.a)(function(e){return{isLoading:e.ui.isLoading}})(function(e){var t=e.isLoading;e.isMobile;return r.a.createElement("nav",{className:"navbar navbar-default navbar-static-top",role:"navigation"},r.a.createElement("a",{style:{fontSize:"20px"},className:"navbar-brand",target:"_self",href:"/"},"Bible"),r.a.createElement(He,null),r.a.createElement(Le,{show:t}))}),Ge=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).element=r.a.createRef(),a.height=null,a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.height=this.element.current.clientHeight}},{key:"componentDidUpdate",value:function(){this.height=this.element.current.clientHeight}},{key:"render",value:function(){var e=this.props.options.verse;return r.a.createElement("ul",{ref:this.element,id:"verse-options",className:"dropdown-menu",style:{left:"".concat(this.props.options.x,"px"),top:"".concat(this.props.options.y-this.height,"px"),visibility:this.props.options.display?"initial":"hidden"}},r.a.createElement("li",{onClick:function(t){t.preventDefault();var a="[".concat(e.book_title," ").concat(e.chapter_number,":").concat(e.number,"] ").concat(e.text);navigator.clipboard.writeText(a),F.root.dispatch({type:"HIDE_VERSE_OPTIONS"})}},r.a.createElement("a",{href:"#"},"Copy")),r.a.createElement("li",{role:"separator",className:"divider"}),this.props.versions.map(function(t,a){return r.a.createElement("li",{key:a,onClick:function(a){a.preventDefault(),F[t.id].dispatch({type:"SET_HIGHLIGHTED_ELEMENT",payload:e}),F.root.dispatch({type:"HIDE_VERSE_OPTIONS"})}},r.a.createElement("a",{href:"#"},"Open in ",t.labelShort," [",t.smartIndex,"]"))}))}}]),t}(r.a.Component);var Pe=Object(o.b)(function(e){return{options:e.ui.verseOptions,versions:Object(m.values)(e.versions)}})(Ge),Ae=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){setTimeout(function(){return document.getElementById("loader").style.display="none"},250)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Me,null),r.a.createElement(Pe,null),r.a.createElement("div",{id:"page-wrapper"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{id:"content-wrapper",className:"clearfix"},r.a.createElement("div",{className:"App clearfix"},r.a.createElement(Ce,null))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object($.a)(),a=Object(Y.d)(we,e,Object(Y.a)(t));return t.run(_e),F.root=a,a.subscribe(function(){console.log("root",a.getState())}),a}(),Ue=Object(c.b)(Be);l.a.render(r.a.createElement(o.a,{store:Be},r.a.createElement(s.a,{loading:null,persistor:Ue},r.a.createElement(Ae,{store:Be}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[121,2,1]]]);
//# sourceMappingURL=main.ed499216.chunk.js.map