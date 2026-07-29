import jsPDF from "jspdf";

export const generatePDF = ({ result, info, aiResponse = "" }) => {
  const doc = new jsPDF();

  const today = new Date().toLocaleString();

  doc.setFontSize(22);
  doc.setTextColor(34, 197, 94);
  doc.text("EcoVision AI", 20, 20);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Waste Analysis Report", 20, 30);

  doc.line(20, 35, 190, 35);

  let y = 50;

  doc.setFontSize(12);

  doc.text(`Date: ${today}`, 20, y);
  y += 12;

  doc.text(`Prediction: ${result.prediction}`, 20, y);
  y += 10;

  doc.text(`Confidence: ${result.confidence}%`, 20, y);
  y += 10;

  doc.text(`Bin: ${info.bin}`, 20, y);
  y += 10;

  doc.text(`Recyclable: ${info.recyclable ? "Yes" : "No"}`, 20, y);
  y += 10;

  doc.text(`Decomposition: ${info.decomposition}`, 20, y);
  y += 15;

  doc.setFontSize(14);
  doc.text("Environmental Impact", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(`CO₂ Saved: ${info.co2Saved}`, 25, y);
  y += 10;

  doc.text(`Water Saved: ${info.waterSaved}`, 25, y);
  y += 10;

  doc.text(`Energy Saved: ${info.energySaved}`, 25, y);
  y += 15;

  doc.setFontSize(14);
  doc.text("Eco Tip", 20, y);

  y += 10;

  doc.setFontSize(12);

  const eco = doc.splitTextToSize(info.ecoTip, 170);
  doc.text(eco, 20, y);

  y += eco.length * 7 + 10;

  doc.setFontSize(14);
  doc.text("Description", 20, y);

  y += 10;

  doc.setFontSize(12);

  const desc = doc.splitTextToSize(info.description, 170);
  doc.text(desc, 20, y);

  y += desc.length * 7 + 10;

  doc.setFontSize(14);
  doc.text("Gemini AI Recommendation", 20, y);

  y += 10;

  doc.setFontSize(12);

  const ai = doc.splitTextToSize(aiResponse || "No AI recommendation available.", 170);
  doc.text(ai, 20, y);

  doc.save("EcoVision_AI_Report.pdf");
};