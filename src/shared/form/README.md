### Integrated form components.

The components in this dir are purely presentational components, designed to encapsulate `react-redux-form`'s behaviour between a `Control` and `Error` component.

We also take care of the high level integration between our custom components and `react-redux-form`

Most of these components will expose a similar (if not identical API).

Consisting of:

| Prop          | Type                    |
|---------------|-------------------------|
|  id           |  String (required)      |
|  name         |  String (required)      |
|  htmlFor      |  String (required)      |
|  label        |  String (required)      |
|  model        |  String|func (required) |
|  validators   |  Object                 |
|  messages     |  Object                 |
|  description  |  String                 |

Some components have `controlProps` and `mapProps` too. Implement as needed.