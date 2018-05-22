import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BriefDownloadResponses } from './BriefDownloadResponses'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const brief = {
  id: 1,
  title: 'Test Brief',
  responsesZipFilesize: null
}

const responses = [{}, {}]

test('Component mounts with a download button and a filesize in KB', () => {
  brief.responsesZipFilesize = 1024
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const button = component.find('button')
  expect(button.at(0).text()).toEqual('Download responses 1.00KB zip')
})

test('Component mounts with a download button and a filesize in MB', () => {
  brief.responsesZipFilesize = 1048576
  const component = mount(<BriefDownloadResponses brief={brief} briefResponses={responses} />)
  const button = component.find('button')
  expect(button.at(0).text()).toEqual('Download responses 1.00MB zip')
})
