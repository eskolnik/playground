import React, { useState, useEffect, useReducer } from "react";
import { Button, Select } from "./BaseComponents";
import { nodeTypes, modifierTypes } from "./constants";
import { useContextDataProvider } from "./ContextDataProvider"
import "./contextDrawer.css";

const selectNodes = state => state.nodes;

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
