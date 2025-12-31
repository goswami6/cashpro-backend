import Inquiry from "../models/Inquiry.js";
import ExcelJS from "exceljs";


/* ===============================
   CREATE INQUIRY (PUBLIC)
================================ */
export const createInquiry = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    /* ---------- VALIDATION ---------- */
    if (!name || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Service are required",
      });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      email: email || "",
      service,
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry,
    });
  } catch (err) {
    console.error("CREATE INQUIRY ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit inquiry",
    });
  }
};

/* ===============================
   GET ALL INQUIRIES (ADMIN)
================================ */
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      inquiries,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
    });
  }
};

/* ===============================
   UPDATE STATUS (ADMIN)
================================ */
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    /* ---------- STATUS VALIDATION ---------- */
    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.json({
      success: true,
      inquiry: updatedInquiry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update inquiry status",
    });
  }
};



export const downloadInquiriesExcel = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inquiries");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Service", key: "service", width: 20 },
      { header: "Message", key: "message", width: 40 },
      { header: "Status", key: "status", width: 12 },
      { header: "Created At", key: "createdAt", width: 22 },
    ];

    inquiries.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        phone: item.phone,
        email: item.email || "",
        service: item.service,
        message: item.message || "",
        status: item.status,
        createdAt: new Date(item.createdAt).toLocaleString(),
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inquiries.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("EXCEL DOWNLOAD ERROR:", err);
    res.status(500).json({ message: "Failed to generate Excel" });
  }
};
