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
            src="/images/Banner.webp" 
            alt="Darren Seet - Salesforce Developer" 
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0MjQyNDIiLz48L3N2Zz4="
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
                <span className="gradient-text-alt">Salesforce Developer</span> & Tech Enthusiast
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                I build custom solutions on the Salesforce platform and create responsive web applications 
                with modern technologies. Passionate about delivering clean code and exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/about" 
                  className="button inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Learn more about me <FiArrowRight />
                </Link>
                {/* Temporarily hidden - uncomment when CV is updated
                <Link 
                  href="/DarrenCV.pdf" 
                  className="button inline-flex items-center gap-2 px-5 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
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
          <h2 className="heading-decorated text-3xl font-bold mx-auto w-fit">Skills & Expertise</h2>
          <p className="text-muted-foreground mt-2">Technologies I work with</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3 gradient-text">Salesforce</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Apex Development & LWCs</li>
              <li>• Integration Services</li>
              <li>• Manufacturing & Revenue Cloud</li>
              <li>• Agentforce</li>
            </ul>
          </div>
          
          <div className="card p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3 gradient-text">Frontend</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Responsive Design</li>
            </ul>
          </div>
          
          <div className="card p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3 gradient-text">Backend</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Node.js</li>
              <li>• Express</li>
              <li>• API Development</li>
              <li>• Database Management</li>
            </ul>
          </div>
          
          <div className="card p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3 gradient-text">Tools & More</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Git & GitHub</li>
              <li>• CI/CD Pipelines</li>
              <li>• Agile Methodologies</li>
              <li>• Technical Writing</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="fancy-divider my-16"></div>

      {/* Featured Projects Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="heading-decorated text-3xl font-bold mx-auto w-fit">Featured Projects</h2>
          <p className="text-muted-foreground mt-2">Check out my work</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Link href="/projects" className="group">
            <div className="card border rounded-lg overflow-hidden bg-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-colors">
                  Battleship Game
                </h3>
                <p className="text-muted-foreground mb-4">
                  A modern implementation of the classic Battleship game built with JavaScript. Features include AI opponent, multiplayer mode, and responsive design.
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
            className="inline-flex items-center gap-2 text-primary hover:underline animated-link"
          >
            View project details <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
