export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const faqData: FaqCategory[] = [
  {
    title: "Clarity on Services",
    items: [
      {
        question: "What exactly do you mean by \"automation\"? Can you give me a real example?",
        answer: "We handle both workflow automation (streamlining internal processes like onboarding, invoicing, or data entry) and marketing automation (lead nurturing, CRM updates). For example, if you run a service business, we might build a system that captures a lead from your website, automatically enriches their data, routes them to the correct salesperson in your CRM, and triggers a personalized welcome email sequence—entirely hands-off."
      },
      {
        question: "What's the difference between a \"website,\" an \"automated system,\" and \"custom software\"?",
        answer: (
          <ul className="list-disc pl-5 space-y-2">
            <li>A <strong>Website</strong> acts as your high-performance digital storefront, optimized for speed, design, and SEO (built with Next.js).</li>
            <li>An <strong>Automated System</strong> connects your existing tools (like HubSpot, Slack, and Stripe) to remove manual tasks and data entry.</li>
            <li><strong>Custom Software</strong> is a bespoke web application built from scratch to solve a unique business problem when off-the-shelf tools aren’t enough.</li>
          </ul>
        )
      },
      {
        question: "Do you actually BUILD everything, or do you just set up existing tools?",
        answer: "Both, depending on what solves your problem most efficiently. If setting up Make or Zapier with your CRM achieves your goal flawlessly, we’ll do that. But if you need a proprietary AI-powered dashboard or a high-performance web app, we build that from the ground up using scalable, enterprise-grade technologies like React and Next.js."
      }
    ]
  },
  {
    title: "Experience & Proof",
    items: [
      {
        question: "Who have you worked with? Can I see case studies or a portfolio?",
        answer: "We work primarily with ambitious startups, established service businesses, and modern brands looking to scale. We have a robust portfolio and detailed case studies available on our /work page that showcase the exact metrics and outcomes we’ve delivered for clients across various industries."
      },
      {
        question: "How many clients do you have? Are you a solo person, a small team, or a bigger agency?",
        answer: "Launch Live Studio operates as a lean, elite team of senior developers, designers, and AI specialists. We are not a massive agency where you get passed down to junior staff, nor are we a solo freelancer. We take on a strictly limited number of clients per quarter to ensure a high-touch, dedicated experience."
      },
      {
        question: "Do you have references I can call?",
        answer: "Absolutely. After our initial discovery call, if we’re a mutual fit, we are more than happy to provide direct contact information for past and current clients who can speak to their real-world experience working with us."
      },
      {
        question: "How long have you been doing this? Are you new or established?",
        answer: "Our core team consists of seasoned veterans in software engineering, digital marketing, and AI integration. We are an established agency utilizing proven, battle-tested frameworks. We don't learn on your dime; we bring high-level expertise to every project from day one."
      }
    ]
  },
  {
    title: "Process & Timeline",
    items: [
      {
        question: "What's your actual process? Walk me through what happens from day 1.",
        answer: (
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Discovery & Strategy:</strong> We map out your exact needs, audit your current setup, and define success metrics.</li>
            <li><strong>Architecture & Design:</strong> We create wireframes, system maps, and UI prototypes for your approval.</li>
            <li><strong>Development:</strong> We build the solution in sprints with regular asynchronous updates.</li>
            <li><strong>Testing & QA:</strong> Rigorous testing across devices, browsers, and edge cases.</li>
            <li><strong>Launch & Handoff:</strong> We deploy the system to production and train your team on how to manage it.</li>
          </ol>
        )
      },
      {
        question: "How long does a typical project take? Is 6+ months realistic?",
        answer: "Most of our high-performance websites and standard automation systems take between 4 to 8 weeks. More complex custom software builds might take 3 months. We don’t drag projects out for 6+ months; our focus is on rapid, high-quality deployment so you see ROI faster."
      },
      {
        question: "How involved do I need to be? Will you need me in meetings constantly?",
        answer: "Your heaviest involvement is during the initial Discovery and Design approval phases (a few hours total). Once development begins, we provide weekly asynchronous video or text updates. You won't be dragged into constant meetings unless a critical strategic decision requires your input."
      }
    ]
  },
  {
    title: "Pricing & Investment",
    items: [
      {
        question: "How much is this going to cost? Do you have a pricing page?",
        answer: "Because every business has different needs, we don't use one-size-fits-all pricing packages. However, our comprehensive projects typically require a medium-to-high level investment reflective of premium quality. We provide a precise, transparent quote immediately after our initial discovery call so no time is wasted."
      },
      {
        question: "Is it a fixed price or hourly?",
        answer: "We work on a fixed-price, value-based model for clearly defined projects. You know exactly what you’re paying upfront. If the project takes us longer than expected, we absorb the cost. If the scope changes significantly at your request, we will provide a separate, approved quote before doing the work. There are no surprise hourly overages."
      },
      {
        question: "Are there hidden costs? Domain, hosting, maintenance, AI tools licensing?",
        answer: "There are no hidden costs. We clearly outline what is included in our build. Third-party software licenses (like Make, OpenAI APIs, Vercel hosting, or CRM subscriptions) are billed directly to you so you own your infrastructure 100%. We will estimate these external costs for you upfront so you can budget accurately."
      },
      {
        question: "Do you charge for maintenance after launch?",
        answer: "The initial build is a one-time cost. We do offer optional, ongoing retainer packages for maintenance, SEO, and continuous optimization, but you are not locked into them. You own the code and the systems."
      }
    ]
  },
  {
    title: "Results & Guarantees",
    items: [
      {
        question: "How do I know this will actually work? What metrics matter?",
        answer: "We define clear KPIs before writing a single line of code—whether that's Google Lighthouse performance scores, lead conversion rates, or raw hours of manual work saved per week. We build analytics and tracking into every project so you can see the hard data proving your ROI."
      },
      {
        question: "Do you guarantee results?",
        answer: "We guarantee the technical performance and delivery of the scope (e.g., a 90+ Lighthouse score, flawless automation execution, zero-downtime deployment). While we cannot guarantee external market factors (like a specific amount of sales), our systems are engineered using industry best practices to maximize your success rate."
      },
      {
        question: "What happens if I'm not happy with the work?",
        answer: "We mitigate this by working with strict milestones and approval gates. You approve the design prototypes before we build, and you test the staging environment before we launch. We offer revision rounds at each major stage to ensure the final product aligns exactly with your expectations."
      }
    ]
  },
  {
    title: "Ongoing Support & Scalability",
    items: [
      {
        question: "What happens after launch? Do you disappear?",
        answer: "We do not disappear. Every project includes a 30-day warranty period post-launch to fix any bugs or edge cases at no extra cost. We also provide comprehensive documentation and a handover training session so your team feels confident taking the reins."
      },
      {
        question: "If my business grows and I need changes, will you handle it?",
        answer: "Yes, we can absolutely handle it. Many of our clients transition into long-term strategic partners. We build highly scalable systems (like Next.js) precisely so they can grow alongside your revenue. If you need new features, pages, or integrations down the line, we are here to build them."
      },
      {
        question: "If I have questions or problems 6 months from now, can I still reach you?",
        answer: "Always. You will have a direct point of contact at Launch Live Studio. Even if you aren't on a monthly retainer, we operate on a fast-response SLA for ad-hoc requests to ensure your business keeps running smoothly. We view our clients as lifelong partners."
      }
    ]
  }
];
