



// const axios = require("axios");
// const fs = require("fs");
// const FormData = require("form-data");

// const tumorDatabase = {
//   glioma: {
//     severity: "High",
//     description:
//       "Glioma is an aggressive type of brain tumor that originates in the glial cells.",
//     recommended_action:
//       "Immediate consultation with a neurosurgeon is strongly recommended.",
//     confidence: "High"
//   },

//   meningioma: {
//     severity: "Moderate",
//     description:
//       "Meningioma develops from the meninges and is usually slow-growing.",
//     recommended_action:
//       "Neurological evaluation and MRI monitoring advised.",
//     confidence: "High"
//   },

//   pituitary: {
//     severity: "Low to Moderate",
//     description:
//       "Pituitary tumors may affect hormone production.",
//     recommended_action:
//       "Consult an endocrinologist for hormone assessment.",
//     confidence: "Moderate"
//   },

//   notumor: {   // ⚠️ IMPORTANT: match Flask output
//     severity: "Normal",
//     description:
//       "No tumor detected in the MRI scan.",
//     recommended_action:
//       "No immediate action required.",
//     confidence: "Very High"
//   }
// };

// exports.predictImage = async (req, res) => {
//   try {
//     const form = new FormData();

//     // ✅ MUST MATCH FLASK KEY
//     form.append("file", fs.createReadStream(req.file.path));

//     const response = await axios.post(
//       "http://127.0.0.1:5000/predict",
//       form,
//       { headers: form.getHeaders() }
//     );

//     const prediction = response.data.prediction.toLowerCase();
//     const tumorInfo = tumorDatabase[prediction];

//     if (!tumorInfo) {
//       return res.status(400).json({
//         error: "Unknown tumor type detected"
//       });
//     }

//     res.json({
//       prediction: prediction.charAt(0).toUpperCase() + prediction.slice(1),
//       severity: tumorInfo.severity,
//       description: tumorInfo.description,
//       recommended_action: tumorInfo.recommended_action,
//       confidence: response.data.confidence  // use real ML confidence
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Prediction failed" });
//   }
// };



const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const tumorDatabase = {
  glioma: {
    severity: "High",
    description:
      "Glioma is an aggressive type of brain tumor that originates in the glial cells.",
    recommended_action:
      "Immediate consultation with a neurosurgeon is strongly recommended."
  },

  meningioma: {
    severity: "Moderate",
    description:
      "Meningioma develops from the meninges and is usually slow-growing.",
    recommended_action:
      "Neurological evaluation and MRI monitoring advised."
  },

  pituitary: {
    severity: "Low to Moderate",
    description:
      "Pituitary tumors may affect hormone production.",
    recommended_action:
      "Consult an endocrinologist for hormone assessment."
  },

  notumor: {
    severity: "Normal",
    description:
      "No tumor detected in the MRI scan.",
    recommended_action:
      "No immediate action required."
  }
};

exports.predictImage = async (req, res) => {
  try {
    // ✅ 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      form,
      { headers: form.getHeaders() }
    );

    const prediction = response.data.prediction.toLowerCase();
    const confidence = response.data.confidence;

    const tumorInfo = tumorDatabase[prediction];

    // ✅ 2. Validate tumor type
    if (!tumorInfo) {
      return res.status(400).json({
        success: false,
        message: "Unknown tumor type detected"
      });
    }

    // ✅ 3. Professional structured response
    return res.status(200).json({
      success: true,
      data: {
        prediction:
          prediction.charAt(0).toUpperCase() + prediction.slice(1),
        severity: tumorInfo.severity,
        description: tumorInfo.description,
        recommended_action: tumorInfo.recommended_action,
        confidence: confidence,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error("Prediction Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Prediction failed",
      error: error.message
    });
  }
};