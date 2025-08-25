import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Background,
  Controls,
  ControlButton,
} from "react-flow-renderer";
import { useStore } from "../store/useStore";
import "./CanvasArea.css";
import "react-flow-renderer/dist/style.css";
import react, { useCallback, useState } from "react";
import ContextMenu from "./ContextMenu";

const CanvasArea = () => {
  const { setNodes, setEdges } = useStore();
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState([]);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    nodeId: null,
  });

  const undo = () => useStore.temporal.getState().undo();
  const redo = () => useStore.temporal.getState().redo();

  const onDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("blockType");
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: "default",
      position: { x: e.clientX - 200, y: e.clientY - 100 },
      data: { label: type === "blockA" ? "Block A" : "Block B" },
    };
    useStore.getState().setNodes([...nodes, newNode]);
  };

  const isValidConnection = (connection) => {
    const source = nodes.find((n) => n.id === connection.source);
    const target = nodes.find((n) => n.id === connection.target);
    return source?.data.label === "Block A" && target?.data.label === "Block B";
  };

  const deleteSelected = () => {
    const currentNodes = useStore.getState().nodes;
    const currentEdges = useStore.getState().edges;

    const filteredNodes = currentNodes.filter(
      (node) => !selectedNodeIds.includes(node.id)
    );
    const filteredEdges = currentEdges.filter(
      (edge) => !selectedEdgeIds.includes(edge.id)
    );

    useStore.getState().setNodes(filteredNodes);
    useStore.getState().setEdges(filteredEdges);
  };

  const handleNodeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  };

  const onSelectionChange = useCallback(({ nodes, edges }) => {
    setSelectedNodeIds(nodes.map((n) => n.id));
    setSelectedEdgeIds(edges.map((e) => e.id));
  }, []);

  const onNodesChange = useCallback((changes) => {
    useStore
      .getState()
      .setNodes(applyNodeChanges(changes, useStore.getState().nodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    useStore
      .getState()
      .setEdges(applyEdgeChanges(changes, useStore.getState().edges));
  }, []);

  return (
    <div
      className="canvas-area"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => {
          if (isValidConnection(params)) {
            setEdges(addEdge(params, edges));
          }
        }}
        fitView
        onSelectionChange={onSelectionChange}
        onPaneClick={() => setContextMenu({ visible: false })}
        onNodeContextMenu={handleNodeContextMenu}
        connectionLineType="smoothstep"
      >
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            nodeId={contextMenu.nodeId}
            onClose={() => setContextMenu({ visible: false })}
          />
        )}
        <Background />
        <Controls>
          <div className="canvas-controls">
            <ControlButton onClick={undo}> Undo</ControlButton>
            <ControlButton onClick={redo}> Redo</ControlButton>
            <ControlButton onClick={deleteSelected}> Delete</ControlButton>
          </div>
        </Controls>
      </ReactFlow>
    </div>
  );
};
export default CanvasArea;
