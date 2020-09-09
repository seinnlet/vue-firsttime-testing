<template>
  <div class="card border-0 shadow div-product">
    <router-link :to="{ name: 'item-detail', params: { id: item.item_id }}">
      <div class="card-body py-1">
        <div class="img-wrap text-center py-0 py-lg-3">
          <img :src="item.item_photo" class="img-fluid w-75">
        </div>

        <div class="module line-clamp">
          <h6 class="card-title">{{ item.item_name }}</h6>
        </div>
      </div>

      <div class="div-price">
        <p class="card-text mb-0" v-if="item.item_discount != 0"> 
          {{ discountPrice | currency }} <br>
          <span class="text-muted"><small><del class="pr-2">{{ item.item_price | currency }}</del>(-{{ item.item_discount }}%)</small></span>
        </p>
        <p class="card-text mb-0" v-else> 
          {{ item.item_price | currency }}
        </p>
      </div>
    </router-link>

      <div class="card-footer bg-white">
        <button class="btn btn-success btn-block btn-addtocart" @click="addToCart()"><span class="mr-1 mb-2"><b-icon icon="cart2" aria-hidden="true"></b-icon></span> Add to Cart</button>
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

<style scoped>

.div-product a {
  text-decoration: none;
  color: #222;
}
.div-product .img-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.div-product .img-wrap img {
  left: 50%;
  top: 50%; 
  transform: translate(-50%,-50%); 
  position: absolute; 
  z-index: 1
}
.div-product .module {
  width: 100%;
  height: 40px;
  margin: 0 0 0.6em 0;
  overflow: hidden;
}
.div-product .module .card-title {
  margin: 0;
  line-height: 20px;
  font-size: .9rem;
}
.div-product .module .card-title:hover {
  text-decoration: underline;
}
.div-product .line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}
.div-product .card-text, .text-price {
  color: #42b983;
  font-size: 1em;
  font-weight: bold;
}
.div-product .div-price {
  height: 55px;
}
.div-product {
  transition: all .3s ease;
}
.div-product:hover {
  box-shadow: 0 .5rem 1rem rgba(52, 58, 64, 0.4)!important;
}
.div-product:hover .img-wrap {
  opacity: 0.8;
}
.div-product .btn-addtocart {
  color: #f7f7f7;
  background-image: linear-gradient(15deg, #42b983 0%, #80d0c7 100%);
  border: none;
  transition: background-image .3s ease;
  font-size: 0.9rem;
}
.div-product .btn-addtocart:hover {
  background-image: linear-gradient(30deg, #42b983 80%, #80d0c7 100%);
}

</style>