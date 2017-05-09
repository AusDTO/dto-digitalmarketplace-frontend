import React from 'react';
import renderer from 'react-test-renderer';

import sampleState from './DashboardBriefs.json'
import {LiveBriefs, ClosedBriefs, DraftBriefs} from './DashboardBriefs';


test('LiveBriefs renders with props', () => {
  const state = Object.assign(sampleState, {})
   const component = renderer.create(
     <LiveBriefs live={state.team.briefs.live} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

test('LiveBriefs renders with no props', () => {
  const liveBriefs = []
   const component = renderer.create(
     <LiveBriefs live={liveBriefs} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

 test('ClosedBriefs renders with props', () => {
  const state = Object.assign(sampleState, {})
   const component = renderer.create(
     <ClosedBriefs closed={state.team.briefs.closed} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

test('ClosedBriefs renders with no props', () => {
  const closedBriefs = []
   const component = renderer.create(
     <ClosedBriefs closed={closedBriefs} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

 test('DraftBriefs renders with props', () => {
  const state = Object.assign(sampleState, {})
   const component = renderer.create(
     <DraftBriefs draft={state.team.briefs.draft} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })

test('DraftBriefs renders with no props', () => {
  const draftBriefs = []
   const component = renderer.create(
     <DraftBriefs draft={draftBriefs} />
   )
   let tree = component.toJSON()
   expect(tree).toMatchSnapshot()
 })




