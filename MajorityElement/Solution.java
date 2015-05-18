package MajorityElement;

public class Solution {
    public int majorityElement(int[] num) {
    	int candidate = num[0];
        for (int i=0,nTimes=0,len=num.length; i<len; i++) {
        	if (nTimes == 0) {
        		candidate = num[i];
        		nTimes = 1;
        	} else {
        		if (num[i] == candidate) {
        			nTimes++;
        		} else {
        			nTimes--;
        		}
        	}
        }
        return candidate;
    }
}
