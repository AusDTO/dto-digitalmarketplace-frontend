# Style Guide

## Imports
Follow the pattern:
```javascript
// absolute imports
import React from 'react'
import PropTypes from 'prop-types'

// then a newline
// then relative imports
import { MyComponent } from "../../MyComponent";

// then a newline
// then css modules
import styles from './MyStyles.scss'
```
## Props
### Stateless Functional Components
```jsx
// destructure within function
// call the parameter props
const MyForm = props => {
  const { aProp, anotherProp } = props
  return (
    <div>
    </div>
  )
}

// include defaults for non-required
MyForm.defaultProps = {
  aProp: ''
}

// define a type for every prop
MyForm.propTypes = {
  anotherProp: PropTypes.number.isRequired,
  aProp: PropTypes.string
}
```
### Classes that extend Component
```jsx
export class PrivacyConsentPage extends Component {
  // use static proptypes
  static propTypes = {
    isLoading: PropTypes.bool,
    errors: PropTypes.arrayOf(string).isRequired
  };

  // and static defaultProps
  static defaultProps = {
    isLoading: false
  };
 
  // destructure inside render 
  render() {
    const { isLoading, errors } = this.props;

    return (
      <div>
      </div>
    )
  }
  ```
