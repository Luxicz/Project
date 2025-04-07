import os
os.system('cls' if os.name=='nt' else 'clear') # Command to clear the CLI

list = []
# print("Hello, this is my program \n\t \f\a\v\b test")

while True:  
    print("Write your input:", end=" ")
    temp = input()
    if temp == "":
        del temp
        break
    else:
        list.append(temp)
        del temp
if list:
    print(list)
    for i in range(len(list)):
        print(list[i],end=" ")