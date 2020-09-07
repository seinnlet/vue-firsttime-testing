<template>
	
	<div>

		<h2>{{item.item_name}}</h2>
		<div class="container">
			<div class="row">
				<div class="col-lg-4 text-center px-5 px-lg-3 mt-5">
					
					<img :src="item.item_photo" class="img-fluid shadow">

				</div>
				<div class="col-lg-8 mt-5 px-5 text-left">
					
					<h6 class="font-weight-bold">
						{{ item.item_brand.brand_name }}
						<img :src="item.item_brand.brand_photo" width="100" class="shadow-sm ml-3 px-2">
					</h6>
					<p>
						{{ item.item_subcategory.category.category_name }} - {{ item.item_subcategory.subcategory_name }}
					</p>
					<p class="mt-4">
						<span class="text-price" v-if="item.item_discount != 0">Ks.{{ discountPrice }}</span>
						<span class="text-price" v-else>Ks.{{ item.item_price }}</span>

						<span class="text-muted ml-3" v-if="item.item_discount != 0"><del> Ks.{{ item.item_price }} </del> <span class="ml-2 text-warning">({{ item.item_discount }}% OFF!)</span></span>
					</p>
					<hr>
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
        item: {
        	item_subcategory: {category: {} },
        	item_brand: {}
        },
        discountPrice:null,
      }
    },
    mounted(){
      this.getDetail();
    },
    methods:{
    	goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      getDetail() {

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

</style>