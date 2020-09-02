// components
Vue.component('product', {
	props: {
		premium: {
			type: Boolean, 
			required: true
		}
	},
	template: ` 

		<div class="container product py-5">
			<div class="row mb-4">
				
				<div class="col-md-4 mb-4">
					<div class="product-image shadow p-5">
						<img :src="image" class="img-fluid">	
						<!-- v-bind - binds an attribute to an expression -->
					</div>
				</div>

				<div class="col-md-8">
					<div class="product-info px-4">
						<h2>{{ title }}</h2>	<!-- computed properties -->

						<!-- conditional rendering -->
						<p v-if="inventory > 10">In Stock</p>
						<p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
						<p v-else>Out of Stock</p>
						<!-- v-show only changes with display:none -->
						<p>Shipping: {{shipping}}</p>

						<!-- list rendering -->
						<ul>
							<li v-for="detail in details">{{ detail }}</li>
						</ul>

						<!-- style binding -->
						<div v-for="(variant, index) in variants" 
									:key="variant.variantId"
									class="color-box"
									:style="{backgroundColor: variant.variantColor}"
									@mouseover="updateProduct(index)"
									:title="variant.variantColor">
						</div>

						<!-- event handling -->
						<div class="mt-4">
							<button @click="addToCart" class="btn btn-dark" 
											:disabled="inventory == 0"
											:class="{ disabled: inventory == 0 }">Add to Cart</button>
							<button @click="removeFromCart" class="btn btn-outline-dark">Remove from Cart</button>
						</div>
					</div>
				</div>

			</div>

			<h3 class="my-3">Reviews</h3>
			<p v-if="!reviews.length">There are no reviews yet.</p>
			<ul>
				<li v-for="review in reviews">
					{{ review.name }} Rating: {{ review.rating }} <br>
					{{ review.review }}
				</li>
			</ul>
			<product-review @review-submitted="addReview"></product-review>
		</div>

	`, 
	data() {
		return {
			brand: 'MSI', 
	  	product: 'Prestige 14', 
	  	// image: 'img/white.jpg',
	  	selectedVariant: 0,
	  	// inventory: 0,
	  	details: ["14 inches Fhd", "Nvidia GeForce GTX1650", "Core i5-10210u"], 
	  	variants: [
	  		{
	  			variantId: 1, 
	  			variantColor: 'White', 
	  			variantImage: 'img/white.jpg',
	  			variantQuantity: 11
	  		},
	  		{
	  			variantId: 2, 
	  			variantColor: 'Grey',
	  			variantImage: 'img/grey.jpg',
	  			variantQuantity: 8
	  		},
	  		{
	  			variantId: 3, 
	  			variantColor: 'Pink',
	  			variantImage: 'img/pink.jpg',
	  			variantQuantity: 0
	  		}
	  	], 
	  	reviews: []
	  }
	}, 
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    }, 
    removeFromCart() {
    	this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {		// short hand
    	this.selectedVariant = index
    	// console.log(index)
    },
    addReview(productReview) {
    	this.reviews.push(productReview)
    }
  }, 
  computed: {
    title () {
      return this.brand + ' ' + this.product
    }, 
    image() {
    	return this.variants[this.selectedVariant].variantImage
    }, 
    inventory() {
    	return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
    	if (this.premium) {
    		return "Free"
    	} else {
    		return "$2.99"
    	}
    }
	}
})

// v-model
Vue.component('product-review', {
	template: ` 
		<form class="review-form" @submit.prevent="onSubmit">
			<div class="row mb-4">
				<label class="col-2 col-form-label">Name: </label>
				<div class="col-10">
					<input id="name" v-model="name" class="form-control">
				</div>
			</div>	

			<div class="row mb-4">
				<label class="col-2 col-form-label">Review: </label>
				<div class="col-10">
					<textarea id="review" v-model="review" class="form-control"></textarea>
				</div>
			</div>	

			<div class="row mb-4">
				<label class="col-2 col-form-label">Rating: </label>
				<div class="col-10">
					<select id="rating" v-model.number="rating" class="form-control">
						<option>5</option>
						<option>4</option>
						<option>3</option>
						<option>2</option>
						<option>1</option>
					</select>
				</div>
			</div>	

			<div class="row mb-4">
				<div class="offset-2 col-10">
					<button class="btn btn-info" type="submit">Submit</button>
				</div>
			</div>

		</form>
	`, 
	data() {
		return {
			name: null, 
			review: null, 
			rating: null
		}
	},
	methods: {
	  onSubmit () {
	    let productReview = {
	    	name: this.name, 
	    	review: this.review, 
	    	rating: this.rating
	    }
	    this.$emit('review-submitted', productReview)
	    this.name = null
	    this.review = null 
	    this.rating = null
	  }
	}
})

var app = new Vue({

  el: "#app", 
  data: {
  	premium: true,
	 	cart: []
  }, 
  methods: {
    updateCart (id) {
      this.cart.push(id)
    },
    removeItem (id) {
    	for(var i = this.cart.length - 1; i >= 0; i--) {
    		if (this.cart[i] == id) {
    			this.cart.splice(i, 1)
    		}
    	}
    }
  }

})


