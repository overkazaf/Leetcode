package MaximumGap;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.TreeMap;

import javax.management.Query;

public class Solution {
    public int maximumGap(int[] num) {
    	if (num.length < 2)
    		return 0;
        PriorityQueue<Integer> priQuery = new PriorityQueue<Integer>();
        for (int i=0;i<num.length;i++) {
        	priQuery.add(num[i]);
        }
        boolean first = true;
        int pre = 0,maxGap = 0;
        while(!priQuery.isEmpty()) {
        	Integer item = priQuery.poll();
        	if (first){
        		pre = item;
        		first = false;
        		continue;
        	}
        	if (pre == item)continue;
        	else {
        		maxGap = Math.max(maxGap, item - pre);
        		pre = item;
        	}
        }
        return maxGap;
    }
    
    public static void main(String[] args) {
		Solution solution = new Solution();
		int []num = new int[]{1,100000};
		System.out.println(solution.maximumGap(num));
	}
}
