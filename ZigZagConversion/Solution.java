package ZigZagConversion;

import java.util.Arrays;

public class Solution {
    public String convert(String s, int nRows) {
    	if(nRows == 1)
    		return s;
    	int len = s.length();
    	int n = nRows;
    	char b[][] = new char[n][len];
    	for(int i=0;i<n;i++){
    		Arrays.fill(b[i], ' ');
    	}
    	StringBuilder sb = new StringBuilder();
    	int tot = 0;
    	int x = 0;
    	int y = 0;
    	while (tot < len) {
    		while(x+1 <= n && tot < len)b[x++][y] = s.charAt(tot++);
    		--x;
    		while(x-1 >= 0 && tot < len)b[--x][++y] = s.charAt(tot++);
    		++x;
    	}
    	for (int i=0;i<n;i++) {
    		for (int j=0;j<len;j++) {
    			if (b[i][j] != ' ') {
    				sb.append(b[i][j]);
    			}
    		}
    	}
    	
    	return sb.toString();
    }
}
