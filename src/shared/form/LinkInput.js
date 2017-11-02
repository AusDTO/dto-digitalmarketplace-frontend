import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'
import Textfield from './Textfield'
import './css/LinkInput.css'

import { validLink } from '../../validators'

class LinkInput extends React.Component {

  static defaultProps = {
    mapProps: {},
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    model: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    messages: PropTypes.object,
    validators: PropTypes.object,
    description: PropTypes.string,
    controlProps: PropTypes.object,
    mapProps: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  }

  constructor (props) {
    super(props)

    this.state = {length: props.defaultRows || 1}
  }

  addRow (e: ReactEvent) {
    e.preventDefault()

    this.setState({
      length: this.state.length + 1,
    })

  }

  removeRow (id: number, e: ReactEvent) {
    e.preventDefault()

    this.setState({
      length: this.state.length > 1 ? this.state.length - 1 : 1,
    })
  }

  render () {
    const {
      id,
      name,
      htmlFor,
      label,
      description,
      model,
    } = this.props

    return (
      <div className="field" id={id}>
        <h2 >{label}</h2>
        {description && (
          <p className="hint" id={`${id}-hint`}>{description}</p>
        )}
        <div>
          {times(this.state.length, (i) => {
            return (
              <span key={id + i}>
                            {i > 0 && <span><hr styleName="hr"/>

                                <div className="row">
                                        <div className="col-xs-8 col-sm-10">
                                          <h3 >Additional link (optional)</h3>
                                        </div>
                                        <div className="col-xs-4 col-sm-2">
                                             <button type="button"
                                                     className="button-secondary col-xs-12 col-sm-3"
                                                     styleName="remove-button"
                                                     onClick={this.removeRow.bind(
                                                       this, i)}>
                                        Remove <span className="visuallyhidden">number {i +
                                             1}</span>
                                    </button>
                                        </div>
                                    </div>
                            </span>}
                <div className="row">
                                        <div className="col-xs-12 col-sm-10">
                                     <Textfield
                                       model={`${model}.${i}.title`}
                                       name="title"
                                       id={`${id}-${i}-title`}
                                       htmlFor={`${id}-${i}-title`}
                                       label="Link Title"
                                       description="As you would like it shown on the Digital Marketplace."
                                     />

                                    <Textfield
                                      model={`${model}.${i}.url`}
                                      label="Link URL"
                                      name="url"
                                      id={`${id}-${i}-url`}
                                      htmlFor={`${id}-${i}-url`}
                                      validators={{validLink}}
                                      messages={{
                                        validLink: 'Links provided must begin with http',
                                      }}
                                    />
                                    </div>
                                </div>
                            </span>
            )
          })}
          <button type="button" className="button-secondary"
                  styleName="anotherLinkButton"
                  onClick={this.addRow.bind(this)}>
            Add another link
          </button>
        </div>
      </div>
    )
  };
}

export default LinkInput