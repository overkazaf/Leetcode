package FactorialTrailingZeroes;


public class Solution {
    public int trailingZeroes(int n) {
    	if (n <= 0) return 0;
    	int sum = 0;
    	for (int t=5; n>=t;t*=5) {
    			sum += Math.floor(n/t);
    	}
        return sum;
    }
}
