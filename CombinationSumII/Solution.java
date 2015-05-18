package CombinationSumII;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

public class Solution {
	private List<List<Integer>> list;
	private Stack<Integer> s;
    public List<List<Integer>> combinationSum2(int[] num, int target) {
        list = new ArrayList<List<Integer>>();
        s = new Stack<Integer>();
        int r;
        Arrays.sort(num);
        if (-1 == (r = checkRange(num, target))) {
        	return list;
        }
        backtrack(num, r, target);
        dedup();
        return list;
    }
    public void dedup () {
    	Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();
    	for (List<Integer> subList : list) {
    		StringBuilder sb = new StringBuilder();
    		for (Integer elem : subList) {
    			sb.append(elem);
    		}
    		map.put(sb.toString(),subList);
    	}
    	list = new ArrayList<List<Integer>>();
    	for (String key : map.keySet()) {
    		list.add(map.get(key));
    	}
    } 
    
    public int checkRange (int[] a, int t) {
    	for (int i = a.length - 1; i >= 0; i--) {
    		if (a[i] <= t) {
    			return i;
    		}
    	}
    	return -1;
    }
    public void backtrack (int[] a, int high, int t) {
    	if (t == 0) {
    		List<Integer> iList = new ArrayList<Integer>();
    		Stack<Integer> tempStack = new Stack<Integer>();
    		for (Integer e : s) {
    			tempStack.push(e);
    		}
    		while (!tempStack.isEmpty()) {
    			iList.add(tempStack.pop());
    		}
    		list.add(iList);
    	} else {
    		for (int r = high; r >= 0; r--) {
    			if (a[r] <= t) {
    				s.push(a[r]);
    				backtrack(a, r - 1, t - a[r]);
    				s.pop();
    			}
    		}
    	}
    }
    
//    public static void main(String[] args) {
//		Solution s = new Solution();
//		s.combinationSum2(new int[]{10,1,2,7,6,1,5}, 8);
//		System.out.println("[");
//		for (List<Integer> subList : s.list) {
//			System.out.print("[");
//			for (Integer elem : subList) {
//				System.out.print(elem + "->");
//			}
//			System.out.println("]");
//		}
//		System.out.println("]");
//	}
}