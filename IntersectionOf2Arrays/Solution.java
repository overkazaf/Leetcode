import java.lang.*;
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Map<Integer, Boolean> map = new HashMap<Integer, Boolean>();
        for (Integer i : nums1) {
        	map.put(i, true);
        }
        
        for (Integer i : nums2) {
        	map.put(i, true);
        }
        
        int[] ret = [];
        Integer[] keys = map.keySet();
        for (Integer key : keys){
        	
        }
    }
}