import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import renderer from 'react-test-renderer';
import createStore from '../../redux/create';

import sampleState from './Views.json'
import {LiveBriefs, ClosedBriefs, TeamOverview, DraftBriefs, DashboardBriefs} from './Views';


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



