package Triangle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        if (triangle == null || triangle.size() == 0) 
        	return 0;
    	for (int i = 1, levels = triangle.size(); i < levels; i++) {
        	List<Integer> curList = triangle.get(i);
        	List<Integer> preList = triangle.get(i-1);
        	for (int j = 0, len = curList.size(); j < len; j++) {
        		if (j == 0 || j == len - 1) {
        			int val1,val2;
        			if (i == 1) {
        				val1 = preList.get(0);
        			} else {
        				int col;
        				if (j == 0) {
        					col = 0;
        				}else {
        					if (j-1 < 0) {
        						col = 0;
        					} else {
        						col = j - 1;
        					}
        				}
        				val1 = preList.get(col);
        			}
        			val2 = curList.get(j);
        			curList.set(j,val1+val2);
        		} else {
        			int mm = Math.min(preList.get(j-1 < 0 ? 0 : j-1), preList.get(j));
        			curList.set(j,mm + curList.get(j));
        		}
        	}
        }
    	List<Integer> lastList = triangle.get(triangle.size()-1);
    	return Collections.min(lastList);
    }
    
//    public static void main(String[] args) {
//		Solution s = new Solution();
//		List<List<Integer>> list = new ArrayList<List<Integer>>();
//		List<Integer> i1List = new ArrayList<Integer>();
//		List<Integer> i2List = new ArrayList<Integer>();
//		List<Integer> i3List = new ArrayList<Integer>();
//		i1List.add(-1);
//		i2List.add(2);i2List.add(3);
//		i3List.add(1);i3List.add(-1);i3List.add(-1);
//		list.add(i1List);list.add(i2List);list.add(i3List);
//		System.out.println(s.minimumTotal(list));
//		for (Integer elem : list.get(list.size() - 1)) {
//			System.out.print(elem + "->");
//		}
//	}
}
