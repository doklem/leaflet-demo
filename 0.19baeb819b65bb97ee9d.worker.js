!function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,(function(e){return t[e]}).bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s="wzgF")}({wzgF:function(t,e,o){"use strict";o.r(e);var i=function(t){return t[t.ADDED=0]="ADDED",t[t.MODIFIED=1]="MODIFIED",t[t.REMOVED=2]="REMOVED",t}({});class n{constructor(t,e,o,n,s,a,r){this.id=t,this.eta=e,this.gender=o,this.radianOffset=n,this.rotationCenter=s,this.rotationDirection=a,this.rotationRadius=r,this.location={lat:0,lng:0},this.state=i.ADDED}}class s{constructor(){this.idCounter=0,this.people=new Array,this.timeoutId=0}static setLocation(t,e){t.location.lat=t.rotationCenter.lat+Math.sin(e+t.radianOffset)*t.rotationRadius,t.location.lng=t.rotationDirection?t.rotationCenter.lng-Math.cos(e+t.radianOffset)*t.rotationRadius:t.rotationCenter.lng+Math.cos(e+t.radianOffset)*t.rotationRadius}static toIPerson(t){return t.state===i.REMOVED?{id:t.id,state:t.state}:{eta:t.eta,gender:t.gender,id:t.id,location:t.location,state:t.state}}initialize(t){this.options=t,this.rotationHalfTime=.5*this.options.rotationTime;const e=this.getRadians();for(let o=0;o<this.options.peopleMinCount;o++)this.people.push(this.createPerson(e,0));postMessage(this.people.map(t=>s.toIPerson(t)),null),this.movePeople()}createPerson(t,e){const o=new n(this.idCounter++,Date.now()+e+Math.random()*this.options.peopleLifetimeAddition,this.idCounter%3,Math.random()*(Math.PI+Math.PI),{lat:this.options.startLocation.lat+Math.random()*this.options.spreadRadius,lng:this.options.startLocation.lng+Math.random()*this.options.spreadRadius},this.idCounter%2==0,this.options.rotationMaxRadius*Math.random());return s.setLocation(o,t),o}getRadians(){return Date.now()%this.options.rotationTime/this.rotationHalfTime*Math.PI}movePeople(){clearTimeout(this.timeoutId);const t=Date.now(),e=this.getRadians();let o=0;if(this.people.forEach(n=>{n.eta<t?n.state=i.REMOVED:(s.setLocation(n,e),n.state=i.MODIFIED,o++)}),o<this.options.peopleMinCount)for(let i=0;i<this.options.peopleBatchSize;i++)this.people.push(this.createPerson(e,this.options.peopleMinLifetime));postMessage(this.people.map(t=>s.toIPerson(t)),null),this.people=this.people.filter(t=>t.state!==i.REMOVED),this.timeoutId=setTimeout(()=>this.movePeople(),this.options.moveDelay)}}const a=new s;addEventListener("message",({data:t})=>{a.initialize(t)})}});