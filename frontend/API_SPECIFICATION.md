# AI-Based Crop Prediction System - API Specification

## Base URL
`import.meta.env.VITE_API_BASE_URL`

## Auth (Optional/Public)
- All routes are public by default unless specified.

## Endpoints

### 1. Crop Prediction
- **POST** `/api/crop/predict`
  - **Body**:
    ```json
    {
      "nitrogen": number,
      "phosphorus": number,
      "potassium": number,
      "temperature": number,
      "humidity": number,
      "ph": number,
      "rainfall": number
    }
    ```
  - **Response**:
    ```json
    {
      "crop": string,
      "confidence": number,
      "yieldEstimation": number,
      "profitEstimation": number,
      "rotationSuggestion": string,
      "fertilizerTips": string[],
      "irrigationRecommendation": string
    }
    ```

### 2. Disease Detection
- **POST** `/api/disease/detect`
  - **Body**: `FormData` (contains `file` - leaf image)
  - **Response**:
    ```json
    {
      "disease": string,
      "confidence": number,
      "treatment": string,
      "recommendations": string[],
      "imageUrl": string
    }
    ```

### 3. Market Intelligence
- **GET** `/api/market/prices`
  - **Query Params**: `cropName` (optional), `location` (optional)
  - **Response**:
    ```json
    [
      {
        "id": number,
        "cropName": string,
        "mandi": string,
        "price": number,
        "date": string,
        "trend": "UP" | "DOWN" | "STABLE"
      }
    ]
    ```

### 4. Weather Alerts
- **GET** `/api/weather/alerts`
  - **Query Params**: `lat`, `lng`
  - **Response**:
    ```json
    [
      {
        "id": number,
        "type": "RAIN" | "DROUGHT" | "FROST",
        "severity": "LOW" | "MEDIUM" | "HIGH",
        "message": string,
        "date": string
      }
    ]
    ```

### 5. AI Chatbot
- **POST** `/ai/chat`
  - **Body**:
    ```json
    {
      "messages": [
        { "role": "user", "content": string }
      ]
    }
    ```
  - **Response**: Streaming text response.

### 6. Farmer History (Dashboard)
- **GET** `/api/farmers/history`
  - **Response**:
    ```json
    [
      {
        "id": number,
        "crop": string,
        "date": string,
        "yield": number,
        "profit": number
      }
    ]
    ```
