# Style Guide
## Eslint
Try to follow the [Airbnb Javascript Guide](https://github.com/airbnb/javascript).

The [Airbnb eslint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) has been enabled minus [jsx-filename-extension](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) and [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md).

We also use [Prettier](https://prettier.io)
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
export class MyClass extends Component {
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
## Pages and Content
### Routes
Define the base page route in `routes.js`
```jsx
<Switch>
  <Route path={`${rootPath}/myPage`} component={MyPage} />
```

### Pages
Pages `extends Component`, do sub-routing, redux, and pass props to content components.

Ensure you handle sub route default.
```jsx
class MyPage extends Component {
  static propTypes = {
    propA: PropTypes.string.isRequired,
    propB: PropTypes.bool.isRequired
  }
  
  componentWillMount() {
    this.props.loadData()
  }
  
  render() {
    const { propA, propB } = this.props
    <Switch>
      <Route
        exact path={match.url}
        render={() =>
          <MyForm
            propA={propA}
            propB={propB}
          />}
      />
      <Route component={NotFound} /> 
    </Switch>
  }
}

const mapStateToProps = state => {
  return {
    propA: state.myValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(myAction)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPage))
```

### Content
Content components are stateless
```jsx
const MyForm = props => {
  const { propA, propB } = props
  return (
    <div>
    </div>
  )
}

MyForm.propTypes = {
  propA: PropTypes.string.isRequired,
  propB: PropTypes.bool.isRequired
}
```
