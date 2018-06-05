/* eslint-disable */

import React, { createElement } from 'react'
// will add fns to this file over time
/* eslint-disable import/prefer-default-export */
export const uniqueID = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

export const newline = val => {
  if (!val) return val
  // https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746
  return val.replace(/(\r\n|\n|\r)/gm, '\n').split('\n').map(function(item, key) {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    )
  })
}
export default {
  newline
}

// takes html within a string and returns jsx
export const replaceMarkup = (text, tagToReplace, replaceWithTag) => {
  if (!text) return text
  // format closing tag as required by createElement
  if (
    typeof (tagToReplace || replaceWithTag) === 'undefined' ||
    // if text has no markup, let it pass through
    text.indexOf(tagToReplace) === -1
  ) {
    return text
  } else {
    replaceWithTag = replaceWithTag.replace('<', '').replace('>', '')
    let openingTag = tagToReplace
    let closingTag = tagToReplace.substr(0, 1).concat('/', tagToReplace.substr(1, tagToReplace.length))

    let composeTextArr = []
    let { markedUpText, plainText } = ''

    while (text.indexOf(openingTag) != -1) {
      plainText = text.slice(0, text.indexOf(openingTag)) //text before tags
      composeTextArr.push({ [plainText]: false })
      markedUpText = text.slice(text.indexOf(openingTag) + 3, text.indexOf(closingTag)) // text within tags
      composeTextArr.push({ [markedUpText]: true })
      text = text.slice(text.indexOf(closingTag) + 4)
      if (text.indexOf(openingTag) === -1) {
        // trailing text with no subsequent tags
        composeTextArr.push({ [text]: false })
      }
    }

    return composeTextArr.map((element, i) => {
      if (Object.values(element)[0]) {
        return (
          <span key={i}>
            {createElement(replaceWithTag, { className: 'au-body' }, Object.keys(element)[0])}
          </span>
        )
      } else {
        return Object.keys(element)[0]
      }
    })
  }
}

// if validations fail and sortByDate returns false, the component receives the default date order obj
export const sortByDate = (dateArray, briefType, sortDirection) => {
  if (!['live', 'draft', 'closed'].includes(briefType)) {
    return false
  }
  if (!['dsc', 'asc'].includes(sortDirection)) {
    return false
  }
  if (!Array.isArray(dateArray)) {
    return false
  }
  if (dateArray.length === 0) {
    return false
  }

  if (sortDirection === 'asc') {
    return dateArray.sort(function(a, b) {
      if (briefType === 'draft') return new Date(b.createdAt) - new Date(a.createdAt)
      if (briefType === 'live') return new Date(b.publishedAt) - new Date(a.publishedAt)
      if (briefType === 'closed') return new Date(b.dates.closing_date) - new Date(a.dates.closing_date)
    })
  } else if (sortDirection === 'dsc') {
    return dateArray.sort(function(b, a) {
      if (briefType === 'draft') return new Date(b.createdAt) - new Date(a.createdAt)
      if (briefType === 'live') return new Date(b.publishedAt) - new Date(a.publishedAt)
      if (briefType === 'closed') return new Date(b.dates.closing_date) - new Date(a.dates.closing_date)
    })
  } else return false
}

export const getNextKey = obj => {
  const max = Object.keys(obj).map(Number).reduce((a, b) => {
    return a > b ? a : b
  }, -1)
  return max + 1
}
