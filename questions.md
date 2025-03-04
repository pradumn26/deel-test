1. What is the difference between Component and PureComponent? Give an example where it might break my app.
A. PureComponent implements shouldComponentUpdate with a shallow comparison of props and state. So it will not re-render if the props and state haven't changed. Component does not implement shouldComponentUpdate, so it will re-render whenever its parent component re-renders. A PureComponent can break the logic when there are mutations to one of the props passed to it.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
A. shouldComponentUpdate can block the re-render of a component that is using context. shouldComponentUpdate cannot track changes to contexxt values and can only take decisions based on props and state.

3. Describe 3 ways to pass information from a component to its PARENT.
A. 1. Callback functions 
   2. State management apis like redux and context api 
   3. PubSub logic

4. Give 2 ways to prevent components from re-rendering.
A. 1. In class component we can use shouldComponentUpdate lifecycle method. In functional components we can use React.memo.
   2. Memoizing the component with useMemo or useCallback hooks.

5. What is a fragment and why do we need it? Give an example where it might break my app.
A. Fragment is a way to return multiple elements from a single component at the same level of dom tree. Fragment can break the logic when parent component is expecting an array of elements but user passes children wrapped inside a fragment.

6. Give 3 examples of the HOC pattern.
A. 1. React.memo 2. forwardRef 3. withRouter

7. What's the difference in handling exceptions in promises, callbacks and async…await?
A. Callbacks: In callbacks, we usually get the error as the first argument of the callback function. If not handled, the error will not crash 
   the app because it is on the listener to throw the error.
   Promises: In promises, we can handle the error using .catch() method. If not handled, the error will crash the app. It is more readable than callbacks.
   Async…await: In async…await, we can handle the error using try…catch block. If not handled, the error will crash the app. It is more readable than even promises. But it has less support in older browsers.

8. How many arguments does setState take and why is it async.
A. setState has two arguments:
   1. The first argument is the new state to be assigned to the component.
   2. The second argument is the callback function that is called after the state is updated.

9. List the steps needed to migrate a Class to Function Component.
A. 1. Replace all the lifecycle method with hooks.
   2. return the jsx from the render method as the main return statement.
   3. Handle state management with useState hook.
   4. Remove all the this instances from the code.
   5. Use React.memo instead of PureComponent.
   6. Use useNavigate, useSelector like hooks instead of HOCs provided by react-router and redux.

10. List a few ways styles can be used with components.
A. 1. Inlinde styling using style attribute.
   2. Using css modules.
   3. Using css in js libraries like styled-components.
   4. Using css frameworks like tailwind css.

11. How to render an HTML string coming from the server.
A. We should use string sanitization libraries like dompurify to sanitize the string before rendering it. And then use dangerouslySetInnerHTML to render the string.