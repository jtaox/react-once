# react-once

嗯，前两年有了解过 React，但因为当时公司几个项目并没有涉及到React，以及看起来很乱的JSX等等原因，一直没有深入学习过，所以对React一直停留在`了解`的水平。最近一段时间不是很忙，又认真学习了React，感觉自己被折服了，最大的感受就是通过 React、Redux 写出了自己想要的东西(这里想要的东西并不是指写出来的demo、项目，能理解的自然能理解)。所以找了个方向，开始写这个项目。

目前，这个项目主要是为了学习 React + React-Router + Redux + Redux Middleware 模式的开发，没设计UI，仅仅写了一些基础样式，所以看起来比较随意。项目中的功能也尽量往实际需求靠拢，尽量多造小轮子，毕竟是抱着学习的态度做的。

项目目前为 [gank.io](http://gank.io/)、[v2ex.com](http://v2ex.com/)两个模块，不过后面还会加很多，样式也会做调整，而且还会加很多不一样的东西~

<div align="center">
  <img width="290" src="https://i.loli.net/2018/07/06/5b3edb9b541cd.gif"/><img width="290" src="https://i.loli.net/2018/07/06/5b3edb8da62c7.gif"/><img width="290" src="https://i.loli.net/2018/07/06/5b3edb83b50e5.gif"/>
</div>

---

<div align="center">
  <img width="290" src="https://i.loli.net/2018/07/06/5b3edba23b457.gif"/><img width="290" src="https://i.loli.net/2018/07/06/5b3edc774ac1a.gif"/><img width="290" src="https://i.loli.net/2018/07/06/5b3edc757b84c.gif"/>
</div>

## 小记

### react中的setState同步更新策略

react中的setState为异步操作函数，方法执行是不会阻塞等待状态更新完毕，意味这不能以顺序控制的方式设置某些事件，也不能依赖this.state来计算未来状态，如果想保证状态同步更新，可以通过下面两种方式：

#### 完成回调

#### 传入计算状态函数

...

### rn中StyleSheet.create方法作用

rn中的view样式一般是通过`StyleSheet.create`方法创建，比如：

```
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
```

其实可以直接写成字面量的方式，比如：

```
<View style={{ flex: 1 }}></View>
```

两者区别：

代码质量:

- 将样式从render函数中分离，使代码更容易理解
- 给样式命名是一个很好的方法，可以为render函数中的低级组件增加意义

性能：
- 通过StyleSheet对象创建的样式表可以通过ID引用，而不是每次都创建一个新的样式对象
- 它允许通过bridge发送一次样式，后续使用都引用这一个ID(尚未实现)

### react-router 在history模式下是如何监听

### react-router 中component和render的区别

关于这个问题，其实官网页给出了说明：
> When you use component (instead of render or children, below) the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component prop, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component. When using an inline function for inline rendering, use the render or the children prop .

大意为当使用 component 只当渲染组件时，React 会通过 React.creatElement 方法创建 React 元素，意味着如果为 component prop 提供内联函数，每次渲染都会创建一个组件，而不是更新现有组件，如果使用内联函数时应该使用 render 或 children。

这个视频：[Pass props to a component rendered by React Router](https://tylermcginnis.com/react-router-pass-props-to-components/)，也同样有说明，但都只是强调了 React.createElement 这个方法有关，没做具体说明。后来在[stackoverflow](https://stackoverflow.com/questions/48150567/react-router-difference-between-component-and-render)上找到一个不错的回答。

第二个回答进行了详细说明，理解两者的不同之处关键点是：provide an inline function to the component prop，为 component prop 提供内联函数。我们知道 Route component 在 location 改变的时候会重新渲染，react 将会对比新旧虚拟dom，将不同的地方渲染到真实的dom上。除非更改了新 React Element的 type 或 key，否则 React 会尝试复用 DOM 节点。该回答有又对比了 React.createElement 方法传入不同类型参数结果做了对比：

```
// 1.
const componentA = React.createElement(App, props)
const componentB = React.createElement(App, props)
console.log(componentA.type === componentB.type)             // true

// 2.
const componentA = React.createElement(() => <App />, props)
const componentB = React.createElement(() => <App />, props)
console.log(componentA.type === componentB.type)             // false
```

方法1创建的 React Element 具有相同类型，但方法2的方式每次都会创建一个新的匿名函数，所以两个 React Element 的 type 是匿名函数的两个不同实例。在 React 观点上，不同类型的元素，处理方式为： unmonut old > mount new，卸载旧组件，安装新组件。

但是为什么 render prop 可以避免呢？作者通过源码进行说明：

```
if (component)
  // We already know the differences:
  // React.createElement(component)
  // React.createElement(() => <component/>)
  return match ? React.createElement(component, props) : null

if (render)
  return match ? render(props) : null
```

render prop 是一个在调用时返回 React Element 的函数

```
<Route render={() => <AppComponent />}></Route>
```
它返回的是 AppComponent，不是匿名函数，jsx编译后：

```
render = () => React.createElement(AppComponent)
render() = React.createElement(AppComponent)

React.createElement(render) =
  React.createElement(() => React.createElement(AppComponent))

React.createElement(render()) =
  React.createElement(React.createElement(AppComponent))
```
所以当使用 render prop 时，render 函数返回的元素 type 在每次渲染时不会改变。

另外，作者的观点，可以使用给匿名函数命名的方法，将 render prop 与 component prop 的行为进行保存。

```
// Put this line outside render method.
const CreateAppComponent = () => <AppComponent />

// Inside render method
render(){
  return <Route component={CreateAppComponent}/>
}
```

最后得出的结论就是，如果直接使用 `component = { AppComponent }` ，那么 component 和 render prop 之间没太大差异，如果想为 AppComponent 传入一些 prop，那应该使用 `render={() => <AppComponent {...props}/>` 而不是使用 `component={() => <AppComponent {...props}/> }`





### react-router 的路由拦截功能

看到有人吐槽 react-router4 没提供路由拦截功能，其实是有提供的，react-router 提供了Prompt 组件，这个组件可以用来做拦截，并给出提示的，下面是文档上的介绍：

> Used to prompt the user before navigating away from a page. When your application enters a state that should prevent the user from navigating away (like a form is half-filled out), render a <Prompt>.

Prompt可传入一个message prop，基础使用在这里不做赘述，只说一种情况，当message为function，路由切换时会执行这个函数，当函数返回结果为true时，会继续执行跳转，如果为string类型，则会调用getUserConfirmation方法，并将string结果以及执行后续操作的callback作为参数传入：

```
if (prompt != null) {
  const result =
    typeof prompt === "function" ? prompt(location, action) : prompt;

  if (typeof result === "string") {
    if (typeof getUserConfirmation === "function") {
      getUserConfirmation(result, callback);
    } else {
      warning(
        false,
        "A history needs a getUserConfirmation function in order to use a prompt message"
      );

      callback(true);
    }
  } else {
    // Return false from a transition hook to cancel the transition.
    callback(result !== false);
  }
} else {
  callback(true);
}
```
> prompt 为传入的message

所以我们可以通过覆盖getUserConfirmation方法，在该方法内做一些判断或验证身份，根据验证结果，调用callback，并传入true或者false来决定是否执行默认跳转，而覆盖getUserConfirmation便是在BrowserRouter组件传入getUserConfirmation prop：

```
<BrowserRouter getUserConfirmation={ this.getUserConfirmation } path='/path'>
    <Component/>
</BrowserRouter>
```

```
getUserConfirmation = async (message, callback) => {
    const result = await fetch('www.api.com/auth')
    callback(result)
}
```

但这种方式有一个弊端就是只能选择是否跳转，无法指定跳转到其他路由



### 关于 react 生命周期 componentWillReceiveProps

componentWillReceiveProps 在已装载组件接收新的 props 之前被调用，参数为新的props，如果需要更新 state 以响应 props 的更改，可以在这个方法中比较当前 this.props 和 next.props 并使用this.state执行状态修改。

componentWillReceiveProps 是唯一一个可以在组件的运行阶段来手动setState的生命周期。如果子组件需要的数据直接由父组件 props 传递，则不需要在 componentWillReceiveProps 中进行 setState 操作，但如果子组件有自己的状态，同时这个状态又依赖父组件的 props 数据时，则可以再 componentWillReceiveProps 中对组件内部状态进行微调操作。

> 即使prop没有改变，react也可能调用这个方法，所以要确保比较当前值和下一个值。

> 在 componentWillReceiveProps 中 setState 不会多次触发子组件的 render，


### 父组件更新会导致所有子组件更新

在开发中发现，只要父组件的更新，会触发子组件的render，子组件render又会触发它的子组件的render。这样做是因为react不能检查你是否传子组件属性，更不知道子组件的输出是否不受传值的影响，所有它必须进行重渲染，也就是执行render，但这个过程执行的是JavaScript，并没有操作DOM，因为JavaScript执行速度很快，效率并不会有影响，真正操作DOM是在render过程中遇到react元素之后，diff过程开始的时候，这个时候diff算法才会决定是否更新DOM元素。react也提供了 shouldComponentUpdate 回调函数，这个回调在接收到新的 props 或 state 时调用，默认返回 true ，当返回 false 会阻止当前组件以及子组件重新渲染，componentWillUpdate() ，render()和componentDidUpdate()都不会执行。它的目的就是可以让程序员更具情况决定是否要重新渲染。

## 第三方依赖

[react-toggle](https://github.com/aaronshaf/react-toggle): An elegant, accessible toggle component for React. Also a glorified checkbox.

[Sortablejs](http://rubaxa.github.io/Sortable/): The JavaScript library for modern browsers and touch devices.

[react-burger-menu](https://github.com/negomi/react-burger-menu): An off-canvas sidebar component with a collection of effects and styles using CSS transitions and SVG path animations.
