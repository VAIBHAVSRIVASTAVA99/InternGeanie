"use client"

import React from "react"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Sparkles, Loader2 } from "lucide-react"
import { useResumeForm, ResumeFormProvider } from "../components/resume-form-context"
import ResumePreview from "../components/resume-preview"

function BuildResume() {
  const { formData, generateAIResume, isGenerating } = useResumeForm()
  const resumeRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${formData.basicInfo.name || "Resume"}_${new Date().toLocaleDateString()}`,
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] text-[#f1eece]">
      <Card className="w-full max-w-4xl backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece] shadow-lg rounded-2xl overflow-hidden p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#f1eece]">Your Resume</h1>
          <div className="flex gap-3">
            
            <Button onClick={() => handlePrint()} className="bg-[#f1eece] text-[#131318] hover:bg-[#f1eece]/80">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={resumeRef}>
            <ResumePreview formData={formData} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function BuildResumePage() {
  return (
    <ResumeFormProvider>
      <BuildResume />
    </ResumeFormProvider>
  )
}
