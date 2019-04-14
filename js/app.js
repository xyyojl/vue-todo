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
		created(){
			// 获取localStorage中的数据 没有则使用默认的
			this.todos = JSON.parse(localStorage.getItem('todos')) || this.todos;

			// 监控hash的值的变化,如果页面以及有hash了 重新刷新页面也要获取hash值
			this.hash = window.location.hash.slice(2) || 'all';

			// 当hash值变化时，重新操作记录的数据
			window.addEventListener('hashchange',()=>{
				this.hash = window.location.hash.slice(2);
			},false)
		},
		watch:{
			todos:{ // watch 默认只监控一层的数据变化，深度监控
				handler(){ // 默认 写成函数 就相当于默认写了个handler
					// localStorage 默认存的是字符串
					localStorage.setItem('todos',JSON.stringify(this.todos));
				},deep:true
			}
		},
		data:{
			todos:[
				{isSelected:false,title:'吃饭'},
				{isSelected:true,title:'睡觉'},
				{isSelected:false,title:'购物'},
			],
			title:'',
			cur:'',
			hash:''
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
			},
			clear(){
				this.todos = this.todos.filter(item=>!item.isSelected);
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
			},
			filterTodos(){
				if(this.hash === 'all') return this.todos;
				if(this.hash === 'active') return this.todos.filter(item=>!item.isSelected);
				if(this.hash === 'completed') return this.todos.filter(item=>item.isSelected);
				return this.todos;
			},
			clearCompleted(){
				return this.todos.some(item=>item.isSelected);
			}
		}
	})

})(window);
