from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)

from app.pdf.styles import (
    TITLE,
    SUBTITLE,
    SECTION,
    NORMAL,
    SMALL_LABEL,
    SMALL_VALUE,
    CELL_BOLD,
    FOOTER_TEXT,
    TABLE_HEADER,
)

# ============================================================
# PALETTE  (matches proposal palette exactly)
# ============================================================

PRIMARY    = colors.HexColor("#1E3A8A")
LABEL_BG   = colors.HexColor("#EFF6FF")
HEADER_BG  = colors.HexColor("#F8FAFC")
ALT_ROW    = colors.HexColor("#F1F5F9")
HIGHLIGHT  = colors.HexColor("#DBEAFE")
GRID_COLOR = colors.HexColor("#CBD5E1")
TEXT_DARK  = colors.HexColor("#1E293B")
TEXT_MID   = colors.HexColor("#475569")

PAGE_W, PAGE_H = A4
MARGIN    = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN   # 180 mm


# ============================================================
# HELPERS
# ============================================================

def format_inr(amount) -> str:
    """Indian-grouped currency, e.g.  Rs. 1,23,900.00"""
    try:
        amount = float(amount)
    except (TypeError, ValueError):
        amount = 0.0

    negative = amount < 0
    amount   = abs(amount)
    whole    = int(amount)
    frac     = round((amount - whole) * 100)
    if frac == 100:
        whole += 1
        frac   = 0

    digits = str(whole)
    if len(digits) > 3:
        last3 = digits[-3:]
        rest  = digits[:-3]
        parts = []
        while len(rest) > 2:
            parts.insert(0, rest[-2:])
            rest = rest[:-2]
        if rest:
            parts.insert(0, rest)
        grouped = ",".join(parts) + "," + last3
    else:
        grouped = digits

    result = f"Rs. {grouped}.{frac:02d}"
    return f"-{result}" if negative else result


def info_table_style() -> TableStyle:
    return TableStyle([
        ("GRID",          (0, 0), (-1, -1), 0.4, GRID_COLOR),
        ("BACKGROUND",    (0, 0), (0, -1),  LABEL_BG),
        ("FONTNAME",      (0, 0), (0, -1),  "Helvetica-Bold"),
        ("FONTNAME",      (1, 0), (1, -1),  "Helvetica"),
        ("FONTSIZE",      (0, 0), (-1, -1), 9),
        ("TEXTCOLOR",     (0, 0), (0, -1),  TEXT_MID),
        ("TEXTCOLOR",     (1, 0), (1, -1),  TEXT_DARK),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
    ])


# ============================================================
# MAIN GENERATOR
# ============================================================

def generate_invoice_pdf(data: dict, output_file: str):

    doc = SimpleDocTemplate(
        output_file,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
    )

    story = []

    # ----------------------------------------------------------
    # HEADER BAND
    # ----------------------------------------------------------

    header_table = Table(
        [[Paragraph("BUSINESSOS", TITLE)]],
        colWidths=[CONTENT_W],
    )
    header_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), PRIMARY),
        ("TOPPADDING",    (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 2 * mm))

    story.append(Paragraph(
        "AI Powered Business Operating System",
        SUBTITLE,
    ))

    story.append(Spacer(1, 4 * mm))

    story.append(HRFlowable(
        width=CONTENT_W,
        thickness=1.5,
        color=PRIMARY,
        spaceAfter=6 * mm,
    ))

    # "TAX INVOICE" label centred below the divider
    story.append(Paragraph("TAX INVOICE", _centered_section()))

    story.append(Spacer(1, 5 * mm))

    # ----------------------------------------------------------
    # COMPANY + CUSTOMER  (side by side)
    # ----------------------------------------------------------

    org      = data["organization"]
    customer = data["customer"]

    company_rows = [
        [Paragraph("Company", SMALL_LABEL), Paragraph(getattr(org, "name",    ""), SMALL_VALUE)],
        [Paragraph("Address", SMALL_LABEL), Paragraph(getattr(org, "address", ""), SMALL_VALUE)],
        [Paragraph("Email",   SMALL_LABEL), Paragraph(getattr(org, "email",   ""), SMALL_VALUE)],
        [Paragraph("Phone",   SMALL_LABEL), Paragraph(str(getattr(org, "phone", "")), SMALL_VALUE)],
    ]

    customer_rows = [
        [Paragraph("Customer", SMALL_LABEL), Paragraph(getattr(customer, "contact_name", ""), SMALL_VALUE)],
        [Paragraph("Company",  SMALL_LABEL), Paragraph(getattr(customer, "company_name",  ""), SMALL_VALUE)],
        [Paragraph("Email",    SMALL_LABEL), Paragraph(getattr(customer, "email",         ""), SMALL_VALUE)],
        [Paragraph("Phone",    SMALL_LABEL), Paragraph(str(getattr(customer, "phone",     "")), SMALL_VALUE)],
    ]

    co_table   = Table(company_rows,  colWidths=[24 * mm, 62 * mm])
    cust_table = Table(customer_rows, colWidths=[24 * mm, 62 * mm])

    co_table.setStyle(info_table_style())
    cust_table.setStyle(info_table_style())

    side_by_side = Table(
        [[
            [Paragraph("Company Information",  SECTION), Spacer(1, 2 * mm), co_table],
            Spacer(6 * mm, 1),
            [Paragraph("Customer Information", SECTION), Spacer(1, 2 * mm), cust_table],
        ]],
        colWidths=[86 * mm, 6 * mm, 88 * mm],
    )
    side_by_side.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    story.append(side_by_side)
    story.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # INVOICE INFORMATION
    # ----------------------------------------------------------

    story.append(Paragraph("Invoice Information", SECTION))
    story.append(Spacer(1, 2 * mm))

    invoice_rows = [
        [Paragraph("Invoice No",      SMALL_LABEL), Paragraph(data["invoice_number"],               SMALL_VALUE)],
        [Paragraph("Invoice Date",    SMALL_LABEL), Paragraph(str(data["invoice_date"]   or ""),    SMALL_VALUE)],
        [Paragraph("Due Date",        SMALL_LABEL), Paragraph(str(data["due_date"]       or ""),    SMALL_VALUE)],
        [Paragraph("Delivery Date",   SMALL_LABEL), Paragraph(str(data["delivery_date"]  or ""),    SMALL_VALUE)],
        [Paragraph("Payment Mode",    SMALL_LABEL), Paragraph(data["payment_mode"]       or "",     SMALL_VALUE)],
        [Paragraph("Reverse Charge",  SMALL_LABEL), Paragraph(data["reverse_charge"]     or "",     SMALL_VALUE)],
        [Paragraph("Buyer Order No",  SMALL_LABEL), Paragraph(data["buyer_order_number"] or "",     SMALL_VALUE)],
        [Paragraph("Supplier Ref.",   SMALL_LABEL), Paragraph(data["supplier_reference"] or "",     SMALL_VALUE)],
        [Paragraph("Vehicle No",      SMALL_LABEL), Paragraph(data["vehicle_number"]     or "",     SMALL_VALUE)],
        [Paragraph("Transport",       SMALL_LABEL), Paragraph(data["transport_details"]  or "",     SMALL_VALUE)],
    ]

    invoice_info_table = Table(
        invoice_rows,
        colWidths=[40 * mm, 140 * mm],
    )
    invoice_info_table.setStyle(info_table_style())

    story.append(invoice_info_table)
    story.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # INVOICE ITEMS
    # ----------------------------------------------------------

    story.append(Paragraph("Invoice Items", SECTION))
    story.append(Spacer(1, 2 * mm))

    header_row = [
        Paragraph(h, TABLE_HEADER) for h in
        ["Item", "Description", "HSN", "Qty", "Unit", "Rate", "GST %", "GST Amt", "Total"]
    ]

    items_data = [header_row]

    for item in data["items"]:
        items_data.append([
            Paragraph(item["item_name"],            SMALL_VALUE),
            Paragraph(item["description"] or "",    SMALL_VALUE),
            Paragraph(item["hsn_code"]    or "",    SMALL_VALUE),
            Paragraph(str(item["quantity"]),         SMALL_VALUE),
            Paragraph(item["unit"],                 SMALL_VALUE),
            Paragraph(format_inr(item["rate"]),     SMALL_VALUE),
            Paragraph(f"{item['gst_percentage']}%", SMALL_VALUE),
            Paragraph(format_inr(item["gst_amount"]),  SMALL_VALUE),
            Paragraph(format_inr(item["line_total"]),  CELL_BOLD),
        ])

    items_table = Table(
        items_data,
        colWidths=[
            38 * mm,
            42 * mm,
            16 * mm,
            12 * mm,
            14 * mm,
            20 * mm,
            14 * mm,
            12 * mm,
            12 * mm,
        ],
        repeatRows=1,
    )

    items_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  PRIMARY),
        ("TEXTCOLOR",     (0, 0), (-1, 0),  colors.white),
        ("GRID",          (0, 0), (-1, -1), 0.4, GRID_COLOR),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, ALT_ROW]),
        ("ALIGN",         (3, 0), (-1, -1), "RIGHT"),
        ("ALIGN",         (0, 0), (2, -1),  "LEFT"),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
    ]))

    story.append(items_table)
    story.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # INVOICE SUMMARY
    # ----------------------------------------------------------

    story.append(Paragraph("Invoice Summary", SECTION))
    story.append(Spacer(1, 2 * mm))

    summary_rows = [
        [Paragraph("Subtotal",        SMALL_LABEL), Paragraph(format_inr(data["subtotal"]),        SMALL_VALUE)],
        [Paragraph("Tax",             SMALL_LABEL), Paragraph(format_inr(data["tax"]),             SMALL_VALUE)],
        [Paragraph("CGST",            SMALL_LABEL), Paragraph(format_inr(data["cgst"]),            SMALL_VALUE)],
        [Paragraph("SGST",            SMALL_LABEL), Paragraph(format_inr(data["sgst"]),            SMALL_VALUE)],
        [Paragraph("IGST",            SMALL_LABEL), Paragraph(format_inr(data["igst"]),            SMALL_VALUE)],
        [Paragraph("Freight Charge",  SMALL_LABEL), Paragraph(format_inr(data["freight_charge"]),  SMALL_VALUE)],
        [Paragraph("Packing Charge",  SMALL_LABEL), Paragraph(format_inr(data["packing_charge"]),  SMALL_VALUE)],
        [Paragraph("Round Off",       SMALL_LABEL), Paragraph(format_inr(data["round_off"]),       SMALL_VALUE)],
        [Paragraph("Grand Total",     CELL_BOLD),   Paragraph(format_inr(data["total_amount"]),    CELL_BOLD)],
    ]

    summary_table = Table(
        summary_rows,
        colWidths=[136 * mm, 44 * mm],
        hAlign="RIGHT",
    )
    summary_table.setStyle(TableStyle([
        ("GRID",          (0, 0), (-1, -1), 0.4, GRID_COLOR),
        ("BACKGROUND",    (0, 0), (-1, -2), HEADER_BG),
        ("BACKGROUND",    (0, -1),(-1, -1), HIGHLIGHT),
        ("ALIGN",         (1, 0), (1, -1),  "RIGHT"),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
    ]))

    story.append(summary_table)
    story.append(Spacer(1, 8 * mm))

    # ----------------------------------------------------------
    # DECLARATION
    # ----------------------------------------------------------

    story.append(Paragraph("Declaration", SECTION))
    story.append(HRFlowable(
        width=CONTENT_W,
        thickness=0.5,
        color=GRID_COLOR,
        spaceAfter=4,
    ))
    story.append(Paragraph(
        data["declaration"] or "No declaration provided.",
        NORMAL,
    ))
    story.append(Spacer(1, 5 * mm))

    # ----------------------------------------------------------
    # TERMS OF DELIVERY
    # ----------------------------------------------------------

    story.append(Paragraph("Terms of Delivery", SECTION))
    story.append(HRFlowable(
        width=CONTENT_W,
        thickness=0.5,
        color=GRID_COLOR,
        spaceAfter=4,
    ))
    story.append(Paragraph(
        data["terms_of_delivery"] or "Not specified.",
        NORMAL,
    ))
    story.append(Spacer(1, 5 * mm))

    # ----------------------------------------------------------
    # NOTES
    # ----------------------------------------------------------

    story.append(Paragraph("Notes", SECTION))
    story.append(HRFlowable(
        width=CONTENT_W,
        thickness=0.5,
        color=GRID_COLOR,
        spaceAfter=4,
    ))
    story.append(Paragraph(
        data["notes"] or "No additional notes.",
        NORMAL,
    ))
    story.append(Spacer(1, 10 * mm))

    # ----------------------------------------------------------
    # SIGNATURE
    # ----------------------------------------------------------

    sig_label = Paragraph("<b>Authorized Signatory</b>", SMALL_LABEL)
    sig_line  = Paragraph("________________________",    SMALL_VALUE)

    signature_table = Table(
        [["", [Spacer(1, 4), sig_line, Spacer(1, 4), sig_label]]],
        colWidths=[110 * mm, 70 * mm],
    )
    signature_table.setStyle(TableStyle([
        ("ALIGN",         (1, 0), (1, 0), "CENTER"),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))

    story.append(signature_table)
    story.append(Spacer(1, 8 * mm))

    # ----------------------------------------------------------
    # FOOTER BAND
    # ----------------------------------------------------------

    footer_table = Table(
        [[Paragraph(
            "BusinessOS  |  AI Powered Business Operating System  |  Thank you for your business!",
            FOOTER_TEXT,
        )]],
        colWidths=[CONTENT_W],
    )
    footer_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), PRIMARY),
        ("ALIGN",         (0, 0), (-1, -1), "CENTER"),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))

    story.append(footer_table)

    # ----------------------------------------------------------
    # BUILD
    # ----------------------------------------------------------

    doc.build(story)


# ============================================================
# INTERNAL HELPER — centred SECTION-style label
# ============================================================

def _centered_section():
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.enums import TA_CENTER
    return ParagraphStyle(
        "TaxInvoiceCentered",
        fontName="Helvetica-Bold",
        fontSize=13,
        textColor=PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=4,
        spaceBefore=2,
    )