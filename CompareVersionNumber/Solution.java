package CompareVersionNumber;

public class Solution {
    public int compareVersion(String version1, String version2) {
    	int idx1 = version1.indexOf('.');
    	int idx2 = version2.indexOf('.');
    	if (idx1 == -1 && idx2 == -1) {
    		int a = calc(version1);
    		int b = calc(version2);
    		return a == b ? 0 : (a<b?-1:1);
    	} else {
    		if (idx1 != -1 && idx2 != -1) {
    			int a = calc(version1.substring(0,idx1));
        		int b = calc(version2.substring(0,idx2));
        		return a == b ? compareVersion(version1.substring(idx1+1), version2.substring(idx2+1)) : (a < b ? -1 : 1);
    		} else {
    			if (idx1 == -1) {
    				int a = calc(version1);
            		int b = calc(version2.substring(0,idx2));
            		return a == b ? calZero(version2.substring(idx2+1),false) : (a < b ? -1 : 1);
    			} else {
            		int a = calc(version1.substring(0,idx1));
            		int b = calc(version2);
            		return a == b ? calZero(version1.substring(idx1+1),true) : (a < b ? -1 : 1);
    			}
    		}
    	}
    }
    
    public int calZero (String b, boolean reverse) {
    	int idx = b.indexOf('.');
    	while (idx != -1) {
    		if (calc(b.substring(0,idx)) == 0) {
    			b = b.substring(idx+1);
    			idx = b.indexOf('.');
    			continue;
    		} else {
    			return reverse ? 1 : -1;
    		}
    	}
    	return calc(b)==0?0:(reverse?1:-1);
    }
    public int calc(String str){
    	int sum = 0;
    	for (int i=0,len=str.length();i<len;i++) {
    		sum = 10 * sum + str.charAt(i) - '0';
    	}
    	return sum;
    } 
//    public static void main(String[] args) {
//		Solution solution = new Solution();
//		String v1 = "1";
//		String v2 = "1.1";
//		System.out.println(solution.compareVersion(v1, v2));
//	}
}