/**
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
var computeArea = function(A, B, C, D, E, F, G, H) {
    var areaA = (C - A) * (D - B);
    var areaB = (G - E) * (H - F);
    var tot = areaA + areaB;
    if (A >= G || E >= C || F >= D || B >= H ) {
    	return tot;
    }

    var interSec = (Math.min(C, G) - Math.max(A, E)) * (Math.min(D, H) - Math.max(B, F))
    return tot - interSec;
};