package MultiplyStrings;

import java.util.Arrays;

public class Solution {
    public String multiply(String num1, String num2) {
        int[] a = new int[num1.length() + num2.length()];
        String revA = new StringBuilder(num1).reverse().toString();
        String revB = new StringBuilder(num2).reverse().toString();
        Arrays.fill(a, 0);
        int maxLen = 0;
        int lenB = revB.length();
        for (int i = 0, lenA = revA.length(); i < lenA; i++) {
        	int f = revA.charAt(i) - '0';
        	for (int j = 0; j < lenB; j++) {
        		a[i+j] += f*(revB.charAt(j) - '0');
        	}
        	
        	//fix array;
        	int k = i;
        	for (; k < i + lenB; k++) {
        		if (a[k] >= 10) {
        			a[k+1] += a[k]/10;
        			a[k] %= 10;
        		}
        	}
        	
        	while (a[k] >= 10) {
        		if (a[k] >= 10) {
        			a[k+1] += a[k]/10;
        			a[k] %= 10;
        		}
        		k++;
        	}
        	maxLen = k + 1;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < maxLen; i++) {
        	sb.append(a[i]+"");
        }
        String r = sb.reverse().toString();
        boolean flag = true;
        for (int i = 0, len = r.length(); i < len; i++) {
        	if (r.charAt(i) != '0') {
        		flag = false;
        		break;
        	}
        }
        if (flag)
        	return "0";
        
        return r.charAt(0) == '0'?r.substring(1) : r;
    }
    
    
    public static void main(String[] args) {
		Solution s = new Solution();
		String str1 = "9123";
		String str2 = "0000";
		System.out.println(s.multiply(str1, str2));
	}
}
