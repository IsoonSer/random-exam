categories = {
    "ทั่วไป": [
        "ความเข้าใจในภาษา",
        "เรียงประโยค",
        "อุปมาอุปไมย",
        "อนุกรม",
        "คณิตทั่วไป",
        "ตาราง",
        "เงื่อนไขภาษา",
        "เงื่อนไขสัญลักษณ์",
    ],
    "กฏหมาย": ["พรบ.แผ่นดิน", "พรฎ.กิจการ", "วิปกครอง", "อาญา", "พรบ.ละเมิด", "พรบ.จริยธรรม"],
    "อังกฤษ": ["conver", "vocab", "grammar", "reading"],
}


import os

for folder_name, subfolders in categories.items():
    # print(y)
    # Create the folder
    if not os.path.exists(folder_name):
        os.mkdir(folder_name)
        print(f"Folder '{folder_name}' created successfully.")
    else:
        print(f"Folder '{folder_name}' already exists.")

    # Create subfolders within the folder
    for subfolder in subfolders:
        subfolder_path = os.path.join(folder_name, subfolder)
        if not os.path.exists(subfolder_path):
            os.mkdir(subfolder_path)
            print(f"Subfolder '{subfolder}' created in '{folder_name}'.")
        else:
            print(f"Subfolder '{subfolder}' already exists in '{folder_name}'.")
