package LRUCache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class LRUCache {
    private List<Map<Integer,Integer>> cacheList = null;
    private Map<Integer, Integer> map = null;
    private int capacity = 0;
    public LRUCache(int capacity) {
    	map = new HashMap<Integer, Integer>();
    	cacheList = new ArrayList<Map<Integer, Integer>>();
    	this.capacity = capacity;
    }
    
    public int get(int key) {
        if (map.containsKey(key)) {
        	for (int i=0,size = cacheList.size(); i<size;i++) {
        		Map<Integer, Integer> cache = cacheList.get(i);
        		if (cache.containsKey(key)){
        			cacheList.remove(i);
        			cacheList.add(0,cache);
        			break;
        		}
        	}
        	return map.get(key);
        }
        return -1;
    }
    
    public void set(int key, int value) {
    	if(!map.containsKey(key)){
    		if (cacheList.size() == capacity) {
    			Map<Integer, Integer> lruMap = cacheList.get(capacity - 1);
    			map.remove(lruMap.keySet());
    			cacheList.remove(capacity - 1);
    		}
    	}
    	map.put(key, value);
    	Map<Integer, Integer> tempMap = new HashMap<Integer, Integer>();
		tempMap.put(key, value);
		cacheList.add(0,tempMap);
    }
}
