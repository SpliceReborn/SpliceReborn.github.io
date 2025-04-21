"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink } from "react-icons/fi";

const skills = [
  { category: "Salesforce", items: ["Apex", "LWC", "Aura", "SOQL", "SOSL", "Visualforce", "Experience Cloud"] },
  { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "REST API", "Integration Services"] },
  { category: "Tools", items: ["Git", "VS Code", "Salesforce CLI", "GitHub Actions", "Heroku"] },
];

const experiences = [
  {
    title: "Senior Salesforce Developer",
    company: "TechCorp Solutions",
    period: "2020 - Present",
    description: [
      "Lead developer for multiple enterprise Salesforce implementations",
      "Designed and built custom Lightning Web Components for improved user experience",
      "Implemented complex integration solutions with external systems",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  {
    title: "Salesforce Developer",
    company: "CloudTech Inc.",
    period: "2017 - 2020",
    description: [
      "Developed custom Apex solutions for business process automation",
      "Created Visualforce pages and controllers for client-facing applications",
      "Worked on data migration projects and established best practices",
      "Collaborated with business analysts to refine requirements"
    ]
  },
  {
    title: "Junior Developer",
    company: "Digital Solutions",
    period: "2015 - 2017",
    description: [
      "Assisted in Salesforce configuration and customization",
      "Built reports and dashboards for executive stakeholders",
      "Performed data cleansing and validation tasks",
      "Gained experience in Apex programming and Salesforce administration"
    ]
  }
];

const certifications = [
  "Salesforce Certified Platform Developer II",
  "Salesforce Certified Platform Developer I", 
  "Salesforce Certified Administrator",
  "Salesforce Certified Platform App Builder",
  "Salesforce Certified Service Cloud Consultant"
];

export default function About() {
  return (
    <>
      <section className="pt-10 pb-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4">About Me</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Salesforce Developer passionate about building innovative solutions
                </p>
              </div>
              
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Hello! I&apos;m Darren, a Salesforce Developer with over 7 years of experience in designing and implementing 
                  custom solutions on the Salesforce platform. I&apos;m passionate about leveraging technology to solve complex 
                  business problems and deliver exceptional user experiences.
                </p>
                <p>
                  My journey in the Salesforce ecosystem has allowed me to work on diverse projects across various 
                  industries, from financial services to healthcare and retail. I specialize in Apex development, 
                  Lightning Web Components, and integration services, constantly staying updated with the latest 
                  platform enhancements and best practices.
                </p>
                <p>
                  Beyond Salesforce, I&apos;m interested in all things tech – from web development and cloud computing to 
                  emerging technologies like artificial intelligence and blockchain. I enjoy learning new skills and 
                  applying them to create innovative solutions.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new hiking trails, reading sci-fi novels, or experimenting 
                  with home cooking recipes.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/public/DarrenCV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <FiDownload />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 w-full max-w-md mx-auto md:max-w-none"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border shadow-lg">
                <Image 
                  src="/images/rightimage.jpg" 
                  alt="Darren Seet" 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground">
              Technologies and tools I work with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-lg border p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold">Work Experience</h2>
            <p className="text-xl text-muted-foreground">
              My professional journey so far
            </p>
          </div>
          
          <div className="space-y-12 max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-10 pb-10 border-l border-border"
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 mt-1"></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-lg text-primary">{exp.company}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold">Certifications</h2>
            <p className="text-xl text-muted-foreground">
              Professional accreditations and qualifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background rounded-lg border p-6 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span className="font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="https://trailblazer.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline gap-1"
            >
              View Trailblazer Profile <FiExternalLink />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 