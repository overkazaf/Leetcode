package MedianofTwoSortedArrays;


public class Solution {
    public double findMedianSortedArrays(int A[], int B[]) {
        double res = 0.0;
        int m = A.length;
        int n = B.length;
        if(m == 0 || n == 0){
        	if(m == 0){
        		if(n % 2 == 1){
        			return B[n/2];
        		} else {
        			return (double)(B[n/2] + B[n/2 - 1]) / 2;
        		}
        	} else {
        		if(m % 2 == 1){
        			return A[m/2];
        		} else {
        			return (double)(A[m/2] + A[m/2 - 1]) / 2;
        		}
        	}
        } else {
        	int a[] = new int[m+n]; 
            for (int i=0,j=0,tot=0;i<m || j<n;tot++) {
            	if(i<m && j<n) {
            		if(A[i] < B[j]){
            			a[tot] = A[i++];
            		} else{
            			a[tot] = B[j++];
            		}
            	}else {
            		if(i<m){
            			a[tot] = A[i++];
            		}else {
            			a[tot] = B[j++];
            		}
            	}
            	if (tot == (m+n)>>1) {
            		if ((m+n) % 2 == 1) {
            			res = a[tot];
                	} else {
                		res = a[tot] + a[tot-1];
                		res /= 2;
                	}
            		break;
            	}
            }
        }
        return res;
    }
}
