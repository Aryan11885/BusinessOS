from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4
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
# PALETTE
# ============================================================

PRIMARY      = colors.HexColor("#1E3A8A")
PRIMARY_DARK = colors.HexColor("#172D6E")
LABEL_BG     = colors.HexColor("#EFF6FF")
HEADER_BG    = colors.HexColor("#F8FAFC")
ALT_ROW      = colors.HexColor("#F1F5F9")
HIGHLIGHT    = colors.HexColor("#DBEAFE")
GRID_COLOR   = colors.HexColor("#CBD5E1")
TEXT_DARK    = colors.HexColor("#1E293B")
TEXT_MID     = colors.HexColor("#475569")

PAGE_W, PAGE_H = A4
MARGIN = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN   # 180 mm


# ============================================================
# CURRENCY HELPER  (INR grouping, no rupee glyph)
# ============================================================

def format_inr(amount) -> str:
    """Return Indian-grouped currency string, e.g.  Rs. 1,23,900.00"""
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


# ============================================================
# REUSABLE TABLE STYLE HELPER
# ============================================================

def info_table_style(label_bg=LABEL_BG) -> TableStyle:
    return TableStyle([
        ("GRID",          (0, 0), (-1, -1), 0.4, GRID_COLOR),
        ("BACKGROUND",    (0, 0), (0, -1),  label_bg),
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

def generate_proposal_pdf(data: dict, output_path: str):

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
    )

    elements = []

    # ----------------------------------------------------------
    # HEADER BAND
    # ----------------------------------------------------------

    header_band = Table(
        [[
            Paragraph("BUSINESSOS", TITLE),
        ]],
        colWidths=[CONTENT_W],
    )
    header_band.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), PRIMARY),
        ("TOPPADDING",    (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING",   (0, 0), (-1, -1), 12),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 12),
    ]))

    # Override TITLE color to white inside the band
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
    header_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), PRIMARY),
        ("TOPPADDING",    (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
    ]))

    elements.append(header_table)
    elements.append(Spacer(1, 2 * mm))

    elements.append(Paragraph(
        "AI Powered Business Operating System",
        SUBTITLE,
    ))

    elements.append(Spacer(1, 6 * mm))

    elements.append(HRFlowable(
        width=CONTENT_W,
        thickness=1.5,
        color=PRIMARY,
        spaceAfter=6 * mm,
    ))

    # ----------------------------------------------------------
    # PROPOSAL META BLOCK  (Proposal No / Title / Status / Amount)
    # ----------------------------------------------------------

    meta_left = [
        [Paragraph("Proposal No",  SMALL_LABEL), Paragraph(data["proposal_number"], SMALL_VALUE)],
        [Paragraph("Title",        SMALL_LABEL), Paragraph(data["title"],            SMALL_VALUE)],
    ]
    meta_right = [
        [Paragraph("Status",       SMALL_LABEL), Paragraph(data["status"],               SMALL_VALUE)],
        [Paragraph("Total Amount", SMALL_LABEL), Paragraph(format_inr(data["total_amount"]), CELL_BOLD)],
    ]

    meta_table_left  = Table(meta_left,  colWidths=[32 * mm, 52 * mm])
    meta_table_right = Table(meta_right, colWidths=[32 * mm, 52 * mm])

    for t in (meta_table_left, meta_table_right):
        t.setStyle(info_table_style())

    meta_wrapper = Table(
        [[meta_table_left, Spacer(4 * mm, 1), meta_table_right]],
        colWidths=[84 * mm, 4 * mm, 84 * mm + 4 * mm],
    )
    meta_wrapper.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    elements.append(Paragraph("Proposal Information", SECTION))
    elements.append(Spacer(1, 2 * mm))
    elements.append(meta_wrapper)
    elements.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # COMPANY + CUSTOMER  (side by side)
    # ----------------------------------------------------------

    company  = data["company"]
    customer = data["customer"]

    company_rows = [
        [Paragraph("Name",     SMALL_LABEL), Paragraph(company["name"],  SMALL_VALUE)],
        [Paragraph("Email",    SMALL_LABEL), Paragraph(company["email"], SMALL_VALUE)],
        [Paragraph("Phone",    SMALL_LABEL), Paragraph(str(company["phone"]), SMALL_VALUE)],
        [Paragraph("Location", SMALL_LABEL), Paragraph(
            f"{company['city']}, {company['state']}, {company['country']}", SMALL_VALUE)],
    ]

    customer_rows = [
        [Paragraph("Contact",  SMALL_LABEL), Paragraph(customer["name"],    SMALL_VALUE)],
        [Paragraph("Company",  SMALL_LABEL), Paragraph(customer["company"], SMALL_VALUE)],
        [Paragraph("Email",    SMALL_LABEL), Paragraph(customer["email"],   SMALL_VALUE)],
        [Paragraph("Phone",    SMALL_LABEL), Paragraph(str(customer["phone"]), SMALL_VALUE)],
        [Paragraph("Location", SMALL_LABEL), Paragraph(
            f"{customer['city']}, {customer['state']}", SMALL_VALUE)],
    ]

    co_table   = Table(company_rows,  colWidths=[24 * mm, 62 * mm])
    cust_table = Table(customer_rows, colWidths=[24 * mm, 62 * mm])

    co_table.setStyle(info_table_style())
    cust_table.setStyle(info_table_style())

    side_by_side = Table(
        [[
            [Paragraph("Company Information", SECTION), Spacer(1, 2 * mm), co_table],
            Spacer(6 * mm, 1),
            [Paragraph("Customer Information", SECTION), Spacer(1, 2 * mm), cust_table],
        ]],
        colWidths=[86 * mm, 6 * mm, 86 * mm + 2 * mm],
    )
    side_by_side.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    elements.append(side_by_side)
    elements.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # PROPOSAL ITEMS TABLE
    # ----------------------------------------------------------

    elements.append(Paragraph("Proposal Items", SECTION))
    elements.append(Spacer(1, 2 * mm))

    items = data["items"]

    header_row = [
        Paragraph(h, TABLE_HEADER) for h in
        ["Item", "Qty", "Unit", "Rate", "Discount", "GST %", "Total"]
    ]

    table_data = [header_row]

    for item in items:
        table_data.append([
            Paragraph(item["item_name"], SMALL_VALUE),
            Paragraph(str(item["quantity"]), SMALL_VALUE),
            Paragraph(item["unit"], SMALL_VALUE),
            Paragraph(format_inr(item["unit_price"]), SMALL_VALUE),
            Paragraph(format_inr(item["discount"]),   SMALL_VALUE),
            Paragraph(f"{item['tax_percentage']}%",   SMALL_VALUE),
            Paragraph(format_inr(item["line_total"]), CELL_BOLD),
        ])

    items_table = Table(
        table_data,
        colWidths=[52*mm, 14*mm, 16*mm, 26*mm, 22*mm, 16*mm, 34*mm],
        repeatRows=1,
    )

    items_table.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  PRIMARY),
        ("TEXTCOLOR",     (0, 0), (-1, 0),  colors.white),
        ("GRID",          (0, 0), (-1, -1), 0.4, GRID_COLOR),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.white, ALT_ROW]),
        ("ALIGN",         (1, 0), (-1, -1), "RIGHT"),
        ("ALIGN",         (0, 0), (0, -1),  "LEFT"),
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
    ]))

    elements.append(items_table)
    elements.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # FINANCIAL SUMMARY
    # ----------------------------------------------------------

    elements.append(Paragraph("Financial Summary", SECTION))
    elements.append(Spacer(1, 2 * mm))

    summary_rows = [
        [Paragraph("Subtotal",    SMALL_LABEL), Paragraph(format_inr(data["subtotal"]),     SMALL_VALUE)],
        [Paragraph("Discount",    SMALL_LABEL), Paragraph(format_inr(data["discount"]),     SMALL_VALUE)],
        [Paragraph("GST",         SMALL_LABEL), Paragraph(format_inr(data["tax"]),          SMALL_VALUE)],
        [Paragraph("Grand Total", CELL_BOLD),   Paragraph(format_inr(data["total_amount"]), CELL_BOLD)],
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

    elements.append(summary_table)
    elements.append(Spacer(1, 8 * mm))

    # ----------------------------------------------------------
    # PROJECT DESCRIPTION
    # ----------------------------------------------------------

    elements.append(Paragraph("Project Description", SECTION))
    elements.append(HRFlowable(
        width=CONTENT_W,
        thickness=0.5,
        color=GRID_COLOR,
        spaceAfter=4,
    ))

    description = data.get("description", "No description provided.")
    elements.append(Paragraph(description, NORMAL))
    elements.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # THANK YOU
    # ----------------------------------------------------------

    elements.append(Paragraph("Thank You!", SECTION))
    elements.append(Paragraph(
        "Thank you for giving BusinessOS the opportunity to submit this proposal. "
        "We are committed to delivering high-quality software solutions that "
        "help businesses grow through automation, AI, and modern technology.",
        NORMAL,
    ))
    elements.append(Spacer(1, 7 * mm))

    # ----------------------------------------------------------
    # GENERAL NOTES
    # ----------------------------------------------------------

    elements.append(Paragraph("General Notes", SECTION))
    elements.append(HRFlowable(
        width=CONTENT_W,
        thickness=0.5,
        color=GRID_COLOR,
        spaceAfter=4,
    ))

    notes = [
        "Prices are exclusive of any future scope changes.",
        "Development starts after proposal approval.",
        "Any additional requirements will be estimated separately.",
        "Source code ownership will be transferred after full payment.",
    ]

    for note in notes:
        elements.append(Paragraph(f"\u2022\u2002{note}", NORMAL))

    elements.append(Spacer(1, 12 * mm))

    # ----------------------------------------------------------
    # SIGNATURE
    # ----------------------------------------------------------

    sig_label = Paragraph(
        "<b>Authorized By</b>",
        SMALL_LABEL,
    )
    sig_value = Paragraph(
        "BusinessOS Team<br/>AI Powered Business Operating System",
        SMALL_VALUE,
    )

    signature = Table(
        [["", [sig_label, Spacer(1, 4), sig_value]]],
        colWidths=[100 * mm, 80 * mm],
    )
    signature.setStyle(TableStyle([
        ("LINEABOVE",     (1, 0), (1, 0), 1,  TEXT_DARK),
        ("TOPPADDING",    (1, 0), (1, 0), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ALIGN",         (1, 0), (1, 0), "CENTER"),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
    ]))

    elements.append(signature)
    elements.append(Spacer(1, 8 * mm))

    # ----------------------------------------------------------
    # FOOTER BAND
    # ----------------------------------------------------------

    footer_table = Table(
        [[Paragraph(
            "BusinessOS  |  AI Powered Business Operating System",
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

    elements.append(footer_table)

    # ----------------------------------------------------------
    # BUILD
    # ----------------------------------------------------------

    doc.build(elements)