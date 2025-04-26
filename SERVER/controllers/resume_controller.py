from models.resume_model import ResumeModel
from services.gemini_service import GeminiService
import logging

class ResumeController:
    def __init__(self):
        self.resume_model = ResumeModel()
        self.gemini_service = GeminiService()
    
    def process_resume(self, filepath):
        try:
            # Extract data from resume using Gemini API
            extracted_data = self.gemini_service.extract_resume_data(filepath)
            
            # Get ATS score using Gemini
            ats_score = self.gemini_service.score_resume_ats(filepath)
            
            # Save both extracted data and ATS scores to MongoDB
            doc_id = self.resume_model.save_resume_data(
                filepath=filepath,
                filename=filepath.split('/')[-1],
                extracted_data=extracted_data,
                ats_score=ats_score
            )
            
            return {
                'success': True,
                'message': 'Resume processed and scored successfully',
                'document_id': str(doc_id),
                'data': extracted_data,
                'ats_scores': ats_score
            }
            
        except Exception as e:
            logging.error(f"Error in process_resume: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
