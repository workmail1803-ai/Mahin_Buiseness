import fitz

doc = fitz.open('Business Booklet.pdf')
full_text = ""

for page_num, page in enumerate(doc):
    full_text += f"\n\n=== PAGE {page_num + 1} ===\n\n"
    full_text += page.get_text()

with open('business_booklet_content.txt', 'w', encoding='utf-8') as f:
    f.write(full_text)

print("Extraction complete! Content saved to business_booklet_content.txt")
print(f"Total pages: {len(doc)}")
