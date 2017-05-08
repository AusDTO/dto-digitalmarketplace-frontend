import React from 'react';
import renderer from 'react-test-renderer';

import sampleState from '../DashboardBriefs/DashboardBriefs.json'
import TeamOverview from './TeamOverview'

test('TeamOverview renders with props', () => {
  const state = Object.assign(sampleState, {})
   const component = renderer.create(
     <TeamOverview members={state.team.members} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

test('TeamOverview renders with no props', () => {
  const members = []
   const component = renderer.create(
     <TeamOverview members={members} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })
