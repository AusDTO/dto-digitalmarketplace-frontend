import AboutTeamStage from './AboutTeamStage'
import PermissionsStage from './PermissionsStage'
import TeamLeadsStage from './TeamLeadsStage'
import TeamMembersStage from './TeamMembersStage'

const aboutStage = {
  component: AboutTeamStage,
  isDone: true,
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

const CreateTeamStages = [aboutStage, teamLeadsStage, teamMembersStage, permissionsStage]

export default CreateTeamStages
