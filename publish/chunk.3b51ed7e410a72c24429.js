(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{247:function(t,i,e){"use strict";e(97);var a=e(26),s=e(35),n=e(29),r=e(89),c=e(77),o=e(8),u=e(175),l=e(177),m=e(257),d={name:"CartItem",components:{ALink:u.a,APicture:l.a,ItemCustomizations:m.a},props:{item:{type:Object,required:!0},minicart:Boolean,nameMaxLength:{type:Number,default:60},inputType:{type:String,default:"select"},canUpdateCart:{type:Boolean,default:!0}},data:()=>({quantity:1,canInputSelect:!1}),computed:{i19freebie:()=>Object(s.a)(a.Eb),i19outOfStock:()=>Object(s.a)(a.Rc),i19quantity:()=>Object(s.a)(a.id),i19remove:()=>Object(s.a)(a.td),cart(){return this.ecomCart.data},itemId(){return this.item._id},price(){return this.item.final_price||Object(n.a)(this.item)},img(){return Object(r.a)(this.item.picture||this.item,null,"small")},name(){return this.formatName(this.item.name)},isFreebie(){return!!Array.isArray(this.item.flags)&&this.item.flags.includes("freebie")},isIntegerQnt(){return Number.isInteger(this.maxQuantity)&&Number.isInteger(this.quantity)},minQuantity(){const t=this.item.min_quantity;return"number"==typeof t&&t>=0?t:1},maxQuantity(){if(!1===this.item.available)return 0;const t=this.item.max_quantity;return"number"==typeof t&&t>=0?t:9999999}},methods:{formatMoney:c.a,formatName(t){if(t)return t.length<=this.nameMaxLength?t:`${t.substr(0,this.nameMaxLength)}...`},validateQuantity(){console.log(this.quantity),this.minQuantity<=this.maxQuantity&&(this.quantity<this.minQuantity?this.quantity=this.minQuantity:this.quantity>this.maxQuantity&&(this.quantity=this.maxQuantity))},itemKitData:t=>window.ecomCart.data.items.find((i=>i.product_id==t)),updateInputType(){this.validateQuantity(),this.canInputSelect=this.isIntegerQnt&&this.quantity>0&&this.quantity<=10},remove(){this.$emit("remove"),this.itemId&&this.canUpdateCart&&(this.quantity=0,this.canInputSelect=!1,this.$nextTick((()=>{o.a.removeItem(this.itemId),this.$destroy()})))}},watch:{"item.quantity":{handler(t){console.log("Watcher - item.quantity:",t),!isNaN(t)&&t>=0&&(this.quantity=t),console.log(`Item _id: ${this.item._id}, Name: ${this.item.name}, Type: ${typeof this.item._id}`)},immediate:!0},quantity(t,i){if(("number"!=typeof t||isNaN(t))&&(t=0),t!==this.item.quantity){const i=t-this.item.quantity;if(this.$emit("increase",{quantityToAdd:i,newQuantity:t}),this.itemId&&this.canUpdateCart){const t=o.a.increaseItemQnt(this.itemId,i);this.isFreebie&&(t.flags=t.flags.filter((t=>!t.startsWith("freebie"))))}}t>10&&i<=10&&this.$nextTick((()=>{this.$refs.input&&this.$refs.input.focus()}))}},created(){this.updateInputType()}};i.a=d},284:function(t,i,e){"use strict";e(360),e(364),e(366),e(368),e(370),e(372),e(374);var a=e(26),s=e(35),n=e(77),r=e(8),c=e(175),o=e(238),u=e(176),l=e(269),m=e(229),d={name:"CartQuickview",components:{ALink:c.a,ABackdrop:o.a,APrices:u.a,CartItem:l.a,ShippingCalculator:m.a},props:{isVisible:{type:Boolean,default:!0},hasShippingCalculator:Boolean,checkoutUrl:{type:String,default:"/app/#/checkout"},cartUrl:{type:String,default:"/app/#/cart"},canOpenOnNewItem:{type:Boolean,default:!0},ecomCart:{type:Object,default:()=>r.a}},data:()=>({selectedShippingPrice:0}),computed:{i19checkout:()=>Object(s.a)(a.L),i19close:()=>Object(s.a)(a.P),i19continueShopping:()=>Object(s.a)(a.ab),i19emptyCart:()=>Object(s.a)(a.rb),i19myShoppingCart:()=>Object(s.a)(a.qc),i19seeCart:()=>Object(s.a)(a.Id),i19subtotal:()=>Object(s.a)(a.Zd),cart(){return this.ecomCart.data},total(){return this.cart.subtotal+this.selectedShippingPrice},uniqueKitProducts(){const t=new Set;return this.cart.items.filter((i=>!!i.kit_product&&(!t.has(i.kit_product._id)&&(t.add(i.kit_product._id),!0))))},nonKitProducts(){return this.cart.items.filter((t=>!t.kit_product))}},methods:{formatMoney:n.a,toggle(t){this.$emit("update:is-visible","boolean"==typeof t?t:!this.isVisible)},selectShippingService(t){this.selectedShippingPrice=t.shipping_line?t.shipping_line.total_price:0}},created(){this.canOpenOnNewItem&&this.ecomCart.on("addItem",(t=>{let{data:i}=t;this.$set(this.ecomCart,"data",i),this.$nextTick((()=>{this.toggle(!0)}))}))}};i.a=d},285:function(t,i,e){"use strict";e.d(i,"a",(function(){return a})),e.d(i,"b",(function(){return s}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{staticClass:"cart-item",class:t.isFreebie?"cart-item--freebie":null},[e("div",{staticClass:"cart-item__container"},[e("div",{staticClass:"cart-item__thumb"},[t.img?e(t.item.slug?"a-link":"span",{tag:"component",attrs:{href:"/"+t.item.slug}},[e("a-picture",{attrs:{src:t.img.url,alt:t.img.alt||t.item.name}})],1):t._e(),(t.minicart,e("div",{staticClass:"d-flex w-100 align-items-center justify-content-between"},[0===t.maxQuantity?e("small",{staticClass:"cart-item__out-of-stock"},[t._v(" "+t._s(t.i19outOfStock)+" ")]):[e("div",{staticClass:"cart-item__quantity w-100",attrs:{title:t.i19quantity}},[t.item.kit_product||t.item.keep_item_quantity?e("strong",[t._v(" "+t._s(t.quantity)+"x ")]):t.canInputSelect?e("div",{staticClass:"w-100 apx_minicart-quantity d-flex align-items-center"},[e("button",{attrs:{type:"button"},on:{click:function(i){t.quantity--,t.updateInputType()}}},[e("svg",{attrs:{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("rect",{attrs:{x:"0.5",y:"0.5",width:"17",height:"17",rx:"8.5",stroke:"black"}}),e("path",{attrs:{d:"M10.5 5.25L6.75 9L10.5 12.75",stroke:"#131313","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}})])]),e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.quantity,expression:"quantity",modifiers:{number:!0}}],ref:"input",staticClass:"form-control",attrs:{type:t.inputType&&"select"!==t.inputType?t.inputType:"number",min:t.minQuantity,max:t.maxQuantity,step:t.isIntegerQnt?null:.001,readonly:!t.price},domProps:{value:t.quantity},on:{blur:[t.updateInputType,function(i){return t.$forceUpdate()}],input:function(i){i.target.composing||(t.quantity=t._n(i.target.value))}}}),e("button",{attrs:{type:"button"},on:{click:function(i){t.quantity++,t.updateInputType()}}},[e("svg",{attrs:{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("rect",{attrs:{x:"0.5",y:"0.5",width:"17",height:"17",rx:"8.5",stroke:"#131313"}}),e("path",{attrs:{d:"M7.5 12.75L11.25 9L7.5 5.25",stroke:"#131313","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}})])])]):t._e()])]],2))],1),e("div",{staticClass:"cart-item__data"},[e("div",{staticClass:"cart-item__name",attrs:{title:t.item.name}},[t.item.kit_product?e("small",{staticClass:"cart-item__name-subtitle"},[t._v(" "+t._s(t.formatName(t.item.kit_product.name))+" ")]):t.item.slug?e("a-link",{attrs:{href:"/"+t.item.slug}},[t._v(" "+t._s(t.name)+" ")]):[t._v(" "+t._s(t.name)+" ")]],2),e("item-customizations",{staticClass:"cart-item__customizations",attrs:{item:t.item}}),(t.minicart,e("div",{staticClass:"cart-item__mini-price"},[!t.isFreebie||t.price>0?e("div",{staticClass:"cart-item__prices"},[e("div",{staticClass:"cart-item__price-un fade",class:{show:t.quantity>1}},[e("span",[t._v(" "+t._s(t.formatMoney(t.price))+" ")]),e("small",[t._v("/un")])]),t.item.kit_product?e("span",[t._v(" "+t._s(t.formatMoney(t.item.kit_product.price))+" ")]):e("span",[t._v(" "+t._s(t.formatMoney(t.price*t.quantity))+" ")])]):t._e()])),t.item.kit_product?e("div",{staticClass:"kit_item-list"},[e("b",[t._v("Itens do Kit:")]),t._l(t.item.kit_product.composition,(function(i){return e("div",{staticClass:"item"},[t._v(" "+t._s(i.quantity)+"x "+t._s(t.itemKitData(i._id).name)+" ")])}))],2):t._e(),(t.minicart,t._e()),e("div",{class:t.minicart?"":"topper"},[e("div",{staticClass:"w-100 d-flex justify-content-end"},[t.isFreebie?e("span",{staticClass:"cart-item__freebie"},[e("i",{staticClass:"i-gift mr-1"}),t._v(" "+t._s(t.i19freebie)+" ")]):e("button",{staticClass:"close",attrs:{type:"button",title:t.i19remove},on:{click:t.remove}},[e("span",{staticClass:"ico-svg"},[e("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M14.9999 9L8.99994 15M9.00006 9L15.0001 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",stroke:"#4F4F4F","stroke-width":"1.5","stroke-linecap":"round"}})])])])])])],1)])])},s=[]},456:function(t,i,e){"use strict";e.d(i,"a",(function(){return a})),e.d(i,"b",(function(){return s}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"minicart"},[e("a-backdrop",{attrs:{"is-visible":t.isVisible},on:{hide:function(i){return t.toggle(!1)}}}),e("transition",{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutRight"}},[e("aside",{directives:[{name:"show",rawName:"v-show",value:t.isVisible,expression:"isVisible"}],staticClass:"minicart__aside card shadow"},[t._t("header",(function(){return[e("header",{staticClass:"card-header d-md-none d-block"},[e("div",{staticClass:"row apx-side-heading"},[e("div",{staticClass:"col"},[e("span",[t._v("Carrinho ("),e("span",{domProps:{innerHTML:t._s(t.cart.items.length)}}),t._v(")")])]),e("div",{staticClass:"col-auto"},[e("button",{staticClass:"close",attrs:{type:"button","aria-label":t.i19close},on:{click:t.toggle}},[e("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M18 6L6 18M6 6L18 18",stroke:"#131313","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}})])])])])])]})),e("article",{staticClass:"minicart__body card-body"},[e("transition-group",{attrs:{"enter-active-class":"animated fadeIn slow"}},[t.cart.items.length?e("div",{key:"list",staticClass:"minicart__list"},[t._t("list",(function(){return[e("transition-group",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated fadeOutUp faster position-absolute"}},[t._l(t.uniqueKitProducts,(function(t){return e("cart-item",{key:t._id,attrs:{minicart:!0,item:t,isKit:!0}})})),t._l(t.nonKitProducts,(function(t){return e("cart-item",{key:t._id,attrs:{minicart:!0,item:t}})}))],2)]}),null,{items:t.cart.items})],2):e("div",{key:"empty",staticClass:"minicart__empty"},[t._t("empty",(function(){return[e("p",{staticClass:"lead text-muted"},[t._v(" Seu carrinho está vazio ")])]}))],2)])],1),t._t("footer",(function(){return[t.cart.subtotal||t.cart.items.length?e("footer",{staticClass:"card-footer"},[e("div",{staticClass:"minicart__summary"},[e("span",[t._v(t._s(t.i19subtotal))]),e("div",{staticClass:"minicart__subtotal"},[e("a-prices",{attrs:{product:{price:t.cart.subtotal},"is-literal":!0}})],1)]),e("a-link",{staticClass:"d-none minicart__btn-cart btn btn-block btn-outline-secondary",attrs:{role:"button",href:t.cartUrl}},[t._v(" "+t._s(t.i19seeCart)+" ")]),e("div",{staticClass:"apx-cta-section"},[e("a-link",{staticClass:"minicart__btn-checkout btn btn-block btn-primary",attrs:{role:"button",href:t.checkoutUrl}},[e("i",{staticClass:"i-check mr-1"}),t._v(" Finalizar Compra ")])],1)],1):t._e()]}))],2)])],1)},s=[]}}]);