import AboutTeamStage from './AboutTeamStage'
import TeamLeadsStage from './TeamLeadsStage'

const aboutStage = {
  slug: 'about',
  title: 'About',
  component: AboutTeamStage,
  isDone: true
}

const teamLeadsStage = {
  slug: 'leads',
  title: 'Team leads',
  component: TeamLeadsStage,
  isDone: true
}

const CreateTeamStages = [aboutStage, teamLeadsStage]

export default CreateTeamStages
