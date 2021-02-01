export function RomanNumeralConverter (value, romanNumeral) {
  if (romanNumeral === 'number') {
    return value
  }
  // Roman rules 1,4,5,9,10,40,50,90,100,400,500,900,1000 the symbol changes during 1,4,5,9
  const romanChart = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
  let roman = ''
  // Loop object from highest.
  for (let key in romanChart) {
    // See if number is great or equal to roman
    while (value >= romanChart[key]) {
      // If it is you had that roman symbol in to variable roman
      roman += key
      // Then deduct the actual romanChart number from the number you inserted so we can move on with next number.
      value -= romanChart[key]
    }
  }
  return roman
}
