from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT

PRIMARY = colors.HexColor("#1E3A8A")

TITLE = ParagraphStyle(
    "BosTitle",
    fontName="Helvetica-Bold",
    fontSize=22,
    alignment=TA_CENTER,
    textColor=colors.white,        # WHITE — renders inside navy band
    spaceAfter=0,
    spaceBefore=0,
    leading=26,
)

SUBTITLE = ParagraphStyle(
    "BosSubtitle",
    fontName="Helvetica",
    fontSize=11,
    alignment=TA_CENTER,
    textColor=colors.HexColor("#64748B"),
    spaceAfter=4,
    spaceBefore=4,
)

SECTION = ParagraphStyle(
    "BosSection",
    fontName="Helvetica-Bold",
    fontSize=11,
    textColor=PRIMARY,
    spaceBefore=2,
    spaceAfter=4,
)

NORMAL = ParagraphStyle(
    "BosNormal",
    fontName="Helvetica",
    fontSize=9.5,
    leading=15,
    textColor=colors.HexColor("#1E293B"),
    spaceAfter=3,
)

RIGHT = ParagraphStyle(
    "BosRight",
    fontName="Helvetica",
    fontSize=9.5,
    alignment=TA_RIGHT,
    leading=15,
)

SMALL_LABEL = ParagraphStyle(
    "BosSmallLabel",
    fontName="Helvetica-Bold",
    fontSize=8.5,
    textColor=colors.HexColor("#475569"),
    leading=12,
)

# NEW — white version of SMALL_LABEL for dark table headers
TABLE_HEADER = ParagraphStyle(
    "BosTableHeader",
    fontName="Helvetica-Bold",
    fontSize=8.5,
    textColor=colors.white,        # WHITE — readable on navy background
    leading=12,
)

SMALL_VALUE = ParagraphStyle(
    "BosSmallValue",
    fontName="Helvetica",
    fontSize=9,
    textColor=colors.HexColor("#1E293B"),
    leading=12,
)

CELL_BOLD = ParagraphStyle(
    "BosCellBold",
    fontName="Helvetica-Bold",
    fontSize=9.5,
    textColor=colors.HexColor("#1E293B"),
    leading=14,
)

FOOTER_TEXT = ParagraphStyle(
    "BosFooter",
    fontName="Helvetica",
    fontSize=9,
    alignment=TA_CENTER,
    textColor=colors.white,
)