<template>
	
	<div>
		<h2>Order List</h2>

		<div class="container py-5">
			
			<div class="table-responsive">
				<table class="table table-edited table-padding-edited table-hover">
					<thead>
						<tr>
							<th>No.</th>
							<th>Voucher_No.</th>
							<th>Order_Date</th>
							<th>Ordered_By</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(order,index) in orders" :key="index">
							<td>{{ ++index }}.</td>
							<td>
								<router-link :to="{name:'order-detail', params: { id: order.order_id }}" class="link-green font-weight-bold">
								O-{{ order.order_voucherno }} <sup><b-icon icon="box-arrow-up-right" aria-hidden="true"></b-icon></sup>
								</router-link>
							</td>
							<td>{{ order.created_at | formatDate }}</td>
							<td>{{ order.order_user.user_name }}</td>
							<td>
								<span v-if="order.order_status == 1" class="badge badge-pill custom-badge">Order</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

	</div>

</template>

<script type="text/javascript">

	import OrderService from '@/services/services.js';

	export default {
		data (){
      return {
        orders: [],
      }
    },
    created() {
      OrderService.getOrders()
          .then(res => {
            this.orders = res.data.orders
          })
          .catch(err => {
            console.log('There was an error:',err.response)
          })
    }
	};
	
</script>
