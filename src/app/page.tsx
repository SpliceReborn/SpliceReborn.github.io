import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight /*, FiDownload */ } from "react-icons/fi";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section with Banner */}
      <section className="mb-20 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 relative">
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
          <Image 
            src="/images/Banner.jpeg" 
            alt="Darren Seet - Salesforce Developer" 
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="brightness-[0.85]"
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="w-full md:w-1/2 p-8 md:p-12 mr-0 md:mr-8 lg:mr-16 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Hi, I&apos;m <span className="gradient-text">Darren Seet</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-foreground font-medium mb-4">
                Salesforce Developer & Tech Enthusiast
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                I build custom solutions on the Salesforce platform and create responsive web applications 
                with modern technologies. Passionate about delivering clean code and exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Learn more about me <FiArrowRight />
                </Link>
                {/* Temporarily hidden - uncomment when CV is updated
                <Link 
                  href="/DarrenCV.pdf" 
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <FiDownload />
                </Link>
                */}
              </div>
            </div>
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
          <p className="text-muted-foreground mt-2">Check out my work</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Link href="/projects" className="group">
            <div className="border rounded-lg overflow-hidden bg-card hover:border-primary transition-colors">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Battleship Game
                </h3>
                <p className="text-muted-foreground mb-4">
                  A modern implementation of the classic Battleship game built with JavaScript and deployed on Heroku. Features include AI opponent, multiplayer mode, and responsive design.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">JavaScript</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">HTML/CSS</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">Game Development</span>
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
            View project details <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
