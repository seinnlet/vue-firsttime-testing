<template>
	
	<div>

		<h2>{{item.item_name}}</h2>
		<div class="container">
			<div class="row">
				<div class="col-lg-4 text-center px-5 px-lg-3 mt-5">
					
					<img :src="item.item_photo" class="img-fluid shadow">

				</div>
				<div class="col-lg-8 mt-5 px-2 px-lg-5 text-left">
					
					<h6 class="font-weight-bold">
						{{ item.item_brand.brand_name }}
						<img :src="item.item_brand.brand_photo" width="100" class="shadow-sm ml-3 px-2">
					</h6>
					<p>
						{{ item.item_subcategory.category.category_name }} - {{ item.item_subcategory.subcategory_name }}
					</p>
					<p class="my-4">
						<span class="text-price" v-if="item.item_discount != 0">{{ discountPrice | currency }}</span>
						<span class="text-price" v-else>{{ item.item_price | currency }}</span>

						<span class="text-muted ml-3" v-if="item.item_discount != 0"><del> {{ item.item_price | currency }} </del> <span class="ml-2 text-warning">({{ item.item_discount }}% OFF!)</span></span>
					</p>

					<!-- plus minus input -->
					<div class="div-plusminus">
						<button class="btn btn-sm ripple" @click="minusQty"><b-icon icon="dash" aria-hidden="true"></b-icon></button>
						<input type="number" v-model="qty"  >
						<button class="btn btn-sm ripple" @click="addQty"><b-icon icon="plus" aria-hidden="true"></b-icon></button>
					</div>
					<button class="btn btn-success ml-5 btn-addtocart px-4" @click="addToCart()"><b-icon icon="cart2" aria-hidden="true"></b-icon> Add to Cart</button>

					<hr class="mt-5">
					<h6 class="text-secondary font-weight-bold mt-4">About this item: </h6>
					<p>
						{{ item.item_description }}
					</p>

					<div class="text-right mt-5">
						<button @click="goBack()" class="btn btn-link link-green"> <b-icon icon="chevron-left" aria-hidden="true" style="font-size:0.9rem"></b-icon> Go Back</button>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script type="text/javascript">

  import ItemService from '@/services/ItemService.js';

  export default{
    data (){
      return {
      	qty: 1,
        item: {
        	item_subcategory: {category: {} },
        	item_brand: {}
        },
        discountPrice:null,
      }
    },
    created() {
      let id = this.$route.params.id;
        ItemService.getItem(id)
            .then(res => {
              this.item = res.data.item 

              if (res.data.item.item_discount != 0) {
              	this.discountPrice = this.item.item_price - (this.item.item_price * this.item.item_discount/100);
              }

            })
            .catch(err => {
              console.log('There was an error:',err.response)
            })
    },
    watch: {
    	qty(value) {
    		this.qty = value;
    		this.validateQty(value);
    	}
    },
    methods:{
    	goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      minusQty() {
      	if (this.qty > 1) {
	      	--this.qty;
      	}
      },
      addQty() {
      	if (this.qty < 10) {
	      	++this.qty;
	      }
      },
      validateQty(value) {
      	if (value < 1) {
      		this.qty = 1;
      	}
      	if (value > 10) {
      		this.qty = 10;
      	}
      },
      addToCart() {

      	let myitem = {};
        if(this.item.item_discount != 0) {
          myitem = { id:this.item.item_id, name:this.item.item_name, price:this.discountPrice, qty:this.qty };
        } else {
          myitem = { id:this.item.item_id, name:this.item.item_name, price:+this.item.item_price, qty:this.qty };
        }
        this.$store.dispatch('addToCart', myitem)

      }
    }
  };
</script>

<style scoped>

	.text-price {
	  color: #42b983;
	  font-size: 1.4em;
	  font-weight: bold;
	}
	.link-green {
		color: #42b983;
	}
	.link-green:hover {
		color: #008600;
	}

	/* plus minus */
	.div-plusminus {
		display: inline-block;
	}
	.div-plusminus input::-webkit-outer-spin-button,
	.div-plusminus input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
	}

	.div-plusminus input[type=number] {
	  -moz-appearance: textfield;
	}

	.div-plusminus input {
		border: none;
		outline: none;
		width: 60px;
		text-align: center;
		padding: 0.25rem 0.5rem;
		margin-left: 5px;
		margin-right: 5px;
	}

	.div-plusminus .btn {
		background-color: #f7f7f7;
	}

	.btn-addtocart {
	  color: #f7f7f7;
	  background-image: linear-gradient(15deg, #42b983 0%, #80d0c7 100%);
	  border: none;
	  transition: background-image .3s ease;
	}
	.btn-addtocart:hover {
	  background-image: linear-gradient(30deg, #42b983 80%, #80d0c7 100%);
	}

	.ripple {
	  background-position: center;
	  transition: background 0.8s;
	}
	.ripple:hover {
	  background: #f7f7f7 radial-gradient(circle, transparent 1%, #f7f7f7 1%) center/15000%;
	}
	.ripple:active {
	  background-color: #ddd;
	  background-size: 100%;
	  transition: background 0s;
	}
	.ripple:focus {
		box-shadow: none !important;
	}

</style>