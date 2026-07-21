// ─── TECHNOVAHUB COMPANY DATA ─────────────────────────────────────────────
// Extracted as a standalone data module for maintainability.
// Update content here — no code changes needed elsewhere.
import {
  GraduationCap,
  Rocket,
  Building2,
  Trophy,
} from "lucide-react";

export const COMPANY_PROFILE = `TechnovaHub (unit of Aroun Groups) — $2.6 Billion Technology Company
HQ: No.48 Lawspet Main Road, Puducherry-605008, India
Phone: +91 9629600230 | +91 9003530230
Email: technovahubcareer@gmail.com | Website: technovahub.in
Tagline: "WE AUTOMATE THE ROUTINE, SO YOU CAN INNOVATE THE EXTRAORDINARY"

VISION: Nationally recognized hub of excellence in tech education, IT services and automation-driven innovation.
MISSION: Empower learners with industry-relevant skills through hands-on training and real-world projects.

COURSES (all hands-on, project-based):
Web Development (HTML/CSS/JS/React), Python (beginner to master), Data Science & Big Data Analytics,
Machine Learning & AI, IoT with Sensors & Actuators, Robotics (basic to advanced),
Full Stack Development, Soft Skills & Communication, Cybersecurity, Cloud Computing, Blockchain
Certifications: Course completion certificates, Industry-recognized certifications, Skill badges
Internships: AI, Robotics, Full Stack, IoT (real company projects)
Facilities: Smart Classrooms, Practical Labs, Spacious Workspaces, Seminar Hall, Library, R&D
Working hours: 9AM-9PM daily

PRODUCTS:
1. NEXION — WhatsApp + AI Voice Automation Platform (Meta Certified)
   WhatsApp Broadcast (bulk messaging, rich media, real-time tracking),
   Smart Automation (abandoned cart, lead qualification, 24/7 support),
   Template Messaging (Meta-approved OTP, promotional, transactional),
   AI Voice Broadcast (auto-call thousands, natural AI voice, multi-language),
   Inbound IVR (24/7), AI Voice Bot (free-form conversations),
   Analytics (delivery/read/click rates, A/B testing)
   Stats: 200+ brands | G2 4.7/5 | 98% open rate | 2.7B WhatsApp users
   Pricing: Starter Rs.2999/month | Growth Rs.4999/month | Enterprise Custom

2. Social Media Automation (Instagram, posting, engagement analytics)
3. Employee Management Suite (performance, attendance, productivity)
4. Document Automation (invoices, certificates, workflows)
5. Custom Software (CRM, SaaS, Mobile Apps, BI Dashboards, Database, Cloud, Security)
6. Email Automation (campaigns, scheduling, analytics)

STATS: 2210+ students trained, 1100+ entrepreneurs, 200+ enterprise clients, 10+ awards, 15+ courses, 35+ projects
Enterprise Partners: TCS, HCL, Infosys, Cognizant, Hexaware, Wipro
Clients: MRF, TVS, EATON, Rane, L&T, CavinKare, Teleflex, Steril-Gene, Foseco, Solara, MGM, Accent Pharma`

export const TVH_STATS = [
  {
    n: "2,210+",
    l: "Students Trained",
    icon: GraduationCap,
    color: "#3B82F6", // Blue
  },
  {
    n: "1,100+",
    l: "Entrepreneurs",
    icon: Rocket,
    color: "#F97316", // Orange
  },
  {
    n: "200+",
    l: "Enterprise Clients",
    icon: Building2,
    color: "#10B981", // Green
  },
  {
    n: "10+",
    l: "Awards Won",
    icon: Trophy,
    color: "#EAB308", // Gold
  },
]

export const TVH_CLIENTS = ['MRF', 'TVS', 'EATON', 'L&T', 'Rane', 'CavinKare', 'Teleflex', 'Steril-Gene', 'Foseco']
export const TVH_PARTNERS = ['TCS', 'HCL', 'Infosys', 'Cognizant', 'Hexaware', 'Wipro']



export const NEXION_PLANS = [
  {
    name: 'STARTER',
    price: '2,999',
    unit: '/mo',
    hot: false,
    cta: 'Get Started',
    feats: ['Inbound IVR', '1,000 voice minutes', 'WhatsApp Broadcast', 'Template Messaging', 'Email support'],
  },
  {
    name: 'GROWTH',
    price: '4,999',
    unit: '/mo',
    hot: true,
    cta: 'Most Popular',
    feats: ['Everything in Starter', 'AI Voice Bot', '5,000 voice minutes', 'A/B Testing', 'Priority support'],
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    unit: '',
    hot: false,
    cta: 'Contact Sales',
    feats: ['Unlimited + SLA', 'White-label', 'Dedicated infra', 'Custom integrations', '24/7 support'],
  },
]

export const CONTACT = {
  phone1: '+91 9629600230',
  phone2: '+91 9003530230',
  email: 'technovahubcareer@gmail.com',
  website: 'https://technovahub.in',
  address: 'No.48 Lawspet Main Road, Puducherry - 605008',
  whatsapp: 'https://wa.me/919629600230',
}
