package JumpGameII;

public class Solution {
    public int jump(int[] A) {
    	int curDest = A.length - 1;
    	int cursor = 0;
    	int step = 0;
    	while (true) {
    		while (cursor != curDest) {
    			if (A[cursor] + cursor >= curDest) {
    				curDest = cursor;
    				step++;
    				cursor = 0;
    				break;
    			}
    			cursor++;
    		}
    		if (curDest <= 0)break;
    	}
    	return step;
    }
    
//    public static void main(String[] args) {
//		Solution solution = new Solution();
//		int a[] =  new int[]{2,3,1,1,4};
//		System.out.println(solution.jump(a));
//	}
}
