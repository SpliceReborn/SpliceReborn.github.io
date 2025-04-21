"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { FaSalesforce } from "react-icons/fa";

const skills = [
  { category: "Salesforce", items: ["Apex", "LWC", "Aura", "SOQL", "SOSL", "Visualforce", "Experience Cloud"] },
  { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "REST API", "Integration Services"] },
  { category: "Tools", items: ["Git", "VS Code", "Salesforce CLI", "GitHub Actions", "Heroku"] },
];

const experiences = [
  {
    title: "Salesforce Developer",
    company: "Kliqxe",
    period: "May 2023 - Present • 2 yrs",
    description: [
      "Developed custom Salesforce solutions for clients across various industries",
      "Built Lightning Web Components and Aura components for enhanced user experiences",
      "Implemented integration solutions with external systems using REST and SOAP APIs",
      "Created automation using Apex, Flows, and Process Builder"
    ]
  },
  {
    title: "Graduate Trainee",
    company: "Kliqxe",
    period: "Nov 2022 - May 2023 • 7 mos",
    description: [
      "Assisted in Salesforce configuration and customization",
      "Learned Salesforce development best practices",
      "Built reports and dashboards for executive stakeholders",
      "Gained practical experience in Apex programming and Salesforce administration"
    ]
  }
];

const certifications = [
  "Manufacturing Cloud Accredited Professional",
  "Salesforce Certified Agentforce Specialist",
  "Salesforce Certified Platform Developer I",
  "Salesforce Certified JavaScript Developer I",
  "Salesforce Certified Administrator",
  "Salesforce Certified Associate",
  "Salesforce Certified AI Associate"
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
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border shadow-lg bg-primary/10 flex items-center justify-center">
                <FaSalesforce className="text-9xl text-primary" />
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background rounded-lg border p-6 flex items-center gap-4 hover:border-primary transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FaSalesforce className="text-2xl text-primary" />
                </div>
                <div>
                  <span className="font-medium">{cert}</span>
                  <p className="text-xs text-muted-foreground mt-1">Salesforce</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="https://www.salesforce.com/trailblazer/darrenseetkliqxe"
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