package CloneGraph;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Definition for undirected graph.
 **/
class UndirectedGraphNode {
	int label;
	List<UndirectedGraphNode> neighbors;

	UndirectedGraphNode(int x) {
		label = x;
		neighbors = new ArrayList<UndirectedGraphNode>();
	}
};

public class Solution {
	
	public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
		if (node == null) {
			return null;
		}
		UndirectedGraphNode v = new UndirectedGraphNode(node.label);
		v.neighbors = new ArrayList<UndirectedGraphNode>();
		v.neighbors.addAll(node.neighbors);
		for (int i=0;i<node.neighbors.size();i++) {
			UndirectedGraphNode child = node.neighbors.get(i);
			if (child.neighbors != null) {
				dfs(v.neighbors.get(i),child);
			}
		}
		return v;
	}
	
	public void dfs (UndirectedGraphNode x, UndirectedGraphNode y) {
		x.neighbors = new ArrayList<UndirectedGraphNode>();
		x.neighbors.addAll(y.neighbors);
		for (int i=0;i<y.neighbors.size();i++) {
			UndirectedGraphNode child = y.neighbors.get(i);
			if (child.neighbors != null) {
				dfs(x.neighbors.get(i),child);
			}
		}
	}
}
