"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RotatingText from "../RotatingText/RotatingText"
// import Waves from "../Hyperspeed/Hyperspeed"
import Hyperspeed from "../Hyperspeed/Hyperspeed"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/app/context/context"

const Hero = () => {
  const InternGeanieTextRef = useRef<HTMLDivElement>(null)
  const { isLoggedIn } = useAuth()

  return (
    <section className="relative w-full h-screen flex items-center justify-center mt-0 pt-0 pb-0 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: "xyDistortion",
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 3,
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 30,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.02, 0.05],
            lightStickHeight: [0.3, 0.7],
            movingAwaySpeed: [20, 50],
            movingCloserSpeed: [-150, -230],
            carLightsLength: [400 * 0.05, 400 * 0.2],
            carLightsRadius: [0.03, 0.08],
            carWidthPercentage: [0.1, 0.5],
            carShiftX: [-0.5, 0.5],
            carFloorSeparation: [0, 0.1],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              leftCars: [0x7d0d1b, 0xa90519, 0xff102a],
              rightCars: [0xf1eece, 0xe6e2b1, 0xdfd98a],
              sticks: 0xf1eece,
            }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Main heading - INCREASED TEXT SIZE */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="flex flex-wrap items-center justify-center">
              Effortless
              <RotatingText
                texts={["Job Search", "Automation", "Resume"]}
                mainClassName="px-3 sm:px-4 md:px-5 bg-gradient-to-r from-[#7d0d1b] via-[#a90519] to-[#ff102a] text-[#f1eece] overflow-hidden py-1.5 sm:py-2 md:py-2.5 justify-center rounded-lg ml-3"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </h1>

          {/* Subheading - INCREASED TEXT SIZE */}
          <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl">
            Land your dream job faster with InternGeanie.
            One-click resumes, smarter job matches, and a job hunt that works for you.
          </p>

          {/* CTA Button - THIS IS THE HIGHLIGHTED BUTTON CODE */}
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button
                className="rounded-full px-10 py-7 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] 
                 hover:from-[rgba(19,19,24,0.85)] hover:to-[rgba(19,19,24,0.85)] 
                 text-[#f1eece] text-lg font-medium shadow-lg backdrop-blur-sm 
                 border border-transparent hover:border-[#f1eece] hover:shadow-[0_0_15px_#f1eece] 
                 transition duration-300"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-6 w-6 text-[#f1eece]" />
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button
                className="rounded-full px-10 py-7 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] 
               hover:from-[rgba(19,19,24,0.85)] hover:to-[rgba(19,19,24,0.85)] 
               text-[#f1eece] text-lg font-medium shadow-lg backdrop-blur-sm 
               border border-transparent hover:border-[#f1eece] hover:shadow-[0_0_15px_#f1eece] 
               transition duration-300"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-6 w-6 text-[#f1eece]" />
              </Button>
            </Link>
          )}



        </div>
      </div>
    </section>
  )
}

export default Hero

