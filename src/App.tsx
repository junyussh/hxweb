import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Tree from './Tree'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { getSmile, Node, NodeType } from './getData';
import { Navbar, Button, TextInput } from 'flowbite-react'
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
    setTreeData({ ...treeData, smile: smile })
    // treeData.smile = smile
    console.log(treeData);

    const smiles: Node[] = getSmile(treeData)
    console.log(smiles);
  }
  const [treeData, setTreeData] = useState<Node>({
    smile: "#",
    level: -1,
    type: NodeType.Root,
  });
  return (
    <>
      <Navbar
        fluid={false}
        rounded={false}
        className="max-w-7xl py-2"
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/navbars"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            About
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Services
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Pricing
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="container" style={{ height: "100vh" }}>
        {/* <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div> */}
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <TextInput type="text" value={smile} id="" onChange={e => setSmile(e.target.value)} />
        <Button onClick={handleCalculate}>Go</Button>
        {treeData.children?.map(e => <p key={e.smile}>{e.smile}</p>)
        }
        <ParentSize>{({ width, height }) => <Tree width={width} height={height} data={treeData} setData={setTreeData} />}</ParentSize>,
        {/* <LineChart></LineChart> */}
        {/* <BasicTree data={ data } /> */}
      </div>
    </>
  )
}

export default App
