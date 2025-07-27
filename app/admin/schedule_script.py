print("Hello")

import sys
import time
import threading
import itertools
import pdfplumber
import json
from pathlib import Path

# Spinner function
def spinner(msg="Processing..."):
    for c in itertools.cycle(["|", "/", "-", "\\"]):
        if done:
            break
        sys.stdout.write(f"\r{msg} {c}")
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write("\rDone!            \n")

exclude_rooms = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 80, 81, 100, 102, 103, 106, 109, 110]


def fixTypo(text):
    new_text = text.replace("หอ้ ง", "ห้อง")
    text = new_text.replace("หตั ถะ", "หัตถะ")
    return text    

roomLists = []
rooms = dict()
def extract_schedule_from_pdf(pdf_path):
    rooms = dict()
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            if (i+1 in exclude_rooms):
                continue
            text = page.extract_text()
            table = page.extract_table({
                "vertical_strategy": "lines",
                "horizontal_strategy": "lines",
                "snap_tolerance": 3,
                "intersection_tolerance": 3,
                "join_tolerance": 1
            })
            header = text.partition('\n')[0]
            test1 = header.partition(' ')[2]
            test2 = test1.partition(' ')[2]
            roomName = fixTypo(test2.partition(' ')[2])
            if table:
                days = table[2:]
                for day in days:
                    before = ""
                    day_list = list()
                    newSubject = list()
                    subjects = day[1:]
                    for subject in subjects:
                        if subject is not None:
                            subject = subject.replace("\n", " ")
                        newSubject.append(subject)
                    for elements in newSubject:
                        if (elements == ''):
                            day_list.append("Empty")
                        else:
                            # dissecting the string
                            day_list.append("In-Use")

                    rooms.setdefault(fixTypo(roomName), []).append(day_list)
    print(rooms)
    return rooms





done = False
t = threading.Thread(target=spinner)
t.start()

# ห้ามลืมเปลี่ยน path (จาก Directory)


pdf_path = "app/admin/pdf_files/ตารางการใช้ห้อง.pdf"
rooms_json = extract_schedule_from_pdf(pdf_path)

script_path = Path(__file__).resolve()
project_root = script_path.parents[2]
file_path = project_root / "data" / "schedule.js"
file_path.parent.mkdir(parents=True, exist_ok=True)

print(file_path)

done = True
t.join()


# print(json.dumps(rooms_json, indent=2, ensure_ascii=False))

with open(file_path, "w", encoding="utf-8") as f:
    f.write(f"export const schedule = ")
    json.dump(rooms_json, f, ensure_ascii=False, indent=2)