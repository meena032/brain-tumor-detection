🧠 Brain Tumor Detection System (Deep Learning)

AI-powered system for automated brain tumor classification from MRI scans using Convolutional Neural Networks.

📌 Overview

This project presents an end-to-end Deep Learning solution for detecting and classifying brain tumors from MRI images. It integrates a CNN-based model, a Flask inference API, and a React-based user interface to deliver real-time predictions with clinical insights.

The system is designed to assist in early diagnosis by providing fast, reliable, and interpretable outputs.

🎯 Key Highlights
🧠 Multi-class tumor classification (Glioma, Meningioma, Pituitary, No Tumor)
🤖 Deep Learning model built using TensorFlow/Keras
⚡ Real-time inference via Flask API
🌐 Full-stack integration (React + Node.js + Flask)
📊 Confidence score & severity interpretation
📄 Automated diagnostic report generation
🏗️ Architecture
User (React UI)
       ↓
Node.js Backend (API Layer)
       ↓
Flask API (Model Inference)
       ↓
CNN Model (TensorFlow/Keras)
🛠️ Tech Stack

Frontend:

React.js, HTML, CSS, JavaScript

Backend:

Node.js, Express.js

ML / AI:

TensorFlow, Keras (CNN)
OpenCV / PIL, NumPy

Tools & Environment:

VS Code, Git, Jupyter Notebook
🧠 Model Details
Architecture: Convolutional Neural Network (CNN)
Task: Multi-class image classification
Classes: Glioma, Meningioma, Pituitary, No Tumor
Input: MRI scan images
Output: Prediction + Confidence score
Performance: ~90% accuracy (dataset dependent)
⚙️ How It Works
User uploads or selects an MRI image
Image is preprocessed (resizing, normalization)
Request sent to backend API
Flask service loads trained model and performs inference
System returns:
Tumor type
Confidence score
Severity level
Recommended action
Results displayed on UI and report generated
📂 Project Structure
brain-tumor-detection/
│
├── frontend/              # React application
├── backend/               # Node.js API layer
├── ml-model/              # Flask + trained model
├── public/dataset/        # Sample MRI images
├── model/                 # Saved model (.h5)
├── app.py                 # Flask entry point
└── README.md
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/meena032/brain-tumor-detection.git
cd brain-tumor-detection
2️⃣ Setup ML Model (Flask)
cd ml-model
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
3️⃣ Start Backend (Node.js)
cd backend
npm install
npm start
4️⃣ Start Frontend (React)
cd frontend
npm install
npm start
5️⃣ Run Application
http://localhost:3001

⚠️ Limitations
Performance depends on dataset quality
Requires properly preprocessed MRI images
Not intended as a replacement for medical diagnosis
🔐 Ethical Considerations

This system is developed strictly for educational and research purposes.
It should not be used as a standalone medical diagnostic tool.

🤝 Contributing

Contributions are welcome:

Fork the repository
Create a feature branch
Commit your changes
Open a Pull Request
📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Meena
🔗 GitHub: https://github.com/meena032

⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
