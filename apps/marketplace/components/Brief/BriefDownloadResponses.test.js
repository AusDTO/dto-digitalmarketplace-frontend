import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BriefDownloadResponses } from './BriefDownloadResponses'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const brief = {
  id: 1,
  title: 'Test Brief',
  lot: 'digital-professionals',
  responsesZipFilesize: null
}

const responses = [{}, {}]

test('Component mounts with a download button and a filesize in KB when file is < 1MB in size', () => {
  brief.responsesZipFilesize = 1024
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const button = component.find('button')
  expect(button.at(0).text()).toEqual('Download responses 1.00KB zip')
})

test('Component mounts with a download button and a filesize in MB when file is >= 1MB in size', () => {
  brief.responsesZipFilesize = 1024 * 1024 * 10
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const button = component.find('button')
  expect(button.at(0).text()).toEqual('Download responses 10.00MB zip')
})

test('Component mounts without a download button when there are no responses', () => {
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={[]} />)
  const button = component.find('button')
  expect(button.length).toEqual(0)
})

test('Component mounts without a download button when the filesize is 0', () => {
  brief.responsesZipFilesize = 0
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={[]} />)
  const button = component.find('button')
  expect(button.length).toEqual(0)
})

test('Component mounts with singular "response" in heading when there is 1 response', () => {
  brief.responsesZipFilesize = 1024
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={[{}]} />)
  const heading = component.find('h1')
  expect(heading.at(0).text()).toEqual("You've had 1 response to your opportunity.Test Brief")
})

test('Component mounts with plural "responses" in heading when there is more than 1 response', () => {
  brief.responsesZipFilesize = 1024
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const heading = component.find('h1')
  expect(heading.at(0).text()).toEqual("You've had 2 responses to your opportunity.Test Brief")
})

test('Component mounts with plural "candidates" when there are at least 2 responses', () => {
  brief.responsesZipFilesize = 1024
  brief.lot = 'specialist'
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const heading = component.find('h1')
  expect(heading.at(0).text()).toEqual('2 candidates have responded to your opportunity.Test Brief')
})

test('Component mounts with singular "candidate" when there is 1 response', () => {
  brief.responsesZipFilesize = 1024
  brief.lot = 'specialist'
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={[{}]} />)
  const heading = component.find('h1')
  expect(heading.at(0).text()).toEqual('1 candidate has responded to your opportunity.Test Brief')
})

test('Component mounts with a download button with csv file type for outcome briefs', () => {
  brief.lot = 'digital-outcome'
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const button = component.find('button')
  expect(button.at(0).text()).toEqual('Download responses csv')
})
