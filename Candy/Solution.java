package Candy;

import java.util.Arrays;

public class Solution {
	public int candy(int[] ratings) {
		int dp[] = new int[ratings.length];
		Arrays.fill(dp, 1);
		for (int i=1;i<ratings.length;i++) {
			if (ratings[i] > ratings[i-1]) {
				dp[i] = dp[i-1]+1;
			}
		}
		
		for (int i=ratings.length - 1; i>0;i--) {
			if (ratings[i-1] > ratings[i]) {
				dp[i-1] = Math.max(dp[i]+1, dp[i-1]); 
			}
		}
		
		int sum = 0;
		for (int i=0;i<ratings.length;i++) {
			sum += dp[i];
		}
		return sum;
	}
}
