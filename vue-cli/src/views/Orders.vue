<template>
	
	<div>
		<h2>Order List</h2>

		<div class="container py-4">
			
			<div class="table-responsive">
				<!-- <table class="table table-edited table-padding-edited table-hover">
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
				</table> -->

				<md-table v-model="searched" md-sort="md-table-row" md-sort-order="asc" md-card >

					<md-table-toolbar>
						<div class="md-toolbar-section-start">
		          <h1 class="md-title"></h1>
		        </div>

		        <md-field md-clearable class="md-toolbar-section-end mb-4">
		          <md-input placeholder="Search by Voucher No..." v-model="search" @input="searchOnTable" />
		        </md-field>
		      </md-table-toolbar>

		      <md-table-empty-state
		        md-label="No orders found"
		        :md-description="`No order found for your search. Try a different search term.`">
		      </md-table-empty-state>

		      <md-table-row slot="md-table-row" slot-scope="{ item }">
		        <md-table-cell md-label="No." md-sort-by="order_id">{{ item.order_id }}</md-table-cell>
		        <md-table-cell md-label="Voucher_No." md-sort-by="order_voucherno">
		        	<router-link :to="{name:'order-detail', params: { id: item.order_id }}" class="link-green font-weight-bold">
								O-{{ item.order_voucherno }} <sup><b-icon icon="box-arrow-up-right" aria-hidden="true"></b-icon></sup>
								</router-link>
		        </md-table-cell>
		        <md-table-cell md-label="Order_Date" md-sort-by="created_at">{{ item.created_at | formatDate }}</md-table-cell>
		        <md-table-cell md-label="Ordered_By" md-sort-by="order_user.user_name">{{ item.order_user.user_name }}</md-table-cell>
		        <md-table-cell md-label="Status" md-sort-by="order_status">
		        	<span v-if="item.order_status == 1" class="badge badge-pill custom-badge">Order</span>
		        </md-table-cell>
		      </md-table-row>
		    </md-table>

			</div>

		</div>

	</div>

</template>

<script type="text/javascript">

	import OrderService from '@/services/services.js';
	const toLower = text => {
    return text.toString().toLowerCase()
  }

	const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.order_voucherno).includes(toLower(term)))
    }

    return items
  }

	export default {
    name: 'TableSort',
		data (){
      return {
        orders: [],
	      search: null,
	      searched: [],
      }
    },
    methods: {
      searchOnTable () {
        this.searched = searchByName(this.orders, this.search)
      }
    },
    created() {

      OrderService.getOrders()
          .then(res => {
            this.orders = res.data.orders
          })
          .catch(err => {
            console.log('There was an error:',err.response)
          }),
    	this.searched = this.orders
    },
	};
	
</script>
