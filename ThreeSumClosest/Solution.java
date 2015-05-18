package ThreeSumClosest;

import java.util.Arrays;

public class Solution {
	private int closest = 0;
	private boolean first = true;
    public int threeSumClosest(int[] num, int target) {
    	Arrays.sort(num);
        for (int i=0;i<num.length-2;i++) {
        	if(i!=0 && num[i] == num[i-1])
        		continue;
        	findClosest(num,i,i+1,num.length-1,target);
        }
        
        return closest;
    }
    
    public void findClosest(int a[],int p, int q, int s, int target){
    	while (q < s) {
    		int sum = a[p] + a[q] + a[s];
    		if (first || Math.abs(sum - target) < Math.abs(closest - target)) {
    			closest = sum;
    			first = false;
    		}
    		
    		if(sum <= target){
    			q++;
    			while (q < s && a[q] == a[q-1])
    				q++;
    		}else{
    			s--;
    			while (q < s && a[s] == a[s+1])
    				s--;
    		}
    	}
    }
}
