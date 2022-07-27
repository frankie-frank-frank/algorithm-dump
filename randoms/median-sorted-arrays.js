function getMedian(ar1, ar2, n, m) {
  let i = 0;
  let j = 0;
  let count;
  let m1 = -1,
    m2 = -1;
  if ((m + n) % 2 == 1) {
    for (count = 0; count <= (n + m) / 2; count++) {
      if (i != n && j != m) {
        m1 = ar1[i] > ar2[j] ? ar2[j++] : ar1[i++];
        console.log(m1, i, j)
      } else if (i < n) {
        m1 = ar1[i++];
      }
      else {
        m1 = ar2[j++];
      }
      //console.log(m1, i, j)
    }
    return "Return value is: " + m1;
  } else {
    for (count = 0; count <= (n + m) / 2; count++) {
      m2 = m1;
      console.log("before: ", m2, m1, i, j, count, m, n)
      if (i != n && j != m) {
        m1 = ar1[i] > ar2[j] ? ar2[j++] : ar1[i++];
        console.log("after: ", m2, m1, i, j, count, m, n)
      } else if (i < n) {
        m1 = ar1[i++];
      }
      else {
        m1 = ar2[j++];
      }
    }
    return (m1 + m2) / 2;
  }
}

let ar1 = [5, 8, 10, 20];
let ar2 = [15, 1000];
 
let n1 = ar1.length;
let n2 = ar2.length;

console.log(getMedian(ar1, ar2, n1, n2))