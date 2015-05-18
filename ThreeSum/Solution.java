package ThreeSum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
	private List<List<Integer>> list = null;
    public List<List<Integer>> threeSum(int[] num) {
        list = new ArrayList<List<Integer>>();
        Arrays.sort(num);
        for (int i=0;i<num.length;i++) {
        	if(i!=0 && num[i] == num[i-1])continue;
        	judgeAndAdd(num,i,i+1,num.length-1);
        }
        return list;
    }
    
    public void judgeAndAdd(int []a, int i, int p, int q) {
    	while (p < q) {
    		if (a[p] + a[q] < -a[i]) {
        		p++;
        	} else if (a[p] + a[q] > -a[i]) {
        		q--;
        	} else {
        		List<Integer> iList = new ArrayList<Integer>();
        		iList.add(a[i]);
        		iList.add(a[p]);
        		iList.add(a[q]);
        		list.add(iList);
        		p++;q--;
        		while (p < q && a[p] == a[p - 1]) {  
                    p++;  
                }  
                while (p < q && a[q] == a[q + 1]) {  
                    q--;  
                } 
        	}
    	}
    }
}