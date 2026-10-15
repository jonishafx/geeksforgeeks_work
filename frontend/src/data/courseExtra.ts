export type SkillGroup = { category: string; skills: string[] }
export type TechItem = { name: string; bg: string; color: string }
export type ProjectItem = { title: string; desc: string; tags: string[] }
export type MentorItem = {
  name: string; role: string; company: string
  bio: string; achievements: string[]
}
export type BatchItem = {
  name: string; start: string; timing: string
  price: string; oldPrice: string; mentor?: string
}
export type TestimonialItem = { quote: string; name: string; placement: string }
export type FaqItem = { q: string; a: string }
export type OverviewItem = { emoji: string; title: string; desc: string }

export type CourseExtra = {
  overview: OverviewItem[]
  skillGroups: SkillGroup[]
  techStack: TechItem[]
  projects: ProjectItem[]
  mentors: MentorItem[]
  batches: BatchItem[]
  testimonials: TestimonialItem[]
  faq: FaqItem[]
}

const commonOverview: OverviewItem[] = [
  { emoji: '🤖', title: '24/7 AI Doubt Support', desc: 'Get instant help anytime, anywhere with our AI-powered doubt resolution system.' },
  { emoji: '🎓', title: 'GeeksforGeeks Certification', desc: 'Earn an industry-recognized certification trusted by top companies worldwide.' },
  { emoji: '🛠️', title: 'Modern AI Toolkit', desc: 'Work with the latest AI tools and technologies used in production environments.' },
]

const commonFaq: FaqItem[] = [
  { q: 'Who should take this course?', a: 'This course is ideal for students, fresh graduates, and working professionals looking to build in-demand skills and prepare for technical interviews.' },
  { q: 'What are the prerequisites?', a: 'Basic programming knowledge in any language. No prior experience with the specific technologies is required.' },
  { q: 'Will I get a certificate?', a: 'Yes! Upon successful completion of the course and assessments, you will receive a GeeksforGeeks certificate that you can share on LinkedIn and your resume.' },
  { q: 'How are doubts resolved?', a: 'We offer 24/7 AI-powered doubt support plus scheduled live doubt sessions with mentors. You can also post doubts in the student community forum.' },
  { q: 'Is there a refund policy?', a: 'Yes. We offer a 7-day no-questions-asked refund policy from the date of purchase if you are unsatisfied with the course.' },
  { q: 'Can I access the recordings?', a: 'All live sessions are recorded and accessible for 6 months after the course ends, so you can revisit any topic at your own pace.' },
]

const commonTestimonials: TestimonialItem[] = [
  { quote: 'This course was exactly what I needed to crack my interviews. The structured curriculum and mentor support made all the difference.', name: 'Abhishek Arora', placement: 'Placed at Amazon' },
  { quote: 'I built confidence through real projects and hands-on practice. Got my first job offer within 2 months of completing this course!', name: 'Priya Sharma', placement: 'Placed at Microsoft' },
  { quote: 'The instructors explained complex topics in a very clear and engaging way. I highly recommend this to anyone serious about their career.', name: 'Rahul Mehta', placement: 'Placed at Google' },
  { quote: 'From understanding fundamentals to building real-world systems, this course covered everything. Best investment I made for my career.', name: 'Ananya Singh', placement: 'Placed at Flipkart' },
]

export const courseExtras: Record<string, CourseExtra> = {
  'dsa-system-design': {
    overview: commonOverview,
    skillGroups: [
      { category: 'Data Structures', skills: ['Algorithmic Problem Solving', 'DSA Proficiency', 'Logical & Analytical Thinking', 'Efficient Code Optimization', 'Time & Space Complexity Analysis', 'Competitive Programming', 'Technical Interview Problem Solving'] },
      { category: 'System Design', skills: ['Scalable System Architecture', 'Load Balancing', 'Distributed Systems Design', 'Caching Strategies', 'API Design', 'Fault Tolerance & Reliability', 'Database Design & Optimization'] },
    ],
    techStack: [
      { name: 'PostgreSQL', bg: '#336791', color: '#fff' },
      { name: 'Redis', bg: '#dc382d', color: '#fff' },
      { name: 'REST APIs', bg: '#0d7a56', color: '#fff' },
      { name: 'GraphQL', bg: '#e10098', color: '#fff' },
      { name: 'Kafka', bg: '#231f20', color: '#fff' },
      { name: 'AWS', bg: '#ff9900', color: '#111' },
      { name: 'WebSockets', bg: '#2563eb', color: '#fff' },
      { name: 'Kubernetes', bg: '#326ce5', color: '#fff' },
      { name: 'Docker', bg: '#2496ed', color: '#fff' },
      { name: 'Microservices', bg: '#7c3aed', color: '#fff' },
    ],
    projects: [
      { title: 'Bitly-Inspired URL Shortener', desc: 'Build a highly available URL shortening platform with distributed ID generation, Redis caching, and scalable cloud deployment.', tags: ['PostgreSQL', 'Redis', 'AWS'] },
      { title: 'WhatsApp-Inspired Messaging System', desc: 'Build a scalable real-time messaging platform using WebSockets, Redis Pub/Sub, and Kafka for reliable low-latency delivery.', tags: ['WebSockets', 'Redis', 'Kafka'] },
      { title: 'Netflix-Scale Cloud-Native System', desc: 'Design highly available systems supporting millions of concurrent users using AWS, Docker, and Kubernetes.', tags: ['AWS', 'Kubernetes', 'Docker'] },
    ],
    mentors: [
      { name: 'Yash Dwivedi', role: 'Mentor @GeeksforGeeks | SWE II at Google', company: 'Google', bio: 'Currently working as a Software Engineer II at Google Play, Bengaluru. Candidate Master on Codeforces with 970+ problems solved.', achievements: ['SWE II at Google', 'Candidate Master on Codeforces (1923 rating)', '4+ years professional engineering experience', 'Former SDE at GeeksforGeeks'] },
    ],
    batches: [
      { name: 'DSA to System Design — Batch 9', start: 'Oct 04, 2026', timing: '07:30 AM CAT · Sat, Sun', price: '$ 249.98', oldPrice: '$499.98', mentor: 'Yash Dwivedi' },
      { name: 'DSA Live Batch 9', start: 'Oct 04, 2026', timing: '07:30 AM CAT · Sat, Sun', price: '$ 249.98', oldPrice: '$499.98', mentor: 'Yash Dwivedi' },
    ],
    testimonials: commonTestimonials,
    faq: [
      { q: 'What is the DSA & System Design Course?', a: 'A live course covering Data Structures, Algorithms, and High-Level System Design to prepare you for SDE interviews at top companies.' },
      { q: 'Who should take this course?', a: 'Students, fresh graduates, and working professionals targeting SDE roles at product-based companies.' },
      { q: 'Does the course include System Design?', a: 'Yes. The curriculum covers load balancing, caching, databases, microservices, distributed systems, and real-world case studies.' },
      ...commonFaq,
    ],
  },

  'devops-cloud': {
    overview: [
      { emoji: '☁️', title: 'Hands-On Cloud Labs', desc: 'Practice with real AWS, Docker, and Kubernetes environments — not just theory.' },
      { emoji: '🏅', title: 'IBM Certification', desc: 'Earn a co-branded GeeksforGeeks + IBM certification recognised globally.' },
      { emoji: '🤖', title: 'AI-Enhanced DevOps', desc: 'Learn how AI tools are transforming CI/CD, monitoring, and cloud operations.' },
    ],
    skillGroups: [
      { category: 'Cloud & Infrastructure', skills: ['AWS EC2, S3, RDS', 'Infrastructure as Code', 'Auto Scaling & Load Balancing', 'VPC Networking', 'Cost Optimization', 'Cloud Security'] },
      { category: 'Containers & Orchestration', skills: ['Docker Images & Compose', 'Kubernetes Pods & Services', 'Helm Charts', 'Container Registries', 'Rolling Deployments', 'Service Mesh'] },
      { category: 'CI/CD & DevOps', skills: ['GitHub Actions', 'Pipeline Automation', 'Test Automation', 'Blue-Green Deployments', 'Observability & Monitoring', 'Log Management'] },
    ],
    techStack: [
      { name: 'AWS', bg: '#ff9900', color: '#111' },
      { name: 'Docker', bg: '#2496ed', color: '#fff' },
      { name: 'Kubernetes', bg: '#326ce5', color: '#fff' },
      { name: 'GitHub Actions', bg: '#24292e', color: '#fff' },
      { name: 'Terraform', bg: '#7b42bc', color: '#fff' },
      { name: 'Prometheus', bg: '#e6522c', color: '#fff' },
      { name: 'Grafana', bg: '#f46800', color: '#fff' },
      { name: 'Jenkins', bg: '#d33833', color: '#fff' },
      { name: 'Linux', bg: '#fcc624', color: '#111' },
      { name: 'Ansible', bg: '#e00', color: '#fff' },
      { name: 'Helm', bg: '#0f1689', color: '#fff' },
      { name: 'ArgoCD', bg: '#ef7b4d', color: '#fff' },
    ],
    projects: [
      { title: 'Full CI/CD Pipeline on AWS', desc: 'Build an end-to-end pipeline that builds, tests, containerizes, and deploys a Node.js app to Kubernetes on AWS EKS automatically on every push.', tags: ['GitHub Actions', 'Docker', 'AWS EKS'] },
      { title: 'Kubernetes Microservices Platform', desc: 'Deploy a multi-service application on Kubernetes with ingress, autoscaling, secrets management, and rolling updates using Helm charts.', tags: ['Kubernetes', 'Helm', 'AWS'] },
      { title: 'Infrastructure as Code with Terraform', desc: 'Provision complete AWS environments (VPC, EC2, RDS, S3) using Terraform modules with remote state and CI/CD integration.', tags: ['Terraform', 'AWS', 'GitHub Actions'] },
      { title: 'Observability Stack (Prometheus + Grafana)', desc: 'Set up full observability: metrics collection with Prometheus, dashboards in Grafana, and alert routing via Alertmanager for a production workload.', tags: ['Prometheus', 'Grafana', 'Kubernetes'] },
    ],
    mentors: [
      { name: 'Sandeep Kumar', role: 'Senior DevOps Engineer | AWS Solutions Architect', company: 'Infosys', bio: 'AWS Certified Solutions Architect with 8+ years in cloud-native infrastructure. Mentored 500+ students who are now at top cloud roles.', achievements: ['AWS Certified Solutions Architect (Professional)', '8+ years in cloud infrastructure', 'Mentored 500+ students', 'Former Cloud Lead at Wipro'] },
      { name: 'Meera Nair', role: 'Platform Engineer | Kubernetes Certified', company: 'Thoughtworks', bio: 'CKA & CKAD certified Kubernetes specialist. Built platform engineering teams at multiple startups and enterprises.', achievements: ['CKA + CKAD Certified', 'CNCF community contributor', 'Speaker at KubeCon India', 'Kubernetes at scale for 50k+ pods'] },
    ],
    batches: [
      { name: 'DevOps & Cloud — Weekend Batch 7', start: 'Oct 11, 2026', timing: '09:00 AM CAT · Sat, Sun', price: '$179.99', oldPrice: '$299.99', mentor: 'Sandeep Kumar' },
      { name: 'DevOps & Cloud — Weekday Fast Track', start: 'Oct 06, 2026', timing: '07:00 PM CAT · Mon–Fri', price: '$179.99', oldPrice: '$299.99', mentor: 'Meera Nair' },
    ],
    testimonials: [
      { quote: 'The DevOps course transformed my career. I went from zero cloud knowledge to landing a Platform Engineer role at a top tech company in just 4 months.', name: 'James Kamau', placement: 'Platform Engineer at Safaricom' },
      { quote: 'Hands-on labs with real AWS and Kubernetes were game-changing. The instructors explained complex cloud concepts with great clarity and practical examples.', name: 'Fatima Al-Rashid', placement: 'Cloud Engineer at Accenture' },
      ...commonTestimonials.slice(0, 2),
    ],
    faq: [
      { q: 'Do I need prior cloud experience?', a: 'No prior cloud experience needed. We start from Linux basics and build up to full Kubernetes and AWS deployments step by step.' },
      { q: 'Will I get AWS access for labs?', a: 'Yes. We provide guided lab environments with sandboxed AWS accounts so you can practice without worrying about unexpected charges.' },
      { q: 'Is the IBM certification included in the course fee?', a: 'Yes. The IBM co-branded certification is included in your course fee. No hidden exam costs.' },
      { q: 'Is this course useful for the CKAD / CKA exam?', a: 'Absolutely. Our Kubernetes modules cover 80%+ of the CKAD exam topics. Many of our graduates have gone on to pass CKAD after this course.' },
      ...commonFaq.slice(2),
    ],
  },

  'mern': {
    overview: commonOverview,
    skillGroups: [
      { category: 'Frontend', skills: ['React Components & Hooks', 'React Router', 'State Management (Redux / Zustand)', 'Responsive CSS / Tailwind', 'TypeScript', 'Testing with Jest'] },
      { category: 'Backend', skills: ['Node.js & Express', 'REST API Design', 'JWT Authentication', 'Input Validation', 'Error Handling', 'Middleware Patterns'] },
      { category: 'Data & Deployment', skills: ['MongoDB & Mongoose', 'Database Indexing', 'Aggregation Pipelines', 'Docker Basics', 'Vercel / Railway Deploy', 'CI/CD Essentials'] },
    ],
    techStack: [
      { name: 'React', bg: '#20232a', color: '#61dafb' },
      { name: 'Node.js', bg: '#339933', color: '#fff' },
      { name: 'MongoDB', bg: '#47a248', color: '#fff' },
      { name: 'Express', bg: '#000', color: '#fff' },
      { name: 'TypeScript', bg: '#3178c6', color: '#fff' },
      { name: 'Redux', bg: '#764abc', color: '#fff' },
      { name: 'JWT', bg: '#d63aff', color: '#fff' },
      { name: 'Docker', bg: '#2496ed', color: '#fff' },
      { name: 'Vite', bg: '#646cff', color: '#fff' },
      { name: 'Vercel', bg: '#000', color: '#fff' },
    ],
    projects: [
      { title: 'Full-Stack E-Commerce Platform', desc: 'Build a production-ready online store with product listings, cart, Stripe payments, auth, and an admin dashboard — deployed on Vercel.', tags: ['React', 'Node.js', 'MongoDB', 'Stripe'] },
      { title: 'Real-Time Chat Application', desc: 'Create a socket-based messaging app with user authentication, rooms, typing indicators, and read receipts using Socket.io.', tags: ['React', 'Socket.io', 'Node.js'] },
      { title: 'Job Board with AI Matching', desc: 'Build a job listings platform with AI-powered skill matching, resume parsing, and application tracking for both employers and candidates.', tags: ['React', 'OpenAI API', 'MongoDB'] },
    ],
    mentors: [
      { name: 'Rohit Bansal', role: 'Full Stack Engineer | Ex-Zomato', company: 'Zomato', bio: 'Full Stack Engineer with 6+ years building consumer apps at scale. Specialist in React performance and Node.js microservices.', achievements: ['Ex-Zomato Senior SDE', '100k+ LoC in production React', 'Open-source contributor', 'Mentored 300+ students'] },
    ],
    batches: [
      { name: 'MERN Full Stack — Batch 12', start: 'Oct 05, 2026', timing: '08:00 PM CAT · Mon, Wed, Fri', price: '$219.99', oldPrice: '$379.99', mentor: 'Rohit Bansal' },
    ],
    testimonials: commonTestimonials,
    faq: [
      { q: 'Do I need to know JavaScript before joining?', a: 'Basic JavaScript knowledge is recommended. We do cover JavaScript fundamentals in the first week, but students with some JS experience will benefit most.' },
      { q: 'Will I build real projects?', a: 'Yes. You will build 3 full-stack projects that you can add to your portfolio and showcase in interviews.' },
      ...commonFaq,
    ],
  },

  'ai-engineering': {
    overview: [
      { emoji: '🧠', title: 'Hands-On with Real LLMs', desc: 'Build applications using OpenAI, Claude, and open-source models — not toy demos.' },
      { emoji: '🎓', title: 'Industry Certification', desc: 'Earn a certification that signals AI Engineering competency to employers.' },
      { emoji: '🚀', title: 'Production-Ready Skills', desc: 'Learn evaluation, safety, and deployment patterns used by AI teams at top companies.' },
    ],
    skillGroups: [
      { category: 'LLM Engineering', skills: ['Prompt Engineering', 'Context Management', 'LLM Evaluation', 'Fine-Tuning Basics', 'Safety & Guardrails', 'Cost Optimization'] },
      { category: 'RAG & Search', skills: ['Vector Embeddings', 'Semantic Search', 'Pinecone / ChromaDB', 'Retrieval Strategies', 'Grounding & Hallucination Reduction', 'Document Processing'] },
      { category: 'Agents & Deployment', skills: ['Tool Use & Function Calling', 'Multi-Step Planning', 'LangChain / LlamaIndex', 'FastAPI Deployment', 'Monitoring AI Systems', 'Rate Limiting & Auth'] },
    ],
    techStack: [
      { name: 'OpenAI API', bg: '#10a37f', color: '#fff' },
      { name: 'LangChain', bg: '#1c3a4b', color: '#fff' },
      { name: 'Pinecone', bg: '#003cff', color: '#fff' },
      { name: 'FastAPI', bg: '#009688', color: '#fff' },
      { name: 'Python', bg: '#3776ab', color: '#fff' },
      { name: 'PostgreSQL', bg: '#336791', color: '#fff' },
      { name: 'Docker', bg: '#2496ed', color: '#fff' },
      { name: 'Hugging Face', bg: '#ffd21e', color: '#111' },
      { name: 'Streamlit', bg: '#ff4b4b', color: '#fff' },
      { name: 'AWS Lambda', bg: '#ff9900', color: '#111' },
    ],
    projects: [
      { title: 'AI-Powered Document Q&A System', desc: 'Build a RAG system that answers questions over your own documents using vector search, embeddings, and GPT-4 — with a chat interface.', tags: ['OpenAI', 'Pinecone', 'FastAPI'] },
      { title: 'Autonomous Research Agent', desc: 'Create a multi-step agent that searches the web, extracts information, synthesizes insights, and writes structured reports automatically.', tags: ['LangChain', 'OpenAI', 'Python'] },
      { title: 'Production LLM API with Rate Limiting', desc: 'Deploy a production-grade LLM API with auth, caching, rate limiting, cost tracking, and monitoring on AWS.', tags: ['FastAPI', 'AWS', 'PostgreSQL'] },
    ],
    mentors: [
      { name: 'Dr. Kavya Reddy', role: 'AI Engineer | Ex-Microsoft Research', company: 'Microsoft', bio: 'PhD in NLP with 7+ years in production AI systems. Built ML pipelines serving 50M+ daily requests at Microsoft.', achievements: ['Ex-Microsoft Research AI Engineer', 'PhD in Natural Language Processing', '3 published research papers', 'Speaker at NeurIPS & ICLR'] },
    ],
    batches: [
      { name: 'AI Engineering — Cohort 6', start: 'Oct 12, 2026', timing: '08:30 PM CAT · Tue, Thu', price: '$199.99', oldPrice: '$349.99', mentor: 'Dr. Kavya Reddy' },
    ],
    testimonials: commonTestimonials,
    faq: commonFaq,
  },

  'java-backend': {
    overview: commonOverview,
    skillGroups: [
      { category: 'Spring Framework', skills: ['Spring Boot', 'Dependency Injection & IoC', 'Web MVC & REST Controllers', 'Spring Security & JWT', 'Spring Data JPA', 'Bean Validation'] },
      { category: 'Data & Persistence', skills: ['Hibernate ORM', 'SQL & Database Design', 'Database Migrations (Flyway)', 'Transaction Management', 'Query Optimization', 'Redis Caching'] },
      { category: 'Microservices', skills: ['Service Discovery (Eureka)', 'API Gateway (Spring Cloud)', 'Messaging (RabbitMQ / Kafka)', 'Circuit Breakers', 'Distributed Tracing', 'Containerized Deployment'] },
    ],
    techStack: [
      { name: 'Java 21', bg: '#e76f51', color: '#fff' },
      { name: 'Spring Boot', bg: '#6db33f', color: '#fff' },
      { name: 'PostgreSQL', bg: '#336791', color: '#fff' },
      { name: 'Redis', bg: '#dc382d', color: '#fff' },
      { name: 'Kafka', bg: '#231f20', color: '#fff' },
      { name: 'Docker', bg: '#2496ed', color: '#fff' },
      { name: 'Kubernetes', bg: '#326ce5', color: '#fff' },
      { name: 'Maven', bg: '#c71a36', color: '#fff' },
      { name: 'JWT', bg: '#d63aff', color: '#fff' },
      { name: 'GitHub Actions', bg: '#24292e', color: '#fff' },
    ],
    projects: [
      { title: 'Banking Microservices Platform', desc: 'Build a multi-service banking system with account management, transfers, notifications, and an audit trail using Spring Cloud.', tags: ['Spring Boot', 'Kafka', 'PostgreSQL'] },
      { title: 'E-Commerce Backend API', desc: 'Design a production-ready REST API for an e-commerce platform with auth, product catalog, cart, orders, and payment integration.', tags: ['Spring Boot', 'Redis', 'PostgreSQL'] },
    ],
    mentors: [
      { name: 'Arjun Nair', role: 'Senior Java Engineer | Ex-PayPal', company: 'PayPal', bio: 'Java champion with 9+ years in enterprise and fintech. Built payment processing systems handling $1B+ in daily transactions.', achievements: ['Ex-PayPal Senior Engineer', 'Oracle Certified Java Professional', '9+ years Java enterprise', 'Maintains open-source Spring utilities'] },
    ],
    batches: [
      { name: 'Java Backend — Batch 8', start: 'Oct 08, 2026', timing: '07:30 PM CAT · Mon, Wed, Fri', price: '$229.99', oldPrice: '$399.99', mentor: 'Arjun Nair' },
    ],
    testimonials: commonTestimonials,
    faq: commonFaq,
  },

  'system-design': {
    overview: [
      { emoji: '🛡️', title: 'GeeksforGeeks Certification', desc: 'Earn industry-recognized certification trusted by top companies worldwide.' },
      { emoji: '🛠️', title: 'Modern AI Toolkit', desc: 'Work with the latest AI tools & technologies used in production environments.' },
      { emoji: '💬', title: 'Live Soft Skills Sessions', desc: 'Biweekly expert-led sessions for interview success and professional growth.' },
    ],
    skillGroups: [
      {
        category: 'System Design Skills',
        skills: [
          'Scalable System Architecture',
          'Load Balancing & Scalability',
          'Distributed Systems Design',
          'Caching Strategies',
          'API Design & Integration',
          'Fault Tolerance & Reliability',
          'Database Design & Optimization',
          'Capacity Planning & Estimation',
        ],
      },
    ],
    techStack: [
      { name: 'PostgreSQL', bg: '#fff', color: '#111' },
      { name: 'REST APIs', bg: '#fff', color: '#111' },
      { name: 'GraphQL', bg: '#fff', color: '#111' },
      { name: 'gRPC', bg: '#fff', color: '#111' },
      { name: 'WebSockets', bg: '#fff', color: '#111' },
      { name: 'Redis', bg: '#fff', color: '#111' },
      { name: 'Apache Kafka', bg: '#fff', color: '#111' },
      { name: 'Microservices', bg: '#fff', color: '#111' },
      { name: 'AWS Cloud', bg: '#fff', color: '#111' },
      { name: 'GitHub Actions', bg: '#fff', color: '#111' },
      { name: 'Prometheus', bg: '#fff', color: '#111' },
      { name: 'Grafana', bg: '#fff', color: '#111' },
      { name: 'JWT', bg: '#fff', color: '#111' },
    ],
    projects: [
      { title: 'Bitly-Inspired URL Shortener Platform', desc: 'Build a highly available URL shortening platform with distributed ID generation, Redis caching, database optimization, traffic distribution, rate limiting, and scalable cloud deployment for low-latency redirects.', tags: ['PostgreSQL', 'Redis', 'AWS'] },
      { title: 'WhatsApp-Inspired Real-Time Messaging System', desc: 'Build a scalable real-time messaging platform using WebSockets, Redis Pub/Sub, Kafka, message persistence, and distributed communication patterns for reliable, low-latency message delivery.', tags: ['WebSockets', 'Redis', 'Apache Kafka'] },
      { title: 'Global Multi-Region Chat Architecture', desc: 'Design and scale a globally distributed messaging system with multi-region deployment, traffic routing, session management, cloud storage, notifications, and resilience for worldwide users.', tags: ['AWS', 'Redis', 'Apache Kafka'] },
      { title: 'Netflix & YouTube-Scale Cloud-Native Systems', desc: 'Design highly available cloud-native systems supporting millions of concurrent users using AWS, Docker, Kubernetes, Infrastructure as Code, automated scaling, and resilient architecture patterns.', tags: ['AWS', 'Kubernetes', 'Docker'] },
      { title: 'OpenAI & Perplexity-Inspired AI Systems', desc: 'Design AI-powered architectures using vector databases, Retrieval-Augmented Generation, embedding pipelines, LLM integrations, and scalable inference patterns for intelligent, production-ready applications.', tags: ['RAG', 'Vector Databases', 'LLM APIs'] },
      { title: 'Cloudflare-Style Edge Infrastructure', desc: 'Productionize the URL platform using CDN integration, observability, rate limiting, auto-scaling, centralized logging, and CI/CD automation for reliable, high-performance internet infrastructure.', tags: ['CDN', 'Redis', 'AWS'] },
    ],
    mentors: [
      { name: 'Abhishek Tripathi', role: 'Mentor @GeeksforGeeks | Senior Member of Technical Staff at Salesforce, Ex-Microsoft, E…', company: 'Salesforce', bio: 'Currently working as a Senior Member of Technical Staff at Salesforce, specializing in Distributed Systems, Kafka, Streaming Architecture, AI/LLM systems, and Cloud Infrastructure.', achievements: ['8+ years of professional software engineering experience across Salesforce, Microsoft, Amazon, Oracle, Dell EMC, and IG', 'Specializes in building large-scale distributed and cloud-native systems', 'Expert in Kafka, Streaming Architecture, and AI/LLM systems', 'Former engineer at Microsoft, Amazon, and Oracle'] },
    ],
    batches: [
      { name: 'System Design Live 10', start: 'Sep 27, 2026', timing: '10:30 AM CAT -Sat, Sun', price: '$ 249.98', oldPrice: '$ 399.98', mentor: 'Abhishek Tripathi' },
    ],
    testimonials: commonTestimonials,
    faq: [
      { q: 'What is System Design?', a: 'System Design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specific requirements. It covers scalability, reliability, availability, and performance.' },
      { q: 'What is a System Design course?', a: 'A System Design course teaches you how to design large-scale distributed systems used by millions of users. You learn about databases, caching, load balancing, APIs, microservices, and real-world case studies.' },
      { q: 'How to learn System Design from scratch?', a: 'Start with the fundamentals (networking, databases, OS), then move to design patterns (caching, load balancing, sharding), and finally practice real-world case studies like designing Twitter or URL shorteners.' },
      { q: 'What are the prerequisites for System Design?', a: 'Basic programming knowledge and understanding of databases and networks. No prior system design experience needed — we start from the ground up.' },
      { q: 'What is HLD in System Design?', a: 'High-Level Design (HLD) focuses on the overall architecture — how components interact, what databases to use, how to handle scaling and fault tolerance, without getting into code-level details.' },
      { q: 'What is the difference between HLD and LLD?', a: 'HLD (High-Level Design) covers system architecture, components, and their interactions. LLD (Low-Level Design) covers class diagrams, method signatures, and implementation details.' },
      ...commonFaq.slice(2),
    ],
  },

  'placement-360': {
    overview: commonOverview,
    skillGroups: [
      { category: 'DSA & Problem Solving', skills: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Recursion & Backtracking', 'Greedy Algorithms', 'Bit Manipulation'] },
      { category: 'Core CS Subjects', skills: ['Operating Systems', 'DBMS & SQL', 'Computer Networks', 'Object-Oriented Design', 'Compiler Design Basics', 'Computer Architecture'] },
      { category: 'Interview Prep', skills: ['Resume Building', 'HR Interview Techniques', 'Mock Interviews', 'Aptitude & Reasoning', 'Group Discussion', 'Behavioral STAR Method'] },
    ],
    techStack: [
      { name: 'C++', bg: '#00599c', color: '#fff' },
      { name: 'Python', bg: '#3776ab', color: '#fff' },
      { name: 'Java', bg: '#e76f51', color: '#fff' },
      { name: 'SQL', bg: '#336791', color: '#fff' },
      { name: 'LeetCode', bg: '#ffa116', color: '#111' },
      { name: 'GitHub', bg: '#24292e', color: '#fff' },
    ],
    projects: [
      { title: 'Placement-Ready Portfolio', desc: 'Build a portfolio website showcasing your projects, achievements, and skills — designed specifically to impress recruiters.', tags: ['HTML', 'CSS', 'React'] },
      { title: '50-Problem DSA Sprint', desc: 'Solve curated top-50 interview problems across all major topics with guided walkthroughs and complexity analysis.', tags: ['DSA', 'C++', 'Python'] },
    ],
    mentors: [
      { name: 'Neha Gupta', role: 'Placement Expert | Ex-TCS & Amazon', company: 'Amazon', bio: 'Helped 2000+ students crack placements at top companies. Former Amazon interviewer with deep knowledge of the hiring process.', achievements: ['Ex-Amazon SDE & Interviewer', 'Helped 2000+ placements', 'TCS & Infosys campus expert', '5-star DSA mentor rating'] },
    ],
    batches: [
      { name: 'Placement 360 — Batch 15', start: 'Oct 01, 2026', timing: '07:00 PM CAT · Mon–Fri', price: '$116.65', oldPrice: '$166.65', mentor: 'Neha Gupta' },
    ],
    testimonials: commonTestimonials,
    faq: commonFaq,
  },
}
