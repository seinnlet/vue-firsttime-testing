<template>
	
	<div>
		<h2>Create Account</h2>

		<div class="container py-4">
			<div class="row justify-content-md-center">
				<div class="col-12 col-md-8 col-lg-6 col-xl-5">
					
					<div class="shadow px-5 py-4">

						<form v-on:submit.prevent="register">
							<md-field class="mb-4">
					      <label>User Name</label>
					      <md-input v-model.trim="name"></md-input>
					      <span class="md-helper-text text-danger" v-if="errorMessage.name">{{ errorMessage.name[0] }}</span>
					    </md-field>

							<md-field class="mb-4">
					      <label>Email Address</label>
					      <md-input v-model.trim="email" type="email"></md-input>
					      <span class="md-helper-text text-danger" v-if="errorMessage.email">{{ errorMessage.email[0] }}</span>
					    </md-field>

					    <md-field class="mb-4">
					      <label>Password</label>
					      <md-input v-model="password" type="password" autocomplete="off"></md-input>
					      <span class="md-helper-text text-danger" v-if="errorMessage.password">{{ errorMessage.password[0] }}</span>
					    </md-field>

					    <md-field class="mb-5">
					      <label>Confirm Password</label>
					      <md-input v-model="confirmpassword" type="password" autocomplete="off"></md-input>
					      <span class="md-helper-text text-secondary" v-if="errorPasswordMessage">Confirm Password does not match with Password.</span>
					    </md-field>

					    <button type="submit" class="btn shadow-sm btn-gradient-green btn-block py-2 my-3 font-weight-bold" :disabled="isActive">Create Account</button>

					    <p class="text-secondary my-4">
						    Already Member? <router-link :to="{name:'login'}" class="link-green">Log in Here</router-link>
					    </p>
						</form>

					</div>

				</div>
			</div>

		</div>
	</div>

</template>

<script type="text/javascript">

	import UserService from '@/services/services.js'
	
	export default {
		data() {
		  return {
		    name:null,
		    email:null,
		    password:null,
		    confirmpassword:null,
		    errorMessage: {},
		    errorPasswordMessage: false,
		    isActive: true
		  };
		},
		watch: {
			confirmpassword(value) {
				this.confirmpassword = value 
				this.comparePassword(value);
			}
		},
		methods: {
			comparePassword(value) {
				if (this.password && value && (this.password !== value)) {
					this.errorPasswordMessage = true;
				} else {
					this.errorPasswordMessage = false;
					this.isActive = false;
				}
				if (!value || (this.password !== value)) {
					this.isActive = true;
				}
			},
		  register() {
		    let user = {name: this.name, email:this.email, password: this.password};
		    UserService.registerUser(user)
          .then(() => {
            this.$router.push('/login')
          })
          .catch(err =>{
          	if (err.response.status == 422) {
          		// console.log('There was an error:',err.response.data)
	            this.errorMessage = err.response.data.errors
          	}
          })
		  },
		},
	};

</script>