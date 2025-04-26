import google.generativeai as genai
import os
from PyPDF2 import PdfReader
import json
import logging
import re

class GeminiService:
    def __init__(self):
        self.api_key = 'AIzaSyD9tAeFXCHe1-sWsvakCvr35xDHBzXAFj4'
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel()

    def _extract_text_from_pdf(self, filepath):
        """Extract text content from PDF file"""
        pdf_text = ""
        pdf = PdfReader(filepath)
        for page in pdf.pages:
            pdf_text += page.extract_text() + "\n\n"
        return pdf_text

    def extract_resume_data(self, filepath):
        """Extract structured resume data using Gemini API"""
        try:
            resume_content = self._extract_text_from_pdf(filepath)

            prompt = """
            Please extract all relevant information from this resume document.
            Return the data in a structured JSON format.
            """
            input_text = f"{prompt}\n\n{resume_content}"

            logging.debug(f"Input sent to Gemini API: {input_text}")
            response = self.model.generate_content(input_text)
            logging.debug(f"Gemini API raw response: {response}")

            cleaned_response = re.sub(r'```[a-zA-Z]*', '', response.text).strip()
            try:
                extracted_data = json.loads(cleaned_response)
            except json.JSONDecodeError:
                logging.error(f"Failed to parse Gemini API response: {cleaned_response}")
                raise Exception("Invalid JSON response from Gemini API")

            logging.debug(f"Extracted data: {extracted_data}")
            return extracted_data

        except Exception as e:
            logging.error(f"Error extracting data from resume: {str(e)}")
            raise Exception(f"Error extracting data from resume: {str(e)}")
    def score_resume_ats(self, filepath):
        """Use Gemini to evaluate resume for formatting and grammar ATS score"""
        try:
            resume_text = self._extract_text_from_pdf(filepath)

            prompt = """
           You are an ATS (Applicant Tracking System) expert. Analyze the following resume data and provide:
            1. A total score out of 100 based on formatting, grammar, and structure.
            2. A breakdown of scores in two categories: formatting and grammar.
            3. For each category, explain what is good and what needs improvement.

            Return ONLY valid JSON in the format:
            {
            "totalScore": 90,
            }

            Resume Data:
"""

            input_text = f"{prompt}\n\nResume:\n{resume_text}"
            response = self.model.generate_content(input_text)

            cleaned_response = re.sub(r'```[a-zA-Z]*', '', response.text).strip()

            try:
                ats_score = json.loads(cleaned_response)
            except json.JSONDecodeError:
                logging.error(f"Gemini ATS score response parsing failed: {cleaned_response}")
                raise Exception("Gemini returned invalid JSON for ATS scoring")

            return ats_score

        except Exception as e:
            logging.error(f"Error scoring ATS: {str(e)}")
            raise Exception(f"Error scoring ATS: {str(e)}")