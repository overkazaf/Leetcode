package DivideTwoIntegers;

public class Solution {
	public int INFINITE = Integer.MAX_VALUE;
    public int divide(int dividend, int divisor) {
    	return myDivide(dividend,divisor);
    }
    
    public int myDivide (long dividend, long divisor) {
    	if (divisor == 1)
    		return (int)(dividend);
    	if (dividend < 0)
    		return -myDivide(-dividend, divisor);
    	if (divisor < 0)
    		return -myDivide(dividend, -divisor);
    	long a = dividend;
        long b = divisor;
        long _b = b;
        int ret = 0;
        int shifts = 0;
        
        while (a > b) {
        	shifts = 1;
        	while (a > b) {
        		b <<= 1;
        		shifts <<= 1;
        	}
        	b >>= 1;
        	shifts >>= 1;
        	ret += shifts;
        	a -= b;
        	b = _b;
        }
        if(a == b)
        	ret++;
        return ret;
    }
    public static void main(String[] args) {
		Solution s = new Solution();
		System.out.println(s.divide(Integer.MIN_VALUE, -1));
	}
}
