import React, { Children, useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import { LinkHorizontal } from '@visx/shape'
import { getSmile, Node } from './getData'
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';
import { RectClipPath } from '@visx/clip-path';
// import LinkControls from './LinkControls';
// import getLinkComponent from './getLinkComponent';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

// const data: TreeNode = {
//   name: 'T',
//   isExpanded: false,
//   children: [
//     {
//       name: 'A',
//       isExpanded: true,
//       children: [
//         { name: 'A1' },
//         { name: 'A2' },
//         { name: 'A3' },
//         {
//           name: 'C',
//           children: [
//             {
//               name: 'C1',
//             },
//             {
//               name: 'D',
//               children: [
//                 {
//                   name: 'D1',
//                 },
//                 {
//                   name: 'D2',
//                 },
//                 {
//                   name: 'D3',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     { name: 'Z' },
//     {
//       name: 'B',
//       children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
//     },
//   ],
// };

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  data: Node;
  setData: React.Dispatch<React.SetStateAction<Node>>;
};

export default function Example({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  data: data,
  setData: setData
}: LinkTypesProps) {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;
  const width = totalWidth, height = totalHeight;
  const initialTransform = {
    scaleX: 1.27,
    scaleY: 1.27,
    translateX: -211.62,
    translateY: 162.59,
    skewX: 0,
    skewY: 0,
  };
  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  // const LinkComponent = getLinkComponent({ layout, linkType, orientation });
  const LinkComponent: React.ComponentType<any> = LinkHorizontal;
  useEffect(() => {
    forceUpdate();
    // console.log(data);

    console.log("useeffect update data")
  }, [])
  return totalWidth < 10 ? null : (
    <>
      <Zoom<SVGSVGElement> width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}>
        {(zoom) => (
          <div>
            <svg
              width={totalWidth}
              height={totalHeight}
              style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              ref={zoom.containerRef}
            >
              <RectClipPath id="zoom-clip" width={width} height={height} />
              <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
              <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d" />
              <Group top={margin.top} left={margin.left}>
                <Tree
                  root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
                >
                  {(tree) => (
                    <Group top={origin.y} left={origin.x}>
                      {tree.links().map((link, i) => (
                        <LinkComponent
                          key={i}
                          data={link}
                          percent={stepPercent}
                          stroke="rgb(254,110,158,0.6)"
                          strokeWidth="1"
                          fill="none"
                        />
                      ))}

                      {tree.descendants().map((node, key) => {

                        const width = 100;
                        const height = 30;

                        let top: number;
                        let left: number;
                        if (layout === 'polar') {
                          const [radialX, radialY] = pointRadial(node.x, node.y);
                          top = radialY;
                          left = radialX;
                        } else if (orientation === 'vertical') {
                          top = node.y;
                          left = node.x;
                        } else {
                          top = node.x;
                          left = node.y;
                        }

                        return (
                          <Group top={top} left={left} key={key}>
                            {node.depth === 0 && (
                              <circle
                                r={20}
                                fill="url('#links-gradient')"
                                onClick={() => {
                                  console.log(node.data);

                                  const smiles: Node[] | null = getSmile(node.data);

                                  if (smiles && node.data.isExpanded === undefined) {
                                    console.log("setData");

                                    // setData({...node.data, children: smiles, isExpanded: false, level: node.depth-1})
                                    node.data.children = smiles;
                                    node.data.isExpanded = false;
                                  } else {
                                    console.log("else");

                                    node.data.isExpanded = !node.data.isExpanded;

                                  }

                                  forceUpdate();
                                }}
                              />
                            )}
                            {node.depth !== 0 && (
                              <rect
                                height={height}
                                width={width}
                                y={-height / 2}
                                x={-width / 2}
                                fill="#272b4d"
                                stroke={node.data.children ? '#03c0dc' : '#26deb0'}
                                strokeWidth={1}
                                strokeDasharray={node.data.children ? '0' : '2,2'}
                                strokeOpacity={node.data.children ? 1 : 0.6}
                                rx={node.data.children ? 0 : 10}
                                onClick={() => {
                                  closeNodes(node.data.parent, node.data);
                                  const smiles: Node[] | null = getSmile(node.data);
                                  console.log(smiles);

                                  if (!node.children && smiles) {
                                    console.log("setData");

                                    // setData({...node.data, children: smiles, isExpanded: false, level: node.depth-1})
                                    node.data.children = smiles;
                                    node.data.isExpanded = false;
                                  } else {
                                    console.log(node.data);

                                    node.data.isExpanded = !node.data.isExpanded;
                                    console.log("close");

                                  }
                                  // node.data.isExpanded = !node.data.isExpanded;

                                  forceUpdate();
                                }}
                              />
                            )}
                            <text
                              dy=".33em"
                              fontSize={9}
                              fontFamily="Arial"
                              textAnchor="middle"
                              style={{ pointerEvents: 'none' }}
                              fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}
                            >
                              {node.depth}-{key}
                            </text>
                          </Group>
                        );
                      })}
                    </Group>
                  )}
                </Tree>
              </Group>
            </svg>
          </div>
        )}

      </Zoom>
    </>
  );
}

function closeNodes(parent: Node | undefined, current: Node) {
  if (parent && parent.children) {
    parent.children.forEach(element => {
      if (element !== current) {
        element.isExpanded = true;
      }

    });
  }

}
