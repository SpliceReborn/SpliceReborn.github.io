import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-10 mb-20 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Hi, I&apos;m <span className="gradient-text">Darren Seet</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium">
            Salesforce Developer & Tech Enthusiast
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            I build custom solutions on the Salesforce platform and create responsive web applications 
            with modern technologies. Passionate about delivering clean code and exceptional user experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Learn more about me <FiArrowRight />
            </Link>
            <Link 
              href="/DarrenCV.pdf" 
              className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <FiDownload />
            </Link>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-md mx-auto md:max-w-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border shadow-lg">
            <Image 
              src="/images/rightimage.jpg" 
              alt="Darren Seet" 
              fill 
              style={{ objectFit: "cover" }} 
              className="hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
          <p className="text-muted-foreground mt-2">Technologies I work with</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 border rounded-lg bg-card hover:border-primary transition-colors">
            <h3 className="font-medium mb-3">Salesforce</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Apex Development</li>
              <li>• Lightning Web Components</li>
              <li>• Experience Cloud</li>
              <li>• Integration Services</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg bg-card hover:border-primary transition-colors">
            <h3 className="font-medium mb-3">Frontend</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Responsive Design</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg bg-card hover:border-primary transition-colors">
            <h3 className="font-medium mb-3">Backend</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Node.js</li>
              <li>• Express</li>
              <li>• API Development</li>
              <li>• Database Management</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg bg-card hover:border-primary transition-colors">
            <h3 className="font-medium mb-3">Tools & More</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Git & GitHub</li>
              <li>• CI/CD Pipelines</li>
              <li>• Agile Methodologies</li>
              <li>• Technical Writing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-2">Some of my recent work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/projects" className="group">
            <div className="border rounded-lg overflow-hidden bg-card hover:border-primary transition-colors">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Salesforce Customer Portal
                </h3>
                <p className="text-muted-foreground mb-4">
                  Custom Experience Cloud portal with advanced analytics dashboard and integration with external systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">Apex</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">LWC</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">Integration</span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/projects" className="group">
            <div className="border rounded-lg overflow-hidden bg-card hover:border-primary transition-colors">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Portfolio Website
                </h3>
                <p className="text-muted-foreground mb-4">
                  Modern, responsive portfolio website built with Next.js and Tailwind CSS with dark mode support.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">TypeScript</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">Tailwind</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all projects <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
