(function (window) {
	'use strict';

	let vm = new Vue({
		el:'#todoapp',
		directives:{
			focus(el,bindings){
				// 当点击当前li时让内部的输入框获取焦点
				if(bindings.value){
					el.focus(); // 获取焦点
				}
			}
		},
		data:{
			todos:[
				{isSelected:false,title:'吃饭'},
				{isSelected:true,title:'睡觉'},
				{isSelected:false,title:'购物'},
			],
			title:'',
			cur:''
		},
		methods:{
			addTodo(){
				if(!this.title) return;
				this.todos.unshift({
					isSelected : false,
					title : this.title
				})
				this.title = ''
			},
			removeTodo(todo){
				console.log(1);
				this.todos = this.todos.filter(item=>item!==todo);
			},
			remember(todo){
				this.cur = todo;
			},
			cancel(){
				this.cur = ''
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
			},
			count(){
				console.log(this.todos.filter(item=>!item.isSelected).length)
				return this.todos.filter(item=>!item.isSelected).length;
			}
		}
	})

})(window);
