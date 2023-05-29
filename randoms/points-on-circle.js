// example: (x - 157)^2 + (y-93)^2 = 2465
/**
 * @param {number} xCenter
 * @param {number} yCenter 
 * @param {number} xUpper
 * @param {number} XLower
 * @param {number} yUpper
 * @param {number} yLower
 * @param {number} radius //can be calculated from using a known point on your circle
 */
function GenerateAllPointsOnCircle(xCenter, yCenter, xUpper, xLower, yUpper, yLower, radius){
    const finalArray = {}
    //define a bounds for x and y
    for(let xVal = xLower; xVal < xUpper; xVal+=0.01){
        for(let yVal = yLower; yVal < yUpper; yVal+=0.01){
            const ySquare = (yVal - yCenter) ** 2;
            const xSquare = (xVal - xCenter) ** 2;
            //within +/- 1
            if(xSquare + ySquare > radius - 0.5 && xSquare + ySquare < radius + 0.5){
                //get angle:
                let angle = Math.ceil((Math.atan2(yVal-yCenter,xVal-xCenter) * 180) / 3.14159);
                if(angle < 0) angle = 360 + angle
                finalArray[angle] = [Math.ceil(xVal), Math.ceil(yVal)]
            }
        }
    }
    return finalArray
}

console.log(GenerateAllPointsOnCircle(157, 93, 207, 107, 143, 43, 2465))