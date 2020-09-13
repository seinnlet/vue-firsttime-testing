<template>
	
	<div>
		<h2>Order Detail</h2>

		<div class="container py-5">
				
			<div class="shadow p-5">
				
				<div class="row text-left table-heading">
					<div class="col-lg-6 mb-4">
						<strong>Voucher No :</strong> <span class="text-green font-weight-bold">V-{{ order.order_voucherno }}</span><br>
						<strong>Ordered By :</strong> {{ order.order_user.user_name }}<br>
						<strong>Order Date :</strong> {{ order.created_at | formatDate }}
					</div>
					<div class="col-lg-6 mb-4">
						<strong>Shipping Method</strong> : {{ order.order_shippingmethod }}<br>
						<strong>Shipping Fees</strong> : {{ order.order_shippingfees | currency }}<br>
						<strong>Total Amount</strong> : {{ order.order_totalamount | currency }}
					</div>
				</div>
				<div class="table-responsive mt-2">
					<table class="table table-edited table-bordered">
						<thead>
							<tr>
								<th>No.</th>
								<th>Item</th>
								<th>Unit_Price</th>
								<th>Qty</th>
								<th class="td-right">Sub_Total</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in order.order_items" :key="index">
								<td>{{ ++index }}.</td>
								<td>{{ item.item_name }}</td>
								<td>{{ item.item_price | currency }}</td>
								<td>{{ item.qty }}</td>
								<td class="td-right">{{ (item.item_price * item.qty) | currency }}</td>
							</tr>
							<tr>
								<td rowspan="4" colspan="3" style="vertical-align: top;">Note: <em>{{ order.order_note }}</em></td>
								<td><strong>Total:</strong></td>
								<td class="td-right"><strong> {{ total | currency }} </strong></td>
							</tr>
							<tr>
								<td><strong>Tax: </strong>(5%)</td>
								<td class="td-right">{{ tax | currency }}</td>
							</tr>
							<tr>
								<td><strong>Shipping Fees:</strong></td>
								<td class="td-right">{{ order.order_shippingfees | currency }}</td>
							</tr>
							<tr>
								<td><strong>Grand Total:</strong></td>
								<td class="td-right">
									<span class="text-green font-weight-bold h6">
										{{ order.order_totalamount | currency }}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				
			</div>
			
			<div class="mt-5">
				<button @click="goBack()" class="btn btn-link link-green font-weight-bold"> <b-icon icon="arrow-left-short" aria-hidden="true"></b-icon> Go Back</button>
			</div>

		</div>
	</div>

</template>

<script type="text/javascript">
	
	import OrderService from '@/services/services.js';

	export default{
    data (){
      return {
        order: {
        	order_user: {},
        	order_items: {
        		item_subcategory: {category: {} },
	        	item_brand: {}
        	}	        	
        },
        total: 0,
        tax: 0,
      }
    },
    created() {
      let id = this.$route.params.id;
        OrderService.getOrder(id)
            .then(res => {
              this.order = res.data.order 
              // console.log(res.data.order)
              this.total = res.data.order.order_items.reduce((total, item) => {
										        return total + item.item_price * item.qty
										      }, 0)
              this.tax = this.total * 0.05

            })
            .catch(err => {
              console.log('There was an error:',err.response)
            })
    },
    methods:{
    	goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
    }

  };

</script>
