import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface SpareItem {
  id: string;
  partName: string;
  price: number;
  qty: number;
  total: number;
  createdAt: string;
}

export const exportToCSV = (spares: SpareItem[], filename = "spares_inventory.csv") => {
  const headers = ["Part Name", "Price", "Quantity", "Total", "Created At"];
  const rows = spares.map((spare) => [
    spare.partName,
    spare.price.toFixed(2),
    spare.qty,
    spare.total.toFixed(2),
    spare.createdAt,
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (spares: SpareItem[], filename = "spares_inventory.xlsx") => {
  // Simple Excel-compatible CSV with BOM for UTF-8 encoding
  const headers = ["Part Name", "Price", "Quantity", "Total", "Created At"];
  const rows = spares.map((spare) => [
    spare.partName,
    spare.price.toFixed(2),
    spare.qty,
    spare.total.toFixed(2),
    spare.createdAt,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  // Add UTF-8 BOM for proper Excel encoding
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csv], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (spares: SpareItem[], filename = "spares_inventory.pdf") => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Spares Inventory Report", 14, 15);

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

  const tableData = spares.map((spare) => [
    spare.partName,
    `₹${spare.price.toFixed(2)}`,
    spare.qty,
    `₹${spare.total.toFixed(2)}`,
    spare.createdAt,
  ]);

  autoTable(doc, {
    head: [["Part Name", "Price", "Quantity", "Total", "Created At"]],
    body: tableData,
    startY: 35,
    margin: { top: 35 },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
  });

  const totalPrice = spares.reduce((sum, spare) => sum + spare.total, 0);
  const finalY = (doc as any).lastAutoTable.finalY || 35;
  doc.setFontSize(10);
  doc.text(`Total Inventory Value: ₹${totalPrice.toFixed(2)}`, 14, finalY + 15);

  doc.save(filename);
};

export const importFromCSV = (file: File): Promise<Partial<SpareItem>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.trim().split("\n");
        if (lines.length < 2) {
          reject(new Error("CSV file must contain headers and at least one data row"));
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
        const expectedHeaders = ["part name", "price", "quantity"];

        if (!expectedHeaders.every((h) => headers.includes(h))) {
          reject(
            new Error(
              `CSV must contain columns: ${expectedHeaders.join(", ")}. Found: ${headers.join(", ")}`
            )
          );
          return;
        }

        const spares: Partial<SpareItem>[] = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
          const spare: Partial<SpareItem> = {
            partName: values[headers.indexOf("part name")] || "",
            price: parseFloat(values[headers.indexOf("price")] || "0") || 0,
            qty: parseInt(values[headers.indexOf("quantity")] || "0", 10) || 0,
          };

          if (!spare.partName) {
            throw new Error(`Row ${i + 1}: Part Name is required`);
          }
          if (spare.price! < 0) {
            throw new Error(`Row ${i + 1}: Price cannot be negative`);
          }
          if (spare.qty! < 0) {
            throw new Error(`Row ${i + 1}: Quantity cannot be negative`);
          }

          spares.push(spare);
        }

        resolve(spares);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

export const importFromExcel = (file: File): Promise<Partial<SpareItem>[]> => {
  return importFromCSV(file);
};
