from tkinter import *
from tkinter.ttk import *

# Create the main window
master = Tk()
master.geometry("200x200")

# Function to open a new window
def openNewWindow():
    newWindow = Toplevel(master)
    newWindow.title("New Window")
    newWindow.geometry("200x200")
    Label(newWindow, text="This is a new window").pack()

# Main window label
label = Label(master, text="This is the main window")
label.pack(pady=10)

# Button to open the new window
btn = Button(master, text="Click to open a new window", command=openNewWindow)
btn.pack(pady=10)

# Run the main event loop
mainloop()
