import * as util from '../utils'

export const navigate = async () => {
  await util.clickLink('Opportunities')
}

export const selectBrief = async title => {
  await util.clickLink(title)
}

export const applyForAtm = async () => {
  await util.clickLink('Apply for opportunity')
}

export const checkAppliedForAtm = async title => {
  await util.navigate()
  await util.selectBrief(title)
  await util.matchText('p', 'You have already applied for this opportunity.')
}

export const checkAppliedForRfx = async title => {
  await util.navigate()
  await util.selectBrief(title)
  await util.matchText('p', 'You have already applied for this opportunity.')
}

export const applyForRfx = async () => {
  await util.clickLink('Apply for opportunity')
}

export const applyForSpecialist = async number => {
  if (number === 0) {
    await util.clickLink('Apply Now')
  } else {
    await util.clickLink('Edit application')
    await util.clickLink('Add another specialist')
  }
}

export const viewSpecialistApplication = async title => {
  await util.clickLink('View your application')
  await util.matchText('h1', `Thanks for your application. You've now applied for ‘${title}’`)
}

export const applyForTraining = async () => {
  await util.clickLink('Apply Now')
}

export const viewTrainingApplication = async title => {
  await util.clickLink('View your application')
  await util.matchText('h1', `Thanks for your application. You've now applied for ‘${title}’`)
}
