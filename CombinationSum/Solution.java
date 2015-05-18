package CombinationSum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Stack;

/*
 * For example, given candidate set 2,3,6,7 and target 7,
	A solution set is:
	[7]
	[2, 2, 3] 
 * */
public class Solution {
	private List<List<Integer>> list;
	private Stack<Integer> s;
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        list = new ArrayList<List<Integer>>();
        s = new Stack<Integer>();
        int r;
        Arrays.sort(candidates);
        if (-1 == (r = checkRange(candidates, target))) {
        	return list;
        }
        backtrack(candidates, r, target);
        return list;
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
    				backtrack(a, r, t - a[r]);
    				s.pop();
    			}
    		}
    	}
    }
    
//    public static void main(String[] args) {
//		Solution s = new Solution();
//		s.combinationSum(new int[]{2,3,6,7}, 7);
//		for (List<Integer> subList : s.list) {
//			System.out.println("[");
//			for (Integer elem : subList) {
//				System.out.print(elem + "->");
//			}
//			System.out.println("]");
//		}
//	}
}
