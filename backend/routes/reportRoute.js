const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

router.post("/report", (req, res) => {
  const { patientName, predictionData } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Brain_MRI_Report.pdf`
  );

  doc.pipe(res);

  // Title
  doc.fontSize(20).text("AI-Assisted Brain MRI Analysis Report", {
    align: "center"
  });

  doc.moveDown();

  // Patient Info
  doc.fontSize(12).text(`Patient Name: ${patientName}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  // Results
  doc.fontSize(14).text("Analysis Results");
  doc.moveDown(0.5);

  doc.fontSize(12).text(`Predicted Tumor Type: ${predictionData.prediction}`);
  doc.text(`Confidence: ${predictionData.confidence}%`);
  doc.text(`Severity: ${predictionData.severity}`);
  doc.moveDown();

  doc.fontSize(14).text("Clinical Description");
  doc.moveDown(0.5);
  doc.fontSize(12).text(predictionData.description);
  doc.moveDown();

  doc.fontSize(14).text("Recommended Action");
  doc.moveDown(0.5);
  doc.fontSize(12).text(predictionData.recommended_action);
  doc.moveDown();

  doc.fontSize(10).fillColor("gray").text(
    "Disclaimer: This AI system is intended for educational and research purposes only and does not replace professional medical diagnosis.",
    { align: "center" }
  );

  doc.end();
});

module.exports = router;