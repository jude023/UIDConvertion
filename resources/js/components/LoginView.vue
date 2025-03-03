<!-- <template>
    <div id="element" class="fullscreen-like" @click="Dialog = true" >
        <!-- <ul class="slideshow"> -->
            <!-- <li><span>Image 01</span><div><h3></h3></div></li>
            <li><span>Image 02</span></li>
            <li><span>Image 03</span></li>
            <li><span>Image 04</span></li>
            <li><span>Image 05</span></li>
            <li><span>Image 06</span></li> -->
        <!-- </ul>
            <div class="container">
            <header> -->
                <!-- <v-btn @click="openFullscreen()">here</v-btn> -->
                <!-- <h1>CSS3 <span>Fullscreen Slideshow </span></h1> -->
            <!-- </header>
        </div> -->

        <v-dialog v-model="Dialog" transition="dialog-bottom-transition" max-width="600">
			<v-card class="mx-6 mt-5" :loading="loading" width="450">
				<template slot="progress">
					<v-progress-linear
					color="black"
					height="5"
					indeterminate
					></v-progress-linear>
				</template>
				<v-card-title style="background-color: #030303; color:white" class="justify-left">
					Details
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text grow style="background-color: #4e4e4e; color:white">
				<v-tabs v-model="tab" centered grow >
					<v-tab grow style="background-color: #4e4e4e; color:white" @click="resetForm()"> Login </v-tab>
					<v-tab grow style="background-color: #4e4e4e; color:white" @click="resetForm()"> Register </v-tab>
				</v-tabs>
				<v-tabs-items v-model="tab" grow style="background-color: #4e4e4e;">
					<!-- Login -->
					<v-tab-item >
					<v-card-text>
						<p>Sign in with your Email and Password:</p>
						<v-form id="LoginForm" ref="LoginForm" v-on:submit.prevent="handleLogin">
						<v-text-field
							type="email"
							label="Email"
							name="email"
							v-model="employee.email"
							prepend-icon="mdi-account-circle"
							required
							readonly 
							autocomplete="off"
							@focus="$event.target.removeAttribute('readonly');"
							outlined
							dense
							:rules="[...rules.email, ...rules.required]"
						></v-text-field>
						<v-text-field
							v-model="employee.password"
							id="hiddenPassword"
							label="Password"
							autocomplete="off"
							prepend-icon="mdi-lock" 
							
							:type="showPassword ? 'text' : 'password' "
							:append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
							@click:append="showPassword = !showPassword"
							@focus="$event.target.removeAttribute('readonly');"
							required
							readonly
							outlined
							dense
							name="password"
							@keypress.enter="handleLogin()"
							:rules="rules.required"
						></v-text-field>

						<v-divider></v-divider>
						<v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
							<v-spacer></v-spacer>
							<v-btn small color="info" type="submit" :disabled="disableBtn">
							<v-icon left>mdi-lock</v-icon>
							Login
							</v-btn>
						</v-card-actions>

						</v-form>
					</v-card-text>
					</v-tab-item>
					<!-- Register -->
					<v-tab-item >
					<v-card-text>
						<p>Register:</p>
						<v-form id="RegisterForm" ref="RegisterForm" v-on:submit.prevent="handleRegistration">

						<v-text-field
							type="text"
							label="Name"
							name="name"
							v-model="employee.name"
							prepend-icon="mdi-account-circle"
							required
							readonly 
							autocomplete="off"
							@focus="$event.target.removeAttribute('readonly');"
							outlined
							dense
							:rules="rules.required"
						></v-text-field>
						<v-text-field
							type="email"
							label="Email"
							name="email"
							v-model="employee.email"
							prepend-icon="mdi-account-circle"
							required
							readonly 
							autocomplete="off"
							@focus="$event.target.removeAttribute('readonly');"
							outlined
							:rules="[...rules.email, ...rules.required]"
							dense
						></v-text-field>
						<v-text-field
							v-model="employee.password"
							id="hiddenPassword"
							label="Password"
							autocomplete="off"
							prepend-icon="mdi-lock" 
							:type="showPassword ? 'text' : 'password' "
							:append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
							@click:append="showPassword = !showPassword"
							@focus="$event.target.removeAttribute('readonly');"
							required
							readonly
							outlined
							dense
							name="password"
							:rules="rules.password"
						></v-text-field>
						<v-divider></v-divider>
						<v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
							<v-spacer></v-spacer>
							<v-btn small color="info" type="submit"  :disabled="disableBtn ">
							<v-icon left>mdi-lock</v-icon>
							Register
							</v-btn>
						</v-card-actions>
						</v-form>
						</v-card-text>
					</v-tab-item>
					</v-tabs-items>
				</v-card-text>
				</v-card>
<!-- </template> -->
      	</v-dialog>
    </div>

    
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from "sweetalert2";
import CryptoJS  from "crypto-js"
export default {
    data: () =>({
        Dialog: false,
		toastMixin : Swal.mixin({
			toast: true,
			icon: 'success',
			title: 'General Title',
			animation : false,
			position: 'top-right',
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar : true,
			dibOpen : (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		}),
            showPassword: false, 
            disableBtn: false,
            loading: false,
            employee : {},
            tab : null,
            data: {},
			ip: undefined,
			sampleObj:{},
			// CryptoJS :CryptoJS = require("crypto-js"),
    }),

	computed: {
      ...mapState([
        'rules'
      ])
    },

    created(){
		axios.get(`api/IP`).then((res)=>{
			console.log('res',res.data)
			this.ip = res.data
		})

		// axios.get(`api/GetDetailsData`).then((res)=>{
        // location.reload();
      // Show the fullscreen-like element after the page loads
            window.addEventListener('load', function() {
                var fullscreenLikeElement = document.getElementById("element");
                fullscreenLikeElement.style.display = "block";
            });

    },
    methods: {
        resetForm(){
        if(this.$refs.LoginForm){
          this.$refs.LoginForm.reset();
        }

        if(this.$refs.RegisterForm){
          this.$refs.RegisterForm.reset();
        }
      },

	  handleRegistration(){
		var toastMixin = Swal.mixin({
                toast: true,
                icon: 'success',
                title: 'General Title',
                animation : false,
                position: 'top-right',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar : true,
                dibOpen : (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
			
				toastMixin.fire({
					icon: 'success',
					title : 'Susscessful!',
					animation:true,
					text: 'Login Successfully',
				})	
            // // console.log(this.employee)
			this.employee.ip = this.ip
            axios.post("api/Register/store", this.employee).then((rec)=>{
				console.log(rec)
				if (rec.data = "The post successfully added"){
					alert('gawa na')	
					this.employee = {}
					this.resetForm()
				}
            })
		},

		handleLogin(){
			if(this.$refs.LoginForm.validate()){
				this.disableBtn = true
				const myForm = document.getElementById('LoginForm');
				const formdata = new FormData(myForm);
				 // Replace 'username' with the name of the input field you want to retrieve
				axios({
					method: "POST",
					url: `api/login`,
					data: formdata,
					config: {
						headers: { "Content-Type": "multipart/form-data" },
					},
				})   
				.then(({data})=>{
					console.log('data',data)
					// if(data.type == 'error'){
					// alert(data.message)
					// this.disableBtn = false
					// return;
					// }else if(data != {}){
						alert('CORRECT')
						// data = CryptoJS.AES.encrypt(data, data[0].key).toString();
						let Fdata = CryptoJS.AES.encrypt(JSON.stringify(data), data[0].key).toString();
						console.log(Fdata)
						// data[0].RefCode = CryptoJS.AES.encrypt(data[0].RefCode,data[0].key).toString();
						this.$store.commit("CHANGE_USER_INFO", Fdata)
						this.$store.commit("CHANGE_USER_LOGGING", true)
						this.$store.commit("CHANGE_CONNECTION", true)
						this.$router.push("/MainPage")
						this.$refs.LoginForm.resetValidation();
					// }
				}).catch(err =>{
				this.disableBtn = false
				console.log(err)
				alert('Something went wrong!')
				})
				}
		},

		
    },

}
</script>

<style scoped >

.fullscreen-like {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black; /* Adjust as needed */
    color: white; /* Adjust as needed */
    z-index: 9999; /* Ensure the element is above other content */
    display: none; /* Hidden by default */
}
/* CSS reset */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td { 
	margin:0;
	padding:0;
}
html,body {
	margin:0;
	padding:0;
}
table {
	border-collapse:collapse;
	border-spacing:0;
}
fieldset,img { 
	border:0;
}
input{
	border:1px solid #b0b0b0;
	padding:3px 5px 4px;
	color:#979797;
	width:190px;
}
address,caption,cite,code,dfn,th,var {
	font-style:normal;
	font-weight:normal;
}
ol,ul {
	list-style:none;
}
caption,th {
	text-align:left;
}
h1,h2,h3,h4,h5,h6 {
	font-size:100%;
	font-weight:normal;
}
q:before,q:after {
	content:'';
}
abbr,acronym { border:0;
}
/* General Demo Style */
body{
  font-family: "helvetica neue", helvetica;
	background: #000;
	font-weight: 400;
	font-size: 15px;
	color: #aa3e03;
	overflow-y: scroll;
	overflow-x: hidden;
}
.ie7 body{
	overflow:hidden;
}
a{
	color: #333;
	text-decoration: none;
}
.container{
	position: relative;
	text-align: center;
}
.clr{
	clear: both;
}
.container > header{
	padding: 30px 30px 10px 20px;
	margin: 0px 20px 10px 20px;
	position: relative;
	display: block;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
    text-align: left;
}
.container > header h1{
  font-family: "helvetica neue", helvetica;
	font-size: 35px;
	line-height: 35px;
	position: relative;
	font-weight: 400;
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    padding: 0px 0px 5px 0px;
}
.container > header h1 span{

}
.container > header h2, p.info{
	font-size: 16px;
	font-style: italic;
	color: #f8f8f8;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.6);
}

.slideshow,
.slideshow:after {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
}
.slideshow:after {
    content: '';
}
.slideshow li span {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    color: transparent;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: none;
    opacity: 0;
    z-index: 0;
	-webkit-backface-visibility: hidden;
    -webkit-animation: imageAnimation 36s linear infinite 0s;
    -moz-animation: imageAnimation 36s linear infinite 0s;
    -o-animation: imageAnimation 36s linear infinite 0s;
    -ms-animation: imageAnimation 36s linear infinite 0s;
    animation: imageAnimation 36s linear infinite 0s;
}
.slideshow li div {
    z-index: 1000;
    position: absolute;
    bottom: 30px;
    left: 0px;
    width: 100%;
    text-align: center;
    opacity: 0;
    -webkit-animation: titleAnimation 36s linear infinite 0s;
    -moz-animation: titleAnimation 36s linear infinite 0s;
    -o-animation: titleAnimation 36s linear infinite 0s;
    -ms-animation: titleAnimation 36s linear infinite 0s;
    animation: titleAnimation 36s linear infinite 0s;
}
.slideshow li div h3 {
  font-family: "helvetica neue", helvetica;
  text-transform: uppercase;
  font-size: 80px;
  padding: 0;
  line-height: 200px;
	color: rgba(255,255,255, 0.8);
}
.slideshow li:nth-child(1) span {  }
.slideshow li:nth-child(2) span {
    -webkit-animation-delay: 6s;
    -moz-animation-delay: 6s;
    -o-animation-delay: 6s;
    -ms-animation-delay: 6s;
    animation-delay: 6s;
}
.slideshow li:nth-child(3) span {
    -webkit-animation-delay: 12s;
    -moz-animation-delay: 12s;
    -o-animation-delay: 12s;
    -ms-animation-delay: 12s;
    animation-delay: 12s;
}
.slideshow li:nth-child(4) span {
    -webkit-animation-delay: 18s;
    -moz-animation-delay: 18s;
    -o-animation-delay: 18s;
    -ms-animation-delay: 18s;
    animation-delay: 18s;
}
.slideshow li:nth-child(5) span {
    -webkit-animation-delay: 24s;
    -moz-animation-delay: 24s;
    -o-animation-delay: 24s;
    -ms-animation-delay: 24s;
    animation-delay: 24s;
}
.slideshow li:nth-child(6) span {
    -webkit-animation-delay: 30s;
    -moz-animation-delay: 30s;
    -o-animation-delay: 30s;
    -ms-animation-delay: 30s;
    animation-delay: 30s;
}
.slideshow li:nth-child(2) div {
    -webkit-animation-delay: 6s;
    -moz-animation-delay: 6s;
    -o-animation-delay: 6s;
    -ms-animation-delay: 6s;
    animation-delay: 6s;
}
.slideshow li:nth-child(3) div {
    -webkit-animation-delay: 12s;
    -moz-animation-delay: 12s;
    -o-animation-delay: 12s;
    -ms-animation-delay: 12s;
    animation-delay: 12s;
}
.slideshow li:nth-child(4) div {
    -webkit-animation-delay: 18s;
    -moz-animation-delay: 18s;
    -o-animation-delay: 18s;
    -ms-animation-delay: 18s;
    animation-delay: 18s;
}
.slideshow li:nth-child(5) div {
    -webkit-animation-delay: 24s;
    -moz-animation-delay: 24s;
    -o-animation-delay: 24s;
    -ms-animation-delay: 24s;
    animation-delay: 24s;
}
.slideshow li:nth-child(6) div {
    -webkit-animation-delay: 30s;
    -moz-animation-delay: 30s;
    -o-animation-delay: 30s;
    -ms-animation-delay: 30s;
    animation-delay: 30s;
}
/* Animation for the slideshow images */
@-webkit-keyframes imageAnimation { 
	0% {
	    opacity: 0;
	    -webkit-animation-timing-function: ease-in;
	}
	8% {
	    opacity: 1;
	    -webkit-transform: scale(1.05);
	    -webkit-animation-timing-function: ease-out;
	}
	17% {
	    opacity: 1;
	    -webkit-transform: scale(1.1);
	}
	25% {
	    opacity: 0;
	    -webkit-transform: scale(1.1);
	}
	100% { opacity: 0 }
}
@-moz-keyframes imageAnimation { 
	0% {
	    opacity: 0;
	    -moz-animation-timing-function: ease-in;
	}
	8% {
	    opacity: 1;
	    -moz-transform: scale(1.05);
	    -moz-animation-timing-function: ease-out;
	}
	17% {
	    opacity: 1;
	    -moz-transform: scale(1.1);
	}
	25% {
	    opacity: 0;
	    -moz-transform: scale(1.1);
	}
	100% { opacity: 0 }
}
@-o-keyframes imageAnimation { 
	0% {
	    opacity: 0;
	    -o-animation-timing-function: ease-in;
	}
	8% {
	    opacity: 1;
	    -o-transform: scale(1.05);
	    -o-animation-timing-function: ease-out;
	}
	17% {
	    opacity: 1;
	    -o-transform: scale(1.1);
	}
	25% {
	    opacity: 0;
	    -o-transform: scale(1.1);
	}
	100% { opacity: 0 }
}
@-ms-keyframes imageAnimation { 
	0% {
	    opacity: 0;
	    -ms-animation-timing-function: ease-in;
	}
	8% {
	    opacity: 1;
	    -ms-transform: scale(1.05);
	    -ms-animation-timing-function: ease-out;
	}
	17% {
	    opacity: 1;
	    -ms-transform: scale(1.1);
	}
	25% {
	    opacity: 0;
	    -ms-transform: scale(1.1);
	}
	100% { opacity: 0 }
}
@keyframes imageAnimation { 
	0% {
	    opacity: 0;
	    animation-timing-function: ease-in;
	}
	8% {
	    opacity: 1;
	    transform: scale(1.05);
	    animation-timing-function: ease-out;
	}
	17% {
	    opacity: 1;
	    transform: scale(1.1);
	}
	25% {
	    opacity: 0;
	    transform: scale(1.1);
	}
	100% { opacity: 0 }
}
/* Animation for the title */
@-webkit-keyframes titleAnimation { 
	0% {
	    opacity: 0;
	    -webkit-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -webkit-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -webkit-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -webkit-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-moz-keyframes titleAnimation { 
	0% {
	    opacity: 0;
	    -moz-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -moz-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -moz-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -moz-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-o-keyframes titleAnimation { 
	0% {
	    opacity: 0;
	    -o-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -o-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -o-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -o-transform: scale(10);
	}
	100% { opacity: 0 }
}
@-ms-keyframes titleAnimation { 
	0% {
	    opacity: 0;
	    -ms-transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    -ms-transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    -ms-transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    -webkit-transform: scale(10);
	}
	100% { opacity: 0 }
}
@keyframes titleAnimation { 
	0% {
	    opacity: 0;
	    transform: translateY(200px);
	}
	8% {
	    opacity: 1;
	    transform: translateY(0px);
	}
	17% {
	    opacity: 1;
	    transform: scale(1);
	}
	19% { opacity: 0 }
	25% {
	    opacity: 0;
	    transform: scale(10);
	}
	100% { opacity: 0 }
}
/* Show at least something when animations not supported */
.no-cssanimations .slideshow li span{
	opacity: 1;
}
@media screen and (max-width: 1140px) { 
	.slideshow li div h3 { font-size: 100px }
}
@media screen and (max-width: 600px) { 
	.slideshow li div h3 { font-size: 50px }
}



.element {
    width: 100%;
    background-color: skyblue;
    text-align: center;
    color: white;
    font-size: 3em;
  }
  .element:-ms-fullscreen p {
    visibility: visible;
  }
  .element:fullscreen {
    background-color: #e4708a;
    width: 100vw;
    height: 100vh;
  }
</style> -->