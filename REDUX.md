# Redux

-----
### Redux的设计思想
    1. Web 应用的状态机，视图和状态一一对应。
    2. 所有状态保存在一个对象了里面。

### Store
    Store 就是保存数据的地方，可以看作一个容器，整个应用只有一个Store。
    Redux 提供createStore 函数，用来生成Store。
    ```
        import { createStore } from "redux"
        const store = createStore(fn)
    ```

### State
    Store 对象包含所有数据，如果想要得到某个时点的数据，就要对Store生成快照。这种时点的数据集合，叫做State。
    通过store.getState()拿到。
    ```
        const state = store.getState();
    ```
    #### Redux 规定一个state对应一个View。只要state相同，View就相同！！

### Action
    Action 就是View 发出通知，表示State应该要发生变化了。
    Action 是一个对象。type 属性是必须的，表示Action 的名称。
    改变State 的唯一方法就是使用Action，它会运送数据到Store。

####　Action Creator
    定义一个函数生成Action，就不需要View 发送多少种消息，就会有多少种Action。
    ```
        const ADD_TODO = "添加 TODO";
        function addTodo(text) {
            return {
                type: ADD_TODO,
                text
            }
        }
        const action = addTodo("Learn Redux");
    ```
#### store.dispatch()
    store.dispatch()是View发出Action的唯一方法。
    ```
        import { createStore } from "redux"
        const store = createStore(fn);
        store.dispatch({
            type: "ADD_TODO",
            payload: "Learn Redux"
        })

        结合可写成
        store.dispatch(addTodo("Learn Redux"))
    ```
### Reducer
    Store 收到Action 后，生成一个新的State，这样View才会变化。这个计算过程就叫做 Reducer。
    Reducer 是一个函数，它接受Action和当前State作为参数,返回一个新的State。
### Provider
    作为容器组件，用来接收Store，并且让Store对子组件可用(利用React隐藏的特性Contexts)，Contents用来传递一些父容器的属性对所有子组件可见，在某些场景避免了props传递多层组件的繁琐。

---- 

## combineReducers

















### 微信授权网页登录
    引进文件，直接调用new WXLogin报错，全局变量需要window.WXLogin

### 