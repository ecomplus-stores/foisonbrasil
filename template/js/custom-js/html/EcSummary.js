import {
  i19balanceOrPoints,
  i19buyer,
  i19contactPhone,
  i19discount,
  i19docNumber,
  i19freebie,
  i19freight,
  i19myAccount,
  i19subtotal,
  i19summary,
  i19toPay,
  i19total
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  price as getPrice,
  img as getImg,
  phone as getPhone,
  formatMoney
} from '@ecomplus/utils'

import ALink from '#components/ALink.vue'
import APicture from '#components/APicture.vue'
import APrices from '#components/APrices.vue'
import ItemCustomizations from '#components/ItemCustomizations.vue'
import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'

export default {
  name: 'EcSummary',

  components: {
    ALink,
    APicture,
    APrices,
    ItemCustomizations,
    CartItem,
  },

  props: {
    amount: {
      type: Object,
      required: true
    },
    items: Array,
    buyer: Object,
    shippingAddress: Object,
    canShowPriceOptions: Boolean,
    paidInAdvance: {
      type: Number,
      default: 0
    }
  },

  computed: {
    i19balanceOrPoints: () => i18n(i19balanceOrPoints),
    i19buyer: () => i18n(i19buyer),
    i19contactPhone: () => i18n(i19contactPhone),
    i19discount: () => i18n(i19discount),
    i19docNumber: () => i18n(i19docNumber),
    i19freebie: () => i18n(i19freebie),
    i19freight: () => i18n(i19freight),
    i19myAccount: () => i18n(i19myAccount),
    i19subtotal: () => i18n(i19subtotal),
    i19summary: () => i18n(i19summary),
    i19toPay: () => i18n(i19toPay),
    i19total: () => i18n(i19total),

    amountToPay () {
      return this.amount.total - this.paidInAdvance
    },

    buyerName () {
      if (!this.buyer || !this.buyer.name) {
        return ''
      }
      const { name } = this.buyer
      return `${name.given_name} ${(name.middle_name || '')} ${name.family_name}`
    },

    buyerPhone () {
      const phone = getPhone(this.buyer)
      if (phone && /000\d{2}/.test(phone)) {
        return phone.replace('000', '***')
      }
      return phone
    },

    uniqueKitProducts(){
      const uniqueKitIds = new Set();
      let i = this.items.filter(item => {
        if (item.kit_product) {
          if (!uniqueKitIds.has(item.kit_product._id)) {
            uniqueKitIds.add(item.kit_product._id);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      return i
    },
    nonKitProducts(){
       return this.items.filter(item => !item.kit_product);    }
  },

  methods: {
    getName,
    getPrice,
    formatMoney,
    getImg: item => getImg(item, null, 'small')
  },


  created(){
    //console.log(this.uniqueKitProducts)
    //console.log(this.nonKitProducts)
    //console.log(this.items)
  }
}