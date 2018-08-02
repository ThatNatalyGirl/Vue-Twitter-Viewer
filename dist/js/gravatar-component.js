"use strict";

//GRAVATAR COMPONENT TO USE WITH VUE
//ADD THIS SCRIPT TO HTML <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>


Vue.component("gravatar", {
	props: ["email"],
	data: function data() {
		return {
			gravatarURL: 'https://www.gravatar.com/avatar/' + md5(this.email)
			//has to return an object
		};
	},
	//props is how you tell it that it needs to expect an attribute - makes a data property we can access
	template: "<div><img v-on:click='' v-bind:src='gravatarURL'></div>"
	//bind is making so we can use vue in it
});
//components get useful when you have a bunch or it gets complicated internally or when you can send data into it
//# sourceMappingURL=gravatar-component.js.map
