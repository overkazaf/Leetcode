package DecodeWays;

public class Solution {
    public int numDecodings(String s) {
        if(null == s || "".equals(s))
            return 0;
        else {
            return f(s,0);
        }
    }
    
    public int f(String str, int cnt) {
    	if (null == str || "".equals(str))
    		return 0;
    	int len = str.length();
    	if (1 == len) {
    		return 1;
    	} else if (len == 2) {
    		return cnt + (Character.isAlphabetic('A'+new Integer(str))?2:1);
    	} else {
    		return f(str.substring(0,len - 1), cnt + f(str.substring(0,len - 2), cnt));
    	}
    	
    }
    
    
//    public static void main(String[] args) {
//		Solution solution = new Solution();
//		System.out.println(solution.numDecodings("1"));
//	}
}
