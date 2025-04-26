'use client'
import React from 'react'
import MainLayout from '@/components/layout/MainLayout'
import GetStartedCTA from '@/components/ui/GetStartedCTA'
import Link from 'next/link'
import { LampContainer } from '@/components/ui/lamp'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Mervin',
      role: 'Founder',
      title: 'Psychologist & Free-loader',
      traits: ['+ Goofy', '+ Demanding', '+ Dedicated'],
      image: 'https://ext.same-assets.com/1016765841/849522504.jpeg',
      linkedIn: 'https://www.linkedin.com/in/mervin-mandanna/',
    },
    {
      name: 'Dilip',
      role: 'Co-Founder',
      title: 'Technology & Development',
      traits: ['+ Curious', '+ Open Minded', '+ Assertive'],
      image: 'https://ext.same-assets.com/1016765841/849522504.jpeg',
      linkedIn: 'https://www.linkedin.com/in/dilip-s-chakravarthi-5656ab209/',
    },
    {
      name: 'Vaibhav G',
      role: 'Co-Founder',
      title: 'Development & ML Engineer',
      traits: ['+ Unconventional', '+ Self-reliant', '+ Versatile'],
      image: 'https://ext.same-assets.com/1016765841/849522504.jpeg',
      linkedIn: 'https://www.linkedin.com/in/vaibhav-garg-0b778a2a2/',
    },
    {
      name: 'Vaibhav S',
      role: 'Co-Founder',
      title: 'Brand Building & Customer Relations',
      traits: ['+ Resilience', '+ Efficiency', '+ Simplicity'],
      image: 'https://www.linkedin.com/in/vaibhav-srivastava-56141b30a/',
      linkedIn: 'https://www.linkedin.com/in/jolly-satodiya-bv/',
    },
  ]

  return (
    <MainLayout>
      
      {/* FIRST SECTION WITH LAMP CONTAINER */}
      <section className="w-full bg-black flex items-center justify-center relative">
        <div className="w-full">
          <LampContainer className="text-center w-full mx-auto pt-8">
            <span className="text-gray-800 mb-4 block text-lg">Shaping the Future of Job Search</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Our Journey with InternGeanie</h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              At InternGeanie, we're passionate about making job hunting faster and smarter. Our story is rooted in the
              idea that your time is valuable. We aim to streamline the job application process, so you can focus
              on what truly matters—your growth.
            </p>
          </LampContainer>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why are we doing this?</h2>
              <p className="text-gray-400 mb-6">
                Maximizing your potential is key, and with InternGeanie—streamlining your job search and
                application process buys you time, so you can focus on what truly matters.
              </p>
            </div>
            <div className="bg-purple-900/10 rounded-lg p-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-20"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4">The Mission We Believe In</h3>
                <p className="text-gray-400">
                  Our mission is simple: to automate the job search and application process so you can focus on what's important.
                  InternGeanie uses AI to help you find, apply, and track jobs effortlessly, freeing you to upskill or explore other priorities in life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 bg-purple-900/10 rounded-lg p-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-20"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4">Our Vision For The World</h3>
                <p className="text-gray-400">
                  We envision a world where job seekers spend less time applying and more time thriving in their careers.
                  InternGeanie aims to automate not just your job search, but your life's tedious tasks—ensuring you get it right, fast, and efficiently.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">The Team behind InternGeanie</h2>
              <p className="text-gray-400 mb-6">
                InternGeanie is the brainchild of a passionate team of innovators who believe in the power of AI.
                InternGeanie is here to make your job search seamless.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-30"></div>
                  <div className="relative rounded-full overflow-hidden h-full w-full">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold">{member.name}</h3>
                <div className="text-purple-400 font-medium text-sm mb-1">{member.role}</div>
                <div className="text-gray-400 text-xs mb-4">{member.title}</div>

                <div className="text-sm text-left space-y-1 mb-4">
                  {member.traits.map((trait, i) => (
                    <div key={i} className="text-gray-300">{trait}</div>
                  ))}
                </div>

                {member.linkedIn && (
                  <Link href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
