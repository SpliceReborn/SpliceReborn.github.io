"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { /* FiDownload, */ FiExternalLink } from "react-icons/fi";

const skills = [
  { 
    category: "Salesforce", 
    items: [
      "Sales & Service Cloud",
      "Manufacturing Cloud",
      "Experience Cloud",
      "Revenue Cloud"
    ] 
  },
  { 
    category: "Integration", 
    items: [
      "Mulesoft",
      "Overcast",
      "REST",
      "Integration with SAP"
    ] 
  },
  { 
    category: "External", 
    items: [
      "JavaScript",
      "React",
      "Node.js",
      "API Development"
    ] 
  },
  { 
    category: "Tools", 
    items: [
      "Git & GitHub",
      "VS Code",
      "Salesforce CLI",
      "GitHub Actions"
    ] 
  },
];

const experiences = [
  {
    title: "Salesforce Developer",
    company: "Kliqxe",
    period: "May 2023 - Present • 2 yrs",
    description: [
      "Architected and implemented complex Salesforce solutions to streamline critical business processes for enterprise clients",
      "Developed advanced Lightning Web Components and custom Apex triggers for high-volume transaction processing",
      "Engineered robust integration solutions with SAP and other ERPs using Mulesoft, REST/SOAP APIs and custom middleware",
      "Optimized performance through bulk processing patterns, governor limit management, and efficient SOQL query construction",
      "Implemented complex automated approval workflows and validation rules for manufacturing and distribution clients"
    ]
  },
  {
    title: "Graduate Trainee",
    company: "Kliqxe",
    period: "Nov 2022 - May 2023 • 7 mos",
    description: [
      "Developed Apex trigger frameworks and custom automation solutions for data validation and transformation",
      "Created analytical dashboards with complex report types for executive stakeholders",
      "Participated in code reviews and implemented unit tests achieving over 90% code coverage",
      "Assisted in deploying solutions through CI/CD pipelines using GitHub Actions and SFDX"
    ]
  }
];

// Map certification names to their corresponding image files
const certifications = [
  {
    name: "Manufacturing Cloud Accredited Professional",
    image: "/images/certs/2021-04_PLC-AP-Badge_Manufacturing_Cloud_High-Res.png"
  },
  {
    name: "Salesforce Certified Agentforce Specialist",
    image: "/images/certs/2025-02_Badge_SF-Certified_Agentforce-Specialist_High-Res.png"
  },
  {
    name: "Salesforce Certified Platform Developer I",
    image: "/images/certs/2021-03_Badge_SF-Certified_Platform-Developer-I_High-Res.png"
  },
  {
    name: "Salesforce Certified JavaScript Developer I",
    image: "/images/certs/2021-03_Badge_SF-Certified_JavaScript-Developer-I_High-Res.png"
  },
  {
    name: "Salesforce Certified Administrator",
    image: "/images/certs/2021-03_Badge_SF-Certified_Administrator_High-Res.png"
  },
  {
    name: "Salesforce Certified Associate",
    image: "/images/certs/2022-08_Badge_SF-Certified_Associate_High-Res.png"
  },
  {
    name: "Salesforce Certified AI Associate",
    image: "/images/certs/2023-07_Badge_SF-Certified_AI-Associate_High-Res.png"
  }
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
                  Hello! I&apos;m Darren, a Salesforce Developer with over 3 years of experience architecting and implementing 
                  enterprise solutions on the Salesforce platform. I specialize in developing sophisticated customizations for 
                  Sales & Service Cloud, Experience Cloud, Manufacturing Cloud, and building scalable integration solutions with external systems.
                </p>
                <p>
                  My technical expertise includes designing complex Apex triggers and batch processing systems, developing 
                  Lightning Web Components with advanced JavaScript frameworks, and creating robust integrations with ERPs such as SAP 
                  using tools like Overcast, Mulesoft, and custom middleware. I implement efficient data models and automation 
                  solutions that optimize business processes and enhance data flow across organizations.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {/* Temporarily hidden - uncomment when CV is updated
                <Link 
                  href="/public/DarrenCV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <FiDownload />
                </Link>
                */}
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
                  src="/images/LatestPortrait.jpeg" 
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background rounded-lg border p-6 flex items-center gap-4 hover:border-primary transition-all"
              >
                <div className="w-16 h-16 flex-shrink-0 relative">
                  <Image 
                    src={cert.image}
                    alt={cert.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <span className="font-medium">{cert.name}</span>
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