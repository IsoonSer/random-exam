import os
def count_files_in_directories(root_dir):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        file_count = len(filenames)
        print(f"Directory: {dirpath} - Files: {file_count}")
        
count_files_in_directories('exam')
