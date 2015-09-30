var cache;
buildCache(10000);
var countPrimes = function(n) {
    var cnt = 0;
    for (var i=2;i<n;i++) {
        if(isPrime(i)) {
            cnt++;
        }
    }
    
    return cnt;
};

function buildCache (n) {
    cache = {};
    for (var i = 2; i < n; i++) {
        if (cache[i] === undefined)
            cache[i] = -1;
        else 
            continue;

        for (var j = i+i; j < n; j += i) {
            cache[j] = j;
        }
    }
}

function isPrime (k) {
    return (k in cache) && cache[k] === -1;
}

console.log(countPrimes(10));