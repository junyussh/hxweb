export enum NodeType {
    Root = "root",
    Node = "node"
}
/**
 * @param level step
 */
export interface Node {
    /**
     * @param Root root 
     * @param Node node
     */
    type: NodeType;
    smile: string;
    /** smile level */
    level: number;
    isExpanded?: boolean;
    children?: Node[];
    parent?: Node;
}
const steps: Array<Array<string>> = [["CC1(C)[C@H]2CN[C@H](CO)[C@H]21",
    "BrCc1ccccc1.CC1(C)[C@H]2CN[C@H](CO)[C@H]21",
    "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.O=Cc1ccccc1",
    "BrCc1ccccc1.CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl",
    "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl",
    "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.ClCc1ccccc1",
    "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl.ClCc1ccccc1",
    "BrCc1ccccc1.CC1(C)C2CNC(CO)C21",
    "CC1(C)[C@H]2CN[C@H](CO)[C@H]21.Cl.O=Cc1ccccc1",
    "CC(C)(C)[Si](C)(C)OC[C@@H]1NC[C@H]2[C@@H]1C2(C)C.O=Cc1ccccc1",
],
["CC1(C)[C@@H](CO)[C@@H]1[C@H](N)CO",
    "CC1(C)[C@H](CO)[C@@H]1[C@H](N)CO",
    "CC1(C)[C@@H](C=O)[C@@H]1[C@H](N)CO",
    "CC(C)(C)OC(=O)N1C[C@H](C#N)[C@H](CO[Si](C)(C)C(C)(C)C)[C@H]1C(C)(C)[C@H](CO[Si](C)(C)C(C)(C)C)NC(=O)OCc1ccccc1",
    "CC(C)(C)OC(=O)N1C[C@H]2[C@H]([C@H]1CO)C2(C)C",
    "CC(C)(C)OC(=O)N1C[C@H](C#N)[C@H](CO[Si](C)(C)C(C)(C)C)[C@H]1C(C)(C)C",
    "CC(C)(C)OC(=O)N1C[C@H](C#N)[C@H](CO[Si](C)(C)C(C)(C)C)[C@H]1C(C)(C)[C@H](CO[Si](C)(C)C(C)(C)C)NC(=O)OC(C)(C)C",
    "CC1(C)[C@H](C=O)[C@@H]1[C@H](N)CO",
    "CC(C)(C)OC(=O)N1C[C@H](C#N)[C@H](CO[Si](C)(C)C(C)(C)C)[C@H]1C(C)(C)[C@@H](CO[Si](C)(C)C(C)(C)C)NC(=O)OCc1ccccc1",
    "CC1(C)[C@@H](CO)[C@@H]1[C@@H](N)CO",
], ["CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1",
    "CC1(C)[C@@H](CO)[C@@H]1C(=O)CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@@H](CO)NC(=O)OCc1ccccc1",
    "CC1(C)[C@@H](CO)[C@@H]1[C@@H]1CO1",
    "CC1(C)[C@H]2COC(=O)[C@H]21",
    "CC1(C)[C@@H](CO)[C@@H]1C(=O)CO.O=C[O-].[NH4+]",
    "CC1(C)[C@@H](CO)[C@@H]1[C@@H](CO)N[C@@H](CO)c1ccccc1",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.[NH4+].[OH-]",
    "CC(=O)[O-].[NH4+].CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1",
    "CC1(C)[C@H]2COC(=O)N[C@H]21",
], ["CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(C)[C@@H](CO)[C@@H](C(=O)CO)[C@@H]1CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(C)[C@@H](CO)[C@@H](C(=O)CO)C1(C)C",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.C[C@]12C[C@H]([C@@H]1CO)[C@@H](C(=O)CO)[C@@H]2CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(C)[C@@H](CO)[C@@H](C(=O)CO)C1(C)C=O",
], ["CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(C)[C@@H](CO)[C@@H](C(=O)CO)[C@@H]1CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.C[C@]12C[C@H](CO)[C@@H]([C@@H]1CO)[C@@H]2CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.C[C@]12C[C@H](CO)[C@@H]([C@H](CO)C1=O)[C@@H]2CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.COc1ccc(COC[C@H]2[C@@H](C(=O)CO)[C@H](CO)C2(C)C)cc1",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(CCl)[C@@H](CO)[C@@H](C(=O)CO)[C@@H]1CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC12C[C@H](O)[C@@H]([C@H](CO)C1(C)C)[C@@H]2C(=O)CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.C[C@]12C[C@H](CO)[C@@H]([C@H]1CO)[C@@H]2CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.C[C@]12C[C@H](CO)[C@@H]([C@H](CO)C1=O)[C@@H]2C(=O)CO",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.COC[C@H]1[C@@H](C(=O)CO)[C@H](CO)C2(C)CC12C",
    "CC1(C)[C@@H](CO)[C@@H]1[C@H]1CO1.CC1(C)[C@@H](CO)[C@@H](C(=O)CO)[C@@H](CO)[C@@H]1CO",
]]

export function getSmile(input: Node): Array<Node> | null {
    // const resp: Node = <Node>{};
    // resp.level = ++input.level;
    // resp.type = input.type;
    console.log(input);
    
    if(input.level+1 >= steps.length)
        return null;
    return steps[input.level+1].map(x => {
        const resp: Node = <Node>{};
        resp.parent = input;
        resp.level = input.level+1;
        resp.smile = x;
        resp.type = NodeType.Node;
        return resp;
    });
}