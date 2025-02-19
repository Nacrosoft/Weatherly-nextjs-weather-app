import React, { memo, useState } from 'react';
import { Github } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface FooterProps {
  className?: string;
  authorName?: string;
  githubUsername?: string;
  repoUrl?: string;
}

const Footer = memo(
  ({
    className = '',
    authorName = 'Meetefy',
    githubUsername = 'Meetefy',
    repoUrl = 'integrate-public-weather-api',
  }: FooterProps) => {
    const currentYear = new Date().getFullYear();
    const githubProfileUrl = `https://github.com/${githubUsername}`;
    const githubRepoUrl = `https://github.com/${githubUsername}/${repoUrl}`; // Corrected URL

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close

    return (
      <footer
        className={`w-full bg-background border-t border-border/40 mt-auto ${className}`}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>by</span> {/* Moved "by" inside the first span */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                    aria-label={`Visit ${authorName}'s GitHub profile`}
                  >
                    {authorName}
                  </a>
                </TooltipTrigger>
                <TooltipContent>Visit GitHub Profile</TooltipContent>
              </Tooltip>
              <span className="mx-1">©</span>
              <span>{currentYear}</span>
            </span> {/* Closing tag for the first span was missing */}

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="View source code on GitHub"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Source</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>View source code</TooltipContent>
            </Tooltip>
           </div>
           <div className='text-center text-xs text-muted-foreground mt-2'>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Powered by Weather API
              </span>

              {/* Very basic modal - NO ERROR, but VERY POOR UX */}
              {isModalOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
					          width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000, // Ensure it's on top
                  }}
                  onClick={() => setIsModalOpen(false)} // Close on outside click

                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      maxWidth: '80%', // Limit width
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                     onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                  >
                    <p>This application uses the Meetefy Weather API, version 1.1.2.</p>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>

                  </div>
                </div>
              )}
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';

export default Footer;
