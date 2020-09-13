<template>
	
	<div>
		<h2>Items</h2>

		<div class="container">
			<div class="row my-5">
	      <div class="col-sm-6 col-lg-4 col-xl-3 mb-5" v-for="(item,index) in items" :key="index">
	        <ItemCard :item="item"></ItemCard>
	      </div>
	    </div>
		</div>

	</div>

</template>

<script type="text/javascript">
	import ItemCard from '@/components/ItemCard.vue';
  import ItemService from '@/services/services.js';


	export default {
    components:{
      ItemCard
    },
    data(){
      return{
        items: []
      }
    },
    mounted(){
      this.getItems();
    },
    methods:{
      getItems(){
        ItemService.getItems()
          .then(res => {
            this.items = res.data.items
          })
          .catch(err => {
            console.log('There was an error:',err.response)
          })
      }
    }
  };
</script>

