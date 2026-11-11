import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    number: '01',
    title: 'Apex Supply Chain Intelligence',
    category: 'Data engineering & analytics',
    description: 'A Python ETL pipeline generates and validates 10,000 fictional shipments, loads data into SQLite with optional MySQL support, and powers an interactive Streamlit dashboard.',
    tools: ['Python', 'ETL', 'SQL', 'Streamlit'],
    href: '#/projects/apex-supply-chain-intelligence',
    local: true,
    visual: 'pipeline',
  },
  {
    number: '02',
    title: 'Pace & Peak Customer Support Assistant',
    category: 'Local AI-style support app',
    description: 'A local, rule-based support assistant grounded in SQLite store data. It answers product and policy questions, calculates catalog metrics, and looks up fictional orders by exact ID.',
    tools: ['Python', 'Streamlit', 'SQLite'],
    href: 'https://pace-peak-support.streamlit.app/',
    linkLabel: 'Launch the live app',
    visual: 'support',
  },
  {
    number: '03',
    title: 'Freight Brokerage Operations Analytics',
    category: 'Business intelligence',
    description: 'A simulated freight business brought to life with a relational database, operational SQL analysis, and a Power BI dashboard.',
    tools: ['MySQL', 'SQL', 'Power BI'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/freight-brokerage-operations-analytics',
    visual: 'freight',
  },
  {
    number: '04',
    title: 'Charlotte Crash Severity',
    category: 'Machine learning',
    description: 'An end-to-end capstone exploring crash severity patterns and presenting model results through an interactive application.',
    tools: ['Python', 'XGBoost', 'Streamlit'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/charlotte-crash-severity-capstone-project',
    visual: 'crash',
  },
  {
    number: '05',
    title: 'Discovering Song Types Through Clustering',
    category: 'Unsupervised learning',
    description: 'An exploration of how music data can reveal natural groupings and different kinds of listening patterns.',
    tools: ['Python', 'Clustering', 'Data visualization'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/discovering-song-types-through-clustering',
    visual: 'music',
  },
  {
    number: '06',
    title: 'The EV Revolution in Washington State',
    category: 'Data visualization',
    description: 'A Power BI view of electric vehicle adoption, turning a large public dataset into clear trends and comparisons.',
    tools: ['Azure SQL', 'Power BI', '260K+ records'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/the-ev-revolution-in-washington-state-power-bi-insights',
    visual: 'ev',
  },
  {
    number: '07',
    title: 'Predicting Latency in Cellular Networks',
    category: 'Regression analysis',
    description: 'A regression project investigating how network measurements can help explain and predict cellular latency.',
    tools: ['Regression', 'Python', 'Modeling'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/predicting-latency-in-cellular-networks-using-regression-analysis',
    visual: 'network',
  },
  {
    number: '08',
    title: 'Private vs. Public College Classification',
    category: 'Classification',
    description: 'A classification study using college data to explore which features distinguish private and public institutions.',
    tools: ['Machine learning', 'Classification', 'Python'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/private-or-public-college-prediction',
    visual: 'college',
  },
  {
    number: '09',
    title: 'Finding the Right Crop for the Conditions',
    category: 'Applied machine learning',
    description: 'A data-driven crop recommendation project using soil and climate conditions to guide the selection.',
    tools: ['Python', 'Classification', 'Agriculture'],
    href: 'https://izaanggb.wixsite.com/izaan-khudadad/post/identifying-the-most-suitable-crop-based-on-soil-and-climate',
    visual: 'crop',
  },
];

const skills = [
  ['Analysis', 'Exploratory analysis', 'Statistical reasoning', 'Data cleaning'],
  ['Machine learning', 'Classification', 'Regression', 'Model evaluation'],
  ['Data & tools', 'Python', 'SQL & MySQL', 'Excel'],
  ['Communication', 'Power BI', 'Streamlit', 'Clear storytelling'],
];

function ArrowIcon({ diagonal = false }) {
  return <span aria-hidden="true" className={`arrow ${diagonal ? 'arrow--diagonal' : ''}`}>↗</span>;
}

function ProjectArtwork({ type, number }) {
  return (
    <div className={`project-art project-art--${type}`} aria-hidden="true">
      <span className="art-index">PROJECT {number}</span>
      {type === 'freight' && <div className="route-art"><i /><i /><i /><i /><b /></div>}
      {type === 'crash' && <div className="bars-art"><i /><i /><i /><i /><i /><i /></div>}
      {type === 'music' && <div className="rings-art"><i /><i /><i /></div>}
      {type === 'ev' && <div className="line-art"><i /><i /><i /><i /><i /></div>}
      {type === 'network' && <div className="wave-art"><i /><i /><i /><i /><i /><i /><i /></div>}
      {type === 'college' && <div className="dots-art">{Array.from({ length: 25 }, (_, i) => <i key={i} />)}</div>}
      {type === 'crop' && <div className="leaf-art"><i /><i /><i /><b /></div>}
      {type === 'pipeline' && <div className="pipeline-art">{['GEN', 'ETL', 'SQL', 'APP'].map((step) => <span key={step}>{step}</span>)}</div>}
      {type === 'support' && <div className="support-art"><span>PRODUCT HELP</span><span>ORDER LOOKUP</span><b>LOCAL · SQLITE</b></div>}
    </div>
  );
}

function ProjectCard({ project }) {
  const linkLabel = project.local ? 'View project details' : (project.linkLabel || 'Read the case study');
  const Card = project.local ? 'a' : 'article';
  return (
    <Card className={`project-card ${project.local ? 'project-card--linked' : ''}`} href={project.local ? project.href : undefined} aria-label={project.local ? `${project.title} project details` : undefined}>
      <ProjectArtwork type={project.visual} number={project.number} />
      <div className="project-card__body">
        <div className="project-meta"><span>{project.category}</span><span>{project.number}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tag-list" aria-label="Tools and topics">
          {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        {project.local ? (
          <span className="project-link">{linkLabel} <ArrowIcon /></span>
        ) : (
          <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{linkLabel} <ArrowIcon diagonal /></a>
        )}
      </div>
    </Card>
  );
}

const apexScreenshots = [
  { file: 'dashboard-overview.png', title: 'Shipment overview', alt: 'Apex dashboard overview with total shipments, on-time delivery, delayed shipments, monthly activity, and shipment status charts.' },
  { file: 'carrier-performance.png', title: 'Carrier performance', alt: 'Table comparing shipment counts, average shipping cost, and delayed shipments for each carrier.' },
  { file: 'monthly-kpis.png', title: 'Monthly carrier KPIs', alt: 'Charts showing monthly shipping costs and on-time delivery rates by carrier.' },
  { file: 'monthly-kpi-table.png', title: 'Monthly KPI detail', alt: 'Detailed monthly carrier KPI table with shipment counts, completed and delayed shipments, delivery delay, and costs.' },
  { file: 'shipment-records.png', title: 'Shipment records', alt: 'Sample shipment records table with dates, products, warehouse, destination, carrier, and quantities.' },
];

function ApexCaseStudy() {
  return (
    <div className="case-study-page">
      <header className="case-header">
        <a className="brand" href="./" aria-label="Return to Izaan Khudadad portfolio"><span className="brand-mark">IK</span><span>Izaan Khudadad</span></a>
        <a className="case-back" href="./#work">← Back to all projects</a>
      </header>
      <main className="case-main">
        <nav className="case-breadcrumb" aria-label="Breadcrumb"><a href="./#work">Projects</a><span aria-hidden="true">/</span><span>Apex Supply Chain Intelligence</span></nav>
        <section className="case-hero" aria-labelledby="case-title">
          <div className="case-hero-copy">
            <p className="eyebrow">PROJECT 01 · DATA ENGINEERING & ANALYTICS</p>
            <h1 id="case-title">Apex Supply Chain Intelligence</h1>
            <p className="case-lead">A small analytics system that turns fictional shipment activity into a clear operations dashboard.</p>
            <ul className="tag-list case-tags"><li>Python</li><li>ETL</li><li>SQLite / MySQL</li><li>Streamlit</li></ul>
            <a className="button button--primary case-source" href="https://github.com/izaan-khudadad/apex-supply-chain-intelligence" target="_blank" rel="noreferrer">View source on GitHub <ArrowIcon diagonal /></a>
          </div>
          <figure className="case-hero-image"><img src="./images/apex/dashboard-overview.png" alt={apexScreenshots[0].alt} /></figure>
        </section>

        <section className="case-metrics" aria-label="Sample dashboard metrics">
          <div><span>Shipments</span><strong>10,000</strong></div>
          <div><span>On-time delivery</span><strong>55.5%</strong></div>
          <div><span>Delayed shipments</span><strong>4,344</strong></div>
          <div><span>Average shipping cost</span><strong>$219.60</strong></div>
        </section>
        <p className="case-data-note">These figures come from the included simulated dataset. All shipment and company records are fictional.</p>

        <section className="case-story" aria-labelledby="case-question-title">
          <div className="case-story-heading"><p className="eyebrow">THE PROJECT</p><h2 id="case-question-title">From shipment data<br />to useful signals<span>.</span></h2></div>
          <div className="case-story-copy">
            <h3>The question</h3>
            <p>How can an operations team keep track of shipment volume, delivery outcomes, carrier performance, and shipping costs in one place?</p>
            <h3>The approach</h3>
            <p>I built a repeatable Python workflow to generate fictional shipment and reference data, check that records are consistent, and load the results into a database. The Streamlit dashboard then brings shipment activity and carrier metrics together for exploration.</p>
          </div>
        </section>

        <section className="case-process" aria-label="Pipeline steps">
          <article><span>01</span><h3>Generate</h3><p>Create 10,000 fictional shipment records across 2025, along with the reference data needed to analyze them.</p></article>
          <article><span>02</span><h3>Validate</h3><p>Check shipment IDs, lookup references, dates, statuses, and shipping costs before loading the data.</p></article>
          <article><span>03</span><h3>Load & summarize</h3><p>Store data in SQLite, optionally load it to MySQL, and calculate monthly carrier performance metrics.</p></article>
          <article><span>04</span><h3>Explore</h3><p>Use the Streamlit dashboard to compare shipments, delivery status, carriers, and monthly costs.</p></article>
        </section>

        <section className="case-gallery" aria-labelledby="case-gallery-title">
          <div className="case-gallery-heading"><div><p className="eyebrow">DASHBOARD TOUR</p><h2 id="case-gallery-title">A closer look<span>.</span></h2></div><p>Explore the shipment overview, carrier comparisons, monthly summaries, and sample records.</p></div>
          <div className="case-gallery-grid">
            {apexScreenshots.slice(1).map((screenshot) => (
              <figure className="case-shot" key={screenshot.file}>
                <img src={`./images/apex/${screenshot.file}`} alt={screenshot.alt} loading="lazy" />
                <figcaption>{screenshot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-outro">
          <div><p className="eyebrow">BUILT WITH</p><h2>Python · SQL · Streamlit</h2><p>A practical project in generating, validating, and presenting operational data.</p></div>
          <a className="button button--primary" href="https://github.com/izaan-khudadad/apex-supply-chain-intelligence" target="_blank" rel="noreferrer">Explore the code <ArrowIcon diagonal /></a>
        </section>
        <div className="case-footer"><a href="./#work">← Back to all projects</a><a href="mailto:izaan.khudadad16@gmail.com">Contact Izaan <ArrowIcon diagonal /></a></div>
      </main>
    </div>
  );
}

function App() {
  const [showApexCaseStudy, setShowApexCaseStudy] = useState(() => window.location.hash === '#/projects/apex-supply-chain-intelligence');

  useEffect(() => {
    const syncPage = () => {
      const isCaseStudy = window.location.hash === '#/projects/apex-supply-chain-intelligence';
      setShowApexCaseStudy(isCaseStudy);
      document.title = isCaseStudy ? 'Apex Supply Chain Intelligence — Izaan Khudadad' : 'Izaan Khudadad — Data Science Portfolio';
      if (isCaseStudy || window.location.hash !== '#work') window.scrollTo(0, 0);
      else window.setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 0);
    };
    syncPage();
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  if (showApexCaseStudy) return <ApexCaseStudy />;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Izaan Khudadad, home">
          <span className="brand-mark">IK</span><span>Izaan Khudadad</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#skills">Skills</a>
        </nav>
        <a className="header-contact" href="#contact">Let’s connect <ArrowIcon diagonal /></a>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> DATA SCIENCE · ANALYTICS · VISUALIZATION</p>
            <h1 id="hero-title">Making data<br /><span className="headline-accent">make sense.</span></h1>
            <p className="hero-description">Hi, I’m Izaan — a data science graduate who enjoys turning complex questions into clear, useful insights.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">Explore my work <ArrowIcon /></a>
              <a className="text-link" href="#contact">Get in touch <ArrowIcon diagonal /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> Based in Charlotte, North Carolina</div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-halo" />
            <div className="portrait-frame">
              <img src="./images/izaan-graduation.jpg" alt="Izaan at his UNC Charlotte graduation" fetchPriority="high" />
            </div>
            <div className="portrait-caption"><span className="caption-icon">✳</span><span>Curious by nature.<br /><strong>Driven by good questions.</strong></span></div>
            <span className="portrait-spark portrait-spark--one">✳</span><span className="portrait-spark portrait-spark--two">✳</span>
          </div>
          <a className="scroll-cue" href="#work"><span /> Scroll to explore</a>
        </section>

        <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div><p className="eyebrow">A SELECTION OF MY WORK</p><h2 id="work-title">Projects with a point of view<span className="heading-period">.</span></h2></div>
            <p className="section-intro">From business intelligence to machine learning, each project starts with a question and ends with something you can use.</p>
          </div>
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-inner section-wrap">
            <div className="about-kicker"><span className="about-star">✳</span><p className="eyebrow">A LITTLE ABOUT ME</p></div>
            <div className="about-copy">
              <h2 id="about-title">I like the part where<br />the pattern <span>appears.</span></h2>
              <div className="about-text">
                <p>I’m a data science graduate from UNC Charlotte with a background in analytics, machine learning, and data visualization. I enjoy exploring a messy dataset, asking better questions, and finding a clear way to share what it says.</p>
                <p>My projects range from traffic safety and electric vehicles to freight operations and music. I’m especially interested in work where thoughtful analysis can make a real decision easier.</p>
                <a className="button button--outline" href="mailto:izaan.khudadad16@gmail.com">Say hello <ArrowIcon diagonal /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section section-wrap" id="skills" aria-labelledby="skills-title">
          <div className="section-heading section-heading--skills">
            <div><p className="eyebrow">TOOLS I LIKE TO WORK WITH</p><h2 id="skills-title">Curiosity, with a toolkit<span className="heading-period">.</span></h2></div>
          </div>
          <div className="skills-grid">{skills.map(([title, ...items], index) => (
            <div className="skill-group" key={title}><span className="skill-number">0{index + 1}</span><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          ))}</div>
        </section>

        <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div className="contact-orbit contact-orbit--one" /><div className="contact-orbit contact-orbit--two" />
            <p className="eyebrow">HAVE A QUESTION OR AN IDEA?</p>
            <h2 id="contact-title">Let’s make sense<br />of something.</h2>
            <a className="button button--light" href="mailto:izaan.khudadad16@gmail.com">Email me <ArrowIcon diagonal /></a>
            <a className="contact-email" href="mailto:izaan.khudadad16@gmail.com">izaan.khudadad16@gmail.com</a>
            <a className="contact-phone" href="tel:+17047232612">(704) 723-2612</a>
            <span className="contact-spark">✳</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="brand brand--footer" href="#top"><span className="brand-mark">IK</span><span>Izaan Khudadad</span></a><p>Thoughtful analysis. Clearer decisions.</p><a href="#top" className="back-top">Back to top ↑</a><span className="copyright">© {new Date().getFullYear()} Izaan Khudadad</span></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
