package FourSum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
	private List<List<Integer>> list = null;
    public List<List<Integer>> fourSum(int[] num, int target) {
        list = new ArrayList<List<Integer>>();
        Arrays.sort(num);
        for (int i=0;i<num.length-3;i++) {
        	if(i!=0 && num[i] == num[i-1])
        		continue;
        	
        	for (int j=i+1;j<num.length-2;j++) {
        		if(j!=i+1 && num[j] == num[j-1])
        			continue;
        		judgeAndAdd(num,i,j,j+1,num.length-1,target);
        	}
        }
        return list;
    }
    
    public void judgeAndAdd (int n[], int a, int b, int c, int d, int target) {
    	while (c < d) {
    		int sum = n[a] + n[b] + n[c] + n[d];
        	if (sum < target) {
        		c++;
        	} else if (sum > target) {
        		d--;
        	} else {
        		List<Integer> iList = new ArrayList<Integer>();
        		iList.add(n[a]);
        		iList.add(n[b]);
        		iList.add(n[c]);
        		iList.add(n[d]);
        		list.add(iList);
        		c++;d--;
        		while (c < d && n[c] == n[c-1]) {
        			c++;
        		}
        		while (c < d && n[d] == n[d+1]) {
        			d--;
        		}
        	}
    	}
    } 
}