import React from 'react'

const AssessmentCriteria = (props) => {
  const {service_slug} = props
  switch (service_slug) {
    case 'strategy':
      return (
        <span>Strategy and policy case studies must demonstrate <b>2 or more</b> of the following criteria:
          <ul>
            <li>Analysis of new technologies with respect to existing products, practices or processes.</li>
            <li>
              Developing recommendations based on the quantitative and qualitative evidence gathered via web analytics,
              applications data, financial data and user feedback.
            </li>
            <li>Business case development and recommendations on investment alternatives.</li>
            <li>Provide policy interpretation and advice to delivery teams.</li>
          </ul>
        </span>
      )
    case 'userresearch':
      return (
        <span>User research and design case studies must demonstrate <b>3 or more</b> of the following abilities and experiences:
          <ul>
            <li>Plan, design, conduct and analyse user research in an agile delivery environment.</li>
            <li>
              Recruit participants from diverse audiences, including people with disability, CALD audiences and 
              other minority groups. Provide facilities for usability testing.
            </li>
            <li>
              Visually communicate user research through presentations, journey maps, videos etc. to clarify key 
              outcomes and generate empathy for end users.
            </li>
            <li>
              Map existing user experiences and user needs of government services and analyse existing web and 
              mobile service delivery operations.
            </li>
            <li>
              Identify failure demand in existing services and opportunities for reducing failure demand, 
              reducing the cost of the service and improving the user experience.
            </li>
            <li>Iterate service designs based on user research.</li>
            <li>Create design hypotheses to improve the service and run measurable design experiments.</li>
            <li>
              Develop concepts based on research insights. Iteratively test concepts with end users, from 
              paper sketches to HTML prototypes.
            </li>
            <li>
              Extensive experience of web and mobile application interface design with a focus on accessibility, 
              designing for different screen sizes and input methods (for example, touch, mouse and keystroke) 
              following style guides and WCAG 2.0 AA guidelines.
            </li>
            <li>Respond in a pragmatic and constructive manner to feedback and constraints that impact the design.</li>
            <li>Perform accessibility audits to uncover accessibility issues and get recommended fixes.</li>
            <li>
              Communicate how design decisions impact accessibility to a wide range of digital delivery 
              disciplines both internally and externally.
            </li>
          </ul>
        </span>
      )
    case 'deliverygov':
      return (
        <span>Agile delivery and governance Case studies must demonstrate <b>2 or more</b> of the following abilities and experiences:
          <ul>
            <li>Responsible for delivery and ongoing management of high-quality digital product or service.</li>
            <li>Lead multi-disciplinary agile teams to deliver or iterate services that meet user needs.</li>
            <li>Clarify business priorities, roles and responsibilities and secure individual and team ownership.</li>
            <li>
              Working with data - excellent analytical and problem solving skills, from gathering and analysis 
              through to design and presentation.
            </li>
            <li>
              Identify a range of relevant and credible information sources and recognise the need to collect 
              new data when necessary from internal and external sources.
            </li>
            <li>Articulate “to be” services via roadmaps, backlogs and user stories.</li>
            <li>Prioritise work to be done against user need, team capacity and team capability.</li>
            <li>Communicate service performance against key indicators to internal and external stakeholders.</li>
            <li>
              Expertise with data analysis, web analytics and visualisation tools (for example, Google 
              Analytics, Google Refine or Tableau).
            </li>
            <li>Report progress, budgets, risks and impediments. Propose mitigation solutions.</li>
            <li>Define how user / financial benefit can be realised and measured.</li>
            <li>
              Ensure an appropriate level of quality and compliance for a service’s stage (alpha/beta/production).
            </li>
            <li>
              Governing delivery and continuous improvement of a digital service, aligned to the the
              <a href="//www.dta.gov.au/standard/" target="_blank" rel="external noopener noreferrer">Digital Service Standard</a>
            </li>
          </ul>
        </span>
      )
    case 'engineering':
      return (
        <span> Software engineering and development case studies must demonstrate <b>3 or more</b> of the following abilities and experience:
          <ul>
            <li>
              Research and weigh up competing technology choices and make informed decisions based on user 
              needs, with a preference for open source technology.
            </li>
            <li>Experience using and deploying on cloud-based platforms.</li>
            <li>
              Use and implementation of modern front end web programming techniques, such as HTML5, CSS3, 
              AJAX, REST and JSON.
            </li>
            <li>
              Good development skills in one or more of .Net, Java, Ruby, Python, JavaScript, PHP or similar with familiarity 
              with one or more open source web frameworks such as Rails, Django, SharePoint, Drupal or similar.
            </li>
            <li>Proven capability in managing technology implementation projects.</li>
            <li>Track record of successfully taking an evolutionary architecture approach to software architecture.</li>
            <li>
              Experience building and scaling high-traffic websites and/or high volume transaction processing 
              and analysis platforms.
            </li>
            <li>
              Experience designing and implementing scalable and robust approaches to caching, security and 
              databases (including relational, for example, MySQL and PostgreSQL or similar; and NoSQL, 
              for example, Cassandra and MongoDB or similar).
            </li>
            <li>
              Deep and wide experience with infrastructure and platform technologies like AWS, Google Cloud, 
              Cloud Foundry, Deis, Tsuru or similar
            </li>
            <li>
              Deep and wide knowledge of the plumbing of the internet (TCP/IP, routing, bridging, HTTP, SSL, DNS, mail).
            </li>
            <li>Experience with automated configuration management, deployment and testing solutions.</li>
            <li>Experience configuring and managing Linux servers for serving a dynamic website.</li>
            <li>
              Experience debugging a complex multi-server service.
              Familiarity with configuration management tools like Puppet and Chef or similar.
            </li>
          </ul>
        </span>
      )
    case 'ops':
      return (
        <span>Support and operations case studies must demonstrate <b>3 or more</b> of the following abilities:
          <ul>
            <li>
              Strong triage skills, creative problem solving and logical decision making on complex support and services issues.
            </li>
            <li>
              Evaluate, troubleshoot, and follow-up on customer issues as well as replicate and document for further escalation.
            </li>
            <li>Communicate progress updates, action plans, and resolution details.</li>
            <li>Develop and interpret operational reports.</li>
            <li>Identifying continuous improvement opportunities for a digital service.</li>
            <li>Provide continual feedback to agile delivery teams for prioritisation and roadmapping.</li>
          </ul>
        </span>
      )
    case  'contentpub':
      return (
        <span> Content and Publishing case studies must demonstrate <b>2 or more</b> of the following abilities and experience:
          <ul>
            <li>
              Providing content that meets the needs of the user as clearly, simply and quickly. Formats include plain language
              copy, photography, illustration, interactive media and video.
            </li>
            <li>
              Creating content for different platforms and devices, following style guides and accessibility and cultural
              diversity best practice.
            </li>
            <li>
              Experience with content platforms (for example Sitecore, GovCMS), content governance frameworks and detailed
              editorial calendars.
            </li>
            <li>Defining and maintaining taxonomies, tagging systems and metadata.</li>
            <li>A/B testing to improve and share insights on content performance.</li>
          </ul>
        </span>
      )

    case 'marketingcomms':
      return (
        <span>Marketing, communications and engagement case studies must demonstrate <b>1 or more</b> of the following abilities and experience:
          <ul>
            <li>
              Creating targeted digital marketing campaigns that have delivered user engagement and significant product or
              service usage.
            </li>
            <li>
              Experience in quantifying marketing impact and SEO performance and strong understanding of technical SEO -
              sitemaps, crawl budget, canonicalization, etc.
            </li>
            <li>Develop press strategies and provide digital communications guidance.</li>
            <li>Create strategies to increase engagement within digital communities.</li>
            <li>Plan, produce, and execute events.</li>
            <li>Experience with public sector account and relationship management.</li>
          </ul>
        </span>
      )

    case 'cyber':
      return (
        <span>Cyber security case studies must demonstrate <b>1 or more</b> of the following abilities and experience:
          <ul>
            <li>Research and development to better detect, deter and respond to emerging cyber security issues.</li>
            <li>
              Discovering, communicating and explaining security vulnerabilities to teams to ensure secure coding in
              a multi-product, continuous delivery environment.
            </li>
            <li>Automated testing to align with continuous integration.</li>
            <li>
              Carry out assessments (penetration testing, Web Application security testing, vulnerability scanning, threat
              modelling, etc).
            </li>
            <li>
              Experience with security testing tools, (eg Nessus, RKHunter, Fail2Ban, BURP, Cucumber, Netsparker or similar)
            </li>
            <li>Recommend improvements to fix vulnerabilities in products, infrastructures, and processes.</li>
            <li>
              Security architecture reviews, IRAP assessments, Risk assessments, and writing of security related documentation.
            </li>
            <li>
              Experience with Data Loss Prevention and Data Protection.
              Security incident or emergency response.
            </li>
            <li>Provision and monitoring of access to data, IT systems, facilities or infrastructure.</li>
            <li>Recovery or secure deletion of information from computers and storage devices.</li>
          </ul>
        </span>
      )

    case 'datasci':
      return (
        <span>Data science and management case studies must demonstrate <b>1 or more</b> of the following abilities and experience:
          <ul>
            <li>Solving difficult, non-routine analysis problems, working with large, complex data sets.</li>
            <li>Experience with statistical methods such as parametric and nonparametric significance testing.</li>
            <li>
              Experience with statistical software (for example, R, Julia, MATLAB, pandas or similar) and 
              database languages (e.g. SQL).
            </li>
            <li>
              Providing insight or recommendations (for example, cost-benefit, forecasting, experiment analysis) 
              through visual displays of quantitative information.
            </li>
            <li>
              Activities that makes an organisation’s enterprise asset (data) discoverable, accessible and useable to
              stakeholders, while encompassing a good governance framework.
            </li>
          </ul>
        </span>
      )

    case 'emergtech':
      return (
        <span>Emerging technologies case studies must demonstrate research and development of proof of concepts using emerging technologies such as:
          <ul>
            <li>Artificial intelligence</li>
            <li>Blockchain</li>
            <li>Internet of Things</li>
            <li>Virtual, Augmented and Mixed Reality</li>
            <li>Robotic devices</li>
            <li>Wearables</li>
            <li>Machine vision technologies</li>
          </ul>
        </span>
      )

    case 'changetransformation':
      return (
        <span>Change and transformation case studies must demonstrate <b>2 or more</b> of the following criteria:
          <ul>
            <li>Work at the team, portfolio or program level, to help organisations establish processes for managing a portfolio of work in an agile way.</li>
            <li>Experience delivering change activities and leading stakeholder engagement.</li>
            <li>Identifying drivers for change.</li>
            <li>Designing change programs and embedding change.</li>
            <li>Assess business readiness, design and implement target operating models.</li>
          </ul>
        </span>
      )
    
    case 'training':
      return (
        <span>Training, Learning and Development case studies must demonstrate <b>3 or more</b> of the following criteria:
          <ul>
            <li>Conduct analysis to determine user capability needs.</li>
            <li>Design learning solutions to build digital capabilities for individuals, teams, executives and organisations.</li>
            <li>Develop learning solutions in conjunction with subject-matter experts, learning design standards and other sources.</li>
            <li>Deliver learning solutions that meet user needs across appropriate modalities.</li>
            <li>Evaluation and iterate learning solutions to improve agreed outcomes.</li>
            <li>Support the ongoing development and implementation of digital expertise in individuals, teams, executives and organisations.</li>
          </ul>
        </span>
      )
    default:
      return (<span></span>)
  }
}

export default AssessmentCriteria