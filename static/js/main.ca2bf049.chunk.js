(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(n,e,t){},39:function(n,e,t){"use strict";t.r(e);var i,r,o,a=t(0),s=t.n(a),c=t(15),d=t.n(c),b=t(8),l=t(9),p=t(23),h=t(2),m=t(3),u=l.b.div(i||(i=Object(b.a)(["\n  width: 100%;\n  height: 100%;\n  color: white;\n  // !Estilos para Desktop\n  @media only screen and (min-width: 568px) {\n  }\n"]))),x=function(){return Object(m.jsx)(u,{children:"Home"})},w=l.b.div(r||(r=Object(b.a)(['\n  width: 100%;\n  height: 100%;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  h1 {\n    font-family: "Roboto 900", sans-serif;\n    font-weight: 900;\n    font-size: 4rem;\n    text-align: center;\n  }\n  h2 {\n    font-family: "Roboto 500", sans-serif;\n    font-weight: 900;\n    font-size: 2rem;\n    text-align: center;\n  }\n  span {\n    font-family: "Roboto 100", sans-serif;\n    font-weight: 900;\n    font-size: 1rem;\n    margin-top: 0.5rem;\n    color: white;\n    text-align: center;\n  }\n  // !Estilos para DESKTOP\n  @media only screen and (min-width: 568px) {\n    h1 {\n      font-size: 6rem;\n    }\n    h2 {\n      font-size: 3rem;\n    }\n    span {\n      font-size: 1.5rem;\n    }\n  }\n']))),f=function(){return Object(m.jsxs)(w,{children:[Object(m.jsx)("h1",{children:"404"}),Object(m.jsx)("h2",{children:"P\xe1gina no encontrada"}),Object(m.jsx)("span",{children:"La pagina que quieres buscar, no esta disponible."})]})},g=(t(34),l.b.div(o||(o=Object(b.a)(["\n  width: 100%;\n  height: 100%;\n  /* background: #e4e4e4;\n  display: flex;\n  justify-content: center;\n  align-items: center; */\n  // !Estilos para Desktop\n  @media only screen and (min-width: 568px) {\n  }\n"]))));var j=function(){return Object(m.jsx)(p.a,{children:Object(m.jsx)(g,{id:"app",children:Object(m.jsxs)(h.c,{children:[Object(m.jsx)(h.a,{path:"/",exact:!0,component:x}),Object(m.jsx)(h.a,{component:f})]})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var y,O=t(26),k=t(14),v=t(25),z=t(12);!function(n){n.SHOW_MENU="SHOW_MENU ",n.LOGIN="LOGIN "}(y||(y={}));var M,E={showMenu:!1,login:{user:"",token:""}},q=E,_=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case y.SHOW_MENU:return Object(z.a)(Object(z.a)({},n),{},{showMenu:e.payload});case y.LOGIN:return Object(z.a)(Object(z.a)({},n),{},{login:Object(z.a)(Object(z.a)({},n.login),{},{user:e.user,token:e.token})});default:return n}},N=Object(k.b)({app:_}),S=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||k.c;var L=Object(l.a)(M||(M=Object(b.a)(['\n* {\n    /* overscroll-behavior: contain; */\n    margin:0;\n    padding:0;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -o-box-sizing: border-box;\n    -ms-box-sizing: border-box;\n    box-sizing: border-box;\n\n    /* user-select: none; */\n    scroll-behavior: smooth;\n    user-select: none;\n\n\n}\nbody{\n  background: rgb(0, 0, 0);\n \n}\n#root{\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #070707;\n   \n}\n// !Media query a partir de 568px  \n@media only screen and (min-width: 568px) {\n  html{\n    font-size: 8px;\n  }\n  *{\n    // Chrome\n        input[type="number"]::-webkit-outer-spin-button,\n        input[type="number"]::-webkit-inner-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n        //Firefox:\n        input[type="number"] {\n          -moz-appearance: textfield;\n        }\n        input[type="number"]:hover,\n        input[type="number"]:focus {\n          -moz-appearance: number-input;\n        }\n        //Other\n        input[type="number"]::-webkit-inner-spin-button,\n        input[type="number"]::-webkit-outer-spin-button {\n          -webkit-appearance: none;\n          margin: 0;\n        }\n    // !Firefox\n      scrollbar-width: thin;\n    // !Chrome\n    &::-webkit-scrollbar {\n      width: .5rem;\n      height: .5rem;\n    }\n    &::-webkit-scrollbar-track {\n      background: none;\n    }\n    &::-webkit-scrollbar-thumb {\n      background: rgb(49, 49, 49);\n      border-radius: 0.1rem;\n    }\n    &::-webkit-scrollbar-thumb:hover {\n      background: #3b3b3b;\n      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);\n    }\n    &::-webkit-scrollbar-thumb:active {\n      background-color: rgb(41, 41, 41);\n    }\n  }\n}\n// !Media query a partir de 768px  \n@media only screen and (min-width: 768px) {\n  html{\n    font-size: 10px;\n  }\n}\n// !Media query a partir de 1024px  \n@media only screen and (min-width: 1024px) {\n  html{\n    font-size: 12px;\n  }\n}\n// !Media query a partir de 1280 * 720 720p\n@media only screen and (min-width: 1280px) {\n  html{\n    font-size: 16px;\n    \n  }\n  }\n// !Media query a partir de 1920 * 1080  \n@media only screen and (min-width: 1920px) {\n  html{\n    font-size: 20px;\n  }\n}\n// !Media query a partir de (Lg-Ultrawide-2560*1080) + (2K-2560*1440) \n@media only screen and (min-width: 2560px) {\n  html{\n    font-size: 28px;\n  }\n}\n // !Media query a partir de 3840 * 2160 4K \n @media only screen and (min-width: 3840px) {\n  html{\n    font-size:32px;\n  }\n} \n// !Media query a partir de 5120 * 1440 px Odyssey G9\n@media only screen and (min-width: 5120px) {\n  html{\n    font-size:60px;\n  }\n} \n // !Media query a partir de 7680\u2009*\u20094320 8K\n @media only screen and (min-width: 7680px) {\n  html{\n    font-size:80px;\n  }\n} \n']))),D=Object(k.d)(N,S(Object(k.a)(v.a)));d.a.render(Object(m.jsx)(O.a,{store:D,children:Object(m.jsxs)(s.a.StrictMode,{children:[Object(m.jsx)(L,{}),Object(m.jsx)(j,{})]})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.ca2bf049.chunk.js.map