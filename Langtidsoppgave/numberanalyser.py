import pandas as pd
import matplotlib.pyplot as plt
from math import floor
from time import sleep
from termcolor import cprint
from numpy import median
from statistics import mode
currentwalk = False
amount = []
since = 0
passes = 0


frequency = 180     #how many times measured per minute
threshold = 34      #light level separating normal and passing through
laser = pd.read_csv("måling 6 timer.csv")   #csv file to read from
time = laser.loc[:, "Run 5:Tid(s)"]
level = laser.loc[:, "Run 5:Illumination(lux)"]

print(max(time))
totalminutes = (max(time)*3)/frequency      #cant use len(time) cus that has way more idfk why
"""
x1 = laser['Run 1:Illumination(lux)']
y1 = laser['Run 1:Tid(s)']


plt.plot(y1,x1)
plt.xlabel('time(s)')
plt.ylabel('Illumination(lux)')
plt.show()
"""




for min in range(floor(totalminutes)):
    amount.append([])

    print("\n")
    cprint("Minute "+str(min), attrs=["bold"])
    print(min*frequency, "-", min*frequency+frequency)

#runs through (frequency) entries from min*frequency to not repeat the previous minute, tomin*frequency+frequency so it still runs through every entry from this minute
    for i in range(min*frequency,min*frequency+frequency):  #runs through this minute
        if currentwalk == False:            #if no one are currently passing through
            if round(level[i]) < threshold:    #if the rounded lightlevel is lower than specified for when someone are walking through
                currentwalk = True              #doesnt count multiple times when one person is still passing through
                amount[min].append(time[i])     #appends the time when the passthrough happened to amount[current minute]
                print("adding pass at", i, "after", time[i], "seconds") #prints where in the time array the pass happened and when it happened
        else:       #if someone are currently passing through
            since +=1   #add 1 to since (debug)
            if round(level[i]) >= threshold:   #if the person has passed through
                currentwalk = False             #allow more logging
                #print("walkdone after", since, "times")
                since = 0       #reset since (debug)
                #shi mi shi mi shi mi ye shi mi ya
    print("\nMinute complete")
    print("Passes this minute: "+str(len(amount[min])))


print("\n\n")

for i in range(len(amount)):
    passes += len(amount[i])


medarr = []
for i in range (len(amount)):
    medarr.append(len(amount[i]))

del min
print("Total passthroughs:", passes)
print("Mean passthroughs per minute:", passes/(floor(totalminutes)))
print("Median passthroughs per minute:", median(medarr))
print("Mode passthroughs:", mode(medarr))
print("Range of passthroughs per minute:", str((max(medarr)-min(medarr))))
print("\n")
print("Most active minute:", max(medarr))