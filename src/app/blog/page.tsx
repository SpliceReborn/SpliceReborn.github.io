"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiTag, FiUser, FiSearch, FiArrowRight } from "react-icons/fi";

// Sample blog posts data
const blogPosts = [
  {
    id: "salesforce-lwc-intro",
    title: "Introduction to Lightning Web Components",
    excerpt: "Learn about the core features of Salesforce's Lightning Web Components framework and how it can improve your development process.",
    date: "May 15, 2023",
    author: "Darren Seet",
    category: "Development",
    tags: ["Salesforce", "LWC", "JavaScript"],
    image: "/images/portraitmain2.png"
  },
  {
    id: "apex-best-practices",
    title: "Apex Best Practices for Enterprise Applications",
    excerpt: "Discover the best practices for writing maintainable, scalable Apex code that performs well in large enterprise Salesforce implementations.",
    date: "April 22, 2023",
    author: "Darren Seet",
    category: "Development",
    tags: ["Salesforce", "Apex", "Best Practices"],
    image: "/images/portraitmain2.png"
  },
  {
    id: "integration-patterns",
    title: "Salesforce Integration Patterns Explained",
    excerpt: "An overview of common integration patterns when connecting Salesforce with external systems, including REST, SOAP, and event-driven architectures.",
    date: "March 10, 2023",
    author: "Darren Seet",
    category: "Integration",
    tags: ["Salesforce", "Integration", "API"],
    image: "/images/portraitmain2.png"
  },
  {
    id: "einstein-analytics",
    title: "Getting Started with Einstein Analytics",
    excerpt: "A beginner's guide to Salesforce Einstein Analytics (now Tableau CRM) and how to create powerful dashboards to visualize your data.",
    date: "February 28, 2023",
    author: "Darren Seet",
    category: "Analytics",
    tags: ["Salesforce", "Einstein", "Analytics"],
    image: "/images/portraitmain2.png"
  },
  {
    id: "salesforce-dx",
    title: "Modern Development with Salesforce DX",
    excerpt: "How Salesforce DX is transforming the development process with source-driven development, scratch orgs, and improved deployment workflows.",
    date: "January 15, 2023",
    author: "Darren Seet",
    category: "Development",
    tags: ["Salesforce", "SFDX", "DevOps"],
    image: "/images/portraitmain2.png"
  },
  {
    id: "experience-cloud",
    title: "Building Engaging Portals with Experience Cloud",
    excerpt: "Step-by-step guide to creating customer, partner and employee portals using Salesforce Experience Cloud that drive engagement and self-service.",
    date: "December 10, 2022",
    author: "Darren Seet",
    category: "Experience Cloud",
    tags: ["Salesforce", "Communities", "Experience Cloud"],
    image: "/images/portraitmain2.png"
  }
];

// All unique categories from blog posts
const allCategories = ["All", ...new Set(blogPosts.map(post => post.category))];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter blog posts based on search term and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || 
                            post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="pt-10 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, insights, and guides on Salesforce development and technology
            </p>
          </motion.div>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
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
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all"
              >
                <Link href={`/blog/${post.id}`} className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                    <div className="flex items-center gap-1">
                      <FiUser size={12} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h2>
                  </Link>
                  
                  <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                        >
                          <FiTag size={12} /> {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Read more <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary/10 p-8 rounded-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Subscribe to my newsletter to receive the latest articles, tips, and insights on Salesforce development.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-input bg-background py-2 px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 