import zipfile
import tkinter as tk
from tkinter import filedialog

import os
import sys
import pyuac

def select_zip_file():
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    
    if not pyuac.isUserAdmin(): # Lucy requires admin perms to run properly.
        print("Script is not running as administrator. Requesting elevation...")
        print('Please allow administration permissions so the interpreter can read and execute your code, press enter to open prompt.')
        input()
        pyuac.runAsAdmin()
    else:
        if len(sys.argv) > 1:
            file_path = sys.argv[2]
            
        if not file_path.endswith('.lucy'):
            print('File is not a .lucy file, please select a .lucy file')
            file_path = filedialog.askopenfilename(filetypes=[("Zip Files", "*.lucy")])
            
        print(file_path)
        try:
            with zipfile.ZipFile(file_path, "r") as zip_ref:
                zip_ref.extractall('extracted_contents')
                print("Contents extracted successfully!")
                    
                # Print the contents of each file
                for file_info in zip_ref.infolist():
                    print(f"File: {file_info.filename}")
                    with zip_ref.open(file_info) as file:
                        content = file.read().decode("utf-8")
                        print(content)
        except zipfile.BadZipFile:
            print("Invalid zip file. Please select a valid zip file.")

if __name__ == "__main__":
    select_zip_file()

    print("If terminal didn't close automatically, press Enter to close it.")
    input()  # This will wait for the user to press Enter
    print("Goodbye!")  # This message will be displayed when the user presses Enter