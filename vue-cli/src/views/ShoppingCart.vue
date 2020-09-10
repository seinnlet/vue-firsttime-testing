<template>
	
	<div>
		<h2>Shopping Cart</h2>
		<div class="container my-5">

			<section v-if="orderDone" class="my-3">
				<div class="shadow text-success py-5 animate__animated animate__zoomIn animate__fast w-75 mx-auto rounded">
	      	<div class="mr-2 animate__animated animate__heartBeat"><b-icon icon="check2-circle" aria-hidden="true" font-scale="3"></b-icon></div> 
		      <h5 class="font-weight-bold mt-3">
			      Order Completed Successfully!
			    </h5>
				</div>
		    <p class="mt-5">
		    	<router-link :to="{name:'order-list'}" class="btn btn-outline-secondary px-4">View Order List</router-link>
		    </p>
		     <!-- </transition> -->
	    </section>
	    <section v-else>
	    	<transition mode="out-in" enter-active-class="animate__animated animate__fadeInUp animate__faster">
					<div v-show="!cart.length">
						<p class="mb-4"><i>Please add some products to shopping cart.</i></p>
						<router-link :to="{name:'item-list'}" class="btn btn-success btn-green px-4">View All Items</router-link>
					</div>
				</transition>
				
				<transition mode="out-in" enter-active-class="animate__animated animate__fadeInUp animate__faster">
					<div class="row" v-show="cart.length">
						<div class="col-lg-8">
							
							<div class="table-responsive mb-4">
								<table class="table table-edited table-padding-edited">
									<thead>
										<tr>
											<th>No.</th>
			                <th>Name</th>
			                <th>Unit_Price</th>
			                <th>Qty</th>
			                <th>Sub_Total</th>
			                <th></th>
										</tr>
									</thead>
									<transition-group tag="tbody" enter-active-class="animate__animated animate__flipInX animate__faster" leave-active-class="animate__animated animate__flipOutX animate__faster">
										<tr v-for="(item,index) in cart" :key="item.id">
			                <td>{{++index}}.</td>
			                <td><em>{{item.name}}</em></td>
			                <td>{{item.price | currency}}</td>
			                <td style="min-width:120px">
			                  <button class="btn btn-qty ripple" @click="decreaseQty(item.id)"><b-icon icon="dash" aria-hidden="true"></b-icon></button>
			                  <span class="span-qty">{{item.qty}}</span>
			                 <button class="btn btn-qty ripple" @click="increaseQty(item.id)"><b-icon icon="plus" aria-hidden="true"></b-icon></button>
			                </td>
			                <td>{{(item.price*item.qty) | currency}}</td>
			                <td>
			                	<button class="btn btn-remove rounded-circle" @click="removeFromCart(item.id)" title="Remove"><b-icon icon="x" aria-hidden="true"></b-icon></button>
			                </td>
			              </tr>
									</transition-group>
								</table>
							</div>

							<textarea placeholder="Add any comment to your order..." class="form-control" rows="4" v-model="note"></textarea>

							<p class="my-5 text-left">
								<router-link :to="{name:'item-list'}" class="link-green font-weight-bold">Continue Shopping <b-icon icon="arrow-right-short" aria-hidden="true"></b-icon></router-link>
							</p>

						</div>
						<div class="col-lg-4">
							
							<div class="bg-light p-4 text-left div-ordersummary">
								<h6 class="font-weight-bold">ORDER SUMMARY</h6>
								<hr>
								<div class="float-left">Total Items: {{ cartqty }}</div>
								<div class="float-right">{{ cartamount | currency }}</div>
								<div class="clearfix mb-3"></div>
								<div class="float-left">Tax:</div>
								<div class="float-right">{{ tax | currency }}</div>
								<div class="clearfix"></div>

								<p class="mt-4 mb-2"><strong>SHIPPING</strong></p>

								<select v-model="selectedShippingOption" class="form-control mb-3">
		              <option disabled value="">Please select an option</option>
		              <option
		                v-for="option in shippingOptionsArray"
		                :key="option.text"
		                :value="{ method: option.text, rate: option.rate }">
		                {{ option.text }}
		              </option>
		            </select>

		            <div class="float-left">Shipping Fees:</div>
								<div class="float-right">{{ shippingfees | currency }}</div>
								<div class="clearfix"></div>
		            
		            <hr class="my-4">

		            <div class="float-left font-weight-bold">Total Amount:</div>
		            <transition
		              mode="out-in"
		              enter-active-class="animate__animated animate__heartBeat animate_faster"
		            >
			            <div class="float-right font-weight-bold" v-if="total" :key="total">
										<big>{{ total | currency }}</big>
									</div>
								</transition>
								<div class="clearfix mb-3"></div>

								<div class="my-4">
									<button :disabled="!this.selectedShippingOption" class="btn btn-gradient-green btn-block" @click="order()"><big>Check Out</big></button>
								</div>

							</div>

						</div>
					</div>
				</transition>
			</section>
		</div>

	</div>

</template>

<script type="text/javascript">
	import OrderService from '@/services/OrderService.js'
	
	export default {
		data(){
      return{
        note: '',
        selectedShippingOption: '',
        orderDone: 0,
        shippingOptionsArray: [
          {
            text: 'Standard (3-4 days)',
            rate: 2000,
          },
          {
            text: 'Express (1-2 days)',
            rate: 4000,
          },
          {
            text: 'Pick up at Store',
            rate: 0,
          }
        ],
        salesTax: 0.05,
      }
    },
		computed: {
		  cart() {
		    return this.$store.state.cart;
		  },
		  cartamount() {
		  	return this.$store.getters.cartTotalPrice;
		  },
		  cartqty() {
		  	return this.$store.getters.cartTotalQty;
		  }, 
		  tax() {
		  	return this.$store.getters.cartTotalPrice * this.salesTax;
		  }, 
		  shippingfees() {
		  	if (this.selectedShippingOption) {
		  		// console.log(this.selectedShippingOption.method)
		  		return this.selectedShippingOption.rate
		  	}
		  	return '';
		  },
		  total() {
        if (this.selectedShippingOption) {
          return this.cartamount + this.shippingfees + this.tax;
        }
        return '';
      },
		},
		methods: {
      removeFromCart(itemId) {
        this.$store.dispatch('removeFromCart', itemId)
      }, 
      increaseQty(itemId) {
      	this.$store.dispatch('increaseQty', itemId)
      }, 
      decreaseQty(itemId) {
      	this.$store.dispatch('decreaseQty', itemId)
      },
      order(){
        let data = {cart_data: JSON.stringify(this.$store.state.cart),
                  note: this.note, shippingmethod: this.selectedShippingOption.method, shippingfees: this.shippingfees, totalamount: this.total};

        OrderService.createOrder(data)
        .then(response => {
          console.log(response)
          localStorage.clear();
          this.orderDone = 1;
          this.$store.dispatch('getData')
        })
        .catch(error => {
          console.log('There was an error:',error.response)
        })
      }
    }
	};

</script>
