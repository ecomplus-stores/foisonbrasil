import {
  i19addToCart,
  i19close,
  i19next,
  i19previous,
  i19quantity,
  i19selectVariationMsg,
  i19item,
  i19minQuantity,
  i19maxQuantity
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  img as getImg,
  randomObjectId as genRandomObjectId
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import Glide from '@glidejs/glide'
import APicture from '@ecomplus/storefront-components/src/APicture.vue'
import ProductVariations from '@ecomplus/storefront-components/src/ProductVariations.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
import {
  formatMoney
} from '@ecomplus/utils'
export default {
  name: 'KitProductVariations',

  components: {
    ALink,
    AAlert,
    APicture,
    APrices,
    ProductVariations
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: Number,
    maxOptionsBtns: {
      type: Number,
      default: 10
    },
    slug: String,
    buyText: String,
    kitProductId: String,
    kitName: String,
    kitPrice: Number,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    glideOptions: {
      type: Object,
      default () {
        return {
          type: 'slider',
          autoplay: false,
          rewind: false
        }
      }
    }
  },

  data () {
    return {
      glide: null,
      activeIndex: 0,
      selectedVariationId: null,
      variationKit: [],
      variationKitReady: [],
      alertVariant: 'warning'
    }
  },

  computed: {
    i19addToCart: () => i18n(i19addToCart),
    i19close: () => i18n(i19close),
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),
    i19quantity: () => i18n(i19quantity),
    i19item: () => i18n(i19item),
    i19minQuantity: () => i18n(i19minQuantity),
    i19maxQuantity: () => i18n(i19maxQuantity),

    localItems () {
      const products = []
      for (let index = 0; index < this.items.length; index++) {
        if (this.items && this.items.length === this.min) {
          const itemObject = Object.assign({}, this.items[index])
          itemObject.key = genRandomObjectId()
          products.push(itemObject)
        } else {
          for (let i = 0; i < this.min; i++) {
            const itemObject = Object.assign({}, this.items[index])
            itemObject.key = genRandomObjectId()
            products.push(itemObject)
          }
        }
      }
      return products
    }

  },

  methods: {
    totalQuantity () {
      let total = 0
      this.items.forEach(item => {
        total += item.quantity        
      })
      return total
    },
    getImg,
    getName,
    checkInStock (item) {
      const maxQuantity = item.max_quantity
      return typeof maxQuantity === 'number' && maxQuantity >= 0
        ? maxQuantity
        : 9999999
    },
    formatPrice (price) {      
      return formatMoney(price)      
    },
    moveSlider (index) {
      this.activeIndex = index
      if (this.glide) {
        this.glide.go('=' + index)
      }
    },


    buy () {
      this.alertVariant = 'warning'
      if (this.variationKit.length === this.min) {
        if (this.max === undefined || this.variationKitReady.length <= this.max) {
          const items = []
          const composition = []
          this.variationKitReady.forEach(variationId => {
            const product = this.items.find(item => {
              if(item.variations){
                const variation = item.variations.find(variation => variation._id === variationId)
               
                  items.push({
                    ...item,
                    ...variation,
                    variation_id: variation._id
                  })
                  return item
                
              }  
            })
            if (product) {
              composition.push({
                _id: product.product_id,
                variation_id: variationId,
                quantity: 1
              })
            }
          })
          console.log(this.items, items)
          this.items.forEach(item => {
            if(!items.find(el => el.product_id == item.product_id)){
              items.push(item)
            }
          })

          console.log('finalItems', items)
          items.forEach(item => {
            const newItem = { ...item, quantity: 1 }
            delete newItem.customizations
            if (this.kitProductId) {
              newItem.kit_product = {
                _id: this.kitProductId,
                name: this.kitName,
                pack_quantity: 1,
                price: this.kitPrice,
                composition
              }
            }
            if (this.slug) {
              newItem.slug = this.slug
            }
            if (this.canAddToCart) {
              console.log('adddddd',newItem)
              ecomCart.addItem(newItem)
            }
          })
          this.$emit('buy', { items })
        }
      }
    }
  },

  watch: {
    
    selectedVariationId (current) {
      if (current && this.activeIndex >= 0 && (this.variationKitReady.length < this.min || this.variationKit[this.activeIndex])) {
        this.variationKit[this.activeIndex] = current
        this.variationKitReady = this.variationKit.filter(n => n)
        this.$emit('variation', {index: this.activeIndex, variation : this.variationKitReady})
        //console.log(this.variationKitReady)
      }
    }
  },

  mounted () {
   console.log(this.localItems.filter(item => item.variations !== undefined))
  },

  beforeDestroy () {
   
  }
}