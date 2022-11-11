# Заметки

### Цветовая палитра
- **Omega Yeast** ![](https://placehold.co/15x15/f7f7f7/f7f7f7.png)![](https://placehold.co/15x15/7da2a9/7da2a9.png)
- **Blue palette** ![](https://placehold.co/15x15/3fd2c7/3fd2c7.png)![](https://placehold.co/15x15/99ddff/99ddff.png)![](https://placehold.co/15x15/00458b/00458b.png)
- **Jebsen Careers** ![](https://placehold.co/15x15/150734/150734.png)![](https://placehold.co/15x15/0f2557/0f2557.png)![](https://placehold.co/15x15/28559a/28559a.png)![](https://placehold.co/15x15/3778c2/3778c2.png)![](https://placehold.co/15x15/4b9fe1/4b9fe1.png)![](https://placehold.co/15x15/63bce5/63bce5.png)![](https://placehold.co/15x15/7ed5ea/7ed5ea.png)
- **Fresh and Relaxed** ![](https://placehold.co/15x15/25395C/25395C.png)![](https://placehold.co/15x15/2787EA/2787EA.png)![](https://placehold.co/15x15/1C67D2/1C67D2.png)![](https://placehold.co/15x15/A4B0FF/A4B0FF.png)![](https://placehold.co/15x15/EA7166/EA7166.png)![](https://placehold.co/15x15/FCA78A/FCA78A.png)
- **Pastel and Muted** ![](https://placehold.co/15x15/242333/242333.png)![](https://placehold.co/15x15/FFFFFF/FFFFFF.png)![](https://placehold.co/15x15/01B0D3/01B0D3.png)
- **Canatal** ![](https://placehold.co/15x15/182978/182978.png)![](https://placehold.co/15x15/6688cc/6688cc.png)![](https://placehold.co/15x15/acbfe6/acbfe6.png)
- **Awink** ![](https://placehold.co/15x15/212221/212221.png)![](https://placehold.co/15x15/1181b2/1181b2.png)![](https://placehold.co/15x15/ddedf4/ddedf4.png)![](https://placehold.co/15x15/44449b/44449b.png)
- **Monochromatic** ![](https://placehold.co/15x15/292929/292929.png)![](https://placehold.co/15x15/616161/616161.png)![](https://placehold.co/15x15/FFFFFF/FFFFFF.png)

### Полезные ссылки
- [React Turorial](https://www.youtube.com/playlist?list=PLVfMKQXDAhGWamOcqqIsMAbsP6pl0vUtW)
- [React](https://reactjs.org/docs/getting-started.html)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
- [React Router](https://v5.reactrouter.com/web/guides/primary-components)
- Bootstrap Examples:
  - [Bootstrap 5 Album](https://getbootstrap.com/docs/5.0/examples/album/#)

### Заметки
**useState(value)**
The State
```js
// downloadSomething() will be called on  EVERY  render
const [state, setState] = useState(downloadSomething());
// downloadSomething() will be called on ONLY ONCE now
const [state, setState] = useState(() => downloadSomething());

setState( {...} ) // don't
setState((prevState) => { ...; return newState; }) // do because:
// bad
function onCLickHandler() {
  // state.counter == 0
  setState(state.counter + 1); // state.counter == 0
  setState(state.counter + 1); // !!! state.counter == 0
  // state.counter == 1
}
// ok
function onCLickHandler() {
  // state.counter == 0
  setState(prev => prev.counter + 1); // state.counter == 1
  setState(prev => prev.counter + 1); // !!! state.counter == 2
  // state.counter == 2
}
```
**useEffect(callback, deps)**
Life cycle alternative for functions. *Callback* itself called when effect starts but its *return value* which is function itself called when effect ends and acts as a *cleaner* for main effect.
```js
useEffect(() => {})//   // on every render
useEffect(() => {}, []) // after was mounted

const componentWillUnmount = () => {};
useEffect(() => componentWillUnmount, []) // before unmount
```
**useRef(value)**
State that doesnt tregger rerender
```js
let counter = 1;
const Component = () => ("<> <h1>{counter}</h1> <button onClick={() => {counter++}}> </>");

// is now
function Component() {
  let counter = useRef(1);

  return "<>{counter.current}</>";
}

// Referencing VDOM element
function Test() {
  let buttonRef = useRef(null);

  useEffect(() => { console.log(button.current); }); // ==> Element...

  return ("<button ref={buttonRef}>Click</button>")
}

// Referencing previous state
function Test() {
  const [state, setState] = useState({ ... });
  let prevState = useRef(null);

  useEffect(() => { prevState.current = state; }, [state]);

  useEffect(() => console.log(prevState, state));
  // ...
}
```
**useMemo(callback, deps)**
Caching with deps. Returns *callback return value* if one of *deps* have changed.
```js
async function compute(n) {
  await setTimeout(() => {}, 1000);
  return n + 1;
}

function Test() {
  const [num, setNum] = useState(0);

  // don't
  const computedNum = compute(num);
  // do
  const computedNum = useMemo(() => compute(num), [num]);


  let obj = { title: `N is ${num}` };
  useEffect(() => {}, [obj])  // will be called on EVERY render 
                              // because of a changing reference to 'obj'
  
  // better approach
  let obj = useMemo(() => { title: `N is ${num}` }, [num])
  useEffect(() => {}, [obj])
}
```
**useCallback(func, deps)**
Cache callbacks that are passed to children components.
useMemo() for functions. Returns *function wrapper* with constant address.
```js
function NameList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => { setItems(props.getItems()); }, [props.getItems]);
  // ...
}

function Test() {
  const [count, setCount] = useState(0);

  async function DownloadItems() {
    await setTimeout(()=>{}, 1000);
    return new Array(count);
  }

  // getItems is getting new address on every Test() call (sure?)
  // so useEffect() will always trigger
  return "<NameList getItems={DownloadItems} />";

  // better
  const DownloadItems = useCallback( async () => {
    await setTimeout(()=>{}, 1000);
    return new Array(count);
  }, [count]);

  // ...
}
```
**useContext()**
```js
```