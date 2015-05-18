package InsertInterval;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

import MergeIntervals.Interval;

/**
 * Definition for an interval.
 */
class Interval {
     int start;
     int end;
     Interval() { start = 0; end = 0; }
     Interval(int s, int e) { start = s; end = e; }
 }
public class Solution {
    public List<Interval> insert(List<Interval> intervals, Interval newInterval) {
    	List<Interval> list = new ArrayList<Interval>();
    	if (intervals == null || intervals.size() == 0) {
    		if (intervals == null) {
    			return null;
    		} else {
    			list.add(newInterval);
    			return list;
    		}
    	}
		Queue<Interval> queue = new PriorityQueue<Interval>(intervals.size(), new Comparator<Interval>() {
			@Override
			public int compare(Interval o1, Interval o2) {
				return o1.start == o2.start ? 0 : o1.start - o2.start;
			}
		});
		
		for (Interval itv : intervals) {
			queue.add(itv);
		}
		queue.add(newInterval);
		while (!queue.isEmpty()) {
			Interval itv = queue.poll();
			if (list.size() == 0 ) {
				list.add(itv);
			} else {
				Interval pre = list.get(list.size() - 1);
				if (pre.end >= itv.start) {
					list.remove(list.size() - 1);
					list.add(new Interval(pre.start, itv.end >= pre.end ? itv.end : pre.end));
				} else {
					list.add(itv);
				}
			}
		}
		return list;
    }
}
