import { jsPDF } from "jspdf";
import { Order } from "@/types/order";

export function generateOrderInvoice(order: Order) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.text("INVOICE", pageWidth / 2, yPosition, { align: "center" });

  yPosition += 15;
  doc.setFontSize(10);
  doc.text(`Invoice #: ${order.id.slice(-8)}`, 20, yPosition);
  yPosition += 7;
  doc.text(
    `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
    20,
    yPosition
  );
  yPosition += 7;
  doc.text(`Status: ${order.status.toUpperCase()}`, 20, yPosition);

  // Shipping Info
  yPosition += 15;
  doc.setFontSize(12);
  doc.text("SHIPPING ADDRESS", 20, yPosition);
  yPosition += 7;
  doc.setFontSize(10);
  doc.text(
    `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
    20,
    yPosition
  );
  yPosition += 5;
  doc.text(order.shippingInfo.address, 20, yPosition);
  yPosition += 5;
  doc.text(
    `${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.postalCode}`,
    20,
    yPosition
  );

  // Items Table
  yPosition += 15;
  doc.setFontSize(12);
  doc.text("ORDER ITEMS", 20, yPosition);

  yPosition += 10;
  doc.setLineWidth(0.5);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 5;

  // Table headers
  doc.setFontSize(10);
  doc.text("Item", 20, yPosition);
  doc.text("Qty", 120, yPosition);
  doc.text("Price", 150, yPosition);
  doc.text("Total", pageWidth - 50, yPosition, { align: "right" });

  yPosition += 7;
  doc.line(20, yPosition - 2, pageWidth - 20, yPosition - 2);

  // Table rows
  order.items.forEach((item) => {
    doc.text(item.product.name, 20, yPosition);
    doc.text(item.quantity.toString(), 120, yPosition);
    doc.text(`$${item.product.price.toFixed(2)}`, 150, yPosition);
    doc.text(
      `$${(item.product.price * item.quantity).toFixed(2)}`,
      pageWidth - 50,
      yPosition,
      { align: "right" }
    );
    yPosition += 7;
  });

  // Totals
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 8;

  const subtotal = order.total;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  doc.text("Subtotal:", pageWidth - 120, yPosition);
  doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 50, yPosition, {
    align: "right",
  });
  yPosition += 7;

  if (shipping > 0) {
    doc.text("Shipping:", pageWidth - 120, yPosition);
    doc.text(`$${shipping.toFixed(2)}`, pageWidth - 50, yPosition, {
      align: "right",
    });
    yPosition += 7;
  }

  doc.text("Tax (10%):", pageWidth - 120, yPosition);
  doc.text(`$${tax.toFixed(2)}`, pageWidth - 50, yPosition, { align: "right" });
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", pageWidth - 120, yPosition);
  doc.text(`$${total.toFixed(2)}`, pageWidth - 50, yPosition, {
    align: "right",
  });

  // Footer
  yPosition = pageHeight - 30;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your purchase!", pageWidth / 2, yPosition, {
    align: "center",
  });

  if (order.trackingNumber) {
    yPosition += 5;
    doc.text(`Tracking: ${order.trackingNumber}`, pageWidth / 2, yPosition, {
      align: "center",
    });
  }

  // Save the PDF
  doc.save(`invoice-${order.id.slice(-8)}.pdf`);
}
