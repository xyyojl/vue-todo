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
		},
		computed:{ // 放在computed中最后也会放在vm上，不能和methods与data重名
			checkAll:{
				get(){ // get和set this只想实例 默认v-model 会获取checkAll的值 所以会调用get方法
					return this.todos.every(item=>item.isSelected);
				},
				set(val){ // 当我们给checkbox赋值的时候
					this.todos.forEach(item=>item.isSelected = val);
				}
			}
		}
	})

})(window);
