<template>
	
	<div>
		<h2>Login</h2>

		<div class="container py-4">
			<div class="row justify-content-md-center">
				<div class="col-12 col-md-8 col-lg-6 col-xl-5">
					
					<transition mode="out-in"
                  enter-active-class="animate__animated animate__flipInX animate__fast">
						<div v-if="auth=='fail'">
							<div class="alert alert-danger alert-dismissible fade show" role="alert">
							  {{errorMessage}}
							  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
							    <span aria-hidden="true">&times;</span>
							  </button>
							</div>
						</div>
					</transition>

					<div class="shadow px-5 py-4">
						
						<form v-on:submit.prevent="login">			

							<img src="../assets/login.png" rel="preload" width="135" />

							<md-field class="mb-4">
					      <label>Email Address</label>
					      <md-input v-model="email" type="email" required></md-input>
					    </md-field>

					    <md-field class="mb-5">
					      <label>Password</label>
					      <md-input v-model="password" type="password" autocomplete="off" required></md-input>
					    </md-field>

					    <button type="submit" class="btn shadow-sm btn-gradient-green btn-block py-2 my-3 font-weight-bold">Login</button>

					    <p class="text-secondary my-4">
						    New User? <router-link :to="{name:'register'}" class="link-green">Create Account Here</router-link>
					    </p>
					  </form>

					</div>

				</div>
			</div>
		</div>
	</div>

</template>

<script type="text/javascript">
	export default {
		data() {
		  return {
		    email:null,
		    password:null,
		    errorMessage: null,
		  };
		},
		methods: {
			login() {
				let user = {username: this.email, password:this.password};

				this.$store.dispatch('login',user)
          .then(() => this.$router.push('/orders'))
          .catch(err => {
              console.log('There was an error:',err.response)
              this.errorMessage = 'Login Failed!, Incorrect Email and Password'
            });
			}
		},
    computed:{
      auth(){
        return this.$store.getters.authStatus
      }
    }
	};

</script>