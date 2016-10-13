import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { addStudy } from '../../redux/modules/casestudies'

const CaseStudyAdd = ({ redirect, dispatch }) => {
  let title
  let link

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (!title.value.trim() || !link.value.trim()) {
        return
      }

      dispatch(addStudy(title.value, link.value))
      title.value = ''
      link.value = ''
    }}>
      <fieldset>
        <legend>Add a Case Study</legend>
        <div>
          <label htmlFor="casestudy__title">Title</label>
          <input
            type="text" id="casestudy__title" name="title"
            ref={node => { title = node }}
          />
        </div>
        <div>
          <label htmlFor="casestudy__link">Links</label>
          <input
            type="text" id="casestudy__link" name="link"
            ref={node => { link = node }}
          />
        </div>
        <input type="submit" value="Add" role="button" />
      </fieldset>
    </form>
  )
}

CaseStudyAdd.propTypes = {
  redirect: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

export const mapStateToProps = ({ casestudies }) => {
  return {
    redirect: casestudies.added
  }
}



export default connect(mapStateToProps)(CaseStudyAdd)
