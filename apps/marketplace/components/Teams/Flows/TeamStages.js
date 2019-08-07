import { validEmail } from 'marketplace/components/validators'
import AboutTeamStage from './AboutTeamStage'
import PermissionsStage from './PermissionsStage'
import ReviewTeamStage from './ReviewTeamStage'
import TeamLeadsStage from './TeamLeadsStage'
import TeamMembersStage from './TeamMembersStage'

const aboutStage = {
  component: AboutTeamStage,
  isDone: formValues => formValues.name.length > 0 && validEmail(formValues.emailAddress),
  slug: 'about',
  title: 'About'
}

const teamLeadsStage = {
  component: TeamLeadsStage,
  isDone: formValues => Object.keys(formValues.teamLeads).length > 0,
  slug: 'leads',
  title: 'Team leads'
}

const teamMembersStage = {
  component: TeamMembersStage,
  isDone: formValues => {
    if (!formValues.teamMembers) {
      return false
    }

    return Object.keys(formValues.teamMembers).length > 0
  },
  slug: 'members',
  title: 'Team members'
}

const permissionsStage = {
  component: PermissionsStage,
  isDone: formValues => {
    if (!formValues.teamMembers) {
      return false
    }

    return Object.keys(formValues.teamMembers).every(userId => formValues.teamMembers[userId].permissions)
  },
  slug: 'permissions',
  title: 'Permissions'
}

const reviewStage = {
  component: ReviewTeamStage,
  isDone: true,
  slug: 'review',
  title: 'Review'
}

export const CreateTeamStages = [aboutStage, teamLeadsStage, teamMembersStage, permissionsStage, reviewStage]
export const EditTeamStages = [aboutStage, teamLeadsStage, teamMembersStage, permissionsStage]

export default CreateTeamStages
