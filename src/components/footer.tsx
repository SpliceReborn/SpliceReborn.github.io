"use client";

import React from "react";
import Link from "next/link";
import { FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold gradient-text">Darren Seet</h3>
            <p className="text-muted-foreground text-sm">
              Salesforce Developer interested in all things tech
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/in/darren-seet-73a004129/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/SpliceReborn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiGithub size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Salesforce Expertise</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Apex Development</li>
              <li className="text-muted-foreground">Lightning Web Components</li>
              <li className="text-muted-foreground">Integration Services</li>
              <li className="text-muted-foreground">Admin & Customization</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-muted-foreground">
              Want to discuss a project or just say hi? Feel free to reach out!
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Darren Seet. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 sm:mt-0">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
} 