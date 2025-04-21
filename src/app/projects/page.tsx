"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiSearch } from "react-icons/fi";

// Project data
const projects = [
  {
    id: "quiz",
    title: "Salesforce Certification Quiz App",
    description: "An interactive quiz application built with Lightning Web Components to help users prepare for Salesforce certification exams. Features include timed quizzes, result tracking, and personalized study recommendations.",
    image: "/images/quiz.png",
    tags: ["Salesforce", "LWC", "Apex", "UI/UX"],
    links: {
      demo: "https://www.salesforce.com",
      code: "https://github.com/SpliceReborn/quiz-app"
    },
    featured: true
  },
  {
    id: "phonebook",
    title: "Phonebook Management System",
    description: "A comprehensive contact management solution developed on the Salesforce platform. The app utilizes Lightning Web Components to provide a responsive and intuitive interface for managing contacts, with advanced search and filtering capabilities.",
    image: "/images/phonebook.png",
    tags: ["Salesforce", "LWC", "SOQL", "REST API"],
    links: {
      demo: "https://www.salesforce.com",
      code: "https://github.com/SpliceReborn/phonebook-app"
    },
    featured: true
  },
  {
    id: "battleship",
    title: "Battleship Game",
    description: "A modern implementation of the classic Battleship game built with JavaScript and deployed on Heroku. Features include AI opponent, multiplayer mode, and responsive design for desktop and mobile play.",
    image: "/images/battleship.png",
    tags: ["JavaScript", "HTML/CSS", "Heroku", "Game Development"],
    links: {
      demo: "https://battleship-game.herokuapp.com",
      code: "https://github.com/SpliceReborn/battleship-game"
    },
    featured: true
  },
  {
    id: "data-visualization",
    title: "Salesforce Data Visualization",
    description: "A data visualization dashboard that transforms Salesforce data into actionable insights using charts, graphs, and interactive elements. Built with Lightning Web Components and Chart.js.",
    image: "/images/portraitmain2.png",
    tags: ["Salesforce", "LWC", "Chart.js", "Data Analysis"],
    links: {
      demo: "https://www.salesforce.com",
      code: "https://github.com/SpliceReborn/data-viz"
    },
    featured: false
  },
  {
    id: "e-commerce",
    title: "E-Commerce Integration",
    description: "An integration solution connecting Salesforce with Shopify to synchronize product data, inventory, orders, and customer information in real-time. Implemented using Apex and Salesforce Integration Services.",
    image: "/images/portraitmain2.png",
    tags: ["Salesforce", "Integration", "Apex", "E-Commerce"],
    links: {
      demo: "https://www.salesforce.com",
      code: "https://github.com/SpliceReborn/ecommerce-integration"
    },
    featured: false
  },
  {
    id: "community-portal",
    title: "Customer Community Portal",
    description: "A self-service portal built using Salesforce Experience Cloud that enables customers to access knowledge articles, submit and track cases, and manage their account details.",
    image: "/images/portraitmain2.png",
    tags: ["Salesforce", "Experience Cloud", "Communities", "Customer Service"],
    links: {
      demo: "https://www.salesforce.com",
      code: "https://github.com/SpliceReborn/community-portal"
    },
    featured: false
  }
];

// Categories for filtering
const allCategories = ["All", "Salesforce", "LWC", "Integration", "JavaScript", "UI/UX"];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter projects based on search term and active category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || 
                            project.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="pt-10 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-muted-foreground">
              Showcasing my work and contributions in Salesforce development and beyond
            </p>
          </div>
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  id={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col h-full overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 text-xs rounded-md">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-secondary text-secondary-foreground px-2 py-1 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.links.demo && (
                          <Link
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            Live Demo <FiExternalLink size={14} />
                          </Link>
                        )}
                        {project.links.code && (
                          <Link
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            Source Code <FiGithub size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No projects found matching your criteria. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Interested in working together?</h2>
            <p className="text-xl text-muted-foreground">
              I&apos;m always open to discussing new projects or Salesforce implementation opportunities.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 