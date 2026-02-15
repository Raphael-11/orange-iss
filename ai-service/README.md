# Orange ISS - AI Service

Python/Flask microservice for CV parsing and candidate ranking using machine learning.

## Coming Soon

This service will provide:
- CV parsing (PDF, DOCX, TXT)
- Information extraction (skills, education, experience)
- Candidate ranking based on offer requirements
- Explainable AI with ranking justifications

## Technology Stack

- Python 3.11
- Flask 3.x
- spaCy for NLP
- scikit-learn for ML
- PyPDF2 for PDF parsing
- python-docx for DOCX parsing

## API Endpoints

### POST /api/parse-cv
Parse a CV file and extract structured information.

### POST /api/rank-candidates
Rank candidates for a specific offer with explanations.

### GET /api/health
Health check endpoint.

## Development

```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

Service will run on `http://localhost:5000`

## Documentation

Detailed documentation will be added in future sprints.
