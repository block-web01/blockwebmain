import fs from "fs";
import path from "path";

const STORAGE_PATH = path.join(process.cwd(), "inquiries.json");

export async function saveInquiry(data: Record<string, unknown>) {
  let inquiries: Record<string, unknown>[] = [];
  if (fs.existsSync(STORAGE_PATH)) {
    const content = fs.readFileSync(STORAGE_PATH, "utf-8");
    inquiries = JSON.parse(content || "[]");
  }
  
  const newInquiry = {
    ...data,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "unread"
  };
  
  inquiries.push(newInquiry);
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(inquiries, null, 2));
  return newInquiry;
}

export async function getInquiries() {
  if (!fs.existsSync(STORAGE_PATH)) return [];
  const content = fs.readFileSync(STORAGE_PATH, "utf-8");
  return JSON.parse(content || "[]").reverse();
}

export async function deleteInquiry(id: string) {
  if (!fs.existsSync(STORAGE_PATH)) return;
  const content = fs.readFileSync(STORAGE_PATH, "utf-8");
  const inquiries = JSON.parse(content || "[]");
  const filtered = inquiries.filter((inq: Record<string, unknown>) => inq._id !== id);
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(filtered, null, 2));
}

export async function updateInquiryStatus(id: string, status: string) {
  if (!fs.existsSync(STORAGE_PATH)) return;
  const content = fs.readFileSync(STORAGE_PATH, "utf-8");
  const inquiries = JSON.parse(content || "[]");
  const updated = inquiries.map((inq: Record<string, unknown>) => 
    inq._id === id ? { ...inq, status } : inq
  );
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(updated, null, 2));
}
