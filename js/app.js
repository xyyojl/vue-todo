(function (window) {
	'use strict';

	let vm = new Vue({
		el:'#todoapp',
		data:{
			todos:[
				{isSelected:false,title:'吃饭'},
				{isSelected:true,title:'睡觉'},
				{isSelected:false,title:'购物'},
			],
			title:''
		},
		methods:{
			addTodo(){
				console.log(1);
				this.todos.unshift({
					isSelected : false,
					title : this.title
				})
				this.title = ''
			}
		}
	})

})(window);
