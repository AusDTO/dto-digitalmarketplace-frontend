import AboutTeamStage from './AboutTeamStage'
import TeamLeadsStage from './TeamLeadsStage'

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

const CreateTeamStages = [aboutStage, teamLeadsStage]

export default CreateTeamStages
