<template>
	
	<div>
		<h2>Order List</h2>

		<div class="container py-5">
			
			<div class="table-responsive">
				<table class="table table-order table-hover">
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
								<router-link :to="{name:'order-detail', params: { id: order.order_id }}" class="btn-link text-success">
								O-{{ order.order_voucherno }} <sup><b-icon icon="box-arrow-up-right" aria-hidden="true"></b-icon></sup>
								</router-link>
							</td>
							<td>{{ order.created_at | formatDate }}</td>
							<td>{{ order.order_user.user_name }}</td>
							<td>
								<span v-if="order.order_status == 1" class="badge badge-pill badge-success">Order</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

	</div>

</template>

<script type="text/javascript">

	import OrderService from '@/services/OrderService.js';

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

<style scoped>
	
	.table-order th, .table-order td {
		text-align: left !important;
		vertical-align: middle;
	}
	.table-order td {
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.table-order tr:last-child {
		border-bottom: 1px solid #dee2e6;
	}
	.text-success {
		color: #41B883;
	}

</style>