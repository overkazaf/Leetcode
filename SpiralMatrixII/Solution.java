package SpiralMatrixII;

import java.util.Arrays;

public class Solution {
	public int[][] generateMatrix(int n) {
		int a[][] = new int[n][n];
		if(n == 0)
			return a;
		for (int i = 0; i < n; i++) {
			Arrays.fill(a[i], 0);
		}
		int x, y, tot = 1;
		a[x = 0][y = 0] = 1;
		while (tot < n * n ) {
			while (y + 1 < n && 0 == a[x][y+1])
				a[x][++y] = ++tot;
			while (x + 1 < n && 0 == a[x+1][y])
				a[++x][y] = ++tot;
			while (y >= 1 && 0 == a[x][y-1])
				a[x][--y] = ++tot;
			while (x >= 1 && 0 == a[x-1][y])
				a[--x][y] = ++tot;
		}
		return a;
	}
}
