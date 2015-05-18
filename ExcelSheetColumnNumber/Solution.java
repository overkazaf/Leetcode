package ExcelSheetColumnNumber;

public class Solution {
    public int titleToNumber(String s) {
    	if(s == null || "".equals(s))return 0;
        int len = s.length();
        int n = 0;
        for (int i=0;i<len;i++) {
        	n = (n*26) + s.charAt(i) - 'A' + 1;
        }
        return n;
    }
}