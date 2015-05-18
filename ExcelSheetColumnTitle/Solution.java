package ExcelSheetColumnTitle;

public class Solution {
    public String convertToTitle(int n) {
        StringBuilder sb = new StringBuilder();
        while (n > 0) {
        	int offset = (n-1)%26;
        	sb.append('A'+offset);
        	n/=26;
        }
        return sb.toString();
    }
}