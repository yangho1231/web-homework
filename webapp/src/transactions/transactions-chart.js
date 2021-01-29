/* eslint react/prop-types: 0 */
import React from 'react'
import { Bar } from 'react-chartjs-2'

export function TransactionsCharts (props) {
  var newCategoryObject = props.data.reduce((object, item) => {
    let category = item.category.categoryName
    let amount = item.amount
    if (!object.hasOwnProperty(category)) {
      object[category] = 0
    }
    object[category] += amount
    return object
  }, {})
  let labelArray = []
  let dataArray = []
  for (let key in newCategoryObject) {
    labelArray.push(key)
    dataArray.push(newCategoryObject[key])
  }
  return (
    <div>
      <Bar
        data={{
          labels: labelArray,
          datasets: [
            {
              label: 'Amount spent in categories',
              data: dataArray
            }
          ]
        }}
        height={300}
        options={{
          maintainAspectRatio: false
        }}
        width={80}
      />
    </div>
  )
}
