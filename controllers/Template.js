const showdown = require('showdown');
const converter = new showdown.Converter();
class Template {
    static chooseTemplate(data) {
		//injecting request data to template string html
		let webpage1 = `
		<body class="boxed">
			<center>
				<h1>${data.firstname} ${data.lastname}</h1>
				<h4 class="light m-m-t-10" style="color:grey; padding-top:5px">
					${Object.keys(data.contact).map(function(key, index) { return ` 
					<span class="" >${data.contact[key]}</span>`;
		}).join(' •')}
				</h4>
			</center>
		
			<hr class="thick">
			<h4 class="">TECHNICAL SKILLS</h4>
			<div class="offset-2">
				${data.skills.details.map( function(key) { return `
				<p>
					<strong>${key.type}:</strong> ${key.items.map(function (key) { return `${key}` }).join(', ')}` } ).join('</p>')}
				</div>
			<h4 class="">PERSONAL PROJECTS</h4>
			<div class="offset-2">
		
		
				${data.github_projects.items.map(function (key) { return `
				<p>
					<strong class="title">${key['project_name']} ${ converter.makeHtml(key['tagline']).replace(/<(\/)?p([^>]*)>/g, '') }
					</strong>
				</p>
				<div class="offset-2 p"> ${key['description'][0]} Technologies: ${key['technology_used'].tools.map(function (item){ return item}).join(', ') }
				</div> `}).join('')}
		
		
			</div>
			<h4 class="">OTHER PROJECTS</h4>
		
			${data.other_projects.items.map(function (key) { return `<div class="offset-2">
			<p>
				<strong class="title">${key['headline']}</strong>
			</p>
			<div class="offset-2 p"> ${key['points'][0]} Technologies: ${key['technology_used'].tools.map(function (item){ return item}).join(', ') }
			</div></div>`}).join('')}
			<h4 class="">PROFESSIONAL EXPERIENCE</h4>
			<div class="offset-2">
				<p>
					<strong class="title">${data.work_experience.items.map(function (key){ return `${key['title']}, ${key['organisation']}, ${key['location']}</b>
						<span class="pull-right">${key['from']} - ${key['to']}</span>
					</strong>
				</p>
				<div class="offset-2 p">${key['details'][0]} Technologies: ${key['technology_used'].tools.map(function (item){ return item}).join(', ') }
				</div>
			</div>` })}
		
		
			<h4 class="">INVOLVEMENTS</h4>
			<div class="">
				<ul class="boxed-list offset-2 p">
					${data.involvement.organizations.map(function (key){ return `
					<li class="offset-2" style="text-decoration-style:disc"> ${key} </li>` })}
				</ul>
			</div>
			<h4 class="">EDUCATION</h4>
			<div class="">
				<table cellpadding="10" style="width:100%">
					<thead>
		
						<tr>
							<th>Degree</th>
							<th>Major</th>
							<th>Institution</th>
							<th>graduation Year</th>
						</tr>
					</thead>
					<tbody>
		
						<tr>
							${data.education.schools.map(function (key){ return `
							<td>${key['degree']}</td>
							<td>${key['major']}</td>
							<td>${key['institution']}</td>
							<td>${key['graduation_year']}</td>
		
							` })}
						</tr>
					</tbody>
		
		
				</table>
			</div>
			<h4 class="">RESEARCH EXPERIENCE</h4>
			
			${data.research_experience.items.map(function (key) {
				return `<div class="offset-2">
			<p>
				<strong class="title">${key['title']}- ${key['organisation']}</strong>
			</p>
			<div class="offset-2 p"> ${key['points'][0]}
			</div></div>`}).join('')}
		
		</body>
		`;
		let webpage2 = `<body class="boxed">
        <div class="titleholderbox">
                <span class="title-jack">
                        <h2 class="title-jack-name-logo">
                                ${data.firstname.substr(0,1).toUpperCase()}${data.lastname.substr(0,1).toUpperCase()}
                        </h2>
                </span>
                <span class="title-jack">
                        <h1 class="title-edit">${data.firstname} ${data.lastname}</h1>
						<div class="contacts">
							${Object.keys(data.contact).map(function(key, index) { return ` 
								<span class="light m-m-t-10 contact-crd">${data.contact[key]}</span>`;
							}).join(' <span class="seperator">|</span>')}
                        </div>
                </span>
        </div>
        <div class="summary">
                <div class="summary-block">
                        <div class="summary-title">
                                TECHNICAL SKILLS 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
								<div class="ruler" style="height: 100%">
								</div>
                        </div>
						<div class="summarized">
							${data.skills.details.map(key => {
								return `<div class="tech-bar">
									<div class="tech-bar-summary">
										${key.type}
									</div>
									<div class="tech-bar-list">
										${key.items.map(itemKey => {
											return `<span class="tech-bar-list-stack">&nbsp;•&nbsp;${itemKey}</span>`
										}).join('')}
									</div>
								</div>`;
							}).join('')}
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                PERSONAL PROJECTS 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							${data.github_projects.items.map(key => {
								return `
									<div class="project-list">
										<div class="project-stack-up">
												<span class="personne">${key['project_name']}</span>
												${ converter.makeHtml(key['tagline']).replace(/<(\/)?p([^>]*)>/g, '') }
										</div>
										<div class="project-description">
											${key['description'].map(despKey => {
												return `<div class="desp">&nbsp;•&nbsp;${despKey}</div>`
											}).join('')}
										</div>
										<div class="tech-bar">
												<div class="tech-bar-summary" style="width: 90px">
														Technologies
												</div>
												<div class="tech-bar-list">
													${key['technology_used'].tools.map(toolsKey => {
														return `<span class="tech-bar-list-stack">&nbsp;•&nbsp;${toolsKey}</span>`;
													}).join('')}
												</div>
										</div>
									</div>
								`
							}).join('')}    
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                OTHER PROJECTS 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							${data.other_projects.items.map(key => {
								return `
								<div class="project-list">
									<div class="project-stack-up">
											<span class="personne">${key["headline"]}</span>
											//Add tag line for href
									</div>
									<div class="project-description">
										${key['points'].map(despKey => {
											return `<div class="desp">&nbsp;•&nbsp;${despKey}</div>`
										}).join('')}
									</div>
									<div class="tech-bar">
											<div class="tech-bar-summary" style="width: 90px">
													Technologies
											</div>
											<div class="tech-bar-list">
												${key['technology_used'].tools.map(toolsKey => {
													return `<span class="tech-bar-list-stack">&nbsp;•&nbsp;${toolsKey}</span>`;
												}).join('')}
											</div>
									</div>
								</div>`
							}).join('')}    
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                PROFESSIONAL EXPERIENCE 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							${data.work_experience.items.map(key => {
								return `
								<div class="project-list">
									<div class="project-stack-up">
											<span class="personne">${key["title"]} ${key["organisation"]} ${key["location"]}</span>
											<span class="exp-date"><i>${key["from"]} - ${key["to"]}</i></span>
									</div>
									<div class="project-description">
										${key["details"].map(detailsKey => {
											return `<div class="desp">&nbsp;•&nbsp;${detailsKey}</div>`
										}).join('')}
									</div>
									<div class="tech-bar">
											<div class="tech-bar-summary" style="width: 90px">
													Technologies
											</div>
											<div class="tech-bar-list">
												${key["technology_used"].tools.map(toolsKey => {
													return `<span class="tech-bar-list-stack">&nbsp;•&nbsp;${toolsKey}</span>`;
												}).join('')}
											</div>
									</div>
								</div>
								`;
							}).join('')}    
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                INVOLVEMENTS
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							<div class="tech-bar-list">
								${data.involvement.organizations.map(key => {
									return `<div class="tech-bar-list-stack">&nbsp;•&nbsp;${key}</div>`
								}).join('')}
                            </div>    
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                EDUCATION 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							${data.education.schools.map(key => {
								return `
								<div class="project-list">
									<div class="project-stack-up">
											<span class="personne">${key.degree}</span>
											<span class="personne">in</span>
											<span class="personne">${key.major}</span>
									</div>
									<div class="project-description">
											<div class="personne">${key.institution}</div>
									</div>
									<div class="tech-bar">
											<span class="exp-date-g"><i>Graduated ${key.graduation_year}</i></span> 
									</div>
								</div>
								`
							}).join('')}
                        </div>
                </div>
                <div class="summary-block">
                        <div class="summary-title">
                                RESEARCH EXPERIENCE 
                        </div>
                        <div class="bullet-point">
                                <div class="ball"><center><div></div></center></div>
                                <div class="ruler"></div>
                        </div>
						<div class="summarized">
							${data.research_experience.items.map(key => {
								return `
								<div class="project-list">
									<div class="project-stack-up">
											<span class="personne">${key.title}</span>
											<span class="personne">-</span>
											<span class="personne">${key.organisation}</span>
											<span class="exp-date"><i>${key.from} - ${key.to}</i></span>
									</div>
									<div class="tech-bar">
										${key["points"].map(pointKey => {
											return `<div class="tech-bar-list-stack">${pointKey}</div>`
										}).join('')}
									</div>
								</div> 
								`
							}).join('')}   
                        </div>
                </div>
		</div>
		<div class="ruler-simulator"></div>
</body>
`;
        switch (data.template) {
			case "1": 
				return webpage1;
			case "2":
				return webpage2;
            default: 
                return webpage1;
        }
	}

	static choosePathToEngine (data) {
		switch (data.template) {
			case "1":
				return '././views/gen.hbs';
			case "2":
				return '././views/gen2.hbs';
			default:
				return '././views/gen.hbs';
		}
	}
}
module.exports = Template;