import React from 'react'

class PageHeader extends React.PureComponent {
  render() {
    const { organisation, title } = this.props

    return (
      <div className="row">
        <div className="col-sm-12">
          <small>{organisation}</small>
          <div className="row">
            <div className="col-xs-12">
              <h1 className="au-display-xl">{title}</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageHeader
