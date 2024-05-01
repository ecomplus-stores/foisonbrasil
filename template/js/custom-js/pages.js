const EcomPassport = require('@ecomplus/passport-client')

const search = new EcomSearch()

let mouseDown = false;
let startX, scrollLeft;
const sliders = document.querySelectorAll('.breakline-false');

sliders.forEach(slider => {
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mousemove', move, false);
});

window.addEventListener('mouseup', stopDragging, false);
window.addEventListener('mouseleave', stopDragging, false);

function startDragging(e) {
  mouseDown = true;
  startX = e.pageX - this.offsetLeft;
  scrollLeft = this.scrollLeft;
}

function stopDragging() {
  mouseDown = false;
}

function move(e) {
  if (!mouseDown) return;
  const x = e.pageX - this.offsetLeft;
  const scroll = x - startX;
  this.scrollLeft = scrollLeft - scroll;
}

window.whatsappRedirect = function(type){
  alert(type)
}

$(document).ready(function(){
  if($('.page--categories .category-banner').length > 0 && $(`.page--categories .category-description`).length > 0){
    $('.page--categories .category-banner, .page--categories .category-description, .page--categories .page-title').wrapAll('<div id=category_heading_box></div>');
    $(`.page--categories .category-description, .page--categories .page-title`).wrapAll('<div></div>');
  }
  if(window.innerWidth > 990){
    $('.products-carousel__list').addClass('owl-carousel')
    $('.products-carousel__list').owlCarousel({
      loop:true,
      margin:20,
      responsiveClass:true,
      
      responsive:{
          0:{
              items:2,
              nav:false,
              stagePadding:0,
              margin:15
          },
          600:{
              items:3,
              nav:false
          },
          1000:{
              items:5,
              dots:false,
              nav:false,
              loop:true
          }
      }
    });
    
  }else{
    
  }
  

  $('body').css('--header-vh-main', ($('header#header').innerHeight()) + 'px');

  //adiciona nome do usuário aos elementos username
  const client = EcomPassport.ecomPassport.getCustomer();   
  $('[username]').text(client.display_name || `Visitante` )

  placeFavoritesAside();
});

$('body').on('click','#wishlist-button, .favorites__aside  .apx-side-heading button, #m-toggleFavorites', function(){
  $('#favorites-quickview').toggleClass('visible')
  $(`#m-toggleFavorites`).toggleClass(`active`)
});

$('body').on('click','.product-card__favorite-remove', function(){
  toggleFavoriteFront(this);
});

$('body').on('click','.product-card__favorite', function(){
  placeFavoritesAside();
})


async function placeFavoritesAside(){
  $(`.favorites__body`).empty();
  try {
    const { favorites } = await EcomPassport.ecomPassport.getCustomer();    
    search.setProductIds(favorites).fetch().then(result => {
      $.each(result.hits.hits, function(k,i){
        let item = i._source;
        $(`<div class="row item"><div class=col-12><div class="favorite-list product-card"data-sku=${item.sku} data-product-id=${item._id}><section><a class=product-card__link href=/${item.slug} title=${item.name}><div class=product-card__pictures><img alt="${item.pictures ? item.pictures[0].normal.alt : ''}"src="${item.pictures ? item.pictures[0].normal.url : '/assets/img-placeholder.png'}"></div></a><div class=product-card__content-group><div class='row align-items-start'><div class=col><a class=product-card__link href=/${item.slug} title=${item.name}><h3 class=product-card__name>${item.name}</h3></a></div><div class=col-auto><button class="btn product-card__favorite-remove"aria-label="Remover dos favoritos"><svg fill=none height=16 viewBox="0 0 16 16"width=16 xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_21_6728)><path d="M5.33331 8.00004H10.6666M14.6666 8.00004C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00004C1.33331 4.31814 4.31808 1.33337 7.99998 1.33337C11.6819 1.33337 14.6666 4.31814 14.6666 8.00004Z"stroke=#666666 stroke-linecap=round stroke-linejoin=round /></g><defs><clipPath id=clip0_21_6728><rect fill=white height=16 width=16 /></clipPath></defs></svg></button></div></div><div class="prices product-card__prices "><span class='prices__compare ${item.base_price ? '' : 'd-none'}'><s>${item.base_price ? (item.currency_symbol + ' ' +item.base_price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})) : ''}</s> </span><strong class=prices__value>${item.currency_symbol} ${item.price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})}</strong></div><div class="fade product-card__buy"><button class="btn btn-primary btn-sm"data-id=${item._id} type=button>Adicionar ao Carrinho</button></div></div></section><div></div></div></div>`).appendTo(`.favorites__body`);
      });      
    })
    
  }catch(e){
    console.log(e)
  }
}

async function toggleFavoriteFront(el){
  try {
    let productId = $(el).attr('data-id');
    const { favorites } = await EcomPassport.ecomPassport.getCustomer();   
    const favIndex = favorites.indexOf(productId)
    favorites.splice(favIndex, 1) 
    EcomPassport.ecomPassport.requestApi('/me.json', 'patch', { favorites })
    $(el).closest('.item').remove();
    
  }catch(e){
    console.log(e)
  }
}
