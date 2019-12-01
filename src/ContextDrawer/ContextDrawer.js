import React, { useState, useEffect, useReducer } from "react";
import { Button, Select } from "./BaseComponents";
import { nodeTypes, modifierTypes } from "./constants";
import { fetchContextData } from "./fetchMocks";
import "./contextDrawer.css";

const selectNodes = state => state.nodes;

const useContextDataProvider = () => {
  const reducer = (state, {type, payload}) => {
    switch (type) {
      case "create": {
        const newNodes = selectNodes(state).concat({
          type: "",
          modifier: null
        });
        return { ...state, nodes: newNodes };
      }
      case "update": {
        const { index, type, modifier } = payload;
        const nodes = [...selectNodes(state)];
        const node = { ...nodes[index], type, modifier };
        nodes[index] = node;
        return { ...state, nodes };
      }
      case "delete": {
        const {index} = payload;
        const nodes = [...selectNodes(state)];
        nodes.splice(index, 1);
        return {...state, nodes}
      }
      case "loadNodes": {
        return { ...state, nodes: payload };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContextData().then(data => {
      const nodeData = data.nodes
      dispatch({ type: "loadNodes", payload: nodeData });
      setLoading(false);
    });
  }, []);

  const updateNode = payload => dispatch({ type: "update", payload: payload });
  const createNode = payload => dispatch({ type: "create", payload: payload });
  const deleteNode = payload => dispatch({ type: "delete", payload: payload });

  return { state, updateNode, createNode, deleteNode, loading };
};

const ContextDrawer = props => {
  const { state, updateNode, createNode, deleteNode, loading } = useContextDataProvider()
  return loading ? (
    <SkeletonDrawer />
  ) : (
    <ContextDisplay
      nodes={
        Object.values(selectNodes(state))
      }
      updateNode={updateNode}
      createNode={createNode}
      deleteNode={deleteNode}
    />
  );
};

const SkeletonDrawer = props => <div>Loading...</div>;

const ContextDisplay = props => {
  const { nodes, createNode, updateNode, deleteNode } = props;
  return (
    <div className="contextDisplay">
      {nodes.map((node, index) => {
        const handleChangeType = e =>
          updateNode({index, type: e.target.value });
        const handleChangeModifier = e =>
          updateNode({index, modifier: e.target.value });
        const handleDelete = e => 
          deleteNode({index})
        return (
          <div className="contextNode" key={`${node.type}_${node.modifier}_${index}`}>
            <Select
              category="Type"
              defaultOption={node.type}
              options={nodeTypes}
              handleChange={handleChangeType}
            />
            <Select
              category="Modifer"
              defaultOption={node.modifier}
              options={modifierTypes}
              handleChange={handleChangeModifier}
            />
            <Button text="Delete Node" onClick={handleDelete} />
          </div>
        );
      })}
      <Button text="Add Node" onClick={createNode} /> 
      <Button text="Save Changes" />
    </div>
  );
};

export default ContextDrawer;
