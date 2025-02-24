const EcomPassport = require('@ecomplus/passport-client')

const search = new EcomSearch()

// let mouseDown = false;
// let startX, scrollLeft;
// const sliders = document.querySelectorAll('.breakline-false');

// sliders.forEach(slider => {
//   slider.addEventListener('mousedown', startDragging, false);
//   slider.addEventListener('mousemove', move, false);
// });

// window.addEventListener('mouseup', stopDragging, false);
// window.addEventListener('mouseleave', stopDragging, false);

// function startDragging(e) {
//   mouseDown = true;
//   startX = e.pageX - this.offsetLeft;
//   scrollLeft = this.scrollLeft;
// }

// function stopDragging() {
//   mouseDown = false;
// }

// function move(e) {
//   if (!mouseDown) return;
//   const x = e.pageX - this.offsetLeft;
//   const scroll = x - startX;
//   this.scrollLeft = scrollLeft - scroll;
// }

// window.whatsappRedirect = function(type){
//   alert(type)
// }

$(document).ready(function(){
  // if($('.page--categories .category-banner').length > 0 && $(`.page--categories .category-description`).length > 0){
  //   $('.page--categories .category-banner, .page--categories .category-description, .page--categories .page-title').wrapAll('<div id=category_heading_box></div>');
  //   $(`.page--categories .category-description, .page--categories .page-title`).wrapAll('<div></div>');
  // }
  // if(window.innerWidth > 990){
  //   $('.products-carousel__list').addClass('owl-carousel')
  //   $('.products-carousel__list').owlCarousel({
  //     loop:true,
  //     margin:20,
  //     responsiveClass:true,
      
  //     responsive:{
  //         0:{
  //             items:2,
  //             nav:false,
  //             stagePadding:0,
  //             margin:15
  //         },
  //         600:{
  //             items:3,
  //             nav:false
  //         },
  //         1000:{
  //             items:5,
  //             dots:false,
  //             nav:false,
  //             loop:true
  //         }
  //     }
  //   });
    
  // }else{
    
  // }
  

  $('body').css('--header-vh', ($('header#header').innerHeight()) + 'px');

  //adiciona nome do usuário aos elementos username
  const client = EcomPassport.ecomPassport.getCustomer();   
  $('[username]').text(client.display_name || `Visitante` )

  // placeFavoritesAside();
});

// $('body').on('click','#wishlist-button, .favorites__aside  .apx-side-heading button, #m-toggleFavorites', function(){
//   $('#favorites-quickview').toggleClass('visible')
//   $(`#m-toggleFavorites`).toggleClass(`active`)
// });

// $('body').on('click','.product-card__favorite-remove', function(){
//   toggleFavoriteFront(this);
// });

// $('body').on('click','.product-card__favorite', function(){
//   placeFavoritesAside();
// })


// async function placeFavoritesAside(){
//   $(`.favorites__body`).empty();
//   try {
//     const { favorites } = await EcomPassport.ecomPassport.getCustomer();    
//     search.setProductIds(favorites).fetch().then(result => {
//       $.each(result.hits.hits, function(k,i){
//         let item = i._source;
//         $(`<div class="row item"><div class=col-12><div class="favorite-list product-card"data-sku=${item.sku} data-product-id=${item._id}><section><a class=product-card__link href=/${item.slug} title=${item.name}><div class=product-card__pictures><img alt="${item.pictures ? item.pictures[0].normal.alt : ''}"src="${item.pictures ? item.pictures[0].normal.url : '/assets/img-placeholder.png'}"></div></a><div class=product-card__content-group><div class='row align-items-start'><div class=col><a class=product-card__link href=/${item.slug} title=${item.name}><h3 class=product-card__name>${item.name}</h3></a></div><div class=col-auto><button class="btn product-card__favorite-remove"aria-label="Remover dos favoritos"><svg fill=none height=16 viewBox="0 0 16 16"width=16 xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_21_6728)><path d="M5.33331 8.00004H10.6666M14.6666 8.00004C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00004C1.33331 4.31814 4.31808 1.33337 7.99998 1.33337C11.6819 1.33337 14.6666 4.31814 14.6666 8.00004Z"stroke=#666666 stroke-linecap=round stroke-linejoin=round /></g><defs><clipPath id=clip0_21_6728><rect fill=white height=16 width=16 /></clipPath></defs></svg></button></div></div><div class="prices product-card__prices "><span class='prices__window.compare ${item.base_price ? '' : 'd-none'}'><s>${item.base_price ? (item.currency_symbol + ' ' +item.base_price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})) : ''}</s> </span><strong class=prices__value>${item.currency_symbol} ${item.price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})}</strong></div><div class="fade product-card__buy"><button class="btn btn-primary btn-sm"data-id=${item._id} type=button>Adicionar ao Carrinho</button></div></div></section><div></div></div></div>`).appendTo(`.favorites__body`);
//       });      
//     })
    
//   }catch(e){
//     //console.log(e)
//   }
// }

// async function toggleFavoriteFront(el){
//   try {
//     let productId = $(el).attr('data-id');
//     const { favorites } = await EcomPassport.ecomPassport.getCustomer();   
//     const favIndex = favorites.indexOf(productId)
//     favorites.splice(favIndex, 1) 
//     EcomPassport.ecomPassport.requestApi('/me.json', 'patch', { favorites })
//     $(el).closest('.item').remove();
    
//   }catch(e){
//     //console.log(e)
//   }
// }

$('.apx_faq-item .hat *').click(function(){
  $(this).closest('.apx_faq-item').toggleClass('visible')
});

window.compare = {};
window.compare.init = function(){
  $(`body`).on(`click`,`.product-compare button`,function(){
    let product = $(this).attr('data') ? JSON.parse($(this).attr('data')) : {};
    window.compare.toggleItem(product)
  });
  $(`body`).on(`click`,`.product-compare-remove`,function(){
    let product = $(this).attr('data') ? JSON.parse($(this).attr('data')) : {};
    //console.log(product)
    window.compare.toggleItem(product)
  });
  $(`body`).on(`click`,`.specs_compare-trigger, .specs_compare .close`,function(){
    $(`.specs_compare`).toggleClass(`active`);
  });
  // window.compare.updateList();
  // //console.log(`compare initialized`)
  // if(window.compare.db.length > 1){
  //   $('body').addClass('compare-is-active');    
  // }else{
  //   $('body').removeClass('compare-is-active');    
  // };
};
window.compare.db = sessionStorage.getItem('apx_window.compare_specs') ? JSON.parse(sessionStorage.getItem('apx_window.compare_specs')) : [];
window.compare.toggleItem = function(product){
  //console.log(product)
  if(!window.compare.db.find(el => el._id == product._id)){
    window.compare.db.push(product)
  }else{
    window.compare.db = [...window.compare.db.filter(el => el._id != product._id)]
  }
  sessionStorage.setItem('apx_window.compare_specs', JSON.stringify(window.compare.db))
  window.compare.updateList();
};
window.compare.inList = function(product){
  if(window.compare.db.find(el => el._id == product._id)){
    return true
  }
  return false

  
};
window.compare.updateList = function(){
  $(`.specs_compare-quantity`).text(window.compare.db.length)
  if(window.compare.db.length > 0){
    $('body').addClass('compare-is-active');    
  }else{
    $('body').removeClass('compare-is-active');    
  };
  $(`.specs_compare-product-list, .specs_compare-specs`).empty();
  window.compare.db.forEach((product, index) => {
      $('<div class="col-5 col-md"><div class="specs_compare-products-image"><button class="product-compare-remove" data=\''+JSON.stringify(product)+'\' type="button">x</button><img src="'+((product.image && product.image.length > 0 && product.image[0].zoom && product.image[0].zoom.url)   ? product.image[0].zoom.url : 'sem imagem') + '"/></div><span>'+ product.name +'</span></div>').appendTo('.specs_compare-product-list');
  });

  
  $.each(window.compare.extractSpecs(), function(k,i){
    //console.log(k,i)
    let r = $(`<div class="specs_row"><div class="row list"><div class="col-md-3 d-none d-md-block"><span class="spec_compare-specs-title">`+ (window.storefront.data.grids.find(el => el.grid_id == k).title || 'N/A') +`</span></div></div></div>`);
    $.each(i, function(k_, i_){
      
      r.find('.list').append(`<div class="col-md col-5"><span class="spec_compare-specs-value"><span class="d-md-none d-block">${(window.storefront.data.grids.find(el => el.grid_id == k).title || 'N/A')}</span>`+ i_ +`</span></div>`);
    });
    r.appendTo('.specs_compare-specs')
  });  
}

window.compare.extractSpecs = function(){
  const specsObj = {};

  window.compare.db.forEach((product, index) => {
      const productKey = `product_${index + 1}`;
      product.specs.forEach(spec => {
          if (!specsObj[spec.grid]) {
              specsObj[spec.grid] = {};
          }
          specsObj[spec.grid][productKey] = spec.text;
      });
      
      // Ensure every spec grid exists for each product
      Object.keys(specsObj).forEach(key => {
          if (!specsObj[key][productKey]) {
              specsObj[key][productKey] = "N/A";
          }
      });
  });

  // Ensure every product has a value for every spec grid
  Object.keys(specsObj).forEach(key => {
    window.compare.db.forEach((_, index) => {
          const productKey = `product_${index + 1}`;
          if (!specsObj[key][productKey]) {
              specsObj[key][productKey] = "N/A";
          }
      });
  });

  return specsObj;
};

if(window.location.pathname.includes(`equipamentos`)){
  setTimeout(() => {
    window.compare.init();
    window.compare.updateList();
  }, "1000");
  
}

  
// const $timers = $('.timer_');
// if ($timers.length) {
//   const formatTime_ = timeNumber => timeNumber.toString().padStart(2, '0')
//   $timers.each(function () {
//     const { end, maxHours } = $(this)[0].dataset
//     const diffSeconds = Math.min(
//       (new Date(end).getTime() - Date.now()) / 1000,
//       maxHours * 3600
//     )

//     if (diffSeconds > 0) {
//       let hours = Math.floor(diffSeconds / 3600)
//       const hoursAsSeconds_ = hours * 3600
//       let minutes = Math.floor((diffSeconds - hoursAsSeconds_) / 60)
//       let seconds = parseInt(diffSeconds - hoursAsSeconds_ - minutes * 60, 10)
//       const $timerCount_ = $(this).find('.timer__count')

//       const updateTimerCount_ = () => {
//         if (seconds > 0) {
//           seconds--
//         } else if (minutes > 0) {
//           minutes--
//           seconds = 59
//         } else if (hours > 0) {
//           hours--
//           seconds = minutes = 59
//         } else {
//           return clearInterval(stopwatch)
//         }
//         $timerCount_.html(`<span class="hh">${formatTime_(hours)}</span><span class="mm">${formatTime_(minutes)}</span><span class="ss">${formatTime_(seconds)}</span>`)
//       }
//       const stopwatch = setInterval(updateTimerCount_, 1000)
//       updateTimerCount_()
//     }
//   })
// }

const $timers = $('.timer_');
if ($timers.length) {
  const formatTime_ = timeNumber => timeNumber.toString().padStart(2, '0');
  $timers.each(function () {
    const { end } = $(this)[0].dataset;
    const diffSeconds = Math.max((new Date(end).getTime() - Date.now()) / 1000, 0);

    if (diffSeconds > 0) {
      let days = Math.floor(diffSeconds / (24 * 3600)); // Calcular dias
      const remainingSeconds = diffSeconds % (24 * 3600); // Calcular tempo restante em segundos
      let hours = Math.floor(remainingSeconds / 3600);
      const hoursAsSeconds_ = hours * 3600;
      let minutes = Math.floor((remainingSeconds - hoursAsSeconds_) / 60);
      let seconds = parseInt(remainingSeconds - hoursAsSeconds_ - minutes * 60, 10);
      const $timerCount_ = $(this).find('.timer__count');

      const updateTimerCount_ = () => {
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          seconds = minutes = 59;
        } else if (days > 0) { // Se houver dias, reduzir um dia
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          return clearInterval(stopwatch);
        }
        $timerCount_.html(`<span class="dd">${formatTime_(days)}</span><span class="hh">${formatTime_(hours)}</span><span class="mm">${formatTime_(minutes)}</span><span class="ss">${formatTime_(seconds)}</span>`);
      };
      const stopwatch = setInterval(updateTimerCount_, 1000);
      updateTimerCount_();
    }
  });
}


$("body").on("submit", "#apx_newsletter", function (e) {
  e.preventDefault();
  let form = $(this);
  let mail = form.find('[type="email"]');
  let name = form.find('[type="text"]');
  //detecta se mail é email de forma consistente
  if(name.val().length < 3){
    alert("Por favor, insira seu nome completo.");
    return;
  }
  if (!mail.val().includes("@") || !mail.val().includes(".")) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }
  
  
  axios
    .post(
      "https://us-central1-marketingtools-ecomplus.cloudfunctions.net/app/alpix/apx_newsletter",
      {
        storeId: storefront.settings.store_id,
        mail: mail.val(),
        fullname: name.val(),   
      }
    )
    .then(
      function (response) {
        alert(response.data.msg);
        mail.val("");
        name.val("");
      },
      function (error) {
        alert(error);
      }
    );
});