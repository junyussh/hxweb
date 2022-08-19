import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Tree from './Tree'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import {getSmile, Node, NodeType} from './getData';
import useForceUpdate from './useForceUpdate';
// import LineChart from './d3Tree'

function App() {
  const [count, setCount] = useState(0)
  let data = [
    { date: 20220101, impressions: 100 },
    { date: 20220102, impressions: 120 },
    // ... truncated but you get it
  ];
  const [smile, setSmile] = useState<string>("CC1(C)[C@H]2COC(=O)N[C@H]21");
  const handleCalculate = () => {
    // const node: Node = {
    //   level: -1,
    //   type: NodeType.Root,
    //   smile: smile
    // }
    setTreeData({...treeData, smile: smile})
    // treeData.smile = smile
    console.log(treeData);
    
    const smiles: Node[] = getSmile(treeData)
    console.log(smiles);
  }
  const [treeData, setTreeData] = useState<Node>({
    smile: "#",
    level: -1,
    type: NodeType.Root,
    // children: [
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "BrCc1ccccc1.CC1(C)[C@H]2CN[C@H](CO)[C@H]21"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.O=Cc1ccccc1"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "BrCc1ccccc1.CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.ClCc1ccccc1"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl.ClCc1ccccc1"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "BrCc1ccccc1.CC1(C)C2CNC(CO)C21"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl.O=Cc1ccccc1"
    //   },
    //   {
    //     level: 0,
    //     type: NodeType.Node,
    //     smile: "CC(C)(C)[Si](C)(C)OC[C@@H]1NC[C@H]2[C@@H]1C2(C)C.O=Cc1ccccc1"
    //   }
    // ]
  });
  return (
    <div className="App" style={{height: "100vh"}}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="text" value={smile} id="" onChange={e => setSmile(e.target.value)} />
      <button onClick={handleCalculate}>Go</button>
      {treeData.children?.map(e => <p key={e.smile}>{e.smile}</p>)
      }
      <ParentSize>{({ width, height }) => <Tree width={width} height={height} data={treeData} setData={setTreeData} />}</ParentSize>,
      {/* <LineChart></LineChart> */}
      {/* <BasicTree data={ data } /> */}
    </div>
  )
}

export default App
