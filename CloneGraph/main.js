/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
var map = {};
var cloneGraph = function(graph) {
   	if (graph) {
   		if (map[graph] !== graph) {
   			map[graph] =  new UndirectedGraphNode(graph.label);
   			var cloned = new UndirectedGraphNode(graph.label);
		   	if (graph.neighbors) {
		   		for (var i = 0, l = graph.neighbors.length; i < l; i++) {
			   		cloned.neighbors[i] = cloneGraph(graph.neighbors[i]);
			   	}
		   	}
		    return cloned;
   		}
   	}
};

