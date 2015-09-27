function count1s(n) {
    var iCount = 0,
        iFactor = 1,
        iLowerNum = 0,
        iCurrNum = 0,
        iHigherNum = 0;

    while( Math.floor(n/iFactor) != 0){
        iLowerNum = n - (Math.floor(n/iFactor))*iFactor;
        iCurrNum = (Math.floor(n/iFactor))%10;
        iHigherNum = Math.floor(n/(iFactor*10));
       
        switch(iCurrNum)
        {
            case 0:
                iCount += iHigherNum*iFactor;
                break;
            case 1:
                iCount += iHigherNum*iFactor+iLowerNum+1;
                break;
            default:
                iCount += (iHigherNum+1)*iFactor;
                break;
                       
        }
        iFactor *= 10;
       
    }
    return iCount; 
};

console.log(count1s(11));
