(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(32)},23:function(e,t,n){},27:function(e,t){},28:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(13),r=n.n(i),o=(n(23),n(16)),s=n(6),l=n(7),u=n(9),m=n(8),p=n(10),b=n(33),d=n(34),f=n(35),h=n(36),E=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.coins.map(function(e){return a.a.createElement(b.a,{key:e.id},e.id,a.a.createElement("h5",null,e.price))});return a.a.createElement(d.a,null,a.a.createElement(f.a,null,a.a.createElement(h.a,null,e)))}}]),t}(c.Component),k=n(37),w=(n(27),n(28),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={coins:[{id:"ETHBTC",price:0},{id:"XLMBTC",price:0},{id:"TUSDBTC",price:0},{id:"BTCUSDT",price:0}]},e}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.startWebSocket()}},{key:"startWebSocket",value:function(){var e=this;this.ws=new WebSocket("wss://stream.binance.com:9443/ws/ethbtc@miniTicker/xlmbtc@miniTicker/tusdbtc@miniTicker/btcusdt@miniTicker"),this.ws.onopen=function(){console.log("opening")},this.ws.onclose=function(){console.log("closing")},this.ws.onerror=function(e){console.log("Error : ".concat(e))},this.ws.onmessage=function(t){var n=JSON.parse(t.data),c=n.s,a=n.c,i=Object(o.a)(e.state.coins),r=i.findIndex(function(e){return e.id===c});i[r].price!==a&&(i[r].price=a,e.setState({coins:i}))}}},{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,null,a.a.createElement(f.a,null,a.a.createElement(k.a,null,"TOP"))),a.a.createElement(E,{coins:this.state.coins}),a.a.createElement(d.a,null)))}}]),t}(c.Component));n(30);r.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[18,2,1]]]);
//# sourceMappingURL=main.3cd47c73.chunk.js.map