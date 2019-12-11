import React, { useState, useEffect, useReducer } from "react";
import { fetchContextData, saveContextData } from "./fetchMocks";

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

export {useContextDataProvider}