(this.webpackJsonpyakboard=this.webpackJsonpyakboard||[]).push([[0],{75:function(e,t,n){"use strict";n.r(t);var a=n(4),c=n(0),r=n.n(c),d=n(12),o=n.n(d),i=n(9),l=n(13),s=(n(66),n(92)),j=n(93),b=n(58),u=n(21),O=n(96),x=n(28),h=n(100),f=n(46),p=n(98),v=n(80),g=n(55),m=n(59),C=n(99),y=n(82),U=n(81),S=function(){};function k(e){var t=e.placement,n=e.tooltip,c=e.delay,r=e.trigger,d=e.transition,o=void 0!==d&&d,l=e.children,s=Object(f.a)(e,["placement","tooltip","delay","trigger","transition","children"]);return Object(a.jsx)(p.a,{placement:t,delay:c,trigger:r,transition:o,overlay:Object(a.jsx)(v.a,{children:n}),children:function(e){var t=e.ref,n=Object(f.a)(e,["ref"]);return Object(a.jsx)(g.a,Object(i.a)(Object(i.a)(Object(i.a)({ref:t},n),s),{},{children:l}))}})}function D(e){var t=e.children,n=e.buttonChildren,r=void 0===n?Object(a.jsx)(U.a,{}):n,d=Object(f.a)(e,["children","buttonChildren"]),o=Object(c.useState)(!1),s=Object(l.a)(o,2),j=s[0],b=s[1],u=Object(c.createRef)(),O=Object(c.createRef)(),x=function(e){!j||u.current.contains(e.relatedTarget)||O.current.contains(e.relatedTarget)||b(!1)};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(g.a,Object(i.a)(Object(i.a)({onBlur:x,onClick:function(){return b(!j)},ref:u},d),{},{children:r})),Object(a.jsx)(m.a,{show:j,placement:"left",transition:!1,target:u,children:Object(a.jsx)(C.a,{children:Object(a.jsx)(y.a,{onBlur:x,ref:O,children:t})})})]})}var N=n(94),I=n(83),F=n(84),R=n(85),T=n(86),w=n(87);function B(e){var t=e.uuid,n=e.title,r=e.index,d=void 0===r?null:r,o=e.content,s=e.isNew,j=void 0!==s&&s,b=e.onSave,u=void 0===b?S:b,O=e.onDelete,f=void 0===O?S:O,p=Object(c.useState)(Boolean(j)),v=Object(l.a)(p,2),g=v[0],m=v[1],C=function(){return f(t)},y=function(){return m(!0)},U=function(){return m(!1)},B=function(){!j||A.current.value||P.current.value?u(t,{title:A.current.value,content:P.current.value}):f(t),m(!1)},E=function(e){g&&!e.currentTarget.contains(e.relatedTarget)&&B()},A=Object(c.createRef)(),P=Object(c.createRef)();return Object(a.jsx)(x.b,{draggableId:t,index:d,children:function(e){return Object(a.jsx)("div",Object(i.a)(Object(i.a)({ref:e.innerRef},e.draggableProps),{},{children:Object(a.jsxs)(h.a,{className:"mb-3",onBlur:E,children:[Object(a.jsx)(h.a.Header,Object(i.a)(Object(i.a)({},e.dragHandleProps),{},{children:Object(a.jsx)(N.a,{children:Object(a.jsxs)(I.a,{children:[g?Object(a.jsx)(N.a.Control,{type:"text",defaultValue:n,placeholder:"Title",autoFocus:j,ref:A},"editing"):Object(a.jsx)(N.a.Control,{type:"text",value:n,plaintext:!0,readOnly:!0},"static"),Object(a.jsx)(I.a.Append,{children:g?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(k,{tooltip:"Cancel edits",variant:"outline-danger",onClick:U,children:Object(a.jsx)(F.a,{})}),Object(a.jsx)(k,{tooltip:"Save edits",variant:"success",type:"submit",onClick:B,children:Object(a.jsx)(R.a,{})})]}):Object(a.jsxs)(D,{variant:"light",children:[Object(a.jsx)(k,{tooltip:"Edit card",variant:"info",onClick:y,children:Object(a.jsx)(T.a,{})}),Object(a.jsx)(k,{tooltip:"Delete card",variant:"danger",onClick:C,children:Object(a.jsx)(w.a,{})})]})})]})})})),o||g?Object(a.jsx)(h.a.Body,{children:g?Object(a.jsx)(N.a.Control,{as:"textarea",rows:4,defaultValue:o,placeholder:"Details",autoFocus:!j,ref:P}):Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(h.a.Text,{children:o})})}):null]})}))}})}function E(e){var t=e.uuid,n=e.name,r=e.cards,d=e.cardContents,o=e.filter,s=e.onAddCard,j=void 0===s?S:s,b=e.onSaveCard,u=void 0===b?S:b,O=e.onDeleteCard,f=void 0===O?S:O,p=Object(c.useState)(!1),v=Object(l.a)(p,2),g=v[0],m=v[1],C=function(e,n){j(t,n),m(!1)},y=function(e,n){return u(t,e,n)},U=function(e){return f(t,e)};return Object(a.jsx)(x.c,{droppableId:t,children:function(e){return Object(a.jsxs)("div",Object(i.a)(Object(i.a)({ref:e.innerRef},e.droppableProps),{},{children:[Object(a.jsxs)(h.a,{bg:"light",className:"mt-4",children:[Object(a.jsx)(h.a.Header,{children:Object(a.jsx)(h.a.Title,{className:"text-center",children:n})}),Object(a.jsxs)(h.a.Body,{children:[r.filter((function(e){return-1!==d[e].title.indexOf(o)||-1!==d[e].content.indexOf(o)})).map((function(e,t){return Object(a.jsx)(B,{uuid:e,index:t,title:d[e].title,content:d[e].content,onSave:y,onDelete:U},e)})),g?Object(a.jsx)(B,{isNew:!0,onSave:C,onDelete:function(){return m(!1)}}):Object(a.jsx)(k,{block:!0,variant:"outline-secondary",size:"lg",tooltip:"Add new card",placement:"bottom",onClick:function(){return m(!0)},children:"+"})]})]}),e.placeholder]}))}})}var A=n(97),P=n(101),z=n(95),H=n(88),J=n(89),V=n(90),G=n(91);function L(e){var t=e.disableUndo,n=e.disableRedo,c=e.onUndo,r=void 0===c?S:c,d=e.onRedo,o=void 0===d?S:d,i=e.filter,l=e.onFilterChange,s=void 0===l?S:l;return Object(a.jsxs)(A.a,{bg:"light",variant:"light",fixed:"top",collapseOnSelect:!0,expand:"md",children:[Object(a.jsx)(P.a,{children:Object(a.jsx)(z.a,{drop:"down",title:"yakboard",children:Object(a.jsx)(z.a.Item,{href:"#",children:"Nothing here yet..."})})}),Object(a.jsx)(N.a,{inline:!0,className:"ml-2",children:Object(a.jsxs)(y.a,{children:[Object(a.jsx)(k,{variant:"link",size:"sm",tooltip:"Undo",placement:"bottom",disabled:t,onClick:r,children:Object(a.jsx)(H.a,{})}),Object(a.jsx)(k,{variant:"link",size:"sm",tooltip:"Redo",placement:"bottom",disabled:n,onClick:o,children:Object(a.jsx)(J.a,{})})]})}),Object(a.jsxs)(N.a,{inline:!0,className:"ml-auto",children:[Object(a.jsxs)(I.a,{className:"ml-2",children:[Object(a.jsx)(N.a.Control,{type:"text",placeholder:"Filter",value:i,onChange:function(e){return s(e.target.value)}}),Object(a.jsx)(I.a.Append,{children:Object(a.jsx)(I.a.Text,{children:Object(a.jsx)(V.a,{})})})]}),Object(a.jsx)(k,{href:"https://github.com/jeslinmx/yakboard",variant:"light",size:"sm",className:"ml-2",tooltip:"View on GitHub",placement:"bottom",children:Object(a.jsx)(G.a,{})})]})]})}var M=function(e){var t=JSON.parse(localStorage.getItem("boards"))||function(){var e=[[Object(O.a)(),"Waiting"],[Object(O.a)(),"In Progress"],[Object(O.a)(),"Complete"]];return{boards:e.map((function(e){var t=Object(l.a)(e,2),n=t[0];return t[1],n})),boardContents:Object.fromEntries(e.map((function(e){var t=Object(l.a)(e,2);return[t[0],{name:t[1],cards:[]}]}))),cardContents:{}}}(),n=Object(c.useState)(t),r=Object(l.a)(n,2),d=r[0],o=r[1],h=Object(c.useState)({undo:[],redo:[]}),f=Object(l.a)(h,2),p=f[0],v=f[1],g=Object(c.useState)(""),m=Object(l.a)(g,2),C=m[0],y=m[1];console.log(d),Object(c.useEffect)((function(){localStorage.setItem("boards",JSON.stringify(d))}),[d]);var U=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];"add"===(e=Object(i.a)({},e)).type?o(Object(u.a)((function(t){t.boardContents[e.boardUuid].cards.splice(e.index||Number.MAX_SAFE_INTEGER,0,e.cardUuid),t.cardContents[e.cardUuid]=e.data}))):"save"===e.type?(e.oldData=d.cardContents[e.cardUuid],o(Object(u.a)((function(t){t.cardContents[e.cardUuid]=e.data})))):"delete"===e.type?(e.oldData=d.cardContents[e.cardUuid],e.index=d.boardContents[e.boardUuid].cards.indexOf(e.cardUuid),o(Object(u.a)((function(t){t.boardContents[e.boardUuid].cards.splice(e.index,1),delete t.cardContents[e.cardUuid]})))):"move"===e.type&&o(Object(u.a)((function(t){t.boardContents[e.data.droppableId].cards.splice(e.data.index,0,e.cardUuid),t.boardContents[e.oldData.droppableId].cards.splice(e.oldData.index,1)}))),console.log(e),t&&v(Object(u.a)((function(t){t.undo.push(e),t.redo=[]})))},S=function(e,t){return U({type:"add",boardUuid:e,cardUuid:Object(O.a)(),data:t})},k=function(e,t,n){return U({type:"save",boardUuid:e,cardUuid:t,data:n})},D=function(e,t){return U({type:"delete",boardUuid:e,cardUuid:t})};return Object(a.jsxs)(x.a,{onDragEnd:function(e){var t=e.destination,n=e.source,a=e.draggableId;t&&(t.droppableId===n.droppableId&&t.index===n.index||U({type:"move",cardUuid:a,data:t,oldData:n}))},children:[Object(a.jsx)(L,{disableUndo:p.undo.length<=0,disableRedo:p.redo.length<=0,onUndo:function(){var e=p.undo[p.undo.length-1];U(function(e){return Object(i.a)(Object(i.a)({},e),{},{type:{add:"delete",delete:"add",save:"save",move:"move"}[e.type],data:e.oldData,oldData:e.data})}(e),!1),v(Object(u.a)((function(e){e.redo.push(e.undo.pop())})))},onRedo:function(){var e=p.redo[p.redo.length-1];U(e,!1),v(Object(u.a)((function(e){e.undo.push(e.redo.pop())})))},filter:C,onFilterChange:function(e){y(e)}}),Object(a.jsx)(s.a,{fluid:!0,className:"pt-5",children:Object(a.jsx)(j.a,{children:d.boards.map((function(e){return Object(a.jsx)(b.a,{xs:12,md:6,lg:4,xl:3,children:Object(a.jsx)(E,{uuid:e,name:d.boardContents[e].name,cards:d.boardContents[e].cards,cardContents:d.cardContents,filter:C,onAddCard:S,onSaveCard:k,onDeleteCard:D})},e)}))})})]})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,102)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,d=t.getTTFB;n(e),a(e),c(e),r(e),d(e)}))};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(M,{})}),document.getElementById("root")),_()}},[[75,1,2]]]);
//# sourceMappingURL=main.bb8fadf9.chunk.js.map