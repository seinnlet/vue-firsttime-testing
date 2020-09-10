<template>
  <div class="card border-0 shadow div-product">
    <router-link :to="{ name: 'item-detail', params: { id: item.item_id }}">
      <div class="card-body py-1 py-md-3">
        <span class="discount-tag" v-if="item.item_discount != 0">{{ item.item_discount }}% OFF</span>
        <div class="img-wrap text-center py-lg-3">
          <img :src="item.item_photo" class="img-fluid w-75">
        </div>

        <div class="module line-clamp mt-0 mt-md-3 mt-xl-0">
          <h6 class="card-title">{{ item.item_name }}</h6>
        </div>
      </div>

      <div class="div-price">
        <p class="card-text mb-0" v-if="item.item_discount != 0"> 
          {{ discountPrice | currency }} <br>
          <span class="text-muted"><small>From {{ item.item_price | currency }}</small></span>
        </p>
        <p class="card-text mb-0" v-else> 
          {{ item.item_price | currency }}
        </p>
      </div>
    </router-link>

      <div class="card-footer bg-white">
        <button class="btn btn-block btn-gradient-green" @click="addToCart()"><span class="mr-1 mb-2"><b-icon icon="cart2" aria-hidden="true"></b-icon></span> Add to Cart</button>
      </div>

  </div>
</template>

<script type="text/javascript">
  export default{
    props:{
      item: Object
    },
    data() {
      return {
        discountPrice:null,
      };
    },
    mounted(){
      this.calculateDiscount();
    },
    methods:{
      calculateDiscount(){
        if(this.item.item_discount != 0) {
          this.discountPrice = this.item.item_price - (this.item.item_price * this.item.item_discount/100);
        }
      },
      addToCart() {
        let myitem = {};
        if(this.item.item_discount != 0) {
          myitem = { id:this.item.item_id, name:this.item.item_name, price:this.discountPrice, qty:1 };
        } else {
          myitem = { id:this.item.item_id, name:this.item.item_name, price:+this.item.item_price, qty:1 };
        }
        this.$store.dispatch('addToCart', myitem)
      }
    }
  };
</script>
