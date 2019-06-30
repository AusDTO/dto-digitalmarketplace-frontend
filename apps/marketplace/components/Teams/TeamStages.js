import { validEmail } from 'marketplace/components/validators'
import AboutTeamStage from './AboutTeamStage'
import PermissionsStage from './PermissionsStage'
import ReviewStage from './ReviewStage'
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
  isDone: true,
  slug: 'leads',
  title: 'Team leads'
}

const teamMembersStage = {
  component: TeamMembersStage,
  isDone: true,
  slug: 'members',
  title: 'Team members'
}

const permissionsStage = {
  component: PermissionsStage,
  isDone: true,
  slug: 'permissions',
  title: 'Permissions'
}

const reviewStage = {
  component: ReviewStage,
  isDone: true,
  slug: 'review',
  title: 'Review'
}

const CreateTeamStages = [aboutStage, teamLeadsStage, teamMembersStage, permissionsStage, reviewStage]

export default CreateTeamStages
